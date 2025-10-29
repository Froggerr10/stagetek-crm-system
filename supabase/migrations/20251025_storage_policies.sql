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
