Modelo de dados mínimo (espelhável na API):
contacts, organizations, deals, pipelines, stages, tasks, users, teams, products, deal_products, loss_reasons, sources, activities_log, webhooks_subscriptions. (Mapeado a partir dos blocos CRM v1/v2). 
RD Station Developers

Orquestração de eventos: webhooks → fila → workers de upsert → projeções para dashboards (Looker/Power BI) e priorização/recomendações no Claude (RAG sobre histórico). 
RD Station Developers