# 🎨 PLANO DE REVISÃO FRONTEND - STAGETEK CRM

**Data de criação:** 20 Novembro 2025
**Objetivo:** Eliminar erros de fonte, inconsistências visuais e violations de Protocol Notecraft™
**Estimativa total:** 3-4 horas
**Status:** Pronto para começar

---

## 📌 CONTEXTO DA ÚLTIMA SESSÃO

### ✅ O QUE FOI FEITO (Commit: f6f4c3f)

#### P0 - Bugs Críticos (4/4) - 100% ✅
- [x] **P0-1**: Dashboard mockado → Dados reais do Supabase
  - Criados 4 hooks: `useStats`, `useRecentOpportunities`, `useSalesChart`, `useFunnelChart`
  - Integrado Recharts para gráficos
  - StatsGrid + OpportunitiesTable com dados reais
- [x] **P0-2**: Inconsistência zipCode ✅ (verificado - ok)
- [x] **P0-3**: Campo owner_id ✅ (verificado - usando assigned_to)
- [x] **P0-4**: Link Produtos ausente ✅ (verificado - existe)

#### P1 - Bugs Importantes (3/10) - 30% ✅
- [x] **P1-1**: Busca multi-campo + CNPJ APIs
  - Integrado Brasil API (primary) + ReceitaWS (fallback)
  - Hook `useCNPJSearch` + biblioteca `cnpjUtils`
  - Query OR em `useClientes` (name/cnpj/email)
  - Autocomplete de dados da empresa
- [x] **P1-6**: owner_name inexistente → fetch via `supabase.auth.getUser()`
- [x] **P1-7**: Toast de erro nos catch blocks (Funil + Oportunidades)

#### P2 - Protocol Violations (1/6) - 17% ✅
- [x] **P2-1**: Emoji ❤️ → `<Heart />` (Lucide icon)

#### Refatoração Notecraft™
- [x] 5 arquivos refatorados para atender limites de linhas
- [x] 9 novos arquivos criados (hooks + moléculas)
- [x] 100% compliance com Protocol Notecraft™
- [x] Deploy em produção bem-sucedido

---

## 🎯 O QUE VAMOS FAZER AMANHÃ

### 🔍 FASE 1: Análise Automática (30min)

**Objetivo:** Mapear todos os problemas visuais do frontend

**Tarefas:**
```bash
# 1. Executar agente de exploração
Task tool com subagent_type='Explore'

# 2. Focar em:
- Erros de carregamento de fontes
- Inconsistências tipográficas
- Componentes quebrados visualmente
- Violations de Protocol Notecraft™
- Problemas de responsividade

# 3. Gerar relatório estruturado
- P0: UI totalmente quebrada
- P1: Degradação visual significativa
- P2: Inconsistências menores
- P3: Melhorias estéticas
```

**Áreas de investigação:**
- [ ] `src/components/atoms/**/*.tsx` (limite: 30 linhas)
- [ ] `src/components/molecules/**/*.tsx` (limite: 50 linhas)
- [ ] `src/components/organisms/**/*.tsx` (limite: 75 linhas)
- [ ] `src/pages/**/*.tsx` (limite: 200 linhas)
- [ ] `src/index.css` (Tailwind config, fonts)
- [ ] `index.html` (Google Fonts import)

---

### 🔤 FASE 2: Correção de Fontes e Tipografia (1h)

**Problemas conhecidos:**
- Verificar se Inter está carregando do Google Fonts
- Inconsistências de tamanho entre componentes
- Pesos de fonte (font-weight) não padronizados
- Line-height e letter-spacing

**Checklist:**
- [ ] Verificar `index.html` - link do Google Fonts
- [ ] Verificar `tailwind.config.js` - família de fontes
- [ ] Verificar `src/index.css` - @font-face ou @import
- [ ] Padronizar hierarquia:
  - [ ] H1: text-2xl/3xl/4xl font-bold
  - [ ] H2: text-xl/2xl font-semibold
  - [ ] H3: text-lg font-semibold
  - [ ] Body: text-sm/base font-normal
  - [ ] Caption: text-xs font-normal
- [ ] Verificar todos os componentes:
  - [ ] Dashboard
  - [ ] Clientes
  - [ ] ClienteModal
  - [ ] Oportunidades
  - [ ] OportunidadeModal
  - [ ] Funil (Kanban)
  - [ ] DetalheOportunidade
  - [ ] Cotações
  - [ ] Configurações
  - [ ] ConfigFunis

**Solução esperada:**
```css
/* index.css ou tailwind.config.js */
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

---

### 🎨 FASE 3: Correção de Componentes Visuais (1-1.5h)

**P1 - Bugs Visuais Pendentes:**

#### P1-3: Avatar quebra quando cliente é null
**Arquivo:** `src/components/molecules/OpportunityRow.tsx:17`
```typescript
// PROBLEMA:
const avatar = client.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

// SOLUÇÃO:
const avatar = client ? client.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??'
```

**Outros arquivos afetados:**
- [ ] ClientCard.tsx
- [ ] OpportunityCard.tsx
- [ ] Avatar.tsx (component atom)

#### P2-2 a P2-6: Emojis restantes
- [ ] **P2-2**: 🎯 em `ClientCard.tsx` → Target icon
- [ ] **P2-3**: 💰 em `QuoteCard.tsx` → DollarSign icon
- [ ] **P2-4**: 📄 em `QuoteCard.tsx` → FileText icon
- [ ] **P2-5**: 📧 em `QuoteCard.tsx` → Mail icon
- [ ] **P2-6**: 🎨 em `ConfigFunis.tsx` → Palette icon

**Comando de busca:**
```bash
grep -r "🎯\|💰\|📄\|📧\|🎨" src/
```

**Checklist de glassmorphism:**
- [ ] Verificar `backdrop-blur-lg` funcionando
- [ ] Verificar `bg-[rgba(255,255,255,0.08)]`
- [ ] Verificar `border border-white/15`
- [ ] Verificar sombras: `shadow-2xl`, `shadow-lg`

---

### 📱 FASE 4: Responsividade (30min)

**Breakpoints Tailwind:**
```
sm: 640px   (mobile landscape)
md: 768px   (tablet)
lg: 1024px  (desktop small)
xl: 1280px  (desktop medium)
2xl: 1536px (desktop large)
```

**Teste em cada breakpoint:**
- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 12/13)
- [ ] 768px (iPad)
- [ ] 1024px (Desktop small)
- [ ] 1920px (Desktop FHD)

**Componentes críticos:**
- [ ] Sidebar/Menu (mobile hamburger)
- [ ] Dashboard grid (4 cols → 2 cols → 1 col)
- [ ] Funil Kanban (scroll horizontal em mobile)
- [ ] Modais (max-width em desktop, full em mobile)
- [ ] Tabelas (scroll horizontal se necessário)

**Padrão mobile-first:**
```tsx
// ✅ CORRETO
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">

// ❌ ERRADO
<div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
```

---

### ♿ FASE 5: Acessibilidade (30min)

**WCAG AAA Contrast Ratio:**
- Text normal: 7:1
- Text grande: 4.5:1

**Checklist:**
- [ ] Verificar contraste de cores:
  - [ ] `text-gray-400` em `bg-black` ✅/❌
  - [ ] `text-white` em `bg-[#e90101]` ✅/❌
  - [ ] `text-gray-300` em `bg-gray-900` ✅/❌
- [ ] ARIA labels em ícones sem texto
- [ ] Focus visible em inputs/buttons
- [ ] Navegação por teclado (Tab order)
- [ ] Alt text em ícones decorativos

**Ferramenta de teste:**
```bash
# Lighthouse audit no Chrome DevTools
# ou
npm install -g @axe-core/cli
axe http://localhost:5174
```

---

### ✅ FASE 6: Validação e Deploy (30min)

**Checklist pré-commit:**
```bash
# 1. Validar Protocol Notecraft™
npm run validate:notecraft

# 2. Lint
npm run lint

# 3. Type check
npm run type-check

# 4. Build test
npm run build

# 5. Pre-commit hooks
git add .
git commit -m "fix(ui): corrigir fontes, emojis e inconsistências visuais

Correções:
- Padronizar tipografia Inter em todos os componentes
- Substituir emojis restantes por Lucide icons (P2-2 a P2-6)
- Corrigir avatar null em OpportunityRow (P1-3)
- Melhorar responsividade em breakpoints mobile
- Adicionar ARIA labels para acessibilidade

Protocol Notecraft™: 100% compliance
WCAG: AAA contrast ratio

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# 6. Push
git push origin main

# 7. Verificar deploy Vercel
# https://stagetek-crm-system.vercel.app
```

**Smoke tests em produção:**
- [ ] Dashboard carrega sem erros
- [ ] Fontes carregando corretamente
- [ ] Ícones renderizando (não emojis)
- [ ] Modais abrem/fecham
- [ ] Responsivo em mobile
- [ ] Sem erros no console

---

## 🛠️ COMANDOS ÚTEIS

```bash
# Servidor de desenvolvimento
npm run dev
# → http://localhost:5174/

# Validações
npm run validate:notecraft  # Protocol compliance
npm run lint                # ESLint
npm run type-check          # TypeScript
npm run build               # Production build

# Git
git status
git diff
git add .
git commit -m "mensagem"
git push origin main

# Buscar problemas
grep -r "emoji\|🎯\|💰\|📄\|📧\|🎨" src/  # Emojis
grep -r "owner_id\|owner_name" src/       # Campos inexistentes
grep -r "zipcode" src/                    # Inconsistências
grep -r "style={{" src/                   # CSS inline (violation)
```

---

## 📊 MÉTRICAS DE SUCESSO

**Metas para fim da revisão:**

```
✅ Protocol Notecraft™: 100% compliance
✅ Emojis no código: 0
✅ TypeScript `any`: 0
✅ CSS inline: 0
✅ Fonte Inter: carregando em 100% dos componentes
✅ Contraste WCAG AAA: >95% dos textos
✅ Lighthouse Score: >85 (mobile)
✅ Bundle size: <500KB gzipped
✅ Responsivo: 320px - 1920px sem quebras
✅ Erros no console (prod): 0
```

---

## 📝 BUGS RESTANTES (Para referência)

### P1 - Alta Prioridade (7 bugs)
- [ ] P1-2: Filtro "Todos Estágios" não funciona (Funil)
- [ ] P1-3: Cliente null quebra avatar (OpportunityRow) 🔥
- [ ] P1-4: Tabs não são rotas navegáveis (DetalheOportunidade)
- [ ] P1-5: Falta validação de CNPJ (ClienteModal) - JÁ TEM ✅
- [ ] P1-8: Botão "Settings" não faz nada (DetalheOportunidade)
- [ ] P1-9: Botão "Ver Todas" duplicado (Dashboard)
- [ ] P1-10: Criar cotação sem produtos quebra PDF (QuoteModal)

### P2 - Protocol Notecraft (5 violations)
- [ ] P2-2: Emoji 🎯 em ClientCard.tsx → Target icon 🔥
- [ ] P2-3: Emoji 💰 em QuoteCard.tsx → DollarSign icon 🔥
- [ ] P2-4: Emoji 📄 em QuoteCard.tsx → FileText icon 🔥
- [ ] P2-5: Emoji 📧 em QuoteCard.tsx → Mail icon 🔥
- [ ] P2-6: Emoji 🎨 em ConfigFunis.tsx → Palette icon 🔥

🔥 = Prioridade para esta sessão

---

## 🚀 PLANO DE AÇÃO SUGERIDO (Amanhã)

**Ordem de execução:**

1. **[10min]** Explorar codebase com Task tool (subagent Explore)
2. **[20min]** Corrigir P2-2 a P2-6 (emojis → ícones) - quick wins
3. **[10min]** Corrigir P1-3 (avatar null)
4. **[30min]** Investigar e corrigir problema de fontes (se houver)
5. **[20min]** Padronizar tipografia em todos os componentes
6. **[20min]** Testar responsividade em breakpoints
7. **[15min]** Adicionar ARIA labels onde necessário
8. **[20min]** Validação final + commit + deploy
9. **[15min]** Smoke tests em produção

**Total estimado: 2h 40min**

---

## 📂 ARQUIVOS A INVESTIGAR

**Alta prioridade:**
```
src/components/molecules/ClientCard.tsx     (emoji 🎯)
src/components/molecules/QuoteCard.tsx      (emojis 💰📄📧)
src/components/molecules/OpportunityRow.tsx (avatar null)
src/pages/ConfigFunis.tsx                   (emoji 🎨)
src/index.css                               (font config)
index.html                                  (Google Fonts link)
tailwind.config.js                          (font family)
```

**Média prioridade:**
```
src/components/atoms/Avatar.tsx
src/pages/Dashboard.tsx
src/pages/DetalheOportunidade.tsx
src/pages/Funil.tsx
src/components/organisms/ClienteModal.tsx
```

---

## 🎓 REFERÊNCIAS

**Protocol Notecraft™:**
- Atoms: ≤30 linhas
- Molecules: ≤50 linhas
- Organisms: ≤75 linhas
- Pages: ≤200 linhas
- Zero emojis (usar Lucide icons)
- Zero TypeScript `any`
- Zero CSS inline
- Mobile-first obrigatório

**Design System:**
- Cor primária: `#e90101` (STAGETEK red)
- Background: `#0a0a0a` (black)
- Glassmorphism: `bg-[rgba(255,255,255,0.08)] backdrop-blur-lg`
- Fonte: Inter (Google Fonts)
- Ícones: Lucide React

**Links úteis:**
- Lucide Icons: https://lucide.dev/icons
- Tailwind Docs: https://tailwindcss.com/docs
- WCAG Contrast Checker: https://webaim.org/resources/contrastchecker/

---

**Criado por:** Claude Code
**Última atualização:** 20 Nov 2025 - 02:50 UTC
**Próxima ação:** Executar Fase 1 (Análise Automática)
**Status:** 🟢 Pronto para começar

**Servidor dev:** http://localhost:5174/
**Branch:** main
**Último commit:** f6f4c3f (7 bug fixes deployed)
