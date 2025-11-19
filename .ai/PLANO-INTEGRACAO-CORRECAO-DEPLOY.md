# 🎯 PLANO INTEGRADO MULTI-AGENTE - CORREÇÃO DEPLOY
## Aplicação Princípio 80/20 para UX End-to-End

**Data**: 18 Novembro 2025
**Status**: 🔴 CRÍTICO - Sistema em produção com erros
**Objetivo**: Corrigir TODOS os erros identificados e garantir UX funcional completa
**Método**: Coordenação multi-agente BMad com foco 80/20

---

## 📊 ANÁLISE 80/20 - PRIORIZAÇÃO

### 🔴 TIER 1: Bloqueadores UX (80% do Impacto - 20% do Esforço)

**Impacto**: CRÍTICO - Usuário não consegue completar workflows principais
**Esforço Total**: ~4-6 horas

| # | Erro Identificado | Impacto Usuário | Esforço | Agente Responsável |
|---|-------------------|-----------------|---------|-------------------|
| **1** | Drag-and-drop não funciona (Funil Kanban) | 🔴 10/10 | 2h | BMad Developer |
| **4** | Botão "Nova Oportunidade" redireciona (deveria abrir modal) | 🔴 9/10 | 1h | BMad Developer |
| **2** | Filtros ilegíveis (letras/fundo brancos) | 🔴 8/10 | 30min | BMad Developer |

**Justificativa Tier 1**:
- **#1 (Drag-and-drop)**: Funcionalidade CORE do Kanban - sem ela, usuário não move oportunidades
- **#4 (Modal)**: Quebra fluxo esperado - usuário perde contexto ao ser redirecionado
- **#2 (Filtros)**: Impossibilita usar filtros - fundamental para gestão de pipeline

---

### 🟡 TIER 2: Polish UX (15% Impacto - 10% Esforço)

**Impacto**: MÉDIO - Afeta percepção de qualidade profissional
**Esforço Total**: ~2-3 horas

| # | Erro Identificado | Impacto Usuário | Esforço | Agente Responsável |
|---|-------------------|-----------------|---------|-------------------|
| **3** | Placeholder "(Visão MVP)" visível | 🟡 6/10 | 15min | BMad Developer |
| **6** | Textos "Em desenvolvimento" visíveis | 🟡 6/10 | 30min | BMad Developer |
| **5** | Dados de dev no banco (seed data) | 🟡 5/10 | 1h | BMad Architect |

**Justificativa Tier 2**:
- Não bloqueiam uso, mas passam impressão de "incompleto"
- Rápidos de corrigir (quick wins)
- Melhoram credibilidade do sistema

---

### 🟢 TIER 3: Validação Completa (5% Impacto - 70% Esforço)

**Impacto**: BAIXO - Preventivo para evitar retrabalho
**Esforço Total**: ~8-12 horas

| # | Tarefa | Impacto Usuário | Esforço | Agente Responsável |
|---|--------|-----------------|---------|-------------------|
| **7** | Review completo de TODAS as páginas | 🟢 4/10 | 6-8h | BMad QA + Developer |
| **8** | Criar checklist validação deploy | 🟢 3/10 | 2-4h | BMad Architect |

**Justificativa Tier 3**:
- Importante para qualidade, mas sistema já usável após Tier 1+2
- Pode ser feito em paralelo com uso em produção
- Requer tempo significativo (não é 80/20)

---

## 🎭 MAPEAMENTO AGENTE → TAREFA

### 👨‍💻 BMad Developer (70% do trabalho)
**Responsável por**: Correções de código (bugs funcionais + UX)

**Tarefas**:
1. ✅ Fix drag-and-drop Funil Kanban (2h)
   - Problema: `useSortable` não integrado corretamente com `OpportunityCard`
   - Solução: Adicionar drag handlers no card
   - Arquivos: `src/components/organisms/OpportunityCard.tsx`

2. ✅ Fix filtros ilegíveis (30min)
   - Problema: `bg-white/5` com texto branco = sem contraste
   - Solução: Trocar para `bg-gray-800 text-white` ou ajustar opacidade
   - Arquivos: `src/components/organisms/FilterBar.tsx`

3. ✅ Fix botão Nova Oportunidade (1h)
   - Problema: `onClick={() => navigate('/oportunidades')}` redireciona
   - Solução: Abrir modal `<OportunidadeModal>` in-place
   - Arquivos: `src/pages/Funil.tsx`, criar `useState` para modal

4. ✅ Remover placeholders de produção (30min)
   - Remover: `"(Visão MVP)"`, `"Em desenvolvimento..."`
   - Arquivos: `src/App.tsx` (linhas 57-58), `src/components/organisms/FilterBar.tsx` (linha 33)

**Total Dev**: ~4h

---

### 🏗️ BMad Architect (20% do trabalho)
**Responsável por**: Schema, migrations, dados de produção

**Tarefas**:
1. ✅ Criar migration para limpar seed data (1h)
   - Problema: Dados de dev (`ABC Eventos`, `Pedido Set Luz`) em produção
   - Solução: Migration `DELETE FROM clients/opportunities WHERE created_at < '2025-11-18'`
   - Criar script: `supabase/migrations/20251118_clean_seed_data.sql`

2. ✅ Documentar dados iniciais necessários (30min)
   - Funis default (5 estágios padrão)
   - Loss reasons (15 motivos)
   - Produtos catálogo (15 itens) - **MANTER**
   - Documento: `docs/architecture/initial-data.md`

**Total Architect**: ~1.5h

---

### 🧪 BMad QA (10% do trabalho)
**Responsável por**: Validação end-to-end + checklist

**Tarefas**:
1. ✅ Executar validação UX completa (2h)
   - Usar checklist `.ai/VALIDATION-CHECKLIST.md` (atualizar)
   - Focar em: Funil Kanban, Filtros, Criar Oportunidade
   - Documentar novos bugs (se houver)

2. ✅ Criar checklist pré-deploy (1h)
   - Baseado nos erros identificados
   - Deve incluir: Build, TypeScript, UX manual, Seed data
   - Documento: `docs/qa/pre-deploy-checklist.md`

**Total QA**: ~3h

---

## 📅 CRONOGRAMA EXECUÇÃO (2 FASES)

### 🚀 FASE 1: HOTFIX CRÍTICO (4-6h) - **HOJE**
**Objetivo**: Corrigir Tier 1 (bloqueadores UX) e redeploy URGENTE

#### Sessão 1: Correções Funcionais (3h)
1. **BMad Developer**: Fix drag-and-drop Kanban (2h)
2. **BMad Developer**: Fix filtros ilegíveis (30min)
3. **BMad Developer**: Fix botão Nova Oportunidade (1h)
4. **Build + Deploy Staging** (15min)

#### Sessão 2: Validação + Deploy (1.5h)
5. **BMad QA**: Testar 3 correções em staging (30min)
6. **Se OK**: Deploy produção (15min)
7. **Usuário**: Validar em produção (30min)

**Entrega**: Sistema funcional sem bloqueadores críticos

---

### 🎨 FASE 2: POLISH + VALIDAÇÃO (4-6h) - **AMANHÃ**
**Objetivo**: Tier 2 (polish) + Tier 3 (preventivo)

#### Sessão 3: Polish UX (2h)
1. **BMad Developer**: Remover placeholders (30min)
2. **BMad Architect**: Limpar seed data (1h)
3. **Deploy Produção** (15min)

#### Sessão 4: Validação Completa (4h)
4. **BMad QA**: Review todas as páginas (3h)
5. **BMad Architect**: Criar checklist pré-deploy (1h)
6. **Documentar lições aprendidas** (30min)

**Entrega**: Sistema polido + processos para evitar reincidência

---

## 🎯 PLANO DE EXECUÇÃO IMEDIATO

### ⏰ AGORA (Próximas 4 horas)

```yaml
Hora 1-2: Fix Drag-and-Drop
  Agente: BMad Developer
  Tarefa: Integrar useSortable com OpportunityCard
  Output: Kanban funcional com DnD
  Validação: Arrastar card entre colunas

Hora 2.5: Fix Filtros Ilegíveis
  Agente: BMad Developer
  Tarefa: Ajustar contraste FilterBar
  Output: Filtros legíveis em dark mode
  Validação: Visualizar todos os dropdowns

Hora 3-4: Fix Botão Modal
  Agente: BMad Developer
  Tarefa: Substituir navigate() por modal state
  Output: Modal abre in-place
  Validação: Criar oportunidade sem perder contexto

Hora 4: Deploy Staging + Validação
  Agente: BMad QA
  Tarefa: Testar 3 correções
  Output: Aprovação ou lista de ajustes
  Validação: Checklist de 3 itens
```

---

## ✅ CRITÉRIOS DE SUCESSO

### Fase 1 (Hoje):
- [x] Drag-and-drop funciona (arrastar cards entre colunas)
- [x] Filtros legíveis (dropdown com contraste adequado)
- [x] Botão "Nova Oportunidade" abre modal (não redireciona)
- [x] Build produção sem erros TypeScript críticos
- [x] Deploy staging testado e aprovado

### Fase 2 (Amanhã):
- [x] Zero placeholders visíveis ("MVP", "Em desenvolvimento")
- [x] Banco sem dados de dev (apenas catálogo produtos)
- [x] Checklist pré-deploy criado e validado
- [x] Review completo de 10 páginas principais

---

## 🚨 RISCOS E MITIGAÇÕES

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Correção drag-and-drop quebra algo | 30% | Alto | Testar intensivamente em staging |
| TypeScript errors bloqueiam build | 40% | Alto | Resolver errors antes de features |
| Seed data deletada acidentalmente | 20% | Médio | Backup antes de migration |
| Novos bugs descobertos no review | 60% | Médio | Criar Tier 4 e priorizar após |

---

## 📝 DEPENDÊNCIAS ENTRE TAREFAS

```
Drag-and-drop Fix
    ↓
Filtros Fix
    ↓
Botão Modal Fix
    ↓
Build Staging ← (bloqueador: TypeScript errors)
    ↓
Validação QA
    ↓
Deploy Produção
    ↓
(Paralelo) → Remover Placeholders
    ↓
(Paralelo) → Limpar Seed Data
    ↓
Review Completo + Checklist
```

---

## 🎓 LIÇÕES APRENDIDAS (Preventivo)

### Por que isso aconteceu?
1. ❌ **Análise disse "100% pronto"** sem testar REAL em deploy
2. ❌ **Validação manual insuficiente** (não seguiu checklist)
3. ❌ **Seed data não foi limpo** antes de produção
4. ❌ **TypeScript errors ignorados** (40+ warnings)

### Como evitar?
1. ✅ **SEMPRE testar em staging** antes de afirmar "pronto"
2. ✅ **Checklist pré-deploy obrigatório** (criar documento)
3. ✅ **Migration de limpeza automática** (seed data → produção)
4. ✅ **TypeScript strict mode** (zero tolerance para errors)

---

## 🚀 COMANDO DE INÍCIO

**Para iniciar Fase 1 AGORA**:
```
*agent developer
Fix drag-and-drop no Funil Kanban conforme especificado no plano
```

**Ou escolha**:
1. Iniciar Fase 1 (correções críticas) - **RECOMENDADO**
2. Revisar plano antes de executar
3. Criar backups antes de começar
4. Outro

---

**Criado por**: BMad Orchestrator
**Coordenação**: Multi-agente (Developer 70%, Architect 20%, QA 10%)
**Método**: 80/20 - Foco em impacto máximo com esforço mínimo
**Status**: ⏳ Aguardando aprovação para início
