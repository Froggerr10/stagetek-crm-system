# Implement Story (End-to-End Workflow)

Workflow guiado end-to-end para implementar uma story completa do início ao fim, garantindo 100% DoD.

## Instructions

Você é um implementador BMAD especializado. Sua tarefa é implementar uma story do zero até estar "Done" (100% DoD).

### Inputs Necessários

1. **Story ID** (ex: 1.1, 2.1, 3.3)

### End-to-End Workflow (7 Fases)

---

## 📋 **FASE 1: Discovery (5min)**

### Step 1.1: Ler Documentação

```bash
# Story específica
Read docs/stories/{story-id}*.md

# Epic relacionado
Read docs/prd/epic-{number}*.md

# Architecture references
Read docs/architecture/database-schema.md (buscar tabelas mencionadas)
Read docs/architecture/coding-standards.md (linhas 1-100)
Read docs/architecture/source-tree.md (buscar componentes existentes)
```

### Step 1.2: Identificar Dependências

**Checklist**:
- [ ] Tabelas novas precisam ser criadas? (migrations)
- [ ] RLS policies existem para essas tabelas?
- [ ] Componentes existentes podem ser reutilizados? (buscar source-tree)
- [ ] Hooks existentes podem ser reutilizados?
- [ ] Blockers críticos? (RLS, migrations, APIs externas)

### Step 1.3: Planejar Arquitetura

**Listar componentes a criar**:
```
Story {id}: {título}

Components to CREATE:
- [ ] {ComponentName} ({type}) - {path}
- [ ] {ComponentName} ({type}) - {path}

Components to MODIFY:
- [ ] {ComponentName} ({type}) - {path} - {modificação}

Migrations NEEDED:
- [ ] CREATE TABLE {table_name}
- [ ] RLS policies for {table_name}

Hooks to CREATE:
- [ ] {hookName} - {path}

Dependencies:
- {blocker 1}
- {blocker 2}
```

---

## 🏗️ **FASE 2: Migrations (Se Necessário)**

### Step 2.1: Gerar Migration (Se Tabela Nova)

```bash
# Usar skill generate-rls-policies
# Exemplo:
"generate rls policies for emails_sent table, owner_only, owner column sent_by"
```

### Step 2.2: Aplicar Migration

```bash
# Criar arquivo migration
Write supabase/migrations/{timestamp}_{table_name}.sql

# Aplicar migration localmente
npx supabase db reset

# Testar RLS policies
# (queries de teste no psql)
```

**Checkpoint 2**: Migrations aplicadas ✅

---

## 🎨 **FASE 3: Componentes (UI)**

### Step 3.1: Gerar Componentes

Para cada componente a criar:

```bash
# Usar skill generate-component
# Exemplo:
"generate component EmailComposer organism - form to send emails with to/subject/body fields"
```

### Step 3.2: Validar Protocol Notecraft™

Para cada componente gerado:
- [ ] Linhas respeitam limite? (atom ≤20, molecule ≤35, organism ≤50)
- [ ] TypeScript strict? (zero `any`)
- [ ] Tailwind CSS? (zero inline styles)
- [ ] Imports ordenados?

**Checkpoint 3**: Componentes criados ✅

---

## 🔗 **FASE 4: Hooks & Lógica (Business Logic)**

### Step 4.1: Criar Hooks Customizados

**Se componente tem lógica complexa (>10 linhas), extrair para hook**:

```typescript
// hooks/use{FeatureName}.ts
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export const use{FeatureName} = () => {
  const [state, setState] = useState()

  const handleAction = async () => {
    // Toda lógica de negócio aqui
    const { data, error } = await supabase
      .from('table')
      .select('*')

    if (error) throw error
    return data
  }

  return { state, handleAction }
}
```

### Step 4.2: Integrar Supabase Queries

**Para cada operação CRUD**:

```typescript
// SELECT
const { data, error } = await supabase
  .from('table')
  .select('*, relationships(*)')
  .eq('column', value)

// INSERT
const { data, error } = await supabase
  .from('table')
  .insert([{ column: value }])

// UPDATE
const { data, error } = await supabase
  .from('table')
  .update({ column: value })
  .eq('id', id)

// DELETE
const { data, error } = await supabase
  .from('table')
  .delete()
  .eq('id', id)
```

**Checkpoint 4**: Hooks criados e testados ✅

---

## 🔌 **FASE 5: Integração (Conectar Tudo)**

### Step 5.1: Integrar Componente na Página

```typescript
// Ex: Integrar EmailComposer em DetalheOportunidade.tsx

import { EmailComposer } from '@/components/organisms'

// Dentro da página:
<Tabs>
  <TabsList>
    <TabsTrigger value="email">E-mail</TabsTrigger>
  </TabsList>
  <TabsContent value="email">
    <EmailComposer opportunityId={id} />
  </TabsContent>
</Tabs>
```

### Step 5.2: Testar Fluxo Completo

**User Journey Testing**:
1. Navegar até a página
2. Clicar no elemento (botão, tab, etc.)
3. Preencher form (se aplicável)
4. Submit
5. Verificar resultado (success/error)
6. Verificar persistência (reload página)

**Checkpoint 5**: Integração funcional ✅

---

## ✅ **FASE 6: Validação (Acceptance Criteria)**

### Step 6.1: Validar Cada AC

Para cada Acceptance Criteria da story:

```markdown
## AC Validation: Story {id}

| AC # | Descrição | Status | Teste |
|------|-----------|--------|-------|
| AC-1 | {descrição} | ✅ PASS | {como foi testado} |
| AC-2 | {descrição} | ❌ FAIL | {erro encontrado} |
```

### Step 6.2: Validar Definition of Done

```markdown
## DoD Checklist

- [ ] 100% AC passaram
- [ ] Protocol Notecraft™ compliance
- [ ] TypeScript strict (zero `any`)
- [ ] Tailwind CSS (zero inline styles)
- [ ] Mobile-first (testado em 375px)
- [ ] RLS policies validadas (se aplicável)
- [ ] Zero bugs críticos
- [ ] Screenshot before/after (para UX changes)
- [ ] Código commitável (sem console.log, TODOs)
```

**Checkpoint 6**: DoD 100% ✅

---

## 📸 **FASE 7: Documentação & Commit**

### Step 7.1: Screenshot (Para UX Changes)

```bash
# Criar screenshot before/after
# Salvar em: .ai/screenshots/story-{id}-before-after.png
```

### Step 7.2: Commit com Mensagem Clara

```bash
git add .
git commit -m "feat: implement story {id} - {título}

Acceptance Criteria:
- AC-1: {descrição}
- AC-2: {descrição}

Components:
- Created: {ComponentName} ({type})
- Modified: {ComponentName} ({type})

Migrations:
- {migration_file}.sql (se aplicável)

DoD: 100% ✅
Protocol Notecraft™: compliant ✅

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Checkpoint 7**: Story commitada ✅

---

## 📊 **Output Final**

Gerar relatório de conclusão:

```markdown
# Story Implementation Report: {story-id}

**Story**: {título}
**Epic**: {epic relacionado}
**Status**: ✅ **DONE** (100% DoD)

---

## Components Created

| Component | Type | Path | Lines |
|-----------|------|------|-------|
| {Name} | {type} | {path} | {lines}/{limit} |

---

## Components Modified

| Component | Type | Path | Changes |
|-----------|------|------|---------|
| {Name} | {type} | {path} | {descrição} |

---

## Migrations

| File | Description | Applied |
|------|-------------|---------|
| {filename}.sql | {descrição} | ✅ |

---

## Acceptance Criteria

| AC # | Status |
|------|--------|
| AC-1 | ✅ PASS |
| AC-2 | ✅ PASS |

---

## Definition of Done

- [x] 100% AC passaram
- [x] Protocol Notecraft™ compliance
- [x] TypeScript strict
- [x] Tailwind CSS
- [x] Mobile-first
- [x] RLS validated
- [x] Zero bugs
- [x] Screenshot attached
- [x] Committed

---

## Time to Complete

**Estimated**: {estimate from story}
**Actual**: {actual time}
**Variance**: {difference}

---

## Next Story

**Suggestion**: Story {next-id} ({título}) - {estimativa}
```

---

## 🎯 Exemplo de Uso Completo

```
User: "implement story 3.1"