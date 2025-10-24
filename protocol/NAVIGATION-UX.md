# STAGETEK CRM - Navegação e UX

**Documento de Consolidação UX/UI e Fluxos**
**Data**: 23 de Outubro de 2025
**Status**: Sprint 2 - 64% completo
**Nota Geral**: ⭐ 7/10

---

## 📊 SUMÁRIO EXECUTIVO

### Status Atual
- ✅ **Pontos Fortes**: Dark mode consistente, Kanban funcional, Tab Histórico completa
- ❌ **Pontos Fracos**: Navegação sem contexto, cards básicos, funcionalidades escondidas
- 🎯 **Meta**: Elevar UX de 7/10 → 9/10 em 3-4 dias

### Top 3 Problemas (P0 - Crítico)
1. **Cards do Kanban muito básicos** - Falta temperatura, estrelas, avatar, tarefas
2. **Navegação sem indicadores visuais** - Usuário não sabe "onde está", sem breadcrumb
3. **Funcionalidades críticas escondidas** - Config Funis em 3 níveis de menu

---

## 🗺️ MAPA DE NAVEGAÇÃO ATUAL

### Menu Principal (TopBar)
```
[Logo STAGETEK] │ Dashboard │ Funil │ Oportunidades │ Clientes │ [Busca] [Avatar]
```

**Links Ativos**:
- ✅ Dashboard (`/dashboard`) - KPIs gerais
- ✅ Funil (`/funil`) - Kanban drag-and-drop
- ✅ Oportunidades (`/oportunidades`) - Lista + CRUD
- ✅ Clientes (`/clientes`) - Lista + CRUD

**UserMenu (dropdown no avatar)**:
- ✅ Configurações → Funis (`/configuracoes/funis`)
- ⏳ Usuários (placeholder)
- ⏳ Integrações (placeholder)
- ✅ Sair (logout)

### Status por Funcionalidade

| Funcionalidade | Status | UX Score | Problemas Identificados |
|----------------|--------|----------|-------------------------|
| **Funil Kanban** | ✅ 100% | ⭐ 7/10 | Cards básicos, sem temperatura/estrelas |
| **Detalhes Oportunidade** | 🟡 60% | ⭐ 8/10 | 3 tabs vazias (E-mail, Contatos, Produtos) |
| **Tab Histórico** | ✅ 100% | ⭐ 9/10 | Timeline funcional, formulário ok |
| **Tab Tarefas** | ✅ 100% | ⭐ 8/10 | Funcional mas escondida (4 cliques) |
| **Sistema Cotações** | 🟡 70% | ⭐ 8/10 | Falta lista de cotações salvas |
| **Config Funis** | ✅ 100% | ⭐ 6/10 | Enterrada em 3 níveis de navegação |
| **CRUD Clientes/Oport** | ✅ 100% | ⭐ 9/10 | Dark mode ok, modais funcionais |

---

## 🚶 FLUXOS PRINCIPAIS (USER JOURNEYS)

### Fluxo 1: Gestão de Pipeline (Uso Diário) ✅
```
Login → Funil Kanban → Arrastar card OU Clicar em card → Detalhes
```
**Tempo esperado**: < 10 segundos
**Status**: ✅ Funcional
**Problemas**:
- ❌ Cards não mostram temperatura (hot/warm/cold)
- ❌ Sem indicador de tarefas atrasadas
- ❌ Falta avatar do cliente

---

### Fluxo 2: Criar Cotação (Crítico) ⚠️
```
Funil → Click em card → Detalhes → Tab Histórico → ??? (não óbvio!)
Deveria: Funil → Card → Botão "Nova Cotação" (visível no header)
```
**Tempo esperado**: < 5 minutos
**Status**: 🟡 Confuso
**Problemas**:
- ❌ Botão "Nova Cotação" não está visível em Detalhes
- ❌ Caminho não é intuitivo
- ❌ Falta lista de cotações enviadas

**Solução**:
1. Adicionar botão "Nova Cotação" no header de DetalheOportunidade
2. Criar página `/cotacoes` (lista de todas cotações)
3. Link "Cotações" no menu principal

---

### Fluxo 3: Criar Tarefa Rápida ❌
```
ATUAL: Funil → Card → Tab Tarefas → "+ Nova Tarefa" (4 cliques!)
IDEAL: TopBar → Botão "⚡ Ações" → "Nova Tarefa" → Modal (2 cliques)
```
**Tempo esperado**: < 30 segundos
**Status**: ❌ Muito escondido
**Solução**: Adicionar botão "Ações Rápidas" no TopBar com dropdown:
- Nova Oportunidade
- Nova Tarefa
- Nova Cotação
- Novo Cliente

---

### Fluxo 4: Configurar Funil ❌
```
ATUAL: Avatar → Configurações → Funis (3 níveis!)
IDEAL: Menu Principal → "Configurações" (1 clique)
```
**Status**: ❌ Enterrado
**Solução**: Adicionar "Configurações" ao menu principal (5º item)

---

## 💡 PLANO DE AÇÃO IMEDIATO (P0 - 3-4 dias)

### Dia 1: Quick Wins UX (6-8 horas)

#### 1.1 NavLink com Active State (30 min)
**Arquivo**: `src/components/organisms/TopBar.tsx`
```typescript
import { useLocation } from 'react-router-dom'
const location = useLocation()
<NavLink to="/funil" label="Funil" active={location.pathname.startsWith('/funil')} />
```

#### 1.2 Breadcrumb Component (2 horas)
**Novo arquivo**: `src/components/molecules/Breadcrumb.tsx` (22 linhas)
**Usar em**: DetalheOportunidade, NovaCotacao, ConfigFunis

```
< Voltar  |  Oportunidades  >  Pedido Set Luz  >  Nova Cotação
```

#### 1.3 Loading States & Feedback (2 horas)
- Spinner em fetch de dados
- Toast confirmações (criar, editar, deletar)
- Disabled states em botões durante submit

#### 1.4 Adicionar "Cotações" ao Menu (30 min)
**Arquivo**: `src/components/organisms/TopBar.tsx`
```typescript
<NavLink to="/cotacoes" label="Cotações" />
```

---

### Dia 2: Melhorar OpportunityCard (6-8 horas)

**Arquivo**: `src/components/molecules/OpportunityCard.tsx`

#### 2.1 Adicionar Campos ao Database (1 hora)
```sql
ALTER TABLE opportunities
ADD COLUMN temperature TEXT CHECK(temperature IN ('hot', 'warm', 'cold')),
ADD COLUMN qualification INTEGER CHECK(qualification BETWEEN 1 AND 5);
```

#### 2.2 Componente OpportunityCard v2 (4 horas)
```
┌─────────────────────────────────────┐
│ ⋮ [Título]                    🔥    │ ← Temperatura
│   [Cliente] + Avatar                │ ← Iniciais com cor
│   ⭐⭐⭐⭐☆                            │ ← Qualificação (1-5)
│   R$ 15.000,00    [JD] 📅 há 3d     │ ← Responsável
│   ───────────────────────────────   │
│   📞 Ligar hoje 14h  ⚠️             │ ← Próxima tarefa (se atrasada)
└─────────────────────────────────────┘
```

**Elementos novos**:
- Avatar cliente (iniciais coloridas)
- Ícone temperatura: 🔥 Hot (#e90101) | 🌡️ Warm (#ff8c00) | 🧊 Cold (#4a90e2)
- Estrelas qualificação (componente reutilizável)
- Badge tarefas atrasadas (query JOIN com tasks)

---

### Dia 3: Página Lista de Cotações (6-8 horas)

**Novo arquivo**: `src/pages/Cotacoes.tsx`

#### 3.1 Layout
- DataTable desktop (colunas: Número, Cliente, Valor, Data, Status)
- Cards mobile
- Filtros: Status (Draft, Sent), Data (range picker), Cliente (select)
- Ações: Visualizar PDF, Reenviar Email, Editar (se draft)

#### 3.2 Integração
- Query Supabase: `quotations` JOIN `opportunities` JOIN `clients`
- Paginação (20 itens por página)
- Download PDF (link direto do Storage)
- Reenviar email (chamar Edge Function novamente)

---

### Dia 4: Testes & Refinamentos (6-8 horas)

#### 4.1 Checklist de Usabilidade

**Cenário 1: Vendedor cria cotação completa**
- [ ] Login → Dashboard (< 3s)
- [ ] Dashboard → Funil (1 clique)
- [ ] Funil → Detalhes Oportunidade (1 clique no card)
- [ ] Detalhes → Nova Cotação (1 clique em botão visível)
- [ ] Selecionar produtos (< 2 min)
- [ ] Gerar PDF (< 5s)
- [ ] Enviar email (< 30s)
- **Meta total**: < 5 minutos

**Cenário 2: Vendedor atualiza pipeline**
- [ ] Drag-and-drop funciona na primeira tentativa
- [ ] Feedback visual imediato (toast confirmação)
- [ ] Card reflete novo estágio instantaneamente
- **Meta**: < 10 segundos

**Cenário 3: Gestor visualiza métricas**
- [ ] Dashboard carrega em < 2s
- [ ] KPIs principais visíveis sem scroll
- [ ] Identifica gargalos em < 30s
- **Meta**: < 1 minuto

#### 4.2 Build de Produção
```bash
npm run build
npm run preview  # Testar build localmente
```

Verificar:
- [ ] Bundle size < 500KB (gzipped)
- [ ] Lighthouse Score > 85 (mobile)
- [ ] Nenhum erro no console
- [ ] Protocol Notecraft™ 100% compliance

---

## 🎯 MÉTRICAS DE SUCESSO

### Eficiência (Tempo para Completar Tarefas)
- ✅ Criar oportunidade: < 2 min (atual: ~3min)
- ✅ Gerar cotação: < 5 min (atual: 5min) ← **META ALCANÇADA**
- ⏳ Marcar tarefa concluída: 2 cliques (atual: 4 cliques)
- ⏳ Atualizar estágio (drag-drop): < 10s (atual: 10s) ← **OK**

### Adoção (Taxa de Uso das Funcionalidades)
- 🎯 Funil Kanban: > 90% (meta)
- 🎯 Sistema de Tarefas: > 70% (meta)
- 🎯 Cotações: > 80% (meta)

### Performance Técnica
- ⏳ Tempo de carregamento inicial: < 2s
- ✅ Drag-drop no Kanban: < 100ms ← **OK**
- 🎯 Lighthouse Score (mobile): > 85

### Satisfação (Qualitativa)
- 🎯 NPS vendedores: ≥ 8/10
- 🎯 "Sistema é intuitivo": ≥ 80% concordam
- 🎯 "Encontro o que preciso rapidamente": ≥ 85% concordam

---

## 📝 BACKLOG P1 (Próxima Sprint)

**Não fazer agora** - Focar apenas em P0 acima

- ⏳ Botão "Ações Rápidas" no TopBar (dropdown)
- ⏳ Sistema de notificações (tarefas atrasadas)
- ⏳ Tab E-mail (templates, histórico de envios)
- ⏳ Tab Contatos (lista, vincular contato principal)
- ⏳ Dashboard com gráficos funcionais (Recharts)
- ⏳ Filtros avançados no Funil (responsável, período, valor)

---

## 🚀 DECISÕES DE DESIGN

### Por que não temos sidebar?
- Mobile-first: Sidebar ocupa espaço vertical precioso
- TopBar horizontal escala melhor em tablets/mobile
- UserMenu concentra configurações secundárias

### Por que Funil vem antes de Oportunidades?
- Funil Kanban = view principal do vendedor (uso diário)
- Lista de Oportunidades = secundária (busca/CRUD)
- Princípio: coloque o mais usado primeiro

### Por que remover links vagos do menu?
- "Analisar", "Contatos", "Tarefas" eram genéricos demais
- Contatos/Tarefas são tabs dentro de Oportunidades
- Menu limpo = foco claro = menos carga cognitiva

---

**Documentação viva**: Atualizar após completar P0
**Próxima revisão**: Fim do Sprint 2 (quando atingir 9/10 UX)

Built with ❤️ by STAGETEK Engineering Team
**Protocol Notecraft™ compliant**
