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
