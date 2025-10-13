# STAGETEK CRM System - Claude Configuration

**INSTRUÇÕES CRÍTICAS: SIGA RIGOROSAMENTE O PROTOCOL NOTECRAFT™**

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS (11 Out 2025)

### **PRIORIDADE 1: Database Setup** (15-30 min)
1. **Criar migrations SQL no Supabase**
   - Acessar: https://twcpqhhtoqcgzplrmohi.supabase.co
   - SQL Editor → New Query
   - Copiar de `protocol/DATABASE-SCHEMA-V2-ANALYSIS.md`
   - Executar migrations (criar tabelas)

2. **Testar conexão**
   - Rodar `npm run dev`
   - Abrir DevTools → Network
   - Verificar chamadas Supabase

### **PRIORIDADE 2: Conectar UI ao Backend** (1-2h)
1. Substituir mock data em `src/pages/Clientes.tsx`
2. Substituir mock data em `src/pages/Oportunidades.tsx`
3. Testar CRUD completo (criar, ler, atualizar, deletar)

### **PRIORIDADE 3: Commit & Deploy** (10 min)
1. `git add .`
2. `git commit -m "feat: complete Protocol Notecraft™ refactoring + Supabase setup"`
3. `git push`
4. Deploy Vercel (automático)

**📄 Ver seção completa abaixo para detalhes.**

---

## 🚨 LEIA PRIMEIRO: CONTEXTO CRÍTICO

**VOCÊ ESTÁ TRABALHANDO EM UM PROJETO REAL COM REQUISITOS ESPECÍFICOS.**

Antes de fazer QUALQUER alteração, você DEVE:

1. ✅ Ler `protocol/PRD.md` (995 linhas) - Product Requirements Document COMPLETO
2. ✅ Ler `protocol/RD-STATION-ANALYSIS.md` (1200 linhas) - Análise DETALHADA das telas do RD Station
3. ✅ Ler `protocol/GAP-ANALYSIS.md` (556 linhas) - O que está faltando vs o que deve ser feito
4. ✅ Ler `protocol/FEATURES-PRIORITIZED.md` - Priorização P0/P1/P2/P3

**NUNCA** faça correções visuais ou melhorias sem entender o FLUXO COMPLETO do sistema.

---

## 🎯 STATUS DE IMPLEMENTAÇÃO (Atualizado: 11 Out 2025)

### 🎉 MARCOS RECENTES (11 Out 2025)

#### **✅ Protocol Notecraft™ - 100% COMPLIANCE ALCANÇADA**
- ✅ Refatoração completa de 10 componentes (-434 linhas, -48% média)
- ✅ Automação criada: `scripts/validate-notecraft.js`
- ✅ Pre-commit hook configurado (Husky) - **commits bloqueados** se violarem limites
- ✅ npm script: `npm run validate:notecraft` disponível
- ✅ Componentes extraídos para reuso:
  - `useClienteForm.ts` (61 linhas) - Hook form clientes
  - `useOportunidadeForm.ts` (67 linhas) - Hook form oportunidades
  - `ModalHeader.tsx` (16 linhas) - Header reutilizável
  - `ModalActions.tsx` (20 linhas) - Actions reutilizáveis
  - `ClientTableHeader.tsx` (20 linhas) - Header tabela
  - `ClientTableRow.tsx` (32 linhas) - Row tabela
  - `TopBarActions.tsx` (17 linhas) - Actions TopBar

**Resultado**: Zero violações, zero manutenção manual necessária.

#### **✅ Supabase - CONFIGURADO E PRONTO**
- ✅ Projeto criado: `twcpqhhtoqcgzplrmohi.supabase.co`
- ✅ Credenciais configuradas em `.env`
- ✅ Cliente Supabase criado: `src/lib/supabase.ts`
- ⏳ **PRÓXIMO**: Executar migrations + testar conexão

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
- ⏳ **PRÓXIMO**: Conectar ao Supabase (atualmente mock data)

#### **CRUD Oportunidades**
- ✅ Página `src/pages/Oportunidades.tsx` (React)
- ✅ Modal criação/edição (`OportunidadeModal.tsx` - 50 linhas)
- ✅ Formulário completo (cliente, valor, estágio, data)
- ✅ Listagem básica
- ⏳ **PRÓXIMO**: Conectar ao Supabase (atualmente mock data)

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

#### **Navegação & Layout**
- ✅ TopBar (`src/components/organisms/TopBar.tsx` - 44 linhas)
  - Logo STAGETEK
  - Navegação horizontal (Dashboard, Oportunidades, Clientes, etc.)
  - SearchBar
  - Notificações + Ajuda + Apps
  - UserMenu dropdown (31 linhas)
- ✅ MainLayout com TopBar + conteúdo

---

### ⏳ O que FALTA (PRÓXIMOS PASSOS - P0)

#### **1. Integração Supabase - Database Schema** (PRIORIDADE MÁXIMA)

**Status**: Supabase configurado, mas tabelas não criadas.

**Ações necessárias**:
- [ ] Criar migrations SQL:
  - [ ] Tabela `clients` (CNPJ, nome, email, phone, website, status, created_by)
  - [ ] Tabela `stages` (nome, cor, ordem, pipeline_id)
  - [ ] Tabela `deals` (título, cliente_id, estágio_id, valor, probabilidade, data_fechamento)
  - [ ] Tabela `contacts` (nome, email, phone, client_id)
  - [ ] Tabela `tasks` (título, descrição, tipo, data_vencimento, deal_id, responsável)
  - [ ] RLS (Row Level Security) policies
- [ ] Executar migrations no Supabase
- [ ] Testar queries básicas (INSERT, SELECT, UPDATE, DELETE)
- [ ] Seed data inicial (funis padrão, estágios padrão)

**Arquivo de referência**: `protocol/DATABASE-SCHEMA-V2-ANALYSIS.md` (completo)

---

#### **2. Detalhes da Oportunidade** (0% implementado)

**Baseado em**: `RD-STATION-ANALYSIS.md` linhas 224-339 + `tarefas.png` screenshot

**Página completa**: `src/pages/DetalheOportunidade.tsx` (NÃO EXISTE!)

**Layout necessário**:
```
┌─────────────────────────────────────────────────────┐
│ TopBar (Logo | Menu | Busca | Avatar)              │
├──────────────┬──────────────────────┬───────────────┤
│ Sidebar Left │   Tabs Centrais      │ Sidebar Right │
│              │                      │               │
│ - Funil      │ ✅ HISTÓRICO (ativo) │ - Responsável │
│ - Estágio    │ □ E-MAIL             │ - Dados       │
│ - Qualif.    │ □ TAREFAS            │   Cliente     │
│ - Valores    │ □ CONTATOS           │ - Dados Oport.│
│ - Datas      │ □ PRODUTOS           │ - Dados       │
│              │ □ ARQUIVOS           │   Contato     │
└──────────────┴──────────────────────┴───────────────┘
```

**Header da Oportunidade** (topo da página):
- [ ] Botão "←" (voltar)
- [ ] Título: Nome da oportunidade (ex: "Venda JANEIRO")
- [ ] Subtítulo: Nome da empresa/origem (ex: "RD Station")
- [ ] Botão: "👍 Marcar venda" (verde)
- [ ] Botão: "👎 Marcar perda" (vermelho)
- [ ] Ícone: Engrenagem (configurações)
- [ ] Ícone: Lixeira (excluir)
- [ ] Texto: "Saldo: R$ 91,12" (canto superior direito)

**Sidebar Esquerda**:
- [ ] Funil e estágio de vendas (visual com bolinhas)
- [ ] Qualificação (5 estrelas) - "Quente"
- [ ] Valores (R$ 5,00 + R$ 5,00)
- [ ] Data de criação
- [ ] Previsão de fechamento

**Tabs Centrais**:
- [ ] Tab "HISTÓRICO DA OPORTUNIDADE" (ativa por padrão)
  - [ ] Timeline de eventos
  - [ ] Formulário: "Criar Anotação"
  - [ ] Checkboxes de filtro (Anotação, Tarefa, Email, etc.)
- [ ] Tab "E-MAIL"
  - [ ] Formulário de envio de email
  - [ ] Seletor de modelo de email
  - [ ] Editor WYSIWYG
- [ ] Tab "TAREFAS" ⭐ **NOVO** (baseado em `tarefas.png`)
  - [ ] Seção "PRÓXIMAS TAREFAS" com lista
  - [ ] Formulário "CRIAR TAREFA"
  - [ ] Ícones por tipo (Ligação, WhatsApp, Email, Reunião)
- [ ] Tab "CONTATOS"
- [ ] Tab "PRODUTOS E SERVIÇOS"
- [ ] Tab "ARQUIVOS"

**Sidebar Direita**:
- [ ] Responsável (dropdown)
- [ ] Dados da Empresa/Cliente (expansível)
- [ ] Dados da Oportunidade (expansível)
- [ ] Dados do Contato (expansível)

**Status**: Página NÃO EXISTE. Ao clicar em card do Kanban, NADA acontece.

**Ação**: Criar `src/pages/DetalheOportunidade.tsx` completo com todas as tabs.

---

#### **3. Configuração de Funis** (0% implementado)

**Baseado em**: `RD-STATION-ANALYSIS.md` linhas 586-675 + `Funil_4.png` screenshot

**Página**: `src/pages/ConfigFunis.tsx` (NÃO EXISTE!)

**Funcionalidades necessárias**:
- [ ] Lista de funis (ex: "Funil PADRÃO (Não Alterar)", "Funil Prospecção", "Funil de carteira")
- [ ] **Editor visual de etapas** (bolinhas conectadas por linha azul):
  - [ ] Círculo azul preenchido para cada etapa
  - [ ] Label: Nome da etapa (ex: "Sem contato / Lead")
  - [ ] Sigla: "Sigla: SC/L"
  - [ ] Botão "+" verde (adicionar nova etapa)
- [ ] Botão: "▷" (expandir/colapsar funil)
- [ ] Botão: "⚙️ Editar automação entre funis" (azul)
- [ ] Ícone: Lixeira (excluir funil)
- [ ] CRUD completo:
  - [ ] Criar novo funil
  - [ ] Renomear funil
  - [ ] Adicionar/Remover etapas
  - [ ] Configurar siglas
  - [ ] Deletar funil

**Status**: Página NÃO EXISTE. Impossível gerenciar múltiplos funis.

**Ação**: Criar `src/pages/ConfigFunis.tsx` com editor visual.

---

#### **4. Melhorias no Funil Kanban** (40% implementado)

**Baseado em**: `GAP-ANALYSIS.md` linhas 39-77

**Faltam**:
- [ ] **Filtros no topo** (linha horizontal):
  - [ ] Dropdown: "Funil de vendas" (selecionar funil ativo)
  - [ ] Dropdown: "Minhas oportunidades" (filtrar por usuário)
  - [ ] Dropdown: "Status da oportunidade" (Aberto, Ganho, Perdido)
  - [ ] Botão: "⟳ Recarregar"
  - [ ] Botão: "▦ Filtro ativo" (mostrar quantos filtros aplicados)
- [ ] **Cards de Oportunidade** (melhorar):
  - [ ] Qualificação com estrelas (1-5 estrelas) ⭐⭐⭐⭐⭐
  - [ ] Ícone telefone (ação rápida) 📞
  - [ ] Ícone e-mail (ação rápida) ✉️
  - [ ] Avatar do cliente (inicial)
  - [ ] Indicador de tarefas atrasadas (ícone vermelho)
- [ ] **Tooltip ao hover**:
  - [ ] Mostrar nome completo + status + próximas ações

**Status**: Kanban básico funciona, mas falta 60% das features visuais.

**Ação**: Refatorar `pages/funil-vendas.html` para adicionar filtros e melhorar cards.

---

#### **5. Sistema de Tarefas** (0% implementado)

**Baseado em**: `tarefas.png` screenshot

**Elementos necessários**:
- [ ] Tipos de tarefa: Ligação, WhatsApp, Email, Reunião
- [ ] Campos do formulário:
  - [ ] Dropdown: "Tipo" (com ícone)
  - [ ] DatePicker: "Data"
  - [ ] TimePicker: "Hora"
  - [ ] Seletor: "Responsável" (avatar + nome + email)
- [ ] Lista de tarefas:
  - [ ] Ícone por tipo
  - [ ] Título da tarefa
  - [ ] Timestamp relativo ("Hoje às 10:27")
  - [ ] Ações: Editar, Deletar, Concluir (checkmark azul)
- [ ] Integração com Timeline de Histórico
- [ ] Notificações de tarefas vencidas

**Status**: NÃO EXISTE sistema de tarefas. Não é possível criar, listar ou gerenciar.

**Ação**: Criar feature completa de tarefas (backend + frontend).

---

### ⚠️ O que FALTA (P1 - ALTA PRIORIDADE)

#### **6. CRUD Produtos** (planejado, não implementado)
- [ ] Catálogo de 50+ produtos (Som, Luz, Estruturas, Talhas)
- [ ] Categorias: som, luz, estrutura
- [ ] Campos: nome, SKU, categoria, preço (BRL/USD/EUR), descrição, imagem
- [ ] Busca + filtros

#### **7. Sistema de Cotações** (0% implementado)
- [ ] Selecionar produtos
- [ ] Calcular frete
- [ ] Gerar PDF profissional
- [ ] Enviar por email (Resend API)

#### **8. Importação Excel** (0% implementado)
- [ ] Upload .xlsx
- [ ] Validação + preview
- [ ] Import batch para Supabase

#### **9. Integrações** (0% implementado)
- [ ] Resend API (emails)
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

- [ ] Li `protocol/PRD.md` completo?
- [ ] Li `protocol/RD-STATION-ANALYSIS.md` completo?
- [ ] Li `protocol/GAP-ANALYSIS.md` completo?
- [ ] Entendo qual feature estou implementando (P0/P1/P2/P3)?
- [ ] Sei qual fluxo de navegação essa feature afeta?
- [ ] Tenho certeza que não estou duplicando código existente?
- [ ] Vou seguir limites de linhas do Protocol Notecraft™?
- [ ] Vou usar TypeScript strict?
- [ ] Vou usar Tailwind (não CSS inline)?
- [ ] É mobile-first?

---

## 🎯 PRÓXIMOS PASSOS RECOMENDADOS

### **Opção 1: Completar P0 (Recomendado)**
```
Semana 1: TopBar completo + integração em todas as páginas
Semana 2: Detalhes da Oportunidade (layout 3 colunas)
Semana 3: Detalhes da Oportunidade (Tab Histórico + Tarefas)
Semana 4: Detalhes da Oportunidade (Tabs E-mail, Contatos, Produtos)
Semana 5: Configuração de Funis (editor visual)
```

### **Opção 2: Quick Wins (Validação Rápida)**
```
Semana 1: TopBar + Navegação básica
Semana 2: Melhorias no Funil (filtros, estrelas, ícones)
Semana 3: Detalhes Oportunidade simplificado (apenas Histórico)
Semana 4: Sistema de Tarefas básico
Semana 5: Refinamentos + testes
```

---

## 📚 Referências Obrigatórias

### **Documentação de Produto**
- `/protocol/PRD.md` - Product Requirements Document (995 linhas)
- `/protocol/RD-STATION-ANALYSIS.md` - Análise de telas (1200 linhas)
- `/protocol/GAP-ANALYSIS.md` - Gap analysis (556 linhas)
- `/protocol/FEATURES-PRIORITIZED.md` - Priorização

### **Documentação Técnica**
- `/protocol/PROTOCOL-NOTECRAFT.md` - Atomic Design rules
- `/protocol/BRANDING-STANDARDS.md` - STAGETEK brand
- `/protocol/ARCHITECTURE.md` - System architecture

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

## 📊 Resumo Estatístico

### **Features por Prioridade**
| Prioridade | Features | Status |
|------------|----------|--------|
| **P0** | 5 features | 40% completo |
| **P1** | 6 features | 0% completo |
| **P2** | 6 features | 0% completo |
| **P3** | 3 features | 0% completo |

### **Tempo Estimado (P0 Completo)**
- TopBar + Navegação: 1 semana
- Detalhes Oportunidade: 2 semanas
- Configuração Funis: 1 semana
- Melhorias Kanban: 1 semana
- **Total P0**: 5 semanas

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

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**

**Última atualização**: 3 de Outubro de 2025

---

## 🚨 LEMBRETE FINAL

**ANTES DE FAZER QUALQUER ALTERAÇÃO:**

1. Leia `protocol/PRD.md` completo
2. Leia `protocol/RD-STATION-ANALYSIS.md` completo
3. Leia `protocol/GAP-ANALYSIS.md` completo
4. Entenda qual feature você está implementando
5. Verifique se não está duplicando código
6. Siga rigorosamente o Protocol Notecraft™

**NÃO FAÇA CORREÇÕES VISUAIS SEM ENTENDER O FLUXO COMPLETO.**
**NÃO TRABALHE SEM CONSULTAR A DOCUMENTAÇÃO.**

Isso é um projeto REAL com requisitos ESPECÍFICOS. Sua responsabilidade é implementar EXATAMENTE o que está documentado, não "melhorar" sem contexto.
