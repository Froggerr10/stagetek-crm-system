-- =====================================================
-- STAGETEK CRM - Quotation System (Hybrid Model)
-- Version: 1.0
-- Date: 14/Oct/2025
-- Sprint 1: P0.5 Cotação MVP
-- =====================================================

-- =====================================================
-- 1. PRODUCTS TABLE (Catalog for recurring items)
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(50) UNIQUE,
  category VARCHAR(50) NOT NULL CHECK (category IN ('som', 'luz', 'estrutura', 'talha', 'outro')),
  price_brl DECIMAL(10, 2) NOT NULL,
  price_usd DECIMAL(10, 2),
  price_eur DECIMAL(10, 2),
  description TEXT,
  technical_specs JSONB DEFAULT '{}',
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_sku ON products(sku);

-- =====================================================
-- 2. QUOTATIONS TABLE (Hybrid: catalog + custom items)
-- =====================================================
CREATE TABLE IF NOT EXISTS quotations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quotation_number VARCHAR(50) UNIQUE NOT NULL,
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE SET NULL,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,

  -- Items (JSONB for flexibility: catalog products + custom items)
  -- Structure: [{ product_id?, name, description?, quantity, unit_price, discount_percent, subtotal }]
  items JSONB NOT NULL DEFAULT '[]',

  -- Pricing
  subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0,
  freight DECIMAL(10, 2) DEFAULT 0,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(12, 2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'BRL' CHECK (currency IN ('BRL', 'USD', 'EUR')),

  -- Status
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),

  -- PDF & Email
  pdf_url TEXT,
  sent_at TIMESTAMPTZ,
  sent_to_email VARCHAR(255),

  -- Validity
  valid_until DATE,

  -- Notes
  notes TEXT,
  internal_notes TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),

  CONSTRAINT quotation_must_have_client_or_opportunity CHECK (
    client_id IS NOT NULL OR opportunity_id IS NOT NULL
  )
);

CREATE INDEX idx_quotations_opportunity_id ON quotations(opportunity_id);
CREATE INDEX idx_quotations_client_id ON quotations(client_id);
CREATE INDEX idx_quotations_status ON quotations(status);
CREATE INDEX idx_quotations_created_at ON quotations(created_at DESC);
CREATE INDEX idx_quotations_quotation_number ON quotations(quotation_number);

-- =====================================================
-- 3. QUOTATION NUMBER GENERATOR FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION generate_quotation_number()
RETURNS TEXT AS $$
DECLARE
  year_month TEXT;
  sequence_num INTEGER;
  new_number TEXT;
BEGIN
  -- Format: QT-YYYYMM-NNN (ex: QT-202510-001)
  year_month := TO_CHAR(NOW(), 'YYYYMM');

  -- Get next sequence number for this month
  SELECT COUNT(*) + 1 INTO sequence_num
  FROM quotations
  WHERE quotation_number LIKE 'QT-' || year_month || '-%';

  -- Generate formatted number
  new_number := 'QT-' || year_month || '-' || LPAD(sequence_num::TEXT, 3, '0');

  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 4. TRIGGER - Auto-generate quotation number
-- =====================================================
CREATE OR REPLACE FUNCTION set_quotation_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.quotation_number IS NULL OR NEW.quotation_number = '' THEN
    NEW.quotation_number := generate_quotation_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_quotation_number
  BEFORE INSERT ON quotations
  FOR EACH ROW
  EXECUTE FUNCTION set_quotation_number();

-- =====================================================
-- 5. TRIGGER - Auto-update updated_at
-- =====================================================
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotations_updated_at
  BEFORE UPDATE ON quotations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 6. RLS POLICIES - Products
-- =====================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- SELECT: All authenticated users can view active products
CREATE POLICY "products_select_policy"
  ON products FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND is_active = TRUE
  );

-- INSERT: Only admin can add products
CREATE POLICY "products_insert_policy"
  ON products FOR INSERT
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- UPDATE: Only admin can modify products
CREATE POLICY "products_update_policy"
  ON products FOR UPDATE
  USING (auth.jwt()->>'role' = 'admin');

-- DELETE: Only admin can delete (soft delete via is_active=false preferred)
CREATE POLICY "products_delete_policy"
  ON products FOR DELETE
  USING (auth.jwt()->>'role' = 'admin');

-- =====================================================
-- 7. RLS POLICIES - Quotations
-- =====================================================
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;

-- SELECT: All authenticated users can view all quotations
CREATE POLICY "quotations_select_policy"
  ON quotations FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- INSERT: Any authenticated user can create quotations
CREATE POLICY "quotations_insert_policy"
  ON quotations FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND created_by = auth.uid()
  );

-- UPDATE: Creator or admin can modify
CREATE POLICY "quotations_update_policy"
  ON quotations FOR UPDATE
  USING (
    auth.uid() IS NOT NULL
    AND (
      created_by = auth.uid()
      OR auth.jwt()->>'role' = 'admin'
    )
  );

-- DELETE: Only admin can delete
CREATE POLICY "quotations_delete_policy"
  ON quotations FOR DELETE
  USING (auth.jwt()->>'role' = 'admin');

-- =====================================================
-- 8. AUDIT TRIGGERS - Quotations
-- =====================================================
CREATE TRIGGER audit_quotations_changes
  AFTER UPDATE OR DELETE ON quotations
  FOR EACH ROW
  EXECUTE FUNCTION log_changes();

-- =====================================================
-- 9. HELPER FUNCTIONS
-- =====================================================

-- Function to calculate quotation totals from items JSONB
CREATE OR REPLACE FUNCTION calculate_quotation_totals(items_json JSONB, freight_amount DECIMAL)
RETURNS TABLE (
  subtotal DECIMAL,
  total DECIMAL
) AS $$
DECLARE
  item JSONB;
  calculated_subtotal DECIMAL := 0;
  calculated_total DECIMAL := 0;
BEGIN
  -- Sum all item subtotals
  FOR item IN SELECT * FROM jsonb_array_elements(items_json)
  LOOP
    calculated_subtotal := calculated_subtotal + (item->>'subtotal')::DECIMAL;
  END LOOP;

  -- Add freight
  calculated_total := calculated_subtotal + COALESCE(freight_amount, 0);

  RETURN QUERY SELECT calculated_subtotal, calculated_total;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- DONE! Quotation System (Hybrid Model) created
-- =====================================================
-- Features:
-- ✅ Products catalog (simple, for recurring items)
-- ✅ Quotations with JSONB items (catalog + custom items)
-- ✅ Auto-generated quotation numbers (QT-YYYYMM-NNN)
-- ✅ RLS policies (ownership-based)
-- ✅ Audit trail (activity_log integration)
-- ✅ Helper functions (calculate totals)
--
-- Next steps:
-- 1. Create seed data for ~10-15 common products
-- 2. Build quotation creation UI
-- 3. PDF generation
-- 4. Email integration (Resend)
-- =====================================================
