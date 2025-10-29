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
