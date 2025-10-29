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
