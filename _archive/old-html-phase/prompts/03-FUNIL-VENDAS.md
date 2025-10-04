# Prompt: Funil de Vendas (Kanban Board) - STAGETEK CRM

**Estilo**: Premium B2B Kanban Board com Drag-and-Drop
**Inspiração**: RD Station CRM + Trello + Linear
**Objetivo**: Pipeline visual de oportunidades com gestão drag-and-drop

---

## 🎨 Prompt para Implementação Manual

```
Design an ultra-premium B2B Kanban Board for STAGETEK sales funnel with drag-and-drop:

=== LAYOUT STRUCTURE ===

Desktop Layout (1024px+):
┌─────────────┬────────────────────────────────────┐
│   Sidebar   │  Top Bar (height: 64px)            │
│   (256px)   ├────────────────────────────────────┤
│   (reuse)   │  Main Content Area                 │
│             │  - Header: Title + Filters + Add   │
│             │  - Kanban Board (5 columns)        │
│             │    * Lead (cinza)                  │
│             │    * Contato (azul)                │
│             │    * Proposta (roxo)               │
│             │    * Negociação (laranja)          │
│             │    * Fechamento (verde)            │
└─────────────┴────────────────────────────────────┘

Mobile Layout (<768px):
┌────────────────────────────┐
│  Top Bar (hamburger menu)  │
├────────────────────────────┤
│  Kanban Horizontal Scroll  │
│  - Swipe left/right        │
│  - Cards stacked vertical  │
└────────────────────────────┘
│  Bottom Nav (5 icons)      │
└────────────────────────────┘

Background:
- Same as Dashboard:
  * Base: radial-gradient(circle at top left, #1a0404, #0a0a0a)
  * Overlay: radial gradients with STAGETEK red glow (20% opacity)
  * Pattern: Subtle dot grid (1px dots, 40px spacing, rgba(233,1,1,0.03))

=== HEADER SECTION ===

Container:
- Padding: 24px
- Border-bottom: 1px solid rgba(255,255,255,0.08)
- Display: flex
- Justify: space-between
- Align: center

Left Section:
- Title: "Funil de Vendas"
  * Font: Inter, 700 weight, 24px
  * Color: white
- Subtitle: "Arraste para mover entre estágios"
  * Font: Inter, 400 weight, 14px
  * Color: rgba(255,255,255,0.5)

Right Section (Filters + Actions):
- Filter dropdown (Status):
  * Width: 140px
  * Height: 40px
  * Background: rgba(255,255,255,0.06)
  * Border: 1px solid rgba(255,255,255,0.08)
  * Border-radius: 8px
  * Icon: filter (Lucide)
  * Text: "Todos" + dropdown chevron

- Sort dropdown (Ordenar):
  * Same style as Filter
  * Icon: arrow-up-down
  * Text: "Mais recentes"

- Add Opportunity button:
  * Width: auto
  * Height: 40px
  * Padding: 0 20px
  * Background: linear-gradient(135deg, #e90101 0%, #c10101 100%)
  * Border-radius: 8px
  * Color: white
  * Font-weight: 600
  * Icon: plus (Lucide)
  * Text: "Nova Oportunidade"
  * Hover: lift 2px + glow shadow

=== KANBAN BOARD ===

Container:
- Display: flex
- Gap: 16px
- Padding: 24px
- Overflow-x: auto (horizontal scroll)
- Min-height: calc(100vh - 200px)

Column Structure (5 columns):
1. **Lead** (gray)
2. **Contato** (blue)
3. **Proposta** (purple)
4. **Negociação** (orange)
5. **Fechamento** (green)

Each Column:
- Width: 340px
- Min-width: 340px (prevent shrink)
- Background: rgba(255,255,255,0.03)
- Border: 1px solid rgba(255,255,255,0.06)
- Border-radius: 12px
- Padding: 16px
- Display: flex
- Flex-direction: column
- Gap: 12px

Column Header:
- Display: flex
- Justify: space-between
- Align: center
- Margin-bottom: 12px
- Padding-bottom: 12px
- Border-bottom: 1px solid rgba(255,255,255,0.06)

Header Left:
- Stage name + count
  * Font: Inter, 600 weight, 14px
  * Color: white
  * Badge: count (e.g., "5")
    - Display: inline-flex
    - Padding: 2px 8px
    - Background: stage color (20% opacity)
    - Border-radius: 12px
    - Font-size: 12px
    - Color: stage color

Header Right:
- Total value
  * Font: Inter, 700 weight, 16px
  * Color: stage color
  * Format: R$ X.XXX

Stage Colors:
```css
--stage-lead: #6b7280 (gray)
--stage-contact: #3b82f6 (blue)
--stage-proposal: #a855f7 (purple)
--stage-negotiation: #fb923c (orange)
--stage-closing: #22c55e (green)
```

Column Actions:
- Icon button (more-vertical):
  * Width: 32px
  * Height: 32px
  * Border-radius: 6px
  * Background: rgba(255,255,255,0.06)
  * Hover: rgba(255,255,255,0.1)

=== OPPORTUNITY CARD ===

Container:
- Background: rgba(255,255,255,0.08)
- Backdrop-filter: blur(12px) saturate(150%)
- Border: 1px solid rgba(255,255,255,0.1)
- Border-radius: 10px
- Padding: 16px
- Cursor: grab (dragging: grabbing)
- Transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)
- Hover: transform translateY(-2px) + shadow

Card Header:
- Display: flex
- Align: center
- Gap: 12px
- Margin-bottom: 12px

Client Avatar:
- Width: 40px
- Height: 40px
- Border-radius: 50%
- Background: linear-gradient(135deg, #e90101, #c10101)
- Display: flex
- Align: center
- Justify: center
- Color: white
- Font-weight: 600
- Font-size: 14px
- Content: initials (e.g., "JS")

Client Info:
- Client name:
  * Font: Inter, 600 weight, 15px
  * Color: white
  * Margin-bottom: 2px
- Opportunity title:
  * Font: Inter, 400 weight, 13px
  * Color: rgba(255,255,255,0.6)

Card Body (Values):
- Display: flex
- Justify: space-between
- Padding: 12px 0
- Border-top: 1px solid rgba(255,255,255,0.06)
- Border-bottom: 1px solid rgba(255,255,255,0.06)

Value Item:
- Icon + Value
- Icon (dollar-sign):
  * Width: 16px
  * Height: 16px
  * Color: rgba(255,255,255,0.5)
- Value:
  * Font: Inter, 600 weight, 14px
  * Color: white

Card Footer:
- Display: flex
- Justify: space-between
- Align: center
- Margin-top: 12px

Qualification Stars:
- 5 stars (lucide star icon)
- Filled: color stage color
- Empty: rgba(255,255,255,0.2)
- Width: 14px each
- Gap: 2px

Actions:
- 3 icon buttons (phone, clock, more-vertical):
  * Width: 28px
  * Height: 28px
  * Border-radius: 6px
  * Background: rgba(255,255,255,0.05)
  * Hover: stage color (10% opacity)
  * Color: rgba(255,255,255,0.6)
  * Hover color: white

Origin Tag:
- Display: inline-flex
- Padding: 4px 8px
- Background: rgba(255,255,255,0.05)
- Border-radius: 6px
- Font-size: 11px
- Color: rgba(255,255,255,0.5)
- Margin-top: 8px

=== MOCK DATA (5 opportunities) ===

**Coluna 1: Lead (3 oportunidades)**
1. Teste 123
   - Cliente: João Silva (JS)
   - Valor: R$ 0
   - Qualificação: 1/5 estrelas
   - Origem: RD Station
   - Ações: telefone, relógio, menu

2. Evento Corporativo Q1
   - Cliente: Maria Costa (MC)
   - Valor: R$ 15.000
   - Qualificação: 2/5 estrelas
   - Origem: Indicação
   - Ações: telefone, relógio, menu

3. Festival de Música
   - Cliente: Pedro Santos (PS)
   - Valor: R$ 85.000
   - Qualificação: 3/5 estrelas
   - Origem: Site
   - Ações: telefone, relógio, menu

**Coluna 2: Contato (1 oportunidade)**
4. Equipamentos para Teatro
   - Cliente: Ana Oliveira (AO)
   - Valor: R$ 28.700
   - Qualificação: 3/5 estrelas
   - Origem: LinkedIn
   - Ações: telefone, relógio, menu

**Coluna 3: Proposta (1 oportunidade)**
5. Show Sertanejo - Arena
   - Cliente: Carlos Lima (CL)
   - Valor: R$ 72.400
   - Qualificação: 4/5 estrelas
   - Origem: WhatsApp
   - Ações: telefone, relógio, menu

**Colunas 4 e 5: vazias (drag target)**

=== DRAG AND DROP BEHAVIOR ===

**Dragging State**:
- Card being dragged:
  * opacity: 0.5
  * transform: rotate(2deg)
  * box-shadow: 0 8px 24px rgba(233,1,1,0.3)
  * cursor: grabbing

**Drop Target**:
- Column hover (valid drop):
  * background: rgba(233,1,1,0.05)
  * border: 2px dashed rgba(233,1,1,0.3)

**After Drop**:
- Card animates to new position
- Column counts update
- Column totals update
- Success toast: "Oportunidade movida para [Stage]"

=== EMPTY STATE ===

When column has no cards:
- Display placeholder:
  * Height: 120px
  * Background: rgba(255,255,255,0.02)
  * Border: 2px dashed rgba(255,255,255,0.06)
  * Border-radius: 8px
  * Text: "Arraste oportunidades aqui"
  * Icon: move (Lucide)
  * Color: rgba(255,255,255,0.3)
  * Font-size: 13px

=== MOBILE OPTIMIZATIONS ===

**Touch Gestures**:
- Swipe left/right to navigate columns
- Tap card to open details modal
- Long-press card to drag (mobile drag-and-drop)

**Mobile View**:
- Columns: width 90vw (almost full width)
- Horizontal scroll with snap points
- Bottom nav visible
- Reduced padding (16px → 12px)

=== JAVASCRIPT FEATURES ===

1. **Drag and Drop**:
   ```javascript
   // HTML5 Drag and Drop API
   card.draggable = true;
   card.addEventListener('dragstart', handleDragStart);
   card.addEventListener('dragend', handleDragEnd);
   column.addEventListener('dragover', handleDragOver);
   column.addEventListener('drop', handleDrop);
   ```

2. **Update Totals**:
   ```javascript
   function updateColumnTotals(columnId) {
     const cards = column.querySelectorAll('.opportunity-card');
     const count = cards.length;
     const total = Array.from(cards).reduce((sum, card) => {
       return sum + parseFloat(card.dataset.value);
     }, 0);

     updateUI(count, total);
   }
   ```

3. **Toast Notification**:
   ```javascript
   function showToast(message, type = 'success') {
     // Fixed position toast bottom-right
     // Auto-dismiss after 3s
     // Colors: success (green), error (red), info (blue)
   }
   ```

=== RESPONSIVE BREAKPOINTS ===

**Desktop (1024px+)**:
- All 5 columns visible
- Horizontal scroll if needed
- Full sidebar

**Tablet (768px - 1023px)**:
- Sidebar hidden (hamburger)
- Horizontal scroll required
- Reduced padding

**Mobile (<768px)**:
- Columns: 90vw width
- Snap scroll
- Bottom nav
- Touch gestures
- Reduced card padding

=== CSS TRANSITIONS ===

```css
/* Card hover */
.opportunity-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(233,1,1,0.2);
}

/* Dragging */
.opportunity-card.dragging {
  opacity: 0.5;
  transform: rotate(2deg);
  cursor: grabbing;
}

/* Drop target */
.kanban-column.drag-over {
  background: rgba(233,1,1,0.05);
  border-color: rgba(233,1,1,0.3);
}

/* Card entrance animation */
@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.opportunity-card {
  animation: cardSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

=== ACCESSIBILITY ===

- **Keyboard navigation**: Arrow keys to move between cards
- **Screen readers**: ARIA labels for drag-and-drop
- **Focus states**: Clear visual focus indicators
- **Alt text**: All icons have aria-label

=== QUALITY CHECKLIST ===

- [ ] 5 columns with distinct colors
- [ ] 5 mock opportunities distributed
- [ ] Drag and drop working (desktop)
- [ ] Touch gestures (mobile)
- [ ] Column counts update dynamically
- [ ] Column totals update dynamically
- [ ] Toast notifications on move
- [ ] Empty state placeholders
- [ ] Hover lift effects
- [ ] Glassmorphism cards
- [ ] Responsive (1024px, 768px)
- [ ] Bottom nav (mobile)
- [ ] Stage color coding
- [ ] Star ratings
- [ ] Action buttons
- [ ] Origin tags

=== FINAL NOTES ===

**Design Philosophy**:
- Visual clarity: Each stage has distinct color
- Easy scanning: Cards show key info at glance
- Smooth interactions: 60fps drag-and-drop
- Mobile-first: Touch-optimized for phone/tablet

**Performance**:
- Use CSS transforms (not position)
- Throttle scroll events
- Lazy load if >100 cards
- Virtual scrolling for very long columns

**Future Enhancements**:
- Filter by client/value/date
- Sort within column
- Bulk actions (select multiple)
- Column reordering
- Custom stages
- Analytics overlay

```

---

## 📝 Notas de Implementação

Este design é baseado na análise completa do RD Station CRM (protocol/RD-STATION-ANALYSIS.md).

**Principais diferenças**:
- STAGETEK usa red gradient (#e90101) vs RD Station purple
- Glassmorphism mais pronunciado
- Bottom nav mobile (vs sidebar collapse)
- Drag-and-drop nativo HTML5 (vs biblioteca)

**Reuso de componentes**:
- Sidebar (do Dashboard)
- Top bar (do Dashboard)
- Bottom nav (do Dashboard)
- CSS Variables (dashboard_theme.css)

---

**Built with Protocol Notecraft™**
**STAGETEK Engineering Team**
