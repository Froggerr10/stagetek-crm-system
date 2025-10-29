# Tech Stack - STAGETEK CRM

**Versão**: 1.0
**Data**: 25 de Outubro de 2025
**Status**: Atual e Validado

---

## 📦 Frontend Stack

### Core Framework
- **React 18.3.1** - UI library
- **TypeScript 5.6** - Type safety
- **Vite 5.4** - Build tool e dev server

### UI/UX
- **Tailwind CSS 3.4** - Utility-first CSS
- **shadcn/ui** - Component library base
- **Lucide React** - Icon system
- **@react-pdf/renderer** - PDF generation

### State Management
- **React Query (TanStack Query)** - Server state
- **Zustand** - Client state (planejado)

### Forms & Validation
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Drag & Drop
- **@dnd-kit** - Drag-and-drop (mobile-friendly)

### Charts
- **Recharts** - Chart library

### Date Handling
- **date-fns** - Date utilities (PT-BR)

---

## 🗄️ Backend/BaaS Stack

### Database & Auth
- **Supabase** (Free Tier)
  - PostgreSQL 15
  - Row Level Security (RLS)
  - Realtime subscriptions
  - Storage (2GB)
  - Edge Functions (Serverless)

### Migrations
- **Supabase CLI** - Database migrations
- Location: `supabase/migrations/*.sql`

---

## 🔌 Integrations

### Email
- **Resend API** - Email delivery
  - Free tier: 100 emails/day
  - Used for: Quotation emails
  - Edge Function: `send-quotation-email`

### Future Integrations
- **Slack Webhook** - Notifications (planejado)
- **Google Calendar API** - Events (planejado)
- **WhatsApp Business API** - Messaging (fase 4)

---

## 🚀 Deploy & Infrastructure

### Hosting
- **Vercel** (Free Tier)
  - Auto-deploy from GitHub
  - Edge Functions
  - Preview deploys
  - SSL included

### Monitoring
- **Vercel Analytics** - Performance monitoring
- **Sentry** - Error tracking (planejado)

### Version Control
- **Git** + **GitHub**
- Branch strategy: main (production)

---

## 📦 Package Manager
- **npm** - Package management
- Lock file: `package-lock.json` (committed)

---

## 🧪 Testing Stack (Planejado)

### Unit Tests
- **Vitest** - Test runner
- **Testing Library** - React testing

### E2E Tests
- **Playwright** - End-to-end testing

---

## 📁 Project Structure

```
stagetek-crm-system/
├── src/
│   ├── components/     ← Atomic Design
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   ├── pages/          ← Route components
│   ├── hooks/          ← Custom hooks
│   ├── lib/            ← Utilities
│   ├── types/          ← TypeScript types
│   └── App.tsx
├── supabase/
│   └── migrations/     ← Database migrations
├── public/             ← Static assets
└── docs/               ← Documentation (BMAD)
```

---

## 🔒 Security Constraints

### Free Tier Limits
- **Supabase**: 500MB DB, 2GB Storage, 5GB bandwidth
- **Vercel**: 100GB bandwidth, 6000 build minutes
- **Resend**: 100 emails/day

### Security Features
- Row Level Security (RLS) on all tables
- JWT authentication via Supabase
- HTTPS enforced (Vercel)
- CORS configured

---

## 📚 Dependencies Overview

### Production Dependencies (Key)
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "@supabase/supabase-js": "^2.45.4",
  "tailwindcss": "^3.4.13",
  "lucide-react": "^0.451.0",
  "@dnd-kit/core": "^6.1.0",
  "@react-pdf/renderer": "^4.0.0",
  "recharts": "^2.12.7",
  "date-fns": "^4.1.0"
}
```

### Dev Dependencies (Key)
```json
{
  "typescript": "~5.6.2",
  "vite": "^5.4.8",
  "@vitejs/plugin-react": "^4.3.2",
  "eslint": "^9.11.1",
  "prettier": "^3.3.3"
}
```

---

## 🎯 Technology Decisions (ADRs)

### ADR-001: Why Supabase over Firebase?
- ✅ PostgreSQL (SQL vs NoSQL)
- ✅ Row Level Security out-of-the-box
- ✅ Better for B2B relational data
- ✅ Free tier more generous

### ADR-002: Why Tailwind over styled-components?
- ✅ Protocol Notecraft™ compliance
- ✅ Faster development
- ✅ Mobile-first by default
- ✅ Zero runtime CSS-in-JS overhead

### ADR-003: Why @dnd-kit over react-beautiful-dnd?
- ✅ Mobile-friendly (touch support)
- ✅ Actively maintained
- ✅ Better accessibility
- ✅ Smaller bundle size

### ADR-004: Why Resend over SendGrid?
- ✅ Simpler API
- ✅ Better free tier (100/day vs 100/lifetime)
- ✅ Edge Function compatible
- ✅ Modern developer experience

---

## 🔄 Upgrade Path

### Future Stack Additions
- **Zustand** - When real-time state becomes complex
- **React Query** - Already decided, implement gradually
- **Playwright** - When E2E testing becomes critical
- **Sentry** - Before production launch

### Migration Considerations
- Keep TypeScript strict mode enabled
- Maintain Protocol Notecraft™ compliance
- Zero-downtime migrations only
- Feature flags for gradual rollouts

---

**Última atualização**: 25 de Outubro de 2025
**Mantenedor**: Tech Lead
**Review cycle**: Trimestral
