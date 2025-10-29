# Validate Story Implementation

Valida se a implementação de uma story está 100% conforme os Acceptance Criteria documentados.

## Instructions

Você é um validador BMAD especializado. Sua tarefa é verificar se uma story foi implementada corretamente.

### Inputs Necessários

1. **Story ID** (ex: 1.1, 2.1, 3.3)
2. **Caminho dos arquivos modificados** (opcional - se não fornecido, buscar automaticamente)

### Workflow de Validação

#### Step 1: Ler Documentação
```bash
# Ler story
Read docs/stories/{story-id}*.md

# Ler epic relacionado
Read docs/prd/epic-{epic-number}*.md

# Ler coding standards
Read docs/architecture/coding-standards.md (linhas 1-100)
```

#### Step 2: Identificar Arquivos Afetados
- Buscar componentes mencionados na story (Tasks section)
- Ex: Story 3.1 menciona `ClientCard.tsx` → buscar `src/components/molecules/ClientCard.tsx`

#### Step 3: Validar Acceptance Criteria (AC)
Para cada AC da story:
- [ ] AC implementado? (SIM/NÃO)
- [ ] Funciona conforme descrito? (código review)
- [ ] Edge cases cobertos? (validações, error handling)

#### Step 4: Validar Protocol Notecraft™
Para cada componente modificado:
- [ ] Respeita limite de linhas? (atom ≤20, molecule ≤35, organism ≤50)
- [ ] TypeScript strict? (zero `any`)
- [ ] Tailwind CSS? (zero CSS inline)
- [ ] Mobile-first? (breakpoints sm/md/lg)

#### Step 5: Validar Definition of Done
- [ ] 100% AC passaram
- [ ] Protocol Notecraft™ compliance
- [ ] Zero bugs críticos
- [ ] Screenshot before/after (para UX changes)
- [ ] Código commitável (sem console.log, TODOs, etc.)

### Output Format

Gerar relatório em formato markdown:

```markdown
# Validation Report: Story {story-id}

**Story**: {título da story}
**Epic**: {epic relacionado}
**Status**: ✅ PASSED | ⚠️ PARTIAL | ❌ FAILED

---

## Acceptance Criteria

| AC # | Descrição | Status | Observação |
|------|-----------|--------|------------|
| AC-1 | {descrição} | ✅ PASS | - |
| AC-2 | {descrição} | ❌ FAIL | Falta validação XYZ |

---

## Protocol Notecraft™

| Componente | Linhas | Limite | Status | Issues |
|------------|--------|--------|--------|--------|
| ClientCard.tsx | 38 | 35 | ❌ FAIL | Excede 3 linhas |

---

## Definition of Done

- [x] 100% AC passaram
- [ ] Protocol Notecraft™ compliance ← **BLOCKER**
- [x] Zero bugs críticos
- [ ] Screenshot anexado ← **PENDENTE**

---

## Veredicto Final

**Status**: ❌ **FAILED** (2 blockers)

**Blockers**:
1. ClientCard.tsx excede limite de linhas (38/35)
2. Screenshot before/after não anexado

**Ações Necessárias**:
1. Refatorar ClientCard.tsx (extrair 3+ linhas para novo molecule)
2. Adicionar screenshot em `.ai/screenshots/story-3.1-before-after.png`

**Estimativa para resolver**: 30min
```

### Exemplo de Uso

```
User: "validate story 3.1"