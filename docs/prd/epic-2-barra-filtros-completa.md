# Epic 2: Barra de Filtros Completa no Funil Kanban

**Epic ID**: EPIC-002
**Status**: ⏳ Not Started
**Priority**: 🔴 P0 - Critical
**RICE Score**: 20.0 (Reach: 5 | Impact: 2.0 | Confidence: 100% | Effort: 5 days)

---

## 📊 Sumário Executivo

### Contexto
A página `Funil.tsx` tem Kanban drag-and-drop funcional, mas **falta a barra de filtros horizontal** vista no RD Station. Atualmente existe apenas 1 filtro (Status), quando deveriam existir **6 controles** críticos.

### Referência Visual
Baseado em `public/Funil_RD 3.png`:
```
┌─────────────────────────────────────────────────────────────┐
│ [Funil ▼] [Visão ▼] [Responsável ▼] [Status ▼] [⟳] [⊞]     │
└─────────────────────────────────────────────────────────────┘
```

### Impacto no MVP State of Art
- **Gap crítico**: Usuário não consegue filtrar oportunidades por responsável
- **Feature missing**: Impossível trocar entre múltiplos funis (multi-pipeline)
- **UX inferior ao RD**: RD tem 6 controles, STAGETEK tem 1

---

## 🎯 Objetivos de Negócio

### Problema
Gestor comercial **não consegue**:
1. Ver oportunidades de outro vendedor (filtro "Responsável" faltando)
2. Trocar entre funis diferentes (ex: "Funil Prospecção Ativa" vs "Funil Carteira")
3. Ver se há filtros ativos (badge contador faltando)
4. Recarregar dados manualmente (botão refresh faltando)
5. Alternar entre visões (Kanban/Lista/Timeline não implementadas)

### Solução
Implementar FilterBar organism (≤50 linhas) com 6 controles:
1. **Dropdown Funil** - Selecionar pipeline ativo
2. **Dropdown Visão** - Kanban/Lista/Timeline (Kanban only em MVP)
3. **Dropdown Responsável** - Filtrar por vendedor
4. **Dropdown Status** - Abertas/Ganhas/Perdidas (melhorar existente)
5. **Botão Recarregar** - Refresh manual
6. **Badge Filtros Ativos** - Contador visual

### Métricas de Sucesso
- Gestor consegue ver oportunidades de qualquer vendedor em <2 cliques
- Trocar entre funis em <1 clique
- Badge mostra quantos filtros estão ativos (ex: "3 filtros")

---

## 📋 User Stories (1 story principal)

### Story 2.1: FilterBar Completa com 6 Controles
**Gap ID**: G-001
**Status**: ⏳ Não implementado
**Estimativa**: 2 dias
**Priority**: 🔴 P0

**User Story**:
> Como gestor comercial, quero filtrar oportunidades por funil/responsável/status, para ter visão completa do pipeline da equipe.

**Acceptance Criteria**:
1. FilterBar organism criado (≤50 linhas)
2. 6 controles implementados:
   - Dropdown "Funil de vendas" (query `funnels` table)
   - Dropdown "Visão de trabalho" (disabled em MVP, só Kanban)
   - Dropdown "Responsável" (query `auth.users`)
   - Dropdown "Status" (substituir select simples existente)
   - Botão "⟳ Recarregar" (refresh query)
   - Badge "⊞ N filtros" (contador dinâmico)
3. Filtros aplicam em tempo real (React Query invalidation)
4. URL reflete filtros ativos (ex: `/funil?responsavel=user123&status=open`)
5. Badge mostra "3 filtros" quando 3 dropdowns não-default

**Technical Design**:
```tsx
// FilterBar.tsx (organism, ≤50 lines)
interface FilterBarProps {
  selectedFunnelId: string | null
  selectedUserId: string | null
  selectedStatus: 'open' | 'all' | 'won' | 'lost'
  onFilterChange: (filters: Filters) => void
}

// State management: Zustand store
interface FunnelFilters {
  funnelId: string | null
  userId: string | null
  status: 'open' | 'all' | 'won' | 'lost'
  activeFilterCount: number
}
```

**Dependencies**:
- Zustand store para state management (não existe, criar)
- Query `auth.users` para dropdown Responsável
- URL search params com React Router

---

## 🗄️ Dados & Estrutura

### Queries Necessárias

#### 1. Buscar Funis Ativos
```typescript
const { data: funnels } = useQuery({
  queryKey: ['funnels', 'active'],
  queryFn: async () => {
    const { data } = await supabase
      .from('funnels')
      .select('id, name')
      .eq('is_active', true)
      .order('is_default', { ascending: false })
    return data
  }
})
```

#### 2. Buscar Usuários (Responsáveis)
```typescript
const { data: users } = useQuery({
  queryKey: ['users'],
  queryFn: async () => {
    const { data } = await supabase
      .from('auth.users')
      .select('id, email, raw_user_meta_data')
    return data
  }
})
```

#### 3. Aplicar Filtros em Oportunidades
```typescript
let query = supabase.from('opportunities').select('*, client:clients(*), stage:funnel_stages(*)')

if (funnelId) query = query.eq('funnel_id', funnelId)
if (userId) query = query.eq('assigned_to', userId)
if (status !== 'all') query = query.eq('status', status)

const { data } = await query
```

---

## 🎨 UI/UX Design

### Layout (Baseado em Funil_RD 3.png)
```
┌─────────────────────────────────────────────────────────────┐
│ Oportunidades                                       [+ Nova] │
├─────────────────────────────────────────────────────────────┤
│ Funil de vendas    Visão de trabalho   Responsável   Status │
│ [Funil PADRÃO ▼]   [Funil de vendas▼]  [Minhas ▼]   [▼]    │
│                                                      [⟳] [⊞] │
├─────────────────────────────────────────────────────────────┤
│ [Kanban columns...]                                          │
└─────────────────────────────────────────────────────────────┘
```

### Dropdown States
- **Default**: Texto cinza (nenhum filtro ativo)
- **Active**: Texto azul (#00a4e4) + fundo levemente azul
- **Badge**: Fundo cinza, texto "N filtros"

### Responsive Behavior
- **Desktop (>1024px)**: 6 controles em linha horizontal
- **Tablet (768-1024px)**: 2 linhas (3 controles por linha)
- **Mobile (<768px)**: Dropdown "Filtros" abre modal com todos controles

---

## 🚧 Riscos & Mitigações

### Risco 1: Performance com muitos usuários
**Probabilidade**: 30%
**Impacto**: Médio
**Mitigação**:
- Cache query de usuários (staleTime: 5min)
- Limit 50 usuários no dropdown (search se >50)

### Risco 2: Complexidade de state management
**Probabilidade**: 40%
**Impacto**: Médio
**Mitigação**:
- Zustand simples (≤30 linhas de store)
- URL como source of truth (reload mantém filtros)

### Risco 3: Mobile UX ruim (6 dropdowns pequenos)
**Probabilidade**: 60%
**Impacto**: Alto
**Mitigação**:
- Mobile: 1 botão "Filtros" abre modal full-screen
- Desktop: Barra horizontal (como RD)

---

## 🎯 Definition of Done (Epic)

Epic completo quando:
- [ ] FilterBar organism criado (≤50 linhas)
- [ ] 6 controles funcionais (Funil, Visão, Responsável, Status, Refresh, Badge)
- [ ] Filtros aplicam em tempo real (React Query)
- [ ] URL reflete filtros (bookmarkable)
- [ ] Badge mostra contador correto
- [ ] Dropdown "Visão" disabled com tooltip "Em desenvolvimento"
- [ ] Mobile: Modal full-screen para filtros
- [ ] Zustand store criado para state
- [ ] Testes manuais: Trocar funil, filtrar responsável, ver badge
- [ ] Protocol Notecraft™ compliance

---

## 📅 Timeline

**Estimativa Total**: 2 dias

**Breakdown**:
- Day 1 (6h): FilterBar organism + 4 dropdowns (Funil, Responsável, Status, Visão)
- Day 2 (6h): Botão Refresh + Badge contador + Zustand store + Mobile responsive

**Sprint Recommendation**: Sprint "MVP State of Art" - Days 3-4 (após Epic 1)

---

## 🔗 Related Epics

- **Epic 1**: Tabs Detalhe Oportunidade (paralelo)
- **Epic 3**: UX Polish Cards (depende deste - ícones de ação)

---

**Criado**: 25 de Outubro de 2025
**Owner**: Product Owner
**Tech Lead**: Architect
**Última atualização**: 25 de Outubro de 2025
