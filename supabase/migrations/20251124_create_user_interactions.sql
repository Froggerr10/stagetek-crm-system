-- =====================================================
-- Migration: User Interactions Tracking Table
-- Purpose: Capture user behavior for AI/analytics
-- Created: 24 Nov 2025
-- =====================================================

-- 1. CREATE TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS user_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User reference (nullable for anonymous tracking)
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Interaction metadata
  interaction_type VARCHAR(50) NOT NULL,
  content JSONB DEFAULT '{}'::jsonb,
  url_path VARCHAR(255),

  -- Additional context
  session_id VARCHAR(100), -- For grouping interactions in same session
  user_agent TEXT,         -- Browser/device info
  ip_address INET,         -- For geolocation (optional)

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. INDEXES FOR PERFORMANCE
-- =====================================================
-- Most common query: get interactions by user
CREATE INDEX idx_user_interactions_user_id
  ON user_interactions(user_id)
  WHERE user_id IS NOT NULL;

-- Query by type (e.g., all searches, all errors)
CREATE INDEX idx_user_interactions_type
  ON user_interactions(interaction_type);

-- Time-based queries (recent interactions, daily aggregates)
CREATE INDEX idx_user_interactions_created_at
  ON user_interactions(created_at DESC);

-- Session-based analysis
CREATE INDEX idx_user_interactions_session_id
  ON user_interactions(session_id)
  WHERE session_id IS NOT NULL;

-- JSONB content search (GIN index for fast JSONB queries)
CREATE INDEX idx_user_interactions_content_gin
  ON user_interactions USING GIN(content);

-- 3. RLS POLICIES
-- =====================================================
-- Enable RLS
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;

-- Policy 1: INSERT - Any authenticated user can log their own interactions
CREATE POLICY "users_insert_own_interactions"
  ON user_interactions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    OR user_id IS NULL -- Allow anonymous tracking
  );

-- Policy 2: SELECT - Only admins can read interaction data
CREATE POLICY "admins_select_all_interactions"
  ON user_interactions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy 3: UPDATE - Only admins (for data cleanup/correction)
CREATE POLICY "admins_update_interactions"
  ON user_interactions
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy 4: DELETE - Only admins (GDPR compliance, data retention)
CREATE POLICY "admins_delete_interactions"
  ON user_interactions
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- 4. HELPER FUNCTION (Optional) - Auto-cleanup old data
-- =====================================================
CREATE OR REPLACE FUNCTION cleanup_old_interactions()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Delete interactions older than 1 year (adjust as needed)
  DELETE FROM user_interactions
  WHERE created_at < now() - interval '1 year';
END;
$$;

-- 5. COMMENTS (Documentation)
-- =====================================================
COMMENT ON TABLE user_interactions IS 'Tracks user behavior for AI/analytics and UX optimization';
COMMENT ON COLUMN user_interactions.interaction_type IS 'Type of interaction: search_query, page_view, error_click, button_click, etc.';
COMMENT ON COLUMN user_interactions.content IS 'Flexible JSONB field for interaction-specific data (search terms, error details, etc.)';
COMMENT ON COLUMN user_interactions.url_path IS 'Page URL where interaction occurred';
COMMENT ON COLUMN user_interactions.session_id IS 'Browser session ID for grouping related interactions';

-- 6. SAMPLE DATA (For testing - remove in production)
-- =====================================================
-- INSERT INTO user_interactions (user_id, interaction_type, content, url_path) VALUES
-- (auth.uid(), 'search_query', '{"query": "cliente CNPJ", "results_count": 5}'::jsonb, '/clientes'),
-- (auth.uid(), 'page_view', '{"duration_ms": 15000}'::jsonb, '/dashboard'),
-- (auth.uid(), 'error_click', '{"error_message": "CNPJ inválido", "component": "ClienteModal"}'::jsonb, '/clientes');
