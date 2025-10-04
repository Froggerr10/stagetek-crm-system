# Protocol Notecraft™

**STAGETEK Engineering Standard**
**Version**: 2.0
**Last Updated**: 30 de Setembro de 2025

---

## 📋 Sobre o Protocol Notecraft™

O **Protocol Notecraft™** é o padrão de desenvolvimento da STAGETEK que estabelece regras rígidas para componentização, organização de código e qualidade de software. Baseado no princípio de **Single Responsibility** e **Extreme Componentization**, garantindo:

- ✅ Código altamente reutilizável
- ✅ Manutenção simplificada
- ✅ Onboarding rápido de desenvolvedores
- ✅ Qualidade consistente em toda a base de código
- ✅ Performance otimizada

---

## 🏗️ Atomic Design Pattern

### Hierarquia de Componentes

```
Templates (≤30 linhas)
    ↓
Organisms (≤50 linhas)
    ↓
Molecules (≤35 linhas)
    ↓
Atoms (≤20 linhas)
```

### 1. **Atoms** (Átomos) - ≤20 linhas

**Definição**: Componentes mais básicos e indivisíveis da interface.

**Exemplos**:
- Botões
- Inputs
- Labels
- Ícones
- Avatares
- Badges
- Status Dots
- Progress Bars

**Regras**:
- Máximo de **20 linhas de código**
- **Zero lógica de negócio**
- Apenas apresentação visual
- Props simples e diretas
- Um único propósito claro

**Exemplo**:
```jsx
// Badge.jsx - 12 linhas ✅
export const Badge = ({ variant = 'default', children }) => {
  return (
    <span className={`badge badge--${variant}`}>
      {children}
    </span>
  );
};
```

---

### 2. **Molecules** (Moléculas) - ≤35 linhas

**Definição**: Combinação de 2+ átomos que formam uma unidade funcional simples.

**Exemplos**:
- FormField (Label + Input)
- StatCard (Icon + Value + Label)
- SearchInput (Icon + Input)
- ColorSwatch (Box + Label + Code)
- MetricCard (Title + Value + Progress)

**Regras**:
- Máximo de **35 linhas de código**
- Combina 2-4 átomos
- Lógica de apresentação simples
- Estado local permitido (se necessário)
- Props bem definidas

**Exemplo**:
```jsx
// StatCard.jsx - 28 linhas ✅
export const StatCard = ({ icon, value, label, change }) => {
  return (
    <div className="stat-card">
      <div className="stat-card__header">
        <div>
          <div className="stat-card__value">{value}</div>
          <div className="stat-card__label">{label}</div>
        </div>
        <div className="stat-card__icon">
          {icon}
        </div>
      </div>
      <div className={`stat-card__change stat-card__change--${change.type}`}>
        <Icon name={change.type === 'positive' ? 'arrow-up' : 'arrow-down'} />
        <span>{change.value}</span>
      </div>
    </div>
  );
};
```

---

### 3. **Organisms** (Organismos) - ≤50 linhas

**Definição**: Seções complexas da interface que combinam moléculas e átomos.

**Exemplos**:
- DataTable (Header + Rows + Pagination)
- Navigation Bar (Logo + Menu + Actions)
- ColorPalette (Grid de ColorSwatches)
- Dashboard Grid (Multiple StatCards)
- Kanban Column (Header + Cards + Actions)

**Regras**:
- Máximo de **50 linhas de código**
- Combina múltiplas moléculas
- Pode ter lógica de negócio moderada
- Gerenciamento de estado complexo
- Props tipadas e validadas

**Exemplo**:
```jsx
// DataTable.jsx - 45 linhas ✅
export const DataTable = ({ columns, data, onSort, onEdit }) => {
  const [sortBy, setSortBy] = useState(null);

  const handleSort = (column) => {
    setSortBy(column);
    onSort(column);
  };

  return (
    <div className="data-table">
      <div className="data-table__header">
        <h3>Últimos Eventos</h3>
        <Button onClick={onEdit}>Novo Evento</Button>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} onClick={() => handleSort(col.key)}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <TableRow key={row.id} data={row} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

---

### 4. **Templates** (Templates) - ≤30 linhas

**Definição**: Estruturas de página que definem o layout geral.

**Exemplos**:
- DashboardLayout (Sidebar + Header + Content)
- AuthLayout (Centered Box)
- TwoColumnLayout (Main + Sidebar)

**Regras**:
- Máximo de **30 linhas de código**
- Apenas estrutura de layout
- Não contém lógica de negócio
- Children components via props
- CSS Grid ou Flexbox

**Exemplo**:
```jsx
// DashboardLayout.jsx - 18 linhas ✅
export const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <TopBar />
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
};
```

---

## 🎨 CSS & Styling Standards

### Design Tokens Obrigatórios

```css
:root {
  /* STAGETEK Brand Colors */
  --stagetek-red-primary: #e90101;
  --stagetek-red-medium: #862128;
  --stagetek-red-dark: #63141a;
  --stagetek-white: #fbfafb;
  --stagetek-black: #000000;
  --stagetek-gray: #727272;

  /* Typography */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 40px;
  --font-size-4xl: 48px;
  --font-size-5xl: 60px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### CSS Naming Convention (BEM)

```css
/* Block */
.stat-card { }

/* Element */
.stat-card__header { }
.stat-card__value { }
.stat-card__label { }

/* Modifier */
.stat-card--compact { }
.stat-card__change--positive { }
```

### Gradientes e Efeitos

**✅ USAR**:
```css
/* Gradiente sutil para ícones */
background: linear-gradient(135deg, rgba(233, 1, 1, 0.1) 0%, rgba(134, 33, 40, 0.05) 100%);
border: 2px solid rgba(233, 1, 1, 0.2);

/* Hover suave */
transition: all 0.3s ease;
transform: translateY(-4px);
```

**❌ NÃO USAR**:
```css
/* Cores sólidas chapadas */
background: #e90101;

/* Gradientes muito fortes */
background: linear-gradient(#e90101, #000);
```

---

## 📁 Estrutura de Arquivos

```
src/
├── components/
│   ├── atoms/
│   │   ├── Badge.jsx          (≤20 linhas)
│   │   ├── Button.jsx         (≤20 linhas)
│   │   ├── Input.jsx          (≤20 linhas)
│   │   └── Avatar.jsx         (≤20 linhas)
│   ├── molecules/
│   │   ├── FormField.jsx      (≤35 linhas)
│   │   ├── StatCard.jsx       (≤35 linhas)
│   │   └── SearchInput.jsx    (≤35 linhas)
│   ├── organisms/
│   │   ├── DataTable.jsx      (≤50 linhas)
│   │   ├── Navbar.jsx         (≤50 linhas)
│   │   └── Dashboard.jsx      (≤50 linhas)
│   └── templates/
│       ├── DashboardLayout.jsx (≤30 linhas)
│       └── AuthLayout.jsx      (≤30 linhas)
├── pages/
│   ├── Dashboard.jsx
│   ├── Clientes.jsx
│   └── Eventos.jsx
├── hooks/
│   ├── useAuth.js
│   └── useFetch.js
├── utils/
│   ├── formatters.js
│   └── validators.js
└── tokens/
    ├── colors.js
    ├── spacing.js
    └── typography.js
```

---

## 🚫 Proibições

### ❌ **NUNCA FAÇA**:

1. **Componentes gigantes**
   ```jsx
   // ❌ 200 linhas - PROIBIDO
   export const Dashboard = () => {
     // ... 200 linhas de código
   };
   ```

2. **Emojis como ícones**
   ```html
   <!-- ❌ PROIBIDO -->
   <div>🚀 Rápido</div>
   <div>🎨 Bonito</div>
   ```

3. **Cores hardcoded**
   ```css
   /* ❌ PROIBIDO */
   color: #e90101;

   /* ✅ CORRETO */
   color: var(--stagetek-red-primary);
   ```

4. **Múltiplas responsabilidades**
   ```jsx
   // ❌ PROIBIDO - faz busca, filtra E renderiza
   export const ClientList = () => {
     const [clients, setClients] = useState([]);
     useEffect(() => { fetchClients() }, []);
     const filtered = clients.filter(c => c.active);
     return <table>...</table>;
   };
   ```

5. **Classes CSS inline**
   ```jsx
   // ❌ PROIBIDO
   <div style={{ color: 'red', fontSize: '16px' }}>

   // ✅ CORRETO
   <div className="stat-card__value">
   ```

---

## ✅ Best Practices

### 1. **Single Responsibility**
```jsx
// ✅ CORRETO - cada componente faz UMA coisa
const UserAvatar = ({ user }) => <Avatar src={user.avatar} />;
const UserName = ({ user }) => <span>{user.name}</span>;
const UserEmail = ({ user }) => <span>{user.email}</span>;

// ❌ ERRADO - faz tudo
const UserCard = ({ user }) => {
  return (
    <div>
      <Avatar src={user.avatar} />
      <span>{user.name}</span>
      <span>{user.email}</span>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};
```

### 2. **Props Validation**
```jsx
// ✅ CORRETO
Badge.propTypes = {
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  children: PropTypes.node.isRequired
};
```

### 3. **TypeScript First**
```tsx
// ✅ CORRETO
interface StatCardProps {
  value: string | number;
  label: string;
  icon: ReactNode;
  change?: {
    value: string;
    type: 'positive' | 'negative';
  };
}

export const StatCard: React.FC<StatCardProps> = ({ value, label, icon, change }) => {
  // ...
};
```

### 4. **Design Tokens Always**
```jsx
// ✅ CORRETO
<div style={{
  padding: 'var(--space-4)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--stagetek-red-primary)'
}}>
```

---

## 📊 Code Quality Metrics

### Métricas Obrigatórias

| Métrica | Target | Ferramenta |
|---------|--------|------------|
| Line Limit (Atoms) | ≤20 | ESLint |
| Line Limit (Molecules) | ≤35 | ESLint |
| Line Limit (Organisms) | ≤50 | ESLint |
| Line Limit (Templates) | ≤30 | ESLint |
| TypeScript Coverage | 100% | tsc --strict |
| CSS Custom Props | 100% | Stylelint |
| Component Tests | ≥80% | Jest + RTL |
| Accessibility (WCAG) | AA | axe-core |

---

## 🔄 Code Review Checklist

Antes de aprovar qualquer PR, verificar:

- [ ] Todos os componentes respeitam limites de linhas
- [ ] Zero emojis como ícones (usar SVG)
- [ ] 100% CSS Custom Properties (sem hardcode)
- [ ] Nomes de classes seguem BEM
- [ ] Props com PropTypes ou TypeScript
- [ ] Componentes com Single Responsibility
- [ ] Zero lógica de negócio em Atoms
- [ ] Gradientes sutis (não cores chapadas)
- [ ] Dark mode suportado
- [ ] Mobile responsive
- [ ] Footer com Protocol Notecraft™

---

## 📝 Exemplos Completos

### Exemplo 1: Atom Perfeito

```tsx
// Badge.tsx - 15 linhas ✅
import './Badge.css';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'stagetek';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'stagetek',
  children
}) => {
  return (
    <span className={`badge badge--${variant}`}>
      {children}
    </span>
  );
};
```

### Exemplo 2: Molecule Perfeito

```tsx
// StatCard.tsx - 32 linhas ✅
import { Badge } from '../atoms/Badge';
import './StatCard.css';

interface StatCardProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  change?: {
    value: string;
    type: 'positive' | 'negative';
  };
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  change
}) => {
  return (
    <div className="stat-card">
      <div className="stat-card__header">
        <div>
          <div className="stat-card__value">{value}</div>
          <div className="stat-card__label">{label}</div>
        </div>
        <div className="stat-card__icon">{icon}</div>
      </div>
      {change && (
        <div className={`stat-card__change stat-card__change--${change.type}`}>
          <Badge variant={change.type === 'positive' ? 'success' : 'error'}>
            {change.value}
          </Badge>
        </div>
      )}
    </div>
  );
};
```

---

## 🎯 Conformidade

**Todo código que não segue Protocol Notecraft™ será rejeitado no Code Review.**

### Penalidades:
- 1ª violação: Warning + refactor obrigatório
- 2ª violação: PR bloqueado + reunião 1:1
- 3ª violação: Treinamento Protocol Notecraft™ obrigatório

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
**© 2025 STAGETEK. All rights reserved.**
