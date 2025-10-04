# STAGETEK CRM - Arquitetura Completa

**Baseado na Engenharia Reversa do RD Station CRM**
**Data**: 30 de Setembro de 2025
**Versão**: 1.0.0

---

## 🎯 Visão Geral

O STAGETEK CRM é um sistema completo de gestão de vendas para empresas de eventos, seguindo a arquitetura do RD Station CRM, mas especializado para o mercado de eventos e locação de equipamentos.

### Perfis de Usuário

1. **Vendedor/Operacional**
   - Foco: Gestão diária de oportunidades
   - Visão principal: Funil de Vendas (Kanban)
   - Ações: Criar leads, atualizar etapas, registrar interações

2. **Gestor/Administrador**
   - Foco: Análise de performance e métricas
   - Visão principal: Relatórios e CRM Live
   - Ações: Configurar processos, definir metas, analisar conversões

---

## 📱 Estrutura de Navegação

### Menu Principal (Sidebar)

```
┌─────────────────────────────────────┐
│ STAGETEK CRM                        │
├─────────────────────────────────────┤
│ 🏠 Dashboard                        │
│ 🎯 Funil de Vendas       [PRINCIPAL]│
│ 👥 Clientes                         │
│ 📅 Eventos                          │
│ 🎛️  Equipamentos                    │
│ 📊 Relatórios                       │
│   ├─ Painel Geral                  │
│   ├─ Conversões                    │
│   ├─ Ciclo de Venda                │
│   ├─ Atividade e Vendas            │
│   ├─ Motivos de Perda              │
│   ├─ Metas                         │
│   ├─ Fontes e Campanhas            │
│   └─ Produtos e Serviços           │
│ 📺 CRM Live                         │
│ ⚙️  Configurações                   │
│   ├─ Funis                         │
│   ├─ Automações                    │
│   ├─ Usuários e Permissões         │
│   ├─ Campos Personalizados         │
│   ├─ Motivos de Perda              │
│   ├─ Produtos/Serviços             │
│   ├─ Templates de E-mail           │
│   └─ Integrações                   │
└─────────────────────────────────────┘
```

---

## 🗂️ Módulos e Funcionalidades

### **MÓDULO 1: Dashboard**
**Arquivo**: `pages/dashboard.html` ✅ PRONTO

**Componentes**:
- 4 StatCards (Oportunidades, Vendas, Ticket Médio, Taxa Conversão)
- 3 MetricCards com progress bars
- 4 Gráficos Chart.js
- Tabela de últimos eventos

---

### **MÓDULO 2: Funil de Vendas (Kanban)**
**Arquivo**: `pages/funil-vendas.html` ✅ PRONTO

**Funcionalidades Implementadas**:
- ✅ Visão Kanban drag-and-drop
- ✅ 5 colunas personalizáveis
- ✅ Cards de oportunidade
- ✅ Totalizadores por coluna
- ✅ Modal de criar oportunidade

**Funcionalidades Faltantes** (🚧 TODO):
- [ ] Funis múltiplos (seletor de funil)
- [ ] Edição de etapas do funil
- [ ] Filtros (vendedor, período, qualificação)
- [ ] Ordenação de cards
- [ ] Configuração de cores por etapa

**Estrutura do Card de Oportunidade**:
```html
┌──────────────────────────────────┐
│ EMPRESA DO CLIENTE               │
│ Nome do Evento                   │
│ ★★★★★ Qualificação              │
│ R$ 15.000,00                     │
│ 📅 15/10/2025                    │
│ 👤 João Vendedor                 │
└──────────────────────────────────┘
```

---

### **MÓDULO 3: Tela de Detalhes da Oportunidade**
**Arquivo**: `pages/oportunidade.html` 🚧 TODO

**Layout de 3 Colunas**:

#### **Coluna Esquerda - Dados e Ações**
```
┌─────────────────────────────────────┐
│ ATUALIZAÇÃO DE FUNIL                │
│ [Qualificação] ➜ [Reunião] ➜ ...   │
├─────────────────────────────────────┤
│ VALORES (Produtos/Serviços)         │
│ + Adicionar Produto                 │
│ ┌─────────────────────────────────┐ │
│ │ Mesa de Som Yamaha 32 Canais    │ │
│ │ Qtd: 2  R$ 450,00  Recorrência  │ │
│ └─────────────────────────────────┘ │
│ TOTAL: R$ 15.000,00                 │
├─────────────────────────────────────┤
│ DADOS DA OPORTUNIDADE               │
│ Fonte: Indicação ▾                  │
│ Campanha: Google Ads ▾              │
│ Tipo Evento: Casamento ▾            │
├─────────────────────────────────────┤
│ QUALIFICAÇÃO                        │
│ ★★★★★ Lead Quente                  │
├─────────────────────────────────────┤
│ PREVISÃO DE FECHAMENTO              │
│ 📅 15/10/2025                       │
└─────────────────────────────────────┘
```

#### **Coluna Central - Histórico e Interação**
```
┌─────────────────────────────────────┐
│ [Anotações] [Tarefas] [E-mails]     │
│          [Histórico] [Marketing]    │
├─────────────────────────────────────┤
│                                     │
│ ANOTAÇÕES (imutáveis)               │
│ ┌─────────────────────────────────┐ │
│ │ 30/09/2025 14:30 - João         │ │
│ │ Cliente interessado em pacote   │ │
│ │ premium. Solicitou proposta.    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ TAREFAS                             │
│ □ Ligar para cliente (Hoje 15h)    │
│ ✓ Enviar proposta (Concluída)      │
│ + Nova Tarefa                       │
│                                     │
│ E-MAILS                             │
│ [Template ▾] [Merge Tags ▾]         │
│ Para: cliente@email.com             │
│ Assunto: Proposta Casamento         │
│ [Editor de e-mail]                  │
│                                     │
└─────────────────────────────────────┘
```

#### **Topo - Ações Finais**
```
┌─────────────────────────────────────┐
│ Oportunidade #1234                  │
│ Cliente: João Carlos                │
│                                     │
│     [👍 Marcar Venda]               │
│     [👎 Marcar Perda]               │
└─────────────────────────────────────┘
```

**Componentes Necessários**:
- FunnelStageSelector (Organism ≤50 linhas)
- ProductListEditor (Organism ≤50 linhas)
- OpportunityFields (Molecule ≤35 linhas)
- QualificationStars (Atom ≤20 linhas)
- NotesTimeline (Organism ≤50 linhas)
- TaskList (Molecule ≤35 linhas)
- EmailComposer (Organism ≤50 linhas)
- HistoryLog (Organism ≤50 linhas)

---

### **MÓDULO 4: Clientes**
**Arquivo**: `pages/clientes.html` 🚧 TODO

**Layout**:
```
┌─────────────────────────────────────────────────────────┐
│ CLIENTES                                   + Novo Cliente│
├─────────────────────────────────────────────────────────┤
│ 🔍 Buscar  [Nome ▾] [Status ▾] [Data ▾]  [Filtrar]      │
├─────────────────────────────────────────────────────────┤
│ AVATAR │ NOME           │ EMAIL           │ EVENTOS │ $$│
│ JC     │ João Carlos    │ joao@...        │ 3       │ 37K│
│ MS     │ Maria Silva    │ maria@...       │ 5       │ 72K│
│ PR     │ Pedro Rodrigues│ pedro@...       │ 2       │ 16K│
└─────────────────────────────────────────────────────────┘
```

**Funcionalidades**:
- DataTable com paginação
- Filtros avançados
- Modal de CRUD
- Avatar com iniciais
- Badges de status (Ativo, Inativo, VIP)
- Ações: Editar, Excluir, Ver Detalhes, Criar Oportunidade

**Modal de Cliente**:
- Nome, E-mail, Telefone
- Empresa, Cargo
- Endereço completo
- Tipo de Cliente (Pessoa Física/Jurídica)
- Origem (Indicação, Site, Redes Sociais)
- Campos personalizados

---

### **MÓDULO 5: Eventos**
**Arquivo**: `pages/eventos.html` 🚧 TODO

**Layout**:
```
┌─────────────────────────────────────────────────────────┐
│ EVENTOS                          [Mês ▾]    + Novo Evento│
├─────────────────────────────────────────────────────────┤
│         SETEMBRO 2025                                   │
│ DOM  SEG  TER  QUA  QUI  SEX  SAB                       │
│  1    2    3    4    5    6    7                        │
│                    ┌───┐                                │
│                    │ 2 │ Eventos                        │
│                    └───┘                                │
│  8    9   10   11   12   13   14                        │
│            ┌───┐                                        │
│            │ 1 │ Evento                                 │
│            └───┘                                        │
└─────────────────────────────────────────────────────────┘
```

**Cards de Evento do Dia**:
```
┌──────────────────────────────────┐
│ Casamento - João & Maria         │
│ 📅 10/09/2025 - 18h              │
│ 📍 Buffet Jardim das Flores      │
│ 🎛️ 12 equipamentos               │
│ 💰 R$ 25.000,00                  │
│ ✓ Confirmado                     │
└──────────────────────────────────┘
```

**Funcionalidades**:
- Calendário mensal (vanilla JS)
- Integração com oportunidades do funil
- Status: Confirmado, Pendente, Cancelado, Concluído
- Modal de criação/edição
- Timeline de equipamentos alocados
- Exportar para Google Calendar/Outlook

---

### **MÓDULO 6: Equipamentos**
**Arquivo**: `pages/equipamentos.html` 🚧 TODO

**Layout Grid**:
```
┌─────────────────────────────────────────────────────────┐
│ EQUIPAMENTOS              [Categoria ▾] + Novo Equipamento│
├─────────────────────────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│ │ 🎚️           │ │ 💡           │ │ 🏗️           │    │
│ │ Mesa de Som  │ │ Moving Head  │ │ Treliça Q30  │    │
│ │ Yamaha 32ch  │ │ LED 200W     │ │ 3 metros     │    │
│ │              │ │              │ │              │    │
│ │ ✓ Disponível │ │ 🔴 Em Uso    │ │ 🔧 Manutenção│    │
│ │ R$ 450,00/dia│ │ R$ 180,00/dia│ │ R$ 120,00/dia│    │
│ └──────────────┘ └──────────────┘ └──────────────┘    │
└─────────────────────────────────────────────────────────┘
```

**Categorias**:
- Som (Mesas, Caixas, Microfones, Processadores)
- Luz (Moving Heads, Par LEDs, Strobes, Lasers)
- Estrutura (Treliças, Bases, Motores)
- Vídeo (Telões, Projetores, Câmeras)

**Status**:
- 🟢 Disponível
- 🔴 Em Uso
- 🔧 Manutenção
- ⚠️ Reservado

**Funcionalidades**:
- Grid responsivo
- Filtros por categoria e status
- Modal de detalhes (fotos, especificações, histórico)
- Histórico de uso (últimos 10 eventos)
- Agendamento/reserva
- Gestão de manutenções

---

### **MÓDULO 7: Relatórios**

#### **7.1. CRM Live**
**Arquivo**: `pages/crm-live.html` 🚧 TODO

**Layout Dashboard TV**:
```
┌─────────────────────────────────────────────────────────┐
│ STAGETEK CRM LIVE                    30/09/2025 14:35   │
├─────────────────────────────────────────────────────────┤
│ RANKING VENDEDORES          │ FUNIL AGREGADO            │
│ 🥇 João Silva - 12 vendas   │ Qualificação: 25 (125K)   │
│ 🥈 Maria Costa - 9 vendas   │ Reunião: 18 (90K)         │
│ 🥉 Pedro Lima - 7 vendas    │ Proposta: 12 (84K)        │
├─────────────────────────────┼───────────────────────────┤
│ VENDAS AO VIVO              │ METAS DO MÊS              │
│ ✓ João fechou R$ 25K        │ ████████░░ 82%            │
│ ✓ Maria fechou R$ 18K       │ R$ 410K / R$ 500K         │
├─────────────────────────────┼───────────────────────────┤
│ CONVERSÃO                   │ MOTIVOS DE PERDA          │
│ Taxa: 24%                   │ Preço Alto: 40%           │
│ Ciclo: 15 dias              │ Sem Resposta: 35%         │
└─────────────────────────────────────────────────────────┘
```

**Características**:
- Auto-refresh a cada 30 segundos
- Modo fullscreen para TV
- Animações nas vendas ao vivo
- Comparativo com mês anterior

#### **7.2. Painel Geral**
**Arquivo**: `pages/relatorios/painel.html` 🚧 TODO

**Widgets**:
- Gráfico de pizza: Oportunidades por etapa
- Gráfico de barras: Vendas por vendedor
- Linha do tempo: Evolução mensal
- Tabela: Top 10 clientes por faturamento

#### **7.3. Conversões**
**Arquivo**: `pages/relatorios/conversoes.html` 🚧 TODO

**Funil de Conversão**:
```
Qualificação (100)
    ↓ 72% (72)
Reunião
    ↓ 67% (48)
Proposta
    ↓ 58% (28)
Negociação
    ↓ 75% (21)
Fechamento ✓
```

#### **7.4. Ciclo de Venda**
**Arquivo**: `pages/relatorios/ciclo.html` 🚧 TODO

**Métricas**:
- Tempo médio de fechamento (vendas)
- Tempo médio até perda
- Tempo por etapa do funil
- Distribuição temporal (histograma)

#### **7.5. Atividade e Vendas**
**Arquivo**: `pages/relatorios/atividade.html` 🚧 TODO

**KPIs de Esforço**:
- Tempo de primeiro contato
- Tarefas criadas vs. concluídas
- Oportunidades sem atividade (>7 dias)
- Volume de e-mails enviados/respondidos
- Ligações (realizadas/atendidas/não atendidas)

#### **7.6. Motivos de Perda**
**Arquivo**: `pages/relatorios/motivos-perda.html` 🚧 TODO

**Análise**:
- Gráfico de pizza: Distribuição de motivos
- Tabela: Motivos por etapa do funil
- Timeline: Evolução dos motivos ao longo do tempo

#### **7.7. Metas**
**Arquivo**: `pages/relatorios/metas.html` 🚧 TODO

**Acompanhamento**:
- Progress bars individuais
- Progress bar de equipe
- Progress bar da empresa
- Projeção de atingimento

#### **7.8. Fontes e Campanhas**
**Arquivo**: `pages/relatorios/fontes.html` 🚧 TODO

**Atribuição**:
- Leads por fonte
- Conversão por fonte
- ROI por campanha
- Custo por aquisição (CPA)

#### **7.9. Produtos e Serviços**
**Arquivo**: `pages/relatorios/produtos.html` 🚧 TODO

**Análise de Vendas**:
- Top 10 produtos (volume)
- Top 10 produtos (faturamento)
- Ticket médio por produto
- Margem de contribuição

---

### **MÓDULO 8: Automações**
**Arquivo**: `pages/automacoes.html` 🚧 TODO

**Lista de Automações**:
```
┌─────────────────────────────────────────────────────────┐
│ AUTOMAÇÕES                              + Nova Automação │
├─────────────────────────────────────────────────────────┤
│ ✓ Ativa │ Primeiro Contato em 20 minutos                │
│         │ Gatilho: Nova oportunidade criada             │
│         │ Ação: Criar tarefa de ligação                 │
├─────────────────────────────────────────────────────────┤
│ ✓ Ativa │ Follow-up Automático                          │
│         │ Gatilho: Reunião marcada                      │
│         │ Ação: Enviar e-mail com agenda                │
├─────────────────────────────────────────────────────────┤
│ ✗ Inativa│ Redistribuição por Inatividade               │
│         │ Gatilho: 48h sem contato                      │
│         │ Ação: Mudar vendedor responsável              │
└─────────────────────────────────────────────────────────┘
```

**Modal de Automação**:
- Nome da automação
- **Gatilho**: Criar oportunidade, Mudar etapa, Tempo sem ação, Tarefa concluída
- **Condições**: Se fonte = X, Se valor > Y, Se vendedor = Z
- **Ações**: Criar tarefa, Enviar e-mail, Mudar vendedor, Notificar, Webhook

---

### **MÓDULO 9: Configurações**

#### **9.1. Funis**
**Arquivo**: `pages/config/funis.html` 🚧 TODO

**Gestão de Funis**:
```
┌─────────────────────────────────────────────────────────┐
│ FUNIS                                      + Novo Funil  │
├─────────────────────────────────────────────────────────┤
│ Funil de Vendas (Padrão)                   [Editar]     │
│ ┌───────┐┌────────┐┌─────────┐┌──────────┐┌──────────┐│
│ │Qualif.││Reunião ││Proposta ││Negociação││Fechamento││
│ └───────┘└────────┘└─────────┘└──────────┘└──────────┘│
│                                                         │
│ Funil de Pós-venda                         [Editar]     │
│ ┌─────────┐┌──────────┐┌───────────┐                  │
│ │Onboarding││ Treinamento││ Suporte   │                  │
│ └─────────┘└──────────┘└───────────┘                  │
└─────────────────────────────────────────────────────────┘
```

**Funcionalidades**:
- Criar/Editar/Excluir funis
- Adicionar/Remover etapas
- Renomear etapas
- Definir cores por etapa
- Automação entre funis

#### **9.2. Usuários e Permissões**
**Arquivo**: `pages/config/usuarios.html` 🚧 TODO

**Níveis de Acesso**:
- **Administrador**: Acesso total
- **Gestor**: Ver equipe, relatórios, configurar funil
- **Vendedor**: Ver apenas suas oportunidades

**Visibilidade**:
- Minhas oportunidades
- Oportunidades da equipe
- Todas as oportunidades

#### **9.3. Campos Personalizados**
**Arquivo**: `pages/config/campos.html` 🚧 TODO

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
- Eventos
- Equipamentos

#### **9.4. Motivos de Perda**
**Arquivo**: `pages/config/motivos-perda.html` 🚧 TODO

**Lista Personalizável**:
- Preço Alto
- Sem Resposta do Cliente
- Perdeu para Concorrente
- Não Tem Orçamento
- Adiou o Evento
- Outro

#### **9.5. Produtos e Serviços**
**Arquivo**: `pages/config/produtos.html` 🚧 TODO

**Catálogo**:
- Nome, Descrição, Categoria
- Preço unitário
- Tipo: Venda Única ou Recorrente
- Status: Ativo/Inativo
- SKU/Código

#### **9.6. Templates de E-mail**
**Arquivo**: `pages/config/templates-email.html` 🚧 TODO

**Editor de Templates**:
- Nome do template
- Assunto (com merge tags)
- Corpo (WYSIWYG editor)
- **Merge Tags disponíveis**:
  - `{{nome_cliente}}`
  - `{{nome_vendedor}}`
  - `{{nome_evento}}`
  - `{{valor_oportunidade}}`
  - `{{data_evento}}`

#### **9.7. Integrações**
**Arquivo**: `pages/config/integracoes.html` 🚧 TODO

**Integrações Disponíveis**:
- Google Calendar
- Outlook Calendar
- WhatsApp Business API
- E-mail (SMTP/IMAP)
- Zapier (Webhooks)
- API REST STAGETEK

---

## 🗄️ Modelo de Dados (Database Schema)

### **Tabela: users**
```sql
id                UUID PRIMARY KEY
email             TEXT UNIQUE NOT NULL
name              TEXT NOT NULL
role              TEXT NOT NULL -- 'admin', 'manager', 'salesperson'
visibility        TEXT NOT NULL -- 'own', 'team', 'all'
team_id           UUID REFERENCES teams(id)
avatar_url        TEXT
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

### **Tabela: teams**
```sql
id                UUID PRIMARY KEY
name              TEXT NOT NULL
manager_id        UUID REFERENCES users(id)
created_at        TIMESTAMP
```

### **Tabela: clients**
```sql
id                UUID PRIMARY KEY
name              TEXT NOT NULL
email             TEXT
phone             TEXT
company           TEXT
position          TEXT
address           TEXT
city              TEXT
state             TEXT
zip_code          TEXT
client_type       TEXT -- 'individual', 'company'
source            TEXT -- 'referral', 'website', 'social_media', 'other'
status            TEXT -- 'active', 'inactive', 'vip'
created_by        UUID REFERENCES users(id)
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

### **Tabela: funnels**
```sql
id                UUID PRIMARY KEY
name              TEXT NOT NULL
is_default        BOOLEAN DEFAULT false
position          INTEGER
created_at        TIMESTAMP
```

### **Tabela: funnel_stages**
```sql
id                UUID PRIMARY KEY
funnel_id         UUID REFERENCES funnels(id) ON DELETE CASCADE
name              TEXT NOT NULL
color             TEXT -- Hex color
position          INTEGER NOT NULL
created_at        TIMESTAMP
```

### **Tabela: opportunities**
```sql
id                UUID PRIMARY KEY
client_id         UUID REFERENCES clients(id)
funnel_id         UUID REFERENCES funnels(id)
stage_id          UUID REFERENCES funnel_stages(id)
assigned_to       UUID REFERENCES users(id)
event_name        TEXT NOT NULL
event_date        DATE
qualification     INTEGER -- 1-5 stars
total_value       DECIMAL(10,2) DEFAULT 0
source            TEXT
campaign          TEXT
forecast_date     DATE
status            TEXT -- 'open', 'won', 'lost'
won_at            TIMESTAMP
lost_at           TIMESTAMP
lost_reason_id    UUID REFERENCES lost_reasons(id)
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

### **Tabela: opportunity_products**
```sql
id                UUID PRIMARY KEY
opportunity_id    UUID REFERENCES opportunities(id) ON DELETE CASCADE
product_id        UUID REFERENCES products(id)
quantity          INTEGER DEFAULT 1
unit_price        DECIMAL(10,2) NOT NULL
is_recurring      BOOLEAN DEFAULT false
created_at        TIMESTAMP
```

### **Tabela: products**
```sql
id                UUID PRIMARY KEY
name              TEXT NOT NULL
description       TEXT
category          TEXT -- 'sound', 'light', 'structure', 'video', 'service'
unit_price        DECIMAL(10,2) NOT NULL
is_recurring      BOOLEAN DEFAULT false
sku               TEXT
status            TEXT -- 'active', 'inactive'
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

### **Tabela: equipment**
```sql
id                UUID PRIMARY KEY
product_id        UUID REFERENCES products(id)
serial_number     TEXT
status            TEXT -- 'available', 'in_use', 'maintenance', 'reserved'
last_maintenance  DATE
next_maintenance  DATE
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

### **Tabela: events**
```sql
id                UUID PRIMARY KEY
opportunity_id    UUID REFERENCES opportunities(id)
client_id         UUID REFERENCES clients(id)
name              TEXT NOT NULL
event_date        DATE NOT NULL
event_time        TIME
venue             TEXT
address           TEXT
status            TEXT -- 'confirmed', 'pending', 'cancelled', 'completed'
total_value       DECIMAL(10,2)
created_by        UUID REFERENCES users(id)
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

### **Tabela: event_equipment**
```sql
id                UUID PRIMARY KEY
event_id          UUID REFERENCES events(id) ON DELETE CASCADE
equipment_id      UUID REFERENCES equipment(id)
quantity          INTEGER DEFAULT 1
allocated_at      TIMESTAMP
returned_at       TIMESTAMP
```

### **Tabela: notes**
```sql
id                UUID PRIMARY KEY
opportunity_id    UUID REFERENCES opportunities(id) ON DELETE CASCADE
created_by        UUID REFERENCES users(id)
content           TEXT NOT NULL
created_at        TIMESTAMP -- IMMUTABLE (never updated)
```

### **Tabela: tasks**
```sql
id                UUID PRIMARY KEY
opportunity_id    UUID REFERENCES opportunities(id) ON DELETE CASCADE
assigned_to       UUID REFERENCES users(id)
type              TEXT -- 'call', 'email', 'meeting', 'other'
title             TEXT NOT NULL
description       TEXT
due_date          TIMESTAMP
completed_at      TIMESTAMP
created_by        UUID REFERENCES users(id)
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

### **Tabela: emails**
```sql
id                UUID PRIMARY KEY
opportunity_id    UUID REFERENCES opportunities(id) ON DELETE CASCADE
sent_by           UUID REFERENCES users(id)
to_email          TEXT NOT NULL
subject           TEXT NOT NULL
body              TEXT NOT NULL
template_id       UUID REFERENCES email_templates(id)
sent_at           TIMESTAMP
opened_at         TIMESTAMP
replied_at        TIMESTAMP
```

### **Tabela: email_templates**
```sql
id                UUID PRIMARY KEY
name              TEXT NOT NULL
subject           TEXT NOT NULL
body              TEXT NOT NULL
created_by        UUID REFERENCES users(id)
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

### **Tabela: activity_log**
```sql
id                UUID PRIMARY KEY
opportunity_id    UUID REFERENCES opportunities(id) ON DELETE CASCADE
user_id           UUID REFERENCES users(id)
action            TEXT NOT NULL -- 'created', 'stage_changed', 'value_updated', etc.
old_value         JSONB
new_value         JSONB
created_at        TIMESTAMP
```

### **Tabela: automations**
```sql
id                UUID PRIMARY KEY
name              TEXT NOT NULL
trigger_type      TEXT NOT NULL -- 'opportunity_created', 'stage_changed', 'time_elapsed'
trigger_config    JSONB
action_type       TEXT NOT NULL -- 'create_task', 'send_email', 'change_assignee'
action_config     JSONB
is_active         BOOLEAN DEFAULT true
created_by        UUID REFERENCES users(id)
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

### **Tabela: lost_reasons**
```sql
id                UUID PRIMARY KEY
name              TEXT NOT NULL
position          INTEGER
is_active         BOOLEAN DEFAULT true
created_at        TIMESTAMP
```

### **Tabela: custom_fields**
```sql
id                UUID PRIMARY KEY
entity_type       TEXT NOT NULL -- 'opportunity', 'client', 'event', 'equipment'
field_name        TEXT NOT NULL
field_type        TEXT NOT NULL -- 'text', 'number', 'date', 'select', 'multiselect'
field_options     JSONB -- For select/multiselect
is_required       BOOLEAN DEFAULT false
position          INTEGER
created_at        TIMESTAMP
```

### **Tabela: custom_field_values**
```sql
id                UUID PRIMARY KEY
custom_field_id   UUID REFERENCES custom_fields(id) ON DELETE CASCADE
entity_id         UUID NOT NULL
value             TEXT
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

### **Tabela: goals**
```sql
id                UUID PRIMARY KEY
user_id           UUID REFERENCES users(id)
team_id           UUID REFERENCES teams(id)
period            TEXT -- 'monthly', 'quarterly', 'yearly'
period_start      DATE
period_end        DATE
target_value      DECIMAL(10,2)
created_at        TIMESTAMP
```

---

## 🎨 Biblioteca de Componentes Necessários

### **Atoms (≤20 linhas)**
- ✅ Badge
- ✅ Avatar
- ✅ StatusDot
- ✅ ProgressBar
- 🚧 QualificationStars
- 🚧 DatePicker
- 🚧 TimePicker
- 🚧 MoneyInput
- 🚧 PhoneInput
- 🚧 Toggle

### **Molecules (≤35 linhas)**
- ✅ StatCard
- ✅ MetricCard
- ✅ SearchInput
- 🚧 FormField
- 🚧 ClientAvatar (Avatar + Name + Badge)
- 🚧 ProductSelector
- 🚧 FunnelStageSelector
- 🚧 TaskCheckbox
- 🚧 FilterDropdown

### **Organisms (≤50 linhas)**
- ✅ DataTable
- ✅ ChartCard
- ✅ KanbanBoard
- ✅ KanbanColumn
- 🚧 OpportunityCard (card do Kanban detalhado)
- 🚧 OpportunityModal (modal de criar/editar)
- 🚧 ClientModal
- 🚧 EventModal
- 🚧 EquipmentCard
- 🚧 EmailComposer
- 🚧 NotesTimeline
- 🚧 TaskList
- 🚧 HistoryLog
- 🚧 ProductListEditor
- 🚧 CalendarMonth
- 🚧 AutomationBuilder

### **Templates (≤30 linhas)**
- ✅ DashboardLayout (Sidebar + TopBar + Content)
- 🚧 ModalLayout
- 🚧 ReportLayout
- 🚧 FullscreenLayout (para CRM Live)

---

## 🚀 Roadmap de Implementação

### **Fase 1: Estrutura Base** (Semana 1)
- [x] Dashboard
- [x] Funil de Vendas (Kanban básico)
- [ ] Sistema de autenticação (Supabase Auth)
- [ ] Configuração Supabase completa
- [ ] Migração do schema do banco

### **Fase 2: CRUD Completo** (Semana 2)
- [ ] Página de Clientes com CRUD
- [ ] Página de Eventos com calendário
- [ ] Página de Equipamentos com grid
- [ ] Detalhes da Oportunidade completo

### **Fase 3: Interações Avançadas** (Semana 3)
- [ ] Sistema de Tarefas
- [ ] Sistema de Anotações (imutáveis)
- [ ] Envio de E-mails
- [ ] Templates de E-mail
- [ ] Histórico automático

### **Fase 4: Relatórios** (Semana 4)
- [ ] CRM Live
- [ ] Painel Geral
- [ ] Conversões
- [ ] Ciclo de Venda
- [ ] Atividade e Vendas
- [ ] Motivos de Perda
- [ ] Metas
- [ ] Fontes e Campanhas
- [ ] Produtos e Serviços

### **Fase 5: Automações** (Semana 5)
- [ ] Builder de automações
- [ ] Gatilhos (criar oportunidade, mudar etapa, tempo)
- [ ] Ações (criar tarefa, enviar e-mail, mudar vendedor)
- [ ] Condições avançadas

### **Fase 6: Configurações** (Semana 6)
- [ ] Gestão de Funis
- [ ] Usuários e Permissões
- [ ] Campos Personalizados
- [ ] Motivos de Perda
- [ ] Produtos/Serviços
- [ ] Integrações

### **Fase 7: Integrações Externas** (Semana 7)
- [ ] WhatsApp Business API
- [ ] Google Calendar
- [ ] Outlook Calendar
- [ ] VoIP (ligações)
- [ ] API REST STAGETEK

### **Fase 8: Otimizações e Testes** (Semana 8)
- [ ] Testes E2E
- [ ] Performance optimization
- [ ] Mobile responsive final
- [ ] PWA (offline support)
- [ ] Documentação completa

---

## 🎯 Próximos Passos Imediatos

**O que fazer agora?**

1. **Decidir Stack Tecnológica**:
   - Opção A: Continuar Vanilla HTML/CSS/JS + Supabase
   - Opção B: Migrar para React + Vite + TypeScript + Tailwind + Supabase

2. **Configurar Supabase**:
   - Criar projeto
   - Executar migrations do schema
   - Configurar RLS (Row Level Security)
   - Setup de autenticação

3. **Priorizar Páginas**:
   - Qual página quer ver funcionando primeiro?
   - Sugestão: Detalhes da Oportunidade (é o coração do CRM)

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
**Última atualização**: 30 de Setembro de 2025
