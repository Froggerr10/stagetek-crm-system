# RD Station CRM - Inventário EXAUSTIVO de Features

**Data**: 24 de Outubro de 2025
**Analista**: Business Analyst Sênior
**Objetivo**: Documentar TODAS as funcionalidades do RD Station CRM para replicação no STAGETEK CRM
**Fontes**: 15 screenshots + REFERENCE-RD-STATION-ANALYSIS.md + SPECS-PRD.md

---

## 📊 RESUMO EXECUTIVO

### Estatísticas do Inventário

| Categoria | Total Identificado |
|-----------|-------------------|
| **Módulos Principais** | 7 módulos |
| **Features Detalhadas** | 287 features |
| **Campos de Dados** | 142 campos |
| **Componentes UI** | 89 componentes |
| **Ações do Usuário** | 156 ações |
| **Regras de Negócio** | 43 regras |
| **Integrações** | 8 sistemas |

### Módulos Identificados

1. **Oportunidades** (Funil Kanban) - 68 features
2. **Detalhes da Oportunidade** (6 Tabs) - 92 features
3. **Clientes/Empresas** - 24 features
4. **Contatos** - 18 features
5. **Tarefas** - 31 features
6. **Produtos e Serviços** - 22 features
7. **Configurações de Funis** - 32 features

---

## 🎯 MÓDULO 1: OPORTUNIDADES (FUNIL KANBAN)

### 1.1 Top Bar Global

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| TB-001 | Logo RD STATION CRM | Brand | Canto superior esquerdo, logo azul/branco | ✅ Logo STAGETEK implementado |
| TB-002 | Link "Oportunidades" | Navigation | Texto azul quando ativo (#00a4e4) | ✅ Implementado TopBar |
| TB-003 | Link "Empresas/Clientes" | Navigation | Texto cinza quando inativo | ✅ Implementado |
| TB-004 | Link "Contatos" | Navigation | Texto cinza quando inativo | ⏳ Página não existe |
| TB-005 | Link "Tarefas" | Navigation | Texto cinza + Badge vermelho "67" | ⏳ Página não existe |
| TB-006 | Link "Analisar" | Navigation | Texto cinza quando inativo | ⏳ Relatórios não existem |
| TB-007 | Ícone Busca (lupa) | Search | Ícone cinza, hover azul | ✅ SearchBar implementado |
| TB-008 | Ícone Notificações (sino) | Notifications | Ícone cinza + Badge vermelho numérico | ⏳ Não implementado |
| TB-009 | Ícone Ajuda (?) | Help | Ícone cinza, abre tooltip ou modal | ⏳ Não implementado |
| TB-010 | Ícone Apps (grade 3x3) | Integrations | Ícone cinza, abre menu de apps | ⏳ Não implementado |
| TB-011 | Avatar Usuário | User Menu | Círculo com iniciais "MB" (Mario Becker) | ✅ UserMenu implementado |
| TB-012 | Texto "Conta DEMO PRO" | User Info | Texto cinza pequeno abaixo do avatar | ⏳ Não implementado |
| TB-013 | Dropdown Avatar | User Menu | Seta para baixo, expande menu | ✅ Implementado |

### 1.2 Header da Página Oportunidades

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| PH-001 | Ícone Informação | Info | Círculo azul com "i" branco | ⏳ Não implementado |
| PH-002 | Título "Oportunidades" | Title | Texto h1, cor cinza escuro | ✅ Implementado |
| PH-003 | Label "Funil de vendas" | Filter Label | Texto pequeno cinza | ⏳ Não implementado |
| PH-004 | Dropdown Seletor de Funil | Filter | "Funil PADRÃO \| Não Alterar▼" | ⏳ Não implementado (apenas 1 funil) |
| PH-005 | Label "Dono da tarefa" | Filter Label | Texto pequeno cinza | ⏳ Não implementado |
| PH-006 | Dropdown Filtro Dono | Filter | "Minhas oportunidades▼" | ⏳ Não implementado |
| PH-007 | Label "Em andamento▼" | Filter Label | Texto pequeno cinza | ⏳ Não implementado |
| PH-008 | Botão "⟳ Recarregar" | Action Button | Ícone refresh + texto, borda cinza | ⏳ Não implementado |
| PH-009 | Botão "▦ Filtro ativo" | Filter Toggle | Ícone grid + texto, fundo cinza | ⏳ Não implementado |

### 1.3 Kanban Board - Estrutura

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| KB-001 | Layout 5 Colunas Horizontal | Layout | Grid horizontal scroll, espaçamento 16px | ✅ HTML existe (não React) |
| KB-002 | Coluna "Sem contato / Lead" | Stage Column | Background #f5f5f5, width 280px | ✅ HTML existe |
| KB-003 | Coluna "Contato Feito" | Stage Column | Background #f5f5f5, width 280px | ✅ HTML existe |
| KB-004 | Coluna "Visita / Apresentação" | Stage Column | Background #f5f5f5, width 280px | ✅ HTML existe |
| KB-005 | Coluna "Proposta enviada" | Stage Column | Background #f5f5f5, width 280px | ✅ HTML existe |
| KB-006 | Coluna "Fechamento" | Stage Column | Background #f5f5f5, width 280px | ✅ HTML existe |
| KB-007 | Drag-and-Drop entre Colunas | Interaction | Visual feedback ao arrastar | ✅ HTML existe (dnd-kit) |
| KB-008 | Auto-scroll Horizontal | Interaction | Scroll suave ao arrastar próximo às bordas | ⏳ Não implementado |

### 1.4 Kanban Column Header

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| CH-001 | Título do Estágio | Header Title | Texto bold, 14px, cor #212529 | ✅ Implementado |
| CH-002 | Ícone Dropdown Estágio | Interaction | Seta para baixo, hover azul | ⏳ Não implementado |
| CH-003 | Contador de Oportunidades | Counter | "X oportunidades" em cinza pequeno | ✅ Implementado |
| CH-004 | Valor Total da Coluna | Currency Display | "R$ X.XXX,XX" em texto maior | ✅ Implementado |
| CH-005 | Ícone Info (Coluna) | Tooltip | Círculo com "i", hover mostra explicação | ⏳ Não implementado |

### 1.5 Kanban Card (Oportunidade)

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| OC-001 | Avatar Cliente | Visual | Círculo laranja (#FF9800) com ícone pessoa branco | ✅ Implementado (iniciais) |
| OC-002 | Título da Oportunidade | Link | Texto azul (#00a4e4), hover underline | ✅ Implementado |
| OC-003 | Origem/Empresa | Secondary Text | Texto cinza pequeno (#6c757d), 12px | ✅ Implementado |
| OC-004 | Valor 1 (Azul) | Currency | Ícone moeda azul + "R$ X,XX" | ✅ Implementado |
| OC-005 | Valor 2 (Cinza) | Currency | Ícone moeda cinza + "R$ X,XX" | ✅ Implementado |
| OC-006 | Qualificação (Estrelas) | Rating | 5 estrelas, preenchidas em azul (#00a4e4) | ⏳ Não implementado |
| OC-007 | Ícone Telefone (Ação Rápida) | Quick Action | Ícone telefone vermelho (#dc3545) quando tarefa atrasada | ⏳ Não implementado |
| OC-008 | Ícone Email (Ação Rápida) | Quick Action | Ícone email vermelho quando pendente | ⏳ Não implementado |
| OC-009 | Ícone Relógio | Info | Ícone relógio cinza, hover mostra próxima tarefa | ⏳ Não implementado |
| OC-010 | Hover State Expandido | Interaction | Card cresce, sombra aumenta, mostra preview | ⏳ Não implementado |
| OC-011 | Click no Card | Navigation | Redireciona para DetalheOportunidade.tsx | ⏳ Não implementado (página não existe) |
| OC-012 | Drag Handle | Interaction | Card inteiro é draggable | ✅ HTML implementado |
| OC-013 | Background Branco | Visual | #ffffff, border-radius 6px | ✅ Implementado |
| OC-014 | Sombra Sutil | Visual | box-shadow: 0 1px 3px rgba(0,0,0,0.12) | ✅ Implementado |
| OC-015 | Padding Interno | Visual | 12px todos os lados | ✅ Implementado |

### 1.6 Tooltip de Preview (Hover)

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| TP-001 | Título Grande | Display | Texto 18px bold, cor #212529 | ⏳ Não implementado |
| TP-002 | Origem | Display | Texto cinza 14px | ⏳ Não implementado |
| TP-003 | Botão "Ver oportunidade completa →" | Link | Texto azul com seta, hover underline | ⏳ Não implementado |
| TP-004 | Animação de Entrada | Animation | Fade in 200ms ease-out | ⏳ Não implementado |

### 1.7 FAB (Floating Action Button)

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| FAB-001 | Botão Circular Azul | Button | Diameter 56px, background #00a4e4 | ✅ Implementado (páginas existentes) |
| FAB-002 | Ícone "+" Branco | Icon | 24px, cor #ffffff | ✅ Implementado |
| FAB-003 | Posição Fixa | Layout | Bottom-right: 24px, fixed position | ✅ Implementado |
| FAB-004 | Sombra Elevada | Visual | box-shadow: 0 4px 12px rgba(0,0,0,0.25) | ✅ Implementado |
| FAB-005 | Hover State | Interaction | Background #0085b8, sombra aumenta | ✅ Implementado |
| FAB-006 | Click Abre Modal | Action | Modal "Nova Oportunidade" centralizado | ✅ OportunidadeModal implementado |

---

## 🔍 MÓDULO 2: DETALHES DA OPORTUNIDADE

### 2.1 Header da Página Detalhes

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| DH-001 | Botão "←" Voltar | Navigation | Ícone seta esquerda, hover azul | ⏳ Não implementado (página não existe) |
| DH-002 | Título da Oportunidade | Display | Texto h1, "Venda JANEIRO" | ⏳ Não implementado |
| DH-003 | Subtítulo (Origem) | Display | "RD Station" em cinza pequeno | ⏳ Não implementado |
| DH-004 | Toast/Alerta Verde | Notification | Banner verde topo: "Nova oportunidade, criada hoje..." | ⏳ Não implementado |
| DH-005 | Ícone Fogo (Toast) | Icon | Ícone fogo branco em círculo vermelho | ⏳ Não implementado |
| DH-006 | Botão "×" Fechar Toast | Action | X branco, fecha banner | ⏳ Não implementado |
| DH-007 | Botão "👍 Marcar venda" | Action | Verde (#28a745), hover escurece | ⏳ Não implementado |
| DH-008 | Botão "👎 Marcar perda" | Action | Vermelho (#dc3545), hover escurece | ⏳ Não implementado |
| DH-009 | Ícone Engrenagem | Action | Cinza, hover azul, abre dropdown opções | ⏳ Não implementado |
| DH-010 | Ícone Lixeira | Action | Cinza, hover vermelho, confirma exclusão | ⏳ Não implementado |
| DH-011 | Ícone Telefone (Header) | Quick Action | Cinza, hover azul, inicia ligação? | ⏳ Não implementado |
| DH-012 | Texto "Saldo: R$ 91,12" | Display | Canto superior direito, texto cinza | ⏳ Não implementado |
| DH-013 | Ícone Informação (Saldo) | Tooltip | Círculo com "i", hover explica cálculo | ⏳ Não implementado |

### 2.2 Tabs de Navegação

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| TAB-001 | Tab "HISTÓRICO" | Tab Button | Texto azul + underline azul quando ativo | ⏳ Não implementado |
| TAB-002 | Tab "E-MAIL" | Tab Button | Texto cinza quando inativo | ⏳ Não implementado |
| TAB-003 | Tab "TAREFAS" | Tab Button | Texto cinza quando inativo | ⏳ Não implementado |
| TAB-004 | Tab "CONTATOS" | Tab Button | Texto cinza quando inativo | ⏳ Não implementado |
| TAB-005 | Tab "PRODUTOS E SERVIÇOS" | Tab Button | Texto cinza quando inativo | ⏳ Não implementado |
| TAB-006 | Tab "ARQUIVOS" | Tab Button | Texto cinza quando inativo | ⏳ Não implementado |
| TAB-007 | Underline Animado | Animation | Linha azul 2px move suavemente entre tabs | ⏳ Não implementado |

### 2.3 Sidebar Esquerda - Informações da Oportunidade

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| SL-001 | Label "Funil e estágio de vendas" | Label | Texto cinza pequeno uppercase | ⏳ Não implementado |
| SL-002 | Funil Visual Horizontal | Display | 5-8 bolinhas conectadas por linha | ⏳ Não implementado |
| SL-003 | Bolinha Azul Preenchida (Atual) | Visual | Círculo #00a4e4, diâmetro 12px | ⏳ Não implementado |
| SL-004 | Bolinha Branca Vazia (Próximos) | Visual | Círculo border azul, fill branco | ⏳ Não implementado |
| SL-005 | Linha Conectora Azul | Visual | Linha 2px azul entre bolinhas | ⏳ Não implementado |
| SL-006 | Texto Nome do Estágio (Abaixo) | Label | "Sem contato / Lead" em cinza 11px | ⏳ Não implementado |
| SL-007 | Label "Qualificação" | Label | Texto cinza pequeno uppercase | ⏳ Não implementado |
| SL-008 | Estrelas de Qualificação | Rating Input | 5 estrelas clicáveis, azul quando selecionadas | ⏳ Não implementado |
| SL-009 | Label "Valores" | Label | Texto cinza pequeno uppercase | ⏳ Não implementado |
| SL-010 | Valor 1 (●R$ 0,00) | Currency Display | Círculo azul + valor | ⏳ Não implementado |
| SL-011 | Valor 2 (●R$ 0,00) | Currency Display | Círculo cinza + valor | ⏳ Não implementado |
| SL-012 | Label "Data de criação" | Label | Texto cinza pequeno uppercase | ⏳ Não implementado |
| SL-013 | Data de Criação | Display | "19/01/2022 às 10:11" formato PT-BR | ⏳ Não implementado |
| SL-014 | Label "Previsão de fechamento" | Label | Texto cinza pequeno uppercase | ⏳ Não implementado |
| SL-015 | Ícone Calendário Vazio | Display | Ícone calendário cinza (data não preenchida) | ⏳ Não implementado |
| SL-016 | Date Picker (Previsão) | Input | Click abre calendário, seleciona data | ⏳ Não implementado |

### 2.4 Tab HISTÓRICO - Timeline

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| TH-001 | Sub-tab "CRIAR ANOTAÇÃO" | Tab | Azul quando ativo | ⏳ Não implementado |
| TH-002 | Sub-tab "CRIAR TAREFA" | Tab | Cinza quando inativo | ⏳ Não implementado |
| TH-003 | Input "Registre a anotação" | Textarea | Placeholder cinza, borda cinza clara | ⏳ Não implementado |
| TH-004 | Botão "Criar anotação" | Button | Azul full-width, texto branco | ⏳ Não implementado |
| TH-005 | Título "HISTÓRICO DA OPORTUNIDADE" | Section Title | Texto uppercase cinza | ⏳ Não implementado |
| TH-006 | Sub-tab "HISTÓRICO DO MARKETING" | Tab | Cinza quando inativo | ⏳ Não implementado |
| TH-007 | Checkbox "Anotação" | Filter | Checked por padrão | ⏳ Não implementado |
| TH-008 | Checkbox "Tarefa" | Filter | Checked por padrão | ⏳ Não implementado |
| TH-009 | Checkbox "Alteração" | Filter | Checked por padrão | ⏳ Não implementado |
| TH-010 | Checkbox "Email" | Filter | Checked por padrão | ⏳ Não implementado |
| TH-011 | Checkbox "Proposta" | Filter | Checked por padrão | ⏳ Não implementado |
| TH-012 | Checkbox "Resposta de email" | Filter | Checked por padrão | ⏳ Não implementado |
| TH-013 | Checkbox "Ligações" | Filter | Checked por padrão | ⏳ Não implementado |
| TH-014 | Checkbox "Mensageiro" | Filter | Checked por padrão | ⏳ Não implementado |
| TH-015 | Checkbox "Limite de execuções da automação" | Filter | Checked por padrão | ⏳ Não implementado |
| TH-016 | Item de Timeline | Timeline Entry | Avatar + texto + timestamp | ⏳ Não implementado |
| TH-017 | Avatar do Autor | Visual | Círculo com iniciais "MB" | ⏳ Não implementado |
| TH-018 | Nome do Autor + Ação | Text | "Mario Becker a 4 minutos atrás..." | ⏳ Não implementado |
| TH-019 | Timestamp Relativo | Display | "4 segundos atrás" atualiza dinamicamente | ⏳ Não implementado |
| TH-020 | Linha Vertical Conectora | Visual | Linha cinza clara 1px entre items | ⏳ Não implementado |

### 2.5 Tab TAREFAS

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| TT-001 | Título "PRÓXIMAS TAREFAS" | Section Title | Texto uppercase cinza bold | ⏳ Não implementado |
| TT-002 | Ícone Recarregar (Tarefas) | Action | Ícone refresh circular, hover azul | ⏳ Não implementado |
| TT-003 | Lista de Tarefas | List | Cards brancos com borda cinza clara | ⏳ Não implementado |
| TT-004 | Ícone de Tipo (Ligação) | Icon | Ícone telefone em círculo, cor por tipo | ⏳ Não implementado |
| TT-005 | Ícone de Tipo (WhatsApp) | Icon | Logo WhatsApp verde | ⏳ Não implementado |
| TT-006 | Ícone de Tipo (Email) | Icon | Ícone envelope | ⏳ Não implementado |
| TT-007 | Ícone de Tipo (Reunião) | Icon | Ícone calendário ou pessoas | ⏳ Não implementado |
| TT-008 | Tipo da Tarefa (Label) | Text | "Ligação", "Whatsapp", etc | ⏳ Não implementado |
| TT-009 | Título da Tarefa | Text | "Primeira Tentativa" bold 14px | ⏳ Não implementado |
| TT-010 | Horário da Tarefa | Timestamp | "Hoje às 10:27" cinza 12px | ⏳ Não implementado |
| TT-011 | Ícone Editar (Tarefa) | Action | Lápis cinza, hover azul | ⏳ Não implementado |
| TT-012 | Ícone Relógio (Tarefa) | Info | Relógio cinza, hover mostra tooltip | ⏳ Não implementado |
| TT-013 | Checkbox Concluir | Action | Checkbox azul grande (24px), marca completa | ⏳ Não implementado |
| TT-014 | Link "+ Ver Mais" | Pagination | Texto azul, carrega mais tarefas | ⏳ Não implementado |
| TT-015 | Sub-tab "CRIAR ANOTAÇÃO" | Tab | Cinza quando inativo | ⏳ Não implementado |
| TT-016 | Sub-tab "CRIAR TAREFA" | Tab | Azul quando ativo | ⏳ Não implementado |
| TT-017 | Label "Tipo" | Form Label | Texto cinza pequeno + asterisco vermelho | ⏳ Não implementado |
| TT-018 | Dropdown "Assunto" | Select | Mostra ícone do tipo selecionado | ⏳ Não implementado |
| TT-019 | Opção "Ligação" (Dropdown) | Option | Ícone telefone + texto | ⏳ Não implementado |
| TT-020 | Label "Data *" | Form Label | Texto cinza + asterisco vermelho | ⏳ Não implementado |
| TT-021 | Date Picker Input | Input | "📅 19/01/2022" com ícone | ⏳ Não implementado |
| TT-022 | Ícone Relógio (Form) | Visual | Separador visual entre data e hora | ⏳ Não implementado |
| TT-023 | Time Picker Input | Input | "🕐 10:12" com ícone | ⏳ Não implementado |
| TT-024 | Label "Responsável" | Form Label | Texto cinza pequeno | ⏳ Não implementado |
| TT-025 | Avatar Responsável | Display | Círculo com foto "Mario Becker" | ⏳ Não implementado |
| TT-026 | Email Responsável | Display | "mario.becker@rdstation.com" cinza | ⏳ Não implementado |
| TT-027 | Checkbox "✓ Adicionado" | Status | Checkbox verde checked | ⏳ Não implementado |
| TT-028 | Link "Buscar responsável" | Action | Texto azul, abre modal de busca | ⏳ Não implementado |

### 2.6 Tab PRODUTOS E SERVIÇOS

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| TP-001 | Título "Adicionar produtos e serviços" | Section Title | Texto h2 cinza escuro | ⏳ Não implementado |
| TP-002 | Subtítulo (Descrição) | Text | Cinza pequeno "Adicione produtos..." | ⏳ Não implementado |
| TP-003 | Label "Buscar *" | Form Label | Texto cinza + asterisco vermelho | ⏳ Não implementado |
| TP-004 | Dropdown Buscar Produto | Select | "CURSO XYZ ▼" com autocomplete | ⏳ Não implementado |
| TP-005 | Label "Produto: *" | Form Label | Texto cinza + asterisco vermelho | ⏳ Não implementado |
| TP-006 | Display Produto Selecionado | Display | Mostra nome + SKU do produto | ⏳ Não implementado |
| TP-007 | Label "Quantidade" | Form Label | Texto cinza pequeno | ⏳ Não implementado |
| TP-008 | Input Numérico Quantidade | Number Input | Valor padrão 1, botões +/- | ⏳ Não implementado |
| TP-009 | Label "Preço" | Form Label | Texto cinza pequeno | ⏳ Não implementado |
| TP-010 | Input Preço | Currency Input | "R$ 2.000,00" formatado | ⏳ Não implementado |
| TP-011 | Label "Recorrência" | Form Label | Texto cinza pequeno | ⏳ Não implementado |
| TP-012 | Dropdown Recorrência | Select | "Único" ou "Recorrente" | ⏳ Não implementado |
| TP-013 | Opção "Único" | Option | Hover estado azul claro | ⏳ Não implementado |
| TP-014 | Opção "Recorrente" | Option | Hover estado azul claro | ⏳ Não implementado |
| TP-015 | Checkbox "📋 Desconto" | Checkbox | Desmarcado por padrão, ícone clipboard | ⏳ Não implementado |
| TP-016 | Botão "Adicionar produto/serviço à oportunidade" | Action Button | Azul canto inferior direito | ⏳ Não implementado |
| TP-017 | Tabela Header "Produto ou serviço" | Table Column | Texto bold cinza | ⏳ Não implementado |
| TP-018 | Tabela Header "Qtde" | Table Column | Texto bold cinza, abreviado | ⏳ Não implementado |
| TP-019 | Tabela Header "Preço" | Table Column | Texto bold cinza | ⏳ Não implementado |
| TP-020 | Tabela Header "Recorrência" | Table Column | Texto bold cinza | ⏳ Não implementado |
| TP-021 | Tabela Header "Subtotal" | Table Column | Texto bold cinza | ⏳ Não implementado |
| TP-022 | Tabela Header "Opções" | Table Column | Texto bold cinza | ⏳ Não implementado |
| TP-023 | Estado Vazio Tabela | Empty State | "Nenhum produto adicionado à oportunidade" | ⏳ Não implementado |

### 2.7 Tab E-MAIL

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| TE-001 | Título "Novo E-mail" | Section Title | Texto h2 cinza escuro | ⏳ Não implementado |
| TE-002 | Label "De" | Form Label | Texto cinza pequeno | ⏳ Não implementado |
| TE-003 | Display Email Remetente | Display | "Mario Becker <mario.becker@rdstation.com>" | ⏳ Não implementado |
| TE-004 | Label "Para" | Form Label | Texto cinza pequeno | ⏳ Não implementado |
| TE-005 | Tag/Chip Destinatário | Tag | "× Mario <mario@rdstation.xyz>" removível | ⏳ Não implementado |
| TE-006 | Botão "×" Remover Tag | Action | X vermelho, remove destinatário | ⏳ Não implementado |
| TE-007 | Link "CC" | Action | Texto azul, expande campo CC | ⏳ Não implementado |
| TE-008 | Link "BCC" | Action | Texto azul, expande campo BCC | ⏳ Não implementado |
| TE-009 | Label "Escolher modelo de e-mail" | Form Label | Texto cinza pequeno | ⏳ Não implementado |
| TE-010 | Link "Selecione um modelo" | Action | Azul underline, abre modal templates | ⏳ Não implementado |
| TE-011 | Label "Assunto: *" | Form Label | Texto cinza + asterisco vermelho | ⏳ Não implementado |
| TE-012 | Input Assunto | Text Input | Placeholder "Assunto do E-mail *" | ⏳ Não implementado |
| TE-013 | Barra de Ferramentas WYSIWYG | Toolbar | Background cinza claro, ícones 20px | ⏳ Não implementado |
| TE-014 | Dropdown "Formato" | Format Dropdown | Paragraph, H1, H2, H3, etc | ⏳ Não implementado |
| TE-015 | Dropdown "Fonte" | Font Dropdown | Arial, Times, etc | ⏳ Não implementado |
| TE-016 | Dropdown "Tamanho" | Size Dropdown | 10, 12, 14, 16, 18, etc | ⏳ Não implementado |
| TE-017 | Botão "B" (Negrito) | Format Button | Toggle bold, azul quando ativo | ⏳ Não implementado |
| TE-018 | Botão "I" (Itálico) | Format Button | Toggle italic, azul quando ativo | ⏳ Não implementado |
| TE-019 | Botão "U" (Sublinhado) | Format Button | Toggle underline, azul quando ativo | ⏳ Não implementado |
| TE-020 | Botões Alinhamento | Format Buttons | Esquerda, Centro, Direita, Justificado | ⏳ Não implementado |
| TE-021 | Botão Lista | Format Button | Lista bullet ou numerada | ⏳ Não implementado |
| TE-022 | Botão "🔗" (Link) | Insert Button | Abre modal para inserir URL | ⏳ Não implementado |
| TE-023 | Botão "Código-Fonte" | View Toggle | Mostra HTML raw | ⏳ Não implementado |
| TE-024 | Botão "≡" (Mais Opções) | Dropdown | Menu com opções extras | ⏳ Não implementado |
| TE-025 | Botão "📎" (Anexar) | Attach Button | Abre file picker | ⏳ Não implementado |
| TE-026 | Botão "🖼️" (Imagem) | Insert Button | Abre modal para upload imagem | ⏳ Não implementado |
| TE-027 | Área de Texto (Corpo) | Rich Text Editor | Contenteditable div, min-height 300px | ⏳ Não implementado |
| TE-028 | Assinatura Email | Display | "mario@rdstation.xyz" em azul no final | ⏳ Não implementado |
| TE-029 | Botão "Enviar" | Action Button | Azul, canto inferior direito | ⏳ Não implementado |
| TE-030 | Botão "Cancelar" ou "Salvar Rascunho" | Action Button | Cinza, canto inferior direito | ⏳ Não implementado |
| TE-031 | Botões "Sim" / "Não" (Topo) | Action Buttons | Azul/Vermelho, propósito não claro no screenshot | ⏳ Não implementado |

### 2.8 Sidebar Direita - Informações Complementares

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| SR-001 | Label "Responsável" | Form Label | Texto cinza pequeno uppercase | ⏳ Não implementado |
| SR-002 | Dropdown Responsável | Select | "Mario Becker ▼" com avatar | ⏳ Não implementado |
| SR-003 | Accordion "Dados da Empresa/Cliente" | Accordion | Título + seta ▼, expansível | ⏳ Não implementado |
| SR-004 | Conteúdo Empresa (Expandido) | Accordion Content | Campos: Nome, CNPJ, Email, Telefone | ⏳ Não implementado |
| SR-005 | Accordion "Dados da Oportunidade" | Accordion | Título + seta ▼, expansível | ⏳ Não implementado |
| SR-006 | Conteúdo Oportunidade (Expandido) | Accordion Content | Campos: Valor, Data, Descrição | ⏳ Não implementado |
| SR-007 | Accordion "Dados do Contato" | Accordion | Título + seta ▼, expansível | ⏳ Não implementado |
| SR-008 | Conteúdo Contato (Expandido) | Accordion Content | Campos: Nome, Email, Cargo | ⏳ Não implementado |
| SR-009 | Loader Animado | Loading State | Spinner azul circular | ⏳ Não implementado |
| SR-010 | Link "+ Adicionar contato" | Action | Texto azul, abre modal busca/criação | ⏳ Não implementado |

---

## 📧 MÓDULO 3: MODAL MODELOS DE EMAIL

### 3.1 Modal Header

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| ME-001 | Título "Modelos de Email" | Modal Title | Texto h2 bold cinza escuro | ⏳ Não implementado |
| ME-002 | Botão "×" Fechar Modal | Action | X cinza canto superior direito | ⏳ Não implementado |

### 3.2 Sidebar Esquerda (Lista)

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| ME-003 | Input "Pesquisar" | Search Input | Placeholder + ícone lupa | ⏳ Não implementado |
| ME-004 | Item Lista "Apresentação RD Station CRM" | List Item | Background azul claro quando hover/selecionado | ⏳ Não implementado |
| ME-005 | Item Lista "Proposta" | List Item | Background branco quando não selecionado | ⏳ Não implementado |
| ME-006 | Item Lista "Tentativa de Contato" | List Item | Background branco quando não selecionado | ⏳ Não implementado |
| ME-007 | Scroll Vertical (Lista) | Scroll | Scrollbar fina cinza | ⏳ Não implementado |

### 3.3 Preview do Modelo (Área Principal)

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| ME-008 | Saudação | Text | "Olá Mario, tudo bem?" | ⏳ Não implementado |
| ME-009 | Parágrafo 1 | Text | "Como combinamos, segue a apresentação..." | ⏳ Não implementado |
| ME-010 | Parágrafo 2 | Text | "No documento você encontrará..." | ⏳ Não implementado |
| ME-011 | Parágrafo 3 | Text | "Assim que ver o material..." | ⏳ Não implementado |
| ME-012 | Despedida | Text | "Abraços" | ⏳ Não implementado |
| ME-013 | Variáveis de Template | Placeholder | {{nome_cliente}}, {{nome_empresa}}, etc | ⏳ Não implementado |

### 3.4 Modal Footer

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| ME-014 | Botão "Cancelar" | Action Button | Texto vermelho, à esquerda | ⏳ Não implementado |
| ME-015 | Botão "SELECIONAR MODELO" | Action Button | Azul uppercase, à direita | ⏳ Não implementado |

---

## ⚙️ MÓDULO 4: CONFIGURAÇÃO DE FUNIS

### 4.1 Header da Página

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| CF-001 | Botão "←" Voltar | Navigation | Seta esquerda, hover azul | ⏳ Não implementado |
| CF-002 | Breadcrumb "Funis de vendas" | Breadcrumb | Texto cinza com seta separadora | ⏳ Não implementado |
| CF-003 | Ícone Informação | Info | Círculo azul com "i" | ⏳ Não implementado |
| CF-004 | Link "Configurações" | Breadcrumb | Texto azul, link ativo | ⏳ Não implementado |

### 4.2 Tabs Configurações

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| CF-005 | Tab "FUNIL DE VENDAS" | Tab Button | Azul + underline quando ativo | ⏳ Não implementado |
| CF-006 | Tab "CRM2CRM" | Tab Button | Cinza quando inativo | ⏳ Não implementado |

### 4.3 Título da Seção

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| CF-007 | Título "Configure seus funis de vendas..." | Section Title | Texto h2 cinza escuro | ⏳ Não implementado |
| CF-008 | Ícone Ajuda (?) | Tooltip | Círculo cinza com "?", hover mostra dica | ⏳ Não implementado |

### 4.4 Funil Card (Exemplo: "Funil PADRÃO")

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| CF-009 | Ícone "▷" Expandir/Colapsar | Toggle | Triângulo cinza, rotate 90° quando expandido | ⏳ Não implementado |
| CF-010 | Título do Funil | Editable Title | "Funil PADRÃO ( Não Alterar )" | ⏳ Não implementado |
| CF-011 | Ícone Editar Título | Action | Lápis cinza, hover azul | ⏳ Não implementado |
| CF-012 | Link "⚙️ Editar automação entre funis" | Action | Azul com ícone engrenagem | ⏳ Não implementado |
| CF-013 | Ícone Lixeira (Funil) | Action | Cinza, hover vermelho, confirma exclusão | ⏳ Não implementado |

### 4.5 Editor Visual de Estágios (Horizontal)

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| CF-014 | Círculo Estágio | Visual | Círculo azul preenchido, diameter 32px | ⏳ Não implementado |
| CF-015 | Label Nome do Estágio | Editable Text | "Sem contato / Lead" abaixo do círculo | ⏳ Não implementado |
| CF-016 | Label Sigla | Display | "Sigla: SC/L" cinza pequeno | ⏳ Não implementado |
| CF-017 | Linha Conectora Azul | Visual | Linha 3px azul horizontal entre círculos | ⏳ Não implementado |
| CF-018 | Hover Estado Estágio | Interaction | Círculo cresce 10%, cursor pointer | ⏳ Não implementado |
| CF-019 | Click Estágio | Interaction | Abre modal para editar nome/sigla | ⏳ Não implementado |
| CF-020 | Círculo "+" Verde (Final) | Action Button | Círculo verde com "+", adiciona estágio | ⏳ Não implementado |
| CF-021 | Drag-and-Drop Estágios | Interaction | Reordenar estágios arrastando | ⏳ Não implementado |

### 4.6 Exemplos de Funis

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| CF-022 | Funil "Funil PADRÃO" | Example | 5 estágios: SC/L, CF, V/A, PE, F | ⏳ Não implementado |
| CF-023 | Funil "Funil Prospecção" | Example | 8 estágios: SC, P, CF, IDI, P, M, BP, + | ⏳ Não implementado |
| CF-024 | Funil "Funil de carteira" | Example | Vários estágios (parcialmente visível) | ⏳ Não implementado |

---

## 👥 MÓDULO 5: CLIENTES/EMPRESAS (Inferido)

### 5.1 Página Lista de Clientes

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| CL-001 | DataTable Desktop | Table | Colunas: Avatar, Nome, CNPJ, Email, Status | ✅ Implementado |
| CL-002 | Cards Mobile | Card Grid | 1 coluna mobile, avatar + dados | ✅ Implementado |
| CL-003 | Avatar com Iniciais | Visual | Círculo colorido com 2 letras | ✅ Implementado |
| CL-004 | Badge Status | Badge | Verde "Ativo", Cinza "Inativo" | ✅ Implementado |
| CL-005 | Botão Editar (Linha) | Action | Ícone lápis, abre modal | ✅ Implementado |
| CL-006 | Botão Deletar (Linha) | Action | Ícone lixeira, confirma exclusão | ✅ Implementado |
| CL-007 | Filtro por Busca | Search Input | Input com lupa, filtra real-time | ✅ Implementado |
| CL-008 | Filtro por Status | Select | Dropdown "Todos", "Ativo", "Inativo" | ⏳ Não implementado |
| CL-009 | Ordenação por Coluna | Sort | Click header alterna ASC/DESC | ⏳ Não implementado |
| CL-010 | Paginação | Pagination | Botões Previous/Next + números | ⏳ Não implementado |

### 5.2 Modal Criar/Editar Cliente

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| CL-011 | Input "Nome" | Text Input | Required, validação não vazio | ✅ Implementado |
| CL-012 | Input "CNPJ" | Masked Input | Máscara XX.XXX.XXX/XXXX-XX | ✅ Implementado |
| CL-013 | Autocomplete CNPJ | Integration | brasil-api-mcp busca dados | ⏳ Não implementado |
| CL-014 | Input "Email" | Email Input | Validação formato email | ✅ Implementado |
| CL-015 | Input "Telefone" | Masked Input | Máscara (XX) XXXXX-XXXX | ✅ Implementado |
| CL-016 | Input "Website" | URL Input | Validação formato URL | ✅ Implementado |
| CL-017 | Select "Status" | Select | Ativo, Inativo, Pendente | ✅ Implementado |
| CL-018 | Accordion "Endereço" | Accordion | Expansível, campos JSONB | ✅ Implementado |
| CL-019 | Input "Rua" (Endereço) | Text Input | Dentro do accordion | ✅ Implementado |
| CL-020 | Input "Cidade" (Endereço) | Text Input | Dentro do accordion | ✅ Implementado |
| CL-021 | Input "Estado" (Endereço) | Select | UF dropdown (SP, RJ, etc) | ✅ Implementado |
| CL-022 | Input "CEP" (Endereço) | Masked Input | Máscara XXXXX-XXX | ✅ Implementado |
| CL-023 | Input "País" (Endereço) | Text Input | Default "Brasil" | ✅ Implementado |
| CL-024 | Botão "Salvar" | Action Button | Azul, valida e cria/atualiza | ✅ Implementado |

---

## 📇 MÓDULO 6: CONTATOS (Inferido)

### 6.1 Página Lista de Contatos

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| CT-001 | DataTable Desktop | Table | Colunas: Avatar, Nome, Email, Cliente | ⏳ Não implementado |
| CT-002 | Cards Mobile | Card Grid | Avatar + nome + email + cliente | ⏳ Não implementado |
| CT-003 | Avatar com Iniciais | Visual | Círculo colorido 2 letras | ⏳ Não implementado |
| CT-004 | Link para Cliente | Link | Nome do cliente clicável | ⏳ Não implementado |
| CT-005 | Botão Editar (Linha) | Action | Ícone lápis, abre modal | ⏳ Não implementado |
| CT-006 | Botão Deletar (Linha) | Action | Ícone lixeira, confirma | ⏳ Não implementado |
| CT-007 | Filtro por Busca | Search Input | Filtra nome/email/cliente | ⏳ Não implementado |
| CT-008 | Filtro por Cliente | Select | Dropdown clientes | ⏳ Não implementado |

### 6.2 Modal Criar/Editar Contato

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| CT-009 | Input "Nome" | Text Input | Required | ⏳ Não implementado |
| CT-010 | Input "Email" | Email Input | Validação formato | ⏳ Não implementado |
| CT-011 | Input "Telefone" | Masked Input | Máscara (XX) XXXXX-XXXX | ⏳ Não implementado |
| CT-012 | Input "Cargo" | Text Input | Opcional | ⏳ Não implementado |
| CT-013 | Select "Cliente" | Select | Dropdown clientes, required | ⏳ Não implementado |
| CT-014 | Botão "Salvar" | Action Button | Azul, valida e cria/atualiza | ⏳ Não implementado |

---

## ✅ MÓDULO 7: TAREFAS (Página Global)

### 7.1 Página Lista de Tarefas

| ID | Feature | Tipo | Detalhes Visuais | Status STAGETEK |
|----|---------|------|------------------|-----------------|
| TK-001 | Badge Contador (Top Nav) | Badge | Vermelho "67" no link "Tarefas" | ⏳ Não implementado |
| TK-002 | Filtro "Minhas tarefas" | Filter Button | Azul quando ativo | ⏳ Não implementado |
| TK-003 | Filtro "Todas" | Filter Button | Cinza quando inativo | ⏳ Não implementado |
| TK-004 | Filtro "Atrasadas" | Filter Button | Vermelho com contador | ⏳ Não implementado |
| TK-005 | Filtro "Hoje" | Filter Button | Cinza com contador | ⏳ Não implementado |
| TK-006 | Filtro "Amanhã" | Filter Button | Cinza com contador | ⏳ Não implementado |
| TK-007 | Agrupamento "Por data" | View Toggle | Radio button | ⏳ Não implementado |
| TK-008 | Agrupamento "Por tipo" | View Toggle | Radio button | ⏳ Não implementado |
| TK-009 | Agrupamento "Por responsável" | View Toggle | Radio button | ⏳ Não implementado |
| TK-010 | Card de Tarefa | Card | Background branco, sombra leve | ⏳ Não implementado |
| TK-011 | Ícone Tipo (Card) | Visual | Telefone, WhatsApp, Email, Reunião | ⏳ Não implementado |
| TK-012 | Título Tarefa (Card) | Link | Texto bold, clicável | ⏳ Não implementado |
| TK-013 | Nome Oportunidade Vinculada | Link | Texto cinza pequeno | ⏳ Não implementado |
| TK-014 | Timestamp (Card) | Display | "Hoje às 10:27" cinza | ⏳ Não implementado |
| TK-015 | Responsável Avatar (Card) | Visual | Círculo pequeno 24px | ⏳ Não implementado |
| TK-016 | Checkbox Concluir (Card) | Action | 24px azul, marca completa | ⏳ Não implementado |
| TK-017 | Botão Editar (Card) | Action | Lápis cinza, abre modal | ⏳ Não implementado |
| TK-018 | Botão Deletar (Card) | Action | Lixeira cinza, confirma | ⏳ Não implementado |

---

## 🔢 CAMPOS DE DADOS (ENTIDADES)

### Entity: Opportunity (Oportunidade)

| Campo | Tipo | Nullable | Default | Validação | Fonte |
|-------|------|----------|---------|-----------|-------|
| id | UUID | NOT NULL | uuid_generate_v4() | - | RD Analysis |
| title | TEXT | NOT NULL | - | Min 3 chars | Screenshot Kanban |
| client_id | UUID (FK) | NULL | - | Valid client.id | Screenshot Kanban |
| value_1 | DECIMAL(12,2) | NOT NULL | 0.00 | >= 0 | Screenshot Kanban (azul) |
| value_2 | DECIMAL(12,2) | NULL | 0.00 | >= 0 | Screenshot Kanban (cinza) |
| currency | TEXT | NOT NULL | 'BRL' | BRL/USD/EUR | STAGETEK PRD |
| stage | TEXT | NOT NULL | 'lead' | Valid stage | Screenshot Funil |
| qualification | INTEGER | NULL | NULL | 0-5 | Screenshot Kanban (estrelas) |
| expected_close_date | DATE | NULL | NULL | >= today | Screenshot Detalhes |
| probability | INTEGER | NULL | NULL | 0-100 | STAGETEK PRD |
| description | TEXT | NULL | NULL | Max 5000 chars | Inferido |
| assigned_to | UUID (FK) | NOT NULL | auth.uid() | Valid user.id | Screenshot Sidebar |
| funnel_id | UUID (FK) | NOT NULL | default_funnel | Valid funnel.id | Screenshot Config Funis |
| origin | TEXT | NULL | NULL | - | Screenshot Kanban |
| created_at | TIMESTAMP | NOT NULL | NOW() | - | Screenshot Detalhes |
| updated_at | TIMESTAMP | NOT NULL | NOW() | Auto-update | Inferido |
| created_by | UUID (FK) | NOT NULL | auth.uid() | Valid user.id | RLS |

### Entity: Client (Cliente/Empresa)

| Campo | Tipo | Nullable | Default | Validação | Fonte |
|-------|------|----------|---------|-----------|-------|
| id | UUID | NOT NULL | uuid_generate_v4() | - | STAGETEK Atual |
| name | TEXT | NOT NULL | - | Min 3 chars | Screenshot Kanban |
| cnpj | TEXT | NOT NULL | - | Unique, format XX.XXX.XXX/XXXX-XX | STAGETEK Atual |
| email | TEXT | NULL | NULL | Valid email | STAGETEK Atual |
| phone | TEXT | NULL | NULL | Format (XX) XXXXX-XXXX | STAGETEK Atual |
| website | TEXT | NULL | NULL | Valid URL | STAGETEK Atual |
| address | JSONB | NULL | NULL | {street, city, state, zip, country} | STAGETEK Atual |
| status | TEXT | NOT NULL | 'active' | active/inactive/pending | STAGETEK Atual |
| created_at | TIMESTAMP | NOT NULL | NOW() | - | STAGETEK Atual |
| updated_at | TIMESTAMP | NOT NULL | NOW() | Auto-update | STAGETEK Atual |
| created_by | UUID (FK) | NOT NULL | auth.uid() | Valid user.id | STAGETEK Atual |

### Entity: Contact (Contato)

| Campo | Tipo | Nullable | Default | Validação | Fonte |
|-------|------|----------|---------|-----------|-------|
| id | UUID | NOT NULL | uuid_generate_v4() | - | RD Analysis |
| client_id | UUID (FK) | NOT NULL | - | Valid client.id | Screenshot Sidebar |
| name | TEXT | NOT NULL | - | Min 3 chars | Screenshot Sidebar |
| email | TEXT | NULL | NULL | Valid email | Screenshot Sidebar |
| phone | TEXT | NULL | NULL | Format (XX) XXXXX-XXXX | Screenshot Sidebar |
| role | TEXT | NULL | NULL | Cargo do contato | Inferido |
| created_at | TIMESTAMP | NOT NULL | NOW() | - | Inferido |
| updated_at | TIMESTAMP | NOT NULL | NOW() | Auto-update | Inferido |

### Entity: Task (Tarefa)

| Campo | Tipo | Nullable | Default | Validação | Fonte |
|-------|------|----------|---------|-----------|-------|
| id | UUID | NOT NULL | uuid_generate_v4() | - | Screenshot Tarefas |
| opportunity_id | UUID (FK) | NOT NULL | - | Valid opportunity.id | Screenshot Tarefas |
| type | TEXT | NOT NULL | 'call' | call/whatsapp/email/meeting | Screenshot Tarefas |
| title | TEXT | NOT NULL | - | Min 3 chars | Screenshot Tarefas |
| description | TEXT | NULL | NULL | Max 5000 chars | Inferido |
| due_date | DATE | NOT NULL | - | >= today | Screenshot Form Tarefas |
| due_time | TIME | NOT NULL | - | Format HH:MM | Screenshot Form Tarefas |
| assigned_to | UUID (FK) | NOT NULL | - | Valid user.id | Screenshot Form Tarefas |
| status | TEXT | NOT NULL | 'pending' | pending/completed/cancelled | Screenshot Tarefas |
| completed_at | TIMESTAMP | NULL | NULL | Set when marked complete | Inferido |
| created_by | UUID (FK) | NOT NULL | auth.uid() | Valid user.id | RLS |
| created_at | TIMESTAMP | NOT NULL | NOW() | - | Screenshot Tarefas |

### Entity: Product (Produto)

| Campo | Tipo | Nullable | Default | Validação | Fonte |
|-------|------|----------|---------|-----------|-------|
| id | UUID | NOT NULL | uuid_generate_v4() | - | Screenshot Produtos |
| name | TEXT | NOT NULL | - | Min 3 chars | Screenshot Produtos |
| sku | TEXT | NOT NULL | - | Unique | STAGETEK PRD |
| category | TEXT | NULL | NULL | som/luz/estrutura/talha | STAGETEK PRD |
| price | DECIMAL(10,2) | NOT NULL | 0.00 | >= 0 | Screenshot Form Produtos |
| price_brl | DECIMAL(10,2) | NULL | NULL | >= 0 | STAGETEK PRD |
| price_usd | DECIMAL(10,2) | NULL | NULL | >= 0 | STAGETEK PRD |
| price_eur | DECIMAL(10,2) | NULL | NULL | >= 0 | STAGETEK PRD |
| description | TEXT | NULL | NULL | Max 5000 chars | Screenshot Form Produtos |
| image_url | TEXT | NULL | NULL | Valid URL | STAGETEK PRD |
| stock_quantity | INTEGER | NULL | 0 | >= 0 | STAGETEK PRD |
| is_active | BOOLEAN | NOT NULL | TRUE | - | Inferido |
| created_at | TIMESTAMP | NOT NULL | NOW() | - | STAGETEK PRD |

### Entity: OpportunityProduct (Produto vinculado)

| Campo | Tipo | Nullable | Default | Validação | Fonte |
|-------|------|----------|---------|-----------|-------|
| id | UUID | NOT NULL | uuid_generate_v4() | - | Screenshot Tabela Produtos |
| opportunity_id | UUID (FK) | NOT NULL | - | Valid opportunity.id | Screenshot Tab Produtos |
| product_id | UUID (FK) | NOT NULL | - | Valid product.id | Screenshot Form Produtos |
| quantity | INTEGER | NOT NULL | 1 | > 0 | Screenshot Form Produtos |
| unit_price | DECIMAL(10,2) | NOT NULL | - | >= 0 | Screenshot Form Produtos |
| discount_percent | DECIMAL(5,2) | NULL | 0.00 | 0-100 | Screenshot Checkbox Desconto |
| recurrence | TEXT | NOT NULL | 'unique' | unique/recurrent | Screenshot Dropdown Recorrência |
| subtotal | DECIMAL(12,2) | NOT NULL | - | Generated: qty * unit_price * (1 - discount) | Screenshot Tabela |
| created_at | TIMESTAMP | NOT NULL | NOW() | - | Inferido |

### Entity: Funnel (Funil)

| Campo | Tipo | Nullable | Default | Validação | Fonte |
|-------|------|----------|---------|-----------|-------|
| id | UUID | NOT NULL | uuid_generate_v4() | - | Screenshot Config Funis |
| name | TEXT | NOT NULL | - | Min 3 chars, Unique | Screenshot Config Funis |
| description | TEXT | NULL | NULL | Max 500 chars | Inferido |
| is_default | BOOLEAN | NOT NULL | FALSE | Only one can be TRUE | Screenshot Dropdown Funil |
| is_active | BOOLEAN | NOT NULL | TRUE | - | Inferido |
| created_at | TIMESTAMP | NOT NULL | NOW() | - | Inferido |
| created_by | UUID (FK) | NOT NULL | auth.uid() | Valid user.id | RLS |

### Entity: FunnelStage (Estágio do Funil)

| Campo | Tipo | Nullable | Default | Validação | Fonte |
|-------|------|----------|---------|-----------|-------|
| id | UUID | NOT NULL | uuid_generate_v4() | - | Screenshot Config Funis |
| funnel_id | UUID (FK) | NOT NULL | - | Valid funnel.id | Screenshot Config Funis |
| name | TEXT | NOT NULL | - | Min 3 chars | Screenshot Config Funis |
| abbreviation | TEXT | NOT NULL | - | Max 5 chars | Screenshot Config Funis |
| order | INTEGER | NOT NULL | - | > 0, Unique per funnel | Screenshot Visual Editor |
| color | TEXT | NULL | '#00a4e4' | Valid hex color | Screenshot Círculos Azuis |
| created_at | TIMESTAMP | NOT NULL | NOW() | - | Inferido |

### Entity: EmailTemplate (Modelo de Email)

| Campo | Tipo | Nullable | Default | Validação | Fonte |
|-------|------|----------|---------|-----------|-------|
| id | UUID | NOT NULL | uuid_generate_v4() | - | Screenshot Modal Templates |
| name | TEXT | NOT NULL | - | Min 3 chars, Unique | Screenshot Lista Templates |
| subject | TEXT | NOT NULL | - | Min 3 chars | Inferido |
| body | TEXT | NOT NULL | - | HTML content | Screenshot Preview Template |
| variables | JSONB | NULL | NULL | Array of variable names | Inferido {{nome_cliente}} |
| is_active | BOOLEAN | NOT NULL | TRUE | - | Inferido |
| created_by | UUID (FK) | NOT NULL | auth.uid() | Valid user.id | RLS |
| created_at | TIMESTAMP | NOT NULL | NOW() | - | Inferido |
| updated_at | TIMESTAMP | NOT NULL | NOW() | Auto-update | Inferido |

### Entity: Email (Email Enviado)

| Campo | Tipo | Nullable | Default | Validação | Fonte |
|-------|------|----------|---------|-----------|-------|
| id | UUID | NOT NULL | uuid_generate_v4() | - | Screenshot Tab Email |
| opportunity_id | UUID (FK) | NOT NULL | - | Valid opportunity.id | Screenshot Tab Email |
| template_id | UUID (FK) | NULL | NULL | Valid template.id | Screenshot Link Template |
| from_email | TEXT | NOT NULL | - | Valid email | Screenshot Campo "De" |
| to_email | TEXT[] | NOT NULL | - | Array of valid emails | Screenshot Tags "Para" |
| cc | TEXT[] | NULL | NULL | Array of valid emails | Screenshot Link "CC" |
| bcc | TEXT[] | NULL | NULL | Array of valid emails | Screenshot Link "BCC" |
| subject | TEXT | NOT NULL | - | Min 3 chars | Screenshot Input Assunto |
| body | TEXT | NOT NULL | - | HTML content | Screenshot Editor WYSIWYG |
| sent_at | TIMESTAMP | NOT NULL | NOW() | - | Inferido |
| sent_by | UUID (FK) | NOT NULL | auth.uid() | Valid user.id | Screenshot Display "De" |

### Entity: Note (Anotação)

| Campo | Tipo | Nullable | Default | Validação | Fonte |
|-------|------|----------|---------|-----------|-------|
| id | UUID | NOT NULL | uuid_generate_v4() | - | Screenshot Tab Histórico |
| opportunity_id | UUID (FK) | NOT NULL | - | Valid opportunity.id | Screenshot Tab Histórico |
| content | TEXT | NOT NULL | - | Min 3 chars, Max 5000 | Screenshot Input Anotação |
| created_by | UUID (FK) | NOT NULL | auth.uid() | Valid user.id | Screenshot Avatar Timeline |
| created_at | TIMESTAMP | NOT NULL | NOW() | - | Screenshot Timestamp |

### Entity: ActivityLog (Timeline/Histórico)

| Campo | Tipo | Nullable | Default | Validação | Fonte |
|-------|------|----------|---------|-----------|-------|
| id | UUID | NOT NULL | uuid_generate_v4() | - | Screenshot Timeline |
| opportunity_id | UUID (FK) | NOT NULL | - | Valid opportunity.id | Screenshot Timeline |
| type | TEXT | NOT NULL | - | note/task/email/change/proposal/call | Screenshot Checkboxes Filtro |
| description | TEXT | NOT NULL | - | Max 5000 chars | Screenshot Item Timeline |
| metadata | JSONB | NULL | NULL | Extra data (e.g., old_value, new_value) | Inferido |
| created_by | UUID (FK) | NOT NULL | auth.uid() | Valid user.id | Screenshot Avatar Timeline |
| created_at | TIMESTAMP | NOT NULL | NOW() | - | Screenshot Timestamp |

### Entity: File (Arquivo Anexado)

| Campo | Tipo | Nullable | Default | Validação | Fonte |
|-------|------|----------|---------|-----------|-------|
| id | UUID | NOT NULL | uuid_generate_v4() | - | Screenshot Tab Arquivos |
| opportunity_id | UUID (FK) | NOT NULL | - | Valid opportunity.id | Screenshot Tab Arquivos |
| filename | TEXT | NOT NULL | - | Original filename | Inferido |
| file_url | TEXT | NOT NULL | - | Supabase Storage URL | STAGETEK PRD |
| file_size | BIGINT | NOT NULL | - | Bytes | Inferido |
| mime_type | TEXT | NOT NULL | - | e.g., application/pdf | Inferido |
| uploaded_by | UUID (FK) | NOT NULL | auth.uid() | Valid user.id | RLS |
| uploaded_at | TIMESTAMP | NOT NULL | NOW() | - | Inferido |

---

## ⚙️ REGRAS DE NEGÓCIO IDENTIFICADAS

### RN-001: Auto-numeração de Oportunidades
**Descrição**: Sistema deve gerar ID único para cada oportunidade
**Formato**: Não explícito nos screenshots (inferir: OPP-YYYYMM-NNN)
**Implementação**: PostgreSQL function + trigger
**Status STAGETEK**: ⏳ Não implementado

### RN-002: Cálculo de Valores no Kanban
**Descrição**: Cada coluna mostra soma de value_1 de todas oportunidades no estágio
**Fórmula**: SUM(value_1) WHERE stage = 'X'
**Atualização**: Real-time via Supabase Realtime
**Status STAGETEK**: ✅ HTML implementado

### RN-003: Contador de Oportunidades por Coluna
**Descrição**: Cada coluna mostra quantidade de cards
**Fórmula**: COUNT(*) WHERE stage = 'X'
**Status STAGETEK**: ✅ HTML implementado

### RN-004: Qualificação com Estrelas (0-5)
**Descrição**: Usuario pode classificar oportunidade com 1-5 estrelas
**Valores**: 0 = não qualificado, 1-5 = temperatura lead
**Mapeamento**: 1-2 = Cold, 3 = Warm, 4-5 = Hot
**Status STAGETEK**: ⏳ Não implementado

### RN-005: Timestamp Relativo em Timeline
**Descrição**: Mostrar "4 segundos atrás", "2 min atrás", "1 hora atrás"
**Biblioteca**: date-fns + formatDistanceToNow
**Atualização**: A cada 60 segundos
**Status STAGETEK**: ⏳ Não implementado

### RN-006: Filtros Múltiplos em Histórico
**Descrição**: Checkboxes de filtro com lógica OR (mostrar se qualquer checked)
**Estado**: Array de tipos ativos [note, task, email]
**Query**: WHERE type IN ('note', 'task', 'email')
**Status STAGETEK**: ⏳ Não implementado

### RN-007: Tarefas Atrasadas - Ícone Vermelho
**Descrição**: Se due_date + due_time < NOW() e status = 'pending', mostrar ícone vermelho
**Visual**: Telefone ou email em vermelho (#dc3545)
**Query**: WHERE due_date < CURRENT_DATE OR (due_date = CURRENT_DATE AND due_time < CURRENT_TIME)
**Status STAGETEK**: ⏳ Não implementado

### RN-008: Badge Contador de Tarefas (Top Nav)
**Descrição**: Badge vermelha mostra quantidade de tarefas pendentes do usuário
**Fórmula**: COUNT(*) WHERE assigned_to = auth.uid() AND status = 'pending'
**Atualização**: Real-time via Supabase Realtime
**Status STAGETEK**: ⏳ Não implementado

### RN-009: Recorrência de Produtos
**Descrição**: Produto pode ser "Único" ou "Recorrente" (mensal?)
**Impacto**: Cálculo de valor total (recorrente = valor * 12?)
**Status STAGETEK**: ⏳ Não implementado

### RN-010: Desconto em Produtos
**Descrição**: Se checkbox desconto marcado, mostrar campo % desconto
**Cálculo Subtotal**: quantity * unit_price * (1 - discount_percent / 100)
**Status STAGETEK**: ⏳ Não implementado

### RN-011: Validação de Email Único no Template
**Descrição**: Não permitir emails duplicados no campo "Para"
**Visual**: Tag vermelha se email já adicionado
**Status STAGETEK**: ⏳ Não implementado

### RN-012: Variáveis de Template
**Descrição**: Template pode conter {{nome_cliente}}, {{nome_empresa}}, {{valor}}
**Substituição**: Ao enviar email, replace variáveis com dados reais
**Formato**: Mustache-like {{variable_name}}
**Status STAGETEK**: ⏳ Não implementado

### RN-013: Funil Padrão (Não Alterar)
**Descrição**: Sistema deve ter 1 funil marcado como default, não deletável
**Constraint**: is_default = TRUE (only one), cannot DELETE if is_default
**Status STAGETEK**: ⏳ Não implementado

### RN-014: Ordem de Estágios no Funil
**Descrição**: Estágios têm ordem sequencial, não podem ter gaps
**Constraint**: order VALUES devem ser sequenciais 1, 2, 3...
**Reordenação**: Ao drag-drop, recalcular order de todos
**Status STAGETEK**: ⏳ Não implementado

### RN-015: Sigla de Estágio (Máx 5 Chars)
**Descrição**: Sigla deve ser curta para visualização compacta
**Validação**: Max 5 caracteres, uppercase
**Exemplos**: SC/L, CF, V/A, PE, F
**Status STAGETEK**: ⏳ Não implementado

### RN-016: Automação Entre Funis
**Descrição**: Link "Editar automação entre funis" sugere regras automáticas
**Exemplo**: "Se oportunidade fica 30 dias em 'Contato Feito', mover para 'Funil Carteira'"
**Complexidade**: 🔴 ALTA (requer workflow engine)
**Status STAGETEK**: ❌ Fora do escopo MVP

### RN-017: Drag-and-Drop Mobile
**Descrição**: Em mobile, drag-drop deve ter toque longo (500ms) antes de ativar
**Fallback**: Botão "Mover para..." em mobile se drag falhar
**Biblioteca**: dnd-kit com touch sensors
**Status STAGETEK**: ⏳ Não implementado

### RN-018: Soft Delete de Clientes
**Descrição**: Ao deletar cliente, marcar status = 'inactive' (não DELETE físico)
**Razão**: Manter histórico de oportunidades vinculadas
**Hard Delete**: Apenas admin pode fazer após 90 dias
**Status STAGETEK**: ⏳ Não implementado (DELETE direto atual)

### RN-019: Validação CNPJ
**Descrição**: CNPJ deve ser válido (algoritmo de dígito verificador)
**Biblioteca**: brasil-api-mcp ou validator.js
**Status STAGETEK**: ⏳ Não implementado (apenas máscara)

### RN-020: Autocomplete CNPJ
**Descrição**: Ao digitar CNPJ válido, buscar dados na ReceitaWS
**API**: brasil-api-mcp cnpj endpoint
**Campos Preenchidos**: name, address (street, city, state, zip)
**Status STAGETEK**: ⏳ Não implementado

### RN-021: Conversão de Moeda
**Descrição**: Suportar BRL, USD, EUR - mostrar conversão em tooltip
**API**: Cotação atualizada diariamente (API Banco Central?)
**Display**: "R$ 10.000 (USD 2.000)"
**Status STAGETEK**: ⏳ Não implementado

### RN-022: Marcar Venda/Perda
**Descrição**: Botões "👍 Marcar venda" / "👎 Marcar perda" mudam stage para 'won' ou 'lost'
**Ação**: Remover do Kanban, adicionar em relatórios
**Modal**: Confirmar com motivo da perda (se perda)
**Status STAGETEK**: ⏳ Não implementado

### RN-023: Previsão de Fechamento
**Descrição**: Campo expected_close_date opcional, mas usado em relatórios
**Alerta**: Se hoje > expected_close_date e stage != 'won', mostrar alerta
**Status STAGETEK**: ⏳ Não implementado

### RN-024: Responsável Padrão
**Descrição**: Ao criar oportunidade, assigned_to = auth.uid() (criador)
**Override**: Pode alterar responsável via dropdown
**Notificação**: Novo responsável recebe notificação (email/Slack)
**Status STAGETEK**: ⏳ Não implementado (não há notificações)

### RN-025: Histórico de Mudanças
**Descrição**: Toda alteração de campos importantes gera entry em activity_log
**Campos Rastreados**: stage, value_1, assigned_to, expected_close_date
**Formato**: "Mario Becker alterou Valor de R$ 100 para R$ 200"
**Status STAGETEK**: ⏳ Não implementado

### RN-026: Produtos Não Podem Ser Deletados (Se Em Uso)
**Descrição**: Se product_id referenciado em opportunity_products, cannot DELETE
**Alternative**: Marcar is_active = FALSE (soft delete)
**Status STAGETEK**: ⏳ Não implementado

### RN-027: Email Assinatura Automática
**Descrição**: Ao enviar email, incluir assinatura do usuário automaticamente
**Fonte**: user.email + user.signature (JSONB?)
**Status STAGETEK**: ⏳ Não implementado

### RN-028: Anexos em Email
**Descrição**: Botão "📎" permite anexar arquivos (max 10MB?)
**Storage**: Supabase Storage bucket 'email-attachments'
**Status STAGETEK**: ⏳ Não implementado

### RN-029: Template Substituir Variáveis
**Descrição**: Ao selecionar template, substituir {{variaveis}} antes de mostrar no editor
**Variáveis Comuns**: {{nome_cliente}}, {{nome_empresa}}, {{valor}}, {{responsavel}}
**Status STAGETEK**: ⏳ Não implementado

### RN-030: Filtro "Minhas Oportunidades"
**Descrição**: Dropdown filtro mostra apenas oportunidades onde assigned_to = auth.uid()
**Opções**: "Minhas oportunidades", "Todas", "Sem dono"
**Status STAGETEK**: ⏳ Não implementado

### RN-031: Filtro "Em Andamento"
**Descrição**: Filtro de status mostra apenas oportunidades abertas (stage != 'won' AND stage != 'lost')
**Opções**: "Em andamento", "Ganhas", "Perdidas", "Todas"
**Status STAGETEK**: ⏳ Não implementado

### RN-032: Botão Recarregar
**Descrição**: Força refresh de dados (re-fetch do Supabase)
**Visual**: Ícone rotaciona 360° durante fetch
**Status STAGETEK**: ⏳ Não implementado

### RN-033: Filtro Ativo Indicador
**Descrição**: Botão "▦ Filtro ativo" mostra quantos filtros aplicados
**Contador**: "(3)" se 3 filtros ativos
**Click**: Abre modal com lista de filtros, permite limpar
**Status STAGETEK**: ⏳ Não implementado

### RN-034: Toast Auto-Dismiss
**Descrição**: Toast verde "Nova oportunidade..." desaparece após 10 segundos
**Close Manual**: Botão "×" fecha imediatamente
**Status STAGETEK**: ⏳ Não implementado

### RN-035: Avatar Gerado por Iniciais
**Descrição**: Se user não tem foto, gerar avatar com iniciais + cor única
**Algoritmo Cor**: Hash do nome → cor hexadecimal
**Status STAGETEK**: ✅ Implementado

### RN-036: Hover Tooltip em Ícone Info
**Descrição**: Ícone "i" mostra tooltip explicativo ao hover
**Exemplo**: "Saldo = Valor 1 - Valor 2"
**Status STAGETEK**: ⏳ Não implementado

### RN-037: Checkbox Concluir Tarefa
**Descrição**: Ao marcar checkbox, status = 'completed', completed_at = NOW()
**Visual**: Tarefa risca ou desaparece da lista
**Timeline**: Adiciona entry "Mario Becker concluiu tarefa 'Primeira Tentativa'"
**Status STAGETEK**: ⏳ Não implementado

### RN-038: Paginação "Ver Mais"
**Descrição**: Link "+ Ver Mais" carrega próximos 10 items
**Padrão**: Infinite scroll ou pagination?
**Status STAGETEK**: ⏳ Não implementado

### RN-039: Busca em Templates
**Descrição**: Input pesquisa filtra lista de templates por nome
**Match**: Case-insensitive substring
**Status STAGETEK**: ⏳ Não implementado

### RN-040: Accordion Expansível
**Descrição**: Click em "Dados da Empresa/Cliente ▼" expande/colapsa conteúdo
**Estado**: Salvar em localStorage para persistir entre reloads
**Status STAGETEK**: ⏳ Não implementado

### RN-041: Loader Durante Fetch
**Descrição**: Spinner azul mostra enquanto aguarda resposta do Supabase
**Timeout**: Se > 10 segundos, mostrar erro "Timeout"
**Status STAGETEK**: ⏳ Não implementado (apenas spinners básicos)

### RN-042: FAB Esconde ao Scroll
**Descrição**: FAB some ao scroll down, aparece ao scroll up (mobile)
**Razão**: Evitar obstruir conteúdo
**Status STAGETEK**: ⏳ Não implementado

### RN-043: Campo Obrigatório (Asterisco)
**Descrição**: Label com " *" vermelho indica campo obrigatório
**Validação**: Ao submit, verificar campos required não vazios
**Visual**: Input com borda vermelha se erro
**Status STAGETEK**: ✅ Implementado (React Hook Form + Zod)

---

## 📊 GAP ANALYSIS: RD STATION vs STAGETEK

### GAP-001: Detalhes da Oportunidade (CRÍTICO)

| Aspecto | RD Station | STAGETEK Atual | Gap | Esforço |
|---------|-----------|----------------|-----|---------|
| **Página Completa** | ✅ 6 Tabs completas | ❌ Não existe | 🔴 **CRÍTICO** | XL (2 semanas) |
| **Tab Histórico** | ✅ Timeline + Filtros | ❌ Não existe | 🔴 **CRÍTICO** | L (1 semana) |
| **Tab Tarefas** | ✅ Lista + Form completo | ❌ Não existe | 🔴 **CRÍTICO** | L (1 semana) |
| **Tab Email** | ✅ WYSIWYG + Templates | ❌ Não existe | 🟡 MÉDIO | L (1 semana) |
| **Tab Contatos** | ✅ Vincular contatos | ❌ Não existe | 🟡 MÉDIO | M (3 dias) |
| **Tab Produtos** | ✅ Adicionar produtos | ✅ **SUPERIOR** (cotação completa) | ✅ STAGETEK > RD | - |
| **Tab Arquivos** | ✅ Upload + lista | ❌ Não existe | 🟢 BAIXO | M (3 dias) |
| **Sidebar Left** | ✅ Funil visual + qualificação | ❌ Não existe | 🔴 **CRÍTICO** | M (3 dias) |
| **Sidebar Right** | ✅ 3 Accordions | ❌ Não existe | 🟡 MÉDIO | S (2 dias) |

**TOTAL GAP-001**: 🔴 **CRÍTICO** - Página completa não existe. Esforço: **XL (3-4 semanas)**

---

### GAP-002: Sistema de Tarefas (CRÍTICO)

| Aspecto | RD Station | STAGETEK Atual | Gap | Esforço |
|---------|-----------|----------------|-----|---------|
| **Página Global Tarefas** | ✅ Lista com filtros | ❌ Não existe | 🔴 **CRÍTICO** | L (1 semana) |
| **Badge Contador (Top Nav)** | ✅ Badge "67" vermelho | ❌ Não existe | 🔴 **CRÍTICO** | XS (1 dia) |
| **Tipos de Tarefa** | ✅ 4 tipos (Ligação, WhatsApp, Email, Reunião) | ❌ Não existe | 🔴 **CRÍTICO** | S (2 dias) |
| **Ícones por Tipo** | ✅ Telefone, WhatsApp, Envelope, Calendário | ❌ Não existe | 🟡 MÉDIO | XS (1 dia) |
| **Filtros (Minhas, Todas, Atrasadas)** | ✅ 5 filtros | ❌ Não existe | 🟡 MÉDIO | M (3 dias) |
| **Agrupamento** | ✅ Por data/tipo/responsável | ❌ Não existe | 🟢 BAIXO | S (2 dias) |
| **Tarefas Atrasadas (Ícone Vermelho)** | ✅ Indicador visual | ❌ Não existe | 🟡 MÉDIO | S (2 dias) |
| **Notificações de Tarefas** | ✅ Notificação + Email | ❌ Não existe | 🟡 MÉDIO | M (3 dias) |

**TOTAL GAP-002**: 🔴 **CRÍTICO** - Sistema completo não existe. Esforço: **L (2 semanas)**

---

### GAP-003: Configuração de Funis (CRÍTICO)

| Aspecto | RD Station | STAGETEK Atual | Gap | Esforço |
|---------|-----------|----------------|-----|---------|
| **Página Config Funis** | ✅ Página completa | ❌ Não existe | 🔴 **CRÍTICO** | L (1 semana) |
| **Editor Visual de Estágios** | ✅ Bolinhas + linhas conectoras | ❌ Não existe | 🔴 **CRÍTICO** | M (4 dias) |
| **Múltiplos Funis** | ✅ 3+ funis simultâneos | ❌ 1 funil fixo | 🔴 **CRÍTICO** | M (4 dias) |
| **Drag-Drop Reordenar Estágios** | ✅ Funcional | ❌ Não existe | 🟡 MÉDIO | S (2 dias) |
| **Adicionar/Remover Estágios** | ✅ Botão "+" verde | ❌ Não existe | 🔴 **CRÍTICO** | S (2 dias) |
| **Editar Sigla do Estágio** | ✅ Campo "Sigla: XX" | ❌ Não existe | 🟡 MÉDIO | XS (1 dia) |
| **Deletar Funil** | ✅ Ícone lixeira | ❌ Não existe | 🟡 MÉDIO | XS (1 dia) |
| **Funil Padrão (Não Alterar)** | ✅ Flag is_default | ❌ Não existe | 🟡 MÉDIO | XS (1 dia) |
| **Automação Entre Funis** | ✅ Link presente | ❌ Não existe | 🟢 BAIXO (P3) | XL (fora do escopo) |

**TOTAL GAP-003**: 🔴 **CRÍTICO** - Página completa não existe. Esforço: **L (2 semanas)**

---

### GAP-004: Melhorias no Funil Kanban (MÉDIO)

| Aspecto | RD Station | STAGETEK Atual | Gap | Esforço |
|---------|-----------|----------------|-----|---------|
| **Layout 5 Colunas** | ✅ Horizontal scroll | ✅ HTML implementado | ✅ OK | - |
| **Drag-and-Drop** | ✅ Funcional | ✅ HTML implementado | ✅ OK | - |
| **Contador de Oportunidades** | ✅ "X oportunidades" | ✅ HTML implementado | ✅ OK | - |
| **Valor Total por Coluna** | ✅ "R$ X.XXX,XX" | ✅ HTML implementado | ✅ OK | - |
| **Qualificação com Estrelas** | ✅ 5 estrelas | ❌ Não implementado | 🟡 MÉDIO | S (2 dias) |
| **Ícones de Ação Rápida** | ✅ Telefone/Email vermelho | ❌ Não implementado | 🟡 MÉDIO | S (2 dias) |
| **Tooltip de Preview (Hover)** | ✅ Card expandido | ❌ Não implementado | 🟢 BAIXO | S (2 dias) |
| **Filtros no Topo** | ✅ 3 filtros (Funil, Dono, Status) | ❌ Não implementado | 🟡 MÉDIO | M (3 dias) |
| **Dropdown Seletor de Funil** | ✅ Troca entre funis | ❌ 1 funil fixo | 🟡 MÉDIO | S (2 dias) |
| **Botão "Recarregar"** | ✅ Funcional | ❌ Não implementado | 🟢 BAIXO | XS (1 dia) |
| **Botão "Filtro Ativo"** | ✅ Contador de filtros | ❌ Não implementado | 🟢 BAIXO | S (2 dias) |
| **Migração HTML → React** | N/A | ❌ Ainda em HTML | 🔴 **CRÍTICO** | M (4 dias) |

**TOTAL GAP-004**: 🟡 **MÉDIO** - Funcional básico OK, mas falta 60% das features. Esforço: **M (2 semanas)**

---

### GAP-005: Email & Templates (MÉDIO)

| Aspecto | RD Station | STAGETEK Atual | Gap | Esforço |
|---------|-----------|----------------|-----|---------|
| **Tab Email (Detalhes Oportunidade)** | ✅ Form completo | ❌ Não existe | 🟡 MÉDIO | L (1 semana) |
| **Editor WYSIWYG** | ✅ Barra ferramentas completa | ❌ Não existe | 🟡 MÉDIO | M (4 dias) |
| **Modal Templates** | ✅ 3+ templates | ❌ Não existe | 🟡 MÉDIO | M (3 dias) |
| **Variáveis de Template** | ✅ {{nome_cliente}}, etc | ❌ Não existe | 🟡 MÉDIO | S (2 dias) |
| **Tags CC/BCC** | ✅ Links expandem campos | ❌ Não existe | 🟢 BAIXO | S (2 dias) |
| **Anexos em Email** | ✅ Botão "📎" | ❌ Não existe | 🟢 BAIXO | S (2 dias) |
| **Assinatura Automática** | ✅ Incluída no corpo | ❌ Não existe | 🟢 BAIXO | XS (1 dia) |
| **Envio de Email (Resend API)** | ✅ Integrado | ✅ **Implementado (cotações)** | ✅ OK | - |
| **Log de Emails Enviados** | ✅ Tabela `emails` | ❌ Não existe | 🟡 MÉDIO | S (2 dias) |

**TOTAL GAP-005**: 🟡 **MÉDIO** - Tab Email completa não existe. Esforço: **L (2 semanas)**

---

### GAP-006: Contatos (BAIXO)

| Aspecto | RD Station | STAGETEK Atual | Gap | Esforço |
|---------|-----------|----------------|-----|---------|
| **Página Lista Contatos** | ✅ DataTable | ❌ Não existe | 🟡 MÉDIO | M (4 dias) |
| **Modal Criar/Editar Contato** | ✅ Form completo | ❌ Não existe | 🟡 MÉDIO | S (2 dias) |
| **Vincular Contato a Cliente** | ✅ Foreign key | ❌ Tabela não existe | 🟡 MÉDIO | XS (1 dia) |
| **Vincular Contato a Oportunidade** | ✅ Tab Contatos | ❌ Não existe | 🟡 MÉDIO | S (2 dias) |
| **Tabela `contacts`** | ✅ Existe | ❌ Não existe | 🟡 MÉDIO | XS (1 dia) |

**TOTAL GAP-006**: 🟡 **MÉDIO** - Feature completa não existe. Esforço: **M (1.5 semanas)**

---

### GAP-007: Sistema de Cotações (STAGETEK > RD STATION) ✅

| Aspecto | RD Station | STAGETEK Atual | Gap | Observação |
|---------|-----------|----------------|-----|-----------|
| **Página Cotação** | ✅ Tab Produtos básico | ✅ **Página dedicada completa** | ✅ **STAGETEK > RD** | NovaCotacao.tsx (30 linhas) |
| **Catálogo de Produtos** | ❌ Apenas busca dropdown | ✅ **Grid visual 4 categorias** | ✅ **STAGETEK > RD** | ProductCatalog (45 linhas) |
| **Carrinho de Cotação** | ❌ Apenas tabela | ✅ **Carrinho com 3 botões** | ✅ **STAGETEK > RD** | QuotationCart (50 linhas) |
| **Geração de PDF** | ✅ Básico | ✅ **@react-pdf/renderer profissional** | ✅ **STAGETEK = RD** | QuotationPDF (28 linhas) |
| **Envio de Email** | ✅ Manual | ✅ **Automático (Edge Function)** | ✅ **STAGETEK > RD** | useEmailSending.tsx |
| **Auto-numeração** | ✅ Provavelmente | ✅ **QT-YYYYMM-NNN** | ✅ **STAGETEK = RD** | PostgreSQL function |
| **Status Tracking** | ❌ Não visível | ✅ **draft → sent** | ✅ **STAGETEK > RD** | Coluna `status` |
| **Itens Customizados** | ✅ Sim | ⏳ **Pendente** | 🟡 MÉDIO (2-3 dias) | Botão "Adicionar Item" |
| **Lista de Cotações Salvas** | ✅ Sim | ⏳ **Pendente** | 🟡 MÉDIO (2-3 dias) | Página `/cotacoes` |

**TOTAL GAP-007**: ✅ **STAGETEK SUPERIOR** - Sistema MVP completo funcionando. Gap restante: 2-3 dias.

---

### GAP-008: Relatórios & Analytics (BAIXO - P2)

| Aspecto | RD Station | STAGETEK Atual | Gap | Esforço |
|---------|-----------|----------------|-----|---------|
| **Dashboard Conversão por Etapa** | ✅ Gráfico funil | ❌ Não existe | 🟢 BAIXO (P2) | M (4 dias) |
| **Relatório Motivos de Perda** | ✅ Lista + gráfico | ❌ Não existe | 🟢 BAIXO (P2) | S (3 dias) |
| **Análise por Vendedor** | ✅ Tabela + gráfico | ❌ Não existe | 🟢 BAIXO (P2) | S (3 dias) |
| **Previsão de Receita** | ✅ Baseado em expected_close_date | ❌ Não existe | 🟢 BAIXO (P2) | M (4 dias) |
| **Exportar Excel/PDF** | ✅ Funcional | ❌ Não existe | 🟢 BAIXO (P2) | S (2 dias) |

**TOTAL GAP-008**: 🟢 **BAIXO (P2)** - Não crítico para MVP. Esforço: **M (2 semanas)**

---

### GAP-009: Integrações (MÉDIO - P1)

| Aspecto | RD Station | STAGETEK Atual | Gap | Esforço |
|---------|-----------|----------------|-----|---------|
| **Resend API (Email)** | ✅ Integrado | ✅ **Implementado** | ✅ OK | - |
| **Slack Webhook** | ✅ Notificações | ❌ Não existe | 🟡 MÉDIO | S (2 dias) |
| **Google Calendar** | ✅ Sincronização | ❌ Não existe | 🟡 MÉDIO | M (4 dias) |
| **WhatsApp Business API** | ❌ Não tem | ❌ Não existe | 🟢 BAIXO (P3) | XL (fora do escopo) |
| **CNPJ Autocomplete** | ✅ Provavelmente | ❌ Não existe | 🟡 MÉDIO | S (2 dias) |

**TOTAL GAP-009**: 🟡 **MÉDIO** - Resend OK, falta Slack e Calendar. Esforço: **M (1.5 semanas)**

---

### GAP-010: UI/UX Details (BAIXO)

| Aspecto | RD Station | STAGETEK Atual | Gap | Esforço |
|---------|-----------|----------------|-----|---------|
| **Toast Notifications** | ✅ Verde/vermelho | ❌ Não existe | 🟢 BAIXO | S (2 dias) |
| **Loading Spinners** | ✅ Azul consistente | ✅ Básico | 🟢 BAIXO | XS (1 dia) |
| **Empty States** | ✅ Mensagens amigáveis | ❌ Não implementado | 🟢 BAIXO | S (2 dias) |
| **Hover States** | ✅ Azul consistente | ✅ Parcial | 🟢 BAIXO | S (2 dias) |
| **Focus States (Acessibilidade)** | ✅ Outline azul | ❌ Não implementado | 🟢 BAIXO | S (2 dias) |
| **Animações de Transição** | ✅ Suaves 200ms | ❌ Não implementado | 🟢 BAIXO | S (2 dias) |
| **Responsividade Mobile** | ✅ 100% responsivo | ✅ Parcial | 🟡 MÉDIO | M (4 dias) |
| **Dark Mode** | ❌ Não tem | ✅ **STAGETEK > RD** | ✅ **STAGETEK > RD** | - |

**TOTAL GAP-010**: 🟢 **BAIXO** - Detalhes visuais. Esforço: **M (1.5 semanas)**

---

## 🎯 RESUMO DE GAPS PRIORITIZADOS

### 🔴 GAPS CRÍTICOS (P0 - Bloqueadores MVP)

| ID | Gap | Esforço | Status STAGETEK |
|----|-----|---------|-----------------|
| **GAP-001** | Detalhes da Oportunidade (página completa) | **XL (3-4 semanas)** | ❌ 0% implementado |
| **GAP-002** | Sistema de Tarefas (página + badge + notificações) | **L (2 semanas)** | ❌ 0% implementado |
| **GAP-003** | Configuração de Funis (editor visual) | **L (2 semanas)** | ❌ 0% implementado |
| **GAP-004** | Migração Kanban HTML → React | **M (4 dias)** | ❌ 0% implementado |

**TOTAL CRÍTICO**: 🔴 **7-8 semanas de trabalho**

---

### 🟡 GAPS MÉDIOS (P1 - Alta Prioridade)

| ID | Gap | Esforço | Status STAGETEK |
|----|-----|---------|-----------------|
| **GAP-004** | Melhorias Kanban (estrelas, filtros, ícones) | **M (2 semanas)** | ❌ 40% implementado |
| **GAP-005** | Email & Templates (Tab Email completa) | **L (2 semanas)** | ❌ 10% implementado |
| **GAP-006** | Contatos (página + modal + vinculação) | **M (1.5 semanas)** | ❌ 0% implementado |
| **GAP-007** | Sistema de Cotações (lista + itens customizados) | **S (2-3 dias)** | ✅ 90% implementado |
| **GAP-009** | Integrações (Slack + Calendar) | **M (1.5 semanas)** | ❌ 20% implementado |

**TOTAL MÉDIO**: 🟡 **7-8 semanas de trabalho**

---

### 🟢 GAPS BAIXOS (P2 - Nice to Have)

| ID | Gap | Esforço | Status STAGETEK |
|----|-----|---------|-----------------|
| **GAP-008** | Relatórios & Analytics | **M (2 semanas)** | ❌ 0% implementado |
| **GAP-010** | UI/UX Details | **M (1.5 semanas)** | ❌ 30% implementado |

**TOTAL BAIXO**: 🟢 **3.5 semanas de trabalho**

---

## 📈 ESTIMATIVA DE ESFORÇO TOTAL

### Por Prioridade

| Prioridade | Esforço | Percentual |
|-----------|---------|-----------|
| **P0 (Crítico)** | 7-8 semanas | 40% |
| **P1 (Alto)** | 7-8 semanas | 40% |
| **P2 (Médio)** | 3.5 semanas | 20% |
| **TOTAL** | **18-20 semanas** | **100%** |

### Por Tamanho de Tarefa

| Tamanho | Quantidade | Tempo Médio | Total |
|---------|-----------|-------------|-------|
| **XS** | 8 tasks | 1 dia | 1.5 semanas |
| **S** | 24 tasks | 2 dias | 7 semanas |
| **M** | 18 tasks | 4 dias | 10.5 semanas |
| **L** | 6 tasks | 1.5 semanas | 9 semanas |
| **XL** | 2 tasks | 3 semanas | 6 semanas |
| **TOTAL** | **58 tasks** | - | **34 semanas (teórico)** |

**Com paralelização e otimização**: ~18-20 semanas (4.5-5 meses)

---

## ✅ FEATURES QUE STAGETEK TEM E RD NÃO TEM

### Vantagens Competitivas STAGETEK

| Feature | STAGETEK | RD Station | Observação |
|---------|----------|-----------|------------|
| **Dark Mode** | ✅ Implementado | ❌ Não tem | STAGETEK > RD |
| **Sistema de Cotações MVP** | ✅ **SUPERIOR** (catálogo visual + PDF + email automático) | ✅ Básico (apenas tabela) | **DIFERENCIAL COMPETITIVO** |
| **Protocol Notecraft™** | ✅ 100% compliance automática | N/A | Garante qualidade código |
| **PWA Instalável** | ⏳ Planejado (P1) | ❌ Não tem | STAGETEK > RD |
| **Lead Scoring com IA** | ⏳ Planejado (P2) | ❌ Não tem | STAGETEK > RD |
| **CNPJ Autocomplete (brasil-api-mcp)** | ⏳ Planejado (P1) | ✅ Tem | STAGETEK = RD |
| **Budget Zero** | ✅ Supabase Free + Vercel Free | ❌ Custo ~R$ 300/mês | STAGETEK > RD |

---

## 🎬 CONCLUSÃO

### Números Finais

- **287 features** identificadas no RD Station CRM
- **142 campos de dados** mapeados
- **43 regras de negócio** documentadas
- **58 tasks** de desenvolvimento estimadas
- **18-20 semanas** de esforço total

### Priorização Executiva

1. **🔴 P0 (7-8 semanas)**: Detalhes Oportunidade + Tarefas + Config Funis + Migração Kanban
2. **🟡 P1 (7-8 semanas)**: Melhorias Kanban + Email & Templates + Contatos + Cotações (finalizar)
3. **🟢 P2 (3.5 semanas)**: Relatórios + UI/UX Details

### Diferencial Competitivo

✅ **Sistema de Cotações STAGETEK é SUPERIOR ao RD Station**:
- RD: Apenas tabela básica de produtos
- STAGETEK: Catálogo visual + PDF profissional + Email automático + Auto-numeração

**Momento Wow Alcançado**: Cotação em 5 minutos (vs 2h em planilha) ✅

---

**Built with ❤️ by Business Analyst Sênior**
**STAGETEK Engineering Team**
**Próxima Etapa**: Usar este inventário para implementação sistemática
