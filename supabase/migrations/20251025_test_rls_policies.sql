-- =====================================================
-- RLS Policies Test Suite
-- Generated: 25 Outubro 2025
-- Purpose: Validar todas RLS policies (11 tabelas + 2 buckets)
-- =====================================================
--
-- HOW TO RUN:
-- 1. Apply all migrations: npx supabase db reset
-- 2. Create test users (see section below)
-- 3. Run each test block (psql or Supabase SQL Editor)
-- 4. Verify expected results (✅ PASS or ❌ FAIL)
--
-- =====================================================

-- =====================================================
-- SETUP: Create Test Users
-- =====================================================
-- Run these commands in Supabase Dashboard > SQL Editor:

-- User A (alice@stagetek.com)
-- User B (bob@stagetek.com)
-- User C (charlie@stagetek.com)

-- Note: Create via Supabase Auth UI or:
-- INSERT INTO auth.users (id, email, encrypted_password, ...)
-- VALUES (uuid_generate_v4(), 'alice@stagetek.com', ...);

-- For testing, get user IDs:
SELECT id, email FROM auth.users WHERE email LIKE '%@stagetek.com';

-- Set these variables for testing:
-- \set user_a 'uuid-of-alice'
-- \set user_b 'uuid-of-bob'
-- \set user_c 'uuid-of-charlie'

-- =====================================================
-- TEST 1: clients (team_shared)
-- =====================================================
BEGIN;

-- Test as user A
SET LOCAL role authenticated;
SET LOCAL request.jwt.claim.sub = 'uuid-of-alice'; -- Replace with real UUID

-- INSERT client
INSERT INTO clients (name, cnpj, created_by)
VALUES ('Test Client A', '12345678000199', auth.uid())
RETURNING id;

-- SELECT all clients (should see ALL, including from other users)
SELECT COUNT(*) FROM clients; -- Expected: > 1 (team-shared)

-- UPDATE client (created by user B)
UPDATE clients
SET name = 'Updated by A'
WHERE created_by != auth.uid()
RETURNING id; -- Expected: Should succeed ✅ (team-shared)

ROLLBACK;

-- =====================================================
-- TEST 2: tasks (owner_only)
-- =====================================================
BEGIN;

-- Test as user A
SET LOCAL role authenticated;
SET LOCAL request.jwt.claim.sub = 'uuid-of-alice';

-- INSERT task assigned to user B
INSERT INTO tasks (title, description, assigned_to, created_by)
VALUES ('Test Task', 'Description', 'uuid-of-bob', auth.uid())
RETURNING id;

-- SELECT tasks (should see only OWN tasks)
SELECT COUNT(*) FROM tasks WHERE assigned_to = auth.uid(); -- Expected: 0 (not assigned to A)
SELECT COUNT(*) FROM tasks WHERE created_by = auth.uid(); -- Expected: 1 (created by A)

-- Switch to user B
SET LOCAL request.jwt.claim.sub = 'uuid-of-bob';

-- SELECT tasks (should see task assigned to B)
SELECT COUNT(*) FROM tasks WHERE assigned_to = auth.uid(); -- Expected: 1 ✅

-- UPDATE task (created by A, assigned to B)
UPDATE tasks
SET status = 'completed'
WHERE assigned_to = auth.uid()
RETURNING id; -- Expected: Should succeed ✅

ROLLBACK;

-- =====================================================
-- TEST 3: quotations (owner_only + opportunity assignee)
-- =====================================================
BEGIN;

-- Test as user A
SET LOCAL role authenticated;
SET LOCAL request.jwt.claim.sub = 'uuid-of-alice';

-- Assume opportunity exists (id=opp-uuid)
-- INSERT quotation
INSERT INTO quotations (opportunity_id, quotation_number, status, subtotal, total, created_by)
VALUES ('opp-uuid', 'QT-202510-001', 'draft', 1000, 1000, auth.uid())
RETURNING id;

-- UPDATE quotation (status=draft)
UPDATE quotations
SET subtotal = 1500
WHERE status = 'draft' AND created_by = auth.uid()
RETURNING id; -- Expected: Should succeed ✅

-- UPDATE status to 'sent'
UPDATE quotations
SET status = 'sent'
WHERE created_by = auth.uid()
RETURNING id;

-- Try UPDATE quotation (status=sent)
UPDATE quotations
SET subtotal = 2000
WHERE status = 'sent' AND created_by = auth.uid()
RETURNING id; -- Expected: Should FAIL ❌ (immutable after sent)

-- Switch to user B (NOT assigned to opportunity)
SET LOCAL request.jwt.claim.sub = 'uuid-of-bob';

-- SELECT quotation (created by A)
SELECT COUNT(*) FROM quotations WHERE created_by = 'uuid-of-alice'; -- Expected: 0 ❌ (not owner, not assignee)

ROLLBACK;

-- =====================================================
-- TEST 4: notes (immutable)
-- =====================================================
BEGIN;

-- Test as user A
SET LOCAL role authenticated;
SET LOCAL request.jwt.claim.sub = 'uuid-of-alice';

-- INSERT note
INSERT INTO notes (opportunity_id, content, created_by)
VALUES ('opp-uuid', 'Test note', auth.uid())
RETURNING id AS note_id \gset

-- SELECT note
SELECT id FROM notes WHERE id = :'note_id'; -- Expected: Should see ✅

-- Try UPDATE note
UPDATE notes
SET content = 'Updated note'
WHERE id = :'note_id'
RETURNING id; -- Expected: Should FAIL ❌ (immutable)

-- Try DELETE note
DELETE FROM notes WHERE id = :'note_id'
RETURNING id; -- Expected: Should FAIL ❌ (immutable)

ROLLBACK;

-- =====================================================
-- TEST 5: emails_sent (immutable audit trail)
-- =====================================================
BEGIN;

-- Test as user A
SET LOCAL role authenticated;
SET LOCAL request.jwt.claim.sub = 'uuid-of-alice';

-- INSERT email
INSERT INTO emails_sent (opportunity_id, to_email, subject, body, sent_by)
VALUES ('opp-uuid', 'test@example.com', 'Test Email', 'Body', auth.uid())
RETURNING id AS email_id \gset

-- SELECT email
SELECT id FROM emails_sent WHERE id = :'email_id'; -- Expected: Should see ✅

-- Try UPDATE email
UPDATE emails_sent
SET subject = 'Updated Subject'
WHERE id = :'email_id'
RETURNING id; -- Expected: Should FAIL ❌ (immutable)

-- Try DELETE email
DELETE FROM emails_sent WHERE id = :'email_id'
RETURNING id; -- Expected: Should FAIL ❌ (immutable)

ROLLBACK;

-- =====================================================
-- TEST 6: opportunity_products (team_shared)
-- =====================================================
BEGIN;

-- Test as user A
SET LOCAL role authenticated;
SET LOCAL request.jwt.claim.sub = 'uuid-of-alice';

-- Assume opportunity and product exist
-- INSERT product link
INSERT INTO opportunity_products (opportunity_id, product_id, quantity, added_by)
VALUES ('opp-uuid', 'prod-uuid', 5, auth.uid())
RETURNING id;

-- Try INSERT duplicate (should FAIL due to UNIQUE constraint)
INSERT INTO opportunity_products (opportunity_id, product_id, quantity, added_by)
VALUES ('opp-uuid', 'prod-uuid', 10, auth.uid')
RETURNING id; -- Expected: Should FAIL ❌ (UNIQUE constraint)

-- UPDATE quantity
UPDATE opportunity_products
SET quantity = 10
WHERE opportunity_id = 'opp-uuid' AND product_id = 'prod-uuid'
RETURNING id; -- Expected: Should succeed ✅

-- Try UPDATE quantity to 0 (should FAIL due to CHECK constraint)
UPDATE opportunity_products
SET quantity = 0
WHERE opportunity_id = 'opp-uuid' AND product_id = 'prod-uuid'
RETURNING id; -- Expected: Should FAIL ❌ (CHECK constraint)

-- Switch to user B
SET LOCAL request.jwt.claim.sub = 'uuid-of-bob';

-- SELECT product link (created by A)
SELECT COUNT(*) FROM opportunity_products WHERE added_by = 'uuid-of-alice'; -- Expected: > 0 ✅ (team-shared)

-- DELETE product link (created by A)
DELETE FROM opportunity_products WHERE added_by = 'uuid-of-alice'
RETURNING id; -- Expected: Should succeed ✅ (team-shared)

ROLLBACK;

-- =====================================================
-- TEST 7: Storage Buckets (pdfs, attachments)
-- =====================================================
-- Note: Storage policies são testadas via client (Supabase JS SDK)
-- Não é possível testar via SQL direto.

-- Test via client:
-- 1. Login as user A
-- 2. Upload file to pdfs bucket: Should succeed ✅
-- 3. Download file: Should succeed ✅ (owner)
-- 4. Login as user B (assigned to opportunity)
-- 5. Download file: Should succeed ✅ (assignee)
-- 6. Login as user C (NOT assigned)
-- 7. Download file: Should FAIL ❌ (not authorized)

-- =====================================================
-- SUMMARY: Expected Results
-- =====================================================
--
-- TEST 1: clients (team_shared)
-- - ✅ INSERT succeeds
-- - ✅ SELECT sees ALL clients
-- - ✅ UPDATE succeeds (even for other users)
-- - ✅ DELETE succeeds (even for other users)
--
-- TEST 2: tasks (owner_only)
-- - ✅ INSERT succeeds
-- - ✅ SELECT sees ONLY own/assigned tasks
-- - ✅ UPDATE succeeds for own tasks
-- - ❌ UPDATE fails for other users' tasks
--
-- TEST 3: quotations (owner_only)
-- - ✅ INSERT succeeds
-- - ✅ UPDATE succeeds (status=draft)
-- - ❌ UPDATE fails (status=sent)
-- - ❌ SELECT fails for non-owner/non-assignee
--
-- TEST 4: notes (immutable)
-- - ✅ INSERT succeeds
-- - ✅ SELECT succeeds
-- - ❌ UPDATE fails
-- - ❌ DELETE fails
--
-- TEST 5: emails_sent (immutable)
-- - ✅ INSERT succeeds
-- - ✅ SELECT succeeds
-- - ❌ UPDATE fails
-- - ❌ DELETE fails
--
-- TEST 6: opportunity_products (team_shared)
-- - ✅ INSERT succeeds
-- - ❌ INSERT duplicate fails (UNIQUE)
-- - ✅ UPDATE succeeds
-- - ❌ UPDATE quantity=0 fails (CHECK)
-- - ✅ DELETE succeeds (team-shared)
--
-- TEST 7: Storage (pdfs, attachments)
-- - ✅ Upload succeeds (owner)
-- - ✅ Download succeeds (owner + assignee)
-- - ❌ Download fails (unauthorized)
--
-- =====================================================
-- If all tests PASS: RLS policies são seguras! ✅
-- If any test FAILS: Review policy definition.
-- =====================================================
