# Epic 6: Integração Omie ERP

**Epic ID**: EPIC-006
**Status**: 🔵 Backlog (Implementação Futura)
**Priority**: 🟡 P1 - High (Post-MVP)
**RICE Score**: 12.0 (Reach: 5 | Impact: 8.0 | Confidence: 90% | Effort: 14 days)

---

## 📊 Sumário Executivo

### Contexto
O STAGETEK CRM gerencia o processo comercial (oportunidades, cotações), mas **não integra com o sistema ERP** onde são gerenciados clientes, produtos, pedidos e faturamento. Isso gera **dupla digitação** e risco de dessincronia de dados.

O **Omie ERP** é um sistema ERP brasileiro líder de mercado com API REST completa que permite integração bidirecional com CRMs.

### Objetivo
Criar integração bidirecional entre STAGETEK CRM e Omie ERP para:
- **Eliminar dupla digitação** de clientes, produtos e pedidos
- **Automatizar fluxo comercial → faturamento** (cotação aprovada → pedido Omie → NF-e)
- **Sincronizar oportunidades CRM** com módulo CRM do Omie
- **Centralizar catálogo de produtos** (Omie como source of truth)

### Impacto no Negócio
- ⏱️ **Economia de tempo**: 2h/dia por vendedor (5 usuários) = 10h/dia totais
- 📉 **Redução de erros**: Elimina 100% de erros de transcrição manual
- 🚀 **Automação NF-e**: Cotações viram NF-e automáticas (compliance fiscal)
- 📊 **BI unificado**: Dados de CRM + ERP em um único lugar

### Análise de Viabilidade
✅ **Viabilidade Técnica**: ALTA - API REST bem documentada, endpoints para todas entidades
✅ **Compatibilidade**: 95-100% entre STAGETEK e Omie (mapeamento direto)
✅ **Esforço**: 14 dias (2.8 semanas, 1 dev)
✅ **ROI**: Payback em ~2 semanas após implementação

📄 **Documento Completo**: [docs/architecture/omie-integration-feasibility.md](../architecture/omie-integration-feasibility.md)

---

## 🎯 Objetivos de Negócio

### Problemas Atuais

**Problema 1: Dupla Digitação**
- Vendedor cadastra cliente no CRM
- Financeiro recadastra mesmo cliente no Omie
- Produtos são mantidos em ambos os sistemas
- **Impacto**: 2h/dia de trabalho redundante

**Problema 2: Dessincronia de Dados**
- Cliente atualiza CNPJ no Omie
- CRM fica com dados desatualizados
- Cotações enviadas para email errado
- **Impacto**: Comunicação falha, perda de vendas

**Problema 3: Fluxo Manual de Faturamento**
- Cotação aprovada no CRM
- Financeiro digita pedido manualmente no Omie
- Omie gera NF-e
- **Impacto**: Delay de 1-3 dias entre aprovação e emissão NF-e

### Solução Proposta

**Sincronização Automática**:
1. **Clientes**: Omie → STAGETEK (unidirecional)
2. **Produtos**: Omie → STAGETEK (unidirecional, Omie é master)
3. **Oportunidades**: STAGETEK ↔ Omie (bidirecional, CRM duplo)
4. **Cotações → Pedidos**: STAGETEK → Omie (automático ao aprovar)

**Fluxo Ideal**:
```
Vendedor cria cotação no STAGETEK
   ↓
Cliente aprova cotação
   ↓
[AUTOMÁTICO] Cotação → Pedido no Omie
   ↓
[AUTOMÁTICO] Omie gera NF-e
   ↓
[AUTOMÁTICO] Email com NF-e enviado ao cliente
```

### Métricas de Sucesso

**Curto Prazo (1 mês)**:
- ✅ 100% dos clientes sincronizados entre sistemas
- ✅ 0 erros de dessincronia reportados
- ✅ 80% de redução em tempo de cadastro

**Médio Prazo (3 meses)**:
- ✅ 100% das cotações aprovadas viram pedidos Omie automaticamente
- ✅ Delay aprovação → NF-e reduzido de 1-3 dias para <1 hora
- ✅ 90% de satisfação dos usuários com integração

**Longo Prazo (6+ meses)**:
- ✅ 10h/dia de trabalho manual economizado
- ✅ Dashboard BI unificado (CRM + ERP)
- ✅ ROI de 500% sobre investimento em desenvolvimento

---

## 📋 User Stories (4 Fases = 4 Stories)

### Story 6.1: Sincronização Básica (Clientes + Produtos) - MVP
**Gap ID**: N/A (Nova feature)
**Status**: ⏳ Backlog
**Estimativa**: 1 semana (5 dias)
**Priority**: 🔴 P0 (Fase 1)
**RICE Score**: 12.0

**User Story**:
> Como vendedor, quero que clientes e produtos do Omie sincronizem automaticamente com o CRM, para eliminar dupla digitação.

**Acceptance Criteria**:
1. Botão "Sincronizar com Omie" na página `/clientes`
2. Clientes do Omie são importados para `clients` table
3. Produtos do Omie são importados para `products` table
4. Tabela `omie_sync_map` mapeia IDs entre sistemas
5. Toast mostra "X clientes sincronizados com sucesso"
6. Sync é incremental (apenas novos/modificados desde último sync)

**Dependencies**:
- Credenciais Omie API (App Key + Secret)
- Supabase Edge Function para comunicação com Omie
- Nova tabela `omie_sync_map`

**Technical Notes**:
- Usar polling (não webhook) para MVP
- Sync unidirecional: Omie → STAGETEK
- Omie é source of truth para clientes e produtos

---

### Story 6.2: Sincronização Automática (Cron Job)
**Gap ID**: N/A (Nova feature)
**Status**: ⏳ Backlog
**Estimativa**: 1 semana (5 dias)
**Priority**: 🟡 P1 (Fase 2)
**RICE Score**: 14.875

**User Story**:
> Como administrador, quero que sincronização aconteça automaticamente a cada 15 minutos, para dados sempre atualizados sem intervenção manual.

**Acceptance Criteria**:
1. Supabase Edge Function roda via cron job (15 min)
2. Dashboard mostra "Última sincronização: X minutos atrás"
3. Erros de sync geram alerta no Slack
4. Retry automático em caso de falha (3 tentativas)
5. Log completo em tabela `omie_sync_log`

**Dependencies**:
- Story 6.1 completa
- Supabase Cron (ou similar scheduler)
- Webhook Slack configurado

---

### Story 6.3: Cotações → Pedidos Automáticos
**Gap ID**: N/A (Nova feature)
**Status**: ⏳ Backlog
**Estimativa**: 1 semana (5 dias)
**Priority**: 🟡 P1 (Fase 3)
**RICE Score**: 10.0

**User Story**:
> Como vendedor, quando aprovar uma cotação no CRM, quero que um pedido seja criado automaticamente no Omie com NF-e, para eliminar trabalho manual do financeiro.

**Acceptance Criteria**:
1. Cotação com `status = 'accepted'` → trigger automático
2. Edge Function cria pedido no Omie via API `/produtos/pedido/`
3. Omie gera NF-e automaticamente
4. Email com NF-e anexada é enviado ao cliente
5. Timeline da oportunidade registra "Pedido #123 criado no Omie"
6. Link para visualizar pedido no Omie (deep link)

**Dependencies**:
- Story 6.1 completa (produtos sincronizados)
- Resend API configurada
- Omie configurado para gerar NF-e automática

**Technical Notes**:
- Usar endpoint Omie: `IncluirPedido`
- Mapeamento: `quotation.items` → `pedido.det[]`
- Converter moedas para BRL antes de enviar

---

### Story 6.4: Sincronização Bidirecional (Oportunidades CRM)
**Gap ID**: N/A (Nova feature)
**Status**: ⏳ Backlog
**Estimativa**: 1 semana (5 dias)
**Priority**: 🟢 P2 (Fase 4)
**RICE Score**: 6.75

**User Story**:
> Como vendedor, quero que oportunidades criadas no CRM apareçam no Omie (e vice-versa), para usar qualquer sistema e manter dados sincronizados.

**Acceptance Criteria**:
1. Oportunidade criada no STAGETEK → cria no Omie CRM
2. Oportunidade criada no Omie → cria no STAGETEK
3. Mudança de etapa em qualquer sistema → sincroniza no outro
4. Conflict resolution: last-write-wins
5. Log de conflitos em tabela `omie_sync_conflicts`

**Dependencies**:
- Story 6.2 completa (sync automático)
- Mapeamento de funis/etapas entre sistemas

**Technical Notes**:
- Usar endpoint Omie: `/crm/oportunidades/`
- Bidirecional = complexidade alta (race conditions)
- Validar com testes de conflito

---

## 🏗️ Arquitetura Técnica

### Componentes Necessários

#### 1. Database Schema

**Nova Tabela: `omie_sync_map`**
```sql
CREATE TABLE omie_sync_map (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type VARCHAR(50) NOT NULL,  -- 'client', 'product', 'opportunity'
  stagetek_id UUID NOT NULL,
  omie_id BIGINT NOT NULL,
  omie_codigo VARCHAR(50),
  last_synced_at TIMESTAMPTZ,
  sync_direction VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(entity_type, stagetek_id),
  UNIQUE(entity_type, omie_id)
);
```

**Nova Tabela: `omie_sync_log`**
```sql
CREATE TABLE omie_sync_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type VARCHAR(50) NOT NULL,
  sync_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL,
  records_synced INTEGER,
  records_failed INTEGER,
  error_details JSONB,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  finished_at TIMESTAMPTZ
);
```

#### 2. Supabase Edge Functions

**Function: `omie-sync-clients`**
- Endpoint: `POST /functions/v1/omie-sync-clients`
- Input: `{ manual: boolean }`
- Output: `{ success: true, synced: 42 }`
- Lógica:
  1. Busca `last_sync_timestamp` no `omie_sync_log`
  2. Chama Omie API: `ListarClientes({ data_de: timestamp })`
  3. Para cada cliente: INSERT ou UPDATE em `clients`
  4. Atualiza `omie_sync_map` com mapeamento IDs
  5. Registra em `omie_sync_log`

**Function: `omie-sync-products`** (similar à anterior)

**Function: `omie-create-order`**
- Trigger: Cotação muda para `status = 'accepted'`
- Lógica:
  1. Busca produtos vinculados em `quotation.items`
  2. Mapeia para formato Omie: `pedido.det[]`
  3. Chama Omie API: `IncluirPedido`
  4. Salva `omie_id` do pedido em `quotations.omie_order_id`
  5. Registra no Timeline

#### 3. Frontend Components

**Component: `OmieSyncButton.tsx`** (atom)
- Botão "Sincronizar com Omie"
- Loading state durante sync
- Toast com resultado

**Component: `OmieSyncDashboard.tsx`** (organism)
- Última sincronização (timestamp)
- Total sincronizado (clientes, produtos)
- Erros nas últimas 24h
- Botão "Forçar Sincronização"

---

## 📊 Mapeamento de Entidades

### Clientes (100% compatibilidade)

| STAGETEK (`clients`) | Omie API | Compatibilidade |
|---------------------|----------|-----------------|
| `name` | `razao_social` | ✅ 100% |
| `cnpj` | `cnpj_cpf` | ✅ 100% |
| `email` | `email` | ✅ 100% |
| `phone` | `telefone1_numero` | ✅ 100% |
| `address.street` | `endereco` | ✅ 100% |
| `address.city` | `cidade` | ✅ 100% |
| `address.state` | `estado` | ✅ 100% |
| `address.zipcode` | `cep` | ✅ 100% |
| `status` | `inativo` (invertido) | ✅ 100% |

### Produtos (100% compatibilidade)

| STAGETEK (`products`) | Omie API | Compatibilidade |
|----------------------|----------|-----------------|
| `sku` | `codigo` | ✅ 100% |
| `name` | `descricao` | ✅ 100% |
| `description` | `descricao_detalhada` | ✅ 100% |
| `category` | `caracteristicas.categoria` | ✅ 100% |
| `price_brl` | `valor_unitario` | ✅ 100% |
| `unit` | `unidade` | ✅ 100% |
| `is_active` | `inativo` (invertido) | ✅ 100% |

### Cotações → Pedidos (95% compatibilidade)

| STAGETEK (`quotations`) | Omie API (`pedido`) | Compatibilidade |
|------------------------|---------------------|-----------------|
| `quotation_number` | `numero_pedido` | ✅ 100% |
| `items[]` | `det[]` | ✅ 100% |
| `items[].sku` | `det[].codigo_produto` | ✅ 100% |
| `items[].quantity` | `det[].quantidade` | ✅ 100% |
| `items[].unit_price` | `det[].valor_unitario` | ✅ 100% |
| `subtotal` | `total_produtos` | ✅ 100% |
| `freight` | `frete` | ✅ 100% |
| `total` | `valor_total_pedido` | ✅ 100% |
| `status` | `etapa` | ⚠️ 80% (mapeamento custom) |

---

## ⚠️ Riscos e Mitigações

### Riscos Técnicos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| **Rate limits API Omie** | Média | Alto | Exponential backoff + retry queue |
| **Duplicação de registros** | Baixa | Crítico | CNPJ/SKU como chave única |
| **Conflitos de edição simultânea** | Média | Médio | Last-write-wins + log de conflitos |
| **Omie API indisponível** | Baixa | Alto | Retry queue + alertas Slack |
| **Mudança de schema Omie** | Baixa | Médio | Validação Zod em todas respostas |

### Riscos de Negócio

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| **Custo de API Omie** | Média | Médio | Confirmar custos com comercial Omie |
| **Resistência de usuários** | Baixa | Alto | Treinamento + rollout gradual |
| **Dados sensíveis vazados** | Baixa | Crítico | RLS policies + auditoria |

---

## 🚀 Roadmap de Implementação

### Fase 0: Validação e Preparação (1 dia)
**Objetivo**: Confirmar viabilidade comercial e técnica

**Tarefas**:
- [ ] Contatar Omie para confirmar custos de API
- [ ] Obter credenciais de sandbox (teste)
- [ ] Testar autenticação básica
- [ ] Validar rate limits na prática

**Entregável**: Documento "Go/No-Go" + credenciais de produção

---

### Fase 1: MVP - Sync Manual (1 semana) - Story 6.1
**Objetivo**: Eliminar dupla digitação de clientes e produtos

**Tarefas**:
- [ ] Criar tabela `omie_sync_map` (migration)
- [ ] Criar tabela `omie_sync_log` (migration)
- [ ] Implementar Edge Function `omie-sync-clients`
- [ ] Implementar Edge Function `omie-sync-products`
- [ ] Criar `OmieSyncButton` component
- [ ] Integrar botão na página `/clientes`
- [ ] Testar sync com 10 clientes reais
- [ ] Documentar processo de sync

**Entregável**: Sync manual funcional + 100% clientes sincronizados

**Critério de Sucesso**: Vendedor sincroniza 50 clientes em <2 minutos

---

### Fase 2: Automação - Cron Job (1 semana) - Story 6.2
**Objetivo**: Dados sempre atualizados sem intervenção manual

**Tarefas**:
- [ ] Configurar Supabase Cron (ou similar)
- [ ] Implementar retry automático (3 tentativas)
- [ ] Criar `OmieSyncDashboard` component
- [ ] Integrar Slack webhook para alertas
- [ ] Adicionar página `/admin/omie-sync`
- [ ] Testar sync automático (24h monitoramento)

**Entregável**: Sync automático a cada 15 min + dashboard

**Critério de Sucesso**: 0 intervenções manuais necessárias em 7 dias

---

### Fase 3: Cotações → Pedidos (1 semana) - Story 6.3
**Objetivo**: Automação completa do fluxo comercial → faturamento

**Tarefas**:
- [ ] Implementar Edge Function `omie-create-order`
- [ ] Adicionar trigger em `quotations` (status = accepted)
- [ ] Testar criação de pedido no Omie
- [ ] Configurar geração automática de NF-e no Omie
- [ ] Integrar email com NF-e anexada
- [ ] Adicionar campo `omie_order_id` em `quotations` table
- [ ] Testar fluxo completo (cotação → NF-e → email)

**Entregável**: Automação completa cotação → NF-e

**Critério de Sucesso**: Delay aprovação → NF-e < 1 hora

---

### Fase 4: Bidirecional CRM (1 semana) - Story 6.4
**Objetivo**: CRM unificado (escolher qual usar)

**Tarefas**:
- [ ] Implementar sync bidirecional de oportunidades
- [ ] Mapeamento de funis/etapas (STAGETEK ↔ Omie)
- [ ] Implementar conflict resolution (last-write-wins)
- [ ] Criar tabela `omie_sync_conflicts`
- [ ] Adicionar UI para resolver conflitos manualmente
- [ ] Testar cenários de conflito (race conditions)

**Entregável**: Sync bidirecional de oportunidades

**Critério de Sucesso**: 0 conflitos perdidos em 30 dias

---

## 📈 RICE Score Breakdown

### Story 6.1: MVP Sync Manual
- **Reach**: 5 usuários (100% da equipe)
- **Impact**: 8/10 (elimina dupla digitação)
- **Confidence**: 90% (API bem documentada)
- **Effort**: 5 dias
- **RICE**: (5 × 8 × 0.9) / 5 = **7.2**

### Story 6.2: Sync Automático
- **Reach**: 5 usuários
- **Impact**: 7/10 (dados sempre atualizados)
- **Confidence**: 85%
- **Effort**: 5 dias
- **RICE**: (5 × 7 × 0.85) / 5 = **5.95**

### Story 6.3: Cotações → Pedidos
- **Reach**: 5 usuários
- **Impact**: 10/10 (automação completa vendas → faturamento)
- **Confidence**: 80%
- **Effort**: 5 dias
- **RICE**: (5 × 10 × 0.8) / 5 = **8.0**

### Story 6.4: Bidirecional CRM
- **Reach**: 5 usuários
- **Impact**: 9/10 (CRM unificado)
- **Confidence**: 75% (lógica complexa)
- **Effort**: 5 dias
- **RICE**: (5 × 9 × 0.75) / 5 = **6.75**

**Epic Total RICE**: Média ponderada = **7.0** (Alto impacto)

---

## 💰 Análise de Custos

### Custos de Desenvolvimento
- **Desenvolvimento**: 14 dias × taxa hourly (conforme tabela salarial)
- **QA**: 2 dias (testes de integração)
- **Total**: 16 dias (~3.2 semanas)

### Custos Operacionais
- **Omie API**: A confirmar com comercial (possivelmente R$ 0 se já licenciado)
- **Supabase Edge Functions**: R$ 0 (free tier - 500k invocações/mês)
- **Estimativa mensal**: 4 sync/hora × 24h × 30 dias = 2,880 invocações
- **Custo infraestrutura**: **R$ 0** (dentro do free tier)

### ROI
- **Economia**: 10h/dia × 22 dias × R$ 30/h = R$ 6,600/mês
- **Investimento**: ~16 dias dev
- **Payback**: ~2-3 semanas
- **ROI anual**: **>1000%**

---

## 🎓 Dependências Externas

### Pré-requisitos
1. **Licença Omie ativa** - Confirmar com cliente
2. **Credenciais API** - App Key + Secret (obter no painel Omie)
3. **Sandbox de testes** - Ambiente de homologação Omie

### Integrações Existentes
- ✅ Resend API (email) - já configurada
- ✅ Supabase Edge Functions - já em uso
- ✅ Slack Webhook - planejado (Story 6.2)

---

## 📚 Referências

### Documentação Técnica
- **Análise de Viabilidade Completa**: [docs/architecture/omie-integration-feasibility.md](../architecture/omie-integration-feasibility.md)
- **Database Schema**: [docs/architecture/database-schema.md](../architecture/database-schema.md)
- **Tech Stack**: [docs/architecture/tech-stack.md](../architecture/tech-stack.md)

### Omie API
- [Portal do Desenvolvedor](https://developer.omie.com.br/service-list/)
- [Documentação API](https://ajuda.omie.com.br/pt-BR/articles/5412731-acessando-a-documentacao-e-testando-as-apis)
- [Boas Práticas](https://ajuda.omie.com.br/pt-BR/articles/12607801-boas-praticas-de-integracao-com-as-apis-do-omie)

---

## 🎯 Próximos Passos

### Imediato (Hoje)
1. ✅ Epic criado com todas as 4 stories
2. ⏳ Apresentar análise de viabilidade para stakeholders
3. ⏳ Definir prioridade vs outros epics (EPIC-5, futuros)

### Curto Prazo (1-2 semanas)
4. ⏳ Validação comercial com Omie (custos)
5. ⏳ Obter credenciais de sandbox
6. ⏳ Proof of Concept (2 dias)

### Médio Prazo (1 mês)
7. ⏳ Aprovar budget de desenvolvimento
8. ⏳ Implementar Fase 1 - MVP (Story 6.1)
9. ⏳ Validar com usuários reais

### Longo Prazo (3+ meses)
10. ⏳ Implementar Fases 2-4
11. ⏳ Dashboard BI unificado
12. ⏳ Análise de impacto (ROI real)

---

**Epic criado por**: James (Full Stack Developer)
**Data**: 12 de Dezembro de 2025
**Status**: Aguardando aprovação stakeholder
**Próxima revisão**: Após validação comercial com Omie
