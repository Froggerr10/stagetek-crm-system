# User Stories - STAGETEK CRM

**Versão**: 1.0.0
**Data**: 13 de Outubro de 2025
**Formato**: Gherkin (Given/When/Then)

---

## 📋 Índice

- [P0: MVP Crítico](#p0-mvp-crítico)
  - [Autenticação](#us-p01-autenticação)
  - [CRUD Clientes](#us-p02-crud-clientes)
  - [CRUD Oportunidades](#us-p03-crud-oportunidades)
  - [Funil Kanban](#us-p04-funil-kanban)
  - [Dashboard Básico](#us-p05-dashboard-básico)
- [P0.5: Cotação MVP (DIFERENCIAL)](#p05-cotação-mvp-diferencial)
  - [Catálogo de Produtos](#us-p06-catálogo-de-produtos)
  - [Criar Cotação](#us-p06-criar-cotação)
  - [Gerar PDF](#us-p06-gerar-pdf)
  - [Enviar Email](#us-p06-enviar-email)
- [P1: Alta Prioridade](#p1-alta-prioridade)
- [P2: Média Prioridade](#p2-média-prioridade)

---

## P0: MVP Crítico

### US-P0.1: Autenticação

#### **User Story**
```gherkin
As a: Vendedor Stagetek
I want to: Fazer login seguro no sistema
So that: Eu possa acessar dados confidenciais do CRM de forma protegida
```

#### **Acceptance Criteria**

**Cenário 1: Login bem-sucedido**
```gherkin
Given: Estou na página de login ("/login")
And: Tenho credenciais válidas (email: "joao@stagetek.com", senha: "senha123")
When: Preencho o formulário de login
And: Clico no botão "Entrar"
Then: Sou redirecionado para "/dashboard"
And: Vejo meu nome no menu superior ("João Silva")
And: Token JWT é armazenado no localStorage
```

**Cenário 2: Login falha - credenciais inválidas**
```gherkin
Given: Estou na página de login
And: Tenho credenciais inválidas
When: Preencho email "joao@stagetek.com" e senha "errada"
And: Clico em "Entrar"
Then: Vejo mensagem de erro "Email ou senha incorretos"
And: Permaneço na página de login
And: Campos não são limpos (email permanece preenchido)
```

**Cenário 3: Rota protegida sem autenticação**
```gherkin
Given: Não estou autenticado (sem token JWT)
When: Tento acessar "/dashboard" diretamente
Then: Sou redirecionado para "/login"
And: Vejo mensagem "Faça login para continuar"
```

**Cenário 4: Logout**
```gherkin
Given: Estou autenticado e na página "/dashboard"
When: Clico no menu de usuário (avatar no topo)
And: Clico em "Sair"
Then: Sou redirecionado para "/login"
And: Token JWT é removido do localStorage
And: Se tentar voltar para "/dashboard", sou bloqueado
```

#### **Definition of Done**
- [ ] Supabase Auth configurado
- [ ] RLS policies habilitadas
- [ ] Rota `/login` funcional
- [ ] Componente `ProtectedRoute` protege rotas autenticadas
- [ ] Logout limpa sessão completamente
- [ ] Testes E2E cobrem os 4 cenários

---

### US-P0.2: CRUD Clientes

#### **User Story**
```gherkin
As a: Vendedor Stagetek
I want to: Cadastrar e gerenciar clientes B2B
So that: Eu tenha uma base organizada para criar oportunidades
```

#### **Acceptance Criteria**

**Cenário 1: Criar novo cliente (sucesso)**
```gherkin
Given: Estou logado e na página "/clientes"
When: Clico no botão "+ Novo Cliente"
Then: Modal "Novo Cliente" é exibido
When: Preencho os campos obrigatórios:
  | Campo  | Valor                          |
  | Nome   | ACME Corporation Ltda         |
  | CNPJ   | 12.345.678/0001-90            |
  | Email  | contato@acme.com.br           |
  | Phone  | (11) 98765-4321               |
  | Status | Ativo                         |
And: Preencho endereço (opcional):
  | Rua    | Av. Paulista, 1000            |
  | Cidade | São Paulo                     |
  | Estado | SP                            |
  | CEP    | 01310-100                     |
And: Clico em "Criar Cliente"
Then: Modal fecha
And: Cliente aparece na lista de clientes
And: Vejo toast "Cliente criado com sucesso"
And: Avatar com iniciais "AC" é exibido no card
```

**Cenário 2: Validação - CNPJ inválido**
```gherkin
Given: Estou no modal "Novo Cliente"
When: Preencho CNPJ "00.000.000/0000-00" (inválido)
And: Clico em "Criar Cliente"
Then: Vejo erro abaixo do campo "CNPJ inválido"
And: Modal permanece aberto
And: Cliente NÃO é criado
```

**Cenário 3: Editar cliente existente**
```gherkin
Given: Estou na página "/clientes"
And: Existe cliente "ACME Corporation Ltda"
When: Clico no botão "Editar" no card do cliente
Then: Modal "Editar Cliente" abre com dados preenchidos
When: Altero Phone para "(11) 91111-2222"
And: Clico em "Atualizar"
Then: Modal fecha
And: Card do cliente exibe novo telefone
And: Vejo toast "Cliente atualizado com sucesso"
```

**Cenário 4: Desativar cliente (soft delete)**
```gherkin
Given: Estou na página "/clientes"
And: Existe cliente "ACME Corporation Ltda" com status "Ativo"
When: Clico em "Editar" no cliente
And: Altero Status para "Inativo"
And: Clico em "Atualizar"
Then: Cliente ainda aparece na lista
And: Badge muda de verde ("Ativo") para cinza ("Inativo")
And: Cliente NÃO é deletado do banco (soft delete)
```

**Cenário 5: Buscar cliente**
```gherkin
Given: Existem 10 clientes cadastrados
When: Digito "ACME" no campo de busca
Then: Lista filtra e exibe apenas clientes com "ACME" no nome
And: Outros clientes são ocultados
When: Limpo o campo de busca
Then: Todos os 10 clientes voltam a aparecer
```

#### **Definition of Done**
- [ ] Modal ClienteModal (49 linhas, Protocol Notecraft compliant)
- [ ] Componente AddressFields (22 linhas) para endereço JSONB
- [ ] Hook useClienteForm (61 linhas) gerencia form state
- [ ] CRUD completo (create, read, update, soft delete)
- [ ] Busca em tempo real funcional
- [ ] RLS policies completas (SELECT/INSERT/UPDATE)
- [ ] Testes E2E cobrem os 5 cenários

---

### US-P0.3: CRUD Oportunidades

#### **User Story**
```gherkin
As a: Vendedor Stagetek
I want to: Registrar oportunidades de venda
So that: Eu não perca negócios e possa acompanhar o progresso
```

#### **Acceptance Criteria**

**Cenário 1: Criar nova oportunidade**
```gherkin
Given: Estou logado e na página "/oportunidades"
And: Existe cliente "ACME Corporation Ltda" cadastrado
And: Existem estágios no funil (Lead, Contato, Proposta, Negociação, Fechamento)
When: Clico em "+ Nova Oportunidade"
Then: Modal "Nova Oportunidade" é exibido
When: Preencho os campos:
  | Campo           | Valor                             |
  | Nome            | Proposta para Evento XYZ         |
  | Cliente         | ACME Corporation Ltda (select)   |
  | Valor           | 50000.00                          |
  | Probabilidade   | 70                                |
  | Estágio         | Proposta (select)                 |
  | Data Fechamento | 2025-12-31                        |
And: Clico em "Criar Oportunidade"
Then: Modal fecha
And: Oportunidade aparece na tabela
And: Vejo toast "Oportunidade criada com sucesso"
```

**Cenário 2: Validação - campos obrigatórios**
```gherkin
Given: Estou no modal "Nova Oportunidade"
When: Deixo "Nome" vazio
And: Clico em "Criar Oportunidade"
Then: Vejo erro "Campo obrigatório" abaixo de "Nome"
And: Oportunidade NÃO é criada
```

**Cenário 3: Selects com dados do Supabase**
```gherkin
Given: Estou no modal "Nova Oportunidade"
When: Clico no select "Cliente"
Then: Vejo lista de clientes do banco (ex: ACME, TechCorp, EventosPro)
And: Opções têm contraste correto (bg-gray-900, text-white)
When: Clico no select "Estágio"
Then: Vejo lista de estágios do funil
And: Estágios estão ordenados por order_position
```

**Cenário 4: Editar oportunidade**
```gherkin
Given: Existe oportunidade "Proposta para Evento XYZ"
When: Clico em "Editar" na linha da oportunidade
Then: Modal abre com dados preenchidos
When: Altero Probabilidade de 70 para 90
And: Clico em "Atualizar"
Then: Tabela reflete novo valor
And: Vejo toast "Oportunidade atualizada"
```

**Cenário 5: Deletar oportunidade**
```gherkin
Given: Existe oportunidade "Proposta para Evento XYZ"
When: Clico em "Excluir" na linha da oportunidade
Then: Vejo confirm dialog "Tem certeza que deseja excluir?"
When: Clico em "Confirmar"
Then: Oportunidade é removida da lista
And: Vejo toast "Oportunidade excluída"
And: Registro é deletado do banco (hard delete)
```

#### **Definition of Done**
- [ ] Modal OportunidadeModal (50 linhas, Protocol Notecraft compliant)
- [ ] Hook useOportunidadeForm (67 linhas)
- [ ] Selects populados dinamicamente (clients, funnel_stages)
- [ ] CRUD completo funcional
- [ ] RLS policies completas
- [ ] Testes E2E cobrem os 5 cenários

---

### US-P0.4: Funil Kanban

#### **User Story**
```gherkin
As a: Gestor Comercial
I want to: Visualizar o pipeline em formato Kanban
So that: Eu entenda o status de cada negócio visualmente
```

#### **Acceptance Criteria**

**Cenário 1: Visualizar Kanban**
```gherkin
Given: Estou logado e acesso "/funil"
Then: Vejo 5 colunas:
  | Coluna      | Cor   |
  | Lead        | Azul  |
  | Contato     | Verde |
  | Proposta    | Laranja |
  | Negociação  | Amarelo |
  | Fechamento  | Verde |
And: Cada coluna exibe:
  - Total de oportunidades (número)
  - Soma de valores R$ (totalizador)
  - Cards de oportunidades
```

**Cenário 2: Drag-and-drop de card**
```gherkin
Given: Existe oportunidade "Proposta Evento XYZ" na coluna "Proposta"
When: Arrasto o card para a coluna "Negociação"
Then: Card move visualmente
And: Estágio no banco é atualizado (stage_id alterado)
And: Totalizadores são recalculados automaticamente
And: Activity log registra "Mudou de Proposta → Negociação"
```

**Cenário 3: Totalizadores por coluna**
```gherkin
Given: Existem 3 oportunidades na coluna "Proposta":
  | Nome     | Valor       |
  | Deal 1   | R$ 10.000   |
  | Deal 2   | R$ 25.000   |
  | Deal 3   | R$ 15.000   |
Then: Header da coluna exibe:
  - "3 oportunidades"
  - "R$ 50.000,00"
```

**Cenário 4: Mobile - swipe para mover**
```gherkin
Given: Estou em dispositivo mobile (<768px)
And: Existe oportunidade "Deal Mobile" na coluna "Lead"
When: Faço swipe para a esquerda no card
Then: Menu de ações aparece com botões:
  - "Mover para Contato"
  - "Mover para Proposta"
  - "Excluir"
When: Clico em "Mover para Contato"
Then: Card move para a coluna "Contato"
And: Banco é atualizado
```

#### **Definition of Done**
- [ ] Kanban básico em HTML standalone funciona (temporário)
- [ ] Migração para React (`src/pages/Funil.tsx`)
- [ ] dnd-kit implementado (drag-and-drop mobile-friendly)
- [ ] Totalizadores calculados automaticamente
- [ ] RLS policies completas
- [ ] Testes E2E cobrem os 4 cenários

---

### US-P0.5: Dashboard Básico

#### **User Story**
```gherkin
As a: Gestor Comercial
I want to: Ver métricas principais no dashboard
So that: Eu tome decisões rápidas baseadas em dados reais
```

#### **Acceptance Criteria**

**Cenário 1: StatCards exibem métricas corretas**
```gherkin
Given: Estou logado e acesso "/dashboard"
Then: Vejo 4 StatCards:
  | Card               | Valor Exemplo  | Fonte de Dados                                      |
  | Total Vendas (mês) | R$ 150.000     | SUM(opportunities.value WHERE status='won' AND created_at >= FIRST_DAY_OF_MONTH) |
  | Oportunidades Abertas | 12          | COUNT(opportunities WHERE status='open')           |
  | Taxa Conversão     | 25%            | (COUNT won / COUNT total) * 100                    |
  | Ticket Médio       | R$ 12.500      | AVG(value WHERE status='won')                      |
And: Cada card tem ícone apropriado (TrendingUp, Target, Award, DollarSign)
```

**Cenário 2: Gráficos renderizam**
```gherkin
Given: Estou no dashboard
Then: Vejo gráfico "Vendas ao Longo do Tempo" (Recharts linha)
And: Eixo X mostra últimos 7 dias
And: Eixo Y mostra valores em R$
And: Linha conecta pontos de vendas por dia
When: Hover sobre um ponto
Then: Tooltip exibe "Dia X: R$ Y"
```

**Cenário 3: Filtro de período**
```gherkin
Given: Estou no dashboard com período "30 dias" (padrão)
When: Clico no dropdown "Período"
And: Seleciono "7 dias"
Then: StatCards atualizam com dados dos últimos 7 dias
And: Gráficos atualizam para mostrar últimos 7 dias
And: URL muda para "/dashboard?period=7d"
```

**Cenário 4: Tabela de últimas oportunidades**
```gherkin
Given: Estou no dashboard
Then: Vejo tabela "Últimas Oportunidades" com 5 linhas
And: Cada linha exibe:
  - Nome da oportunidade
  - Cliente
  - Valor (formatado BRL)
  - Estágio (badge colorido)
  - Ações (Editar, Excluir)
When: Clico em "Editar" em uma oportunidade
Then: Modal OportunidadeModal abre
```

#### **Definition of Done**
- [ ] Dashboard página (`src/pages/Dashboard.tsx`)
- [ ] 4 StatCards funcionais com dados reais do Supabase
- [ ] 2 gráficos (Recharts) renderizam corretamente
- [ ] Filtro de período funcional (7d, 30d, 90d, ano)
- [ ] Tabela últimas oportunidades
- [ ] Dark mode funcional
- [ ] Testes E2E cobrem os 4 cenários

---

## P0.5: Cotação MVP (DIFERENCIAL)

### US-P0.6: Catálogo de Produtos

#### **User Story**
```gherkin
As a: Vendedor Stagetek
I want to: Consultar o catálogo de produtos rapidamente
So that: Eu possa criar cotações sem procurar em planilhas
```

#### **Acceptance Criteria**

**Cenário 1: Visualizar catálogo**
```gherkin
Given: Estou logado e acesso "/produtos"
Then: Vejo grid responsivo de produtos:
  - Mobile: 1 coluna
  - Tablet: 2 colunas
  - Desktop: 3-4 colunas
And: Cada card de produto exibe:
  - Imagem (ou placeholder se não houver)
  - Nome do produto
  - SKU
  - Categoria (badge: Som, Luz, Estrutura)
  - Preço BRL (formatado "R$ 1.200,00")
```

**Cenário 2: Buscar produto**
```gherkin
Given: Existem 50 produtos no catálogo
When: Digito "Mesa de som" no campo de busca
Then: Grid filtra e exibe apenas produtos com "Mesa de som" no nome ou SKU
And: Outros produtos são ocultados
When: Limpo o campo de busca
Then: Todos os 50 produtos voltam a aparecer
```

**Cenário 3: Filtrar por categoria**
```gherkin
Given: Estou na página "/produtos"
When: Clico no filtro "Categoria"
And: Seleciono "Som"
Then: Grid exibe apenas produtos da categoria "som"
And: URL muda para "/produtos?categoria=som"
When: Seleciono "Todas" no filtro
Then: Todos os produtos voltam a aparecer
```

#### **Definition of Done**
- [ ] Página `/produtos` funcional
- [ ] Grid responsivo (Tailwind grid)
- [ ] Busca em tempo real
- [ ] Filtros por categoria
- [ ] 50 produtos seed no banco
- [ ] RLS policies completas
- [ ] Testes E2E cobrem os 3 cenários

---

### US-P0.6: Criar Cotação

#### **User Story**
```gherkin
As a: Vendedor Stagetek
I want to: Criar cotação em 2-3 cliques selecionando produtos
So that: Eu envie proposta em <5 minutos (vs 2h em planilha)
```

#### **Acceptance Criteria**

**Cenário 1: Criar cotação a partir de oportunidade**
```gherkin
Given: Estou na página "/oportunidades"
And: Existe oportunidade "Proposta Evento XYZ"
When: Clico em "Editar" na oportunidade
And: Clico no botão "Nova Cotação"
Then: Sou redirecionado para "/oportunidades/:id/cotacao/nova"
And: Vejo catálogo de produtos disponíveis
```

**Cenário 2: Selecionar produtos e ajustar quantidade**
```gherkin
Given: Estou na página "/oportunidades/:id/cotacao/nova"
When: Marco checkbox no produto "Mesa de Som Behringer X32" (R$ 15.000)
And: Ajusto quantidade para "2"
And: Aplico desconto de "10%" na linha
Then: Vejo linha no carrinho:
  | Produto           | Qtd | Preço Unit | Desconto | Subtotal   |
  | Mesa Behringer    | 2   | R$ 15.000  | 10%      | R$ 27.000  |
When: Adiciono mais 3 produtos ao carrinho
Then: Vejo todas as 4 linhas no carrinho
And: Subtotal geral é calculado automaticamente
```

**Cenário 3: Adicionar frete manual**
```gherkin
Given: Tenho 4 produtos no carrinho (Subtotal: R$ 50.000)
When: Preencho campo "Frete" com "5000"
Then: Vejo resumo:
  | Item      | Valor       |
  | Subtotal  | R$ 50.000   |
  | Frete     | R$ 5.000    |
  | **Total** | **R$ 55.000** |
```

**Cenário 4: Preview antes de gerar PDF**
```gherkin
Given: Tenho cotação preenchida (4 produtos + frete)
When: Clico em "Gerar PDF"
Then: Vejo preview da cotação:
  - Logo Stagetek (topo)
  - Dados da empresa
  - Tabela de produtos
  - Totais (subtotal, frete, total)
  - Termos e condições (footer)
And: Botão "Confirmar e Gerar PDF" aparece
```

#### **Definition of Done**
- [ ] Página `/oportunidades/:id/cotacao/nova` funcional
- [ ] Multi-select de produtos (checkbox)
- [ ] Input quantidade + desconto por linha
- [ ] Campo frete manual
- [ ] Cálculo automático de subtotais e total
- [ ] Preview visual antes de gerar PDF
- [ ] Tabela quotations no banco
- [ ] RLS policies completas
- [ ] Testes E2E cobrem os 4 cenários

---

### US-P0.6: Gerar PDF

#### **User Story**
```gherkin
As a: Vendedor Stagetek
I want to: Gerar PDF profissional da cotação
So that: Eu possa enviar proposta visualmente atraente ao cliente
```

#### **Acceptance Criteria**

**Cenário 1: Gerar PDF com sucesso**
```gherkin
Given: Estou no preview da cotação
When: Clico em "Confirmar e Gerar PDF"
Then: PDF é gerado em <3 segundos
And: Vejo mensagem "PDF gerado com sucesso"
And: Botão "Download PDF" aparece
And: Botão "Enviar por Email" aparece
And: PDF é salvo no bucket Supabase Storage
And: URL do PDF é salva em quotations.pdf_url
```

**Cenário 2: Layout do PDF**
```gherkin
Given: PDF foi gerado
When: Clico em "Download PDF"
Then: PDF baixado contém:
  - **Header**: Logo Stagetek + "COTAÇÃO Nº QT-2025-001"
  - **Dados da Empresa**:
    - STAGETEK Equipamentos Ltda
    - CNPJ: XX.XXX.XXX/0001-XX
    - Email: contato@stagetek.com.br
    - Telefone: (11) 1234-5678
  - **Dados do Cliente**:
    - Nome: ACME Corporation Ltda
    - CNPJ: 12.345.678/0001-90
    - Email: contato@acme.com.br
  - **Tabela de Produtos**:
    | Item | Descrição       | Qtd | Preço Unit | Desconto | Subtotal   |
    |------|-----------------|-----|------------|----------|------------|
    | 1    | Mesa Behringer  | 2   | R$ 15.000  | 10%      | R$ 27.000  |
    | 2    | Par LED 54x3W   | 10  | R$ 800     | 0%       | R$ 8.000   |
  - **Totais**:
    - Subtotal: R$ 35.000
    - Frete: R$ 5.000
    - **Total Geral: R$ 40.000**
  - **Footer**:
    - Validade: 15 dias a partir da data
    - Termos: "Proposta válida por 15 dias. Preços sujeitos a alteração."
```

**Cenário 3: PDF renderiza corretamente em mobile**
```gherkin
Given: Gerei PDF em dispositivo mobile
When: Abro PDF no navegador mobile
Then: PDF é responsivo e legível
And: Tabela não quebra layout
And: Texto não fica cortado
```

#### **Definition of Done**
- [ ] Biblioteca `react-pdf` ou `pdfmake` configurada
- [ ] Template de PDF implementado
- [ ] Logo Stagetek incorporado no PDF
- [ ] PDF <2MB (compressão de imagens se necessário)
- [ ] PDF salvo no Supabase Storage com policies corretas
- [ ] Storage policy permite download apenas para owner
- [ ] Testes E2E cobrem os 3 cenários

---

### US-P0.6: Enviar Email

#### **User Story**
```gherkin
As a: Vendedor Stagetek
I want to: Enviar cotação por email diretamente do sistema
So that: Cliente receba proposta automaticamente sem passos manuais
```

#### **Acceptance Criteria**

**Cenário 1: Enviar email com sucesso**
```gherkin
Given: PDF da cotação foi gerado
And: Cotação está vinculada à oportunidade "Proposta Evento XYZ"
And: Oportunidade tem cliente "ACME Corporation" (email: contato@acme.com.br)
When: Clico em "Enviar por Email"
Then: Vejo toast "Enviando email..."
And: Email é enviado via Resend API em <30 segundos
And: Vejo toast "Email enviado com sucesso"
And: Status da oportunidade muda para "Proposta Enviada"
And: Activity log registra "Cotação QT-2025-001 enviada por email"
```

**Cenário 2: Template de email**
```gherkin
Given: Email foi enviado
When: Cliente abre email (contato@acme.com.br)
Then: Email contém:
  - **Assunto**: "Cotação STAGETEK - Proposta Evento XYZ"
  - **Corpo**:
    ```
    Prezado(a) Cliente ACME Corporation,

    Segue em anexo a cotação solicitada para o projeto "Proposta Evento XYZ".

    Resumo:
    - Itens: 4 produtos
    - Total: R$ 55.000,00
    - Validade: 15 dias (até 28/10/2025)

    Estamos à disposição para esclarecer dúvidas.

    Atenciosamente,
    Equipe Stagetek
    contato@stagetek.com.br
    (11) 1234-5678
    ```
  - **Anexo**: `Cotacao_QT-2025-001.pdf` (1.5 MB)
```

**Cenário 3: Erro ao enviar email**
```gherkin
Given: Resend API está offline (erro 500)
When: Clico em "Enviar por Email"
Then: Vejo toast de erro "Falha ao enviar email. Tente novamente."
And: Status da oportunidade NÃO muda
And: Log de erro é registrado no Sentry
And: Posso tentar novamente clicando no botão
```

**Cenário 4: Histórico de emails enviados**
```gherkin
Given: Cotação QT-2025-001 foi enviada por email
When: Acesso "/oportunidades/:id"
Then: Vejo tab "Histórico"
And: Vejo linha "Cotação QT-2025-001 enviada para contato@acme.com.br (13/10/2025 14:30)"
```

#### **Definition of Done**
- [ ] Resend API configurada e funcionando
- [ ] Template de email básico implementado
- [ ] PDF anexado ao email (<2MB)
- [ ] Status da oportunidade atualiza automaticamente
- [ ] Activity log registra envio
- [ ] Tratamento de erros (retry, fallback)
- [ ] Histórico de emails enviados visível
- [ ] Testes E2E cobrem os 4 cenários

---

## P1: Alta Prioridade

### US-P1.1: Detalhes da Oportunidade
**Nota**: Ver `protocol/RD-STATION-ANALYSIS.md` linhas 224-339 para detalhes completos.

#### **User Story**
```gherkin
As a: Vendedor Stagetek
I want to: Ver detalhes completos de uma oportunidade em layout 3 colunas
So that: Eu tenha contexto completo para negociar (histórico, tarefas, contatos, produtos)
```

#### **Acceptance Criteria (resumido)**
- [ ] Layout 3 colunas (Sidebar Left | Tabs Center | Sidebar Right)
- [ ] Tab Histórico: timeline de eventos + formulário criar anotação
- [ ] Tab Tarefas: criar/listar/notificar tarefas
- [ ] Tab Contatos: vincular contatos à oportunidade
- [ ] Tab Produtos: adicionar produtos ao deal
- [ ] Tab Arquivos: upload de anexos
- [ ] Navegação: clicar em card do Kanban → abrir detalhes

**Referência**: Ver `RD-STATION-ANALYSIS.md` para wireframes e screenshots.

---

### US-P1.2: Sistema de Tarefas
**Nota**: Ver screenshot `tarefas.png` para referência visual.

#### **User Story**
```gherkin
As a: Vendedor Stagetek
I want to: Criar e gerenciar tarefas vinculadas a oportunidades
So that: Eu não esqueça follow-ups críticos
```

#### **Acceptance Criteria (resumido)**
- [ ] Criar tarefa (tipo: Ligação, WhatsApp, Email, Reunião)
- [ ] Campos: título, data, hora, responsável, tipo
- [ ] Listar tarefas em ordem cronológica
- [ ] Notificações de tarefas vencidas
- [ ] Integração com timeline de histórico

**Referência**: Ver screenshot `tarefas.png`.

---

## P2: Média Prioridade

### US-P2.1: Relatórios Gerenciais
### US-P2.2: Lead Scoring com IA
### US-P2.3: Configuração de Funis

**Nota**: Detalhamento completo dessas stories será feito quando P0+P0.5 estiverem completos.

---

## 📊 Métricas de Sucesso

### **Como validar stories (Definition of Done Global)**
1. ✅ Código passa em Protocol Notecraft™ validation (limites de linhas)
2. ✅ TypeScript strict (zero `any`)
3. ✅ Testes E2E (Playwright) cobrem happy path
4. ✅ RLS policies completas e testadas
5. ✅ Mobile-first (funciona em <768px)
6. ✅ Lighthouse Score >85 (performance)
7. ✅ Documentado no Storybook (componentes reutilizáveis)

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
**Próxima atualização**: Quando P0.5 for iniciado
