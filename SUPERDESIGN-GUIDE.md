# Superdesign - Guia de Uso para STAGETEK CRM

**Data**: 1 de Outubro de 2025
**Objetivo**: Criar todos os designs das telas do CRM usando Superdesign + Anthropic Claude API

---

## 🎨 O que é Superdesign?

Extensão para VS Code/Cursor que gera designs de UI usando IA (Claude API).

**Instalação**: ✅ Já instalado!

---

## 🚀 Como Usar

### **Passo 1: Abrir Command Palette**

```
Windows/Linux: Ctrl+Shift+P
Mac: Cmd+Shift+P
```

### **Passo 2: Digitar**

```
Superdesign: Design a UI
```

Ou simplesmente:

```
Design
```

### **Passo 3: Escrever o Prompt**

Cole um dos prompts abaixo (ver seção "Prompts Prontos").

### **Passo 4: Revisar e Salvar**

Superdesign gerará o código React + Tailwind.

**Ações**:
- ✅ **Aceitar**: Salva o código no projeto
- ✏️ **Editar**: Ajustar o prompt e regenerar
- ❌ **Rejeitar**: Cancelar

---

## 📋 Prompts Prontos para STAGETEK CRM

### **1. Login Page (com Google OAuth)**

**Arquivo esperado**: `src/pages/Login.tsx`

**Prompt**:
```
Design a modern B2B CRM login page for STAGETEK with:

Layout:
- Centered card (max-width: 400px)
- White background card with subtle shadow
- Logo at top (STAGETEK text, 32px height, red #e90101)
- Tagline: "Sistema de Gestão Comercial" (gray, 14px)

Authentication:
- Button: "Continuar com Google" (full width, white bg, border, Google icon)
- Divider: "OU" (centered with lines)
- Email input (icon, placeholder: "seu@email.com")
- Password input (icon, show/hide toggle, placeholder: "Sua senha")
- Checkbox: "Lembrar de mim" (left) + Link: "Esqueceu a senha?" (right, red)
- Button: "Entrar" (full width, primary red #e90101, white text)

Footer:
- Text: "Não tem conta? Solicite acesso" (link underline red)
- Built with Protocol Notecraft™ (gray, small, centered)

Design:
- STAGETEK red (#e90101) as primary color
- Clean, minimal, professional B2B aesthetic
- Tailwind CSS classes only
- Dark mode support (bg-white dark:bg-gray-900)
- Mobile-first responsive
- Focus states on inputs
- Hover states on buttons

Tech Stack:
- React + TypeScript
- Tailwind CSS 3.4
- shadcn/ui Button and Input components
- Lucide React icons (Mail, Lock, Eye, EyeOff)
- Google OAuth via Supabase Auth

No custom CSS, only Tailwind classes.
```

---

### **2. Dashboard (Main)**

**Arquivo esperado**: `src/pages/Dashboard.tsx`

**Prompt**:
```
Design a modern B2B CRM dashboard for STAGETEK with:

Layout (Desktop):
- Fixed sidebar (256px width, white bg, border-right)
- Top bar (search, dark mode toggle, avatar dropdown)
- Main content area (gray-50 bg)

Sidebar:
- Logo STAGETEK (32px, red #e90101) + text
- Navigation menu:
  * Dashboard (active, red bg, white text)
  * Clientes
  * Funil de Vendas
  * Produtos
  * Relatórios
  * Configurações
- User section at bottom (avatar, name, role, dropdown)

Top Bar:
- Search input (icon, placeholder: "Buscar clientes, oportunidades...")
- Dark mode toggle (sun/moon icon)
- Notifications bell (badge with count)
- Avatar dropdown (MB, "Mario Becker", "Conta DEMO PRO")

Main Content:
- Breadcrumb: "Dashboard"
- Grid 4 columns (responsive: 1 col mobile, 2 tablet, 4 desktop)
  * Stat Card 1: "Total Vendas" (R$ 245.000) (+15% verde)
  * Stat Card 2: "Oportunidades Abertas" (27) (+3 desde ontem)
  * Stat Card 3: "Taxa de Conversão" (32%) (+5% verde)
  * Stat Card 4: "Ticket Médio" (R$ 12.500) (-2% vermelho)
- Grid 2 columns charts:
  * Chart Card 1: "Vendas ao Longo do Tempo" (line chart placeholder)
  * Chart Card 2: "Oportunidades por Estágio" (pie chart placeholder)
- Data Table: "Oportunidades Recentes" (5 rows)
  * Columns: Cliente (avatar+name), Valor, Estágio (badge), Data, Ações
  * Pagination: 1-5 of 27

Mobile Layout:
- Hidden sidebar (hamburger menu)
- Stat cards vertical stack
- Charts vertical stack
- Recent opportunities as cards (not table)
- Bottom navigation bar (5 icons: Home, Clientes, Funil, Produtos, Perfil)

Design:
- STAGETEK red (#e90101) as primary/accent
- Clean, data-dense, professional
- Tailwind CSS only
- Dark mode support
- Mobile-first responsive
- Hover/focus states
- Icons from Lucide React

Tech Stack:
- React + TypeScript
- Tailwind CSS 3.4
- shadcn/ui components (Card, Button, Badge, Avatar, Table)
- Recharts (charts placeholders)
- Lucide React icons

No charts implementation yet (just placeholders with gray bg + text "Chart").
No custom CSS, only Tailwind.
```

---

### **3. Funil de Vendas (Kanban)**

**Arquivo esperado**: `src/pages/FunilVendas.tsx`

**Prompt**:
```
Design a modern B2B CRM sales funnel (Kanban board) for STAGETEK with:

Layout (Desktop):
- Same sidebar + top bar as Dashboard
- Main content: Kanban board horizontal scroll

Header:
- Breadcrumb: "Funil de Vendas"
- Filters row:
  * Dropdown: "Funil PADRÃO | Não Alterar"
  * Dropdown: "Minhas oportunidades"
  * Dropdown: "Em andamento"
  * Button: "⟳ Recarregar"
  * Button: "Filtro ativo" (outline)

Kanban Board:
- 5 columns (horizontal, scrollable):
  1. Sem contato / Lead
  2. Contato Feito
  3. Visita / Apresentação
  4. Proposta Enviada
  5. Fechamento

Column Header:
- Title (semibold, 14px)
- Badge: count (e.g., "3 oportunidades")
- Total value (e.g., "R$ 17.900,00")
- Dropdown icon (add new card, edit stage)

Opportunity Card (molecule):
- Avatar icon (orange circle with person icon)
- Title (link, blue on hover): e.g., "Pedido Setembro"
- Origin (gray, small): e.g., "RD Station CRM"
- Values row:
  * Blue dot + value: R$ 1,00
  * Gray dot + value: R$ 0,00
- Star rating (5 stars, 1-5 filled)
- Action icons row:
  * Phone icon (red if urgent)
  * Clock icon (gray)
- Hover state: slight shadow elevation

Drag-and-Drop:
- Cards have drag handle (6 dots icon, visible on hover)
- Column has dropzone highlight on drag over
- Mobile: swipe cards between columns

Empty State:
- Icon + text: "Nenhuma oportunidade neste estágio"
- Button: "Criar primeira oportunidade"

FAB (mobile):
- Blue circle button with "+" icon (bottom-right)
- Creates new opportunity

Design:
- STAGETEK red (#e90101) for primary actions
- Column bg: gray-100 (dark: gray-800)
- Card bg: white (dark: gray-900)
- Subtle shadows on cards
- Tailwind CSS only
- Dark mode support
- Mobile: horizontal scroll or tabs per column
- Touch-friendly (cards min-height: 120px)

Tech Stack:
- React + TypeScript
- Tailwind CSS 3.4
- @dnd-kit/core (drag-and-drop, mention in comments)
- shadcn/ui (Card, Badge, Button, Avatar)
- Lucide React icons

No drag-and-drop logic yet (static cards).
No custom CSS, only Tailwind.
```

---

### **4. CRUD Clientes (List)**

**Arquivo esperado**: `src/pages/Clientes.tsx`

**Prompt**:
```
Design a modern B2B CRM clients list page for STAGETEK with:

Layout:
- Same sidebar + top bar as Dashboard

Header:
- Breadcrumb: "Clientes"
- Button: "+ Novo Cliente" (primary red, right-aligned)
- Badge: "127 clientes" (gray, next to title)

Filters Row:
- Search input (icon, placeholder: "Buscar por nome ou CNPJ...")
- Select: "Status" (Todos, Ativo, Inativo, Pendente)
- Date range picker: "Data de cadastro" (from - to)
- Button: "Limpar filtros" (outline, gray)

Data Table (Desktop):
- Columns:
  * Avatar + Nome (left-aligned, sortable)
  * CNPJ (monospace font: 00.000.000/0000-00)
  * Email
  * Telefone (mask: (00) 00000-0000)
  * Status (Badge: green "Ativo", yellow "Pendente", gray "Inativo")
  * Ações (Dropdown: Ver, Editar, Desativar)
- Rows: 10 per page
- Hover: row bg-gray-50
- Pagination: "Mostrando 1-10 de 127" + prev/next buttons

Cards (Mobile):
- Client card (vertical):
  * Avatar (large, left) + Name (semibold)
  * CNPJ below name (gray, small)
  * Status badge (top-right)
  * Buttons row: [Ver] [Editar] (outline)
- Vertical stack with gap
- Filter icon (top-right) opens bottom sheet with filters

FAB (Mobile):
- Red circle "+" button
- Opens "Criar Cliente" modal

Empty State:
- Icon + text: "Nenhum cliente encontrado"
- Button: "Criar primeiro cliente"

Design:
- STAGETEK red (#e90101) for actions
- Table alternating rows (stripe)
- Tailwind CSS only
- Dark mode support
- Mobile-first responsive
- Touch-friendly buttons (min-height: 44px)

Tech Stack:
- React + TypeScript
- Tailwind CSS 3.4
- shadcn/ui (Table, Badge, Button, Avatar, Select, DatePicker)
- Lucide React icons
- TanStack Table (mention in comments)

No real data yet (use mock array).
No modals yet (separate prompt).
No custom CSS, only Tailwind.
```

---

## 📐 Padrões Obrigatórios

### **SEMPRE incluir no prompt**:

1. **Design Tokens STAGETEK**:
   ```
   - Primary color: #e90101 (STAGETEK red)
   - Font: Inter, -apple-system, sans-serif
   - Spacing: Tailwind default scale (4px base)
   - Border radius: rounded-md (6px)
   ```

2. **Dark Mode**:
   ```
   - bg-white dark:bg-gray-900
   - text-gray-900 dark:text-gray-100
   - border-gray-200 dark:border-gray-700
   ```

3. **Mobile-First**:
   ```
   - Base: mobile layout
   - md: tablet (768px+)
   - lg: desktop (1024px+)
   ```

4. **Tech Stack**:
   ```
   - React + TypeScript
   - Tailwind CSS 3.4 (NO custom CSS)
   - shadcn/ui components
   - Lucide React icons
   ```

5. **Accessibility**:
   ```
   - Focus states (ring-2 ring-stagetek-red)
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   ```

---

## ✅ Checklist Pós-Geração

Após Superdesign gerar o código:

- [ ] Verificar se usa apenas Tailwind (sem CSS inline)
- [ ] Verificar dark mode (todas as cores têm variante dark:)
- [ ] Verificar responsividade (mobile, tablet, desktop)
- [ ] Verificar se cor primária é `#e90101`
- [ ] Verificar se ícones são Lucide React
- [ ] Verificar TypeScript (todos os props tipados)
- [ ] Ajustar se exceder limites Protocol Notecraft™:
  - [ ] Atoms: ≤20 linhas
  - [ ] Molecules: ≤35 linhas
  - [ ] Organisms: ≤50 linhas
  - [ ] Pages: quebrar em componentes se >100 linhas

---

## 🎯 Ordem de Criação Recomendada

### **Fase 1: P0 - MVP (4-6 semanas)**

1. ✅ Login Page (com Google OAuth)
2. ✅ Dashboard
3. ✅ Funil de Vendas (Kanban)
4. ✅ CRUD Clientes (List)
5. Modal: Criar/Editar Cliente
6. Detalhes da Oportunidade

### **Fase 2: P1 - CRM Funcional (+8 semanas)**

7. CRUD Produtos (Grid)
8. Sistema de Cotações (List + Modal)
9. Sistema de Pedidos (List + Detail)

### **Fase 3: P2 - Gestão Avançada (+4 semanas)**

10. Relatórios Gerenciais
11. Calendário de Eventos
12. Lead Scoring (widget)

---

## 💡 Dicas

### **Prompt muito longo?**

Superdesign aceita prompts longos, mas você pode dividir:

**Prompt 1**: Criar componente base (ex: KanbanColumn)
**Prompt 2**: Criar página completa usando componente

### **Resultado não ideal?**

- Ajustar prompt (ser mais específico)
- Regenerar (Superdesign tem retry)
- Editar manualmente depois

### **Integração com shadcn/ui**

Superdesign usa componentes shadcn automaticamente se mencionado no prompt.

Exemplo:
```
Use shadcn/ui Button component for all buttons
Use shadcn/ui Input component for form fields
```

---

## 🚀 Começar Agora!

**Próximo Passo**: Criar **Login Page**

1. Abrir VS Code
2. Command Palette (Ctrl+Shift+P)
3. "Superdesign: Design a UI"
4. Colar o **Prompt #1: Login Page** (acima)
5. Aguardar geração
6. Revisar e aceitar
7. Salvar em `src/pages/Login.tsx`

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
