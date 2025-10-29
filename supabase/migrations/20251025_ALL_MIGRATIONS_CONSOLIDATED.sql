-- =====================================================
-- RLS Policies: Team Shared Tables
-- Security Model: team_shared (single-tenant B2B)
-- Generated: 25 Outubro 2025
-- Tables: clients, contacts, opportunities
-- =====================================================
--
-- STAGETEK CRM tem 5 usuários máximo (uso interno).
-- Modelo single-tenant: todos usuários autenticados
-- acessam TODOS os dados (não há isolamento por owner).
--
-- =====================================================

-- =====================================================
-- TABLE: clients
-- =====================================================

-- Enable RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (idempotent)
DROP POLICY IF EXISTS "clients_select_policy" ON clients;
DROP POLICY IF EXISTS "clients_insert_policy" ON clients;
DROP POLICY IF EXISTS "clients_update_policy" ON clients;
DROP POLICY IF EXISTS "clients_delete_policy" ON clients;

-- SELECT (todos usuários autenticados)
CREATE POLICY "clients_select_policy"
  ON clients FOR SELECT
  TO authenticated
  USING (true);

-- INSERT (todos usuários autenticados)
CREATE POLICY "clients_insert_policy"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = created_by AND
    auth.uid() IS NOT NULL
  );

-- UPDATE (todos usuários autenticados)
CREATE POLICY "clients_update_policy"
  ON clients FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- DELETE (todos usuários autenticados)
CREATE POLICY "clients_delete_policy"
  ON clients FOR DELETE
  TO authenticated
  USING (true);

-- =====================================================
-- TABLE: contacts
-- =====================================================

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (idempotent)
DROP POLICY IF EXISTS "contacts_select_policy" ON contacts;
DROP POLICY IF EXISTS "contacts_insert_policy" ON contacts;
DROP POLICY IF EXISTS "contacts_update_policy" ON contacts;
DROP POLICY IF EXISTS "contacts_delete_policy" ON contacts;

-- SELECT (todos usuários autenticados)
CREATE POLICY "contacts_select_policy"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- INSERT (todos usuários autenticados, valida client_id existe)
CREATE POLICY "contacts_insert_policy"
  ON contacts FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = contacts.client_id
    )
  );

-- UPDATE (todos usuários autenticados)
CREATE POLICY "contacts_update_policy"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- DELETE (todos usuários autenticados)
CREATE POLICY "contacts_delete_policy"
  ON contacts FOR DELETE
  TO authenticated
  USING (true);

-- =====================================================
-- TABLE: opportunities
-- =====================================================

-- Enable RLS
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (idempotent)
DROP POLICY IF EXISTS "opportunities_select_policy" ON opportunities;
DROP POLICY IF EXISTS "opportunities_insert_policy" ON opportunities;
DROP POLICY IF EXISTS "opportunities_update_policy" ON opportunities;
DROP POLICY IF EXISTS "opportunities_delete_policy" ON opportunities;

-- SELECT (todos usuários autenticados)
CREATE POLICY "opportunities_select_policy"
  ON opportunities FOR SELECT
  TO authenticated
  USING (true);

-- INSERT (todos usuários autenticados, valida FKs)
CREATE POLICY "opportunities_insert_policy"
  ON opportunities FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Validar client_id existe
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = opportunities.client_id
    ) AND
    -- Validar stage_id existe
    EXISTS (
      SELECT 1 FROM funnel_stages
      WHERE funnel_stages.id = opportunities.stage_id
    ) AND
    -- Validar assigned_to é usuário válido
    (
      opportunities.assigned_to IS NULL OR
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = opportunities.assigned_to
      )
    )
  );

-- UPDATE (todos usuários autenticados)
CREATE POLICY "opportunities_update_policy"
  ON opportunities FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- DELETE (todos usuários autenticados)
CREATE POLICY "opportunities_delete_policy"
  ON opportunities FOR DELETE
  TO authenticated
  USING (true);

-- =====================================================
-- Testing Guide
-- =====================================================
-- 1. Login as user A: test@stagetek.com
-- 2. SELECT clients: Should see ALL clients (team-shared)
-- 3. INSERT client: Should succeed
-- 4. UPDATE client (created by user B): Should succeed (team-shared)
-- 5. DELETE client (created by user B): Should succeed (team-shared)
-- 6. Repeat for contacts, opportunities
--
-- Expected: ZERO isolation between users (single-tenant model)
-- =====================================================

-- =====================================================
-- Performance Indexes (Recommended)
-- =====================================================
-- Already exist:
-- - idx_clients_cnpj
-- - idx_clients_status
-- - idx_opportunities_client_id
-- - idx_opportunities_stage_id
-- - idx_contacts_client_id
-- =====================================================
-- =====================================================
-- RLS Policies: Admin Only Tables
-- Security Model: admin_only
-- Generated: 25 Outubro 2025
-- Tables: funnels, funnel_stages, products
-- =====================================================
--
-- APENAS usuários com role 'admin' podem modificar.
-- Todos usuários autenticados podem LER (SELECT).
--
-- IMPORTANT: Supabase Auth não tem role por padrão.
-- Solução: Usar table `user_roles` ou metadata JSON.
--
-- Para MVP: Usar fallback (todos podem modificar).
-- TODO P1: Implementar role-based access control.
--
-- =====================================================

-- =====================================================
-- TABLE: funnels (Funis de vendas)
-- =====================================================

-- Enable RLS
ALTER TABLE funnels ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (idempotent)
DROP POLICY IF EXISTS "funnels_select_policy" ON funnels;
DROP POLICY IF EXISTS "funnels_insert_policy" ON funnels;
DROP POLICY IF EXISTS "funnels_update_policy" ON funnels;
DROP POLICY IF EXISTS "funnels_delete_policy" ON funnels;

-- SELECT (todos usuários autenticados podem ler)
CREATE POLICY "funnels_select_policy"
  ON funnels FOR SELECT
  TO authenticated
  USING (true);

-- INSERT (apenas autenticados - MVP fallback)
-- TODO P1: Adicionar check de role admin
CREATE POLICY "funnels_insert_policy"
  ON funnels FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- UPDATE (apenas autenticados - MVP fallback)
-- TODO P1: Adicionar check de role admin
CREATE POLICY "funnels_update_policy"
  ON funnels FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- DELETE (apenas autenticados - MVP fallback)
-- TODO P1: Adicionar check de role admin
CREATE POLICY "funnels_delete_policy"
  ON funnels FOR DELETE
  TO authenticated
  USING (true);

-- =====================================================
-- TABLE: funnel_stages (Etapas de funis)
-- =====================================================

-- Enable RLS
ALTER TABLE funnel_stages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (idempotent)
DROP POLICY IF EXISTS "funnel_stages_select_policy" ON funnel_stages;
DROP POLICY IF EXISTS "funnel_stages_insert_policy" ON funnel_stages;
DROP POLICY IF EXISTS "funnel_stages_update_policy" ON funnel_stages;
DROP POLICY IF EXISTS "funnel_stages_delete_policy" ON funnel_stages;

-- SELECT (todos usuários autenticados podem ler)
CREATE POLICY "funnel_stages_select_policy"
  ON funnel_stages FOR SELECT
  TO authenticated
  USING (true);

-- INSERT (apenas autenticados, valida funnel_id existe)
CREATE POLICY "funnel_stages_insert_policy"
  ON funnel_stages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM funnels
      WHERE funnels.id = funnel_stages.funnel_id
    )
  );

-- UPDATE (apenas autenticados - MVP fallback)
CREATE POLICY "funnel_stages_update_policy"
  ON funnel_stages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- DELETE (BLOQUEADO - stages não devem ser deletadas se há oportunidades)
-- MVP: Permitir delete (soft delete seria ideal)
CREATE POLICY "funnel_stages_delete_policy"
  ON funnel_stages FOR DELETE
  TO authenticated
  USING (
    -- Apenas deletar se não há oportunidades vinculadas
    NOT EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.stage_id = funnel_stages.id
    )
  );

-- =====================================================
-- TABLE: products (Catálogo de produtos)
-- =====================================================

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (idempotent)
DROP POLICY IF EXISTS "products_select_policy" ON products;
DROP POLICY IF EXISTS "products_insert_policy" ON products;
DROP POLICY IF EXISTS "products_update_policy" ON products;
DROP POLICY IF EXISTS "products_delete_policy" ON products;

-- SELECT (todos usuários autenticados podem ler)
CREATE POLICY "products_select_policy"
  ON products FOR SELECT
  TO authenticated
  USING (true);

-- INSERT (apenas autenticados - MVP fallback)
-- TODO P1: Adicionar check de role admin
CREATE POLICY "products_insert_policy"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- UPDATE (apenas autenticados - MVP fallback)
-- TODO P1: Adicionar check de role admin
CREATE POLICY "products_update_policy"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- DELETE (apenas autenticados - MVP fallback)
-- TODO P1: Apenas deletar se não há quotations vinculadas
CREATE POLICY "products_delete_policy"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- =====================================================
-- Testing Guide
-- =====================================================
-- 1. Login as regular user: test@stagetek.com
-- 2. SELECT funnels: Should see all funnels ✅
-- 3. INSERT funnel: Should succeed (MVP fallback) ⚠️
-- 4. UPDATE funnel: Should succeed (MVP fallback) ⚠️
-- 5. DELETE funnel: Should succeed (MVP fallback) ⚠️
--
-- TODO P1: Criar table user_roles + adicionar checks
-- =====================================================

-- =====================================================
-- Future Enhancement: Role-Based Access Control
-- =====================================================
-- CREATE TABLE user_roles (
--   user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
--   role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user')),
--   created_at TIMESTAMPTZ DEFAULT NOW()
-- );
--
-- ALTER POLICY "funnels_insert_policy" ...
-- WITH CHECK (
--   EXISTS (
--     SELECT 1 FROM user_roles
--     WHERE user_roles.user_id = auth.uid()
--     AND user_roles.role = 'admin'
--   )
-- );
-- =====================================================
-- =====================================================
-- RLS Policies: Owner Only Tables
-- Security Model: owner_only
-- Generated: 25 Outubro 2025
-- Tables: tasks, quotations
-- =====================================================
--
-- User só acessa SEUS próprios dados.
-- Ex: tasks (assigned_to), quotations (created_by)
--
-- =====================================================

-- =====================================================
-- TABLE: tasks
-- Owner Column: assigned_to
-- =====================================================

-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (idempotent)
DROP POLICY IF EXISTS "tasks_select_policy" ON tasks;
DROP POLICY IF EXISTS "tasks_insert_policy" ON tasks;
DROP POLICY IF EXISTS "tasks_update_policy" ON tasks;
DROP POLICY IF EXISTS "tasks_delete_policy" ON tasks;

-- SELECT (apenas own tasks)
CREATE POLICY "tasks_select_policy"
  ON tasks FOR SELECT
  TO authenticated
  USING (
    auth.uid() = assigned_to OR
    auth.uid() = created_by
  );

-- INSERT (apenas autenticados, pode criar task para qualquer user)
CREATE POLICY "tasks_insert_policy"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = created_by AND
    -- Validar opportunity_id existe (se fornecido)
    (
      opportunity_id IS NULL OR
      EXISTS (
        SELECT 1 FROM opportunities
        WHERE opportunities.id = tasks.opportunity_id
      )
    ) AND
    -- Validar assigned_to é usuário válido
    (
      assigned_to IS NULL OR
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = tasks.assigned_to
      )
    )
  );

-- UPDATE (apenas own tasks ou creator)
CREATE POLICY "tasks_update_policy"
  ON tasks FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = assigned_to OR
    auth.uid() = created_by
  )
  WITH CHECK (
    auth.uid() = assigned_to OR
    auth.uid() = created_by
  );

-- DELETE (apenas own tasks ou creator)
CREATE POLICY "tasks_delete_policy"
  ON tasks FOR DELETE
  TO authenticated
  USING (
    auth.uid() = assigned_to OR
    auth.uid() = created_by
  );

-- =====================================================
-- TABLE: quotations
-- Owner Column: created_by
-- =====================================================

-- Enable RLS
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (idempotent)
DROP POLICY IF EXISTS "quotations_select_policy" ON quotations;
DROP POLICY IF EXISTS "quotations_insert_policy" ON quotations;
DROP POLICY IF EXISTS "quotations_update_policy" ON quotations;
DROP POLICY IF EXISTS "quotations_delete_policy" ON quotations;

-- SELECT (apenas own quotations OU responsável da oportunidade)
CREATE POLICY "quotations_select_policy"
  ON quotations FOR SELECT
  TO authenticated
  USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = quotations.opportunity_id
      AND opportunities.assigned_to = auth.uid()
    )
  );

-- INSERT (apenas autenticados, valida opportunity_id)
CREATE POLICY "quotations_insert_policy"
  ON quotations FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = created_by AND
    -- Validar opportunity_id existe
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = quotations.opportunity_id
    )
  );

-- UPDATE (apenas own quotations, apenas status draft)
CREATE POLICY "quotations_update_policy"
  ON quotations FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = created_by AND
    status = 'draft'
  )
  WITH CHECK (
    auth.uid() = created_by
  );

-- DELETE (apenas own quotations, apenas status draft)
CREATE POLICY "quotations_delete_policy"
  ON quotations FOR DELETE
  TO authenticated
  USING (
    auth.uid() = created_by AND
    status = 'draft'
  );

-- =====================================================
-- Testing Guide: tasks
-- =====================================================
-- 1. Login as user A: alice@stagetek.com
-- 2. INSERT task assigned_to=user B: Should succeed ✅
-- 3. SELECT task (assigned to user B): Should NOT see ❌
-- 4. Login as user B
-- 5. SELECT task: Should see ✅ (assigned_to = user B)
-- 6. UPDATE task: Should succeed ✅
-- 7. DELETE task: Should succeed ✅
-- 8. Login as user A (creator)
-- 9. UPDATE task (created by A, assigned to B): Should succeed ✅
-- =====================================================

-- =====================================================
-- Testing Guide: quotations
-- =====================================================
-- 1. Login as user A: alice@stagetek.com
-- 2. INSERT quotation (opportunity owned by user A): Should succeed ✅
-- 3. SELECT quotation: Should see ✅ (created_by = user A)
-- 4. UPDATE quotation (status=draft): Should succeed ✅
-- 5. UPDATE quotation status → 'sent'
-- 6. UPDATE quotation (status=sent): Should FAIL ❌ (immutable after sent)
-- 7. Login as user B
-- 8. SELECT quotation (created by user A): Should NOT see ❌
-- 9. UNLESS user B is assigned_to opportunity
-- =====================================================

-- =====================================================
-- Performance Indexes (Recommended)
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_created_by ON tasks(created_by);
CREATE INDEX IF NOT EXISTS idx_quotations_created_by ON quotations(created_by);
CREATE INDEX IF NOT EXISTS idx_quotations_opportunity_id ON quotations(opportunity_id);
-- =====================================================
-- =====================================================
-- RLS Policies: Immutable Audit Trail
-- Security Model: immutable (INSERT only)
-- Generated: 25 Outubro 2025
-- Table: notes
-- =====================================================
--
-- INSERT permitido, UPDATE/DELETE bloqueado.
-- Use case: Audit trail completo (notas nunca são editadas).
--
-- =====================================================

-- =====================================================
-- TABLE: notes (Anotações imutáveis)
-- =====================================================

-- Enable RLS
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (idempotent)
DROP POLICY IF EXISTS "notes_select_policy" ON notes;
DROP POLICY IF EXISTS "notes_insert_policy" ON notes;
DROP POLICY IF EXISTS "notes_update_policy" ON notes;
DROP POLICY IF EXISTS "notes_delete_policy" ON notes;

-- SELECT (todos usuários autenticados podem ler)
CREATE POLICY "notes_select_policy"
  ON notes FOR SELECT
  TO authenticated
  USING (true);

-- INSERT (apenas autenticados, valida opportunity_id)
CREATE POLICY "notes_insert_policy"
  ON notes FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = created_by AND
    -- Validar opportunity_id existe
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = notes.opportunity_id
    )
  );

-- UPDATE (BLOQUEADO - immutable)
-- Não criar policy = operação bloqueada

-- DELETE (BLOQUEADO - immutable)
-- Não criar policy = operação bloqueada

-- =====================================================
-- Testing Guide
-- =====================================================
-- 1. Login as user A: alice@stagetek.com
-- 2. INSERT note on opportunity: Should succeed ✅
-- 3. SELECT note: Should see ✅
-- 4. UPDATE note: Should FAIL ❌ (immutable)
-- 5. DELETE note: Should FAIL ❌ (immutable)
-- 6. Login as user B
-- 7. SELECT note (created by user A): Should see ✅ (team-shared read)
-- 8. UPDATE note: Should FAIL ❌ (immutable)
--
-- Expected: Notes são WRITE-ONCE, READ-MANY
-- =====================================================

-- =====================================================
-- Trigger: Auto-update created_by (se não fornecido)
-- =====================================================
CREATE OR REPLACE FUNCTION set_created_by()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.created_by IS NULL THEN
    NEW.created_by = auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists
DROP TRIGGER IF EXISTS set_notes_created_by ON notes;

-- Create trigger
CREATE TRIGGER set_notes_created_by
  BEFORE INSERT ON notes
  FOR EACH ROW
  EXECUTE FUNCTION set_created_by();

-- =====================================================
-- Performance Indexes (Recommended)
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_notes_opportunity_id ON notes(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_notes_created_by ON notes(created_by);
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at DESC);
-- =====================================================

-- =====================================================
-- Future Enhancement: Soft Delete (if needed)
-- =====================================================
-- ALTER TABLE notes ADD COLUMN deleted_at TIMESTAMPTZ;
-- ALTER TABLE notes ADD COLUMN deleted_by UUID REFERENCES auth.users(id);
--
-- UPDATE SELECT policy:
-- USING (deleted_at IS NULL)
--
-- CREATE POLICY "notes_soft_delete_policy"
--   ON notes FOR UPDATE
--   TO authenticated
--   USING (
--     auth.uid() = created_by AND
--     deleted_at IS NULL
--   )
--   WITH CHECK (
--     -- Apenas permite UPDATE de deleted_at
--     deleted_at IS NOT NULL AND
--     deleted_by = auth.uid()
--   );
-- =====================================================
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
-- =====================================================
-- Storage Policies: Buckets (pdfs, attachments)
-- Generated: 25 Outubro 2025
-- Buckets: pdfs (quotations), attachments (Story 1.3)
-- =====================================================

-- =====================================================
-- BUCKET: pdfs (Quotation PDFs)
-- Path: quotations/{quotation_id}/{quotation_number}.pdf
-- Security: Owner-only OR opportunity assignee
-- =====================================================

-- Create bucket if not exists (idempotent)
INSERT INTO storage.buckets (id, name, public)
VALUES ('pdfs', 'pdfs', false)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies (idempotent)
DROP POLICY IF EXISTS "pdfs_select_policy" ON storage.objects;
DROP POLICY IF EXISTS "pdfs_insert_policy" ON storage.objects;
DROP POLICY IF EXISTS "pdfs_delete_policy" ON storage.objects;

-- SELECT (download) - owner OU responsável da oportunidade
CREATE POLICY "pdfs_select_policy"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'pdfs' AND
    (
      -- Owner do arquivo
      auth.uid()::text = owner::text OR
      -- Responsável da oportunidade (path format: quotations/{opportunity_id}/...)
      EXISTS (
        SELECT 1 FROM quotations
        JOIN opportunities ON opportunities.id = quotations.opportunity_id
        WHERE
          -- Extract opportunity_id from path (format: quotations/{uuid}/...)
          quotations.id::text = SPLIT_PART(storage.objects.name, '/', 2) AND
          (
            opportunities.assigned_to = auth.uid() OR
            quotations.created_by = auth.uid()
          )
      )
    )
  );

-- INSERT (upload) - authenticated users
CREATE POLICY "pdfs_insert_policy"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'pdfs' AND
    auth.uid()::text = owner::text
  );

-- DELETE - owner do arquivo OU creator da cotação
CREATE POLICY "pdfs_delete_policy"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'pdfs' AND
    (
      auth.uid()::text = owner::text OR
      EXISTS (
        SELECT 1 FROM quotations
        WHERE
          quotations.id::text = SPLIT_PART(storage.objects.name, '/', 2) AND
          quotations.created_by = auth.uid()
      )
    )
  );

-- =====================================================
-- BUCKET: attachments (Story 1.3 - Arquivos gerais)
-- Path: attachments/{opportunity_id}/{filename}
-- Security: Team-shared (todos podem upload/download)
-- =====================================================

-- Create bucket if not exists (idempotent)
INSERT INTO storage.buckets (id, name, public)
VALUES ('attachments', 'attachments', false)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies (idempotent)
DROP POLICY IF EXISTS "attachments_select_policy" ON storage.objects;
DROP POLICY IF EXISTS "attachments_insert_policy" ON storage.objects;
DROP POLICY IF EXISTS "attachments_update_policy" ON storage.objects;
DROP POLICY IF EXISTS "attachments_delete_policy" ON storage.objects;

-- SELECT (download) - authenticated users (team-shared)
CREATE POLICY "attachments_select_policy"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'attachments'
  );

-- INSERT (upload) - authenticated users, max 10MB
-- File size validation happens on client (constraint não disponível em RLS)
CREATE POLICY "attachments_insert_policy"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'attachments' AND
    auth.uid()::text = owner::text AND
    -- Path format validation: attachments/{uuid}/{filename}
    array_length(string_to_array(name, '/'), 1) >= 3
  );

-- UPDATE (metadata) - owner do arquivo
CREATE POLICY "attachments_update_policy"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'attachments' AND
    auth.uid()::text = owner::text
  );

-- DELETE - owner do arquivo OU responsável da oportunidade
CREATE POLICY "attachments_delete_policy"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'attachments' AND
    (
      auth.uid()::text = owner::text OR
      EXISTS (
        SELECT 1 FROM opportunities
        WHERE
          -- Extract opportunity_id from path (format: attachments/{uuid}/...)
          opportunities.id::text = SPLIT_PART(storage.objects.name, '/', 2) AND
          opportunities.assigned_to = auth.uid()
      )
    )
  );

-- =====================================================
-- Testing Guide: pdfs bucket
-- =====================================================
-- 1. Login as user A: alice@stagetek.com
-- 2. Upload PDF (opportunity owned by A): Should succeed ✅
-- 3. Download PDF: Should succeed ✅ (owner)
-- 4. Login as user B (assigned to opportunity)
-- 5. Download PDF: Should succeed ✅ (assignee)
-- 6. Delete PDF: Should FAIL ❌ (not owner)
-- 7. Login as user C (NOT assigned)
-- 8. Download PDF: Should FAIL ❌ (not authorized)
-- =====================================================

-- =====================================================
-- Testing Guide: attachments bucket
-- =====================================================
-- 1. Login as user A: alice@stagetek.com
-- 2. Upload file (path: attachments/{opp_id}/doc.pdf): Should succeed ✅
-- 3. Download file: Should succeed ✅ (team-shared)
-- 4. Login as user B
-- 5. Download file: Should succeed ✅ (team-shared)
-- 6. Delete file (uploaded by A): Should FAIL ❌ (not owner)
-- 7. Login as user B (assigned to opportunity)
-- 8. Delete file: Should succeed ✅ (assignee can delete)
--
-- File size limit (10MB) validated on client via:
-- - Supabase JS SDK: storage.upload() options
-- - Client-side validation before upload
-- =====================================================

-- =====================================================
-- Client-Side File Upload Example (Story 1.3)
-- =====================================================
-- import { supabase } from '@/lib/supabase'
--
-- const uploadFile = async (opportunityId, file) => {
--   // Validate file size (10MB limit)
--   if (file.size > 10 * 1024 * 1024) {
--     throw new Error('File size exceeds 10MB limit')
--   }
--
--   // Path: attachments/{opportunity_id}/{filename}
--   const filePath = `attachments/${opportunityId}/${file.name}`
--
--   const { data, error } = await supabase.storage
--     .from('attachments')
--     .upload(filePath, file, {
--       cacheControl: '3600',
--       upsert: false // Fail if file exists
--     })
--
--   if (error) throw error
--   return data
-- }
-- =====================================================

-- =====================================================
-- Performance & Limits
-- =====================================================
-- Supabase Storage Free Tier:
-- - Storage: 2GB
-- - Bandwidth: 2GB/month
--
-- Recommendations:
-- 1. Implement file expiration (delete PDFs >90 days)
-- 2. Compress images before upload (client-side)
-- 3. Archive old attachments to cold storage (S3 Glacier)
--
-- Query signed URLs (1h expiration):
-- const { data } = await supabase.storage
--   .from('attachments')
--   .createSignedUrl(filePath, 3600) // 1 hour
-- =====================================================
