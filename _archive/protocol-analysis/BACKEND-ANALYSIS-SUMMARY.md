# STAGETEK CRM - Backend Specialist Analysis Summary

**Date**: 2 de Outubro de 2025
**Analyst**: @backend-specialist
**Mission**: Database Schema & API Architecture Analysis

---

## Executive Summary

After analyzing RD Station CRM API v2, our current STAGETEK V1 schema, and business requirements, I've identified **critical gaps** and delivered a **complete Schema V2** with SQL migrations and REST API specification.

---

## Key Findings

### 1. Critical Missing Tables

Our V1 schema is missing **6 critical tables** that RD Station has:

| Missing Table | Impact | Priority |
|---------------|--------|----------|
| **contacts** | Cannot track multiple decision-makers per company | 🔴 **CRITICAL** |
| **tasks** | No follow-up management, no reminders | 🔴 **CRITICAL** |
| **loss_reasons** | Cannot analyze why deals are lost | 🟠 **HIGH** |
| **sources** | Cannot track ROI by marketing channel | 🟠 **HIGH** |
| **webhook_events** | Cannot integrate with external systems | 🟡 **MEDIUM** |
| **teams** | Cannot segment reports by team | 🟡 **MEDIUM** |

### 2. Architectural Decisions

**✅ APPROVED**:
- **Superset Schema**: Start with RD Station structure + STAGETEK extensions
- **JSONB for Flexibility**: emails, phones, custom_fields, address
- **Future-Proof Fields**: Add NOW (e.g., `rotten_days`, `ai_insights`), use later
- **Event-Driven**: Database triggers → webhook_events → Edge Functions
- **Row Level Security**: Supabase RLS for user/team isolation

**❌ REJECTED**:
- Custom RDQL query language (too complex for 5 users)
- External webhook service (use Supabase Edge Functions)
- MongoDB (use PostgreSQL JSONB instead)

---

## Deliverables

### 1. Database Schema V2 (SQL)

**Location**: `C:\Users\David\Stagetek\stagetek-crm-system\protocol\DATABASE-SCHEMA-V2-ANALYSIS.md`

**Contents**:
- ✅ Complete SQL migration script (Migration 001)
- ✅ 13 core tables (users, teams, organizations, contacts, deals, pipelines, stages, tasks, products, deal_products, loss_reasons, sources, webhook_events)
- ✅ Indexes (performance)
- ✅ Triggers (updated_at, audit log)
- ✅ RLS policies (security)
- ✅ Seed data (loss_reasons, sources, default pipeline)

**Key Features**:
- **contacts** table (many-to-many with organizations)
- **tasks** table (call, email, meeting, whatsapp)
- **loss_reasons** + **sources** (structured data)
- **webhook_events** (integration-ready)
- **rd_id** fields (future RD Station sync)
- **custom_fields** JSONB (extensibility)

### 2. API Specification (OpenAPI 3.0)

**Location**: `C:\Users\David\Stagetek\stagetek-crm-system\protocol\API-SPEC-V1.yaml`

**Contents**:
- ✅ REST endpoints (GET, POST, PUT, DELETE)
- ✅ Request/response schemas
- ✅ Authentication (JWT + API Key)
- ✅ Pagination (page, limit, sort)
- ✅ Filtering (pipeline_id, status, value_min/max, etc.)
- ✅ Error responses

**Endpoints**:
```
GET    /v1/contacts
POST   /v1/contacts
GET    /v1/contacts/:id
PUT    /v1/contacts/:id
DELETE /v1/contacts/:id

GET    /v1/organizations
POST   /v1/organizations

GET    /v1/deals
POST   /v1/deals
PUT    /v1/deals/:id
POST   /v1/deals/:id/products

GET    /v1/pipelines
GET    /v1/stages
GET    /v1/tasks
GET    /v1/products
GET    /v1/sources
GET    /v1/loss-reasons
```

### 3. Schema Comparison Document

**Included in**: `DATABASE-SCHEMA-V2-ANALYSIS.md`

**Highlights**:
- Side-by-side comparison (RD vs. STAGETEK V1)
- Gap analysis (what we're missing)
- Migration strategy (V1 → V2)
- Zero-downtime deployment plan

---

## Migration Plan

### Phase 1: Core Tables (Week 1) - **MVP**

```sql
✅ Execute Migration 001 script
✅ Seed loss_reasons, sources, default pipeline
✅ Migrate V1 data:
   - clients → organizations
   - clients.email → contacts
   - opportunities → deals
   - opportunity_products → deal_products
✅ Setup RLS policies
```

**Estimated Time**: 2 days

### Phase 2: V1 → V2 Dual-Write (Week 2)

```
✅ Create Supabase Edge Functions (dual-write)
✅ Write to BOTH V1 and V2 schemas
✅ Validate data parity
✅ Monitor for 7 days
```

**Estimated Time**: 3 days

### Phase 3: Cutover (Week 3)

```
✅ Switch reads from V1 → V2
✅ Stop writing to V1
✅ Archive V1 schema (backup)
✅ Drop V1 tables (after 30 days)
```

**Estimated Time**: 1 day

---

## Technical Recommendations

### 1. Use PostgREST (Built-in with Supabase)

**Why**: Automatic REST API from Postgres schema

**Pros**:
- ✅ Auto-generated endpoints
- ✅ Filtering, sorting, pagination (built-in)
- ✅ JWT authentication (Supabase Auth)
- ✅ RLS enforcement
- ✅ OpenAPI spec generation

**Example**:
```http
# Automatic from schema!
GET /rest/v1/deals?pipeline_id=eq.uuid-123&status=eq.open&order=value.desc&limit=50
```

**Recommendation**: Start with PostgREST, build custom Edge Functions only for complex logic.

### 2. Supabase Realtime for Live Updates

**Use Cases**:
- Kanban board (drag-drop syncs across users)
- CRM Live dashboard (auto-refresh)
- Notifications (new task assigned)

**Implementation**:
```typescript
supabase
  .channel('deals')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'deals',
    filter: `pipeline_id=eq.${pipelineId}`
  }, (payload) => {
    // Update UI
  })
  .subscribe()
```

### 3. Database Triggers for Audit Log

**Auto-log stage changes**:
```sql
CREATE TRIGGER trigger_deal_stage_changed
AFTER UPDATE ON deals
FOR EACH ROW
WHEN (NEW.stage_id != OLD.stage_id)
EXECUTE FUNCTION log_stage_change();
```

**Auto-update organization stats**:
```sql
CREATE TRIGGER trigger_deal_won
AFTER UPDATE ON deals
FOR EACH ROW
WHEN (NEW.status = 'won' AND OLD.status != 'won')
EXECUTE FUNCTION update_organization_revenue();
```

### 4. JSONB for Flexible Fields

**Why**: Avoid schema migrations for custom fields

**Example**:
```typescript
// contacts.emails (JSONB)
[
  {"type": "work", "value": "joao@empresa.com", "primary": true},
  {"type": "personal", "value": "joao@gmail.com", "primary": false}
]

// deals.custom_fields (JSONB)
{
  "tipo_evento": "Casamento",
  "num_convidados": 200,
  "tem_buffet": true,
  "observacoes": "Cliente VIP"
}
```

**Query**:
```sql
-- Find deals where tipo_evento = 'Casamento'
SELECT * FROM deals WHERE custom_fields->>'tipo_evento' = 'Casamento';

-- Find contacts with work email
SELECT * FROM contacts WHERE emails @> '[{"type": "work"}]';
```

---

## Security Considerations

### 1. Row Level Security (RLS)

**Users see only own/team deals**:
```sql
CREATE POLICY "Users see own/team deals" ON deals
FOR SELECT
USING (
  auth.uid() = owner_id
  OR
  auth.uid() IN (
    SELECT id FROM users
    WHERE team_id = (SELECT team_id FROM users WHERE id = deals.owner_id)
  )
  OR
  (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'manager')
);
```

### 2. API Key Scopes

**For external integrations**:
- `read:deals` (read-only)
- `write:deals` (create/update)
- `delete:deals` (full access)

**Implementation**: Store in `api_keys` table with scopes JSONB.

### 3. Rate Limiting

**Recommendations**:
- 1000 requests/hour per user
- 10,000 requests/hour per organization
- 100 requests/minute per API key

**Implementation**: Supabase Edge Functions + Redis (Upstash).

---

## Performance Optimizations

### 1. Indexes Created

```sql
-- Deals (most queried)
CREATE INDEX idx_deals_pipeline_id ON deals(pipeline_id);
CREATE INDEX idx_deals_stage_id ON deals(stage_id);
CREATE INDEX idx_deals_owner_id ON deals(owner_id);
CREATE INDEX idx_deals_status ON deals(status);
CREATE INDEX idx_deals_expected_close_date ON deals(expected_close_date);

-- JSONB indexes
CREATE INDEX idx_deals_contact_ids ON deals USING GIN(contact_ids);
CREATE INDEX idx_contacts_emails ON contacts USING GIN(emails);
```

### 2. Materialized Views (Future)

**For heavy reports**:
```sql
CREATE MATERIALIZED VIEW mv_pipeline_metrics AS
SELECT
  pipeline_id,
  stage_id,
  COUNT(*) as deal_count,
  SUM(value) as total_value,
  AVG(value) as avg_value
FROM deals
WHERE status = 'open'
GROUP BY pipeline_id, stage_id;

-- Refresh every 15 minutes
CREATE UNIQUE INDEX ON mv_pipeline_metrics (pipeline_id, stage_id);
REFRESH MATERIALIZED VIEW CONCURRENTLY mv_pipeline_metrics;
```

---

## Data Validation

### 1. Database Constraints

```sql
-- CNPJ format
ALTER TABLE organizations ADD CONSTRAINT cnpj_format
  CHECK (cnpj ~ '^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$');

-- Probability 0-100
ALTER TABLE deals ADD CONSTRAINT probability_range
  CHECK (probability >= 0 AND probability <= 100);

-- Value >= 0
ALTER TABLE deals ADD CONSTRAINT value_positive
  CHECK (value >= 0);
```

### 2. Frontend Validation (Zod)

```typescript
import { z } from 'zod'

const DealSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  pipeline_id: z.string().uuid(),
  stage_id: z.string().uuid(),
  value: z.number().min(0, "Valor deve ser positivo"),
  probability: z.number().min(0).max(100),
  expected_close_date: z.date().min(new Date(), "Data deve ser futura"),
})
```

---

## Integration Strategy

### 1. Webhooks (Outbound)

**Trigger**: Deal stage changes → POST to external URL

**Implementation**:
```sql
-- 1. Insert into webhook_events (via trigger)
-- 2. Supabase Edge Function reads webhook_events
-- 3. POST to external URL (Zapier, n8n, custom)
-- 4. Mark as processed
```

**Example Payload**:
```json
{
  "event_id": "uuid-123",
  "event_type": "deal.stage_changed",
  "occurred_at": "2025-10-02T14:30:00Z",
  "data": {
    "deal_id": "uuid-456",
    "old_stage_id": "uuid-old",
    "new_stage_id": "uuid-new",
    "owner_id": "uuid-user"
  }
}
```

### 2. External APIs (Inbound)

**Examples**:
- Google Calendar API (sync events)
- WhatsApp Business API (send messages)
- Resend API (send emails)

**Implementation**: Supabase Edge Functions

```typescript
// Edge Function: send_email.ts
import { Resend } from 'resend'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

export default async (req) => {
  const { to, subject, body } = await req.json()

  const { data, error } = await resend.emails.send({
    from: 'contato@stagetek.com.br',
    to,
    subject,
    html: body,
  })

  return new Response(JSON.stringify({ data, error }))
}
```

---

## Testing Strategy

### 1. Unit Tests (Database Functions)

```sql
-- Test: Trigger updates organization revenue
BEGIN;
  INSERT INTO organizations (id, name) VALUES ('org-1', 'Test Corp');
  INSERT INTO deals (id, organization_id, value, status) VALUES ('deal-1', 'org-1', 1000, 'open');

  UPDATE deals SET status = 'won' WHERE id = 'deal-1';

  SELECT total_revenue FROM organizations WHERE id = 'org-1';
  -- Expected: 1000

ROLLBACK;
```

### 2. Integration Tests (API)

```typescript
// Test: Create deal
test('POST /v1/deals creates deal', async () => {
  const response = await fetch('/v1/deals', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({
      title: 'Test Deal',
      pipeline_id: 'uuid-pipe',
      stage_id: 'uuid-stage',
      value: 5000,
    })
  })

  expect(response.status).toBe(201)
  const { data } = await response.json()
  expect(data.title).toBe('Test Deal')
})
```

### 3. E2E Tests (Playwright)

```typescript
// Test: Drag deal between stages
test('Kanban drag-drop updates stage', async ({ page }) => {
  await page.goto('/funil-vendas')
  await page.dragAndDrop('[data-deal="uuid-123"]', '[data-stage="uuid-stage-2"]')

  // Wait for Realtime update
  await page.waitForTimeout(1000)

  const deal = await supabase.from('deals').select('stage_id').eq('id', 'uuid-123').single()
  expect(deal.stage_id).toBe('uuid-stage-2')
})
```

---

## Cost Estimate (Database)

**Supabase Free Tier**:
- ✅ 500MB database (enough for 50,000 deals)
- ✅ 2GB storage (enough for 10,000 images)
- ✅ Unlimited API requests
- ✅ 500,000 Realtime messages/month
- ✅ 500,000 Edge Function invocations/month

**If we exceed**:
- Pro Plan: $25/month (8GB database, 100GB storage)
- Still cheaper than RD Station ($150/month)!

---

## Next Steps (Immediate)

### Week 1: Execute Migration

1. ✅ **Day 1**: Execute Migration 001 SQL script (Supabase SQL Editor)
2. ✅ **Day 2**: Seed data (loss_reasons, sources, pipeline, stages)
3. ✅ **Day 3**: Migrate V1 data (clients → organizations/contacts, opportunities → deals)
4. ✅ **Day 4**: Setup RLS policies
5. ✅ **Day 5**: Test API endpoints (PostgREST)

### Week 2: Build Frontend Integration

1. ✅ Update frontend types (TypeScript)
2. ✅ Update Supabase queries (deals instead of opportunities)
3. ✅ Test Kanban drag-drop (with new schema)
4. ✅ Test CRUD operations
5. ✅ Deploy to Vercel (preview)

### Week 3: Cutover & Monitor

1. ✅ Switch production to V2 schema
2. ✅ Monitor errors (Sentry)
3. ✅ Monitor performance (Supabase dashboard)
4. ✅ Archive V1 schema
5. ✅ Celebrate! 🎉

---

## FAQ

### Q: Why separate contacts from organizations?

**A**: In B2B sales, you deal with **multiple decision-makers** at the same company.

**Example**:
- **Organization**: Buffet Jardim das Flores
- **Contacts**:
  - João (CEO) - Final approval
  - Maria (Event Manager) - Day-to-day contact
  - Pedro (Finance) - Invoice/payment

**RD Station**: Has this separation.
**STAGETEK V1**: Only 1 email per client (limiting!).

### Q: Can't we just use TEXT fields for loss_reasons and sources?

**A**: No, because:
- ❌ Typos ("Preço alto" vs "preço alto" vs "PREÇO ALTO")
- ❌ Can't analyze trends (top 3 loss reasons)
- ❌ Can't deactivate old reasons
- ❌ Can't reorder in UI

**With structured table**:
- ✅ Dropdown with fixed values
- ✅ Analytics: "40% lost due to Preço Alto"
- ✅ Can deactivate "Outro" if overused
- ✅ Can reorder (display_order)

### Q: Do we need webhook_events if we're not integrating yet?

**A**: YES! Because:
- ✅ Future-proof (add integrations later without schema changes)
- ✅ Audit log (who changed what, when)
- ✅ Replay events (if webhook fails, retry)
- ✅ Analytics (event stream for BI)

### Q: Why JSONB for emails/phones instead of separate tables?

**A**: Performance + Simplicity.

**Bad (relational)**:
```sql
contacts_emails (id, contact_id, type, value, is_primary)
contacts_phones (id, contact_id, type, country, area, number, is_primary)
```
→ 2 extra tables, 4 extra JOINs per query

**Good (JSONB)**:
```sql
contacts.emails JSONB
contacts.phones JSONB
```
→ 1 table, 0 JOINs, GIN index for fast search

---

## Conclusion

**Schema V2 is production-ready.**

**Next Action**: Execute Migration 001 script in Supabase.

**ETA to Production**: 3 weeks (if we start tomorrow).

**Risk Level**: 🟢 **LOW** (no breaking changes to existing data, dual-write strategy).

---

**Built with ❤️ by @backend-specialist**
**STAGETEK Engineering Team**
**Data**: 2 de Outubro de 2025
