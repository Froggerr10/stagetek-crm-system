a extensão superdesign# STAGETEK CRM - Roadmap em Fases
**Protocol Notecraft™ Implementation Strategy**

---

## 📅 Timeline Overview

```
FASE 1: Setup + MVP         → 2 semanas   (15 dias úteis)
FASE 2: Core CRM            → 6 semanas   (42 dias úteis)
FASE 3: Advanced Features   → 4 semanas   (28 dias úteis)
FASE 4: Integrações         → 3 semanas   (21 dias úteis)
FASE 5: AI Features         → 4 semanas   (28 dias úteis)
FASE 6: AI Advanced         → 3 semanas   (21 dias úteis)
─────────────────────────────────────────────────────────
TOTAL: 22 semanas (~5.5 meses ou 155 dias úteis)
```

---

## 🚀 FASE 1: Setup + MVP Mínimo
**Duração**: 2 semanas (10 dias úteis)
**Objetivo**: Projeto configurado + primeira tela funcional

### Tarefas
- [ ] Setup do projeto (Vite + React + TypeScript + Tailwind)
- [ ] Configurar Supabase (projeto, database, auth)
- [ ] Implementar design system base (Protocol Notecraft™)
- [ ] Criar componentes atoms/molecules básicos
- [ ] Implementar autenticação (login/logout)
- [ ] Landing page responsiva
- [ ] Deploy inicial Vercel

### Entregas
- ✅ Repo configurado no GitHub
- ✅ CI/CD funcionando (Vercel)
- ✅ Login/logout funcional
- ✅ Design system documentado
- ✅ 10+ componentes atoms/molecules
- ✅ Mobile responsivo (testado iOS + Android)

### Riscos
- **Baixo**: Tecnologias maduras e bem documentadas

---

## 💼 FASE 2: Core CRM (P0 Features)
**Duração**: 6 semanas (42 dias úteis)
**Objetivo**: CRM funcional para operação básica de vendas

### Semana 1-2: CRUD Clientes + Dashboard
- [ ] Schema Supabase (tabela clientes)
- [ ] CRUD completo de clientes B2B
- [ ] Listagem com filtros e busca
- [ ] Modal de cadastro/edição
- [ ] Dashboard com métricas básicas (4 stat cards)
- [ ] Gráficos Chart.js/Recharts
- [ ] Mobile: Lista touch-friendly, formulários otimizados

**Entregas**:
- ✅ CRUD Clientes 100% funcional
- ✅ Dashboard com métricas realtime
- ✅ Testes mobile (gestures, forms)

---

### Semana 3-4: CRUD Oportunidades + Funil de Vendas
- [ ] Schema Supabase (tabela oportunidades)
- [ ] CRUD de oportunidades
- [ ] Funil Kanban com 5 estágios
- [ ] Drag-and-drop com dnd-kit
- [ ] Filtros (por cliente, por valor, por data)
- [ ] Modal de detalhes da oportunidade
- [ ] Mobile: Touch gestures, swipe entre colunas

**Entregas**:
- ✅ Funil visual funcional
- ✅ Drag-and-drop mobile testado
- ✅ Cálculo automático de métricas (conversão, pipeline)

---

### Semana 5-6: CRUD Produtos + Importação Excel
- [ ] Schema Supabase (tabela produtos)
- [ ] CRUD de produtos (Som, Luz, Talhas, Peças)
- [ ] Categorização e filtros
- [ ] Upload de imagens (Supabase Storage)
- [ ] Importação Excel (react-excel-renderer ou xlsx)
- [ ] Validação de dados importados
- [ ] Mobile: Grid/lista alternável

**Entregas**:
- ✅ Catálogo de 50+ produtos mockados
- ✅ Importação Excel funcional
- ✅ Preview e validação antes de salvar

---

## 📄 FASE 3: Advanced Features (P1 - Parte 1)
**Duração**: 4 semanas (28 dias úteis)
**Objetivo**: Sistema de cotações e pedidos

### Semana 1-2: Sistema de Cotações
- [ ] Schema Supabase (tabela cotacoes)
- [ ] Criar cotação (selecionar produtos, quantidades)
- [ ] Calcular frete (API dos Correios ou tabela fixa)
- [ ] Aplicar descontos
- [ ] Gerar PDF (react-pdf ou jsPDF)
- [ ] Armazenar PDF no Supabase Storage
- [ ] Enviar preview por email (via Vercel Edge Function)
- [ ] Mobile: Form multi-step, preview em modal

**Entregas**:
- ✅ Cotação completa com cálculos
- ✅ PDF gerado automaticamente
- ✅ Preview mobile otimizado

---

### Semana 3-4: Sistema de Pedidos
- [ ] Schema Supabase (tabela pedidos)
- [ ] Converter cotação aprovada em pedido
- [ ] Status tracking (pendente, produção, enviado, entregue)
- [ ] Timeline de pedido
- [ ] Notificações de mudança de status
- [ ] Histórico de pedidos por cliente
- [ ] Mobile: Timeline scrollável, status badges

**Entregas**:
- ✅ Conversão cotação → pedido automática
- ✅ Tracking de status
- ✅ Histórico completo

---

## 🔗 FASE 4: Integrações (P1 + P2)
**Duração**: 3 semanas (21 dias úteis)
**Objetivo**: Conectar com ferramentas externas

### Semana 1: Integração Gmail (via Rube MCP)
- [ ] Configurar Rube MCP SDK
- [ ] Endpoint: Enviar cotação por email
- [ ] Template HTML de email profissional
- [ ] Anexar PDF automaticamente
- [ ] Log de emails enviados (tabela email_logs)
- [ ] Mobile: Trigger envio, visualizar status

**Entregas**:
- ✅ Email enviado automaticamente ao criar cotação
- ✅ Template profissional STAGETEK
- ✅ PDFs anexados corretamente

---

### Semana 2: Integração WhatsApp + Slack
- [ ] **WhatsApp** (via Rube MCP):
  - [ ] Enviar mensagem de follow-up
  - [ ] Notificar cliente sobre cotação pronta
  - [ ] Link para visualizar cotação
- [ ] **Slack** (via Rube MCP):
  - [ ] Canal #vendas: nova oportunidade
  - [ ] Canal #vendas: deal fechado
  - [ ] Canal #alertas: oportunidade parada >7 dias
- [ ] Mobile: Notificações push (PWA)

**Entregas**:
- ✅ WhatsApp enviando mensagens
- ✅ Slack notificando equipe
- ✅ Logs de integrações

---

### Semana 3: Calendário + Google Calendar
- [ ] Schema Supabase (tabela eventos)
- [ ] Calendário mensal (react-big-calendar ou custom)
- [ ] Criar evento vinculado a oportunidade
- [ ] Sincronizar com Google Calendar (via Rube MCP)
- [ ] View: mês, semana, dia
- [ ] Mobile: Calendário touch-friendly

**Entregas**:
- ✅ Calendário visual funcional
- ✅ Sincronização Google Calendar
- ✅ Mobile: swipe entre dias/semanas

---

## 🤖 FASE 5: AI Features Básicas (P2 + P3)
**Duração**: 4 semanas (28 dias úteis)
**Objetivo**: Automação com inteligência artificial

### Semana 1-2: Lead Scoring Automático
- [ ] Schema Supabase (tabela lead_scoring)
- [ ] Definir critérios de score (7 fatores):
  - [ ] Tamanho do deal (20 pts)
  - [ ] Nível de engagement (15 pts)
  - [ ] Tempo de resposta (10 pts)
  - [ ] Histórico de compras (20 pts)
  - [ ] Fit ICP (15 pts)
  - [ ] Urgência/timeline (10 pts)
  - [ ] Budget confirmado (10 pts)
- [ ] Integração Claude API para análise qualitativa
- [ ] Calcular score automaticamente ao criar/atualizar oportunidade
- [ ] Dashboard de leads ordenados por score
- [ ] Mobile: Badge de score, ordenação

**Entregas**:
- ✅ Score 0-100 calculado automaticamente
- ✅ Dashboard de leads priorizados
- ✅ Análise IA de fit qualitativo

---

### Semana 3-4: Relatórios Gerenciais
- [ ] Relatório: Conversão por etapa do funil
- [ ] Relatório: Motivos de perda (top 5)
- [ ] Relatório: DRE simplificado (receita, custos, margem)
- [ ] Relatório: Performance por vendedor
- [ ] Filtros: período, cliente, produto
- [ ] Exportar para Excel/PDF
- [ ] Mobile: Gráficos responsivos, scroll horizontal

**Entregas**:
- ✅ 4 relatórios gerenciais funcionais
- ✅ Exportação Excel/PDF
- ✅ Mobile otimizado

---

## 🧠 FASE 6: AI Advanced (P3)
**Duração**: 3 semanas (21 dias úteis)
**Objetivo**: IA avançada para automação de vendas

### Semana 1: AI SDR - Qualificação Automática
- [ ] Fluxo conversacional com Claude API
- [ ] Integração WhatsApp para receber mensagens
- [ ] Bot responde perguntas básicas sobre produtos
- [ ] Bot coleta informações BANT (Budget, Authority, Need, Timeline)
- [ ] Bot agenda reunião (via Google Calendar)
- [ ] Bot cria oportunidade automaticamente no CRM
- [ ] Escalar para humano quando necessário
- [ ] Dashboard de conversas ativas
- [ ] Mobile: Interface de chat, notificações

**Entregas**:
- ✅ Bot WhatsApp 24/7 funcional
- ✅ Conversas qualificando leads
- ✅ Oportunidades criadas automaticamente

**Desafios**:
- Contexto de conversa longa (múltiplas mensagens)
- Custo de API Claude (otimizar prompts)
- LGPD: consentimento para conversas automatizadas

---

### Semana 2-3: Call Recording + AI Analysis
- [ ] Schema Supabase (tabela call_recordings)
- [ ] Upload de áudio de ligação (via interface ou softphone)
- [ ] Transcrição com Whisper API ou Deepgram
- [ ] Análise com Claude API:
  - [ ] Sentimento do cliente (positivo, neutro, negativo)
  - [ ] Objeções identificadas
  - [ ] Gatilhos de compra mencionados
  - [ ] Score de performance do vendedor (0-100)
  - [ ] Insights de coaching
- [ ] Dashboard de calls com filtros
- [ ] Player de áudio + transcrição lado a lado
- [ ] Mobile: Player touch-friendly, transcrição scrollável

**Entregas**:
- ✅ Call recording + upload funcional
- ✅ Transcrição automática PT-BR
- ✅ Análise IA com insights
- ✅ Dashboard de performance

**Desafios**:
- **Compliance LGPD**: Consentimento de gravação obrigatório
- **Storage**: Áudios podem ocupar muito espaço (compressão necessária)
- **Custo**: Whisper $0.006/min, Deepgram $0.0043/min
- **Latência**: Transcrição pode levar 30s-2min

---

## 🧪 FASE 7: Polish + Otimização (Opcional)
**Duração**: 2 semanas (14 dias úteis)
**Objetivo**: Performance, testes, documentação

### Tarefas
- [ ] Testes E2E com Playwright
- [ ] Testes unitários (coverage >80%)
- [ ] Otimização de bundle size (code splitting)
- [ ] Lazy loading de rotas
- [ ] Lighthouse score >90
- [ ] Documentação técnica
- [ ] Documentação de usuário
- [ ] Treinamento da equipe (5 usuários)

---

## 📊 Cronograma Visual

```
Outubro 2025
├── Semana 1-2: FASE 1 (Setup + MVP)
├── Semana 3-4: FASE 2.1 (Clientes + Dashboard)
│
Novembro 2025
├── Semana 1-2: FASE 2.2 (Oportunidades + Funil)
├── Semana 3-4: FASE 2.3 (Produtos + Excel Import)
│
Dezembro 2025
├── Semana 1-2: FASE 3.1 (Sistema Cotações)
├── Semana 3-4: FASE 3.2 (Sistema Pedidos)
│
Janeiro 2026
├── Semana 1: FASE 4.1 (Integração Gmail)
├── Semana 2: FASE 4.2 (WhatsApp + Slack)
├── Semana 3: FASE 4.3 (Calendário)
│
Fevereiro 2026
├── Semana 1-2: FASE 5.1 (Lead Scoring)
├── Semana 3-4: FASE 5.2 (Relatórios)
│
Março 2026
├── Semana 1: FASE 6.1 (AI SDR)
├── Semana 2-3: FASE 6.2 (Call Recording + AI)
│
Abril 2026 (Opcional)
├── Semana 1-2: FASE 7 (Polish + Otimização)
```

---

## 🎯 Milestones Críticos

### Milestone 1: MVP Funcional (Fim FASE 2)
**Data**: ~Fim de Novembro 2025 (8 semanas)
**Critério de Sucesso**:
- [ ] Login funcional
- [ ] CRUD Clientes completo
- [ ] CRUD Oportunidades completo
- [ ] Funil visual drag-and-drop
- [ ] CRUD Produtos completo
- [ ] Dashboard com métricas
- [ ] Mobile 100% funcional

**Decisão**: Go/No-go para features avançadas

---

### Milestone 2: CRM Completo (Fim FASE 4)
**Data**: ~Fim de Janeiro 2026 (15 semanas)
**Critério de Sucesso**:
- [ ] Sistema de cotações funcional
- [ ] Sistema de pedidos funcional
- [ ] Gmail enviando propostas
- [ ] WhatsApp notificando clientes
- [ ] Slack notificando equipe
- [ ] Calendário sincronizado
- [ ] 5 usuários usando diariamente

**Decisão**: Go/No-go para IA

---

### Milestone 3: AI Ready (Fim FASE 6)
**Data**: ~Fim de Março 2026 (22 semanas)
**Critério de Sucesso**:
- [ ] Lead Scoring ativo
- [ ] Relatórios gerenciais em uso
- [ ] AI SDR qualificando leads
- [ ] Call Recording + análise funcionando
- [ ] ROI positivo (tempo economizado vs. custo APIs)

**Decisão**: Escalar ou manter

---

## ⚠️ Riscos e Mitigações

### Risco 1: Complexidade Mobile
**Probabilidade**: ALTA
**Impacto**: ALTO
**Mitigação**:
- Testar mobile desde FASE 1
- Usar PWA (não React Native)
- Touch gestures testados em devices reais

---

### Risco 2: Custos de API IA
**Probabilidade**: MÉDIA
**Impacto**: ALTO
**Mitigação**:
- Começar com tier free Claude
- Implementar cache agressivo
- Limitar chamadas de IA (rate limiting)
- Monitorar custos semanalmente

---

### Risco 3: Integrações Rube MCP
**Probabilidade**: MÉDIA
**Impacto**: MÉDIO
**Mitigação**:
- Ter fallback sem Rube (envio manual)
- Documentação Rube detalhada
- Suporte Rube antes de começar FASE 4

---

### Risco 4: Compliance LGPD (Call Recording)
**Probabilidade**: BAIXA
**Impacto**: MUITO ALTO
**Mitigação**:
- Consentimento explícito antes de gravar
- Aviso sonoro "Esta ligação será gravada"
- Termo de aceite no CRM
- Consultar jurídico antes de lançar

---

### Risco 5: 1 Desenvolvedor (Burnout)
**Probabilidade**: MÉDIA
**Impacto**: ALTO
**Mitigação**:
- Roadmap realista (não super otimista)
- Sprints de 2 semanas (não 1 semana)
- Buffer de 20% em cada fase
- Priorizar P0 e P1 (pular P3 se necessário)

---

## 🏁 Definição de Pronto (DoD)

Cada feature só é considerada PRONTA quando:

- [ ] Código commitado e em produção (Vercel)
- [ ] Testes unitários escritos (mínimo happy path)
- [ ] Testado em mobile (iOS Safari + Android Chrome)
- [ ] Documentação técnica atualizada
- [ ] Protocol Notecraft™ compliance (componentes ≤50 linhas)
- [ ] Dark mode funcionando
- [ ] Sem console.errors
- [ ] Performance: Lighthouse >80

---

## 📈 KPIs de Sucesso

### Técnicos
- Uptime: >99.5%
- Lighthouse Score: >90
- Bundle Size: <500KB (gzipped)
- First Contentful Paint: <1.5s
- Time to Interactive: <3s

### Negócio (pós FASE 2)
- 5 usuários ativos diários
- 100+ clientes cadastrados
- 50+ oportunidades no funil
- 20+ cotações enviadas
- 10+ pedidos fechados

### AI (pós FASE 6)
- Lead Scoring: 80%+ precisão
- AI SDR: 50%+ leads qualificados sem intervenção humana
- Call Analysis: 100% calls transcritas em <2min

---

## 🔄 Metodologia de Trabalho

### Sprints de 2 Semanas
- Segunda: Planning (definir features da sprint)
- Terça-Sexta: Desenvolvimento
- Segunda-Sexta: Desenvolvimento
- Sexta: Review + Deploy + Retrospectiva

### Daily Workflow
- 30min: Revisar PRs/Issues
- 6h: Desenvolvimento focado
- 30min: Documentação
- 30min: Testes mobile

### Code Review Solo
- Usar Claude Code para revisar próprio código
- Checklist Protocol Notecraft™
- Lighthouse CI automático

---

**Built with Protocol Notecraft™**
**STAGETEK Engineering Team**
**Data**: 01 de Outubro de 2025
