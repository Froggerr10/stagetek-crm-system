# Prompt: Dashboard - STAGETEK CRM

**Estilo**: Premium B2B com Glassmorphism + Data Visualization
**Inspiração**: RD Station + Linear + Notion
**Objetivo**: Dashboard executivo com métricas em destaque

---

## 🎨 Prompt para Superdesign

```
Design an ultra-premium B2B CRM dashboard for STAGETEK with data visualization and glassmorphism:

=== LAYOUT STRUCTURE ===

Desktop Layout (1024px+):
┌─────────────┬────────────────────────────────────┐
│             │  Top Bar (height: 64px)            │
│   Sidebar   ├────────────────────────────────────┤
│   (256px)   │  Main Content Area                 │
│             │  - Breadcrumb                      │
│             │  - 4 Stat Cards (grid)             │
│             │  - 2 Chart Cards (grid)            │
│             │  - Recent Opportunities Table      │
└─────────────┴────────────────────────────────────┘

Mobile Layout (<768px):
┌────────────────────────────┐
│  Top Bar (hamburger menu)  │
├────────────────────────────┤
│  Main Content              │
│  - Stats (vertical)        │
│  - Charts (vertical)       │
│  - Recent Opps (cards)     │
└────────────────────────────┘
│  Bottom Nav (5 icons)      │
└────────────────────────────┘

Background:
- Same as login page:
  * Base: radial-gradient(circle at top left, #1a0404, #0a0a0a)
  * Overlay: radial gradients with STAGETEK red glow (20% opacity)
  * Pattern: Subtle dot grid (1px dots, 40px spacing, rgba(233,1,1,0.03))

=== SIDEBAR (Desktop) ===

Container:
- Width: 256px
- Height: 100vh
- Position: fixed left
- Background: rgba(255,255,255,0.05)
- Backdrop-filter: blur(16px) saturate(150%)
- Border-right: 1px solid rgba(255,255,255,0.08)
- Z-index: 100

Logo Section (top):
- Padding: 24px
- Logo text: "STAGETEK"
  * Font: Inter, 700 weight, 24px
  * Color: white
  * Text-shadow: 0 0 12px rgba(233,1,1,0.3)
- Border-bottom: 1px solid rgba(255,255,255,0.06)

Navigation Menu:
- Padding: 16px 12px
- Gap between items: 4px

Nav Item (default state):
- Height: 44px
- Padding: 0 16px
- Border-radius: 8px
- Display: flex, align-items center, gap 12px
- Icon: Lucide React, 20px, rgba(255,255,255,0.6)
- Text: Inter, 500 weight, 14px, rgba(255,255,255,0.7)
- Transition: all 0.2s ease
- Cursor: pointer

Nav Item (hover):
- Background: rgba(255,255,255,0.05)
- Icon color: rgba(255,255,255,0.9)
- Text color: rgba(255,255,255,0.9)

Nav Item (active):
- Background: linear-gradient(135deg, #e90101 0%, #c10101 100%)
- Icon color: white
- Text color: white
- Box-shadow: 0 4px 12px rgba(233,1,1,0.3)

Menu Items (in order):
1. Dashboard (home icon) - ACTIVE
2. Clientes (users icon)
3. Funil de Vendas (target icon)
4. Produtos (package icon)
5. Relatórios (bar-chart icon)
6. Configurações (settings icon)

User Section (bottom):
- Position: absolute bottom 0
- Width: 100%
- Padding: 16px
- Border-top: 1px solid rgba(255,255,255,0.06)
- Display: flex, align-items center, gap 12px
- Avatar:
  * Size: 40px
  * Border-radius: 50%
  * Background: linear-gradient(135deg, #e90101 0%, #c10101 100%)
  * Text: "MB" (initials, white, 500 weight, 14px)
  * Display: flex, center aligned
- User info:
  * Name: "Mario Becker" (white, 500 weight, 14px)
  * Role: "Conta DEMO PRO" (rgba(255,255,255,0.5), 400 weight, 12px)
- Dropdown icon: chevron-down, 16px, rgba(255,255,255,0.5)

=== TOP BAR ===

Container:
- Height: 64px
- Width: calc(100% - 256px) on desktop, 100% on mobile
- Margin-left: 256px on desktop, 0 on mobile
- Position: fixed top
- Background: rgba(255,255,255,0.03)
- Backdrop-filter: blur(16px)
- Border-bottom: 1px solid rgba(255,255,255,0.06)
- Z-index: 90
- Display: flex, align-items center, justify-content space-between
- Padding: 0 24px

Left Section:
- Hamburger menu icon (mobile only):
  * Size: 24px
  * Color: white
  * Cursor: pointer
  * Display: none on desktop

Search Input:
- Width: 400px (desktop), 100% (mobile)
- Height: 40px
- Background: rgba(255,255,255,0.05)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 10px
- Padding: 0 16px 0 40px
- Color: white
- Font: Inter, 400 weight, 14px
- Placeholder: "Buscar clientes, oportunidades..."
- Icon: search (lucide), 18px, rgba(255,255,255,0.4), position absolute left 12px
- Focus state:
  * Border: 1px solid rgba(233,1,1,0.5)
  * Box-shadow: 0 0 0 3px rgba(233,1,1,0.1)
  * Background: rgba(255,255,255,0.08)

Right Section:
- Display: flex, align-items center, gap 16px

Dark Mode Toggle:
- Width: 40px
- Height: 40px
- Background: rgba(255,255,255,0.05)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 10px
- Display: flex, center aligned
- Icon: sun/moon (lucide), 18px, rgba(255,255,255,0.6)
- Hover: background rgba(255,255,255,0.1)
- Transition: all 0.2s

Notifications Bell:
- Width: 40px
- Height: 40px
- Same styling as dark mode toggle
- Icon: bell (lucide), 18px
- Badge (top-right corner):
  * Size: 18px circle
  * Background: #e90101
  * Text: "3" (white, 11px, 600 weight)
  * Position: absolute top -4px, right -4px
  * Border: 2px solid #0a0a0a
  * Box-shadow: 0 2px 8px rgba(233,1,1,0.4)

Avatar Dropdown:
- Same as sidebar user section
- Avatar 36px (slightly smaller)
- Click opens dropdown menu

=== MAIN CONTENT AREA ===

Container:
- Margin-left: 256px (desktop), 0 (mobile)
- Margin-top: 64px (top bar height)
- Padding: 32px 24px
- Min-height: calc(100vh - 64px)
- Background: transparent

Breadcrumb:
- Margin-bottom: 24px
- Display: flex, align-items center, gap 8px
- Text: "Dashboard" (white, 500 weight, 14px)
- Icon: home (lucide), 16px, rgba(255,255,255,0.5)

=== STAT CARDS (4 cards) ===

Grid Container:
- Display: grid
- Grid-template-columns: repeat(4, 1fr) on desktop
- Grid-template-columns: repeat(2, 1fr) on tablet
- Grid-template-columns: 1fr on mobile
- Gap: 20px
- Margin-bottom: 32px

Stat Card:
- Background: rgba(255,255,255,0.05)
- Backdrop-filter: blur(12px) saturate(150%)
- Border: 1px solid rgba(255,255,255,0.1)
- Border-radius: 16px
- Padding: 24px
- Transition: all 0.3s ease
- Hover:
  * Transform: translateY(-4px)
  * Box-shadow: 0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.15)
  * Border-color: rgba(255,255,255,0.2)

Card Structure:
1. Icon Container (top):
   - Size: 48px circle
   - Background: rgba(233,1,1,0.1)
   - Border: 1px solid rgba(233,1,1,0.2)
   - Display: flex, center aligned
   - Icon: lucide, 24px, #e90101
   - Margin-bottom: 16px

2. Value (main metric):
   - Font: Inter, 700 weight, 32px
   - Color: white
   - Line-height: 1.2
   - Margin-bottom: 4px

3. Label:
   - Font: Inter, 500 weight, 14px
   - Color: rgba(255,255,255,0.6)
   - Margin-bottom: 12px

4. Change Indicator:
   - Display: flex, align-items center, gap 4px
   - Icon: trend-up or trend-down (lucide), 16px
   - Text: "+15%" or "-2%"
   - Font: Inter, 500 weight, 13px
   - Color: #22c55e (green) or #ef4444 (red)
   - Background: rgba(34,197,94,0.1) or rgba(239,68,68,0.1)
   - Padding: 4px 8px
   - Border-radius: 6px
   - Width: fit-content

4 Stat Cards Data:
1. "Total Vendas"
   - Icon: dollar-sign
   - Value: "R$ 245.000"
   - Change: "+15%" (green, trend-up)

2. "Oportunidades Abertas"
   - Icon: target
   - Value: "27"
   - Change: "+3" (green, trend-up)

3. "Taxa de Conversão"
   - Icon: percent
   - Value: "32%"
   - Change: "+5%" (green, trend-up)

4. "Ticket Médio"
   - Icon: credit-card
   - Value: "R$ 12.500"
   - Change: "-2%" (red, trend-down)

=== CHART CARDS (2 cards) ===

Grid Container:
- Display: grid
- Grid-template-columns: repeat(2, 1fr) on desktop
- Grid-template-columns: 1fr on mobile
- Gap: 20px
- Margin-bottom: 32px

Chart Card:
- Background: rgba(255,255,255,0.05)
- Backdrop-filter: blur(12px) saturate(150%)
- Border: 1px solid rgba(255,255,255,0.1)
- Border-radius: 16px
- Padding: 24px
- Min-height: 320px

Card Header:
- Display: flex, justify-between, align-items center
- Margin-bottom: 20px
- Title:
  * Font: Inter, 600 weight, 16px
  * Color: white
- Dropdown (period selector):
  * Display: flex, align-items center, gap 6px
  * Padding: 6px 12px
  * Background: rgba(255,255,255,0.05)
  * Border: 1px solid rgba(255,255,255,0.1)
  * Border-radius: 8px
  * Text: "30 dias" (Inter, 500 weight, 13px, rgba(255,255,255,0.7))
  * Icon: chevron-down, 14px

Chart Area:
- Width: 100%
- Height: 240px
- Background: rgba(255,255,255,0.02)
- Border-radius: 12px
- Display: flex, center aligned
- Placeholder text: "Chart: [Name]" (rgba(255,255,255,0.3), 14px)
- Later: Recharts integration

2 Chart Cards:
1. "Vendas ao Longo do Tempo"
   - Type: Line Chart
   - Placeholder: "Chart: Vendas Mensal"

2. "Oportunidades por Estágio"
   - Type: Pie/Donut Chart
   - Placeholder: "Chart: Funil Conversão"

=== RECENT OPPORTUNITIES TABLE ===

Container:
- Background: rgba(255,255,255,0.05)
- Backdrop-filter: blur(12px) saturate(150%)
- Border: 1px solid rgba(255,255,255,0.1)
- Border-radius: 16px
- Padding: 24px
- Margin-bottom: 32px

Header:
- Display: flex, justify-between, align-items center
- Margin-bottom: 20px
- Title: "Oportunidades Recentes" (Inter, 600 weight, 16px, white)
- Link: "Ver todas →" (Inter, 500 weight, 14px, #e90101, hover underline)

Table (Desktop):
- Width: 100%
- Border-collapse: separate
- Border-spacing: 0 8px

Table Header:
- Font: Inter, 500 weight, 12px, rgba(255,255,255,0.5)
- Text-transform: uppercase
- Letter-spacing: 0.5px
- Padding: 0 16px 12px
- Border-bottom: 1px solid rgba(255,255,255,0.06)

Columns:
1. Cliente (width: 30%)
2. Valor (width: 20%)
3. Estágio (width: 25%)
4. Data (width: 15%)
5. Ações (width: 10%)

Table Row:
- Background: rgba(255,255,255,0.03)
- Border-radius: 10px
- Transition: all 0.2s
- Hover:
  * Background: rgba(255,255,255,0.06)
  * Transform: scale(1.01)

Table Cell:
- Padding: 16px
- Font: Inter, 400 weight, 14px, rgba(255,255,255,0.8)
- First cell: border-radius 10px 0 0 10px
- Last cell: border-radius 0 10px 10px 0

Cliente Cell:
- Display: flex, align-items center, gap 12px
- Avatar:
  * Size: 32px circle
  * Background: rgba(233,1,1,0.2)
  * Text: Initials (white, 500 weight, 12px)
- Name: White, 500 weight

Valor Cell:
- Font: Inter, 600 weight, 15px
- Color: white

Estágio Cell:
- Badge:
  * Padding: 6px 12px
  * Border-radius: 8px
  * Font: Inter, 500 weight, 12px
  * Colors based on stage:
    - Lead: rgba(107,114,128,0.2), text gray-300
    - Contato: rgba(59,130,246,0.2), text blue-300
    - Proposta: rgba(168,85,247,0.2), text purple-300
    - Negociação: rgba(251,146,60,0.2), text orange-300
    - Fechamento: rgba(34,197,94,0.2), text green-300

Data Cell:
- Font: Inter, 400 weight, 13px
- Color: rgba(255,255,255,0.6)

Ações Cell:
- Button (3 dots - more-vertical icon):
  * Size: 32px
  * Background: rgba(255,255,255,0.05)
  * Border-radius: 6px
  * Hover: background rgba(255,255,255,0.1)
  * Icon: 16px, rgba(255,255,255,0.6)

5 Sample Rows:
1. João Silva - R$ 45.000 - Negociação - Hoje
2. Maria Costa - R$ 12.500 - Proposta - Ontem
3. Pedro Santos - R$ 8.200 - Contato - 2 dias atrás
4. Ana Oliveira - R$ 28.700 - Fechamento - 3 dias atrás
5. Carlos Lima - R$ 15.900 - Lead - 1 semana atrás

Mobile View (Cards):
- Replace table with vertical cards
- Each card shows: avatar, name, value, stage badge, date
- Action button at bottom

=== BOTTOM NAVIGATION (Mobile Only) ===

Container:
- Display: none on desktop
- Display: flex on mobile (<768px)
- Position: fixed bottom 0
- Width: 100%
- Height: 64px
- Background: rgba(255,255,255,0.05)
- Backdrop-filter: blur(16px)
- Border-top: 1px solid rgba(255,255,255,0.08)
- Z-index: 100
- Padding: 0 16px

Nav Items:
- Display: grid, 5 columns, equal width
- Gap: 8px

Nav Item:
- Display: flex, flex-column, center aligned
- Gap: 4px
- Padding: 8px
- Border-radius: 8px
- Transition: all 0.2s
- Icon: lucide, 22px, rgba(255,255,255,0.5)
- Label: Inter, 500 weight, 11px, rgba(255,255,255,0.5)

Nav Item (active):
- Background: rgba(233,1,1,0.15)
- Icon color: #e90101
- Label color: #e90101

5 Items:
1. Home (home icon) - ACTIVE
2. Clientes (users icon)
3. Funil (target icon)
4. Produtos (package icon)
5. Perfil (user icon)

=== ANIMATIONS ===

Page Load:
- Fade in + slide up (stagger children)
- Duration: 0.6s cubic-bezier(0.4, 0, 0.2, 1)
- Stat cards: stagger delay 0.1s each
- Charts: stagger delay 0.2s each
- Table: stagger delay 0.3s

Stat Card Hover:
- Lift effect (translateY -4px)
- Shadow increase
- Duration: 0.3s

Table Row Hover:
- Background lighten
- Slight scale (1.01)
- Duration: 0.2s

=== RESPONSIVE BREAKPOINTS ===

Desktop (1024px+):
- Sidebar visible
- Top bar with search
- 4-column stat grid
- 2-column chart grid
- Table view

Tablet (768px - 1023px):
- Sidebar visible
- 2-column stat grid
- 2-column chart grid
- Table view (slightly compressed)

Mobile (<768px):
- Sidebar hidden (hamburger)
- 1-column stat grid
- 1-column chart grid
- Card view (not table)
- Bottom navigation

=== ACCESSIBILITY ===

- All interactive elements: focus-visible ring
- ARIA labels on icon-only buttons
- Semantic HTML (nav, main, section)
- Keyboard navigation support
- Screen reader friendly

=== TECH STACK ===

- HTML5 + CSS3
- Lucide icons (CDN)
- Inter font (Google Fonts)
- CSS Variables (premium_theme.css)
- No frameworks (static prototype)
- Later: React + Recharts

=== QUALITY STANDARDS ===

- Pixel-perfect 8px grid
- Smooth 60fps animations
- Multi-layer shadows
- Glassmorphism effects
- WCAG AAA contrast
- Premium B2B aesthetic

Output:
Single HTML file with inline CSS.
Professional, data-rich, executive dashboard.
Mobile-first, fully responsive.
```

---

## 📋 Checklist Pós-Geração

- [ ] Sidebar com 6 items de navegação
- [ ] Top bar com search funcional
- [ ] 4 stat cards com ícones e indicadores
- [ ] 2 chart cards com placeholders
- [ ] Tabela de oportunidades (5 rows)
- [ ] Bottom nav mobile (5 items)
- [ ] Responsivo (desktop, tablet, mobile)
- [ ] Glassmorphism em todos os cards
- [ ] Hover effects suaves
- [ ] Dark theme completo

---

## 🎨 Referências

- RD Station Dashboard (análise completa)
- Linear app (sidebar + aesthetics)
- Notion (glassmorphism cards)
- Stripe dashboard (data visualization)

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
