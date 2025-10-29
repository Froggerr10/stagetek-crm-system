# STAGETEK CRM System - Claude Configuration

**INSTRUÇÕES CRÍTICAS: SIGA RIGOROSAMENTE O PROTOCOL NOTECRAFT™**

---

## 🚀 MVP STATE OF ART - 7 Gaps Críticos P0 (25 Out 2025)

### **✅ COMPLETADO (Sprint 1 Day 1 - 23 Out)**
- ✅ CRUD Clientes + Oportunidades + Contacts (100%)
- ✅ Sistema de Cotações MVP (P0.5 completo)
- ✅ Protocol Notecraft™ 100% compliance
- ✅ Documentação BMAD completa (15 docs criados)

### **⏰ SPRINT MVP STATE OF ART (7.5 dias - 25 Out a 2 Nov)**

**Baseado em**: `.ai/relatorios-avaliacao-critica.md` + `docs/stories/*.md`

#### **Dia 1-2: Barra de Filtros (G-001)** - Story 2.1
- [ ] FilterBar organism (6 controles: Funil, Responsável, Status, etc.)
- [ ] Zustand store + URL params
- [ ] Mobile: modal full-screen

#### **Dia 3: Tab Email (G-002)** - Story 1.1
- [ ] EmailComposer organism
- [ ] Integrar com Resend API existente
- [ ] Salvar em `emails_sent` table

#### **Dia 4: Tab Produtos (G-003)** - Story 1.2
- [ ] ProductLink organism
- [ ] Criar table `opportunity_products` (many-to-many)

#### **Dia 5: Tab Arquivos (G-004)** - Story 1.3
- [ ] FileUpload organism
- [ ] Supabase Storage bucket `attachments`
- [ ] RLS policies (upload/download)

#### **Dia 6: Quick Actions Cards (G-005)** - Story 3.2
- [ ] Ícones rodapé OpportunityCard (📞 Phone, ✉️ Mail)
- [ ] Handlers: criar tarefa / abrir email

#### **Dia 6 (2h): Fix Botões ClientCard (G-006)** - Story 3.1
- [ ] Trocar variant="ghost" → "outline"
- [ ] Adicionar ícones Lucide (Edit, Trash2)

#### **Dia 7: Layout Detalhe Match RD (G-007)** - Story 3.3
- [ ] Banner verde (<24h oportunidade)
- [ ] Ajustar sidebars + temperatura/qualificação
- [ ] Form CRIAR ANOTAÇÃO destacado

**📄 Detalhes completos**: `docs/stories/*.md` (7 stories criadas)

---

## 🚨 LEIA PRIMEIRO: CONTEXTO CRÍTICO

**PROJETO REAL COM ESTRUTURA BMAD. SIGA RIGOROSAMENTE.**

### **📋 Documentação BMAD (Prioridade)**
1. ✅ **`.ai/relatorios-avaliacao-critica.md`** (295 linhas) - Gap analysis P0 (7 gaps críticos)
2. ✅ **`docs/stories/*.md`** (7 stories) - Tasks executáveis (1.1 a 3.3)
3. ✅ **`docs/prd/*.md`** (4 epics) - Features agrupadas (EPIC-001 a EPIC-004)
4. ✅ **`docs/architecture/*.md`** (4 shards) - Tech stack, DB schema, coding standards

### **📚 Contexto Estratégico (Opcional)**
- `protocol/EXECUTIVE-STRATEGIC-REPORT.md` (contexto executivo)
- `protocol/INVENTORY-RD-STATION-COMPLETE.md` (287 features RD Station)
- `protocol/RD-STATION-UX-DEEP-ANALYSIS.md` (análise UX profunda)

**REGRA**: Para implementar features, leia STORIES primeiro. Para contexto, leia PROTOCOL.

---

## 🎯 STATUS DE IMPLEMENTAÇÃO (Atualizado: 25 Out 2025)

### 🎉 MARCOS RECENTES (Sprint 1 Day 1 - 23 Out 2025)

#### **✅ Supabase Integration - 100% FUNCIONAL**
- ✅ Database conectado: clients, contacts (**CORRIGIDO**: existe desde 23 Out), opportunities, funnel_stages, funnels, tasks, notes, products, quotations
- ✅ RLS policies: SELECT implementado (INSERT/UPDATE/DELETE pendente - ver blocker crítico)
- ✅ CRUD completo: Clientes, Oportunidades, Cotações
- ✅ Seed data: 5 clientes, 15 produtos, 7 oportunidades teste

#### **✅ Modais & Forms - 100% COMPLETOS**
- ✅ FormField component flexível (suporta children e input props)
- ✅ ClienteModal (49 linhas) com campos completos:
  - Nome, CNPJ, Email, Phone, Website, Status
  - AddressFields component (22 linhas) para endereço JSONB
- ✅ OportunidadeModal (50 linhas) com campos completos:
  - Título, Cliente (select), Valor, Probabilidade, Estágio (select), Data
- ✅ Selects com contraste correto (bg-gray-900, text-white)
- ✅ Validação funcional com feedback visual

#### **✅ Protocol Notecraft™ - 100% COMPLIANCE AUTOMÁTICA**
- ✅ Refatoração completa de 12 componentes
- ✅ Automação: `scripts/validate-notecraft.js`
- ✅ Pre-commit hook (Husky) bloqueia violações
- ✅ npm script: `npm run validate:notecraft`
- ✅ Componentes reutilizáveis:
  - `useClienteForm.ts` (61 linhas) - Hook form clientes
  - `useOportunidadeForm.ts` (67 linhas) - Hook form oportunidades
  - `ModalHeader.tsx` (16 linhas) - Header reutilizável
  - `ModalActions.tsx` (20 linhas) - Actions reutilizáveis
  - `AddressFields.tsx` (22 linhas) - Campos de endereço
  - `FormField.tsx` (17 linhas) - Field genérico flexível

**Resultado**: Zero violações, zero warnings, 100% compliance

---

### ✅ O que JÁ ESTÁ implementado:

#### **Infraestrutura & Setup**
- ✅ React 18 + TypeScript + Vite configurado
- ✅ Tailwind CSS 3.4 (design tokens STAGETEK)
- ✅ Atomic Design (atoms/molecules/organisms/templates)
- ✅ Protocol Notecraft™ - **100% compliance automática**
- ✅ Husky pre-commit hooks
- ✅ Path aliases (`@/*`) configurados
- ✅ Supabase client configurado

#### **Autenticação**
- ✅ Login/Logout (Supabase Auth)
- ✅ Proteção de rotas (`ProtectedRoute.tsx`)
- ✅ Gestão de sessão
- ✅ Hook `useAuth()` disponível

#### **CRUD Clientes**
- ✅ Página `src/pages/Clientes.tsx` (React)
- ✅ DataTable desktop + Cards mobile
- ✅ Modal criação/edição (`ClienteModal.tsx` - 47 linhas)
- ✅ Avatar com iniciais
- ✅ Badge de status
- ✅ Filtros por busca
- ✅ Conectado ao Supabase (CRUD completo)

#### **CRUD Oportunidades**
- ✅ Página `src/pages/Oportunidades.tsx` (React)
- ✅ Modal criação/edição (`OportunidadeModal.tsx` - 50 linhas)
- ✅ Formulário completo (cliente, valor, estágio, data)
- ✅ Listagem básica
- ✅ Conectado ao Supabase (CRUD completo)
- ✅ Botão "Nova Cotação" integrado

#### **Sistema de Cotações** (✅ COMPLETO - Sprint 1 Day 1)
- ✅ Database schema (products + quotations com JSONB)
- ✅ 15 produtos seedados (4 categorias)
- ✅ Página `src/pages/NovaCotacao.tsx` (30 linhas)
- ✅ Organisms: ProductCatalog (45), QuotationCart (50)
- ✅ Molecules: ProductCard (27), QuotationItem (22), QuotationTotals (35), EmailModal (20)
- ✅ Template: QuotationPDF (28 linhas)
- ✅ Hooks: useQuotationActions, usePDFGeneration, useEmailSending
- ✅ Geração de PDF (@react-pdf/renderer)
- ✅ Envio de email via Edge Function
- ✅ Auto-numeração (QT-YYYYMM-NNN)
- ✅ UX: R$ prefix, validações, remove button melhorado
- ⏳ **PRÓXIMO**: Lista de cotações salvas + itens customizados

#### **Funil de Vendas (Kanban)**
- ✅ Página HTML: `pages/funil-vendas.html` (standalone)
- ✅ 5 colunas drag-and-drop
- ✅ Totalizadores R$ por coluna
- ✅ Contador de oportunidades
- ⏳ **PRÓXIMO**: Migrar para React (`src/pages/Funil.tsx`)

#### **Dashboard**
- ✅ Página HTML: `pages/dashboard.html` (standalone)
- ✅ Página React: `src/pages/Dashboard.tsx` (básico)
- ✅ 4 StatCards
- ✅ Gráficos Chart.js (no HTML)
- ⏳ **PRÓXIMO**: Conectar gráficos ao Supabase (dados reais)

#### **Navegação & Layout** (**CORRIGIDO**: 23 Out 2025)
- ✅ TopBar (`src/components/organisms/TopBar.tsx` - 44 linhas) - **EXISTE**
- ✅ MainLayout com TopBar integrado
- ✅ Navegação: Dashboard, Clientes, Oportunidades, Funil
- ⏳ **FALTA**: Atalho "Tarefas" no menu (badge "67") - ver G-002

---

### 🚨 BLOCKERS CRÍTICOS (Resolver ANTES de P0.5)

#### **1. Segurança & Compliance (RLS Policies)** ⏰ 1 semana

**Status**: 🔴 **BLOQUEADOR** - RLS incompleto pode causar vazamento de dados

**Problema**: Apenas policies de SELECT existem. Faltam INSERT/UPDATE/DELETE.

**Ações necessárias**:
- [ ] **RLS completo por tabela**:
  - [ ] `clients` (INSERT/UPDATE/DELETE + org_id scoping)
  - [ ] `opportunities` (INSERT/UPDATE/DELETE + owner validation)
  - [ ] `funnel_stages` (apenas admin pode modificar)
  - [ ] `contacts` (INSERT/UPDATE/DELETE + client_id validation)
  - [ ] `tasks` (INSERT/UPDATE/DELETE + assignee validation)
  - [ ] `products` (apenas admin pode modificar)
- [ ] **Storage policies**:
  - [ ] Bucket PDFs com assinatura temporal (1h)
  - [ ] Upload limitado por role (authenticated users)
  - [ ] Download apenas para owner da oportunidade
- [ ] **Auditoria**:
  - [ ] Criar tabela `activity_log` (quem, o quê, quando)
  - [ ] Triggers em UPDATE/DELETE para log automático
- [ ] **Masking PII**:
  - [ ] Emails (mostrar ema***@domain.com)
  - [ ] Telefones (mostrar (11) 9****-4321)

**Referência**: Ver `protocol/TECH-DEBT.md` (será criado)

#### **2. Storage Limits (Supabase Free)** ⏰ 2 dias

**Status**: 🟡 **MÉDIO** - Pode estourar 2GB com PDFs

**Ações**:
- [ ] Implementar cold-storage (S3 compatível) para PDFs >30 dias
- [ ] Política de expiração de anexos (deletar após 90 dias)
- [ ] Compressão de imagens (produtos)

---

### 🚀 P0.5 - COTAÇÃO MVP ✅ **COMPLETO** (Sprint 1 Day 1)

#### **Status**: ✅ **ENTREGUE** - Momento wow alcançado!

**Insight da análise executiva**:
> "O valor do CRM está aí para Stagetek (preço, lead time, frete, impostos). Sem isso, o time volta para planilhas."

**RICE Score**: 15.0 (Reach: 5 | Impact: 10 | Confidence: 90% | Effort: 1 day - delivered!)

**Resultado alcançado**:
- ✅ P0 (CRUD básico) completo
- ✅ Cotação rápida implementada
- ✅ Momento wow: cotação em 5 minutos (vs 2h em planilha) 🎉

#### **Cotação MVP - Entregue**

**User Story**:
```gherkin
As a: Vendedor Stagetek
I want to: Selecionar produtos do catálogo e gerar PDF profissional
So that: Eu envie proposta em <5 minutos (vs 2h em planilha)
```

**Implementado (Sprint 1 Day 1)**:
- ✅ **Database**:
  - ✅ Tabela `products` (nome, SKU, categoria, preço BRL/USD/EUR, descrição, specs JSONB)
  - ✅ Tabela `quotations` (opportunity_id, items JSONB hybrid, subtotal, freight, total, status)
  - ✅ Auto-numeração: `QT-YYYYMM-NNN` (PostgreSQL function + trigger)
  - ✅ Seed data: 15 produtos (Som, Luz, Estrutura, Talha) - R$ 49,160 total
- ✅ **Frontend** (9 componentes Protocol Notecraft™ compliant):
  - ✅ Página `/oportunidades/:id/cotacao/nova` - NovaCotacao.tsx (30 linhas)
  - ✅ ProductCatalog organism (45 linhas) - grid responsivo
  - ✅ QuotationCart organism (50 linhas) - carrinho com 3 botões
  - ✅ ProductCard molecule (27 linhas)
  - ✅ QuotationItem molecule (22 linhas)
  - ✅ QuotationTotals molecule (35 linhas) - com validação de frete
  - ✅ EmailModal molecule (20 linhas) - email validation
  - ✅ Ajuste de quantidades e frete (R$ prefix, anti-negative, remove zeros)
  - ✅ Botão "Nova Cotação" integrado em `/oportunidades`
- ✅ **PDF Generation**:
  - ✅ QuotationPDF template (28 linhas) - @react-pdf/renderer
  - ✅ pdfStyles.ts - estilos centralizados
  - ✅ Logo STAGETEK + branding (vermelho #e90101)
  - ✅ Tabela produtos (nome, qty, preço unit, subtotal)
  - ✅ Totais (subtotal, frete, total)
  - ✅ Footer com contato STAGETEK
  - ✅ Download automático com nome `Cotacao_QT-YYYYMM-NNN.pdf`
- ✅ **Email Integration**:
  - ✅ Supabase Edge Function `send-quotation-email` (deployed)
  - ✅ Resend API integration (100 emails/day free)
  - ✅ Template HTML profissional com branding
  - ✅ PDF anexado via base64
  - ✅ Status tracking: draft → sent (com timestamp + email destinatário)
  - ✅ CORS resolvido (backend call via Edge Function)

**Out of Scope P0.5** (deixar para P1):
- ⏳ Cálculo automático de frete (API Melhor Envio)
- ⏳ Cálculo de impostos (ICMS, IPI)
- ⏳ Regras de desconto complexas
- ⏳ Múltiplas moedas (USD/EUR display)
- ⏳ Templates de email customizáveis

**Acceptance Criteria** ✅ **100% PASSED**:
```gherkin
✅ Given: Estou na oportunidade "Pedido Set Luz"
✅ When: Clico "Nova Cotação"
✅ Then: Vejo catálogo com 15 produtos (4 categorias)
✅ And: Cards com imagem, nome, preço, categoria
✅ When: Adiciono 5 produtos ao carrinho
✅ And: Ajusto quantidade (input number validado)
✅ And: Preencho frete manual (R$ 500 com validação)
✅ And: Clico "Gerar PDF"
✅ Then: PDF é gerado em <3s
✅ And: Download automático com nome correto
✅ When: Clico "Enviar Email"
✅ And: Digite email válido no modal
✅ Then: Email enviado em <30s via Edge Function
✅ And: Status muda para "sent" com timestamp
✅ And: Cotação fica salva no histórico (banco de dados)
```

**Definition of Done** ✅:
- ✅ Código passa em Protocol Notecraft™ validation (100%)
- ⏳ Testes E2E (Playwright) cobrem happy path (próximo sprint)
- ✅ PDF renderiza corretamente em desktop (mobile pending)
- ✅ Email chega com PDF anexado (<2MB)
- ⏳ RLS policies completas para `quotations` (Sprint 0 blocker)

**Tempo real**: 1 dia (vs estimado 2-3 semanas) ⚡

---

### ⏳ 7 P0 GAPS - MVP STATE OF ART (7.5 dias)

**Baseado em**: `.ai/relatorios-avaliacao-critica.md` (Gap Analysis detalhado)

#### **G-001: Barra de Filtros (2 dias)** - `docs/stories/2.1.barra-filtros.md`
#### **G-002: Tab Email (1 dia)** - `docs/stories/1.1.tab-email.md`
#### **G-003: Tab Produtos (1 dia)** - `docs/stories/1.2.tab-produtos.md`
#### **G-004: Tab Arquivos (1 dia)** - `docs/stories/1.3.tab-arquivos.md`
#### **G-005: Quick Actions Cards (4h)** - `docs/stories/3.2.quick-actions-cards.md`
#### **G-006: Fix Botões ClientCard (2h)** - `docs/stories/3.1.fix-botoes-clientcard.md`
#### **G-007: Layout Detalhe Match RD (1 dia)** - `docs/stories/3.3.layout-detalhe-match-rd.md`

**📄 Ver detalhes completos de AC/Tasks em cada story**

---

### ⚠️ O que FALTA (P1 - ALTA PRIORIDADE)

#### **6. Listagem de Cotações Salvas** (planejado)
- [ ] Página /cotacoes (lista todas as cotações)
- [ ] Filtros: status, data, cliente, oportunidade
- [ ] Visualizar PDF salvo
- [ ] Reenviar email
- [ ] Editar cotação (status draft)

#### **7. Itens Customizados em Cotações** (planejado)
- [ ] Botão "Adicionar Item Customizado" em NovaCotacao
- [ ] Modal para item manual (nome, quantidade, preço)
- [ ] Mixing catalog + custom items no mesmo carrinho

#### **8. Importação Excel** (planejado)
- [ ] Upload .xlsx
- [ ] Validação + preview
- [ ] Import batch para Supabase

#### **9. Integrações** (33% implementado)
- ✅ Resend API (emails) - **100% COMPLETO**
  - ✅ Supabase Edge Function deployed
  - ✅ Template HTML profissional
  - ✅ PDF attachment via base64
  - ✅ 100 emails/day free tier
- [ ] Slack Webhook (notificações)
- [ ] Google Calendar API (eventos)

---

### ⚠️ O que FALTA (P2 - MÉDIA PRIORIDADE)

#### **10. Sistema de Pedidos** (0% implementado)
- [ ] Converter cotação em pedido
- [ ] Status: Rascunho, Confirmado, Em Produção, Despachado, Entregue
- [ ] Timeline visual

#### **11. Relatórios Gerenciais** (0% implementado)
- [ ] DRE simplificado
- [ ] Conversão por etapa
- [ ] Análise por vendedor

#### **12. Gestão de Equipamentos** (0% implementado)
- [ ] Controle de estoque
- [ ] Status: Disponível, Em Uso, Manutenção

#### **13. Calendário de Eventos** (0% implementado)
- [ ] Visualização mensal
- [ ] Sincronização Google Calendar

#### **14. Lead Scoring com IA** (0% implementado)
- [ ] Claude API
- [ ] Score 0-100
- [ ] Temperatura: 🔥 Hot / 🌡️ Warm / 🧊 Cold

---

## 🗺️ NAVEGAÇÃO E FLUXO (Baseado em RD Station)

### **Fluxo Principal: Dashboard → Funil → Detalhes**

```
Login Page
  └─► Dashboard
      ├─► Click: "Oportunidades" (menu superior)
      │   └─► Funil de Vendas (Kanban)
      │       ├─► Click: Card "Pedido Setembro"
      │       │   └─► Detalhes da Oportunidade (Tab HISTÓRICO)
      │       │       ├─► Tab: E-MAIL (enviar email)
      │       │       ├─► Tab: TAREFAS (criar/listar tarefas)
      │       │       ├─► Tab: CONTATOS (vincular contatos)
      │       │       ├─► Tab: PRODUTOS (adicionar produtos)
      │       │       └─► Tab: ARQUIVOS (upload anexos)
      │       │
      │       ├─► Drag: Card para outra coluna
      │       │   └─► Atualiza estágio
      │       │
      │       └─► Click: FAB "+" (criar nova oportunidade)
      │
      ├─► Click: "Clientes" (menu superior)
      │   └─► Lista de Clientes
      │       └─► Click: Cliente → Detalhes
      │
      ├─► Click: "Tarefas" (menu superior + badge "67")
      │   └─► Lista de Tarefas (filtros: Minhas, Todas, Atrasadas, Hoje)
      │
      └─► Click: Avatar "MB" → Dropdown
          ├─► Meu perfil
          ├─► Configurações da conta
          │   └─► Funis de vendas (ConfigFunis.tsx)
          │   └─► Usuários e permissões
          │   └─► Integrações
          └─► Sair
```

**CRÍTICO**: Atualmente o sistema NÃO TEM essa navegação! Páginas estão isoladas.

---

## 🏗️ ARQUITETURA DO PROJETO

### **Estrutura Atual (Híbrida - PROBLEMA!)**

```
stagetek-crm-system/
├── pages/                          ← HTML STANDALONE (NÃO React!)
│   ├── dashboard.html              ✅ Existe (Chart.js)
│   ├── funil-vendas.html           ✅ Existe (Vanilla JS)
│   ├── config-funis.html           ✅ Existe (Vanilla JS)
│   └── ...
├── src/                            ← REACT APP
│   ├── pages/
│   │   ├── Clientes.tsx            ✅ Existe (React)
│   │   ├── Oportunidades.tsx       ✅ Existe (React)
│   │   ├── DetalheOportunidade.tsx ❌ NÃO EXISTE!
│   │   └── ConfigFunis.tsx         ❌ NÃO EXISTE!
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   │       └── TopBar.tsx          ❌ NÃO EXISTE!
│   └── ...
└── protocol/
    ├── PRD.md                      ✅ LEIA ISSO!
    ├── RD-STATION-ANALYSIS.md      ✅ LEIA ISSO!
    ├── GAP-ANALYSIS.md             ✅ LEIA ISSO!
    └── FEATURES-PRIORITIZED.md     ✅ LEIA ISSO!
```

**PROBLEMA**: Sistema tem DOIS mundos separados (HTML + React). Navegação quebrada.

**SOLUÇÃO**: Migrar tudo para React OU manter HTML mas criar navegação unificada.

---

## 🎯 MODELO DE NEGÓCIO STAGETEK

**STAGETEK = Fabricante B2B de Equipamentos para Entretenimento**

### **3 Operações:**

1. **🏭 FABRICAÇÃO** (Principal - 60% receita)
   - Peças de aço sob medida, treliças Q30/Q40, estruturas metálicas, talhas
   - Modelo: Venda por peça (não aluguel!)
   - Mercado: Nacional (BR) + Internacional (exportação)
   - Moeda: BRL, USD, EUR

2. **🛒 REVENDA** (Secundário - 30% receita)
   - Equipamentos de som (mesas, caixas acústicas)
   - Equipamentos de luz (moving heads, pares LED)

3. **🎪 LOCAÇÃO** (Terciário - 10% receita)
   - Aluguel de equipamentos próprios para eventos
   - Gestão de disponibilidade e calendário

### **Usuários**: 5 máximo (uso interno)
### **Budget**: ZERO (Supabase Free + Vercel Free)

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

### **Integrações**
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

### 4. **Mobile-First OBRIGATÓRIO**
- ✅ Tailwind responsive (sm/md/lg/xl breakpoints)
- ✅ Bottom nav bar (não sidebar lateral)
- ✅ Touch gestures (dnd-kit para drag-drop)
- ✅ Forms multi-step (não forms longos)
- ✅ Modals full-screen mobile
- ✅ Data tables → cards em mobile
- ✅ Lighthouse Score >85

---

## 🚫 O Que NUNCA Fazer

1. ❌ **Trabalhar sem consultar PRD.md e GAP-ANALYSIS.md**
2. ❌ **Fazer correções visuais sem entender o fluxo completo**
3. ❌ Componentes acima do limite de linhas
4. ❌ `any` no TypeScript
5. ❌ CSS inline (`style={{ ... }}`)
6. ❌ Cores hardcoded (`#e90101` direto, usar tokens Tailwind)
7. ❌ Emojis como ícones (usar Lucide React)
8. ❌ Forms não controlados
9. ❌ Fetch direto (usar Supabase client)
10. ❌ Commits sem mensagem clara

---

## 📋 Checklist ANTES de Codar

### **Workflow BMAD (OBRIGATÓRIO)**
- [ ] Li a **story específica** em `docs/stories/*.md`?
- [ ] Entendo os **Acceptance Criteria** da story?
- [ ] Li o **epic relacionado** em `docs/prd/*.md`?
- [ ] Consultei **database schema** em `docs/architecture/database-schema.md`?
- [ ] Consultei **coding standards** em `docs/architecture/coding-standards.md`?

### **Protocol Notecraft™ (SEMPRE)**
- [ ] Componente respeita limites de linhas (atoms ≤20, molecules ≤35, organisms ≤50)?
- [ ] TypeScript strict (zero `any`)?
- [ ] Tailwind CSS (zero CSS inline)?
- [ ] Mobile-first (responsive breakpoints)?
- [ ] Busquei componentes reutilizáveis existentes (source-tree.md)?

---

## 🗓️ ROADMAP ATUALIZADO (Baseado em RICE Score)

### **Sprint 0: Blockers Críticos** ⏰ 1-2 semanas (ATUAL)
**Objetivo**: Resolver débitos técnicos que bloqueiam P0.5

```
Semana 1-2 (10-14 dias):
├─ RLS Policies completas (INSERT/UPDATE/DELETE) - 5 dias
├─ Storage policies (bucket PDFs) - 2 dias
├─ Tabela activity_log + triggers - 2 dias
├─ Documentação (USER-STORIES, TECH-DEBT, VALUE-PROP) - 1 dia
└─ Commit reorganização de arquivos + push GitHub - 1 dia
```

**Entregáveis**:
- ✅ Zero vulnerabilidades de segurança
- ✅ LGPD compliance básico
- ✅ Documentação de produto estruturada
- ✅ Technical debt visível e gerenciado

---

### **Sprint 1: Cotação MVP (P0.5)** ✅ **COMPLETO** (1 dia vs 2-3 semanas estimadas)
**Objetivo**: Entregar o "momento wow" - cotação em 2-3 cliques

```
✅ Day 1 (14 Out 2025 - COMPLETO):
├─ ✅ Database: products + quotations + seed 15 itens
├─ ✅ Frontend: /oportunidades/:id/cotacao/nova (NovaCotacao.tsx)
├─ ✅ ProductCatalog + QuotationCart + 7 molecules
├─ ✅ PDF Generation (@react-pdf/renderer)
├─ ✅ Email Integration (Edge Function + Resend)
├─ ✅ UX improvements (R$ prefix, validações)
└─ ✅ Protocol Notecraft™ 100% compliance

⏳ Restante P0.5 (2-3 dias):
├─ [ ] Lista de cotações salvas
├─ [ ] Visualizar/reenviar/editar cotação
├─ [ ] Adicionar itens customizados (não-catálogo)
└─ [ ] Expandir seed para 50 produtos
```

**Entregáveis** ✅:
- ✅ Catálogo 15 produtos navegável (4 categorias)
- ✅ Cotação completa em <5min (momento wow alcançado)
- ✅ PDF profissional gerado e download automático
- ✅ Email enviado automaticamente via Edge Function
- ⏳ 90% adoção (aguardando testes com usuários reais)

**RICE Score**: 15.0 (maior impacto) - **ENTREGUE EM 1 DIA** ⚡

---

### **Sprint 2: Detalhes Oportunidade + UX** ⏰ 2-3 semanas
**Objetivo**: Navegação completa e visibilidade do pipeline

```
Semana 6-8 (14-21 dias):
├─ Layout 3 colunas (Sidebar Left | Tabs | Sidebar Right) - 4 dias
├─ Tab Histórico (timeline + anotações) - 3 dias
├─ Tab Tarefas (criar, listar, notificar) - 4 dias
├─ Tab Contatos (vincular contatos) - 2 dias
├─ Migrar Kanban HTML → React - 3 dias
├─ Melhorias UX (estrelas, avatars, filtros) - 3 dias
└─ Testes E2E + refinamentos - 2 dias
```

**Entregáveis**:
- ✅ Navegação: Clique em card → detalhes
- ✅ Sistema de tarefas funcional
- ✅ Funil Kanban em React (drag-and-drop)
- ✅ Timeline completa de atividades

**RICE Scores**: Detalhes (14.0), Tarefas (10.5)

---

### **Sprint 3: Relatórios + Integrações** ⏰ 2 semanas
**Objetivo**: Dados para decisão e automação

```
Semana 9-10 (10-14 dias):
├─ Dashboard conversão por etapa - 3 dias
├─ Relatório motivos de perda - 2 dias
├─ Integração Slack (webhook) - 2 dias
├─ Configuração de Funis (editor visual) - 4 dias
├─ Beta testing (2 vendedores) - 2 dias
└─ Ajustes baseados em feedback - 2 dias
```

**Entregáveis**:
- ✅ KPIs: velocidade proposta, conversão, perdas
- ✅ Notificações Slack (proposta enviada, deal ganho)
- ✅ Editor de funis (criar/editar etapas)
- ✅ Beta validado por usuários reais

**RICE Score**: Config Funis (13.5), Relatórios (4.8)

---

### **Sprint 4: Go-Live MVP** ⏰ 1 semana
**Objetivo**: Rollout completo com treinamento

```
Semana 11 (5-7 dias):
├─ Ajustes finais (bugs críticos) - 2 dias
├─ Treinamento time comercial (5 pessoas) - 1 dia
├─ Monitoramento (Sentry setup) - 1 dia
├─ Documentação usuário final - 1 dia
└─ Go-live produção - 1 dia
```

**Entregáveis**:
- ✅ MVP funcional em produção
- ✅ Time treinado e usando
- ✅ Monitoramento ativo
- ✅ Documentação completa

---

### **Timeline Total**: 10-11 semanas (~70-75 dias)

**Marcos**:
- ✅ **Dia 14**: Blockers resolvidos, segurança OK
- ✅ **Dia 35**: Cotação MVP funcionando (momento wow)
- ✅ **Dia 56**: Navegação completa + tarefas
- ✅ **Dia 70**: Relatórios + integrações
- ✅ **Dia 77**: **GO-LIVE MVP**

**Buffer**: 2 semanas (imprevistos, scope pequeno)
**Deadline realista**: **90 dias** (12-13 semanas)

---

## 📚 Referências Obrigatórias

### **📋 Documentação BMAD (Prioridade 1 - 25 Out 2025)**
- **`.ai/relatorios-avaliacao-critica.md`** - Gap analysis (7 P0 gaps + roadmap 7.5 dias)
- **`docs/stories/*.md`** - 7 stories executáveis (1.1 a 3.3)
- **`docs/prd/*.md`** - 4 epics (EPIC-001 a EPIC-004)
- **`docs/architecture/tech-stack.md`** - Stack completo + ADRs
- **`docs/architecture/database-schema.md`** - 11 tabelas + RLS policies
- **`docs/architecture/coding-standards.md`** - Protocol Notecraft™ enforcement
- **`docs/architecture/source-tree.md`** - 55 componentes mapeados

### **📚 Contexto Estratégico (Opcional)**
- `/protocol/EXECUTIVE-STRATEGIC-REPORT.md` - Análise executiva
- `/protocol/INVENTORY-RD-STATION-COMPLETE.md` - 287 features RD Station
- `/protocol/RD-STATION-UX-DEEP-ANALYSIS.md` - Análise UX profunda

### **Screenshots de Referência**
- `Tela funil_RDStation_1.png` - Kanban básico
- `tela funil 2.png` - Kanban completo com top bar
- `Funil_RD 3.png` - Kanban com tooltip hover
- `Funil_4.png` - Configuração de funis
- `tela oportunidade.png` - Detalhes da oportunidade
- `tarefas.png` - Tab Tarefas
- `produtos e serviços.png` - Tab Produtos
- `emails.png` - Tab E-mail
- `modelos de e-mail.png` - Modal de templates

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
```

---

## 📊 Resumo Estatístico (25 Out 2025)

### **Sprint MVP State of Art**
| Gap ID | Feature | Estimativa | Story |
|--------|---------|------------|-------|
| **G-001** | Barra de Filtros | 2 dias | 2.1 |
| **G-002** | Tab Email | 1 dia | 1.1 |
| **G-003** | Tab Produtos | 1 dia | 1.2 |
| **G-004** | Tab Arquivos | 1 dia | 1.3 |
| **G-005** | Quick Actions Cards | 4h | 3.2 |
| **G-006** | Fix Botões ClientCard | 2h | 3.1 |
| **G-007** | Layout Detalhe Match RD | 1 dia | 3.3 |
| **TOTAL** | **MVP State of Art** | **7.5 dias** | 7 stories |

### **Documentação BMAD (25 Out 2025)**
- ✅ **4 Architecture Shards** (1,301 linhas): tech-stack, database-schema, coding-standards, source-tree
- ✅ **4 Epics** (P0/P1): EPIC-001 a EPIC-004
- ✅ **7 Stories** (executáveis): 1.1 a 3.3
- ✅ **1 Gap Analysis** (295 linhas): relatorios-avaliacao-critica.md

### **Estimativas Corrigidas**
- ~~Old estimate~~: 12-16 semanas (reports Oct 24)
- **New estimate**: 7.5 dias (gap analysis Oct 25)
- **Reason**: Contacts table, TopBar, tasks table já existem (implementados 23 Out)

---

## 🔧 Comandos Úteis

```bash
# Dev server (React)
npm run dev

# Dev server (HTML pages)
# Abrir pages/*.html diretamente no browser

# Build produção
npm run build

# Storybook (componentes)
npm run storybook

# Deploy Vercel
vercel --prod
```

---

## 🏆 Meta de Qualidade

- **100%** Protocol Notecraft™ compliance
- **100%** TypeScript (zero `any`)
- **>85** Lighthouse Score (mobile)
- **<500KB** bundle size (gzipped)
- **>95%** responsividade mobile
- **100%** dark mode support
- **100%** baseado em PRD.md e RD-STATION-ANALYSIS.md

---

## 🎯 OKRs Q1 2026 (MVP - 90 dias)

### **Objective 1**: Reduzir tempo de resposta comercial em 80%
- **KR1**: Tempo médio lead→cotação < 30min (baseline: 2h) ⏱️
- **KR2**: 80% das cotações enviadas em <24h 📧
- **KR3**: NPS vendedores ≥ 8/10 ⭐

### **Objective 2**: Aumentar visibilidade do pipeline
- **KR1**: 100% das oportunidades no CRM (vs 40% em planilha) 📊
- **KR2**: Dashboard de conversão atualizado diariamente 📈
- **KR3**: Taxa de uso ≥ 90% (4/5 vendedores ativos) 👥

### **Objective 3**: Estabilidade e segurança
- **KR1**: Zero incidentes de perda de dados 🔒
- **KR2**: 99% uptime (Supabase + Vercel) ⚡
- **KR3**: RLS policies 100% completas (LGPD compliance) ✅

**Métrica North Star**: **Velocidade de proposta** (tempo lead→cotação enviada)

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**

**Última atualização**: 14 de Outubro de 2025 - Sprint 1 Day 1 Complete

---

## 🚨 LEMBRETE FINAL

**WORKFLOW BMAD - SEMPRE SEGUIR:**

1. **Leia a STORY** (`docs/stories/*.md`) - AC + Tasks específicos
2. **Leia o EPIC** (`docs/prd/*.md`) - Contexto da feature
3. **Consulte ARCHITECTURE** (`docs/architecture/*.md`) - DB schema, coding standards, source tree
4. **Implemente exatamente** o que está documentado nos Acceptance Criteria
5. **Valide Protocol Notecraft™** (limites de linhas, TypeScript strict, Tailwind)

**NÃO FAÇA:**
- ❌ Correções visuais sem consultar stories
- ❌ Trabalhar sem entender o fluxo completo (leia epic)
- ❌ "Melhorias" não documentadas
- ❌ Duplicar componentes existentes (consulte source-tree.md)

**PROJETO REAL COM ESTRUTURA BMAD. SIGA RIGOROSAMENTE.**

**Última atualização**: 25 de Outubro de 2025 - Documentação BMAD completa (15 docs)