# STAGETEK CRM - Database Schema V2 Analysis

**Backend Specialist Deliverable**
**Date**: 2 de Outubro de 2025
**Version**: 2.0.0

---

## 1. SCHEMA COMPARISON: RD Station vs. STAGETEK V1

### 1.1 What We Have (STAGETEK V1)

| Table | Purpose | RD Equivalent |
|-------|---------|---------------|
| `profiles` | User profiles (extends Supabase Auth) | `users` |
| `clients` | B2B clients with CNPJ | `organizations` (partially) |
| `funnels` | Sales pipelines | `pipelines` |
| `stages` | Funnel stages | `stages` |
| `opportunities` | Sales opportunities | `deals` |
| `products` | Product catalog | `products` |
| `opportunity_products` | Products linked to opportunities | `deal_products` |
| `activities` | Timeline/audit log | `activity_log` |

### 1.2 What We're MISSING (Critical for RD Station Parity)

#### **MISSING TABLE 1: `contacts`**
**RD Station has**: Individual contacts separate from organizations
**STAGETEK has**: Only `clients` (conflates contacts + organizations)

**Impact**: Cannot track multiple decision-makers at the same company.

**Example**:
- **RD Station**:
  - Organization: "Buffet Jardim das Flores"
  - Contacts: João (CEO), Maria (Event Manager), Pedro (Finance)
- **STAGETEK V1**:
  - Client: "Buffet Jardim das Flores" (only 1 email field!)

#### **MISSING TABLE 2: `tasks`**
**RD Station has**: Tasks with types (call, email, meeting), due dates, status
**STAGETEK has**: No task management

**Impact**: Cannot manage follow-ups, no reminders, no activity tracking.

#### **MISSING TABLE 3: `loss_reasons`**
**RD Station has**: Structured table with position, is_active
**STAGETEK has**: `lost_reason` as TEXT field in opportunities

**Impact**: Cannot analyze loss patterns (e.g., "Preço Alto" = 40% of losses).

#### **MISSING TABLE 4: `sources`**
**RD Station has**: Deal sources (origin tracking)
**STAGETEK has**: `source` as TEXT field in opportunities

**Impact**: Cannot track ROI by channel (Google Ads, Indicação, WhatsApp).

#### **MISSING TABLE 5: `webhook_events`**
**RD Station has**: Event-driven architecture (deal.created, contact.updated)
**STAGETEK has**: Only `activities` (manual logs)

**Impact**: Cannot integrate with external systems, no real-time sync.

#### **MISSING TABLE 6: `teams`**
**RD Station has**: Users belong to teams
**STAGETEK has**: No team management

**Impact**: Cannot segment reports by team, no "view team's opportunities".

### 1.3 Additional Gaps

| Feature | RD Station | STAGETEK V1 | Gap |
|---------|-----------|-------------|-----|
| **CNPJ/Document** | `organizations.document` | `clients.cnpj` | ✅ We have it |
| **Custom Fields** | `custom_fields JSONB` | No custom fields | ❌ Missing |
| **Email Tracking** | `emails` table with opened_at, replied_at | No email tracking | ❌ Missing |
| **Contact Relationships** | M2M contacts ↔ organizations | 1:1 only | ❌ Missing |
| **Deal-Contact Link** | `deals.contact_ids[]` array | `opportunities.client_id` single | ❌ Missing |
| **Pipeline Defaults** | `pipelines.is_default` | `funnels.is_default` | ✅ We have it |
| **Stage Probability** | `stages.probability` (0-100) | `stages.probability` | ✅ We have it |
| **Stage Order** | `stages.order` | `stages.display_order` | ✅ We have it |
| **Rotten Days** | `stages.rotten_days` | No | ❌ Missing |
| **Deal Currency** | `deals.currency` (BRL, USD, EUR) | No | ❌ Missing |
| **Deal Expected Close** | `deals.expected_close_date` | `opportunities.expected_close_date` | ✅ We have it |

---

## 2. PROPOSED SCHEMA V2 (SQL MIGRATIONS)

### 2.1 Core Philosophy

**Approach**: **Superset Schema**
- Start with RD Station structure (proven, battle-tested)
- Add STAGETEK-specific fields (events, equipment)
- Use JSONB for extensibility (custom_fields)
- Add fields NOW even if unused (avoid migrations later)

### 2.2 Migration Strategy

**Steps**:
1. **Phase 1 (MVP)**: Core tables (contacts, organizations, deals, pipelines, stages)
2. **Phase 2 (Enhancements)**: Tasks, loss_reasons, sources, teams
3. **Phase 3 (Advanced)**: Webhooks, custom_fields, automations
4. **Phase 4 (STAGETEK-specific)**: Events, equipment, equipment_bookings

### 2.3 SQL Migrations

#### **MIGRATION 001: Core Tables (Phase 1)**

```sql
-- ==============================================================================
-- STAGETEK CRM - SCHEMA V2
-- Migration 001: Core Tables (MVP)
-- Date: 2025-10-02
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- TABLE: users (extends Supabase Auth)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user')),
  team_id UUID, -- FK added later
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_team_id ON users(team_id);
CREATE INDEX idx_users_is_active ON users(is_active);

-- ==============================================================================
-- TABLE: teams
-- ==============================================================================
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  manager_id UUID REFERENCES users(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_teams_manager_id ON teams(manager_id);

-- Add FK from users to teams
ALTER TABLE users ADD CONSTRAINT fk_users_team_id
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL;

-- ==============================================================================
-- TABLE: organizations (companies - B2B clients)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rd_id TEXT UNIQUE, -- For future RD Station sync

  -- Basic Info
  name TEXT NOT NULL,
  legal_name TEXT, -- Razão Social
  cnpj TEXT, -- Brazilian tax ID (14 digits)
  website TEXT,

  -- Address (JSONB for flexibility)
  address JSONB DEFAULT '{}'::jsonb,
  -- Example: {"street": "Rua X", "number": "123", "city": "São Paulo", "state": "SP", "zip": "01234-567", "country": "BR"}

  -- Owner
  owner_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Metadata
  segment TEXT, -- "Eventos", "Shows", "Corporativo"
  industry TEXT, -- "Entretenimento", "Educação"
  size TEXT, -- "1-10", "11-50", "51-200", "201-500", "500+"

  -- Custom Fields (extensible)
  custom_fields JSONB DEFAULT '{}'::jsonb,

  -- Stats (updated by triggers)
  total_revenue NUMERIC(12,2) DEFAULT 0,
  total_deals INTEGER DEFAULT 0,

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_organizations_cnpj ON organizations(cnpj);
CREATE INDEX idx_organizations_owner_id ON organizations(owner_id);
CREATE INDEX idx_organizations_status ON organizations(status);
CREATE INDEX idx_organizations_segment ON organizations(segment);
CREATE INDEX idx_organizations_created_at ON organizations(created_at DESC);

-- Unique constraint on CNPJ (if provided)
CREATE UNIQUE INDEX idx_organizations_cnpj_unique ON organizations(cnpj) WHERE cnpj IS NOT NULL;

-- ==============================================================================
-- TABLE: contacts (individual people)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rd_id TEXT UNIQUE, -- For future RD Station sync

  -- Basic Info
  name TEXT NOT NULL,

  -- Emails (array of objects)
  emails JSONB DEFAULT '[]'::jsonb,
  -- Example: [{"type": "work", "value": "joao@empresa.com", "primary": true}]

  -- Phones (array of objects)
  phones JSONB DEFAULT '[]'::jsonb,
  -- Example: [{"type": "mobile", "country": "55", "area": "11", "number": "988887777", "primary": true}]

  -- Organization Link
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  job_title TEXT,
  department TEXT,

  -- Owner
  owner_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Tags
  tags TEXT[] DEFAULT '{}',

  -- Custom Fields (extensible)
  custom_fields JSONB DEFAULT '{}'::jsonb,

  -- Social
  linkedin_url TEXT,
  twitter_handle TEXT,

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contacts_organization_id ON contacts(organization_id);
CREATE INDEX idx_contacts_owner_id ON contacts(owner_id);
CREATE INDEX idx_contacts_is_active ON contacts(is_active);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_tags ON contacts USING GIN(tags);

-- GIN index for JSONB search (emails, phones)
CREATE INDEX idx_contacts_emails ON contacts USING GIN(emails);
CREATE INDEX idx_contacts_phones ON contacts USING GIN(phones);

-- ==============================================================================
-- TABLE: pipelines (funnels)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS pipelines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rd_id TEXT UNIQUE,

  name TEXT NOT NULL,
  description TEXT,

  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pipelines_is_default ON pipelines(is_default);
CREATE INDEX idx_pipelines_is_active ON pipelines(is_active);
CREATE INDEX idx_pipelines_display_order ON pipelines(display_order);

-- Ensure only ONE default pipeline
CREATE UNIQUE INDEX idx_pipelines_single_default ON pipelines(is_default) WHERE is_default = true;

-- ==============================================================================
-- TABLE: stages
-- ==============================================================================
CREATE TABLE IF NOT EXISTS stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rd_id TEXT UNIQUE,

  pipeline_id UUID NOT NULL REFERENCES pipelines(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  sigla TEXT, -- "QL", "RN", "PR", "NG", "FC" (STAGETEK-specific)
  color TEXT DEFAULT 'gray' CHECK (color IN ('gray', 'blue', 'purple', 'orange', 'green', 'red', 'yellow', 'teal')),

  display_order INTEGER NOT NULL,

  -- Win probability (0-100%)
  probability INTEGER DEFAULT 0 CHECK (probability >= 0 AND probability <= 100),

  -- Rotten days (deal considered stale after N days)
  rotten_days INTEGER DEFAULT 30,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(pipeline_id, display_order)
);

CREATE INDEX idx_stages_pipeline_id ON stages(pipeline_id);
CREATE INDEX idx_stages_display_order ON stages(display_order);

-- ==============================================================================
-- TABLE: loss_reasons
-- ==============================================================================
CREATE TABLE IF NOT EXISTS loss_reasons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rd_id TEXT UNIQUE,

  name TEXT NOT NULL,
  description TEXT,

  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_loss_reasons_is_active ON loss_reasons(is_active);
CREATE INDEX idx_loss_reasons_display_order ON loss_reasons(display_order);

-- ==============================================================================
-- TABLE: sources (lead/deal sources)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rd_id TEXT UNIQUE,

  name TEXT NOT NULL,
  channel TEXT, -- "organic", "paid", "referral", "direct"

  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sources_is_active ON sources(is_active);
CREATE INDEX idx_sources_channel ON sources(channel);

-- ==============================================================================
-- TABLE: deals (opportunities)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rd_id TEXT UNIQUE,

  -- Title
  title TEXT NOT NULL,
  description TEXT,

  -- Relationships
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,

  -- Multiple contacts (JSONB array of UUIDs)
  contact_ids JSONB DEFAULT '[]'::jsonb,
  -- Example: ["uuid1", "uuid2", "uuid3"]

  -- Pipeline & Stage
  pipeline_id UUID NOT NULL REFERENCES pipelines(id) ON DELETE RESTRICT,
  stage_id UUID NOT NULL REFERENCES stages(id) ON DELETE RESTRICT,

  -- Owner
  owner_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Value
  value NUMERIC(12,2) DEFAULT 0,
  currency TEXT DEFAULT 'BRL' CHECK (currency IN ('BRL', 'USD', 'EUR')),

  -- Probability (inherited from stage, but can be overridden)
  probability INTEGER DEFAULT 0 CHECK (probability >= 0 AND probability <= 100),

  -- Dates
  expected_close_date DATE,

  -- Status
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'won', 'lost')),
  won_at TIMESTAMPTZ,
  lost_at TIMESTAMPTZ,

  -- Loss reason
  loss_reason_id UUID REFERENCES loss_reasons(id) ON DELETE SET NULL,

  -- Source
  source_id UUID REFERENCES sources(id) ON DELETE SET NULL,
  campaign TEXT, -- "Google Ads - Casamento", "Indicação João Silva"

  -- STAGETEK-specific fields
  event_name TEXT, -- "Casamento João & Maria"
  event_date DATE,
  event_venue TEXT,
  qualification INTEGER CHECK (qualification >= 1 AND qualification <= 5), -- ★★★★★

  -- Custom Fields (extensible)
  custom_fields JSONB DEFAULT '{}'::jsonb,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_deals_organization_id ON deals(organization_id);
CREATE INDEX idx_deals_pipeline_id ON deals(pipeline_id);
CREATE INDEX idx_deals_stage_id ON deals(stage_id);
CREATE INDEX idx_deals_owner_id ON deals(owner_id);
CREATE INDEX idx_deals_status ON deals(status);
CREATE INDEX idx_deals_loss_reason_id ON deals(loss_reason_id);
CREATE INDEX idx_deals_source_id ON deals(source_id);
CREATE INDEX idx_deals_expected_close_date ON deals(expected_close_date);
CREATE INDEX idx_deals_event_date ON deals(event_date);
CREATE INDEX idx_deals_created_at ON deals(created_at DESC);

-- GIN index for JSONB search (contact_ids, custom_fields)
CREATE INDEX idx_deals_contact_ids ON deals USING GIN(contact_ids);
CREATE INDEX idx_deals_custom_fields ON deals USING GIN(custom_fields);

-- ==============================================================================
-- TABLE: products
-- ==============================================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rd_id TEXT UNIQUE,

  name TEXT NOT NULL,
  sku TEXT UNIQUE,

  description TEXT,

  -- Category (STAGETEK-specific)
  category TEXT DEFAULT 'fabricacao' CHECK (category IN ('fabricacao', 'revenda_som', 'revenda_luz', 'locacao', 'servico')),
  subcategory TEXT, -- "treliças", "talhas", "caixas", "moving heads"

  -- Pricing
  unit_price NUMERIC(10,2) DEFAULT 0,
  cost_price NUMERIC(10,2),
  currency TEXT DEFAULT 'BRL',

  -- Stock (for equipment)
  stock_quantity INTEGER DEFAULT 0,
  min_stock INTEGER DEFAULT 0,
  unit TEXT DEFAULT 'unidade', -- "metro", "kg", "dia"

  -- Specifications (JSONB)
  specifications JSONB DEFAULT '{}'::jsonb,
  -- Example: {"weight": "25kg", "dimensions": "3m x 0.3m x 0.3m", "capacity": "500kg"}

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Images
  image_url TEXT,

  -- Custom Fields
  custom_fields JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- ==============================================================================
-- TABLE: deal_products (M2M)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS deal_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rd_id TEXT UNIQUE,

  deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,

  quantity NUMERIC(10,2) DEFAULT 1,
  unit_price NUMERIC(10,2) NOT NULL,
  discount NUMERIC(5,2) DEFAULT 0, -- Percentage (0-100)
  total NUMERIC(12,2) NOT NULL,

  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(deal_id, product_id)
);

CREATE INDEX idx_deal_products_deal_id ON deal_products(deal_id);
CREATE INDEX idx_deal_products_product_id ON deal_products(product_id);

-- ==============================================================================
-- TABLE: tasks
-- ==============================================================================
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rd_id TEXT UNIQUE,

  title TEXT NOT NULL,
  description TEXT,

  -- Type
  type TEXT DEFAULT 'call' CHECK (type IN ('call', 'email', 'meeting', 'whatsapp', 'other')),

  -- Status
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'completed', 'cancelled')),

  -- Due date
  due_date TIMESTAMPTZ,

  -- Relationships
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,

  -- Owner
  owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Notes
  notes TEXT,

  -- Completion
  completed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tasks_deal_id ON tasks(deal_id);
CREATE INDEX idx_tasks_contact_id ON tasks(contact_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_created_at ON tasks(created_at DESC);

-- ==============================================================================
-- TABLE: activities (audit log / timeline)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Entity (polymorphic)
  entity_type TEXT NOT NULL CHECK (entity_type IN ('deal', 'contact', 'organization', 'product', 'task')),
  entity_id UUID NOT NULL,

  -- Activity
  activity_type TEXT NOT NULL, -- "created", "updated", "stage_changed", "won", "lost", "email_sent", etc.
  description TEXT NOT NULL,

  -- Metadata (JSONB for flexibility)
  metadata JSONB DEFAULT '{}'::jsonb,
  -- Example: {"old_value": "stage_1", "new_value": "stage_2"}

  -- User who performed action
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activities_entity ON activities(entity_type, entity_id);
CREATE INDEX idx_activities_created_at ON activities(created_at DESC);
CREATE INDEX idx_activities_created_by ON activities(created_by);

-- GIN index for JSONB metadata search
CREATE INDEX idx_activities_metadata ON activities USING GIN(metadata);

-- ==============================================================================
-- TABLE: webhook_events (for future integrations)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS webhook_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  event_id TEXT UNIQUE NOT NULL, -- From external system (e.g., RD Station event_id)
  event_type TEXT NOT NULL, -- "deal.created", "contact.updated"

  occurred_at TIMESTAMPTZ NOT NULL,

  -- Raw payload
  payload JSONB NOT NULL,

  -- Processing status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'processed', 'failed')),
  processed_at TIMESTAMPTZ,
  error_message TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_webhook_events_event_id ON webhook_events(event_id);
CREATE INDEX idx_webhook_events_event_type ON webhook_events(event_type);
CREATE INDEX idx_webhook_events_status ON webhook_events(status);
CREATE INDEX idx_webhook_events_occurred_at ON webhook_events(occurred_at DESC);

-- ==============================================================================
-- TRIGGERS
-- ==============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pipelines_updated_at BEFORE UPDATE ON pipelines FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stages_updated_at BEFORE UPDATE ON stages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loss_reasons_updated_at BEFORE UPDATE ON loss_reasons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sources_updated_at BEFORE UPDATE ON sources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deal_products_updated_at BEFORE UPDATE ON deal_products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- SEED DATA (Loss Reasons, Sources)
-- ==============================================================================

INSERT INTO loss_reasons (name, display_order) VALUES
  ('Preço Alto', 1),
  ('Sem Resposta do Cliente', 2),
  ('Perdeu para Concorrente', 3),
  ('Não Tem Orçamento', 4),
  ('Adiou o Evento', 5),
  ('Outro', 99)
ON CONFLICT DO NOTHING;

INSERT INTO sources (name, channel) VALUES
  ('Google Ads', 'paid'),
  ('Facebook Ads', 'paid'),
  ('Instagram', 'organic'),
  ('Indicação', 'referral'),
  ('Site', 'direct'),
  ('WhatsApp', 'direct'),
  ('E-mail Marketing', 'email'),
  ('Outro', 'other')
ON CONFLICT DO NOTHING;

-- ==============================================================================
-- END OF MIGRATION 001
-- ==============================================================================
```

---

## 3. API ENDPOINTS SPECIFICATION

### 3.1 URL Structure

**Base URL**: `https://api.stagetek.com.br/v1`

**Authentication**: JWT Bearer Token (Supabase Auth)

```http
Authorization: Bearer <supabase_access_token>
```

### 3.2 Endpoint Mapping (RD Station → STAGETEK)

| RD Station Endpoint | STAGETEK Endpoint | Method | Purpose |
|---------------------|-------------------|--------|---------|
| `GET /crm/v2/contacts` | `GET /v1/contacts` | GET | List contacts |
| `POST /crm/v2/contacts` | `POST /v1/contacts` | POST | Create contact |
| `GET /crm/v2/contacts/:id` | `GET /v1/contacts/:id` | GET | Get contact |
| `PUT /crm/v2/contacts/:id` | `PUT /v1/contacts/:id` | PUT | Update contact |
| `DELETE /crm/v2/contacts/:id` | `DELETE /v1/contacts/:id` | DELETE | Delete contact |
| `GET /crm/v2/organizations` | `GET /v1/organizations` | GET | List organizations |
| `POST /crm/v2/organizations` | `POST /v1/organizations` | POST | Create organization |
| `GET /crm/v2/deals` | `GET /v1/deals` | GET | List deals |
| `POST /crm/v2/deals` | `POST /v1/deals` | POST | Create deal |
| `PUT /crm/v2/deals/:id` | `PUT /v1/deals/:id` | PUT | Update deal |
| `GET /crm/v2/pipelines` | `GET /v1/pipelines` | GET | List pipelines |
| `GET /crm/v2/stages` | `GET /v1/stages` | GET | List stages |
| `GET /crm/v2/tasks` | `GET /v1/tasks` | GET | List tasks |
| `POST /crm/v2/tasks` | `POST /v1/tasks` | POST | Create task |
| `GET /crm/v2/products` | `GET /v1/products` | GET | List products |
| `POST /crm/v2/deal-products` | `POST /v1/deals/:id/products` | POST | Add product to deal |

### 3.3 Query Parameters (Filtering)

**RD Station uses RDQL**:
```
rdql=status='open' AND value > 50000 ORDER BY created_at DESC LIMIT 100
```

**STAGETEK uses simplified filters**:
```
?status=open&value_min=50000&sort=-created_at&limit=100
```

**Filter Examples**:

```http
# Deals by pipeline
GET /v1/deals?pipeline_id=uuid-123

# Deals by stage
GET /v1/deals?stage_id=uuid-456

# Deals by owner
GET /v1/deals?owner_id=uuid-789

# Deals by status
GET /v1/deals?status=open

# Deals by value range
GET /v1/deals?value_min=10000&value_max=50000

# Deals by expected close date
GET /v1/deals?expected_close_date_after=2025-10-01&expected_close_date_before=2025-12-31

# Deals with lost reason
GET /v1/deals?status=lost&loss_reason_id=uuid-loss

# Pagination
GET /v1/deals?page=2&limit=50

# Sorting
GET /v1/deals?sort=-created_at (DESC)
GET /v1/deals?sort=value (ASC)

# Multiple filters
GET /v1/deals?status=open&pipeline_id=uuid-123&owner_id=uuid-789&sort=-value
```

### 3.4 Pagination

**Response Format**:
```json
{
  "data": [...],
  "meta": {
    "total": 1234,
    "page": 1,
    "limit": 50,
    "pages": 25
  },
  "links": {
    "first": "/v1/deals?page=1&limit=50",
    "prev": null,
    "next": "/v1/deals?page=2&limit=50",
    "last": "/v1/deals?page=25&limit=50"
  }
}
```

### 3.5 Authentication

**Supabase JWT vs. API Key**

**Option 1: JWT (Recommended for Frontend)**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Pros**:
- ✅ User-level permissions (RLS)
- ✅ Auto-refresh tokens
- ✅ Secure (short-lived)

**Option 2: API Key (For External Integrations)**
```http
Authorization: Bearer stagetek_sk_live_abc123...
```

**Pros**:
- ✅ Long-lived (no refresh)
- ✅ Revocable
- ✅ Scoped (read-only, write)

**Cons**:
- ❌ Less secure (if leaked)
- ❌ No user context

---

## 4. SUPABASE CONSIDERATIONS

### 4.1 Webhooks vs. Realtime

**RD Station uses**: Webhooks (POST to external URL)

**Supabase offers**:
1. **Realtime Subscriptions** (WebSockets)
2. **Database Triggers** (Postgres functions)
3. **Edge Functions** (Deno serverless)

### 4.2 Event-Driven Architecture

**Approach**: Database Triggers → Insert into `webhook_events` → Edge Function → External Webhook

```sql
-- Trigger on deal stage change
CREATE OR REPLACE FUNCTION notify_deal_stage_changed()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.stage_id != OLD.stage_id THEN
    INSERT INTO webhook_events (event_id, event_type, occurred_at, payload) VALUES (
      gen_random_uuid()::text,
      'deal.stage_changed',
      NOW(),
      jsonb_build_object(
        'deal_id', NEW.id,
        'old_stage_id', OLD.stage_id,
        'new_stage_id', NEW.stage_id,
        'owner_id', NEW.owner_id
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_deal_stage_changed
AFTER UPDATE ON deals
FOR EACH ROW
EXECUTE FUNCTION notify_deal_stage_changed();
```

### 4.3 Row Level Security (RLS)

**Example: Users can only see their own deals (or team's)**

```sql
-- Enable RLS
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Policy: Users see own deals
CREATE POLICY "Users see own deals" ON deals
FOR SELECT
USING (
  auth.uid() = owner_id
  OR
  auth.uid() IN (
    SELECT id FROM users WHERE team_id = (SELECT team_id FROM users WHERE id = deals.owner_id)
  )
  OR
  (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'manager')
);

-- Policy: Users can create deals
CREATE POLICY "Users can create deals" ON deals
FOR INSERT
WITH CHECK (auth.uid() = owner_id);

-- Policy: Users can update own deals
CREATE POLICY "Users can update own deals" ON deals
FOR UPDATE
USING (
  auth.uid() = owner_id
  OR
  (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'manager')
);
```

### 4.4 Supabase Realtime

**Frontend subscribes to changes**:

```typescript
// Subscribe to deal updates
const supabase = createClient(...)

supabase
  .channel('deals')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'deals',
    filter: `pipeline_id=eq.${pipelineId}`
  }, (payload) => {
    console.log('Deal changed:', payload)
    // Update UI
  })
  .subscribe()
```

**Use Cases**:
- ✅ Live Kanban updates (drag-and-drop syncs across browsers)
- ✅ CRM Live dashboard (auto-refresh)
- ✅ Notifications (new task assigned)

---

## 5. DATA MIGRATION STRATEGY

### 5.1 Backward Compatibility

**Problem**: Existing V1 data (clients, opportunities, products)

**Solution**: Data migration script

```sql
-- Migration: V1 clients → V2 organizations
INSERT INTO organizations (id, name, cnpj, address, owner_id, segment, total_revenue, total_deals, status, created_at, updated_at)
SELECT
  id,
  name,
  cnpj,
  jsonb_build_object(
    'street', address_street,
    'city', address_city,
    'state', address_state,
    'zip', address_zip
  ),
  created_by,
  segment,
  total_revenue,
  total_events,
  status,
  created_at,
  updated_at
FROM clients;

-- Migration: V1 clients → V2 contacts (extract email as contact)
INSERT INTO contacts (id, name, emails, organization_id, owner_id, created_at, updated_at)
SELECT
  uuid_generate_v4(),
  name,
  jsonb_build_array(
    jsonb_build_object('type', 'work', 'value', email, 'primary', true)
  ),
  id, -- organization_id = client_id
  created_by,
  created_at,
  updated_at
FROM clients
WHERE email IS NOT NULL;

-- Migration: V1 opportunities → V2 deals
INSERT INTO deals (
  id, title, organization_id, pipeline_id, stage_id, owner_id,
  value, status, expected_close_date, event_name, event_date,
  qualification, created_at, updated_at
)
SELECT
  id,
  title,
  client_id, -- now organization_id
  funnel_id, -- now pipeline_id
  stage_id,
  owner_id,
  value,
  status,
  expected_close_date,
  title, -- event_name = title (for now)
  expected_close_date, -- event_date = expected_close_date
  probability / 20, -- Convert 0-100 to 1-5 stars
  created_at,
  updated_at
FROM opportunities;

-- Migration: V1 opportunity_products → V2 deal_products
INSERT INTO deal_products (id, deal_id, product_id, quantity, unit_price, discount, total, created_at, updated_at)
SELECT id, opportunity_id, product_id, quantity, unit_price, discount_percent, total, created_at, updated_at
FROM opportunity_products;
```

### 5.2 Zero-Downtime Migrations

**Strategy**: Blue-Green Deployment

1. **Create V2 schema** (in parallel to V1)
2. **Dual-write** (write to both V1 and V2)
3. **Backfill** V2 with historical V1 data
4. **Validate** data parity
5. **Switch reads** from V1 to V2
6. **Stop writing** to V1
7. **Drop V1 schema** (after 30 days)

**Implementation** (Supabase Edge Function):

```typescript
// Edge Function: dual_write_deal.ts
import { createClient } from '@supabase/supabase-js'

export default async (req) => {
  const supabase = createClient(...)
  const deal = await req.json()

  // Write to V2 (new schema)
  const { data: v2Deal, error: v2Error } = await supabase
    .from('deals')
    .insert(deal)

  // Write to V1 (old schema) - DEPRECATED
  const v1Opportunity = transformDealToOpportunity(deal)
  const { data: v1Opp, error: v1Error } = await supabase
    .from('opportunities')
    .insert(v1Opportunity)

  if (v2Error) return new Response(JSON.stringify({ error: v2Error }), { status: 500 })

  return new Response(JSON.stringify({ data: v2Deal }), { status: 201 })
}
```

### 5.3 Data Seeding

**Seed Default Pipelines & Stages**:

```sql
-- Seed: Default Pipeline
INSERT INTO pipelines (id, name, is_default, is_active, display_order) VALUES
('11111111-1111-1111-1111-111111111111', 'Funil de Vendas', true, true, 1)
ON CONFLICT DO NOTHING;

-- Seed: Default Stages
INSERT INTO stages (id, pipeline_id, name, sigla, color, display_order, probability, rotten_days) VALUES
('22222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111', 'Qualificação', 'QL', 'gray', 1, 10, 7),
('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Reunião', 'RN', 'blue', 2, 30, 14),
('22222222-2222-2222-2222-222222222223', '11111111-1111-1111-1111-111111111111', 'Proposta', 'PR', 'purple', 3, 50, 21),
('22222222-2222-2222-2222-222222222224', '11111111-1111-1111-1111-111111111111', 'Negociação', 'NG', 'orange', 4, 75, 30),
('22222222-2222-2222-2222-222222222225', '11111111-1111-1111-1111-111111111111', 'Fechamento', 'FC', 'green', 5, 95, 7)
ON CONFLICT DO NOTHING;
```

---

## 6. FUTURE-PROOF FIELDS (Add NOW, Use Later)

### 6.1 Fields to Add NOW (Even if Unused)

**Table: organizations**
- `parent_organization_id` UUID (for holding companies)
- `annual_revenue` NUMERIC (for lead scoring)
- `employees_count` INTEGER (for segmentation)

**Table: contacts**
- `lead_score` INTEGER (0-100, for AI prioritization)
- `last_contacted_at` TIMESTAMPTZ
- `unsubscribed_at` TIMESTAMPTZ (LGPD compliance)

**Table: deals**
- `competitor` TEXT (who we're competing against)
- `next_steps` TEXT (what needs to happen next)
- `ai_insights` JSONB (for Claude-powered recommendations)

**Table: tasks**
- `reminder_sent_at` TIMESTAMPTZ
- `call_duration_seconds` INTEGER (for analytics)
- `recording_url` TEXT (if using VoIP integration)

**Table: products**
- `stripe_product_id` TEXT (for future payments)
- `discontinued_at` TIMESTAMPTZ

---

## 7. RECOMMENDATIONS

### 7.1 Immediate Actions (This Week)

1. ✅ **Execute Migration 001** (Core Tables)
2. ✅ **Seed loss_reasons, sources, default pipeline**
3. ✅ **Migrate existing V1 data** (clients → organizations, opportunities → deals)
4. ✅ **Setup RLS policies** (users can only see own/team deals)
5. ✅ **Create Supabase Edge Function** for webhook_events processing

### 7.2 Phase 2 (Next Week)

1. Build REST API wrapper (if needed)
2. Implement RDQL-like filtering (or use PostgREST)
3. Add custom_fields UI (Phase 2)
4. Add email_templates table + CRUD

### 7.3 Phase 3 (Month 2)

1. Implement AI Lead Scoring (Claude API)
2. Add automations engine (triggers + actions)
3. WhatsApp integration (via webhook_events)
4. Google Calendar sync

---

**Built with ❤️ by Backend Specialist**
**STAGETEK Engineering Team**
**Data**: 2 de Outubro de 2025
