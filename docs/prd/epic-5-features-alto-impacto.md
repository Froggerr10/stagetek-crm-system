# EPIC-5: Features de Alto Impacto (P1)

**Prioridade**: P1 (Alta)
**Sprint**: Sprint 1
**Duração estimada**: 8 dias
**Status**: 🟡 Planejado

---

## 📊 Contexto e Justificativa

Após a conclusão do Sprint 0 (Security & Performance), este épico agrupa as **3 features de maior RICE score** identificadas no roadmap:

| Feature | RICE Score | Impacto | Esforço |
|---------|------------|---------|---------|
| Lista Cotações Salvas | **33.3** | 10/10 | 3 dias |
| Funil Kanban React | **20.0** | 10/10 | 2 dias |
| Busca Global | **13.3** | 8/10 | 3 dias |

**Total**: RICE médio = **22.2** (10x maior que Config Funis = 3.2)

### Por que priorizar essas features?

**Lista Cotações** (RICE 33.3):
- **Problema**: Hoje o sistema gera PDF mas não salva histórico navegável
- **Impacto**: Vendedores perdem tempo procurando cotações antigas em pastas
- **ROI**: 1h/dia economizada por vendedor = 5h/dia total (25h/semana)

**Funil Kanban** (RICE 20.0):
- **Problema**: Hoje existe apenas HTML standalone (não conectado ao React)
- **Impacto**: Navegação quebrada, sem atualização real-time, sem drag-and-drop mobile
- **ROI**: Elimina navegação entre 2 sistemas (HTML + React)

**Busca Global** (RICE 13.3):
- **Problema**: Usuário precisa navegar entre 3 páginas para encontrar informação
- **Impacto**: Perda de contexto, fricção na navegação
- **ROI**: 20 buscas/dia × 30s economizados = 10min/dia por usuário

---

## 🎯 Objetivos do Épico

### Objetivo 1: Gestão Completa de Cotações
**Meta**: 100% das cotações acessíveis e gerenciáveis após criação

**Key Results**:
- [x] Cotação MVP funcional (Sprint 1 Day 1 - COMPLETO)
- [ ] Lista de cotações com filtros avançados
- [ ] Visualizar/reenviar/editar cotações salvas
- [ ] Histórico visível no detalhes da oportunidade

### Objetivo 2: Navegação Unificada
**Meta**: Zero HTML standalone, 100% React integrado

**Key Results**:
- [ ] Funil Kanban migrado para React
- [ ] Drag-and-drop mobile-friendly (dnd-kit)
- [ ] Real-time updates (Zustand + Supabase)
- [ ] Navegação Dashboard → Funil → Detalhes funcional

### Objetivo 3: Produtividade com Busca
**Meta**: Encontrar qualquer entidade em <5 segundos

**Key Results**:
- [ ] SearchBar global no TopBar
- [ ] Busca em clientes, oportunidades, cotações
- [ ] Shortcut Ctrl+K (padrão moderno)
- [ ] Resultados com highlight e navegação direta

---

## 📋 Stories do Épico

### Story 5.1: Lista Cotações Salvas
**RICE**: 33.3 | **Esforço**: 3 dias | **Arquivo**: `5.1.lista-cotacoes-salvas.md`

**User Story**:
```
As a: Vendedor STAGETEK
I want to: Ver lista de todas as cotações criadas (filtrar, visualizar, reenviar)
So that: Eu encontre cotações antigas rapidamente e reaproveite propostas
```

**Componentes**:
- Página `/cotacoes` (listagem completa)
- FilterBar (status, data, cliente, oportunidade)
- QuotationCard (card com preview)
- Actions: Visualizar PDF, Reenviar Email, Editar (se draft)

**Acceptance Criteria**:
- [ ] Lista todas as cotações do banco com paginação
- [ ] Filtros funcionam (status: draft/sent, data, cliente)
- [ ] Download PDF salvo do Storage
- [ ] Reenviar email com novo destinatário
- [ ] Link para oportunidade relacionada

---

### Story 5.2: Funil Kanban React
**RICE**: 20.0 | **Esforço**: 2 dias | **Arquivo**: `5.2.funil-kanban-react.md`

**User Story**:
```
As a: Gerente Comercial STAGETEK
I want to: Visualizar pipeline em Kanban com drag-and-drop mobile
So that: Eu atualize estágios rapidamente e veja totalizadores por coluna
```

**Componentes**:
- Página `/funil` (React, não HTML)
- KanbanBoard organism (5 colunas)
- OpportunityCard molecule (arrastável)
- ColumnHeader com totalizadores (R$ + count)
- Integração dnd-kit (mobile-friendly)

**Acceptance Criteria**:
- [ ] Migração completa HTML → React (deletar pages/funil-vendas.html)
- [ ] Drag-and-drop funciona (desktop + mobile)
- [ ] Atualiza status no Supabase
- [ ] Real-time updates (Zustand subscriptions)
- [ ] Totalizadores R$ corretos por coluna

---

### Story 5.3: Busca Global
**RICE**: 13.3 | **Esforço**: 3 dias | **Arquivo**: `5.3.busca-global.md`

**User Story**:
```
As a: Usuário STAGETEK (qualquer perfil)
I want to: Buscar qualquer entidade (cliente, oportunidade, cotação) de qualquer página
So that: Eu navegue rapidamente sem perder contexto
```

**Componentes**:
- SearchBar global (TopBar, sempre visível)
- SearchModal (Ctrl+K, full-screen mobile)
- SearchResults molecule (agrupado por tipo)
- useGlobalSearch hook (Supabase full-text search)

**Acceptance Criteria**:
- [ ] SearchBar no TopBar (desktop)
- [ ] Shortcut Ctrl+K abre modal
- [ ] Busca em 3 entidades: clients, opportunities, quotations
- [ ] Resultados com highlight (match text)
- [ ] Click → navega para detalhes
- [ ] Debounce 300ms (evitar queries excessivas)

---

## 🗓️ Timeline Sprint 1

```
Sprint 1 (8 dias úteis - 29 Out a 8 Nov):
├─ Dia 1-3: Story 5.1 - Lista Cotações (3 dias)
│   ├─ Dia 1: Página /cotacoes + FilterBar
│   ├─ Dia 2: QuotationCard + actions (download, reenviar)
│   └─ Dia 3: Integração Storage + Resend API
│
├─ Dia 4-5: Story 5.2 - Funil Kanban React (2 dias)
│   ├─ Dia 4: KanbanBoard + dnd-kit setup
│   └─ Dia 5: Real-time updates + totalizadores
│
└─ Dia 6-8: Story 5.3 - Busca Global (3 dias)
    ├─ Dia 6: SearchBar + SearchModal UI
    ├─ Dia 7: useGlobalSearch hook + full-text search
    └─ Dia 8: Refinamentos UX (highlight, keyboard nav)
```

**Buffer**: Zero (features independentes, baixo risco)
**Bloqueadores**: Nenhum (Sprint 0 completo)

---

## 📊 Métricas de Sucesso

### Métricas de Produto
- **Lista Cotações**: 80% das cotações acessadas via lista (vs 0% hoje)
- **Funil Kanban**: 100% das mudanças de estágio via drag-and-drop
- **Busca Global**: 50+ buscas/dia (5 usuários × 10 buscas/dia)

### Métricas de Qualidade
- **Protocol Notecraft™**: 100% compliance (limites de linhas)
- **TypeScript**: Zero `any` (strict mode)
- **Mobile**: Lighthouse Score >85
- **Performance**: <100ms para busca, <200ms para Kanban load

### Métricas de Negócio
- **Tempo médio cotação → venda**: Reduzir de 7 dias para 5 dias
- **Taxa de reaproveitamento de cotações**: 30% (reaproveitar propostas antigas)
- **NPS vendedores**: ≥ 8/10 (após Sprint 1)

---

## 🔗 Dependências

### Depende de (Bloqueadores):
- ✅ Sprint 0: Security & Performance (COMPLETO - 29 Out)
- ✅ Cotação MVP (COMPLETO - Sprint 1 Day 1)
- ✅ Database schema: quotations table (EXISTS)
- ✅ Supabase Storage: pdfs bucket (EXISTS)

### Habilita (Próximos Sprints):
- Sprint 2: Detalhes Oportunidade (precisa de Funil Kanban React)
- Sprint 3: Relatórios (precisa de dados históricos de cotações)
- Sprint 4: Importação Excel (precisa de busca global para deduplicação)

---

## ⚠️ Riscos e Mitigações

### Risco 1: Supabase Storage Limits (2GB free)
**Probabilidade**: Média
**Impacto**: Alto (bloquearia novos PDFs)
**Mitigação**:
- Compressão de PDFs (50% redução)
- Cold storage para PDFs >90 dias (S3 compatível)
- Monitoramento usage (criar alerta 80%)

### Risco 2: Full-Text Search Performance
**Probabilidade**: Baixa
**Impacto**: Médio (busca lenta)
**Mitigação**:
- Usar GIN indexes (já planejado)
- Limitar resultados a 50 por tipo
- Debounce 300ms (reduzir queries)

### Risco 3: Drag-and-Drop Mobile UX
**Probabilidade**: Média
**Impacto**: Médio (frustração usuários)
**Mitigação**:
- Usar dnd-kit (mobile-first library)
- Fallback: botão "Mover para estágio" se drag falhar
- Teste em dispositivos reais (iPad, Android)

---

## 📚 Referências

### Documentação do Projeto
- `.ai/relatorios-avaliacao-critica.md` - Gap analysis Sprint MVP
- `docs/architecture/database-schema.md` - Schema quotations
- `docs/stories/5.1.lista-cotacoes-salvas.md` - Story completa
- `docs/stories/5.2.funil-kanban-react.md` - Story completa
- `docs/stories/5.3.busca-global.md` - Story completa

### Benchmarks UX
- RD Station CRM (referência Kanban + busca)
- Linear (referência Ctrl+K search)
- Notion (referência busca rápida)

### Tech Stack
- dnd-kit: https://docs.dndkit.com/
- Supabase Storage: https://supabase.com/docs/guides/storage
- PostgreSQL Full-Text Search: https://www.postgresql.org/docs/current/textsearch.html

---

**Última atualização**: 29 de Outubro de 2025 - Sprint 0 completo, Sprint 1 pronto para iniciar
