-- =====================================================
-- STAGETEK CRM - Clean Seed Data for Production
-- Version: 1.0
-- Date: 18/Nov/2025
-- Purpose: Remove development/test data before go-live
-- =====================================================

-- ⚠️ CRITICAL: This deletes ALL data created before 2025-11-19
-- Run this ONLY ONCE before users start using the system

-- =====================================================
-- PRESERVE: Essential catalog data (NEVER DELETE)
-- =====================================================
-- ✅ products (15 items catalog)
-- ✅ loss_reasons (15 predefined reasons)
-- ✅ funnels (default funnels)
-- ✅ funnel_stages (default stages)

-- =====================================================
-- DELETE: Test/Dev data created during development
-- =====================================================

-- Step 1: Delete test quotations and related data
DELETE FROM quotations
WHERE created_at < '2025-11-19 00:00:00+00';

-- Step 2: Delete test emails
DELETE FROM emails_sent
WHERE sent_at < '2025-11-19 00:00:00+00';

-- Step 3: Delete test files/attachments
DELETE FROM files
WHERE uploaded_at < '2025-11-19 00:00:00+00';

-- Step 4: Delete test notes
DELETE FROM notes
WHERE created_at < '2025-11-19 00:00:00+00';

-- Step 5: Delete test tasks
DELETE FROM tasks
WHERE created_at < '2025-11-19 00:00:00+00';

-- Step 6: Delete test opportunity_products links
DELETE FROM opportunity_products
WHERE created_at < '2025-11-19 00:00:00+00';

-- Step 7: Delete test contacts
DELETE FROM contacts
WHERE created_at < '2025-11-19 00:00:00+00';

-- Step 8: Delete test opportunities
DELETE FROM opportunities
WHERE created_at < '2025-11-19 00:00:00+00';

-- Step 9: Delete test clients (LAST - has FK dependencies)
DELETE FROM clients
WHERE created_at < '2025-11-19 00:00:00+00';

-- =====================================================
-- VERIFICATION QUERIES (Run after migration)
-- =====================================================

-- Verify catalogs are preserved:
-- SELECT COUNT(*) FROM products; -- Should be 15
-- SELECT COUNT(*) FROM loss_reasons; -- Should be 15
-- SELECT COUNT(*) FROM funnels; -- Should be >= 1
-- SELECT COUNT(*) FROM funnel_stages; -- Should be >= 5

-- Verify test data is gone:
-- SELECT COUNT(*) FROM clients; -- Should be 0
-- SELECT COUNT(*) FROM opportunities; -- Should be 0
-- SELECT COUNT(*) FROM contacts; -- Should be 0
-- SELECT COUNT(*) FROM tasks; -- Should be 0
-- SELECT COUNT(*) FROM quotations; -- Should be 0

-- =====================================================
-- ROLLBACK (if needed - EMERGENCY ONLY)
-- =====================================================
-- ⚠️ There is NO rollback for this migration
-- Make sure to backup database before running
-- Use Supabase Dashboard → Database → Backups

-- =====================================================
-- POST-MIGRATION NOTES
-- =====================================================
-- After this migration:
-- 1. Users will start with clean slate
-- 2. They can create their first real client
-- 3. All catalog data (products, loss reasons) remains functional
-- 4. Funnels and stages are ready to use
-- 5. No "ABC Eventos" or test data will appear
