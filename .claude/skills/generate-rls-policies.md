# Generate RLS Policies (Supabase)

Gera Row Level Security policies completas (SELECT/INSERT/UPDATE/DELETE) para tabelas Supabase, seguindo padrões de segurança LGPD.

## Instructions

Você é um especialista em segurança Supabase. Sua tarefa é gerar RLS policies que protegem dados sem bloquear operações legítimas.

### Inputs Necessários

1. **Table Name** (ex: clients, opportunities, emails_sent)
2. **Security Model** (owner_only | team_shared | admin_only | public_read)
3. **Owner Column** (opcional - ex: user_id, created_by, assigned_to)

### RLS Policy Patterns (Supabase)

#### Pattern 1: Owner Only (Padrão para dados pessoais)
```sql
-- User só acessa SEUS próprios dados
-- Ex: tasks (assigned_to), quotations (created_by)

-- SELECT
CREATE POLICY "Users can view their own {table}"
  ON {table} FOR SELECT
  TO authenticated
  USING (auth.uid() = {owner_column});

-- INSERT
CREATE POLICY "Users can insert their own {table}"
  ON {table} FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = {owner_column});

-- UPDATE
CREATE POLICY "Users can update their own {table}"
  ON {table} FOR UPDATE
  TO authenticated
  USING (auth.uid() = {owner_column})
  WITH CHECK (auth.uid() = {owner_column});

-- DELETE
CREATE POLICY "Users can delete their own {table}"
  ON {table} FOR DELETE
  TO authenticated
  USING (auth.uid() = {owner_column});
```

#### Pattern 2: Team Shared (Padrão para dados B2B)
```sql
-- Todos usuários autenticados acessam (modelo single-tenant)
-- Ex: clients, opportunities, contacts

-- SELECT
CREATE POLICY "Authenticated users can view {table}"
  ON {table} FOR SELECT
  TO authenticated
  USING (true);

-- INSERT
CREATE POLICY "Authenticated users can insert {table}"
  ON {table} FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- UPDATE
CREATE POLICY "Authenticated users can update {table}"
  ON {table} FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- DELETE
CREATE POLICY "Authenticated users can delete {table}"
  ON {table} FOR DELETE
  TO authenticated
  USING (true);
```

#### Pattern 3: Admin Only (Padrão para configurações)
```sql
-- Apenas usuários com role 'admin' podem modificar
-- Ex: funnels, funnel_stages, products

-- SELECT (todos leem)
CREATE POLICY "Authenticated users can view {table}"
  ON {table} FOR SELECT
  TO authenticated
  USING (true);

-- INSERT (apenas admin)
CREATE POLICY "Only admins can insert {table}"
  ON {table} FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

-- UPDATE (apenas admin)
CREATE POLICY "Only admins can update {table}"
  ON {table} FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

-- DELETE (apenas admin)
CREATE POLICY "Only admins can delete {table}"
  ON {table} FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );
```

#### Pattern 4: Immutable Audit Trail
```sql
-- INSERT permitido, UPDATE/DELETE bloqueado (ex: notes, activity_log)

-- SELECT
CREATE POLICY "Authenticated users can view {table}"
  ON {table} FOR SELECT
  TO authenticated
  USING (true);

-- INSERT
CREATE POLICY "Authenticated users can insert {table}"
  ON {table} FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- UPDATE (BLOQUEADO)
-- DELETE (BLOQUEADO)
-- Não criar policies = operação bloqueada
```

### Workflow de Geração

#### Step 1: Analisar Tabela
```bash
# Ler database schema
Read docs/architecture/database-schema.md

# Identificar:
# 1. Colunas da tabela
# 2. Foreign keys (relationships)
# 3. Owner column (user_id, created_by, etc.)
# 4. Modelo de segurança (baseado no contexto)
```

#### Step 2: Determinar Security Model

**Regras para STAGETEK CRM**:

| Tabela | Security Model | Justificativa |
|--------|----------------|---------------|
| clients | team_shared | B2B, single-tenant (5 users) |
| contacts | team_shared | B2B, single-tenant |
| opportunities | team_shared | B2B, single-tenant |
| opportunity_products | team_shared | Relacionado a opportunities |
| emails_sent | owner_only | Audit trail pessoal |
| notes | immutable | Audit trail (insert only) |
| tasks | owner_only | assigned_to = owner |
| funnels | admin_only | Config crítica |
| funnel_stages | admin_only | Config crítica |
| products | admin_only | Catálogo centralizado |
| quotations | owner_only | created_by = owner |

#### Step 3: Gerar SQL Migration

```sql
-- =====================================================
-- RLS Policies: {table_name}
-- Security Model: {security_model}
-- Generated: {date}
-- =====================================================

-- Enable RLS
ALTER TABLE {table_name} ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (idempotent)
DROP POLICY IF EXISTS "{table}_select_policy" ON {table_name};
DROP POLICY IF EXISTS "{table}_insert_policy" ON {table_name};
DROP POLICY IF EXISTS "{table}_update_policy" ON {table_name};
DROP POLICY IF EXISTS "{table}_delete_policy" ON {table_name};

-- {pattern_name} Pattern
{policies geradas baseadas no pattern}

-- =====================================================
-- Testing Guide:
-- =====================================================
-- 1. Login as regular user: test@example.com
-- 2. Try INSERT: Should succeed
-- 3. Try UPDATE own row: Should succeed
-- 4. Try UPDATE other user's row: Should fail (if owner_only)
-- 5. Try DELETE: Should succeed (if allowed)
```

#### Step 4: Gerar Storage Policies (Se Aplicável)

Para buckets (attachments, pdfs):

```sql
-- =====================================================
-- Storage Policies: {bucket_name}
-- =====================================================

-- SELECT (download) - apenas owner da oportunidade
CREATE POLICY "Users can download their opportunity files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = '{bucket_name}' AND
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id::text = (storage.objects.name::text)[1]
      AND (
        opportunities.assigned_to = auth.uid() OR
        opportunities.created_by = auth.uid()
      )
    )
  );

-- INSERT (upload) - authenticated users
CREATE POLICY "Authenticated users can upload files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = '{bucket_name}' AND
    auth.uid()::text = (storage.objects.owner)::text
  );

-- DELETE - apenas owner do arquivo
CREATE POLICY "Users can delete their own files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = '{bucket_name}' AND
    auth.uid()::text = (storage.objects.owner)::text
  );
```

### Output Format

```markdown
## RLS Policies Generated: {table_name}

**Security Model**: {security_model}
**Owner Column**: {owner_column} (if applicable)
**Generated**: {date}

---

### Migration File

**Path**: `supabase/migrations/{timestamp}_rls_{table_name}.sql`

\`\`\`sql
{SQL completo gerado}
\`\`\`

---

### Testing Checklist

- [ ] Enable RLS: `ALTER TABLE {table_name} ENABLE ROW LEVEL SECURITY`
- [ ] Test SELECT as user A: should see only own data (if owner_only)
- [ ] Test INSERT as user A: should succeed
- [ ] Test UPDATE own row as user A: should succeed
- [ ] Test UPDATE other user's row as user A: should fail (if owner_only)
- [ ] Test DELETE as user A: should succeed (if allowed)
- [ ] Test as anonymous: all operations should fail

---

### Security Analysis

**Vulnerabilities Mitigated**:
- ✅ Data leak between users (if owner_only)
- ✅ Unauthorized modifications
- ✅ Anonymous access blocked
- ✅ SQL injection (parameterized by Supabase)

**LGPD Compliance**:
- ✅ Data isolation (owner_only for PII)
- ✅ Audit trail (immutable notes)
- ✅ Access control (authenticated only)

**Performance**:
- Index on {owner_column} recommended (if owner_only)
- Query plan: `EXPLAIN ANALYZE SELECT * FROM {table_name}`
```

### Exemplo de Uso

```
User: "generate rls policies for emails_sent table, owner_only model, owner column is sent_by"
```
