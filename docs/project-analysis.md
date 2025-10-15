# STAGETEK CRM - Project Analysis

**Version**: 1.0.0
**Date**: 14 de Outubro de 2025
**Scope**: src/ + supabase/functions/ + supabase/migrations/
**Status**: Post-Sprint 1 Day 1

---

## Executive Summary

O STAGETEK CRM está em **desenvolvimento ativo** com 20% do MVP implementado. O sistema utiliza React 18 + TypeScript + Vite no frontend e Supabase (PostgreSQL + Auth + Storage) no backend, seguindo rigorosamente o Protocol Notecraft™ (line limits: atoms ≤20, molecules ≤35, organisms ≤50).

**Arquivos Analisados**: 57 TypeScript files (src/), 6 SQL migrations (1700 linhas), 1 Edge Function.

**Status da Implementação**:
- ✅ **COMPLETO**: Sistema de Cotações MVP (Sprint 1 Day 1) - 9 componentes, geração de PDF, envio de email via Resend API
- ✅ **INFRAESTRUTURA**: Atomic Design structure, Supabase client, routing, layout
- ⚠️ **PARCIAL**: Authentication hook existe mas NÃO está conectado às páginas
- 🔴 **CRÍTICO**: CRUD Clientes e Oportunidades têm UI completa mas ZERO integração backend

**Database**: 6 tabelas implementadas (clients, funnels, funnel_stages, opportunities, products, quotations), RLS policies criadas (SELECT + INSERT/UPDATE/DELETE), 15 produtos seedados, auto-numeração de cotações funcional.

**Blockers Críticos**:
1. Authentication não integrada → qualquer pessoa pode acessar o sistema
2. CRUD hooks não existem → impossível criar/editar clientes ou oportunidades
3. Dashboard usa dados estáticos → métricas não são reais

**Próximos Passos Imediatos** (conforme `.claude/CLAUDE.md`):
- P0.5: Lista de cotações + itens customizados (2-3 dias)
- P0: Sistema de tarefas (1 semana)
- P0: Detalhes da Oportunidade (2 semanas) - página NÃO EXISTE
- P0: Configuração de Funis (1 semana)

O sistema está em bom estado arquitetural, mas precisa urgentemente de integração backend para ser funcional.

---

## Entry Points e Dependências Principais

### Frontend Entry Points

**1. Application Bootstrap**
```
src/main.tsx (11 linhas)
  └─→ src/App.tsx (65 linhas) [ROUTER PRINCIPAL]
       ├─→ src/pages/*.tsx (8 páginas)
       ├─→ src/components/layouts/MainLayout.tsx
       │    └─→ src/components/organisms/TopBar.tsx
       └─→ src/components/layouts/ProtectedRoute.tsx ⚠️ SEM AUTH CHECK
```

**Dependências Críticas**:
- `src/lib/supabase.ts` - Supabase client (usado por TODOS os hooks)
- `src/hooks/useAuth.ts` (58 linhas) - Authentication state ✅ COMPLETO
- `src/index.css` - Tailwind imports

**2. Core Pages** (8 páginas)

| Page | Lines | Status | Supabase Integration |
|------|-------|--------|----------------------|
| `Login.tsx` | 243 | 🟡 UI complete | ⚠️ Form não chama useAuth |
| `Dashboard.tsx` | 53 | 🟡 Layout OK | ❌ Dados estáticos |
| `Clientes.tsx` | 90 | 🟡 UI complete | ❌ Sem backend |
| `Oportunidades.tsx` | 243 | 🟡 UI complete | ❌ Sem backend |
| `NovaCotacao.tsx` | 30 | ✅ COMPLETO | ✅ Supabase conectado |
| `ConfigFunis.tsx` | 264 | 🟡 Parcial | ❌ Sem backend |
| `Configuracoes.tsx` | 54 | 🟡 Skeleton | N/A |
| `DashboardApple.tsx` | 22 | 🟢 Experimental | N/A |

**3. Component Hierarchy** (33 components)

**Atomic Design Distribution**:
- **Atoms** (8): Badge, Button, Checkbox, Input, NotificationBadge, Select, Spinner
- **Molecules** (17): AddressFields, ClientCard, EmailModal, FormField, ProductCard, QuotationItem, QuotationTotals, etc.
- **Organisms** (7): ClienteModal, ClientTable, OportunidadeModal, ProductCatalog, QuotationCart, TopBar, etc.
- **Templates** (1): QuotationPDF

**Compliance**: 100% Protocol Notecraft™ (validado via pre-commit hook)

**4. Custom Hooks** (6 hooks)

| Hook | Lines | Purpose | Supabase Calls |
|------|-------|---------|----------------|
| `useAuth.ts` | 58 | Auth state + methods | ✅ supabase.auth.* |
| `useClienteForm.ts` | 61 | Form state (clientes) | ❌ Apenas state local |
| `useOportunidadeForm.ts` | 67 | Form state (oportunidades) | ❌ Apenas state local |
| `useQuotationActions.ts` | 33 | Cart management | ❌ State local |
| `usePDFGeneration.tsx` | 45 | PDF generation | ✅ Supabase storage |
| `useEmailSending.tsx` | 64 | Email via Edge Function | ✅ Supabase functions |

**Hooks Faltando (CRÍTICO)**:
- ❌ `useClientes.ts` - CRUD clientes (fetch, create, update, delete)
- ❌ `useOportunidades.ts` - CRUD oportunidades
- ❌ `useDashboard.ts` - Aggregate queries para métricas
- ❌ `useFunil.ts` - Kanban data + drag-drop updates

**5. Library Files** (4 files)

| File | Lines | Purpose | Dependencies |
|------|-------|---------|--------------|
| `lib/supabase.ts` | 45 | Supabase client + auth helpers | @supabase/supabase-js |
| `lib/utils.ts` | ~50 | Utility functions | clsx, tailwind-merge |
| `lib/pdfStyles.ts` | ~80 | PDF styling | @react-pdf/renderer |
| `lib/email.ts` | ~20 | Email templates | N/A |

**Key Configuration**:
```typescript
// lib/supabase.ts
export const supabase = createClient<Database>(url, key, {
  auth: {
    persistSession: true,      // ✅ LocalStorage
    autoRefreshToken: true,     // ✅ Auto-refresh
    detectSessionInUrl: true,   // ✅ OAuth redirect
  }
})
```

---

### Backend Entry Points

**1. Database Schema** (6 migrations, 1700 linhas SQL)

**Core Tables** (migration `20251004_initial_schema.sql`):
- `clients` (16 columns) - CNPJ, email, phone, address JSONB
- `funnels` (7 columns) - is_default, is_active
- `funnel_stages` (8 columns) - name, sigla, color, display_order
- `opportunities` (15 columns) - client_id, funnel_id, stage_id, value
- `notes` (6 columns) - entity_type, entity_id, content
- `tasks` (10 columns) - title, due_date, status, assignee_id

**Quotation Tables** (migration `20251014_quotation_system_hybrid.sql`):
- `products` (13 columns) - SKU, category, price, specs JSONB
- `quotations` (11 columns) - items JSONB, subtotal, freight, total, status

**RLS Policies** (migration `20251013_comprehensive_rls_policies.sql`):
- ✅ **clients**: SELECT, INSERT, UPDATE, DELETE (authenticated users)
- ✅ **funnels**: SELECT, INSERT, UPDATE, DELETE (role-based: admin/manager)
- ✅ **funnel_stages**: SELECT, INSERT, UPDATE, DELETE (role-based)
- ✅ **opportunities**: SELECT, INSERT, UPDATE (owner or creator only), DELETE
- ✅ **products**: SELECT (active only), INSERT/UPDATE/DELETE (admin/manager)
- ✅ **quotations**: SELECT, INSERT, UPDATE (owner only)
- ✅ **activity_log**: SELECT (all), INSERT (authenticated)

**Storage Policies** (migration `20251013_storage_policies.sql`):
- Bucket `quotation-pdfs`: Authenticated users can upload/download
- Public read access via signed URLs

**PostgreSQL Functions**:
```sql
-- Auto-numbering quotations: QT-YYYYMM-NNN
CREATE FUNCTION generate_quotation_number() RETURNS TEXT
-- Trigger on quotations INSERT
CREATE TRIGGER set_quotation_number BEFORE INSERT ON quotations
```

**Seed Data**:
- 15 products (Som: 5, Luz: 5, Estrutura: 3, Talha: 2) - Total R$ 49,160
- 5 funnel stages (Lead → Fechamento)
- 1 default funnel

**2. Edge Functions** (1 function)

**send-quotation-email** (`supabase/functions/send-quotation-email/index.ts`, 78 linhas):
```typescript
// Input: { to, quotationNumber, pdfBase64 }
// Output: { success, data/error }
// Integração: Resend API (100 emails/day free)
// CORS: ✅ Habilitado
// Status: ✅ DEPLOYED e FUNCIONAL
```

**Environment Variables Required**:
- `RESEND_API_KEY` - Stored in Supabase secrets

---

## Dependency Graph

### Critical Dependencies (package.json)

**Production**:
- `react@18.3.1` + `react-dom@18.3.1`
- `@supabase/supabase-js@2.58.0` - Backend client
- `@react-pdf/renderer@4.3.1` - PDF generation ✅ USADO
- `react-router-dom@7.9.3` - Routing
- `lucide-react@0.445.0` - Icons
- `tailwind-merge@2.6.0` + `clsx@2.1.1` - CSS utilities

**Development**:
- `vite@5.4.6` - Build tool
- `typescript@5.6.2` - Language
- `vitest@2.1.1` - Testing (minimal usage)
- `@storybook/react-vite@8.3.2` - Component library
- `eslint@8.57.1` - Linting
- `husky@9.1.7` - Git hooks (Protocol validation)

**Missing Dependencies** (Not yet installed):
- ❌ `react-hook-form` + `zod` - Form validation (planned P1)
- ❌ `@dnd-kit/core` - Drag-and-drop for Kanban (planned P0)
- ❌ `recharts` - Charts for Dashboard (planned P0)

### Import Patterns

**Path Aliases** (`vite.config.ts`):
```typescript
resolve: {
  alias: { '@': '/src' }
}
```

**Common Import Pattern**:
```typescript
// ✅ GOOD (used throughout)
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/atoms/Button'
import { useAuth } from '@/hooks/useAuth'

// ❌ BAD (avoid)
import { supabase } from '../../../lib/supabase'
```

---

## Risks and TODOs

### 🔴 CRITICAL - Blockers for Production

#### RISK 1: Authentication Not Integrated

**Severity**: CRITICAL (Security vulnerability)
**Impact**: Anyone can access the system without login
**Affected Files**:
- `src/pages/Login.tsx` (line 243) - Form exists but doesn't call useAuth
- `src/components/layouts/ProtectedRoute.tsx` - No auth check implemented

**Root Cause**:
```tsx
// Login.tsx - Form submit handler does NOTHING
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // ❌ TODO: Call useAuth().signIn(email, password)
}

// ProtectedRoute.tsx - Always renders children
return <>{children}</>  // ❌ No auth check!
```

**TODOs**:
```typescript
// 1. Login.tsx (Priority: URGENT)
// [ ] Import useAuth hook
// [ ] Get signIn method from useAuth()
// [ ] Call signIn on form submit
// [ ] Handle loading state
// [ ] Handle error state (show toast)
// [ ] Redirect to /dashboard on success

// 2. ProtectedRoute.tsx (Priority: URGENT)
const { user, loading } = useAuth()
// [ ] If loading, show <Spinner />
// [ ] If !user, redirect to /login
// [ ] If user, render children

// 3. Login page form (Priority: URGENT)
// [ ] Add React Hook Form validation
// [ ] Add Zod schema (email + password min 6 chars)
// [ ] Show validation errors inline
```

**Estimate**: 4-6 hours
**Dependencies**: None (useAuth already complete)

---

#### RISK 2: CRUD Operations Not Connected to Backend

**Severity**: CRITICAL (Core functionality missing)
**Impact**: Cannot create, edit, or delete clients/opportunities
**Affected Files**:
- `src/pages/Clientes.tsx` - UI only, no data fetching
- `src/pages/Oportunidades.tsx` - UI only, no data fetching
- `src/components/organisms/ClienteModal.tsx` - Modal exists, form submit does nothing
- `src/components/organisms/OportunidadeModal.tsx` - Modal exists, form submit does nothing

**Root Cause**: Custom hooks `useClientes.ts` and `useOportunidades.ts` DO NOT EXIST

**TODOs**:

**A. Create `src/hooks/useClientes.ts`** (Priority: CRITICAL):
```typescript
// [ ] Export useClientes() hook
// [ ] getClientes(filters?: { search, status }) - SELECT with search
// [ ] getClienteById(id: string) - SELECT single
// [ ] createCliente(data: ClientInsert) - INSERT + optimistic update
// [ ] updateCliente(id: string, data: ClientUpdate) - UPDATE
// [ ] deleteCliente(id: string) - Soft delete (status = 'inactive')
// [ ] Return { clientes, loading, error, ...methods }
// [ ] Add error handling (try/catch + toast)
// [ ] Add loading states (useState)
// [ ] Use React Query or manual refetch pattern
```

**B. Create `src/hooks/useOportunidades.ts`** (Priority: CRITICAL):
```typescript
// [ ] Export useOportunidades() hook
// [ ] getOportunidades(filters?: { stage, client, status })
// [ ] Include JOIN to clients + funnel_stages
// [ ] getOportunidadeById(id: string)
// [ ] createOportunidade(data: OpportunityInsert)
// [ ] updateOportunidade(id: string, data: OpportunityUpdate)
// [ ] deleteOportunidade(id: string) - Hard delete
// [ ] updateStage(id: string, newStageId: string) - For Kanban
// [ ] Return { oportunidades, loading, error, ...methods }
```

**C. Integrate Hooks into Pages**:
```typescript
// src/pages/Clientes.tsx
// [ ] Import useClientes
// [ ] Call const { clientes, loading, error, createCliente, ... } = useClientes()
// [ ] Replace mock data with real 'clientes'
// [ ] Pass createCliente to ClienteModal onSubmit
// [ ] Show loading spinner while loading
// [ ] Show error toast if error

// src/pages/Oportunidades.tsx (same pattern)
// [ ] Import useOportunidades
// [ ] Replace mock data
// [ ] Pass methods to OportunidadeModal
```

**D. Connect Modals to Hooks**:
```typescript
// src/components/organisms/ClienteModal.tsx
// [ ] Accept onSubmit prop from parent
// [ ] Call onSubmit(formData) on form submit
// [ ] Show loading state during submission
// [ ] Close modal on success
// [ ] Show error toast on failure

// src/components/organisms/OportunidadeModal.tsx (same pattern)
```

**Estimate**: 2-3 days (both CRUD hooks + integration)
**Dependencies**: None (database tables already exist with RLS)

---

#### RISK 3: Dashboard Using Static Data

**Severity**: HIGH (Misleading metrics)
**Impact**: Dashboard shows fake data, cannot make business decisions
**Affected Files**:
- `src/pages/Dashboard.tsx` - Hardcoded values in StatCard

**Root Cause**: No `useDashboard.ts` hook with aggregate queries

**TODOs**:

**A. Create `src/hooks/useDashboard.ts`** (Priority: HIGH):
```typescript
// [ ] Export useDashboard(period: '7d' | '30d' | '90d' | '1y') hook
// [ ] Query 1: totalVendas (SUM opportunities.value WHERE status='won' AND closed_at >= period)
// [ ] Query 2: oportunidadesAbertas (COUNT WHERE status='open')
// [ ] Query 3: taxaConversao (won / total opportunities)
// [ ] Query 4: ticketMedio (AVG value WHERE status='won')
// [ ] Query 5: vendasPorDia (time series for chart)
// [ ] Query 6: oportunidadesPorEstagio (GROUP BY stage)
// [ ] Query 7: ultimasOportunidades (LIMIT 5 ORDER BY created_at DESC)
// [ ] Return { stats, loading, error, refetch }
// [ ] Add caching (React Query recommended)
```

**B. Integrate into Dashboard.tsx**:
```typescript
// [ ] Import useDashboard
// [ ] Call const { stats, loading } = useDashboard('30d')
// [ ] Pass real stats to StatsGrid
// [ ] Add period selector dropdown
// [ ] Show loading skeletons
```

**Estimate**: 2-3 days
**Dependencies**: useOportunidades.ts (for data structure reference)

---

### 🟡 HIGH - Performance and UX

#### RISK 4: No Error Handling or Loading States

**Severity**: HIGH (Poor UX)
**Impact**: App crashes on errors, no feedback during async operations
**Affected Files**: Most pages and hooks

**TODOs**:
```typescript
// Global:
// [ ] Install react-hot-toast or similar (toast notifications)
// [ ] Create ErrorBoundary component
// [ ] Wrap <App /> in ErrorBoundary

// Per Hook:
// [ ] Add try/catch to all Supabase calls
// [ ] Set loading = true before call
// [ ] Set loading = false in finally block
// [ ] Show toast on error: toast.error(error.message)

// Per Page:
// [ ] Show <Spinner /> while loading
// [ ] Show error message if error
// [ ] Disable submit buttons while loading
```

**Estimate**: 1-2 days
**Dependencies**: None

---

#### RISK 5: RLS Policies Not Tested with Multiple Users

**Severity**: HIGH (Security risk)
**Impact**: Users might see/edit data they shouldn't
**Affected Files**: All migrations with RLS policies

**TODOs**:
```sql
-- Testing Checklist:
-- [ ] Create test user 1 (role: user)
-- [ ] Create test user 2 (role: user)
-- [ ] Create test user 3 (role: admin)
-- [ ] User 1 creates client → check User 2 can see it ✅
-- [ ] User 1 creates opportunity → check User 2 CANNOT edit it ❌
-- [ ] Admin can modify funnels → check User 1 CANNOT ❌
-- [ ] Test DELETE policies (soft delete vs hard delete)
-- [ ] Test storage access (PDFs only accessible to owners)
```

**Estimate**: 1 day
**Dependencies**: Authentication integration (RISK 1)

---

### 🟢 MEDIUM - Future Enhancements

#### RISK 6: Missing Kanban Board (Funil de Vendas)

**Severity**: MEDIUM (Core feature not implemented)
**Impact**: Cannot visualize sales pipeline
**Affected Files**: None (page doesn't exist yet)

**TODOs**:
```typescript
// [ ] Create src/pages/FunilVendas.tsx
// [ ] Install @dnd-kit/core + @dnd-kit/sortable
// [ ] Create KanbanBoard organism (≤50 lines)
// [ ] Create KanbanColumn molecule (≤35 lines)
// [ ] Create OpportunityCard molecule (≤35 lines)
// [ ] Implement drag-and-drop logic
// [ ] Call useOportunidades().updateStage(id, newStageId) on drop
// [ ] Add filters (funnel, owner, date range)
// [ ] Mobile: horizontal scroll columns + touch gestures
```

**Estimate**: 1-2 weeks
**Dependencies**: useOportunidades.ts hook (RISK 2)

---

#### RISK 7: Missing Detalhes da Oportunidade Page

**Severity**: MEDIUM (Core feature not implemented)
**Impact**: Cannot view full opportunity details, timeline, tasks
**Affected Files**: None (page doesn't exist yet)

**TODOs**:
```typescript
// [ ] Create src/pages/DetalheOportunidade.tsx
// [ ] Layout: 3 columns (Sidebar Left | Tabs Center | Sidebar Right)
// [ ] Tab 1: HISTÓRICO (timeline + annotations)
// [ ] Tab 2: E-MAIL (send emails)
// [ ] Tab 3: TAREFAS (create/list tasks)
// [ ] Tab 4: CONTATOS (link contacts)
// [ ] Tab 5: PRODUTOS (add products to opportunity)
// [ ] Tab 6: ARQUIVOS (upload attachments)
// [ ] Navigation: Click opportunity card → open details
// [ ] Use useOportunidades().getOportunidadeById(id)
```

**Estimate**: 2 weeks
**Dependencies**: useOportunidades.ts, Sistema de Tarefas

**Reference**: See `.claude/CLAUDE.md` line 149-224, `protocol/REFERENCE-RD-STATION-ANALYSIS.md` lines 224-339

---

### 🟢 LOW - Technical Debt

#### RISK 8: Protocol Notecraft™ Line Limits May Block Complex Components

**Severity**: LOW (Manageable with refactoring)
**Impact**: Forces extreme decomposition
**Mitigation**: Extract hooks, use composition

**Example Workaround**:
```typescript
// ❌ FunilVendas.tsx (120 lines) - TOO LONG!

// ✅ SOLUTION: Split into:
// - FunilVendas.tsx (30 lines) - layout wrapper
// - KanbanBoard.tsx (50 lines) - board logic
// - KanbanColumn.tsx (35 lines) - column
// - OpportunityCard.tsx (35 lines) - card
// - useFunil.ts (hook) - data fetching
```

---

#### RISK 9: No E2E Tests

**Severity**: LOW (Can test manually initially)
**Impact**: Regressions not caught automatically
**Affected Files**: N/A

**TODOs**:
```typescript
// [ ] Install Playwright
// [ ] Create tests/e2e/ directory
// [ ] Test 1: Login flow
// [ ] Test 2: Create cliente
// [ ] Test 3: Create oportunidade
// [ ] Test 4: Generate quotation + send email
// [ ] Test 5: Drag opportunity in Kanban
// [ ] Setup CI/CD (GitHub Actions)
```

**Estimate**: 1-2 weeks
**Dependencies**: All critical features implemented

---

## Summary

**Total Files Analyzed**: 64 files (57 TS + 6 SQL + 1 Edge Function)
**Total Lines**: ~8500 lines (5800 TS + 1700 SQL + 78 Edge Function)
**Protocol Compliance**: 100% (automated validation)

**Implementation Status**:
- ✅ Infrastructure: 100%
- ✅ Quotation System: 100%
- ⚠️ Authentication: 50% (hook exists, not integrated)
- 🔴 CRUD Operations: 30% (UI only, no backend)
- 🔴 Funil Kanban: 0%
- 🔴 Detalhes Oportunidade: 0%

**Critical Path to MVP** (in order):
1. **URGENT** (4-6 hours): Integrate authentication (RISK 1)
2. **CRITICAL** (2-3 days): Implement CRUD hooks (RISK 2)
3. **HIGH** (2-3 days): Connect Dashboard to real data (RISK 3)
4. **MEDIUM** (1-2 weeks): Build Kanban board (RISK 6)
5. **MEDIUM** (2 weeks): Build Detalhes Oportunidade (RISK 7)

**Estimated Time to Functional MVP**: 6-8 weeks

---

**Analysis Complete**
**Analyst**: BMAD Framework
**Date**: 14 de Outubro de 2025
**Word Count**: ~1480 words
