# Database Schema - Quick Reference

**Version**: 1.0.0
**Date**: 1 de Outubro de 2025

---

## 📋 Tabelas

### 1. **profiles**
Perfis de usuários (extends Supabase Auth)

```typescript
interface Profile {
  id: string                    // UUID (references auth.users)
  email: string                 // UNIQUE NOT NULL
  full_name: string            // NOT NULL
  avatar_url?: string          // nullable
  role: 'admin' | 'manager' | 'user'  // DEFAULT 'user'
  created_at: Date             // NOT NULL DEFAULT NOW()
  updated_at: Date             // NOT NULL DEFAULT NOW()
}
```

---

### 2. **clients**
Clientes B2B

```typescript
interface Client {
  id: string                    // UUID PRIMARY KEY
  name: string                 // NOT NULL
  cnpj: string                 // UNIQUE NOT NULL
  email: string                // NOT NULL
  phone?: string               // nullable
  website?: string             // nullable
  address_street?: string
  address_city?: string
  address_state?: string
  address_zip?: string
  status: 'active' | 'inactive' | 'pending'  // DEFAULT 'active'
  segment?: string             // Eventos, Shows, Corporativo, etc.
  notes?: string
  total_revenue: number        // DECIMAL(12,2) DEFAULT 0
  total_events: number         // INTEGER DEFAULT 0
  created_by?: string          // UUID (references profiles)
  created_at: Date             // NOT NULL DEFAULT NOW()
  updated_at: Date             // NOT NULL DEFAULT NOW()
}
```

**Indexes:**
- `idx_clients_cnpj`
- `idx_clients_status`
- `idx_clients_created_at`

---

### 3. **funnels**
Funis de vendas

```typescript
interface Funnel {
  id: string                    // UUID PRIMARY KEY
  name: string                 // NOT NULL
  description?: string
  is_default: boolean          // DEFAULT false
  is_active: boolean           // DEFAULT true
  display_order: number        // INTEGER DEFAULT 0
  created_by?: string          // UUID (references profiles)
  created_at: Date             // NOT NULL DEFAULT NOW()
  updated_at: Date             // NOT NULL DEFAULT NOW()
}
```

**Indexes:**
- `idx_funnels_is_default`
- `idx_funnels_is_active`

---

### 4. **stages**
Fases dos funis

```typescript
interface Stage {
  id: string                    // UUID PRIMARY KEY
  funnel_id: string            // UUID NOT NULL (references funnels)
  name: string                 // NOT NULL
  sigla: string                // NOT NULL (2-3 letters)
  color: 'gray' | 'blue' | 'purple' | 'orange' | 'green' | 'red' | 'yellow' | 'teal'
  display_order: number        // INTEGER NOT NULL
  probability: number          // INTEGER 0-100 DEFAULT 0 (win %)
  created_at: Date             // NOT NULL DEFAULT NOW()
  updated_at: Date             // NOT NULL DEFAULT NOW()
}
```

**Constraints:**
- UNIQUE(funnel_id, display_order)

**Indexes:**
- `idx_stages_funnel_id`
- `idx_stages_display_order`

---

### 5. **opportunities**
Oportunidades de vendas

```typescript
interface Opportunity {
  id: string                    // UUID PRIMARY KEY
  title: string                // NOT NULL
  description?: string
  client_id: string            // UUID NOT NULL (references clients)
  funnel_id: string            // UUID NOT NULL (references funnels)
  stage_id: string             // UUID NOT NULL (references stages)
  value: number                // DECIMAL(12,2) DEFAULT 0
  expected_close_date?: Date   // DATE nullable
  probability: number          // INTEGER 0-100 DEFAULT 0
  status: 'open' | 'won' | 'lost'  // DEFAULT 'open'
  lost_reason?: string
  owner_id?: string            // UUID (references profiles)
  created_by?: string          // UUID (references profiles)
  created_at: Date             // NOT NULL DEFAULT NOW()
  updated_at: Date             // NOT NULL DEFAULT NOW()
  closed_at?: Date             // TIMESTAMPTZ nullable
}
```

**Indexes:**
- `idx_opportunities_client_id`
- `idx_opportunities_funnel_id`
- `idx_opportunities_stage_id`
- `idx_opportunities_owner_id`
- `idx_opportunities_status`
- `idx_opportunities_created_at`

---

### 6. **products**
Catálogo de produtos

```typescript
interface Product {
  id: string                    // UUID PRIMARY KEY
  name: string                 // NOT NULL
  sku?: string                 // UNIQUE
  category: 'fabricacao' | 'revenda_som' | 'revenda_luz' | 'locacao'
  subcategory?: string         // treliças, talhas, caixas, moving heads, etc.
  description?: string
  unit_price: number           // DECIMAL(10,2) DEFAULT 0
  cost_price?: number          // DECIMAL(10,2) nullable
  stock_quantity: number       // INTEGER DEFAULT 0
  min_stock: number            // INTEGER DEFAULT 0
  unit: string                 // DEFAULT 'unidade' (metro, kg, etc.)
  is_active: boolean           // DEFAULT true
  image_url?: string
  specifications?: object      // JSONB
  created_by?: string          // UUID (references profiles)
  created_at: Date             // NOT NULL DEFAULT NOW()
  updated_at: Date             // NOT NULL DEFAULT NOW()
}
```

**Indexes:**
- `idx_products_sku`
- `idx_products_category`
- `idx_products_is_active`

---

### 7. **opportunity_products**
Produtos vinculados a oportunidades (M2M)

```typescript
interface OpportunityProduct {
  id: string                    // UUID PRIMARY KEY
  opportunity_id: string       // UUID NOT NULL (references opportunities)
  product_id: string           // UUID NOT NULL (references products)
  quantity: number             // DECIMAL(10,2) DEFAULT 1
  unit_price: number           // DECIMAL(10,2) NOT NULL
  discount_percent: number     // DECIMAL(5,2) DEFAULT 0
  total: number                // DECIMAL(12,2) NOT NULL
  notes?: string
  created_at: Date             // NOT NULL DEFAULT NOW()
  updated_at: Date             // NOT NULL DEFAULT NOW()
}
```

**Constraints:**
- UNIQUE(opportunity_id, product_id)

**Indexes:**
- `idx_opportunity_products_opportunity_id`
- `idx_opportunity_products_product_id`

---

### 8. **activities**
Timeline de atividades

```typescript
interface Activity {
  id: string                    // UUID PRIMARY KEY
  entity_type: 'opportunity' | 'client' | 'product'
  entity_id: string            // UUID NOT NULL
  activity_type: string        // created, updated, stage_changed, etc.
  description: string          // NOT NULL
  metadata?: object            // JSONB (old_value, new_value, etc.)
  created_by?: string          // UUID (references profiles)
  created_at: Date             // NOT NULL DEFAULT NOW()
}
```

**Indexes:**
- `idx_activities_entity` (entity_type, entity_id)
- `idx_activities_created_at`

---

## 🔗 Relacionamentos

```
User (Supabase Auth)
  └─→ Profile (1:1)
       ├─→ created Clients (1:N)
       ├─→ created Opportunities (1:N)
       ├─→ owns Opportunities (1:N)
       └─→ created Activities (1:N)

Client
  └─→ Opportunities (1:N)

Funnel
  ├─→ Stages (1:N)
  └─→ Opportunities (1:N)

Stage
  └─→ Opportunities (1:N)

Opportunity
  ├─→ Client (N:1)
  ├─→ Funnel (N:1)
  ├─→ Stage (N:1)
  ├─→ Owner (User) (N:1)
  ├─→ OpportunityProducts (1:N)
  └─→ Activities (1:N)

Product
  └─→ OpportunityProducts (1:N)

OpportunityProduct
  ├─→ Opportunity (N:1)
  └─→ Product (N:1)
```

---

## 🔧 Triggers

### 1. **update_updated_at_column()**
Aplicado em: `profiles`, `clients`, `funnels`, `stages`, `opportunities`, `products`, `opportunity_products`

Atualiza automaticamente `updated_at = NOW()` em UPDATE.

### 2. **log_opportunity_stage_change()**
Aplicado em: `opportunities`

Quando `stage_id` muda, insere registro em `activities`:
```typescript
{
  entity_type: 'opportunity',
  entity_id: opportunity.id,
  activity_type: 'stage_changed',
  description: 'Oportunidade movida de fase',
  metadata: {
    old_stage_id: '...',
    new_stage_id: '...'
  }
}
```

### 3. **update_client_revenue()**
Aplicado em: `opportunities`

Quando `status` muda para 'won':
- Incrementa `clients.total_revenue += value`
- Incrementa `clients.total_events += 1`

Quando `status` muda DE 'won' para outro:
- Decrementa `clients.total_revenue -= value`
- Decrementa `clients.total_events -= 1`

---

## 🔐 RLS Policies

### **profiles**
- ✅ SELECT: Todos autenticados
- ✅ UPDATE: Próprio perfil

### **clients**
- ✅ SELECT: Autenticados
- ✅ INSERT: Autenticados
- ✅ UPDATE: Autenticados

### **funnels**
- ✅ SELECT: Autenticados
- ✅ INSERT/UPDATE/DELETE: Admin ou Manager

### **stages**
- ✅ SELECT: Autenticados
- ✅ INSERT/UPDATE/DELETE: Admin ou Manager

### **opportunities**
- ✅ SELECT: Autenticados
- ✅ INSERT: Autenticados
- ✅ UPDATE: Owner ou Creator ou Admin/Manager

### **products**
- ✅ SELECT: Autenticados (apenas is_active = true)
- ✅ INSERT/UPDATE/DELETE: Admin ou Manager

### **opportunity_products**
- ✅ SELECT: Autenticados
- ✅ INSERT/UPDATE/DELETE: Owner da oportunidade ou Admin/Manager

### **activities**
- ✅ SELECT: Autenticados
- ✅ INSERT: Autenticados

---

## 📝 Queries Comuns

### Buscar oportunidades por funil com joins
```sql
SELECT
  o.id,
  o.title,
  o.value,
  c.name as client_name,
  s.name as stage_name,
  s.color as stage_color,
  p.full_name as owner_name
FROM opportunities o
JOIN clients c ON o.client_id = c.id
JOIN stages s ON o.stage_id = s.id
LEFT JOIN profiles p ON o.owner_id = p.id
WHERE o.funnel_id = $1
  AND o.status = 'open'
ORDER BY s.display_order, o.created_at DESC;
```

### Total por coluna do Kanban
```sql
SELECT
  s.id,
  s.name,
  s.sigla,
  s.color,
  COUNT(o.id) as count,
  COALESCE(SUM(o.value), 0) as total
FROM stages s
LEFT JOIN opportunities o ON s.id = o.stage_id AND o.status = 'open'
WHERE s.funnel_id = $1
GROUP BY s.id, s.name, s.sigla, s.color, s.display_order
ORDER BY s.display_order;
```

### Produtos de uma oportunidade
```sql
SELECT
  p.id,
  p.name,
  p.sku,
  op.quantity,
  op.unit_price,
  op.discount_percent,
  op.total
FROM opportunity_products op
JOIN products p ON op.product_id = p.id
WHERE op.opportunity_id = $1;
```

### Timeline de atividades
```sql
SELECT
  a.id,
  a.activity_type,
  a.description,
  a.metadata,
  a.created_at,
  p.full_name as created_by_name,
  p.avatar_url as created_by_avatar
FROM activities a
LEFT JOIN profiles p ON a.created_by = p.id
WHERE a.entity_type = $1
  AND a.entity_id = $2
ORDER BY a.created_at DESC
LIMIT 20;
```

### Top clientes por receita
```sql
SELECT
  id,
  name,
  email,
  total_revenue,
  total_events,
  CASE
    WHEN total_events = 0 THEN 0
    ELSE ROUND(total_revenue / total_events, 2)
  END as avg_ticket
FROM clients
WHERE status = 'active'
ORDER BY total_revenue DESC
LIMIT 10;
```

---

## 🎯 Validações no Frontend

### **Clients**
- CNPJ: Validar formato (XX.XXX.XXX/XXXX-XX)
- CNPJ: Validar dígitos verificadores
- Email: Validar formato
- Status: Enum ('active', 'inactive', 'pending')

### **Funnels**
- Nome: Required, min 3 chars
- Apenas 1 funil pode ser `is_default = true`

### **Stages**
- Nome: Required, min 2 chars
- Sigla: Required, 2-3 chars uppercase
- Color: Enum das 8 cores permitidas
- Display Order: Único dentro do funil

### **Opportunities**
- Título: Required, min 3 chars
- Valor: >= 0
- Probabilidade: 0-100
- Expected Close Date: >= hoje (se status = 'open')
- Lost Reason: Required se status = 'lost'

### **Products**
- Nome: Required, min 3 chars
- SKU: Único (se fornecido)
- Category: Enum
- Unit Price: >= 0
- Cost Price: >= 0 (se fornecido)
- Stock: >= 0

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
