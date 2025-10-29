-- =====================================================
-- Create New Tables: emails_sent, opportunity_products
-- Generated: 25 Outubro 2025
-- Required for: Story 1.1 (Tab Email), Story 1.2 (Tab Produtos)
-- =====================================================

-- =====================================================
-- TABLE: emails_sent (Story 1.1)
-- Purpose: Audit trail de emails enviados
-- Security Model: owner_only (sent_by = owner)
-- =====================================================

CREATE TABLE IF NOT EXISTS emails_sent (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  to_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  sent_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_emails_sent_opportunity_id ON emails_sent(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_emails_sent_sent_by ON emails_sent(sent_by);
CREATE INDEX IF NOT EXISTS idx_emails_sent_sent_at ON emails_sent(sent_at DESC);

-- Enable RLS
ALTER TABLE emails_sent ENABLE ROW LEVEL SECURITY;

-- RLS Policies (owner_only pattern)

-- SELECT (apenas own emails OU responsável da oportunidade)
CREATE POLICY "emails_sent_select_policy"
  ON emails_sent FOR SELECT
  TO authenticated
  USING (
    auth.uid() = sent_by OR
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = emails_sent.opportunity_id
      AND opportunities.assigned_to = auth.uid()
    )
  );

-- INSERT (apenas autenticados)
CREATE POLICY "emails_sent_insert_policy"
  ON emails_sent FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sent_by AND
    -- Validar opportunity_id existe
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = emails_sent.opportunity_id
    )
  );

-- UPDATE (BLOQUEADO - immutable audit trail)
-- DELETE (BLOQUEADO - immutable audit trail)

COMMENT ON TABLE emails_sent IS 'Audit trail de emails enviados via Tab Email (Story 1.1). Immutable after INSERT.';

-- =====================================================
-- TABLE: opportunity_products (Story 1.2)
-- Purpose: Many-to-many entre opportunities e products
-- Security Model: team_shared (relacional)
-- =====================================================

CREATE TABLE IF NOT EXISTS opportunity_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
  added_at TIMESTAMPTZ DEFAULT NOW(),
  added_by UUID REFERENCES auth.users(id),
  UNIQUE(opportunity_id, product_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_opportunity_products_opportunity_id ON opportunity_products(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_opportunity_products_product_id ON opportunity_products(product_id);

-- Enable RLS
ALTER TABLE opportunity_products ENABLE ROW LEVEL SECURITY;

-- RLS Policies (team_shared pattern)

-- SELECT (todos usuários autenticados)
CREATE POLICY "opportunity_products_select_policy"
  ON opportunity_products FOR SELECT
  TO authenticated
  USING (true);

-- INSERT (todos usuários autenticados, valida FKs)
CREATE POLICY "opportunity_products_insert_policy"
  ON opportunity_products FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Validar opportunity_id existe
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = opportunity_products.opportunity_id
    ) AND
    -- Validar product_id existe
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = opportunity_products.product_id
    ) AND
    -- Validar quantity > 0
    quantity > 0
  );

-- UPDATE (todos usuários autenticados)
CREATE POLICY "opportunity_products_update_policy"
  ON opportunity_products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (
    quantity > 0
  );

-- DELETE (todos usuários autenticados)
CREATE POLICY "opportunity_products_delete_policy"
  ON opportunity_products FOR DELETE
  TO authenticated
  USING (true);

COMMENT ON TABLE opportunity_products IS 'Many-to-many entre opportunities e products (Story 1.2). Team-shared access.';

-- =====================================================
-- Testing Guide: emails_sent
-- =====================================================
-- 1. Login as user A: alice@stagetek.com
-- 2. INSERT email (opportunity owned by A): Should succeed ✅
-- 3. SELECT email: Should see ✅ (sent_by = user A)
-- 4. UPDATE email: Should FAIL ❌ (immutable)
-- 5. DELETE email: Should FAIL ❌ (immutable)
-- 6. Login as user B
-- 7. SELECT email (sent by A, opportunity assigned to B): Should see ✅
-- 8. SELECT email (sent by A, opportunity NOT assigned to B): Should NOT see ❌
-- =====================================================

-- =====================================================
-- Testing Guide: opportunity_products
-- =====================================================
-- 1. Login as user A: alice@stagetek.com
-- 2. INSERT product link (opportunity X, product Y): Should succeed ✅
-- 3. INSERT duplicate (opportunity X, product Y): Should FAIL ❌ (UNIQUE constraint)
-- 4. UPDATE quantity: Should succeed ✅
-- 5. UPDATE quantity to 0: Should FAIL ❌ (CHECK constraint)
-- 6. Login as user B
-- 7. SELECT products for opportunity X: Should see ✅ (team-shared)
-- 8. DELETE product link: Should succeed ✅ (team-shared)
-- =====================================================

-- =====================================================
-- Performance Notes
-- =====================================================
-- emails_sent:
-- - Index on opportunity_id + sent_at (timeline queries)
-- - Index on sent_by (user-specific queries)
--
-- opportunity_products:
-- - Index on opportunity_id (query products per opportunity)
-- - Index on product_id (query opportunities per product)
-- - UNIQUE constraint on (opportunity_id, product_id) prevents duplicates
-- =====================================================
