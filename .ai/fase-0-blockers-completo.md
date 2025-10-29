# FASE 0: BLOCKERS COMPLETO ✅

**Data**: 25 Outubro 2025
**Status**: ✅ **COMPLETO** (pronto para aplicar)
**Duração**: 2-3 dias (aplicação + testes)

---

## 🎯 Objetivo

Resolver **TODOS os blockers críticos** antes de iniciar Sprint MVP State of Art:
1. ✅ RLS Policies completas (11 tabelas)
2. ✅ Criar tabelas novas (emails_sent, opportunity_products)
3. ✅ Storage policies (pdfs, attachments buckets)
4. ✅ Test suite completa

---

## 📄 Migrations Geradas (6 arquivos SQL)

| Migration | Propósito | Tabelas | Linhas |
|-----------|-----------|---------|--------|
| `20251025_rls_team_shared_tables.sql` | RLS team_shared | clients, contacts, opportunities | 165 |
| `20251025_rls_admin_only_tables.sql` | RLS admin_only | funnels, funnel_stages, products | 195 |
| `20251025_rls_owner_only_tables.sql` | RLS owner_only | tasks, quotations | 180 |
| `20251025_rls_immutable_notes.sql` | RLS immutable | notes | 105 |
| `20251025_create_new_tables.sql` | Novas tabelas + RLS | emails_sent, opportunity_products | 210 |
| `20251025_storage_policies.sql` | Storage RLS | pdfs, attachments buckets | 195 |
| `20251025_test_rls_policies.sql` | Test suite | 7 test blocks | 290 |
| **TOTAL** | **7 arquivos** | **11 tabelas + 2 buckets** | **1,340 linhas** |

---

## 🔐 Security Models Aplicados

### 1. Team Shared (Single-Tenant B2B)
**Tabelas**: clients, contacts, opportunities, opportunity_products

**Pattern**: Todos usuários autenticados acessam TODOS os dados.

**Justificativa**: STAGETEK tem 5 usuários máximo (uso interno), não há necessidade de isolamento por owner.

**RLS Policies**:
- SELECT: `USING (true)` (todos veem tudo)
- INSERT: `WITH CHECK (true)` (todos podem inserir)
- UPDATE: `USING (true)` + `WITH CHECK (true)` (todos podem modificar)
- DELETE: `USING (true)` (todos podem deletar)

---

### 2. Owner Only (Dados Pessoais)
**Tabelas**: tasks, quotations

**Pattern**: User só acessa SEUS próprios dados.

**RLS Policies**:
- SELECT: `USING (auth.uid() = owner_column)` (apenas own)
- INSERT: `WITH CHECK (auth.uid() = owner_column)` (apenas own)
- UPDATE: `USING (auth.uid() = owner_column)` (apenas own)
- DELETE: `USING (auth.uid() = owner_column)` (apenas own)

**Exceções**:
- **tasks**: Creator pode modificar tasks que criou para outros
- **quotations**: Assignee da oportunidade pode visualizar

---

### 3. Admin Only (Configurações)
**Tabelas**: funnels, funnel_stages, products

**Pattern**: Apenas usuários com role 'admin' podem modificar.

**RLS Policies (MVP Fallback)**:
- SELECT: `USING (true)` (todos leem)
- INSERT: `WITH CHECK (true)` ⚠️ MVP fallback (todos podem - TODO P1: adicionar role check)
- UPDATE: `USING (true)` + `WITH CHECK (true)` ⚠️ MVP fallback
- DELETE: `USING (true)` ⚠️ MVP fallback

**TODO P1**: Criar table `user_roles` e adicionar checks:
```sql
EXISTS (
  SELECT 1 FROM user_roles
  WHERE user_roles.user_id = auth.uid()
  AND user_roles.role = 'admin'
)
```

---

### 4. Immutable Audit Trail
**Tabelas**: notes, emails_sent

**Pattern**: INSERT permitido, UPDATE/DELETE bloqueado.

**RLS Policies**:
- SELECT: `USING (true)` (todos leem)
- INSERT: `WITH CHECK (auth.uid() = created_by)` (apenas creator)
- UPDATE: **NO POLICY** (bloqueado)
- DELETE: **NO POLICY** (bloqueado)

**Use Case**: Audit trail completo, dados nunca são editados.

---

### 5. Storage Buckets

#### **pdfs Bucket** (Quotation PDFs)
- **Path**: `quotations/{quotation_id}/{quotation_number}.pdf`
- **Security**: Owner-only OR opportunity assignee
- **Policies**:
  - SELECT: Owner OU assignee da oportunidade
  - INSERT: Authenticated users (owner = uploader)
  - DELETE: Owner OU creator da cotação

#### **attachments Bucket** (Story 1.3 - Arquivos gerais)
- **Path**: `attachments/{opportunity_id}/{filename}`
- **Security**: Team-shared (todos podem upload/download)
- **Limit**: 10MB por arquivo (validado no client)
- **Policies**:
  - SELECT: Authenticated users (team-shared)
  - INSERT: Authenticated users (owner = uploader)
  - UPDATE: Owner do arquivo (metadata)
  - DELETE: Owner OU assignee da oportunidade

---

## 🚀 Como Aplicar as Migrations

### Opção A: Aplicar Tudo de Uma Vez (Reset Database) ⚡ RECOMENDADO

```bash
# 1. Aplicar todas migrations
npx supabase db reset

# 2. Verificar se aplicou
npx supabase migration list

# 3. Push para produção (quando pronto)
npx supabase db push
```

**Vantagem**: Zero conflitos, estado limpo.
**Desvantagem**: Perde dados existentes (OK para desenvolvimento).

---

### Opção B: Aplicar Uma por Uma (Incremental)

```bash
# 1. Aplicar team_shared tables
npx supabase migration new rls_team_shared
# Copiar conteúdo de 20251025_rls_team_shared_tables.sql
npx supabase db push

# 2. Aplicar admin_only tables
# ... (repetir para cada migration)
```

**Vantagem**: Preserva dados existentes.
**Desvantagem**: Pode ter conflitos se policies já existem.

---

## 🧪 Como Testar RLS Policies

### 1. Criar Usuários de Teste

Via Supabase Dashboard > Authentication > Add User:
- **User A**: alice@stagetek.com (senha: test123)
- **User B**: bob@stagetek.com (senha: test123)
- **User C**: charlie@stagetek.com (senha: test123)

### 2. Rodar Test Suite

```bash
# Conectar ao database
npx supabase db connect

# Rodar test suite
\i supabase/migrations/20251025_test_rls_policies.sql

# OU via SQL Editor no Supabase Dashboard
# Copiar conteúdo do arquivo e executar bloco por bloco
```

### 3. Verificar Resultados Esperados

Abrir `20251025_test_rls_policies.sql` e verificar seção **SUMMARY: Expected Results**.

**Se TODOS tests PASS**: RLS policies são seguras! ✅
**Se ANY test FAILS**: Review policy definition.

---

### 4. Testar Storage Policies (Client-Side)

```typescript
// src/tests/storage-rls.test.ts
import { supabase } from '@/lib/supabase'

// Test 1: Upload PDF (user A)
const { data, error } = await supabase.storage
  .from('pdfs')
  .upload('quotations/test-uuid/QT-202510-001.pdf', file)

// Test 2: Download PDF (user B, assigned to opportunity)
const { data: url } = await supabase.storage
  .from('pdfs')
  .createSignedUrl('quotations/test-uuid/QT-202510-001.pdf', 3600)

// Test 3: Download PDF (user C, NOT assigned)
// Should FAIL with 403 Forbidden
```

---

## 📊 Resumo das Alterações

### Tabelas Existentes (9 tabelas)
- ✅ **clients**: RLS completo (team_shared)
- ✅ **contacts**: RLS completo (team_shared)
- ✅ **opportunities**: RLS completo (team_shared)
- ✅ **funnels**: RLS completo (admin_only - MVP fallback)
- ✅ **funnel_stages**: RLS completo (admin_only - MVP fallback)
- ✅ **products**: RLS completo (admin_only - MVP fallback)
- ✅ **tasks**: RLS completo (owner_only)
- ✅ **quotations**: RLS completo (owner_only)
- ✅ **notes**: RLS completo (immutable)

### Tabelas Novas (2 tabelas)
- ✅ **emails_sent**: Criada com RLS (immutable)
- ✅ **opportunity_products**: Criada com RLS (team_shared)

### Storage Buckets (2 buckets)
- ✅ **pdfs**: Policies completas (owner_only)
- ✅ **attachments**: Bucket criado + policies (team_shared)

---

## 🎯 Definition of Done (Fase 0)

- [x] RLS policies geradas para 11 tabelas
- [x] 2 novas tabelas criadas (emails_sent, opportunity_products)
- [x] Storage policies para 2 buckets (pdfs, attachments)
- [x] Test suite completa (7 test blocks)
- [ ] Migrations aplicadas (`npx supabase db reset`) ← **PRÓXIMO PASSO**
- [ ] Tests executados e PASSARAM ← **PRÓXIMO PASSO**
- [ ] Zero vulnerabilidades de segurança ← **VERIFICAR APÓS TESTES**

---

## ⏭️ Próximos Passos (Após Aplicar Migrations)

### 1. Aplicar Migrations (5min)
```bash
npx supabase db reset
```

### 2. Rodar Test Suite (15min)
```bash
# Criar usuários de teste
# Rodar 20251025_test_rls_policies.sql
# Verificar resultados
```

### 3. Iniciar Fase 1: Quick Wins (6h)
```
- Story 3.1: Fix Botões ClientCard (2h)
- Story 3.2: Quick Actions Cards (4h)
```

**Comando para começar Fase 1**:
```
implement story 3.1
```

---

## 📝 Notas Importantes

1. **MVP Fallback (Admin Only)**: Tabelas funnels, funnel_stages, products permitem modificação por TODOS usuários (não apenas admin). TODO P1: Implementar role-based access control.

2. **Storage Limit (10MB)**: Validado no client, não no RLS (constraint não disponível em storage.objects).

3. **Immutable Tables**: notes e emails_sent NÃO podem ser editadas após INSERT (audit trail completo).

4. **Team-Shared Model**: clients, contacts, opportunities são acessíveis por TODOS usuários (single-tenant, 5 users máximo).

5. **Indexes de Performance**: Criados automaticamente nas migrations (assigned_to, created_by, opportunity_id, etc.).

---

## 🔗 Referências

- **Sprint Planning**: `.ai/sprint-mvp-state-of-art.md`
- **Database Schema**: `docs/architecture/database-schema.md`
- **Stories Bloqueadas**: `docs/stories/1.1.md`, `docs/stories/1.2.md`, `docs/stories/1.3.md`

---

**Criado em**: 25 Outubro 2025
**Status**: ✅ **PRONTO PARA APLICAR**
**Estimativa de Aplicação**: 2-3 dias (incluindo testes)
