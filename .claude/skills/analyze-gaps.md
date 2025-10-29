# Analyze Implementation Gaps

Analisa rapidamente o que falta implementar comparando código atual vs stories pendentes.

## Instructions

Você é um analisador de gaps especializado. Sua tarefa é identificar rapidamente o que falta para completar o Sprint MVP State of Art.

### Inputs Necessários

1. **Scope** (all | epic-{number} | story-{id})

### Workflow de Análise

#### Step 1: Ler Stories Pendentes

```bash
# Se scope = all
Read docs/stories/*.md (list all)

# Se scope = epic-{number}
Read docs/prd/epic-{number}*.md
# Identificar stories do epic
Read docs/stories/{story-ids from epic}

# Se scope = story-{id}
Read docs/stories/{story-id}*.md
```

#### Step 2: Para Cada Story, Verificar Implementação

**Checklist rápido**:

```markdown
## Story {id}: {título}

**Status**: ⏳ NOT STARTED | 🚧 IN PROGRESS | ✅ DONE

### Quick Check

1. **Components mencionados existem?**
   - [ ] {ComponentName} exists at {path}? (Glob search)

2. **Tabelas mencionadas existem?**
   - [ ] {table_name} exists? (Read database-schema.md)

3. **RLS policies existem?**
   - [ ] {table_name} has INSERT/UPDATE/DELETE policies? (Grep migrations/)

4. **Integração existe?**
   - [ ] Component integrado na página target? (Read target page)

### Veredicto

- ⏳ **NOT STARTED**: Nenhum componente existe
- 🚧 **IN PROGRESS**: Alguns componentes existem, mas AC não completos
- ✅ **DONE**: Todos AC completos (validar com skill validate-story)
```

#### Step 3: Gerar Gap Matrix

```markdown
# Implementation Gap Matrix

| Story | Epic | Status | Missing | Blocker | Effort |
|-------|------|--------|---------|---------|--------|
| 1.1 | EPIC-001 | ⏳ NOT STARTED | EmailComposer, emails_sent table, RLS | 🔴 RLS | 1 dia |
| 1.2 | EPIC-001 | ⏳ NOT STARTED | ProductLink, opportunity_products table | 🔴 RLS | 1 dia |
| 3.1 | EPIC-003 | 🚧 IN PROGRESS | ClientCard needs variant change | - | 2h |

**Legend**:
- ⏳ NOT STARTED: 0% implementado
- 🚧 IN PROGRESS: 1-99% implementado
- ✅ DONE: 100% DoD

**Blockers**:
- 🔴 RLS: RLS policies não existem
- 🟡 Migration: Tabela não existe
- 🟢 None: Pronto para implementar
```

#### Step 4: Priorizar por Dependências

**Ordenar stories por**:
1. Blockers críticos primeiro (resolver RLS antes)
2. Dependencies (stories que outras dependem)
3. Quick wins (2h stories) para momentum

```markdown
## Recommended Implementation Order

### Phase 0: Resolve Blockers (CRITICAL)
1. 🔴 **RLS Policies**: Generate for all 11 tables (2-3 dias)
2. 🟡 **Migrations**: Create emails_sent, opportunity_products tables (0.5 dia)

### Phase 1: Quick Wins (6h)
1. Story 3.1 (2h) - Fix Botões ClientCard ✅ Zero blockers
2. Story 3.2 (4h) - Quick Actions Cards ✅ Zero blockers

### Phase 2: Blocked Stories (resolve after Phase 0)
1. Story 1.1 (1 dia) - Tab Email 🔴 Depends: emails_sent table + RLS
2. Story 1.2 (1 dia) - Tab Produtos 🔴 Depends: opportunity_products + RLS
3. Story 1.3 (1 dia) - Tab Arquivos 🔴 Depends: Storage bucket + RLS

### Phase 3: Independent Stories
1. Story 2.1 (2 dias) - Barra de Filtros 🟡 Depends: Zustand store
2. Story 3.3 (1 dia) - Layout Match RD ✅ Zero blockers
```

#### Step 5: Calcular Velocity

```markdown
## Sprint Velocity Analysis

**Total Stories**: 7
**Total Effort**: 7.5 dias

**Status Breakdown**:
- ⏳ NOT STARTED: 5 stories (6.75 dias)
- 🚧 IN PROGRESS: 0 stories (0 dias)
- ✅ DONE: 2 stories (0.75 dia) ← Quick wins estimadas

**Blockers**:
- 🔴 CRITICAL: RLS policies (blocks 3 stories = 3 dias)
- 🟡 MEDIUM: Migrations (blocks 2 stories = 2 dias)
- 🟢 NONE: 2 stories ready (0.75 dia)

**Progress**: 0% (0/7 stories done)

**ETA to MVP State of Art**:
- If start today with blockers: 10 dias (2-3 blocker + 7.5 sprint)
- If blockers already resolved: 7.5 dias
```

#### Step 6: Identificar Riscos

```markdown
## Risk Analysis

### High Risks 🔴

1. **RLS Policies Incomplete**
   - Impact: 3 stories bloqueadas (1.1, 1.2, 1.3)
   - Probability: 100% (confirmed gap)
   - Mitigation: Resolver na Fase 0 (antes do sprint)

2. **Storage Bucket Not Created**
   - Impact: Story 1.3 bloqueada
   - Probability: 80% (not verified)
   - Mitigation: Create bucket + RLS policies (0.5 dia)

### Medium Risks 🟡

1. **Zustand Store Doesn't Exist**
   - Impact: Story 2.1 precisa criar store (adiciona 1h)
   - Probability: 90%
   - Mitigation: Create store primeiro (0.5h)

2. **Component Complexity Exceeds Limits**
   - Impact: Protocol Notecraft™ violation (retrabalho)
   - Probability: 30%
   - Mitigation: Usar skill generate-component (valida antes)

### Low Risks 🟢

1. **Quick Wins Take Longer**
   - Impact: Stories 3.1, 3.2 levam 1 dia ao invés de 6h
   - Probability: 20%
   - Mitigation: Buffer de 1.25 dias no sprint
```

---

## Output Format

```markdown
# Gap Analysis Report: {scope}

**Analyzed**: {number} stories
**Date**: {date}

---

## Summary

| Status | Count | Effort |
|--------|-------|--------|
| ⏳ NOT STARTED | {n} | {dias} dias |
| 🚧 IN PROGRESS | {n} | {dias} dias |
| ✅ DONE | {n} | {dias} dias |
| **TOTAL** | **{n}** | **{dias} dias** |

**Progress**: {percent}% ({done}/{total} stories)

---

## Gap Matrix

{gap matrix completa}

---

## Recommended Order

{implementation order com dependências}

---

## Velocity Analysis

{velocity calculation}

---

## Risk Analysis

{risks identificados}

---

## Next Actions

1. 🔴 **CRITICAL**: {ação crítica 1}
2. 🟡 **MEDIUM**: {ação média 1}
3. 🟢 **READY**: {story pronta para começar}

**Recommendation**: {recomendação baseada nos gaps}
```

---

## 🎯 Exemplo de Uso

```
User: "analyze gaps all"
User: "analyze gaps epic-1"
User: "analyze gaps story-1.1"
```
