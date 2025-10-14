# STAGETEK CRM System - Claude Configuration

**INSTRUÇÕES CRÍTICAS: SIGA RIGOROSAMENTE O PROTOCOL NOTECRAFT™**

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS (13 Out 2025)

### **✅ COMPLETADO RECENTEMENTE**
- ✅ Supabase integrado e funcionando (database + auth)
- ✅ CRUD Clientes funcionando (create, read, update, delete)
- ✅ CRUD Oportunidades funcionando (create, read, update, delete)
- ✅ Modais com campos completos (incluindo endereço em JSONB)
- ✅ Protocol Notecraft™ 100% compliance (validação automática)
- ✅ Projeto organizado (docs movidos para pastas adequadas)

### **PRIORIDADE 1: Detalhes da Oportunidade** (P0)
Criar página completa `src/pages/DetalheOportunidade.tsx`:
- Layout 3 colunas (Sidebar Left | Tabs Center | Sidebar Right)
- Tabs: Histórico, E-mail, Tarefas, Contatos, Produtos, Arquivos
- Navegação: clicar em oportunidade → abrir detalhes

### **PRIORIDADE 2: Sistema de Tarefas** (P0)
Implementar feature completa de tarefas:
- Criar/editar/deletar tarefas
- Tipos: Ligação, WhatsApp, Email, Reunião
- Vincular tarefas a oportunidades
- Notificações de tarefas vencidas

### **PRIORIDADE 3: Configuração de Funis** (P0)
Criar `src/pages/ConfigFunis.tsx`:
- Editor visual de etapas (bolinhas conectadas)
- CRUD completo de funis
- Gerenciar múltiplos pipelines

**📄 Ver detalhes completos nas seções abaixo.**

---

## 🚨 LEIA PRIMEIRO: CONTEXTO CRÍTICO

**VOCÊ ESTÁ TRABALHANDO EM UM PROJETO REAL COM REQUISITOS ESPECÍFICOS.**

Antes de fazer QUALQUER alteração, você DEVE:

1. ✅ Ler `protocol/PRD.md` (995 linhas) - Product Requirements Document COMPLETO
2. ✅ Ler `protocol/RD-STATION-ANALYSIS.md` (1200 linhas) - Análise DETALHADA das telas do RD Station
3. ✅ Ler `protocol/GAP-ANALYSIS.md` (556 linhas) - O que está faltando vs o que deve ser feito
4. ✅ Ler `protocol/FEATURES-PRIORITIZED.md` - Priorização P0/P1/P2/P3

**NUNCA** faça correções visuais ou melhorias sem entender o FLUXO COMPLETO do sistema.

---

## 🎯 STATUS DE IMPLEMENTAÇÃO (Atualizado: 13 Out 2025)

### 🎉 MARCOS RECENTES (13 Out 2025)

#### **✅ Supabase Integration - 100% FUNCIONAL**
- ✅ Database conectado e funcionando
- ✅ Tabelas criadas: clients, opportunities, funnel_stages, users
- ✅ RLS (Row Level Security) policies configuradas
- ✅ CRUD Clientes: Create, Read, Update, Delete ✅
- ✅ CRUD Oportunidades: Create, Read, Update, Delete ✅
- ✅ Seed data: 5 clientes, 5 estágios, 7 oportunidades de teste
- ✅ Queries relacionadas funcionando (client + stage em opportunities)

#### **✅ Modais & Forms - 100% COMPLETOS**
- ✅ FormField component flexível (suporta children e input props)
- ✅ ClienteModal (49 linhas) com campos completos:
  - Nome, CNPJ, Email, Phone, Website, Status
  - AddressFields component (22 linhas) para endereço JSONB
- ✅ OportunidadeModal (50 linhas) com campos completos:
  - Título, Cliente (select), Valor, Probabilidade, Estágio (select), Data
- ✅ Selects com contraste correto (bg-gray-900, text-white)
- ✅ Validação funcional com feedback visual

#### **✅ Protocol Notecraft™ - 100% COMPLIANCE AUTOMÁTICA**
- ✅ Refatoração completa de 12 componentes
- ✅ Automação: `scripts/validate-notecraft.js`
- ✅ Pre-commit hook (Husky) bloqueia violações
- ✅ npm script: `npm run validate:notecraft`
- ✅ Componentes reutilizáveis:
  - `useClienteForm.ts` (61 linhas) - Hook form clientes
  - `useOportunidadeForm.ts` (67 linhas) - Hook form oportunidades
  - `ModalHeader.tsx` (16 linhas) - Header reutilizável
  - `ModalActions.tsx` (20 linhas) - Actions reutilizáveis
  - `AddressFields.tsx` (22 linhas) - Campos de endereço
  - `FormField.tsx` (17 linhas) - Field genérico flexível

**Resultado**: Zero violações, zero warnings, 100% compliance

---

### ✅ O que JÁ ESTÁ implementado:

#### **Infraestrutura & Setup**
- ✅ React 18 + TypeScript + Vite configurado
- ✅ Tailwind CSS 3.4 (design tokens STAGETEK)
- ✅ Atomic Design (atoms/molecules/organisms/templates)
- ✅ Protocol Notecraft™ - **100% compliance automática**
- ✅ Husky pre-commit hooks
- ✅ Path aliases (`@/*`) configurados
- ✅ Supabase client configurado

#### **Autenticação**
- ✅ Login/Logout (Supabase Auth)
- ✅ Proteção de rotas (`ProtectedRoute.tsx`)
- ✅ Gestão de sessão
- ✅ Hook `useAuth()` disponível

#### **CRUD Clientes**
- ✅ Página `src/pages/Clientes.tsx` (React)
- ✅ DataTable desktop + Cards mobile
- ✅ Modal criação/edição (`ClienteModal.tsx` - 47 linhas)
- ✅ Avatar com iniciais
- ✅ Badge de status
- ✅ Filtros por busca
- ⏳ **PRÓXIMO**: Conectar ao Supabase (atualmente mock data)

#### **CRUD Oportunidades**
- ✅ Página `src/pages/Oportunidades.tsx` (React)
- ✅ Modal criação/edição (`OportunidadeModal.tsx` - 50 linhas)
- ✅ Formulário completo (cliente, valor, estágio, data)
- ✅ Listagem básica
- ⏳ **PRÓXIMO**: Conectar ao Supabase (atualmente mock data)

#### **Funil de Vendas (Kanban)**
- ✅ Página HTML: `pages/funil-vendas.html` (standalone)
- ✅ 5 colunas drag-and-drop
- ✅ Totalizadores R$ por coluna
- ✅ Contador de oportunidades
- ⏳ **PRÓXIMO**: Migrar para React (`src/pages/Funil.tsx`)

#### **Dashboard**
- ✅ Página HTML: `pages/dashboard.html` (standalone)
- ✅ Página React: `src/pages/Dashboard.tsx` (básico)
- ✅ 4 StatCards
- ✅ Gráficos Chart.js (no HTML)
- ⏳ **PRÓXIMO**: Conectar gráficos ao Supabase (dados reais)

#### **Navegação & Layout**
- ✅ TopBar (`src/components/organisms/TopBar.tsx` - 44 linhas)
  - Logo STAGETEK
  - Navegação horizontal (Dashboard, Oportunidades, Clientes, etc.)
  - SearchBar
  - Notificações + Ajuda + Apps
  - UserMenu dropdown (31 linhas)
- ✅ MainLayout com TopBar + conteúdo

---

### 🚨 BLOCKERS CRÍTICOS (Resolver ANTES de P0.5)

#### **1. Segurança & Compliance (RLS Policies)** ⏰ 1 semana

**Status**: 🔴 **BLOQUEADOR** - RLS incompleto pode causar vazamento de dados

**Problema**: Apenas policies de SELECT existem. Faltam INSERT/UPDATE/DELETE.

**Ações necessárias**:
- [ ] **RLS completo por tabela**:
  - [ ] `clients` (INSERT/UPDATE/DELETE + org_id scoping)
  - [ ] `opportunities` (INSERT/UPDATE/DELETE + owner validation)
  - [ ] `funnel_stages` (apenas admin pode modificar)
  - [ ] `contacts` (INSERT/UPDATE/DELETE + client_id validation)
  - [ ] `tasks` (INSERT/UPDATE/DELETE + assignee validation)
  - [ ] `products` (apenas admin pode modificar)
- [ ] **Storage policies**:
  - [ ] Bucket PDFs com assinatura temporal (1h)
  - [ ] Upload limitado por role (authenticated users)
  - [ ] Download apenas para owner da oportunidade
- [ ] **Auditoria**:
  - [ ] Criar tabela `activity_log` (quem, o quê, quando)
  - [ ] Triggers em UPDATE/DELETE para log automático
- [ ] **Masking PII**:
  - [ ] Emails (mostrar ema***@domain.com)
  - [ ] Telefones (mostrar (11) 9****-4321)

**Referência**: Ver `protocol/TECH-DEBT.md` (será criado)

#### **2. Storage Limits (Supabase Free)** ⏰ 2 dias

**Status**: 🟡 **MÉDIO** - Pode estourar 2GB com PDFs

**Ações**:
- [ ] Implementar cold-storage (S3 compatível) para PDFs >30 dias
- [ ] Política de expiração de anexos (deletar após 90 dias)
- [ ] Compressão de imagens (produtos)

---

### 🚀 P0.5 - COTAÇÃO MVP (DIFERENCIAL COMPETITIVO)

#### **Status**: 🔴 **PRIORIDADE MÁXIMA** - Sem isso, CRM não tem valor real

**Insight da análise executiva**:
> "O valor do CRM está aí para Stagetek (preço, lead time, frete, impostos). Sem isso, o time volta para planilhas."

**RICE Score**: 15.0 (Reach: 5 | Impact: 10 | Confidence: 90% | Effort: 3 weeks)

**Por que P0.5?**
- ✅ P0 (CRUD básico) está completo
- 🚨 Sem cotação rápida, não há adoção
- 💰 Momento wow: cotação em 2-3 cliques (vs 2h em planilha)

#### **Cotação MVP - Requisitos**

**User Story**:
```gherkin
As a: Vendedor Stagetek
I want to: Selecionar produtos do catálogo e gerar PDF profissional
So that: Eu envie proposta em <5 minutos (vs 2h em planilha)
```

**Escopo P0.5** (2-3 semanas):
- [ ] **Database**:
  - [ ] Tabela `products` (nome, SKU, categoria, preço BRL/USD/EUR, imagem)
  - [ ] Tabela `quotations` (opportunity_id, items JSONB, total, status)
  - [ ] Seed data: 50 produtos (som, luz, estruturas, talhas)
- [ ] **Frontend**:
  - [ ] Página `/produtos` (listagem + busca + filtros por categoria)
  - [ ] Página `/oportunidades/:id/cotacao/nova` (seleção de produtos)
  - [ ] Multi-select com quantidade/desconto por linha
  - [ ] Campo "Frete" manual (input R$)
  - [ ] Preview total (produtos + frete)
- [ ] **PDF Generation**:
  - [ ] Logo Stagetek + dados da empresa
  - [ ] Tabela produtos (descrição, qtd, preço unit, subtotal)
  - [ ] Totais (subtotal, frete, total geral)
  - [ ] Termos e condições (footer)
  - [ ] Biblioteca: `react-pdf` ou `pdfmake`
- [ ] **Email Integration**:
  - [ ] Botão "Enviar por Email" (Resend API)
  - [ ] Template básico com PDF anexo
  - [ ] Status "Proposta Enviada" na oportunidade

**Out of Scope P0.5** (deixar para P1):
- ❌ Cálculo automático de frete (API Melhor Envio)
- ❌ Cálculo de impostos (ICMS, IPI)
- ❌ Regras de desconto complexas
- ❌ Múltiplas moedas (USD/EUR)
- ❌ Templates de email customizáveis

**Acceptance Criteria**:
```gherkin
✅ Given: Estou na oportunidade "Pedido Set Luz"
✅ When: Clico "Nova Cotação"
✅ Then: Vejo catálogo com 50+ produtos
✅ And: Posso buscar por nome/SKU
✅ And: Posso filtrar por categoria (Som, Luz, Estrutura)
✅ When: Adiciono 5 produtos ao carrinho
✅ And: Ajusto quantidade/desconto
✅ And: Preencho frete manual (R$ 500)
✅ And: Clico "Gerar PDF"
✅ Then: PDF é gerado em <3s
✅ And: Preview do PDF é exibido
✅ When: Clico "Enviar por Email"
✅ Then: Email enviado em <30s
✅ And: Status muda para "Proposta Enviada"
✅ And: Cotação fica salva no histórico
```

**Definition of Done**:
- [ ] Código passa em Protocol Notecraft™ validation
- [ ] Testes E2E (Playwright) cobrem happy path
- [ ] PDF renderiza corretamente em mobile/desktop
- [ ] Email chega com PDF anexado (<2MB)
- [ ] RLS policies completas para `quotations`

**Tempo estimado**: 2-3 semanas (Sprint 2)

---

### ⏳ O que FALTA (P1 - ALTA PRIORIDADE)

#### **1. Detalhes da Oportunidade** (0% implementado)

**Baseado em**: `RD-STATION-ANALYSIS.md` linhas 224-339 + `tarefas.png` screenshot

**Página completa**: `src/pages/DetalheOportunidade.tsx` (NÃO EXISTE!)

**Layout necessário**:
```
┌─────────────────────────────────────────────────────┐
│ TopBar (Logo | Menu | Busca | Avatar)              │
├──────────────┬──────────────────────┬───────────────┤
│ Sidebar Left │   Tabs Centrais      │ Sidebar Right │
│              │                      │               │
│ - Funil      │ ✅ HISTÓRICO (ativo) │ - Responsável │
│ - Estágio    │ □ E-MAIL             │ - Dados       │
│ - Qualif.    │ □ TAREFAS            │   Cliente     │
│ - Valores    │ □ CONTATOS           │ - Dados Oport.│
│ - Datas      │ □ PRODUTOS           │ - Dados       │
│              │ □ ARQUIVOS           │   Contato     │
└──────────────┴──────────────────────┴───────────────┘
```

**Header da Oportunidade** (topo da página):
- [ ] Botão "←" (voltar)
- [ ] Título: Nome da oportunidade (ex: "Venda JANEIRO")
- [ ] Subtítulo: Nome da empresa/origem (ex: "RD Station")
- [ ] Botão: "👍 Marcar venda" (verde)
- [ ] Botão: "👎 Marcar perda" (vermelho)
- [ ] Ícone: Engrenagem (configurações)
- [ ] Ícone: Lixeira (excluir)
- [ ] Texto: "Saldo: R$ 91,12" (canto superior direito)

**Sidebar Esquerda**:
- [ ] Funil e estágio de vendas (visual com bolinhas)
- [ ] Qualificação (5 estrelas) - "Quente"
- [ ] Valores (R$ 5,00 + R$ 5,00)
- [ ] Data de criação
- [ ] Previsão de fechamento

**Tabs Centrais**:
- [ ] Tab "HISTÓRICO DA OPORTUNIDADE" (ativa por padrão)
  - [ ] Timeline de eventos
  - [ ] Formulário: "Criar Anotação"
  - [ ] Checkboxes de filtro (Anotação, Tarefa, Email, etc.)
- [ ] Tab "E-MAIL"
  - [ ] Formulário de envio de email
  - [ ] Seletor de modelo de email
  - [ ] Editor WYSIWYG
- [ ] Tab "TAREFAS" ⭐ **NOVO** (baseado em `tarefas.png`)
  - [ ] Seção "PRÓXIMAS TAREFAS" com lista
  - [ ] Formulário "CRIAR TAREFA"
  - [ ] Ícones por tipo (Ligação, WhatsApp, Email, Reunião)
- [ ] Tab "CONTATOS"
- [ ] Tab "PRODUTOS E SERVIÇOS"
- [ ] Tab "ARQUIVOS"

**Sidebar Direita**:
- [ ] Responsável (dropdown)
- [ ] Dados da Empresa/Cliente (expansível)
- [ ] Dados da Oportunidade (expansível)
- [ ] Dados do Contato (expansível)

**Status**: Página NÃO EXISTE. Ao clicar em card do Kanban, NADA acontece.

**Ação**: Criar `src/pages/DetalheOportunidade.tsx` completo com todas as tabs.

---

#### **3. Configuração de Funis** (0% implementado)

**Baseado em**: `RD-STATION-ANALYSIS.md` linhas 586-675 + `Funil_4.png` screenshot

**Página**: `src/pages/ConfigFunis.tsx` (NÃO EXISTE!)

**Funcionalidades necessárias**:
- [ ] Lista de funis (ex: "Funil PADRÃO (Não Alterar)", "Funil Prospecção", "Funil de carteira")
- [ ] **Editor visual de etapas** (bolinhas conectadas por linha azul):
  - [ ] Círculo azul preenchido para cada etapa
  - [ ] Label: Nome da etapa (ex: "Sem contato / Lead")
  - [ ] Sigla: "Sigla: SC/L"
  - [ ] Botão "+" verde (adicionar nova etapa)
- [ ] Botão: "▷" (expandir/colapsar funil)
- [ ] Botão: "⚙️ Editar automação entre funis" (azul)
- [ ] Ícone: Lixeira (excluir funil)
- [ ] CRUD completo:
  - [ ] Criar novo funil
  - [ ] Renomear funil
  - [ ] Adicionar/Remover etapas
  - [ ] Configurar siglas
  - [ ] Deletar funil

**Status**: Página NÃO EXISTE. Impossível gerenciar múltiplos funis.

**Ação**: Criar `src/pages/ConfigFunis.tsx` com editor visual.

---

#### **4. Melhorias no Funil Kanban** (40% implementado)

**Baseado em**: `GAP-ANALYSIS.md` linhas 39-77

**Faltam**:
- [ ] **Filtros no topo** (linha horizontal):
  - [ ] Dropdown: "Funil de vendas" (selecionar funil ativo)
  - [ ] Dropdown: "Minhas oportunidades" (filtrar por usuário)
  - [ ] Dropdown: "Status da oportunidade" (Aberto, Ganho, Perdido)
  - [ ] Botão: "⟳ Recarregar"
  - [ ] Botão: "▦ Filtro ativo" (mostrar quantos filtros aplicados)
- [ ] **Cards de Oportunidade** (melhorar):
  - [ ] Qualificação com estrelas (1-5 estrelas) ⭐⭐⭐⭐⭐
  - [ ] Ícone telefone (ação rápida) 📞
  - [ ] Ícone e-mail (ação rápida) ✉️
  - [ ] Avatar do cliente (inicial)
  - [ ] Indicador de tarefas atrasadas (ícone vermelho)
- [ ] **Tooltip ao hover**:
  - [ ] Mostrar nome completo + status + próximas ações

**Status**: Kanban básico funciona, mas falta 60% das features visuais.

**Ação**: Refatorar `pages/funil-vendas.html` para adicionar filtros e melhorar cards.

---

#### **5. Sistema de Tarefas** (0% implementado)

**Baseado em**: `tarefas.png` screenshot

**Elementos necessários**:
- [ ] Tipos de tarefa: Ligação, WhatsApp, Email, Reunião
- [ ] Campos do formulário:
  - [ ] Dropdown: "Tipo" (com ícone)
  - [ ] DatePicker: "Data"
  - [ ] TimePicker: "Hora"
  - [ ] Seletor: "Responsável" (avatar + nome + email)
- [ ] Lista de tarefas:
  - [ ] Ícone por tipo
  - [ ] Título da tarefa
  - [ ] Timestamp relativo ("Hoje às 10:27")
  - [ ] Ações: Editar, Deletar, Concluir (checkmark azul)
- [ ] Integração com Timeline de Histórico
- [ ] Notificações de tarefas vencidas

**Status**: NÃO EXISTE sistema de tarefas. Não é possível criar, listar ou gerenciar.

**Ação**: Criar feature completa de tarefas (backend + frontend).

---

### ⚠️ O que FALTA (P1 - ALTA PRIORIDADE)

#### **6. CRUD Produtos** (planejado, não implementado)
- [ ] Catálogo de 50+ produtos (Som, Luz, Estruturas, Talhas)
- [ ] Categorias: som, luz, estrutura
- [ ] Campos: nome, SKU, categoria, preço (BRL/USD/EUR), descrição, imagem
- [ ] Busca + filtros

#### **7. Sistema de Cotações** (0% implementado)
- [ ] Selecionar produtos
- [ ] Calcular frete
- [ ] Gerar PDF profissional
- [ ] Enviar por email (Resend API)

#### **8. Importação Excel** (0% implementado)
- [ ] Upload .xlsx
- [ ] Validação + preview
- [ ] Import batch para Supabase

#### **9. Integrações** (0% implementado)
- [ ] Resend API (emails)
- [ ] Slack Webhook (notificações)
- [ ] Google Calendar API (eventos)

---

### ⚠️ O que FALTA (P2 - MÉDIA PRIORIDADE)

#### **10. Sistema de Pedidos** (0% implementado)
- [ ] Converter cotação em pedido
- [ ] Status: Rascunho, Confirmado, Em Produção, Despachado, Entregue
- [ ] Timeline visual

#### **11. Relatórios Gerenciais** (0% implementado)
- [ ] DRE simplificado
- [ ] Conversão por etapa
- [ ] Análise por vendedor

#### **12. Gestão de Equipamentos** (0% implementado)
- [ ] Controle de estoque
- [ ] Status: Disponível, Em Uso, Manutenção

#### **13. Calendário de Eventos** (0% implementado)
- [ ] Visualização mensal
- [ ] Sincronização Google Calendar

#### **14. Lead Scoring com IA** (0% implementado)
- [ ] Claude API
- [ ] Score 0-100
- [ ] Temperatura: 🔥 Hot / 🌡️ Warm / 🧊 Cold

---

## 🗺️ NAVEGAÇÃO E FLUXO (Baseado em RD Station)

### **Fluxo Principal: Dashboard → Funil → Detalhes**

```
Login Page
  └─► Dashboard
      ├─► Click: "Oportunidades" (menu superior)
      │   └─► Funil de Vendas (Kanban)
      │       ├─► Click: Card "Pedido Setembro"
      │       │   └─► Detalhes da Oportunidade (Tab HISTÓRICO)
      │       │       ├─► Tab: E-MAIL (enviar email)
      │       │       ├─► Tab: TAREFAS (criar/listar tarefas)
      │       │       ├─► Tab: CONTATOS (vincular contatos)
      │       │       ├─► Tab: PRODUTOS (adicionar produtos)
      │       │       └─► Tab: ARQUIVOS (upload anexos)
      │       │
      │       ├─► Drag: Card para outra coluna
      │       │   └─► Atualiza estágio
      │       │
      │       └─► Click: FAB "+" (criar nova oportunidade)
      │
      ├─► Click: "Clientes" (menu superior)
      │   └─► Lista de Clientes
      │       └─► Click: Cliente → Detalhes
      │
      ├─► Click: "Tarefas" (menu superior + badge "67")
      │   └─► Lista de Tarefas (filtros: Minhas, Todas, Atrasadas, Hoje)
      │
      └─► Click: Avatar "MB" → Dropdown
          ├─► Meu perfil
          ├─► Configurações da conta
          │   └─► Funis de vendas (ConfigFunis.tsx)
          │   └─► Usuários e permissões
          │   └─► Integrações
          └─► Sair
```

**CRÍTICO**: Atualmente o sistema NÃO TEM essa navegação! Páginas estão isoladas.

---

## 🏗️ ARQUITETURA DO PROJETO

### **Estrutura Atual (Híbrida - PROBLEMA!)**

```
stagetek-crm-system/
├── pages/                          ← HTML STANDALONE (NÃO React!)
│   ├── dashboard.html              ✅ Existe (Chart.js)
│   ├── funil-vendas.html           ✅ Existe (Vanilla JS)
│   ├── config-funis.html           ✅ Existe (Vanilla JS)
│   └── ...
├── src/                            ← REACT APP
│   ├── pages/
│   │   ├── Clientes.tsx            ✅ Existe (React)
│   │   ├── Oportunidades.tsx       ✅ Existe (React)
│   │   ├── DetalheOportunidade.tsx ❌ NÃO EXISTE!
│   │   └── ConfigFunis.tsx         ❌ NÃO EXISTE!
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   │       └── TopBar.tsx          ❌ NÃO EXISTE!
│   └── ...
└── protocol/
    ├── PRD.md                      ✅ LEIA ISSO!
    ├── RD-STATION-ANALYSIS.md      ✅ LEIA ISSO!
    ├── GAP-ANALYSIS.md             ✅ LEIA ISSO!
    └── FEATURES-PRIORITIZED.md     ✅ LEIA ISSO!
```

**PROBLEMA**: Sistema tem DOIS mundos separados (HTML + React). Navegação quebrada.

**SOLUÇÃO**: Migrar tudo para React OU manter HTML mas criar navegação unificada.

---

## 🎯 MODELO DE NEGÓCIO STAGETEK

**STAGETEK = Fabricante B2B de Equipamentos para Entretenimento**

### **3 Operações:**

1. **🏭 FABRICAÇÃO** (Principal - 60% receita)
   - Peças de aço sob medida, treliças Q30/Q40, estruturas metálicas, talhas
   - Modelo: Venda por peça (não aluguel!)
   - Mercado: Nacional (BR) + Internacional (exportação)
   - Moeda: BRL, USD, EUR

2. **🛒 REVENDA** (Secundário - 30% receita)
   - Equipamentos de som (mesas, caixas acústicas)
   - Equipamentos de luz (moving heads, pares LED)

3. **🎪 LOCAÇÃO** (Terciário - 10% receita)
   - Aluguel de equipamentos próprios para eventos
   - Gestão de disponibilidade e calendário

### **Usuários**: 5 máximo (uso interno)
### **Budget**: ZERO (Supabase Free + Vercel Free)

---

## ⚠️ STACK TECNOLÓGICA DEFINIDA

### **Frontend**
```
✅ React 18 + TypeScript
✅ Vite (build tool)
✅ Tailwind CSS 3.4 (estável)
✅ shadcn/ui (componentes base)
✅ Recharts (gráficos)
✅ React Hook Form + Zod (forms + validação)
✅ dnd-kit (drag-and-drop mobile-friendly)
✅ date-fns (datas PT-BR)
✅ Zustand (state management leve)
```

### **Backend/BaaS**
```
✅ Supabase (Free Tier):
   - PostgreSQL (500MB)
   - Auth (autenticação)
   - Storage (2GB arquivos)
   - Realtime (WebSockets)
   - Edge Functions (serverless)
```

### **Integrações**
```
✅ E-mail: Resend API (grátis 100/dia)
✅ Slack: Webhook (grátis)
✅ Google Calendar: Google Calendar API
✅ WhatsApp: WhatsApp Business API (fase 4)
✅ CNPJ/CEP: brasil-api-mcp (MCP instalado)
```

### **Deploy**
```
✅ Vercel (Free Tier)
   - Deploy automático via GitHub
   - Edge Functions
   - Preview deploys
   - SSL grátis
```

---

## ⚠️ REGRAS ABSOLUTAS - PROTOCOL NOTECRAFT™

### 1. **Limites de Linhas (RÍGIDO)**
- ✅ **Atoms**: máximo 20 linhas
- ✅ **Molecules**: máximo 35 linhas
- ✅ **Organisms**: máximo 50 linhas
- ✅ **Templates**: máximo 30 linhas
- ❌ **NUNCA** exceda esses limites

### 2. **TypeScript Strict**
```typescript
// ✅ SEMPRE tipar:
interface Client {
  id: string
  name: string
  cnpj: string
  email: string
}

// ❌ NUNCA usar any:
const data: any = fetchData() // ❌ PROIBIDO
```

### 3. **Tailwind CSS (não CSS custom)**
```tsx
// ✅ CORRETO:
<div className="px-4 py-2 bg-red-50 rounded-lg">

// ❌ ERRADO:
<div style={{ padding: '8px 16px', background: '#ffeded' }}>
```

### 4. **Mobile-First OBRIGATÓRIO**
- ✅ Tailwind responsive (sm/md/lg/xl breakpoints)
- ✅ Bottom nav bar (não sidebar lateral)
- ✅ Touch gestures (dnd-kit para drag-drop)
- ✅ Forms multi-step (não forms longos)
- ✅ Modals full-screen mobile
- ✅ Data tables → cards em mobile
- ✅ Lighthouse Score >85

---

## 🚫 O Que NUNCA Fazer

1. ❌ **Trabalhar sem consultar PRD.md e GAP-ANALYSIS.md**
2. ❌ **Fazer correções visuais sem entender o fluxo completo**
3. ❌ Componentes acima do limite de linhas
4. ❌ `any` no TypeScript
5. ❌ CSS inline (`style={{ ... }}`)
6. ❌ Cores hardcoded (`#e90101` direto, usar tokens Tailwind)
7. ❌ Emojis como ícones (usar Lucide React)
8. ❌ Forms não controlados
9. ❌ Fetch direto (usar Supabase client)
10. ❌ Commits sem mensagem clara

---

## 📋 Checklist ANTES de Codar

- [ ] Li `protocol/PRD.md` completo?
- [ ] Li `protocol/RD-STATION-ANALYSIS.md` completo?
- [ ] Li `protocol/GAP-ANALYSIS.md` completo?
- [ ] Entendo qual feature estou implementando (P0/P1/P2/P3)?
- [ ] Sei qual fluxo de navegação essa feature afeta?
- [ ] Tenho certeza que não estou duplicando código existente?
- [ ] Vou seguir limites de linhas do Protocol Notecraft™?
- [ ] Vou usar TypeScript strict?
- [ ] Vou usar Tailwind (não CSS inline)?
- [ ] É mobile-first?

---

## 🗓️ ROADMAP ATUALIZADO (Baseado em RICE Score)

### **Sprint 0: Blockers Críticos** ⏰ 1-2 semanas (ATUAL)
**Objetivo**: Resolver débitos técnicos que bloqueiam P0.5

```
Semana 1-2 (10-14 dias):
├─ RLS Policies completas (INSERT/UPDATE/DELETE) - 5 dias
├─ Storage policies (bucket PDFs) - 2 dias
├─ Tabela activity_log + triggers - 2 dias
├─ Documentação (USER-STORIES, TECH-DEBT, VALUE-PROP) - 1 dia
└─ Commit reorganização de arquivos + push GitHub - 1 dia
```

**Entregáveis**:
- ✅ Zero vulnerabilidades de segurança
- ✅ LGPD compliance básico
- ✅ Documentação de produto estruturada
- ✅ Technical debt visível e gerenciado

---

### **Sprint 1: Cotação MVP (P0.5)** ⏰ 2-3 semanas
**Objetivo**: Entregar o "momento wow" - cotação em 2-3 cliques

```
Semana 3-5 (14-21 dias):
├─ Database: products + quotations + seed 50 itens - 3 dias
├─ Frontend: /produtos (listagem, busca, filtros) - 3 dias
├─ Frontend: /oportunidades/:id/cotacao/nova - 4 dias
├─ PDF Generation (react-pdf) - 4 dias
├─ Email Integration (Resend) - 2 dias
├─ Testes E2E (Playwright) - 2 dias
└─ Refinamentos + bug fixes - 3 dias
```

**Entregáveis**:
- ✅ Catálogo 50+ produtos navegável
- ✅ Cotação completa em <5min
- ✅ PDF profissional gerado
- ✅ Email enviado automaticamente
- ✅ 90% adoção (vendedores usam vs planilha)

**RICE Score**: 15.0 (maior impacto)

---

### **Sprint 2: Detalhes Oportunidade + UX** ⏰ 2-3 semanas
**Objetivo**: Navegação completa e visibilidade do pipeline

```
Semana 6-8 (14-21 dias):
├─ Layout 3 colunas (Sidebar Left | Tabs | Sidebar Right) - 4 dias
├─ Tab Histórico (timeline + anotações) - 3 dias
├─ Tab Tarefas (criar, listar, notificar) - 4 dias
├─ Tab Contatos (vincular contatos) - 2 dias
├─ Migrar Kanban HTML → React - 3 dias
├─ Melhorias UX (estrelas, avatars, filtros) - 3 dias
└─ Testes E2E + refinamentos - 2 dias
```

**Entregáveis**:
- ✅ Navegação: Clique em card → detalhes
- ✅ Sistema de tarefas funcional
- ✅ Funil Kanban em React (drag-and-drop)
- ✅ Timeline completa de atividades

**RICE Scores**: Detalhes (14.0), Tarefas (10.5)

---

### **Sprint 3: Relatórios + Integrações** ⏰ 2 semanas
**Objetivo**: Dados para decisão e automação

```
Semana 9-10 (10-14 dias):
├─ Dashboard conversão por etapa - 3 dias
├─ Relatório motivos de perda - 2 dias
├─ Integração Slack (webhook) - 2 dias
├─ Configuração de Funis (editor visual) - 4 dias
├─ Beta testing (2 vendedores) - 2 dias
└─ Ajustes baseados em feedback - 2 dias
```

**Entregáveis**:
- ✅ KPIs: velocidade proposta, conversão, perdas
- ✅ Notificações Slack (proposta enviada, deal ganho)
- ✅ Editor de funis (criar/editar etapas)
- ✅ Beta validado por usuários reais

**RICE Score**: Config Funis (13.5), Relatórios (4.8)

---

### **Sprint 4: Go-Live MVP** ⏰ 1 semana
**Objetivo**: Rollout completo com treinamento

```
Semana 11 (5-7 dias):
├─ Ajustes finais (bugs críticos) - 2 dias
├─ Treinamento time comercial (5 pessoas) - 1 dia
├─ Monitoramento (Sentry setup) - 1 dia
├─ Documentação usuário final - 1 dia
└─ Go-live produção - 1 dia
```

**Entregáveis**:
- ✅ MVP funcional em produção
- ✅ Time treinado e usando
- ✅ Monitoramento ativo
- ✅ Documentação completa

---

### **Timeline Total**: 10-11 semanas (~70-75 dias)

**Marcos**:
- ✅ **Dia 14**: Blockers resolvidos, segurança OK
- ✅ **Dia 35**: Cotação MVP funcionando (momento wow)
- ✅ **Dia 56**: Navegação completa + tarefas
- ✅ **Dia 70**: Relatórios + integrações
- ✅ **Dia 77**: **GO-LIVE MVP**

**Buffer**: 2 semanas (imprevistos, scope pequeno)
**Deadline realista**: **90 dias** (12-13 semanas)

---

## 📚 Referências Obrigatórias

### **Documentação de Produto**
- `/protocol/PRD.md` - Product Requirements Document (995 linhas)
- `/protocol/RD-STATION-ANALYSIS.md` - Análise de telas (1200 linhas)
- `/protocol/GAP-ANALYSIS.md` - Gap analysis (556 linhas)
- `/protocol/FEATURES-PRIORITIZED.md` - Priorização

### **Documentação Técnica**
- `/protocol/PROTOCOL-NOTECRAFT.md` - Atomic Design rules
- `/protocol/BRANDING-STANDARDS.md` - STAGETEK brand
- `/protocol/ARCHITECTURE.md` - System architecture

### **Screenshots de Referência**
- `Tela funil_RDStation_1.png` - Kanban básico
- `tela funil 2.png` - Kanban completo com top bar
- `Funil_RD 3.png` - Kanban com tooltip hover
- `Funil_4.png` - Configuração de funis
- `tela oportunidade.png` - Detalhes da oportunidade
- `tarefas.png` - Tab Tarefas
- `produtos e serviços.png` - Tab Produtos
- `emails.png` - Tab E-mail
- `modelos de e-mail.png` - Modal de templates

---

## 💡 Padrões de Código

### **Nomenclatura:**
```typescript
// Files: PascalCase
ClientCard.tsx
useAuth.ts

// Components: PascalCase
export const ClientCard: React.FC<ClientCardProps> = ({ ... }) => {}

// Functions: camelCase
const calculateTotal = (items: Item[]) => {}

// Constants: UPPER_SNAKE_CASE
const MAX_UPLOAD_SIZE = 5 * 1024 * 1024 // 5MB

// Types/Interfaces: PascalCase
interface ClientCardProps { ... }
type Status = 'active' | 'inactive'
```

### **Imports:**
```typescript
// Ordem:
import React from 'react'                    // 1. React
import { useQuery } from '@tanstack/react-query' // 2. External libs
import { supabase } from '@/lib/supabase'   // 3. Internal libs
import { Button } from '@/components/atoms' // 4. Components
import type { Client } from '@/types'       // 5. Types
```

---

## 📊 Resumo Estatístico

### **Features por Prioridade**
| Prioridade | Features | Status |
|------------|----------|--------|
| **P0** | 5 features | 40% completo |
| **P1** | 6 features | 0% completo |
| **P2** | 6 features | 0% completo |
| **P3** | 3 features | 0% completo |

### **Tempo Estimado (P0 Completo)**
- TopBar + Navegação: 1 semana
- Detalhes Oportunidade: 2 semanas
- Configuração Funis: 1 semana
- Melhorias Kanban: 1 semana
- **Total P0**: 5 semanas

---

## 🔧 Comandos Úteis

```bash
# Dev server (React)
npm run dev

# Dev server (HTML pages)
# Abrir pages/*.html diretamente no browser

# Build produção
npm run build

# Storybook (componentes)
npm run storybook

# Deploy Vercel
vercel --prod
```

---

## 🏆 Meta de Qualidade

- **100%** Protocol Notecraft™ compliance
- **100%** TypeScript (zero `any`)
- **>85** Lighthouse Score (mobile)
- **<500KB** bundle size (gzipped)
- **>95%** responsividade mobile
- **100%** dark mode support
- **100%** baseado em PRD.md e RD-STATION-ANALYSIS.md

---

## 🎯 OKRs Q1 2026 (MVP - 90 dias)

### **Objective 1**: Reduzir tempo de resposta comercial em 80%
- **KR1**: Tempo médio lead→cotação < 30min (baseline: 2h) ⏱️
- **KR2**: 80% das cotações enviadas em <24h 📧
- **KR3**: NPS vendedores ≥ 8/10 ⭐

### **Objective 2**: Aumentar visibilidade do pipeline
- **KR1**: 100% das oportunidades no CRM (vs 40% em planilha) 📊
- **KR2**: Dashboard de conversão atualizado diariamente 📈
- **KR3**: Taxa de uso ≥ 90% (4/5 vendedores ativos) 👥

### **Objective 3**: Estabilidade e segurança
- **KR1**: Zero incidentes de perda de dados 🔒
- **KR2**: 99% uptime (Supabase + Vercel) ⚡
- **KR3**: RLS policies 100% completas (LGPD compliance) ✅

**Métrica North Star**: **Velocidade de proposta** (tempo lead→cotação enviada)

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**

**Última atualização**: 13 de Outubro de 2025

---

## 🚨 LEMBRETE FINAL

**ANTES DE FAZER QUALQUER ALTERAÇÃO:**

1. Leia `protocol/PRD.md` completo
2. Leia `protocol/RD-STATION-ANALYSIS.md` completo
3. Leia `protocol/GAP-ANALYSIS.md` completo
4. Entenda qual feature você está implementando
5. Verifique se não está duplicando código
6. Siga rigorosamente o Protocol Notecraft™

**NÃO FAÇA CORREÇÕES VISUAIS SEM ENTENDER O FLUXO COMPLETO.**
**NÃO TRABALHE SEM CONSULTAR A DOCUMENTAÇÃO.**

Isso é um projeto REAL com requisitos ESPECÍFICOS. Sua responsabilidade é implementar EXATAMENTE o que está documentado, não "melhorar" sem contexto.
