-- =====================================================
-- FIX: Opportunities RLS for Drag-and-Drop
-- Date: 19 Nov 2025
-- Issue: Users cannot update stage_id (409 error)
-- =====================================================

-- Drop existing UPDATE policy
DROP POLICY IF EXISTS "opportunities_update_policy" ON opportunities;

-- Recreate UPDATE policy (allow all authenticated users)
-- Rationale: Small team (5 users), internal tool, all users need to move cards
CREATE POLICY "opportunities_update_policy"
  ON opportunities FOR UPDATE
  USING (
    auth.uid() IS NOT NULL
  );

-- Grant UPDATE permission to authenticated users (if not already granted)
GRANT UPDATE ON opportunities TO authenticated;

-- Verify policy is active
COMMENT ON POLICY "opportunities_update_policy" ON opportunities IS
  'Allow all authenticated users to update opportunities (small team, internal use)';
