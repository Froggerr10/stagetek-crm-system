# STAGETEK CRM - Database Schema

Database migrations e seed data para Supabase PostgreSQL.

## 📁 Estrutura

```
supabase/
├── migrations/
│   └── 001_initial_schema.sql    ← Schema inicial (8 tabelas)
├── seed.sql                       ← Dados mockados para dev
└── README.md                      ← Você está aqui
```

## 🗄️ Tabelas (V1 - MVP)

### Core Tables
1. **profiles** - Perfis de usuários (extends Supabase Auth)
2. **clients** - Clientes B2B
3. **funnels** - Funis de vendas
4. **stages** - Fases dos funis
5. **opportunities** - Oportunidades de vendas
6. **products** - Catálogo de produtos (fabricação, revenda, locação)
7. **opportunity_products** - Produtos vinculados a oportunidades (M2M)
8. **activities** - Timeline de atividades (histórico)

## 🔐 Row Level Security (RLS)

Todas as tabelas possuem RLS habilitado com políticas:
- **SELECT**: Usuários autenticados podem visualizar
- **INSERT**: Usuários autenticados podem criar
- **UPDATE**: Usuários podem editar registros próprios ou se forem admin/manager
- **DELETE**: Apenas admins/managers (via cascade)

## 🚀 Como usar

### 1. Setup Inicial (Supabase CLI)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login no Supabase
supabase login

# Inicializar projeto (se ainda não fez)
supabase init

# Link com projeto remoto
supabase link --project-ref YOUR_PROJECT_ID

# Rodar migrations
supabase db push

# Rodar seed data (opcional - dev only)
supabase db reset --seed
```

### 2. Setup via Supabase Dashboard

1. Acesse https://app.supabase.com
2. Vá em **SQL Editor**
3. Copie o conteúdo de `migrations/001_initial_schema.sql`
4. Execute
5. (Opcional) Copie o conteúdo de `seed.sql` e execute para dados mockados

## 📊 Dados Mockados (seed.sql)

### 1 Funil
- **Funil PADRÃO** com 5 fases

### 5 Clientes
- Mega Produções (São Paulo)
- Eventos Corporativos XYZ (São Paulo)
- Sound & Light Productions (Rio de Janeiro)
- Festival Music Brasil (Belo Horizonte)
- Stage Pro Eventos (Curitiba)

### 20 Produtos
- 5 Fabricação (treliças, talhas)
- 10 Revenda (5 som + 5 luz)
- 5 Locação (sistemas completos)

### 7 Oportunidades
Distribuídas nas 5 fases:
- 2 em "Sem contato / Lead"
- 2 em "Contato Feito"
- 1 em "Visita / Apresentação"
- 1 em "Proposta Enviada"
- 1 em "Fechamento"

## 🔧 Funcionalidades Automáticas

### Triggers

1. **update_updated_at_column()**
   - Atualiza `updated_at` automaticamente em todas as tabelas

2. **log_opportunity_stage_change()**
   - Registra mudanças de fase em `activities`

3. **update_client_revenue()**
   - Atualiza `total_revenue` e `total_events` do cliente quando oportunidade é ganha

### Constraints

- **UNIQUE**: CNPJ (clients), SKU (products)
- **CHECK**: Status values, roles, categories, colors
- **FOREIGN KEYS**: Todas com `ON DELETE CASCADE` onde apropriado
- **NOT NULL**: Campos obrigatórios

## 📝 Próximas Migrations

Quando precisar adicionar novas features:

```sql
-- supabase/migrations/002_add_quotations.sql
CREATE TABLE quotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    opportunity_id UUID REFERENCES opportunities(id),
    ...
);
```

## 🔍 Queries Úteis

### Ver todas as oportunidades de um funil
```sql
SELECT
    o.title,
    c.name as client,
    s.name as stage,
    o.value,
    o.probability
FROM opportunities o
JOIN clients c ON o.client_id = c.id
JOIN stages s ON o.stage_id = s.id
WHERE o.funnel_id = '00000000-0000-0000-0000-000000000001'
ORDER BY s.display_order, o.created_at;
```

### Total por fase (Kanban)
```sql
SELECT
    s.name,
    COUNT(o.id) as count,
    SUM(o.value) as total
FROM stages s
LEFT JOIN opportunities o ON s.id = o.stage_id
WHERE s.funnel_id = '00000000-0000-0000-0000-000000000001'
GROUP BY s.id, s.name, s.display_order
ORDER BY s.display_order;
```

### Revenue por cliente
```sql
SELECT
    name,
    total_events,
    total_revenue
FROM clients
WHERE status = 'active'
ORDER BY total_revenue DESC;
```

## 🎯 Protocol Notecraft™

Schema seguindo boas práticas:
- ✅ Nomenclatura consistente (snake_case)
- ✅ Tipos apropriados (UUID, TIMESTAMPTZ, DECIMAL)
- ✅ Indexes em foreign keys e campos filtráveis
- ✅ RLS em todas as tabelas
- ✅ Triggers para automações
- ✅ Comments para documentação
- ✅ Constraints para integridade

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
