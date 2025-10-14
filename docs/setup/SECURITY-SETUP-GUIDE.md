# Security Setup Guide - STAGETEK CRM

**Version**: 2.0
**Date**: 13 de Outubro de 2025
**Sprint 0**: Security Blockers Resolution

---

## 📋 Overview

This guide covers the complete security setup for STAGETEK CRM, including:
1. **Row Level Security (RLS) Policies** - Ownership-based access control
2. **Activity Log (Audit Trail)** - Automatic tracking of changes
3. **Storage Policies** - Secure PDF storage with signed URLs
4. **PII Masking** - LGPD-compliant data display

---

## 🚀 Quick Start (5 minutes)

### 1. Access Supabase SQL Editor

1. Login to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select project: `twcpqhhtoqcgzplrmohi`
3. Navigate to **SQL Editor** (left sidebar)

### 2. Run Migrations (in order)

#### **Migration 1: Initial Schema** (if not already applied)
```bash
# File: supabase/migrations/20251004_initial_schema.sql
# Status: ✅ Already applied (database tables exist)
# Skip this if tables already exist
```

#### **Migration 2: Comprehensive RLS Policies**
```bash
# File: supabase/migrations/20251013_comprehensive_rls_policies.sql
# Time: ~30 seconds
```

**Steps**:
1. Click **New Query** in SQL Editor
2. Copy entire contents of `supabase/migrations/20251013_comprehensive_rls_policies.sql`
3. Paste into SQL Editor
4. Click **Run** (or press `Ctrl+Enter`)
5. ✅ Verify: You should see "Success. No rows returned"

#### **Migration 3: Storage Policies**
```bash
# File: supabase/migrations/20251013_storage_policies.sql
# Time: ~10 seconds
```

**Steps**:
1. Click **New Query** in SQL Editor
2. Copy entire contents of `supabase/migrations/20251013_storage_policies.sql`
3. Paste into SQL Editor
4. Click **Run** (or press `Ctrl+Enter`)
5. ✅ Verify: You should see "Success. No rows returned"

---

## 🔒 What Gets Configured

### 1. RLS Policies (Row Level Security)

#### **Clients Table**
- ✅ **SELECT**: All authenticated users can view all clients
- ✅ **INSERT**: Users can create clients (auto-sets `created_by`)
- ✅ **UPDATE**: Only owner or admin can modify
- ✅ **DELETE**: Only admin can delete (soft delete via `status='inactive'`)

#### **Opportunities Table**
- ✅ **SELECT**: All authenticated users can view all opportunities
- ✅ **INSERT**: Users can create opportunities (auto-sets `created_by`)
- ✅ **UPDATE**: Owner, assignee, or admin can modify
- ✅ **DELETE**: Only admin can delete

#### **Funnels & Stages Tables**
- ✅ **SELECT**: All authenticated users can view active funnels
- ✅ **INSERT/UPDATE/DELETE**: Only admin can modify (structural data)

#### **Notes Table**
- ✅ **SELECT**: All authenticated users can view notes
- ✅ **INSERT**: Users can create notes (immutable after creation)
- ❌ **UPDATE**: DISABLED (notes are immutable)
- ✅ **DELETE**: Only admin (exceptional cases)

#### **Tasks Table**
- ✅ **SELECT**: All authenticated users can view tasks
- ✅ **INSERT**: Users can create tasks
- ✅ **UPDATE**: Creator, assignee, or admin can modify
- ✅ **DELETE**: Creator or admin can delete

---

### 2. Activity Log (Audit Trail)

**Table**: `activity_log`

**What gets logged**:
- ✅ **UPDATE** operations on: `clients`, `opportunities`, `tasks`, `funnels`, `funnel_stages`
- ✅ **DELETE** operations on: `clients`, `opportunities`, `tasks`, `funnels`, `funnel_stages`
- ✅ Old data (JSONB) - before update/delete
- ✅ New data (JSONB) - after update
- ✅ User ID + email
- ✅ Timestamp (automatic)

**Schema**:
```sql
activity_log (
  id UUID PRIMARY KEY,
  table_name TEXT,
  record_id UUID,
  action TEXT ('INSERT', 'UPDATE', 'DELETE'),
  old_data JSONB,
  new_data JSONB,
  user_id UUID,
  user_email TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ
)
```

**Query examples**:
```sql
-- Ver últimas 50 alterações
SELECT * FROM activity_log
ORDER BY created_at DESC
LIMIT 50;

-- Ver alterações em cliente específico
SELECT * FROM activity_log
WHERE table_name = 'clients'
  AND record_id = 'uuid-do-cliente';

-- Ver alterações por usuário
SELECT * FROM activity_log
WHERE user_email = 'vendedor@stagetek.com'
ORDER BY created_at DESC;
```

---

### 3. Storage Policies (Quotation PDFs)

**Bucket**: `quotation-pdfs` (private)

**Structure**:
```
quotation-pdfs/
├── {user_id_1}/
│   ├── QT-2025-001.pdf
│   ├── QT-2025-002.pdf
│   └── ...
├── {user_id_2}/
│   ├── QT-2025-003.pdf
│   └── ...
```

**Policies**:
- ✅ **Upload**: Users can only upload to their own folder
- ✅ **Download**: Users can only download from their own folder
- ✅ **Update**: Users can only rename their own files
- ✅ **Delete**: Users can only delete their own files

**File limits**:
- Max file size: 5MB per PDF
- Allowed types: `application/pdf` only
- Total storage: 2GB (Supabase Free Tier)

**Usage in code**:
```typescript
// Upload PDF
const filePath = `${userId}/QT-2025-001.pdf`
const { data, error } = await supabase.storage
  .from('quotation-pdfs')
  .upload(filePath, pdfFile)

// Download (signed URL with 1h expiration)
const { data, error } = await supabase.storage
  .from('quotation-pdfs')
  .createSignedUrl(filePath, 3600)

console.log(data.signedUrl) // Temporary URL, expires in 1h
```

---

### 4. PII Masking (LGPD Compliance)

**Frontend implementation** (already applied in `src/lib/utils.ts`):

```typescript
import { maskEmail, maskPhone, maskCNPJ } from '@/lib/utils'

// Email: joao.silva@acme.com.br → joa***@acme.com.br
maskEmail('joao.silva@acme.com.br')

// Phone: (11) 98765-4321 → (11) 9****-4321
maskPhone('(11) 98765-4321')

// CNPJ: 12.345.678/0001-90 → 12.***.678/0001-90
maskCNPJ('12.345.678/0001-90')
```

**Where applied**:
- ✅ `ClientCard.tsx` (mobile view)
- ✅ `ClientTableRow.tsx` (desktop table)
- ✅ Tooltip shows full value on hover (for admins)

---

## ✅ Verification & Testing

### 1. Test RLS Policies

**Test 1: User isolation (optional - only if multiple users)**
```sql
-- Login as User A
-- Create client
INSERT INTO clients (name, cnpj, created_by)
VALUES ('Cliente A', '12.345.678/0001-90', auth.uid());

-- Login as User B
-- Try to modify Cliente A (should FAIL if policies work)
UPDATE clients SET name = 'Hacked' WHERE name = 'Cliente A';
-- Expected: 0 rows affected (policy blocks access)
```

**Test 2: Admin override**
```sql
-- Set user role to admin (via Supabase Dashboard)
-- Admin can modify/delete anything
```

---

### 2. Test Activity Log

```sql
-- Create test client
INSERT INTO clients (name, email, status)
VALUES ('Test Client', 'test@test.com', 'active')
RETURNING id;

-- Update client (should log to activity_log)
UPDATE clients SET email = 'newemail@test.com' WHERE name = 'Test Client';

-- Check activity log
SELECT * FROM activity_log WHERE table_name = 'clients' ORDER BY created_at DESC LIMIT 5;
-- Expected: 1 row with action='UPDATE', old_data and new_data populated
```

---

### 3. Test Storage Policies

**Via Supabase Dashboard**:
1. Navigate to **Storage** → **Buckets**
2. Verify `quotation-pdfs` bucket exists
3. Try uploading a test PDF to `{your-user-id}/test.pdf`
4. ✅ Upload should succeed
5. Try uploading to another user's folder
6. ❌ Upload should fail (policy blocks)

**Via application code**:
```typescript
// Test upload
const userId = user?.id
const testFile = new File(['test'], 'test.pdf', { type: 'application/pdf' })

const { data, error } = await supabase.storage
  .from('quotation-pdfs')
  .upload(`${userId}/test.pdf`, testFile)

if (!error) console.log('✅ Upload successful')
else console.error('❌ Upload failed:', error.message)
```

---

### 4. Test PII Masking

**Visual test**:
1. Run `npm run dev`
2. Navigate to `/clientes`
3. Verify:
   - ✅ Emails are masked: `joa***@domain.com`
   - ✅ Phones are masked: `(11) 9****-4321`
   - ✅ CNPJs are masked: `12.***.678/0001-90`
   - ✅ Hover shows full value in tooltip

---

## 📊 Monitoring & Maintenance

### Daily Checks

```sql
-- 1. Check storage usage (alert if >80%)
SELECT * FROM check_storage_usage();
-- Expected: usage_percent < 80

-- 2. Check for suspicious activity (many deletes)
SELECT COUNT(*) FROM activity_log
WHERE action = 'DELETE' AND created_at > NOW() - INTERVAL '24 hours';
-- Expected: < 10 per day

-- 3. Check for failed policies (0 rows affected on legit operations)
-- Manual check: Users report "can't edit" issues
```

---

### Monthly Maintenance

```sql
-- 1. Archive old activity logs (>90 days)
DELETE FROM activity_log WHERE created_at < NOW() - INTERVAL '90 days';

-- 2. Identify old PDFs for cold storage
SELECT * FROM get_old_quotation_pdfs(30);
-- Move to Cloudflare R2 / Backblaze B2

-- 3. Verify RLS policies still active
SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname = 'public' AND tablename IN ('clients', 'opportunities', 'tasks');
-- Expected: rowsecurity = TRUE for all
```

---

## 🔧 Troubleshooting

### Issue 1: "No rows returned" on legit operations

**Symptom**: User can't create/update clients even though they should be able to.

**Diagnosis**:
```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'clients';
-- Expected: rowsecurity = true

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'clients';
-- Expected: At least 4 policies (SELECT, INSERT, UPDATE, DELETE)
```

**Fix**:
```sql
-- Re-run migration
-- File: supabase/migrations/20251013_comprehensive_rls_policies.sql
```

---

### Issue 2: Activity log not logging changes

**Diagnosis**:
```sql
-- Check if triggers exist
SELECT tgname, tgrelid::regclass FROM pg_trigger
WHERE tgname LIKE 'audit_%';
-- Expected: audit_clients_changes, audit_opportunities_changes, etc.
```

**Fix**:
```sql
-- Re-run migration
-- File: supabase/migrations/20251013_comprehensive_rls_policies.sql
```

---

### Issue 3: Storage upload fails with "Policy violation"

**Diagnosis**:
```typescript
// Check user ID
const { data: { user } } = await supabase.auth.getUser()
console.log('User ID:', user?.id)

// Check file path
const filePath = `${user?.id}/test.pdf`
console.log('File path:', filePath)

// Ensure path starts with user ID
```

**Fix**:
```typescript
// Correct path format
const filePath = `${user?.id}/QT-2025-001.pdf` // ✅

// Incorrect paths
const filePath = `QT-2025-001.pdf` // ❌ Missing user folder
const filePath = `other-user-id/QT-2025-001.pdf` // ❌ Wrong user
```

---

## 📚 References

- **RLS Documentation**: [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- **Storage Policies**: [Supabase Storage Security](https://supabase.com/docs/guides/storage/security/access-control)
- **LGPD Compliance**: [Lei nº 13.709/2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- **Protocol Notecraft**: `/protocol/PROTOCOL-NOTECRAFT.md`
- **Technical Debt**: `/protocol/TECH-DEBT.md` (TD-001, TD-002, TD-003)

---

## ✅ Completion Checklist

- [ ] Migration 1: Initial Schema applied
- [ ] Migration 2: RLS Policies applied
- [ ] Migration 3: Storage Policies applied
- [ ] RLS policies tested (user isolation verified)
- [ ] Activity log tested (UPDATE/DELETE logged)
- [ ] Storage policies tested (upload/download works)
- [ ] PII masking verified (emails/phones/CNPJs masked)
- [ ] Monitoring queries saved (check_storage_usage)
- [ ] Team trained (know how to query activity_log)
- [ ] Documentation reviewed (this guide)

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
**Sprint 0: Security Blockers - COMPLETE** ✅
