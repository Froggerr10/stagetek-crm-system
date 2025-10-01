# STAGETEK CRM System - Claude Configuration

**INSTRUÇÕES CRÍTICAS: SIGA RIGOROSAMENTE O PROTOCOL NOTECRAFT™**

## 🎯 Contexto do Projeto

**STAGETEK = Fabricante B2B de Equipamentos para Entretenimento**

- 🏭 **Indústria**: Fabricação de peças de aço, talhas, estruturas
- 🛒 **Revenda**: Equipamentos de som e luz
- 🌍 **Mercado**: Nacional (BR) + Internacional (exportação)
- 👥 **Usuários**: 5 máximo (uso interno)
- 💰 **Budget**: ZERO (Supabase Free + Vercel Free)

**Versão**: 2.0.0 (Reboot completo)
**Stack**: React + Vite + TypeScript + Tailwind 3.4 + Supabase
**Padrão**: Atomic Design + Protocol Notecraft™
**Mobile**: PWA (Progressive Web App) - Mobile-first obrigatório

---

## ⚠️ STACK TECNOLÓGICA DEFINIDA

### **Frontend**
```
✅ React 18 + TypeScript
✅ Vite (build tool)
✅ Tailwind CSS 3.4 (estável)
✅ shadcn/ui (componentes base)
✅ Recharts (gráficos)
✅ React Hook Form + Zod (forms + validação)
✅ dnd-kit (drag-and-drop mobile-friendly)
✅ date-fns (datas PT-BR)
✅ Zustand (state management leve)
```

### **Backend/BaaS**
```
✅ Supabase (Free Tier):
   - PostgreSQL (500MB)
   - Auth (autenticação)
   - Storage (2GB arquivos)
   - Realtime (WebSockets)
   - Edge Functions (serverless)
```

### **Integrações** (via API direta, SEM Rube MCP)
```
✅ E-mail: Resend API (grátis 100/dia)
✅ Slack: Webhook (grátis)
✅ Google Calendar: Google Calendar API
✅ WhatsApp: WhatsApp Business API (fase 4)
✅ CNPJ/CEP: brasil-api-mcp (MCP instalado)
```

### **Deploy**
```
✅ Vercel (Free Tier)
   - Deploy automático via GitHub
   - Edge Functions
   - Preview deploys
   - SSL grátis
```

### **AI** (Opcional - Fases avançadas)
```
✅ Claude API (Lead Scoring, análises)
✅ Whisper API (transcrição de calls - opcional)
```

---

## 📁 Estrutura do Projeto (NOVA)

```
stagetek-crm-system/
├── .claude/
│   └── CLAUDE.md                    ← VOCÊ ESTÁ AQUI
├── protocol/
│   ├── PROTOCOL-NOTECRAFT.md        ← LER SEMPRE
│   ├── BRANDING-STANDARDS.md        ← LER SEMPRE
│   ├── ARCHITECTURE.md              ← Arquitetura completa
│   ├── FEATURES-PRIORITIZED.md      ← Features P0/P1/P2/P3
│   ├── TECH-STACK.md                ← Stack detalhada
│   ├── ROADMAP-PHASES.md            ← Roadmap 6 fases
│   ├── ARCHITECTURE-MOBILE.md       ← Estratégia PWA
│   ├── COSTS-ESTIMATE.md            ← Custos projetados
│   └── COMPLEXITY-ASSESSMENT.md     ← Análise de riscos
├── src/
│   ├── components/
│   │   ├── atoms/                   ← ≤20 linhas
│   │   ├── molecules/               ← ≤35 linhas
│   │   ├── organisms/               ← ≤50 linhas
│   │   └── templates/               ← ≤30 linhas
│   ├── pages/
│   │   ├── Dashboard.tsx            🚧 TODO
│   │   ├── Clientes.tsx             🚧 TODO
│   │   ├── Oportunidades.tsx        🚧 TODO
│   │   ├── Produtos.tsx             🚧 TODO
│   │   └── Relatorios.tsx           🚧 TODO
│   ├── hooks/
│   │   ├── useSupabase.ts
│   │   └── useAuth.ts
│   ├── lib/
│   │   ├── supabase.ts              ← Cliente Supabase
│   │   └── utils.ts
│   └── types/
│       └── index.ts                 ← TypeScript types
├── supabase/
│   ├── migrations/                  ← SQL migrations
│   └── seed.sql                     ← Dados iniciais
├── public/
│   └── assets/
└── README.md
```

---

## 🎯 MODELO DE NEGÓCIO STAGETEK

### **3 Operações:**

1. **🏭 FABRICAÇÃO** (Principal)
   - Peças de aço (treliças, estruturas metálicas)
   - Talhas e equipamentos de suspensão
   - Customização sob medida
   - **Venda por peça** (não aluguel!)

2. **🛒 REVENDA**
   - Equipamentos de som (mesas, caixas)
   - Equipamentos de luz (moving heads, pares LED)
   - Produtos de fornecedores

3. **🎪 LOCAÇÃO** (Secundário)
   - Equipamentos próprios para eventos
   - Gestão de disponibilidade

---

## 📊 FEATURES PRIORITIZADAS

### **P0 - CRÍTICO (MVP - Sem isso não funciona)**

```
1. Autenticação (Login/Logout)
2. CRUD Clientes B2B
3. CRUD Oportunidades
4. Funil de Vendas (Kanban)
5. Dashboard Básico
```

**Tempo estimado P0**: 4-6 semanas

---

### **P1 - ALTA PRIORIDADE (CRM Funcional)**

```
6. CRUD Produtos (catálogo 50+)
7. Importação Excel (produtos + clientes)
8. Sistema de Cotações (produtos + frete + PDF)
9. Sistema de Pedidos (tracking)
10. Integrações (Gmail, Slack, Calendar)
```

**Tempo estimado P1**: +8 semanas (total: 12-14 semanas / 3 meses)

---

### **P2 - MÉDIA PRIORIDADE (Gestão Avançada)**

```
11. Relatórios Gerenciais (conversão, DRE)
12. Gestão de Equipamentos (estoque)
13. Calendário de Eventos
14. Lead Scoring (AI)
```

**Tempo estimado P2**: +4 semanas (total: 16-18 semanas / 4 meses)

---

### **P3 - BAIXA PRIORIDADE (Nice to Have)**

```
15. AI SDR (bot WhatsApp 24/7) ⚠️ Complexo!
16. Call Recording + AI Analysis ⚠️ LGPD!
17. Multi-idioma (EN, ES)
18. Mobile App Nativo
```

**Tempo estimado P3**: +8-12 semanas (total: 24-30 semanas / 6-7 meses)

**Recomendação**: PULAR P3 no primeiro ano.

---

## 🚨 DECISÕES IMPORTANTES

### **✅ O QUE VAMOS FAZER:**

1. **Mobile-First PWA** (não React Native)
   - Instalável no home screen
   - Funciona offline (Service Worker)
   - Push notifications
   - Único codebase

2. **Supabase como Backend** (não API própria)
   - Row Level Security (RLS)
   - Postgres (não MongoDB)
   - Edge Functions (não Express)

3. **Integrações Diretas** (sem Rube MCP)
   - APIs diretas (Resend, Slack Webhook, Google Calendar API)
   - Mais controle, menos dependências

4. **Lead Scoring com AI** (Phase 2)
   - Claude API para análise
   - Score 0-100 automático
   - Temperatura: 🔥 Hot / 🌡️ Warm / 🧊 Cold

---

### **❌ O QUE NÃO VAMOS FAZER:**

1. **Rube MCP** - Não está estável/disponível
2. **AI SDR Bot WhatsApp** - Muito complexo, ROI incerto
3. **Call Recording + AI** - Riscos LGPD, custos altos
4. **n8n** - Overhead desnecessário (Supabase Edge Functions suficiente)
5. **Telefonia VoIP** - Não essencial para 5 usuários

---

## 📱 MOBILE-FIRST OBRIGATÓRIO

### **Checklist Mobile:**

- ✅ Tailwind responsive (sm/md/lg/xl breakpoints)
- ✅ Bottom nav bar (não sidebar lateral)
- ✅ Touch gestures (dnd-kit para drag-drop)
- ✅ Forms multi-step (não forms longos)
- ✅ Modals full-screen mobile
- ✅ Data tables → cards em mobile
- ✅ Lighthouse Score >85
- ✅ PWA manifest + service worker
- ✅ Offline support (cache crítico)

---

## 🔐 SEGURANÇA

### **Variáveis de Ambiente:**

```bash
# .env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
RESEND_API_KEY=re_xxx
SLACK_WEBHOOK_URL=https://hooks.slack.com/xxx
GOOGLE_CALENDAR_API_KEY=AIzaxxx
CLAUDE_API_KEY=sk-ant-xxx
```

**NUNCA** commitar `.env` (adicionar no `.gitignore`)!

---

## 🧑‍💻 MCPs DISPONÍVEIS (Claude Desktop)

### **✅ Usaremos:**

1. **shadcn-ui** - Gerar componentes React
2. **@magicuidesign/mcp** - UI animada
3. **brasil-api-mcp** - Validar CNPJ, buscar CEP
4. **github** - Commits, PRs
5. **filesystem** - Ler/escrever arquivos
6. **memory** - Lembrar decisões entre sessões

### **📋 Opcionais:**

7. **playwright-mcp** - Testes E2E (Fase 6)
8. **whimsical-mcp** - Diagramas
9. **notion** - Docs (se usar Notion)

### **❌ Não Usar:**

- desktop-commander (desnecessário)
- actors/firecrawl (scraping, não precisa)
- gemini-thinking (já temos Claude)
- sequential-thinking (overhead)

---

## ⚠️ REGRAS ABSOLUTAS - PROTOCOL NOTECRAFT™

### 1. **Limites de Linhas (RÍGIDO)**
- ✅ **Atoms**: máximo 20 linhas
- ✅ **Molecules**: máximo 35 linhas
- ✅ **Organisms**: máximo 50 linhas
- ✅ **Templates**: máximo 30 linhas
- ❌ **NUNCA** exceda esses limites

### 2. **TypeScript Strict**
```typescript
// ✅ SEMPRE tipar:
interface Client {
  id: string
  name: string
  cnpj: string
  email: string
}

// ❌ NUNCA usar any:
const data: any = fetchData() // ❌ PROIBIDO
```

### 3. **Tailwind CSS (não CSS custom)**
```tsx
// ✅ CORRETO:
<div className="px-4 py-2 bg-red-50 rounded-lg">

// ❌ ERRADO:
<div style={{ padding: '8px 16px', background: '#ffeded' }}>
```

### 4. **Design Tokens STAGETEK**
```typescript
// tailwind.config.js
colors: {
  stagetek: {
    red: '#e90101',
    'red-medium': '#862128',
    'red-dark': '#63141a',
  }
}

// Uso:
<div className="bg-stagetek-red text-white">
```

### 5. **Componentes Controlados**
```tsx
// ✅ SEMPRE usar state:
const [value, setValue] = useState('')
<input value={value} onChange={e => setValue(e.target.value)} />

// ❌ NUNCA uncontrolled:
<input defaultValue="..." /> // ❌
```

---

## 🔧 Comandos Úteis

```bash
# Setup inicial
npm create vite@latest stagetek-crm-frontend -- --template react-ts
cd stagetek-crm-frontend
npm install

# Instalar dependências
npm install @supabase/supabase-js tailwindcss
npm install react-hook-form zod
npm install recharts date-fns
npm install zustand

# shadcn/ui (usar MCP)
# Pedir no chat: "Usar shadcn-ui para criar Button component"

# Dev server
npm run dev

# Build produção
npm run build

# Preview build
npm run preview

# Deploy Vercel
vercel --prod
```

---

## ✅ Checklist ANTES de Codar

- [ ] Li `/protocol/PROTOCOL-NOTECRAFT.md`
- [ ] Li `/protocol/BRANDING-STANDARDS.md`
- [ ] Entendo os limites de linhas
- [ ] Vou usar TypeScript strict
- [ ] Vou usar Tailwind (não CSS inline)
- [ ] Vou usar shadcn/ui como base
- [ ] Mobile-first (testar no celular)
- [ ] Componente tem Single Responsibility
- [ ] Vou tipar tudo (interfaces/types)

---

## 🚫 O Que NUNCA Fazer

1. ❌ Componentes acima do limite de linhas
2. ❌ `any` no TypeScript
3. ❌ CSS inline (`style={{ ... }}`)
4. ❌ Cores hardcoded (`#e90101` direto)
5. ❌ Emojis como ícones (usar Lucide React)
6. ❌ Forms não controlados
7. ❌ Fetch direto (usar Supabase client)
8. ❌ localStorage sem validação
9. ❌ Commits sem mensagem clara
10. ❌ Deploy sem testar mobile

---

## 💡 Padrões de Código

### **Nomenclatura:**

```typescript
// Files: PascalCase
ClientCard.tsx
useAuth.ts

// Components: PascalCase
export const ClientCard: React.FC<ClientCardProps> = ({ ... }) => {}

// Functions: camelCase
const calculateTotal = (items: Item[]) => {}

// Constants: UPPER_SNAKE_CASE
const MAX_UPLOAD_SIZE = 5 * 1024 * 1024 // 5MB

// Types/Interfaces: PascalCase
interface ClientCardProps { ... }
type Status = 'active' | 'inactive'
```

### **Imports:**

```typescript
// Ordem:
import React from 'react'                    // 1. React
import { useQuery } from '@tanstack/react-query' // 2. External libs
import { supabase } from '@/lib/supabase'   // 3. Internal libs
import { Button } from '@/components/atoms' // 4. Components
import type { Client } from '@/types'       // 5. Types
import './ClientCard.css'                   // 6. Styles (se houver)
```

---

## 📚 Referências Rápidas

### **Cores STAGETEK (Tailwind)**
```
bg-stagetek-red       → #e90101
bg-stagetek-red-medium → #862128
bg-stagetek-red-dark   → #63141a
text-stagetek-red
border-stagetek-red
```

### **Spacing (Tailwind)**
```
p-1  → 4px
p-2  → 8px
p-3  → 12px
p-4  → 16px (padrão)
p-6  → 24px
p-8  → 32px
p-16 → 64px
```

### **Supabase Queries**
```typescript
// Select
const { data, error } = await supabase
  .from('clients')
  .select('*')
  .eq('status', 'active')

// Insert
const { data, error } = await supabase
  .from('clients')
  .insert({ name: 'João', cnpj: '...' })

// Update
const { data, error } = await supabase
  .from('clients')
  .update({ status: 'inactive' })
  .eq('id', clientId)

// Delete
const { data, error } = await supabase
  .from('clients')
  .delete()
  .eq('id', clientId)
```

---

## 🏆 Meta de Qualidade

- **100%** Protocol Notecraft™ compliance
- **100%** TypeScript (zero `any`)
- **>85** Lighthouse Score (mobile)
- **<500KB** bundle size (gzipped)
- **>95%** responsividade mobile
- **100%** dark mode support

---

## 🎯 Exemplo de Conversa Ideal

**Usuário**: "Criar componente de card de cliente"

**Claude**:
```
Vou criar ClientCard seguindo Protocol Notecraft™:

📁 src/components/molecules/ClientCard.tsx (≤35 linhas)

- Avatar com iniciais
- Nome + CNPJ
- Stats (eventos, receita)
- Badge de status
- Actions (editar, excluir)

Usando:
✅ TypeScript strict
✅ Tailwind CSS
✅ shadcn/ui Button
✅ Lucide React icons
✅ Mobile-first
```

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**

**Última atualização**: 1 de Outubro de 2025
