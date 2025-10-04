Blueprint técnico da API (para espelhar no Claude Code)

Ponto de partida (hub): documentação oficial unificada de RD Station Developers — inclui CRM v1/v2, Marketing e serviço de Webhooks multiproduto. 
RD Station Developers

Autenticação

OAuth2 (App Store): fluxo de client_id/client_secret → code → access_token/refresh_token; guia com passo-a-passo e erros comuns. (Marketing docs, mas o mesmo padrão está presente no portal e se aplica aos módulos com OAuth). 
RD Station Developers

API Key (evento de conversão): fluxo legado/alternativo para conversões (Marketing). Avalie apenas se necessário. 
RD Station Developers

Webhooks (Multiproduto)

CRUD de webhooks + payloads específicos para CRM (negócios, tarefas etc.) e retries; ideal para event-driven (ex.: upsert em seu DB, disparos no n8n). 
RD Station Developers

CRM v1

Entidades principais: negociações, contatos, empresas, funis, etapas, tarefas, produtos, motivos de perda, equipes, usuários, webhooks; inclui token de autenticação (v1). 
RD Station Developers

Exemplo (criar/atualizar funil): referência e UI de teste no portal — útil para validar payloads.

CRM v2

Escopo atual (em evolução): contatos, negociações, empresas, produtos em negociação, motivos de perda, campos personalizados; novo RDQL para filtros. Recomendo priorizar v2 nos módulos já suportados e manter v1 quando não houver endpoint equivalente. 
RD Station Developers

Pontos de integração úteis

Análise/Relatórios: endpoints de Estatísticas do Funil de Vendas no bloco de “Análise” (Marketing) ajudam a montar painéis híbridos (MKT→CRM). Para BI, considere conector/ETL e Looker/Power BI. 
RD Station Developers
+1