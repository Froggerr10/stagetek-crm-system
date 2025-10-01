# Prompt: Modal Detalhes da Oportunidade - STAGETEK CRM

**Estilo**: Modal Premium com Pipeline Linear + Tabs
**Inspiração**: RD Station CRM (tela oportunidade.png)
**Objetivo**: Visualizar e editar oportunidade completa

---

## 🎨 Especificação Completa

```
Modal de detalhes da oportunidade com visualização do pipeline e tabs:

=== ESTRUTURA GERAL ===

Modal Full-screen (desktop) / Full-page (mobile):
┌────────────────────────────────────────────────────┐
│ Header: Nome da Oportunidade + Actions            │
├────────────────────────────────────────────────────┤
│ Alert: Notificação contextual (opcional)          │
├────────────────────────────────────────────────────┤
│ Pipeline Visual: Funil + Fase Atual               │
├────────────────────────────────────────────────────┤
│ Tabs: Histórico | E-mail | Tarefas | etc.         │
├────────────────────────────────────────────────────┤
│ Tab Content (dinâmico)                             │
│                                                     │
│                                                     │
└────────────────────────────────────────────────────┘

=== MODAL OVERLAY ===

Overlay (desktop):
- Position: fixed
- Inset: 0
- Background: rgba(0,0,0,0.8)
- Backdrop-filter: blur(12px)
- Z-index: 2000

Modal Container (desktop):
- Width: 1200px
- Max-width: 95vw
- Height: 90vh
- Background: var(--background)
- Border-radius: 16px
- Overflow: hidden
- Box-shadow: 0 24px 64px rgba(0,0,0,0.6)
- Position: relative

Mobile (full-page):
- Width: 100vw
- Height: 100vh
- Border-radius: 0

=== HEADER SECTION ===

Container:
- Padding: 24px
- Background: var(--card)
- Border-bottom: 1px solid var(--card-border)
- Display: flex
- Justify: space-between
- Align: center

Left Section:
- Back button (chevron-left icon):
  * Width: 36px
  * Height: 36px
  * Border-radius: 8px
  * Background: rgba(255,255,255,0.05)
  * Hover: rgba(255,255,255,0.1)

- Opportunity Info:
  * Title: "Venda JANEIRO" (h2, 24px, font-weight 700)
  * Subtitle: "RD Station" (14px, color muted)

Right Section (Actions):
- Display: flex
- Gap: 12px

Action Buttons:
1. "Marcar venda" (button success):
   * Height: 40px
   * Padding: 0 20px
   * Background: linear-gradient(135deg, #22c55e, #16a34a)
   * Border-radius: 8px
   * Color: white
   * Font-weight: 600
   * Icon: thumbs-up

2. "Marcar perda" (button danger):
   * Same style
   * Background: linear-gradient(135deg, #ef4444, #dc2626)
   * Icon: thumbs-down

3. More actions (icon button):
   * Width: 40px
   * Height: 40px
   * Icon: more-vertical

4. Close modal (icon button):
   * Icon: x

Value Display (top-right corner):
- Display: flex
- Align: center
- Gap: 8px
- Font-size: 20px
- Font-weight: 700
- Color: white
- Background: rgba(255,255,255,0.05)
- Padding: 8px 16px
- Border-radius: 8px

Example: "💰 R$ 91,12"

=== CONTEXTUAL ALERT (opcional) ===

Container:
- Padding: 16px 24px
- Background: linear-gradient(135deg, rgba(34,197,94,0.1), rgba(34,197,94,0.05))
- Border-left: 3px solid #22c55e
- Display: flex
- Align: center
- Gap: 12px

Icon:
- fire (Lucide)
- Color: #22c55e
- Width: 20px

Message:
- Font-size: 14px
- Color: white
- Example: "Nova oportunidade, criada hoje às 10:11. Entre em contato rapidamente para aumentar suas chances de venda."

Close Button:
- Icon: x
- Width: 24px
- Color: muted

Variants:
- Success: green
- Warning: yellow/orange
- Info: blue
- Danger: red

=== PIPELINE SECTION ===

Container:
- Padding: 24px
- Background: rgba(255,255,255,0.02)
- Border-bottom: 1px solid var(--card-border)

Funnel Selector:
- Display: flex
- Align: center
- Gap: 12px
- Margin-bottom: 16px

Label:
- Font-size: 13px
- Font-weight: 500
- Color: rgba(255,255,255,0.7)
- Text: "Funil e estágio de venda:"

Dropdown:
- Width: 240px
- Height: 40px
- Background: rgba(255,255,255,0.06)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 8px
- Padding: 0 16px
- Color: white
- Font-size: 14px
- Font-weight: 500
- Display: flex
- Align: center
- Justify: space-between

Dropdown Content:
- Text: "Funil PADRÃO ( Não Alterar )"
- Icon: chevron-down

Edit Button (icon):
- Icon: pencil
- Width: 36px
- Height: 36px
- Background: rgba(255,255,255,0.05)
- Border-radius: 8px

Pipeline Visual (horizontal):
- Display: flex
- Align: center
- Gap: 0
- Position: relative

Stage (each):
- Display: flex
- Flex-direction: column
- Align: center
- Gap: 8px
- Position: relative
- Min-width: 120px

Stage Dot:
- Width: 40px
- Height: 40px
- Border-radius: 50%
- Display: flex
- Align: center
- Justify: center
- Cursor: pointer
- Transition: all 0.2s

Stage States:
1. **Current** (active):
   - Background: var(--primary) solid
   - Border: 3px solid rgba(233,1,1,0.3)
   - Box-shadow: 0 0 20px var(--primary-glow)
   - Scale: 1.1

2. **Completed** (antes da atual):
   - Background: var(--primary) solid
   - Opacity: 0.6

3. **Pending** (depois da atual):
   - Background: transparent
   - Border: 2px solid rgba(255,255,255,0.2)

Connector Line:
- Position: absolute
- Left: 50%
- Top: 20px
- Width: 100%
- Height: 2px
- Background: rgba(255,255,255,0.1)
- Z-index: 0

Connector Filled (completed):
- Background: var(--primary)
- Opacity: 0.6

Stage Info:
- Text-align: center
- Margin-top: 8px

Stage Name:
- Font-size: 12px
- Font-weight: 500
- Color: white (current)
- Color: rgba(255,255,255,0.5) (others)

Stage Sigla (abaixo do nome):
- Font-size: 11px
- Color: rgba(255,255,255,0.4)
- Font-family: monospace

Metadata Row (abaixo do pipeline):
- Display: flex
- Gap: 24px
- Margin-top: 16px

Metadata Item:
- Display: flex
- Align: center
- Gap: 8px

Icon:
- Width: 16px
- Color: rgba(255,255,255,0.5)

Label:
- Font-size: 13px
- Color: rgba(255,255,255,0.7)

Value:
- Font-size: 13px
- Font-weight: 600
- Color: white

Examples:
- Qualificação: ⭐⭐⭐⭐⭐ (5 stars)
- Valor: R$ 0,00
- Data de criação: 19/01/2022 às 10:11
- Previsão de fechamento: 30/01/2022

=== TABS SECTION ===

Container:
- Background: rgba(255,255,255,0.02)
- Border-bottom: 1px solid var(--card-border)
- Padding: 0 24px

Tabs List:
- Display: flex
- Gap: 8px

Tab Item:
- Height: 48px
- Padding: 0 20px
- Background: transparent
- Border: none
- Color: rgba(255,255,255,0.6)
- Font-size: 14px
- Font-weight: 500
- Cursor: pointer
- Position: relative
- Transition: all 0.2s

Tab Active:
- Color: white
- Border-bottom: 2px solid var(--primary)

Tab Hover:
- Color: white
- Background: rgba(255,255,255,0.03)

Tabs:
1. Histórico (default active)
2. E-mail
3. Tarefas
4. Contatos
5. Produtos e Serviços
6. Arquivos

=== TAB CONTENT: HISTÓRICO ===

Container:
- Padding: 24px
- Min-height: 400px
- Max-height: calc(90vh - 400px)
- Overflow-y: auto

Toolbar:
- Display: flex
- Gap: 12px
- Margin-bottom: 24px

Button "Criar anotação":
- Height: 44px
- Padding: 0 24px
- Background: linear-gradient(135deg, var(--primary), #c10101)
- Border-radius: 8px
- Color: white
- Font-weight: 600
- Icon: plus

Button "Criar tarefa":
- Same style
- Background: rgba(255,255,255,0.08)
- Color: white

Textarea (Rápida anotação):
- Width: 100%
- Min-height: 80px
- Background: rgba(255,255,255,0.06)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 8px
- Padding: 12px 16px
- Color: white
- Font-size: 14px
- Resize: vertical
- Placeholder: "Rápida anotação..."

Button "Criar anotação" (abaixo textarea):
- Height: 44px
- Width: 100%
- Background: var(--primary)
- Border-radius: 8px
- Color: white
- Font-weight: 600

Timeline Section:
- Margin-top: 32px

Timeline Header:
- Display: flex
- Justify: space-between
- Margin-bottom: 16px

Title:
- Font-size: 16px
- Font-weight: 600
- Color: white

Filters (checkboxes):
- Display: flex
- Gap: 12px
- Flex-wrap: wrap

Checkbox Item:
- Display: flex
- Align: center
- Gap: 8px

Checkbox:
- Width: 18px
- Height: 18px

Label:
- Font-size: 13px
- Color: rgba(255,255,255,0.7)

Filter Options:
- Anotação
- Tarefa
- Alteração
- Email
- Proposta
- Resposta de email
- Ligações
- Mensageiro
- Limite de execuções de automações

Timeline (vertical):
- Position: relative
- Padding-left: 40px

Timeline Line:
- Position: absolute
- Left: 16px
- Top: 0
- Bottom: 0
- Width: 2px
- Background: rgba(255,255,255,0.1)

Timeline Item:
- Position: relative
- Margin-bottom: 24px

Timeline Dot:
- Position: absolute
- Left: -40px
- Top: 0
- Width: 32px
- Height: 32px
- Border-radius: 50%
- Background: var(--primary)
- Display: flex
- Align: center
- Justify: center
- Z-index: 2

Timeline Dot Icon:
- Color: white
- Width: 16px

Timeline Content:
- Background: rgba(255,255,255,0.05)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 8px
- Padding: 16px

Timeline Header (item):
- Display: flex
- Align: center
- Gap: 12px
- Margin-bottom: 12px

User Avatar:
- Width: 32px
- Height: 32px
- Border-radius: 50%
- Background: linear-gradient(135deg, var(--primary), #c10101)

User Info:
- Flex: 1

User Name:
- Font-size: 14px
- Font-weight: 600
- Color: white

Timestamp:
- Font-size: 12px
- Color: rgba(255,255,255,0.5)
- Text: "4 segundos atrás"

Timeline Body:
- Font-size: 14px
- Color: rgba(255,255,255,0.8)
- Line-height: 1.6

Example Entry:
```html
<div class="timeline-item">
  <div class="timeline-dot">
    <i data-lucide="message-square"></i>
  </div>
  <div class="timeline-content">
    <div class="timeline-header">
      <div class="user-avatar">MB</div>
      <div class="user-info">
        <div class="user-name">Mario Becker</div>
        <div class="timestamp">4 segundos atrás</div>
      </div>
    </div>
    <div class="timeline-body">
      @Renato marcou Mario Becker · @Renato Bueno criou tarefa Funil PADRÃO (Não Alterar)
    </div>
  </div>
</div>
```

=== TAB CONTENT: TAREFAS ===

Toolbar:
- Button "Nova tarefa" (primary)

Tasks List:
- Display: flex
- Flex-direction: column
- Gap: 12px

Task Card:
- Background: rgba(255,255,255,0.05)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 8px
- Padding: 16px
- Display: flex
- Align: center
- Gap: 16px

Checkbox:
- Width: 20px
- Height: 20px

Task Info:
- Flex: 1

Task Title:
- Font-size: 14px
- Font-weight: 600
- Color: white

Task Metadata:
- Display: flex
- Gap: 16px
- Margin-top: 4px
- Font-size: 12px
- Color: rgba(255,255,255,0.5)

Due Date:
- Display: flex
- Align: center
- Gap: 4px
- Icon: calendar

Assigned To:
- Display: flex
- Align: center
- Gap: 4px
- Icon: user

Task Actions:
- Display: flex
- Gap: 4px

Icon Button (edit, delete):
- Width: 32px
- Height: 32px

=== TAB CONTENT: CONTATOS ===

Sidebar (direita):
- Width: 300px
- Background: rgba(255,255,255,0.03)
- Padding: 24px

Section Title:
- Font-size: 13px
- Font-weight: 600
- Color: rgba(255,255,255,0.7)
- Text-transform: uppercase
- Letter-spacing: 0.5px
- Margin-bottom: 16px

Responsible (Responsável):
- Dropdown select
- Current: "Mario Becker"
- Icon: user

Company Data (Dados da Empresa/Cliente):
- List of fields
- Each field:
  * Label (muted)
  * Value (white)
  * Edit icon

Opportunity Data (Dados da Oportunidade):
- Similar structure

Contact Data (Dados de Contato):
- Link: "+ Adicionar contato"
- Color: primary

=== RESPONSIVE ===

Desktop (1024px+):
- Modal 1200px width
- Sidebar visible (tab Contatos)
- All actions visible

Tablet (768px - 1023px):
- Modal 90vw
- Sidebar collapsed
- Compact toolbar

Mobile (<768px):
- Full-screen modal
- Tabs scroll horizontal
- Sidebar in separate modal
- Pipeline scroll horizontal

=== JAVASCRIPT FEATURES ===

1. **Open/Close Modal**:
```javascript
function openOpportunityModal(opportunityId) {
  fetchOpportunityData(opportunityId);
  modal.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeOpportunityModal() {
  modal.classList.remove('visible');
  document.body.style.overflow = 'auto';
}
```

2. **Tab Navigation**:
```javascript
tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    // Remove active from all
    tabs.forEach(t => t.classList.remove('active'));

    // Add active to clicked
    this.classList.add('active');

    // Show corresponding content
    showTabContent(this.dataset.tab);
  });
});
```

3. **Stage Click (change stage)**:
```javascript
stageDots.forEach(dot => {
  dot.addEventListener('click', function() {
    const newStage = this.dataset.stage;

    // Confirm if moving backwards
    if (isBackwards(newStage)) {
      if (!confirm('Tem certeza que deseja voltar esta oportunidade?')) {
        return;
      }
    }

    // Update opportunity stage
    updateOpportunityStage(opportunityId, newStage);

    // Refresh UI
    refreshPipeline();
  });
});
```

4. **Quick Note**:
```javascript
quickNoteForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const note = textarea.value;

  createNote(opportunityId, note);

  // Add to timeline
  addTimelineEntry({
    type: 'note',
    user: currentUser,
    content: note,
    timestamp: new Date()
  });

  // Clear textarea
  textarea.value = '';
});
```

=== ACCESSIBILITY ===

- Keyboard navigation: Tab through all interactive elements
- Esc to close modal
- Arrow keys to navigate tabs
- Screen reader labels
- Focus trap within modal
- ARIA roles and labels

=== QUALITY CHECKLIST ===

- [ ] Modal overlay + container
- [ ] Header with back button
- [ ] Action buttons (win/lose)
- [ ] Contextual alert
- [ ] Funnel selector dropdown
- [ ] Pipeline visual horizontal
- [ ] Current stage highlighted
- [ ] Stage click to move
- [ ] Metadata row (stars, value, date)
- [ ] 6 tabs
- [ ] Tab: Histórico with timeline
- [ ] Tab: Tarefas with task list
- [ ] Tab: Contatos with sidebar
- [ ] Quick note textarea
- [ ] Timeline vertical with entries
- [ ] Responsive (desktop, mobile)
- [ ] Glassmorphism
- [ ] Smooth animations

```

---

**Built with Protocol Notecraft™**
**STAGETEK Engineering Team**
