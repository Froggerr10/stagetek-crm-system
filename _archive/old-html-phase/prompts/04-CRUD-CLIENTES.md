# Prompt: CRUD Clientes - STAGETEK CRM

**Estilo**: Premium B2B DataTable com Modal CRUD
**Inspiração**: RD Station CRM + Notion + Airtable
**Objetivo**: Listagem e gestão completa de clientes B2B

---

## 🎨 Especificação Completa

```
Design uma página de gestão de clientes B2B premium para STAGETEK com CRUD completo:

=== LAYOUT STRUCTURE ===

Desktop Layout (1024px+):
┌─────────────┬────────────────────────────────────┐
│   Sidebar   │  Top Bar (height: 64px)            │
│   (256px)   ├────────────────────────────────────┤
│   (reuse)   │  Main Content Area                 │
│             │  - Header: Title + Stats + Add     │
│             │  - Filters Bar (busca + filtros)   │
│             │  - DataTable (clientes)            │
│             │  - Pagination                      │
└─────────────┴────────────────────────────────────┘

Mobile Layout (<768px):
┌────────────────────────────┐
│  Top Bar (hamburger menu)  │
├────────────────────────────┤
│  Header + Search           │
│  Cards List (vertical)     │
│  - Client Card 1           │
│  - Client Card 2           │
│  - Load More Button        │
└────────────────────────────┘
│  Bottom Nav (5 icons)      │
└────────────────────────────┘

=== PAGE HEADER ===

Container:
- Padding: 24px
- Border-bottom: 1px solid rgba(255,255,255,0.08)
- Display: flex
- Justify: space-between
- Align: center

Left Section:
- Title: "Clientes"
  * Font: Inter, 700 weight, 24px
  * Color: white

Stats Row (abaixo do título):
- Display: flex
- Gap: 24px
- Margin-top: 8px

Each Stat:
- Display: flex
- Align: center
- Gap: 8px

Stat Item:
- Icon (users, briefcase, trending-up):
  * Width: 16px
  * Height: 16px
  * Color: rgba(255,255,255,0.5)
- Label:
  * Font-size: 13px
  * Color: rgba(255,255,255,0.5)
- Value:
  * Font-size: 13px
  * Font-weight: 600
  * Color: white

Example:
"👥 127 clientes  💼 R$ 1,2M em vendas  📈 +12% este mês"

Right Section:
- Button "Novo Cliente":
  * Height: 40px
  * Padding: 0 20px
  * Background: linear-gradient(135deg, #e90101, #c10101)
  * Border-radius: 8px
  * Color: white
  * Font-weight: 600
  * Icon: plus
  * Hover: lift + glow

=== FILTERS BAR ===

Container:
- Padding: 16px 24px
- Background: rgba(255,255,255,0.02)
- Border-bottom: 1px solid rgba(255,255,255,0.06)
- Display: flex
- Gap: 12px
- Align: center

Search Input:
- Width: 400px
- Height: 40px
- Background: rgba(255,255,255,0.06)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 8px
- Padding: 0 16px 0 40px
- Icon: search (position absolute left)
- Placeholder: "Buscar por nome, CNPJ, e-mail..."
- Focus: border red + glow

Filter Dropdowns:
1. Status:
   - Width: 140px
   - Options: Todos, Ativo, Inativo, Pendente
   - Icon: filter

2. Segmento:
   - Width: 160px
   - Options: Todos, Eventos, Entretenimento, Corporativo, Teatro
   - Icon: tag

3. Ordenar:
   - Width: 160px
   - Options: Mais recentes, Mais antigos, A-Z, Z-A, Maior receita
   - Icon: arrow-up-down

Style (cada dropdown):
- Height: 40px
- Background: rgba(255,255,255,0.06)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 8px
- Padding: 0 12px
- Color: white
- Display: flex
- Align: center
- Gap: 8px

Clear Filters Button:
- Display: flex (only when filters active)
- Height: 40px
- Padding: 0 16px
- Background: transparent
- Border: 1px solid rgba(255,255,255,0.1)
- Border-radius: 8px
- Color: rgba(255,255,255,0.6)
- Icon: x
- Text: "Limpar"
- Hover: color white

=== DATATABLE (Desktop) ===

Container:
- Padding: 0 24px 24px 24px

Table:
- Width: 100%
- Border-collapse: collapse
- Background: transparent

Table Header:
- Border-bottom: 1px solid rgba(255,255,255,0.1)

TH (each):
- Text-align: left
- Padding: 12px 16px
- Font-size: 12px
- Font-weight: 600
- Color: rgba(255,255,255,0.5)
- Text-transform: uppercase
- Letter-spacing: 0.5px

Columns:
1. Cliente (checkbox + avatar + nome + e-mail)
2. CNPJ
3. Telefone
4. Eventos (count)
5. Receita Total
6. Status
7. Ações

Table Body:

TR (each row):
- Border-bottom: 1px solid rgba(255,255,255,0.04)
- Transition: background 0.2s
- Hover: background rgba(255,255,255,0.02)

TD (each cell):
- Padding: 16px
- Font-size: 14px
- Color: rgba(255,255,255,0.9)

Column 1: Cliente
```html
<td>
  <div class="client-cell">
    <input type="checkbox" class="row-checkbox">
    <div class="client-avatar">JC</div>
    <div class="client-info">
      <div class="client-name">João Carlos</div>
      <div class="client-email">joao@empresa.com</div>
    </div>
  </div>
</td>
```

Client Cell Style:
- Display: flex
- Align: center
- Gap: 12px

Checkbox:
- Width: 18px
- Height: 18px
- Border-radius: 4px
- Border: 1.5px solid rgba(255,255,255,0.2)
- Background: transparent
- Checked: background red + checkmark

Avatar:
- Width: 40px
- Height: 40px
- Border-radius: 50%
- Background: linear-gradient(135deg, #e90101, #c10101)
- Color: white
- Font-weight: 600
- Font-size: 14px
- Display: flex
- Align/justify: center

Client Name:
- Font-size: 14px
- Font-weight: 600
- Color: white
- Margin-bottom: 2px

Client Email:
- Font-size: 12px
- Color: rgba(255,255,255,0.5)

Column 2: CNPJ
```html
<td>
  <span class="cnpj">12.345.678/0001-99</span>
</td>
```

Style:
- Font-family: monospace
- Font-size: 13px
- Color: rgba(255,255,255,0.7)

Column 3: Telefone
```html
<td>
  <div class="phone-cell">
    <i data-lucide="phone"></i>
    <span>(11) 98765-4321</span>
  </div>
</td>
```

Style:
- Display: flex
- Align: center
- Gap: 8px
- Icon: width 14px, color muted

Column 4: Eventos
```html
<td>
  <span class="event-count">3 eventos</span>
</td>
```

Style:
- Font-size: 14px
- Color: rgba(255,255,255,0.7)

Column 5: Receita Total
```html
<td>
  <span class="revenue">R$ 37.500</span>
</td>
```

Style:
- Font-size: 14px
- Font-weight: 600
- Color: #22c55e (verde)

Column 6: Status
```html
<td>
  <span class="status-badge status-active">Ativo</span>
</td>
```

Badge Style:
- Display: inline-flex
- Padding: 4px 10px
- Border-radius: 6px
- Font-size: 12px
- Font-weight: 500

Status Variants:
- Active:
  * Background: rgba(34,197,94,0.15)
  * Color: #22c55e
- Pending:
  * Background: rgba(251,188,5,0.15)
  * Color: #FBBC05
- Inactive:
  * Background: rgba(107,114,128,0.15)
  * Color: #9ca3af

Column 7: Ações
```html
<td>
  <div class="action-buttons">
    <button class="action-btn" title="Editar">
      <i data-lucide="pencil"></i>
    </button>
    <button class="action-btn" title="Ver Detalhes">
      <i data-lucide="eye"></i>
    </button>
    <button class="action-btn" title="Menu">
      <i data-lucide="more-vertical"></i>
    </button>
  </div>
</td>
```

Action Buttons Style:
- Display: flex
- Gap: 4px

Each Button:
- Width: 32px
- Height: 32px
- Border-radius: 6px
- Background: rgba(255,255,255,0.05)
- Border: none
- Color: rgba(255,255,255,0.6)
- Cursor: pointer
- Transition: all 0.2s

Button Hover:
- Background: rgba(255,255,255,0.1)
- Color: white

=== MOCK DATA (7 clientes) ===

1. João Carlos
   - CNPJ: 12.345.678/0001-99
   - Email: joao@empresa.com
   - Phone: (11) 98765-4321
   - Eventos: 3
   - Receita: R$ 37.500
   - Status: Ativo

2. Maria Silva
   - CNPJ: 98.765.432/0001-11
   - Email: maria@eventos.com
   - Phone: (11) 91234-5678
   - Eventos: 5
   - Receita: R$ 72.400
   - Status: Ativo

3. Pedro Rodrigues
   - CNPJ: 45.678.912/0001-22
   - Email: pedro@producao.com
   - Phone: (11) 99887-6543
   - Eventos: 2
   - Receita: R$ 16.400
   - Status: Ativo

4. Ana Costa
   - CNPJ: 78.912.345/0001-33
   - Email: ana@live.com
   - Phone: (11) 96543-2109
   - Eventos: 1
   - Receita: R$ 15.700
   - Status: Pendente

5. Ricardo Santos
   - CNPJ: 32.165.498/0001-44
   - Email: ricardo@shows.com
   - Phone: (11) 94321-8765
   - Eventos: 4
   - Receita: R$ 64.800
   - Status: Ativo

6. Fernanda Lima
   - CNPJ: 65.498.732/0001-55
   - Email: fernanda@teatro.com
   - Phone: (11) 97654-3210
   - Eventos: 2
   - Receita: R$ 28.900
   - Status: Ativo

7. Carlos Mendes
   - CNPJ: 15.975.348/0001-66
   - Email: carlos@corp.com
   - Phone: (11) 95432-1098
   - Eventos: 0
   - Receita: R$ 0
   - Status: Inativo

=== PAGINATION ===

Container:
- Padding: 16px 24px
- Border-top: 1px solid rgba(255,255,255,0.06)
- Display: flex
- Justify: space-between
- Align: center

Left: Info Text
- Text: "Mostrando 1-7 de 127 clientes"
- Font-size: 13px
- Color: rgba(255,255,255,0.5)

Right: Pagination Controls
- Display: flex
- Gap: 8px

Pagination Button:
- Width: 36px
- Height: 36px
- Border-radius: 6px
- Background: rgba(255,255,255,0.05)
- Border: 1px solid rgba(255,255,255,0.08)
- Color: white
- Font-size: 14px
- Cursor: pointer

Button Variants:
- Active: background red + glow
- Disabled: opacity 0.5 + cursor not-allowed
- Hover: background rgba(255,255,255,0.1)

Buttons:
- "Anterior" (icon: chevron-left)
- "1" (active)
- "2"
- "3"
- "..."
- "18"
- "Próximo" (icon: chevron-right)

=== MOBILE VIEW (Cards) ===

Client Card:
```html
<div class="client-card">
  <div class="card-header">
    <div class="client-avatar">JC</div>
    <div class="card-info">
      <div class="client-name">João Carlos</div>
      <div class="client-email">joao@empresa.com</div>
    </div>
    <div class="status-badge status-active">Ativo</div>
  </div>

  <div class="card-body">
    <div class="card-row">
      <i data-lucide="briefcase"></i>
      <span>12.345.678/0001-99</span>
    </div>
    <div class="card-row">
      <i data-lucide="phone"></i>
      <span>(11) 98765-4321</span>
    </div>
    <div class="card-row">
      <i data-lucide="calendar"></i>
      <span>3 eventos</span>
    </div>
    <div class="card-row">
      <i data-lucide="dollar-sign"></i>
      <span class="revenue">R$ 37.500</span>
    </div>
  </div>

  <div class="card-footer">
    <button class="card-action">
      <i data-lucide="pencil"></i>
      Editar
    </button>
    <button class="card-action">
      <i data-lucide="eye"></i>
      Ver
    </button>
  </div>
</div>
```

Card Style:
- Background: rgba(255,255,255,0.08)
- Backdrop-filter: blur(12px)
- Border: 1px solid rgba(255,255,255,0.1)
- Border-radius: 12px
- Padding: 16px
- Margin-bottom: 12px

Card Header:
- Display: flex
- Gap: 12px
- Margin-bottom: 16px
- Padding-bottom: 16px
- Border-bottom: 1px solid rgba(255,255,255,0.06)

Card Body:
- Display: flex
- Flex-direction: column
- Gap: 12px

Card Row:
- Display: flex
- Align: center
- Gap: 12px
- Font-size: 14px
- Color: rgba(255,255,255,0.7)

Card Footer:
- Display: flex
- Gap: 8px
- Margin-top: 16px

Card Action:
- Flex: 1
- Height: 40px
- Background: rgba(255,255,255,0.05)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 8px
- Color: white
- Display: flex
- Align: center
- Justify: center
- Gap: 8px

=== MODAL: NOVO CLIENTE ===

Overlay:
- Position: fixed
- Inset: 0
- Background: rgba(0,0,0,0.7)
- Backdrop-filter: blur(8px)
- Z-index: 1000
- Display: flex
- Align: center
- Justify: center

Modal Container:
- Width: 600px
- Max-width: 90vw
- Max-height: 90vh
- Background: var(--card)
- Backdrop-filter: blur(24px) saturate(180%)
- Border: 1px solid var(--card-border)
- Border-radius: 16px
- Box-shadow: 0 16px 48px rgba(0,0,0,0.4)
- Overflow: hidden

Modal Header:
- Padding: 24px
- Border-bottom: 1px solid rgba(255,255,255,0.06)
- Display: flex
- Justify: space-between
- Align: center

Title:
- Font-size: 20px
- Font-weight: 700
- Color: white

Close Button:
- Width: 36px
- Height: 36px
- Border-radius: 8px
- Background: rgba(255,255,255,0.05)
- Border: none
- Color: white
- Cursor: pointer
- Icon: x

Modal Body:
- Padding: 24px
- Overflow-y: auto
- Max-height: calc(90vh - 160px)

Form Layout:
- Display: grid
- Grid-template-columns: 1fr 1fr
- Gap: 16px

Form Group (full width):
- Grid-column: 1 / -1

Form Group (half width):
- Grid-column: span 1

Label:
- Display: block
- Font-size: 13px
- Font-weight: 500
- Color: rgba(255,255,255,0.9)
- Margin-bottom: 8px

Input / Select:
- Width: 100%
- Height: 44px
- Background: rgba(255,255,255,0.06)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 8px
- Padding: 0 16px
- Color: white
- Font-size: 14px

Input::placeholder:
- Color: rgba(255,255,255,0.4)

Input:focus:
- Outline: none
- Border-color: var(--primary)
- Box-shadow: 0 0 0 3px var(--primary-glow)

Textarea:
- Height: 100px
- Padding: 12px 16px
- Resize: vertical

CNPJ Input (special):
- Input com ícone de busca à direita
- Tooltip: "Clique para buscar dados na Receita"
- Icon: search
- Button position: absolute right 12px

Form Fields:
1. Nome da Empresa (text, required)
2. Nome do Contato (text, required)
3. CNPJ (text com mask, required) + botão busca
4. E-mail (email, required)
5. Telefone (tel com mask)
6. Segmento (select: Eventos, Entretenimento, Corporativo, Teatro)
7. CEP (text com mask)
8. Endereço (text)
9. Cidade (text)
10. Estado (select: AC, AL, ... SP, ...)
11. Observações (textarea)

Modal Footer:
- Padding: 24px
- Border-top: 1px solid rgba(255,255,255,0.06)
- Display: flex
- Justify: flex-end
- Gap: 12px

Button Cancel:
- Height: 44px
- Padding: 0 24px
- Background: transparent
- Border: 1px solid rgba(255,255,255,0.1)
- Border-radius: 8px
- Color: white
- Font-weight: 500

Button Submit:
- Height: 44px
- Padding: 0 24px
- Background: linear-gradient(135deg, #e90101, #c10101)
- Border: none
- Border-radius: 8px
- Color: white
- Font-weight: 600
- Box-shadow: 0 4px 12px var(--primary-glow)
- Hover: lift + glow stronger

=== CNPJ AUTOCOMPLETE ===

Quando usuário preenche CNPJ e clica no botão busca:

1. Loading state:
   - Button disabled
   - Icon vira spinner animado
   - Tooltip: "Buscando..."

2. Sucesso (mock):
   - Preenche automaticamente:
     * Nome da Empresa
     * CEP
     * Endereço
     * Cidade
     * Estado
   - Toast success: "Dados preenchidos automaticamente"

3. Erro:
   - Toast error: "CNPJ não encontrado"
   - Campos permanecem vazios

Mock Response (exemplo):
```json
{
  "nome": "STAGETEK EQUIPAMENTOS LTDA",
  "cep": "01310-100",
  "logradouro": "Av. Paulista, 1578",
  "cidade": "São Paulo",
  "estado": "SP"
}
```

=== JAVASCRIPT FEATURES ===

1. **Search/Filter**:
```javascript
function filterClients(searchTerm, status, segment) {
  const filtered = clients.filter(client => {
    const matchSearch =
      client.name.toLowerCase().includes(searchTerm) ||
      client.cnpj.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm);

    const matchStatus = status === 'all' || client.status === status;
    const matchSegment = segment === 'all' || client.segment === segment;

    return matchSearch && matchStatus && matchSegment;
  });

  renderTable(filtered);
}
```

2. **Bulk Actions** (checkbox select):
```javascript
function handleBulkSelect(selectedIds) {
  // Mostra toolbar com ações:
  // - Exportar selecionados
  // - Alterar status
  // - Excluir selecionados
}
```

3. **CNPJ Autocomplete**:
```javascript
async function fetchCNPJ(cnpj) {
  showLoading();
  try {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
    const data = await response.json();
    fillForm(data);
    showToast('Dados preenchidos automaticamente', 'success');
  } catch (error) {
    showToast('CNPJ não encontrado', 'error');
  } finally {
    hideLoading();
  }
}
```

4. **Input Masks**:
```javascript
// CNPJ: XX.XXX.XXX/XXXX-XX
// Telefone: (XX) XXXXX-XXXX
// CEP: XXXXX-XXX
```

=== RESPONSIVE BREAKPOINTS ===

**Desktop (1024px+)**:
- DataTable completa
- Todas as colunas visíveis
- Sidebar visível

**Tablet (768px - 1023px)**:
- DataTable com scroll horizontal
- Sidebar escondida (hamburger)
- Algumas colunas podem ser ocultadas

**Mobile (<768px)**:
- Cards view (não tabela)
- Bottom nav visível
- Modal full-height
- Form em coluna única (não grid)

=== EMPTY STATE ===

Quando nenhum cliente encontrado:
```html
<div class="empty-state">
  <i data-lucide="user-x"></i>
  <h3>Nenhum cliente encontrado</h3>
  <p>Tente ajustar os filtros ou adicione um novo cliente</p>
  <button class="add-button">Novo Cliente</button>
</div>
```

Style:
- Padding: 80px 24px
- Text-align: center
- Icon: 48px, color muted
- Title: 18px, font-weight 600
- Subtitle: 14px, color muted

=== ACCESSIBILITY ===

- Checkbox select all (header)
- Keyboard navigation (Tab, Enter, Esc)
- ARIA labels em todos os botões
- Focus states visuais claros
- Screen reader friendly

=== QUALITY CHECKLIST ===

- [ ] Header com stats
- [ ] Filtros (search + 3 dropdowns)
- [ ] DataTable com 7 colunas
- [ ] 7 clientes mockados
- [ ] Pagination funcional
- [ ] Modal de criar/editar
- [ ] CNPJ autocomplete (mock)
- [ ] Input masks (CNPJ, telefone, CEP)
- [ ] Mobile cards view
- [ ] Empty state
- [ ] Bulk selection (checkbox)
- [ ] Status badges (3 variantes)
- [ ] Action buttons (editar, ver, menu)
- [ ] Responsive (1024px, 768px)
- [ ] Glassmorphism
- [ ] Animations smooth

```

---

**Built with Protocol Notecraft™**
**STAGETEK Engineering Team**
