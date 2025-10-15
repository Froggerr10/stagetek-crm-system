# STAGETEK CRM System - Brownfield Architecture Document

**Version**: 1.0.0
**Date**: 14 de Outubro de 2025
**Status**: Sprint 1 Day 1 Complete
**Environment**: Production-ready MVP with Quotation System

---

## Introduction

This document captures the **CURRENT STATE** of the STAGETEK CRM System codebase, including implemented features, technical debt, workarounds, and real-world patterns. It serves as a reference for AI agents working on enhancements and new features.

### Document Scope

This is a **comprehensive** documentation of the entire system with **special focus** on:
- ✅ Recently completed: Quotation System MVP (Sprint 1 Day 1)
- 🔄 Areas requiring completion: CRUD operations, Funil de Vendas, Detalhes Oportunidade
- ⏳ Planned features: Tasks system, Reports, Advanced integrations

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-14 | 1.0 | Initial brownfield analysis post-Sprint 1 Day 1 | Analyst |

---

## Quick Reference - Key Files and Entry Points

### Critical Files for Understanding the System

**Main Application**:
- **Entry Point**: `src/App.tsx` (65 lines) - React Router configuration
- **Main Layout**: `src/components/layouts/MainLayout.tsx` - Application shell with navigation
- **Protected Routes**: `src/components/layouts/ProtectedRoute.tsx` - Authentication guard

**Configuration**:
- **Environment**: `.env` (Supabase URL, Keys, API tokens)
- **Tailwind Config**: `tailwind.config.js` - STAGETEK design tokens (red: #e90101)
- **TypeScript**: `tsconfig.json` - Strict mode enabled
- **Vite Build**: `vite.config.ts` - Path aliases (@/*), build config

**Core Business Logic**:
- **Authentication**: `src/hooks/useAuth.ts` (50 lines) - Supabase Auth integration
- **Clientes**: `src/pages/Clientes.tsx` + `src/hooks/useClienteForm.ts`
- **Oportunidades**: `src/pages/Oportunidades.tsx` + `src/hooks/useOportunidadeForm.ts`
- **Quotations**: `src/pages/NovaCotacao.tsx` + PDF/Email hooks (COMPLETE)

**Database**:
- **Schema**: `supabase/migrations/` - All database migrations
- **Seed Data**: `supabase/seed.sql` - 15 products, 5 clients, 7 opportunities
- **Edge Functions**: `supabase/functions/send-quotation-email/` - Email sending

**Documentation** (CRITICAL - READ FIRST):
- **Product Requirements**: `protocol/SPECS-PRD.md` (995 lines)
- **RD Station Analysis**: `protocol/REFERENCE-RD-STATION-ANALYSIS.md` (1200 lines)
- **Features Prioritized**: `protocol/CURRENT-FEATURES-PRIORITIZED.md` - P0/P1/P2/P3
- **Implementation Plan**: `protocol/CURRENT-IMPLEMENTATION-PLAN.md` (1369 lines)
- **Protocol Notecraft™**: `protocol/CURRENT-PROTOCOL-NOTECRAFT.md` - Code standards
- **Claude Instructions**: `.claude/CLAUDE.md` - AI development guidelines

### Sprint 1 Day 1 Completion - Quotation System

**Recently Implemented (14 Oct 2025)**:
- `src/pages/NovaCotacao.tsx` (30 lines) - Quotation creation page
- `src/components/organisms/ProductCatalog.tsx` (45 lines) - Product grid
- `src/components/organisms/QuotationCart.tsx` (50 lines) - Shopping cart
- `src/components/molecules/ProductCard.tsx` (27 lines)
- `src/components/molecules/QuotationItem.tsx` (22 lines)
- `src/components/molecules/QuotationTotals.tsx` (35 lines)
- `src/components/molecules/EmailModal.tsx` (20 lines)
- `src/components/templates/QuotationPDF.tsx` (28 lines) - PDF generation
- `src/hooks/useQuotationActions.ts`, `usePDFGeneration.tsx`, `useEmailSending.tsx`
- `supabase/functions/send-quotation-email/` - Resend API integration
- `supabase/migrations/20251014_quotation_system_hybrid.sql` - Database schema

---

## High Level Architecture

### Technical Summary

**Architecture Pattern**: Frontend-only SPA with Backend-as-a-Service (Supabase)
**Deployment**: Vercel (Frontend) + Supabase (Backend/DB/Auth/Storage)
**Code Quality**: Protocol Notecraft™ compliant (100% validation)
**Mobile**: Mobile-first design, PWA-ready (pending Service Worker)

### Actual Tech Stack

| Category | Technology | Version | Notes |
|----------|------------|---------|-------|
| **Runtime** | Node.js | 18.0.0+ | Required for development |
| **Package Manager** | npm | 9.0.0+ | Lock file tracked |
| **Frontend Framework** | React | 18.3.1 | With TypeScript |
| **Build Tool** | Vite | 5.4.6 | Ultra-fast HMR |
| **Language** | TypeScript | 5.6.2 | Strict mode enabled |
| **Styling** | Tailwind CSS | 3.4.12 | Custom STAGETEK tokens |
| **Router** | React Router | 7.9.3 | v6 API |
| **Backend (BaaS)** | Supabase | 2.58.0 | PostgreSQL + Auth + Storage |
| **PDF Generation** | @react-pdf/renderer | 4.3.1 | Server-side rendering |
| **Email** | Resend API | - | Via Edge Function |
| **Icons** | Lucide React | 0.445.0 | Lightweight icons |
| **State Management** | React Context + Hooks | - | No external library yet |
| **Form Handling** | Native React | - | Future: React Hook Form |
| **Testing** | Vitest | 2.1.1 | Unit tests (minimal) |
| **Storybook** | Storybook | 8.3.2 | Component library |
| **Linting** | ESLint | 8.57.1 | TypeScript + React rules |

### Repository Structure Reality Check

- **Type**: Monorepo (single React app + Supabase)
- **Package Manager**: npm (package-lock.json tracked)
- **Unusual Decisions**:
  - Protocol Notecraft™ strict line limits (atoms ≤20, molecules ≤35, organisms ≤50)
  - Atomic Design enforced via folder structure
  - `.claude/CLAUDE.md` contains critical project context (read first!)
  - Extensive protocol docs in `/protocol` (1000+ lines each)

---

## Source Tree and Module Organization

### Project Structure (Actual)

```
stagetek-crm-system/
├── .bmad-core/                    # BMAD methodology framework (ignore for development)
├── .claude/
│   └── CLAUDE.md                  # ⭐ CRITICAL: Read this first for AI agents
├── .cursor/rules/bmad/            # Cursor IDE rules
├── .git/                          # Git repository
├── .husky/                        # Git hooks (pre-commit: Protocol validation)
├── .storybook/                    # Storybook configuration
├── .superdesign/                  # Archive: Old HTML prototypes
├── _archive/                      # Old docs and HTML prototypes
│   ├── old-docs/                  # Previous CLAUDE.md versions
│   ├── old-html-phase/            # Standalone HTML prototypes
│   └── protocol-analysis/         # Analysis documents
├── apple-design-system/           # Apple-inspired design experiments
├── docs/                          # Reference documentation
│   ├── REFERENCE-*.md             # Analysis documents
│   └── RD_Station_CRM_small_bundle/ # Screenshots and analysis
├── node_modules/                  # Dependencies (gitignored)
├── protocol/                      # ⭐ CRITICAL: Product & technical specs
│   ├── SPECS-PRD.md              # Product Requirements (995 lines)
│   ├── REFERENCE-RD-STATION-ANALYSIS.md  # UI/UX analysis (1200 lines)
│   ├── CURRENT-FEATURES-PRIORITIZED.md   # P0/P1/P2/P3 features
│   ├── CURRENT-IMPLEMENTATION-PLAN.md    # Detailed roadmap (1369 lines)
│   ├── CURRENT-PROTOCOL-NOTECRAFT.md     # Code standards
│   ├── CURRENT-BRANDING-STANDARDS.md     # Design tokens
│   ├── CURRENT-TECH-STACK.md            # Stack justification
│   ├── CURRENT-ROADMAP-PHASES.md        # 6-phase roadmap
│   ├── SPECS-ARCHITECTURE.md            # System architecture
│   ├── SPECS-DATABASE-SCHEMA.md         # Database ERD + queries
│   ├── SPECS-FEATURES-COMPLETE.md       # Complete feature list
│   ├── REFERENCE-*.md                   # Other reference docs
│   └── USER-STORIES.md, TECH-DEBT.md, VALUE-PROPOSITION.md
├── public/                        # Static assets
│   └── vite.svg                   # Vite logo
├── scripts/                       # Build scripts
│   ├── validate-notecraft.js     # Protocol Notecraft™ validator
│   ├── test-supabase-connection.ts
│   └── run-migrations.ts
├── src/                          # ⭐ Main application code
│   ├── components/
│   │   ├── atoms/                # ≤20 lines each
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── NotificationBadge.tsx
│   │   │   ├── Select.tsx
│   │   │   └── Spinner.tsx
│   │   ├── molecules/            # ≤35 lines each
│   │   │   ├── AddressFields.tsx
│   │   │   ├── ClientCard.tsx
│   │   │   ├── ClientTableHeader.tsx
│   │   │   ├── ClientTableRow.tsx
│   │   │   ├── EmailModal.tsx    # ✅ Sprint 1 Day 1
│   │   │   ├── FormField.tsx
│   │   │   ├── ModalActions.tsx
│   │   │   ├── ModalHeader.tsx
│   │   │   ├── NavLink.tsx
│   │   │   ├── ProductCard.tsx   # ✅ Sprint 1 Day 1
│   │   │   ├── QuotationItem.tsx # ✅ Sprint 1 Day 1
│   │   │   ├── QuotationTotals.tsx # ✅ Sprint 1 Day 1
│   │   │   ├── SearchBar.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── TopBarActions.tsx
│   │   │   └── UserMenu.tsx
│   │   ├── organisms/            # ≤50 lines each
│   │   │   ├── ClienteModal.tsx
│   │   │   ├── ClientTable.tsx
│   │   │   ├── OportunidadeModal.tsx
│   │   │   ├── OpportunitiesTable.tsx
│   │   │   ├── ProductCatalog.tsx # ✅ Sprint 1 Day 1
│   │   │   ├── QuotationCart.tsx  # ✅ Sprint 1 Day 1
│   │   │   └── TopBar.tsx
│   │   ├── layouts/
│   │   │   ├── MainLayout.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   └── templates/            # ≤30 lines each
│   │       └── QuotationPDF.tsx  # ✅ Sprint 1 Day 1
│   ├── hooks/
│   │   ├── useAuth.ts            # Authentication (partial)
│   │   ├── useClienteForm.ts     # Cliente form state
│   │   ├── useOportunidadeForm.ts # Oportunidade form state
│   │   ├── useQuotationActions.ts # ✅ Sprint 1 Day 1
│   │   ├── usePDFGeneration.tsx   # ✅ Sprint 1 Day 1
│   │   └── useEmailSending.tsx    # ✅ Sprint 1 Day 1
│   ├── lib/
│   │   ├── supabase.ts           # Supabase client config
│   │   ├── pdfStyles.ts          # ✅ PDF styling (Sprint 1)
│   │   └── utils.ts              # Utility functions
│   ├── pages/
│   │   ├── Clientes.tsx          # CRUD Clientes (UI only, no backend)
│   │   ├── ConfigFunis.tsx       # Funnel configuration (partial)
│   │   ├── Configuracoes.tsx     # Settings page (skeleton)
│   │   ├── Dashboard.tsx         # Dashboard (static data)
│   │   ├── DashboardApple.tsx    # Apple-styled dashboard experiment
│   │   ├── Login.tsx             # Login page (needs Supabase integration)
│   │   ├── NovaCotacao.tsx       # ✅ NEW - Quotation creation (Sprint 1)
│   │   └── Oportunidades.tsx     # CRUD Oportunidades (UI only, no backend)
│   ├── test/                     # Test utilities
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── App.tsx                   # ⭐ Router configuration
│   ├── index.css                 # Tailwind imports
│   └── main.tsx                  # React entry point
├── supabase/                     # Supabase backend configuration
│   ├── functions/
│   │   └── send-quotation-email/ # ✅ Edge Function (Sprint 1)
│   │       └── index.ts          # Resend API integration
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 20251004_initial_schema.sql
│   │   ├── 20251013_comprehensive_rls_policies.sql  # RLS policies
│   │   ├── 20251013_storage_policies.sql            # Storage security
│   │   ├── 20251014_quotation_system_hybrid.sql     # ✅ Quotations (Sprint 1)
│   │   └── 20251014_quotation_seed_data.sql         # ✅ 15 products seeded
│   ├── disable-rls-dev.sql       # Development helper (dangerous!)
│   ├── seed.sql                  # Latest seed data
│   └── README.md                 # Supabase setup instructions
├── .env                          # ⚠️ SECRETS (gitignored)
├── .env.example                  # Template for .env
├── .claudeignore                 # Files to ignore for Claude Code
├── .gitignore
├── index.html                    # Vite entry HTML
├── package.json                  # ⭐ Dependencies + scripts
├── package-lock.json             # Lock file
├── postcss.config.js             # PostCSS for Tailwind
├── README.md                     # Project overview
├── tailwind.config.js            # ⭐ STAGETEK design tokens
├── tsconfig.json                 # TypeScript strict mode
├── tsconfig.app.json             # App-specific TS config
└── vite.config.ts                # Vite build config + path aliases
```

### Key Modules and Their Purpose

**Authentication & Authorization** (⚠️ INCOMPLETE):
- `src/hooks/useAuth.ts` - Supabase Auth wrapper (50% complete)
- `src/components/layouts/ProtectedRoute.tsx` - Route guard (needs auth check)
- `src/pages/Login.tsx` - Login UI (needs form submission)
- **STATUS**: Structure exists, but NOT connected to Supabase Auth yet

**CRUD Clientes** (⚠️ UI ONLY):
- `src/pages/Clientes.tsx` - Main page with table/cards (90 lines)
- `src/components/organisms/ClienteModal.tsx` - Create/Edit modal (47 lines)
- `src/hooks/useClienteForm.ts` - Form state management (61 lines)
- **STATUS**: UI complete, backend integration pending (no Supabase queries)

**CRUD Oportunidades** (⚠️ UI ONLY):
- `src/pages/Oportunidades.tsx` - Main page (243 lines)
- `src/components/organisms/OportunidadeModal.tsx` - Create/Edit modal (50 lines)
- `src/hooks/useOportunidadeForm.ts` - Form state management (67 lines)
- **STATUS**: UI complete, backend integration pending (no Supabase queries)

**Quotation System** (✅ COMPLETE - Sprint 1 Day 1):
- `src/pages/NovaCotacao.tsx` - Quotation creation page (30 lines)
- `src/components/organisms/ProductCatalog.tsx` - Product grid (45 lines)
- `src/components/organisms/QuotationCart.tsx` - Shopping cart (50 lines)
- `src/components/templates/QuotationPDF.tsx` - PDF template (28 lines)
- `src/hooks/useQuotationActions.ts` - Add/remove/update cart (33 lines)
- `src/hooks/usePDFGeneration.tsx` - PDF generation logic (45 lines)
- `src/hooks/useEmailSending.tsx` - Email sending via Edge Function (64 lines)
- `supabase/functions/send-quotation-email/` - Resend API integration
- **STATUS**: 100% functional - catalog, cart, PDF, email all working

**Dashboard** (⚠️ STATIC DATA):
- `src/pages/Dashboard.tsx` - Main dashboard (53 lines)
- `src/components/molecules/StatCard.tsx` - Metric cards
- **STATUS**: Layout complete, needs real data from Supabase

**Layout & Navigation**:
- `src/components/layouts/MainLayout.tsx` - App shell with TopBar
- `src/components/organisms/TopBar.tsx` - Navigation, search, user menu
- `src/App.tsx` - React Router configuration (65 lines)
- **STATUS**: Navigation working, all routes defined

---

## Data Models and APIs

### Data Models

**IMPORTANT**: Do NOT duplicate model definitions here. Reference actual files:

- **Database Schema**: See `protocol/SPECS-DATABASE-SCHEMA.md` (463 lines)
- **Quick Reference**: See `protocol/REFERENCE-SCHEMA-QUICK.md`
- **Comparison Analysis**: See `protocol/REFERENCE-SCHEMA-COMPARISON.md`
- **TypeScript Types**: See `src/types/index.ts` (when created)

### Key Tables (Implemented)

**profiles** - User profiles (extends Supabase Auth):
- File: `supabase/migrations/20251004_initial_schema.sql`
- RLS: ✅ Policies created
- Status: ✅ Ready to use

**clients** - B2B customers:
- File: `supabase/migrations/20251004_initial_schema.sql`
- RLS: ✅ Policies created
- Status: ✅ Seed data available (5 test clients)
- Frontend: ⚠️ NOT YET CONNECTED

**funnels** - Sales funnels:
- File: `supabase/migrations/20251004_initial_schema.sql`
- RLS: ✅ Policies created
- Status: ✅ Seed data available (1 default funnel)

**funnel_stages** - Funnel stages:
- File: `supabase/migrations/20251004_initial_schema.sql`
- RLS: ✅ Policies created
- Status: ✅ Seed data available (5 stages)

**opportunities** - Sales opportunities:
- File: `supabase/migrations/20251004_initial_schema.sql`
- RLS: ✅ Policies created
- Status: ✅ Seed data available (7 test opportunities)
- Frontend: ⚠️ NOT YET CONNECTED

**products** - Product catalog:
- File: `supabase/migrations/20251014_quotation_system_hybrid.sql`
- RLS: ✅ Policies created
- Status: ✅ Seed data available (15 products, 4 categories)
- Frontend: ✅ CONNECTED (NovaCotacao.tsx)

**quotations** - Sales quotations:
- File: `supabase/migrations/20251014_quotation_system_hybrid.sql`
- Schema: JSONB hybrid (items array + metadata)
- Auto-numbering: `QT-YYYYMM-NNN` via PostgreSQL function
- RLS: ✅ Policies created
- Status: ✅ FULLY FUNCTIONAL
- Frontend: ✅ CONNECTED (NovaCotacao.tsx)

### API Specifications

**Supabase Client**:
- File: `src/lib/supabase.ts`
- Configuration: Environment variables from `.env`
- Usage pattern: `const { data, error } = await supabase.from('table').select()`

**Supabase Edge Functions**:
- `send-quotation-email` - Sends quotation PDFs via Resend API
  - Input: `{ to, subject, quotationData }`
  - Output: `{ success, message }`
  - Status: ✅ Deployed and functional

**External APIs**:
- **Resend**: Email sending (100 emails/day free)
  - Configuration: `RESEND_API_KEY` in Edge Function secrets
  - Status: ✅ Integrated in Sprint 1

### Common Queries (Example Patterns)

See `protocol/SPECS-DATABASE-SCHEMA.md` for complete query examples:
- Fetch opportunities with client/stage joins
- Calculate totals by Kanban column
- Get products for quotation
- Timeline of activities

---

## Technical Debt and Known Issues

### Critical Technical Debt

**1. Authentication Not Integrated** (🔴 BLOCKER for production):
- **Files**: `src/hooks/useAuth.ts`, `src/pages/Login.tsx`
- **Issue**: Authentication structure exists but NOT connected to Supabase Auth
- **Impact**: Anyone can access the app without login
- **Fix Required**: Implement Supabase signIn/signOut/getCurrentUser methods
- **Estimate**: 2-3 days

**2. CRUD Operations Not Connected to Backend** (🔴 BLOCKER):
- **Files**: `src/pages/Clientes.tsx`, `src/pages/Oportunidades.tsx`
- **Issue**: Modals exist, forms exist, but NO Supabase integration
- **Impact**: Cannot create/edit/delete clients or opportunities
- **Fix Required**: Create `useClientes.ts` and `useOportunidades.ts` hooks
- **Estimate**: 4-5 days

**3. RLS Policies Incomplete** (🟡 SECURITY RISK):
- **Files**: `supabase/migrations/20251013_comprehensive_rls_policies.sql`
- **Issue**: Only SELECT policies exist, missing INSERT/UPDATE/DELETE
- **Impact**: Potential data leakage or unauthorized modifications
- **Fix Required**: Complete RLS policies for all tables
- **Estimate**: 2-3 days
- **Reference**: See `.claude/CLAUDE.md` line 260 (Security blockers)

**4. Dashboard Using Static Data** (🟢 LOW PRIORITY):
- **Files**: `src/pages/Dashboard.tsx`
- **Issue**: StatCards show hardcoded values, no real metrics
- **Impact**: Dashboard not useful for decision-making
- **Fix Required**: Create `useDashboard.ts` hook with aggregate queries
- **Estimate**: 2-3 days

**5. No Error Handling or Loading States** (🟡 UX ISSUE):
- **Files**: Most pages and components
- **Issue**: No try/catch blocks, no loading spinners, no error messages
- **Impact**: Poor user experience, hard to debug issues
- **Fix Required**: Add error boundaries, loading states, toast notifications
- **Estimate**: 3-4 days

### Workarounds and Gotchas

**Protocol Notecraft™ Line Limits**:
- **Constraint**: Atoms ≤20 lines, Molecules ≤35, Organisms ≤50, Templates ≤30
- **Impact**: Forces extreme decomposition, sometimes awkward
- **Validation**: Pre-commit hook runs `npm run validate:notecraft`
- **Workaround**: Extract hooks, use composition, document exceptions

**Supabase Free Tier Limits**:
- **Database**: 500MB (currently ~50MB used)
- **Storage**: 2GB (currently ~5MB used for PDFs)
- **Edge Functions**: 500K invocations/month
- **Workaround**: Monitor usage, implement cleanup policies, plan upgrade path

**Mobile Drag-and-Drop** (未tested):
- **Library**: dnd-kit (planned for Kanban)
- **Risk**: May not work well on mobile Safari
- **Workaround**: Fallback to button interface ("Mover para...")

**TypeScript Strict Mode**:
- **Setting**: `strict: true` in tsconfig.json
- **Impact**: NO `any` types allowed, all props must be typed
- **Gotcha**: Supabase types can be verbose, consider type generation

---

## Integration Points and External Dependencies

### External Services

| Service | Purpose | Integration Type | Status | Key Files |
|---------|---------|------------------|--------|-----------|
| **Supabase** | Backend (DB + Auth + Storage) | SDK (`@supabase/supabase-js`) | ✅ Connected | `src/lib/supabase.ts` |
| **Resend** | Email sending | REST API (via Edge Function) | ✅ Integrated | `supabase/functions/send-quotation-email/` |
| **Slack** | Notifications | Webhook | ⏳ Planned | Not yet implemented |
| **Google Calendar** | Event sync | Google Calendar API | ⏳ Planned | Not yet implemented |
| **brasil-api-mcp** | CNPJ lookup | MCP Server | ⏳ Planned | Not yet implemented |

### Internal Integration Points

**Frontend ↔ Supabase**:
- Pattern: `const { data, error } = await supabase.from('table').select()`
- Authentication: `supabase.auth` methods (not yet used)
- Storage: `supabase.storage` for PDF uploads (used in quotations)
- Realtime: `supabase.channel()` for live updates (not yet implemented)

**React Router Navigation**:
- Entry: `src/App.tsx` - All routes defined here
- Protected: Routes wrapped in `<ProtectedRoute>` (auth check not implemented)
- Layouts: `<MainLayout>` wraps most pages (TopBar + content area)

**PDF Generation Flow**:
1. User clicks "Gerar PDF" in `NovaCotacao.tsx`
2. `usePDFGeneration.tsx` calls `@react-pdf/renderer`
3. `QuotationPDF.tsx` template renders with data
4. PDF blob generated → automatic download
5. ✅ WORKING (Sprint 1 Day 1)

**Email Sending Flow**:
1. User clicks "Enviar Email" in `NovaCotacao.tsx`
2. `useEmailSending.tsx` calls Supabase Edge Function
3. Edge Function calls Resend API with PDF attachment
4. Quotation status updated to "sent" in database
5. ✅ WORKING (Sprint 1 Day 1)

---

## Development and Deployment

### Local Development Setup

**Prerequisites**:
```bash
Node.js 18.0.0+
npm 9.0.0+
```

**Steps (as documented in README.md)**:

1. **Clone and install**:
   ```bash
   git clone <repo-url>
   cd stagetek-crm-system
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with Supabase credentials
   ```

3. **Run development server**:
   ```bash
   npm run dev
   # Opens http://localhost:5173
   ```

4. **Run database migrations** (if Supabase local):
   ```bash
   npx supabase start          # Start local Supabase
   npx supabase db push        # Apply migrations
   npx supabase db execute --file supabase/seed.sql  # Seed data
   ```

**Known Issues with Setup**:
- ⚠️ Supabase migrations assume remote project (not local dev)
- ⚠️ Edge Functions must be deployed separately (`npx supabase functions deploy`)
- ⚠️ `.env` secrets not in version control (get from team)

### Build and Deployment Process

**Build Command**:
```bash
npm run build
# Output: dist/ folder (gitignored)
```

**Preview Build**:
```bash
npm run preview
# Serves dist/ folder locally
```

**Deployment Target**: Vercel (Free Tier)
- **Method**: Git push to `main` branch → auto-deploy
- **Environment Variables**: Set in Vercel dashboard (match .env)
- **Edge Functions**: Deploy separately to Supabase
- **Status**: Not yet deployed to Vercel (local dev only)

**Deployment Checklist** (when ready):
- [ ] Complete authentication integration
- [ ] Complete CRUD backend connections
- [ ] Fix RLS policies
- [ ] Test on mobile devices
- [ ] Configure Vercel environment variables
- [ ] Deploy Edge Functions to Supabase production
- [ ] Set up custom domain (optional)

### Scripts and Commands

**From package.json**:

```bash
npm run dev              # Development server (Vite HMR)
npm run build            # Production build
npm run preview          # Preview production build
npm test                 # Run Vitest tests
npm run test:ui          # Vitest UI
npm run test:coverage    # Coverage report
npm run lint             # ESLint check
npm run type-check       # TypeScript compile check (no emit)
npm run validate:notecraft # Protocol Notecraft™ validation
npm run storybook        # Launch Storybook on :6006
npm run build-storybook  # Build Storybook static site
npm run db:setup         # Push migrations + seed data
npm run db:migrate       # Run custom migration script
npm run db:reset         # Reset Supabase database (DANGEROUS)
npm run test:supabase    # Test Supabase connection
```

**Pre-commit Hooks** (Husky):
- Runs `npm run validate:notecraft` before each commit
- Blocks commit if any component exceeds line limits
- Can be bypassed with `--no-verify` (not recommended)

---

## Testing Reality

### Current Test Coverage

**Status**: ❌ Minimal testing (mostly scaffolding)

**Unit Tests**: <5% coverage
- Framework: Vitest + @testing-library/react
- Location: `src/test/` (mostly empty)
- Run: `npm test`

**Integration Tests**: None

**E2E Tests**: None

**Manual Testing**: Primary QA method
- Tested: Quotation system (Sprint 1 Day 1)
- Not tested: Authentication, CRUD operations, mobile UX

### Running Tests

```bash
npm test                 # Run all tests (currently very few)
npm run test:ui          # Vitest UI (browser-based)
npm run test:coverage    # Generate coverage report
npm run test:supabase    # Test Supabase connection
```

**Known Issues**:
- Most components not tested
- No E2E test framework configured (Playwright planned)
- No CI/CD pipeline yet (GitHub Actions planned)

---

## Sprint 1 Day 1 Completion - Detailed Breakdown

### What Was Implemented (14 Oct 2025)

**Feature**: Quotation System MVP
**RICE Score**: 15.0 (highest impact)
**Time**: 1 day (vs estimated 2-3 weeks)
**Status**: ✅ 100% COMPLETE

**Database**:
- ✅ `products` table (id, name, sku, category, price, description, specs JSONB)
- ✅ `quotations` table (JSONB hybrid model for items)
- ✅ Auto-numbering function: `generate_quotation_number()` → `QT-YYYYMM-NNN`
- ✅ PostgreSQL trigger on INSERT
- ✅ 15 products seeded (Som, Luz, Estrutura, Talha) - Total R$ 49,160

**Frontend Components** (100% Protocol Notecraft™ compliant):
1. **Page**: `NovaCotacao.tsx` (30 lines) - Main quotation page
2. **Organisms**:
   - `ProductCatalog.tsx` (45 lines) - Grid of products, responsive
   - `QuotationCart.tsx` (50 lines) - Shopping cart with 3 action buttons
3. **Molecules**:
   - `ProductCard.tsx` (27 lines) - Product display card
   - `QuotationItem.tsx` (22 lines) - Cart item row
   - `QuotationTotals.tsx` (35 lines) - Subtotal, freight, total (with validation)
   - `EmailModal.tsx` (20 lines) - Email input modal
4. **Template**:
   - `QuotationPDF.tsx` (28 lines) - PDF generation template
5. **Styles**:
   - `pdfStyles.ts` - Centralized PDF styling

**Custom Hooks**:
- `useQuotationActions.ts` (33 lines) - Add/remove/update cart items
- `usePDFGeneration.tsx` (45 lines) - Generate PDF blob, trigger download
- `useEmailSending.tsx` (64 lines) - Call Edge Function, update status

**Backend**:
- ✅ Supabase Edge Function: `send-quotation-email`
  - Resend API integration
  - HTML email template with branding
  - PDF attachment via base64
  - CORS handling
  - Status: Deployed and functional

**UX Improvements**:
- ✅ R$ prefix on currency inputs
- ✅ Anti-negative validation on quantity and freight
- ✅ Remove button with red hover state
- ✅ Email validation
- ✅ Download with filename: `Cotacao_QT-YYYYMM-NNN.pdf`

**Acceptance Criteria** (100% passed):
- ✅ Catalog shows 15 products in 4 categories
- ✅ Add to cart functionality
- ✅ Adjust quantity with input validation
- ✅ Manual freight input with validation
- ✅ PDF generation in <3s
- ✅ Automatic download
- ✅ Email sending in <30s
- ✅ Status update to "sent" with timestamp
- ✅ Quotation saved in database

**Out of Scope** (deferred to P1):
- ⏳ List of saved quotations
- ⏳ View/resend/edit existing quotations
- ⏳ Custom (non-catalog) items
- ⏳ Automatic freight calculation (API)
- ⏳ Tax calculation (ICMS, IPI)
- ⏳ Multi-currency display (USD/EUR)
- ⏳ Customizable email templates

---

## What's Next - Immediate Priorities

Based on `.claude/CLAUDE.md` (authoritative source):

### Priority 1: Lista de Cotações + Itens Customizados (P0.5 cont.)

**Estimate**: 2-3 days
**Dependencies**: Quotation system (completed)

**Tasks**:
- [ ] Create `src/pages/Cotacoes.tsx` - List all quotations
- [ ] Filters: status, date, client, opportunity
- [ ] View PDF (stored in database or storage)
- [ ] Resend email functionality
- [ ] Edit draft quotations
- [ ] Add "Custom Item" button to NovaCotacao
- [ ] Modal for manual item entry (name, quantity, price)
- [ ] Mix catalog + custom items in same cart

### Priority 2: Sistema de Tarefas (P0)

**Estimate**: 1 week
**Dependencies**: Opportunities page

**Reference**: `tarefas.png` screenshot
**Tasks**:
- [ ] Create `tasks` database table
- [ ] Task types: Ligação, WhatsApp, Email, Reunião (with icons)
- [ ] Task creation form (type, date, time, assignee)
- [ ] Task list (next tasks + overdue)
- [ ] Integration with opportunity timeline
- [ ] Notifications for overdue tasks

### Priority 3: Detalhes da Oportunidade (P0)

**Estimate**: 2 weeks
**Dependencies**: CRUD Oportunidades backend integration

**Reference**: `protocol/REFERENCE-RD-STATION-ANALYSIS.md` lines 224-339
**Tasks**:
- [ ] Create `src/pages/DetalheOportunidade.tsx` (DOES NOT EXIST!)
- [ ] Layout: 3 columns (Sidebar Left | Tabs | Sidebar Right)
- [ ] Tab: HISTÓRICO (timeline + annotations)
- [ ] Tab: E-MAIL (send emails)
- [ ] Tab: TAREFAS (create/list tasks)
- [ ] Tab: CONTATOS (link contacts)
- [ ] Tab: PRODUTOS (add products to opportunity)
- [ ] Tab: ARQUIVOS (upload attachments)
- [ ] Navigation: Click opportunity card → open details

### Priority 4: Configuração de Funis (P0)

**Estimate**: 1 week
**Dependencies**: None (independent)

**Reference**: `Funil_4.png` screenshot
**Tasks**:
- [ ] Create `src/pages/ConfigFunis.tsx` (EXISTS but incomplete)
- [ ] List all funnels (default + custom)
- [ ] Visual stage editor (circles connected by lines)
- [ ] Add/remove/edit stages
- [ ] Configure stage abbreviations (siglas)
- [ ] Delete funnel (with confirmation)
- [ ] CRUD funnel automation rules

---

## Enhancement Impact Analysis (If Provided)

**Note**: No specific enhancement PRD was provided. This section would detail:
- Which files need modification
- New files/modules required
- Integration points
- Migration strategy
- Testing requirements

When a specific feature is requested, reference:
- `protocol/CURRENT-FEATURES-PRIORITIZED.md` for priority
- `protocol/CURRENT-IMPLEMENTATION-PLAN.md` for detailed steps
- `protocol/SPECS-DATABASE-SCHEMA.md` for database changes

---

## Appendix - Useful Commands and Scripts

### Frequently Used Commands

**Development**:
```bash
npm run dev                    # Start dev server (http://localhost:5173)
npm run build                  # Production build (→ dist/)
npm run preview                # Preview production build
npm run storybook              # Component library (:6006)
```

**Code Quality**:
```bash
npm run lint                   # ESLint check
npm run type-check             # TypeScript compile (no emit)
npm run validate:notecraft     # Protocol line limits check
npm test                       # Run Vitest tests
npm run test:coverage          # Coverage report
```

**Database**:
```bash
npm run db:setup               # Push migrations + seed
npm run db:migrate             # Run migration scripts
npm run db:reset               # ⚠️ DANGEROUS: Reset database
npm run test:supabase          # Test connection
```

**Supabase CLI** (if installed):
```bash
npx supabase start             # Local Supabase
npx supabase db push           # Apply migrations
npx supabase db execute --file supabase/seed.sql  # Seed data
npx supabase functions deploy send-quotation-email  # Deploy Edge Function
npx supabase storage ls        # List storage buckets
```

### Debugging and Troubleshooting

**Common Issues**:

1. **"Cannot read property 'from' of undefined"**:
   - Cause: Supabase client not initialized
   - Fix: Check `.env` file, ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set

2. **Pre-commit hook fails with "Component X exceeds line limit"**:
   - Cause: Protocol Notecraft™ validation
   - Fix: Refactor component, extract hooks or sub-components
   - Bypass: `git commit --no-verify` (NOT recommended)

3. **"Module not found" errors**:
   - Cause: Path alias not resolved
   - Fix: Check `vite.config.ts` has `resolve.alias: { '@': '/src' }`

4. **Edge Function CORS errors**:
   - Cause: Missing CORS headers in Edge Function
   - Fix: Add `Access-Control-Allow-Origin: *` to response headers

5. **Tailwind classes not working**:
   - Cause: JIT purging or config issue
   - Fix: Check `tailwind.config.js` content paths include all files

**Logs and Monitoring**:
- Browser console: Check for errors, warnings
- Supabase dashboard: Check database queries, Edge Function logs
- Network tab: Inspect API calls, check payloads

**Resetting State**:
```bash
# Clear node_modules
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite

# Reset Git state (DANGEROUS)
git reset --hard HEAD
git clean -fd
```

---

## Navigation Guide for AI Agents

### How to Orient Yourself

**1. Start Here**:
- Read `.claude/CLAUDE.md` (CRITICAL - contains project context and rules)
- Read `protocol/CURRENT-FEATURES-PRIORITIZED.md` (understand P0/P1/P2/P3)
- Read `protocol/CURRENT-IMPLEMENTATION-PLAN.md` (detailed roadmap)

**2. Understand the Business**:
- Read `protocol/SPECS-PRD.md` (product requirements)
- Read `protocol/REFERENCE-RD-STATION-ANALYSIS.md` (UI/UX reference)
- Review screenshots in `docs/RD_Station_CRM_small_bundle/`

**3. Understand the Code**:
- Read `src/App.tsx` (routing and navigation)
- Read `src/lib/supabase.ts` (backend client)
- Browse `src/components/` (component hierarchy)
- Read `protocol/CURRENT-PROTOCOL-NOTECRAFT.md` (code standards)

**4. Understand the Database**:
- Read `protocol/SPECS-DATABASE-SCHEMA.md` (complete schema)
- Browse `supabase/migrations/` (actual SQL)
- Read `supabase/seed.sql` (sample data)

**5. Understand What's Done vs. What's Needed**:
- Check `.claude/CLAUDE.md` sections "✅ COMPLETADO" and "🚀 PRÓXIMOS PASSOS"
- Review this document's "Sprint 1 Day 1 Completion" section
- Check "Technical Debt and Known Issues" section

### Quick Reference for Common Tasks

**Adding a New Page**:
1. Create page in `src/pages/NewPage.tsx` (follow Protocol Notecraft™)
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/organisms/TopBar.tsx`

**Adding a New Component**:
1. Determine category: atom (≤20), molecule (≤35), organism (≤50), template (≤30)
2. Create in appropriate folder: `src/components/{category}/ComponentName.tsx`
3. Export from component (named export preferred)
4. Run `npm run validate:notecraft` to check line limits

**Adding a New Database Table**:
1. Create migration: `supabase/migrations/YYYYMMDD_description.sql`
2. Add RLS policies in same migration
3. Update `protocol/SPECS-DATABASE-SCHEMA.md` with table definition
4. Add seed data if needed

**Adding a New Hook**:
1. Create in `src/hooks/useFooBar.ts`
2. Follow naming convention: `use` + PascalCase
3. Return object with methods and state (not array)

**Adding Integration**:
1. Add API key to `.env.example` (template)
2. Add API key to `.env` (actual, gitignored)
3. Create client in `src/lib/{service}.ts`
4. Create hook in `src/hooks/use{Service}.ts`

---

## Final Notes

### What This Document Is

- ✅ Accurate snapshot of codebase as of 14 Oct 2025 (post-Sprint 1 Day 1)
- ✅ Honest documentation of technical debt and workarounds
- ✅ Guide for AI agents to understand project structure
- ✅ Reference to existing documentation (not duplication)
- ✅ Living document (update as system evolves)

### What This Document Is NOT

- ❌ Aspirational architecture (e.g., "we will use microservices")
- ❌ Complete code duplication (references actual files instead)
- ❌ User manual (see `docs/USER-GUIDE.md` when created)
- ❌ Marketing material (honest about limitations)

### How to Keep This Updated

- Update this document when major features are completed
- Update when technical debt is added or resolved
- Update when architecture decisions change
- Version control this document (commit changes)
- Reference from `.claude/CLAUDE.md` for AI agents

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
**Last Updated**: 14 de Outubro de 2025
**Next Review**: After Priority 1-4 completion

**For Questions**: Refer to `.claude/CLAUDE.md` or `protocol/` docs
