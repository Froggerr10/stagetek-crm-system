# Epic 8: UX Mobile Completa

**Epic ID**: EPIC-008
**Status**: 🟡 In Progress (30% completo)
**Priority**: 🔴 P0 - Critical
**RICE Score**: 16.0 (Reach: 5 | Impact: 8.0 | Confidence: 100% | Effort: 10 dias)

---

## 📊 Sumário Executivo

### Contexto
O STAGETEK CRM foi desenvolvido com abordagem mobile-first, mas várias telas complexas precisam de **ajustes específicos para dispositivos móveis** (touch targets, layouts responsivos, navegação otimizada).

Com base em testes reais em dispositivos móveis, identificamos **10 telas** que precisam de revisão UX para garantir experiência equivalente ao desktop.

### Objetivo
Revisar e otimizar TODAS as telas do CRM para mobile, garantindo:
- ✅ Touch targets adequados (mínimo 44x44px)
- ✅ Layouts responsivos sem scroll horizontal
- ✅ Navegação intuitiva em telas pequenas
- ✅ Performance fluida (60fps)

### Impacto no Negócio
- 📱 **60% dos vendedores** usam CRM em campo (mobile)
- ⏱️ **Redução de fricção**: Menos cliques para ações comuns
- 💰 **Adoção maior**: Vendedores usam mais se mobile funciona bem

---

## 🎯 Objetivos de Negócio

### Problema
Vendedores em campo enfrentam:
- Botões pequenos demais (difícil clicar com dedos)
- Layouts quebrados em telas <768px
- Scroll horizontal indesejado
- Ações importantes escondidas (hover não funciona em touch)

### Solução
- Revisar 100% das telas para mobile
- Aplicar iOS/Android design guidelines
- Testes em dispositivos reais (iPhone, Android)

### Métricas de Sucesso
- ✅ Lighthouse Mobile Score >85
- ✅ 0 scroll horizontal em telas <768px
- ✅ Touch targets 100% compliance (≥44px)
- ✅ 90% de satisfação dos usuários mobile

---

## 📋 User Stories (10 telas)

### ✅ Grupo 1: Já Mapeadas (Stories Criadas)

#### Story 8.1: Detalhe Oportunidade Mobile ✅ Draft
**Status**: ⏳ Não implementado
**Estimativa**: 2-3 horas
**Arquivo**: `docs/stories/8.1.detalhe-oportunidade-mobile.md`

**Problemas**:
- Layout 3 colunas quebra em mobile
- Tabs com scroll horizontal
- Botões de ação muito pequenos

**Soluções**:
- Layout flex com order utilities (stack vertical mobile)
- Tabs grid 3x2 (não scroll)
- Dropdown menu "Ações ▾" em mobile

---

#### Story 8.2: Funil Kanban Mobile ✅ Draft
**Status**: ⏳ Não implementado
**Estimativa**: 1-2 horas
**Arquivo**: `docs/stories/8.2.funil-kanban-mobile.md`

**Problemas**:
- Scroll horizontal sem affordance visual
- FilterBar fixa ocupa 80px verticais
- Cards pequenos para touch

**Soluções**:
- Gradiente à direita + dots indicator
- FilterBar collapsible (Sheet/Drawer)
- Touch targets aumentados (44x44px)

---

#### Story 8.3: Config Funis Mobile ✅ Draft
**Status**: ⏳ Não implementado
**Estimativa**: 30 min
**Arquivo**: `docs/stories/8.3.config-funis-mobile.md`

**Problemas**:
- Botões Edit/Delete aparecem apenas no hover (não funciona em touch)
- Pipeline vertical sem ações

**Soluções**:
- Botões sempre visíveis em mobile
- Context menu com long-press (alternativa)

---

### 🔴 Grupo 2: Faltam Mapear (Stories a Criar)

#### Story 8.4: Dashboard Mobile ⏳ Criar
**Estimativa**: 1-2 horas
**Prioridade**: P0

**Tela**: `src/pages/Dashboard.tsx` ou `DashboardApple.tsx`

**Problemas a Investigar**:
- [ ] Cards de métricas (4 cards) quebram layout em mobile?
- [ ] Gráficos Recharts responsivos?
- [ ] Tabela de oportunidades recentes com scroll horizontal?

**Soluções Possíveis**:
- Cards stack vertical em mobile (grid-cols-1)
- Gráficos com aspect ratio adequado
- Tabela → Lista de cards em mobile

---

#### Story 8.5: Clientes Mobile ⏳ Criar
**Estimativa**: 1-2 horas
**Prioridade**: P0

**Tela**: `src/pages/Clientes.tsx`

**Problemas a Investigar**:
- [ ] DataTable com muitas colunas → scroll horizontal?
- [ ] SearchBar + botões de ação ocupam muito espaço vertical?
- [ ] Modal ClienteModal responsivo?

**Soluções Possíveis**:
- Desktop: DataTable (atual)
- Mobile: Lista de cards (ClientCard já existe)
- SearchBar sticky no topo
- Modal fullscreen em mobile (<768px)

---

#### Story 8.6: Oportunidades Mobile ⏳ Criar
**Estimativa**: 1 hora
**Prioridade**: P0

**Tela**: `src/pages/Oportunidades.tsx`

**Problemas a Investigar**:
- [ ] Similar a Clientes: DataTable vs Cards?
- [ ] Filtros ocupam muito espaço vertical?
- [ ] Quick actions visíveis?

**Soluções Possíveis**:
- Lista de cards em mobile
- Filtros collapsible (Sheet)
- Quick actions como botão flutuante (FAB)

---

#### Story 8.7: Cotações Mobile ⏳ Criar
**Estimativa**: 2-3 horas
**Prioridade**: P1

**Telas**:
- `src/pages/Cotacoes.tsx` (lista)
- `src/pages/NovaCotacao.tsx` (formulário)

**Problemas a Investigar**:
- [ ] Lista de cotações salvas responsiva?
- [ ] Formulário NovaCotacao: muitos campos quebram layout?
- [ ] Tabela de produtos selecionados com scroll horizontal?
- [ ] Preview PDF mobile?

**Soluções Possíveis**:
- Lista: cards responsivos
- Formulário: accordion para agrupar campos (Dados Cliente | Produtos | Frete)
- Tabela produtos: cards empilhados em mobile
- Preview PDF: modal fullscreen

---

#### Story 8.8: Config Produtos Mobile ⏳ Criar
**Estimativa**: 1 hora
**Prioridade**: P2

**Tela**: `src/pages/ConfigProdutos.tsx`

**Problemas a Investigar**:
- [ ] Tabela de produtos com muitas colunas?
- [ ] Botões de ação visíveis?
- [ ] Modal de criação/edição responsivo?

**Soluções Possíveis**:
- Lista de cards em mobile
- Botões Edit/Delete sempre visíveis
- Modal fullscreen

---

#### Story 8.9: Config Usuários Mobile ⏳ Criar
**Estimativa**: 1 hora
**Prioridade**: P2

**Tela**: `src/pages/ConfigUsuarios.tsx`

**Problemas a Investigar**:
- [ ] Lista de usuários responsiva?
- [ ] Formulário de criação/edição adequado?

**Soluções Possíveis**:
- Cards de usuários
- Modal fullscreen

---

#### Story 8.10: Perfil e Configurações Mobile ⏳ Criar
**Estimativa**: 30 min
**Prioridade**: P2

**Telas**:
- `src/pages/Perfil.tsx`
- `src/pages/Configuracoes.tsx`

**Problemas a Investigar**:
- [ ] Formulários de configuração responsivos?
- [ ] Toggle switches adequados para touch?

**Soluções Possíveis**:
- Formulários stack vertical
- Switches com touch targets adequados (44x44px)

---

### ✅ Grupo 3: Provavelmente OK (Validar)

#### Story 8.11: Login Mobile ✅ Provavelmente OK
**Estimativa**: 15 min (validação)
**Prioridade**: P2

**Tela**: `src/pages/Login.tsx`

**Por Que Provavelmente OK?**
- Login geralmente é mobile-first por padrão
- Poucos campos (email, senha, botão)
- Layout simples

**Ação**: Validar em dispositivo real, ajustar se necessário

---

## 🏗️ Arquitetura Técnica

### Padrões Comuns (Todas as Stories)

#### 1. Responsive Breakpoints
```typescript
// Tailwind breakpoints do projeto
sm: 640px   // Raramente usado
md: 768px   // Tablet portrait
lg: 1024px  // Desktop small
xl: 1280px  // Desktop large
2xl: 1536px // Desktop XL

// Padrão mobile-first
<div className="
  // Mobile (<768px)
  grid grid-cols-1 gap-4

  // Tablet (≥768px)
  md:grid-cols-2

  // Desktop (≥1024px)
  lg:grid-cols-3
">
```

#### 2. Touch Targets
```typescript
// iOS/Android guideline: mínimo 44x44px
// Tailwind: p-3 + w-5 h-5 = ~44px

// ❌ Ruim
<button className="p-1">
  <Icon className="w-4 h-4" />
</button>

// ✅ Bom
<button className="p-3">
  <Icon className="w-5 h-5" />
</button>
```

#### 3. Modais Fullscreen
```typescript
// Desktop: Modal centralizado (max-w-2xl)
// Mobile: Fullscreen (h-full w-full)

<Dialog>
  <DialogContent className="
    // Mobile
    h-full w-full max-w-full m-0 rounded-none

    // Desktop
    md:h-auto md:w-auto md:max-w-2xl md:m-4 md:rounded-lg
  ">
    {/* Content */}
  </DialogContent>
</Dialog>
```

#### 4. Tabelas → Cards
```typescript
// Desktop: DataTable (shadcn/ui)
<div className="hidden md:block">
  <DataTable columns={columns} data={data} />
</div>

// Mobile: Lista de cards
<div className="md:hidden space-y-4">
  {data.map(item => (
    <Card key={item.id}>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Campos importantes */}
      </CardContent>
      <CardFooter>
        <Button>Ações</Button>
      </CardFooter>
    </Card>
  ))}
</div>
```

#### 5. Filtros Collapsible
```typescript
// Desktop: Sticky no topo
<div className="hidden md:block sticky top-0 z-20">
  <FilterBar />
</div>

// Mobile: Sheet/Drawer
<div className="md:hidden">
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" className="w-full">
        <Filter className="w-4 h-4 mr-2" />
        Filtros {count > 0 && `(${count})`}
      </Button>
    </SheetTrigger>
    <SheetContent side="bottom" className="h-[80vh]">
      <FilterBar />
    </SheetContent>
  </Sheet>
</div>
```

---

## 📊 Roadmap de Implementação

### Fase 1: Core Pages (Críticas) - 1 semana
**Stories**: 8.1, 8.2, 8.4, 8.5, 8.6
**Esforço**: 8-10 horas
**Prioridade**: P0

Páginas mais usadas por vendedores:
- ✅ Dashboard (métricas diárias)
- ✅ Funil Kanban (gestão visual)
- ✅ Clientes (busca e cadastro)
- ✅ Oportunidades (lista)
- ✅ Detalhe Oportunidade (mais complexa)

---

### Fase 2: Secondary Pages - 3 dias
**Stories**: 8.3, 8.7
**Esforço**: 4-5 horas
**Prioridade**: P1

Páginas importantes mas menos frequentes:
- ✅ Config Funis (administração)
- ✅ Cotações (criação e gestão)

---

### Fase 3: Admin Pages - 2 dias
**Stories**: 8.8, 8.9, 8.10
**Esforço**: 2-3 horas
**Prioridade**: P2

Páginas administrativas (uso esporádico):
- ✅ Config Produtos
- ✅ Config Usuários
- ✅ Perfil e Configurações

---

### Fase 4: Validação Final - 1 dia
**Story**: 8.11
**Esforço**: 1 hora
**Prioridade**: P2

- ✅ Validar Login mobile
- ✅ Testes finais em dispositivos reais
- ✅ Lighthouse audit mobile (target >85)

---

## 📈 RICE Score por Fase

### Fase 1: Core Pages
- **Reach**: 5 usuários × 80% uso = 4.0
- **Impact**: 8/10 (páginas mais críticas)
- **Confidence**: 100%
- **Effort**: 10 horas
- **RICE**: (4.0 × 8 × 1.0) / 10 = **3.2 por hora** = **32.0 total**

### Fase 2: Secondary Pages
- **Reach**: 5 × 50% = 2.5
- **Impact**: 7/10
- **Confidence**: 95%
- **Effort**: 5 horas
- **RICE**: (2.5 × 7 × 0.95) / 5 = **3.3 por hora** = **16.6 total**

### Fase 3: Admin Pages
- **Reach**: 2 usuários (admins)
- **Impact**: 5/10
- **Confidence**: 90%
- **Effort**: 3 horas
- **RICE**: (2 × 5 × 0.9) / 3 = **3.0 por hora** = **9.0 total**

**Epic Total RICE**: 57.6 (Muito Alto)

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| **Testes apenas em emulador** | Alta | Médio | Testar em 2+ dispositivos reais |
| **Touch interactions complexas** | Média | Alto | Simplificar interações, evitar hover |
| **Performance em dispositivos low-end** | Baixa | Alto | Lazy load, throttle, debounce |
| **Regressão desktop** | Média | Crítico | Testes A/B, validação desktop após mudanças |

---

## 🧪 Checklist de Validação Mobile

### Para Cada Story

**Layout**:
- [ ] Sem scroll horizontal em 375px, 390px, 768px
- [ ] Elementos stack vertical em mobile
- [ ] Padding adequado (px-4 ou px-6)

**Touch Targets**:
- [ ] Botões ≥ 44x44px
- [ ] Ícones com padding adequado (p-3)
- [ ] Links com área de toque adequada

**Performance**:
- [ ] Lighthouse Mobile Score ≥ 85
- [ ] First Contentful Paint < 2s
- [ ] Cumulative Layout Shift < 0.1

**Usabilidade**:
- [ ] Ações principais acessíveis em ≤3 toques
- [ ] Feedback visual em todos os toques
- [ ] Teclado virtual não esconde campos importantes

**Acessibilidade**:
- [ ] ARIA labels em botões de ícone
- [ ] Contraste adequado (WCAG AA)
- [ ] Navegação por teclado funcional

---

## 📚 Recursos e Referências

### Design Guidelines
- [iOS Human Interface Guidelines - Touch Targets](https://developer.apple.com/design/human-interface-guidelines/inputs/touchscreen-gestures)
- [Material Design - Touch Targets](https://material.io/design/usability/accessibility.html#layout-and-typography)
- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

### Ferramentas de Teste
- Chrome DevTools (Device Mode)
- Firefox Responsive Design Mode
- BrowserStack (testes cross-device)
- Lighthouse CI (audit automático)

### Componentes shadcn/ui Úteis
- `Sheet` - Drawer lateral/inferior
- `Dialog` - Modal fullscreen mobile
- `DropdownMenu` - Menus de ação
- `ContextMenu` - Long-press actions

---

## 🎯 Próximos Passos

### Imediato (Hoje)
1. ✅ Epic 8 criado e mapeado
2. ✅ 3 stories já existem (8.1, 8.2, 8.3)
3. ⏳ Identificar próxima story a trabalhar

### Curto Prazo (Esta Semana)
4. ⏳ Criar Story 8.4 (Dashboard Mobile)
5. ⏳ Criar Story 8.5 (Clientes Mobile)
6. ⏳ Implementar Fase 1 (Core Pages)

### Médio Prazo (2 Semanas)
7. ⏳ Implementar Fase 2 (Secondary Pages)
8. ⏳ Implementar Fase 3 (Admin Pages)
9. ⏳ Validação final com usuários reais

---

## 📝 Status Atual

### Stories Criadas: 3/11 (27%)
- ✅ 8.1: Detalhe Oportunidade Mobile
- ✅ 8.2: Funil Kanban Mobile
- ✅ 8.3: Config Funis Mobile

### Stories Pendentes: 8/11 (73%)
- ⏳ 8.4: Dashboard Mobile
- ⏳ 8.5: Clientes Mobile
- ⏳ 8.6: Oportunidades Mobile
- ⏳ 8.7: Cotações Mobile
- ⏳ 8.8: Config Produtos Mobile
- ⏳ 8.9: Config Usuários Mobile
- ⏳ 8.10: Perfil/Configurações Mobile
- ⏳ 8.11: Login Mobile (validação)

### Implementadas: 0/11 (0%)
Todas as stories estão em Draft.

---

## 🔗 Arquivos Relacionados

### Epics
- `docs/prd/epic-6-integracao-omie-erp.md` - Integração Omie (mapeado para futuro)
- `docs/prd/epic-8-mobile-ux-complete.md` - Este arquivo

### Stories Existentes
- `docs/stories/8.1.detalhe-oportunidade-mobile.md`
- `docs/stories/8.2.funil-kanban-mobile.md`
- `docs/stories/8.3.config-funis-mobile.md`

### Architecture
- `docs/architecture/tech-stack.md`
- `docs/architecture/coding-standards.md`
- `docs/DESIGN-SYSTEM.md`

---

**Epic criado por**: James (Full Stack Developer)
**Data**: 12 de Dezembro de 2025
**Status**: In Progress (27% stories criadas, 0% implementadas)
**Próxima ação**: Criar stories 8.4-8.11 e começar implementação Fase 1
