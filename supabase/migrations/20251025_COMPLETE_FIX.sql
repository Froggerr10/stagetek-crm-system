-- =====================================================
-- STAGETEK CRM - COMPLETE DATABASE SETUP
-- Generated: 25 Outubro 2025
-- Purpose: Create missing tables + Apply all RLS policies
-- =====================================================
--
-- This script is IDEMPOTENT (safe to run multiple times)
--
-- PART 1: Create missing tables
-- PART 2: Apply RLS policies for ALL tables
-- PART 3: Create Storage buckets + policies
--
-- =====================================================

-- =====================================================
-- PART 1: CREATE MISSING TABLES
-- =====================================================

-- -----------------------------------------------------
-- TABLE: contacts (if not exists)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  position TEXT,
  is_primary BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contacts_client_id ON contacts(client_id);
CREATE INDEX IF NOT EXISTS idx_contacts_opportunity_id ON contacts(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_contacts_is_primary ON contacts(is_primary) WHERE is_primary = true;

-- -----------------------------------------------------
-- TABLE: emails_sent (new - Story 1.1)
-- -----------------------------------------------------
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

CREATE INDEX IF NOT EXISTS idx_emails_sent_opportunity_id ON emails_sent(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_emails_sent_sent_by ON emails_sent(sent_by);
CREATE INDEX IF NOT EXISTS idx_emails_sent_sent_at ON emails_sent(sent_at DESC);

-- -----------------------------------------------------
-- TABLE: opportunity_products (new - Story 1.2)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS opportunity_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
  added_at TIMESTAMPTZ DEFAULT NOW(),
  added_by UUID REFERENCES auth.users(id),
  UNIQUE(opportunity_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_opportunity_products_opportunity_id ON opportunity_products(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_opportunity_products_product_id ON opportunity_products(product_id);

-- =====================================================
-- PART 2: APPLY RLS POLICIES (ALL TABLES)
-- =====================================================

-- -----------------------------------------------------
-- TABLE: clients (team_shared)
-- -----------------------------------------------------
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "clients_select_policy" ON clients;
DROP POLICY IF EXISTS "clients_insert_policy" ON clients;
DROP POLICY IF EXISTS "clients_update_policy" ON clients;
DROP POLICY IF EXISTS "clients_delete_policy" ON clients;

CREATE POLICY "clients_select_policy"
  ON clients FOR SELECT TO authenticated USING (true);

CREATE POLICY "clients_insert_policy"
  ON clients FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by AND auth.uid() IS NOT NULL);

CREATE POLICY "clients_update_policy"
  ON clients FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "clients_delete_policy"
  ON clients FOR DELETE TO authenticated USING (true);

-- -----------------------------------------------------
-- TABLE: contacts (team_shared)
-- -----------------------------------------------------
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contacts_select_policy" ON contacts;
DROP POLICY IF EXISTS "contacts_insert_policy" ON contacts;
DROP POLICY IF EXISTS "contacts_update_policy" ON contacts;
DROP POLICY IF EXISTS "contacts_delete_policy" ON contacts;

CREATE POLICY "contacts_select_policy"
  ON contacts FOR SELECT TO authenticated USING (true);

CREATE POLICY "contacts_insert_policy"
  ON contacts FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM clients WHERE clients.id = contacts.client_id)
  );

CREATE POLICY "contacts_update_policy"
  ON contacts FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "contacts_delete_policy"
  ON contacts FOR DELETE TO authenticated USING (true);

-- -----------------------------------------------------
-- TABLE: opportunities (team_shared)
-- -----------------------------------------------------
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "opportunities_select_policy" ON opportunities;
DROP POLICY IF EXISTS "opportunities_insert_policy" ON opportunities;
DROP POLICY IF EXISTS "opportunities_update_policy" ON opportunities;
DROP POLICY IF EXISTS "opportunities_delete_policy" ON opportunities;

CREATE POLICY "opportunities_select_policy"
  ON opportunities FOR SELECT TO authenticated USING (true);

CREATE POLICY "opportunities_insert_policy"
  ON opportunities FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM clients WHERE clients.id = opportunities.client_id) AND
    EXISTS (SELECT 1 FROM funnel_stages WHERE funnel_stages.id = opportunities.stage_id) AND
    (opportunities.assigned_to IS NULL OR
     EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = opportunities.assigned_to))
  );

CREATE POLICY "opportunities_update_policy"
  ON opportunities FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "opportunities_delete_policy"
  ON opportunities FOR DELETE TO authenticated USING (true);

-- -----------------------------------------------------
-- TABLE: funnels (admin_only - MVP fallback)
-- -----------------------------------------------------
ALTER TABLE funnels ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "funnels_select_policy" ON funnels;
DROP POLICY IF EXISTS "funnels_insert_policy" ON funnels;
DROP POLICY IF EXISTS "funnels_update_policy" ON funnels;
DROP POLICY IF EXISTS "funnels_delete_policy" ON funnels;

CREATE POLICY "funnels_select_policy"
  ON funnels FOR SELECT TO authenticated USING (true);

CREATE POLICY "funnels_insert_policy"
  ON funnels FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "funnels_update_policy"
  ON funnels FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "funnels_delete_policy"
  ON funnels FOR DELETE TO authenticated USING (true);

-- -----------------------------------------------------
-- TABLE: funnel_stages (admin_only - MVP fallback)
-- -----------------------------------------------------
ALTER TABLE funnel_stages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "funnel_stages_select_policy" ON funnel_stages;
DROP POLICY IF EXISTS "funnel_stages_insert_policy" ON funnel_stages;
DROP POLICY IF EXISTS "funnel_stages_update_policy" ON funnel_stages;
DROP POLICY IF EXISTS "funnel_stages_delete_policy" ON funnel_stages;

CREATE POLICY "funnel_stages_select_policy"
  ON funnel_stages FOR SELECT TO authenticated USING (true);

CREATE POLICY "funnel_stages_insert_policy"
  ON funnel_stages FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM funnels WHERE funnels.id = funnel_stages.funnel_id)
  );

CREATE POLICY "funnel_stages_update_policy"
  ON funnel_stages FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "funnel_stages_delete_policy"
  ON funnel_stages FOR DELETE TO authenticated
  USING (
    NOT EXISTS (
      SELECT 1 FROM opportunities WHERE opportunities.stage_id = funnel_stages.id
    )
  );

-- -----------------------------------------------------
-- TABLE: products (admin_only - MVP fallback)
-- -----------------------------------------------------
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "products_select_policy" ON products;
DROP POLICY IF EXISTS "products_insert_policy" ON products;
DROP POLICY IF EXISTS "products_update_policy" ON products;
DROP POLICY IF EXISTS "products_delete_policy" ON products;

CREATE POLICY "products_select_policy"
  ON products FOR SELECT TO authenticated USING (true);

CREATE POLICY "products_insert_policy"
  ON products FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "products_update_policy"
  ON products FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "products_delete_policy"
  ON products FOR DELETE TO authenticated USING (true);

-- -----------------------------------------------------
-- TABLE: tasks (owner_only)
-- -----------------------------------------------------
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "tasks_select_policy" ON tasks;
DROP POLICY IF EXISTS "tasks_insert_policy" ON tasks;
DROP POLICY IF EXISTS "tasks_update_policy" ON tasks;
DROP POLICY IF EXISTS "tasks_delete_policy" ON tasks;

CREATE POLICY "tasks_select_policy"
  ON tasks FOR SELECT TO authenticated
  USING (auth.uid() = assigned_to OR auth.uid() = created_by);

CREATE POLICY "tasks_insert_policy"
  ON tasks FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = created_by AND
    (opportunity_id IS NULL OR
     EXISTS (SELECT 1 FROM opportunities WHERE opportunities.id = tasks.opportunity_id)) AND
    (assigned_to IS NULL OR
     EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = tasks.assigned_to))
  );

CREATE POLICY "tasks_update_policy"
  ON tasks FOR UPDATE TO authenticated
  USING (auth.uid() = assigned_to OR auth.uid() = created_by)
  WITH CHECK (auth.uid() = assigned_to OR auth.uid() = created_by);

CREATE POLICY "tasks_delete_policy"
  ON tasks FOR DELETE TO authenticated
  USING (auth.uid() = assigned_to OR auth.uid() = created_by);

CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_created_by ON tasks(created_by);

-- -----------------------------------------------------
-- TABLE: quotations (owner_only)
-- -----------------------------------------------------
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "quotations_select_policy" ON quotations;
DROP POLICY IF EXISTS "quotations_insert_policy" ON quotations;
DROP POLICY IF EXISTS "quotations_update_policy" ON quotations;
DROP POLICY IF EXISTS "quotations_delete_policy" ON quotations;

CREATE POLICY "quotations_select_policy"
  ON quotations FOR SELECT TO authenticated
  USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = quotations.opportunity_id
      AND opportunities.assigned_to = auth.uid()
    )
  );

CREATE POLICY "quotations_insert_policy"
  ON quotations FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (SELECT 1 FROM opportunities WHERE opportunities.id = quotations.opportunity_id)
  );

CREATE POLICY "quotations_update_policy"
  ON quotations FOR UPDATE TO authenticated
  USING (auth.uid() = created_by AND status = 'draft')
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "quotations_delete_policy"
  ON quotations FOR DELETE TO authenticated
  USING (auth.uid() = created_by AND status = 'draft');

CREATE INDEX IF NOT EXISTS idx_quotations_created_by ON quotations(created_by);
CREATE INDEX IF NOT EXISTS idx_quotations_opportunity_id ON quotations(opportunity_id);

-- -----------------------------------------------------
-- TABLE: notes (immutable)
-- -----------------------------------------------------
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "notes_select_policy" ON notes;
DROP POLICY IF EXISTS "notes_insert_policy" ON notes;

CREATE POLICY "notes_select_policy"
  ON notes FOR SELECT TO authenticated USING (true);

CREATE POLICY "notes_insert_policy"
  ON notes FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (SELECT 1 FROM opportunities WHERE opportunities.id = notes.opportunity_id)
  );

-- Trigger for auto-update created_by
CREATE OR REPLACE FUNCTION set_created_by()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.created_by IS NULL THEN
    NEW.created_by = auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS set_notes_created_by ON notes;

CREATE TRIGGER set_notes_created_by
  BEFORE INSERT ON notes
  FOR EACH ROW
  EXECUTE FUNCTION set_created_by();

CREATE INDEX IF NOT EXISTS idx_notes_opportunity_id ON notes(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_notes_created_by ON notes(created_by);
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at DESC);

-- -----------------------------------------------------
-- TABLE: emails_sent (immutable)
-- -----------------------------------------------------
ALTER TABLE emails_sent ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "emails_sent_select_policy" ON emails_sent;
DROP POLICY IF EXISTS "emails_sent_insert_policy" ON emails_sent;

CREATE POLICY "emails_sent_select_policy"
  ON emails_sent FOR SELECT TO authenticated
  USING (
    auth.uid() = sent_by OR
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = emails_sent.opportunity_id
      AND opportunities.assigned_to = auth.uid()
    )
  );

CREATE POLICY "emails_sent_insert_policy"
  ON emails_sent FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = sent_by AND
    EXISTS (SELECT 1 FROM opportunities WHERE opportunities.id = emails_sent.opportunity_id)
  );

-- -----------------------------------------------------
-- TABLE: opportunity_products (team_shared)
-- -----------------------------------------------------
ALTER TABLE opportunity_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "opportunity_products_select_policy" ON opportunity_products;
DROP POLICY IF EXISTS "opportunity_products_insert_policy" ON opportunity_products;
DROP POLICY IF EXISTS "opportunity_products_update_policy" ON opportunity_products;
DROP POLICY IF EXISTS "opportunity_products_delete_policy" ON opportunity_products;

CREATE POLICY "opportunity_products_select_policy"
  ON opportunity_products FOR SELECT TO authenticated USING (true);

CREATE POLICY "opportunity_products_insert_policy"
  ON opportunity_products FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM opportunities WHERE opportunities.id = opportunity_products.opportunity_id) AND
    EXISTS (SELECT 1 FROM products WHERE products.id = opportunity_products.product_id) AND
    quantity > 0
  );

CREATE POLICY "opportunity_products_update_policy"
  ON opportunity_products FOR UPDATE TO authenticated
  USING (true) WITH CHECK (quantity > 0);

CREATE POLICY "opportunity_products_delete_policy"
  ON opportunity_products FOR DELETE TO authenticated USING (true);

-- =====================================================
-- PART 3: STORAGE BUCKETS + POLICIES
-- =====================================================

-- Create buckets (idempotent)
INSERT INTO storage.buckets (id, name, public)
VALUES ('pdfs', 'pdfs', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('attachments', 'attachments', false)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies
DROP POLICY IF EXISTS "pdfs_select_policy" ON storage.objects;
DROP POLICY IF EXISTS "pdfs_insert_policy" ON storage.objects;
DROP POLICY IF EXISTS "pdfs_delete_policy" ON storage.objects;
DROP POLICY IF EXISTS "attachments_select_policy" ON storage.objects;
DROP POLICY IF EXISTS "attachments_insert_policy" ON storage.objects;
DROP POLICY IF EXISTS "attachments_update_policy" ON storage.objects;
DROP POLICY IF EXISTS "attachments_delete_policy" ON storage.objects;

-- PDFs bucket policies
CREATE POLICY "pdfs_select_policy"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'pdfs' AND
    (auth.uid()::text = owner::text OR
     EXISTS (
       SELECT 1 FROM quotations
       JOIN opportunities ON opportunities.id = quotations.opportunity_id
       WHERE quotations.id::text = SPLIT_PART(storage.objects.name, '/', 2) AND
       (opportunities.assigned_to = auth.uid() OR quotations.created_by = auth.uid())
     ))
  );

CREATE POLICY "pdfs_insert_policy"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'pdfs' AND auth.uid()::text = owner::text);

CREATE POLICY "pdfs_delete_policy"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'pdfs' AND
    (auth.uid()::text = owner::text OR
     EXISTS (
       SELECT 1 FROM quotations
       WHERE quotations.id::text = SPLIT_PART(storage.objects.name, '/', 2) AND
       quotations.created_by = auth.uid()
     ))
  );

-- Attachments bucket policies
CREATE POLICY "attachments_select_policy"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'attachments');

CREATE POLICY "attachments_insert_policy"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'attachments' AND
    auth.uid()::text = owner::text AND
    array_length(string_to_array(name, '/'), 1) >= 3
  );

CREATE POLICY "attachments_update_policy"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'attachments' AND auth.uid()::text = owner::text);

CREATE POLICY "attachments_delete_policy"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'attachments' AND
    (auth.uid()::text = owner::text OR
     EXISTS (
       SELECT 1 FROM opportunities
       WHERE opportunities.id::text = SPLIT_PART(storage.objects.name, '/', 2) AND
       opportunities.assigned_to = auth.uid()
     ))
  );

-- =====================================================
-- SUCCESS!
-- =====================================================
-- All tables created (if not exist)
-- All RLS policies applied
-- All Storage buckets + policies configured
--
-- Next steps:
-- 1. Verify: SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
-- 2. Start implementing stories: implement story 3.1
-- =====================================================
