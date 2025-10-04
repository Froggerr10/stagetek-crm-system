# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-10-02

### 🚀 REBOOT COMPLETO - React + TypeScript + Storybook

**Contexto**: Migração de HTML estático para aplicação React moderna seguindo Protocol Notecraft™.

### Added

#### Configuração do Projeto
- **package.json**: React 18.3.1, TypeScript 5.6.2, Vite 5.4.6
- **Storybook 8.3.2**: Preview isolado de componentes
- **Vitest 2.1.1**: Framework de testes com React Testing Library
- **Tailwind CSS 3.4.12**: Design system com tokens STAGETEK
- **ESLint 8.57.1**: Linting com TypeScript support

#### Estrutura de Arquivos
- `tsconfig.json`: TypeScript strict mode + path aliases (@/atoms, @/molecules, @/organisms)
- `vite.config.ts`: Configuração Vite com plugin React
- `tailwind.config.js`: Design tokens STAGETEK (red: #e90101, red-medium: #862128, red-dark: #63141a)
- `postcss.config.js`: PostCSS + Autoprefixer
- `.storybook/main.ts`: Configuração Storybook com React Vite
- `.storybook/preview.ts`: Preview com Tailwind CSS

#### Estrutura src/ (Atomic Design)
```
src/
├── components/
│   ├── atoms/       (≤20 linhas cada)
│   ├── molecules/   (≤35 linhas cada)
│   ├── organisms/   (≤50 linhas cada)
│   └── templates/   (≤30 linhas cada)
├── pages/
├── hooks/
├── lib/
├── types/
└── test/
    └── setup.ts     (Vitest + React Testing Library)
```

#### Entry Points
- `index.html`: HTML5 com <div id="root">
- `src/main.tsx`: React.StrictMode + ReactDOM.createRoot
- `src/App.tsx`: Componente raiz
- `src/index.css`: Tailwind directives + CSS variables STAGETEK

### Changed
- **Versão**: 1.0.0 → 2.0.0
- **Arquitetura**: HTML estático → React SPA
- **Build tool**: http-server → Vite
- **Styling**: CSS puro → Tailwind CSS
- **Testing**: Manual → Vitest + React Testing Library
- **Component preview**: Browser manual → Storybook

### Workflow Implementado
1. **Planejamento**: Usuário aprova escopo do componente
2. **Implementação**: Código + testes respeitando limites de linhas
3. **Preview**: Storybook localhost:6006
4. **Aprovação**: Usuário testa e aprova (✅/🔄/❌)
5. **Integração**: Merge após aprovação

### Migration Notes
- HTML mockups preservados em `.superdesign/design_iterations/` (referência)
- `index.html` antigo backup em `index.html.backup`
- Próximo componente: **Button.tsx** (Atom, ≤20 linhas)

### Dependencies (488 packages instalados)

**Production**:
- react@18.3.1
- react-dom@18.3.1
- clsx@2.1.1
- tailwind-merge@2.5.2
- lucide-react@0.445.0

**Development**:
- @vitejs/plugin-react@4.3.1
- typescript@5.6.2
- vite@5.4.6
- eslint@8.57.1
- tailwindcss@3.4.12
- @storybook/react@8.3.2
- @storybook/react-vite@8.3.2
- vitest@2.1.1
- @testing-library/react@16.0.1
- @testing-library/jest-dom@6.5.0

### Protocol Notecraft™ Compliance
✅ Atomic Design structure
✅ Strict line limits per layer
✅ TypeScript strict mode (zero `any`)
✅ Component-first development
✅ Test-driven approach
✅ Iterative approval workflow

---

## [1.0.0] - 2025-09-30

### Added
- HTML mockups iniciais (.superdesign/design_iterations/)
- Design system base (design-system/base.css, components.css)
- Database schema V1 (supabase/migrations/)
- Protocol Notecraft™ documentation
- RD Station CRM analysis docs

### Deprecated
- HTML estático (migrado para React em v2.0.0)
