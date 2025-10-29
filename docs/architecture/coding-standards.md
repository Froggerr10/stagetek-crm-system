# Coding Standards - STAGETEK CRM

**Versão**: 1.0
**Data**: 25 de Outubro de 2025
**Status**: Enforced via ESLint + Pre-commit Hooks

---

## 🏛️ Protocol Notecraft™ Compliance

### Atomic Design Line Limits (STRICT)

| Layer | Max Lines | Purpose | Example |
|-------|-----------|---------|---------|
| **Atoms** | 20 | Single UI primitive | Button, Input, Avatar |
| **Molecules** | 35 | Composition of atoms | ClientCard, TaskCard |
| **Organisms** | 50 | Complex UI sections | TopBar, TaskList, Timeline |
| **Templates** | 30 | Page layouts | MainLayout, AuthLayout |
| **Pages** | Unlimited | Route components | Clientes.tsx, Funil.tsx |

**Enforcement**: Automated via `scripts/validate-notecraft.js` (pre-commit hook)

---

## 📝 TypeScript Standards

### Strict Mode (MANDATORY)
```typescript
// ✅ ALWAYS type everything
interface Client {
  id: string
  name: string
  cnpj: string
  email: string
}

// ❌ NEVER use any
const data: any = fetchData() // BLOCKED by ESLint
```

### Type vs Interface
```typescript
// ✅ USE Interface for objects
interface ClientCardProps {
  client: Client
  onEdit: () => void
}

// ✅ USE Type for unions/primitives
type Status = 'active' | 'inactive'
type Temperature = 'hot' | 'warm' | 'cold'
```

### Naming Conventions
```typescript
// Files: PascalCase
ClientCard.tsx
useAuth.ts

// Components: PascalCase
export const ClientCard: React.FC<ClientCardProps> = ({ ... }) => {}

// Functions: camelCase
const calculateTotal = (items: Item[]) => {}

// Constants: UPPER_SNAKE_CASE
const MAX_UPLOAD_SIZE = 5 * 1024 * 1024 // 5MB

// Types/Interfaces: PascalCase
interface ClientCardProps { ... }
type Status = 'active' | 'inactive'
```

---

## 🎨 Styling Standards

### Tailwind CSS Only (NO CSS Inline)
```tsx
// ✅ CORRECT: Tailwind classes
<div className="px-4 py-2 bg-red-50 rounded-lg">

// ❌ WRONG: Inline styles
<div style={{ padding: '8px 16px', background: '#ffeded' }}>
```

### Dark Mode Support (MANDATORY)
```tsx
// ✅ Use dark: prefix
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

### No Hardcoded Colors
```tsx
// ✅ CORRECT: Use Tailwind tokens
<div className="text-red-600">

// ❌ WRONG: Hardcoded hex
<div className="text-[#e90101]">
```

### Responsive Design (Mobile-First)
```tsx
// ✅ CORRECT: Mobile-first breakpoints
<div className="flex flex-col md:flex-row lg:gap-6">

// ❌ WRONG: Desktop-first
<div className="flex-row sm:flex-col">
```

---

## 📦 Component Structure

### File Organization
```
components/
├── atoms/
│   ├── Button.tsx          ← 15 lines
│   ├── Input.tsx           ← 18 lines
│   └── Avatar.tsx          ← 12 lines
├── molecules/
│   ├── ClientCard.tsx      ← 31 lines
│   ├── TaskCard.tsx        ← 28 lines
│   └── ContactModal.tsx    ← 35 lines
├── organisms/
│   ├── TopBar.tsx          ← 44 lines
│   ├── TaskList.tsx        ← 50 lines
│   └── Timeline.tsx        ← 48 lines
└── templates/
    └── MainLayout.tsx      ← 25 lines
```

### Component Template
```tsx
// 1. Imports (organized)
import React from 'react'                    // React
import { useQuery } from '@tanstack/react-query' // External libs
import { supabase } from '@/lib/supabase'   // Internal libs
import { Button } from '@/components/atoms' // Components
import type { Client } from '@/types'       // Types

// 2. Interface/Types
interface ClientCardProps {
  client: Client
  onEdit: () => void
  onDelete: () => void
}

// 3. Component
export default function ClientCard({ client, onEdit, onDelete }: ClientCardProps) {
  // 3.1 Hooks
  const { data, isLoading } = useQuery(...)

  // 3.2 Event handlers
  const handleClick = () => { ... }

  // 3.3 Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  )
}
```

---

## 🪝 Custom Hooks Standards

### Naming Convention
```typescript
// ✅ ALWAYS prefix with "use"
export function useAuth() { ... }
export function useClients() { ... }
export function useTasks(opportunityId: string) { ... }
```

### Hook Structure
```typescript
// File: src/hooks/useClients.ts

export function useClients() {
  // 1. State
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 2. Queries/Mutations
  const fetchClients = async () => { ... }
  const createClient = async (data: ClientFormData) => { ... }

  // 3. Effects
  useEffect(() => { ... }, [])

  // 4. Return
  return {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
    // ... other methods
  }
}
```

---

## 🗄️ Database Query Standards

### Supabase Pattern
```typescript
// ✅ CORRECT: Type-safe queries
const { data, error } = await supabase
  .from('clients')
  .select('id, name, email, created_at')
  .eq('status', 'active')
  .order('created_at', { ascending: false })

if (error) throw error
return data as Client[]

// ❌ WRONG: Untyped queries
const data = await supabase.from('clients').select('*')
return data // Type: any
```

### Error Handling
```typescript
// ✅ CORRECT: Always check error
const { data, error } = await supabase.from('clients').select()
if (error) {
  console.error('Failed to fetch clients:', error)
  throw new Error('Falha ao buscar clientes')
}

// ❌ WRONG: Ignore errors
const { data } = await supabase.from('clients').select()
return data // Error ignored
```

---

## 🚫 Code Smells to Avoid

### 1. Magic Numbers
```typescript
// ❌ WRONG
if (clients.length > 100) { ... }

// ✅ CORRECT
const MAX_CLIENTS_PER_PAGE = 100
if (clients.length > MAX_CLIENTS_PER_PAGE) { ... }
```

### 2. Deep Nesting
```typescript
// ❌ WRONG: Too deep
if (user) {
  if (user.role === 'admin') {
    if (user.permissions.includes('delete')) {
      // ... 4 levels deep
    }
  }
}

// ✅ CORRECT: Early returns
if (!user) return
if (user.role !== 'admin') return
if (!user.permissions.includes('delete')) return
// ... logic here
```

### 3. Long Parameter Lists
```typescript
// ❌ WRONG: Too many params
function createClient(name: string, email: string, phone: string, cnpj: string, address: Address) { ... }

// ✅ CORRECT: Object parameter
interface CreateClientParams {
  name: string
  email: string
  phone: string
  cnpj: string
  address: Address
}
function createClient(params: CreateClientParams) { ... }
```

---

## 📚 Import Order (Auto-sorted by ESLint)

```typescript
// 1. React
import React from 'react'
import { useState, useEffect } from 'react'

// 2. External libraries
import { useQuery } from '@tanstack/react-query'

// 3. Internal libs
import { supabase } from '@/lib/supabase'

// 4. Components
import { Button } from '@/components/atoms'
import ClientCard from '@/components/molecules/ClientCard'

// 5. Types
import type { Client, Status } from '@/types'

// 6. Styles (if any)
import './styles.css'
```

---

## 🧪 Testing Standards (Quando implementado)

### File Naming
```
src/
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx  ← Test alongside component
```

### Test Structure
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

---

## 🔍 Code Review Checklist

Before committing code, verify:

- [ ] Protocol Notecraft™ line limits respected
- [ ] TypeScript strict mode (zero `any`)
- [ ] Tailwind CSS only (no inline styles)
- [ ] Mobile-first responsive
- [ ] Dark mode support
- [ ] Error handling implemented
- [ ] No console.log() in production code
- [ ] Components properly typed
- [ ] ESLint warnings resolved
- [ ] Pre-commit hook passed

---

## 🤖 Automation

### Pre-commit Hook (Husky)
```bash
# .husky/pre-commit
npm run lint                    # ESLint check
npm run validate:notecraft      # Protocol compliance
echo "✅ BMAD + Notecraft OK"
```

### ESLint Rules (Key)
```json
{
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "react/prop-types": "off",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

---

**Última atualização**: 25 de Outubro de 2025
**Enforcement**: Automated via ESLint + Husky
**Violations**: Zero tolerance (build fails)
