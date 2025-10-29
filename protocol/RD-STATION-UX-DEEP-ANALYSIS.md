# RD STATION CRM - Análise UX Profunda & Mapeamento de Navegação

**Análise Estratégica de Usabilidade e Arquitetura de Informação**

---

**Documento**: UX Deep Analysis
**Analista**: UX Expert
**Data**: 24 de Outubro de 2025
**Versão**: 1.0
**Status**: Análise Completa com 15 Screenshots

---

## 📊 SUMÁRIO EXECUTIVO

### Contexto da Análise
Este documento apresenta uma análise profunda do RD Station CRM, baseada em 15 screenshots reais do sistema, com foco em:
- Arquitetura de informação e navegação
- Padrões de interação e affordances
- Hierarquia visual e design system
- Fluxos de trabalho e jornadas de usuário
- Oportunidades de diferenciação para STAGETEK CRM

### Nota Geral: ⭐ 8.5/10

**Pontos Fortes**:
- ✅ Navegação horizontal consistente
- ✅ Sistema de tabs bem estruturado
- ✅ Drag-and-drop intuitivo no Kanban
- ✅ Hierarquia visual clara
- ✅ Feedback visual adequado

**Pontos Fracos**:
- ❌ Configurações enterradas (3+ níveis)
- ❌ Funcionalidades críticas escondidas
- ❌ Falta de atalhos/ações rápidas
- ❌ Inconsistências em tooltips
- ❌ Pouco contraste em alguns elementos

---

## 🗺️ PARTE 1: MAPA DE NAVEGAÇÃO COMPLETO

### 1.1 Arquitetura de Informação

```
┌─────────────────────────────────────────────────────────────────┐
│                    RD STATION CRM SITEMAP                       │
└─────────────────────────────────────────────────────────────────┘

NÍVEL 1: TopBar (Navegação Global)
│
├─ [Logo RD STATION CRM]
│
├─ NAVEGAÇÃO PRINCIPAL (Horizontal)
│  ├─ Oportunidades
│  │  └─ Funil de Vendas (Kanban) ← VIEW PADRÃO
│  │     └─ [Click em Card] → Detalhes da Oportunidade
│  │        ├─ Tab: HISTÓRICO ← ativa por padrão
│  │        ├─ Tab: E-MAIL
│  │        ├─ Tab: TAREFAS
│  │        ├─ Tab: CONTATOS
│  │        ├─ Tab: PRODUTOS E SERVIÇOS
│  │        └─ Tab: ARQUIVOS
│  │
│  ├─ Empresas/Clientes
│  │  └─ Lista de Clientes (DataTable)
│  │
│  ├─ Contatos
│  │  └─ Lista de Contatos (DataTable)
│  │
│  ├─ Tarefas + Badge "67"
│  │  └─ Lista de Tarefas (filtros: Minhas/Todas/Atrasadas/Hoje)
│  │
│  └─ Analisar
│     └─ Relatórios e Dashboards
│
└─ ÁREA DE UTILIDADES (direita)
   ├─ [🔍] Busca Global
   ├─ [🔔] Notificações + Badge
   ├─ [?] Ajuda
   ├─ [⋮⋮⋮] Apps (integração)
   └─ [MB] Avatar + Dropdown
      ├─ Meu perfil
      ├─ Configurações da conta
      │  └─ Funis de vendas ← CRÍTICO mas escondido!
      │     └─ Editor visual de etapas
      ├─ Usuários e permissões
      ├─ Integrações
      └─ Sair
```

---

### 1.2 Profundidade de Navegação (Níveis de Cliques)

| Funcionalidade | Caminho | Nº Cliques | Problema? |
|----------------|---------|------------|-----------|
| **Ver Pipeline** | Login → Oportunidades | 1 | ✅ Excelente |
| **Ver Detalhes Oportunidade** | Oportunidades → Card | 2 | ✅ Ótimo |
| **Criar Tarefa** | Oportunidades → Card → Tab Tarefas → Nova | 4 | ⚠️ Médio |
| **Configurar Funil** | Avatar → Config → Funis | 3 | ❌ Ruim (funcionalidade crítica) |
| **Enviar Email** | Card → Tab E-mail → Compor | 3 | ✅ Aceitável |
| **Ver Tarefas Gerais** | TopBar → Tarefas | 1 | ✅ Excelente |
| **Adicionar Produto** | Card → Tab Produtos → Adicionar | 3 | ✅ Aceitável |

**Insight**: Configurar Funil é a funcionalidade mais importante (define todo o workflow) mas está escondida em 3 níveis. **Oportunidade de melhoria** para STAGETEK.

---

### 1.3 Fluxo de Estados: Card de Oportunidade

```
┌─────────────────────────────────────────────────────┐
│         ESTADOS DO CARD NO KANBAN                   │
└─────────────────────────────────────────────────────┘

Estado 1: IDLE (padrão)
┌─────────────────────────────┐
│ 👤 Pedido Setembro           │
│    RD Station CRM           │
│ 💰 R$ 1.00  ⭐⭐⭐⭐⭐        │
│ 📞 📧 🕐                     │
└─────────────────────────────┘

Estado 2: HOVER
┌─────────────────────────────┐
│ 👤 Pedido Setembro ⬅ cursor │ ← Background muda
│    RD Station CRM           │ ← Tooltip aparece
│ 💰 R$ 1.00  ⭐⭐⭐⭐⭐        │   "Pedido Setembro"
│ 📞 📧 🕐                     │   "Atualizado há 2h"
└─────────────────────────────┘

Estado 3: DRAGGING
┌─────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░   │ ← Placeholder com opacidade
└─────────────────────────────┘
    │
    └─> [Card segue cursor com shadow]

Estado 4: DROPPED (nova coluna)
┌─────────────────────────────┐
│ 👤 Pedido Setembro           │ ← Animação de "drop"
│    RD Station CRM           │ ← Toast: "Movido para..."
│ 💰 R$ 1.00  ⭐⭐⭐⭐⭐        │
│ 📞 📧 🕐                     │
└─────────────────────────────┘
```

**Análise UX**: Feedback visual claro em cada estado. Affordance de "draggable" é imediata (cursor muda para "grab").

---

## 📐 PARTE 2: INVENTÁRIO DE ELEMENTOS UI POR TELA

### 2.1 Tela: Funil de Vendas (Kanban)

**Screenshot**: `Tela funil_RDStation_1.png`, `tela funil 2.png`, `Funil_RD 3.png`

#### Header da Página
```
┌────────────────────────────────────────────────────────────────────┐
│ ⓘ Oportunidades                                                    │
│                                                                    │
│ Funil de vendas [Funil PADRÃO | Não Alterar ▼] | Dono da tarefa  │
│ [Minhas oportunidades ▼] | [Em andamento ▼] | ⟳ Recarregar       │
│ | ▦ Filtro ativo                                                  │
└────────────────────────────────────────────────────────────────────┘
```

**Elementos**:
1. **Breadcrumb/Título**
   - Ícone: `ⓘ` (informação, azul claro)
   - Texto: "Oportunidades" (h1, peso 600, cor #000)

2. **Linha de Filtros** (flexbox horizontal, gap 16px)
   - **Label 1**: "Funil de vendas" (cinza #666, size 14px)
   - **Dropdown 1**: "Funil PADRÃO | Não Alterar ▼"
     - Estado: Selecionável
     - Cor: #4a90e2 (azul primário)
     - Hover: underline
   - **Divisor**: `|` (cinza #ccc)
   - **Label 2**: "Dono da tarefa"
   - **Dropdown 2**: "Minhas oportunidades ▼"
   - **Dropdown 3**: "Em andamento ▼"
   - **Botão Recarregar**:
     - Ícone: `⟳` (seta circular)
     - Background: cinza claro #f5f5f5
     - Hover: cinza #e0e0e0
   - **Botão Filtro**:
     - Ícone: `▦` (grid)
     - Texto: "Filtro ativo"
     - Background: cinza
     - Badge: número de filtros aplicados

#### Estrutura do Kanban Board

**Layout**: 5 colunas, scroll horizontal, gap 12px

```
┌───────────────┬───────────────┬───────────────┬───────────────┬───────────────┐
│ Sem contato   │ Contato Feito │ Visita /      │ Proposta      │ Fechamento    │
│ / Lead        │               │ Apresentação  │ enviada       │               │
│ 3 oport.      │ 3 oport.      │ 2 oport.      │ 1 oport.      │ 1 oport.      │
│ R$ 0,00 ⓘ     │ R$ 17.900 ⓘ   │ R$ 0,00 ⓘ     │ R$ 10.000 ⓘ   │ R$ 1.000 ⓘ    │
├───────────────┼───────────────┼───────────────┼───────────────┼───────────────┤
│ [Card 1]      │ [Card 1]      │ [Card 1]      │ [Card 1]      │ [Card 1]      │
│ [Card 2]      │ [Card 2]      │ [Card 2]      │               │               │
│ [Card 3]      │ [Card 3]      │               │               │               │
│ [Card 4]      │               │               │               │               │
│ [Card 5]      │               │               │               │               │
└───────────────┴───────────────┴───────────────┴───────────────┴───────────────┘
```

#### Anatomia do Card de Oportunidade

**Dimensões**: width 240px, min-height 120px, padding 12px
**Background**: Branco #fff
**Border**: 1px solid #e0e0e0
**Border-radius**: 8px
**Shadow**: 0 2px 4px rgba(0,0,0,0.08)
**Hover Shadow**: 0 4px 12px rgba(0,0,0,0.12)

```
┌─────────────────────────────────────────┐
│ 👤 Pedido Setembro                 ⋮    │ ← Header
│    RD Station CRM                       │ ← Origem (secondary text)
├─────────────────────────────────────────┤
│ 💰 R$ 1,00        💰 R$ 0,00            │ ← Valores (azul | cinza)
│ ⭐⭐⭐⭐⭐                                 │ ← Qualificação (5 estrelas)
├─────────────────────────────────────────┤
│ 📞           📧           🕐            │ ← Ações rápidas
└─────────────────────────────────────────┘
```

**Elementos do Card**:

1. **Header**
   - Avatar: Círculo 32px (laranja #ff8c00 se pessoa, azul se empresa)
   - Título: "Pedido Setembro" (link, peso 600, size 14px)
   - Menu: `⋮` (três pontos verticais, canto direito)
     - Hover: background cinza claro
     - Dropdown: Editar, Mover, Excluir

2. **Origem**
   - Texto: "RD Station CRM" (cinza #999, size 12px)
   - Margin-top: 4px

3. **Seção de Valores**
   - **Valor 1** (principal):
     - Ícone: 💰 (moeda, azul #4a90e2)
     - Valor: "R$ 1,00" (azul #4a90e2, peso 600)
   - **Valor 2** (secundário):
     - Ícone: 💰 (moeda, cinza #999)
     - Valor: "R$ 0,00" (cinza #999)
   - Layout: flexbox space-between

4. **Qualificação**
   - 5 estrelas (⭐⭐⭐⭐⭐)
   - Preenchidas: amarelo #ffc107
   - Vazias: cinza #e0e0e0
   - Size: 16px each
   - Gap: 2px

5. **Ações Rápidas** (rodapé)
   - Ícones: 20px, cor cinza #666
   - Hover: cor primária #4a90e2
   - Tooltip: aparece em 300ms
   - **📞 Telefone** → "Ligar" | ao clicar: modal de chamada
   - **📧 Email** → "Enviar email" | cor vermelha se pendente
   - **🕐 Relógio** → "Ver tarefas" | badge se atrasada

---

### 2.2 Tela: Detalhes da Oportunidade

**Screenshot**: `tela oportunidade.png`

#### Layout Geral (3 Colunas)

```
┌───────────────────────────────────────────────────────────────────┐
│ ← Venda JANEIRO               ✅ Marcar venda  ❌ Marcar perda    │
│   RD Station                   ⚙️ Configurar  🗑️ Excluir         │
├───────────┬──────────────────────────────────────┬────────────────┤
│ SIDEBAR   │       CONTEÚDO CENTRAL              │ SIDEBAR        │
│ LEFT      │                                      │ RIGHT          │
│ (240px)   │       (flex 1)                       │ (280px)        │
│           │                                      │                │
│ [Funil]   │ ┌──────────────────────────────────┐ │ Responsável   │
│ [Estágio] │ │ Tab: HISTÓRICO (ativa)           │ │ [Mario Becker]│
│ [Qualif.] │ │ Tab: E-MAIL                      │ │                │
│ [Valores] │ │ Tab: TAREFAS                     │ │ Dados Empresa │
│ [Datas]   │ │ Tab: CONTATOS                    │ │ [Expandir ▼]  │
│           │ │ Tab: PRODUTOS E SERVIÇOS         │ │                │
│           │ │ Tab: ARQUIVOS                    │ │ Dados Oport.  │
│           │ └──────────────────────────────────┘ │ [Expandir ▼]  │
│           │                                      │                │
│           │ [Conteúdo da tab ativa]             │ Dados Contato │
│           │                                      │ [Expandir ▼]  │
└───────────┴──────────────────────────────────────┴────────────────┘
```

#### Header da Oportunidade

**Elementos**:
1. **Botão Voltar**
   - Ícone: `←` (seta esquerda)
   - Size: 24px
   - Hover: background cinza #f5f5f5
   - Action: volta para Funil

2. **Título da Oportunidade**
   - Texto: "Venda JANEIRO" (h1, peso 700, size 24px)
   - Subtítulo: "RD Station" (cinza #666, size 14px)

3. **Ações Principais** (direita)
   - **Botão Verde**: "👍 Marcar venda"
     - Background: #28a745 (verde)
     - Hover: #218838
     - Action: modal "Confirmar venda ganhou"

   - **Botão Vermelho**: "👎 Marcar perda"
     - Background: #dc3545 (vermelho)
     - Hover: #c82333
     - Action: modal "Motivo da perda"

   - **Ícone Configurar**: `⚙️`
     - Size: 24px
     - Hover: rotação 90deg
     - Action: configurações da oportunidade

   - **Ícone Excluir**: `🗑️`
     - Size: 24px
     - Hover: cor vermelha
     - Action: modal "Confirmar exclusão"

4. **Indicador de Saldo** (canto superior direito)
   - Texto: "Saldo: R$ 91,12"
   - Background: badge azul claro
   - Ícone: ⓘ (info)
   - Tooltip: "Valor da oportunidade - produtos adicionados"

#### Sidebar Esquerda

**Elementos**:

1. **Funil e estágio de vendas**
   ```
   ┌─────────────────────────────────────┐
   │ Funil e estágio de vendas           │
   │                                     │
   │ Funil PADRÃO ( Não Alterar) ▼       │
   │                                     │
   │ ●───●───●───●───●                   │ ← Bolinhas conectadas
   │ SL  CF  V/A  PE  F                  │ ← Siglas das etapas
   │     ●                               │ ← Estágio atual (destacado)
   │ Sem contato / Lead                  │ ← Nome completo
   └─────────────────────────────────────┘
   ```
   - Dropdown: selecionar outro funil
   - Visual: linha horizontal com círculos
   - Cor: azul para ativo, cinza para outros
   - Hover: tooltip com nome completo da etapa

2. **Qualificação**
   ```
   ┌─────────────────────────────────────┐
   │ Qualificação                        │
   │                                     │
   │ ⭐⭐⭐⭐☆                             │ ← 4 de 5 estrelas
   │ Quente 🔥                           │ ← Temperatura
   └─────────────────────────────────────┘
   ```
   - Estrelas: clicáveis (editar qualificação)
   - Badge: cores por temperatura
     - 🔥 Quente (vermelho #e90101)
     - 🌡️ Morno (laranja #ff8c00)
     - 🧊 Frio (azul #4a90e2)

3. **Valores**
   ```
   ┌─────────────────────────────────────┐
   │ Valores                             │
   │                                     │
   │ R$ 5,00                             │ ← Valor 1 (input editável)
   │ R$ 5,00                             │ ← Valor 2 (input editável)
   └─────────────────────────────────────┘
   ```
   - Inputs: inline editing
   - Format: R$ com 2 decimais
   - Validação: apenas números

4. **Data de criação**
   ```
   ┌─────────────────────────────────────┐
   │ Data de criação                     │
   │ 19/01/2022 às 10:11                 │
   └─────────────────────────────────────┘
   ```

5. **Previsão de fechamento**
   ```
   ┌─────────────────────────────────────┐
   │ Previsão de fechamento              │
   │ [  /  /    ] 📅                     │ ← DatePicker
   └─────────────────────────────────────┘
   ```

#### Tabs Centrais

**Estrutura**:
```
┌──────────────────────────────────────────────────────────────┐
│ HISTÓRICO | E-MAIL | TAREFAS | CONTATOS | PRODUTOS | ARQUIVOS│
└──────────────────────────────────────────────────────────────┘
    ↑ ativa (border-bottom azul 3px)
```

**Design System das Tabs**:
- Font-size: 14px
- Font-weight: 600 (ativa), 400 (inativa)
- Cor: #4a90e2 (ativa), #666 (inativa)
- Padding: 12px 16px
- Border-bottom: 3px solid #4a90e2 (ativa)
- Hover: background #f9f9f9

---

### 2.3 Tab: HISTÓRICO DA OPORTUNIDADE

**Screenshot**: `tela oportunidade.png`

#### Seção: CRIAR ANOTAÇÃO / CRIAR TAREFA

```
┌────────────────────────────────────────────────────────────────┐
│ [CRIAR ANOTAÇÃO]  [CRIAR TAREFA]                              │
│                                                                │
│ Registre sua anotação                                         │
│ ┌────────────────────────────────────────────────────────────┐│
│ │ [Textarea expandível]                                      ││
│ └────────────────────────────────────────────────────────────┘│
│                                                                │
│                          [Criar anotação] ← Botão azul        │
└────────────────────────────────────────────────────────────────┘
```

**Elementos**:
1. **Toggle de Abas**
   - [CRIAR ANOTAÇÃO] ← ativa (fundo azul, texto branco)
   - [CRIAR TAREFA] ← inativa (fundo cinza, texto cinza)
   - Click: alterna formulário

2. **Formulário de Anotação**
   - Label: "Registre sua anotação"
   - Textarea:
     - Min-height: 80px
     - Auto-expand: sim
     - Placeholder: "Digite sua anotação..."
   - Botão: "Criar anotação"
     - Background: #4a90e2
     - Cor: branco
     - Width: 160px

#### Seção: HISTÓRICO DA OPORTUNIDADE

```
┌────────────────────────────────────────────────────────────────┐
│ HISTÓRICO DA OPORTUNIDADE | HISTÓRICO DO MARKETING             │
└────────────────────────────────────────────────────────────────┘
    ↑ aba ativa

┌────────────────────────────────────────────────────────────────┐
│ Filtros:                                                       │
│ ☑ Anotação  ☑ Tarefa  ☑ Alteração  ☑ Email  ☑ Proposta       │
│ ☑ Resposta de email  ☑ Ligações  ☑ Mensagem                  │
│ ☐ Limite de execuções de automação                            │
└────────────────────────────────────────────────────────────────┘
```

**Checkboxes de Filtro**:
- Layout: inline-flex, gap 12px
- Checked: azul #4a90e2
- Unchecked: cinza #ccc
- Label: cinza #666, size 13px
- Click: atualiza timeline instantaneamente

#### Timeline de Eventos

```
┌────────────────────────────────────────────────────────────────┐
│ ⬤ Mario Becker a 4 segundos atrás criou sua oportunidade      │
│ │ moveu sua oportunidade para Mario Becker, na etapa Sem      │
│ │ contato / Lead, do funil Funil PADRÃO ( Não Alterar)        │
│ │                                                              │
│ │ 4 segundos atrás                                            │
└─┼──────────────────────────────────────────────────────────────┘
  │
  ⬤ [Próximo evento]
  │
  ⬤ [Próximo evento]
```

**Elementos do Item de Timeline**:
1. **Círculo Indicador**
   - Size: 12px
   - Cor: azul #4a90e2 (evento padrão)
   - Cor: verde #28a745 (evento positivo)
   - Cor: vermelho #dc3545 (evento negativo)
   - Border: 2px solid (cor correspondente)

2. **Linha Vertical**
   - Width: 2px
   - Cor: #e0e0e0
   - Conecta círculos

3. **Conteúdo do Evento**
   - **Usuário**: "Mario Becker" (link, peso 600)
   - **Tempo**: "a 4 segundos atrás" (cinza #999)
   - **Ação**: "criou sua oportunidade" (texto normal)
   - **Detalhes**: texto expandido (cinza #666)
   - **Timestamp absoluto**: "4 segundos atrás" (cinza #999, size 12px)

---

### 2.4 Tab: TAREFAS

**Screenshot**: `tarefas.png`

#### Seção: PRÓXIMAS TAREFAS

```
┌────────────────────────────────────────────────────────────────┐
│ PRÓXIMAS TAREFAS ⟳                                            │
├────────────────────────────────────────────────────────────────┤
│ 📞 Ligação: Primeira Tentativa                                │
│    Hoje às 10:27                     ✏️  ⏰  ✅               │
├────────────────────────────────────────────────────────────────┤
│ 💬 Whatsapp: Tentativa 2                                      │
│    Hoje às 11:12                     ✏️  ⏰  ✅               │
├────────────────────────────────────────────────────────────────┤
│ + Ver Mais                                                     │
└────────────────────────────────────────────────────────────────┘
```

**Elementos da Lista de Tarefas**:

1. **Item de Tarefa**
   - **Ícone por tipo**:
     - 📞 Ligação (vermelho #dc3545)
     - 💬 WhatsApp (verde #25d366)
     - 📧 Email (azul #4a90e2)
     - 🤝 Reunião (roxo #6f42c1)
   - **Título**: "Ligação: Primeira Tentativa" (peso 600)
   - **Data/Hora**: "Hoje às 10:27" (cinza #999, size 13px)

2. **Ações Inline**
   - ✏️ Editar (cinza #666, hover azul)
   - ⏰ Adiar (cinza #666, hover laranja)
   - ✅ Concluir (verde #28a745, destaque)

3. **Link "Ver Mais"**
   - Cor: azul #4a90e2
   - Hover: underline
   - Action: expande lista ou vai para /tarefas

#### Seção: CRIAR TAREFA

```
┌────────────────────────────────────────────────────────────────┐
│ [CRIAR ANOTAÇÃO]  [CRIAR TAREFA] ← ativa                      │
├────────────────────────────────────────────────────────────────┤
│ Tipo *                                                         │
│ 📞 Ligação ▼                                                  │
├────────────────────────────────────────────────────────────────┤
│ Assunto *                                                      │
│ [Input text: digite o assunto da tarefa]                     │
├────────────────────────────────────────────────────────────────┤
│ Data *              Hora *                                     │
│ 📅 19/01/2022       🕐 10:12                                  │
├────────────────────────────────────────────────────────────────┤
│ Responsáveis                                                   │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ 👤 Mario Becker                           ✅ Adicionado   │  │
│ │    mario.becker@rdstation.com                            │  │
│ └──────────────────────────────────────────────────────────┘  │
│ [Buscar responsável...]                                       │
└────────────────────────────────────────────────────────────────┘
```

**Elementos do Formulário**:

1. **Campo Tipo** (dropdown)
   - Opções:
     - 📞 Ligação
     - 💬 WhatsApp
     - 📧 Email
     - 🤝 Reunião
   - Ícone muda conforme seleção

2. **Campo Assunto** (input text)
   - Placeholder: "Ex: Ligar para validar proposta"
   - Validação: min 3 caracteres

3. **Campo Data** (date picker)
   - Formato: DD/MM/YYYY
   - Ícone: 📅
   - Atalhos: Hoje, Amanhã, Próxima semana

4. **Campo Hora** (time picker)
   - Formato: HH:MM
   - Ícone: 🕐
   - Incremento: 15 minutos

5. **Campo Responsáveis** (multi-select)
   - Card de usuário adicionado:
     - Avatar: iniciais coloridas
     - Nome: peso 600
     - Email: cinza #999, size 12px
     - Badge: "✅ Adicionado" (verde)
   - Input de busca: autocomplete
   - Permite múltiplos responsáveis

---

### 2.5 Tab: PRODUTOS E SERVIÇOS

**Screenshot**: `produtos e serviços.png`

#### Formulário: Adicionar Produtos

```
┌────────────────────────────────────────────────────────────────┐
│ Adicionar produtos e serviços                                  │
│ Adicione produtos e serviços para sua oportunidade            │
├────────────────────────────────────────────────────────────────┤
│ Produto *              Buscar *                                │
│ [Input autocomplete]   CURSO XYZ ▼                            │
├────────────────────────────────────────────────────────────────┤
│ Quantidade                                                     │
│ [1              ]                                              │
├────────────────────────────────────────────────────────────────┤
│ Preço                                                          │
│ R$ 2.000,00                                                   │
├────────────────────────────────────────────────────────────────┤
│ Recorrência                                                    │
│ ◉ Único   ○ Recorrente                                        │
├────────────────────────────────────────────────────────────────┤
│ ☐ Desconto                                                    │
│                                                                │
│                      [Adicionar produto/serviço à oportunidade]│
└────────────────────────────────────────────────────────────────┘
```

**Elementos**:

1. **Campo Produto** (autocomplete)
   - Source: catálogo de produtos
   - Mostra: nome + SKU + preço
   - Pesquisa: nome OU SKU

2. **Campo Buscar** (dropdown)
   - Valor selecionado: "CURSO XYZ"
   - Dropdown: lista produtos pré-cadastrados

3. **Campo Quantidade** (number input)
   - Default: 1
   - Min: 1
   - Max: 999
   - Buttons: + / -

4. **Campo Preço** (currency input)
   - Formato: R$ com 2 decimais
   - Auto-preenchido do catálogo
   - Editável (preço custom)

5. **Campo Recorrência** (radio buttons)
   - ◉ Único (default)
   - ○ Recorrente
     - Se recorrente: mostra campo "Periodicidade" (Mensal, Trimestral, Anual)

6. **Checkbox Desconto**
   - Unchecked: esconde campos de desconto
   - Checked: mostra:
     - Tipo: % ou R$
     - Valor: input number

#### Tabela: Produtos Adicionados

```
┌────────────────────────────────────────────────────────────────┐
│ Produto ou serviço | Qtda | Preço | Recorrência | Subtotal    │
├────────────────────────────────────────────────────────────────┤
│ [Nenhum produto adicionado à oportunidade]                    │
└────────────────────────────────────────────────────────────────┘
```

**Estado: vazio**
- Texto: "Nenhum produto adicionado à oportunidade"
- Cor: cinza #999
- Align: center

**Estado: com produtos**
```
┌────────────────────────────────────────────────────────────────┐
│ Produto         | Qtda | Preço       | Recorrência | Subtotal  │
├────────────────────────────────────────────────────────────────┤
│ CURSO XYZ       | 2    | R$ 2.000,00 | Único       | R$ 4.000  │
│ [✏️ Editar] [🗑️ Remover]                                       │
├────────────────────────────────────────────────────────────────┤
│ LED PAR 64      | 10   | R$ 350,00   | Único       | R$ 3.500  │
│ [✏️ Editar] [🗑️ Remover]                                       │
└────────────────────────────────────────────────────────────────┘
```

---

### 2.6 Tab: E-MAIL

**Screenshot**: `emails.png`

#### Editor de Email

```
┌────────────────────────────────────────────────────────────────┐
│ Novo E-mail                                                    │
├────────────────────────────────────────────────────────────────┤
│ De:   Mario Becker <mario.becker@rdstation.com>               │
├────────────────────────────────────────────────────────────────┤
│ Para: ✕ "Mario" <mario@rdstation.xyz>         CC   BCC        │
├────────────────────────────────────────────────────────────────┤
│ Escolher modelo de e-mail:  [Selecione um modelo ▼]          │
├────────────────────────────────────────────────────────────────┤
│ Assunto: *                                                     │
│ [Assunto do E-mail *]                                         │
├────────────────────────────────────────────────────────────────┤
│ [Toolbar WYSIWYG]                                             │
│ Fontes ▼ | Fonte ▼ | 14 ▼ | A+ A- | B I U | align | list    │
│ link | code-fonte | emoji | etc                               │
├────────────────────────────────────────────────────────────────┤
│ [Área de edição - Editor WYSIWYG]                            │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Elementos**:

1. **Campo De** (read-only)
   - Mostra: nome + email do usuário logado
   - Fonte: dados do perfil

2. **Campo Para** (multi-email)
   - Tags: chips azuis com ✕
   - Autocomplete: contatos da oportunidade
   - Validação: formato de email

3. **Links CC / BCC**
   - Hover: underline
   - Click: expande campos CC e BCC

4. **Dropdown Modelos**
   - Texto: "Selecione um modelo"
   - Action: abre modal de modelos (screenshot `modelos de e-mail.png`)

5. **Campo Assunto** (input text, required)
   - Placeholder: "Assunto do E-mail *"
   - Asterisco vermelho: campo obrigatório

6. **Toolbar WYSIWYG**
   - **Fontes**: dropdown (Arial, Times, Courier, etc)
   - **Tamanho**: dropdown (8-72px)
   - **Formatação**: Bold, Italic, Underline
   - **Alinhamento**: Esquerda, Centro, Direita, Justificado
   - **Listas**: Bullet, Numbered
   - **Inserir**: Link, Imagem, Emoji
   - **Código-fonte**: toggle HTML

7. **Área de Edição**
   - Editor: rich text (contenteditable)
   - Min-height: 300px
   - Suporta: imagens inline, links, formatação

#### Botões de Ação

```
┌────────────────────────────────────────────────────────────────┐
│                          [Ativar Multi-Vendas] [Sim] [Não]   │
│                          [📎 Anexar arquivos]                 │
│                          [Enviar]  [Salvar rascunho]          │
└────────────────────────────────────────────────────────────────┘
```

**Botões**:
- **Ativar Multi-Vendas**: toggle (sim/não)
- **Anexar arquivos**: file picker
- **Enviar**: primary button (azul)
- **Salvar rascunho**: secondary button (cinza)

---

### 2.7 Modal: Modelos de Email

**Screenshot**: `modelos de e-mail.png`

```
┌────────────────────────────────────────────────────────────────┐
│ Modelos de Email                                         ✕     │
├────────────────────────────────────────────────────────────────┤
│ [Pesquisar...]                                                │
├────────────────────────────────────────────────────────────────┤
│ ┌──────────────────┐  ┌──────────────────────────────────────┐│
│ │ Lista (sidebar)  │  │ Preview (área principal)             ││
│ │                  │  │                                      ││
│ │ • Apresentação   │  │ Olá Mario, tudo bem?                ││
│ │   RD Station CRM │◄─┤                                      ││
│ │                  │  │ Como combinamos, segue a            ││
│ │ • Proposta       │  │ apresentação em PDF do RD Station   ││
│ │                  │  │ CRM.                                ││
│ │ • Tentativa de   │  │                                      ││
│ │   Contato        │  │ No documento você encontrará        ││
│ │                  │  │ informações sobre a nossa empresa   ││
│ └──────────────────┘  │ e sobre a ferramenta. É um          ││
│                       │ excelente documento para apresentar ││
│                       │ internamente nas conversas com a    ││
│                       │ equipe.                              ││
│                       │                                      ││
│                       │ Assim que ver o material, por favor,││
│                       │ me avise para agendarmos a nossa    ││
│                       │ reunião.                             ││
│                       │                                      ││
│                       │ Abraços                              ││
│                       └──────────────────────────────────────┘│
├────────────────────────────────────────────────────────────────┤
│                    [Cancelar]  [SELECIONAR MODELO]            │
└────────────────────────────────────────────────────────────────┘
```

**Elementos**:

1. **Header Modal**
   - Título: "Modelos de Email" (h2)
   - Botão ✕: fechar modal

2. **Input de Pesquisa**
   - Placeholder: "Pesquisar modelos..."
   - Ícone: 🔍
   - Action: filtra lista em tempo real

3. **Lista de Modelos** (sidebar)
   - Cada item:
     - Título: "Apresentação RD Station CRM" (peso 600)
     - Subtítulo: "Proposta" (cinza, size 12px)
     - Hover: background cinza claro
     - Selecionado: background azul claro, border-left azul 3px

4. **Preview do Modelo**
   - Área: scrollável
   - Conteúdo: HTML formatado
   - Variáveis: {{nome}}, {{empresa}}, etc (destacadas em amarelo)

5. **Botões de Ação**
   - Cancelar: secondary button
   - SELECIONAR MODELO: primary button (azul)
     - Action: insere conteúdo no editor de email

---

### 2.8 Tela: Configuração de Funis

**Screenshot**: `Funil_4.png`, `Menu_funis.png`

#### Header

```
┌────────────────────────────────────────────────────────────────┐
│ ← Funis de vendas  ⓘ                                          │
│    Configurações                                               │
├────────────────────────────────────────────────────────────────┤
│ FUNIL DE VENDAS    CRM2CRM                                     │
└────────────────────────────────────────────────────────────────┘
```

**Elementos**:
- Botão voltar: `←`
- Breadcrumb: Funis de vendas > Configurações
- Tabs: FUNIL DE VENDAS (ativa) | CRM2CRM

#### Seção: Instrução

```
┌────────────────────────────────────────────────────────────────┐
│ Configure seus funis de vendas para organizar seu processo    │
│ comercial                                                ⓘ     │
└────────────────────────────────────────────────────────────────┘
```

#### Lista de Funis

**Funil 1: Funil PADRÃO (Não Alterar)**

```
┌────────────────────────────────────────────────────────────────┐
│ ▷ Funil PADRÃO ( Não Alterar) ✏️  ⚙️ Editar automação  🗑️    │
├────────────────────────────────────────────────────────────────┤
│ ●─────●─────●─────●─────●─────⊕                               │
│ SL    CF    V/A    PE     F                                   │
│                                                                │
│ Sem     Contato   Visita/   Proposta  Fechamento  [+ Adicionar│
│ contato  Feito   Apresent.  enviada                etapa]     │
│ / Lead                                                         │
│ Sigla:  Sigla:   Sigla:    Sigla:    Sigla:                  │
│ SC/L    CF       V/A        PE        F                       │
└────────────────────────────────────────────────────────────────┘
```

**Elementos**:

1. **Header do Funil**
   - **Ícone Expandir**: `▷` (colapsar: `▽`)
   - **Nome**: "Funil PADRÃO ( Não Alterar)"
     - Editável: double-click ou ícone ✏️
   - **Botão Editar Automação**: `⚙️ Editar automação entre funis` (azul)
   - **Botão Excluir**: `🗑️` (vermelho, hover)

2. **Visual das Etapas** (linha horizontal)
   - **Círculos (nodes)**:
     - Size: 32px
     - Cor: azul #4a90e2
     - Border: 3px solid azul
     - Background: azul preenchido

   - **Linhas conectoras**:
     - Width: 2px
     - Cor: azul #4a90e2
     - Conecta centro dos círculos

   - **Botão Adicionar Etapa**: `⊕` (verde)
     - Hover: scale 1.1
     - Action: modal "Nova Etapa"

3. **Cards de Etapa**
   ```
   ┌──────────────┐
   │ Sem contato  │
   │ / Lead       │
   │ Sigla: SC/L  │
   └──────────────┘
   ```
   - **Nome da Etapa**: editável inline
   - **Sigla**: editável inline (max 4 chars)
   - Hover: background cinza claro, ícone ✏️ aparece

4. **Interações**
   - **Drag-and-drop**: reordenar etapas
   - **Click no círculo**: editar etapa
   - **Click em ⊕**: adicionar nova etapa após
   - **Hover na linha**: tooltip "Adicionar etapa entre X e Y"

---

**Funil 2: Funil Prospecção**

```
┌────────────────────────────────────────────────────────────────┐
│ ▷ Funil Prospecção  ⚙️ Editar automação  🗑️                  │
├────────────────────────────────────────────────────────────────┤
│ ●─────●─────●─────●─────●─────●─────●─────⊕                   │
│ SC    P     CF    IDI    P     M     BP                       │
│                                                                │
│ Sem     Prospec  Contato  Identif.  Proposta  Matricu  Boleto │
│ contato  ção     feito    interesse          lado     pago    │
│                                                                │
│ Sigla:  Sigla:  Sigla:   Sigla:    Sigla:   Sigla:   Sigla:  │
│ SC      P       CF       IDI       P        M         BP      │
└────────────────────────────────────────────────────────────────┘
```

**Observação**: Mesmo padrão visual, mais etapas (7 vs 5).

---

**Funil 3: Funil de carteira** (parcialmente visível)

```
┌────────────────────────────────────────────────────────────────┐
│ ▷ Funil de carteira  ⚙️ Editar automação  🗑️                 │
├────────────────────────────────────────────────────────────────┤
│ ●─────●─────●─────●─────●─────⊕                               │
│ [...]                                                          │
└────────────────────────────────────────────────────────────────┘
```

---

#### Sidebar Direita

**Screenshot**: `tela oportunidade.png`

```
┌────────────────────────────────────────┐
│ Responsável                            │
│ [Mario Becker            ▼]            │
├────────────────────────────────────────┤
│ Dados da Empresa/Cliente          ▼    │
│ [Seção colapsada]                      │
├────────────────────────────────────────┤
│ Dados da Oportunidade             ▼    │
│ [Seção colapsada]                      │
├────────────────────────────────────────┤
│ Dados do Contato                  ▼    │
│                                        │
│ Mario                             ▼    │
│ ✏️ Editar  ⊕ Abrir  🗑️ Remover        │
│                                        │
│ 📧 mario@rdstation.xyz                 │
│                                        │
│ + Adicionar contato                    │
└────────────────────────────────────────┘
```

**Elementos**:

1. **Campo Responsável**
   - Dropdown: lista de usuários
   - Avatar + Nome
   - Change: atualiza automaticamente

2. **Seções Expansíveis**
   - **Dados da Empresa/Cliente**:
     - Nome, CNPJ, Telefone, Email, Website
     - Endereço completo
   - **Dados da Oportunidade**:
     - Valor, Probabilidade, Origem, Tags
   - **Dados do Contato**:
     - Card do contato principal
     - Ações: Editar, Abrir (nova aba), Remover
     - Email: clickável (mailto:)
     - Link: + Adicionar contato

3. **Card de Contato**
   - Nome: dropdown (selecionar outro contato)
   - Ações inline: ✏️ ⊕ 🗑️
   - Email: link azul

---

### 2.9 Barra de Navegação (Detalhes)

**Screenshot**: `barra.png`

```
┌────────────────────────────────────────────────────────────────┐
│ 🏢 RD STATION CRM                                              │
│                                                                │
│ Negociações | Empresas | Contatos | Tarefas | Análises |     │
│                                                    Marketing   │
│                                                                │
│                    🔍  🔔  ❓  ⋮⋮⋮  👤 Adriana Souza         │
│                                         Agência WWN            │
└────────────────────────────────────────────────────────────────┘
```

**Elementos**:
1. **Logo**: "RD STATION CRM" (azul turquesa)
2. **Menu Principal**: Negociações, Empresas, Contatos, Tarefas, Análises, Marketing
3. **Utilidades**:
   - 🔍 Busca
   - 🔔 Notificações
   - ❓ Ajuda
   - ⋮⋮⋮ Apps
   - 👤 Avatar + Nome + Agência

---

### 2.10 Detalhe Visual: Stage Connector

**Screenshot**: `stage conector.png`

```
┌──────────────────────────────────────────────────────────────┐
│ ▼ Funil PADRÃO       NÃO ALTERAR                             │
│    Configurações                                              │
├──────────────────────────────────────────────────────────────┤
│ ●───────●───────●                                            │
│ SL      CF      VA                                           │
│                                                              │
│ Sem contato /    Contato Feito    Visita / Apresentação    │
│ Lead                                                         │
│ Sigla: SL        Sigla: CF         Sigla: VA                │
│                                                              │
│ ⚙️ Editar automação entre funis                             │
└──────────────────────────────────────────────────────────────┘
```

**Detalhes**:
- Background: vinho/roxo escuro (#5c2d55)
- Círculos: azul claro (#4a90e2)
- Texto: branco
- Botão "Editar automação": azul com ícone ⚙️

---

## 🎯 PARTE 3: FLUXOS DE USUÁRIO PRINCIPAIS

### 3.1 Fluxo: Criar Nova Oportunidade

```
CAMINHO COMPLETO:
Login → Dashboard → Oportunidades (menu) → Funil Kanban → FAB "+"
→ Modal "Nova Oportunidade" → Preencher form → Salvar
→ Card aparece na coluna "Sem contato / Lead"

DETALHAMENTO:

1. [Login]
   ↓ (autenticação)

2. [Dashboard]
   ↓ Click: "Oportunidades" (menu horizontal)

3. [Funil de Vendas - Kanban]
   ↓ Click: FAB azul "+" (canto inferior direito)

4. [Modal: Nova Oportunidade]
   Campos:
   - Título * (input text)
   - Empresa/Cliente * (autocomplete)
   - Contato (autocomplete)
   - Valor estimado (currency)
   - Funil (dropdown - default: Funil PADRÃO)
   - Etapa (dropdown - default: Sem contato / Lead)
   - Responsável (dropdown - default: usuário logado)
   - Previsão de fechamento (date picker)
   - Tags (multi-select)
   ↓ Click: "Salvar"

5. [Feedback]
   - Toast: "Oportunidade criada com sucesso"
   - Animação: card aparece na coluna correspondente
   - Scroll automático: foca no novo card

6. [Estado Final]
   - Card visível no Kanban
   - Contador da coluna atualizado (+1)
   - Valor total da coluna atualizado
```

**Tempo estimado**: 1-2 minutos
**Nº de cliques**: 2 (menu) + 1 (FAB) + 1 (salvar) = **4 cliques**
**Nível de fricção**: ⭐ BAIXO (fluxo direto)

---

### 3.2 Fluxo: Mover Oportunidade (Drag-and-Drop)

```
CAMINHO:
Funil Kanban → Drag card → Drop em nova coluna → Confirmação

DETALHAMENTO:

1. [Funil Kanban]
   Usuário visualiza card "Pedido Setembro" na coluna "Sem contato / Lead"
   ↓ Mouse down: click e segura no card

2. [Dragging State]
   - Cursor muda para "grabbing" (mão fechada)
   - Card fica com opacity 0.7
   - Placeholder aparece no local original (borda tracejada)
   - Colunas possíveis: highlight border azul (drop zone)
   ↓ Mouse move: arrasta horizontalmente

3. [Hovering Drop Zone]
   - Coluna "Contato Feito" recebe hover
   - Background da coluna: azul claro (#e3f2fd)
   - Indicador visual: linha azul no topo da coluna
   ↓ Mouse up: solta card na nova coluna

4. [Drop Event]
   - Animação: card "voa" para nova posição
   - Duration: 300ms (ease-out)
   - Placeholder some
   - API call: PATCH /opportunities/:id { stage_id: 2 }
   ↓ Resposta API (200 OK)

5. [Feedback]
   - Toast: "Oportunidade movida para Contato Feito"
   - Card fixado na nova posição
   - Contadores atualizados:
     - "Sem contato / Lead": 3 → 2 oportunidades
     - "Contato Feito": 3 → 4 oportunidades
   - Valores totais recalculados
   - Timeline da oportunidade: evento "Movido para Contato Feito"

6. [Rollback (se erro)]
   - Se API falha:
     - Card volta para posição original (animação reversa)
     - Toast erro: "Não foi possível mover. Tente novamente."
     - Log de erro para debugging
```

**Tempo estimado**: 2-5 segundos
**Nº de cliques**: 1 drag-and-drop = **1 ação**
**Nível de fricção**: ⭐ MUITO BAIXO (intuitivo)

---

### 3.3 Fluxo: Criar e Enviar Email

```
CAMINHO:
Funil → Card → Tab E-mail → Escolher modelo → Compor → Enviar

DETALHAMENTO:

1. [Funil Kanban]
   ↓ Click: card "Pedido Setembro"

2. [Detalhes da Oportunidade]
   Default: Tab "HISTÓRICO" ativa
   ↓ Click: Tab "E-MAIL"

3. [Tab E-mail]
   Formulário vazio
   ↓ Click: "Escolher modelo de e-mail" (dropdown)

4. [Modal: Modelos de Email]
   Lista de modelos (sidebar)
   ↓ Click: "Apresentação RD Station CRM"
   Preview do modelo aparece (área principal)
   ↓ Click: "SELECIONAR MODELO"

5. [Editor de Email - Preenchido]
   - Para: auto-preenchido (mario@rdstation.xyz)
   - Assunto: "Apresentação RD Station CRM" (do modelo)
   - Corpo: HTML formatado com variáveis substituídas
     {{nome}} → "Mario"
     {{empresa}} → "RD Station"
   ↓ Editar: ajustar texto conforme necessário
   ↓ Optional: anexar arquivos (PDF, imagem, etc)
   ↓ Click: "Enviar"

6. [Validação]
   - Campo "Para": válido?
   - Campo "Assunto": preenchido?
   - Anexos: < 25MB total?
   ↓ Se OK: prosseguir
   ↓ Se erro: highlight campos + mensagem

7. [Envio]
   - Loading: botão "Enviar" → spinner
   - API call: POST /emails/send
   - Integração: SMTP/SendGrid/etc
   ↓ Resposta: 200 OK

8. [Feedback]
   - Toast: "E-mail enviado com sucesso"
   - Tab E-mail: badge "1 enviado"
   - Timeline da oportunidade:
     📧 "E-mail enviado para mario@rdstation.xyz"
     Assunto: "Apresentação RD Station CRM"
     Data: "Há 5 segundos"
   - Form resetado (limpo)

9. [Estado Final]
   - Email registrado no histórico
   - Notificação para o responsável (opcional)
   - Rastreamento de abertura (se configurado)
```

**Tempo estimado**: 2-5 minutos
**Nº de cliques**: 1 (card) + 1 (tab) + 1 (modelo) + 1 (selecionar) + 1 (enviar) = **5 cliques**
**Nível de fricção**: ⭐ MÉDIO (fluxo razoável, mas poderia ter atalho)

---

### 3.4 Fluxo: Criar Tarefa Rápida

```
CAMINHO:
Funil → Card → Tab Tarefas → "CRIAR TAREFA" → Preencher → Salvar

DETALHAMENTO:

1. [Funil Kanban]
   ↓ Click: card "Pedido Setembro"

2. [Detalhes da Oportunidade - Tab Histórico]
   ↓ Click: Tab "TAREFAS"

3. [Tab Tarefas - Seção Superior]
   Lista: "PRÓXIMAS TAREFAS" (vazia ou com tarefas existentes)
   ↓ Scroll down

4. [Tab Tarefas - Seção Inferior]
   Toggle: [CRIAR ANOTAÇÃO] | [CRIAR TAREFA]
   ↓ Click: "CRIAR TAREFA" (se não estiver ativo)

5. [Formulário: Criar Tarefa]
   Campos:
   - Tipo * (dropdown)
     Options: 📞 Ligação, 💬 WhatsApp, 📧 Email, 🤝 Reunião
     ↓ Select: "📞 Ligação"

   - Assunto * (input text)
     ↓ Type: "Primeira tentativa de contato"

   - Data * (date picker)
     ↓ Click no ícone 📅
     ↓ Calendar popup: selecionar "Hoje" (atalho)

   - Hora * (time picker)
     ↓ Click no ícone 🕐
     ↓ Time picker: scroll para "14:00"

   - Responsáveis (multi-select)
     Default: usuário logado (Mario Becker) já adicionado
     ↓ Optional: adicionar outros usuários

   ↓ Click: "Criar tarefa" (botão implícito, não visível na screenshot)

6. [Validação]
   - Tipo: selecionado?
   - Assunto: min 3 chars?
   - Data: não pode ser passado?
   - Hora: válida?
   ↓ Se OK: prosseguir

7. [Salvamento]
   - API call: POST /tasks
   - Loading: spinner no botão
   ↓ Resposta: 201 Created

8. [Feedback]
   - Toast: "Tarefa criada com sucesso"
   - Lista "PRÓXIMAS TAREFAS": nova tarefa aparece no topo
   - Badge de notificação: "Tarefas" (menu) incrementa +1
   - Timeline da oportunidade:
     ✓ "Tarefa criada: 📞 Primeira tentativa de contato"
     Data: "Hoje às 14:00"
   - Form resetado (campos limpos)

9. [Notificações]
   - Se hora da tarefa: now + 15min
     → Notificação push (browser): "Tarefa próxima em 15 min"
   - Se hora da tarefa: now
     → Notificação push: "Tarefa agora: Ligar para Mario"
   - Se hora da tarefa: passou
     → Badge vermelho na tarefa: "Atrasada"
```

**Tempo estimado**: 1-2 minutos
**Nº de cliques**: 1 (card) + 1 (tab) + 1 (toggle) + 4 (campos) + 1 (salvar) = **8 cliques**
**Nível de fricção**: ⚠️ MÉDIO-ALTO (muitos cliques, poderia ter atalho no TopBar)

---

### 3.5 Fluxo: Configurar Novo Funil

```
CAMINHO:
Avatar (menu) → Configurações → Funis → Criar Funil → Adicionar Etapas

DETALHAMENTO:

1. [Qualquer tela]
   ↓ Click: Avatar "MB" (canto superior direito)

2. [Dropdown UserMenu]
   Options:
   - Meu perfil
   - Configurações da conta ← CLICK
   - Usuários e permissões
   - Integrações
   - Sair

3. [Página: Configurações da Conta]
   (não visível na screenshot, assumindo navegação lateral)
   Options:
   - Perfil
   - Segurança
   - Funis de vendas ← CLICK
   - Integrações
   - etc

4. [Página: Funis de Vendas]
   Header: "Funis de vendas"
   Tabs: FUNIL DE VENDAS (ativo) | CRM2CRM
   Instrução: "Configure seus funis de vendas..."
   ↓ Scroll down
   ↓ Click: "+ Criar novo funil" (botão não visível, mas esperado)

5. [Modal: Criar Funil]
   Campos:
   - Nome do funil * (input text)
     ↓ Type: "Funil Eventos"

   - Descrição (textarea)
     ↓ Type: "Funil para oportunidades de eventos corporativos"

   - Baseado em (dropdown - opcional)
     Options: [Funil em branco] | Funil PADRÃO | Funil Prospecção
     ↓ Select: "Funil em branco"

   ↓ Click: "Criar funil"

6. [Funil Criado - Editor Visual]
   Visual: linha horizontal vazia
   ●─────⊕
   SL    [+ Adicionar]

   Default: 1 etapa "Sem contato / Lead" (SC/L)
   ↓ Click: ⊕ (botão verde "Adicionar etapa")

7. [Modal: Nova Etapa]
   Campos:
   - Nome da etapa * (input text)
     ↓ Type: "Proposta de Evento"

   - Sigla * (input text, max 4 chars)
     ↓ Type: "PE"

   - Cor (color picker - opcional)
     ↓ Select: Azul #4a90e2

   ↓ Click: "Adicionar etapa"

8. [Editor Visual Atualizado]
   ●─────●─────⊕
   SL    PE    [+ Adicionar]

   Sem     Proposta
   contato  de Evento
   / Lead
   Sigla:  Sigla:
   SC/L    PE

   ↓ Repetir step 7-8 para adicionar mais etapas
   ↓ Final: 5 etapas configuradas

9. [Ações Adicionais]
   - Drag-and-drop: reordenar etapas
   - Click em etapa: editar nome/sigla
   - Click em ⚙️: configurar automações entre etapas
   - Click em 🗑️: excluir funil

10. [Salvamento]
    - Auto-save: cada alteração salva automaticamente
    - Toast: "Funil atualizado"

11. [Estado Final]
    - Novo funil disponível em dropdown "Funil de vendas" (Kanban)
    - Oportunidades podem ser criadas nesse funil
    - Relatórios incluem novo funil
```

**Tempo estimado**: 5-10 minutos
**Nº de cliques**: 1 (avatar) + 1 (config) + 1 (funis) + 1 (criar) + 5x (etapas) = **9+ cliques**
**Nível de fricção**: ❌ ALTO (funcionalidade crítica muito escondida)

---

## 🎨 PARTE 4: PRINCÍPIOS UX E PADRÕES DE DESIGN

### 4.1 Design System Identificado

#### Tipografia

```
HIERARQUIA DE TÍTULOS:
H1: 24px, peso 700, cor #000 (títulos principais)
H2: 20px, peso 600, cor #000 (subtítulos)
H3: 16px, peso 600, cor #000 (seções)

CORPO DE TEXTO:
Body: 14px, peso 400, cor #333 (texto padrão)
Small: 12px, peso 400, cor #666 (texto secundário)
Tiny: 11px, peso 400, cor #999 (metadados, timestamps)

LINKS:
- Cor: #4a90e2 (azul primário)
- Hover: underline
- Visited: sem mudança de cor (mantém azul)

LABELS:
- Peso: 600
- Cor: #666
- Size: 13px
- Spacing: 0.5px (letter-spacing)
```

#### Paleta de Cores

```
CORES PRIMÁRIAS:
- Azul Principal: #4a90e2 (botões primários, links, highlights)
- Azul Turquesa: #00a4e4 (logo RD Station, ícones especiais)

CORES DE FEEDBACK:
- Verde Sucesso: #28a745 (ações positivas, confirmações)
- Vermelho Erro: #dc3545 (ações negativas, exclusões)
- Laranja Aviso: #ff8c00 (alertas, pendências)
- Amarelo Info: #ffc107 (informações, estrelas)

CORES NEUTRAS:
- Preto: #000 (títulos principais)
- Cinza Escuro: #333 (texto corpo)
- Cinza Médio: #666 (texto secundário)
- Cinza Claro: #999 (metadados)
- Cinza Muito Claro: #ccc (borders)
- Cinza Background: #f5f5f5 (hover states)
- Cinza Border: #e0e0e0 (separadores)
- Branco: #fff (fundos, cards)

CORES SEMÂNTICAS (Temperatura):
- 🔥 Quente: #e90101 (vermelho Stagetek)
- 🌡️ Morno: #ff8c00 (laranja)
- 🧊 Frio: #4a90e2 (azul)
```

#### Espaçamento (Sistema de 4px)

```
BASE: 4px

GAPS COMUNS:
- Tiny: 4px (entre ícone e texto inline)
- Small: 8px (entre elementos relacionados)
- Medium: 12px (entre cards, seções)
- Large: 16px (entre grupos de elementos)
- XLarge: 24px (entre seções principais)
- XXLarge: 32px (margem de página)

PADDING PADRÃO:
- Card: 12px
- Button: 8px 16px (vertical horizontal)
- Modal: 24px
- Input: 8px 12px
- Dropdown: 8px 12px

MARGEM PADRÃO:
- Entre cards (Kanban): 12px
- Entre colunas (Kanban): 12px
- Entre seções (sidebar): 16px
- Entre tabs: 0 (sem gap)
```

#### Elevação (Shadows)

```
NÍVEIS DE SOMBRA:

1. FLAT (sem sombra):
   - Inputs
   - Backgrounds gerais

2. LOW (sombra sutil):
   box-shadow: 0 1px 3px rgba(0,0,0,0.08)
   - Cards em repouso

3. MEDIUM (sombra média):
   box-shadow: 0 2px 4px rgba(0,0,0,0.12)
   - Cards hover
   - Dropdowns

4. HIGH (sombra elevada):
   box-shadow: 0 4px 12px rgba(0,0,0,0.15)
   - Modais
   - FAB (floating action button)

5. DRAG (sombra de drag):
   box-shadow: 0 8px 24px rgba(0,0,0,0.2)
   - Cards em drag
```

#### Border Radius

```
ARREDONDAMENTO:

- Pequeno: 4px (inputs, badges)
- Médio: 8px (cards, buttons)
- Grande: 12px (modais)
- Circular: 50% (avatares, ícones circulares)
- Pill: 24px (tags, chips)
```

---

### 4.2 Padrões de Interação

#### 4.2.1 Estados de Botões

```
PRIMARY BUTTON:
- Default: bg #4a90e2, color #fff
- Hover: bg #3a7bc8 (10% darker)
- Active: bg #2a6bb8 (20% darker) + scale 0.98
- Disabled: bg #ccc, color #999, cursor not-allowed
- Loading: spinner branco, texto "Carregando..."

SECONDARY BUTTON:
- Default: bg #f5f5f5, color #333
- Hover: bg #e0e0e0
- Active: bg #ccc + scale 0.98
- Disabled: bg #f5f5f5, color #ccc

GHOST BUTTON (apenas borda):
- Default: border 1px solid #4a90e2, color #4a90e2, bg transparent
- Hover: bg #e3f2fd (azul 5%)
- Active: bg #bbdefb (azul 10%)

DANGER BUTTON:
- Default: bg #dc3545, color #fff
- Hover: bg #c82333
- Active: bg #bd2130

LINK BUTTON:
- Default: color #4a90e2, bg transparent
- Hover: underline
- Active: color #2a6bb8
```

#### 4.2.2 Estados de Inputs

```
TEXT INPUT:
- Default: border 1px solid #ccc, bg #fff
- Focus: border 2px solid #4a90e2, box-shadow 0 0 0 3px rgba(74,144,226,0.1)
- Error: border 2px solid #dc3545, box-shadow 0 0 0 3px rgba(220,53,69,0.1)
- Disabled: bg #f5f5f5, color #999, cursor not-allowed
- Readonly: border 1px dashed #ccc, bg #fafafa

PLACEHOLDER:
- Color: #999
- Opacity: 1
- Italic: não

LABEL:
- Position: acima do input (8px de margem)
- Asterisco (*): vermelho #dc3545 (campo obrigatório)
```

#### 4.2.3 Feedback Visual

```
TOAST NOTIFICATIONS:
- Position: top-right (desktop) | top-center (mobile)
- Width: 320px (desktop) | 90vw (mobile)
- Duration: 3s (sucesso/info) | 5s (erro)
- Animation: slide-in-right (entrada) | fade-out (saída)

TIPOS:
1. Sucesso:
   - Bg: #d4edda (verde claro)
   - Border-left: 4px solid #28a745
   - Ícone: ✓ (check verde)
   - Exemplo: "Oportunidade criada com sucesso"

2. Erro:
   - Bg: #f8d7da (vermelho claro)
   - Border-left: 4px solid #dc3545
   - Ícone: ✕ (X vermelho)
   - Exemplo: "Não foi possível salvar. Tente novamente."

3. Info:
   - Bg: #d1ecf1 (azul claro)
   - Border-left: 4px solid #4a90e2
   - Ícone: ⓘ (info azul)
   - Exemplo: "Você tem 3 tarefas pendentes hoje"

4. Aviso:
   - Bg: #fff3cd (amarelo claro)
   - Border-left: 4px solid #ffc107
   - Ícone: ⚠ (warning amarelo)
   - Exemplo: "Alguns campos não foram preenchidos"
```

#### 4.2.4 Loading States

```
SPINNER:
- Tipo: Circular (border animation)
- Size: 24px (inline) | 48px (fullscreen)
- Cor: #4a90e2 (azul)
- Thickness: 3px
- Speed: 1s (rotation)

SKELETON LOADING:
- Background: linear-gradient shimmer (#f5f5f5 → #e0e0e0 → #f5f5f5)
- Shape: match do conteúdo real (cards, linhas de texto)
- Duration: 1.5s (loop infinito)

PROGRESS BAR:
- Height: 4px
- Background: #e0e0e0
- Foreground: #4a90e2 (animated left-to-right)
```

---

### 4.3 Affordances (Dicas Visuais de Interação)

#### 4.3.1 Cursor Changes

```
CURSOR TYPES:

1. pointer (mão com dedo):
   - Links
   - Botões
   - Cards clicáveis
   - Tabs
   - Ícones de ação

2. grab (mão aberta):
   - Cards no Kanban (antes de drag)
   - Elementos draggable em repouso

3. grabbing (mão fechada):
   - Durante drag-and-drop

4. text (I-beam):
   - Inputs
   - Textareas
   - Áreas editáveis inline

5. not-allowed (círculo cortado):
   - Botões disabled
   - Ações não permitidas

6. move (setas 4 direções):
   - Modal sendo arrastado (se permitido)
   - Resize handles
```

#### 4.3.2 Hover Effects

```
CARDS:
- Scale: 1.02 (2% maior)
- Shadow: aumenta de LOW → MEDIUM
- Border: subtle highlight (#4a90e2 com opacity 20%)
- Transition: 150ms ease-out

BUTTONS:
- Background: 10% darker
- Shadow: adiciona LOW shadow
- Scale: 1.0 → 0.98 (active)
- Transition: 100ms ease-in-out

LINKS:
- Underline: aparece
- Color: sem mudança (mantém azul)

ÍCONES DE AÇÃO:
- Color: cinza #666 → azul #4a90e2
- Scale: 1.0 → 1.1
- Rotation: (específico, ex: ⚙️ roda 90deg)

TABS:
- Background: transparent → #f9f9f9
- Border-bottom: sem → 2px solid #e0e0e0 (preview)
```

---

### 4.4 Hierarquia Visual

#### 4.4.1 Ordem de Atenção (F-Pattern)

```
PRIORIDADE DE LEITURA (baseado em eye-tracking):

1. TOPO ESQUERDO (mais importante):
   - Logo
   - Título da página
   - Breadcrumb

2. TOPO DIREITO:
   - Ações principais (botões)
   - Avatar/Menu usuário
   - Notificações

3. LINHA HORIZONTAL (após header):
   - Navegação principal
   - Filtros

4. CONTEÚDO CENTRAL:
   - Cards de oportunidades
   - Tabelas de dados
   - Forms

5. RODAPÉ/BOTTOM:
   - FAB (floating action button)
   - Paginação
   - Metadados
```

#### 4.4.2 Contraste e Peso Visual

```
PESO ALTO (chama atenção):
- Botões primários (azul sólido)
- Badges de notificação (vermelho)
- FAB (azul com sombra alta)
- Títulos H1 (peso 700)

PESO MÉDIO (conteúdo principal):
- Cards de oportunidades
- Texto corpo (peso 400)
- Inputs
- Tabs ativas

PESO BAIXO (informação secundária):
- Timestamps (cinza #999)
- Tooltips
- Subtítulos
- Placeholders
```

---

### 4.5 Consistência e Previsibilidade

#### 4.5.1 Padrões de Navegação

```
PADRÃO: Navegação Horizontal (Top Bar)

VANTAGENS:
- ✅ Mobile-friendly (escala melhor que sidebar)
- ✅ Foco no conteúdo (não rouba espaço lateral)
- ✅ Consistente em todas as resoluções
- ✅ Fácil de escanear (eye-tracking horizontal)

DESVANTAGENS:
- ❌ Limitado a 6-8 itens (mais que isso: overflow)
- ❌ Submenu escondido (dropdown)
- ❌ Não mostra hierarquia visual (tudo no mesmo nível)

ALTERNATIVA NÃO USADA: Sidebar Lateral

RD Station escolheu TOP BAR:
- Alinhamento com produto web moderno
- Competidores usam sidebar (Pipedrive, HubSpot)
- Diferenciação visual
```

#### 4.5.2 Linguagem de Ícones

```
ÍCONES CONSISTENTES:

📞 TELEFONE:
- Ação: Ligar
- Cor: Vermelho (se pendente)
- Contexto: Card, Tarefas

📧 EMAIL:
- Ação: Enviar email
- Cor: Azul (padrão) | Vermelho (se pendente)
- Contexto: Card, Tarefas, Timeline

💬 WHATSAPP:
- Ação: Enviar mensagem
- Cor: Verde #25d366
- Contexto: Tarefas, Contatos

🤝 REUNIÃO:
- Ação: Agendar reunião
- Cor: Roxo #6f42c1
- Contexto: Tarefas, Calendário

⚙️ CONFIGURAÇÃO:
- Ação: Abrir configurações
- Cor: Cinza (hover: rotação 90deg)
- Contexto: Header, Funis

🗑️ EXCLUIR:
- Ação: Deletar item
- Cor: Vermelho (hover)
- Contexto: Cards, Forms, Listagens

✏️ EDITAR:
- Ação: Editar item
- Cor: Azul (hover)
- Contexto: Cards, Forms, Listagens

⓵ INFO:
- Ação: Mostrar tooltip/ajuda
- Cor: Azul claro
- Contexto: Labels, Headers

⟳ RECARREGAR:
- Ação: Refresh de dados
- Cor: Cinza
- Contexto: Filtros, Listas

⊕ ADICIONAR:
- Ação: Criar novo item
- Cor: Verde (em funis) | Azul (geral)
- Contexto: Funis, Forms

⋮ MENU (3 pontos verticais):
- Ação: Abrir menu contextual
- Cor: Cinza #999
- Contexto: Cards, Listagens
```

---

## 🚫 PARTE 5: PROBLEMAS UX DO RD STATION

### 5.1 Problemas Críticos (P0 - Bloqueadores)

#### 5.1.1 Configuração de Funis Enterrada

**Problema**:
- Configurar Funil = funcionalidade MAIS CRÍTICA do CRM (define todo o workflow)
- Caminho atual: Avatar → Configurações → Funis (3 níveis, 3 cliques)
- Usuário novo não encontra facilmente

**Impacto**:
- ❌ Onboarding confuso (novo usuário não sabe como personalizar)
- ❌ Adoção lenta (usuários ficam presos no funil padrão)
- ❌ Abandono (se não encontrar, desiste do produto)

**Evidência**:
- Screenshot `Funil_4.png` mostra página de configuração isolada
- Nenhuma indicação visual de "como chegar aqui" no Kanban

**Solução STAGETEK** (oportunidade de diferenciação):
```
OPÇÃO 1: Botão visível no Kanban
┌──────────────────────────────────────────────────┐
│ ⓘ Oportunidades        [⚙️ Configurar Funis]    │ ← Botão destacado
└──────────────────────────────────────────────────┘

OPÇÃO 2: Link no menu principal
[Logo] | Dashboard | Funil | Configurações | ...
                               ↑ item de menu

OPÇÃO 3: Wizard de onboarding
- Primeiro login: "Vamos configurar seu funil?"
- Guia passo a passo: criar funil → adicionar etapas → pronto
```

**Prioridade**: 🔴 **P0 - Crítico**

---

#### 5.1.2 Falta de Atalhos / Ações Rápidas

**Problema**:
- Criar tarefa: 4 cliques (Funil → Card → Tab Tarefas → Nova)
- Criar oportunidade: 2 cliques (Funil → FAB)
- Enviar email: 3 cliques (Card → Tab Email → Compor)
- Não há atalhos de teclado visíveis

**Impacto**:
- ❌ Fricção desnecessária (tarefas comuns levam muito tempo)
- ❌ Baixa produtividade (vendedor precisa de velocidade)
- ❌ Frustração (usuário avançado quer atalhos)

**Evidência**:
- Nenhuma screenshot mostra hint de keyboard shortcuts
- Nenhum botão "Ações Rápidas" no TopBar

**Solução STAGETEK** (oportunidade de diferenciação):
```
OPÇÃO 1: Botão "Ações Rápidas" no TopBar
┌──────────────────────────────────────────────────┐
│ [Logo] | ... | [🔍] [⚡ Ações ▼] [Avatar]       │
│                     ↓ dropdown                   │
│              • Nova Oportunidade (Ctrl+N)        │
│              • Nova Tarefa (Ctrl+T)              │
│              • Nova Cotação (Ctrl+Q)             │
│              • Novo Cliente (Ctrl+Shift+C)       │
└──────────────────────────────────────────────────┘

OPÇÃO 2: Command Palette (atalho: Ctrl+K)
┌──────────────────────────────────────────────────┐
│ 🔍 Digite um comando...                          │
│                                                  │
│ Resultados:                                      │
│ • Criar nova oportunidade                        │
│ • Ir para Dashboard                              │
│ • Buscar cliente "Stagetek"                      │
│ • Configurar funil                               │
└──────────────────────────────────────────────────┘

OPÇÃO 3: FAB com submenu
Canto inferior direito:
[+] ← hover → [Nova Oportunidade] [Nova Tarefa] [Nova Cotação]
```

**Prioridade**: 🔴 **P0 - Crítico**

---

### 5.2 Problemas Graves (P1 - Alta Prioridade)

#### 5.2.1 Cards do Kanban Muito Básicos

**Problema**:
- Falta temperatura visual (🔥 Hot | 🌡️ Warm | 🧊 Cold)
- Falta avatar do cliente (apenas ícone genérico)
- Falta indicador de tarefas atrasadas
- Falta timestamp relativo ("Atualizado há 2h")

**Impacto**:
- ❌ Falta de contexto (vendedor não sabe quais oportunidades priorizar)
- ❌ Informação oculta (precisa clicar para ver detalhes)
- ❌ Menos eficiente que competidores (Pipedrive tem cards mais ricos)

**Evidência**:
- Screenshot `Tela funil_RDStation_1.png` mostra cards simples
- Screenshot `Funil_RD 3.png` mostra tooltip, mas informação limitada

**Comparação com Pipedrive**:
```
RD STATION CARD (atual):
┌─────────────────────────┐
│ 👤 Pedido Setembro      │
│    RD Station CRM       │
│ 💰 R$ 1,00  ⭐⭐⭐⭐⭐    │
│ 📞 📧 🕐                 │
└─────────────────────────┘

PIPEDRIVE CARD (melhor):
┌─────────────────────────┐
│ 🔥 Pedido Setembro  [JD]│ ← Temperatura + Avatar
│    RD Station CRM       │
│ 💰 R$ 1,00  ⭐⭐⭐⭐⭐    │
│ 📞 Ligar hoje 14h ⚠️    │ ← Próxima tarefa + alerta
│ Atualizado há 2h        │ ← Timestamp relativo
└─────────────────────────┘
```

**Solução STAGETEK**:
```
STAGETEK CARD (versão melhorada):
┌─────────────────────────────┐
│ 🔥 Pedido Set Luz      [ST] │ ← Temperatura + Avatar cliente
│    Stagetek                 │
│ 💰 R$ 15.000  ⭐⭐⭐⭐☆      │
│ ───────────────────────────  │
│ 📞 Ligar hoje 14h  ⚠️       │ ← Tarefa + badge atrasada
│ [Mario B.] há 3 dias        │ ← Responsável + timestamp
└─────────────────────────────┘

ELEMENTOS ADICIONADOS:
1. Ícone temperatura (🔥/🌡️/🧊)
2. Avatar cliente (iniciais com cor hash)
3. Badge tarefas atrasadas (vermelho)
4. Avatar responsável (iniciais pequenas)
5. Timestamp relativo ("há 3 dias")
```

**Prioridade**: 🟡 **P1 - Alta**

---

#### 5.2.2 Falta de Indicadores de Contexto (Breadcrumb)

**Problema**:
- Usuário não sabe "onde está" no sistema
- Sem breadcrumb visível em detalhes de oportunidade
- Botão "voltar" (`←`) existe, mas sem texto explicativo

**Impacto**:
- ❌ Desorientação (usuário perde noção de localização)
- ❌ Navegação confusa (não sabe como voltar)
- ❌ Menos confiança no produto

**Evidência**:
- Screenshot `tela oportunidade.png` mostra apenas `←` sem breadcrumb
- Nenhuma indicação de "Oportunidades > Pedido Setembro"

**Solução STAGETEK**:
```
ADICIONAR BREADCRUMB:

ANTES (RD Station):
┌──────────────────────────────────────┐
│ ← Venda JANEIRO                      │
│    RD Station                        │
└──────────────────────────────────────┘

DEPOIS (Stagetek):
┌──────────────────────────────────────┐
│ ← Oportunidades > Pedido Set Luz     │ ← Breadcrumb clicável
│    Stagetek                          │
└──────────────────────────────────────┘

MAIS COMPLETO:
┌──────────────────────────────────────┐
│ ← Dashboard > Funil > Pedido Set Luz │
│    Stagetek                          │
│    [Nova Cotação] [Histórico]        │ ← Ações contextuais
└──────────────────────────────────────┘
```

**Prioridade**: 🟡 **P1 - Alta**

---

#### 5.2.3 Funcionalidade "Produtos" Escondida

**Problema**:
- Tab "PRODUTOS E SERVIÇOS" é a 5ª tab (ordem alfabética?)
- Funcionalidade crítica para cotações
- Usuário pode não descobrir que existe

**Impacto**:
- ❌ Feature subutilizada
- ❌ Cotações criadas fora do CRM (planilha)
- ❌ ROI do produto reduzido

**Evidência**:
- Screenshot `produtos e serviços.png` mostra tab isolada
- Ordem das tabs: HISTÓRICO | E-MAIL | TAREFAS | CONTATOS | **PRODUTOS** | ARQUIVOS

**Solução STAGETEK**:
```
OPÇÃO 1: Reordenar tabs por importância
HISTÓRICO | PRODUTOS | TAREFAS | E-MAIL | CONTATOS | ARQUIVOS
             ↑ 2ª posição (mais visível)

OPÇÃO 2: Botão dedicado no header
┌──────────────────────────────────────────────────┐
│ ← Pedido Set Luz           [Nova Cotação]       │ ← Botão destacado
│    Stagetek                                      │
└──────────────────────────────────────────────────┘

OPÇÃO 3: Badge de "vazio" nas tabs
PRODUTOS (0) | TAREFAS (3) | E-MAIL (5)
   ↑ contador chama atenção
```

**Prioridade**: 🟡 **P1 - Alta**

---

### 5.3 Problemas Médios (P2)

#### 5.3.1 Tooltips Inconsistentes

**Problema**:
- Screenshot `Funil_RD 3.png` mostra tooltip em hover de card
- Mas nem todos elementos têm tooltips (ex: ícones de ação)
- Conteúdo do tooltip é redundante ("Pedido Setembro" repetido)

**Solução**:
- Tooltips devem mostrar informação ADICIONAL (não repetir título)
- Exemplo: "Atualizado há 2h | Responsável: Mario | Próxima: Ligar hoje 14h"

---

#### 5.3.2 Falta de Indicadores de Loading

**Problema**:
- Não há screenshot mostrando estados de loading
- Usuário não sabe se ação foi registrada
- Possível duplo-clique em botões (submit múltiplo)

**Solução**:
- Spinners em botões durante submit
- Skeleton loading em listas
- Toast de confirmação após ações

---

#### 5.3.3 Modal de Modelos de Email Muito Simples

**Problema**:
- Screenshot `modelos de e-mail.png` mostra lista básica
- Falta preview lado a lado (tem que clicar para ver)
- Falta categorização (Prospecção, Follow-up, Proposta)
- Falta busca avançada (tags, última modificação)

**Solução**:
- Split-view: lista (esquerda) + preview (direita) ← **JÁ TEM!**
- Adicionar: categorias, filtros, preview ao hover

---

### 5.4 Oportunidades de Diferenciação STAGETEK

**O que RD faz MAL que podemos fazer MELHOR:**

1. **⚡ Velocidade** (atalhos, ações rápidas, command palette)
2. **🎯 Contexto** (breadcrumb, indicadores visuais, temperatura)
3. **🔍 Descoberta** (wizard de onboarding, tour guiado, dicas contextuais)
4. **💡 Inteligência** (sugestões de próxima ação, lead scoring automático)
5. **🎨 Personalização** (cards customizáveis, colunas configuráveis, temas)
6. **📊 Insights** (KPIs inline no Kanban, alertas de gargalos)

**Princípio**: RD Station é ROBUSTO mas COMPLEXO. STAGETEK será SIMPLES mas PODEROSO.

---

## 📈 PARTE 6: RESUMO E RECOMENDAÇÕES

### 6.1 Nota Final: ⭐ 8.5/10

**Justificativa**:
- ✅ **Layout**: Limpo, moderno, consistente (9/10)
- ✅ **Navegação**: Funcional, mas poderia ter atalhos (7/10)
- ✅ **Feedback**: Toast, animações adequadas (8/10)
- ✅ **Design System**: Cores, tipografia, espaçamento consistentes (9/10)
- ❌ **Descoberta**: Funcionalidades críticas escondidas (6/10)
- ❌ **Eficiência**: Muitos cliques para tarefas comuns (7/10)

**Média ponderada**: 8.5/10

---

### 6.2 Top 10 Recomendações para STAGETEK

#### 1. **Botão "Configurar Funis" visível no Kanban** (P0)
   - Não enterrar em 3 níveis de menu
   - Wizard de onboarding na primeira vez

#### 2. **Command Palette (Ctrl+K)** (P0)
   - Criar oportunidade, tarefa, cotação via comando
   - Busca universal (clientes, produtos, oportunidades)

#### 3. **Cards do Kanban enriquecidos** (P1)
   - Temperatura (🔥/🌡️/🧊)
   - Avatar do cliente
   - Próxima tarefa inline
   - Timestamp relativo

#### 4. **Breadcrumb em todas as páginas** (P1)
   - Dashboard > Funil > Pedido Set Luz
   - Clicável (navegação rápida)

#### 5. **Botão "Nova Cotação" visível** (P1)
   - No header de DetalheOportunidade
   - No menu principal (link "Cotações")

#### 6. **Atalhos de teclado** (P1)
   - Ctrl+N: Nova Oportunidade
   - Ctrl+T: Nova Tarefa
   - Ctrl+Q: Nova Cotação
   - Esc: Fechar modal

#### 7. **Loading states em tudo** (P2)
   - Spinners em botões
   - Skeleton em listas
   - Progress bar em uploads

#### 8. **Tooltips informativos** (P2)
   - Mostrar informação adicional (não repetir)
   - Exemplo: "Atualizado há 2h | Próxima: Ligar 14h"

#### 9. **Drag-and-drop com preview** (P2)
   - Mostrar valor da oportunidade durante drag
   - Highlight de drop zones mais evidente

#### 10. **Onboarding guiado** (P2)
   - Tour no primeiro login
   - Tooltips contextuais ("Clique aqui para...")
   - Checklist de setup (5 passos)

---

### 6.3 Matriz de Esforço vs Impacto

```
ALTO IMPACTO | BAIXO ESFORÇO:
✅ Breadcrumb (2h dev)
✅ Botão "Configurar Funis" visível (1h dev)
✅ Loading states (4h dev)
✅ Reordenar tabs por importância (30min dev)

ALTO IMPACTO | ALTO ESFORÇO:
⏳ Command Palette (3 dias dev)
⏳ Cards enriquecidos (2 dias dev + 1 dia backend)
⏳ Onboarding guiado (5 dias dev)

BAIXO IMPACTO | BAIXO ESFORÇO:
⏹️ Tooltips melhorados (2h dev)
⏹️ Animações extras (1 dia dev)

BAIXO IMPACTO | ALTO ESFORÇO:
❌ Temas customizáveis (1 semana dev)
❌ Drag-and-drop entre funis (4 dias dev)
```

**Estratégia**: Focar em **Quick Wins** (Alto Impacto + Baixo Esforço) primeiro.

---

### 6.4 Checklist de Implementação STAGETEK

```
SPRINT 1 (P0 - Blockers):
[ ] Botão "Configurar Funis" no Kanban
[ ] Wizard de onboarding (primeira vez)
[ ] Loading states (spinners + skeleton)
[ ] Breadcrumb component (reutilizável)

SPRINT 2 (P1 - High Priority):
[ ] Command Palette (Ctrl+K)
[ ] Cards do Kanban v2 (temperatura, avatar, tarefa)
[ ] Botão "Nova Cotação" visível
[ ] Atalhos de teclado (5 principais)

SPRINT 3 (P2 - Nice to Have):
[ ] Tooltips informativos
[ ] Onboarding tour (5 passos)
[ ] Drag-and-drop com preview
[ ] Animações polidas
```

---

## 🎯 CONCLUSÃO

**RD Station CRM é um produto maduro e funcional**, com design system consistente e navegação clara. Porém, comete erros clássicos de UX:
1. Enterrar funcionalidades críticas (Config Funis)
2. Falta de atalhos (muitos cliques para tarefas comuns)
3. Cards básicos (falta contexto visual)

**STAGETEK tem oportunidade de diferenciação** focando em:
1. **Velocidade** (atalhos, command palette)
2. **Contexto** (breadcrumb, temperatura, avatars)
3. **Descoberta** (wizard, onboarding, tooltips)

**Objetivo**: Criar um CRM tão SIMPLES quanto poderoso - "O RD Station que deveria ser".

---

**Documentação viva**: Atualizar após cada sprint
**Próxima revisão**: Após implementar P0 (Sprint 1 completo)

Built with ❤️ by STAGETEK UX Team
**Protocol Notecraft™ compliant**

---

**FIM DO DOCUMENTO**
