# RD Station CRM – Especificação para Clonar (Menus + API v2/v1 + Webhooks)

> **Dark mode** para foco no desenvolvimento. Imagens são **mockups fiéis** (uso livre) e servem de guia funcional.

## Sumário
- [1. Menus e Journeys](#1-menus-e-journeys)
- [2. Endpoints (v2/v1) + RDQL](#2-endpoints-v2v1--rdql)
- [3. Webhooks (multiproduto)](#3-webhooks-multiproduto)
- [4. Imagens (mockups)](#4-imagens-mockups)
- [5. Esquema de Dados Sugerido](#5-esquema-de-dados-sugerido)
- [6. Checklists de Integração](#6-checklists-de-integração)
- [7. Links Oficiais](#7-links-oficiais)

---

## 1. Menus e Journeys

- **Negociações (Pipeline Kanban)** → criar/mover deals, timeline, tarefas, anexos, produtos, ganho/perda.
- **Contatos & Empresas** → cadastro, campos customizados, relacionamento com deals, histórico unificado.
- **Tarefas/Atividades** → tipos (`call`, `email`, `meeting`, `todo`), prazos e logging de execução.
- **Relatórios/Dashboards** → conversão por etapa, motivos de perda, produtividade, receita por produto.
- **Produtos** → catálogo + DealProducts (linhas do negócio).
- **Admin/Config.** → pipelines, stages, motivos de perda, fontes, campos customizados, usuários/equipes.
- **Integrações** → Webhooks, ETL/BI, telefonia/WhatsApp, formulários, automações.

## 2. Endpoints (v2/v1) + RDQL

- **v2 (preferencial):** `/crm/v2/contacts|organizations|deals|products|deal-products|pipelines|stages|loss-reasons|tasks|sources|segments|users|teams`  
- **v1 (fallback):** `/api/v1/contacts|organizations|deals|products|pipelines|stages|sources|loss_reasons|tasks|users|teams`  
- **RDQL exemplos:**
  - Contatos corporativos em SP: `rdql=emails.value LIKE '%@empresa.com' AND address.state = 'SP'`
  - Deals abertos > R$ 50k: `rdql=status='open' AND value > 50000 ORDER BY expected_close_date ASC`

## 3. Webhooks (multiproduto)

- CRUD de assinaturas → URL alvo, lista de eventos (ex.: `deal.created`, `deal.updated`, `deal.won`, `deal.lost`, `contact.created`, `task.created`).
- Boas práticas: idempotência por `event_id`, fila (SQS/Rabbit/Redis Streams), retries, logs e métricas.

## 4. Imagens (mockups)

1. **Pipeline (Kanban)**  
   ![Pipeline Kanban](img/pipeline_kanban.png)

2. **Negociação – Formulário e Timeline**  
   ![Deal Form](img/deal_form.png)

3. **Contato – Ficha e Negócios Relacionados**  
   ![Contact Card](img/contact_card.png)

4. **Tarefas – Editor e Lista**  
   ![Task Editor](img/task_editor.png)

5. **Relatórios/Dashboard – Widgets**  
   ![Dashboard View](img/dashboard_view.png)

6. **Webhooks – Configuração**  
   ![Webhooks Config](img/webhooks_config.png)

## 5. Esquema de Dados Sugerido

```sql
contacts(rd_id pk, name, emails jsonb, phones jsonb, organization_id, owner_id, tags text[], custom_fields jsonb, created_at, updated_at);
organizations(rd_id pk, name, document, website, owner_id, address jsonb, custom_fields jsonb, created_at, updated_at);
deals(rd_id pk, title, organization_id, pipeline_id, stage_id, owner_id, value numeric, currency, probability numeric, expected_close_date date, loss_reason_id, source_id, custom_fields jsonb, status, created_at, updated_at);
pipelines(rd_id pk, name, is_default boolean, created_at, updated_at);
stages(rd_id pk, pipeline_id, name, "order" int, rotten_days int, created_at, updated_at);
tasks(rd_id pk, title, type, status, due_date timestamptz, deal_id, contact_id, owner_id, notes, created_at, updated_at);
products(rd_id pk, name, sku, price numeric, currency, active boolean, custom_fields jsonb);
deal_products(rd_id pk, deal_id, product_id, quantity numeric, unit_price numeric, discount numeric, total numeric);
loss_reasons(rd_id pk, name, active boolean, created_at, updated_at);
sources(rd_id pk, name, channel, active boolean);
users(rd_id pk, name, email, role, active boolean);
teams(rd_id pk, name);
webhook_events(event_id pk, event_type, occurred_at timestamptz, raw jsonb, processed_at timestamptz, status);
```

## 6. Checklists de Integração

**OAuth2 & API**
- [ ] App criado (client_id/secret, redirect_uri)
- [ ] Fluxo de tokens + refresh + retry exponencial
- [ ] v2 preferencial, v1 apenas como fallback
- [ ] Jobs de reconciliação noturnos (pull & diffs)

**Webhooks**
- [ ] Endpoint HTTPS público validado
- [ ] Persistir payload bruto + idempotência `event_id`
- [ ] Fila + worker + DLQ
- [ ] Logs + métricas + alertas

**BI/ETL**
- [ ] Projeções por etapa, motivo e produto
- [ ] Export para Looker/Power BI
- [ ] Painéis por conversão, WIP e ticket médio

## 7. Links Oficiais

- Documentação (hub): https://developers.rdstation.com/reference/api-rd-station-doc
- Changelog: https://developers.rdstation.com/changelog
- Página do produto CRM: https://www.rdstation.com/produtos/crm/

---
