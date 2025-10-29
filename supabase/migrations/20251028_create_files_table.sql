-- =====================================================
-- Create Files Table (Story 1.3: Tab Arquivos)
-- Generated: 28 Outubro 2025
-- Purpose: Track file attachments for opportunities
-- Security Model: team_shared (authenticated users)
-- =====================================================

CREATE TABLE IF NOT EXISTS files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL CHECK (file_size > 0 AND file_size <= 10485760), -- Max 10MB
  mime_type VARCHAR(100) NOT NULL,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_files_opportunity_id ON files(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_files_uploaded_by ON files(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_files_uploaded_at ON files(uploaded_at DESC);

-- Enable RLS
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- RLS Policies (team_shared pattern)

-- SELECT (todos usuários autenticados)
CREATE POLICY "files_select_policy"
  ON files FOR SELECT
  TO authenticated
  USING (true);

-- INSERT (authenticated users, validates FK)
CREATE POLICY "files_insert_policy"
  ON files FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = uploaded_by AND
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = files.opportunity_id
    ) AND
    file_size > 0 AND
    file_size <= 10485760 -- 10MB limit
  );

-- UPDATE (not allowed - immutable after upload)
-- Files should be deleted and re-uploaded if changes needed

-- DELETE (owner OR opportunity assignee)
CREATE POLICY "files_delete_policy"
  ON files FOR DELETE
  TO authenticated
  USING (
    auth.uid() = uploaded_by OR
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = files.opportunity_id
      AND opportunities.assigned_to = auth.uid()
    )
  );

COMMENT ON TABLE files IS 'File attachments for opportunities (Story 1.3). Team-shared read, owner/assignee delete.';

-- =====================================================
-- Testing Guide
-- =====================================================
-- 1. Login as user A: alice@stagetek.com
-- 2. INSERT file record (opportunity X): Should succeed ✅
-- 3. SELECT files for opportunity X: Should see ✅
-- 4. Login as user B
-- 5. SELECT files for opportunity X: Should see ✅ (team-shared)
-- 6. DELETE file (uploaded by A): Should FAIL ❌ (not owner)
-- 7. Login as user B (assigned to opportunity X)
-- 8. DELETE file: Should succeed ✅ (assignee can delete)
-- =====================================================
