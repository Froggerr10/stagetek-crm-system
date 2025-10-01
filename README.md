# STAGETEK CRM System

**CRM B2B para Fabricante de Equipamentos de Entretenimento**

[![Protocol Notecraft™](https://img.shields.io/badge/Protocol-Notecraft™-e90101)](./protocol/PROTOCOL-NOTECRAFT.md)
[![React](https://img.shields.io/badge/React-18-61dafb)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6)]()
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ecf8e)]()
[![Status](https://img.shields.io/badge/Status-Planning-yellow)]()
[![Version](https://img.shields.io/badge/Version-2.0.0-blue)]()

---

## 🎯 Sobre o Projeto

**STAGETEK** é fabricante B2B de equipamentos para o segmento de entretenimento:
- 🏭 **Fabricação**: Peças de aço, talhas, estruturas metálicas (produto principal)
- 🛒 **Revenda**: Equipamentos de som e luz
- 🌍 **Mercado**: Nacional (Brasil) + Internacional (exportação USD/EUR)

**Este CRM** gerencia todo o ciclo de vendas B2B:
- Pipeline de oportunidades (Kanban)
- Catálogo de produtos (~50 itens)
- Cotações com cálculo de frete
- Pedidos com tracking
- Relatórios gerenciais (DRE, conversão, lead scoring)

**Budget**: ZERO (uso interno, 5 usuários)

---

## 🚀 Stack Tecnológica

### **Frontend**
```
✅ React 18 + TypeScript
✅ Vite (build ultra-rápido)
✅ Tailwind CSS 3.4 (estável)
✅ shadcn/ui (componentes base)
✅ Recharts (gráficos)
✅ React Hook Form + Zod (forms + validação)
✅ dnd-kit (drag-and-drop mobile-friendly)
✅ date-fns (datas PT-BR)
✅ Zustand (state management leve)
```

### **Backend (BaaS)**
```
✅ Supabase (Free Tier):
   - PostgreSQL (500MB database)
   - Auth (autenticação pronta)
   - Storage (2GB para PDFs/imagens)
   - Realtime (WebSockets)
   - Edge Functions (serverless)
```

### **Integrações** (APIs diretas)
```
✅ E-mail: Resend API (100 envios/dia grátis)
✅ Slack: Webhook (notificações)
✅ Google Calendar: API oficial
✅ WhatsApp: WhatsApp Business API (fase 4)
✅ CNPJ/CEP: brasil-api-mcp
```

### **Deploy**
```
✅ Vercel (Free Tier):
   - Deploy automático via GitHub
   - Edge Functions
   - SSL grátis
   - Preview deploys
```

### **AI** (Opcional - Fases 5-6)
```
✅ Claude API: Lead Scoring, análises
✅ Whisper API: Transcrição de calls (opcional)
```

---

## 📁 Estrutura do Projeto

```
stagetek-crm-system/
├── .claude/
│   └── CLAUDE.md                    # ⭐ Instruções para Claude Code
├── protocol/
│   ├── PROTOCOL-NOTECRAFT.md        # Regras de desenvolvimento
│   ├── BRANDING-STANDARDS.md        # Padrões de marca STAGETEK
│   ├── ARCHITECTURE.md              # Arquitetura completa
│   ├── FEATURES-PRIORITIZED.md      # Features P0/P1/P2/P3
│   ├── TECH-STACK.md                # Stack detalhada
│   ├── ROADMAP-PHASES.md            # Roadmap 6 fases
│   ├── ARCHITECTURE-MOBILE.md       # Estratégia PWA
│   ├── COSTS-ESTIMATE.md            # Custos projetados
│   ├── COMPLEXITY-ASSESSMENT.md     # Análise de riscos
│   └── PRD.md                       # Product Requirements Document
├── src/
│   ├── components/
│   │   ├── atoms/                   # Componentes ≤20 linhas
│   │   ├── molecules/               # Componentes ≤35 linhas
│   │   ├── organisms/               # Componentes ≤50 linhas
│   │   └── templates/               # Layouts ≤30 linhas
│   ├── pages/
│   │   ├── Dashboard.tsx            # Dashboard principal
│   │   ├── Clientes.tsx             # CRUD clientes B2B
│   │   ├── Oportunidades.tsx        # Funil de vendas (Kanban)
│   │   ├── Produtos.tsx             # Catálogo de produtos
│   │   └── Relatorios.tsx           # Relatórios gerenciais
│   ├── hooks/
│   │   ├── useSupabase.ts
│   │   ├── useAuth.ts
│   │   └── useLeadScoring.ts        # AI Lead Scoring
│   ├── lib/
│   │   ├── supabase.ts              # Cliente Supabase
│   │   ├── utils.ts
│   │   └── validators.ts            # Validações (CNPJ, etc)
│   └── types/
│       └── index.ts                 # TypeScript types
├── supabase/
│   ├── migrations/                  # SQL migrations
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_rls_policies.sql
│   │   └── 003_seed_data.sql
│   └── functions/                   # Edge Functions
│       ├── send-quote-email/        # Envio de cotações
│       └── calculate-lead-score/    # AI Lead Scoring
├── public/
│   ├── assets/
│   │   └── logos/                   # Logos STAGETEK
│   └── manifest.json                # PWA manifest
├── .env.example                     # Variáveis de ambiente (template)
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts               # Config Tailwind + cores STAGETEK
└── vite.config.ts
```

---

## ⚡ Quick Start

### **1. Pré-requisitos**

```bash
# Node.js 18+
node --version

# npm ou pnpm
npm --version
```

### **2. Clone o Repositório**

```bash
git clone https://github.com/stagetek/stagetek-crm-system.git
cd stagetek-crm-system
```

### **3. Instalar Dependências**

```bash
npm install
```

### **4. Configurar Variáveis de Ambiente**

```bash
# Copiar template
cp .env.example .env

# Editar com suas credenciais
# .env
VITE_SUPABASE_URL=https://[project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
RESEND_API_KEY=re_[your-key]
SLACK_WEBHOOK_URL=https://hooks.slack.com/[your-webhook]
```

### **5. Setup Supabase**

```bash
# Criar projeto em https://supabase.com

# Executar migrations
npx supabase db push

# Aplicar RLS policies
npx supabase db push --schema auth
```

### **6. Rodar Desenvolvimento**

```bash
npm run dev

# Abrir: http://localhost:5173
```

### **7. Build Produção**

```bash
npm run build
npm run preview
```

---

## 🎯 Features (Priorização)

### **P0 - CRÍTICO (MVP - 4-6 semanas)**

Sem isso o CRM não funciona:

| # | Feature | Tempo Est. |
|---|---------|------------|
| 1 | Autenticação (Login/Logout) | 3-5 dias |
| 2 | CRUD Clientes B2B | 5-7 dias |
| 3 | CRUD Oportunidades | 5-7 dias |
| 4 | Funil de Vendas (Kanban) | 5-7 dias |
| 5 | Dashboard Básico | 3-4 dias |

**Total P0**: 21-30 dias (4-6 semanas)

---

### **P1 - ALTA (CRM Funcional - +8 semanas)**

| # | Feature | Tempo Est. |
|---|---------|------------|
| 6 | CRUD Produtos (catálogo 50+) | 5 dias |
| 7 | Importação Excel (produtos + clientes) | 5 dias |
| 8 | Sistema de Cotações (produtos + frete + PDF) | 10 dias |
| 9 | Sistema de Pedidos (tracking) | 7 dias |
| 10 | Integrações (Gmail, Slack, Calendar) | 10 dias |

**Total P1**: +37 dias (+8 semanas)

**MVP Funcional**: 12-14 semanas (~3 meses)

---

### **P2 - MÉDIA (Gestão Avançada - +4 semanas)**

| # | Feature | Tempo Est. |
|---|---------|------------|
| 11 | Relatórios Gerenciais (conversão, DRE) | 10 dias |
| 12 | Gestão de Equipamentos (estoque) | 5 dias |
| 13 | Calendário de Eventos | 5 dias |
| 14 | Lead Scoring (AI) | 5 dias |

**Total P2**: +25 dias (+4 semanas)

**CRM Completo**: 16-18 semanas (~4 meses)

---

### **P3 - BAIXA (Nice to Have - ⚠️ Pular no primeiro ano)**

| # | Feature | Complexidade | Recomendação |
|---|---------|--------------|--------------|
| 15 | AI SDR (bot WhatsApp 24/7) | 🔴 EXTREMA | ❌ NÃO FAZER |
| 16 | Call Recording + AI Analysis | 🔴 EXTREMA | ❌ NÃO FAZER |
| 17 | Multi-idioma (EN, ES) | 🟡 MÉDIA | ⏸️ Fase 2.0 |
| 18 | Mobile App Nativo | 🟡 MÉDIA | ⏸️ PWA suficiente |

**Motivo**: Complexidade EXTREMA, custos altos, ROI incerto, riscos LGPD.

---

## 📱 Mobile-First (PWA)

### **Estratégia: Progressive Web App**

✅ **Vantagens PWA**:
- 1 único codebase (React)
- Deploy instantâneo (sem App Store review)
- Custo ZERO (sem fees de Apple/Google)
- Atualizações automáticas
- Instalável no home screen
- Push notifications
- Funciona offline (Service Worker)

### **Checklist Mobile:**

- ✅ Tailwind responsive (sm/md/lg/xl)
- ✅ Bottom nav bar (não sidebar lateral)
- ✅ Touch gestures (dnd-kit para drag-drop)
- ✅ Forms multi-step (não forms longos)
- ✅ Modals full-screen em mobile
- ✅ Data tables → cards em mobile
- ✅ Lighthouse Score >85
- ✅ Bundle size <500KB (gzipped)

---

## 💰 Custos Projetados

### **MVP (Meses 1-3)**
```
Supabase Free:    R$ 0,00
Vercel Free:      R$ 0,00
Domínio:          R$ 3,33/mês
────────────────────────
TOTAL:            R$ 3,33/mês
```

### **Produção (Meses 4-6)**
```
Supabase Free:    R$ 0,00
Vercel Free:      R$ 0,00
Claude API:       R$ 25/mês (testes)
Resend:           R$ 0,00 (100/dia grátis)
Domínio:          R$ 3,33/mês
────────────────────────
TOTAL:            R$ 28,33/mês
```

### **AI Features (Meses 7+)**
```
Supabase Pro:     R$ 125/mês (se >500MB)
Claude API:       R$ 50-95/mês (Lead Scoring)
Whisper:          R$ 15/mês (transcrições)
Domínio:          R$ 3,33/mês
────────────────────────
TOTAL:            R$ 193-238/mês
```

**Comparação**: Pipedrive custa R$ 395/mês (5 users) → **Economia de 50-75%**

---

## 🏆 Protocol Notecraft™

Este projeto segue **rigorosamente** o Protocol Notecraft™:

### **Limites de Código (RÍGIDO)**
- ✅ **Atoms**: máximo 20 linhas
- ✅ **Molecules**: máximo 35 linhas
- ✅ **Organisms**: máximo 50 linhas
- ✅ **Templates**: máximo 30 linhas

### **Princípios**
- ✅ Single Responsibility (componente faz 1 coisa)
- ✅ TypeScript Strict (zero `any`)
- ✅ Tailwind CSS (não CSS inline)
- ✅ Mobile-first (PWA obrigatório)
- ✅ 100% CSS Custom Properties (cores STAGETEK)

**Documentação completa**: [`protocol/PROTOCOL-NOTECRAFT.md`](./protocol/PROTOCOL-NOTECRAFT.md)

---

## 🎨 Design System

### **Cores STAGETEK** (Tailwind)

```typescript
// tailwind.config.ts
colors: {
  stagetek: {
    red: '#e90101',         // Primary
    'red-medium': '#862128', // Medium
    'red-dark': '#63141a',   // Dark
  }
}

// Uso:
<div className="bg-stagetek-red text-white">
```

### **Componentes Disponíveis** (shadcn/ui)

```bash
# Gerar componentes via MCP:
# No chat: "Usar shadcn-ui para criar Button component"

# Componentes base:
- Button, Input, Select, Checkbox
- Card, Dialog, Popover, Tooltip
- Table, Tabs, Badge, Avatar
- DatePicker, Calendar, Form
```

---

## 🧑‍💻 Desenvolvimento

### **Comandos Úteis**

```bash
# Dev server
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Lint
npm run lint

# Format
npm run format

# Supabase (local)
npx supabase start
npx supabase db push

# Deploy Vercel
vercel --prod
```

### **Estrutura de Commits**

```bash
# Formato:
<type>: <description>

# Exemplos:
feat: add Client CRUD
fix: correct lead scoring calculation
docs: update README with new stack
style: format code with prettier
refactor: extract useAuth hook
test: add unit tests for ClientCard
chore: update dependencies
```

---

## 🔐 Segurança

### **Variáveis de Ambiente**

```bash
# .env (NUNCA commitar!)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
RESEND_API_KEY=re_xxx
SLACK_WEBHOOK_URL=https://hooks.slack.com/xxx
CLAUDE_API_KEY=sk-ant-xxx
```

### **Row Level Security (RLS)**

```sql
-- Supabase RLS Policy (exemplo)
CREATE POLICY "Users can only see their own opportunities"
ON opportunities FOR SELECT
USING (auth.uid() = assigned_to);
```

---

## 📚 Documentação

### **Protocol & Architecture**
- [`PROTOCOL-NOTECRAFT.md`](./protocol/PROTOCOL-NOTECRAFT.md) - Regras de código
- [`BRANDING-STANDARDS.md`](./protocol/BRANDING-STANDARDS.md) - Marca STAGETEK
- [`ARCHITECTURE.md`](./protocol/ARCHITECTURE.md) - Arquitetura completa

### **Planning & Roadmap**
- [`FEATURES-PRIORITIZED.md`](./protocol/FEATURES-PRIORITIZED.md) - Priorização P0-P3
- [`ROADMAP-PHASES.md`](./protocol/ROADMAP-PHASES.md) - Roadmap 6 fases
- [`COMPLEXITY-ASSESSMENT.md`](./protocol/COMPLEXITY-ASSESSMENT.md) - Riscos

### **Technical**
- [`TECH-STACK.md`](./protocol/TECH-STACK.md) - Stack detalhada
- [`ARCHITECTURE-MOBILE.md`](./protocol/ARCHITECTURE-MOBILE.md) - PWA mobile
- [`COSTS-ESTIMATE.md`](./protocol/COSTS-ESTIMATE.md) - Custos detalhados

### **Product**
- [`PRD.md`](./protocol/PRD.md) - Product Requirements Document
- [`.claude/CLAUDE.md`](./.claude/CLAUDE.md) - Instruções Claude Code

---

## 🚧 Roadmap (6 Fases)

### **Fase 1: Setup + MVP (2 semanas)**
- [ ] Projeto Vite + React + TypeScript
- [ ] Supabase (database + auth)
- [ ] Design system (Tailwind + shadcn/ui)
- [ ] Deploy Vercel
- [ ] Autenticação funcional

### **Fase 2: Core CRM (6 semanas)**
- [ ] CRUD Clientes
- [ ] CRUD Oportunidades
- [ ] Funil de Vendas (Kanban)
- [ ] Dashboard básico
- [ ] CRUD Produtos

### **Fase 3: Advanced Features (4 semanas)**
- [ ] Sistema de Cotações (produtos + frete + PDF)
- [ ] Sistema de Pedidos (tracking)
- [ ] Importação Excel

### **Fase 4: Integrações (3 semanas)**
- [ ] Gmail (envio de propostas)
- [ ] Slack (notificações)
- [ ] Google Calendar (eventos)
- [ ] WhatsApp Business (opcional)

### **Fase 5: Relatórios (4 semanas)**
- [ ] Dashboard executivo
- [ ] Conversão de leads
- [ ] Motivos de perda
- [ ] Faturamento (DRE básico)
- [ ] Lead Scoring (AI)

### **Fase 6: Polish + Launch (2 semanas)**
- [ ] PWA (manifest + service worker)
- [ ] Testes E2E
- [ ] Performance optimization
- [ ] Treinamento equipe

**Total: 21 semanas (~5 meses) para CRM completo**

**Roadmap completo**: [`protocol/ROADMAP-PHASES.md`](./protocol/ROADMAP-PHASES.md)

---

## 👥 Equipe

**STAGETEK Engineering Team**

Built with ❤️ following **Protocol Notecraft™**

---

## 📄 Licença

Copyright © 2025 STAGETEK. Todos os direitos reservados.

---

## 🔗 Links Úteis

- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Vite](https://vitejs.dev)

---

**Versão**: 2.0.0 (Reboot completo)
**Última atualização**: 1 de Outubro de 2025
