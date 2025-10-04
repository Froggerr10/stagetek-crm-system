# Database Schema Visual Comparison

**STAGETEK V1 vs. V2 vs. RD Station**

---

## Table Count

```
RD Station:  14 tables
STAGETEK V1:  8 tables ❌ Missing 6 critical tables
STAGETEK V2: 13 tables ✅ Full parity + STAGETEK extensions
```

---

## Side-by-Side Comparison

```
┌─────────────────────────────────────────────────────────────────────────┐
│ TABLE COMPARISON                                                        │
├──────────────────────┬──────────────────────┬──────────────────────────┤
│ RD STATION           │ STAGETEK V1          │ STAGETEK V2              │
├──────────────────────┼──────────────────────┼──────────────────────────┤
│ users                │ profiles             │ users                    │
│ teams                │ ❌ MISSING           │ teams ✅                 │
│ organizations        │ clients              │ organizations ✅         │
│                      │ (conflated!)         │                          │
│ contacts             │ ❌ MISSING           │ contacts ✅              │
│                      │ (embedded in         │ (separate table!)        │
│                      │ clients.email)       │                          │
│ pipelines            │ funnels              │ pipelines ✅             │
│ stages               │ stages               │ stages ✅                │
│ deals                │ opportunities        │ deals ✅                 │
│ products             │ products             │ products ✅              │
│ deal_products        │ opportunity_products │ deal_products ✅         │
│ tasks                │ ❌ MISSING           │ tasks ✅                 │
│ loss_reasons         │ ❌ MISSING           │ loss_reasons ✅          │
│                      │ (TEXT field)         │ (structured table)       │
│ sources              │ ❌ MISSING           │ sources ✅               │
│                      │ (TEXT field)         │ (structured table)       │
│ webhook_events       │ ❌ MISSING           │ webhook_events ✅        │
│ activity_log         │ activities           │ activities ✅            │
├──────────────────────┴──────────────────────┴──────────────────────────┤
│ STAGETEK-SPECIFIC ADDITIONS (not in RD Station)                        │
├─────────────────────────────────────────────────────────────────────────┤
│ ❌ events                                   │ ⏳ Phase 2 (future)      │
│ ❌ equipment                                │ ⏳ Phase 2 (future)      │
│ ❌ event_equipment                          │ ⏳ Phase 2 (future)      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Field-Level Comparison: Deals/Opportunities

```
┌────────────────────────────────────────────────────────────────────────┐
│ DEALS/OPPORTUNITIES FIELD COMPARISON                                   │
├───────────────────────┬────────────────────────┬───────────────────────┤
│ RD STATION            │ STAGETEK V1            │ STAGETEK V2           │
├───────────────────────┼────────────────────────┼───────────────────────┤
│ id                    │ id                     │ id                    │
│ rd_id                 │ ❌                     │ rd_id ✅              │
│ title                 │ title                  │ title                 │
│ description           │ description            │ description           │
│ organization_id       │ client_id              │ organization_id ✅    │
│ contact_ids[] (array) │ ❌                     │ contact_ids[] ✅      │
│                       │ (only client_id)       │ (JSONB array)         │
│ pipeline_id           │ funnel_id              │ pipeline_id ✅        │
│ stage_id              │ stage_id               │ stage_id              │
│ owner_id              │ owner_id               │ owner_id              │
│ value                 │ value                  │ value                 │
│ currency              │ ❌                     │ currency ✅           │
│                       │ (assumed BRL)          │ (BRL/USD/EUR)         │
│ probability           │ probability            │ probability           │
│ expected_close_date   │ expected_close_date    │ expected_close_date   │
│ status                │ status                 │ status                │
│ won_at                │ ❌                     │ won_at ✅             │
│ lost_at               │ closed_at (generic)    │ lost_at ✅            │
│ loss_reason_id        │ lost_reason (TEXT!)    │ loss_reason_id ✅     │
│ source_id             │ ❌                     │ source_id ✅          │
│ campaign              │ ❌                     │ campaign ✅           │
│ custom_fields         │ ❌                     │ custom_fields ✅      │
│                       │                        │ (JSONB)               │
├───────────────────────┴────────────────────────┴───────────────────────┤
│ STAGETEK-SPECIFIC FIELDS (Events)                                      │
├─────────────────────────────────────────────────────────────────────────┤
│ ❌                    │ ❌                     │ event_name            │
│ ❌                    │ ❌                     │ event_date            │
│ ❌                    │ ❌                     │ event_venue           │
│ ❌                    │ ❌                     │ qualification (1-5★)  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Contact vs. Client Problem (V1)

### STAGTEK V1 (WRONG)

```
clients
├── id
├── name             "Buffet Jardim das Flores"
├── cnpj             "12.345.678/0001-90"
├── email            "contato@buffet.com"  ← ONLY 1 EMAIL!
└── phone            "(11) 98888-7777"      ← ONLY 1 PHONE!

Problem: What if we need to contact:
- João (CEO) - joao@buffet.com
- Maria (Event Manager) - maria@buffet.com
- Pedro (Finance) - pedro@buffet.com

We can't! Only 1 email field.
```

### STAGETEK V2 (CORRECT - Like RD Station)

```
organizations
├── id
├── name             "Buffet Jardim das Flores"
├── legal_name       "Buffet Jardim das Flores Ltda."
├── cnpj             "12.345.678/0001-90"
└── (no email/phone - those belong to contacts!)

contacts
├── id: "contact-1"
│   ├── name: "João Silva"
│   ├── emails: [{"type": "work", "value": "joao@buffet.com"}]
│   ├── phones: [{"type": "mobile", "value": "11988887777"}]
│   ├── job_title: "CEO"
│   └── organization_id: "org-buffet"
│
├── id: "contact-2"
│   ├── name: "Maria Costa"
│   ├── emails: [{"type": "work", "value": "maria@buffet.com"}]
│   ├── job_title: "Event Manager"
│   └── organization_id: "org-buffet"
│
└── id: "contact-3"
    ├── name: "Pedro Lima"
    ├── emails: [{"type": "work", "value": "pedro@buffet.com"}]
    ├── job_title: "Finance"
    └── organization_id: "org-buffet"

deals
└── id: "deal-123"
    ├── organization_id: "org-buffet"
    └── contact_ids: ["contact-1", "contact-2", "contact-3"]
        ↑ Multiple decision-makers!
```

---

## Loss Reasons: TEXT vs. Table

### STAGETEK V1 (WRONG)

```sql
opportunities
└── lost_reason TEXT

Problems:
- ❌ Typos: "Preço alto", "preço alto", "PREÇO ALTO", "preco alto"
- ❌ Can't analyze: "What are top 3 reasons for lost deals?"
- ❌ Can't disable old reasons
- ❌ Can't reorder in dropdown
```

### STAGETEK V2 (CORRECT)

```sql
loss_reasons
├── id
├── name             "Preço Alto"
├── description      "Cliente achou o valor acima do orçamento"
├── display_order    1
└── is_active        true

deals
└── loss_reason_id   (FK to loss_reasons.id)

Benefits:
- ✅ No typos (dropdown with fixed values)
- ✅ Analytics: SELECT name, COUNT(*) FROM deals JOIN loss_reasons ... GROUP BY name
  → "Preço Alto: 40%, Sem Resposta: 35%, Concorrente: 15%"
- ✅ Can deactivate (is_active = false) → hides from dropdown, keeps historical data
- ✅ Can reorder (display_order) → "Preço Alto" at top
```

---

## Emails/Phones: JSONB vs. Separate Tables

### Option A: Separate Tables (BAD)

```sql
contacts
└── id, name

contact_emails
├── id
├── contact_id (FK)
├── type (work, personal)
├── value (email)
└── is_primary

contact_phones
├── id
├── contact_id (FK)
├── type (mobile, work)
├── country, area, number
└── is_primary

Query:
SELECT c.name, e.value, p.number
FROM contacts c
LEFT JOIN contact_emails e ON c.id = e.contact_id AND e.is_primary = true
LEFT JOIN contact_phones p ON c.id = p.contact_id AND p.is_primary = true
WHERE c.id = 'uuid-123'

→ 3 tables, 2 JOINs, slow!
```

### Option B: JSONB (GOOD - RD Station way)

```sql
contacts
├── id
├── name
├── emails JSONB
│   [
│     {"type": "work", "value": "joao@empresa.com", "primary": true},
│     {"type": "personal", "value": "joao@gmail.com", "primary": false}
│   ]
└── phones JSONB
    [
      {"type": "mobile", "country": "55", "area": "11", "number": "988887777", "primary": true},
      {"type": "work", "country": "55", "area": "11", "number": "32221111", "primary": false}
    ]

Query:
SELECT name, emails, phones FROM contacts WHERE id = 'uuid-123'

→ 1 table, 0 JOINs, fast!

Search:
SELECT * FROM contacts WHERE emails @> '[{"type": "work"}]'
→ GIN index makes this SUPER fast
```

---

## Tasks: Missing in V1

### STAGETEK V1

```
❌ No tasks table!

Workaround:
- Use external tool (Google Tasks, Trello)
- Lose integration with CRM
- No "tasks per deal"
- No "overdue tasks" report
```

### STAGETEK V2 (Like RD Station)

```sql
tasks
├── id
├── title             "Ligar para cliente João"
├── description       "Confirmar data do evento e fechar proposta"
├── type              "call" (call, email, meeting, whatsapp)
├── status            "open" (open, completed, cancelled)
├── due_date          "2025-10-05 15:00:00"
├── deal_id           "deal-123" (FK)
├── contact_id        "contact-456" (FK)
├── assigned_to       "user-789" (FK)
└── notes

Benefits:
- ✅ Tasks linked to deals
- ✅ Tasks linked to contacts
- ✅ Reminders (due_date)
- ✅ Analytics: "João has 15 overdue tasks"
- ✅ Reports: "Team completed 120 tasks this week"
```

---

## Webhook Events: Integration-Ready

### STAGETEK V1

```
❌ No webhook_events table!

If we want to integrate with Zapier/n8n:
- Manual export CSV → Upload to Zapier
- Lose real-time sync
- No audit trail
```

### STAGETEK V2

```sql
webhook_events
├── id
├── event_id          "evt_123" (unique, idempotency)
├── event_type        "deal.stage_changed"
├── occurred_at       "2025-10-02 14:30:00"
├── payload           JSONB
│   {
│     "deal_id": "uuid-123",
│     "old_stage_id": "uuid-old",
│     "new_stage_id": "uuid-new",
│     "owner_id": "uuid-user"
│   }
├── status            "processed" (pending, processing, processed, failed)
├── processed_at      "2025-10-02 14:30:05"
└── error_message     null

Flow:
1. User moves deal in Kanban → Database trigger
2. Trigger inserts into webhook_events
3. Supabase Edge Function reads webhook_events
4. Edge Function POSTs to external URL (Zapier, Slack, WhatsApp)
5. Mark as processed

Benefits:
- ✅ Real-time integrations
- ✅ Retry if webhook fails (status = 'failed')
- ✅ Audit log (all events stored)
- ✅ Replay events (reprocess old events)
```

---

## Custom Fields: Extensibility

### STAGETEK V1

```
❌ No custom_fields!

If client wants to add "Tipo de Evento" field:
1. Add column: ALTER TABLE opportunities ADD COLUMN tipo_evento TEXT
2. Migrate data
3. Update frontend
4. Deploy (downtime!)

Problem: Every new field = migration + deploy
```

### STAGETEK V2

```sql
deals
└── custom_fields JSONB
    {
      "tipo_evento": "Casamento",
      "num_convidados": 200,
      "tem_buffet": true,
      "obs_cliente": "Quer decoração rosa e azul"
    }

Adding new field:
1. Just save in custom_fields (no migration!)
2. Update frontend (no backend change!)

Query:
SELECT * FROM deals WHERE custom_fields->>'tipo_evento' = 'Casamento'

Benefits:
- ✅ No migrations
- ✅ Each deal can have different fields
- ✅ Easy to add/remove fields
- ✅ Still queryable (GIN index)
```

---

## Teams: Missing in V1

### STAGETEK V1

```
users
└── (no team_id)

Problem:
- Can't filter "Show my team's deals"
- Can't do team reports
- Can't assign team goals
```

### STAGETEK V2

```sql
teams
├── id
├── name              "Vendas SP"
└── manager_id        "user-manager"

users
├── id
├── name
├── role
└── team_id           (FK to teams)

deals
└── owner_id          (FK to users)

Query: "Show my team's deals"
SELECT *
FROM deals
WHERE owner_id IN (
  SELECT id FROM users WHERE team_id = (
    SELECT team_id FROM users WHERE id = <current_user>
  )
)

Benefits:
- ✅ Team dashboards
- ✅ Team goals ("Team SP: 80% of goal")
- ✅ Manager view (see all team deals)
- ✅ Team reports
```

---

## Migration Path (V1 → V2)

```
┌─────────────────────────────────────────────────────────────────────┐
│ MIGRATION SCRIPT (Automated)                                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ Step 1: clients → organizations                                     │
│ ┌─────────────────┐                ┌──────────────────┐            │
│ │ clients (V1)    │  ──────────→   │ organizations    │            │
│ │ - id            │                │ (V2)             │            │
│ │ - name          │                │ - id             │            │
│ │ - cnpj          │                │ - name           │            │
│ │ - email         │                │ - cnpj           │            │
│ │ - phone         │                │ - address (JSONB)│            │
│ │ - address_*     │                └──────────────────┘            │
│ └─────────────────┘                                                │
│                                                                     │
│ Step 2: clients.email → contacts                                    │
│ ┌─────────────────┐                ┌──────────────────┐            │
│ │ clients (V1)    │  ──────────→   │ contacts (V2)    │            │
│ │ - email         │                │ - name           │            │
│ │ - phone         │                │ - emails JSONB   │            │
│ └─────────────────┘                │ - phones JSONB   │            │
│                                    │ - organization_id│            │
│                                    └──────────────────┘            │
│                                                                     │
│ Step 3: opportunities → deals                                       │
│ ┌─────────────────┐                ┌──────────────────┐            │
│ │ opportunities   │  ──────────→   │ deals (V2)       │            │
│ │ (V1)            │                │ - id             │            │
│ │ - funnel_id     │                │ - pipeline_id    │            │
│ │ - lost_reason   │                │ - loss_reason_id │            │
│ │   (TEXT)        │                │   (FK)           │            │
│ └─────────────────┘                └──────────────────┘            │
│                                                                     │
│ Step 4: opportunity_products → deal_products                        │
│ ┌─────────────────┐                ┌──────────────────┐            │
│ │ opportunity_    │  ──────────→   │ deal_products    │            │
│ │ products (V1)   │                │ (V2)             │            │
│ └─────────────────┘                └──────────────────┘            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

Duration: ~5 minutes for 10,000 records
Downtime: ZERO (dual-write strategy)
```

---

## Visual Summary

```
                    RD STATION (Reference)
                            │
                            │ Analyze
                            ▼
┌──────────────────────────────────────────────────────────┐
│              STAGETEK CRM SCHEMA V2                      │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────┐  ┌─────────────┐  ┌────────────┐       │
│  │   users    │  │   teams     │  │  sources   │       │
│  └──────┬─────┘  └──────┬──────┘  └──────┬─────┘       │
│         │               │                 │             │
│         │               │                 │             │
│  ┌──────▼───────────────▼─────────────────▼──────┐     │
│  │            organizations                      │     │
│  │  (companies - CNPJ, address, segment)         │     │
│  └──────┬────────────────────────────────────────┘     │
│         │                                               │
│         │ 1:N                                           │
│  ┌──────▼────────┐                                      │
│  │   contacts    │ ← Individual people                  │
│  │  (emails[],   │   (multiple per org)                 │
│  │   phones[])   │                                      │
│  └───────────────┘                                      │
│                                                          │
│  ┌────────────┐  ┌─────────────┐                        │
│  │  pipelines │  │   stages    │ ← Sales funnel         │
│  └──────┬─────┘  └──────┬──────┘                        │
│         │ 1:N           │ 1:N                            │
│         │               │                                │
│  ┌──────▼───────────────▼─────────────────┐             │
│  │              deals                     │             │
│  │  (opportunities with multi-contact)    │             │
│  │  - contact_ids[] (JSONB)               │             │
│  │  - loss_reason_id (FK)                 │             │
│  │  - source_id (FK)                      │             │
│  │  - custom_fields (JSONB)               │             │
│  │  - event_name, event_date ★           │             │
│  └──────┬─────────────────────────────────┘             │
│         │                                                │
│         │ 1:N                                            │
│  ┌──────▼──────────┐  ┌─────────────┐                   │
│  │  deal_products  │  │   tasks     │ ← Follow-ups      │
│  └─────────────────┘  └─────────────┘                   │
│                                                          │
│  ┌──────────────────┐  ┌──────────────┐                 │
│  │  loss_reasons    │  │ webhook_     │ ← Integrations  │
│  │  (structured)    │  │ events       │                 │
│  └──────────────────┘  └──────────────┘                 │
│                                                          │
│  ★ STAGETEK-specific fields (not in RD Station)         │
└──────────────────────────────────────────────────────────┘
```

---

**Built with ❤️ by @backend-specialist**
**STAGETEK Engineering Team**
