# UI PATTERNS QUICK REFERENCE - RD Station → STAGETEK

**Quick reference guide for implementing RD Station-inspired patterns in STAGETEK CRM**

---

## 📋 OPPORTUNITY CARD (Kanban)

### RD Station Pattern
```
┌─────────────────────────────────┐
│ 🏢 Acme Corporation              │  ← Cliente (14px/600)
│ João Silva - Gerente             │  ← Contato (13px/400, muted)
│                                  │
│ R$ 125.000                       │  ← Valor (18px/700, primary)
│ ⭐⭐⭐⭐⭐ (5 stars)               │  ← Qualificação (14px stars)
│                                  │
│ 📱 RD Station  📅 15 Out         │  ← Badges (11px)
│                                  │
│ [📞] [📧] [💬] [⋯]               │  ← Actions (32px buttons)
└─────────────────────────────────┘
```

### STAGETEK Implementation
```html
<div class="kanban-card">
    <div class="card-header">
        <div class="card-avatar">AC</div>
        <div class="card-client-info">
            <div class="card-client">Acme Corporation</div>
            <div class="card-contact">João Silva · Gerente</div>
        </div>
    </div>
    <div class="card-value-row">
        <div class="card-value">R$ 125.000</div>
        <div class="card-rating">★★★★☆</div>
    </div>
    <div class="card-metadata">
        <span class="badge badge-origem">RD Station</span>
        <span class="card-date">📅 15 Out</span>
    </div>
    <div class="card-actions">
        <button>📞</button>
        <button>📧</button>
        <button>💬</button>
        <button>⋯</button>
    </div>
</div>
```

---

## 🎨 COLOR SEMANTICS

### RD Station Approach
```
✅ Success (Green) → Venda fechada, task concluída
⚠️ Warning (Yellow) → Proposta pendente, aguardando
❌ Danger (Red) → Perda, erro
ℹ️ Info (Blue) → Informações gerais, origem
```

### STAGETEK Palette (Enhanced)
```css
/* Primary (Brand) */
--primary: #e90101           /* STAGETEK red */

/* Semantic (NEW - Add these!) */
--success: #10b981           /* Green */
--warning: #f59e0b           /* Amber */
--danger: #ef4444            /* Red */
--info: #3b82f6              /* Blue */

/* Neutral */
--muted: #9ca3af             /* Gray (improved contrast) */
```

### Usage Examples
```html
<!-- Status Badges -->
<span class="badge badge-success">Venda Fechada</span>
<span class="badge badge-warning">Aguardando</span>
<span class="badge badge-danger">Perda</span>
<span class="badge badge-info">RD Station</span>

<!-- Buttons -->
<button class="btn btn-primary">Salvar</button>
<button class="btn btn-success">Confirmar Venda</button>
<button class="btn btn-danger">Excluir</button>
```

---

## 🍞 TOAST NOTIFICATIONS

### RD Station Pattern
```
┌─────────────────────────────────┐
│ ✅  Oportunidade criada          │  ← Icon + Title
│     João Silva - R$ 125.000      │  ← Description
│                           [✕]    │  ← Close button
└─────────────────────────────────┘
  ━━━━━━━━━━━━━━━━━━━━━━━          ← Progress bar (3s)
```

### STAGETEK Toast System
```javascript
// Success toast
toast.success(
    'Oportunidade criada',
    'João Silva - R$ 125.000'
);

// With action button
toast.success(
    'Oportunidade movida',
    'Proposta Enviada',
    {
        action: {
            label: 'Desfazer',
            onClick: () => undoMove()
        }
    }
);

// Win celebration
celebrateWin({
    client: 'João Silva',
    value: 125000
});
// → Confetti + Sound + Special toast
```

### Toast Positions
```
Desktop:                    Mobile:
┌──────────────────────┐    ┌──────────────────┐
│                      │    │                  │
│                      │    │                  │
│                 ┌──┐ │    │                  │
│                 └──┘ │    │                  │
│                      │    ├──────────────────┤
└──────────────────────┘    │ [Toast]          │
   Bottom-right 32px        │ Full-width       │
                            └──────────────────┘
```

---

## 📱 MOBILE ADAPTATIONS

### Kanban: Desktop vs Mobile

#### Desktop (5 columns)
```
┌──────┬──────┬──────┬──────┬──────┐
│ Lead │Contato│Prop.│Negoc.│Fecha.│
│ [█]  │ [█]  │ [█] │ [█]  │ [█]  │
│ [█]  │ [█]  │     │ [█]  │      │
│ [█]  │      │     │      │      │
└──────┴──────┴──────┴──────┴──────┘
```

#### Mobile (Horizontal Swipe)
```
┌────────────────────────────┐
│  ← Lead (1/5) →            │
│  • • • ○ ○                 │  ← Dots indicator
├────────────────────────────┤
│  [Card 1]                  │
│  [Card 2]                  │
│  [Card 3]                  │
│                            │
│  + Nova Oportunidade       │
└────────────────────────────┘
│ [Home][Clientes][⊕][Prod.][👤]│  ← Bottom nav
└────────────────────────────┘
```

### Data Table → Mobile Cards
```
Desktop Table:
┌──────────┬──────────┬───────┬────────┐
│ Cliente  │ CNPJ     │ Email │ Status │
├──────────┼──────────┼───────┼────────┤
│ Acme     │12.345... │email  │ Ativo  │
└──────────┴──────────┴───────┴────────┘

Mobile Cards:
┌────────────────────────────┐
│ [AC] Acme Corporation      │
│      12.345.678/0001-90    │
│      📧 contato@acme.com   │
│      [Ativo]               │
│      [Ver] [Editar]        │
├────────────────────────────┤
│ ...next card...            │
└────────────────────────────┘
```

---

## 🎭 EMPTY STATES

### Pattern Structure
```
┌────────────────────────────┐
│                            │
│       [Illustration]       │  ← SVG 240×180px
│                            │
│    Primary Message         │  ← 18px/600
│    Secondary message       │  ← 14px/400 muted
│                            │
│    [Primary CTA Button]    │  ← 44px height
│    [Secondary Action]      │  ← Link or outline btn
│                            │
└────────────────────────────┘
```

### Examples

#### Empty Kanban Column
```
┌────────────────────────────┐
│         📋                 │
│         📋 📋              │  ← Stack of cards
│         📋 📋 📋           │
│                            │
│ Nenhuma oportunidade aqui  │
│ Arraste cards ou crie nova │
│                            │
│ [+ Nova Oportunidade]      │
└────────────────────────────┘
```

#### No Clients Yet
```
┌────────────────────────────┐
│         📇                 │  ← Address book icon
│                            │
│ Nenhum cliente cadastrado  │
│ Importe planilha ou        │
│ adicione manualmente       │
│                            │
│ [📤 Importar Excel]        │
│ [+ Adicionar Cliente]      │
└────────────────────────────┘
```

#### No Report Data
```
┌────────────────────────────┐
│         📊                 │  ← Empty chart
│                            │
│ Sem dados para exibir      │
│ Selecione período diferente│
│ ou crie vendas             │
│                            │
│ [📅 Alterar Período]       │
└────────────────────────────┘
```

---

## ⌨️ KEYBOARD SHORTCUTS

### RD Station Approach
```
/ ou Ctrl+K  → Open search
Esc          → Close modals
Enter        → Submit forms
Tab          → Navigate fields
Ctrl+S       → Save (prevent default)
```

### STAGETEK Shortcuts (Recommended)
```javascript
document.addEventListener('keydown', (e) => {
    // Global search
    if (e.key === '/' || (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        openSearch();
    }

    // Close modals
    if (e.key === 'Escape') {
        closeAllModals();
    }

    // Quick actions (when no input focused)
    if (!isInputFocused()) {
        if (e.key === 'n') {
            createNewOpportunity(); // N = New
        }
        if (e.key === 'c') {
            navigateToClients(); // C = Clients
        }
        if (e.key === 'f') {
            navigateToFunnel(); // F = Funnel
        }
    }
});
```

---

## 🎬 ANIMATION TIMING

### RD Station Observed
```
Card drag:        0ms (instant)
Card drop:      300ms (bounce)
Toast in:       300ms (ease-out)
Toast out:      200ms (ease-in)
Modal open:     300ms (scale + fade)
Modal close:    200ms (scale + fade)
Button press:   150ms (scale)
Hover lift:     150ms (translate)
```

### STAGETEK Variables
```css
/* Durations */
--duration-instant: 0ms;
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;

/* Easings */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
--ease-decelerate: cubic-bezier(0, 0, 0.2, 1);   /* Enter */
--ease-accelerate: cubic-bezier(0.4, 0, 1, 1);   /* Exit */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful */
```

### Usage Examples
```css
/* Button hover */
.btn {
    transition: all var(--duration-fast) var(--ease-standard);
}

/* Card drag */
.kanban-card.dragging {
    transition: transform var(--duration-instant);
}

/* Modal enter */
.modal-content {
    animation: modalEnter var(--duration-normal) var(--ease-decelerate);
}
```

---

## 🔍 SEARCH PATTERNS

### RD Station Search Bar
```
┌─────────────────────────────────┐
│ 🔍  Buscar clientes, opor...    │  ← Placeholder
└─────────────────────────────────┘

Type → Show results dropdown:
┌─────────────────────────────────┐
│ 🔍  acme                        │
├─────────────────────────────────┤
│ Clientes (2)                    │
│   • Acme Corporation            │
│   • Acme Industries             │
├─────────────────────────────────┤
│ Oportunidades (3)               │
│   • Venda Acme - R$ 125.000     │
│   • Projeto Acme - R$ 80.000    │
├─────────────────────────────────┤
│ Ver todos os resultados (5) →   │
└─────────────────────────────────┘
```

### STAGETEK Implementation
```html
<div class="search-container">
    <input
        type="search"
        class="search-input"
        placeholder="Buscar clientes, oportunidades, produtos..."
        aria-label="Buscar"
    >
    <i data-lucide="search" class="search-icon"></i>

    <!-- Results Dropdown -->
    <div class="search-results">
        <div class="search-group">
            <div class="search-group-title">Clientes (2)</div>
            <a href="#" class="search-result">
                <div class="avatar">AC</div>
                <div>Acme Corporation</div>
            </a>
        </div>
        <div class="search-group">
            <div class="search-group-title">Oportunidades (3)</div>
            <a href="#" class="search-result">
                <i data-lucide="briefcase"></i>
                <div>Venda Acme - R$ 125.000</div>
            </a>
        </div>
        <a href="#" class="search-all">
            Ver todos os resultados (5) →
        </a>
    </div>
</div>
```

---

## 🎯 ACCESSIBILITY QUICK CHECKS

### WCAG AA Compliance Checklist
```
✅ Color contrast ≥ 4.5:1 (text)
✅ Color contrast ≥ 3:1 (UI elements)
✅ Touch targets ≥ 44×44px
✅ All images have alt text
✅ All icons have aria-label or aria-hidden
✅ Focus indicators visible
✅ Keyboard navigation works
✅ Screen reader friendly
✅ No color-only indicators
```

### Common Fixes
```html
<!-- ❌ WRONG -->
<button><i data-lucide="phone"></i></button>

<!-- ✅ CORRECT -->
<button aria-label="Ligar para cliente">
    <i data-lucide="phone" aria-hidden="true"></i>
</button>

<!-- ❌ WRONG -->
<span class="badge badge-success">•</span>

<!-- ✅ CORRECT -->
<span class="badge badge-success" aria-label="Ativo">
    <i data-lucide="check-circle" aria-hidden="true"></i>
    Ativo
</span>
```

---

## 📐 SPACING REFERENCE

### RD Station Grid (8pt)
```
4px   8px   12px  16px  24px  32px  48px  64px
│     │     │     │     │     │     │     │
█     ██    ███   ████  ██████████  ████████████████

Usage:
4px  → Icon gaps, badge padding
8px  → Button padding (vertical)
12px → Card padding (small)
16px → Card padding (default)
24px → Section spacing
32px → Page margins
48px → Major sections
64px → Hero sections
```

### STAGTEK Variables (Match!)
```css
--spacing-1: 4px;   /* Micro gaps */
--spacing-2: 8px;   /* Small gaps */
--spacing-3: 12px;  /* Compact padding */
--spacing-4: 16px;  /* Default padding */
--spacing-6: 24px;  /* Section spacing */
--spacing-8: 32px;  /* Large spacing */
--spacing-12: 48px; /* Major sections */
--spacing-16: 64px; /* Hero spacing */
```

---

## 🎨 SHADOWS REFERENCE

### RD Station Shadows (Subtle)
```
None:   box-shadow: none;
Sm:     box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
Md:     box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
Lg:     box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
```

### STAGETEK Shadows (Enhanced)
```css
/* Current - Too intense */
--shadow-card: 0 4px 12px rgba(233,1,1,0.4);

/* Recommended - Professional */
--shadow-none: none;
--shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
--shadow-md: 0 4px 8px rgba(0,0,0,0.15);
--shadow-lg: 0 8px 16px rgba(0,0,0,0.2);

/* Special - Primary glow (use sparingly!) */
--shadow-primary: 0 4px 12px rgba(233,1,1,0.15);
```

---

## 🏆 QUICK WINS (Implement First!)

### Week 1: Foundation
```
1. ✅ Add semantic colors (success/warning/danger/info)
2. ✅ Create toast notification system
3. ✅ Fix accessibility contrast issues
4. ✅ Add star rating to opportunity cards
5. ✅ Implement empty states
```

### Week 2: Polish
```
6. ✅ Enhance opportunity cards (origem, date)
7. ✅ Add drag-drop to Kanban
8. ✅ Implement mobile bottom nav
9. ✅ Add loading skeletons
10. ✅ Form validation with shake animation
```

### Week 3: Delight
```
11. ✅ Win celebration (confetti + sound)
12. ✅ Keyboard shortcuts
13. ✅ Onboarding tooltips
14. ⏸️ Light mode (optional)
```

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
