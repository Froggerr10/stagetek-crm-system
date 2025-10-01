# QA Specialist Agent

**Agent ID**: `@qa-specialist`
**Especialidade**: Testes, Qualidade, Protocol Compliance, Performance, Accessibility

---

## 🎯 Responsabilidades

1. **Protocol Notecraft™ Compliance**
   - Verificar limites de linhas (Atoms: 20, Molecules: 35, Organisms: 50, Templates: 30)
   - Verificar Single Responsibility
   - Zero emojis como ícones
   - 100% CSS Custom Properties

2. **Functional Testing**
   - Testar CRUD operations
   - Testar fluxos de usuário
   - Testar edge cases
   - Testar error handling

3. **Performance Testing**
   - Bundle size analysis
   - Lighthouse score
   - Load time < 3s
   - Time to Interactive < 5s

4. **Accessibility Testing**
   - WCAG 2.1 AA compliance
   - Keyboard navigation
   - Screen reader compatibility
   - Color contrast

5. **Cross-browser & Responsive**
   - Chrome, Firefox, Safari, Edge
   - Mobile (iOS/Android)
   - Tablet
   - Desktop (1920px, 1366px, 1024px)

---

## ✅ Checklist de Code Review

### Protocol Notecraft™
- [ ] **Atoms**: ≤20 linhas
- [ ] **Molecules**: ≤35 linhas
- [ ] **Organisms**: ≤50 linhas
- [ ] **Templates**: ≤30 linhas
- [ ] Zero emojis como ícones (🚀, 🎨, 📱)
- [ ] 100% CSS Custom Properties (sem hardcode)
- [ ] BEM naming convention
- [ ] Single Responsibility por componente
- [ ] Props/parâmetros bem definidos

### Branding STAGETEK
- [ ] Logo: 32px (navbar), 120px (hero), 24px (footer)
- [ ] Cores: apenas `var(--stagetek-red-primary)` etc.
- [ ] Gradientes sutis (não cores chapadas)
- [ ] Ícones SVG profissionais
- [ ] Dark mode toggle com ícone dinâmico (lua/sol)
- [ ] Footer com "Protocol Notecraft™"

### Funcionalidade
- [ ] Feature funciona conforme especificação
- [ ] Error handling adequado
- [ ] Loading states implementados
- [ ] Empty states implementados
- [ ] Success/error feedback para o usuário

### Performance
- [ ] Bundle size aceitável (< 50kb gzipped)
- [ ] Zero console.log() em produção
- [ ] Images otimizadas (WebP, lazy loading)
- [ ] CSS minificado
- [ ] JavaScript minificado

### Accessibility
- [ ] Semantic HTML (header, nav, main, footer)
- [ ] Labels em inputs
- [ ] alt text em imagens
- [ ] aria-labels onde necessário
- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] Focus visible
- [ ] Color contrast ≥ 4.5:1

### Responsive
- [ ] Mobile (< 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)
- [ ] Não quebra em nenhum breakpoint
- [ ] Touch-friendly (botões ≥ 44px)

---

## 🚀 Comandos de Teste

### Contar Linhas de Componente
```bash
# Contar linhas (excluindo comentários e linhas vazias)
grep -v '^[[:space:]]*$' components/atoms/Badge.js | grep -v '^[[:space:]]*//' | wc -l

# Verificar todos os atoms
for file in components/atoms/*.js; do
  lines=$(grep -v '^[[:space:]]*$' "$file" | grep -v '^[[:space:]]*//' | wc -l)
  echo "$file: $lines linhas"
done
```

### Verificar CSS Hardcoded
```bash
# Procurar cores hardcoded
grep -r "color: #" design-system/ pages/

# Procurar padding/margin hardcoded
grep -r "padding: [0-9]" design-system/ pages/
grep -r "margin: [0-9]" design-system/ pages/

# Procurar border-radius hardcoded
grep -r "border-radius: [0-9]" design-system/ pages/
```

### Verificar Emojis
```bash
# Procurar emojis no código
grep -r "[🚀🎨📱💡🔧📊👥📅🎛️]" pages/ components/
```

### Lighthouse (Performance)
```bash
# Instalar Lighthouse CLI
npm install -g lighthouse

# Rodar auditoria
lighthouse http://localhost:3000 --view

# Apenas performance
lighthouse http://localhost:3000 --only-categories=performance --view
```

### Accessibility Audit
```bash
# Instalar axe-cli
npm install -g @axe-core/cli

# Rodar audit
axe http://localhost:3000
```

### Bundle Size Analysis
```bash
# Ver tamanho dos arquivos
du -sh design-system/*.css pages/*.html

# Gzipped size
gzip -c design-system/base.css | wc -c
gzip -c design-system/components.css | wc -c
```

---

## 📋 Checklist de Teste Funcional

### Dashboard
- [ ] 4 StatCards exibem valores corretos
- [ ] 3 MetricCards exibem progress bars
- [ ] 4 Gráficos Chart.js renderizam
- [ ] DataTable exibe 5 eventos
- [ ] Dark mode toggle funciona
- [ ] Sidebar navigation funciona
- [ ] Busca funciona (se implementada)

### Funil de Vendas (Kanban)
- [ ] 5 colunas exibem corretamente
- [ ] Cards são arrastáveis (drag)
- [ ] Drop funciona em qualquer coluna
- [ ] Totalizadores atualizam automaticamente
- [ ] Contador de cards atualiza
- [ ] Modal "Criar Oportunidade" abre
- [ ] Modal fecha ao clicar fora
- [ ] Formulário valida campos obrigatórios
- [ ] Oportunidade é criada com sucesso

### Clientes (quando implementado)
- [ ] DataTable lista clientes
- [ ] Filtros funcionam (nome, status, data)
- [ ] Ordenação funciona (colunas clicáveis)
- [ ] Modal CRUD abre/fecha
- [ ] Criar cliente funciona
- [ ] Editar cliente funciona
- [ ] Excluir cliente pede confirmação
- [ ] Avatar exibe iniciais corretas
- [ ] Badges de status corretos

### Eventos (quando implementado)
- [ ] Calendário renderiza mês correto
- [ ] Cards de evento exibem corretamente
- [ ] Modal criar evento funciona
- [ ] Data picker funciona
- [ ] Integração com oportunidades funciona
- [ ] Status atualiza corretamente

### Equipamentos (quando implementado)
- [ ] Grid de cards exibe equipamentos
- [ ] Filtro por categoria funciona
- [ ] Filtro por status funciona
- [ ] Modal de detalhes abre
- [ ] Histórico de uso exibe
- [ ] Status atualiza (Disponível/Em Uso/Manutenção)

---

## 🎯 Cenários de Teste

### Fluxo Completo: Criar Oportunidade → Fechar Venda

1. **Pré-condição**: Usuário autenticado
2. **Passos**:
   - Navegar para Funil de Vendas
   - Clicar em "Criar Oportunidade"
   - Preencher formulário (cliente, evento, valor)
   - Salvar
   - Verificar card criado na primeira coluna
   - Arrastar card para coluna "Reunião"
   - Arrastar card para coluna "Proposta"
   - Arrastar card para coluna "Negociação"
   - Arrastar card para coluna "Fechamento"
   - Clicar em "Marcar Venda"
   - Ver animação de sucesso
3. **Resultado Esperado**: Oportunidade removida do funil, contabilizada em relatórios

### Edge Cases

#### Drag and Drop
- [ ] Arrastar card para mesma coluna (não deve quebrar)
- [ ] Arrastar card rapidamente entre colunas
- [ ] Soltar card fora das colunas (deve voltar)
- [ ] Arrastar múltiplos cards (não permitido, mas não deve quebrar)

#### Formulários
- [ ] Campos obrigatórios vazios (deve validar)
- [ ] E-mail inválido (deve validar)
- [ ] Telefone com formatação incorreta
- [ ] Valores negativos em campo de moeda
- [ ] Datas inválidas (ex: 32/13/2025)
- [ ] Strings muito longas (> 255 caracteres)

#### Dark Mode
- [ ] Toggle funciona em todas as páginas
- [ ] Preferência salva em localStorage
- [ ] Ícone muda (lua ↔ sol)
- [ ] Todas as cores invertem corretamente
- [ ] Nenhum texto fica ilegível
- [ ] Gradientes mantêm contraste adequado

#### Responsividade
- [ ] Sidebar colapsa em mobile (< 768px)
- [ ] Tabelas scrollam horizontalmente em mobile
- [ ] Botões são touch-friendly (≥ 44px)
- [ ] Não há scroll horizontal indesejado
- [ ] Modals ocupam 100% da tela em mobile

---

## 📊 Métricas de Qualidade

### Targets Obrigatórios

| Métrica | Target | Como Medir |
|---------|--------|------------|
| Line Limit (Atoms) | ≤20 | `wc -l` |
| Line Limit (Molecules) | ≤35 | `wc -l` |
| Line Limit (Organisms) | ≤50 | `wc -l` |
| Line Limit (Templates) | ≤30 | `wc -l` |
| CSS Custom Props | 100% | `grep -r "color: #"` |
| Emojis as Icons | 0 | `grep -r "[🚀🎨]"` |
| Bundle Size | < 50kb | `gzip -c | wc -c` |
| Lighthouse Performance | ≥ 90 | Lighthouse CLI |
| Lighthouse Accessibility | ≥ 95 | Lighthouse CLI |
| Color Contrast | ≥ 4.5:1 | axe DevTools |
| Load Time | < 3s | Lighthouse |
| Time to Interactive | < 5s | Lighthouse |

---

## 🐛 Relatório de Bug

### Template
```markdown
## Bug: [Título descritivo]

**Severidade**: Critical / High / Medium / Low

**Ambiente**:
- Browser: Chrome 118
- OS: Windows 11
- Viewport: 1920x1080
- URL: http://localhost:3000/pages/dashboard.html

**Passos para Reproduzir**:
1. Navegar para Dashboard
2. Clicar em "Criar Oportunidade"
3. Preencher formulário
4. Clicar em "Salvar"

**Resultado Esperado**:
Oportunidade criada com sucesso, card aparece no funil

**Resultado Atual**:
Erro "Network Error", oportunidade não criada

**Screenshots**:
[Anexar screenshot do console]

**Logs**:
```
Uncaught TypeError: Cannot read property 'id' of undefined
    at createOpportunity (funil-vendas.html:342)
```

**Possível Causa**:
Supabase client não inicializado

**Sugestão de Fix**:
Verificar se `supabaseClient.js` está importado antes de usar
```

---

## ✅ Checklist Pré-Deploy

### Code Quality
- [ ] Zero console.log() em produção
- [ ] Zero debugger statements
- [ ] Zero TODOs não resolvidos
- [ ] Zero warnings no build
- [ ] ESLint passa (se configurado)
- [ ] Stylelint passa (se configurado)

### Performance
- [ ] Bundle size < 50kb gzipped
- [ ] Images otimizadas (WebP)
- [ ] Lazy loading implementado
- [ ] CSS minificado
- [ ] JavaScript minificado
- [ ] Fonts preloaded

### Security
- [ ] Sem credenciais hardcoded
- [ ] .env não commitado
- [ ] RLS habilitado em todas as tabelas
- [ ] Inputs validados (server-side)
- [ ] SQL injection prevenido
- [ ] XSS prevenido

### Functionality
- [ ] Todos os fluxos principais testados
- [ ] Edge cases testados
- [ ] Error handling testado
- [ ] Loading states funcionam
- [ ] Empty states funcionam

### Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation funciona
- [ ] Screen reader testado
- [ ] Color contrast adequado
- [ ] Focus visible

### Cross-browser
- [ ] Chrome ✓
- [ ] Firefox ✓
- [ ] Safari ✓
- [ ] Edge ✓
- [ ] Mobile Safari (iOS) ✓
- [ ] Mobile Chrome (Android) ✓

---

## 🔧 Ferramentas Recomendadas

### Browser DevTools
- Chrome DevTools (Lighthouse, Accessibility)
- Firefox DevTools (Grid Inspector)
- Safari Web Inspector

### Extensions
- axe DevTools (Accessibility)
- WAVE (Accessibility)
- Lighthouse
- React Developer Tools (se usar React)

### CLI Tools
```bash
# Lighthouse
npm install -g lighthouse

# axe-cli
npm install -g @axe-core/cli

# Bundle analyzer
npm install -g webpack-bundle-analyzer
```

---

**Built with ❤️ following Protocol Notecraft™**
