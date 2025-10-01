# Design Plan - STAGETEK CRM System

**Versão**: 1.0.0
**Data**: 1 de Outubro de 2025
**Abordagem**: Design-First (UI → Navigation → Database Schema)

---

## 🎯 Objetivo

Criar designs completos de todas as telas ANTES de implementar código, permitindo:

1. **Mapear navegação exata** (qual botão leva para onde)
2. **Definir campos de formulários** (base para schema do banco)
3. **Identificar componentes reutilizáveis** (Atomic Design)
4. **Validar UX com stakeholders** (antes de codar)
5. **Estimar complexidade real** (baseado em UI, não só features)

---

## 📱 Estratégia Mobile-First

**TODOS os designs devem ter 2 versões:**

1. **Mobile** (320px - 768px)
   - Bottom navigation bar
   - Cards (não tabelas)
   - Forms multi-step (não longos)
   - Modals full-screen
   - Touch-friendly (botões grandes, espaçamento adequado)

2. **Desktop** (>768px)
   - Sidebar navigation
   - DataTables
   - Forms em 2-3 colunas
   - Modals centralizados
   - Hover states

---

## 🎨 Design System Base (STAGETEK)

### **Cores**
```css
--stagetek-red-primary: #e90101
--stagetek-red-medium: #862128
--stagetek-red-dark: #63141a
--stagetek-white: #fbfafb
--stagetek-black: #000000
--stagetek-gray: #727272
```

### **Tipografia**
```css
--font-family: 'Inter', -apple-system, sans-serif
--font-size-xs: 12px
--font-size-sm: 14px
--font-size-base: 16px
--font-size-lg: 18px
--font-size-xl: 24px
--font-size-2xl: 32px
```

### **Spacing**
```css
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-6: 24px
--space-8: 32px
--space-12: 48px
--space-16: 64px
```

### **Componentes Base (shadcn/ui)**
- Button (primary, outline, ghost)
- Input (text, email, tel, number, date)
- Select (dropdown)
- Textarea
- Checkbox
- Radio
- Switch (dark mode toggle)
- Badge (status indicators)
- Avatar (iniciais do usuário)
- Card (container padrão)
- Modal/Dialog
- Toast (notificações)
- Tabs
- Accordion
- DataTable
- Command (search/filter)

---

## 📋 Telas a Serem Criadas (Prioridade P0-P2)

### **P0 - CRÍTICO (MVP)**

#### **P0.1 - Login / Autenticação**

**Página**: `/login`

**Elementos**:
- [ ] Logo STAGETEK (120px)
- [ ] Formulário centralizado:
  - [ ] Input: Email
  - [ ] Input: Password (com show/hide)
  - [ ] Checkbox: "Lembrar de mim"
  - [ ] Button: "Entrar" (primary)
  - [ ] Link: "Esqueci minha senha"
- [ ] Footer: Protocol Notecraft™
- [ ] Dark mode toggle (canto superior direito)

**Fluxos**:
- Login sucesso → Dashboard
- Login falha → Toast erro
- Esqueci senha → Modal com email input

**Prompt Superdesign**:
```
Design a modern, minimal B2B CRM login page with:
- Centered card (400px width)
- STAGETEK red accent (#e90101)
- Email and password inputs
- "Remember me" checkbox
- Primary red button "Entrar"
- "Forgot password" link
- Dark mode support
- Logo at top (STAGETEK)
- Mobile-responsive
```

---

#### **P0.2 - Dashboard**

**Página**: `/dashboard`

**Layout Desktop**:
```
┌─────────────┬────────────────────────────────────┐
│             │  Top Bar (Search + Dark + Avatar)  │
│   Sidebar   ├────────────────────────────────────┤
│             │  4 Stat Cards (row)                │
│  Navigation │  ├─ Total Vendas                   │
│             │  ├─ Oportunidades Abertas          │
│             │  ├─ Taxa Conversão                 │
│             │  └─ Ticket Médio                   │
│             ├────────────────────────────────────┤
│             │  2 Charts (grid 2 cols)            │
│             │  ├─ Vendas ao Longo do Tempo       │
│             │  └─ Oportunidades por Estágio      │
│             ├────────────────────────────────────┤
│             │  Recent Opportunities (DataTable)  │
└─────────────┴────────────────────────────────────┘
```

**Layout Mobile**:
```
┌────────────────────────────┐
│  Top Bar (Menu + Avatar)   │
├────────────────────────────┤
│  Stat Cards (vertical)     │
│  ┌─ Total Vendas          │
│  ├─ Oportunidades          │
│  ├─ Taxa Conversão         │
│  └─ Ticket Médio           │
├────────────────────────────┤
│  Charts (vertical stack)   │
│  ┌─ Vendas Tempo          │
│  └─ Opps Estágio          │
├────────────────────────────┤
│  Recent Opps (Cards)       │
└────────────────────────────┘
│  Bottom Nav (5 ícones)     │
└────────────────────────────┘
```

**Elementos**:
- [ ] Sidebar (desktop):
  - [ ] Logo STAGETEK (32px)
  - [ ] Menu items: Dashboard, Clientes, Funil, Produtos, Relatórios
  - [ ] User section (avatar + nome + role)
- [ ] Top Bar:
  - [ ] Search input (com ícone)
  - [ ] Dark mode toggle
  - [ ] Avatar dropdown (Perfil, Configurações, Sair)
- [ ] 4 Stat Cards:
  - [ ] Ícone (Feather Icons)
  - [ ] Valor principal (grande, bold)
  - [ ] Label (menor, cinza)
  - [ ] Mudança % (verde/vermelho com seta)
- [ ] 2 Charts (Recharts):
  - [ ] Vendas ao Longo do Tempo (Line Chart)
  - [ ] Oportunidades por Estágio (Pie Chart)
- [ ] DataTable Recent Opportunities:
  - [ ] Colunas: Cliente, Valor, Estágio, Data, Ações
  - [ ] Actions: Ver, Editar
  - [ ] Paginação (10 por página)
- [ ] Bottom Nav (mobile):
  - [ ] 5 ícones: Home, Clientes, Funil, Produtos, Perfil

**Prompt Superdesign**:
```
Design a modern B2B CRM dashboard with:

Desktop Layout:
- Left sidebar (256px) with navigation
- Top bar with search, dark mode toggle, avatar
- 4 stat cards in a row showing: Total Sales, Open Opportunities, Conversion Rate, Average Ticket
- 2 charts (line chart for sales over time, pie chart for opportunities by stage)
- Recent opportunities data table
- STAGETEK red accent (#e90101)
- Dark mode support

Mobile Layout:
- Hidden sidebar (hamburger menu)
- Stat cards stacked vertically
- Charts stacked vertically
- Recent opportunities as cards (not table)
- Bottom navigation bar with 5 icons
- Mobile-first, touch-friendly
```

---

#### **P0.3 - CRUD Clientes**

**Página**: `/clientes`

**Layout Desktop**:
```
┌─────────────┬────────────────────────────────────┐
│             │  Header (Título + Button Novo)     │
│   Sidebar   ├────────────────────────────────────┤
│             │  Filtros (Search + Status + Date)  │
│             ├────────────────────────────────────┤
│             │  DataTable Clientes                │
│             │  ┌─ Avatar + Nome                  │
│             │  ├─ CNPJ                           │
│             │  ├─ Email                          │
│             │  ├─ Telefone                       │
│             │  ├─ Status (Badge)                 │
│             │  └─ Actions (Editar, Excluir)      │
│             ├────────────────────────────────────┤
│             │  Paginação                         │
└─────────────┴────────────────────────────────────┘
```

**Layout Mobile**:
```
┌────────────────────────────┐
│  Header (Título + FAB +)   │
├────────────────────────────┤
│  Search Bar                │
│  Filters (Sheet modal)     │
├────────────────────────────┤
│  Cliente Cards (vertical)  │
│  ┌──────────────────────┐ │
│  │ Avatar  Nome         │ │
│  │ CNPJ: xxx            │ │
│  │ Badge: Active        │ │
│  │ [Ver] [Editar]       │ │
│  └──────────────────────┘ │
└────────────────────────────┘
│  Bottom Nav                │
└────────────────────────────┘
```

**Elementos**:
- [ ] Header:
  - [ ] Título: "Clientes"
  - [ ] Button: "+ Novo Cliente" (primary)
  - [ ] Badge: Total de clientes (ex: "127 clientes")
- [ ] Filtros:
  - [ ] Search input (busca por nome/CNPJ)
  - [ ] Select: Status (Todos, Ativo, Inativo, Pendente)
  - [ ] Date range picker: Data de cadastro
  - [ ] Button: "Limpar filtros"
- [ ] DataTable (desktop):
  - [ ] Avatar com iniciais
  - [ ] Nome (link para detalhes)
  - [ ] CNPJ (formatado: 00.000.000/0000-00)
  - [ ] Email
  - [ ] Telefone (formatado)
  - [ ] Status (Badge colorido)
  - [ ] Actions dropdown: Ver, Editar, Desativar
- [ ] Cards (mobile):
  - [ ] Avatar + Nome
  - [ ] CNPJ
  - [ ] Badge status
  - [ ] Buttons: Ver, Editar
- [ ] FAB (Floating Action Button - mobile):
  - [ ] Ícone "+" vermelho STAGETEK
  - [ ] Abrir modal criar cliente

**Modal: Criar/Editar Cliente**:
- [ ] Título: "Novo Cliente" ou "Editar Cliente"
- [ ] Tabs: Dados Básicos, Endereço, Contato
- [ ] **Tab 1 - Dados Básicos**:
  - [ ] Input: CNPJ (com autocomplete brasil-api-mcp)
  - [ ] Input: Razão Social (preenchido pelo CNPJ)
  - [ ] Input: Nome Fantasia
  - [ ] Select: Status (Ativo, Inativo, Pendente)
- [ ] **Tab 2 - Endereço**:
  - [ ] Input: CEP (com autocomplete)
  - [ ] Input: Rua (preenchido pelo CEP)
  - [ ] Input: Número
  - [ ] Input: Complemento
  - [ ] Input: Bairro
  - [ ] Input: Cidade
  - [ ] Select: Estado (UF)
- [ ] **Tab 3 - Contato**:
  - [ ] Input: Email
  - [ ] Input: Telefone (máscara: (00) 00000-0000)
  - [ ] Input: WhatsApp (opcional)
  - [ ] Input: Responsável
  - [ ] Input: Cargo do Responsável
- [ ] Footer Modal:
  - [ ] Button: "Cancelar" (outline)
  - [ ] Button: "Salvar" (primary)

**Prompt Superdesign**:
```
Design a modern B2B CRM clients page with:

Desktop:
- Header with "Clientes" title and "+ Novo Cliente" button
- Filters row: search input, status select, date range picker
- Data table with columns: Avatar, Nome, CNPJ, Email, Telefone, Status (badge), Actions
- Pagination at bottom
- STAGETEK red accent (#e90101)

Mobile:
- Header with title and FAB (Floating Action Button)
- Search bar with filter icon (opens bottom sheet)
- Client cards (vertical list) with avatar, name, CNPJ, status badge, action buttons
- Bottom navigation bar

Modal (Create/Edit Client):
- Multi-step tabs: Dados Básicos, Endereço, Contato
- CNPJ input with autocomplete
- Address fields with CEP autocomplete
- Contact information fields
- Cancel and Save buttons

Mobile-first, touch-friendly, dark mode support
```

---

#### **P0.4 - Funil de Vendas (Kanban)**

**Página**: `/funil`

**Layout Desktop**:
```
┌─────────────┬────────────────────────────────────┐
│             │  Header (Título + Filtros + Novo)  │
│   Sidebar   ├────────────────────────────────────┤
│             │  Kanban Board (5 colunas)          │
│             │  ┌───┬───┬───┬───┬───┐             │
│             │  │ L │ C │ P │ N │ F │             │
│             │  │ e │ o │ r │ e │ e │             │
│             │  │ a │ n │ o │ g │ c │             │
│             │  │ d │ t │ p │ o │ h │             │
│             │  │   │ a │ o │ c │ a │             │
│             │  │   │ t │ s │ i │ m │             │
│             │  │   │ o │ t │ a │ e │             │
│             │  │   │   │ a │ ç │ n │             │
│             │  │   │   │   │ ã │ t │             │
│             │  │   │   │   │ o │ o │             │
│             │  └───┴───┴───┴───┴───┘             │
└─────────────┴────────────────────────────────────┘
```

**Layout Mobile (horizontal scroll)**:
```
┌────────────────────────────┐
│  Header (Título + FAB +)   │
├────────────────────────────┤
│  ← Swipe horizontalmente → │
│  ┌───┬───┬───┬───┬───┐     │
│  │ L │ C │ P │ N │ F │ ... │
│  │   │   │   │   │   │     │
│  │ 📋│ 📋│ 📋│ 📋│ 📋│     │
│  │ 📋│ 📋│   │ 📋│   │     │
│  └───┴───┴───┴───┴───┘     │
└────────────────────────────┘
│  Bottom Nav                │
└────────────────────────────┘
```

**Elementos**:
- [ ] Header:
  - [ ] Título: "Funil de Vendas"
  - [ ] Filtros inline:
    - [ ] Select: Vendedor (Todos, João, Maria...)
    - [ ] Date range: Período
    - [ ] Select: Valor mínimo
  - [ ] Button: "+ Nova Oportunidade"
- [ ] Kanban Board:
  - [ ] **5 Colunas**:
    1. Lead
    2. Contato Inicial
    3. Proposta Enviada
    4. Negociação
    5. Fechamento
  - [ ] Cada coluna tem:
    - [ ] Header com:
      - [ ] Nome do estágio
      - [ ] Badge com quantidade de cards
      - [ ] Total de valor (R$ soma)
    - [ ] Cards de oportunidades:
      - [ ] Cliente (nome + avatar)
      - [ ] Título da oportunidade
      - [ ] Valor (BRL/USD/EUR)
      - [ ] Data esperada de fechamento
      - [ ] Tag/Badge (categoria)
      - [ ] Drag handle (ícone)
  - [ ] Drag-and-drop entre colunas (desktop)
  - [ ] Swipe entre colunas (mobile)
- [ ] Empty states:
  - [ ] Ícone + "Nenhuma oportunidade neste estágio"
  - [ ] Button: "Criar primeira oportunidade"

**Modal: Criar/Editar Oportunidade**:
- [ ] Título: "Nova Oportunidade" ou "Editar Oportunidade"
- [ ] Form:
  - [ ] Input: Título da oportunidade
  - [ ] Select: Cliente (com busca)
  - [ ] Input: Valor (com seletor de moeda BRL/USD/EUR)
  - [ ] Select: Estágio
  - [ ] Date picker: Data esperada de fechamento
  - [ ] Slider: Probabilidade de conversão (0-100%)
  - [ ] Textarea: Descrição/Notas
  - [ ] Select: Vendedor responsável
  - [ ] Tags: Categorias (multi-select)
- [ ] Footer:
  - [ ] Button: "Cancelar"
  - [ ] Button: "Salvar"

**Prompt Superdesign**:
```
Design a modern B2B CRM sales funnel (Kanban board) with:

Desktop:
- Header with "Funil de Vendas" title, filters (salesperson, date range, min value), "+ Nova Oportunidade" button
- 5 columns: Lead, Contato Inicial, Proposta Enviada, Negociação, Fechamento
- Each column header shows: stage name, card count badge, total value sum
- Opportunity cards with: client name/avatar, opportunity title, value (BRL/USD/EUR), expected close date, category tag, drag handle
- Drag-and-drop between columns
- Empty state with icon and "Create first opportunity" button
- STAGETEK red accent (#e90101)

Mobile:
- Horizontal scrollable columns (swipe left/right)
- Smaller cards optimized for touch
- FAB for "+ Nova Oportunidade"
- Swipe cards between columns

Modal (Create/Edit Opportunity):
- Title, Client select with search, Value input with currency selector, Stage select, Expected close date picker, Probability slider (0-100%), Description textarea, Assigned salesperson select, Category tags multi-select
- Cancel and Save buttons

Dark mode support, mobile-first
```

---

#### **P0.5 - Detalhes da Oportunidade**

**Página**: `/oportunidades/:id`

**Layout Desktop**:
```
┌─────────────┬────────────────────────────────────┐
│             │  Breadcrumb (Funil > Oportunidade) │
│   Sidebar   ├────────────────────────────────────┤
│             │  Header (Cliente + Valor + Badge)  │
│             ├────────────────────────────────────┤
│             │  3 Colunas:                        │
│             │  ┌───────┬────────┬────────┐       │
│             │  │ Info  │ Timeline│ Files │       │
│             │  │ Geral │ Ativid. │ Docs  │       │
│             │  └───────┴────────┴────────┘       │
└─────────────┴────────────────────────────────────┘
```

**Elementos**:
- [ ] Header:
  - [ ] Breadcrumb: Funil > [Cliente Nome]
  - [ ] Cliente: Nome + Avatar grande
  - [ ] Valor: R$ 45.000,00 (destaque)
  - [ ] Badge: Estágio atual
  - [ ] Actions: Editar, Mover estágio, Excluir
- [ ] **Coluna 1 - Informações Gerais**:
  - [ ] Card: Dados da Oportunidade
    - [ ] Título
    - [ ] Valor (com moeda)
    - [ ] Data esperada
    - [ ] Probabilidade (progress bar)
    - [ ] Vendedor responsável
    - [ ] Data de criação
  - [ ] Card: Cliente
    - [ ] Nome
    - [ ] CNPJ
    - [ ] Email
    - [ ] Telefone
    - [ ] Link: Ver perfil completo
- [ ] **Coluna 2 - Timeline de Atividades**:
  - [ ] Input: "Adicionar nota..."
  - [ ] Timeline vertical:
    - [ ] Mudança de estágio (com ícone)
    - [ ] Notas adicionadas
    - [ ] Emails enviados
    - [ ] Cotações geradas
    - [ ] Cada item com: Data/hora, usuário, descrição
- [ ] **Coluna 3 - Arquivos e Documentos**:
  - [ ] Upload area (drag-and-drop)
  - [ ] Lista de arquivos:
    - [ ] Ícone do tipo (PDF, XLSX, etc)
    - [ ] Nome do arquivo
    - [ ] Tamanho
    - [ ] Data de upload
    - [ ] Actions: Download, Excluir

**Prompt Superdesign**:
```
Design a modern B2B CRM opportunity detail page with:

Header:
- Breadcrumb navigation (Funil > Client Name)
- Client name with large avatar
- Opportunity value (large, prominent)
- Current stage badge
- Action buttons: Edit, Move Stage, Delete

3-Column Layout:

Column 1 - General Info:
- Opportunity data card (title, value, expected date, probability progress bar, assigned salesperson, creation date)
- Client card (name, CNPJ, email, phone, "View full profile" link)

Column 2 - Activity Timeline:
- "Add note..." input at top
- Vertical timeline showing: stage changes, notes, sent emails, generated quotes
- Each item with timestamp, user, description

Column 3 - Files & Documents:
- Drag-and-drop upload area
- File list with icon, name, size, upload date, download/delete actions

STAGETEK red accent (#e90101)
Dark mode support
Mobile-responsive (tabs instead of columns on mobile)
```

---

### **P1 - ALTA PRIORIDADE (CRM Funcional)**

#### **P1.6 - CRUD Produtos (Catálogo)**

**Página**: `/produtos`

**Layout Desktop (Grid View)**:
```
┌─────────────┬────────────────────────────────────┐
│             │  Header (Título + View Toggle)     │
│   Sidebar   ├────────────────────────────────────┤
│             │  Filtros (Search + Categoria)      │
│             ├────────────────────────────────────┤
│             │  Product Grid (3-4 colunas)        │
│             │  ┌──────┬──────┬──────┬──────┐     │
│             │  │ Img  │ Img  │ Img  │ Img  │     │
│             │  │ Nome │ Nome │ Nome │ Nome │     │
│             │  │ Preço│ Preço│ Preço│ Preço│     │
│             │  └──────┴──────┴──────┴──────┘     │
└─────────────┴────────────────────────────────────┘
```

**Elementos**:
- [ ] Header:
  - [ ] Título: "Catálogo de Produtos"
  - [ ] Button: "+ Novo Produto"
  - [ ] Toggle: Grid view / List view
  - [ ] Badge: Total de produtos
- [ ] Filtros:
  - [ ] Search: Buscar por nome/SKU
  - [ ] Select: Categoria (Todos, Som, Luz, Estrutura)
  - [ ] Range slider: Faixa de preço
  - [ ] Select: Ordenar por (Nome, Preço, Mais recentes)
- [ ] **Grid View** (cards):
  - [ ] Imagem do produto (16:9)
  - [ ] Badge: Categoria
  - [ ] Nome do produto
  - [ ] SKU (menor, cinza)
  - [ ] Preço (BRL/USD/EUR)
  - [ ] Badge: Estoque (disponível/esgotado)
  - [ ] Actions: Ver, Editar, Excluir
- [ ] **List View** (DataTable):
  - [ ] Imagem miniatura
  - [ ] Nome + SKU
  - [ ] Categoria
  - [ ] Preço (3 moedas)
  - [ ] Estoque
  - [ ] Actions

**Modal: Criar/Editar Produto**:
- [ ] Tabs: Informações, Preços, Mídia
- [ ] **Tab 1 - Informações**:
  - [ ] Input: Nome do produto
  - [ ] Input: SKU (auto-gerado ou manual)
  - [ ] Select: Categoria (Som, Luz, Estrutura)
  - [ ] Textarea: Descrição
  - [ ] Input: Estoque (quantidade)
- [ ] **Tab 2 - Preços**:
  - [ ] Input: Preço BRL
  - [ ] Input: Preço USD
  - [ ] Input: Preço EUR
  - [ ] Checkbox: "Calcular automaticamente USD/EUR"
- [ ] **Tab 3 - Mídia**:
  - [ ] Upload de imagem (drag-and-drop)
  - [ ] Preview da imagem
  - [ ] URL da imagem (alternativa)
- [ ] Footer:
  - [ ] Button: "Cancelar"
  - [ ] Button: "Salvar"

**Prompt Superdesign**:
```
Design a modern B2B CRM product catalog page with:

Desktop:
- Header with "Catálogo de Produtos" title, "+ Novo Produto" button, grid/list view toggle, total count badge
- Filters: search input, category select, price range slider, sort by select
- Grid view (3-4 columns): product cards with image (16:9), category badge, product name, SKU, price (BRL/USD/EUR), stock badge, action buttons
- List view: data table with thumbnail, name/SKU, category, prices (3 currencies), stock, actions
- STAGETEK red accent (#e90101)

Mobile:
- Grid view (1-2 columns)
- Search bar with filter icon
- Product cards optimized for touch
- FAB for "+ Novo Produto"

Modal (Create/Edit Product):
- Tabs: Informações, Preços, Mídia
- Product info fields (name, SKU, category, description, stock)
- Pricing fields (BRL, USD, EUR) with auto-calculate checkbox
- Image upload area with drag-and-drop and preview
- Cancel and Save buttons

Dark mode support, mobile-first
```

---

#### **P1.8 - Sistema de Cotações**

**Página**: `/cotacoes`

**Layout Desktop**:
```
┌─────────────┬────────────────────────────────────┐
│             │  Header (Título + Nova Cotação)    │
│   Sidebar   ├────────────────────────────────────┤
│             │  Filtros (Search + Status + Date)  │
│             ├────────────────────────────────────┤
│             │  DataTable Cotações                │
│             │  ┌─ Nº Cotação                     │
│             │  ├─ Cliente                        │
│             │  ├─ Valor Total                    │
│             │  ├─ Status (Badge)                 │
│             │  ├─ Validade                       │
│             │  └─ Actions (Ver, PDF, Email)      │
└─────────────┴────────────────────────────────────┘
```

**Elementos**:
- [ ] Header:
  - [ ] Título: "Cotações"
  - [ ] Button: "+ Nova Cotação"
  - [ ] Badge: Total de cotações
- [ ] Filtros:
  - [ ] Search: Nº cotação ou cliente
  - [ ] Select: Status (Todas, Rascunho, Enviada, Aceita, Rejeitada, Expirada)
  - [ ] Date range: Data de criação
- [ ] DataTable:
  - [ ] Nº Cotação (QT-2025-001)
  - [ ] Cliente (nome + avatar)
  - [ ] Valor Total (com moeda)
  - [ ] Status (Badge colorido)
  - [ ] Válida até (data)
  - [ ] Actions:
    - [ ] Ver detalhes
    - [ ] Download PDF
    - [ ] Enviar por email
    - [ ] Converter em pedido (se aceita)
    - [ ] Duplicar
    - [ ] Excluir

**Modal: Criar Cotação (Multi-Step)**:

**Step 1 - Selecionar Cliente**:
- [ ] Select: Cliente (com busca e avatar)
- [ ] Button: "+ Novo Cliente" (abre modal de cliente)
- [ ] Preview: Dados do cliente selecionado

**Step 2 - Adicionar Produtos**:
- [ ] Search: Buscar produtos
- [ ] Product Cards (selecionáveis)
- [ ] Para cada produto selecionado:
  - [ ] Imagem + Nome
  - [ ] Input: Quantidade
  - [ ] Preço unitário (baseado na moeda)
  - [ ] Input: Desconto % (opcional)
  - [ ] Subtotal calculado
  - [ ] Button: Remover

**Step 3 - Cálculos e Finalização**:
- [ ] Summary Card:
  - [ ] Subtotal
  - [ ] Desconto total
  - [ ] Frete
  - [ ] ICMS (calculado)
  - [ ] **Total** (destaque)
- [ ] Select: Moeda (BRL/USD/EUR)
- [ ] Date picker: Válida até
- [ ] Textarea: Observações/Termos
- [ ] Checkbox: "Enviar por email automaticamente"

**Step Footer**:
- [ ] Button: "Voltar" (steps 2-3)
- [ ] Button: "Próximo" (steps 1-2)
- [ ] Button: "Salvar Rascunho"
- [ ] Button: "Gerar Cotação" (step 3)

**Prompt Superdesign**:
```
Design a modern B2B CRM quotation system with:

List Page:
- Header with "Cotações" title, "+ Nova Cotação" button, total count badge
- Filters: search, status select, date range
- Data table: Quote number, Client (avatar + name), Total value, Status badge, Valid until date, Actions (View, PDF, Email, Convert to Order, Duplicate, Delete)
- STAGETEK red accent (#e90101)

Create Quote Modal (Multi-Step Wizard):

Step 1 - Select Client:
- Client select with search and avatar
- "+ Novo Cliente" button
- Selected client data preview

Step 2 - Add Products:
- Product search
- Selectable product cards
- For each selected product: image, name, quantity input, unit price, discount % input, calculated subtotal, remove button

Step 3 - Calculations & Finalization:
- Summary card: Subtotal, Total discount, Shipping, ICMS (calculated), TOTAL (prominent)
- Currency selector (BRL/USD/EUR)
- Valid until date picker
- Notes/Terms textarea
- "Send by email automatically" checkbox

Step Footer:
- Back button (steps 2-3)
- Next button (steps 1-2)
- Save Draft button
- Generate Quote button (step 3)

Dark mode support, mobile-responsive
```

---

#### **P1.9 - Sistema de Pedidos (Tracking)**

**Página**: `/pedidos`

**Layout Desktop**:
```
┌─────────────┬────────────────────────────────────┐
│             │  Header (Título + Stats)           │
│   Sidebar   ├────────────────────────────────────┤
│             │  Filtros (Search + Status)         │
│             ├────────────────────────────────────┤
│             │  DataTable Pedidos                 │
│             │  ┌─ Nº Pedido                      │
│             │  ├─ Cliente                        │
│             │  ├─ Valor                          │
│             │  ├─ Status (Stepper mini)          │
│             │  ├─ Previsão Entrega               │
│             │  └─ Actions                        │
└─────────────┴────────────────────────────────────┘
```

**Elementos**:
- [ ] Header:
  - [ ] Título: "Pedidos"
  - [ ] 3 Stat Cards inline:
    - [ ] Em Produção (quantidade)
    - [ ] Despachados (quantidade)
    - [ ] Entregues no mês (quantidade)
- [ ] Filtros:
  - [ ] Search: Nº pedido ou cliente
  - [ ] Select: Status (Todos, Confirmado, Em Produção, Despachado, Entregue, Cancelado)
  - [ ] Date range: Previsão de entrega
- [ ] DataTable:
  - [ ] Nº Pedido (ORD-2025-001)
  - [ ] Cliente (nome + avatar)
  - [ ] Valor Total
  - [ ] Status (Stepper horizontal mini: Confirmado → Produção → Despachado → Entregue)
  - [ ] Previsão de Entrega (data)
  - [ ] Actions: Ver, Atualizar Status, Anexar NF, Rastrear

**Página de Detalhes do Pedido**: `/pedidos/:id`

**Layout**:
```
┌─────────────┬────────────────────────────────────┐
│             │  Breadcrumb (Pedidos > ORD-XXX)    │
│   Sidebar   ├────────────────────────────────────┤
│             │  Header (Nº + Cliente + Valor)     │
│             ├────────────────────────────────────┤
│             │  Stepper Grande (Status Visual)    │
│             │  [1]───[2]───[3]───[4]───[5]       │
│             ├────────────────────────────────────┤
│             │  2 Colunas:                        │
│             │  ┌────────────┬────────────┐       │
│             │  │ Itens      │ Timeline   │       │
│             │  │ Pedido     │ Atividades │       │
│             │  │            │            │       │
│             │  │ Docs/NFs   │ Rastreio   │       │
│             │  └────────────┴────────────┘       │
└─────────────┴────────────────────────────────────┘
```

**Elementos - Detalhes**:
- [ ] Stepper Grande (5 steps):
  1. Confirmado ✅
  2. Em Produção 🔄 (atual)
  3. Despachado ⏸️
  4. Entregue ⏸️
  5. Finalizado ⏸️
- [ ] **Coluna 1 - Itens e Documentos**:
  - [ ] Card: Itens do Pedido
    - [ ] Tabela: Produto, Quantidade, Valor Unit., Subtotal
    - [ ] Total do Pedido
  - [ ] Card: Documentos
    - [ ] Upload NF (PDF)
    - [ ] Comprovante de Envio
    - [ ] Código de Rastreio (link Correios)
- [ ] **Coluna 2 - Timeline e Rastreio**:
  - [ ] Timeline vertical:
    - [ ] Pedido confirmado (data/hora, usuário)
    - [ ] Produção iniciada (data/hora)
    - [ ] Status atualizado (data/hora, usuário, nota)
  - [ ] Card: Rastreamento
    - [ ] Input: Código de rastreio
    - [ ] Button: "Buscar status"
    - [ ] Timeline de rastreamento (se disponível)

**Prompt Superdesign**:
```
Design a modern B2B CRM order tracking system with:

List Page:
- Header with "Pedidos" title and 3 inline stat cards (In Production count, Dispatched count, Delivered this month count)
- Filters: search, status select, delivery date range
- Data table: Order number, Client (avatar + name), Total value, Status (horizontal mini stepper), Expected delivery date, Actions (View, Update Status, Attach Invoice, Track)
- STAGETEK red accent (#e90101)

Order Detail Page:
- Breadcrumb (Pedidos > ORD-XXX)
- Header with order number, client, total value
- Large visual stepper (5 steps): Confirmado, Em Produção (current), Despachado, Entregue, Finalizado
- 2-column layout:

Column 1 - Items & Documents:
- Order items card (table with Product, Quantity, Unit Price, Subtotal, Order Total)
- Documents card (Upload invoice PDF, Shipping proof, Tracking code with Correios link)

Column 2 - Timeline & Tracking:
- Vertical activity timeline (Order confirmed, Production started, Status updated with timestamp, user, notes)
- Tracking card (tracking code input, "Search status" button, tracking timeline if available)

Dark mode support, mobile-responsive (tabs instead of columns on mobile)
```

---

### **P2 - MÉDIA PRIORIDADE (Gestão Avançada)**

#### **P2.11 - Relatórios Gerenciais**

**Página**: `/relatorios`

**Layout Desktop**:
```
┌─────────────┬────────────────────────────────────┐
│             │  Header (Título + Período)         │
│   Sidebar   ├────────────────────────────────────┤
│             │  Tabs: Conversão | DRE | Vendas    │
│             ├────────────────────────────────────┤
│             │  [Tab Content - Charts + Tables]   │
│             │                                    │
│             │  Export Buttons (PDF, Excel)       │
└─────────────┴────────────────────────────────────┘
```

**Elementos**:
- [ ] Header:
  - [ ] Título: "Relatórios Gerenciais"
  - [ ] Date range picker: Período (padrão: último mês)
  - [ ] Button: "Agendar Envio" (email automático)
- [ ] **Tab 1 - Funil de Conversão**:
  - [ ] Funnel Chart (Recharts):
    - [ ] Lead (100%)
    - [ ] Contato (70%)
    - [ ] Proposta (40%)
    - [ ] Negociação (25%)
    - [ ] Fechamento (15%)
  - [ ] Metrics Cards:
    - [ ] Taxa de conversão geral
    - [ ] Taxa Lead → Contato
    - [ ] Taxa Proposta → Fechamento
    - [ ] Tempo médio por estágio
  - [ ] Table: Conversão por Vendedor
- [ ] **Tab 2 - DRE Simplificado**:
  - [ ] Summary Cards:
    - [ ] Receita Bruta
    - [ ] Custos (CPV - Custo Produto Vendido)
    - [ ] Margem Bruta
    - [ ] Despesas Operacionais
    - [ ] Lucro Líquido
  - [ ] Bar Chart: Receita vs Custos (mensal)
  - [ ] Table: DRE por Categoria de Produto
- [ ] **Tab 3 - Análise de Vendas**:
  - [ ] Line Chart: Receita ao longo do tempo
  - [ ] Pie Chart: Receita por Categoria (Som, Luz, Estrutura)
  - [ ] Bar Chart: Top 10 Produtos vendidos
  - [ ] Table: Vendas por Vendedor

**Prompt Superdesign**:
```
Design a modern B2B CRM reports dashboard with:

Header:
- "Relatórios Gerenciais" title
- Date range picker (default: last month)
- "Agendar Envio" button for automatic email reports

Tabs: Conversão, DRE, Vendas

Tab 1 - Sales Funnel:
- Funnel chart showing conversion from Lead (100%) to Closed (15%)
- 4 metric cards: Overall conversion rate, Lead→Contact rate, Proposal→Closed rate, Average time per stage
- Table: Conversion by salesperson

Tab 2 - Simplified Income Statement (DRE):
- 5 summary cards: Gross Revenue, COGS, Gross Margin, Operating Expenses, Net Profit
- Bar chart: Revenue vs Costs (monthly)
- Table: DRE by product category

Tab 3 - Sales Analysis:
- Line chart: Revenue over time
- Pie chart: Revenue by category (Som, Luz, Estrutura)
- Bar chart: Top 10 products sold
- Table: Sales by salesperson

Export buttons: PDF, Excel
STAGETEK red accent (#e90101)
Dark mode support, mobile-responsive
```

---

#### **P2.13 - Calendário de Eventos**

**Página**: `/eventos`

**Layout Desktop**:
```
┌─────────────┬────────────────────────────────────┐
│             │  Header (Título + Novo Evento)     │
│   Sidebar   ├────────────────────────────────────┤
│             │  View Toggle (Mês | Semana | Dia)  │
│             ├────────────────────────────────────┤
│             │  ┌─ D  S  T  Q  Q  S  S            │
│             │  │                                  │
│             │  │  Calendário Mensal               │
│             │  │  com eventos coloridos           │
│             │  │                                  │
│             │  └──────────────────────────────────┘
│             │  Sidebar: Próximos Eventos (lista) │
└─────────────┴────────────────────────────────────┘
```

**Elementos**:
- [ ] Header:
  - [ ] Título: "Calendário de Eventos"
  - [ ] Button: "+ Novo Evento"
  - [ ] Select: Filtrar por cliente
- [ ] View Toggle:
  - [ ] Mês (padrão)
  - [ ] Semana
  - [ ] Dia (timeline vertical)
- [ ] Calendário:
  - [ ] Eventos com cores por status:
    - [ ] Verde: Confirmado
    - [ ] Amarelo: Pendente
    - [ ] Vermelho: Cancelado
  - [ ] Hover: Preview do evento
  - [ ] Click: Abrir modal de detalhes
- [ ] Sidebar Direita: Próximos Eventos (lista)
  - [ ] Cards compactos com:
    - [ ] Data/hora
    - [ ] Cliente
    - [ ] Local
    - [ ] Status badge

**Modal: Criar/Editar Evento**:
- [ ] Input: Título do evento
- [ ] Select: Cliente (vinculado)
- [ ] Select: Oportunidade (opcional)
- [ ] Date/Time picker: Data/Hora início
- [ ] Date/Time picker: Data/Hora fim
- [ ] Input: Local
- [ ] Select: Status (Confirmado, Pendente, Cancelado)
- [ ] Multi-select: Equipamentos necessários
- [ ] Input: Valor total (opcional)
- [ ] Textarea: Observações
- [ ] Checkbox: "Sincronizar com Google Calendar"
- [ ] Footer:
  - [ ] Button: "Cancelar"
  - [ ] Button: "Salvar"

**Prompt Superdesign**:
```
Design a modern B2B CRM events calendar with:

Header:
- "Calendário de Eventos" title
- "+ Novo Evento" button
- Filter by client select

View toggle: Mês (default), Semana, Dia

Main Calendar:
- Month view with events color-coded by status: Green (Confirmed), Yellow (Pending), Red (Cancelled)
- Hover shows event preview
- Click opens event detail modal
- Drag-and-drop to reschedule

Right Sidebar: Upcoming Events (list)
- Compact event cards with date/time, client, location, status badge

Create/Edit Event Modal:
- Event title input
- Client select (linked)
- Opportunity select (optional)
- Start date/time picker
- End date/time picker
- Location input
- Status select (Confirmed, Pending, Cancelled)
- Equipment multi-select
- Total value input (optional)
- Notes textarea
- "Sync with Google Calendar" checkbox
- Cancel and Save buttons

STAGETEK red accent (#e90101)
Dark mode support, mobile-responsive (day view on mobile)
```

---

#### **P2.14 - Lead Scoring com IA**

**Página**: `/leads-quentes` (ou integrado no Dashboard)

**Layout Desktop (Dashboard Widget)**:
```
┌─────────────────────────────────────┐
│  🔥 Leads Mais Quentes (IA)         │
│  ┌─────────────────────────────┐   │
│  │ Score  Cliente  Temperatura │   │
│  │  95    João     🔥 Hot       │   │
│  │  82    Maria    🔥 Hot       │   │
│  │  68    Pedro    🌡️ Warm      │   │
│  │  55    Ana      🌡️ Warm      │   │
│  │  23    Ricardo  🧊 Cold      │   │
│  └─────────────────────────────┘   │
│  Ver todos os leads →               │
└─────────────────────────────────────┘
```

**Elementos**:
- [ ] Widget no Dashboard:
  - [ ] Título: "🔥 Leads Mais Quentes (IA)"
  - [ ] Subtitle: "Atualizado há 2 horas"
  - [ ] Top 5 Leads:
    - [ ] Score (0-100) grande
    - [ ] Cliente (nome + avatar)
    - [ ] Temperatura (🔥 Hot >70, 🌡️ Warm 40-70, 🧊 Cold <40)
    - [ ] Insights IA (tooltip):
      - [ ] "Lead inativo há 15 dias - enviar follow-up"
      - [ ] "Valor alto + histórico positivo"
      - [ ] "Cliente antigo retornou"
  - [ ] Link: "Ver todos os leads →"

**Página Completa**: `/leads-quentes`

**Layout**:
```
┌─────────────┬────────────────────────────────────┐
│             │  Header (Título + Filtros)         │
│   Sidebar   ├────────────────────────────────────┤
│             │  3 Tabs: Hot | Warm | Cold         │
│             ├────────────────────────────────────┤
│             │  Lead Cards (score + insights IA)  │
│             │  ┌────────────────────────────┐    │
│             │  │ Score: 95 🔥                │    │
│             │  │ Cliente: João Silva         │    │
│             │  │ Valor: R$ 45.000            │    │
│             │  │ IA: "Enviar proposta hoje"  │    │
│             │  │ [Ver Oportunidade] [Email]  │    │
│             │  └────────────────────────────┘    │
└─────────────┴────────────────────────────────────┘
```

**Elementos**:
- [ ] Tabs por Temperatura:
  - [ ] 🔥 Hot (score >70)
  - [ ] 🌡️ Warm (score 40-70)
  - [ ] 🧊 Cold (score <40)
- [ ] Lead Cards:
  - [ ] Score grande (0-100) com cor gradiente
  - [ ] Cliente (nome + avatar)
  - [ ] Oportunidade (título)
  - [ ] Valor
  - [ ] Data última interação
  - [ ] **Insights IA** (card destacado):
    - [ ] Texto gerado por Claude API
    - [ ] Ex: "Lead inativo há 15 dias. Recomendação: enviar follow-up com nova proposta"
  - [ ] Actions:
    - [ ] Ver Oportunidade
    - [ ] Enviar Email
    - [ ] Agendar Call
- [ ] Filtros:
  - [ ] Select: Vendedor
  - [ ] Range: Score mínimo
  - [ ] Date: Última interação

**Prompt Superdesign**:
```
Design a modern B2B CRM AI-powered lead scoring dashboard with:

Dashboard Widget:
- Title: "🔥 Leads Mais Quentes (IA)"
- Subtitle: "Atualizado há X horas"
- Top 5 leads list with: Score (0-100, large), Client (avatar + name), Temperature emoji (🔥 Hot >70, 🌡️ Warm 40-70, 🧊 Cold <40)
- Hover tooltip shows AI insights ("Lead inactive 15 days - send follow-up")
- "Ver todos os leads →" link

Full Page (/leads-quentes):
- Header with title and filters (salesperson, min score, last interaction date)
- 3 tabs: 🔥 Hot, 🌡️ Warm, 🧊 Cold
- Lead cards with:
  - Large score (0-100) with gradient color
  - Client (avatar + name)
  - Opportunity title
  - Value
  - Last interaction date
  - AI Insights card (highlighted) with Claude-generated text
  - Action buttons: View Opportunity, Send Email, Schedule Call

STAGETEK red accent (#e90101)
Dark mode support, mobile-responsive
```

---

## 📊 Resumo de Designs Necessários

### **Total de Telas: 11 principais**

| # | Tela | Prioridade | Componentes Principais | Tempo Estimado (Superdesign) |
|---|------|-----------|------------------------|-------------------------------|
| 1 | Login | P0 | Form, Button | 30 min |
| 2 | Dashboard | P0 | Stat Cards, Charts, DataTable | 2 horas |
| 3 | CRUD Clientes (List) | P0 | DataTable, Filters, Cards (mobile) | 1 hora |
| 4 | CRUD Clientes (Modal) | P0 | Form Multi-Step, CNPJ Autocomplete | 1 hora |
| 5 | Funil de Vendas (Kanban) | P0 | Kanban Columns, Drag-drop Cards | 2 horas |
| 6 | Detalhes Oportunidade | P0 | 3-Column Layout, Timeline | 1.5 horas |
| 7 | CRUD Produtos (Grid) | P1 | Product Grid, Filters, Modal | 1.5 horas |
| 8 | Sistema de Cotações (List) | P1 | DataTable, Filters | 1 hora |
| 9 | Sistema de Cotações (Modal) | P1 | Multi-Step Wizard, Product Selector | 2 horas |
| 10 | Sistema de Pedidos (List + Detail) | P1 | Stepper, Timeline, Tracking | 2 horas |
| 11 | Relatórios Gerenciais | P2 | Tabs, Charts, Tables, Export | 2 horas |
| 12 | Calendário de Eventos | P2 | Calendar View, Event Cards, Modal | 1.5 horas |
| 13 | Lead Scoring IA | P2 | Score Cards, AI Insights | 1 hora |

**Total Estimado**: ~19 horas de design (dividido em 3-4 sessões)

---

## ✅ Próximos Passos

### **Fase Design (Agora)**

1. **Instalar Superdesign no VS Code** (você)
2. **Configurar Anthropic API Key** (você)
3. **Criar designs em ordem de prioridade**:
   - [ ] P0.1: Login (30 min)
   - [ ] P0.2: Dashboard (2h)
   - [ ] P0.3: CRUD Clientes (2h)
   - [ ] P0.4: Funil Kanban (2h)
   - [ ] P0.5: Detalhes Oportunidade (1.5h)
   - [ ] P1: Produtos, Cotações, Pedidos (6.5h)
   - [ ] P2: Relatórios, Calendário, Lead Scoring (4.5h)

4. **Revisar designs com stakeholders** (você + owner)
5. **Ajustar designs conforme feedback**
6. **Exportar/documentar designs finais**

### **Fase Mapeamento (Depois dos Designs)**

7. **Criar NAVIGATION-MAP.md** (mapear fluxos entre telas)
8. **Criar DATABASE-SCHEMA.md** (baseado nos formulários dos designs)
9. **Validar schema com Protocol Notecraft™**

### **Fase Implementação (Depois do Mapeamento)**

10. **Setup projeto** (Vite + React + TypeScript)
11. **Configurar Supabase** (database + auth)
12. **Implementar telas seguindo designs exatos**

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**

**Próxima Etapa**: Instalar Superdesign e começar pelos designs P0 (Login + Dashboard)
