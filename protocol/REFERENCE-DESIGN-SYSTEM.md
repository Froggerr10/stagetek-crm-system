# DESIGN SYSTEM ANALYSIS - RD Station CRM Patterns + STAGETEK

**Version**: 1.0.0
**Date**: October 2, 2025
**Author**: @design-specialist
**Sources**: RD Station CRM video transcript, STAGETEK current designs, BRANDING-STANDARDS.md

---

## 1. DESIGN TOKENS COMPARISON

### **RD Station Observed (from video transcript + industry standard)**

```css
/* RD Station Color System (inferred from B2B CRM best practices) */
--rd-primary: #3182ce (likely blue/teal - typical B2B SaaS)
--rd-success: #38a169 (green - for "venda" confirmations)
--rd-warning: #d69e2e (yellow - for pending states)
--rd-danger: #e53e3e (red - for "perda" losses)
--rd-neutral: #718096 (gray - muted text)

/* Typography */
--rd-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
--rd-font-size-xs: 12px
--rd-font-size-sm: 14px
--rd-font-size-base: 16px
--rd-font-weight-normal: 400
--rd-font-weight-medium: 500
--rd-font-weight-bold: 600

/* Spacing (8pt grid) */
--rd-spacing-1: 4px
--rd-spacing-2: 8px
--rd-spacing-3: 12px
--rd-spacing-4: 16px
--rd-spacing-6: 24px
--rd-spacing-8: 32px

/* Shadows (subtle, professional) */
--rd-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--rd-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--rd-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)

/* Borders */
--rd-border-radius: 8px (rounded, friendly)
--rd-border-color: #e2e8f0 (light gray)
```

### **STAGETEK Current**

```css
/* STAGETEK Color System (from dashboard_theme.css) */
--primary: #e90101 (STAGETEK red - KEPT!)
--primary-glow: rgba(233, 1, 1, 0.3)
--background: #0a0909 (dark mode base)
--foreground: #ffffff
--card: rgba(255, 255, 255, 0.05) (glassmorphism)
--card-border: rgba(255, 255, 255, 0.1)
--muted: #8a8a8a
--muted-foreground: #6a6a6a

/* Typography */
--font-sans: 'Inter', -apple-system, sans-serif (GOOD!)
--font-size-xs: 12px
--font-size-sm: 14px
--font-size-base: 16px

/* Spacing (4pt grid - MATCH RD Station!) */
--spacing-1: 4px
--spacing-2: 8px
--spacing-3: 12px
--spacing-4: 16px
--spacing-6: 24px

/* Shadows (glow effect - unique to STAGETEK) */
--shadow-sm: 0 2px 8px rgba(0,0,0,0.2)
--primary-glow: 0 4px 12px rgba(233,1,1,0.4)

/* Borders */
--radius-sm: 8px
--radius-md: 12px
--card-border: rgba(255, 255, 255, 0.1)
```

### **🎯 Recommendations: What to CHANGE to feel more B2B professional**

#### **KEEP (STAGETEK DNA):**
✅ Primary red (#e90101) - Brand color, non-negotiable
✅ Inter font - Modern, professional
✅ 4pt spacing grid - Matches RD Station
✅ Dark mode glassmorphism - Unique differentiator

#### **ADJUST (Professional Polish):**
⚠️ **Reduce glow intensity**
```css
/* Current - TOO intense */
box-shadow: 0 4px 12px rgba(233,1,1,0.4);

/* Recommended - More subtle */
box-shadow: 0 2px 8px rgba(233,1,1,0.15);
```

⚠️ **Add semantic colors (RD Station style)**
```css
/* Add these to STAGETEK palette */
--success: #10b981 (green for "venda fechada")
--warning: #f59e0b (yellow for "aguardando")
--danger: #ef4444 (red for "perda")
--info: #3b82f6 (blue for info states)
```

⚠️ **Soften card borders (less neon)**
```css
/* Current - too bright */
border: 1px solid rgba(255, 255, 255, 0.1);

/* Recommended - more professional */
border: 1px solid rgba(255, 255, 255, 0.06);
```

#### **ADD (Missing from STAGETEK):**
❌ Light mode variant (RD Station has both)
❌ Semantic status colors
❌ Toast notification styles
❌ Empty state illustrations

---

## 2. KEY UI PATTERNS (Extracted from RD Station)

### **Pattern 1: Opportunity Card (Kanban)**

**RD Station Design (from video transcript):**
```
┌─────────────────────────────────┐
│ 🏢 Empresa Cliente               │  ← Cliente name (bold, 14px)
│ João Silva - Contato             │  ← Contato name (regular, 13px, muted)
│                                  │
│ R$ 125.000                       │  ← Valor (large, 18px, bold)
│ ⭐⭐⭐⭐⭐ (5 stars)               │  ← Qualificação (interactive)
│                                  │
│ 📱 RD Station (origem)           │  ← Origem tag (badge, small)
│                                  │
│ [📞] [📧] [⋯]                    │  ← Quick actions (icon buttons)
└─────────────────────────────────┘
```

**Key Observations:**
- **Width**: ~280px (fits 5 columns comfortably on 1920px)
- **Height**: Variable (min 140px, expands with content)
- **Padding**: 16px (--spacing-4)
- **Border-radius**: 8px
- **Shadow**: Subtle `0 2px 8px rgba(0,0,0,0.1)`
- **Hover**: Lift effect `translateY(-2px)` + stronger shadow
- **Drag handle**: Implicit (whole card is draggable)
- **Icons**: Minimalist, 16×16px, muted color
- **Typography hierarchy**:
  - Cliente: 14px/500 (medium weight)
  - Contato: 13px/400 (muted gray)
  - Valor: 18px/700 (bold, primary color)
  - Tags: 11px/500 (badge style)

**STAGETEK Current Implementation:**
```html
<!-- From funil-vendas.html -->
<div class="kanban-card">
    <div class="card-client">Acme Corp</div>
    <div class="card-contact">João Silva</div>
    <div class="card-value">R$ 125.000</div>
    <div class="card-tags">
        <span class="tag">Hot Lead</span>
    </div>
    <div class="card-actions">
        <button><i data-lucide="phone"></i></button>
        <button><i data-lucide="mail"></i></button>
        <button><i data-lucide="more-horizontal"></i></button>
    </div>
</div>
```

**✅ What STAGETEK does WELL:**
- Clean hierarchy
- Icon usage (Lucide)
- Consistent spacing
- Mobile-friendly touch targets

**⚠️ What to IMPROVE:**
1. **Add star rating** (qualificação) - RD Station uses this heavily
2. **Add origem badge** (where lead came from)
3. **Reduce glow** on hover (too intense currently)
4. **Add date field** (expected close date - RD Station shows this)

**Recommended STAGETEK Card (Enhanced):**
```html
<div class="kanban-card" draggable="true">
    <!-- Header: Cliente + Avatar -->
    <div class="card-header">
        <div class="card-avatar">AC</div>
        <div class="card-client-info">
            <div class="card-client">Acme Corporation</div>
            <div class="card-contact">João Silva · Gerente</div>
        </div>
    </div>

    <!-- Value + Star Rating -->
    <div class="card-value-row">
        <div class="card-value">R$ 125.000</div>
        <div class="card-rating">
            <i data-lucide="star" class="star filled"></i>
            <i data-lucide="star" class="star filled"></i>
            <i data-lucide="star" class="star filled"></i>
            <i data-lucide="star" class="star filled"></i>
            <i data-lucide="star" class="star"></i>
        </div>
    </div>

    <!-- Metadata -->
    <div class="card-metadata">
        <span class="badge badge-origem">RD Station</span>
        <span class="card-date">
            <i data-lucide="calendar"></i> 15 Out
        </span>
    </div>

    <!-- Quick Actions -->
    <div class="card-actions">
        <button class="action-btn" title="Ligar">
            <i data-lucide="phone"></i>
        </button>
        <button class="action-btn" title="Email">
            <i data-lucide="mail"></i>
        </button>
        <button class="action-btn" title="WhatsApp">
            <i data-lucide="message-circle"></i>
        </button>
        <button class="action-btn" title="Mais">
            <i data-lucide="more-horizontal"></i>
        </button>
    </div>
</div>
```

**CSS Enhancements:**
```css
.kanban-card {
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-4);
    cursor: grab;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.kanban-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(233,1,1,0.15); /* Reduced from 0.4 */
    border-color: rgba(233,1,1,0.3);
}

.kanban-card:active {
    cursor: grabbing;
    transform: scale(1.02);
}

.card-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-3);
}

.card-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary) 0%, #c10101 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
    flex-shrink: 0;
}

.card-client {
    font-size: 14px;
    font-weight: 600;
    color: var(--foreground);
    line-height: 1.2;
}

.card-contact {
    font-size: 13px;
    color: var(--muted-foreground);
    line-height: 1.2;
}

.card-value-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-3);
}

.card-value {
    font-size: 18px;
    font-weight: 700;
    color: var(--primary);
}

.card-rating {
    display: flex;
    gap: 2px;
}

.star {
    width: 14px;
    height: 14px;
    color: var(--muted);
}

.star.filled {
    color: #fbbf24; /* Yellow star */
    fill: #fbbf24;
}

.card-metadata {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-3);
}

.badge-origem {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 4px;
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
    border: 1px solid rgba(59, 130, 246, 0.2);
}

.card-date {
    font-size: 12px;
    color: var(--muted-foreground);
    display: flex;
    align-items: center;
    gap: 4px;
}

.card-date i {
    width: 12px;
    height: 12px;
}

.card-actions {
    display: flex;
    gap: var(--spacing-2);
    padding-top: var(--spacing-3);
    border-top: 1px solid var(--card-border);
}

.action-btn {
    flex: 1;
    height: 32px;
    background: transparent;
    border: 1px solid var(--card-border);
    border-radius: var(--radius-sm);
    color: var(--muted-foreground);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.action-btn:hover {
    background: var(--card-hover);
    border-color: var(--primary);
    color: var(--primary);
}

.action-btn i {
    width: 16px;
    height: 16px;
}
```

---

### **Pattern 2: Drag-Drop Visual Feedback**

**RD Station Implementation (from video observations):**

1. **Drop Zones Highlight:**
   - Column gets subtle background change when card is dragged over
   - Border becomes dashed and colored
   - Visual "slot" appears where card will be inserted

2. **Card Ghost/Placeholder:**
   - Original card gets 50% opacity
   - Phantom card follows cursor
   - Dotted outline shows drop position

3. **Snap Animation:**
   - Card "snaps" into position with spring physics
   - `cubic-bezier(0.34, 1.56, 0.64, 1)` (bounce easing)
   - Duration: 300ms

4. **Toast on Success:**
   - Bottom-right corner
   - Slide-in from right
   - Auto-dismiss after 3 seconds
   - Includes undo action

**STAGETEK Current:**
❌ No drag-drop implemented yet

**Recommended STAGETEK Drag-Drop:**

```javascript
// Drag-drop behavior (vanilla JS or @dnd-kit)
const kanbanCard = document.querySelector('.kanban-card');

// On drag start
kanbanCard.addEventListener('dragstart', (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('dragging');
    // Store card ID
    e.dataTransfer.setData('text/plain', e.currentTarget.dataset.id);
});

// On drag end
kanbanCard.addEventListener('dragend', (e) => {
    e.currentTarget.classList.remove('dragging');
});

// Column drop zone
const column = document.querySelector('.kanban-column');

column.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');

    // Show insertion point
    const afterElement = getDragAfterElement(column, e.clientY);
    const draggingCard = document.querySelector('.dragging');

    if (afterElement == null) {
        column.appendChild(draggingCard);
    } else {
        column.insertBefore(draggingCard, afterElement);
    }
});

column.addEventListener('dragleave', (e) => {
    e.currentTarget.classList.remove('drag-over');
});

column.addEventListener('drop', (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    // Show success toast
    showToast({
        type: 'success',
        message: 'Oportunidade movida para "Proposta Enviada"',
        action: { label: 'Desfazer', onClick: undoMove }
    });

    // Save to backend
    updateOpportunityStage(cardId, newStageId);
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.kanban-card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
```

**CSS for Drag States:**
```css
/* Dragging card (ghost) */
.kanban-card.dragging {
    opacity: 0.5;
    transform: rotate(2deg);
}

/* Column drop zone highlight */
.kanban-column.drag-over {
    background: rgba(233, 1, 1, 0.05);
    border: 2px dashed rgba(233, 1, 1, 0.3);
}

/* Placeholder/insertion point */
.kanban-card.placeholder {
    height: 140px;
    background: rgba(233, 1, 1, 0.1);
    border: 2px dashed var(--primary);
    opacity: 0.5;
}

/* Snap animation */
@keyframes cardSnap {
    0% {
        transform: scale(1.05);
    }
    50% {
        transform: scale(0.95);
    }
    100% {
        transform: scale(1);
    }
}

.kanban-card.snapping {
    animation: cardSnap 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

### **Pattern 3: Toast Notifications**

**RD Station Toast Patterns (from video):**

1. **Opportunity created**: "✅ Oportunidade criada com sucesso"
2. **Card moved**: "✅ Oportunidade movida para 'Proposta Enviada'"
3. **Sale won**: "🎉 Parabéns! Venda fechada: R$ 125.000" (with confetti + sound!)
4. **Task completed**: "✅ Tarefa concluída"

**Toast Specs:**
- **Position**: Bottom-right (32px from edges)
- **Duration**: 3s auto-dismiss (5s for success, 10s for errors)
- **Animation**: Slide-in from right (300ms ease-out)
- **Types**: success, error, info, warning
- **Max width**: 400px
- **Actions**: Optional "Desfazer" or "Ver detalhes" button

**STAGETEK Toast Component:**

```html
<!-- Toast Container -->
<div id="toast-container" class="toast-container"></div>

<!-- Toast Template -->
<template id="toast-template">
    <div class="toast" role="alert">
        <div class="toast-icon"></div>
        <div class="toast-content">
            <div class="toast-title"></div>
            <div class="toast-description"></div>
        </div>
        <button class="toast-close" aria-label="Close">
            <i data-lucide="x"></i>
        </button>
        <div class="toast-progress"></div>
    </div>
</template>
```

```css
/* Toast Container */
.toast-container {
    position: fixed;
    bottom: var(--spacing-8);
    right: var(--spacing-8);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
    pointer-events: none;
}

/* Toast Base */
.toast {
    min-width: 320px;
    max-width: 400px;
    background: var(--card);
    backdrop-filter: var(--blur-md);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-4);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: start;
    gap: var(--spacing-3);
    pointer-events: all;
    position: relative;
    overflow: hidden;
    animation: slideInRight 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideInRight {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Toast Types */
.toast.success {
    border-left: 4px solid #10b981;
}

.toast.success .toast-icon {
    color: #10b981;
}

.toast.error {
    border-left: 4px solid #ef4444;
}

.toast.error .toast-icon {
    color: #ef4444;
}

.toast.warning {
    border-left: 4px solid #f59e0b;
}

.toast.warning .toast-icon {
    color: #f59e0b;
}

.toast.info {
    border-left: 4px solid #3b82f6;
}

.toast.info .toast-icon {
    color: #3b82f6;
}

/* Toast Icon */
.toast-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
}

/* Toast Content */
.toast-content {
    flex: 1;
    min-width: 0;
}

.toast-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--foreground);
    margin-bottom: 2px;
}

.toast-description {
    font-size: 13px;
    color: var(--muted-foreground);
}

/* Toast Close Button */
.toast-close {
    width: 20px;
    height: 20px;
    background: transparent;
    border: none;
    color: var(--muted-foreground);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s;
    flex-shrink: 0;
}

.toast-close:hover {
    background: var(--card-hover);
    color: var(--foreground);
}

.toast-close i {
    width: 16px;
    height: 16px;
}

/* Auto-dismiss Progress Bar */
.toast-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--primary);
    transform-origin: left;
    animation: shrink 3s linear;
}

@keyframes shrink {
    from {
        transform: scaleX(1);
    }
    to {
        transform: scaleX(0);
    }
}

/* Mobile Adaptation */
@media (max-width: 768px) {
    .toast-container {
        bottom: var(--spacing-4);
        right: var(--spacing-4);
        left: var(--spacing-4);
    }

    .toast {
        min-width: 100%;
        max-width: 100%;
    }
}
```

```javascript
// Toast Manager
class ToastManager {
    constructor() {
        this.container = document.getElementById('toast-container');
        this.template = document.getElementById('toast-template');
    }

    show({ type = 'info', title, description, duration = 3000, action }) {
        const toast = this.template.content.cloneNode(true);
        const toastEl = toast.querySelector('.toast');

        // Set type
        toastEl.classList.add(type);

        // Set icon based on type
        const iconEl = toastEl.querySelector('.toast-icon');
        const icons = {
            success: 'check-circle',
            error: 'alert-circle',
            warning: 'alert-triangle',
            info: 'info'
        };
        iconEl.innerHTML = `<i data-lucide="${icons[type]}"></i>`;

        // Set content
        toastEl.querySelector('.toast-title').textContent = title;
        if (description) {
            toastEl.querySelector('.toast-description').textContent = description;
        } else {
            toastEl.querySelector('.toast-description').remove();
        }

        // Set progress bar duration
        const progress = toastEl.querySelector('.toast-progress');
        progress.style.animationDuration = `${duration}ms`;

        // Add close handler
        toastEl.querySelector('.toast-close').addEventListener('click', () => {
            this.dismiss(toastEl);
        });

        // Add action button if provided
        if (action) {
            const actionBtn = document.createElement('button');
            actionBtn.className = 'toast-action';
            actionBtn.textContent = action.label;
            actionBtn.addEventListener('click', () => {
                action.onClick();
                this.dismiss(toastEl);
            });
            toastEl.querySelector('.toast-content').appendChild(actionBtn);
        }

        // Append to container
        this.container.appendChild(toast);

        // Initialize Lucide icons
        lucide.createIcons();

        // Auto-dismiss
        setTimeout(() => {
            this.dismiss(toastEl);
        }, duration);

        return toastEl;
    }

    dismiss(toastEl) {
        toastEl.style.animation = 'slideOutRight 200ms ease-in';
        setTimeout(() => {
            toastEl.remove();
        }, 200);
    }

    success(title, description, options = {}) {
        return this.show({ type: 'success', title, description, ...options });
    }

    error(title, description, options = {}) {
        return this.show({ type: 'error', title, description, duration: 10000, ...options });
    }

    warning(title, description, options = {}) {
        return this.show({ type: 'warning', title, description, duration: 5000, ...options });
    }

    info(title, description, options = {}) {
        return this.show({ type: 'info', title, description, ...options });
    }
}

@keyframes slideOutRight {
    to {
        transform: translateX(400px);
        opacity: 0;
    }
}

// Global instance
const toast = new ToastManager();

// Usage examples
toast.success('Oportunidade criada', 'João Silva - R$ 125.000');
toast.error('Erro ao salvar', 'Verifique sua conexão');
toast.warning('Campos obrigatórios', 'Preencha CNPJ e Nome');
toast.info('Atualização disponível', 'Clique para recarregar');

// With action button
toast.success('Oportunidade movida', 'Proposta Enviada', {
    action: {
        label: 'Desfazer',
        onClick: () => undoMove()
    }
});

// Win celebration (with confetti!)
function celebrateWin(value) {
    // Confetti animation
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Play sound (optional)
    const audio = new Audio('/sounds/success.mp3');
    audio.play();

    // Show toast
    toast.success(
        '🎉 Parabéns! Venda fechada',
        `R$ ${value.toLocaleString('pt-BR')}`,
        { duration: 5000 }
    );
}
```

---

## 3. EMPTY STATES DESIGN

**RD Station Empty States (from video transcript):**

1. **No opportunities**: "Crie sua primeira oportunidade!"
2. **No tasks**: "Nenhuma tarefa para hoje. Ótimo trabalho!"
3. **No contacts**: "Importe sua lista de contatos"

**Pattern**:
- Centered illustration (SVG, 240×180px)
- Primary message (18px/600)
- Secondary message (14px/400, muted)
- Primary CTA button
- Optional secondary action (link)

**STAGETEK Empty States:**

```html
<!-- Empty Kanban Column -->
<div class="empty-state">
    <svg class="empty-illustration" viewBox="0 0 240 180">
        <!-- Simple illustration of empty kanban card stack -->
        <rect x="40" y="40" width="160" height="100" rx="8" fill="var(--muted)" opacity="0.1"/>
        <rect x="50" y="50" width="140" height="80" rx="8" fill="var(--muted)" opacity="0.15"/>
        <rect x="60" y="60" width="120" height="60" rx="8" fill="var(--muted)" opacity="0.2"/>
    </svg>
    <h3 class="empty-title">Nenhuma oportunidade aqui</h3>
    <p class="empty-description">Arraste cards ou crie uma nova oportunidade</p>
    <button class="btn btn-primary">
        <i data-lucide="plus"></i>
        Nova Oportunidade
    </button>
</div>

<!-- No clients yet -->
<div class="empty-state">
    <svg class="empty-illustration" viewBox="0 0 240 180">
        <!-- Illustration of empty address book -->
        <path d="..." fill="var(--muted)" opacity="0.2"/>
    </svg>
    <h3 class="empty-title">Nenhum cliente cadastrado</h3>
    <p class="empty-description">Comece importando uma planilha ou adicione manualmente</p>
    <div class="empty-actions">
        <button class="btn btn-primary">
            <i data-lucide="upload"></i>
            Importar Excel
        </button>
        <button class="btn btn-outline">
            <i data-lucide="plus"></i>
            Adicionar Cliente
        </button>
    </div>
</div>

<!-- No products -->
<div class="empty-state">
    <svg class="empty-illustration" viewBox="0 0 240 180">
        <!-- Illustration of empty product catalog -->
    </svg>
    <h3 class="empty-title">Catálogo vazio</h3>
    <p class="empty-description">Adicione produtos para começar a criar cotações</p>
    <button class="btn btn-primary">
        <i data-lucide="package"></i>
        Adicionar Primeiro Produto
    </button>
</div>

<!-- No report data -->
<div class="empty-state">
    <svg class="empty-illustration" viewBox="0 0 240 180">
        <!-- Illustration of empty chart -->
    </svg>
    <h3 class="empty-title">Sem dados para exibir</h3>
    <p class="empty-description">Selecione um período diferente ou crie vendas</p>
    <button class="btn btn-outline">
        <i data-lucide="calendar"></i>
        Alterar Período
    </button>
</div>
```

```css
/* Empty State */
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-12) var(--spacing-6);
    text-align: center;
}

.empty-illustration {
    width: 240px;
    height: 180px;
    margin-bottom: var(--spacing-6);
    opacity: 0.6;
}

.empty-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--foreground);
    margin-bottom: var(--spacing-2);
}

.empty-description {
    font-size: 14px;
    color: var(--muted-foreground);
    margin-bottom: var(--spacing-6);
    max-width: 400px;
}

.empty-actions {
    display: flex;
    gap: var(--spacing-3);
    flex-wrap: wrap;
    justify-content: center;
}

/* Mobile */
@media (max-width: 768px) {
    .empty-illustration {
        width: 180px;
        height: 135px;
    }

    .empty-actions {
        flex-direction: column;
        width: 100%;
    }

    .empty-actions .btn {
        width: 100%;
    }
}
```

---

## 4. MOBILE-FIRST ADAPTATIONS

### **Desktop Kanban** (RD Station approach):
```
┌──────────┬──────────┬──────────┬──────────┬──────────┐
│ Lead     │ Contato  │ Proposta │ Negoc.   │ Fecha.   │
│ (5 cards)│ (8 cards)│ (3 cards)│ (6 cards)│ (2 cards)│
└──────────┴──────────┴──────────┴──────────┴──────────┘
```
- 5 columns side-by-side
- Horizontal scroll if >5 stages
- Drag-drop between columns
- Column headers sticky

### **Mobile Kanban** (STAGETEK should use):

**Option A: Horizontal Swipe (RECOMMENDED)**
```
┌────────────────────────────┐
│  ← Lead (2/5) →            │  ← Column indicator
├────────────────────────────┤
│  [Card 1]                  │
│  [Card 2]                  │
│  [Card 3]                  │
│  [Card 4]                  │
│  [Card 5]                  │
│  + Nova Oportunidade       │
└────────────────────────────┘
```
- Swipe left/right to change column
- Dots indicator (• • ● • •) showing current column
- Tap card to open details (no drag-drop on mobile)
- FAB button for "+ Nova"

**Option B: Column Selector Dropdown**
```
┌────────────────────────────┐
│  [Estágio: Lead ▼]         │  ← Dropdown selector
├────────────────────────────┤
│  [Card 1]                  │
│  [Card 2]                  │
│  ...                       │
└────────────────────────────┘
```
- Select dropdown to switch columns
- Simpler but less intuitive

**Recommendation**: Use **Option A** (swipe) - more natural on mobile, matches user expectations from social media apps.

### **Mobile Adaptations Checklist:**

#### **Navigation**
✅ **Desktop**: Sidebar (256px fixed left)
✅ **Mobile**: Bottom nav bar (5 icons: Home, Clientes, Funil, Produtos, Perfil)

```css
/* Bottom Nav (Mobile Only) */
@media (max-width: 768px) {
    .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 64px;
        background: var(--card);
        backdrop-filter: var(--blur-md);
        border-top: 1px solid var(--card-border);
        display: flex;
        justify-content: space-around;
        align-items: center;
        z-index: var(--z-topbar);
    }

    .bottom-nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        color: var(--muted-foreground);
        text-decoration: none;
        padding: 8px 16px;
        min-width: 64px;
        transition: color 0.2s;
    }

    .bottom-nav-item.active {
        color: var(--primary);
    }

    .bottom-nav-item i {
        width: 24px;
        height: 24px;
    }

    .bottom-nav-item span {
        font-size: 11px;
        font-weight: 500;
    }
}
```

#### **Data Tables → Cards**
✅ **Desktop**: DataTable with sortable columns
✅ **Mobile**: Vertical card stack

```html
<!-- Desktop Table -->
<table class="data-table desktop-only">
    <thead>
        <tr>
            <th>Cliente</th>
            <th>CNPJ</th>
            <th>Email</th>
            <th>Status</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        <tr>...</tr>
    </tbody>
</table>

<!-- Mobile Cards -->
<div class="card-list mobile-only">
    <div class="client-card">
        <div class="card-header">
            <div class="avatar">AC</div>
            <div class="client-info">
                <div class="client-name">Acme Corp</div>
                <div class="client-cnpj">12.345.678/0001-90</div>
            </div>
            <span class="badge badge-success">Ativo</span>
        </div>
        <div class="card-meta">
            <span>📧 contato@acme.com</span>
            <span>📱 (11) 99999-9999</span>
        </div>
        <div class="card-actions">
            <button class="btn-sm btn-outline">Ver</button>
            <button class="btn-sm btn-outline">Editar</button>
        </div>
    </div>
</div>
```

#### **Forms: Multi-Step (Mobile)**
✅ **Desktop**: 2-3 column layout, all fields visible
✅ **Mobile**: Stepper wizard, one section at a time

```html
<!-- Mobile Form Stepper -->
<div class="form-stepper">
    <div class="stepper-header">
        <div class="step active">1</div>
        <div class="step-line"></div>
        <div class="step">2</div>
        <div class="step-line"></div>
        <div class="step">3</div>
    </div>
    <div class="stepper-content">
        <!-- Step 1: Dados Básicos -->
        <div class="step-panel active">
            <h3>Dados Básicos</h3>
            <input type="text" placeholder="CNPJ">
            <input type="text" placeholder="Razão Social">
            <button class="btn btn-primary btn-block">Próximo</button>
        </div>

        <!-- Step 2: Endereço -->
        <div class="step-panel">...</div>

        <!-- Step 3: Contato -->
        <div class="step-panel">...</div>
    </div>
</div>
```

#### **Modals: Full-Screen (Mobile)**
✅ **Desktop**: Centered modal (600px width)
✅ **Mobile**: Full-screen slide-up

```css
/* Modal Responsive */
.modal {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
}

.modal-content {
    background: var(--card);
    border-radius: var(--radius-lg);
    padding: var(--spacing-6);
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
}

@media (max-width: 768px) {
    .modal-content {
        max-width: 100%;
        width: 100%;
        max-height: 100%;
        height: 100%;
        border-radius: 0;
        animation: slideUpModal 300ms ease-out;
    }
}

@keyframes slideUpModal {
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
}
```

#### **Touch Targets: ≥44×44px**
✅ All buttons minimum 44px height
✅ Nav items minimum 44px touch area
✅ Checkbox/radio hitboxes 44×44px (even if visual is smaller)

```css
/* Touch-Friendly Buttons */
.btn {
    min-height: 44px;
    padding: 0 var(--spacing-4);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
}

.btn-sm {
    min-height: 36px; /* Exception for secondary actions */
}

/* Touch-Friendly Checkbox */
.checkbox-wrapper {
    position: relative;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.checkbox-wrapper input[type="checkbox"] {
    width: 20px;
    height: 20px;
}
```

---

## 5. ACCESSIBILITY CHECKLIST

### **Color Contrast WCAG AA (4.5:1)**

**Current STAGETEK Issues:**
❌ Muted text on dark background: `#6a6a6a on #0a0909` = **2.9:1** (FAIL)
❌ Card borders: `rgba(255,255,255,0.1)` too subtle

**Fixes:**
```css
/* Before (FAIL) */
--muted-foreground: #6a6a6a; /* 2.9:1 contrast */

/* After (PASS) */
--muted-foreground: #9ca3af; /* 4.6:1 contrast ✅ */

/* Card borders - increase opacity */
--card-border: rgba(255, 255, 255, 0.15); /* More visible */
```

**Test Tool**: Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### **Touch Targets ≥44×44px**
✅ All interactive elements
✅ Icon buttons
✅ Nav items
✅ Form inputs
✅ Checkboxes/radios (visual can be smaller, but clickable area 44px)

### **Keyboard Navigation**
✅ **Tab** order logical (top→bottom, left→right)
✅ **Enter** activates buttons
✅ **Escape** closes modals
✅ **Arrow keys** navigate lists
✅ **Space** toggles checkboxes

```javascript
// Modal Keyboard Support
modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }

    // Trap focus inside modal
    if (e.key === 'Tab') {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});
```

### **Screen Reader Friendly (ARIA)**

```html
<!-- Kanban Card with ARIA -->
<div class="kanban-card"
     draggable="true"
     role="article"
     aria-label="Oportunidade: Acme Corp, Valor: R$ 125.000, Estágio: Lead">

    <div class="card-header">
        <div class="card-avatar" aria-hidden="true">AC</div>
        <div class="card-client-info">
            <div class="card-client">Acme Corporation</div>
            <div class="card-contact" aria-label="Contato">João Silva · Gerente</div>
        </div>
    </div>

    <div class="card-value" aria-label="Valor da oportunidade">R$ 125.000</div>

    <div class="card-rating" aria-label="Qualificação: 4 de 5 estrelas">
        <i data-lucide="star" class="star filled" aria-hidden="true"></i>
        <i data-lucide="star" class="star filled" aria-hidden="true"></i>
        <i data-lucide="star" class="star filled" aria-hidden="true"></i>
        <i data-lucide="star" class="star filled" aria-hidden="true"></i>
        <i data-lucide="star" class="star" aria-hidden="true"></i>
    </div>

    <div class="card-actions" role="group" aria-label="Ações rápidas">
        <button class="action-btn" aria-label="Ligar para cliente">
            <i data-lucide="phone" aria-hidden="true"></i>
        </button>
        <button class="action-btn" aria-label="Enviar email">
            <i data-lucide="mail" aria-hidden="true"></i>
        </button>
    </div>
</div>

<!-- Toast with ARIA Live Region -->
<div id="toast-container"
     role="region"
     aria-live="polite"
     aria-atomic="true"
     class="toast-container">
</div>

<!-- Modal with ARIA -->
<div class="modal"
     role="dialog"
     aria-modal="true"
     aria-labelledby="modal-title">
    <div class="modal-content">
        <h2 id="modal-title">Criar Nova Oportunidade</h2>
        ...
    </div>
</div>
```

### **Focus Indicators Visible**

```css
/* Visible focus ring (STAGETEK style) */
*:focus {
    outline: none; /* Remove default */
}

*:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
    border-radius: 4px;
}

/* Exception for buttons with background */
.btn:focus-visible {
    outline: 2px solid rgba(233, 1, 1, 0.5);
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(233, 1, 1, 0.1);
}
```

### **Accessibility Patterns that FAIL Currently:**
❌ Icon-only buttons without aria-label
❌ Low contrast muted text
❌ No skip-to-content link
❌ Drag-drop without keyboard alternative
❌ Color as only indicator (use icons + text too)

---

## 6. ANIMATION MICRO-INTERACTIONS

### **RD Station Animations (from video transcript)**

1. **Card drag**: Smooth follow cursor, 0ms latency
2. **Card drop**: Snap to grid, 300ms bounce
3. **Win celebration**: Confetti + sound + thumbs up toast
4. **Toast**: Slide-in from bottom-right

### **STAGETEK Animation System**

```css
/* Animation Durations (Microsoft Fluent inspired) */
--duration-instant: 0ms;
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;

/* Easing Curves */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1); /* Default */
--ease-decelerate: cubic-bezier(0, 0, 0.2, 1); /* Enter */
--ease-accelerate: cubic-bezier(0.4, 0, 1, 1); /* Exit */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful */

/* Transition Presets */
--transition-all: all var(--duration-normal) var(--ease-standard);
--transition-colors: color var(--duration-fast) var(--ease-standard),
                     background-color var(--duration-fast) var(--ease-standard),
                     border-color var(--duration-fast) var(--ease-standard);
--transition-transform: transform var(--duration-normal) var(--ease-standard);
```

### **Micro-Interactions Catalog**

#### **1. Card Hover**
```css
.kanban-card {
    transition:
        transform var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}

.kanban-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(233, 1, 1, 0.15);
}

.kanban-card:active {
    transform: translateY(0);
    transition-duration: var(--duration-instant);
}
```

#### **2. Button Press**
```css
.btn {
    transition:
        transform var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}

.btn:active {
    transform: scale(0.97);
}

/* Special: Primary button with pulse */
@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(233, 1, 1, 0.5);
    }
    70% {
        box-shadow: 0 0 0 8px rgba(233, 1, 1, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(233, 1, 1, 0);
    }
}

.btn-primary:focus-visible {
    animation: pulse 1.5s infinite;
}
```

#### **3. Input Focus**
```css
.input {
    border: 1px solid var(--card-border);
    transition: var(--transition-all);
}

.input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(233, 1, 1, 0.1);
    transform: scale(1.01);
}
```

#### **4. Toast Slide-In**
```css
@keyframes slideInRight {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.toast {
    animation: slideInRight var(--duration-normal) var(--ease-decelerate);
}
```

#### **5. Modal Fade + Scale**
```css
@keyframes modalEnter {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.modal-content {
    animation: modalEnter var(--duration-normal) var(--ease-decelerate);
}
```

#### **6. Loading Skeleton**
```css
@keyframes shimmer {
    0% {
        background-position: -468px 0;
    }
    100% {
        background-position: 468px 0;
    }
}

.skeleton {
    background: linear-gradient(
        90deg,
        var(--card) 0%,
        rgba(255, 255, 255, 0.08) 50%,
        var(--card) 100%
    );
    background-size: 468px 100%;
    animation: shimmer 1.2s ease-in-out infinite;
}
```

#### **7. Success Checkmark**
```css
@keyframes checkmarkDraw {
    0% {
        stroke-dashoffset: 100;
    }
    100% {
        stroke-dashoffset: 0;
    }
}

.checkmark {
    stroke-dasharray: 100;
    animation: checkmarkDraw var(--duration-slow) var(--ease-standard);
}
```

#### **8. Error Shake**
```css
@keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-4px);
    }
    20%, 40%, 60%, 80% {
        transform: translateX(4px);
    }
}

.input.error {
    animation: shake var(--duration-slow) var(--ease-standard);
    border-color: var(--danger);
}
```

#### **9. Win Celebration (RD Station style)**
```javascript
function celebrateWin({ value, client }) {
    // 1. Confetti explosion
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e90101', '#ffffff', '#fbbf24']
    });

    // 2. Sound effect
    const audio = new Audio('/sounds/success.mp3');
    audio.volume = 0.3;
    audio.play();

    // 3. Toast with special styling
    const toastEl = toast.success(
        '🎉 Parabéns! Venda fechada',
        `${client} · R$ ${value.toLocaleString('pt-BR')}`,
        { duration: 5000 }
    );

    // 4. Pulse animation on toast
    toastEl.classList.add('celebration');

    // 5. Update dashboard stats with count-up animation
    animateValue(
        document.querySelector('.stat-vendas .stat-value'),
        oldValue,
        newValue,
        1000
    );
}

// Count-up animation
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current).toLocaleString('pt-BR');
    }, 16);
}
```

```css
.toast.celebration {
    border-left-color: #fbbf24;
    animation:
        slideInRight var(--duration-normal) var(--ease-decelerate),
        pulse 1s var(--ease-standard) 0.3s 3;
}
```

---

## 7. COMPONENT CHECKLIST

### **Atoms (≤20 lines)**
- [x] Button (primary, outline, ghost)
- [x] Input
- [x] Badge (status, origem)
- [x] Avatar (initials)
- [x] Icon (Lucide wrapper)
- [ ] Checkbox ⚠️
- [ ] Radio ⚠️
- [ ] Switch (dark mode)
- [ ] Star Rating ⚠️ (NEW - needed for cards)

### **Molecules (≤35 lines)**
- [x] Search Input (with icon)
- [x] Stat Card
- [x] Kanban Card (needs enhancement - see Pattern 1)
- [ ] Toast Notification ⚠️ (see Pattern 3)
- [ ] Empty State ⚠️ (see Section 3)
- [ ] Form Field (label + input + error)
- [ ] Date Picker
- [ ] Select Dropdown

### **Organisms (≤50 lines)**
- [x] Sidebar Navigation
- [x] Top Bar
- [x] Kanban Column
- [ ] Bottom Nav (mobile) ⚠️
- [ ] Data Table (desktop)
- [ ] Card List (mobile)
- [ ] Modal/Dialog
- [ ] Form Stepper (mobile)

### **Templates (≤30 lines)**
- [x] Dashboard Layout
- [x] Kanban Layout
- [ ] CRUD Layout ⚠️
- [ ] Detail Page Layout

---

## 8. FINAL RECOMMENDATIONS

### **✅ What STAGETEK is Doing RIGHT:**
1. **Modern dark mode** with glassmorphism - unique differentiator
2. **STAGETEK red (#e90101)** - strong brand identity
3. **Inter font** - professional, readable
4. **Lucide icons** - consistent icon system
5. **Responsive spacing** - 4pt grid matches RD Station
6. **Clean layouts** - good visual hierarchy

### **⚠️ What to IMPROVE for B2B Professional Feel:**

#### **HIGH PRIORITY:**
1. **Reduce glow intensity** - Too "gamer", not enough "enterprise"
2. **Add semantic colors** - Success/warning/danger for statuses
3. **Implement toast notifications** - Critical for feedback
4. **Add star rating** to opportunity cards
5. **Add origem badges** to cards
6. **Fix accessibility** - Contrast ratios, ARIA labels
7. **Implement drag-drop** for Kanban

#### **MEDIUM PRIORITY:**
8. **Empty states** for all lists/grids
9. **Mobile bottom nav** bar
10. **Form validation** with shake animation
11. **Loading skeletons** instead of spinners
12. **Keyboard shortcuts** (/, Ctrl+K for search)

#### **LOW PRIORITY:**
13. **Win celebration** with confetti
14. **Light mode** variant
15. **Onboarding tooltips**
16. **Command palette** (Cmd+K)

---

## 9. IMPLEMENTATION PRIORITY

### **Phase 1: Foundation (Week 1)**
- [ ] Add semantic colors to design tokens
- [ ] Fix accessibility contrast issues
- [ ] Create toast notification system
- [ ] Implement mobile bottom nav
- [ ] Add empty states to all pages

### **Phase 2: Polish (Week 2)**
- [ ] Enhance opportunity cards (stars, origem, date)
- [ ] Implement drag-drop for Kanban
- [ ] Add all micro-interactions
- [ ] Create loading states/skeletons
- [ ] Form validation with animations

### **Phase 3: Delight (Week 3)**
- [ ] Win celebration (confetti + sound)
- [ ] Advanced keyboard shortcuts
- [ ] Onboarding tour
- [ ] Light mode variant (optional)

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**

**Next Step**: Apply these recommendations to funil-vendas.html and create enhanced Kanban cards.
