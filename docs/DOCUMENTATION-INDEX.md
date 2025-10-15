# STAGETEK CRM - Documentation Index

**Version**: 1.0.0
**Date**: 14 de Outubro de 2025
**Purpose**: Central navigation for all project documentation

---

## 🚀 Quick Start for AI Agents

### CRITICAL: Read These First (in order)

1. **`.claude/CLAUDE.md`** - ⭐ START HERE
   - Project overview and current status
   - Sprint 1 Day 1 completion details
   - Next priorities (P0.5, P0, P1)
   - Protocol Notecraft™ rules
   - ~2000 lines of critical context

2. **`docs/brownfield-architecture.md`** - THIS DOCUMENT
   - ACTUAL state of the codebase
   - What's implemented vs. what's planned
   - Technical debt and known issues
   - Navigation guide for AI agents
   - ~800 lines of architectural reality

3. **`protocol/CURRENT-FEATURES-PRIORITIZED.md`**
   - P0/P1/P2/P3 feature prioritization
   - RICE scores
   - Dependencies
   - Estimates

4. **`protocol/CURRENT-IMPLEMENTATION-PLAN.md`**
   - Detailed roadmap (1369 lines)
   - Feature breakdown
   - Acceptance criteria
   - Timeline

---

## 📚 Documentation Structure

### Product Documentation

| Document | Purpose | Lines | Status |
|----------|---------|-------|--------|
| `protocol/SPECS-PRD.md` | Product Requirements Document | 995 | ✅ Complete |
| `protocol/REFERENCE-RD-STATION-ANALYSIS.md` | UI/UX analysis (reference design) | 1200 | ✅ Complete |
| `protocol/CURRENT-FEATURES-PRIORITIZED.md` | Feature prioritization (P0-P3) | ~200 | ✅ Complete |
| `protocol/VALUE-PROPOSITION.md` | Business value and OKRs | ~150 | ✅ Complete |
| `protocol/USER-STORIES.md` | User stories and acceptance criteria | ~250 | ✅ Complete |

### Technical Documentation

| Document | Purpose | Lines | Status |
|----------|---------|-------|--------|
| **`docs/brownfield-architecture.md`** | **Current system architecture** | **800** | **✅ NEW** |
| `protocol/SPECS-ARCHITECTURE.md` | System architecture design | ~600 | ✅ Complete |
| `protocol/SPECS-DATABASE-SCHEMA.md` | Complete database schema + queries | 463 | ✅ Complete |
| `protocol/REFERENCE-DATABASE-SCHEMA-V2.md` | Schema v2 evolution | ~400 | ✅ Complete |
| `protocol/REFERENCE-SCHEMA-QUICK.md` | Quick schema reference | ~150 | ✅ Complete |
| `protocol/CURRENT-TECH-STACK.md` | Technology stack justification | ~300 | ✅ Complete |
| `protocol/SPECS-ARCHITECTURE-MOBILE.md` | Mobile/PWA strategy | ~250 | ✅ Complete |
| `protocol/TECH-DEBT.md` | Known technical debt | ~100 | ✅ Complete |

### Development Standards

| Document | Purpose | Lines | Status |
|----------|---------|-------|--------|
| `protocol/CURRENT-PROTOCOL-NOTECRAFT.md` | Code standards (line limits, patterns) | ~400 | ✅ Complete |
| `protocol/CURRENT-BRANDING-STANDARDS.md` | Design tokens, colors, typography | ~200 | ✅ Complete |
| `protocol/REFERENCE-DESIGN-SYSTEM.md` | Component design system | ~300 | ✅ Complete |
| `protocol/REFERENCE-UI-PATTERNS.md` | UI patterns and conventions | ~250 | ✅ Complete |

### Planning and Roadmap

| Document | Purpose | Lines | Status |
|----------|---------|-------|--------|
| `protocol/CURRENT-IMPLEMENTATION-PLAN.md` | Detailed implementation roadmap | 1369 | ✅ Complete |
| `protocol/CURRENT-ROADMAP-PHASES.md` | 6-phase roadmap overview | ~300 | ✅ Complete |
| `protocol/ROADMAP-PHASES.md` | Alternative roadmap view | ~250 | ✅ Complete |

### Reference Materials

| Document | Purpose | Lines | Status |
|----------|---------|-------|--------|
| `docs/REFERENCE-Blueprint-API.md` | API blueprint examples | ~400 | 📖 Reference |
| `docs/REFERENCE-Journeys-Canonicas.md` | Canonical user journeys | ~300 | 📖 Reference |
| `docs/REFERENCE-Menus-Jornadas.md` | Menu structures and flows | ~200 | 📖 Reference |
| `docs/REFERENCE-Modelo-Dados-Minimo.md` | Minimum data model | ~150 | 📖 Reference |
| `docs/REFERENCE-Spec-Tecnico-Clone.md` | Technical spec reference | ~500 | 📖 Reference |
| `docs/RD_Station_CRM_small_bundle/` | Screenshots and analysis | - | 📸 Images |

---

## 🎯 Navigation by Task Type

### I Want to... Understand the Business

**Start with**:
1. `protocol/SPECS-PRD.md` - What are we building and why?
2. `protocol/VALUE-PROPOSITION.md` - Business value
3. `protocol/REFERENCE-RD-STATION-ANALYSIS.md` - How should it look?

### I Want to... Understand the Code

**Start with**:
1. **`docs/brownfield-architecture.md`** - Current state of codebase
2. `src/App.tsx` - Routing and navigation
3. `src/lib/supabase.ts` - Backend client
4. `protocol/CURRENT-PROTOCOL-NOTECRAFT.md` - Coding standards

### I Want to... Understand the Database

**Start with**:
1. `protocol/SPECS-DATABASE-SCHEMA.md` - Complete schema
2. `protocol/REFERENCE-SCHEMA-QUICK.md` - Quick reference
3. `supabase/migrations/` - Actual SQL migrations
4. `supabase/seed.sql` - Sample data

### I Want to... Implement a Feature

**Start with**:
1. `.claude/CLAUDE.md` - Check priority (P0/P1/P2/P3)
2. `protocol/CURRENT-IMPLEMENTATION-PLAN.md` - Find feature details
3. `protocol/CURRENT-FEATURES-PRIORITIZED.md` - Understand dependencies
4. **`docs/brownfield-architecture.md`** - Understand current state
5. `protocol/USER-STORIES.md` - Acceptance criteria

### I Want to... Fix a Bug

**Start with**:
1. **`docs/brownfield-architecture.md`** - Technical debt section
2. `protocol/TECH-DEBT.md` - Known issues
3. Browser console + Supabase logs - Debugging

### I Want to... Add a Component

**Start with**:
1. `protocol/CURRENT-PROTOCOL-NOTECRAFT.md` - Line limits and rules
2. `protocol/REFERENCE-DESIGN-SYSTEM.md` - Design tokens
3. `src/components/` - Existing component structure
4. Run `npm run validate:notecraft` - Validate compliance

### I Want to... Deploy

**Start with**:
1. **`docs/brownfield-architecture.md`** - Deployment section
2. `README.md` - Quick start
3. `.env.example` - Environment variables
4. Check Vercel/Supabase dashboards

---

## 🏗️ System Architecture Quick Links

### Frontend

**Tech**: React 18 + TypeScript + Vite + Tailwind CSS

**Key Files**:
- Entry: `src/main.tsx`
- Router: `src/App.tsx`
- Layout: `src/components/layouts/MainLayout.tsx`
- Components: `src/components/{atoms,molecules,organisms,templates}/`

**Routing**:
- `/login` - Login page
- `/dashboard` - Main dashboard
- `/clientes` - Clients CRUD
- `/oportunidades` - Opportunities CRUD
- `/oportunidades/:id/cotacao/nova` - New quotation
- `/funil` - Sales funnel Kanban (planned)
- `/configuracoes/*` - Settings pages

### Backend

**Tech**: Supabase (PostgreSQL + Auth + Storage + Edge Functions)

**Key Components**:
- Database: PostgreSQL 15
- Auth: Supabase Auth (email/password)
- Storage: 2GB (PDFs, images)
- Edge Functions: Deno runtime

**Database Tables** (Implemented):
- `profiles` - User profiles
- `clients` - B2B customers
- `funnels` - Sales funnels
- `funnel_stages` - Funnel stages
- `opportunities` - Sales opportunities
- `products` - Product catalog (15 seeded)
- `quotations` - Sales quotations (Sprint 1)

**Edge Functions**:
- `send-quotation-email` - Email sending via Resend API

### Integrations

**Implemented**:
- ✅ Resend API (email sending)

**Planned**:
- ⏳ Slack Webhook (notifications)
- ⏳ Google Calendar API (event sync)
- ⏳ brasil-api-mcp (CNPJ lookup)
- ⏳ WhatsApp Business API (Phase 4)

---

## 📊 Current Implementation Status

**Overall Progress**: ~20% MVP Complete

### Completed (Sprint 1 Day 1)

✅ **Quotation System MVP** (P0.5):
- Database: `products` + `quotations` tables
- Frontend: 9 components (100% Protocol compliant)
- PDF Generation: @react-pdf/renderer
- Email Integration: Supabase Edge Function + Resend
- Status: FULLY FUNCTIONAL

✅ **Infrastructure**:
- React 18 + TypeScript + Vite setup
- Tailwind CSS with STAGETEK design tokens
- Atomic Design component structure
- Supabase client configuration
- Protocol Notecraft™ 100% compliance automation

✅ **UI Components** (Static, no backend):
- Login page
- Dashboard (static data)
- Clientes page + modal (UI only)
- Oportunidades page + modal (UI only)
- TopBar navigation

### In Progress

🔄 **CRUD Operations** (40% - UI exists, no backend):
- Clientes: Modal exists, needs Supabase integration
- Oportunidades: Modal exists, needs Supabase integration
- Dashboard: Components exist, needs real data

### Not Started

❌ **Core Features**:
- Authentication integration (structure exists)
- Detalhes Oportunidade page (DOES NOT EXIST)
- Sistema de Tarefas
- Funil de Vendas Kanban
- Configuração de Funis (partial)
- Relatórios Gerenciais
- All P1/P2 features

---

## 🚨 Critical Blockers

**Security & Data Access** (from `.claude/CLAUDE.md`):
1. ⚠️ RLS Policies incomplete (only SELECT, missing INSERT/UPDATE/DELETE)
2. ⚠️ Storage policies needed for PDFs
3. ⚠️ Activity log table for audit trail
4. ⚠️ PII masking for emails/phones

**Authentication** (from brownfield doc):
1. 🔴 useAuth hook not integrated with Supabase
2. 🔴 Login page not functional
3. 🔴 ProtectedRoute not checking auth

**CRUD Operations** (from brownfield doc):
1. 🔴 useClientes.ts hook doesn't exist
2. 🔴 useOportunidades.ts hook doesn't exist
3. 🔴 No backend integration for any CRUD

---

## 🎯 Next Priorities (From `.claude/CLAUDE.md`)

### Priority 1: Lista de Cotações + Itens Customizados (P0.5 cont.)
- Create /cotacoes page (list all quotations)
- Add custom item support
- View/resend/edit quotations
- **Estimate**: 2-3 days

### Priority 2: Sistema de Tarefas (P0)
- Task CRUD (Ligação, WhatsApp, Email, Reunião)
- Link tasks to opportunities
- Notifications for overdue tasks
- **Estimate**: 1 week

### Priority 3: Detalhes da Oportunidade (P0)
- Create DetalheOportunidade.tsx page (DOES NOT EXIST)
- 3-column layout (Sidebar Left | Tabs | Sidebar Right)
- 6 tabs: Histórico, E-mail, Tarefas, Contatos, Produtos, Arquivos
- **Estimate**: 2 weeks

### Priority 4: Configuração de Funis (P0)
- Visual funnel editor (circles + lines)
- CRUD funnels and stages
- **Estimate**: 1 week

---

## 💡 Tips for AI Agents

### Protocol Notecraft™ Compliance

**Line Limits** (STRICT):
- Atoms: ≤20 lines
- Molecules: ≤35 lines
- Organisms: ≤50 lines
- Templates: ≤30 lines

**Validation**:
```bash
npm run validate:notecraft
```

**Pre-commit Hook**: Automatically runs validation, blocks commit if violated

**Workarounds**:
- Extract custom hooks
- Use composition (break into smaller components)
- Document exceptions in `.claude/CLAUDE.md`

### TypeScript Strict Mode

**Rule**: NO `any` types allowed
**Config**: `strict: true` in tsconfig.json
**Tip**: Use Supabase type generation for database types

### Tailwind CSS

**Use**: Utility classes only (no inline styles)
**Design Tokens**: See `tailwind.config.js`
- Primary: `text-stagetek-red` (#e90101)
- Backgrounds: `bg-gray-900`, `bg-gray-800`
- Text: `text-white`, `text-gray-400`

### Supabase Patterns

**Query Pattern**:
```typescript
const { data, error } = await supabase
  .from('table')
  .select('*')
  .eq('id', id)
```

**Always Handle Errors**:
```typescript
if (error) {
  console.error('Error:', error)
  // Show user-friendly message
  return
}
```

### Component Creation

**Process**:
1. Determine category (atom/molecule/organism/template)
2. Create file in appropriate folder
3. Keep under line limit
4. Run `npm run validate:notecraft`
5. Test in isolation (Storybook recommended)

---

## 📞 Getting Help

### Where to Look

**For Product Questions**:
- Check `protocol/SPECS-PRD.md`
- Check `protocol/CURRENT-FEATURES-PRIORITIZED.md`
- Review `.claude/CLAUDE.md`

**For Technical Questions**:
- Check **`docs/brownfield-architecture.md`** (this doc)
- Check `protocol/SPECS-ARCHITECTURE.md`
- Check `protocol/CURRENT-PROTOCOL-NOTECRAFT.md`

**For Database Questions**:
- Check `protocol/SPECS-DATABASE-SCHEMA.md`
- Check actual migrations in `supabase/migrations/`

**For UI/UX Questions**:
- Check `protocol/REFERENCE-RD-STATION-ANALYSIS.md`
- Review screenshots in `docs/RD_Station_CRM_small_bundle/`

**For Code Standards**:
- Check `protocol/CURRENT-PROTOCOL-NOTECRAFT.md`
- Check `protocol/CURRENT-BRANDING-STANDARDS.md`

---

## 🔄 Document Maintenance

### When to Update

**`docs/brownfield-architecture.md`** (this doc):
- After major feature completions
- When technical debt is added/resolved
- When architecture decisions change
- Sprint completions

**`.claude/CLAUDE.md`**:
- After each sprint
- When priorities change
- When blockers are identified or resolved

**`protocol/` docs**:
- When product requirements change
- When architecture evolves
- When new technical decisions are made

### Version Control

- All documentation is tracked in Git
- Commit changes with descriptive messages
- Reference from code comments when relevant

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
**Last Updated**: 14 de Outubro de 2025

**For AI Agents**: Start with `.claude/CLAUDE.md` → `docs/brownfield-architecture.md` → `protocol/` docs
