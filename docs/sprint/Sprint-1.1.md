# Sprint 1.1 - CRM Core Continuation

**Sprint Goal**: Tornar o CRM funcional com autenticação segura, CRUD completo de clientes, e dashboard com métricas reais.

**Duration**: 1 semana (14-18 Out 2025)
**Team Capacity**: 12 story points
**Status**: 🟢 Ready to Start

---

## Epic: CRM Core Continuation

**Description**: Completar a infraestrutura core do CRM conectando autenticação, implementando CRUD backend, e tornando o dashboard dinâmico com dados reais do Supabase.

**Business Value**: Transformar protótipos em sistema funcional que permita gestão real de clientes e visualização de métricas de negócio.

**Success Metrics**:
- ✅ Usuários conseguem fazer login/logout
- ✅ Clientes podem ser criados, editados e listados do banco de dados
- ✅ Dashboard mostra métricas calculadas em tempo real
- ✅ Zero vulnerabilidades de segurança (auth obrigatória)

**Total Story Points**: 12 (Auth: 2, CRUD: 5, Dashboard: 5)

---

## Story 1: Auth Integration

**Story Points**: 2 (Small - 4-6 hours)
**Priority**: 🔴 CRITICAL
**Risk**: BLOCKER para produção

### User Story

```gherkin
As a: Vendedor STAGETEK
I want to: Fazer login com email e senha no sistema
So that: Apenas usuários autorizados possam acessar dados sensíveis de clientes
```

### Tasks

**Task 1.1**: Conectar Login.tsx ao useAuth hook (2h)
```typescript
// src/pages/Login.tsx
- [ ] Importar useAuth() hook
- [ ] Chamar const { signIn, loading } = useAuth()
- [ ] Adicionar handleSubmit: await signIn(email, password)
- [ ] Mostrar loading state (disable button + spinner)
- [ ] Tratar erro com toast.error(error.message)
- [ ] Redirecionar para /dashboard em sucesso
```

**Task 1.2**: Implementar ProtectedRoute com auth check (1h)
```typescript
// src/components/layouts/ProtectedRoute.tsx
- [ ] Importar useAuth()
- [ ] Chamar const { user, loading } = useAuth()
- [ ] Se loading, mostrar <Spinner fullscreen />
- [ ] Se !user, redirecionar para /login
- [ ] Se user, renderizar {children}
```

**Task 1.3**: Adicionar toast notifications (1h)
```typescript
// Instalação e setup
- [ ] npm install react-hot-toast
- [ ] Adicionar <Toaster /> em App.tsx
- [ ] Importar toast em Login.tsx
- [ ] Testar: toast.success("Login realizado!")
- [ ] Testar: toast.error("Credenciais inválidas")
```

**Task 1.4**: Testar fluxo completo (30min)
```
- [ ] Login com credenciais válidas → sucesso
- [ ] Login com credenciais inválidas → erro toast
- [ ] Acessar /dashboard sem login → redirect /login
- [ ] Logout → redirect /login + session limpa
```

### Acceptance Criteria

```gherkin
Given: Usuário não autenticado
When: Acessa /dashboard
Then: É redirecionado para /login

Given: Usuário na página /login
When: Insere email e senha válidos e clica "Entrar"
Then:
  - Loading aparece no botão
  - Toast "Login realizado!" aparece
  - Redireciona para /dashboard

Given: Usuário na página /login
When: Insere credenciais inválidas
Then:
  - Toast de erro aparece
  - Permanece na página /login
  - Formulário é resetado

Given: Usuário autenticado
When: Clica em "Sair" no menu
Then:
  - Session é limpa
  - Redireciona para /login
  - Dashboard não é mais acessível
```

**Definition of Done**:
- [ ] Código passa em lint (npm run lint)
- [ ] useAuth integrado em Login e ProtectedRoute
- [ ] Toast notifications funcionando
- [ ] Fluxo testado manualmente (4 cenários acima)
- [ ] Commit: "feat: integrate authentication with login and protected routes"

---

## Story 2: CRUD Clients Backend Integration

**Story Points**: 5 (Medium - 2-3 days)
**Priority**: 🔴 CRITICAL
**Dependencies**: Story 1 (Auth Integration)

### User Story

```gherkin
As a: Vendedor STAGETEK
I want to: Criar, listar, editar e desativar clientes diretamente no banco de dados
So that: Posso gerenciar minha carteira de clientes B2B em tempo real
```

### Tasks

**Task 2.1**: Criar hook useClientes.ts (4h)
```typescript
// src/hooks/useClientes.ts
- [ ] Export useClientes() hook
- [ ] State: clientes, loading, error
- [ ] getClientes() - SELECT * FROM clients WHERE status != 'inactive' ORDER BY name
- [ ] getClienteById(id) - SELECT single com JOIN se necessário
- [ ] createCliente(data) - INSERT + refetch automático
- [ ] updateCliente(id, data) - UPDATE + refetch
- [ ] deleteCliente(id) - UPDATE status = 'inactive' (soft delete)
- [ ] useEffect(() => getClientes(), []) - fetch inicial
- [ ] Adicionar try/catch em todas as queries
- [ ] toast.error(error.message) em erros
```

**Task 2.2**: Integrar useClientes em Clientes.tsx (2h)
```typescript
// src/pages/Clientes.tsx
- [ ] Importar useClientes
- [ ] Chamar const { clientes, loading, error, createCliente, updateCliente, deleteCliente } = useClientes()
- [ ] Remover mock data (mockClientes)
- [ ] Passar clientes reais para ClientTable
- [ ] Mostrar <Spinner /> se loading
- [ ] Mostrar mensagem de erro se error
- [ ] Mostrar "Nenhum cliente cadastrado" se clientes.length === 0
```

**Task 2.3**: Conectar ClienteModal ao backend (3h)
```typescript
// src/components/organisms/ClienteModal.tsx
- [ ] Aceitar props: onSubmit, initialData, loading
- [ ] Chamar onSubmit(formData) no handleSubmit
- [ ] Mostrar loading no botão "Salvar" (disable + spinner)
- [ ] Fechar modal automaticamente em sucesso
- [ ] Mostrar toast.success("Cliente salvo!")

// src/pages/Clientes.tsx - handlers
- [ ] handleCreate = async (data) => { await createCliente(data); closeModal(); }
- [ ] handleUpdate = async (id, data) => { await updateCliente(id, data); closeModal(); }
- [ ] handleDelete = async (id) => { if (confirm("Desativar cliente?")) await deleteCliente(id); }
```

**Task 2.4**: Adicionar filtros e busca (2h)
```typescript
// src/pages/Clientes.tsx
- [ ] State: searchTerm, statusFilter
- [ ] Modificar useClientes para aceitar filters: { search, status }
- [ ] getClientes({ search, status }) - filtrar no backend (Supabase .ilike())
- [ ] Input busca com debounce (300ms)
- [ ] Dropdown status: Todos | Ativos | Inativos
- [ ] Refetch ao mudar filtros
```

**Task 2.5**: Testar CRUD completo (1h)
```
- [ ] Criar novo cliente → aparece na lista
- [ ] Editar cliente existente → mudanças refletidas
- [ ] Buscar por nome → filtra corretamente
- [ ] Filtrar por status → mostra apenas ativos/inativos
- [ ] Desativar cliente → some da lista de ativos
- [ ] Testar com 0 clientes → mostra empty state
- [ ] Testar erro de rede → mostra toast de erro
```

### Acceptance Criteria

```gherkin
Given: Vendedor autenticado na página /clientes
When: Clica "Novo Cliente"
Then: Modal abre com formulário vazio

Given: Formulário de novo cliente preenchido
When: Clica "Salvar"
Then:
  - Loading aparece no botão
  - Cliente é inserido no banco (Supabase)
  - Modal fecha
  - Toast "Cliente salvo!" aparece
  - Cliente aparece na tabela imediatamente

Given: Cliente existe na lista
When: Clica no botão "Editar"
Then:
  - Modal abre com dados pré-preenchidos
  - Ao salvar, UPDATE é executado no banco
  - Mudanças refletidas na lista

Given: Lista de clientes carregando
When: Aguarda resposta do Supabase
Then: Spinner é exibido

Given: Busca por "empresa"
When: Digita no campo de busca
Then: Apenas clientes com "empresa" no nome aparecem (case-insensitive)

Given: Cliente ativo
When: Clica "Desativar"
Then:
  - Confirmação é solicitada
  - Status muda para 'inactive' no banco
  - Cliente some da lista padrão (ativos)
```

**Definition of Done**:
- [ ] useClientes.ts criado e testado
- [ ] CRUD completo funcionando (create, read, update, soft delete)
- [ ] Filtros (busca + status) funcionais
- [ ] Loading states em todas as operações
- [ ] Error handling com toast
- [ ] 7 cenários de teste passando
- [ ] Commit: "feat: implement CRUD clients with Supabase integration"

---

## Story 3: Dashboard Dinâmico

**Story Points**: 5 (Medium - 2-3 days)
**Priority**: 🟡 HIGH
**Dependencies**: Story 2 (CRUD Clients - para ter dados)

### User Story

```gherkin
As a: Gerente de Vendas
I want to: Visualizar métricas reais de vendas e oportunidades no dashboard
So that: Posso tomar decisões baseadas em dados atualizados do negócio
```

### Tasks

**Task 3.1**: Criar hook useDashboard.ts (4h)
```typescript
// src/hooks/useDashboard.ts
- [ ] Export useDashboard(period: '7d' | '30d' | '90d' | '1y') hook
- [ ] Query 1: totalVendas - SUM(value) WHERE status='won' AND closed_at >= period
- [ ] Query 2: oportunidadesAbertas - COUNT(*) WHERE status='open'
- [ ] Query 3: taxaConversao - (COUNT won / COUNT total) * 100
- [ ] Query 4: ticketMedio - AVG(value) WHERE status='won'
- [ ] Calcular trend (% change vs período anterior)
- [ ] Return { stats: { totalVendas, oportunidadesAbertas, taxaConversao, ticketMedio }, loading, error, refetch }
- [ ] useEffect para fetch automático ao montar
```

**Task 3.2**: Integrar useDashboard em Dashboard.tsx (2h)
```typescript
// src/pages/Dashboard.tsx
- [ ] Importar useDashboard
- [ ] State: period = '30d'
- [ ] Chamar const { stats, loading } = useDashboard(period)
- [ ] Remover dados hardcoded (mockStats)
- [ ] Passar stats reais para StatsGrid
- [ ] Adicionar PeriodSelector dropdown (7d, 30d, 90d, 1y)
- [ ] Mostrar skeleton loading para StatCards
```

**Task 3.3**: Adicionar loading skeletons (2h)
```typescript
// src/components/molecules/StatCardSkeleton.tsx (≤35 linhas)
- [ ] Criar componente skeleton (shimmer effect)
- [ ] Usar tailwind animate-pulse
- [ ] Exibir 4 skeletons enquanto loading

// src/pages/Dashboard.tsx
- [ ] Se loading, renderizar <StatCardSkeleton /> × 4
- [ ] Se !loading, renderizar StatCard com dados reais
```

**Task 3.4**: Implementar cálculo de trends (3h)
```typescript
// src/hooks/useDashboard.ts
- [ ] Query adicional: statsPeriodoAnterior (mesmo período, deslocado)
- [ ] Calcular trend: ((atual - anterior) / anterior) * 100
- [ ] Retornar trend: { value: 12.5, direction: 'up' | 'down' }
- [ ] Passar trend para StatCard

// src/components/molecules/StatCard.tsx
- [ ] Adicionar prop trend?: { value: number, direction: 'up' | 'down' }
- [ ] Mostrar ícone ↑ verde se up, ↓ vermelho se down
- [ ] Mostrar "+12.5%" ou "-8.3%" ao lado do valor
```

**Task 3.5**: Testar dashboard com dados reais (1h)
```
- [ ] Popular banco com 20 oportunidades de teste (status: open, won, lost)
- [ ] Verificar totalVendas = SUM das won
- [ ] Verificar oportunidadesAbertas = COUNT das open
- [ ] Verificar taxaConversao = (won / total) * 100
- [ ] Verificar ticketMedio = AVG das won
- [ ] Mudar período para 7d → recalcula métricas
- [ ] Testar com 0 oportunidades → mostra "0" sem quebrar
```

### Acceptance Criteria

```gherkin
Given: Gerente acessa /dashboard
When: Página carrega
Then:
  - 4 skeletons aparecem durante loading
  - Após ~2s, StatCards mostram métricas reais do Supabase

Given: Dashboard carregado com período "30 dias"
When: Muda período para "7 dias"
Then:
  - Métricas recalculam automaticamente
  - Valores mudam para refletir últimos 7 dias
  - Trends ajustam comparando com 7 dias anteriores

Given: Dashboard com dados
When: Métricas têm trend positivo
Then: Ícone ↑ verde + "+12.5%" aparece ao lado do valor

Given: Nenhuma oportunidade no banco
When: Dashboard carrega
Then:
  - Total Vendas: R$ 0
  - Oportunidades Abertas: 0
  - Taxa Conversão: 0%
  - Ticket Médio: R$ 0
  - Sem erro ou crash
```

**Definition of Done**:
- [ ] useDashboard.ts implementado com 4 queries
- [ ] StatCards mostram dados reais do Supabase
- [ ] PeriodSelector funcional (7d/30d/90d/1y)
- [ ] Trends calculados e exibidos corretamente
- [ ] Loading skeletons implementados
- [ ] 5 cenários de teste passando
- [ ] Commit: "feat: implement dynamic dashboard with real-time metrics"

---

## Sprint Retrospective Template

**O que deu certo?**
- [Preencher após Sprint Review]

**O que pode melhorar?**
- [Preencher após Sprint Review]

**Action Items para próximo Sprint**:
- [ ] [Item 1]
- [ ] [Item 2]

---

**Sprint Created by**: Analyst + SM
**Date**: 14 de Outubro de 2025
**Word Count**: ~980 words
**Ready for Development**: ✅ Yes
