# Schema V2 - Quick Reference Card

**For Developers: Print this and keep on your desk!**

---

## 📊 13 Core Tables

```
users              → System users (extends Supabase Auth)
teams              → Sales teams
organizations      → Companies (CNPJ, B2B clients)
contacts           → Individual people (M2M with organizations)
pipelines          → Sales funnels
stages             → Pipeline stages (Kanban columns)
deals              → Sales opportunities
products           → Product catalog
deal_products      → M2M (deals ↔ products)
tasks              → Follow-up tasks (call, email, meeting)
loss_reasons       → Why deals are lost (structured)
sources            → Lead/deal origin (structured)
webhook_events     → Integration events (for automation)
activities         → Audit log (optional, for timeline)
```

---

## 🔑 Key Differences from V1

| V1 | V2 | Why? |
|----|----|------|
| `clients` | `organizations` | RD Station naming |
| `clients.email` | `contacts` table | Multiple contacts per company |
| `funnels` | `pipelines` | RD Station naming |
| `opportunities` | `deals` | RD Station naming |
| `lost_reason` TEXT | `loss_reasons` table | Structured data, analytics |
| No `sources` | `sources` table | Track ROI by channel |
| No `tasks` | `tasks` table | Follow-up management |
| No `teams` | `teams` table | Team reports, visibility |
| No `webhook_events` | `webhook_events` | Integration-ready |

---

## 🚀 Most Common Queries

### 1. Get deals for Kanban (by pipeline)

```sql
SELECT
  d.id,
  d.title,
  d.value,
  d.stage_id,
  s.name as stage_name,
  s.color as stage_color,
  s.display_order,
  o.name as organization_name,
  u.full_name as owner_name
FROM deals d
JOIN stages s ON d.stage_id = s.id
LEFT JOIN organizations o ON d.organization_id = o.id
LEFT JOIN users u ON d.owner_id = u.id
WHERE d.pipeline_id = $1
  AND d.status = 'open'
ORDER BY s.display_order, d.created_at DESC;
```

### 2. Get contacts for an organization

```sql
SELECT
  c.id,
  c.name,
  c.emails,
  c.phones,
  c.job_title
FROM contacts c
WHERE c.organization_id = $1
  AND c.is_active = true
ORDER BY c.name;
```

### 3. Get tasks due today (assigned to me)

```sql
SELECT
  t.id,
  t.title,
  t.type,
  t.due_date,
  d.title as deal_title,
  c.name as contact_name
FROM tasks t
LEFT JOIN deals d ON t.deal_id = d.id
LEFT JOIN contacts c ON t.contact_id = c.id
WHERE t.assigned_to = $1
  AND t.status = 'open'
  AND t.due_date::date = CURRENT_DATE
ORDER BY t.due_date;
```

### 4. Top loss reasons (this month)

```sql
SELECT
  lr.name,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM deals d
JOIN loss_reasons lr ON d.loss_reason_id = lr.id
WHERE d.status = 'lost'
  AND d.lost_at >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY lr.id, lr.name
ORDER BY count DESC;
```

### 5. Deal conversion by stage

```sql
SELECT
  s.name as stage_name,
  COUNT(d.id) as total_deals,
  COUNT(d.id) FILTER (WHERE d.status = 'won') as won_deals,
  ROUND(
    COUNT(d.id) FILTER (WHERE d.status = 'won') * 100.0 / NULLIF(COUNT(d.id), 0),
    2
  ) as win_rate
FROM stages s
LEFT JOIN deals d ON s.id = d.stage_id
WHERE s.pipeline_id = $1
GROUP BY s.id, s.name, s.display_order
ORDER BY s.display_order;
```

---

## 📝 JSONB Field Formats

### contacts.emails

```json
[
  {
    "type": "work",
    "value": "joao@empresa.com",
    "primary": true
  },
  {
    "type": "personal",
    "value": "joao@gmail.com",
    "primary": false
  }
]
```

**Query**:
```sql
-- Get primary work email
SELECT emails->>0->>'value' FROM contacts WHERE id = $1;

-- Find contacts with work email
SELECT * FROM contacts WHERE emails @> '[{"type": "work"}]';
```

### contacts.phones

```json
[
  {
    "type": "mobile",
    "country": "55",
    "area": "11",
    "number": "988887777",
    "primary": true
  }
]
```

### organizations.address

```json
{
  "street": "Rua das Flores",
  "number": "123",
  "complement": "Sala 45",
  "neighborhood": "Jardins",
  "city": "São Paulo",
  "state": "SP",
  "zip": "01234-567",
  "country": "BR"
}
```

### deals.contact_ids

```json
["uuid-contact-1", "uuid-contact-2", "uuid-contact-3"]
```

**Query**:
```sql
-- Get all contacts for a deal
SELECT c.*
FROM contacts c
WHERE c.id = ANY(
  SELECT jsonb_array_elements_text(d.contact_ids)
  FROM deals d
  WHERE d.id = $1
);
```

### deals.custom_fields

```json
{
  "tipo_evento": "Casamento",
  "num_convidados": 200,
  "tem_buffet": true,
  "obs_cliente": "Quer decoração rosa e azul"
}
```

**Query**:
```sql
-- Get deals where tipo_evento = 'Casamento'
SELECT * FROM deals WHERE custom_fields->>'tipo_evento' = 'Casamento';

-- Get deals with > 150 guests
SELECT * FROM deals WHERE (custom_fields->>'num_convidados')::int > 150;
```

---

## 🔐 Row Level Security (RLS) Examples

### Users see own/team deals

```sql
CREATE POLICY "Users see own/team deals" ON deals
FOR SELECT
USING (
  -- Own deals
  auth.uid() = owner_id
  OR
  -- Team deals
  auth.uid() IN (
    SELECT id FROM users
    WHERE team_id = (SELECT team_id FROM users WHERE id = deals.owner_id)
  )
  OR
  -- Admins/Managers see all
  (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'manager')
);
```

### Users can only update own deals

```sql
CREATE POLICY "Users update own deals" ON deals
FOR UPDATE
USING (
  auth.uid() = owner_id
  OR
  (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'manager')
);
```

---

## ⚡ Performance Tips

### 1. Always use indexes

```sql
-- Good (uses index)
SELECT * FROM deals WHERE pipeline_id = $1 AND status = 'open';

-- Bad (full table scan)
SELECT * FROM deals WHERE LOWER(title) LIKE '%casamento%';
```

### 2. JSONB GIN indexes

```sql
-- Already created in migration!
CREATE INDEX idx_deals_contact_ids ON deals USING GIN(contact_ids);
CREATE INDEX idx_contacts_emails ON contacts USING GIN(emails);

-- Fast queries
SELECT * FROM deals WHERE contact_ids @> '["uuid-123"]';
SELECT * FROM contacts WHERE emails @> '[{"type": "work"}]';
```

### 3. Pagination (always!)

```sql
-- Good
SELECT * FROM deals LIMIT 50 OFFSET 0;

-- Bad (loads all 100k deals!)
SELECT * FROM deals;
```

---

## 🔄 Common Triggers

### Auto-update updated_at

```sql
-- Already applied to all tables
CREATE TRIGGER update_deals_updated_at
BEFORE UPDATE ON deals
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

### Log stage changes

```sql
CREATE TRIGGER log_deal_stage_change
AFTER UPDATE ON deals
FOR EACH ROW
WHEN (NEW.stage_id != OLD.stage_id)
EXECUTE FUNCTION log_stage_change();
```

---

## 🎯 API Endpoints (Quick Reference)

```
GET    /v1/contacts
POST   /v1/contacts
GET    /v1/contacts/:id
PUT    /v1/contacts/:id

GET    /v1/organizations
POST   /v1/organizations
GET    /v1/organizations/:id

GET    /v1/deals
POST   /v1/deals
GET    /v1/deals/:id
PUT    /v1/deals/:id
POST   /v1/deals/:id/products

GET    /v1/pipelines
GET    /v1/stages?pipeline_id=:id

GET    /v1/tasks?assigned_to=:user_id&status=open
POST   /v1/tasks
PUT    /v1/tasks/:id

GET    /v1/products?category=fabricacao&is_active=true
GET    /v1/sources
GET    /v1/loss-reasons
```

**Filters**:
- `?page=1&limit=50` (pagination)
- `?sort=-created_at` (sort DESC)
- `?status=open&owner_id=uuid` (filters)

---

## 📦 Supabase Client (TypeScript)

### Get deals for Kanban

```typescript
const { data: deals, error } = await supabase
  .from('deals')
  .select(`
    id,
    title,
    value,
    stage_id,
    stages (name, color, display_order),
    organizations (name),
    users (full_name)
  `)
  .eq('pipeline_id', pipelineId)
  .eq('status', 'open')
  .order('created_at', { ascending: false })
```

### Create deal with products

```typescript
// 1. Create deal
const { data: deal, error: dealError } = await supabase
  .from('deals')
  .insert({
    title: 'Casamento João & Maria',
    pipeline_id: pipelineId,
    stage_id: stageId,
    organization_id: orgId,
    contact_ids: [contactId1, contactId2],
    value: 25000,
  })
  .select()
  .single()

// 2. Add products
const { error: productsError } = await supabase
  .from('deal_products')
  .insert([
    {
      deal_id: deal.id,
      product_id: 'prod-1',
      quantity: 2,
      unit_price: 450,
      total: 900,
    },
    {
      deal_id: deal.id,
      product_id: 'prod-2',
      quantity: 10,
      unit_price: 180,
      total: 1800,
    },
  ])
```

### Subscribe to deal changes (Realtime)

```typescript
supabase
  .channel('deals')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'deals',
    filter: `pipeline_id=eq.${pipelineId}`
  }, (payload) => {
    console.log('Deal changed:', payload)
    // Update UI (Kanban board)
  })
  .subscribe()
```

---

## ✅ Checklist: Before You Code

- [ ] Read `DATABASE-SCHEMA-V2-ANALYSIS.md`
- [ ] Read `API-SPEC-V1.yaml`
- [ ] Understand contacts vs. organizations
- [ ] Understand JSONB fields (emails, phones, contact_ids)
- [ ] Know when to use loss_reasons vs. TEXT
- [ ] Set up RLS policies
- [ ] Use indexes (never full table scan!)
- [ ] Always paginate (limit 50-100)
- [ ] Test with Realtime subscriptions

---

## 🚨 Common Mistakes

### ❌ DON'T: Store emails as TEXT

```sql
-- BAD
ALTER TABLE organizations ADD COLUMN email TEXT;
```

### ✅ DO: Use contacts table

```sql
-- GOOD
INSERT INTO contacts (organization_id, emails) VALUES
  (org_id, '[{"type": "work", "value": "email@example.com"}]');
```

### ❌ DON'T: Use TEXT for loss_reason

```sql
-- BAD
UPDATE deals SET lost_reason = 'Preço alto' WHERE id = deal_id;
```

### ✅ DO: Use loss_reasons FK

```sql
-- GOOD
UPDATE deals SET loss_reason_id = (
  SELECT id FROM loss_reasons WHERE name = 'Preço Alto'
) WHERE id = deal_id;
```

### ❌ DON'T: Load all deals

```sql
-- BAD (1M deals = crash!)
SELECT * FROM deals;
```

### ✅ DO: Paginate + filter

```sql
-- GOOD
SELECT * FROM deals
WHERE pipeline_id = $1 AND status = 'open'
LIMIT 50 OFFSET 0;
```

---

## 🎓 Learn More

- **Full Schema**: `protocol/DATABASE-SCHEMA-V2-ANALYSIS.md`
- **API Spec**: `protocol/API-SPEC-V1.yaml`
- **Visual Comparison**: `protocol/SCHEMA-VISUAL-COMPARISON.md`
- **Summary**: `protocol/BACKEND-ANALYSIS-SUMMARY.md`

---

**Built with ❤️ by @backend-specialist**
**STAGETEK Engineering Team**
**Print Date**: 2 de Outubro de 2025
