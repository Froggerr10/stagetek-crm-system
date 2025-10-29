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
