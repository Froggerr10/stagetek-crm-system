# STAGETEK CRM - Implementation Plan
**Strategic Roadmap for React + TypeScript + Supabase CRM**

**Version**: 1.0.0
**Date**: 3 de Outubro de 2025
**Status**: Active Development
**Owner**: STAGETEK Engineering Team

---

## 📋 Executive Summary

### Current State

**Overall Progress**: ~15% MVP Implementado

**Completed**:
- ✅ Project setup (React 18 + Vite + TypeScript)
- ✅ Tailwind CSS configured with STAGETEK design tokens
- ✅ Supabase integration (client setup)
- ✅ Basic authentication structure (`useAuth` hook)
- ✅ Atomic Design structure (atoms/ molecules/ organisms/ templates/)
- ✅ Core components: Button, Badge, Input, Select, Spinner, Checkbox
- ✅ Layout components: MainLayout, TopBar, ProtectedRoute
- ✅ Pages: Login, Dashboard (basic), Clientes (basic), Oportunidades (basic)

**In Progress**:
- 🔄 CRUD Clientes (modal exists, needs Supabase integration)
- 🔄 CRUD Oportunidades (modal exists, needs Supabase integration)
- 🔄 Dashboard (components exist, needs real data)

**Not Started**:
- ❌ Funil de Vendas Kanban
- ❌ Detalhes da Oportunidade (page doesn't exist)
- ❌ Sistema de Tarefas
- ❌ Sistema de Cotações
- ❌ CRUD Produtos
- ❌ Relatórios Gerenciais
- ❌ Integrações (Email, Slack, Calendar)

### Timeline to Functional MVP

**Estimate**: 8-10 semanas (40-50 dias úteis)

**Critical Path**:
1. **Weeks 1-2**: Complete P0 CRUD operations (Clientes + Oportunidades)
2. **Weeks 3-4**: Funil de Vendas Kanban + Detalhes Oportunidade
3. **Weeks 5-6**: Sistema de Tarefas + Dashboard with real data
4. **Weeks 7-8**: CRUD Produtos + Sistema de Cotações (basic)
5. **Weeks 9-10**: Testing + Bug fixes + Documentation

### Main Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Supabase Row Level Security (RLS)** not properly configured | 🟡 Medium | 🔴 High | Create RLS policies early, test with multiple users |
| **Drag-and-drop mobile** (dnd-kit) UX issues | 🟡 Medium | 🟡 Medium | Test on real devices, fallback to buttons |
| **Timeline overrun** due to scope creep | 🔴 High | 🟡 Medium | Strict adherence to P0/P1 prioritization |
| **Protocol Notecraft™** line limits block complex components | 🟢 Low | 🟢 Low | Use composition, extract hooks |

---

## 🎯 Implementation Phases

### **Phase 1: P0 - CRITICAL MVP (Weeks 1-6)**

Without this, the CRM doesn't function.

---

## Feature: P0.1 - Authentication & Authorization

**Priority**: P0 (CRITICAL)
**Estimate**: 3-5 days
**Dependencies**: Supabase Auth configured
**Status**: 🔄 In Progress (50% - structure exists, needs integration)

### Files to create/modify:

- [x] `src/hooks/useAuth.ts` - CREATED (needs completion)
- [ ] `src/pages/Login.tsx` - EXISTS (needs Supabase integration)
- [ ] `src/components/layouts/ProtectedRoute.tsx` - EXISTS (needs auth check)
- [ ] `src/pages/RecuperarSenha.tsx` - TODO
- [ ] `supabase/migrations/001_enable_rls.sql` - TODO

### Checklist de Aceitação:

- [ ] Login com email/senha funciona (Supabase Auth)
- [ ] Recuperação de senha via email (Resend API)
- [ ] Logout funcional (clear session)
- [ ] Proteção de rotas (redirect não autenticado → /login)
- [ ] Row Level Security (RLS) habilitado em todas as tabelas
- [ ] Session persistence (localStorage + refresh token)
- [ ] Error handling (credenciais inválidas, rede offline)
- [ ] Loading states durante autenticação
- [ ] Mobile-responsive login form

### Rastreabilidade:

- **PRD.md**: Seção "P0.1 - Autenticação e Controle de Acesso" (linha 148)
- **GAP-ANALYSIS.md**: Não mencionado (já existente)
- **FEATURES-PRIORITIZED.md**: Feature #1 (linha 10)

### Implementation Steps:

1. **Supabase Setup** (1 dia):
   - [ ] Configure Supabase Auth providers (email/password)
   - [ ] Create users table in Supabase
   - [ ] Setup email templates (confirmation, reset)
   - [ ] Configure Resend API for emails

2. **Authentication Hook** (1 dia):
   - [ ] Complete `useAuth.ts` with Supabase methods
   - [ ] Add `signIn(email, password)` method
   - [ ] Add `signOut()` method
   - [ ] Add `resetPassword(email)` method
   - [ ] Add `getCurrentUser()` method
   - [ ] Add session state management

3. **Login Page** (1 dia):
   - [ ] Integrate Login.tsx with `useAuth`
   - [ ] Add form validation (React Hook Form + Zod)
   - [ ] Add loading states
   - [ ] Add error messages
   - [ ] Mobile-optimized layout

4. **Protected Routes** (1 dia):
   - [ ] Update ProtectedRoute.tsx to check auth
   - [ ] Implement redirect logic
   - [ ] Add loading spinner while checking auth

5. **Row Level Security** (1 dia):
   - [ ] Create RLS policies for `clients` table
   - [ ] Create RLS policies for `opportunities` table
   - [ ] Create RLS policies for `products` table
   - [ ] Test policies with different users

---

## Feature: P0.2 - CRUD Clientes B2B

**Priority**: P0 (CRITICAL)
**Estimate**: 5-7 days
**Dependencies**: P0.1 Authentication
**Status**: 🔄 In Progress (40% - UI exists, needs backend)

### Files to create/modify:

- [x] `src/pages/Clientes.tsx` - EXISTS (needs data integration)
- [x] `src/components/organisms/ClientTable.tsx` - EXISTS
- [x] `src/components/organisms/ClienteModal.tsx` - EXISTS (needs form submission)
- [x] `src/components/molecules/ClientCard.tsx` - EXISTS
- [ ] `src/hooks/useClientes.ts` - TODO (Supabase queries)
- [ ] `supabase/migrations/002_create_clients.sql` - TODO
- [ ] `src/types/database.ts` - TODO (Client type)

### Checklist de Aceitação:

- [ ] Formulário de cadastro com validação (React Hook Form + Zod)
- [ ] Autocomplete CNPJ (brasil-api-mcp integration)
- [ ] Campos obrigatórios: nome, CNPJ, email, telefone, endereço
- [ ] Campo status: ativo, inativo, pendente (dropdown)
- [ ] Listagem de clientes (DataTable com paginação)
- [ ] Busca por nome/CNPJ (real-time)
- [ ] Filtros: status, data criação
- [ ] Editar cliente (modal pre-filled)
- [ ] Desativar cliente (soft delete - status = 'inactive')
- [ ] Avatar com iniciais do nome
- [ ] Badge de status (cores diferentes)
- [ ] Mobile: cards ao invés de tabela
- [ ] Exportar lista para Excel (opcional P1)

### Rastreabilidade:

- **PRD.md**: Seção "P0.2 - CRUD Clientes B2B" (linha 162)
- **GAP-ANALYSIS.md**: Não mencionado (já existente parcialmente)
- **RD-STATION-ANALYSIS.md**: Tela "Empresas/Clientes" (linha 812)
- **FEATURES-PRIORITIZED.md**: Feature #2 (linha 17)

### Implementation Steps:

1. **Database Schema** (1 dia):
   - [ ] Create `clients` table migration
   - [ ] Add columns: id, name, cnpj, email, phone, address (JSONB), status, created_at, updated_at, created_by
   - [ ] Add unique constraint on CNPJ
   - [ ] Add RLS policies
   - [ ] Add indexes on name, cnpj, status

2. **Supabase Hook** (2 dias):
   - [ ] Create `useClientes.ts` hook
   - [ ] `getClientes()` - fetch all clients with filters
   - [ ] `getClienteById(id)` - fetch single client
   - [ ] `createCliente(data)` - insert new client
   - [ ] `updateCliente(id, data)` - update client
   - [ ] `deleteCliente(id)` - soft delete (status = inactive)
   - [ ] Add loading/error states
   - [ ] Add optimistic updates (React Query or manual)

3. **CNPJ Autocomplete** (1 dia):
   - [ ] Create `useCNPJ.ts` hook
   - [ ] Integrate brasil-api-mcp
   - [ ] Fetch company data by CNPJ
   - [ ] Auto-fill: name, address from API
   - [ ] Add validation (14 digits, valid format)
   - [ ] Add loading state while fetching

4. **Form Integration** (2 dias):
   - [ ] Update ClienteModal.tsx with React Hook Form
   - [ ] Add Zod schema validation
   - [ ] Connect form to `useClientes` hook
   - [ ] Handle create/update logic
   - [ ] Add success/error notifications
   - [ ] Reset form after success

5. **List & Filters** (1 dia):
   - [ ] Connect ClientTable to `useClientes`
   - [ ] Add pagination (10/20/50 per page)
   - [ ] Add search input (debounced)
   - [ ] Add status filter dropdown
   - [ ] Add date range filter
   - [ ] Mobile: render ClientCard components

---

## Feature: P0.3 - CRUD Oportunidades

**Priority**: P0 (CRITICAL)
**Estimate**: 5-7 days
**Dependencies**: P0.2 CRUD Clientes
**Status**: 🔄 In Progress (35% - UI exists, needs backend)

### Files to create/modify:

- [x] `src/pages/Oportunidades.tsx` - EXISTS (needs data integration)
- [x] `src/components/organisms/OpportunitiesTable.tsx` - EXISTS
- [x] `src/components/organisms/OportunidadeModal.tsx` - EXISTS
- [ ] `src/hooks/useOportunidades.ts` - TODO
- [ ] `supabase/migrations/003_create_opportunities.sql` - TODO
- [ ] `src/types/database.ts` - TODO (Opportunity type)

### Checklist de Aceitação:

- [ ] Formulário de criar oportunidade
- [ ] Campos: título, cliente (dropdown), valor (BRL/USD/EUR), estágio, data esperada fechamento, descrição
- [ ] Multi-currency support (BRL, USD, EUR)
- [ ] Conversão de moeda (USD/EUR → BRL) - taxa hardcoded ou API
- [ ] Listagem de oportunidades com filtros
- [ ] Filtros: estágio, cliente, data criação, valor mínimo/máximo
- [ ] Editar oportunidade (modal pre-filled)
- [ ] Excluir oportunidade (confirm dialog)
- [ ] Histórico de mudanças de estágio (ActivityLog table)
- [ ] Qualificação (1-5 estrelas) - visual
- [ ] Responsável (dropdown de usuários)
- [ ] Mobile: cards com informações principais

### Rastreabilidade:

- **PRD.md**: Seção "P0.3 - CRUD Oportunidades" (linha 180)
- **GAP-ANALYSIS.md**: Mencionado em múltiplas seções
- **RD-STATION-ANALYSIS.md**: Detalhes da Oportunidade (linha 222)
- **FEATURES-PRIORITIZED.md**: Feature #3 (linha 24)

### Implementation Steps:

1. **Database Schema** (1 dia):
   - [ ] Create `opportunities` table
   - [ ] Columns: id, title, client_id (FK), value, currency, stage, expected_close_date, probability, description, assigned_to, qualification, created_at, updated_at
   - [ ] Create `activity_log` table (for stage changes)
   - [ ] Add RLS policies
   - [ ] Add indexes on stage, client_id, assigned_to

2. **Supabase Hook** (2 dias):
   - [ ] Create `useOportunidades.ts`
   - [ ] `getOportunidades()` - with joins to clients table
   - [ ] `getOportunidadeById(id)` - with full details
   - [ ] `createOportunidade(data)` - insert
   - [ ] `updateOportunidade(id, data)` - update
   - [ ] `deleteOportunidade(id)` - hard delete
   - [ ] `updateStage(id, newStage)` - with activity log
   - [ ] Add loading/error states

3. **Currency Conversion** (1 dia):
   - [ ] Create `useCurrency.ts` hook
   - [ ] Fetch exchange rates (API or hardcoded)
   - [ ] Convert USD/EUR → BRL
   - [ ] Display converted values in UI
   - [ ] Add currency selector in form

4. **Form Integration** (2 dias):
   - [ ] Update OportunidadeModal with React Hook Form
   - [ ] Add Zod validation
   - [ ] Connect to `useOportunidades`
   - [ ] Add cliente dropdown (from `useClientes`)
   - [ ] Add responsável dropdown (from users)
   - [ ] Add qualificação (star rating component)
   - [ ] Handle create/update

5. **List & Filters** (1 dia):
   - [ ] Connect OpportunitiesTable to hook
   - [ ] Add filters (stage, client, date, value range)
   - [ ] Add sorting (value, date, stage)
   - [ ] Mobile: render opportunity cards

---

## Feature: P0.4 - Funil de Vendas (Kanban)

**Priority**: P0 (CRITICAL)
**Estimate**: 7-10 days
**Dependencies**: P0.3 CRUD Oportunidades
**Status**: ❌ Not Started (0%)

### Files to create/modify:

- [ ] `src/pages/FunilVendas.tsx` - TODO
- [ ] `src/components/organisms/KanbanBoard.tsx` - TODO
- [ ] `src/components/molecules/KanbanColumn.tsx` - TODO
- [ ] `src/components/molecules/OpportunityCard.tsx` - TODO
- [ ] `src/components/atoms/QualificationStars.tsx` - TODO
- [ ] `src/components/atoms/ActionIcon.tsx` - TODO
- [ ] `src/hooks/useFunil.ts` - TODO
- [ ] `supabase/migrations/004_create_funnels.sql` - TODO

### Checklist de Aceitação:

- [ ] Layout Kanban com 5 colunas (default funnel)
- [ ] Colunas: Lead, Contato Inicial, Proposta Enviada, Negociação, Fechamento
- [ ] Drag-and-drop entre estágios (dnd-kit library)
- [ ] Atualização automática do estágio no banco (Supabase realtime opcional)
- [ ] Totalizador de valor por coluna (soma de oportunidades.value)
- [ ] Contador de oportunidades por coluna
- [ ] Cards com: título, cliente, valor, qualificação (estrelas), ícones de ação
- [ ] Ícones de ação: telefone, email, info (quick actions)
- [ ] Mobile: swipe para mover (ou botões "Mover para...")
- [ ] Filtros: por vendedor, período, valor mínimo, status
- [ ] Dropdown de seleção de funil (se múltiplos funis existirem)
- [ ] Tooltip ao hover (ver detalhes rápidos)
- [ ] Indicador de tarefas atrasadas (ícone vermelho)
- [ ] Avatar do cliente nos cards (inicial do nome)

### Rastreabilidade:

- **PRD.md**: Seção "P0.4 - Funil de Vendas (Kanban)" (linha 196)
- **GAP-ANALYSIS.md**: Seção "1. Funil de Vendas Kanban (70% completo)" (linha 23)
- **RD-STATION-ANALYSIS.md**: Tela 1: Funil de Vendas (linha 36)
- **FEATURES-PRIORITIZED.md**: Feature #4 (linha 31)

### Implementation Steps:

1. **Database Schema - Funnels** (1 dia):
   - [ ] Create `funnels` table (id, name, stages array)
   - [ ] Create `funnel_stages` table (id, funnel_id, name, abbreviation, order, color)
   - [ ] Seed default funnel: "Funil PADRÃO"
   - [ ] Add RLS policies

2. **Kanban Components** (3 dias):
   - [ ] Create `OpportunityCard` molecule (≤35 lines)
     - [ ] Title, client name, values
     - [ ] QualificationStars component
     - [ ] Action icons (phone, email, info)
     - [ ] Client avatar (initials)
     - [ ] Late task indicator (red icon)
   - [ ] Create `KanbanColumn` molecule (≤35 lines)
     - [ ] Header: stage name, count, total value
     - [ ] Scrollable card list
     - [ ] Drop zone for drag-and-drop
   - [ ] Create `KanbanBoard` organism (≤50 lines)
     - [ ] 5 columns layout (horizontal scroll mobile)
     - [ ] dnd-kit DndContext wrapper
     - [ ] Handle drop events

3. **Drag-and-Drop Logic** (2 dias):
   - [ ] Install `@dnd-kit/core` and `@dnd-kit/sortable`
   - [ ] Implement drag sensors (mouse + touch)
   - [ ] Handle onDragEnd event
   - [ ] Update opportunity stage in Supabase
   - [ ] Optimistic update (move card immediately, rollback on error)
   - [ ] Mobile: alternative button interface ("Mover para...")

4. **Filters & Actions** (2 dias):
   - [ ] Add filter bar (funil, vendedor, período, valor mínimo)
   - [ ] Add dropdown to switch funnels
   - [ ] Add "Recarregar" button
   - [ ] Add "Filtro ativo" badge (count of active filters)
   - [ ] Quick actions: phone → open dialer, email → compose, info → details page

5. **Totals & Counters** (1 dia):
   - [ ] Calculate column totals (sum of values in BRL)
   - [ ] Display count of opportunities
   - [ ] Update on card move
   - [ ] Handle multi-currency (convert to BRL for totals)

6. **Mobile Optimizations** (1 dia):
   - [ ] Horizontal scroll columns
   - [ ] Touch-friendly drag (larger touch areas)
   - [ ] Bottom sheet for filters (mobile)
   - [ ] Swipe gestures (optional)

---

## Feature: P0.5 - Dashboard Básico

**Priority**: P0 (CRITICAL)
**Estimate**: 4-6 days
**Dependencies**: P0.3 CRUD Oportunidades (data exists)
**Status**: 🔄 In Progress (60% - components exist, needs real data)

### Files to create/modify:

- [x] `src/pages/Dashboard.tsx` - EXISTS (needs data integration)
- [x] `src/components/organisms/StatsGrid.tsx` - EXISTS
- [x] `src/components/molecules/StatCard.tsx` - EXISTS
- [ ] `src/hooks/useDashboard.ts` - TODO (aggregate queries)
- [ ] `src/components/organisms/RevenueChart.tsx` - TODO
- [ ] `src/components/organisms/PipelineChart.tsx` - TODO

### Checklist de Aceitação:

- [ ] 4 Stat Cards: Total Vendas (mês), Oportunidades Abertas, Taxa Conversão, Ticket Médio
- [ ] Stat Cards com ícones, valores, trend (↑ ou ↓)
- [ ] Gráfico 1: Vendas ao Longo do Tempo (Recharts linha)
- [ ] Gráfico 2: Oportunidades por Estágio (Recharts pizza ou barras)
- [ ] Tabela: Últimas 5 oportunidades (com link para detalhes)
- [ ] Filtro de período: 7 dias, 30 dias, 90 dias, ano
- [ ] Dark mode toggle funcional
- [ ] Mobile: cards empilhados, gráficos responsivos
- [ ] Loading states enquanto carrega dados
- [ ] Empty states se não houver dados

### Rastreabilidade:

- **PRD.md**: Seção "P0.5 - Dashboard Básico" (linha 212)
- **GAP-ANALYSIS.md**: Seção "5. Dashboard (70% implementado)" (linha 190)
- **FEATURES-PRIORITIZED.md**: Feature #5 (linha 38)

### Implementation Steps:

1. **Dashboard Hook** (2 dias):
   - [ ] Create `useDashboard.ts`
   - [ ] Query 1: Total vendas (mês atual, closed_won)
   - [ ] Query 2: Oportunidades abertas (não won/lost)
   - [ ] Query 3: Taxa conversão (won / total)
   - [ ] Query 4: Ticket médio (avg value closed_won)
   - [ ] Query 5: Vendas por dia/mês (time series)
   - [ ] Query 6: Oportunidades por estágio (group by)
   - [ ] Query 7: Últimas 5 oportunidades

2. **Stat Cards Integration** (1 dia):
   - [ ] Connect StatsGrid to `useDashboard`
   - [ ] Display real values
   - [ ] Add trend calculation (compare to previous period)
   - [ ] Add loading skeletons

3. **Charts** (2 dias):
   - [ ] Install `recharts`
   - [ ] Create RevenueChart (line chart)
   - [ ] Create PipelineChart (bar or pie chart)
   - [ ] Make responsive (mobile: smaller height)
   - [ ] Add tooltips with details

4. **Filters** (1 dia):
   - [ ] Add period filter dropdown (7d, 30d, 90d, 1y)
   - [ ] Update queries on filter change
   - [ ] Persist filter in URL params (optional)

---

## 📊 P0 Summary - MVP Completion

**Total Estimate**: 24-35 days (5-7 semanas)

**Milestone 1**: Sistema autenticado + CRUD básico funcionando (P0.1 + P0.2 + P0.3) - 13-19 dias
**Milestone 2**: Funil de Vendas visual operacional (P0.4) - +7-10 dias
**Milestone 3**: Dashboard com métricas reais (P0.5) - +4-6 dias

**Checkpoint de Aprovação**: Após P0 completo, revisar com usuário antes de prosseguir para P1.

---

## 🚀 Phase 2: P1 - HIGH PRIORITY (Weeks 7-14)

Essential for complete CRM operation.

---

## Feature: P1.6 - CRUD Produtos (Catálogo)

**Priority**: P1 (HIGH)
**Estimate**: 5-7 days
**Dependencies**: None (independent)
**Status**: ❌ Not Started (0%)

### Files to create/modify:

- [ ] `src/pages/Produtos.tsx` - TODO
- [ ] `src/components/organisms/ProductsTable.tsx` - TODO
- [ ] `src/components/organisms/ProdutoModal.tsx` - TODO
- [ ] `src/components/molecules/ProductCard.tsx` - TODO
- [ ] `src/hooks/useProdutos.ts` - TODO
- [ ] `supabase/migrations/005_create_products.sql` - TODO

### Checklist de Aceitação:

- [ ] Formulário de cadastro de produto
- [ ] Campos: nome, SKU, categoria (som/luz/estrutura), preço (BRL/USD/EUR), descrição, imagem URL
- [ ] Listagem com filtros (categoria, faixa de preço)
- [ ] Busca por nome/SKU (real-time)
- [ ] Cards com imagem + preço
- [ ] Mobile: grid responsivo (1 → 2 → 3 colunas)
- [ ] Editar produto
- [ ] Desativar produto (soft delete - is_active = false)
- [ ] Upload de imagem (Supabase Storage)

### Rastreabilidade:

- **PRD.md**: Seção "P1.6 - CRUD Produtos (Catálogo)" (linha 231)
- **GAP-ANALYSIS.md**: Não mencionado
- **FEATURES-PRIORITIZED.md**: Feature #6 (linha 49)

### Implementation Steps:

1. **Database Schema** (1 dia):
   - [ ] Create `products` table
   - [ ] Columns: id, name, sku, category, price_brl, price_usd, price_eur, description, image_url, stock_quantity, is_active
   - [ ] Add unique constraint on SKU
   - [ ] Add RLS policies
   - [ ] Configure Supabase Storage bucket for product images

2. **Supabase Hook** (2 dias):
   - [ ] Create `useProdutos.ts`
   - [ ] CRUD methods (get, create, update, delete)
   - [ ] Image upload to Storage
   - [ ] Filters and search

3. **Product Components** (2 dias):
   - [ ] Create ProdutoModal (form)
   - [ ] Create ProductCard (display)
   - [ ] Create ProductsTable (list)

4. **Image Upload** (1 dia):
   - [ ] File input with preview
   - [ ] Upload to Supabase Storage
   - [ ] Save URL to database
   - [ ] Handle errors (size limits, formats)

---

## Feature: P1.7 - Importação Excel (Produtos + Clientes)

**Priority**: P1 (HIGH)
**Estimate**: 5-7 days
**Dependencies**: P1.6 CRUD Produtos, P0.2 CRUD Clientes
**Status**: ❌ Not Started (0%)

### Files to create/modify:

- [ ] `src/pages/Importacao.tsx` - TODO
- [ ] `src/components/organisms/ExcelUploader.tsx` - TODO
- [ ] `src/components/organisms/ImportPreview.tsx` - TODO
- [ ] `src/hooks/useExcelImport.ts` - TODO
- [ ] Install: `xlsx` library

### Checklist de Aceitação:

- [ ] Upload de arquivo Excel (.xlsx)
- [ ] Parsing com validação (detect columns automatically)
- [ ] Preview de dados antes de importar (first 10 rows)
- [ ] Validação de CNPJ (brasil-api-mcp)
- [ ] Report de erros (linhas inválidas, quais campos)
- [ ] Import batch (Supabase insert batch - max 1000 rows)
- [ ] Progress bar durante importação
- [ ] Success/error summary após importação
- [ ] Template Excel para download (header row example)

### Rastreabilidade:

- **PRD.md**: Seção "P1.7 - Importação Excel (Produtos + Clientes)" (linha 246)
- **FEATURES-PRIORITIZED.md**: Feature #8 (linha 63)

### Implementation Steps:

1. **Excel Parser** (2 dias):
   - [ ] Install `xlsx` library
   - [ ] Parse uploaded file
   - [ ] Detect columns (match to expected fields)
   - [ ] Validate data types (number, string, date)
   - [ ] Create preview component

2. **Validation** (2 dias):
   - [ ] Validate CNPJ format (brasil-api-mcp)
   - [ ] Check for duplicates (SKU for products, CNPJ for clients)
   - [ ] Flag invalid rows
   - [ ] Show validation errors in preview

3. **Batch Insert** (2 dias):
   - [ ] Insert validated rows in batches (100 at a time)
   - [ ] Update progress bar
   - [ ] Handle errors (partial success)
   - [ ] Show final report (X inserted, Y failed)

4. **Template Download** (1 dia):
   - [ ] Generate Excel template with headers
   - [ ] Add example rows
   - [ ] Download button

---

## Feature: P1.8 - Sistema de Cotações

**Priority**: P1 (HIGH)
**Estimate**: 8-10 days
**Dependencies**: P1.6 CRUD Produtos, P0.2 CRUD Clientes
**Status**: ❌ Not Started (0%)

### Files to create/modify:

- [ ] `src/pages/Cotacoes.tsx` - TODO
- [ ] `src/components/organisms/CotacaoForm.tsx` - TODO
- [ ] `src/components/organisms/CotacaoPDF.tsx` - TODO
- [ ] `src/hooks/useCotacoes.ts` - TODO
- [ ] `supabase/migrations/006_create_quotes.sql` - TODO
- [ ] Install: `@react-pdf/renderer` or `jspdf`

### Checklist de Aceitação:

- [ ] Formulário: selecionar cliente, adicionar produtos (multi-select)
- [ ] Campos por produto: quantidade, desconto (%)
- [ ] Cálculo automático: subtotal, desconto total, frete, ICMS, total
- [ ] Conversão de moeda (BRL/USD/EUR)
- [ ] Geração de PDF (react-pdf ou jsPDF)
- [ ] Template PDF com logo STAGETEK, dados cliente, produtos, totais
- [ ] Envio por email (Resend API) - opcional aqui, pode ser P1.10
- [ ] Histórico de cotações por cliente
- [ ] Status: Rascunho, Enviada, Aceita, Rejeitada, Expirada
- [ ] Data de validade (auto-calculated: hoje + 15 dias)
- [ ] Número sequencial (auto: COT-2025-001)

### Rastreabilidade:

- **PRD.md**: Seção "P1.8 - Sistema de Cotações" (linha 262)
- **GAP-ANALYSIS.md**: Não mencionado (mas crítico)
- **FEATURES-PRIORITIZED.md**: Feature #7 (linha 56)

### Implementation Steps:

1. **Database Schema** (1 dia):
   - [ ] Create `quotes` table
   - [ ] Columns: id, quote_number, client_id, items (JSONB), subtotal, discount, shipping, tax, total, currency, status, valid_until, pdf_url, created_by
   - [ ] Add RLS policies

2. **Quote Form** (3 dias):
   - [ ] Create CotacaoForm (multi-step?)
   - [ ] Step 1: Select client
   - [ ] Step 2: Add products (quantity, discount)
   - [ ] Step 3: Add shipping, tax, notes
   - [ ] Real-time calculation of totals
   - [ ] Currency selector (BRL/USD/EUR)

3. **PDF Generation** (3 dias):
   - [ ] Install `@react-pdf/renderer`
   - [ ] Create PDF template
   - [ ] Logo STAGETEK (from public assets)
   - [ ] Client info section
   - [ ] Products table (name, qty, unit price, total)
   - [ ] Totals section (subtotal, discount, shipping, tax, grand total)
   - [ ] Generate PDF blob
   - [ ] Upload to Supabase Storage
   - [ ] Save URL to database

4. **Quote Management** (2 dias):
   - [ ] List of quotes (table)
   - [ ] Filters: status, client, date
   - [ ] View/download PDF
   - [ ] Change status (accept/reject)
   - [ ] Duplicate quote (create new from existing)

---

## Feature: P1.9 - Sistema de Pedidos (Tracking)

**Priority**: P1 (HIGH)
**Estimate**: 7-10 days
**Dependencies**: P1.8 Sistema de Cotações
**Status**: ❌ Not Started (0%)

### Files to create/modify:

- [ ] `src/pages/Pedidos.tsx` - TODO
- [ ] `src/components/organisms/PedidoTimeline.tsx` - TODO
- [ ] `src/components/organisms/PedidoModal.tsx` - TODO
- [ ] `src/hooks/usePedidos.ts` - TODO
- [ ] `supabase/migrations/007_create_orders.sql` - TODO

### Checklist de Aceitação:

- [ ] Criar pedido a partir de cotação aprovada (convert quote → order)
- [ ] Status: Rascunho, Confirmado, Em Produção, Despachado, Entregue, Cancelado
- [ ] Timeline visual (stepper component - shadcn/ui)
- [ ] Campos: production_start_date, estimated_delivery_date, actual_delivery_date, tracking_code
- [ ] Notificações Slack quando status muda (P1.10)
- [ ] Anexos (NF, comprovante de envio) - upload to Supabase Storage
- [ ] Filtros: status, cliente, período
- [ ] Número sequencial (PED-2025-001)
- [ ] Mobile: timeline horizontal scrollable

### Rastreabilidade:

- **PRD.md**: Seção "P1.9 - Sistema de Pedidos (Tracking)" (linha 277)
- **FEATURES-PRIORITIZED.md**: Feature #11 (linha 88)

### Implementation Steps:

1. **Database Schema** (1 dia):
   - [ ] Create `orders` table
   - [ ] Columns: id, order_number, quote_id, client_id, items (JSONB), total, currency, status, production_start_date, estimated_delivery_date, actual_delivery_date, tracking_code, notes
   - [ ] Create `order_attachments` table (for NF, files)
   - [ ] Add RLS policies

2. **Convert Quote to Order** (2 dias):
   - [ ] Add "Converter em Pedido" button to quote details
   - [ ] Copy quote data to new order
   - [ ] Set initial status: Confirmado
   - [ ] Update quote status: Aceita

3. **Order Timeline** (3 dias):
   - [ ] Create PedidoTimeline component
   - [ ] Stepper: Rascunho → Confirmado → Em Produção → Despachado → Entregue
   - [ ] Show dates for each step
   - [ ] Clickable steps to update status
   - [ ] Mobile: horizontal scroll

4. **File Attachments** (2 dias):
   - [ ] Upload NF (PDF)
   - [ ] Upload comprovante (PDF, image)
   - [ ] List attachments
   - [ ] Download attachments

---

## Feature: P1.10 - Integrações (Gmail, Slack, Calendar)

**Priority**: P1 (HIGH)
**Estimate**: 6-8 days
**Dependencies**: P1.8 Cotações, P1.9 Pedidos
**Status**: ❌ Not Started (0%)

### Files to create/modify:

- [ ] `src/lib/resend.ts` - TODO (Resend API client)
- [ ] `src/lib/slack.ts` - TODO (Slack Webhook)
- [ ] `src/lib/google-calendar.ts` - TODO (Google Calendar API)
- [ ] `src/pages/Configuracoes.tsx` - TODO (settings page)
- [ ] `.env` - Add API keys

### Checklist de Aceitação:

- [ ] **Resend API**: envio de emails (cotações, follow-ups)
- [ ] Email templates (cotação enviada, pedido confirmado)
- [ ] **Slack Webhook**: notificações (novo lead, pedido confirmado, deal fechado)
- [ ] Configurar webhook URL em settings
- [ ] **Google Calendar API**: criar eventos a partir de oportunidades
- [ ] Sync eventos: data esperada de fechamento → Calendar event
- [ ] Log de emails enviados (activity_log table)
- [ ] Settings page para configurar webhooks e API keys

### Rastreabilidade:

- **PRD.md**: Seção "P1.10 - Integrações (Gmail, Slack, Calendar)" (linha 292)
- **FEATURES-PRIORITIZED.md**: Features #9, #10, #14, #15 (linhas 70-122)

### Implementation Steps:

1. **Resend API Setup** (2 dias):
   - [ ] Install `resend` SDK
   - [ ] Create email templates (React Email or HTML)
   - [ ] Send quote email
   - [ ] Send order confirmation email
   - [ ] Log sent emails to activity_log

2. **Slack Integration** (2 dias):
   - [ ] Create Slack Webhook
   - [ ] Send notifications on:
     - [ ] New opportunity created
     - [ ] Deal closed (won)
     - [ ] Order confirmed
     - [ ] Order delivered
   - [ ] Format messages with rich text (blocks)

3. **Google Calendar Integration** (3 dias):
   - [ ] Setup Google Calendar API (OAuth or Service Account)
   - [ ] Create event when opportunity expected_close_date is set
   - [ ] Update event when date changes
   - [ ] Delete event when opportunity is lost
   - [ ] Store google_calendar_event_id in opportunities table

4. **Settings Page** (1 dia):
   - [ ] Add inputs for:
     - [ ] Slack Webhook URL
     - [ ] Resend API Key
     - [ ] Google Calendar credentials
   - [ ] Test buttons (send test notification)
   - [ ] Save to .env or Supabase secrets

---

## 📊 P1 Summary - Functional CRM

**Total Estimate**: 31-42 days (6-8 semanas)

**Milestone 4**: Catálogo de produtos + Importação (P1.6 + P1.7) - 10-14 dias
**Milestone 5**: Sistema de cotações + pedidos (P1.8 + P1.9) - 15-20 dias
**Milestone 6**: Integrações ativas (P1.10) - 6-8 dias

**Checkpoint de Aprovação**: CRM completo funcional. Revisar com usuário antes de P2.

---

## 🎯 Phase 3: P2 - MEDIUM PRIORITY (Weeks 15-18)

Advanced management features.

---

## Feature: P2.11 - Relatórios Gerenciais

**Priority**: P2 (MEDIUM)
**Estimate**: 7-10 days
**Dependencies**: P0.3 Oportunidades, P1.8 Cotações, P1.9 Pedidos (data histórico)
**Status**: ❌ Not Started (0%)

### Files to create/modify:

- [ ] `src/pages/Relatorios.tsx` - TODO
- [ ] `src/components/organisms/ConversionFunnelChart.tsx` - TODO
- [ ] `src/components/organisms/DREReport.tsx` - TODO
- [ ] `src/hooks/useRelatorios.ts` - TODO

### Checklist de Aceitação:

- [ ] Relatório de conversão (funil completo: leads → won)
- [ ] DRE simplificado (receitas, custos, margem)
- [ ] Análise por categoria de produto
- [ ] Análise por vendedor (assigned_to)
- [ ] Exportar para Excel/PDF
- [ ] Agendamento de relatórios (envio automático Slack) - opcional
- [ ] Filtros: período, vendedor, categoria

### Rastreabilidade:

- **PRD.md**: Seção "P2.11 - Relatórios Gerenciais" (linha 311)
- **FEATURES-PRIORITIZED.md**: Feature #16 (linha 123)

---

## Feature: P2.12 - Gestão de Equipamentos (Estoque)

**Priority**: P2 (MEDIUM)
**Estimate**: 5-7 days
**Dependencies**: P1.6 CRUD Produtos
**Status**: ❌ Not Started (0%)

### Files to create/modify:

- [ ] `src/pages/Equipamentos.tsx` - TODO
- [ ] `src/components/organisms/EquipmentTable.tsx` - TODO
- [ ] `src/hooks/useEquipamentos.ts` - TODO
- [ ] `supabase/migrations/008_create_equipments.sql` - TODO

### Checklist de Aceitação:

- [ ] CRUD de equipamentos (vinculados a produtos)
- [ ] Status: Disponível, Em Uso, Manutenção, Inativo
- [ ] Calendário de uso (timeline)
- [ ] Reservas (vincular a eventos/oportunidades)
- [ ] Histórico de manutenções (table)
- [ ] Alertas de manutenção preventiva (next_maintenance_date)

### Rastreabilidade:

- **PRD.md**: Seção "P2.12 - Gestão de Equipamentos (Estoque)" (linha 326)
- **FEATURES-PRIORITIZED.md**: Feature #12 (linha 95)

---

## Feature: P2.13 - Calendário de Eventos

**Priority**: P2 (MEDIUM)
**Estimate**: 5-7 days
**Dependencies**: P2.12 Equipamentos
**Status**: ❌ Not Started (0%)

### Files to create/modify:

- [ ] `src/pages/Eventos.tsx` - TODO
- [ ] `src/components/organisms/EventCalendar.tsx` - TODO
- [ ] `src/hooks/useEventos.ts` - TODO
- [ ] `supabase/migrations/009_create_events.sql` - TODO
- [ ] Install: `react-big-calendar` (lightweight, 50KB)

### Checklist de Aceitação:

- [ ] Calendário mensal (react-big-calendar)
- [ ] Criar evento vinculado a oportunidade
- [ ] Drag-and-drop de eventos (reschedule)
- [ ] Cores por status (confirmado, pendente, cancelado)
- [ ] Sincronização com Google Calendar (P1.10)
- [ ] Filtros: por cliente, por equipamento
- [ ] Mobile: view mês/semana/dia

### Rastreabilidade:

- **PRD.md**: Seção "P2.13 - Calendário de Eventos" (linha 341)
- **FEATURES-PRIORITIZED.md**: Feature #13 (linha 102)

---

## Feature: P2.14 - Lead Scoring com IA

**Priority**: P2 (MEDIUM)
**Estimate**: 7-10 days
**Dependencies**: Claude API, histórico de conversões (P0.3 data)
**Status**: ❌ Not Started (0%)

### Files to create/modify:

- [ ] `src/lib/claude.ts` - TODO (Claude API client)
- [ ] `supabase/functions/lead-scoring/index.ts` - TODO (Edge Function)
- [ ] `src/hooks/useLeadScoring.ts` - TODO
- [ ] `.env` - Add CLAUDE_API_KEY

### Checklist de Aceitação:

- [ ] Claude API para análise de leads
- [ ] Score 0-100 baseado em:
  - [ ] Valor do deal (20 pontos)
  - [ ] Histórico do cliente (20 pontos)
  - [ ] Tempo no funil (10 pontos)
  - [ ] Engagement (15 pontos - emails, tarefas)
- [ ] Temperatura: 🔥 Hot (>70), 🌡️ Warm (40-70), 🧊 Cold (<40)
- [ ] Atualização automática a cada 24h (Supabase Edge Function cron)
- [ ] Insights textuais ("Lead inativo há 15 dias, enviar follow-up")
- [ ] Dashboard com top 10 leads quentes

### Rastreabilidade:

- **PRD.md**: Seção "P2.14 - Lead Scoring com IA" (linha 356)
- **FEATURES-PRIORITIZED.md**: Feature #17 (linha 133)

---

## 📊 P2 Summary - Advanced Management

**Total Estimate**: 24-34 days (5-7 semanas)

**Milestone 7**: Relatórios + Equipamentos + Calendário (P2.11-13) - 17-24 dias
**Milestone 8**: IA Lead Scoring ativo (P2.14) - 7-10 dias

**Checkpoint de Aprovação**: Sistema com análise inteligente. Avaliar ROI antes de P3.

---

## 🤖 Phase 4: P3 - LOW PRIORITY / AI Features (Weeks 19+)

Nice to have features. **Recomendação**: Adiar para Ano 2.

**Features**:
- P3.15 - AI SDR (Bot WhatsApp 24/7) - ⚠️ COMPLEXO, ROI incerto
- P3.16 - Call Recording + AI Analysis - ⚠️ Riscos LGPD
- P3.17 - Multi-idioma (EN, ES) - ⏸️ Adiar
- P3.18 - Mobile App Nativo - ❌ Usar PWA ao invés

**Rastreabilidade**: PRD.md seção "P3 - BAIXA PRIORIDADE" (linha 374)

---

## 📅 Recommended Implementation Order

### **Option 1: Priority-Based (Recommended)**

**Best for**: Delivering business value incrementally.

```
Week 1: P0.1 Authentication (5 days)
Week 2: P0.2 CRUD Clientes (5 days)
Week 3: P0.3 CRUD Oportunidades (5 days)
Week 4-5: P0.4 Funil Kanban (10 days)
Week 6: P0.5 Dashboard (5 days)
---
Checkpoint 1: MVP Review with user
---
Week 7-8: P1.6 Produtos + P1.7 Importação (12 days)
Week 9-10: P1.8 Cotações (10 days)
Week 11-12: P1.9 Pedidos (10 days)
Week 13: P1.10 Integrações (7 days)
---
Checkpoint 2: Functional CRM Review
---
Week 14-15: P2.11 Relatórios (10 days)
Week 16: P2.12 Equipamentos (7 days)
Week 17: P2.13 Calendário (7 days)
Week 18-19: P2.14 Lead Scoring (10 days)
---
Checkpoint 3: Advanced Features Review
---
```

**Total: 19 weeks (95 days)**

---

### **Option 2: Feature Vertical (Full Feature at a Time)**

**Best for**: Testing complete workflows early.

```
Vertical 1: Sales Pipeline (Weeks 1-5)
  - P0.1 Auth
  - P0.2 Clientes
  - P0.3 Oportunidades
  - P0.4 Funil Kanban
  - P0.5 Dashboard

Vertical 2: Quotations & Orders (Weeks 6-10)
  - P1.6 Produtos
  - P1.8 Cotações
  - P1.9 Pedidos
  - P1.10 Integrações (email)

Vertical 3: Management & Analytics (Weeks 11-14)
  - P2.11 Relatórios
  - P2.12 Equipamentos
  - P2.13 Calendário
  - P2.14 Lead Scoring
```

---

### **Option 3: Quick Wins First (MVF - Minimum Viable Features)**

**Best for**: Getting user buy-in fast.

```
Week 1-2: Quick Setup (10 days)
  - P0.1 Auth
  - P0.2 Clientes (basic CRUD)
  - P0.5 Dashboard (static mockups)

Week 3-4: Core Sales (10 days)
  - P0.3 Oportunidades (basic CRUD)
  - P0.4 Funil Kanban (no filters, basic drag-drop)

Week 5-6: Revenue Generation (10 days)
  - P1.6 Produtos (basic CRUD)
  - P1.8 Cotações (PDF generation)

---
User Demo & Feedback
---

Week 7+: Iterate based on feedback
```

---

## 🎯 Approval Checkpoints

Critical decision points where USER MUST review before proceeding.

### **Checkpoint 1: Post-MVP (After P0)**

**When**: After P0.5 Dashboard is complete
**Duration**: 1-2 days of testing

**Review Criteria**:
- [ ] Can login/logout successfully
- [ ] Can create/edit/list clients
- [ ] Can create/edit/list opportunities
- [ ] Kanban drag-and-drop works on desktop AND mobile
- [ ] Dashboard shows real metrics
- [ ] Mobile experience is acceptable

**Go/No-Go Decision**:
- ✅ **GO**: Proceed to P1 (products, quotes, orders)
- ❌ **NO-GO**: Fix critical bugs, improve UX, re-test

---

### **Checkpoint 2: Post-Functional CRM (After P1)**

**When**: After P1.10 Integrações is complete
**Duration**: 3-5 days of testing

**Review Criteria**:
- [ ] Product catalog is usable
- [ ] Can import data from Excel
- [ ] Can create quotes and generate PDF
- [ ] Can convert quote → order
- [ ] Email/Slack/Calendar integrations work
- [ ] End-to-end workflow: Lead → Quote → Order → Delivery

**Go/No-Go Decision**:
- ✅ **GO**: Proceed to P2 (advanced features)
- ⏸️ **PAUSE**: Use in production for 2-4 weeks, gather feedback
- ❌ **NO-GO**: Fix issues, optimize performance

---

### **Checkpoint 3: Post-Advanced Features (After P2)**

**When**: After P2.14 Lead Scoring is complete
**Duration**: 1 week of testing

**Review Criteria**:
- [ ] Reports provide business insights
- [ ] Equipment management is useful
- [ ] Calendar prevents conflicts
- [ ] Lead scoring helps prioritize
- [ ] AI insights are actionable

**Go/No-Go Decision**:
- ✅ **GO**: Consider P3 features (AI SDR, etc.)
- ⏸️ **PAUSE**: Focus on adoption, training, optimization
- ❌ **STOP**: Do NOT proceed to P3 (low ROI)

---

## 🚨 Risk Mitigation Strategies

### **Risk 1: Supabase Free Tier Limits**

**Trigger**: Approaching 80% of 500MB database or 2GB storage
**Probability**: 🟡 Medium (Year 1)
**Impact**: 🔴 High (system stops working)

**Mitigation**:
1. **Monitor weekly** via Supabase Dashboard
2. **Implement data cleanup**:
   - [ ] Archive opportunities older than 12 months (move to `archived_opportunities` table)
   - [ ] Delete activity_log entries older than 6 months
   - [ ] Compress images before upload (max 500KB)
3. **Plan upgrade**: Budget for Supabase Pro ($25/month) if needed

---

### **Risk 2: Protocol Notecraft™ Line Limits**

**Trigger**: Complex component exceeds 50 lines
**Probability**: 🟡 Medium
**Impact**: 🟢 Low (refactor required)

**Mitigation**:
1. **Use composition**: Break into smaller components
2. **Extract hooks**: Move logic to custom hooks
3. **Accept exceptions**: Document why component is >50 lines (valid reason)

**Example**:
```tsx
// ❌ BAD: FunilVendas.tsx (120 lines)

// ✅ GOOD: Split into:
// - FunilVendas.tsx (30 lines) - layout wrapper
// - KanbanBoard.tsx (50 lines) - board logic
// - KanbanColumn.tsx (35 lines) - column
// - OpportunityCard.tsx (35 lines) - card
// - useFunil.ts (hook) - data fetching
```

---

### **Risk 3: Mobile Drag-and-Drop UX**

**Trigger**: dnd-kit doesn't work well on mobile
**Probability**: 🟡 Medium
**Impact**: 🟡 Medium (degraded UX)

**Mitigation**:
1. **Test early**: Test on real Android + iOS devices in Week 4
2. **Fallback UI**: Add "Mover para..." buttons on mobile if drag fails
3. **Alternative library**: Consider `react-beautiful-dnd` if dnd-kit fails

---

### **Risk 4: Timeline Overrun (Scope Creep)**

**Trigger**: User requests "just one more feature"
**Probability**: 🔴 High (natural behavior)
**Impact**: 🟡 Medium (delays launch)

**Mitigation**:
1. **Strict prioritization**: Refer to this document
2. **Feature backlog**: Add to P3 or "Future" list
3. **Weekly check-ins**: Review progress vs. plan
4. **Kill scope**: If >20% behind, remove P2 features

---

## 📊 Progress Tracking

### **Weekly Progress Report Template**

```markdown
## Week X Progress Report

**Completed**:
- ✅ Feature X (3 days, on schedule)
- ✅ Feature Y (5 days, 1 day over estimate)

**In Progress**:
- 🔄 Feature Z (70% complete, on track)

**Blockers**:
- ⚠️ Supabase RLS policy not working (investigating)

**Next Week**:
- [ ] Complete Feature Z
- [ ] Start Feature A
- [ ] Test mobile UX

**Risks**:
- 🟡 Behind schedule by 2 days (acceptable)
```

---

### **Burndown Chart (Track P0 Progress)**

| Feature | Estimate | Actual | Status |
|---------|----------|--------|--------|
| P0.1 Auth | 5 days | TBD | ❌ Not Started |
| P0.2 Clientes | 7 days | TBD | ❌ Not Started |
| P0.3 Oportunidades | 7 days | TBD | ❌ Not Started |
| P0.4 Funil Kanban | 10 days | TBD | ❌ Not Started |
| P0.5 Dashboard | 6 days | TBD | ❌ Not Started |
| **TOTAL P0** | **35 days** | **0 days** | **0%** |

---

## 🎓 Knowledge Transfer & Documentation

### **User Documentation** (Create during development)

- [ ] `docs/USER-GUIDE.md` - How to use the CRM
- [ ] `docs/ADMIN-GUIDE.md` - How to configure integrations
- [ ] `docs/FAQ.md` - Frequently asked questions
- [ ] `docs/TROUBLESHOOTING.md` - Common issues and fixes

### **Developer Documentation** (Maintain as you code)

- [ ] `docs/ARCHITECTURE.md` - Already exists, keep updated
- [ ] `docs/COMPONENT-LIBRARY.md` - Storybook or manual docs
- [ ] `docs/API-REFERENCE.md` - Supabase schema + hooks
- [ ] `docs/DEPLOYMENT.md` - How to deploy to Vercel

### **Training Plan** (Week 18-19)

1. **Admin Training** (2 hours):
   - Setup Supabase, Resend, Slack integrations
   - Configure funis, produtos, usuários
   - Import data from Excel

2. **User Training** (3 hours):
   - Login, navegação
   - CRUD Clientes, Oportunidades
   - Funil Kanban (drag-and-drop)
   - Criar cotações e pedidos
   - Dashboard e relatórios

---

## ✅ Definition of Done (DoD)

For each feature to be considered "complete":

- [ ] **Code**:
  - [ ] All files created/modified as specified
  - [ ] TypeScript strict mode (no `any`)
  - [ ] Protocol Notecraft™ line limits followed
  - [ ] Tailwind CSS (no inline styles)
  - [ ] Components use STAGETEK design tokens

- [ ] **Functionality**:
  - [ ] All acceptance criteria met
  - [ ] Works on desktop (Chrome, Firefox, Safari)
  - [ ] Works on mobile (iOS Safari, Android Chrome)
  - [ ] Dark mode supported

- [ ] **Quality**:
  - [ ] No console errors
  - [ ] Loading states for async operations
  - [ ] Error handling (try/catch, display errors)
  - [ ] Form validation works
  - [ ] Lighthouse score >85 (performance, accessibility)

- [ ] **Data**:
  - [ ] Supabase schema migrated
  - [ ] RLS policies created and tested
  - [ ] Sample data seeded for testing

- [ ] **Documentation**:
  - [ ] Code comments for complex logic
  - [ ] User-facing feature documented in USER-GUIDE.md
  - [ ] Component added to Storybook (if applicable)

- [ ] **Review**:
  - [ ] Tested by developer
  - [ ] Tested by user (if checkpoint)
  - [ ] Approved by Product Manager (you)

---

## 🏁 Final Deliverables (End of Phase 2)

After completing P0 + P1 + P2, the system will have:

### **User-Facing Features**:
- ✅ Authentication (login/logout/recovery)
- ✅ CRUD Clientes (with CNPJ autocomplete)
- ✅ CRUD Oportunidades (with qualification)
- ✅ Funil de Vendas Kanban (drag-and-drop)
- ✅ Dashboard (real metrics)
- ✅ CRUD Produtos (catalog)
- ✅ Importação Excel
- ✅ Sistema de Cotações (PDF generation)
- ✅ Sistema de Pedidos (tracking)
- ✅ Integrações (Email, Slack, Calendar)
- ✅ Relatórios Gerenciais
- ✅ Gestão de Equipamentos
- ✅ Calendário de Eventos
- ✅ Lead Scoring com IA

### **Technical Deliverables**:
- ✅ React 18 + TypeScript app (Vite)
- ✅ Supabase backend (PostgreSQL + Auth + Storage)
- ✅ Tailwind CSS + STAGETEK design system
- ✅ Atomic Design components (atoms/molecules/organisms)
- ✅ Mobile-first PWA (installable)
- ✅ Vercel deployment (auto-deploy from GitHub)
- ✅ RLS policies (secure data)
- ✅ Integrations (Resend, Slack, Google Calendar, Claude API)

### **Documentation**:
- ✅ User Guide
- ✅ Admin Guide
- ✅ Developer Documentation
- ✅ Architecture Diagrams
- ✅ API Reference (Supabase schema + hooks)

---

## 🚀 Success Criteria

The implementation is **successful** if:

1. **All P0 + P1 features** are complete and working
2. **5 usuários** can use the system daily without major issues
3. **Mobile experience** is acceptable (Lighthouse >85)
4. **Data is secure** (RLS policies tested)
5. **System is fast** (<3s page load, <1s interactions)
6. **User training** is complete (team knows how to use)
7. **Adoption rate** >80% in first month
8. **Zero critical bugs** in production

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
**Data**: 3 de Outubro de 2025

**Next Steps**:
1. ✅ Review and approve this implementation plan
2. 🔄 Begin P0.1 Authentication (Week 1)
3. 📅 Schedule weekly check-ins
4. 📊 Setup progress tracking (GitHub Projects or Trello)
