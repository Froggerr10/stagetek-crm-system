# STAGETEK CRM System

**Sistema de CRM profissional para gestão de vendas, eventos e equipamentos**

[![Protocol Notecraft™](https://img.shields.io/badge/Protocol-Notecraft™-e90101)](./protocol/PROTOCOL-NOTECRAFT.md)
[![Status](https://img.shields.io/badge/Status-In%20Development-yellow)]()
[![Version](https://img.shields.io/badge/Version-1.0.0-blue)]()

## 📋 Sobre o Projeto

Sistema completo de **Customer Relationship Management (CRM)** inspirado no RD Station CRM, desenvolvido seguindo **Protocol Notecraft™** da STAGETEK. Especializado em empresas de eventos, com funcionalidades de:

- 🎯 **Funil de Vendas** (Kanban drag-and-drop)
- 👥 **Gestão de Clientes** (CRUD completo)
- 📅 **Gestão de Eventos** (calendário + status)
- 🎛️ **Gestão de Equipamentos** (som, luz, estrutura)
- 📊 **Relatórios e Dashboards** (CRM Live, conversões, metas)
- ⚙️ **Automações** (gatilhos e ações customizáveis)
- 📧 **Comunicação** (e-mail tracking, templates, WhatsApp)

## 🏗️ Estrutura do Projeto

```
stagetek-crm-system/
├── .claude/                      # Claude Code Configuration
│   ├── CLAUDE.md                 # Instruções principais
│   ├── MCP-SETUP.md             # Setup de MCP servers
│   ├── mcp-config.json          # Configuração MCPs
│   └── agents/                  # Agents especializados
│       ├── README.md
│       ├── frontend-specialist.md
│       ├── backend-specialist.md
│       ├── qa-specialist.md
│       └── product-manager.md
├── protocol/                    # Protocol Notecraft™
│   ├── PROTOCOL-NOTECRAFT.md   # Regras de desenvolvimento
│   ├── BRANDING-STANDARDS.md   # Padrões de marca
│   └── ARCHITECTURE.md         # Arquitetura completa
├── design-system/              # Sistema de design
│   ├── base.css               # Estilos base (25KB)
│   └── components.css         # Componentes dashboard (11KB)
├── components/                # Componentes futuros (React/Vanilla)
│   ├── atoms/                # ≤20 linhas
│   ├── molecules/            # ≤35 linhas
│   ├── organisms/            # ≤50 linhas
│   └── templates/            # ≤30 linhas
├── pages/                    # Páginas da aplicação
│   ├── dashboard.html        # ✅ Dashboard com 4 gráficos
│   ├── funil-vendas.html    # ✅ Kanban drag-and-drop
│   ├── clientes.html        # 🚧 TODO
│   ├── eventos.html         # 🚧 TODO
│   ├── equipamentos.html    # 🚧 TODO
│   ├── crm-live.html        # 🚧 TODO
│   ├── oportunidade.html    # 🚧 TODO
│   └── automacoes.html      # 🚧 TODO
├── services/               # 🚧 Service layer (Supabase)
│   ├── supabaseClient.js
│   ├── opportunitiesService.js
│   ├── clientsService.js
│   └── eventsService.js
├── migrations/            # 🚧 SQL migrations
│   └── 001_initial_schema.sql
├── assets/               # Assets estáticos
│   └── logos/SVG/       # Logos STAGETEK
├── public/              # Screenshots e arquivos públicos
└── index.html          # ✅ Landing page
```

## 🎨 Design System

- **Cores primárias**: STAGETEK Red (#e90101), Dark Red (#862128), Darker Red (#63141a)
- **Tipografia**: Artpast (brand), Microgramma Extended Bold (UI), Proxima Nova (content)
- **Componentes**: 30+ componentes seguindo atomic design
- **Dark Mode**: Suporte completo com persistência localStorage

## 🚀 Quick Start

### 1. Clone o Repositório
```bash
git clone https://github.com/stagetek/stagetek-crm-system.git
cd stagetek-crm-system
```

### 2. Abra no Navegador
```bash
# Método 1: Servidor HTTP local
npx http-server . -p 3000 -o

# Método 2: Abrir index.html diretamente
start index.html
```

### 3. Acesse as Páginas
- **Landing Page**: http://localhost:3000/index.html
- **Dashboard**: http://localhost:3000/pages/dashboard.html
- **Funil de Vendas**: http://localhost:3000/pages/funil-vendas.html

---

## 🤖 Usando Claude Code + Agents

Este projeto está configurado com **agents especializados** para acelerar o desenvolvimento:

### Agents Disponíveis
- **@frontend-specialist** - UI/UX, componentes, Protocol Notecraft™
- **@backend-specialist** - Supabase, database, API, RLS
- **@qa-specialist** - Testing, quality, performance, accessibility
- **@product-manager** - Roadmap, user stories, priorização

### Comandos Rápidos
```bash
# Criar componente
@frontend-specialist "Create OpportunityCard organism (≤50 lines) with Protocol Notecraft™ compliance"

# Criar tabela no banco
@backend-specialist "Create opportunities table with RLS using Supabase"

# Testar página
@qa-specialist "Review pages/funil-vendas.html for Protocol compliance and accessibility"

# Planejar sprint
@product-manager "Plan Sprint 2 with RICE prioritization"
```

**Documentação completa**: [`.claude/agents/README.md`](./.claude/agents/README.md)

---

## 🗄️ Setup de Backend (Supabase)

### 1. Criar Projeto Supabase
1. Ir em https://supabase.com
2. Criar novo projeto
3. Copiar `Project URL` e `Anon Key`

### 2. Configurar Environment Variables
```bash
# Criar arquivo .env
VITE_SUPABASE_URL=https://[project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
```

### 3. Executar Migrations
```bash
# Instalar Supabase CLI
npx supabase init
npx supabase login

# Aplicar schema
npx supabase db push
```

**Database Schema**: [`protocol/ARCHITECTURE.md`](./protocol/ARCHITECTURE.md)

---

## 📖 Documentação

### Protocol Notecraft™
- [`PROTOCOL-NOTECRAFT.md`](./protocol/PROTOCOL-NOTECRAFT.md) - Regras de desenvolvimento
- [`BRANDING-STANDARDS.md`](./protocol/BRANDING-STANDARDS.md) - Padrões de marca
- [`ARCHITECTURE.md`](./protocol/ARCHITECTURE.md) - Arquitetura completa do CRM

### Claude Code
- [`.claude/CLAUDE.md`](./.claude/CLAUDE.md) - Instruções principais
- [`.claude/MCP-SETUP.md`](./.claude/MCP-SETUP.md) - Setup de MCP servers
- [`.claude/agents/`](./.claude/agents/) - Agents especializados

### Desenvolvimento
- Edite páginas em `/pages`
- Adicione estilos em `/design-system`
- Crie services em `/services`
- Adicione migrations em `/migrations`

## 📦 Componentes Disponíveis

### Atoms (Componentes Básicos)
- **Badge**: Status pills com cores semânticas
- **Avatar**: Avatares de usuário com iniciais
- **StatusDot**: Indicadores de status
- **ProgressBar**: Barras de progresso

### Molecules (Componentes Compostos)
- **StatCard**: Cards de métricas com ícones
- **MetricCard**: Cards com valores e progresso
- **SearchInput**: Input de busca com ícone

### Organisms (Componentes Complexos)
- **DataTable**: Tabela de dados com ordenação
- **Dashboard**: Layout completo de dashboard
- **DashboardHeader**: Cabeçalho com navegação

## 🎯 Funcionalidades

### Dashboard Principal
- ✅ Métricas em tempo real (clientes, vendas, eventos)
- ✅ Gráficos de performance
- ✅ Pipeline de vendas
- ✅ Últimos eventos

### Gestão de Clientes
- ✅ Cadastro completo
- ✅ Histórico de eventos
- ✅ Contatos e comunicação
- ✅ Satisfação e avaliações

### Gestão de Eventos
- ✅ Calendário de eventos
- ✅ Status e confirmações
- ✅ Equipamentos alocados
- ✅ Valores e pagamentos

### Gestão de Equipamentos
- ✅ Inventário completo
- ✅ Status de disponibilidade
- ✅ Manutenções programadas
- ✅ Histórico de uso

## 📊 Métricas e KPIs

- Total de clientes
- Vendas mensais (R$)
- Eventos realizados
- Taxa de conversão
- Satisfação do cliente (NPS)
- Equipamentos em operação

## 🌓 Dark Mode

Suporte nativo para modo escuro com:
- Persistência em localStorage
- Transições suaves
- Adaptação de logos e ícones
- Toggle padronizado em todas as páginas

## 📱 Responsividade

- **Mobile-first design**
- Breakpoints: 640px, 768px, 1024px, 1280px
- Grid adaptativo
- Sidebar colapsável

## 🔐 Segurança (Futuro)

- Autenticação de usuários
- Controle de permissões
- Logs de auditoria
- Backup automático

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Design System**: CSS Custom Properties
- **Ícones**: Feather Icons (SVG)
- **Storage**: localStorage
- **Responsividade**: CSS Grid + Flexbox

## 📝 Protocol Notecraft™

Este projeto segue rigorosamente o **Protocol Notecraft™**:

- Atoms: ≤20 linhas
- Molecules: ≤35 linhas
- Organisms: ≤50 linhas
- Templates: ≤30 linhas
- Single Responsibility Principle
- 100% CSS Custom Properties

## 🎨 Branding

Todas as páginas seguem **BRANDING-STANDARDS.md**:
- Logo padronizado (32px navbar, 120px hero, 24px footer)
- Dark mode toggle consistente
- Footer com Protocol Notecraft™
- Cores STAGETEK (#e90101)

## 📚 Documentação

Consulte a pasta `/docs` para:
- Guia de arquitetura
- Catálogo de componentes
- Guia de contribuição
- Roadmap de features

## 🚧 Roadmap

### **v1.0 - MVP** (8 semanas) 🚀

#### Fase 1: Foundation (Semana 1)
- [x] Dashboard com métricas
- [x] Funil de Vendas Kanban básico
- [ ] Autenticação Supabase
- [ ] Database schema completo
- [ ] Claude Code + Agents setup

#### Fase 2: Core Features (Semanas 2-3)
- [ ] CRUD Clientes
- [ ] CRUD Eventos (calendário)
- [ ] CRUD Equipamentos
- [ ] Detalhes da Oportunidade completo
- [ ] Sistema de Tarefas
- [ ] Sistema de Anotações (imutáveis)

#### Fase 3: Communication (Semana 4)
- [ ] Envio de E-mails
- [ ] Templates de E-mail
- [ ] Tracking de E-mails (aberto/respondido)
- [ ] Histórico automático

#### Fase 4: Reports (Semana 5)
- [ ] CRM Live (Dashboard TV)
- [ ] Painel Geral
- [ ] Conversões (funil analysis)
- [ ] Ciclo de Venda
- [ ] Motivos de Perda

#### Fase 5: Automation (Semana 6)
- [ ] Builder de Automações
- [ ] Gatilhos básicos (criar oportunidade, mudar etapa, tempo)
- [ ] Ações básicas (criar tarefa, enviar e-mail)

#### Fase 6: Configuration (Semana 7)
- [ ] Gestão de Funis
- [ ] Usuários e Permissões (admin, manager, salesperson)
- [ ] Campos Personalizados
- [ ] Produtos/Serviços

#### Fase 7: Testing & Launch (Semana 8)
- [ ] QA completo (Protocol compliance, accessibility, performance)
- [ ] Performance optimization
- [ ] Bug fixes
- [ ] User documentation
- [ ] Deploy to production

---

### **v1.1 - Enhancements** (4 semanas)

#### Communication++
- [ ] WhatsApp Business API integration
- [ ] SMS notifications
- [ ] Push notifications
- [ ] In-app notifications

#### Advanced Reports
- [ ] Atividade e Vendas
- [ ] Metas com tracking
- [ ] Fontes e Campanhas
- [ ] Produtos e Serviços analysis

#### Integrations
- [ ] Google Calendar sync
- [ ] Outlook Calendar sync
- [ ] Zapier webhooks
- [ ] Export data (CSV, Excel)

---

### **v2.0 - Scale** (8 semanas)

#### Mobile App
- [ ] React Native app
- [ ] iOS + Android
- [ ] Offline-first
- [ ] Push notifications

#### Advanced Automation
- [ ] Conditional logic (if-then-else)
- [ ] Time-based triggers (cron)
- [ ] Multi-step workflows
- [ ] A/B testing de automações

#### AI-Powered Features
- [ ] Lead scoring automático
- [ ] Previsão de fechamento (ML)
- [ ] Recomendações de ações
- [ ] Análise de sentimento (e-mails)

#### Enterprise Features
- [ ] Multi-company support
- [ ] Custom branding (white-label)
- [ ] Advanced permissions (RBAC)
- [ ] Audit log
- [ ] SLA management

**Full Roadmap**: [`protocol/ARCHITECTURE.md`](./protocol/ARCHITECTURE.md)

## 👥 Equipe

**STAGETEK Engineering Team**

Built with ❤️ following **Protocol Notecraft™**

## 📄 Licença

Copyright © 2025 STAGETEK. Todos os direitos reservados.

---

**Versão**: 1.0.0
**Última atualização**: 30 de Setembro de 2025
