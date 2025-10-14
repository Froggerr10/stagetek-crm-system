-- =====================================================
-- STAGETEK CRM - Storage Policies for Quotation PDFs
-- Version: 1.0
-- Date: 13/Oct/2025
-- Sprint 0: Storage Security
-- =====================================================

-- =====================================================
-- 1. CREATE BUCKET (if not exists)
-- =====================================================
-- Note: This is typically done via Supabase Dashboard or CLI
-- But we can attempt via SQL if storage.buckets is accessible

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'quotation-pdfs',
  'quotation-pdfs',
  FALSE, -- Private bucket
  5242880, -- 5MB max per file
  ARRAY['application/pdf']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. STORAGE POLICIES - Upload
-- =====================================================

-- Policy: Authenticated users can upload PDFs to their own folder
CREATE POLICY "users_can_upload_own_pdfs"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'quotation-pdfs'
    AND auth.uid() IS NOT NULL
    AND (storage.foldername(name))[1] = auth.uid()::TEXT
  );

-- =====================================================
-- 3. STORAGE POLICIES - Select (Download)
-- =====================================================

-- Policy: Users can download their own PDFs
CREATE POLICY "users_can_download_own_pdfs"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'quotation-pdfs'
    AND auth.uid() IS NOT NULL
    AND (storage.foldername(name))[1] = auth.uid()::TEXT
  );

-- =====================================================
-- 4. STORAGE POLICIES - Update (Rename)
-- =====================================================

-- Policy: Users can update (rename) their own PDFs
CREATE POLICY "users_can_update_own_pdfs"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'quotation-pdfs'
    AND auth.uid() IS NOT NULL
    AND (storage.foldername(name))[1] = auth.uid()::TEXT
  );

-- =====================================================
-- 5. STORAGE POLICIES - Delete
-- =====================================================

-- Policy: Users can delete their own PDFs
CREATE POLICY "users_can_delete_own_pdfs"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'quotation-pdfs'
    AND auth.uid() IS NOT NULL
    AND (storage.foldername(name))[1] = auth.uid()::TEXT
  );

-- =====================================================
-- 6. HELPER FUNCTION - Generate Signed URL
-- =====================================================

-- Function to generate signed URLs (1 hour expiration)
-- Usage: SELECT generate_quotation_signed_url('user-id', 'QT-2025-001.pdf');

CREATE OR REPLACE FUNCTION generate_quotation_signed_url(
  user_id_param UUID,
  filename_param TEXT
)
RETURNS TEXT AS $$
DECLARE
  bucket_name TEXT := 'quotation-pdfs';
  file_path TEXT;
  signed_url TEXT;
BEGIN
  -- Construct full path
  file_path := user_id_param::TEXT || '/' || filename_param;

  -- Note: This is a placeholder - actual signed URL generation
  -- must be done via Supabase client in application code
  -- This function is for documentation purposes

  RETURN 'Use supabase.storage.from(''' || bucket_name || ''').createSignedUrl(''' || file_path || ''', 3600)';
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 7. CLEANUP FUNCTION - Delete old PDFs (cold storage)
-- =====================================================

-- Function to identify PDFs older than 30 days
-- To be called by Supabase Edge Function (cron daily)

CREATE OR REPLACE FUNCTION get_old_quotation_pdfs(days_old INTEGER DEFAULT 30)
RETURNS TABLE (
  file_path TEXT,
  created_at TIMESTAMPTZ,
  file_size BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    name AS file_path,
    created_at,
    metadata->>'size' AS file_size
  FROM storage.objects
  WHERE bucket_id = 'quotation-pdfs'
    AND created_at < NOW() - (days_old || ' days')::INTERVAL
  ORDER BY created_at ASC;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 8. MONITORING - Storage usage alert
-- =====================================================

-- Function to check if storage is approaching limits
-- Supabase Free: 2GB total

CREATE OR REPLACE FUNCTION check_storage_usage()
RETURNS TABLE (
  bucket_name TEXT,
  total_size_mb NUMERIC,
  file_count BIGINT,
  usage_percent NUMERIC
) AS $$
DECLARE
  total_storage_limit_mb NUMERIC := 2048; -- 2GB in MB
BEGIN
  RETURN QUERY
  SELECT
    bucket_id AS bucket_name,
    ROUND(SUM((metadata->>'size')::BIGINT) / 1024.0 / 1024.0, 2) AS total_size_mb,
    COUNT(*) AS file_count,
    ROUND((SUM((metadata->>'size')::BIGINT) / 1024.0 / 1024.0 / total_storage_limit_mb) * 100, 2) AS usage_percent
  FROM storage.objects
  WHERE bucket_id = 'quotation-pdfs'
  GROUP BY bucket_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- DONE! Storage policies configuradas
-- =====================================================
-- Folder structure:
--   quotation-pdfs/
--   ├── {user_id_1}/
--   │   ├── QT-2025-001.pdf
--   │   ├── QT-2025-002.pdf
--   │   └── ...
--   ├── {user_id_2}/
--   │   ├── QT-2025-003.pdf
--   │   └── ...
--
-- Usage in application:
--   // Upload
--   const filePath = `${userId}/QT-2025-001.pdf`
--   const { data, error } = await supabase.storage
--     .from('quotation-pdfs')
--     .upload(filePath, pdfFile)
--
--   // Download (signed URL)
--   const { data, error } = await supabase.storage
--     .from('quotation-pdfs')
--     .createSignedUrl(filePath, 3600) // 1 hour
--
--   // Check usage
--   SELECT * FROM check_storage_usage();
--
--   // Get old PDFs (for archiving)
--   SELECT * FROM get_old_quotation_pdfs(30);
-- =====================================================
