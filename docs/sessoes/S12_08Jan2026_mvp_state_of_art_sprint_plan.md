# Sessão S12 - MVP State of Art Sprint - Plano Executável

**Data**: 8 de Janeiro de 2026
**Participantes**: Product Manager (John), Tech Lead, Dev Team
**Duração Planejada**: 6-7 dias úteis (13-17 Janeiro + buffer)
**Objetivo**: Eliminar 100% dos gaps P0 e tornar sistema production-ready

---

## 📊 CONTEXTO

### Status Atual
- **Sistema**: 85% features core funcionais
- **Mobile Fase 1**: ✅ 100% completa (5 telas principais)
- **Componentes**: 14 páginas, 89 componentes
- **Protocol Notecraft™**: ✅ 100% compliance
- **Gaps Críticos**: 7 gaps P0 bloqueiam produção

### Problema
- 3 tabs com placeholders "em desenvolvimento" (50% quebradas)
- Barra filtros incompleta (gestor não filtra por vendedor)
- UX inferior ao RD Station benchmark
- Sistema não pode ser usado por 4-10 vendedores

### Solução Aprovada
Sprint focado de 6-7 dias para implementar TODOS os 7 gaps P0.

---

## 🎯 OBJETIVOS DO SPRINT

### Objetivo Principal
Tornar STAGETEK CRM **100% utilizável em produção** com paridade funcional ao RD Station.

### Métricas de Sucesso

| Métrica | Antes | Meta Sprint |
|---------|-------|-------------|
| Tabs funcionais | 3/6 (50%) | 6/6 (100%) |
| Filtros disponíveis | 1/6 (17%) | 6/6 (100%) |
| Placeholders visíveis | 3 | 0 |
| Features core funcionais | 85% | 100% |
| User satisfaction (est.) | 6/10 | 9/10 |

### Definition of Done (Sprint)

#### Features (100% Funcionais)
- [ ] 6/6 tabs funcionais em DetalheOportunidade (zero placeholders)
- [ ] 6/6 filtros implementados na FilterBar
- [ ] Quick actions visíveis nos OpportunityCards
- [ ] Botões ClientCard visíveis (outline, não ghost)
- [ ] Layout Detalhe match screenshot RD Station

#### Dados & Backend
- [ ] 2 novas tabelas criadas (`emails_sent`, `opportunity_products`)
- [ ] Bucket `attachments` configurado (Supabase Storage)
- [ ] RLS policies completas (SELECT/INSERT/UPDATE/DELETE)
- [ ] Zustand store criado e funcional

#### Qualidade & Compliance
- [ ] Protocol Notecraft™ 100% compliance
- [ ] Zero erros TypeScript (warnings ≤50)
- [ ] Lighthouse score ≥85 (mobile)
- [ ] Zero placeholders visíveis

#### Testing
- [ ] Fluxo end-to-end testado
- [ ] 7 gaps P0 validados (AC passed)
- [ ] Mobile Fase 1 retestado (regressão)

#### Deploy
- [ ] Deploy Vercel preview
- [ ] Tag `v2.1.0-mvp-soa`
- [ ] CHANGELOG.md atualizado
- [ ] README atualizado

---

## 📅 DAILY BREAKDOWN - 6 DIAS

### **DIA 1 (Segunda 13/Jan) - Tabs Foundation**
**Tema**: Completar infraestrutura tabs críticas
**Objetivo**: 2 tabs 100% funcionais (Email + Produtos)
**Effort**: 8 horas

#### Morning (4h) - Story 1.1: Tab Email
**Tasks**:
1. [1h] Criar `EmailComposer` organism (≤50 linhas)
2. [1.5h] Integrar Resend API (reutilizar Edge Function cotações)
3. [1h] Criar tabela `emails_sent` (migration + RLS)
4. [0.5h] Integrar Timeline (evento "email_sent")

**AC**:
- [ ] Tab Email não mostra placeholder
- [ ] Email enviado com sucesso
- [ ] Evento aparece Timeline

#### Afternoon (4h) - Story 1.2: Tab Produtos
**Tasks**:
1. [1h] Criar tabela `opportunity_products` (many-to-many)
2. [2h] Criar `ProductLink` organism (≤50 linhas)
3. [0.5h] Hook `useProductLink`
4. [0.5h] Integrar Tab Produtos

**AC**:
- [ ] Tab Produtos não mostra placeholder
- [ ] Adicionar/remover produto funciona
- [ ] Quantidade editável

**Output Dia 1**: ✅ 2 tabs funcionais (Email, Produtos)

---

### **DIA 2 (Terça 14/Jan) - Tab Arquivos + UX Fixes**
**Tema**: Última tab + melhorias UX rápidas
**Objetivo**: 1 tab + 2 fixes UX
**Effort**: 8 horas

#### Morning (4h) - Story 1.3: Tab Arquivos
**Tasks**:
1. [1h] Configurar Storage bucket `attachments`
2. [2h] Criar `FileManager` organism (≤50 linhas)
3. [0.5h] Hook `useFileManager`
4. [0.5h] Integrar Tab Arquivos

**AC**:
- [ ] Upload funciona (drag-drop ou botão)
- [ ] Download gera signed URL
- [ ] Delete remove do storage
- [ ] Validação 10MB + tipos

#### Afternoon (4h) - UX Quick Wins
**Story 1.4**: Fix Botões ClientCard (2h)
- [ ] Trocar ghost → outline variant
- [ ] Aumentar contrast border
- [ ] Touch targets ≥44px

**Story 1.5**: Ícones Ação Cards (2h)
- [ ] Adicionar 3 ícones (📞✉️📝)
- [ ] Implementar handlers
- [ ] Tooltips

**Output Dia 2**: ✅ 3 tabs 100% (6/6 total) + 2 UX fixes

---

### **DIA 3 (Quarta 15/Jan) - Barra Filtros Parte 1**
**Tema**: Infraestrutura filtros
**Objetivo**: FilterBar + 4 dropdowns
**Effort**: 8 horas

#### Story 2.1: FilterBar Foundation (Full Day)
**Tasks**:
1. [2h] Criar Zustand store `useFilterStore`
2. [3h] Criar `FilterBar` organism (≤50 linhas, 4 dropdowns)
3. [2h] Integrar `Funil.tsx`
4. [1h] Styling (desktop + mobile)

**AC**:
- [ ] 4 dropdowns funcionais
- [ ] Filtros aplicam (query refetch)
- [ ] URL sync (bookmarkable)
- [ ] "Visão" disabled com tooltip

**Output Dia 3**: ✅ FilterBar + 4 filtros ativos

---

### **DIA 4 (Quinta 16/Jan) - Barra Filtros Parte 2 + Layout**
**Tema**: Finalizar filtros + ajustar layout Detalhe
**Objetivo**: Refresh + badge + layout match RD
**Effort**: 8 horas

#### Morning (4h) - Finalizar FilterBar
**Story 2.2**: Refresh + Badge (2h)
- [ ] Botão recarregar (⟳)
- [ ] Badge filtros ativos (⊞ N)

**Story 2.3**: Testes Filtros (2h)
- [ ] Testar combinações
- [ ] Validar performance
- [ ] Fix bugs

#### Afternoon (4h) - Story 2.4: Layout Detalhe
**Tasks**:
1. [2h] Ajustar `DetalheOportunidade.tsx`
   - Banner verde contextual (oportunidade nova)
   - Ajustar sidebars match RD
2. [1h] Form "Criar Anotação" em destaque
3. [1h] Comparar screenshot RD

**AC**:
- [ ] Banner aparece se opp < 24h
- [ ] Sidebars organizadas como RD
- [ ] Form anotação visível

**Output Dia 4**: ✅ FilterBar 100% + Layout Detalhe match RD

---

### **DIA 5 (Sexta 17/Jan) - QA & Polish**
**Tema**: Testing + fixes + deploy prep
**Objetivo**: Zero bugs críticos, production-ready
**Effort**: 8 horas

#### Morning (4h) - QA Manual Completo
**Tasks**:
1. [2h] Testar fluxo end-to-end (cenário vendedor)
2. [1h] Validar 7 gaps AC (checklist)
3. [1h] Testar mobile Fase 1 (regressão)

#### Afternoon (4h) - Fixes + Deploy Prep
**Tasks**:
1. [2h] Fix bugs encontrados (P0 priority)
2. [1h] Polish final
   - Lint warnings <50
   - Protocol Notecraft™ validation
   - Lighthouse ≥85
3. [0.5h] Atualizar docs (README, CHANGELOG)
4. [0.5h] Deploy prep (tag, Vercel preview)

**Output Dia 5**: ✅ Sistema 100% testado, bugs fixados, ready deploy

---

### **DIA 6-7 (Sáb/Dom - BUFFER)**
**Uso**: Apenas se necessário (bugs críticos, refatorações)

**Cenários**:
- Epic 1 atrasou
- Bugs P0 encontrados QA
- RLS policies travaram

**Se não usado**: Avançar Fase 2 Mobile ou Dashboard

---

## 📋 STORIES EXECUTÁVEIS (9 STORIES)

### Epic 1: Tabs Detalhe Oportunidade
- ✅ Story 1.1: Tab Email (Dia 1 AM)
- ✅ Story 1.2: Tab Produtos (Dia 1 PM)
- ✅ Story 1.3: Tab Arquivos (Dia 2 AM)
- ✅ Story 1.4: Fix Botões ClientCard (Dia 2 PM)
- ✅ Story 1.5: Ícones Ação Cards (Dia 2 PM)

### Epic 2: Barra Filtros Completa
- ✅ Story 2.1: FilterBar Foundation (Dia 3)
- ✅ Story 2.2: Refresh + Badge (Dia 4 AM)
- ✅ Story 2.3: Testes Filtros (Dia 4 AM)
- ✅ Story 2.4: Layout Detalhe (Dia 4 PM)

**Referências Detalhadas**:
- Epic 1: `docs/prd/epic-1-tabs-detalhe-oportunidade.md`
- Epic 2: `docs/prd/epic-2-barra-filtros-completa.md`

---

## ⚠️ RISCOS & MITIGAÇÕES

### 🔴 RISCO 1: RLS Policies Bloqueando INSERT/UPDATE
**Probabilidade**: 60% | **Impacto**: Alto

**Mitigação**:
- Testar RLS Dia 1 (criar migration com policies)
- Log erros Supabase durante testes
- **Contingência**: Desabilitar RLS temp para MVP
- **Owner**: Tech Lead

---

### 🟡 RISCO 2: Storage Quota (2GB Free)
**Probabilidade**: 30% | **Impacto**: Médio

**Mitigação**:
- Limit 10MB/arquivo + validação frontend
- Alerta quando >1.5GB (75%)
- **Contingência**: Cloudflare R2 ou Supabase Pro
- **Owner**: PM (decisão)

---

### 🟡 RISCO 3: Email Deliverability (Resend)
**Probabilidade**: 20% | **Impacto**: Médio

**Mitigação**:
- Reutilizar Edge Function testada (cotações)
- Monitor taxa envio
- **Contingência**: Botão "Copiar e enviar manual"
- **Owner**: Dev Team

---

### 🟢 RISCO 4: Complexidade Zustand Store
**Probabilidade**: 40% | **Impacto**: Baixo

**Mitigação**:
- Template Zustand simples (≤30 linhas)
- Code review fim Dia 3
- **Contingência**: React Context API
- **Owner**: Tech Lead

---

### 🟢 RISCO 5: Bugs Descobertos Dia 5
**Probabilidade**: 70% | **Impacto**: Médio

**Mitigação**:
- QA contínuo (testar fim cada dia)
- Daily standup (identificar atrasos cedo)
- **Contingência**: Usar buffer Dia 6-7
- **Owner**: PM

---

## 📊 DELIVERABLES (Saídas Sprint)

### Código
- [ ] 9 stories implementadas
- [ ] 2 migrations SQL
- [ ] 1 Zustand store
- [ ] 3 organisms novos
- [ ] 1 organism refatorado

### Documentação
- [ ] CHANGELOG.md v2.1.0
- [ ] README.md atualizado
- [ ] Session summary (este arquivo)

### Deploy
- [ ] Branch `main` atualizada
- [ ] Tag `v2.1.0-mvp-soa`
- [ ] Vercel preview testado
- [ ] Produção deploy (se QA OK)

---

## 🎬 PÓS-SPRINT

### Imediato (Semana seguinte)
- [ ] Onboarding 2-3 vendedores beta (trial 2 semanas)
- [ ] Setup analytics (PostHog/Mixpanel)
- [ ] Monitor Resend API
- [ ] Monitor Supabase Storage

### Curto Prazo (2-4 semanas)
- [ ] **Sprint 2: Omie Integration** (20-31 Jan)
  - Fase 1+2: Sync automático (10 dias)
- [ ] Coletar feedback beta users

### Médio Prazo (1-2 meses)
- [ ] Implementar P1 gaps (Dashboard dados reais)
- [ ] Fase 2 Mobile (Cotações mobile)
- [ ] Relatórios & Analytics

---

## 📞 COMUNICAÇÃO

### Daily Standup
- **Quando**: 9h AM (15min)
- **Quem**: Dev Team + PM + QA
- **Formato**: Ontem/Hoje/Blockers

### Sprint Review
- **Quando**: Sexta 16h (1h)
- **Quem**: Dev Team + PM + Stakeholders
- **Formato**: Demo ao vivo

### Retrospectiva
- **Quando**: Sexta 17h (30min)
- **Quem**: Dev Team + PM
- **Formato**: Start/Stop/Continue

---

## 🎯 DECISÕES APROVADAS

### Decisão 1: Omie Integration
**Decisão**: Implementar em **Sprint 2** (Post-MVP)
**Justificativa**: Gaps P0 bloqueiam UX, Omie é otimização
**Timeline**: 20-31 Janeiro 2026

### Decisão 2: Scope Sprint
**Decisão**: Apenas 7 gaps P0, sem scope creep
**Justificativa**: Foco em MVP usável primeiro
**Bloqueado**: Dashboard dados reais (vai para P1)

---

## 📚 REFERÊNCIAS

### Documentos BMAD
- `docs/prd/epic-1-tabs-detalhe-oportunidade.md`
- `docs/prd/epic-2-barra-filtros-completa.md`
- `docs/prd/epic-3-ux-polish-cards.md`
- `.ai/relatorios-avaliacao-critica.md` (7 gaps P0 originais)

### Sessões Anteriores
- `docs/sessoes/S10_12Dez2025_mobile_fase1_grupo_a_impl.md`
- `docs/sessoes/S11_08Jan2026_mobile_fase1_complete.md` (fictício)

### Architecture
- `docs/architecture/database-schema.md`
- `docs/architecture/tech-stack.md`
- `docs/architecture/coding-standards.md`

---

## ✅ CHECKLIST DIÁRIO

### Template Standup (9h AM)
```markdown
## Day X - [Tema do Dia]

### Ontem Completamos:
- [ ] Task 1
- [ ] Task 2

### Hoje Faremos:
- [ ] Task 1 (Owner: Dev A, 2h)
- [ ] Task 2 (Owner: Dev B, 3h)

### Blockers:
- Nenhum / [Descrever]

### Riscos Identificados:
- Nenhum / [Novo risco]

### Decisões Necessárias:
- Nenhuma / [Decisão PM/PO]
```

---

## 🏁 SUMÁRIO EXECUTIVO - TL;DR

**6 dias para transformar STAGETEK de 85% → 100% funcional:**

- **Dia 1**: Tabs Email + Produtos
- **Dia 2**: Tab Arquivos + UX fixes
- **Dia 3**: FilterBar foundation
- **Dia 4**: FilterBar complete + Layout
- **Dia 5**: QA + Polish + Deploy
- **Dia 6-7**: Buffer (contingência)

**Output**: Zero placeholders, paridade RD Station, ready 10 vendedores.

**Next Sprint**: Omie Integration (20-31 Jan)

---

**Plano criado por**: John (Product Manager)
**Aprovado por**: Stakeholders
**Data aprovação**: 8 Janeiro 2026
**Status**: ✅ Ready for Execution
**Kickoff**: Segunda 13 Janeiro 2026, 9h AM

---

**🚀 LET'S BUILD! 🚀**
