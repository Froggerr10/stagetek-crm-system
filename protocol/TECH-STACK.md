# STAGETEK CRM - Tech Stack Completa
**Protocol Notecraft™ Technical Architecture**

---

## 🎯 Stack Overview

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                            │
│  React 18 + TypeScript + Vite + Tailwind 3.4           │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                   STATE MANAGEMENT                       │
│     Zustand + React Query + React Hook Form             │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    BACKEND/BaaS                          │
│    Supabase (Auth + Database + Storage + Realtime)      │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    AI & INTEGRAÇÕES                      │
│  Claude API + Whisper/Deepgram + Rube MCP Platform      │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                      DEPLOYMENT                          │
│        Vercel (Frontend + Edge Functions)               │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 Frontend Stack

### Core Framework
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "typescript": "^5.6.0",
  "vite": "^5.4.0"
}
```

**Por quê?**
- React 18: Server Components, Suspense, Concurrent Rendering
- TypeScript: Type safety obrigatório (Protocol Notecraft™)
- Vite: Build 10x mais rápido que Webpack, HMR instantâneo

---

### Styling & UI
```json
{
  "tailwindcss": "^3.4.0",
  "@tailwindcss/forms": "^0.5.7",
  "@tailwindcss/typography": "^0.5.13",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```

**Configuração Tailwind Custom**:
```js
// tailwind.config.js
export default {
  darkMode: 'class', // data-theme="dark"
  theme: {
    extend: {
      colors: {
        stagetek: {
          red: {
            primary: '#e90101',
            medium: '#862128',
            dark: '#63141a'
          },
          white: '#fbfafb',
          black: '#000000',
          gray: '#727272'
        }
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        6: '24px',
        8: '32px',
        16: '64px'
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        full: '9999px'
      }
    }
  }
}
```

---

### Component Libraries
```json
{
  "@radix-ui/react-dialog": "^1.1.0",
  "@radix-ui/react-dropdown-menu": "^2.1.0",
  "@radix-ui/react-select": "^2.1.0",
  "@radix-ui/react-tabs": "^1.1.0",
  "@radix-ui/react-toast": "^1.2.0",
  "react-icons": "^5.3.0",
  "lucide-react": "^0.400.0"
}
```

**Por quê Radix UI?**
- Unstyled (total controle com Tailwind)
- Acessibilidade WAI-ARIA nativa
- Composable (perfeito para Protocol Notecraft™)
- Zero JavaScript desnecessário

---

### Charts & Visualizations
```json
{
  "recharts": "^2.12.0",
  "react-chartjs-2": "^5.2.0",
  "chart.js": "^4.4.0"
}
```

**Escolha**: **Recharts** (React-first, mais declarativo)
- Dashboard: Line charts, Bar charts, Pie charts
- Mobile-friendly e responsivo
- Leve (~45KB gzipped)

---

### Forms & Validation
```json
{
  "react-hook-form": "^7.53.0",
  "zod": "^3.23.0",
  "@hookform/resolvers": "^3.9.0"
}
```

**Exemplo de uso**:
```tsx
const schema = z.object({
  nome: z.string().min(3, 'Mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  cnpj: z.string().regex(/^\d{14}$/, 'CNPJ inválido')
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema)
});
```

---

### State Management
```json
{
  "zustand": "^4.5.0",
  "@tanstack/react-query": "^5.51.0"
}
```

**Arquitetura**:
- **Zustand**: Estado global leve (auth, theme, UI preferences)
- **React Query**: Cache de API, invalidações, optimistic updates
- **React Hook Form**: Estado local de formulários

**Exemplo Zustand Store**:
```tsx
// stores/authStore.ts
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false })
}));
```

---

### Drag & Drop
```json
{
  "@dnd-kit/core": "^6.1.0",
  "@dnd-kit/sortable": "^8.0.0",
  "@dnd-kit/utilities": "^3.2.2"
}
```

**Por quê dnd-kit?**
- Touch-friendly (mobile obrigatório)
- Acessível (keyboard navigation)
- Performance otimizada
- Zero dependencies pesadas

---

### Date Handling
```json
{
  "date-fns": "^3.6.0",
  "react-day-picker": "^8.10.0"
}
```

**Por quê date-fns?**
- Tree-shakeable (importa só o que usa)
- Imutável (sem bugs de mutação)
- Locale PT-BR nativo
- 97% menor que Moment.js

---

### Utilities
```json
{
  "axios": "^1.7.0",
  "react-hot-toast": "^2.4.1",
  "nanoid": "^5.0.0",
  "react-error-boundary": "^4.0.13",
  "react-helmet-async": "^2.0.5"
}
```

---

## 🗄️ Backend/BaaS (Supabase)

### Database Schema (PostgreSQL)

```sql
-- Tabela: clientes
CREATE TABLE clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  cnpj VARCHAR(14),
  tipo_cliente VARCHAR(20) CHECK (tipo_cliente IN ('nacional', 'internacional')),
  endereco JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Tabela: produtos
CREATE TABLE produtos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  categoria VARCHAR(50) CHECK (categoria IN ('som', 'luz', 'talhas', 'pecas_aco')),
  descricao TEXT,
  preco_unitario DECIMAL(10, 2),
  estoque_atual INTEGER DEFAULT 0,
  imagem_url TEXT,
  especificacoes JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: oportunidades
CREATE TABLE oportunidades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  valor_estimado DECIMAL(12, 2),
  estagio VARCHAR(50) CHECK (estagio IN ('lead', 'qualificacao', 'proposta', 'negociacao', 'fechado', 'perdido')),
  probabilidade INTEGER CHECK (probabilidade BETWEEN 0 AND 100),
  data_fechamento_estimada DATE,
  motivo_perda TEXT,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  owner_id UUID REFERENCES auth.users(id)
);

-- Tabela: cotacoes
CREATE TABLE cotacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  oportunidade_id UUID REFERENCES oportunidades(id) ON DELETE CASCADE,
  numero_cotacao VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(20) CHECK (status IN ('rascunho', 'enviada', 'aprovada', 'rejeitada')),
  itens JSONB NOT NULL, -- Array de {produto_id, quantidade, preco_unitario, subtotal}
  subtotal DECIMAL(12, 2),
  frete DECIMAL(10, 2),
  desconto DECIMAL(10, 2),
  total DECIMAL(12, 2),
  validade DATE,
  observacoes TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: pedidos
CREATE TABLE pedidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cotacao_id UUID REFERENCES cotacoes(id),
  cliente_id UUID REFERENCES clientes(id),
  numero_pedido VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(20) CHECK (status IN ('pendente', 'em_producao', 'enviado', 'entregue', 'cancelado')),
  data_entrega_estimada DATE,
  data_entrega_real DATE,
  total DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: eventos
CREATE TABLE eventos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  oportunidade_id UUID REFERENCES oportunidades(id),
  titulo VARCHAR(255) NOT NULL,
  data_inicio TIMESTAMP NOT NULL,
  data_fim TIMESTAMP NOT NULL,
  local VARCHAR(255),
  status VARCHAR(20) CHECK (status IN ('confirmado', 'pendente', 'cancelado')),
  equipamentos_ids UUID[],
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: lead_scoring
CREATE TABLE lead_scoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  oportunidade_id UUID REFERENCES oportunidades(id) ON DELETE CASCADE,
  score INTEGER CHECK (score BETWEEN 0 AND 100),
  fatores JSONB, -- {tamanho_deal: 20, engagement: 15, ...}
  calculado_em TIMESTAMP DEFAULT NOW()
);

-- Tabela: call_recordings
CREATE TABLE call_recordings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  oportunidade_id UUID REFERENCES oportunidades(id),
  audio_url TEXT NOT NULL,
  duracao INTEGER, -- segundos
  transcricao TEXT,
  analise_ia JSONB, -- {sentimento, objecoes, score_performance, insights}
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Row Level Security (RLS)
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE oportunidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotacoes ENABLE ROW LEVEL SECURITY;

-- Policies (exemplo)
CREATE POLICY "Users can view their own data"
  ON clientes FOR SELECT
  USING (auth.uid() = created_by);
```

---

### Supabase Features Utilizadas

#### 1. **Auth**
```typescript
// Supabase Auth
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
});

// Magic Link (opcional)
await supabase.auth.signInWithOtp({ email });
```

#### 2. **Storage** (PDFs de cotações, áudios de calls)
```typescript
// Upload de PDF
const { data, error } = await supabase.storage
  .from('cotacoes')
  .upload(`${cotacaoId}.pdf`, pdfBlob);

// Upload de áudio
await supabase.storage
  .from('call-recordings')
  .upload(`${callId}.webm`, audioBlob);
```

#### 3. **Realtime** (Notificações de oportunidades)
```typescript
// Escutar mudanças em oportunidades
const channel = supabase
  .channel('oportunidades-changes')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'oportunidades' },
    (payload) => {
      // Atualizar UI em tempo real
      console.log('Change:', payload);
    }
  )
  .subscribe();
```

---

## 🤖 AI & Integrações

### 1. Claude API (Anthropic)
```json
{
  "@anthropic-ai/sdk": "^0.27.0"
}
```

**Usecases**:
- Lead Scoring (análise de fit)
- AI SDR (conversação natural)
- Call Analysis (insights de vendas)
- Geração de propostas (rascunho automático)

**Exemplo de chamada**:
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

const message = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'Analise este lead e dê um score 0-100' }
  ]
});
```

---

### 2. Speech-to-Text (Whisper ou Deepgram)

**Opção 1: Whisper (OpenAI)** - Mais barato
```json
{
  "openai": "^4.52.0"
}
```

```typescript
const transcription = await openai.audio.transcriptions.create({
  file: audioFile,
  model: 'whisper-1',
  language: 'pt'
});
```

**Opção 2: Deepgram** - Mais rápido, melhor para realtime
```json
{
  "@deepgram/sdk": "^3.5.0"
}
```

```typescript
const { result } = await deepgram.listen.prerecorded.transcribeFile(
  audioBuffer,
  { language: 'pt', model: 'nova-2' }
);
```

**Recomendação**: Whisper para MVP (mais barato), migrar para Deepgram se precisar realtime.

---

### 3. Rube MCP Platform

**Integrações Disponíveis**:
- Gmail API
- Google Calendar API
- Slack API
- WhatsApp Business API

**Arquitetura Rube**:
```typescript
// Rube MCP Client (hipotético - verificar docs oficiais)
import { RubeMCP } from '@rube/sdk';

const rube = new RubeMCP({
  apiKey: process.env.RUBE_API_KEY
});

// Enviar email via Gmail
await rube.gmail.sendEmail({
  to: cliente.email,
  subject: 'Proposta Comercial #1234',
  html: htmlContent,
  attachments: [{ filename: 'proposta.pdf', path: pdfUrl }]
});

// Enviar mensagem WhatsApp
await rube.whatsapp.sendMessage({
  phone: cliente.telefone,
  message: 'Olá! Sua proposta está pronta.'
});

// Criar evento Google Calendar
await rube.calendar.createEvent({
  summary: 'Reunião com Cliente X',
  start: { dateTime: '2025-10-05T10:00:00' },
  end: { dateTime: '2025-10-05T11:00:00' }
});

// Notificação Slack
await rube.slack.postMessage({
  channel: '#vendas',
  text: 'Nova oportunidade criada: R$ 50.000'
});
```

**NOTA**: Verificar documentação oficial do Rube para SDK exato.

---

## 📱 Mobile Strategy

### Opção 1: PWA (Progressive Web App) - **RECOMENDADO**
```json
{
  "vite-plugin-pwa": "^0.20.0",
  "workbox-window": "^7.1.0"
}
```

**Vantagens**:
- Um único codebase
- Instalável no home screen
- Offline support
- Push notifications (via Service Worker)
- Budget zero (sem App Store fees)

**Configuração**:
```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'STAGETEK CRM',
        short_name: 'STAGETEK',
        theme_color: '#e90101',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'api-cache' }
          }
        ]
      }
    })
  ]
};
```

### Opção 2: React Native (NÃO recomendado para MVP)
- Duplica esforço de desenvolvimento
- Dois codebases para manter
- Custos de publicação (Apple $99/ano)
- Tempo de review nas stores

**Decisão**: **PWA first**, avaliar React Native apenas se houver necessidade crítica de features nativas (ex: integração com telefonia nativa).

---

## 🚀 Deployment & Infrastructure

### Vercel (Frontend + Edge Functions)
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" }
  ]
}
```

**Edge Functions** (Serverless):
```typescript
// api/send-email.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Lógica de envio de email
  return res.status(200).json({ success: true });
}
```

**Vantagens Vercel**:
- Deploy automático (git push)
- Preview deploys para PRs
- Edge network global
- Zero config
- Free tier generoso (100GB bandwidth)

---

### Supabase (Backend)
- **Tier**: Free (até 500MB DB, 1GB storage, 2GB bandwidth)
- **Upgrade**: Pro $25/mês (8GB DB, 100GB storage, 250GB bandwidth)

---

## 📦 Package.json Completo

```json
{
  "name": "stagetek-crm",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "@supabase/supabase-js": "^2.45.0",
    "@anthropic-ai/sdk": "^0.27.0",
    "zustand": "^4.5.0",
    "@tanstack/react-query": "^5.51.0",
    "react-hook-form": "^7.53.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.9.0",
    "@radix-ui/react-dialog": "^1.1.0",
    "@radix-ui/react-dropdown-menu": "^2.1.0",
    "@radix-ui/react-select": "^2.1.0",
    "@radix-ui/react-toast": "^1.2.0",
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "recharts": "^2.12.0",
    "date-fns": "^3.6.0",
    "react-day-picker": "^8.10.0",
    "axios": "^1.7.0",
    "react-hot-toast": "^2.4.1",
    "nanoid": "^5.0.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.18.0",
    "@typescript-eslint/parser": "^7.18.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.6.0",
    "vite": "^5.4.0",
    "vite-plugin-pwa": "^0.20.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/forms": "^0.5.7",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.40",
    "eslint": "^8.57.0",
    "vitest": "^2.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.4.8"
  }
}
```

---

## 🔧 Ambiente de Desenvolvimento

### .env.local
```bash
# Supabase
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...

# Claude API
VITE_CLAUDE_API_KEY=sk-xxx...

# Whisper/Deepgram
VITE_OPENAI_API_KEY=sk-xxx...
# ou
VITE_DEEPGRAM_API_KEY=xxx...

# Rube MCP
VITE_RUBE_API_KEY=xxx...

# Vercel (produção)
VERCEL_URL=stagetek-crm.vercel.app
```

---

## 🧪 Testing Stack
```json
{
  "vitest": "^2.0.0",
  "@testing-library/react": "^16.0.0",
  "@testing-library/user-event": "^14.5.2",
  "@testing-library/jest-dom": "^6.4.8",
  "msw": "^2.3.0"
}
```

---

## 🛠️ Developer Tools
```json
{
  "eslint": "^8.57.0",
  "prettier": "^3.3.0",
  "@typescript-eslint/eslint-plugin": "^7.18.0",
  "husky": "^9.1.0",
  "lint-staged": "^15.2.0"
}
```

---

**Built with Protocol Notecraft™**
**STAGETEK Engineering Team**
**Data**: 01 de Outubro de 2025
