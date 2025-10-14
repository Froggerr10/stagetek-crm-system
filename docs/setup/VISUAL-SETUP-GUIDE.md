# 📺 Guia Visual - Setup Banco de Dados

**Siga exatamente esta ordem:**

---

## ✅ O Que Já Está Pronto

- ✅ Tabelas criadas: `clients`, `funnels`, `funnel_stages`, `opportunities`, `notes`, `tasks`
- ⏳ Falta: Dados iniciais (funil + clientes)
- ⏳ Falta: Desabilitar RLS para testes

---

## 🎯 PASSO 1: Abrir SQL Editor

**URL**: https://supabase.com/dashboard/project/twcpqhhtoqcgzplrmohi/sql

**O que você verá:**
```
┌─────────────────────────────────────────────┐
│  Supabase Dashboard                         │
├─────────────────────────────────────────────┤
│  [SQL Editor]  [+ New query]                │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │                                        │ │
│  │  -- Cole o SQL aqui                   │ │
│  │                                        │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  [Run] ◀── Clique aqui para executar        │
└─────────────────────────────────────────────┘
```

---

## 🎯 PASSO 2: Inserir Dados Iniciais (Seed)

### 2.1) Clique em **"+ New query"** (canto superior direito)

### 2.2) Abra o arquivo no VS Code:

**Caminho**: `C:\Users\David\Stagetek\stagetek-crm-system\supabase\seed.sql`

**Como abrir:**
1. VS Code → File → Open File
2. Navegar até `supabase\seed.sql`
3. **Selecionar TUDO** (Ctrl+A)
4. **Copiar** (Ctrl+C)

**Ou via terminal:**
```bash
cd C:\Users\David\Stagetek\stagetek-crm-system
notepad supabase\seed.sql
# Ctrl+A (selecionar tudo) → Ctrl+C (copiar)
```

### 2.3) Colar no SQL Editor

No SQL Editor (browser):
- **Clicar** dentro do editor de código
- **Colar** (Ctrl+V)

Você verá o SQL começando com:
```sql
-- =====================================================
-- STAGETEK CRM - Seed Data (Dados Iniciais)
-- Version: 1.0
-- Date: 04/Oct/2025
-- =====================================================
```

### 2.4) Executar

- Clicar no botão **"Run"** (verde, canto inferior direito)
- Ou pressionar **Ctrl+Enter**

### 2.5) Verificar Resultado

No canto inferior, deve aparecer:
```
✓ Success. Rows returned
```

**Se aparecer erro**, copie a mensagem e me envie!

---

## 🎯 PASSO 3: Desabilitar RLS (Desenvolvimento)

⚠️ **Importante**: Isso é APENAS para desenvolvimento local!

### 3.1) Clique em **"+ New query"** novamente

### 3.2) Abra o arquivo:

**Caminho**: `C:\Users\David\Stagetek\stagetek-crm-system\supabase\disable-rls-dev.sql`

**Como abrir:**
```bash
notepad supabase\disable-rls-dev.sql
# Ctrl+A → Ctrl+C
```

### 3.3) Colar no SQL Editor

Você verá:
```sql
-- ⚠️ APENAS PARA DESENVOLVIMENTO LOCAL!
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE funnels DISABLE ROW LEVEL SECURITY;
ALTER TABLE funnel_stages DISABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities DISABLE ROW LEVEL SECURITY;
ALTER TABLE notes DISABLE ROW LEVEL SECURITY;
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
```

### 3.4) Executar

- Clicar em **"Run"**
- Ou pressionar **Ctrl+Enter**

### 3.5) Verificar Resultado

Deve aparecer:
```
✓ Success. No rows returned
```

---

## 🧪 PASSO 4: Testar Tudo

No terminal (PowerShell ou CMD):

```bash
cd C:\Users\David\Stagetek\stagetek-crm-system
npm run test:supabase
```

**Resultado esperado:**

```
🔍 Testando conexão Supabase...

ℹ️  1. Testando conexão básica...
✅ Conexão estabelecida com Supabase
   URL: https://twcpqhhtoqcgzplrmohi.supabase.co

ℹ️  2. Verificando tabelas criadas...
✅ Tabela 'clients' existe
✅ Tabela 'funnels' existe
✅ Tabela 'funnel_stages' existe
✅ Tabela 'opportunities' existe
✅ Tabela 'notes' existe
✅ Tabela 'tasks' existe

ℹ️  3. Verificando seed data (funil padrão)...
✅ Funil padrão: "Funil de Vendas Principal" (ID: xxx)
✅ 5 estágios configurados:
   1. Prospecção (#6366f1)
   2. Qualificação (#8b5cf6)
   3. Proposta (#ec4899)
   4. Negociação (#f59e0b)
   5. Fechado (#10b981)

ℹ️  4. Testando CRUD básico (tabela 'clients')...
✅ INSERT: Cliente criado (ID: xxx)
✅ SELECT: Cliente encontrado ("Teste CRM - Script")
✅ UPDATE: Cliente atualizado ("Teste CRM - Atualizado")
✅ DELETE: Cliente removido

ℹ️  5. Verificando RLS policies...
✅ CRUD completo funcionou (RLS configurado corretamente)

ℹ️  6. Estatísticas do banco de dados:
   5 clientes
   7 oportunidades
   20 produtos

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ TODOS OS TESTES PASSARAM!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ℹ️  Próximo passo: Conectar UI ao backend
   Atualizar: src/pages/Clientes.tsx
   Atualizar: src/pages/Oportunidades.tsx
```

---

## ❌ Solução de Problemas

### Erro: "relation 'products' does not exist"

**Causa**: A tabela `products` não foi criada na migration inicial.

**Solução**: Adicionar no final do `seed.sql`:

```sql
-- Criar tabela products se não existir
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100),
  category VARCHAR(50),
  subcategory VARCHAR(100),
  description TEXT,
  unit_price DECIMAL(15, 2),
  cost_price DECIMAL(15, 2),
  stock_quantity INTEGER DEFAULT 0,
  unit VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Erro: "row-level security policy" após desabilitar RLS

**Causa**: RLS não foi desabilitado corretamente.

**Solução**: No SQL Editor, executar novamente:

```sql
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE funnels DISABLE ROW LEVEL SECURITY;
ALTER TABLE funnel_stages DISABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities DISABLE ROW LEVEL SECURITY;
ALTER TABLE notes DISABLE ROW LEVEL SECURITY;
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
```

### Erro: "duplicate key value violates unique constraint"

**Causa**: Tentou executar seed.sql duas vezes.

**Solução**:
1. Limpar dados: No SQL Editor, executar:
```sql
TRUNCATE TABLE clients CASCADE;
TRUNCATE TABLE funnels CASCADE;
```

2. Executar seed.sql novamente

---

## ✅ Checklist Final

Após seguir todos os passos:

- [ ] SQL Editor aberto
- [ ] Seed.sql executado (funil + clientes + produtos criados)
- [ ] RLS desabilitado (apenas dev)
- [ ] `npm run test:supabase` passou com ✅ em todos os testes
- [ ] Ver 5 clientes, 7 oportunidades, 20 produtos no banco

---

**Próximo**: Conectar o frontend ao banco real! 🚀

Consultar: `NEXT-STEPS.md` → PRIORIDADE 2
