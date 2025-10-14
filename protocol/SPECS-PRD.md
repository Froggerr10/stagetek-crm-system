# STAGETEK CRM System - Product Requirements Document (PRD)

**Versão**: 2.1.0
**Data**: 13 de Outubro de 2025
**Status**: Em Desenvolvimento
**Autor**: STAGETEK Engineering Team

---

## 📋 Executive Summary

O **STAGETEK CRM System** é um sistema de gestão de relacionamento com clientes desenvolvido especificamente para a **STAGETEK**, fabricante B2B de equipamentos para o segmento de entretenimento.

Este sistema visa substituir processos manuais e planilhas por uma solução digital integrada, mobile-first e sem custos recorrentes significativos.

### Objetivos Principais

1. **Gestão Eficiente de Leads B2B** (nacional e internacional)
2. **Funil de Vendas Visual** (Kanban com drag-and-drop)
3. **Catálogo de Produtos** (50+ equipamentos: som, luz, estruturas de aço)
4. **Sistema de Cotações e Pedidos** (BRL, USD, EUR)
5. **Análise Gerencial com IA** (Lead Scoring, insights)
6. **Mobile-First PWA** (uso em campo, offline-ready)

### Business Case

- **Budget**: ZERO (Supabase Free + Vercel Free)
- **Usuários**: 5 máximo (uso interno)
- **ROI Esperado**: Redução 60% tempo gestão de leads
- **Timeline**: 4-6 meses para CRM funcional completo

---

## 🏢 Business Context

### Sobre a STAGETEK

**STAGETEK** é uma empresa B2B que atua em 3 verticais de negócio:

#### 1. 🏭 FABRICAÇÃO (Principal - 60% receita)
- **Produtos**: Peças de aço sob medida, treliças Q30/Q40, estruturas metálicas, talhas
- **Modelo**: Venda por peça (não locação)
- **Mercado**: Nacional (BR) + Internacional (exportação)
- **Moeda**: BRL (nacional), USD/EUR (exportação)

#### 2. 🛒 REVENDA (Secundário - 30% receita)
- **Produtos**: Equipamentos de som (mesas, caixas acústicas), equipamentos de luz (moving heads, pares LED)
- **Modelo**: Compra de fornecedores + revenda

#### 3. 🎪 LOCAÇÃO (Terciário - 10% receita)
- **Modelo**: Aluguel de equipamentos próprios para eventos
- **Gestão**: Controle de disponibilidade e calendário

### Dores Atuais

❌ **Processos Manuais**: Planilhas Excel desconectadas
❌ **Falta de Visibilidade**: Não sabem quantos leads estão em cada etapa
❌ **Perda de Oportunidades**: Leads esquecem follow-ups
❌ **Gestão de Produtos**: Catálogo de 50+ produtos sem organização digital
❌ **Cotações Lentas**: Processos manuais demoram dias
❌ **Mobile Inexistente**: Vendedores não conseguem acessar dados no campo

### Oportunidades

✅ **Centralização de Dados**: Único source of truth
✅ **Automação**: Follow-ups automáticos, notificações Slack
✅ **Análise com IA**: Lead Scoring, previsão de conversão
✅ **Mobile**: Acesso em campo via PWA
✅ **Integração**: Gmail, Calendar, Slack, WhatsApp (futuro)

---

## 👥 User Personas

### Persona 1: **Vendedor de Campo**
**Nome**: João, 32 anos
**Cargo**: Executivo de Vendas

**Objetivos:**
- Acessar dados de clientes no celular (visitas externas)
- Criar cotações rápidas no cliente
- Registrar oportunidades via mobile
- Ver histórico de negociações

**Frustrations:**
- Precisa ligar para escritório para saber estoque
- Não tem acesso a preços atualizados
- Perde tempo procurando especificações técnicas

**Features Necessárias:**
- PWA mobile instalável
- CRUD de Oportunidades (mobile-friendly)
- Catálogo de Produtos com busca
- Sistema de Cotações offline-ready

---

### Persona 2: **Gestor Comercial**
**Nome**: David, 35 anos
**Cargo**: Gestor Comercial / Owner

**Objetivos:**
- Visualizar pipeline de vendas completo
- Identificar gargalos no funil
- Priorizar leads com maior potencial (Lead Scoring)
- Gerar relatórios gerenciais (DRE, conversão)
- Gerenciar equipe de 5 pessoas

**Frustrations:**
- Não sabe quantas oportunidades estão abertas
- Perde tempo consolidando dados manualmente
- Não tem previsibilidade de receita

**Features Necessárias:**
- Dashboard com métricas (conversão, receita, pipeline)
- Funil de Vendas Kanban (drag-and-drop)
- Lead Scoring com IA
- Relatórios Gerenciais (conversão por mês, DRE)

---

### Persona 3: **Assistente Administrativo**
**Nome**: Ana, 28 anos
**Cargo**: Assistente Comercial

**Objetivos:**
- Cadastrar clientes rapidamente (CNPJ autocomplete)
- Gerenciar calendário de eventos
- Criar pedidos a partir de cotações aprovadas
- Controlar estoque de equipamentos

**Frustrations:**
- Digita CNPJ manualmente (validação lenta)
- Conflitos de agenda (eventos sobrepostos)
- Não sabe quais equipamentos estão disponíveis

**Features Necessárias:**
- CRUD de Clientes (com brasil-api-mcp CNPJ)
- Sistema de Pedidos
- Calendário de Eventos
- Gestão de Equipamentos (disponibilidade)

---

## 🎯 Features Prioritizadas

### **P0 - CRÍTICO (MVP - Sem isso não funciona)**

#### **P0.1 - Autenticação e Controle de Acesso**
**User Story**: Como usuário, quero fazer login seguro para acessar o sistema.

**Acceptance Criteria:**
- [ ] Login com email/senha (Supabase Auth)
- [ ] Recuperação de senha via email (Resend API)
- [ ] Logout funcional
- [ ] Proteção de rotas (não autenticado → redirect login)
- [ ] Row Level Security (RLS) no Supabase

**Estimativa**: 1 semana

---

#### **P0.2 - CRUD Clientes B2B**
**User Story**: Como vendedor, quero cadastrar e gerenciar clientes para organizar minha base.

**Acceptance Criteria:**
- [ ] Formulário de cadastro com validação (React Hook Form + Zod)
- [ ] Autocomplete CNPJ (brasil-api-mcp)
- [ ] Campos: nome, CNPJ, email, telefone, endereço, status
- [ ] Listagem de clientes (DataTable com filtros)
- [ ] Editar cliente
- [ ] Desativar cliente (soft delete)
- [ ] Avatar com iniciais
- [ ] Badge de status (ativo, inativo, pendente)

**Estimativa**: 1 semana

---

#### **P0.3 - CRUD Oportunidades**
**User Story**: Como vendedor, quero registrar oportunidades de venda para não perder negócios.

**Acceptance Criteria:**
- [ ] Formulário de criar oportunidade
- [ ] Campos: título, cliente, valor (BRL/USD/EUR), estágio, data esperada, descrição
- [ ] Listagem de oportunidades (filtros por estágio, cliente, data)
- [ ] Editar oportunidade
- [ ] Excluir oportunidade
- [ ] Conversão de moeda (USD/EUR → BRL)
- [ ] Histórico de mudanças de estágio

**Estimativa**: 1 semana

---

#### **P0.4 - Funil de Vendas (Kanban)**
**User Story**: Como gestor, quero visualizar o pipeline em formato Kanban para entender o status de cada negócio.

**Acceptance Criteria:**
- [ ] 5 colunas: Lead, Contato Inicial, Proposta Enviada, Negociação, Fechamento
- [ ] Drag-and-drop entre estágios (dnd-kit)
- [ ] Atualização automática do estágio no banco
- [ ] Totalizador de valor por coluna
- [ ] Contador de oportunidades por coluna
- [ ] Mobile: swipe para mover (touch-friendly)
- [ ] Filtros: por vendedor, período, valor mínimo

**Estimativa**: 1 semana

---

#### **P0.5 - Dashboard Básico**
**User Story**: Como gestor, quero ver métricas principais para tomar decisões rápidas.

**Acceptance Criteria:**
- [ ] 4 Stat Cards: Total Vendas (mês), Oportunidades Abertas, Taxa Conversão, Ticket Médio
- [ ] Gráfico: Vendas ao Longo do Tempo (Recharts linha)
- [ ] Gráfico: Oportunidades por Estágio (Recharts pizza)
- [ ] Tabela: Últimas 5 oportunidades
- [ ] Filtro: período (7 dias, 30 dias, 90 dias, ano)
- [ ] Dark mode toggle funcional

**Estimativa**: 1-2 semanas

---

#### **P0.6 - Sistema de Cotações MVP** 🔥 **DIFERENCIAL COMPETITIVO**
**User Story**: Como vendedor, quero gerar cotações profissionais rapidamente para não perder vendas.

**Insight Executivo**: Sem cotação rápida, não há adoção. Time volta para planilhas.

**RICE Score**: 15.0 (maior impacto)

**Escopo MVP** (2-3 semanas):

**Database:**
- [ ] Tabela `products` (nome, SKU, categoria, preço BRL, imagem)
- [ ] Tabela `quotations` (opportunity_id, items JSONB, total, status)
- [ ] Seed 50 produtos (som, luz, estruturas, talhas)

**Frontend:**
- [ ] Página `/produtos` - Listagem com busca + filtros por categoria
- [ ] Página `/oportunidades/:id/cotacao/nova` - Seleção de produtos (multi-select)
- [ ] Input quantidade + desconto por linha
- [ ] Campo "Frete" manual (input R$)
- [ ] Preview total (produtos + frete)

**PDF Generation:**
- [ ] Logo Stagetek + dados da empresa
- [ ] Tabela produtos (descrição, qtd, preço unit, subtotal)
- [ ] Totais (subtotal, frete, total geral)
- [ ] Termos e condições (footer)
- [ ] Biblioteca: `react-pdf` ou `pdfmake`

**Email Integration:**
- [ ] Botão "Enviar por Email" (Resend API)
- [ ] Template básico com PDF anexo (<2MB)
- [ ] Status "Proposta Enviada" na oportunidade

**Out of Scope P0.6** (deixar para P1.8):
- ❌ Cálculo automático de frete (API Melhor Envio)
- ❌ Cálculo de impostos (ICMS, IPI)
- ❌ Regras de desconto complexas
- ❌ Múltiplas moedas (USD/EUR)
- ❌ Templates de email customizáveis
- ❌ Histórico completo de cotações

**Estimativa**: 2-3 semanas

**Total P0**: 6-9 semanas (CRÍTICO PARA MVP)

---

### **P1 - ALTA PRIORIDADE (CRM Funcional)**

#### **P1.6 - CRUD Produtos (Catálogo)**
**User Story**: Como vendedor, quero consultar o catálogo de produtos para criar cotações corretas.

**Acceptance Criteria:**
- [ ] Formulário de cadastro de produto
- [ ] Campos: nome, SKU, categoria (som/luz/estrutura), preço (BRL/USD/EUR), descrição, imagem
- [ ] Listagem com filtros (categoria, faixa de preço)
- [ ] Busca por nome/SKU
- [ ] Cards com imagem + preço
- [ ] Mobile: grid responsivo (1 coluna → 2 colunas → 3 colunas)

**Estimativa**: 1 semana

---

#### **P1.7 - Importação Excel (Produtos + Clientes)**
**User Story**: Como admin, quero importar dados de planilhas antigas para migrar rapidamente.

**Acceptance Criteria:**
- [ ] Upload de arquivo Excel (.xlsx)
- [ ] Parsing com validação (react-xlsx-parser ou similar)
- [ ] Preview de dados antes de importar
- [ ] Validação de CNPJ (brasil-api-mcp)
- [ ] Report de erros (linhas inválidas)
- [ ] Import batch (Supabase insert batch)

**Estimativa**: 1 semana

---

#### **P1.8 - Sistema de Cotações (Versão Completa)**
**User Story**: Como vendedor, quero features avançadas de cotação para operações complexas.

**Nota**: ✅ MVP básico já está em **P0.6**. Esta versão adiciona features avançadas.

**Acceptance Criteria (adicionar ao MVP P0.6):**
- [ ] **Cálculo automático de frete** (API Melhor Envio ou Correios)
- [ ] **Cálculo de impostos** (ICMS, IPI, Substituição Tributária)
- [ ] **Conversão de moeda** (BRL/USD/EUR com cotação atualizada)
- [ ] **Regras de desconto** (por volume, por categoria, por cliente VIP)
- [ ] **Templates de PDF customizáveis** (admin pode editar layout)
- [ ] **Templates de email** (múltiplos modelos: formal, casual, urgente)
- [ ] **Histórico completo de cotações** com versionamento (v1, v2, v3)
- [ ] **Análise de cotações** (taxa de aceitação, tempo médio de resposta)
- [ ] **Validade automática** (cotação expira em 15 dias)
- [ ] **Assinatura digital** (cliente aceita online)

**Out of Scope P1.8:**
- ❌ Negociação inline (chat com cliente)
- ❌ Comparação de fornecedores

**Estimativa**: 2 semanas

---

#### **P1.9 - Sistema de Pedidos (Tracking)**
**User Story**: Como admin, quero converter cotações em pedidos e acompanhar o status.

**Acceptance Criteria:**
- [ ] Criar pedido a partir de cotação aprovada
- [ ] Status: Rascunho, Confirmado, Em Produção, Despachado, Entregue, Cancelado
- [ ] Timeline visual (stepper component)
- [ ] Notificações Slack quando status muda
- [ ] Anexos (NF, comprovante de envio)
- [ ] Filtros: status, cliente, período

**Estimativa**: 2 semanas

---

#### **P1.10 - Integrações (Gmail, Slack, Calendar)**
**User Story**: Como usuário, quero que o CRM sincronize com minhas ferramentas diárias.

**Acceptance Criteria:**
- [ ] Resend API: envio de emails (cotações, follow-ups)
- [ ] Slack Webhook: notificações (novo lead, pedido confirmado)
- [ ] Google Calendar API: criar eventos a partir de oportunidades
- [ ] Log de emails enviados
- [ ] Configuração de webhooks (settings page)

**Estimativa**: 2 semanas

**Total P1**: +8 semanas
**Total P0+P1**: 14-17 semanas (~3.5-4 meses)

---

### **P2 - MÉDIA PRIORIDADE (Gestão Avançada)**

#### **P2.11 - Relatórios Gerenciais**
**User Story**: Como gestor, quero relatórios detalhados para análise financeira.

**Acceptance Criteria:**
- [ ] Relatório de conversão (funil completo)
- [ ] DRE simplificado (receitas, custos, margem)
- [ ] Análise por categoria de produto
- [ ] Análise por vendedor
- [ ] Exportar para Excel/PDF
- [ ] Agendamento de relatórios (envio automático Slack)

**Estimativa**: 2 semanas

---

#### **P2.12 - Gestão de Equipamentos (Estoque)**
**User Story**: Como admin, quero controlar o estoque de equipamentos para locação.

**Acceptance Criteria:**
- [ ] CRUD de equipamentos
- [ ] Status: Disponível, Em Uso, Manutenção, Inativo
- [ ] Calendário de uso (timeline)
- [ ] Reservas (vincular a eventos)
- [ ] Histórico de manutenções
- [ ] Alertas de manutenção preventiva

**Estimativa**: 1 semana

---

#### **P2.13 - Calendário de Eventos**
**User Story**: Como admin, quero visualizar eventos em formato calendário para evitar conflitos.

**Acceptance Criteria:**
- [ ] Calendário mensal (FullCalendar ou similar)
- [ ] Criar evento vinculado a oportunidade
- [ ] Drag-and-drop de eventos
- [ ] Cores por status (confirmado, pendente, cancelado)
- [ ] Sincronização com Google Calendar
- [ ] Filtros: por cliente, por equipamento

**Estimativa**: 1 semana

---

#### **P2.14 - Lead Scoring com IA**
**User Story**: Como gestor, quero que a IA priorize leads com maior potencial de conversão.

**Acceptance Criteria:**
- [ ] Claude API para análise de leads
- [ ] Score 0-100 baseado em: valor, histórico cliente, tempo no funil, engagement
- [ ] Temperatura: 🔥 Hot (>70), 🌡️ Warm (40-70), 🧊 Cold (<40)
- [ ] Atualização automática a cada 24h (Supabase Edge Function cron)
- [ ] Insights textuais ("Lead inativo há 15 dias, enviar follow-up")
- [ ] Dashboard com top 10 leads quentes

**Estimativa**: 2 semanas

**Total P2**: +4 semanas
**Total P0+P1+P2**: 16-18 semanas (4 meses)

---

### **P3 - BAIXA PRIORIDADE (Nice to Have - ⚠️ Pular no primeiro ano)**

#### **P3.15 - AI SDR (Bot WhatsApp 24/7)**
**Complexidade**: 🔴 EXTREMA
**Recomendação**: ❌ **NÃO FAZER**

**Razões:**
- Requer infraestrutura complexa (WhatsApp Business API)
- Custos altos (conversação + API Claude)
- Risco de spam (clientes B2B preferem contato humano)
- Manutenção constante (treinar bot, ajustar respostas)
- ROI incerto para 5 usuários

---

#### **P3.16 - Call Recording + AI Analysis**
**Complexidade**: 🔴 EXTREMA
**Recomendação**: ❌ **NÃO FAZER**

**Razões:**
- Riscos LGPD (necessário consentimento explícito)
- Custos: telefonia VoIP + armazenamento + Whisper API
- Complexidade técnica: integração VoIP + transcrição + análise
- Overkill para 5 usuários (ligações podem ser anotadas manualmente)

---

#### **P3.17 - Multi-idioma (EN, ES)**
**Complexidade**: 🟡 MÉDIA
**Recomendação**: ⏸️ **Adiar para Ano 2**

**Razões:**
- Não crítico (usuários são brasileiros)
- Clientes internacionais podem ser atendidos em inglês via email
- Implementação simples com i18next, mas baixa prioridade

---

#### **P3.18 - Mobile App Nativo (React Native)**
**Complexidade**: 🔴 ALTA
**Recomendação**: ❌ **NÃO FAZER (usar PWA)**

**Razões:**
- PWA já resolve 95% dos casos (instalável, offline, push)
- App nativo requer: manutenção iOS + Android, publicação nas stores, certificados
- Budget zero não comporta Apple Developer ($99/ano)

**Total P3**: 8-12 semanas
**Total Completo**: 24-30 semanas (6-7 meses)

---

## 🏗️ Technical Architecture

### **Stack Tecnológica**

#### Frontend
```
✅ React 18 (biblioteca UI)
✅ Vite (build tool, HMR ultra-rápido)
✅ TypeScript (type safety)
✅ Tailwind CSS 3.4 (styling)
✅ shadcn/ui (componentes base acessíveis)
✅ Recharts (gráficos dashboard)
✅ React Hook Form + Zod (forms + validação)
✅ dnd-kit (drag-and-drop mobile-friendly)
✅ date-fns (manipulação de datas PT-BR)
✅ Zustand (state management leve)
```

#### Backend/BaaS
```
✅ Supabase (Free Tier):
   - PostgreSQL (500MB)
   - Auth (login/logout)
   - Storage (2GB para uploads)
   - Realtime (WebSockets para updates live)
   - Edge Functions (serverless, cron jobs)
```

#### Integrações
```
✅ Resend API (emails - 100/dia grátis)
✅ Slack Webhook (notificações)
✅ Google Calendar API (eventos)
✅ brasil-api-mcp (CNPJ, CEP)
✅ Claude API (Lead Scoring - P2)
✅ WhatsApp Business API (P4 - futuro)
```

#### Deploy
```
✅ Vercel (Free Tier):
   - Deploy automático via GitHub
   - Edge Functions
   - Preview deploys
   - SSL grátis
   - Analytics básico
```

---

### **Database Schema (PostgreSQL)**

#### **clients**
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  cnpj TEXT UNIQUE NOT NULL,
  email TEXT,
  phone TEXT,
  address JSONB, -- { street, city, state, zip, country }
  status TEXT CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);
```

#### **opportunities**
```sql
CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  value DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'BRL' CHECK (currency IN ('BRL', 'USD', 'EUR')),
  stage TEXT CHECK (stage IN ('lead', 'contact', 'proposal', 'negotiation', 'closed_won', 'closed_lost')),
  expected_close_date DATE,
  probability INTEGER CHECK (probability BETWEEN 0 AND 100),
  description TEXT,
  assigned_to UUID REFERENCES auth.users(id),
  lead_score INTEGER, -- AI-generated (P2)
  lead_temperature TEXT CHECK (lead_temperature IN ('hot', 'warm', 'cold')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### **products**
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  category TEXT CHECK (category IN ('som', 'luz', 'estrutura')),
  price_brl DECIMAL(10,2),
  price_usd DECIMAL(10,2),
  price_eur DECIMAL(10,2),
  description TEXT,
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### **quotes**
```sql
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_number TEXT UNIQUE NOT NULL, -- AUTO: QT-2025-001
  client_id UUID REFERENCES clients(id),
  items JSONB NOT NULL, -- [{ product_id, quantity, unit_price, discount }]
  subtotal DECIMAL(12,2),
  discount DECIMAL(12,2) DEFAULT 0,
  shipping DECIMAL(12,2) DEFAULT 0,
  tax DECIMAL(12,2) DEFAULT 0,
  total DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'BRL',
  status TEXT CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  valid_until DATE,
  pdf_url TEXT, -- Supabase Storage URL
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### **orders**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL, -- AUTO: ORD-2025-001
  quote_id UUID REFERENCES quotes(id),
  client_id UUID REFERENCES clients(id),
  items JSONB NOT NULL,
  total DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'BRL',
  status TEXT CHECK (status IN ('draft', 'confirmed', 'production', 'shipped', 'delivered', 'cancelled')),
  production_start_date DATE,
  estimated_delivery_date DATE,
  actual_delivery_date DATE,
  tracking_code TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### **equipments** (P2)
```sql
CREATE TABLE equipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('som', 'luz', 'estrutura')),
  status TEXT CHECK (status IN ('available', 'in_use', 'maintenance', 'inactive')),
  serial_number TEXT UNIQUE,
  purchase_date DATE,
  last_maintenance_date DATE,
  next_maintenance_date DATE,
  daily_rental_price DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### **events** (P2)
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  client_id UUID REFERENCES clients(id),
  opportunity_id UUID REFERENCES opportunities(id),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  location TEXT,
  status TEXT CHECK (status IN ('confirmed', 'pending', 'cancelled')),
  equipment_ids UUID[], -- Array de equipments.id
  total_value DECIMAL(12,2),
  notes TEXT,
  google_calendar_event_id TEXT, -- Sync com Google Calendar
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### **Row Level Security (RLS)**

Exemplo para `clients`:

```sql
-- Apenas usuários autenticados podem ler
CREATE POLICY "Usuários podem ver clientes"
  ON clients FOR SELECT
  USING (auth.role() = 'authenticated');

-- Apenas criador ou admin pode editar
CREATE POLICY "Criador pode editar cliente"
  ON clients FOR UPDATE
  USING (created_by = auth.uid() OR auth.jwt()->>'role' = 'admin');

-- Soft delete (não DELETE real, apenas UPDATE status = 'inactive')
CREATE POLICY "Apenas admin pode deletar"
  ON clients FOR DELETE
  USING (auth.jwt()->>'role' = 'admin');
```

---

## 📱 Mobile-First PWA Requirements

### **PWA Checklist**

- [ ] **Manifest.json** (nome, ícones, theme color)
- [ ] **Service Worker** (cache estratégico)
- [ ] **Offline Support** (cache páginas críticas: Dashboard, Clientes, Funil)
- [ ] **Installable** (prompt "Adicionar à tela inicial")
- [ ] **Push Notifications** (via Supabase Realtime ou FCM)
- [ ] **Lighthouse Score >85** (performance, accessibility, PWA)

### **Mobile-First Design Patterns**

```tsx
// ✅ Bottom Navigation (mobile)
<nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
  <div className="grid grid-cols-5 gap-1">
    <NavItem icon={<Home />} label="Início" />
    <NavItem icon={<Users />} label="Clientes" />
    <NavItem icon={<Target />} label="Funil" />
    <NavItem icon={<Package />} label="Produtos" />
    <NavItem icon={<User />} label="Perfil" />
  </div>
</nav>

// ✅ Sidebar (desktop)
<aside className="hidden md:block w-64 bg-white border-r">
  {/* Navegação lateral */}
</aside>
```

```tsx
// ✅ Forms Multi-Step (mobile)
<FormWizard steps={['Dados Básicos', 'Endereço', 'Contato']}>
  <Step1 /> {/* Evitar scroll infinito */}
  <Step2 />
  <Step3 />
</FormWizard>

// ❌ Form Longo (ruim mobile)
<form className="space-y-4">
  {/* 20 campos → usuário perde paciência */}
</form>
```

```tsx
// ✅ DataTable → Cards (mobile)
<div className="hidden md:block">
  <DataTable data={clients} /> {/* Desktop */}
</div>
<div className="md:hidden space-y-2">
  {clients.map(client => <ClientCard key={client.id} {...client} />)}
</div>
```

---

## 📊 Success Metrics & KPIs

### **Métricas de Adoção** (Primeiros 3 meses)

| Métrica | Meta | Como Medir |
|---------|------|------------|
| **Taxa de Adoção** | 100% dos 5 usuários ativos | Supabase Analytics (logins/semana) |
| **PWA Install Rate** | >60% | Service Worker analytics |
| **Tempo Médio de Sessão** | >10 min/dia | Vercel Analytics |
| **Mobile Usage** | >40% das sessões | User-agent tracking |

### **Métricas de Negócio** (6 meses)

| Métrica | Baseline Atual | Meta 6 Meses | Como Medir |
|---------|----------------|--------------|------------|
| **Leads Registrados** | ~20/mês (planilha) | 50/mês | Supabase count(opportunities) |
| **Taxa de Conversão** | ~15% (estimado) | 25% | closed_won / total_opportunities |
| **Tempo Médio de Fechamento** | 45 dias | 30 dias | AVG(close_date - created_at) WHERE status = 'closed_won' |
| **Ticket Médio** | R$ 8.000 | R$ 12.000 | AVG(value) WHERE status = 'closed_won' |
| **Tempo de Criação de Cotação** | 2 horas | 15 min | Supabase timestamp tracking |

### **Métricas Técnicas**

| Métrica | Meta | Ferramenta |
|---------|------|------------|
| **Lighthouse Performance** | >85 | Chrome DevTools |
| **Lighthouse PWA** | 100 | Chrome DevTools |
| **First Contentful Paint** | <1.5s | Vercel Analytics |
| **Time to Interactive** | <3s | Vercel Analytics |
| **Bundle Size (gzipped)** | <500KB | Vite build report |
| **Uptime** | >99% | Vercel Status |

---

## 🗓️ Timeline & Milestones

### **Fase 1: Setup (Semana 1)**
- [ ] Criar projeto Vite + React + TypeScript
- [ ] Configurar Tailwind + shadcn/ui
- [ ] Configurar Supabase (database + auth)
- [ ] Configurar Vercel (deploy pipeline)
- [ ] Setup ESLint + Prettier (Protocol Notecraft™)

### **Fase 2: MVP (Semanas 2-6) - P0**
- [ ] P0.1: Autenticação ✅ Login/Logout
- [ ] P0.2: CRUD Clientes ✅ CNPJ autocomplete
- [ ] P0.3: CRUD Oportunidades
- [ ] P0.4: Funil de Vendas Kanban ✅ Drag-and-drop
- [ ] P0.5: Dashboard Básico ✅ 4 stat cards + 2 gráficos

**Milestone 1**: Sistema autenticado + CRUD básico funcionando

### **Fase 3: CRM Funcional (Semanas 7-14) - P1**
- [ ] P1.6: CRUD Produtos + Catálogo
- [ ] P1.7: Importação Excel (produtos + clientes)
- [ ] P1.8: Sistema de Cotações + PDF
- [ ] P1.9: Sistema de Pedidos + Tracking
- [ ] P1.10: Integrações (Resend + Slack + Calendar)

**Milestone 2**: CRM completo com cotações e pedidos

### **Fase 4: Gestão Avançada (Semanas 15-18) - P2**
- [ ] P2.11: Relatórios Gerenciais (DRE, conversão)
- [ ] P2.12: Gestão de Equipamentos
- [ ] P2.13: Calendário de Eventos
- [ ] P2.14: Lead Scoring com IA (Claude API)

**Milestone 3**: Sistema com análise inteligente

### **Fase 5: Otimização Mobile (Semana 19)**
- [ ] PWA: Service Worker + Manifest
- [ ] Offline support (cache estratégico)
- [ ] Push notifications (Supabase Realtime)
- [ ] Lighthouse audit (>85 score)

**Milestone 4**: PWA instalável e offline-ready

### **Fase 6: Testes & Ajustes (Semanas 20-21)**
- [ ] Testes de usabilidade (5 usuários)
- [ ] Correções de bugs
- [ ] Documentação de usuário
- [ ] Treinamento da equipe

**Milestone 5**: Sistema em produção com usuários treinados

---

## ⚠️ Risks & Mitigation

### **Risk 1: Supabase Free Tier Limits**
**Descrição**: Free tier tem 500MB PostgreSQL, 2GB Storage, 50k MAU (Monthly Active Users)

**Probabilidade**: 🟡 Média
**Impacto**: 🔴 Alto (sistema para de funcionar)

**Mitigação**:
- [ ] Monitorar uso mensal (Supabase Dashboard)
- [ ] Implementar limpeza de dados antigos (6 meses)
- [ ] Compressão de imagens (antes de upload)
- [ ] Plano de upgrade para Pro ($25/mês) se atingir 80% do limite

---

### **Risk 2: Lead Scoring IA - Custos Claude API**
**Descrição**: Claude API custa ~$3 por 1M tokens (entrada) e ~$15 por 1M tokens (saída)

**Probabilidade**: 🟢 Baixa
**Impacto**: 🟡 Médio (custos acima do esperado)

**Mitigação**:
- [ ] Processar apenas leads novos ou atualizados (não re-processar tudo)
- [ ] Limitar análise a 100 leads/dia (Edge Function cron)
- [ ] Cache de scores (TTL 24h)
- [ ] Budget alert: parar processamento se custo > $50/mês

**Estimativa de Custo**:
- 50 leads/mês × 500 tokens/lead × $0.003/1k tokens = **$0.075/mês** ✅ Aceitável

---

### **Risk 3: Complexidade do Protocol Notecraft™**
**Descrição**: Limites de linhas podem dificultar componentes complexos

**Probabilidade**: 🟡 Média
**Impacto**: 🟢 Baixo (requer refatoração)

**Mitigação**:
- [ ] Usar composição (Atoms → Molecules → Organisms)
- [ ] Extrair lógica para hooks customizados
- [ ] Aceitar exceções pontuais (documentar justificativa)

---

### **Risk 4: Drag-and-Drop Mobile**
**Descrição**: dnd-kit pode ter problemas em dispositivos touch

**Probabilidade**: 🟡 Média
**Impacto**: 🟡 Médio (UX mobile degradada)

**Mitigação**:
- [ ] Testar em dispositivos reais (Android + iOS)
- [ ] Fallback: botões "Mover para..." em mobile
- [ ] Usar `@dnd-kit/modifiers` para ajustar sensibilidade

---

### **Risk 5: Excel Import - Dados Inconsistentes**
**Descrição**: Planilhas antigas podem ter CNPJs inválidos, valores malformados

**Probabilidade**: 🔴 Alta
**Impacto**: 🟡 Médio (import parcial falha)

**Mitigação**:
- [ ] Validação estrita (Zod schema)
- [ ] Preview antes de importar
- [ ] Report detalhado de erros (linha X: CNPJ inválido)
- [ ] Permitir skip de linhas com erro (importar o que for válido)

---

## 🔒 Security Requirements

### **Autenticação**
- ✅ Supabase Auth (email/senha)
- ✅ Row Level Security (RLS) em todas as tabelas
- ✅ JWT tokens (auto-refresh)
- ✅ Logout em todos os dispositivos (revoke tokens)

### **Autorização**
- ✅ Roles: `admin`, `vendedor`, `assistente`
- ✅ Admin: acesso total
- ✅ Vendedor: ver apenas suas oportunidades (ou do time)
- ✅ Assistente: sem acesso a relatórios financeiros

### **Dados Sensíveis**
- ✅ Variáveis de ambiente (`.env` no `.gitignore`)
- ✅ Secrets no Vercel (não hardcoded)
- ✅ API keys rotacionadas a cada 6 meses
- ✅ CNPJ criptografado em repouso (Supabase encryption at rest)

### **Compliance LGPD**
- ✅ Termo de consentimento (signup)
- ✅ Exportar dados do cliente (GDPR-like)
- ✅ Deletar dados do cliente (soft delete → hard delete após 90 dias)
- ✅ Log de acesso a dados sensíveis (audit trail)

---

## 💰 Cost Projection

### **Mês 1-3 (MVP)**
| Item | Custo |
|------|-------|
| Supabase Free | R$ 0,00 |
| Vercel Free | R$ 0,00 |
| Domínio (.com.br) | R$ 40,00/ano = R$ 3,33/mês |
| Resend API (100 emails/dia) | R$ 0,00 |
| Slack Webhook | R$ 0,00 |
| Google Calendar API | R$ 0,00 |
| **Total MVP** | **R$ 3,33/mês** ✅ |

### **Mês 4-6 (CRM Funcional com IA)**
| Item | Custo |
|------|-------|
| Supabase Free | R$ 0,00 |
| Vercel Free | R$ 0,00 |
| Domínio | R$ 3,33/mês |
| Claude API (Lead Scoring) | ~R$ 10-20/mês |
| Resend API (Free) | R$ 0,00 |
| **Total Funcional** | **R$ 13-23/mês** ✅ |

### **Ano 1 - Projeção (se crescer)**
| Cenário | Supabase | Vercel | Claude API | Total |
|---------|----------|--------|------------|-------|
| **Free Tier OK** | R$ 0 | R$ 0 | R$ 20 | **R$ 20/mês** ✅ |
| **Upgrade Supabase Pro** | R$ 130 | R$ 0 | R$ 20 | **R$ 150/mês** |
| **Upgrade Ambos** | R$ 130 | R$ 100 | R$ 20 | **R$ 250/mês** |

**Conclusão**: Mesmo no pior cenário, custo total < R$ 300/mês (aceitável para ROI esperado).

---

## 📋 Open Questions & Decisions Pending

### **Questões Técnicas**

1. **Biblioteca de Calendário**: FullCalendar (pesado, 300KB) vs. react-big-calendar (leve, 50KB)?
   **Recomendação**: react-big-calendar (mais leve, suficiente para P2)

2. **PDF Generation**: react-pdf (React components) vs. jsPDF (programático)?
   **Recomendação**: react-pdf (melhor para templates complexos)

3. **State Management**: Zustand (atual) vs. React Query (server state)?
   **Recomendação**: Zustand (client state) + React Query (server state) - complementares

4. **Testing**: Vitest + React Testing Library vs. Playwright?
   **Recomendação**: Fase 6 (testes E2E com Playwright)

### **Questões de Negócio**

1. **Quem terá role de `admin`?**
   **Resposta**: David (gestor comercial)

2. **Relatórios devem incluir custos de produção?**
   **Resposta**: Pendente (definir se DRE terá COGS - Cost of Goods Sold)

3. **Lead Scoring: quais critérios exatos?**
   **Resposta**: Definir pesos (valor: 40%, tempo no funil: 30%, histórico cliente: 20%, engagement: 10%)

4. **WhatsApp Business API (P4): usar oficial ($) ou alternativas (não oficiais)?**
   **Resposta**: Avaliar após Fase 3

---

## 📚 References & Resources

### **Documentation**
- [Supabase Docs](https://supabase.com/docs)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Recharts Documentation](https://recharts.org)
- [dnd-kit Documentation](https://docs.dndkit.com)

### **APIs**
- [Resend API](https://resend.com/docs)
- [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)
- [Google Calendar API](https://developers.google.com/calendar/api/guides/overview)
- [brasil-api CNPJ](https://brasilapi.com.br/docs#tag/CNPJ)
- [Claude API](https://docs.anthropic.com/claude/reference)

### **Protocol Notecraft™**
- `/protocol/PROTOCOL-NOTECRAFT.md` (Atomic Design rules)
- `/protocol/BRANDING-STANDARDS.md` (STAGETEK brand)
- `/protocol/ARCHITECTURE.md` (System architecture)

---

## ✅ Approval & Sign-Off

### **Document Status**: 🟡 Draft (Pendente Aprovação)

### **Approvers**

| Role | Name | Approval Date | Signature |
|------|------|---------------|-----------|
| **Product Owner** | David (Gestor Comercial) | Pendente | ___________ |
| **Tech Lead** | Claude Code AI | 01/10/2025 | ✅ Approved |
| **Stakeholder** | STAGETEK Owner | Pendente | ___________ |

---

## 📝 Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.1.0 | 13/10/2025 | Claude Code AI | **CRÍTICO**: Adicionado P0.6 (Sistema de Cotações MVP) baseado em análise executiva. Movido de P1.8 para P0 devido a RICE Score 15.0 (maior impacto). Atualizado timeline: P0 agora 6-9 semanas. Ajustado P1.8 para versão completa (features avançadas). Status: Em Desenvolvimento. |
| 2.0.0 | 01/10/2025 | Claude Code AI | Initial PRD v2 - Complete reboot with React stack, Protocol Notecraft™, Supabase + Vercel |
| 1.0.0 | 30/09/2025 | STAGETEK Team | PRD inicial (arquivado) |

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**

**Próxima Etapa**: Criar repositório GitHub → Iniciar Fase 1 (Setup)
