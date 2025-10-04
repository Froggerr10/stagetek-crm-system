RD Station CRM – Spec Técnico para Clonar com Claude Code (v2 + v1 + Webhooks)

Base oficial (APIs CRM/Marketing/Conversas são distintas; priorize CRM v2 e use v1 só quando não houver equivalente). 
RD Station Developers

0) Autenticação (resumo prático)

OAuth2 (App Store): authorize → code → access_token + refresh_token. Renove antes do expirar; trate 401 com refresh + retry exponencial. (Fluxo documentado no portal de developers; mesmo hub central da referência). 
RD Station Developers

1) Contacts (v2)

Endpoint base: /crm/v2/contacts (GET/POST/PUT). Campos principais: id, name, emails[], phones[], organization_id, owner_id, tags[], custom_fields, created_at, updated_at. (Estrutura e rotas descritas no hub oficial; v2 é o padrão atual). 
RD Station Developers

Criar contato (POST)

POST /crm/v2/contacts
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Carla Souza",
  "emails": [{"type": "work", "value": "carla@empresa.com"}],
  "phones": [{"type": "mobile", "country": "55", "area": "11", "number": "988887777"}],
  "organization_id": "org_123",
  "owner_id": "user_987",
  "tags": ["MQL", "Inbound"],
  "custom_fields": {"crm_segment": "Enterprise"}
}

200/201 (exemplo)

{
  "id": "contact_abc",
  "name": "Carla Souza",
  "emails": [{"type": "work", "value": "carla@empresa.com"}],
  "organization_id": "org_123",
  "owner_id": "user_987",
  "tags": ["MQL","Inbound"],
  "custom_fields": {"crm_segment":"Enterprise"},
  "created_at": "2025-10-02T13:50:00Z",
  "updated_at": "2025-10-02T13:50:00Z"
}

RDQL (v2) – exemplos úteis

O portal oficial indica o uso de RDQL para filtros avançados na v2. Use parâmetros de consulta específicos do recurso. 
RD Station Developers

rdql=emails.value LIKE '%@empresa.com' AND 'MQL' IN tags LIMIT 100

Contatos criados nos últimos 30 dias em SP com owner específico:

2) Organizations (v2)

Endpoint base: /crm/v2/organizations. Campos: id, name, document, website, owner_id, address{}, custom_fields, created_at, updated_at.

POST /crm/v2/organizations
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Empresa Exemplo S.A.",
  "document": "12.345.678/0001-90",
  "website": "https://www.empresa.com",
  "owner_id": "user_987",
  "address": {"city": "São Paulo", "state": "SP", "country": "BR"}
}

3) Deals (v2)

Endpoint base: /crm/v2/deals. Campos: id, title, organization_id, contact_ids[], pipeline_id, stage_id, owner_id, value, currency, probability, expected_close_date, loss_reason_id, source_id, custom_fields

Criar negócio (POST)

POST /crm/v2/deals
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Q4 - Projeto Stagetek",
  "organization_id": "org_123",
  "contact_ids": ["contact_abc", "contact_def"],
  "pipeline_id": "pipe_main",
  "stage_id": "stage_qualification",
  "owner_id": "user_987",
  "value": 125000,
  "currency": "BRL",
  "expected_close_date": "2025-12-15"
}

Listar negócios abertos com ticket > R$ 50k (RDQL)
rdql=status = 'open' AND value > 50000 ORDER BY expected_close_date ASC LIMIT 200

Fallback v1 (quando precisar)

Endpoint: /api/v1/deals com paginação por next_page (padrão em listagens v1). Útil até a paridade completa com v2. 
RD Station Developers

4) Pipelines & Stages (v2)

Pipelines: /crm/v2/pipelines
Stages: /crm/v2/stages (ou rotas aninhadas por pipeline). Campos de stages incluem name, order, pipeline_id, rotten_days. (Modelagem de funis/etapas está alinhada à UI de Kanban). 
RD Station Developers

Criar etapa (POST)
POST /crm/v2/stages
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "pipeline_id": "pipe_main",
  "name": "Proposta",
  "order": 3,
  "rotten_days": 14
}

5) Tasks (v2)

Endpoint base: /crm/v2/tasks. Campos: id, title, type, status, due_date, deal_id, contact_id, owner_id, notes. 
RD Station Developers

Criar tarefa (POST)
POST /crm/v2/tasks
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Follow-up por WhatsApp",
  "type": "call",
  "status": "open",
  "due_date": "2025-10-05T14:00:00-03:00",
  "deal_id": "deal_555",
  "owner_id": "user_987",
  "notes": "Confirmar escopo e prazo da proposta."
}

6) Products & DealProducts (v2)

Products: /crm/v2/products
DealProducts: /crm/v2/deal-products (linhas de item no negócio)
Campos úteis: name, sku, price, currency, active (produto); deal_id, product_id, quantity, unit_price, discount, total (deal-product). 
RD Station Developers

Adicionar produto ao negócio (POST)
POST /crm/v2/deal-products
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "deal_id": "deal_555",
  "product_id": "prod_q30",
  "quantity": 10,
  "unit_price": 535.00,
  "discount": 0
}

7) Loss Reasons, Sources, Segments (v2)

Loss Reasons: /crm/v2/loss-reasons – motivos para fechamento como perdido.

Sources: /crm/v2/sources – cadastro de fontes (origem do negócio/lead).

Segments: /crm/v2/segments – listas com critérios (usa RDQL). 
RD Station Developers

RDQL – exemplos

Negócios perdidos por “Preço” nos últimos 90 dias:

rdql=updated_at >= NOW() - INTERVAL '90 days' AND loss_reason_id = 'lr_preco'


Segmento de contatos Enterprise com telefone móvel:

rdql=custom_fields.crm_segment = 'Enterprise' AND phones.type = 'mobile'

8) Users & Teams (v2)

Users: /crm/v2/users
Teams: /crm/v2/teams
Leitura para montar perfis/permissões e roteio de deals por equipe. 
RD Station Developers

9) Webhooks (serviço multiproduto)

O serviço de Webhooks permite assinar eventos de CRM (contacts, deals, tasks, etc.) e de outros módulos (Marketing/Conversas). No painel web: Conta → Integrações → Webhooks (fluxo explicado em materiais de ajuda). Em integrações third-party (Zapier/Make/n8n), usa-se o mesmo conceito de webhook+HTTP. 
RD Station Developers
+2
Ajuda RD Station
+2

Assinaturas (CRUD) – Exemplo genérico
POST /webhooks
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "CRM → Bus de Eventos",
  "url": "https://api.seuservidor.com/rd/webhooks",
  "events": ["deal.created", "deal.updated", "deal.won", "deal.lost",
             "contact.created", "contact.updated",
             "task.created", "task.updated"]
}


Payloads (exemplos resumidos)

Os formatos variam por entidade, mantendo event_id, event_type, occurred_at, data.*. (Prática consolidada no ecossistema RD + guias de ajuda.) 
Ajuda RD Station

{
  "event_id": "evt_123",
  "event_type": "deal.updated",
  "occurred_at": "2025-10-02T14:10:44Z",
  "data": {
    "deal": {
      "id": "deal_555",
      "title": "Q4 - Projeto Stagetek",
      "pipeline_id": "pipe_main",
      "stage_id": "stage_proposta",
      "owner_id": "user_987",
      "value": 125000,
      "currency": "BRL",
      "loss_reason_id": null,
      "custom_fields": {}
    }
  }
}

Blueprint de consumo (produção)
RD Webhook → API Gateway (auth + validação de origem + rate-limit)
          → Fila (SQS/Rabbit/Redis Streams)
          → Worker (idempotência por event_id; upsert → Postgres)
          → Projetores (denormalizações para BI/Dashboards)
          → Triggers (Claude: priorização/recomendações/contexto RAG)


Boas práticas

Idempotência: guarde event_id processado; descarte duplicatas.

Retries: o serviço reenvia em caso de 5xx/timeouts; não retorne 200 antes de persistir.

Segurança: valide IP/origem, adote segredo/HMAC se disponível e HTTPS estrito.

Observabilidade: log estruturado + métricas (taxa de falha/latência/eventos por tipo).

10) Estratégia v1 ↔ v2 (migração pragmática)

Use v2 sempre que o recurso existir (melhor RDQL, modelos atuais).

Mantenha v1 apenas para lacunas (ex.: um relatório/atributo ainda não exposto em v2).

Normalização única no seu DB (campos superset), marcando source_version por registro.

Tarefas de reconciliação: jobs noturnos que garantem paridade (pull v1/v2).

BI: gere projeções por etapa/motivo/produto; conecte ao Looker Studio/Power BI. (O ecossistema RD tem conectores e guias de automação amplamente usados.) 
Make

11) Esquema de Dados (sugerido)
-- chaves técnicas: id do RD é a primary key 'rd_id' (string/uuid)
contacts(rd_id pk, name, emails jsonb, phones jsonb, organization_id, owner_id, tags text[], custom_fields jsonb, created_at, updated_at)
organizations(rd_id pk, name, document, website, owner_id, address jsonb, custom_fields jsonb, created_at, updated_at)
deals(rd_id pk, title, organization_id, pipeline_id, stage_id, owner_id, value numeric, currency, probability numeric, expected_close_date date, loss_reason_id, source_id, custom_fields jsonb, status, created_at, updated_at)
pipelines(rd_id pk, name, is_default boolean, created_at, updated_at)
stages(rd_id pk, pipeline_id, name, "order" int, rotten_days int, created_at, updated_at)
tasks(rd_id pk, title, type, status, due_date timestamptz, deal_id, contact_id, owner_id, notes, created_at, updated_at)
products(rd_id pk, name, sku, price numeric, currency, active boolean, custom_fields jsonb)
deal_products(rd_id pk, deal_id, product_id, quantity numeric, unit_price numeric, discount numeric, total numeric)
loss_reasons(rd_id pk, name, active boolean, created_at, updated_at)
sources(rd_id pk, name, channel, active boolean)
users(rd_id pk, name, email, role, active boolean)
teams(rd_id pk, name)
webhook_events(event_id pk, event_type, occurred_at timestamptz, raw jsonb, processed_at timestamptz, status)

12) Testes rápidos (Postman/cURL)
Listar deals (paginado)
curl -G "https://api.rd.services/crm/v2/deals" \
  -H "Authorization: Bearer $TOKEN" \
  --data-urlencode "rdql=status='open' ORDER BY updated_at DESC LIMIT 50"

Atualizar etapa de um deal
curl -X PUT "https://api.rd.services/crm/v2/deals/deal_555" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"stage_id":"stage_proposta"}'

13) Checklists prontos (Claude Code)

Integração inicial

 App OAuth2 criado (client_id/secret, redirect_uri)

 Fluxo de tokens implementado (refresh + retry)

 Mapeamento v2 ativado; v1 apenas como fallback

 Schemas criados + migrações

 Seed de pipelines/stages/loss_reasons/sources (pull inicial)

Webhooks

 Endpoint público HTTPS com validação

 Persistência bruta do payload + idempotência por event_id

 Fila + worker + DLQ

 Observabilidade (métricas/logs/alertas)

Data/BI

 Projeções por etapa (WIP, lead time, conversão)

 Motivos de perda (top N, tendência 30/90 dias)

 Receita por produto/mix

 Export para Looker/Power BI

14) Fontes (primárias/úteis)

Hub oficial — Documentação RD Station (APIs distintas; CRM v2 + Webhooks + notas): 
RD Station Developers

How-to Webhooks (ajuda / passo a passo de UI): 
Ajuda RD Station
+1

Integrações de automação/ETL (Make/Zapier/n8n) para compor sua arquitetura: 
Make
+2
Zapier
+2