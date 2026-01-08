# Sprint: MVP State of Art

**Sprint ID**: MVP-SOA-SPRINT-01
**Duração**: 6-7 dias úteis (13-17 Janeiro 2026 + buffer)
**Owner**: Product Manager (John)
**Status**: ✅ Approved - Ready for Execution

---

## 🎯 OBJETIVO

Eliminar **100% dos gaps P0** (7 gaps críticos) para tornar STAGETEK CRM completamente utilizável em produção com paridade ao RD Station.

**Resultado**: Sistema passa de **85% funcional → 100% funcional**

---

## 📊 GAPS P0 (7 CRÍTICOS)

| ID | Gap | Estimativa | Dia |
|----|-----|------------|-----|
| **G-001** | Barra Filtros Completa (6 controles) | 2 dias | Dia 3-4 |
| **G-002** | Tab Email em DetalheOportunidade | 1 dia | Dia 1 AM |
| **G-003** | Tab Produtos em DetalheOportunidade | 1 dia | Dia 1 PM |
| **G-004** | Tab Arquivos em DetalheOportunidade | 1 dia | Dia 2 AM |
| **G-005** | Ícones de ação nos OpportunityCards | 4h | Dia 2 PM |
| **G-006** | Botões ClientCard visíveis | 2h | Dia 2 PM |
| **G-007** | Layout Detalhe match RD | 1 dia | Dia 4 PM |

**Total**: 6-7 dias

---

## 📅 CRONOGRAMA

### **Dia 1 (Seg 13/Jan)**: Tabs Email + Produtos
- ✅ Story 1.1: Tab Email (4h)
- ✅ Story 1.2: Tab Produtos (4h)

### **Dia 2 (Ter 14/Jan)**: Tab Arquivos + UX Fixes
- ✅ Story 1.3: Tab Arquivos (4h)
- ✅ Story 1.4: Fix Botões ClientCard (2h)
- ✅ Story 1.5: Ícones Ação Cards (2h)

### **Dia 3 (Qua 15/Jan)**: FilterBar Foundation
- ✅ Story 2.1: FilterBar + 4 dropdowns (8h)

### **Dia 4 (Qui 16/Jan)**: FilterBar Complete + Layout
- ✅ Story 2.2: Refresh + Badge (2h)
- ✅ Story 2.3: Testes Filtros (2h)
- ✅ Story 2.4: Layout Detalhe match RD (4h)

### **Dia 5 (Sex 17/Jan)**: QA & Deploy
- ✅ QA Manual Completo (4h)
- ✅ Fixes + Polish + Deploy Prep (4h)

### **Dia 6-7 (Sáb/Dom)**: Buffer (opcional)

---

## 📋 EPICS & STORIES

### **Epic 1: Tabs Detalhe Oportunidade** (3 dias)
- Story 1.1: Tab Email
- Story 1.2: Tab Produtos
- Story 1.3: Tab Arquivos
- Story 1.4: Fix Botões ClientCard
- Story 1.5: Ícones Ação Cards

**Referência**: `docs/prd/epic-1-tabs-detalhe-oportunidade.md`

---

### **Epic 2: Barra Filtros Completa** (2 dias)
- Story 2.1: FilterBar Foundation
- Story 2.2: Refresh + Badge
- Story 2.3: Testes Filtros
- Story 2.4: Layout Detalhe

**Referência**: `docs/prd/epic-2-barra-filtros-completa.md`

---

## ✅ DEFINITION OF DONE

### Features
- [ ] 6/6 tabs funcionais (zero placeholders)
- [ ] 6/6 filtros implementados
- [ ] Quick actions visíveis
- [ ] Botões ClientCard visíveis
- [ ] Layout match RD Station

### Backend
- [ ] 2 tabelas criadas (`emails_sent`, `opportunity_products`)
- [ ] Bucket `attachments` configurado
- [ ] RLS policies completas
- [ ] Zustand store funcional

### Qualidade
- [ ] Protocol Notecraft™ 100%
- [ ] TypeScript errors = 0
- [ ] Lighthouse mobile ≥85
- [ ] Warnings ≤50

### Deploy
- [ ] Tag `v2.1.0-mvp-soa`
- [ ] Vercel preview testado
- [ ] CHANGELOG atualizado

---

## ⚠️ RISCOS (TOP 3)

| Risco | Prob | Impacto | Mitigação |
|-------|------|---------|-----------|
| RLS Policies bloqueando | 60% | Alto | Testar Dia 1, contingência: disable temp |
| Storage quota (2GB) | 30% | Médio | Limit 10MB, alerta 75% |
| Bugs descobertos Dia 5 | 70% | Médio | QA contínuo, buffer Dia 6-7 |

---

## 📊 MÉTRICAS DE SUCESSO

| Métrica | Antes | Meta |
|---------|-------|------|
| Tabs funcionais | 3/6 (50%) | 6/6 (100%) |
| Filtros | 1/6 (17%) | 6/6 (100%) |
| Placeholders | 3 | 0 |
| Features core | 85% | 100% |
| User satisfaction | 6/10 | 9/10 |

---

## 🚀 PÓS-SPRINT

### Sprint Review (Sex 17/Jan 16h)
- Demo ao vivo (fluxo vendedor)
- Stakeholders: CEO, Sales Manager

### Próximos Passos
1. **Sprint 2** (20-31 Jan): Omie Integration
   - Validação comercial durante Sprint 1
   - Fase 1+2: Sync automático (10 dias)

2. **Backlog P1**:
   - Dashboard dados reais
   - Fase 2 Mobile (Cotações)
   - Relatórios & Analytics

---

## 📚 REFERÊNCIAS

- **Plano Detalhado**: `docs/sessoes/S12_08Jan2026_mvp_state_of_art_sprint_plan.md`
- **Gaps P0**: `.ai/relatorios-avaliacao-critica.md`
- **Epic 1**: `docs/prd/epic-1-tabs-detalhe-oportunidade.md`
- **Epic 2**: `docs/prd/epic-2-barra-filtros-completa.md`
- **Decisão Omie**: `docs/prd/epic-6-integracao-omie-erp.md` (Sprint 2)

---

**Status**: ✅ Approved
**Kickoff**: Segunda 13/Jan/2026 9h
**Owner**: John (PM)
**Created**: 8/Jan/2026
