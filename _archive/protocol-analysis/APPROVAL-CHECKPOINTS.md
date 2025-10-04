# STAGETEK CRM - Approval Checkpoints & Quality Gates

**Versão**: 1.0.0
**Data**: 3 de Outubro de 2025
**Autor**: QA Lead (Claude Code AI)
**Status**: Ativo

---

## 🎯 Objetivo

Este documento define o **workflow de aprovação**, **critérios de qualidade** e **checkpoints de demonstração** para cada feature do STAGETEK CRM System.

**Princípio**: Cada feature é uma **entrega individual** que deve ser **aprovada pelo usuário** antes da integração.

---

## 📋 Workflow de Aprovação (5 Etapas)

```
┌─────────────┐
│ 1. PLANNING │ → Usuário aprova escopo, props, responsabilidades
└──────┬──────┘
       ↓
┌─────────────────┐
│ 2. IMPLEMENTAÇÃO│ → Código + testes (≤20/35/50 linhas)
└──────┬──────────┘
       ↓
┌─────────────┐
│ 3. PREVIEW  │ → Localhost demo (Storybook/Browser)
└──────┬──────┘
       ↓
┌─────────────┐
│ 4. APROVAÇÃO│ → ✅ OK | 🔄 Ajustar | ❌ Refazer
└──────┬──────┘
       ↓
┌─────────────┐
│ 5. INTEGRAÇÃO│ → Merge após aprovação
└─────────────┘
```

### **Cadência**: 3-5 componentes aprovados por dia (iterações de 2-4h)

---

## ✅ Critérios Universais de Aprovação

**TODOS os checkpoints devem atender a:**

### **1. Protocol Notecraft™ Compliance**
- [ ] Atom ≤20 linhas
- [ ] Molecule ≤35 linhas
- [ ] Organism ≤50 linhas
- [ ] Template ≤30 linhas
- [ ] TypeScript strict (zero `any`)
- [ ] Tailwind CSS (sem CSS inline)
- [ ] Design tokens STAGETEK usados

### **2. Funcionalidade**
- [ ] Feature funciona conforme especificado
- [ ] Sem bugs críticos
- [ ] Edge cases tratados (validação de entrada)
- [ ] Estados de loading/erro implementados

### **3. Responsividade Mobile**
- [ ] Desktop (≥1024px) ✅
- [ ] Tablet (768-1023px) ✅
- [ ] Mobile (≤767px) ✅
- [ ] Touch gestures funcionais
- [ ] Lighthouse Score >85

### **4. Acessibilidade**
- [ ] Contraste WCAG AA (mínimo 4.5:1)
- [ ] Navegação por teclado
- [ ] ARIA labels onde necessário
- [ ] Focus visível

### **5. Performance**
- [ ] Bundle size incremento <50KB
- [ ] Renderização inicial <100ms
- [ ] Sem memory leaks (React DevTools)

---

## 📦 Checkpoints por Feature (P0 - CRÍTICO)

---

## Checkpoint P0.1: Autenticação e Controle de Acesso

**Escopo**: Login, Logout, Sessão, Proteção de Rotas

**Arquivos**:
- `src/pages/Login.tsx`
- `src/hooks/useAuth.ts`
- `src/lib/supabase.ts`

### Critérios de Apresentação (quando mostrar ao usuário):
- [ ] Código implementado e funcional
- [ ] Login com email/senha funcionando
- [ ] Logout limpa sessão
- [ ] Rotas protegidas redirecionam para login
- [ ] UI segue Protocol Notecraft™
- [ ] Mobile responsivo testado

### Perguntas para o Usuário:
1. A tela de login está profissional e alinhada com a marca STAGETEK?
2. A navegação após login faz sentido?
3. O logout funciona corretamente?
4. Faltou alguma funcionalidade crítica (ex: "Esqueci minha senha")?
5. Aprovado para integração?

### Critérios de Aprovação:
- [ ] ✅ Usuário aprovou visualmente
- [ ] 📝 Feedback documentado (se houver)
- [ ] 🔧 Ajustes implementados (se necessário)
- [ ] 🧪 Testes manuais passando:
  - Login com credenciais válidas
  - Login com credenciais inválidas (mostra erro)
  - Logout e redirect para login
  - Acessar rota protegida sem autenticar (redirect)
  - Recuperação de senha (se implementado)

### Demo Script:
**O que mostrar**:
1. Abrir `http://localhost:5173/login`
2. Tentar acessar `/dashboard` sem login → redirect para `/login`
3. Fazer login com email/senha válidos
4. Verificar redirect para `/dashboard`
5. Fazer logout
6. Verificar redirect de volta para `/login`

**Pontos de Atenção**:
- Validação de email (formato correto)
- Senha mínima de 6 caracteres
- Mensagens de erro claras ("Email ou senha incorretos")
- Loading state durante autenticação
- Dark mode funcionando na tela de login

---

## Checkpoint P0.2: CRUD Clientes B2B

**Escopo**: Criar, Ler, Editar, Desativar clientes

**Arquivos**:
- `src/pages/Clientes.tsx`
- `src/components/organisms/ClientTable.tsx`
- `src/components/molecules/ClientCard.tsx`
- `src/components/molecules/ClientForm.tsx`

### Critérios de Apresentação:
- [ ] Lista de clientes renderizando
- [ ] Formulário de criar cliente funcionando
- [ ] Autocomplete CNPJ (brasil-api-mcp) integrado
- [ ] Edição de cliente funcionando
- [ ] Desativação (soft delete) funcionando
- [ ] Busca/filtros funcionando
- [ ] Mobile: cards em vez de tabela
- [ ] UI segue Protocol Notecraft™

### Perguntas para o Usuário:
1. A listagem de clientes está clara?
2. O formulário de cadastro tem todos os campos necessários?
3. A busca por CNPJ automática está funcionando bem?
4. Faltou algum filtro importante?
5. A versão mobile está usável?
6. Aprovado para integração?

### Critérios de Aprovação:
- [ ] ✅ Usuário aprovou
- [ ] 📝 Feedback documentado
- [ ] 🔧 Ajustes implementados
- [ ] 🧪 Testes manuais passando:
  - Criar cliente com CNPJ válido (autocomplete funciona)
  - Criar cliente com CNPJ inválido (mostra erro)
  - Editar cliente existente
  - Desativar cliente (status = "inativo")
  - Buscar cliente por nome
  - Filtrar por status (ativo/inativo)
  - Mobile: arrastar lista, abrir card, editar

### Demo Script:
**O que mostrar**:
1. Abrir `http://localhost:5173/clientes`
2. Clicar em "Novo Cliente"
3. Digitar CNPJ (ex: 00.000.000/0001-91) → autocomplete preenche dados
4. Preencher campos restantes → Salvar
5. Ver cliente na lista
6. Clicar em "Editar" → alterar telefone → Salvar
7. Clicar em "Desativar" → confirmar
8. Verificar badge "Inativo" no card
9. Testar busca por nome
10. Testar em mobile (redimensionar janela)

**Pontos de Atenção**:
- CNPJ autocomplete demora <2s
- Validação de campos obrigatórios (nome, CNPJ, email)
- Máscaras de CNPJ, telefone, CEP
- Avatar com iniciais do cliente
- Badge de status (verde=ativo, vermelho=inativo)

---

## Checkpoint P0.3: CRUD Oportunidades

**Escopo**: Criar, Ler, Editar, Deletar oportunidades

**Arquivos**:
- `src/pages/Oportunidades.tsx`
- `src/components/organisms/OpportunityTable.tsx`
- `src/components/molecules/OpportunityForm.tsx`

### Critérios de Apresentação:
- [ ] Lista de oportunidades renderizando
- [ ] Formulário de criar oportunidade funcionando
- [ ] Campos: título, cliente (dropdown), valor, moeda, estágio, data esperada
- [ ] Conversão de moeda (USD/EUR → BRL) funcionando
- [ ] Edição funcionando
- [ ] Exclusão funcionando
- [ ] Filtros (estágio, cliente, data) funcionando
- [ ] Mobile responsivo

### Perguntas para o Usuário:
1. Os campos do formulário fazem sentido?
2. A conversão de moeda está correta?
3. Faltou algum campo importante (ex: descrição, probabilidade)?
4. Os filtros atendem a necessidade?
5. Aprovado para integração?

### Critérios de Aprovação:
- [ ] ✅ Usuário aprovou
- [ ] 📝 Feedback documentado
- [ ] 🔧 Ajustes implementados
- [ ] 🧪 Testes manuais:
  - Criar oportunidade em BRL
  - Criar oportunidade em USD (verifica conversão)
  - Editar oportunidade (mudar estágio)
  - Deletar oportunidade
  - Filtrar por estágio "Proposta Enviada"
  - Filtrar por cliente específico

### Demo Script:
**O que mostrar**:
1. Abrir `http://localhost:5173/oportunidades`
2. Clicar em "Nova Oportunidade"
3. Preencher:
   - Título: "Venda Estruturas Q30"
   - Cliente: Selecionar da lista
   - Valor: R$ 25.000,00
   - Estágio: "Lead"
   - Data Esperada: 30 dias a partir de hoje
4. Salvar → Ver na lista
5. Editar → Mudar moeda para USD → Salvar → Verificar conversão
6. Testar filtros
7. Deletar oportunidade de teste

**Pontos de Atenção**:
- Dropdown de clientes carrega rápido (cache)
- Conversão de moeda usa taxa atual (API ou fixo?)
- Validação de valor mínimo (ex: >R$ 0)
- Data esperada não pode ser no passado
- Confirmação ao deletar

---

## Checkpoint P0.4: Funil de Vendas (Kanban)

**Escopo**: Visualização Kanban com drag-and-drop

**Arquivos**:
- `src/pages/FunilVendas.tsx`
- `src/components/organisms/KanbanBoard.tsx`
- `src/components/molecules/KanbanColumn.tsx`
- `src/components/molecules/OpportunityCard.tsx`

### Critérios de Apresentação:
- [ ] 5 colunas: Lead, Contato Inicial, Proposta Enviada, Negociação, Fechamento
- [ ] Cards de oportunidade renderizando
- [ ] Drag-and-drop funcionando (desktop)
- [ ] Swipe funcionando (mobile)
- [ ] Totalizador por coluna (R$ total)
- [ ] Contador de oportunidades por coluna
- [ ] Atualização do banco ao mover card
- [ ] Mobile: cards empilhados, swipe left/right

### Perguntas para o Usuário:
1. A visualização do funil está clara?
2. O drag-and-drop está fluido?
3. Os totalizadores estão corretos?
4. Faltou alguma informação nos cards?
5. A versão mobile está usável (swipe)?
6. Aprovado para integração?

### Critérios de Aprovação:
- [ ] ✅ Usuário aprovou
- [ ] 📝 Feedback documentado
- [ ] 🔧 Ajustes implementados
- [ ] 🧪 Testes manuais:
  - Arrastar card de "Lead" para "Contato Inicial"
  - Verificar atualização no banco (refresh → card continua na nova coluna)
  - Verificar totalizador atualizado
  - Mobile: swipe card para mudar coluna
  - Testar com 10+ oportunidades (performance)

### Demo Script:
**O que mostrar**:
1. Abrir `http://localhost:5173/funil-vendas`
2. Visualizar 5 colunas com cards
3. Arrastar card de "Lead" → "Contato Inicial"
4. Ver animação smooth
5. Ver totalizador atualizado
6. Refresh da página → card permanece na nova coluna
7. Mobile: swipe card para esquerda → muda coluna
8. Criar nova oportunidade direto no funil (botão +)

**Pontos de Atenção**:
- Drag-and-drop não trava (smooth 60fps)
- Cards têm avatar, nome cliente, valor, data
- Indicador visual de "drop zone" ao arrastar
- Mobile: swipe com feedback visual
- Loading state ao salvar no banco
- Conflito: 2 usuários movem mesmo card (resolver com timestamp)

---

## Checkpoint P0.5: Dashboard Básico

**Escopo**: Métricas principais e gráficos

**Arquivos**:
- `src/pages/Dashboard.tsx`
- `src/components/organisms/StatsGrid.tsx`
- `src/components/molecules/StatCard.tsx`
- `src/components/molecules/Chart.tsx`

### Critérios de Apresentação:
- [ ] 4 Stat Cards: Total Vendas (mês), Oportunidades Abertas, Taxa Conversão, Ticket Médio
- [ ] Gráfico de linha: Vendas ao longo do tempo
- [ ] Gráfico de pizza: Oportunidades por estágio
- [ ] Tabela: Últimas 5 oportunidades
- [ ] Filtro de período (7 dias, 30 dias, 90 dias, ano)
- [ ] Dark mode toggle funcional
- [ ] Mobile: cards empilhados, gráficos responsivos

### Perguntas para o Usuário:
1. As métricas estão claras e úteis?
2. Os gráficos ajudam a visualizar o negócio?
3. Faltou alguma métrica importante?
4. O filtro de período está funcionando?
5. Aprovado para integração?

### Critérios de Aprovação:
- [ ] ✅ Usuário aprovou
- [ ] 📝 Feedback documentado
- [ ] 🔧 Ajustes implementados
- [ ] 🧪 Testes manuais:
  - Verificar cálculo de "Total Vendas" (mês atual)
  - Verificar "Taxa de Conversão" = fechamentos / total oportunidades
  - Mudar filtro para "7 dias" → gráficos atualizam
  - Toggle dark mode → cores mudam
  - Mobile: scroll vertical, gráficos legíveis

### Demo Script:
**O que mostrar**:
1. Abrir `http://localhost:5173/dashboard`
2. Ver 4 stat cards com valores reais
3. Ver gráfico de vendas (linha) dos últimos 30 dias
4. Ver gráfico de pizza (% por estágio)
5. Ver tabela com últimas 5 oportunidades
6. Clicar filtro "7 dias" → gráficos atualizam
7. Toggle dark mode → verificar contraste
8. Mobile: verificar empilhamento

**Pontos de Atenção**:
- Stat cards têm ícone + título + valor + variação (% vs. mês anterior)
- Gráficos carregam em <2s
- Cores dos gráficos seguem design tokens STAGETEK
- Tooltip ao hover nos gráficos
- Loading skeleton enquanto carrega dados

---

## 📦 Checkpoints por Feature (P1 - ALTA PRIORIDADE)

---

## Checkpoint P1.6: CRUD Produtos (Catálogo)

**Escopo**: Gerenciar catálogo de 50+ produtos

**Arquivos**:
- `src/pages/Produtos.tsx`
- `src/components/organisms/ProductGrid.tsx`
- `src/components/molecules/ProductCard.tsx`
- `src/components/molecules/ProductForm.tsx`

### Critérios de Apresentação:
- [ ] Grid de produtos (3 colunas desktop, 1 coluna mobile)
- [ ] Cards com imagem, nome, SKU, categoria, preço
- [ ] Formulário de criar produto
- [ ] Edição de produto
- [ ] Busca por nome/SKU
- [ ] Filtros (categoria: som/luz/estrutura, faixa de preço)
- [ ] Upload de imagem
- [ ] Multi-moeda (BRL/USD/EUR)

### Perguntas para o Usuário:
1. O catálogo está visualmente atraente?
2. A busca está rápida e eficiente?
3. Faltou algum campo no produto?
4. O upload de imagem está funcionando?
5. Aprovado para integração?

### Critérios de Aprovação:
- [ ] ✅ Usuário aprovou
- [ ] 📝 Feedback documentado
- [ ] 🔧 Ajustes implementados
- [ ] 🧪 Testes manuais:
  - Criar produto com imagem
  - Buscar produto por SKU
  - Filtrar por categoria "Som"
  - Filtrar por faixa de preço (R$ 1.000-5.000)
  - Editar preço de produto
  - Deletar produto

### Demo Script:
**O que mostrar**:
1. Abrir `http://localhost:5173/produtos`
2. Ver grid de produtos existentes
3. Clicar "Novo Produto"
4. Preencher:
   - Nome: "Mesa de Som Behringer X32"
   - SKU: "BEH-X32-001"
   - Categoria: "Som"
   - Preço BRL: R$ 12.000,00
   - Preço USD: $ 2.400,00
   - Imagem: Upload
5. Salvar → Ver card no grid
6. Buscar "X32" → ver resultado
7. Filtrar por "Som" → ver apenas produtos de som
8. Mobile: grid 1 coluna, scroll vertical

**Pontos de Atenção**:
- Upload de imagem com preview
- Imagens comprimidas (<500KB)
- Validação de SKU único
- Preços formatados com moeda (R$, $, €)
- Cards clicáveis para ver detalhes

---

## Checkpoint P1.7: Importação Excel (Produtos + Clientes)

**Escopo**: Upload de planilha e import batch

**Arquivos**:
- `src/pages/Importacao.tsx`
- `src/components/organisms/ExcelImporter.tsx`
- `src/lib/excelParser.ts`

### Critérios de Apresentação:
- [ ] Upload de arquivo .xlsx
- [ ] Preview de dados antes de importar
- [ ] Validação de CNPJ (brasil-api-mcp)
- [ ] Report de erros (linhas inválidas)
- [ ] Barra de progresso durante import
- [ ] Permitir skip de linhas com erro
- [ ] Download de template Excel

### Perguntas para o Usuário:
1. O processo de importação está claro?
2. O preview de dados está útil?
3. As mensagens de erro estão claras?
4. Faltou alguma validação importante?
5. Aprovado para integração?

### Critérios de Aprovação:
- [ ] ✅ Usuário aprovou
- [ ] 📝 Feedback documentado
- [ ] 🔧 Ajustes implementados
- [ ] 🧪 Testes manuais:
  - Importar 10 produtos válidos
  - Importar 10 clientes com 2 CNPJs inválidos → ver erro
  - Skip linhas com erro → importar resto
  - Download template → ver colunas corretas
  - Importar 100+ linhas (performance)

### Demo Script:
**O que mostrar**:
1. Abrir `http://localhost:5173/importacao`
2. Download template Excel
3. Upload arquivo com 10 produtos
4. Ver preview (tabela com dados)
5. Clicar "Importar"
6. Ver barra de progresso
7. Ver relatório: "8 importados, 2 erros"
8. Ver detalhes dos erros (linha 5: CNPJ inválido)
9. Verificar produtos importados na página de produtos

**Pontos de Atenção**:
- Aceita apenas .xlsx (não .xls)
- Validação de colunas obrigatórias
- Parsing de datas PT-BR (dd/mm/yyyy)
- Limite de 1000 linhas por arquivo
- Batch insert (não 1 por 1)

---

## Checkpoint P1.8: Sistema de Cotações

**Escopo**: Criar propostas com produtos e gerar PDF

**Arquivos**:
- `src/pages/Cotacoes.tsx`
- `src/components/organisms/QuoteForm.tsx`
- `src/components/molecules/ProductSelector.tsx`
- `src/lib/pdfGenerator.ts`

### Critérios de Apresentação:
- [ ] Formulário de cotação
- [ ] Seletor de cliente (dropdown)
- [ ] Seletor de produtos (multi-select)
- [ ] Quantidade por produto
- [ ] Desconto (% ou R$)
- [ ] Cálculo automático: subtotal, desconto, frete, ICMS, total
- [ ] Conversão de moeda
- [ ] Geração de PDF (template STAGETEK)
- [ ] Envio por email (Resend API)
- [ ] Histórico de cotações por cliente

### Perguntas para o Usuário:
1. O processo de criar cotação está fluido?
2. O PDF gerado está profissional?
3. Faltou algum campo de cálculo?
4. O envio por email está funcionando?
5. Aprovado para integração?

### Critérios de Aprovação:
- [ ] ✅ Usuário aprovado
- [ ] 📝 Feedback documentado
- [ ] 🔧 Ajustes implementados
- [ ] 🧪 Testes manuais:
  - Criar cotação com 3 produtos
  - Aplicar desconto de 10%
  - Adicionar frete R$ 500
  - Ver cálculo de total
  - Gerar PDF → verificar layout
  - Enviar por email → verificar recebimento
  - Ver cotação no histórico do cliente

### Demo Script:
**O que mostrar**:
1. Abrir `http://localhost:5173/cotacoes`
2. Clicar "Nova Cotação"
3. Selecionar cliente
4. Adicionar produtos:
   - Mesa de Som (qtd: 2)
   - Par LED (qtd: 10)
5. Aplicar desconto: 10%
6. Adicionar frete: R$ 500
7. Ver cálculo automático do total
8. Clicar "Gerar PDF" → ver preview
9. Clicar "Enviar por Email"
10. Verificar email recebido com PDF anexo

**Pontos de Atenção**:
- PDF com logo STAGETEK
- PDF com detalhamento de produtos (nome, qtd, preço unitário, subtotal)
- ICMS calculado corretamente (se aplicável)
- Email com template profissional
- Histórico mostra status (rascunho, enviada, aceita, rejeitada)

---

## Checkpoint P1.9: Sistema de Pedidos (Tracking)

**Escopo**: Converter cotações em pedidos e acompanhar status

**Arquivos**:
- `src/pages/Pedidos.tsx`
- `src/components/organisms/OrderTimeline.tsx`
- `src/components/molecules/OrderCard.tsx`

### Critérios de Apresentação:
- [ ] Criar pedido a partir de cotação aprovada
- [ ] Status: Rascunho, Confirmado, Em Produção, Despachado, Entregue, Cancelado
- [ ] Timeline visual (stepper component)
- [ ] Notificações Slack quando status muda
- [ ] Upload de anexos (NF, comprovante)
- [ ] Filtros (status, cliente, período)

### Perguntas para o Usuário:
1. A timeline de pedido está clara?
2. Os status fazem sentido?
3. As notificações Slack estão funcionando?
4. Faltou algum status importante?
5. Aprovado para integração?

### Critérios de Aprovação:
- [ ] ✅ Usuário aprovou
- [ ] 📝 Feedback documentado
- [ ] 🔧 Ajustes implementados
- [ ] 🧪 Testes manuais:
  - Converter cotação em pedido
  - Mudar status para "Em Produção"
  - Verificar notificação Slack
  - Upload de NF (PDF)
  - Mudar status para "Entregue"
  - Filtrar pedidos por status "Entregue"

### Demo Script:
**O que mostrar**:
1. Abrir cotação aprovada
2. Clicar "Converter em Pedido"
3. Ver pedido criado com status "Confirmado"
4. Abrir timeline do pedido (stepper)
5. Mudar status para "Em Produção"
6. Ver notificação no Slack
7. Upload de NF (PDF)
8. Mudar status para "Despachado" → adicionar código de rastreio
9. Ver timeline completa
10. Filtrar pedidos por status

**Pontos de Atenção**:
- Timeline com datas de cada mudança
- Código de rastreio clicável (link Correios)
- Notificação Slack com link para pedido
- Upload de múltiplos anexos
- Histórico imutável de mudanças

---

## Checkpoint P1.10: Integrações (Gmail, Slack, Calendar)

**Escopo**: Integrar CRM com ferramentas externas

**Arquivos**:
- `src/lib/integrations/gmail.ts`
- `src/lib/integrations/slack.ts`
- `src/lib/integrations/calendar.ts`
- `src/pages/Configuracoes.tsx`

### Critérios de Apresentação:
- [ ] Resend API: envio de emails (cotações, follow-ups)
- [ ] Slack Webhook: notificações (novo lead, pedido confirmado)
- [ ] Google Calendar API: criar eventos a partir de oportunidades
- [ ] Log de emails enviados
- [ ] Configuração de webhooks (settings page)

### Perguntas para o Usuário:
1. As integrações estão funcionando?
2. As notificações Slack estão claras?
3. A criação de eventos no Calendar está correta?
4. Faltou alguma integração importante?
5. Aprovado para integração?

### Critérios de Aprovação:
- [ ] ✅ Usuário aprovou
- [ ] 📝 Feedback documentado
- [ ] 🔧 Ajustes implementados
- [ ] 🧪 Testes manuais:
  - Enviar email de cotação → verificar recebimento
  - Criar lead → verificar notificação Slack
  - Criar evento no Calendar → verificar no Google Calendar
  - Ver log de emails enviados
  - Configurar webhook Slack

### Demo Script:
**O que mostrar**:
1. Criar nova cotação → enviar por email
2. Verificar email recebido (inbox)
3. Criar novo lead → verificar mensagem Slack
4. Criar oportunidade com data → criar evento no Calendar
5. Verificar evento no Google Calendar
6. Abrir página de logs → ver emails enviados
7. Abrir configurações → ver webhook Slack configurado

**Pontos de Atenção**:
- Email usa template HTML profissional
- Slack notificações têm link direto para CRM
- Eventos do Calendar sincronizam bidirecional
- Log de emails com status (enviado, falhou)
- Configurações salvas de forma segura (não expor API keys)

---

## 📦 Checkpoints por Feature (P2 - MÉDIA PRIORIDADE)

---

## Checkpoint P2.11: Relatórios Gerenciais

**Escopo**: DRE, conversão, análise por categoria

**Arquivos**:
- `src/pages/Relatorios.tsx`
- `src/components/organisms/ReportBuilder.tsx`
- `src/components/molecules/ChartReport.tsx`

### Critérios de Apresentação:
- [ ] Relatório de conversão (funil completo)
- [ ] DRE simplificado (receitas, custos, margem)
- [ ] Análise por categoria de produto
- [ ] Análise por vendedor
- [ ] Exportar para Excel/PDF
- [ ] Agendamento de relatórios (envio automático Slack)

### Perguntas para o Usuário:
1. Os relatórios estão úteis para análise?
2. Faltou alguma métrica importante?
3. A exportação está funcionando?
4. O agendamento de relatórios está claro?
5. Aprovado para integração?

### Critérios de Aprovação:
- [ ] ✅ Usuário aprovado
- [ ] 📝 Feedback documentado
- [ ] 🔧 Ajustes implementados

### Demo Script:
**O que mostrar**:
1. Abrir `http://localhost:5173/relatorios`
2. Selecionar "Relatório de Conversão"
3. Ver funil completo (% de conversão por etapa)
4. Selecionar "DRE Simplificado"
5. Ver receitas, custos, margem
6. Exportar para Excel → verificar arquivo
7. Agendar relatório semanal → enviar para Slack

**Pontos de Atenção**:
- Gráficos interativos (zoom, filtros)
- Exportação mantém formatação
- Agendamento usa cron (Supabase Edge Function)

---

## Checkpoint P2.12: Gestão de Equipamentos (Estoque)

**Escopo**: Controlar equipamentos para locação

**Arquivos**:
- `src/pages/Equipamentos.tsx`
- `src/components/organisms/EquipmentCalendar.tsx`

### Critérios de Apresentação:
- [ ] CRUD de equipamentos
- [ ] Status: Disponível, Em Uso, Manutenção, Inativo
- [ ] Calendário de uso (timeline)
- [ ] Reservas (vincular a eventos)
- [ ] Histórico de manutenções
- [ ] Alertas de manutenção preventiva

### Perguntas para o Usuário:
1. O controle de estoque está claro?
2. O calendário de uso está útil?
3. Os alertas de manutenção estão funcionando?
4. Aprovado para integração?

### Critérios de Aprovação:
- [ ] ✅ Usuário aprovado
- [ ] 📝 Feedback documentado
- [ ] 🔧 Ajustes implementados

### Demo Script:
**O que mostrar**:
1. Criar equipamento "Mesa de Som X32"
2. Status: Disponível
3. Ver calendário de uso (vazio)
4. Criar reserva para evento amanhã
5. Status muda para "Em Uso" automaticamente
6. Registrar manutenção (data, descrição)
7. Ver alerta de manutenção preventiva (30 dias)

---

## Checkpoint P2.13: Calendário de Eventos

**Escopo**: Visualizar eventos confirmados

**Arquivos**:
- `src/pages/Calendario.tsx`
- `src/components/organisms/EventCalendar.tsx`

### Critérios de Apresentação:
- [ ] Calendário mensal (FullCalendar ou similar)
- [ ] Criar evento vinculado a oportunidade
- [ ] Drag-and-drop de eventos
- [ ] Cores por status (confirmado, pendente, cancelado)
- [ ] Sincronização com Google Calendar
- [ ] Filtros: por cliente, por equipamento

### Perguntas para o Usuário:
1. O calendário está claro?
2. A sincronização com Google Calendar está funcionando?
3. Aprovado para integração?

### Critérios de Aprovação:
- [ ] ✅ Usuário aprovado
- [ ] 📝 Feedback documentado
- [ ] 🔧 Ajustes implementados

### Demo Script:
**O que mostrar**:
1. Abrir calendário mensal
2. Criar evento para amanhã
3. Vincular a oportunidade
4. Ver evento no Google Calendar
5. Arrastar evento para outro dia
6. Filtrar por cliente

---

## Checkpoint P2.14: Lead Scoring com IA

**Escopo**: Score automático de leads com Claude API

**Arquivos**:
- `src/lib/ai/leadScoring.ts`
- `src/components/molecules/LeadScoreBadge.tsx`

### Critérios de Apresentação:
- [ ] Claude API para análise de leads
- [ ] Score 0-100 baseado em: valor, histórico, tempo no funil, engagement
- [ ] Temperatura: 🔥 Hot (>70), 🌡️ Warm (40-70), 🧊 Cold (<40)
- [ ] Atualização automática a cada 24h (cron)
- [ ] Insights textuais ("Lead inativo há 15 dias, enviar follow-up")
- [ ] Dashboard com top 10 leads quentes

### Perguntas para o Usuário:
1. Os scores estão fazendo sentido?
2. Os insights estão úteis?
3. Aprovado para integração?

### Critérios de Aprovação:
- [ ] ✅ Usuário aprovado
- [ ] 📝 Feedback documentado
- [ ] 🔧 Ajustes implementados

### Demo Script:
**O que mostrar**:
1. Ver lead com score 85 (🔥 Hot)
2. Ver insight: "Alto valor, engajamento recente"
3. Ver lead com score 25 (🧊 Cold)
4. Ver insight: "Sem interação há 30 dias, enviar email"
5. Ver top 10 leads quentes no dashboard

---

## 📋 Checklist de Qualidade Final (antes de cada release)

### **1. Testes Manuais Completos**
- [ ] Todos os fluxos principais testados
- [ ] Edge cases cobertos
- [ ] Tratamento de erros funcionando

### **2. Testes de Regressão**
- [ ] Features antigas ainda funcionam
- [ ] Nenhuma quebra de layout
- [ ] Performance mantida

### **3. Cross-Browser**
- [ ] Chrome (desktop + mobile) ✅
- [ ] Firefox ✅
- [ ] Safari (iOS) ✅
- [ ] Edge ✅

### **4. Lighthouse Audit**
- [ ] Performance >85
- [ ] Accessibility >90
- [ ] Best Practices >90
- [ ] SEO >80
- [ ] PWA 100 (quando aplicável)

### **5. Code Review**
- [ ] Protocol Notecraft™ compliance
- [ ] TypeScript strict
- [ ] Sem console.log
- [ ] Sem TODO comments

### **6. Security**
- [ ] Variáveis de ambiente não expostas
- [ ] API keys rotacionadas
- [ ] RLS (Row Level Security) ativo
- [ ] Sanitização de inputs

### **7. Documentation**
- [ ] README atualizado
- [ ] Comentários em código complexo
- [ ] Storybook stories criados (se aplicável)

---

## 🚀 Processo de Integração (após aprovação)

### **1. Preparação**
```bash
# Criar branch da feature
git checkout -b feature/P0.2-crud-clientes

# Commitar código
git add .
git commit -m "feat(clientes): implement CRUD with CNPJ autocomplete"

# Push para remote
git push origin feature/P0.2-crud-clientes
```

### **2. Pull Request**
- [ ] Criar PR no GitHub
- [ ] Preencher template de PR:
  - Descrição da feature
  - Screenshots (desktop + mobile)
  - Checklist de testes
  - Breaking changes (se houver)
- [ ] Solicitar review (se equipe)

### **3. CI/CD**
- [ ] GitHub Actions passa (build + testes)
- [ ] Vercel deploy preview gerado
- [ ] Lighthouse CI passa (score >85)

### **4. Merge**
- [ ] Aprovação do usuário confirmada
- [ ] Merge para `main`
- [ ] Deploy automático para produção (Vercel)
- [ ] Tag de versão (ex: v1.2.0)

### **5. Pós-Deploy**
- [ ] Smoke test em produção
- [ ] Monitorar erros (Sentry ou similar)
- [ ] Anunciar feature no Slack

---

## 📊 Métricas de Sucesso do Processo

### **Velocidade**
- **Meta**: 3-5 componentes aprovados por dia
- **Medição**: GitHub commits + PR merges

### **Qualidade**
- **Meta**: <5% de bugs reportados pós-integração
- **Medição**: Issues no GitHub com label "bug"

### **Aprovação**
- **Meta**: >90% de features aprovadas na primeira apresentação
- **Medição**: Ratio de aprovações / apresentações

### **Time to Production**
- **Meta**: <7 dias da implementação ao deploy
- **Medição**: Tempo entre primeiro commit e merge

---

## 🎓 Treinamento do Usuário (por feature)

### **Pré-Requisito**: Feature aprovada e deployada em produção

### **Formato**:
1. **Demo ao vivo** (15-30 min)
   - Mostrar feature em produção
   - Demonstrar casos de uso principais
   - Responder perguntas

2. **Documentação escrita** (PDF ou Notion)
   - Passo a passo com screenshots
   - FAQs
   - Troubleshooting

3. **Video tutorial** (opcional, 5-10 min)
   - Screencast com narração
   - Disponibilizar no YouTube (unlisted) ou Loom

### **Exemplo: Treinamento CRUD Clientes**
**Demo**:
- Como cadastrar novo cliente
- Como buscar cliente existente
- Como editar dados do cliente
- Como desativar cliente

**Documentação**:
- "Manual do Usuário: Gestão de Clientes"
- Incluir: screenshots, atalhos de teclado, dicas

**Video**:
- 7 min screencast mostrando fluxo completo

---

## 📞 Suporte Pós-Integração

### **Canal de Suporte**: Slack (canal #stagetek-crm-support)

### **SLA**:
- **Bugs críticos** (sistema não funciona): Resposta em 2h
- **Bugs médios** (feature não funciona): Resposta em 24h
- **Melhorias/dúvidas**: Resposta em 48h

### **Processo de Bug Report**:
1. Usuário posta no Slack:
   - Descrição do problema
   - Steps to reproduce
   - Screenshot/video
   - Navegador/dispositivo
2. Dev confirma bug
3. Cria issue no GitHub
4. Prioriza (P0/P1/P2/P3)
5. Fix + deploy
6. Confirma resolução com usuário

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
**Última atualização**: 3 de Outubro de 2025
