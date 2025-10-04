# RD Station CRM - Análise Completa de Telas e Elementos

**Data**: 1 de Outubro de 2025
**Objetivo**: Identificar cada elemento das telas do RD Station para replicar no STAGETEK CRM

---

## 📐 Estrutura Global (Todas as Telas)

### **Top Bar (Barra Superior)**

**Elementos**:
1. **Logo RD STATION CRM** (canto superior esquerdo)
2. **Navegação Principal** (horizontal):
   - [ ] Link: "Oportunidades" (atual/ativo)
   - [ ] Link: "Empresas/Clientes"
   - [ ] Link: "Contatos"
   - [ ] Link: "Tarefas" + Badge vermelho "67"
   - [ ] Link: "Analisar"
3. **Área de Utilidades** (canto superior direito):
   - [ ] Ícone: Busca (lupa)
   - [ ] Ícone: Notificações (sino) + Badge vermelho
   - [ ] Ícone: Ajuda (?)
   - [ ] Ícone: Apps (grade 3x3)
   - [ ] Avatar: "MB" (Mario Becker) + Dropdown
     - [ ] Texto: "Conta DEMO PRO"
     - [ ] Seta dropdown

**Cores**:
- Background: Branco
- Links ativos: Azul (#00a4e4)
- Badge: Vermelho (#ff0000)

---

## 🎯 Tela 1: Funil de Vendas (Kanban Board)

**URL**: `/app/deals/pipeline`
**Arquivo**: `Tela funil_RDStation_1.png`, `tela funil 2.png`

### **Header da Página**

**Elementos**:
1. **Breadcrumb/Título**:
   - [ ] Ícone: Informação (i) em círculo azul
   - [ ] Texto: "Oportunidades"

2. **Filtros e Controles** (linha horizontal):
   - [ ] Label: "Funil de vendas"
   - [ ] Dropdown: "Funil PADRÃO | Não Alterar▼"
   - [ ] Label: "Dono da tarefa"
   - [ ] Dropdown: "Minhas oportunidades▼"
   - [ ] Label: "Em andamento▼"
   - [ ] Botão: "⟳ Recarregar"
   - [ ] Botão: "▦ Filtro ativo" (cinza)

### **Kanban Board**

**Estrutura**: 5 colunas horizontais

#### **Coluna 1: Sem contato / Lead**

**Header da Coluna**:
- [ ] Título: "Sem contato / Lead" + ícone dropdown
- [ ] Subtítulo: "3 oportunidades"
- [ ] Valor total: "R$ 0,00" + ícone info

**Cards** (4 exemplos):

**Card 1: "Teste 123"**
- [ ] Avatar: Ícone pessoa (laranja)
- [ ] Título: "Teste 123" (link)
- [ ] Origem: "RD Station" (cinza, pequeno)
- [ ] Valores:
  - [ ] Ícone moeda azul: "R$ 0,00"
  - [ ] Ícone moeda cinza: "R$ 0,00"
- [ ] Qualificação: 5 estrelas (1 preenchida)
- [ ] Ícones de ação:
  - [ ] Telefone (vermelho)
  - [ ] Relógio (cinza)

**Card 2: "Pollos Hermanos"**
- [ ] Avatar: Ícone pessoa (laranja)
- [ ] Título: "Pollos Hermanos"
- [ ] Origem: "Pollos Hermanos" (cinza)
- [ ] Valores: R$ 0,00 / R$ 0,00
- [ ] Qualificação: 5 estrelas vazias
- [ ] Ícones: Email (vermelho), Relógio

**Card 3: "Teste abcd"**
- [ ] Avatar: Ícone pessoa
- [ ] Título: "Teste abcd"
- [ ] Origem: "Teste abcd"
- [ ] Valores: R$ 0,00 / R$ 0,00
- [ ] Qualificação: 5 estrelas vazias
- [ ] Ícones: Telefone, Relógio

**Card 4: "Venda Janeiro"**
- [ ] Avatar: Ícone pessoa
- [ ] Título: "Venda Janeiro"
- [ ] Origem: "RD Station"
- [ ] Valores: R$ 0,00 / R$ 0,00
- [ ] Qualificação: 5 estrelas vazias
- [ ] Ícones: Telefone, Relógio

**Card 5: "Projeto A"** (parcialmente visível)
- [ ] Avatar: Ícone pessoa
- [ ] Título: "Projeto A"
- [ ] Origem: "RD Station"
- [ ] Valores: R$ 0,00 / R$ 0,00
- [ ] Qualificação: 5 estrelas vazias
- [ ] Ícones: Telefone, Relógio

#### **Coluna 2: Contato Feito**

**Header**:
- [ ] Título: "Contato Feito" + dropdown
- [ ] Subtítulo: "3 oportunidades"
- [ ] Valor total: "R$ 17.900,00" + ícone info

**Cards**:

**Card 1: "Pollos Hermanos"**
- [ ] Avatar: Ícone pessoa (laranja)
- [ ] Título: "Pollos Hermanos"
- [ ] Origem: "Pollos Hermanos"
- [ ] Valores:
  - [ ] R$ 18,1 (azul)
  - [ ] R$ 1,00 (cinza)
- [ ] Qualificação: 5 estrelas (3 preenchidas)
- [ ] Ícones: Telefone, Relógio

**Card 2: "Opp 1234"**
- [ ] Avatar: Ícone pessoa
- [ ] Título: "Opp 1234"
- [ ] Origem: "RD Station"
- [ ] Valores: R$ 1,80 / R$ 0,00
- [ ] Qualificação: 5 estrelas (3 preenchidas)
- [ ] Ícones: Telefone, Relógio

**Card 3: "TESTE Video"**
- [ ] Avatar: Ícone pessoa
- [ ] Título: "TESTE Video"
- [ ] Origem: "TESTE Video"
- [ ] Valores: R$ 0,00 / R$ 0,00
- [ ] Qualificação: 1 estrela preenchida
- [ ] Ícones: Email (vermelho), Relógio

#### **Coluna 3: Visita / Apresentação**

**Header**:
- [ ] Título: "Visita / Apresentação" + dropdown
- [ ] Subtítulo: "2 oportunidades"
- [ ] Valor total: "R$ 0,00" + ícone info

**Cards**:

**Card 1: "Orçamento Dezembro (Pedido XYZ)"**
- [ ] Avatar: Ícone pessoa
- [ ] Título: "Orçamento Dezembro (Pedido XYZ)"
- [ ] Origem: "Arber SA"
- [ ] Valores: R$ 0,00 / R$ 0,00
- [ ] Qualificação: 5 estrelas vazias
- [ ] Ícones: Telefone, Relógio

**Card 2: "Tisciany (Unidade X)"**
- [ ] Avatar: Ícone pessoa
- [ ] Título: "Tisciany (Unidade X)"
- [ ] Origem: "Tisciany"
- [ ] Valores: R$ 0,00 / R$ 2,00
- [ ] Qualificação: 5 estrelas vazias
- [ ] Ícones: Telefone, Relógio

#### **Coluna 4: Proposta enviada**

**Header**:
- [ ] Título: "Proposta enviada" + dropdown
- [ ] Subtítulo: "1 oportunidades"
- [ ] Valor total: "R$ 10.000,00" + ícone info

**Card 1: "Teste 16"**
- [ ] Avatar: Ícone pessoa
- [ ] Título: "Teste 16"
- [ ] Origem: "Mario José"
- [ ] Valores:
  - [ ] R$ 10,0 (azul)
  - [ ] R$ 0,00 (cinza)
- [ ] Qualificação: 5 estrelas (todas preenchidas)
- [ ] Ícones: Telefone, Relógio

#### **Coluna 5: Fechamento**

**Header**:
- [ ] Título: "Fechamento" + dropdown
- [ ] Subtítulo: "1 oportunidades"
- [ ] Valor total: "R$ 1.000,00" + ícone info

**Card 1: "Pedido Setembro"** (com hover - card expandido)
- [ ] Avatar: Ícone pessoa
- [ ] Título: "Pedido Setembro" (link azul)
- [ ] Origem: "RD Station CRM"
- [ ] Valores:
  - [ ] R$ 1,00 (azul)
  - [ ] R$ 0,00 (cinza)
- [ ] Qualificação: 5 estrelas (3 preenchidas)
- [ ] Ícones: Telefone, Relógio

**Estado Hover** (card expandido - ver `Funil_RD 3.png`):
- [ ] Tooltip/Preview expandido mostra:
  - [ ] Título grande: "Pedido Setembro"
  - [ ] Origem: "RD Station CRM"
  - [ ] Botão: "Ver oportunidade completa →"

### **FAB (Floating Action Button)**

**Elementos**:
- [ ] Botão circular azul (canto inferior direito)
- [ ] Ícone: "+" (adicionar)
- [ ] Ação: Criar nova oportunidade

---

## 📋 Tela 2: Detalhes da Oportunidade

**URL**: `/app/deals/:id`
**Arquivo**: `tela oportunidade.png`, `Funil_RD 3.png`

### **Header da Página**

**Elementos**:
1. **Breadcrumb/Título**:
   - [ ] Botão: "←" (voltar)
   - [ ] Título: "Venda JANEIRO"
   - [ ] Subtítulo: "RD Station" (cinza)

2. **Toast/Alerta** (topo, verde):
   - [ ] Ícone: Fogo/alerta
   - [ ] Texto: "Nova oportunidade, criada hoje às 10:11. Entre em contato rapidamente para aumentar suas chances de venda."
   - [ ] Botão: "×" (fechar)

3. **Ações** (canto superior direito):
   - [ ] Botão: "👍 Marcar venda" (verde)
   - [ ] Botão: "👎 Marcar perda" (vermelho)
   - [ ] Ícone: Engrenagem (configurações)
   - [ ] Ícone: Lixeira (excluir)

4. **Informações de Contato** (canto superior direito):
   - [ ] Ícone telefone
   - [ ] Texto: "Saldo: R$ 91,12"
   - [ ] Ícone: Informação

### **Tabs de Navegação**

**Elementos**:
- [ ] Tab: "HISTÓRICO" (ativa/azul)
- [ ] Tab: "E-MAIL"
- [ ] Tab: "TAREFAS"
- [ ] Tab: "CONTATOS"
- [ ] Tab: "PRODUTOS E SERVIÇOS"
- [ ] Tab: "ARQUIVOS"

### **Conteúdo - Tab HISTÓRICO**

#### **Seção 1: Informações da Oportunidade (topo)**

**Elementos**:
- [ ] Label: "Funil e estágio de vendas"
- [ ] Funil visual horizontal:
  - [ ] Bolinha azul: "Sem contato / Lead" (atual)
  - [ ] Linha conectora
  - [ ] Bolinha branca vazia (próximo estágio)
  - [ ] ... (mais estágios)
- [ ] Label: "Qualificação"
- [ ] Estrelas: ★★★☆☆ (3 de 5)
- [ ] Label: "Valores"
- [ ] Valor 1: "●R$ 0,00" (azul)
- [ ] Valor 2: "●R$ 0,00" (cinza)
- [ ] Label: "Data de criação"
- [ ] Data: "19/01/2022 às 10:11"
- [ ] Label: "Previsão de fechamento"
- [ ] Ícone: Calendário (vazio)

#### **Seção 2: Timeline de Atividades**

**Abas**:
- [ ] Tab: "CRIAR ANOTAÇÃO" (ativa/azul)
- [ ] Tab: "CRIAR TAREFA"

**Conteúdo (Criar Anotação)**:
- [ ] Input: "Registre a anotação" (placeholder)
- [ ] Botão: "Criar anotação" (azul, full width)

**Histórico da Oportunidade**:
- [ ] Sub-tab: "HISTÓRICO DA OPORTUNIDADE" (ativa)
- [ ] Sub-tab: "HISTÓRICO DO MARKETING"

**Filtros de Histórico**:
- [ ] Checkbox: "Anotação"
- [ ] Checkbox: "Tarefa"
- [ ] Checkbox: "Alteração"
- [ ] Checkbox: "Email"
- [ ] Checkbox: "Proposta"
- [ ] Checkbox: "Resposta de email"
- [ ] Checkbox: "Ligações"
- [ ] Checkbox: "Mensageiro"
- [ ] Checkbox: "Limite de execuções da automação"

**Item de Timeline** (exemplo):
- [ ] Avatar: "MB" (Mario Becker)
- [ ] Texto: "Mario Becker a 4 minutos atrás Finalizou Teste o Mario Becker - e enviou 5sem... clssus vel dignkk fo a H^t^o^^hhio^n ffnkdjsisvn."
- [ ] Timestamp: "4 segundos atrás"

### **Sidebar Direita (Informações Complementares)**

**Elementos**:

1. **Responsável**:
   - [ ] Label: "Responsável"
   - [ ] Dropdown: "Mario Becker ▼"

2. **Dados da Empresa/Cliente** (accordion/collapsible):
   - [ ] Título: "Dados da Empresa/Cliente ▼"
   - [ ] (conteúdo colapsado, não visível)

3. **Dados da Oportunidade** (accordion/collapsible):
   - [ ] Título: "Dados da Oportunidade ▼"
   - [ ] (conteúdo colapsado)

4. **Dados do Contato** (accordion/collapsible):
   - [ ] Título: "Dados do Contato ▼"
   - [ ] (conteúdo colapsado)

5. **Carregamento** (spinner):
   - [ ] Loader animado (azul)

6. **Link**:
   - [ ] Link: "+ Adicionar contato" (azul)

---

## ✅ Tela 3: Tab TAREFAS (Oportunidade)

**Arquivo**: `tarefas.png`

### **Conteúdo - Tab TAREFAS**

#### **Seção 1: Próximas Tarefas**

**Header**:
- [ ] Título: "PRÓXIMAS TAREFAS"
- [ ] Ícone: Recarregar (circular)

**Lista de Tarefas**:

**Tarefa 1**:
- [ ] Ícone: Telefone (ligação)
- [ ] Tipo: "Ligação"
- [ ] Título: "Primeira Tentativa"
- [ ] Horário: "Hoje às 10:27"
- [ ] Ações:
  - [ ] Ícone: Editar (lápis)
  - [ ] Ícone: Relógio (?)
  - [ ] Botão: Checkbox azul (marcar concluída)

**Tarefa 2**:
- [ ] Ícone: WhatsApp
- [ ] Tipo: "Whatsapp"
- [ ] Título: "Tentativa 2"
- [ ] Horário: "Hoje às 11:12"
- [ ] Ações:
  - [ ] Ícone: Editar
  - [ ] Ícone: Relógio
  - [ ] Botão: Checkbox azul

**Link**:
- [ ] Link: "+ Ver Mais" (azul)

#### **Seção 2: Criar Tarefa**

**Abas**:
- [ ] Tab: "CRIAR ANOTAÇÃO"
- [ ] Tab: "CRIAR TAREFA" (ativa/azul)

**Formulário**:

1. **Tipo**:
   - [ ] Label: "Tipo"
   - [ ] Dropdown: "Assunto ▼" (com ícone telefone)
   - [ ] Opção selecionada: "Ligação"

2. **Título** (não visível no screenshot, mas implícito):
   - [ ] Input: Título da tarefa

3. **Data**:
   - [ ] Label: "Data *"
   - [ ] Date picker: "📅 19/01/2022"
   - [ ] Ícone: Relógio
   - [ ] Time picker: "🕐 10:12"

4. **Responsável**:
   - [ ] Label: "Responsável"
   - [ ] Avatar: "Mario Becker" (com foto)
   - [ ] Email: "mario.becker@rdstation.com"
   - [ ] Checkbox: "✓ Adicionado"
   - [ ] Link: "Buscar responsável" (azul)

**FAB**:
- [ ] Botão: "+" (azul, canto inferior direito)

---

## 🛍️ Tela 4: Tab PRODUTOS E SERVIÇOS (Oportunidade)

**Arquivo**: `produtos e serviços.png`

### **Conteúdo - Tab PRODUTOS E SERVIÇOS**

#### **Formulário: Adicionar produtos e serviços**

**Título**:
- [ ] Título: "Adicionar produtos e serviços"
- [ ] Subtítulo: "Adicione produtos e serviços para a sua oportunidade"

**Campos**:

1. **Buscar Produto**:
   - [ ] Label: "Buscar *"
   - [ ] Dropdown: "CURSO XYZ ▼"

2. **Produto Selecionado**:
   - [ ] Label: "Produto: *"
   - [ ] (exibe produto selecionado - não visível no screenshot)

3. **Quantidade**:
   - [ ] Label: "Quantidade"
   - [ ] Input numérico: "1"

4. **Preço**:
   - [ ] Label: "Preço"
   - [ ] Input: "R$ 2.000,00"

5. **Recorrência**:
   - [ ] Label: "Recorrência"
   - [ ] Dropdown: "Único" (aberto no screenshot)
   - [ ] Opções:
     - [ ] "Único" (hover/selecionado)
     - [ ] "Recorrente"

6. **Desconto** (checkbox):
   - [ ] Checkbox: "📋 Desconto" (desmarcado)

**Botão de Ação**:
- [ ] Botão: "Adicionar produto/serviço à oportunidade" (azul, canto inferior direito)

#### **Tabela: Produtos Adicionados**

**Header da Tabela**:
- [ ] Coluna: "Produto ou serviço"
- [ ] Coluna: "Qtde"
- [ ] Coluna: "Preço"
- [ ] Coluna: "Recorrência"
- [ ] Coluna: "Subtotal"
- [ ] Coluna: "Opções"

**Estado Vazio**:
- [ ] Mensagem: "Nenhum produto adicionado à oportunidade"

**FAB**:
- [ ] Botão: "+" (azul)

---

## 📧 Tela 5: Tab E-MAIL (Oportunidade)

**Arquivo**: `emails.png`

### **Conteúdo - Tab E-MAIL**

#### **Header de Informações da Oportunidade** (topo)

**Elementos**:
- [ ] Label: "Funil e estágio de vendas"
- [ ] Funil visual: (mesmo da Tab HISTÓRICO)
- [ ] Label: "Qualificação"
- [ ] Estrelas: ★★★☆☆
- [ ] Label: "Valores"
- [ ] Valor 1: "●R$ 2.000,00" (azul)
- [ ] Valor 2: "●R$ 0,00" (cinza)
- [ ] Label: "Data de criação"
- [ ] Data: "19/01/2022 às 10:11"
- [ ] Label: "Data de fechamento"
- [ ] Data: "19/01/2022" + ícone editar

#### **Formulário: Novo E-mail**

**Título**:
- [ ] Título: "Novo E-mail"

**Campos**:

1. **De (From)**:
   - [ ] Label: "De"
   - [ ] Texto: "Mario Becker <mario.becker@rdstation.com>"

2. **Para (To)**:
   - [ ] Label: "Para"
   - [ ] Tag/Chip: "×" Mario" <mario@rdstation.xyz>"
   - [ ] Links: "CC" | "BCC"

3. **Modelo de E-mail**:
   - [ ] Label: "Escolher modelo de e-mail"
   - [ ] Link: "Selecione um modelo" (azul, underline)

4. **Assunto**:
   - [ ] Label: "Assunto: *"
   - [ ] Input: "Assunto do E-mail *" (placeholder)

**Editor de Texto Rico** (WYSIWYG):
- [ ] Barra de ferramentas:
  - [ ] Dropdown: "Formato ▼"
  - [ ] Dropdown: "Fonte ▼"
  - [ ] Dropdown: "Tamanho ▼"
  - [ ] Botão: "B" (negrito)
  - [ ] Botão: "I" (itálico)
  - [ ] Botão: "U" (sublinhado)
  - [ ] Botões: Alinhamento (esquerda, centro, direita, justificado)
  - [ ] Botão: Lista
  - [ ] Botão: "🔗" (link)
  - [ ] Botão: "Código-Fonte"
  - [ ] Botão: "≡" (mais opções)
  - [ ] Botão: "📎" (anexar)
  - [ ] Botão: "🖼️" (imagem)
- [ ] Área de texto: (corpo do email)

**Assinatura**:
- [ ] Email: "mario@rdstation.xyz" (em texto azul/link)

**Botões de Ação** (não visíveis completamente, mas implícitos):
- [ ] Botão: "Enviar" (azul)
- [ ] Botão: "Cancelar" ou "Salvar Rascunho"

**Ações no Topo** (lado direito):
- [ ] Botão: "Sim" (azul)
- [ ] Botão: "Não" (vermelho)

**FAB**:
- [ ] Botão: "+" (azul)

---

## 📝 Tela 6: Modal - Modelos de Email

**Arquivo**: `modelos de e-mail.png`

### **Modal: Modelos de Email**

**Header do Modal**:
- [ ] Título: "Modelos de Email"

**Sidebar Esquerda (Lista de Modelos)**:

**Campo de Busca**:
- [ ] Input: "Pesquisar" (com ícone lupa)

**Lista de Modelos**:
- [ ] Item: "Apresentação RD Station CRM" (hover/selecionado - azul)
- [ ] Item: "Proposta"
- [ ] Item: "Tentativa de Contato"

**Preview do Modelo** (Área Principal à Direita):

**Conteúdo**:
- [ ] Saudação: "Olá Mario, tudo bem?"
- [ ] Parágrafo 1: "Como combinamos, segue a apresentação em PDF do RD Station CRM."
- [ ] Parágrafo 2: "No documento você encontrará informações sobre a nossa empresa e sobre a ferramenta. É um excelente documento para apresentar internamente na conversa com a equipe"
- [ ] Parágrafo 3: "Assim que ver o material, por favor, me avise para agendarmos a nossa reunião."
- [ ] Despedida: "Abraços"

**Footer do Modal**:
- [ ] Botão: "Cancelar" (texto vermelho, à esquerda)
- [ ] Botão: "SELECIONAR MODELO" (azul, à direita)

---

## 🎛️ Tela 7: Configuração de Funis

**Arquivo**: `Funil_4.png`

### **Header da Página**

**Elementos**:
- [ ] Breadcrumb:
  - [ ] Link: "←" (voltar)
  - [ ] Texto: "Funis de vendas"
  - [ ] Ícone: Informação (i)
  - [ ] Link: "Configurações"

### **Tabs**:
- [ ] Tab: "FUNIL DE VENDAS" (ativa)
- [ ] Tab: "CRM2CRM"

### **Título da Seção**

**Elementos**:
- [ ] Título: "Configure seus funis de vendas para organizar seu processo comercial"
- [ ] Ícone: Ajuda (?)

### **Funil 1: FUNIL PADRÃO (Não Alterar)**

**Header do Funil**:
- [ ] Ícone: "▷" (expandir/colapsar)
- [ ] Título: "Funil PADRÃO ( Não Alterar )" + ícone editar
- [ ] Link: "⚙️ Editar automação entre funis" (azul)
- [ ] Ícone: Lixeira (excluir funil)

**Editor Visual de Estágios** (horizontal):

**Estágios**:
1. **Sem contato / Lead**:
   - [ ] Círculo azul preenchido
   - [ ] Label: "Sem contato / Lead"
   - [ ] Sigla: "Sigla: SC/L"
2. **Contato Feito**:
   - [ ] Círculo azul preenchido
   - [ ] Label: "Contato Feito"
   - [ ] Sigla: "Sigla: CF"
3. **Visita / Apresentação**:
   - [ ] Círculo azul preenchido
   - [ ] Label: "Visita / Apresentação"
   - [ ] Sigla: "Sigla: V/A"
4. **Proposta enviada**:
   - [ ] Círculo azul preenchido
   - [ ] Label: "Proposta enviada"
   - [ ] Sigla: "Sigla: PE"
5. **Fechamento**:
   - [ ] Círculo azul preenchido
   - [ ] Label: "Fechamento"
   - [ ] Sigla: "Sigla: F"
6. **Botão Adicionar** (final):
   - [ ] Círculo verde com "+"

**Linhas Conectoras**:
- [ ] Linha azul conectando todos os círculos

### **Funil 2: Funil Prospecção**

**Header do Funil**:
- [ ] Ícone: "▷" (expandir)
- [ ] Título: "Funil Prospecção"
- [ ] Link: "⚙️ Editar automação entre funis"
- [ ] Ícone: Lixeira

**Estágios** (8 estágios):
1. Sem contato (SC)
2. Prospecção (P)
3. Contato feito (CF)
4. Identificação de interesse (IDI)
5. Proposta (P)
6. Matriculado (M)
7. Boleto pago (BP)
8. Botão "+" (adicionar estágio)

### **Funil 3: Funil de carteira**

**Header do Funil** (parcialmente visível):
- [ ] Ícone: "▷"
- [ ] Título: "Funil de carteira"
- [ ] Link: "⚙️ Editar automação entre funis"
- [ ] Ícone: Lixeira

**Estágios** (parcialmente visíveis):
- [ ] Vários círculos azuis conectados
- [ ] (detalhes não visíveis no screenshot)

---

## 🗺️ ROADMAP DE NAVEGAÇÃO (A → B)

### **Fluxo 1: Login → Dashboard → Funil**

```
1. Login Page
   └─► [Entrar] → Dashboard/Home

2. Dashboard
   └─► Click: "Oportunidades" (nav superior)
       └─► Funil de Vendas (Kanban)
```

### **Fluxo 2: Funil → Detalhes da Oportunidade**

```
3. Funil de Vendas (Kanban)
   ├─► Click: Card "Pedido Setembro"
   │   └─► Detalhes da Oportunidade (Tab HISTÓRICO)
   │
   ├─► Click: FAB "+" (azul)
   │   └─► Modal: Criar Nova Oportunidade
   │
   ├─► Drag: Card para outra coluna
   │   └─► Atualiza estágio (backend)
   │   └─► Recarrega totalizadores da coluna
   │
   └─► Click: Dropdown "Funil PADRÃO"
       └─► Seletor de Funis
           └─► Recarrega Kanban com funil selecionado
```

### **Fluxo 3: Navegação nas Tabs da Oportunidade**

```
4. Detalhes da Oportunidade (Tab HISTÓRICO)
   ├─► Click: Tab "E-MAIL"
   │   └─► Tab E-MAIL (formulário de envio)
   │       ├─► Click: "Selecione um modelo"
   │       │   └─► Modal: Modelos de Email
   │       │       ├─► Click: Modelo "Apresentação RD Station CRM"
   │       │       └─► [SELECIONAR MODELO]
   │       │           └─► Preenche corpo do email
   │       │
   │       └─► [Enviar Email]
   │           └─► Email enviado
   │           └─► Adiciona item na Timeline (Tab HISTÓRICO)
   │
   ├─► Click: Tab "TAREFAS"
   │   └─► Tab TAREFAS
   │       ├─► Click: Tab "CRIAR TAREFA"
   │       │   └─► Formulário de tarefa
   │       │       └─► [Criar tarefa]
   │       │           └─► Adiciona em "PRÓXIMAS TAREFAS"
   │       │           └─► Incrementa badge "Tarefas (67)" na nav superior
   │       │
   │       └─► Click: Checkbox (marcar tarefa concluída)
   │           └─► Remove de "PRÓXIMAS TAREFAS"
   │           └─► Adiciona item na Timeline
   │
   ├─► Click: Tab "CONTATOS"
   │   └─► Tab CONTATOS (lista de contatos vinculados)
   │       └─► Click: "+ Adicionar contato"
   │           └─► Modal: Buscar/Criar Contato
   │
   ├─► Click: Tab "PRODUTOS E SERVIÇOS"
   │   └─► Tab PRODUTOS E SERVIÇOS
   │       ├─► Dropdown: "CURSO XYZ"
   │       │   └─► Seleciona produto
   │       │
   │       ├─► Input: Quantidade = 1
   │       │
   │       ├─► Input: Preço = R$ 2.000,00
   │       │
   │       ├─► Dropdown: Recorrência = "Único"
   │       │
   │       └─► [Adicionar produto/serviço à oportunidade]
   │           └─► Adiciona linha na tabela
   │           └─► Atualiza "Valores" (R$ 2.000,00)
   │
   └─► Click: Tab "ARQUIVOS"
       └─► Tab ARQUIVOS (upload de arquivos)
           └─► Drag-and-drop: Arquivo PDF
               └─► Upload para servidor
               └─► Adiciona item na lista de arquivos
```

### **Fluxo 4: Ações na Oportunidade**

```
5. Detalhes da Oportunidade
   ├─► Click: "👍 Marcar venda"
   │   └─► Modal: Confirmar venda
   │       └─► [Confirmar]
   │           └─► Move para estágio "Ganho/Won"
   │           └─► Remove do Kanban "Fechamento"
   │           └─► Adiciona em relatório de vendas
   │
   ├─► Click: "👎 Marcar perda"
   │   └─► Modal: Motivo da perda
   │       └─► [Confirmar]
   │           └─► Move para estágio "Perdido/Lost"
   │           └─► Remove do Kanban
   │           └─► Adiciona em relatório de perdas
   │
   ├─► Click: Ícone "Engrenagem"
   │   └─► Dropdown: Opções
   │       ├─► Editar oportunidade
   │       ├─► Duplicar oportunidade
   │       ├─► Converter em pedido (se aplicável)
   │       └─► Arquivar
   │
   ├─► Click: Ícone "Lixeira"
   │   └─► Modal: Confirmar exclusão
   │       └─► [Confirmar]
   │           └─► Exclui oportunidade
   │           └─► Redireciona para Funil
   │
   ├─► Click: "←" (voltar)
   │   └─► Retorna para Funil de Vendas
   │
   └─► Click: Dropdown "Responsável: Mario Becker"
       └─► Seletor de usuários
           └─► Seleciona novo responsável
               └─► Atualiza responsável
               └─► Notifica novo responsável (email/notificação)
```

### **Fluxo 5: Navegação Principal (Top Nav)**

```
6. Navegação Superior (qualquer página)
   ├─► Click: "Oportunidades"
   │   └─► Funil de Vendas
   │
   ├─► Click: "Empresas/Clientes"
   │   └─► Lista de Empresas/Clientes (DataTable)
   │       ├─► Click: Cliente "João Silva"
   │       │   └─► Detalhes do Cliente
   │       │       ├─► Tab: Dados cadastrais
   │       │       ├─► Tab: Oportunidades vinculadas
   │       │       ├─► Tab: Contatos
   │       │       ├─► Tab: Histórico de interações
   │       │       └─► Tab: Arquivos
   │       │
   │       └─► Click: FAB "+"
   │           └─► Modal: Criar Novo Cliente
   │               └─► Input: CNPJ (autocomplete)
   │               └─► [Salvar]
   │                   └─► Cria cliente
   │                   └─► Redireciona para Detalhes do Cliente
   │
   ├─► Click: "Contatos"
   │   └─► Lista de Contatos (DataTable)
   │       └─► (fluxo similar a Clientes)
   │
   ├─► Click: "Tarefas (67)"
   │   └─► Lista de Tarefas
   │       ├─► Filtros: Minhas tarefas, Todas, Atrasadas, Hoje, Amanhã
   │       ├─► Agrupamento: Por data, Por tipo, Por responsável
   │       │
   │       └─► Click: Tarefa "Ligação - Primeira Tentativa"
   │           └─► Modal: Detalhes da Tarefa
   │               ├─► [Marcar concluída]
   │               ├─► [Editar]
   │               ├─► [Excluir]
   │               └─► [Reagendar]
   │
   └─► Click: "Analisar"
       └─► Dashboard de Análises/Relatórios
           ├─► Tab: Funil de Conversão
           ├─► Tab: Desempenho por Vendedor
           ├─► Tab: Previsão de Receita
           ├─► Tab: Produtos Mais Vendidos
           └─► Tab: Relatórios Personalizados
```

### **Fluxo 6: Configurações**

```
7. Qualquer Página
   └─► Click: Avatar "MB" (Mario Becker) → Dropdown
       ├─► Meu perfil
       │   └─► Página de Perfil
       │       ├─► Dados pessoais
       │       ├─► Alterar senha
       │       ├─► Preferências
       │       └─► Notificações
       │
       ├─► Configurações da conta
       │   └─► Configurações
       │       ├─► Usuários e permissões
       │       ├─► Funis de vendas → (Tela 7: Configuração de Funis)
       │       ├─► Produtos e serviços
       │       ├─► Integrações (Email, Slack, Calendar)
       │       ├─► Automações
       │       └─► Customização (logo, cores)
       │
       └─► Sair
           └─► Logout → Redireciona para Login Page
```

### **Fluxo 7: Busca Global**

```
8. Qualquer Página
   └─► Click: Ícone Busca (lupa) → Input aparece
       ├─► Digite: "Pedido Setembro"
       │   └─► Dropdown de resultados:
       │       ├─► Oportunidades: "Pedido Setembro" (R$ 1.000)
       │       ├─► Clientes: (nenhum resultado)
       │       ├─► Contatos: (nenhum resultado)
       │       └─► Produtos: (nenhum resultado)
       │
       └─► Click: Resultado "Oportunidade: Pedido Setembro"
           └─► Redireciona para Detalhes da Oportunidade
```

### **Fluxo 8: Notificações**

```
9. Qualquer Página
   └─► Click: Ícone Notificações (sino) + Badge vermelho
       └─► Dropdown de notificações:
           ├─► "Nova tarefa atribuída a você" (2 min atrás)
           ├─► "João Silva respondeu seu email" (1 hora atrás)
           ├─► "Oportunidade 'Teste 16' mudou para 'Proposta enviada'" (3 horas atrás)
           │
           └─► Click: Notificação "João Silva respondeu seu email"
               └─► Redireciona para Tab E-MAIL da oportunidade
                   └─► Abre thread de emails
```

---

## 📊 Mapa de Entidades (Baseado nas Telas)

### **Entidades Identificadas**:

1. **User (Usuário)**
   - id
   - name (ex: "Mario Becker")
   - email (ex: "mario.becker@rdstation.com")
   - avatar
   - role (admin, vendedor, assistente)
   - account_type (ex: "Conta DEMO PRO")

2. **Client (Empresa/Cliente)**
   - id
   - name
   - cnpj (autocomplete)
   - status (ativo, inativo)
   - created_at

3. **Contact (Contato)**
   - id
   - client_id (FK)
   - name
   - email
   - phone
   - role (cargo)

4. **Opportunity (Oportunidade)**
   - id
   - title (ex: "Venda JANEIRO", "Pedido Setembro")
   - client_id (FK) - origem (ex: "RD Station", "Pollos Hermanos")
   - stage (ex: "Sem contato / Lead", "Fechamento")
   - value_1 (R$ azul)
   - value_2 (R$ cinza)
   - qualification (0-5 estrelas)
   - created_at
   - expected_close_date
   - assigned_to (user_id FK)
   - funnel_id (FK)

5. **Funnel (Funil)**
   - id
   - name (ex: "Funil PADRÃO (Não Alterar)", "Funil Prospecção")
   - stages (array de Stage)

6. **Stage (Estágio do Funil)**
   - id
   - funnel_id (FK)
   - name (ex: "Sem contato / Lead", "Contato Feito")
   - abbreviation (ex: "SC/L", "CF")
   - order (posição no funil)
   - color

7. **Task (Tarefa)**
   - id
   - opportunity_id (FK)
   - type (Ligação, WhatsApp, Email, Reunião, etc.)
   - title (ex: "Primeira Tentativa")
   - description
   - due_date
   - due_time
   - assigned_to (user_id FK)
   - status (pending, completed)
   - created_by (user_id FK)

8. **Product (Produto/Serviço)**
   - id
   - name (ex: "CURSO XYZ")
   - price (R$ 2.000,00)
   - recurrence (Único, Recorrente)
   - category (Som, Luz, Estrutura)

9. **OpportunityProduct (Produto vinculado à Oportunidade)**
   - id
   - opportunity_id (FK)
   - product_id (FK)
   - quantity
   - unit_price
   - discount (%)
   - subtotal

10. **Email (Email enviado)**
    - id
    - opportunity_id (FK)
    - from_email
    - to_email
    - cc
    - bcc
    - subject
    - body (HTML)
    - sent_at
    - template_id (FK, opcional)

11. **EmailTemplate (Modelo de Email)**
    - id
    - name (ex: "Apresentação RD Station CRM", "Proposta")
    - subject
    - body (HTML)
    - created_by (user_id FK)

12. **Note (Anotação)**
    - id
    - opportunity_id (FK)
    - content
    - created_by (user_id FK)
    - created_at

13. **ActivityLog (Timeline/Histórico)**
    - id
    - opportunity_id (FK)
    - type (anotação, tarefa, email, alteração, proposta, ligação)
    - description
    - created_by (user_id FK)
    - created_at

14. **File (Arquivo anexado)**
    - id
    - opportunity_id (FK)
    - filename
    - file_url (Supabase Storage)
    - file_size
    - uploaded_by (user_id FK)
    - uploaded_at

---

## 🎨 Design Tokens Extraídos do RD Station

### **Cores**

```css
/* Primary */
--rd-blue-primary: #00a4e4;
--rd-blue-hover: #0085b8;

/* Status */
--rd-green-success: #28a745;
--rd-red-error: #dc3545;
--rd-yellow-warning: #ffc107;

/* Grayscale */
--rd-gray-50: #f8f9fa;
--rd-gray-100: #e9ecef;
--rd-gray-200: #dee2e6;
--rd-gray-300: #ced4da;
--rd-gray-400: #adb5bd;
--rd-gray-500: #6c757d;
--rd-gray-600: #495057;
--rd-gray-700: #343a40;
--rd-gray-800: #212529;

/* Background */
--rd-bg-kanban-column: #f5f5f5;
--rd-bg-card: #ffffff;
--rd-bg-header: #ffffff;

/* Borders */
--rd-border-light: #e0e0e0;
--rd-border-medium: #bdbdbd;

/* Text */
--rd-text-primary: #212529;
--rd-text-secondary: #6c757d;
--rd-text-muted: #adb5bd;
```

### **Tipografia**

```css
/* Font Family */
--rd-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

/* Font Sizes */
--rd-font-xs: 11px;
--rd-font-sm: 13px;
--rd-font-base: 14px;
--rd-font-md: 16px;
--rd-font-lg: 18px;
--rd-font-xl: 24px;
--rd-font-2xl: 32px;

/* Font Weights */
--rd-font-normal: 400;
--rd-font-medium: 500;
--rd-font-semibold: 600;
--rd-font-bold: 700;
```

### **Spacing**

```css
--rd-space-1: 4px;
--rd-space-2: 8px;
--rd-space-3: 12px;
--rd-space-4: 16px;
--rd-space-5: 20px;
--rd-space-6: 24px;
--rd-space-8: 32px;
--rd-space-10: 40px;
--rd-space-12: 48px;
```

### **Border Radius**

```css
--rd-radius-sm: 3px;
--rd-radius-md: 6px;
--rd-radius-lg: 8px;
--rd-radius-xl: 12px;
--rd-radius-full: 9999px;
```

### **Shadows**

```css
--rd-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--rd-shadow-md: 0 2px 4px rgba(0, 0, 0, 0.1);
--rd-shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.15);
--rd-shadow-card: 0 1px 3px rgba(0, 0, 0, 0.12);
--rd-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.15);
```

---

## ✅ Componentes Reutilizáveis Identificados

### **Atoms (≤20 linhas)**

1. **Avatar** (circular, com iniciais ou foto)
2. **Badge** (contadores, status)
3. **Button** (primary, outline, icon)
4. **Input** (text, email, number, date, time)
5. **Select/Dropdown**
6. **Checkbox**
7. **Star Rating** (5 estrelas)
8. **Icon** (telefone, email, relógio, etc.)
9. **Tag/Chip** (emails, categorias)
10. **Loader/Spinner**

### **Molecules (≤35 linhas)**

1. **Kanban Card** (oportunidade)
2. **Task Item** (item de tarefa com ações)
3. **Timeline Item** (histórico)
4. **Product Row** (tabela de produtos)
5. **Email Preview** (modelo de email)
6. **Stage Circle** (círculo do funil)
7. **Stat Badge** (valor + contador)
8. **Dropdown Menu** (avatar dropdown, actions)
9. **Search Input** (com ícone)
10. **Date Time Picker**

### **Organisms (≤50 linhas)**

1. **Top Navigation Bar** (com links + avatar + busca)
2. **Kanban Column** (header + cards)
3. **Opportunity Header** (título + ações + valores)
4. **Tab Navigation** (HISTÓRICO, E-MAIL, TAREFAS, etc.)
5. **Email Composer** (formulário completo)
6. **Task Form** (criar/editar tarefa)
7. **Product Form** (adicionar produto)
8. **Timeline** (lista de atividades)
9. **Funil Editor** (configuração visual)
10. **Modal** (container com header + body + footer)

### **Templates (≤30 linhas)**

1. **Kanban Board Layout** (sidebar + colunas)
2. **Detail Page Layout** (header + tabs + sidebar)
3. **Modal Layout** (overlay + centered content)
4. **List Page Layout** (header + filtros + table/grid)

---

## 🎯 Próximos Passos

1. ✅ **Análise completa das telas RD Station** (FEITO)
2. ✅ **Roadmap de navegação (A → B)** (FEITO)
3. 🔄 **Criar designs no Superdesign** baseado nesta análise
4. 📊 **Mapear schema do banco** baseado nas entidades
5. 💻 **Implementar componentes** (Atoms → Organisms)
6. 🔗 **Implementar navegação** conforme roadmap

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**

**Próxima Etapa**: Instalar Superdesign e criar designs adaptados para STAGETEK
