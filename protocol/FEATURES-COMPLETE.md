# STAGETEK CRM - Features Completas

**Baseado na análise completa do RD Station CRM**
**Fonte**: Webinar RD Station + Screenshots + Transcrição

**Data**: 30 de Setembro de 2025

---

## 🎯 OS 5 PONTOS ESSENCIAIS (MÍNIMO NECESSÁRIO)

Segundo o apresentador do RD Station CRM, **Mario Becker**, há 5 ações essenciais que o vendedor DEVE fazer para ter sucesso:

### 1. **Atualizar Funil de Vendas**
- Mover oportunidade entre etapas
- Reflete o progresso da negociação
- Permite acompanhamento visual

### 2. **Registrar Anotações**
- **IMUTÁVEIS** - Não podem ser editadas ou apagadas
- Segurança da informação
- Histórico completo de interações
- Continuidade quando vendedor sai de férias

### 3. **Criar e Concluir Tarefas**
- **"Motor do CRM"** - palavras do apresentador
- Garantir follow-up na hora certa
- Integração com calendário
- E-mail diário 5-6h da manhã com tarefas do dia
- Plugin produtividade (Chrome)

### 4. **Cadastrar Valores (Produtos/Serviços)**
- Saber potencial de cada negociação
- Venda única ou recorrente
- Quantidade + Preço + Desconto
- Totalizador automático

### 5. **Marcar Venda ou Perda**
- **Venda**: Celebração ("Palmas", "Cheirinho de sucesso")
- **Perda**: OBRIGATÓRIO indicar motivo
- Motivos personalizáveis
- EVITAR "Outros" (buraco negro)

---

## 📊 Funcionalidades Detalhadas por Módulo

### **MÓDULO 1: Funil de Vendas (Kanban)**

#### **Personalização do Funil**
- ✅ Criar múltiplos funis
- ✅ Personalizar etapas (renomear, adicionar, remover)
- ✅ Siglas por etapa (ex: "SC/L" = Sem Contato / Lead)
- ✅ Cores por etapa
- ✅ Automação entre funis

**Exemplo de Funis**:
- Funil PADRÃO (Não Alterar)
- Funil de Prospecção
- Funil de Pós-venda
- Funil de Atendimento

**Etapas Típicas**:
1. Sem contato / Lead
2. Contato Feito
3. Visita / Apresentação
4. Proposta Enviada
5. Fechamento

#### **Cards de Oportunidade**

**Informações Visíveis**:
- Nome da oportunidade
- Nome da empresa/cliente
- 2 valores (R$ X + R$ Y)
- Qualificação (1-5 estrelas)
- Avatar do cliente (inicial + cor)
- Ícones de ação rápida:
  - 📞 Telefone (ligar)
  - ✉️ E-mail (enviar)
  - ℹ️ Info (detalhes)
- Indicador de tarefas atrasadas (ícone vermelho)

#### **Top Bar - Filtros**

**Filtros Disponíveis**:
- Funil de vendas (dropdown)
- Tipo de trabalho
- Minhas oportunidades (toggle)
- Status da oportunidade (aberto, ganho, perdido)
- Em andamento
- Botão "Recarregar"
- Contador de filtros ativos
- Botão exportar

#### **Totalizadores**

Por Coluna:
- Número de oportunidades
- Valor total (R$)
- Ícone de ajuda (?)

---

### **MÓDULO 2: Detalhes da Oportunidade**

#### **Layout de 3 Colunas**

**Coluna Esquerda - Dados**:
- Funil e etapa atual (visual com bolinhas)
- Qualificação (5 estrelas + label "Quente")
- Valores (produtos/serviços)
- Data de criação
- Previsão de fechamento
- Responsável (dropdown)
- Fonte do lead
- Campanha
- Campos personalizados

**Coluna Central - Abas**:
1. **HISTÓRICO** ⭐
   - Criar Anotação
   - Criar Tarefa
   - Timeline de eventos
   - Filtros (Anotação, Tarefa, Alteração, Email, Proposta, etc.)
   - Eventos com avatar + timestamp + descrição

2. **E-MAIL** ⭐
   - Compositor WYSIWYG
   - Templates ilimitados
   - Merge tags ({{nome_cliente}}, {{nome_vendedor}})
   - Tracking de abertura e resposta
   - Anexos
   - CC, BCC
   - Ilimitado de envios (plano Basic+)

3. **TAREFAS** ⭐
   - Seção "Próximas Tarefas"
   - Lista com tipo + descrição + timestamp
   - Ações inline: editar, deletar, concluir (checkmark azul)
   - Botão "Ver Mais"
   - Formulário "Criar Tarefa":
     - Tipo (Ligação, WhatsApp, E-mail, Reunião, Outro)
     - Data (DatePicker)
     - Hora (TimePicker)
     - Responsável (com avatar + e-mail)
   - Ícone de recarregar

4. **CONTATOS**
   - Nome, e-mail, telefone
   - Botão "+ Adicionar contato"

5. **PRODUTOS E SERVIÇOS** ⭐
   - Buscar produto existente ou criar novo
   - Campos:
     - Produto (dropdown ou novo)
     - Quantidade
     - Preço
     - Recorrência (Única / Recorrente)
     - Desconto (opcional)
   - Tabela com: Produto, Qtd, Preço, Recorrência, Subtotal
   - Total geral
   - Botão "Adicionar produto/serviço à oportunidade"

6. **ARQUIVOS**
   - Upload de documentos
   - Anexos compartilhados

**Coluna Direita - Sidebars**:
- Responsável (dropdown)
- Dados da Empresa/Cliente (expansível)
  - Loading spinner
  - "+ Adicionar contato"
- Dados da Oportunidade (expansível)
- Dados de Contato (expansível)

#### **Header - Ações Finais**

- Nome da oportunidade (ex: "Venda JANEIRO")
- Empresa/origem (ex: "RD Station")
- Botão voltar (←)
- **Botão "Marcar venda"** (verde, thumbs up)
  - Animação: "Palmas", "Cheirinho de sucesso no ar"
  - "Parabéns, 4ª venda no mês!"
  - Remove do funil ativo
  - Contabiliza em relatórios
- **Botão "Marcar perda"** (vermelho, thumbs down)
  - Modal com dropdown de motivos
  - Motivo obrigatório
  - Remove do funil ativo
  - Contabiliza em relatórios
- Ícone configurações (engrenagem)
- Ícone deletar (lixeira)
- **Valor total** (canto superior direito: "Saldo: R$ 91,12")

#### **Alertas/Notificações**

**Banner Verde** (exemplo):
- "Nova oportunidade, criada hoje às 10:11. Entre em contato rapidamente para aumentar suas chances de venda."
- Botão X para fechar

**Banner Amarelo** (exemplo):
- "Você está logado na conta de um cliente. Voltar ao Admin"
- Indica multi-conta

---

### **MÓDULO 3: Automações (Plano PRO)**

#### **Gatilhos (Quando)**
- Criação de uma oportunidade
- Movimentação para etapa específica
- Tempo decorrido sem ação (ex: 30 minutos, 1 hora, 1 dia)

#### **Ações (O Que Fazer)**
- Criar tarefas (checklist automático)
- Enviar e-mail (com template)
- Mudar vendedor responsável
- Notificar equipe

**Exemplo Prático** (mencionado no webinar):
```
Gatilho: Criar oportunidade
Ações:
- Criar tarefa: 1ª tentativa telefone em 20 min
- Criar tarefa: 2ª tentativa WhatsApp em 1h
- Criar tarefa: 3ª tentativa e-mail no dia seguinte
```

**Automação entre Funis**:
```
Gatilho: Marcar venda no "Funil de Vendas"
Ação: Criar oportunidade no "Funil de Pós-venda"
      Atribuir a outro vendedor/equipe
```

---

### **MÓDULO 4: E-mails**

#### **Compositor**

**Campos**:
- De: (e-mail do vendedor)
- Para: (e-mail do contato) - pré-preenchido
- CC, BCC
- Assunto (com merge tags)
- Corpo (WYSIWYG editor)

**Funcionalidades**:
- Templates ilimitados (plano Basic+)
- Merge tags:
  - `{{nome_cliente}}`
  - `{{nome_vendedor}}`
  - `{{nome_empresa}}`
  - `{{valor_oportunidade}}`
  - Etc.
- Anexos (PDF, imagens, etc.)
- Formatação rica (negrito, itálico, listas, links)

#### **Tracking de E-mail**

- Notificação quando cliente **abre** o e-mail
- Notificação quando cliente **responde**
- Histórico de troca de mensagens registrado
- Respostas vão para caixa de e-mail padrão do vendedor
- Código único por oportunidade para rastreamento

#### **Templates de E-mail**

**Modal "Modelos de Email"** (visto em screenshot):
- Lista na esquerda:
  - "Apresentação RD Station CRM"
  - "Proposta"
  - "Tentativa de Contato"
- Preview na direita
- Botão "Cancelar"
- Botão "Selecionar Modelo"

**Exemplo de Template**:
```
Olá {{nome_cliente}}, tudo bem?

Como combinamos, segue a apresentação em PDF do RD Station CRM.

No documento você encontrará informações sobre a nossa empresa e sobre a ferramenta. É um excelente documento para apresentar internamente na conversa com a equipe.

Assim que ver o material, por favor, me avise para agendarmos a nossa reunião.

Abraços
```

---

### **MÓDULO 5: Produtos e Serviços**

#### **Cadastro de Produto**

**Campos**:
- Nome do produto
- Descrição
- Categoria
- Preço unitário
- Tipo: Venda Única ou Recorrente
- Status: Ativo/Inativo
- SKU/Código

#### **Adicionar à Oportunidade**

**Formulário** (visto em screenshot):
- Buscar produto (dropdown com autocomplete)
- Quantidade (input número)
- Preço (R$ 2.000,00)
- Recorrência (dropdown):
  - Única
  - Recorrente
- Desconto (checkbox + input)

**Tabela de Produtos Adicionados**:
Colunas: Produto ou Serviço | Qtd | Preço | Recorrência | Subtotal | Opções

**Mensagem quando vazio**:
"Nenhum produto adicionado à oportunidade"

---

### **MÓDULO 6: WhatsApp Integration (WatStation)**

#### **Plugin Chrome**

**Funcionalidades**:
- Extensão do Google Chrome
- Conecta WhatsApp Web com CRM
- Sidebar direita no WhatsApp Web
- Puxa dados do cliente automaticamente
- **Não centraliza número** - cada vendedor usa seu celular

#### **Sidebar WatStation**

**Informações Exibidas**:
- Dados do cliente do CRM
- Oportunidades (em andamento, ganhas, perdidas)
- Vendedor responsável
- Qualificação

**Ações Rápidas** (5 pontos essenciais):
1. Atualizar funil
2. Criar anotação
3. Criar/concluir tarefa
4. Adicionar produto
5. Marcar venda/perda

**Funcionalidades Extras**:
- Mensagens pré-definidas
- Copiar histórico de conversa para CRM
- Criar oportunidade direto do WhatsApp
- Abrir CRM da oportunidade

**Exemplo de Mensagem Pré-definida**:
```
Olá {{nome_cliente}}, tudo bem?

Sou {{nome_vendedor}}, vi que se cadastrou para falar com a nossa empresa...
```

---

### **MÓDULO 7: Telefonia Virtual (VoIP)**

**Funcionalidades**:
- Click-to-call (botão telefone nos contatos)
- Gravação de chamadas
- Registro de ligações:
  - Realizadas
  - Atendidas
  - Não atendidas
  - Tempo de call
- Contabilização nos relatórios

---

### **MÓDULO 8: Relatórios**

#### **8.1. CRM Live (Dashboard TV)**

**Características**:
- Projetar em TV no escritório
- Auto-refresh em tempo real
- Atualização automática de abas

**Aba 1 - Vendas**:
- Ranking de vendedores (oportunidades, vendas, faturamento)
- Comparativo mês atual vs. anterior
- Feed de vendas ao vivo ("João fechou R$ 25K")
- Animação quando fecha venda

**Aba 2 - Andamento**:
- Funil agregado (nº oportunidades + valor)
- Taxa de conversão do período
- Distribuição por etapa
- Qualificação (13 oportunidades 5 estrelas)
- Motivos de perda (gráfico)

#### **8.2. Painel Geral**

**Widgets**:
- Número de oportunidades criadas
- Vendas
- Perdas
- Gráfico ao longo do tempo (dia a dia)
- Valor por volume (quanto faturado)
- Ticket médio
- Gráficos pizza:
  - Oportunidades por vendedor
  - Vendas por vendedor
  - Perdas por vendedor
  - Faturamento por usuário
  - Motivos de perda consolidados

**Clicável**: Todos os números abrem detalhamento

#### **8.3. Conversões** ⭐ IMPORTANTE

**Funil de Conversão**:
```
Sem contato (100)
    ↓ 72%
Contato Feito (72)
    ↓ 67%
Visita/Apresentação (48)
    ↓ 58%
Proposta Enviada (28)
    ↓ 75%
Fechamento (21)
```

**Análise**:
- Taxa de conversão entre etapas
- **Identificar gargalos** ("buracos da operação")
- Comparar vendedores (quem converte 58% vs. 20%)
- Ciclo de venda (tempo médio para fechar/perder)

**Clicável**: Ver quais oportunidades perdidas em cada etapa

#### **8.4. Atividade e Vendas (Plano PRO)**

**Métricas de Esforço**:
- **Tempo de primeiro contato** ⭐ CRÍTICO
  - Estudo: 5 min vs. 30 min = 21x menos conversão
  - Comparativo por vendedor
  - Menor tempo, maior tempo, média
- Volume de tarefas (criadas vs. concluídas vs. atrasadas)
- Oportunidades sem atividade (>5 dias)
- Oportunidades sem tarefa agendada
- Volume de ligações (realizadas, atendidas, não atendidas)

**Comparação por Vendedor**:
- Ranking na mesma tela
- Identificar melhores práticas

#### **8.5. Motivos de Perda (Plano PRO)**

**Análise**:
- Total de perdas no período
- Valor perdido
- Comparativo com período anterior
- **Principal motivo detrator**
- Gráfico: Motivos por etapa do funil

**Exemplo**:
```
Etapa "Contato Feito": 19 perdas por "Cliente optou por não realizar projeto"
→ Investigar: Abordagem? Oferta? Timing?
```

**Clicável**: Listar oportunidades perdidas por motivo

#### **8.6. Metas**

- Individuais
- Por equipe
- Por empresa
- Progress bars
- Projeção de atingimento

#### **8.7. Fontes e Campanhas**

**Análise de Atribuição**:
- Quais fontes geram mais leads
- Quais fontes convertem mais
- Quais campanhas trazem ROI
- Comparação de canais

#### **8.8. Produtos e Serviços**

**Análise**:
- Top 10 produtos por volume
- Top 10 produtos por faturamento
- Ticket médio por produto
- Margem de contribuição

---

### **MÓDULO 9: Configurações**

#### **9.1. Funis**

**Editor Visual** (screenshot `Funil_4.png`):
- Lista de funis (PADRÃO, Prospecção, Pós-venda, Carteira)
- Bolinhas conectadas representando etapas
- Botão "+" adicionar etapa
- Botão "x" remover etapa
- Editar nome inline
- Configurar sigla (ex: "Sigla: SC/L")
- Botão "Editar automação entre funis"
- Expandir/Colapsar (arrow ▷)
- Criar novo funil
- Deletar funil (lixeira)

#### **9.2. Usuários e Permissões**

**Níveis de Permissão**:
- **Administrador**: Acesso total, configurações
- **Usuário**: Operacional

**Níveis de Visibilidade**:
- **Restrito**: Apenas minhas oportunidades
- **Equipe**: Oportunidades da minha equipe
- **Geral**: Todas as oportunidades

#### **9.3. Campos Personalizados**

**Tipos de Campo**:
- Texto curto
- Texto longo
- Número
- Moeda
- Data
- Seleção única (dropdown)
- Seleção múltipla (checkboxes)
- Sim/Não (toggle)

**Aplicável a**:
- Oportunidades
- Clientes
- Eventos (se houver)

**Exemplo** (mencionado no webinar):
- Campo "Região de Atuação" (Sul, Centro-Oeste, Sudeste, etc.)

#### **9.4. Motivos de Perda**

**Gestão**:
- Criar motivos customizados
- Ordenar por prioridade
- Ativar/Desativar
- **EVITAR "Outros"** (buraco negro)

**Exemplos**:
- Preço Alto
- Sem Resposta do Cliente
- Perdeu para Concorrente
- Não Tem Orçamento
- Adiou o Projeto
- Cliente optou por não realizar

#### **9.5. Produtos e Serviços**

**Catálogo Centralizado**:
- Nome, descrição, categoria
- Preço pré-definido
- Tipo (única/recorrente)
- Status (ativo/inativo)
- SKU

**Usar na Oportunidade**:
- Dropdown com autocomplete
- Já puxa preço cadastrado
- Pode editar na hora

#### **9.6. Templates de E-mail**

**Gestão**:
- Criar ilimitados (plano Basic+)
- Nome do template
- Assunto (com merge tags)
- Corpo (WYSIWYG)
- Anexos padrão
- Categorização

#### **9.7. Geração de Proposta**

**Ferramenta de Orçamento**:
- Gera PDF automaticamente
- Personalização:
  - Cor
  - Logotipo
  - Texto introdutório
- Tabela com produtos (produto, descrição, recorrência, qtd, preço, desconto, subtotal)
- Total geral
- **Botão de Aceite**:
  - Cliente recebe link
  - Clica "Aceitar Proposta"
  - CRM recebe notificação

**Limitações** (mencionado no webinar):
- Pouca personalização na tabela
- Ideal para orçamentos simples

---

## 🎯 Insights Cruciais do Webinar

### **1. Tempo de Primeiro Contato**

**Estatística citada**:
- Abordar em **5 minutos** vs. **30 minutos**
- Chances de qualificação caem **21 vezes**
- **CRUCIAL** para conversão

**Ferramentas para ajudar**:
- Automação de tarefas
- Notificações
- WatStation
- Telefonia integrada

---

### **2. Anotações Imutáveis**

**Por quê?**:
- Segurança da informação
- Integridade do histórico
- Continuidade (férias, saída de vendedor)
- Não esquecer detalhes

**Palavras do apresentador**:
> "Cuidem na hora de preencher, se você preencher algo errado ele vai ficar aqui porque não tem como editar, não tem como apagar."

---

### **3. Tarefas = Motor do CRM**

**Citação**:
> "As tarefas, gente, isso aqui é o motor do CRM."

**Por quê?**:
- Falar com cliente na hora certa
- Não esquecer follow-ups
- Retomar vendas perdidas no futuro
- Checklist do processo

**Integração**:
- E-mail diário (5-6h)
- Calendário externo
- Plugin produtividade

---

### **4. Marcar Perda é Obrigatório**

**Palavras do apresentador**:
> "Tem empresas que não marcam perda, que não querem marcar perda, ou às vezes o vendedor fica receoso... não é essa a ideia. A gente precisa saber a perda e mapear isso."

**Por quê?**:
- Identificar detradores
- Corrigir processo
- Treinar equipe
- Melhorar oferta

**NUNCA usar "Outros"**:
> "Evitem motivos coringa 'Outros', nunca usem gente, porque senão vira um buraco negro, é uma lixeira sem fundo."

---

### **5. CRM para Vendedor E Gestor**

**Dois Perfis**:

**Vendedor**:
- Organização do dia a dia
- Não esquecer cliente
- Automatizar tarefas repetitivas
- Visão: Funil de Vendas

**Gestor**:
- Acompanhamento de métricas
- Análise de performance
- Identificar gargalos
- Visão: Relatórios e CRM Live

**Citação**:
> "CRM gestão do relacionamento com cliente, gente, é isso, é uma ação. É fazer essa análise pra gente trabalhar melhor o relacionamento com o cliente e otimizando o processo de vendas."

---

### **6. Começar Simples**

**Palavras do apresentador**:
> "Quando a gente tá trabalhando com sistema novo, quando a gente quer implementar uma ideia nova, a gente tem que começar rápido, começar simples e validar."

**Mínimo Necessário**: 5 pontos
1. Funil
2. Anotações
3. Tarefas
4. Valores
5. Marcar Venda/Perda

**Depois**: Adicionar complexidade gradualmente

---

### **7. Informação em Ponto de Bala**

**Citação**:
> "A informação vai estar em ponto de bala. Gravem sempre isso: é um trabalho em conjunto. Estruturação, cultura pro time trabalhar na ferramenta, tirar tudo que tá na cabeça e colocar no CRM."

**Resultado**:
- Gestor tem informação rica
- Processo estruturado
- Métricas atualizadas
- Decisões baseadas em dados

---

## 📋 Checklist de Implementação STAGETEK CRM

### **Fase 1: Mínimo Viável (5 Pontos Essenciais)**
- [ ] Funil de Vendas (atualizar etapas)
- [ ] Sistema de Anotações (imutáveis)
- [ ] Sistema de Tarefas (criar, concluir, listar)
- [ ] Cadastro de Valores (produtos/serviços)
- [ ] Marcar Venda / Marcar Perda (com motivos)

### **Fase 2: Detalhes da Oportunidade**
- [ ] Layout 3 colunas
- [ ] Abas (Histórico, E-mail, Tarefas, Contatos, Produtos, Arquivos)
- [ ] Header com ações
- [ ] Sidebar com dados

### **Fase 3: Automações**
- [ ] Gatilhos (criar, mover, tempo)
- [ ] Ações (tarefa, e-mail, vendedor)
- [ ] Automação entre funis

### **Fase 4: E-mails**
- [ ] Compositor WYSIWYG
- [ ] Templates ilimitados
- [ ] Merge tags
- [ ] Tracking (abertura, resposta)

### **Fase 5: Relatórios**
- [ ] CRM Live
- [ ] Painel Geral
- [ ] Conversões
- [ ] Atividade e Vendas
- [ ] Motivos de Perda

### **Fase 6: Integrações**
- [ ] WhatsApp (WatStation)
- [ ] Telefonia Virtual
- [ ] Calendário (Google, Outlook)
- [ ] E-mail (rastreamento)

### **Fase 7: Configurações**
- [ ] Gestão de Funis
- [ ] Usuários e Permissões
- [ ] Campos Personalizados
- [ ] Motivos de Perda
- [ ] Produtos/Serviços
- [ ] Templates E-mail
- [ ] Geração de Proposta

---

## 🎨 Diferencial STAGETEK vs RD Station

### **O que vamos fazer MELHOR**:

1. **Especialização Eventos**
   - Campos específicos: Tipo de evento, Local, Nº de convidados
   - Gestão de Equipamentos integrada
   - Calendário otimizado para eventos
   - Timeline de alocação de equipamentos

2. **Branding Superior**
   - Protocol Notecraft™
   - Dark mode completo
   - Cores STAGETEK (#e90101)
   - Gradientes sutis profissionais
   - Ícones SVG (não emojis)

3. **Performance**
   - Vanilla JS/React otimizado
   - Bundle size < 50kb
   - Load time < 3s
   - Mobile-first responsive

4. **Gestão de Equipamentos**
   - RD Station não tem
   - Status (Disponível, Em Uso, Manutenção, Reservado)
   - Histórico de uso
   - Agendamento
   - Categorias (Som, Luz, Estrutura, Vídeo)

5. **UX/UI Moderna**
   - Componentes atômicos
   - Design system completo
   - Responsividade superior
   - Acessibilidade WCAG AA

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
**Última atualização**: 30 de Setembro de 2025
