# STAGETEK CRM System - Claude Configuration

**INSTRUÇÕES CRÍTICAS: SIGA RIGOROSAMENTE O PROTOCOL NOTECRAFT™**

## 🎯 Contexto do Projeto

Este é um **sistema CRM profissional** para gestão de eventos, clientes e equipamentos da STAGETEK. Desenvolvido 100% seguindo **Protocol Notecraft™**.

**Versão**: 1.0.0
**Stack**: HTML5, CSS3, JavaScript (Vanilla), Chart.js
**Padrão**: Atomic Design + Protocol Notecraft™

---

## ⚠️ REGRAS ABSOLUTAS - NÃO NEGOCIÁVEIS

### 1. **Protocol Notecraft™ SEMPRE**
- ✅ Leia `/protocol/PROTOCOL-NOTECRAFT.md` ANTES de escrever qualquer código
- ✅ **Atoms**: máximo 20 linhas
- ✅ **Molecules**: máximo 35 linhas
- ✅ **Organisms**: máximo 50 linhas
- ✅ **Templates**: máximo 30 linhas
- ❌ NUNCA exceda esses limites

### 2. **Branding STAGETEK**
- ✅ Leia `/protocol/BRANDING-STANDARDS.md` ANTES de criar layouts
- ✅ Cores: APENAS `var(--stagetek-red-primary)` (#e90101)
- ✅ Logos: 32px (navbar), 120px (hero), 24px (footer)
- ✅ Dark mode toggle: SEMPRE com ícone dinâmico (lua/sol)
- ✅ Footer: SEMPRE com texto Protocol Notecraft™
- ❌ NUNCA use emojis como ícones
- ❌ NUNCA use cores hardcoded

### 3. **Design Tokens Obrigatórios**
```css
/* ✅ SEMPRE use CSS Custom Properties */
padding: var(--space-4);
color: var(--stagetek-red-primary);
border-radius: var(--radius-md);

/* ❌ NUNCA faça isso */
padding: 16px;
color: #e90101;
border-radius: 8px;
```

### 4. **Gradientes e Efeitos**
```css
/* ✅ CORRETO - Gradiente sutil */
background: linear-gradient(135deg, rgba(233, 1, 1, 0.1) 0%, rgba(134, 33, 40, 0.05) 100%);
border: 2px solid rgba(233, 1, 1, 0.2);

/* ❌ ERRADO - Cor sólida chapada */
background: #e90101;
```

### 5. **Ícones Profissionais**
```html
<!-- ✅ CORRETO - SVG Feather Icons -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="10"></circle>
</svg>

<!-- ❌ ERRADO - Emoji -->
<div>🚀</div>
```

---

## 📁 Estrutura do Projeto

```
stagetek-crm-system/
├── .claude/
│   └── CLAUDE.md              ← VOCÊ ESTÁ AQUI
├── protocol/
│   ├── PROTOCOL-NOTECRAFT.md  ← LER SEMPRE
│   └── BRANDING-STANDARDS.md  ← LER SEMPRE
├── design-system/
│   ├── base.css               ← Design system base (25KB)
│   └── components.css         ← Componentes dashboard (11KB)
├── components/
│   ├── atoms/                 ← Componentes ≤20 linhas
│   ├── molecules/             ← Componentes ≤35 linhas
│   └── organisms/             ← Componentes ≤50 linhas
├── pages/
│   ├── dashboard.html         ✅ PRONTO (com 4 gráficos)
│   ├── funil-vendas.html      ✅ PRONTO (Kanban drag-drop)
│   ├── clientes.html          🚧 TODO
│   ├── eventos.html           🚧 TODO
│   └── equipamentos.html      🚧 TODO
├── assets/
│   └── logos/SVG/             ← Logos STAGETEK
├── public/
└── index.html                 ✅ PRONTO
```

---

## 🚀 Páginas Implementadas

### ✅ **index.html** (Landing Page)
- Hero section com logo 120px
- 6 features com ícones SVG + gradientes
- 4 stats cards
- CTA section
- Footer Protocol Notecraft™

### ✅ **pages/dashboard.html** (Dashboard)
- Sidebar de navegação fixa
- Top bar com busca + dark mode + avatar
- 4 Stat Cards com métricas
- 3 Metric Cards com progress bars
- Data Table com 5 eventos
- **4 Gráficos Chart.js**:
  - Vendas ao Longo do Tempo (Linha)
  - Eventos por Mês (Barras)
  - Receita por Categoria (Pizza)
  - Pipeline de Vendas (Doughnut)

### ✅ **pages/funil-vendas.html** (Funil de Vendas)
- Kanban Board com 5 colunas
- Drag-and-drop entre estágios
- 7 oportunidades mockadas
- Totalizadores por coluna
- Modal de criar/editar oportunidades
- Atualização automática de totais

---

## 🚧 Próximas Implementações

### **Prioridade 1: Clientes**
```
pages/clientes.html
- Listagem de clientes (DataTable)
- Filtros (nome, status, data cadastro)
- Modal de cadastro/edição
- Avatar com iniciais
- Badges de status
- Actions (editar, excluir, ver detalhes)
```

### **Prioridade 2: Eventos**
```
pages/eventos.html
- Calendário mensal (vanilla JS ou FullCalendar)
- Cards de eventos por dia
- Modal de criar evento
- Integração com funil de vendas
- Status: Confirmado, Pendente, Cancelado
- Valor + Cliente + Equipamentos
```

### **Prioridade 3: Equipamentos**
```
pages/equipamentos.html
- Grid de cards de equipamentos
- Categorias: Som, Luz, Estrutura
- Status: Disponível, Em Uso, Manutenção
- Modal de detalhes
- Histórico de uso
- Agendamento
```

---

## 🎨 Componentes Disponíveis

### **Atoms** (design-system/components.css)
- `.badge` (success, warning, error, info, stagetek)
- `.avatar` (sm, md, lg)
- `.status-dot` (success, warning, error, info)
- `.progress-bar` (com variantes de cor)

### **Molecules**
- `.stat-card` (ícone + valor + label + change)
- `.metric-card` (título + valor + subtitle + progress)
- `.search-input` (ícone + input)

### **Organisms**
- `.data-table` (header + table + actions)
- `.chart-card` (header + canvas Chart.js)
- `.dashboard-grid` (grid responsivo 2, 3 ou 4 colunas)
- `.kanban-board` (colunas + cards drag-drop)

### **Utilities**
- `.btn` (primary, outline)
- `.modal` (overlay + content + header + actions)
- `.sidebar` (navegação lateral fixa)

---

## 💾 Dados Mockados

### Clientes (usar esses dados)
```javascript
const mockClients = [
  { id: 1, name: 'João Carlos', email: 'joao@empresa.com', phone: '(11) 98765-4321', events: 3, revenue: 37500, status: 'active' },
  { id: 2, name: 'Maria Silva', email: 'maria@eventos.com', phone: '(11) 91234-5678', events: 5, revenue: 72400, status: 'active' },
  { id: 3, name: 'Pedro Rodrigues', email: 'pedro@producao.com', phone: '(11) 99887-6543', events: 2, revenue: 16400, status: 'active' },
  { id: 4, name: 'Ana Costa', email: 'ana@live.com', phone: '(11) 96543-2109', events: 1, revenue: 15700, status: 'pending' },
  { id: 5, name: 'Ricardo Santos', email: 'ricardo@shows.com', phone: '(11) 94321-8765', events: 4, revenue: 64800, status: 'active' }
];
```

### Equipamentos (usar esses dados)
```javascript
const mockEquipments = [
  { id: 1, name: 'Mesa de Som Yamaha 32 Canais', category: 'som', status: 'available', price: 450 },
  { id: 2, name: 'Caixa Acústica JBL Line Array', category: 'som', status: 'in_use', price: 320 },
  { id: 3, name: 'Moving Head LED 200W', category: 'luz', status: 'available', price: 180 },
  { id: 4, name: 'Par LED RGBW 54x3W', category: 'luz', status: 'available', price: 80 },
  { id: 5, name: 'Treliça Q30 3 metros', category: 'estrutura', status: 'maintenance', price: 120 }
];
```

---

## 🔧 Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm run serve

# Ver estrutura de arquivos
tree -L 2

# Abrir no navegador
start index.html

# Servidor na porta 3000
npx http-server . -p 3000 -o
```

---

## ✅ Checklist ANTES de Criar Código

Antes de criar qualquer componente, página ou feature, verifique:

- [ ] Li `/protocol/PROTOCOL-NOTECRAFT.md`
- [ ] Li `/protocol/BRANDING-STANDARDS.md`
- [ ] Entendi os limites de linhas (Atoms: 20, Molecules: 35, Organisms: 50)
- [ ] Vou usar apenas CSS Custom Properties
- [ ] Vou usar ícones SVG (não emojis)
- [ ] Vou usar gradientes sutis (não cores chapadas)
- [ ] Vou incluir dark mode toggle padronizado
- [ ] Vou incluir footer com Protocol Notecraft™
- [ ] Logo terá altura correta (32px navbar)
- [ ] Componente tem Single Responsibility

---

## 🚫 O Que NUNCA Fazer

1. ❌ Componentes com mais linhas que o limite
2. ❌ Emojis como ícones (🚀, 🎨, 📱, etc.)
3. ❌ Cores hardcoded (`color: #e90101`)
4. ❌ Valores hardcoded (`padding: 16px`)
5. ❌ Backgrounds sólidos (`background: red`)
6. ❌ Logos com tamanhos aleatórios
7. ❌ Dark mode toggle sem ícone dinâmico
8. ❌ Footer sem Protocol Notecraft™
9. ❌ Múltiplas responsabilidades em um componente
10. ❌ Criar arquivos README ou .md sem ser solicitado

---

## 📚 Referências Rápidas

### Cores STAGETEK
```css
--stagetek-red-primary: #e90101
--stagetek-red-medium: #862128
--stagetek-red-dark: #63141a
--stagetek-white: #fbfafb
--stagetek-black: #000000
--stagetek-gray: #727272
```

### Spacing Scale
```css
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-6: 24px
--space-8: 32px
--space-16: 64px
```

### Border Radius
```css
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-full: 9999px
```

---

## 🎯 Exemplo de Conversa Ideal

**Usuário**: "Preciso criar a página de clientes com CRUD completo"

**Claude**: "Vou criar a página de clientes seguindo Protocol Notecraft™:

1. **DataTable Organism** (≤50 linhas):
   - Listagem de clientes
   - Filtros e ordenação
   - Actions (editar, excluir)

2. **ClientCard Molecule** (≤35 linhas):
   - Avatar + Nome + Email
   - Stats (eventos, receita)
   - Badge de status

3. **Modal de CRUD** (Organism ≤50 linhas):
   - Formulário de cadastro/edição
   - Validações

Todos usando:
- ✅ CSS Custom Properties
- ✅ Ícones SVG profissionais
- ✅ Gradientes sutis STAGETEK
- ✅ Dark mode suportado
- ✅ Dados mockados fornecidos"

---

## 🏆 Meta de Qualidade

- **100%** Protocol Notecraft™ compliance
- **100%** CSS Custom Properties
- **0** emojis como ícones
- **0** cores/valores hardcoded
- **≥95%** responsividade mobile
- **100%** dark mode support

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**

**Última atualização**: 30 de Setembro de 2025
