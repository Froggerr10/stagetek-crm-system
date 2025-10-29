# Como Aplicar Migrations Manualmente (Supabase Dashboard)

**Use isso se Docker Desktop não estiver instalado.**

---

## 🌐 Método 1: SQL Editor (Dashboard)

### 1. Acessar Supabase Dashboard
```
https://supabase.com/dashboard
→ Selecionar projeto: stagetek-crm-system
→ SQL Editor (menu lateral)
```

### 2. Aplicar Migrations (Ordem Correta)

**⚠️ IMPORTANTE**: Aplicar na ORDEM especificada abaixo.

---

#### **Migration 1: Team Shared Tables**

```sql
-- Copiar TODO o conteúdo de:
supabase/migrations/20251025_rls_team_shared_tables.sql

-- Colar no SQL Editor
-- Clicar "Run" (Ctrl+Enter)
-- Verificar: "Success. No rows returned" ✅
```

---

#### **Migration 2: Admin Only Tables**

```sql
-- Copiar TODO o conteúdo de:
supabase/migrations/20251025_rls_admin_only_tables.sql

-- Colar no SQL Editor
-- Clicar "Run"
-- Verificar: Success ✅
```

---

#### **Migration 3: Owner Only Tables**

```sql
-- Copiar TODO o conteúdo de:
supabase/migrations/20251025_rls_owner_only_tables.sql

-- Colar no SQL Editor
-- Clicar "Run"
-- Verificar: Success ✅
```

---

#### **Migration 4: Immutable Notes**

```sql
-- Copiar TODO o conteúdo de:
supabase/migrations/20251025_rls_immutable_notes.sql

-- Colar no SQL Editor
-- Clicar "Run"
-- Verificar: Success ✅
```

---

#### **Migration 5: Create New Tables**

```sql
-- Copiar TODO o conteúdo de:
supabase/migrations/20251025_create_new_tables.sql

-- Colar no SQL Editor
-- Clicar "Run"
-- Verificar: Success ✅
```

---

#### **Migration 6: Storage Policies**

```sql
-- Copiar TODO o conteúdo de:
supabase/migrations/20251025_storage_policies.sql

-- Colar no SQL Editor
-- Clicar "Run"
-- Verificar: Success ✅
```

---

### 3. Verificar Aplicação

**Verificar tabelas criadas**:
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('emails_sent', 'opportunity_products');

-- Esperado: 2 linhas (emails_sent, opportunity_products) ✅
```

**Verificar RLS habilitado**:
```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('clients', 'opportunities', 'tasks', 'quotations', 'notes');

-- Esperado: rowsecurity = true para todas ✅
```

**Verificar policies criadas**:
```sql
SELECT schemaname, tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;

-- Esperado: Múltiplas policies (SELECT/INSERT/UPDATE/DELETE) ✅
```

**Verificar Storage buckets**:
```sql
SELECT id, name, public
FROM storage.buckets
WHERE id IN ('pdfs', 'attachments');

-- Esperado: 2 buckets (pdfs, attachments) ✅
```

---

## 🧪 Método 2: Test Suite (Validar RLS)

### 1. Criar Usuários de Teste

Dashboard > Authentication > Users > Add User:
- **alice@stagetek.com** (senha: test123)
- **bob@stagetek.com** (senha: test123)

### 2. Pegar UUIDs dos Usuários

```sql
SELECT id, email FROM auth.users WHERE email LIKE '%@stagetek.com';
```

Copiar os UUIDs (vamos usar nos testes).

### 3. Rodar Test Suite

**⚠️ Substituir `uuid-of-alice` e `uuid-of-bob` pelos UUIDs reais.**

Abrir `supabase/migrations/20251025_test_rls_policies.sql` e executar **bloco por bloco** no SQL Editor.

**Exemplo (TEST 1: clients)**:
```sql
BEGIN;

SET LOCAL role authenticated;
SET LOCAL request.jwt.claim.sub = '<UUID-ALICE-AQUI>';

-- INSERT client
INSERT INTO clients (name, cnpj, created_by)
VALUES ('Test Client A', '12345678000199', auth.uid())
RETURNING id;

-- Verificar: INSERT bem-sucedido ✅

ROLLBACK;
```

Repetir para cada test block (TEST 1 até TEST 6).

---

## ✅ Checklist de Aplicação

- [ ] Migration 1 aplicada (team_shared)
- [ ] Migration 2 aplicada (admin_only)
- [ ] Migration 3 aplicada (owner_only)
- [ ] Migration 4 aplicada (immutable)
- [ ] Migration 5 aplicada (new tables)
- [ ] Migration 6 aplicada (storage)
- [ ] Verificações passaram (tabelas, RLS, policies, buckets)
- [ ] Usuários de teste criados
- [ ] Test suite executada (7 test blocks)
- [ ] Todos tests PASSARAM ✅

---

## 🎯 Após Aplicar Tudo

**Voltar para o chat e digitar**:
```
migrations aplicadas
```

**Ou começar diretamente com Fase 1**:
```
implement story 3.1
```

---

**Tempo estimado**: 30-45 minutos (6 migrations + verificações + testes)
