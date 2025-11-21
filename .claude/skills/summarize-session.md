# Summarize Session

Gera sumário técnico completo da sessão de trabalho atual para documentação e continuidade.

## Instructions

Você é um documentador técnico especializado em gerar sumários estruturados de sessões de desenvolvimento. Sua tarefa é analisar toda a conversa atual e produzir um documento técnico detalhado.

### Quando Gerar Sumário

**Gerar automaticamente quando**:
- ✅ Usuário digitar comando "summarize" ou "sumário"
- ✅ Após 2+ commits em sequência
- ✅ Sessão longa (4+ horas de trabalho contínuo)
- ✅ Milestone importante completada (P0 blocker, story completa)
- ✅ Antes de usuário pedir /clear

**Não gerar se**:
- ❌ Conversa tem <5 mensagens
- ❌ Nenhum código foi escrito/modificado
- ❌ Sessão é apenas Q&A sem implementação

### Workflow de Geração

#### Step 1: Analisar Conversa Completa

**Identificar**:
1. Data/hora início da sessão
2. Todos os commits realizados (git log)
3. Arquivos criados/modificados
4. Features implementadas
5. Bugs corrigidos
6. Decisões técnicas importantes
7. Pendências/blockers encontrados
8. Protocol Notecraft™ status

```bash
# Buscar commits da sessão
git log --oneline --since="today" | head -10

# Ver arquivos modificados
git diff --stat HEAD~5..HEAD

# Status atual
git status
```

#### Step 2: Classificar Trabalho Realizado

**Categorias**:
- 🎯 **Features**: Novas funcionalidades implementadas
- 🐛 **Bugs**: Correções de erros
- ✨ **UX/UI**: Melhorias visuais/experiência
- ⚙️ **Tooling**: Scripts, configs, automações
- 📝 **Docs**: Documentação técnica
- 🔧 **Refactor**: Otimizações sem mudança de comportamento

#### Step 3: Mapear Status do Projeto

```markdown
## Status Gaps P0

| Gap | Story | Status Antes | Status Agora | Progresso |
|-----|-------|--------------|--------------|-----------|
| G-001 | 2.1 | ⏳ NOT STARTED | ⏳ NOT STARTED | 0% |
| G-002 | 1.1 | 🚧 95% | ✅ DONE | +5% |
| G-003 | 1.2 | ✅ DONE | ✅ DONE | 0% |

**Legenda**:
- ⏳ NOT STARTED: 0% implementado
- 🚧 IN PROGRESS: 1-99% implementado
- ✅ DONE: 100% DoD completo
```

#### Step 4: Calcular Métricas

**Métricas a calcular**:
- Número de commits realizados
- Linhas de código adicionadas (~estimado)
- Arquivos criados vs modificados
- Stories completadas
- Tempo de sessão (estimado por mensagens)
- Protocol Notecraft™ compliance (passar validate:notecraft)
- Build status (npm run build)

#### Step 5: Identificar Próximos Passos

**Baseado em**:
- Stories pendentes (docs/stories/*.md)
- Gaps P0 restantes (.ai/relatorios-avaliacao-critica.md)
- Blockers encontrados durante sessão
- Dependências técnicas

**Ordenar por**:
1. Quick wins (2-4h stories)
2. Blockers resolvidos (sem dependências)
3. Features médias (1d stories)
4. Features complexas (2d+ stories)

#### Step 6: Gerar Comando de Continuação

**Criar prompt para próxima sessão**:
```
Vamos continuar o trabalho de desenvolvimento do STAGETEK CRM.

Sessão anterior (21 Nov 2025):
- ✅ G-002 completo (Tab Email com histórico)
- ✅ UI/UX melhorada (scrollbars + transparência)
- ✅ Erros TypeScript corrigidos

Próximo objetivo: {próxima task}

Status: {branch}, {last commit hash}
Arquivos modificados na sessão anterior: {lista}

Vamos implementar {próxima feature}. Siga rigorosamente BMAD Protocol.
```

---

## Output Format

```markdown
# 📋 SUMÁRIO TÉCNICO - Sessão {DD} {MÊS} {YYYY}

**Início**: {hora início aproximada}
**Duração**: ~{horas} horas
**Branch**: {branch name}
**Último commit**: {hash} - {mensagem}

---

## ✅ TRABALHO CONCLUÍDO ({N} commits)

### Commit 1: {hash} - {título}
**Categoria**: {Feature|Bug|UX|Tooling|Docs|Refactor}
**Arquivos**: {N} arquivos modificados
**Descrição**: {O que foi feito - 2-3 parágrafos detalhados}

**Validação**:
- ✅ npm run build - {tempo}
- ✅ npm run validate:notecraft - {compliance}
- ✅ ESLint: {N} warnings (limite 200)

### Commit 2: {hash} - {título}
**Categoria**: {categoria}
...

---

## 🎯 STATUS ATUAL DO PROJETO

### Gaps P0 - Progresso

| Gap | Story | Status Antes | Status Agora | Delta |
|-----|-------|--------------|--------------|-------|
| G-001 | 2.1 | ⏳ | ⏳ | 0% |
| G-002 | 1.1 | 🚧 95% | ✅ DONE | +5% |
| G-003 | 1.2 | ✅ | ✅ | 0% |
| G-004 | 1.3 | ✅ | ✅ | 0% |
| G-005 | 3.2 | ✅ | ✅ | 0% |
| G-006 | 3.1 | ✅ | ✅ | 0% |
| G-007 | 3.3 | ⏳ | ⏳ | 0% |

**Total Progresso Sprint**: {X}/7 gaps completos ({percent}%)

### Métricas da Sessão

- **Commits**: {N} commits realizados
- **Arquivos**: {N} criados, {N} modificados
- **Linhas**: ~{N} linhas adicionadas
- **Stories**: {N} completadas
- **Build**: ✅ Passa em {tempo}s
- **Protocol**: ✅ 100% compliance
- **ESLint**: {N}/200 warnings

### Branch Status

```bash
Branch: {branch}
Commits ahead: {N}
Last commit: {hash}
```

---

## 🚀 PRÓXIMA SESSÃO - {Tema}

### Prioridade Recomendada (Ordem de Implementação):

#### Quick Wins (2-4h):
1. **{Task ID}**: {Descrição} ({estimativa})
   - AC: {principais acceptance criteria}
   - Blocker: {✅ None | 🟡 Medium | 🔴 Critical}
   - Files: {arquivos a modificar}

#### Features Médias (1d):
2. **{Task ID}**: {Descrição} ({estimativa})
   ...

#### Features Complexas (2d+):
3. **{Task ID}**: {Descrição} ({estimativa})
   ...

**Recomendação**: Começar com {task} por ser quick win sem blockers.

---

## 📁 ARQUIVOS MODIFICADOS/CRIADOS

### Features ({N} arquivos):
```
src/components/organisms/Timeline.tsx (79 → 68 linhas, -11)
src/components/molecules/TimelineItem.tsx (30 linhas, mantido)
```

### Tooling ({N} arquivos):
```
.claude/commands/summarize.md (novo, 168 linhas)
```

### Docs ({N} arquivos):
```
.ai/SUMARIO-SESSAO-{DATA}.md (este arquivo)
```

---

## 🎯 COMANDO PARA PRÓXIMA SESSÃO

**Após `/clear`, copie e cole no chat:**

```
Vamos continuar o desenvolvimento do STAGETEK CRM.

📊 Contexto da Sessão Anterior ({DD} {MÊS} {YYYY}):
- ✅ {Feature 1 completa}
- ✅ {Feature 2 completa}
- ✅ {Melhoria 1}

📦 Status Git:
- Branch: {branch}
- Último commit: {hash} - {mensagem curta}
- {N} commits ahead of origin/main

🎯 Próximo Objetivo: {Próxima task}

🔗 Docs Relevantes:
- Story: docs/stories/{story-id}.md
- Gap: .ai/relatorios-avaliacao-critica.md (G-{number})
- Sumário: .ai/SUMARIO-SESSAO-{DATA}.md

Vamos implementar {descrição breve da task}. Siga rigorosamente BMAD Protocol e Protocol Notecraft™.
```

---

## 📊 GAPS P0 RESTANTES ({N} dias)

### ✅ COMPLETO ({N}/7):
- [x] G-002: Tab Email ← **COMPLETO NESTA SESSÃO**
- [x] G-003: Tab Produtos (já existia)
- [x] G-004: Tab Arquivos (já existia)
- [x] G-005: Quick Actions (já existia)
- [x] G-006: Botões visíveis (completo sessão anterior)

### 🔜 PRÓXIMOS ({N}/7):
- [ ] G-007: Layout DetalheOportunidade (1d)
  - AC: Banner, 3 colunas, sidebar info
  - Blocker: ✅ None
  - Effort: 1 dia (4-6h)

- [ ] G-001: Barra Filtros Completa (2d)
  - AC: 6 controles, Zustand store, filtros persist
  - Blocker: 🟡 Zustand store não existe
  - Effort: 2 dias (8-12h)

**Total Restante**: ~3 dias (2 gaps P0)

---

## 🔧 DECISÕES TÉCNICAS

### Arquitetura:
- **{Decisão 1}**: {Justificativa técnica}
- **{Decisão 2}**: {Justificativa técnica}

### Protocol Notecraft™:
- ✅ Timeline.tsx: 79 → 68 linhas (otimizado -11 para compliance)
- ✅ Tailwind CSS: 100% uso (zero CSS inline)
- ✅ TypeScript: Sem any em código novo

### Performance:
- Build time: {tempo}s (target: <25s)
- Bundle size: {size}KB gzipped (target: <800KB)
- ESLint warnings: {N}/200

### UX/UI:
- Scrollbars customizadas (STAGETEK red branding)
- Transparência reduzida (rgba 0.08 → 0.12)
- Bordas mais visíveis (white/15 → white/20)

---

## ⚙️ COMANDOS ÚTEIS

```bash
# Dev
npm run dev                  # Start dev server (port 5173/5174)

# Validações
npm run validate:notecraft   # Protocol Notecraft™ compliance
npm run build                # Build produção
npm run type-check           # TypeScript errors only
npm run lint                 # ESLint (max 200 warnings)

# Git
git status                   # Ver arquivos modificados
git log --oneline -5         # Últimos 5 commits
git diff --stat HEAD~3       # Mudanças últimos 3 commits

# Supabase (se necessário)
npx supabase start           # Start local instance
npx supabase status          # Check services
```

---

## 📝 NOTAS FINAIS

### Blockers Identificados:
- {Blocker 1 encontrado durante sessão}
- {Blocker 2 encontrado durante sessão}

### Riscos:
- {Risco técnico identificado}
- {Dependência externa identificada}

### Aprendizados:
- {Aprendizado técnico 1}
- {Padrão aplicado que funcionou bem}

### Para Não Esquecer:
- {Detalhe importante para próxima sessão}
- {Refactoring pendente (não blocker)}

---

**Criado em**: {Data completa com hora}
**Sessão**: {Tema principal da sessão}
**Próxima Sessão**: {Tema sugerido}
**Status**: ✅ Pronto para `/clear` + continuar

**Gerado por**: Claude Code + Skill summarize-session
```

---

## 🎯 Exemplo de Uso

**User input que deve triggar a skill**:
```
User: "summarize"
User: "gerar sumário"
User: "sumário da sessão"
User: "resumo do trabalho"
```

**Sistema deve**:
1. Detectar keywords: summarize, sumário, resumo, sessão
2. Analisar conversa completa desde início (ou desde /clear)
3. Buscar commits via git log
4. Calcular métricas
5. Gerar arquivo .ai/SUMARIO-SESSAO-{DD}{MMM}{YYYY}.md
6. Informar usuário do arquivo criado

---

## ⚠️ Validações Obrigatórias

Antes de gerar sumário, validar:
- [ ] Sessão tem ≥5 mensagens
- [ ] Pelo menos 1 commit foi realizado
- [ ] Código foi modificado (não apenas Q&A)
- [ ] git log retorna commits recentes

Se validações falharem:
```
⚠️ Sessão muito curta para gerar sumário.

Mínimo necessário:
- 5+ mensagens na conversa
- 1+ commits realizados
- Código modificado/criado

Continue trabalhando e gere o sumário quando houver mais progresso.
```

---

**Protocol Notecraft™ Compliance**: ✅ Skill ≤300 linhas
**Format**: Markdown estruturado
**Output**: .ai/SUMARIO-SESSAO-{DATA}.md
