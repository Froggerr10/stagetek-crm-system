# Database Schema - STAGETEK CRM

**Versão**: 1.3
**Data**: 25 de Outubro de 2025
**Database**: PostgreSQL 15 (Supabase)
**Status**: Produção

---

## 📊 Schema Overview

### Tables (11 total)
1. `clients` - Clientes B2B
2. `funnels` - Funis de vendas (multi-pipeline)
3. `funnel_stages` - Etapas de cada funil
4. `opportunities` - Oportunidades de venda
5. `contacts` - Contatos vinculados a clientes
6. `notes` - Anotações (timeline, imutáveis)
7. `tasks` - Tarefas (follow-up estruturado)
8. `products` - Catálogo de produtos
9. `quotations` - Cotações (hybrid JSONB model)
10. `auth.users` - Usuários (Supabase Auth)
11. **Storage**: `pdfs` bucket (Supabase Storage)

---

## 🗂️ Entity Relationship Diagram

```
┌─────────────┐
│ auth.users  │
│ (Supabase)  │
└──┬──────────┘
   │
   ├─ created_by ──┐
   ├─ assigned_to ─┤
   │               │
┌──▼─────────┐    │    ┌────────────┐
│  clients   │◄───┼────┤  contacts  │
│            │    │    │            │
└──┬─────────┘    │    └────────────┘
   │              │
   ├─ client_id   │
   │              │
┌──▼──────────────┴──┐
│   opportunities    │
│                    │
└──┬─────────────┬───┘
   │             │
   ├─ opport_id  ├─ opportunity_id
   │             │
┌──▼─────────┐ ┌▼───────────┐ ┌──▼─────────┐
│   notes    │ │   tasks    │ │ quotations │
│ (immutable)│ │ (follow-up)│ │  (hybrid)  │
└────────────┘ └────────────┘ └──┬─────────┘
                                  │
                               ┌──▼─────────┐
                               │  products  │
                               │ (catalog)  │
                               └────────────┘

┌───────────┐
│  funnels  │ (multi-pipeline)
└──┬────────┘
   │
   ├─ funnel_id
   │
┌──▼─────────────┐
│ funnel_stages  │
│ (order_position)│
└────────────────┘
```

---

## 📋 Table Definitions

### 1. clients (Clientes B2B)

**Purpose**: Armazenar empresas/clientes B2B

```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18) UNIQUE,           -- CPF/CNPJ brasileiro
  email VARCHAR(255),
  phone VARCHAR(20),
  website VARCHAR(255),
  address JSONB DEFAULT '{}',        -- Estrutura flexível
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);
```

**Indexes**:
- `idx_clients_cnpj` (unique lookup)
- `idx_clients_status` (filtering)
- `idx_clients_created_at DESC` (recent first)

**address JSONB Structure**:
```json
{
  "street": "Av. Paulista, 1000",
  "city": "São Paulo",
  "state": "SP",
  "zipcode": "01310-100",
  "country": "Brasil"
}
```

---

### 2. contacts (Contatos) ✨ NEW (23 Oct 2025)

**Purpose**: Múltiplos contatos por cliente (stakeholders)

```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  role VARCHAR(100),                 -- Cargo (ex: "Diretor Comercial")
  is_primary BOOLEAN DEFAULT FALSE,  -- Contato principal
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Indexes**:
- `idx_contacts_client_id` (lookup by client)
- `idx_contacts_is_primary` (find primary contacts)

**Business Rules**:
- Cada cliente pode ter N contatos
- Apenas 1 contato pode ser `is_primary = TRUE` por cliente

---

### 3. funnels (Funis de Vendas)

**Purpose**: Múltiplos pipelines de vendas

```sql
CREATE TABLE funnels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,        -- Ex: "Funil Prospecção Ativa"
  description TEXT,
  is_default BOOLEAN DEFAULT FALSE,  -- Funil padrão para novas oportunidades
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);
```

**Business Rules**:
- Apenas 1 funil pode ser `is_default = TRUE`
- Funis inativos (`is_active = FALSE`) não aparecem em dropdowns
- Seed: "Funil de Vendas Principal" criado automaticamente

---

### 4. funnel_stages (Etapas do Funil)

**Purpose**: Etapas customizáveis por funil

```sql
CREATE TABLE funnel_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  funnel_id UUID NOT NULL REFERENCES funnels(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,        -- Ex: "Proposta Enviada"
  color VARCHAR(7) DEFAULT '#6366f1', -- Hex color
  order_position INTEGER NOT NULL,   -- Ordem visual (1, 2, 3...)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Indexes**:
- `idx_funnel_stages_funnel_id` (stages by funnel)
- `idx_funnel_stages_order` (visual ordering)

**Seed (Funil Padrão)**:
1. Sem contato / Lead (#3b82f6 - azul)
2. Contato Feito (#10b981 - verde)
3. Proposta Enviada (#f59e0b - laranja)
4. Negociação (#eab308 - amarelo)
5. Fechamento (#22c55e - verde)

---

### 5. opportunities (Oportunidades de Venda)

**Purpose**: Deals em progresso

```sql
CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,       -- Ex: "Proposta Evento XYZ"
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  funnel_id UUID REFERENCES funnels(id) ON DELETE SET NULL,
  stage_id UUID REFERENCES funnel_stages(id) ON DELETE SET NULL,
  value DECIMAL(15, 2),              -- Valor estimado (BRL)
  expected_close_date DATE,
  probability INTEGER CHECK (probability >= 0 AND probability <= 100),
  temperature VARCHAR(10) CHECK (temperature IN ('hot', 'warm', 'cold')), -- ✨ NEW
  qualification INTEGER CHECK (qualification >= 1 AND qualification <= 5), -- ✨ NEW (estrelas)
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'won', 'lost')),
  lost_reason TEXT,                  -- Motivo de perda (se lost)
  won_at TIMESTAMPTZ,                -- Timestamp de fechamento
  lost_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  assigned_to UUID REFERENCES auth.users(id)  -- Responsável
);
```

**Indexes**:
- `idx_opportunities_client_id`
- `idx_opportunities_stage_id`
- `idx_opportunities_status`
- `idx_opportunities_assigned_to` (minhas oportunidades)
- `idx_opportunities_created_at DESC`

**Business Rules**:
- `status = 'won'` → `won_at` deve ser preenchido
- `status = 'lost'` → `lost_at` + `lost_reason` devem ser preenchidos
- `temperature` e `qualification` adicionados em 23 Out 2025 (UX fields)

---

### 6. notes (Anotações - Imutáveis)

**Purpose**: Timeline de atividades (não editáveis)

```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  CONSTRAINT note_must_have_parent CHECK (
    (opportunity_id IS NOT NULL) OR (client_id IS NOT NULL)
  )
);
```

**Indexes**:
- `idx_notes_opportunity_id`
- `idx_notes_client_id`
- `idx_notes_created_at DESC` (chronological order)

**Business Rules**:
- Notas são **imutáveis** (audit trail)
- Cada nota vinculada a oportunidade OU cliente (não ambos)
- Usado para histórico da oportunidade

---

### 7. tasks (Tarefas)

**Purpose**: Follow-up estruturado

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,       -- Ex: "Ligar para João Silva"
  description TEXT,
  type VARCHAR(20) CHECK (type IN ('call', 'email', 'meeting', 'whatsapp')),
  due_date TIMESTAMPTZ,              -- Data/hora vencimento
  completed_at TIMESTAMPTZ,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  assigned_to UUID REFERENCES auth.users(id),
  CONSTRAINT task_must_have_parent CHECK (
    (opportunity_id IS NOT NULL) OR (client_id IS NOT NULL)
  )
);
```

**Indexes**:
- `idx_tasks_opportunity_id`
- `idx_tasks_client_id`
- `idx_tasks_assigned_to` (minhas tarefas)
- `idx_tasks_due_date` (vencidas/próximas)
- `idx_tasks_is_completed` (filtering)

**Business Rules**:
- `is_completed = TRUE` → `completed_at` automaticamente preenchido
- Tarefas vencidas: `due_date < NOW() AND is_completed = FALSE`
- Tipos de tarefa mapeiam para ícones (📞 call, ✉️ email, 📅 meeting, 💬 whatsapp)

---

### 8. products (Catálogo de Produtos)

**Purpose**: Itens vendáveis (fabricação + revenda)

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),              -- Ex: "Som", "Luz", "Estrutura"
  price_brl DECIMAL(10, 2),
  price_usd DECIMAL(10, 2),
  price_eur DECIMAL(10, 2),
  unit VARCHAR(20) DEFAULT 'un',     -- Unidade (un, m, kg, etc.)
  specs JSONB DEFAULT '{}',          -- Especificações técnicas
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Indexes**:
- `idx_products_sku` (unique lookup)
- `idx_products_category` (filtering)
- `idx_products_is_active`

**specs JSONB Example**:
```json
{
  "dimensoes": "1.5m x 0.5m x 0.4m",
  "peso": "25kg",
  "material": "Aço galvanizado",
  "capacidade_carga": "300kg"
}
```

**Seed Data**: 15 produtos (Som, Luz, Estrutura, Talha)

---

### 9. quotations (Cotações - Hybrid JSONB)

**Purpose**: Propostas comerciais com PDF

```sql
CREATE TABLE quotations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quotation_number VARCHAR(50) UNIQUE NOT NULL, -- Ex: "QT-202510-001"
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
  items JSONB NOT NULL,              -- Array de produtos + quantidades
  subtotal DECIMAL(15, 2) NOT NULL,
  freight DECIMAL(15, 2) DEFAULT 0,
  total DECIMAL(15, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected')),
  pdf_url TEXT,                      -- Storage URL do PDF
  sent_at TIMESTAMPTZ,
  sent_to_email VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);
```

**Indexes**:
- `idx_quotations_opportunity_id`
- `idx_quotations_status`
- `idx_quotations_created_at DESC`

**items JSONB Structure**:
```json
[
  {
    "product_id": "uuid",
    "product_name": "Mesa de Som Behringer X32",
    "sku": "SOM-001",
    "quantity": 2,
    "unit_price": 15000.00,
    "discount": 10,
    "subtotal": 27000.00
  }
]
```

**Auto-numbering**:
- Format: `QT-YYYYMM-NNN`
- Implemented via PostgreSQL function + trigger
- Example: `QT-202510-001`, `QT-202510-002`, ...

---

## 🔒 Row Level Security (RLS)

### Current Status (as of 25 Oct 2025)

| Table | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| clients | ✅ | ⚠️ | ⚠️ | ⚠️ |
| opportunities | ✅ | ⚠️ | ⚠️ | ⚠️ |
| contacts | ✅ | ⏳ | ⏳ | ⏳ |
| funnel_stages | ✅ | ✅ | ✅ | ❌ |
| tasks | ✅ | ⚠️ | ⚠️ | ⚠️ |
| notes | ✅ | ⚠️ | ❌ | ❌ |
| products | ✅ | ❌ | ❌ | ❌ |
| quotations | ✅ | ⚠️ | ⚠️ | ⚠️ |

**Legend**:
- ✅ Policy completa e testada
- ⚠️ Policy básica (necessita refinamento)
- ⏳ Policy planejada (não implementada)
- ❌ Acesso negado (admin only ou imutável)

### Example RLS Policy (SELECT)
```sql
CREATE POLICY "Users can view their own clients"
ON clients FOR SELECT
TO authenticated
USING (created_by = auth.uid());
```

---

## 📦 Storage Buckets

### pdfs (Supabase Storage)

**Purpose**: Armazenar PDFs de cotações

- **Limit**: 2GB (Free tier)
- **Access**: Private (RLS policies)
- **Policy**: Owner-only download (1h signed URL)

**Naming Convention**: `quotations/{quotation_id}/{quotation_number}.pdf`

---

## 🔄 Migration History

| Date | Migration | Description |
|------|-----------|-------------|
| 04 Oct 2025 | `20251004_initial_schema.sql` | Initial schema (clients, opportunities, tasks, notes) |
| 13 Oct 2025 | `20251013_comprehensive_rls_policies.sql` | RLS policies (SELECT) |
| 13 Oct 2025 | `20251013_storage_policies.sql` | Storage bucket + policies |
| 14 Oct 2025 | `20251014_quotation_system_hybrid.sql` | Quotations + products tables |
| 14 Oct 2025 | `20251014_quotation_seed_data.sql` | 15 products seed |
| 23 Oct 2025 | `20251023223138_add_opportunity_ux_fields.sql` | temperature + qualification |
| 23 Oct 2025 | `20251023225305_create_contacts_table.sql` | contacts table ✨ NEW |

---

## 🚨 Known Issues & Tech Debt

### P0 - Critical
- ❌ **RLS policies incomplete** (INSERT/UPDATE/DELETE missing)
- ❌ **Tabela `loss_reasons`** não existe (motivos de perda estruturados)
- ⚠️ **Índices de performance** faltando (8 índices identificados)

### P1 - High
- ⏳ **Activity log** ausente (audit trail completo)
- ⏳ **PII masking** não implementado (emails/phones)

### P2 - Medium
- ⏳ **Soft delete** não implementado (flags `deleted_at`)
- ⏳ **Archival strategy** (cold storage para PDFs >90 dias)

---

## 📈 Performance Considerations

### Query Patterns
- **Oportunidades por responsável**: `idx_opportunities_assigned_to`
- **Tarefas vencidas**: `idx_tasks_due_date` + `idx_tasks_is_completed`
- **Timeline histórico**: `idx_notes_created_at DESC`

### Future Optimizations
- Materialized views para dashboard metrics
- Partitioning em `notes` por data (quando > 100k registros)
- JSONB GIN indexes em `specs`, `address`, `items`

---

**Última atualização**: 25 de Outubro de 2025
**Schema Version**: 1.3
**Próxima revisão**: Após implementação RLS completo
