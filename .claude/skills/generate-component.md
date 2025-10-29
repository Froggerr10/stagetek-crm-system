# Generate Protocol Notecraft™ Component

Gera componentes React TypeScript que respeitam 100% o Protocol Notecraft™ (limites de linhas, Tailwind CSS, mobile-first).

## Instructions

Você é um gerador de componentes especializado em Protocol Notecraft™. Sua tarefa é criar componentes que SEMPRE respeitam os limites de linhas.

### Inputs Necessários

1. **Component Name** (ex: EmailComposer, FilterBar, Banner)
2. **Component Type** (atom | molecule | organism | template)
3. **Brief Description** (1-2 frases do que o componente faz)
4. **Props** (opcional - lista de props necessárias)

### Protocol Notecraft™ Rules (STRICT)

```typescript
// Limites de Linhas (NUNCA EXCEDER)
Atom: ≤20 linhas
Molecule: ≤35 linhas
Organism: ≤50 linhas
Template: ≤30 linhas

// TypeScript Strict
- SEMPRE tipar props com interface
- NUNCA usar `any`
- Usar React.FC<Props> ou function syntax

// Tailwind CSS (OBRIGATÓRIO)
- NUNCA usar CSS inline (style={{ ... }})
- SEMPRE usar Tailwind classes
- Mobile-first: usar breakpoints (sm:, md:, lg:)

// Imports
- React primeiro
- Libs externas segundo
- Internal libs terceiro
- Components quarto
- Types por último
```

### Workflow de Geração

#### Step 1: Consultar Coding Standards
```bash
Read docs/architecture/coding-standards.md (linhas 1-150)
```

#### Step 2: Consultar Source Tree (Evitar Duplicação)
```bash
Read docs/architecture/source-tree.md
# Buscar se componente similar já existe
```

#### Step 3: Calcular Orçamento de Linhas

```
Orçamento Total: {limite do tipo}
- Imports: ~4 linhas
- Interface Props: ~5 linhas
- Component Declaration: 1 linha
- Return/JSX: {resto}
- Export: 1 linha

Exemplo Molecule (≤35):
- Imports: 4
- Props: 5
- Component: 1
- JSX: 24 ← MÁXIMO DISPONÍVEL
- Export: 1
Total: 35 linhas
```

#### Step 4: Gerar Código

**Template Base**:

```typescript
import React from 'react'
import { X } from 'lucide-react' // Se precisar ícones
import { Button } from '@/components/atoms' // Se precisar outros components

interface {ComponentName}Props {
  prop1: string
  prop2?: number
  onAction?: () => void
}

export const {ComponentName}: React.FC<{ComponentName}Props> = ({
  prop1,
  prop2,
  onAction
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* JSX aqui - máximo {orçamento} linhas */}
      <h2 className="text-lg font-semibold">{prop1}</h2>
      <Button onClick={onAction}>Action</Button>
    </div>
  )
}
```

#### Step 5: Estratégias de Compactação (Se Exceder Limite)

**Se componente exceder limite, aplicar estratégias**:

1. **Extrair Sub-componentes** (preferido):
```typescript
// ❌ ERRADO (45 linhas em molecule)
export const EmailComposer = () => {
  return (
    <div>
      <div className="header">...</div> {/* 10 linhas */}
      <div className="body">...</div> {/* 20 linhas */}
      <div className="footer">...</div> {/* 10 linhas */}
    </div>
  )
}

// ✅ CORRETO (3 molecules de 15 linhas cada)
// EmailComposerHeader.tsx (15 linhas)
// EmailComposerBody.tsx (20 linhas)
// EmailComposerFooter.tsx (10 linhas)
// EmailComposer.tsx (15 linhas) ← composition
```

2. **Usar Children Pattern**:
```typescript
// Ao invés de passar 10 props, usar children
<EmailComposer>
  <EmailComposerHeader title="..." />
  <EmailComposerBody />
</EmailComposer>
```

3. **Extrair Lógica para Hooks**:
```typescript
// ❌ ERRADO (lógica no componente)
export const FilterBar = () => {
  const [filters, setFilters] = useState({}) // 5 linhas de lógica
  const handleFilterChange = () => {} // 10 linhas
  // ...
}

// ✅ CORRETO (lógica no hook)
// hooks/useFilterBar.ts
export const useFilterBar = () => {
  // Toda lógica aqui (30 linhas)
}

// FilterBar.tsx (organism ≤50 linhas)
import { useFilterBar } from '@/hooks/useFilterBar'
export const FilterBar = () => {
  const { filters, handleFilterChange } = useFilterBar()
  // Só JSX (20 linhas)
}
```

#### Step 6: Validar Linha por Linha

Contar linhas EXCLUINDO:
- Linhas em branco
- Comentários simples (// ...)

Contar linhas INCLUINDO:
- Imports
- Interface/Type declarations
- Function declaration
- Return statement
- JSX (cada tag = 1 linha)
- Export statement

#### Step 7: Gerar Arquivo + Contador

```typescript
// src/components/{type}/{ComponentName}.tsx
// Protocol Notecraft™: {linhas_usadas}/{limite} linhas ({percentage}%)

{código gerado}

// Line count: {linhas_usadas}
```

### Output Format

```markdown
## Generated Component: {ComponentName}

**Type**: {atom|molecule|organism|template}
**Path**: `src/components/{type}/{ComponentName}.tsx`
**Lines**: {linhas_usadas}/{limite} ({percentage}%) ✅

**Props**:
- prop1: string (required)
- prop2: number (optional)

**Dependencies**:
- lucide-react (icons)
- @/components/atoms/Button

**Usage Example**:
\`\`\`tsx
import { {ComponentName} } from '@/components/{type}'

<{ComponentName}
  prop1="value"
  prop2={123}
  onAction={() => console.log('clicked')}
/>
\`\`\`

---

### Code

\`\`\`typescript
{código completo gerado}
\`\`\`

---

### Validation

- [x] Lines: {linhas}/{limite} ✅
- [x] TypeScript strict (zero any)
- [x] Tailwind CSS (zero inline styles)
- [x] Mobile-first (breakpoints used)
- [x] Imports ordenados
- [x] Props interface declarada
```

### Exemplo de Uso

```
User: "generate component Banner atom - displays green banner with dismiss button for opportunities <24h"
```
