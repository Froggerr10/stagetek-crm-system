# STAGETEK CRM - Design System Specification

**Versão**: 1.0
**Data**: 30 de Outubro de 2025
**Status**: **ENFORCED** - Seguir rigorosamente
**Última auditoria**: 30 Out 2025 (6 páginas corrigidas)

---

## 🎨 Dark Glassmorphism Design System

### **REGRA NÚMERO 1: NUNCA adicionar background em páginas**

**❌ ERRADO**:
```tsx
// NÃO FAÇA ISSO!
<div className="min-h-screen bg-gray-50">  // ❌
<div className="bg-gradient-to-br from-gray-900 via-black to-gray-900">  // ❌
```

**✅ CORRETO**:
```tsx
// MainLayout JÁ TEM o background!
<div className="p-8">  // ✅ Apenas padding
```

**MOTIVO**: O `MainLayout.tsx` já define:
- Background: `radial-gradient(circle at top left, #1a0a0a, #0a0a0a)`
- STAGETEK red glow effects
- Dot grid pattern
- TopBar inclusa

---

## 🏗️ Estrutura de Páginas

### **Template Padrão**

```tsx
// src/pages/MinhaPage.tsx
import { Link } from 'react-router-dom'  // ✅ Use Link, não <a href>
import { ChevronRight } from 'lucide-react'

export default function MinhaPage() {
  return (
    <div className="p-8">  {/* ✅ SEM background próprio! */}

      {/* Breadcrumb (opcional) */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/dashboard" className="hover:text-stagetek-red transition">
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white font-medium">Minha Página</span>
      </div>

      {/* Título */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Minha Página</h1>
      </div>

      {/* Conteúdo */}
      {/* ... */}
    </div>
  );
}
```

---

## 🎨 Padrões Visuais

### **1. Cores (Dark Mode)**

| Elemento | Classe | Uso |
|----------|--------|-----|
| **Título principal** | `text-white` | H1, títulos de cards |
| **Subtítulo/label** | `text-gray-300` | Labels, subtítulos |
| **Texto secundário** | `text-gray-400` | Descrições, metadados |
| **Texto desabilitado** | `text-gray-500` | Placeholders, disabled |
| **Link hover** | `hover:text-stagetek-red` | Links interativos |
| **Primary action** | `bg-stagetek-red` | Botões principais |
| **Hover action** | `hover:bg-stagetek-red-medium` | Hover de botões |

**❌ NUNCA use**:
- `text-gray-900` (muito escuro para dark mode)
- `text-gray-600` (baixo contraste)
- `text-black` (invisível)

### **2. Glassmorphism Pattern**

**Cards/Containers**:
```tsx
<div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg">
  {/* Conteúdo */}
</div>
```

**Hover effect** (opcional):
```tsx
<div className="... hover:border-stagetek-red transition-all">
```

### **3. Inputs & Forms**

```tsx
<Input
  className="bg-white/8 border-white/15 text-white placeholder:text-gray-500"
  placeholder="Digite aqui..."
/>
```

### **4. Select Dropdowns**

```tsx
<Select>
  <SelectTrigger className="bg-white/8 border-white/15 text-white">
    <SelectValue placeholder="Selecione" />
  </SelectTrigger>
  <SelectContent className="bg-gray-900 border-white/15">
    <SelectItem value="1">Opção 1</SelectItem>
  </SelectContent>
</Select>
```

### **5. Buttons**

```tsx
// Primary
<Button className="bg-stagetek-red hover:bg-stagetek-red-medium text-white">
  Ação Principal
</Button>

// Secondary/Ghost
<Button variant="ghost" className="text-gray-300 hover:text-white">
  Cancelar
</Button>

// Outline
<Button variant="outline" className="border-white/15 text-white hover:bg-white/5">
  Visualizar
</Button>
```

### **6. Empty States**

```tsx
<div className="text-center py-12 bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg">
  <Inbox className="h-12 w-12 text-gray-400 mx-auto mb-4" />
  <p className="text-gray-300 mb-4">Nenhum item encontrado</p>
  <Button asChild className="bg-stagetek-red hover:bg-stagetek-red-medium">
    <Link to="/criar">Criar primeiro item</Link>
  </Button>
</div>
```

### **7. Loading States (Skeletons)**

```tsx
<Skeleton className="h-48 rounded-lg bg-white/5" />
```

---

## 🚫 Anti-Patterns (O que NUNCA fazer)

| ❌ Errado | ✅ Correto | Motivo |
|----------|-----------|--------|
| `<TopBar />` na página | (remover) | MainLayout já tem |
| `bg-gray-50` | (sem bg) | Conflita com dark mode |
| `bg-white` | `bg-[rgba(255,255,255,0.08)]` | Glassmorphism |
| `border-gray-200` | `border-white/15` | Contraste correto |
| `text-gray-900` | `text-white` | Dark mode |
| `<a href="/...">` | `<Link to="/...">` | React Router |
| `bg-[#e90101]` | `bg-stagetek-red` | Use tokens |
| `min-h-screen bg-gradient-to-br` | `p-8` | Background duplicado |

---

## 📐 Tailwind Config (Tokens)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'stagetek-red': '#e90101',
        'stagetek-red-medium': '#c10101',
        'stagetek-red-dark': '#a00000',
      }
    }
  }
}
```

---

## 🔒 Enforcement

### **1. Pre-commit Hook**

Adicione ao `package.json`:
```json
{
  "scripts": {
    "validate:design": "node scripts/validate-design-system.js"
  }
}
```

### **2. ESLint Rules** (Futuro)

```js
// .eslintrc.js
rules: {
  'no-restricted-syntax': [
    'error',
    {
      selector: 'JSXAttribute[name.name="className"][value.value=/bg-gray-50|bg-white(?!\\/)| text-gray-900|text-black/]',
      message: 'Use dark mode colors. See docs/DESIGN-SYSTEM.md'
    }
  ]
}
```

### **3. Checklist de Code Review**

- [ ] Página NÃO tem background próprio?
- [ ] Usa `text-white` e `text-gray-XXX` (300-500)?
- [ ] Cards usam glassmorphism pattern?
- [ ] Links usam `<Link to>` do react-router-dom?
- [ ] Botões usam tokens `stagetek-red`?
- [ ] Inputs/Selects têm `bg-white/8 border-white/15`?

---

## 📚 Exemplos Completos

### **Página Completa**

```tsx
// src/pages/MeuModulo.tsx
import { Link } from 'react-router-dom';
import { ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MeuModulo() {
  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/dashboard" className="hover:text-stagetek-red transition">
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white font-medium">Meu Módulo</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Meu Módulo</h1>
          <p className="text-gray-400 mt-1">Descrição do módulo</p>
        </div>
        <Button className="bg-stagetek-red hover:bg-stagetek-red-medium text-white">
          <Plus className="h-4 w-4 mr-2" />
          Novo Item
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg p-4 mb-6">
        {/* Filtros aqui */}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Cards aqui */}
      </div>
    </div>
  );
}
```

### **Card Component**

```tsx
// src/components/molecules/MeuCard.tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MeuCard({ item }) {
  return (
    <Card className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border-white/15 hover:border-stagetek-red transition-all">
      <CardHeader>
        <h3 className="font-semibold text-white">{item.title}</h3>
        <p className="text-sm text-gray-400">{item.subtitle}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{item.description}</p>
      </CardContent>
      <CardFooter className="border-t border-white/10">
        <Button variant="outline" size="sm">Ver Detalhes</Button>
      </CardFooter>
    </Card>
  );
}
```

---

## 🎯 Páginas Auditadas (30 Out 2025)

| Página | Status | Problemas Corrigidos |
|--------|--------|----------------------|
| ✅ Clientes.tsx | OK | - |
| ✅ Oportunidades.tsx | OK | - |
| ✅ Dashboard.tsx | OK | - |
| ✅ Cotacoes.tsx | **CORRIGIDO** | TopBar duplicada, bg-gray-50, cores escuras |
| ✅ NovaCotacao.tsx | **CORRIGIDO** | Background duplicado |
| ✅ Funil.tsx | **CORRIGIDO** | Background duplicado, hardcoded #e90101 |
| ✅ QuotationsFilterBar.tsx | **CORRIGIDO** | bg-white, border-gray-200 |
| ✅ QuotationCard.tsx | **CORRIGIDO** | Glassmorphism, cores claras |
| ✅ QuotationList.tsx | **CORRIGIDO** | Empty state dark, skeleton |

---

## 📞 Contato

**Dúvidas sobre o Design System?**
- Consulte este documento ANTES de criar novos componentes
- Use os exemplos acima como referência
- Em caso de dúvida, siga o padrão das páginas auditadas

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
