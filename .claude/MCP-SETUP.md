# MCP Servers Setup Guide

**Model Context Protocol (MCP) configuration for STAGETEK CRM**

---

## 🎯 O que são MCP Servers?

**MCP (Model Context Protocol)** permite que Claude Code se conecte a ferramentas externas e serviços para executar tarefas automaticamente, sem precisar de comandos manuais.

**Exemplos de uso**:
- **GitHub MCP**: Criar issues, pull requests, gerenciar repositório
- **Postgres MCP**: Executar queries SQL, criar migrations
- **Filesystem MCP**: Ler/escrever arquivos do projeto
- **Fetch MCP**: Fazer requisições HTTP (Supabase API, webhooks)

---

## 📦 MCP Servers Configurados

### 1. **GitHub MCP**
**Função**: Integração com GitHub (issues, PRs, commits)

**Capabilities**:
- Criar/editar/fechar issues
- Criar pull requests
- Fazer commits
- Gerenciar branches
- Ver status de CI/CD

**Setup**:
1. Criar GitHub Personal Access Token:
   - Ir em https://github.com/settings/tokens
   - Clicar "Generate new token (classic)"
   - Scopes necessários: `repo`, `workflow`, `admin:org`
   - Copiar token gerado

2. Adicionar token ao arquivo `.claude/mcp-config.json`:
```json
{
  "mcpServers": {
    "github": {
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

**Usage Examples**:
```
# Criar issue
"Create GitHub issue: 'Add RLS policies to opportunities table' with label 'backend'"

# Criar PR
"Create pull request: 'feat: add funil de vendas page' from branch 'feature/funil' to 'main'"

# Ver issues abertas
"List all open issues labeled 'bug'"
```

---

### 2. **Filesystem MCP**
**Função**: Acesso ao sistema de arquivos local

**Capabilities**:
- Ler arquivos do projeto
- Escrever/editar arquivos
- Criar diretórios
- Listar arquivos

**Setup**:
Já configurado automaticamente em `.claude/mcp-config.json`:
```json
{
  "mcpServers": {
    "filesystem": {
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\Users\\David\\Stagetek\\stagetek-crm-system"]
    }
  }
}
```

**Usage Examples**:
```
# Ler arquivo
"Read protocol/PROTOCOL-NOTECRAFT.md"

# Criar componente
"Create components/atoms/QualificationStars.js with 5-star rating component (≤20 lines)"

# Editar CSS
"Add .opportunity-card class to design-system/components.css"
```

---

### 3. **Postgres MCP**
**Função**: Conexão direta ao PostgreSQL do Supabase

**Capabilities**:
- Executar queries SQL
- Criar/alterar tabelas
- Ver schema do banco
- Executar migrations
- Verificar índices

**Setup**:
1. Obter connection string do Supabase:
   - Ir em https://supabase.com/dashboard/project/[seu-projeto]/settings/database
   - Copiar "Connection string" (modo Transaction)

2. Adicionar ao `.claude/mcp-config.json`:
```json
{
  "mcpServers": {
    "postgres": {
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
      }
    }
  }
}
```

**Usage Examples**:
```
# Ver tabelas
"Show all tables in database"

# Criar tabela
"Create opportunities table with columns: id (UUID), client_id (UUID FK), stage_id (UUID FK), event_name (TEXT), total_value (DECIMAL)"

# Verificar RLS
"Check if opportunities table has RLS enabled"

# Ver dados
"SELECT * FROM opportunities WHERE status = 'open' LIMIT 10"
```

---

### 4. **Fetch MCP**
**Função**: Fazer requisições HTTP

**Capabilities**:
- GET/POST/PUT/DELETE requests
- Headers customizados
- JSON payloads
- Response parsing

**Setup**:
Já configurado automaticamente.

**Usage Examples**:
```
# Testar Supabase REST API
"GET https://[project-ref].supabase.co/rest/v1/opportunities with header 'apikey: [anon-key]'"

# Webhook test
"POST https://webhook.site/xxx with JSON: { 'event': 'opportunity_created', 'id': 123 }"

# Check external API
"GET https://api.github.com/repos/stagetek/crm/issues"
```

---

## 🚀 Como Usar MCPs com Agents

### @backend-specialist + Postgres MCP

**Sem MCP** (manual):
```
1. User: "Criar tabela opportunities"
2. Backend-specialist: "Aqui está o SQL..."
3. User: Copia SQL, abre Supabase Dashboard, executa manualmente
```

**Com MCP** (automático):
```
1. User: "@backend-specialist Create opportunities table with RLS using Postgres MCP"
2. Backend-specialist: Executa SQL diretamente via MCP, RLS criado ✓
```

### @frontend-specialist + Filesystem MCP

**Sem MCP**:
```
1. User: "Criar OpportunityCard.js"
2. Frontend-specialist: "Aqui está o código..."
3. User: Copia código, cria arquivo manualmente
```

**Com MCP**:
```
1. User: "@frontend-specialist Create components/organisms/OpportunityCard.js (≤50 lines) using Filesystem MCP"
2. Frontend-specialist: Arquivo criado automaticamente ✓
```

### @product-manager + GitHub MCP

**Sem MCP**:
```
1. User: "Criar user story US-005"
2. Product-manager: "Aqui está a user story..."
3. User: Copia, abre GitHub, cria issue manualmente
```

**Com MCP**:
```
1. User: "@product-manager Create GitHub issue for US-005: Add note to opportunity using GitHub MCP"
2. Product-manager: Issue criada automaticamente com labels e milestone ✓
```

---

## 📋 Checklist de Configuração

### GitHub MCP
- [ ] Criar GitHub Personal Access Token
- [ ] Adicionar token ao `.claude/mcp-config.json`
- [ ] Testar: "List GitHub repositories"
- [ ] Testar: "Create test issue"

### Postgres MCP
- [ ] Criar projeto no Supabase
- [ ] Copiar connection string
- [ ] Adicionar connection string ao `.claude/mcp-config.json`
- [ ] Substituir `[PASSWORD]` pela senha real
- [ ] Testar: "Show all tables"

### Filesystem MCP
- [x] Já configurado automaticamente
- [ ] Testar: "List files in components/atoms/"

### Fetch MCP
- [x] Já configurado automaticamente
- [ ] Testar: "GET https://api.github.com/zen"

---

## 🔐 Segurança

### ⚠️ IMPORTANTE

1. **NUNCA commite `.claude/mcp-config.json` com tokens/passwords reais**
   - Arquivo já está em `.gitignore`
   - Use variáveis de ambiente em produção

2. **GitHub Token**: Scope mínimo necessário
   - Apenas `repo` para repositório privado
   - `public_repo` para repositório público
   - Evite `admin:org` se não for necessário

3. **Postgres Connection String**: Read-only quando possível
   - Crie usuário PostgreSQL com permissões limitadas para agents
   - Evite usar usuário `postgres` (admin)

4. **Supabase API Keys**: Use Anon Key (não Service Role Key)
   - Anon Key respeita RLS
   - Service Role Key bypassa RLS (perigoso)

---

## 🧪 Testando MCPs

### Teste 1: GitHub MCP

```bash
# Comando para testar
@backend-specialist "Using GitHub MCP, list all open issues in stagetek-crm-system"

# Resultado esperado
Issues listadas com título, labels, assignee
```

### Teste 2: Postgres MCP

```bash
# Comando para testar
@backend-specialist "Using Postgres MCP, show all tables in database"

# Resultado esperado
Lista de tabelas: users, clients, opportunities, etc.
```

### Teste 3: Filesystem MCP

```bash
# Comando para testar
@frontend-specialist "Using Filesystem MCP, list all files in components/atoms/"

# Resultado esperado
Badge.js, Avatar.js, StatusDot.js, etc.
```

### Teste 4: Fetch MCP

```bash
# Comando para testar
@backend-specialist "Using Fetch MCP, GET https://api.github.com/zen"

# Resultado esperado
Mensagem Zen do GitHub (ex: "Design for failure")
```

---

## 📊 Benefícios dos MCPs

### Antes (Manual)
- ⏱️ 5 minutos para criar issue manualmente
- ⏱️ 3 minutos para criar arquivo e copiar código
- ⏱️ 2 minutos para executar SQL no Supabase
- **Total**: 10 minutos por tarefa

### Depois (MCPs)
- ⏱️ 10 segundos para criar issue automaticamente
- ⏱️ 5 segundos para criar arquivo automaticamente
- ⏱️ 5 segundos para executar SQL automaticamente
- **Total**: 20 segundos por tarefa

**Ganho de produtividade**: **30x mais rápido**

---

## 🔄 Workflows com MCPs

### Workflow: Criar Feature Completa

```bash
# 1. Product Manager cria user story no GitHub
@product-manager "Using GitHub MCP, create issue US-010: Add email sending to opportunities with labels 'feature', 'backend', 'frontend'"

# 2. Frontend cria componente
@frontend-specialist "Using Filesystem MCP, create components/organisms/EmailComposer.js (≤50 lines) with rich text editor"

# 3. Backend cria tabela
@backend-specialist "Using Postgres MCP, create emails table with columns: id (UUID), opportunity_id (UUID FK), sent_by (UUID FK), to_email (TEXT), subject (TEXT), body (TEXT), sent_at (TIMESTAMP)"

# 4. Backend cria service
@backend-specialist "Using Filesystem MCP, create services/emailsService.js with sendEmail() method using Supabase Edge Functions"

# 5. QA testa
@qa-specialist "Test email sending flow from opportunity details page"

# 6. Product Manager fecha issue
@product-manager "Using GitHub MCP, close issue US-010 with comment 'Feature deployed to production ✓'"
```

**Tempo total**: ~15 minutos (vs. 2 horas manual)

---

## 🐛 Troubleshooting

### Erro: "MCP Server not responding"

**Causa**: MCP server não inicializou

**Fix**:
```bash
# Verificar se npx está instalado
npx --version

# Limpar cache do npx
npx clear-npx-cache

# Reinstalar MCP server
npx -y @modelcontextprotocol/server-github
```

---

### Erro: "Authentication failed" (GitHub)

**Causa**: Token inválido ou sem permissões

**Fix**:
1. Ir em https://github.com/settings/tokens
2. Verificar se token ainda está ativo
3. Verificar scopes: `repo`, `workflow`
4. Gerar novo token se necessário
5. Atualizar `.claude/mcp-config.json`

---

### Erro: "Connection refused" (Postgres)

**Causa**: Connection string incorreta ou firewall

**Fix**:
1. Verificar connection string no Supabase Dashboard
2. Verificar se senha está correta
3. Verificar se IP está na whitelist (Supabase > Settings > Database > Connection Pooling)
4. Usar connection pooler URL (porta 6543) ao invés de direct (porta 5432)

---

### Erro: "Permission denied" (Filesystem)

**Causa**: MCP Filesystem não tem acesso ao diretório

**Fix**:
1. Verificar se path está correto em `.claude/mcp-config.json`
2. Usar path absoluto (não relativo)
3. Verificar permissões da pasta no Windows

---

## 📚 Referências

- [MCP Documentation](https://modelcontextprotocol.io)
- [GitHub MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/github)
- [Postgres MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres)
- [Supabase Connection Strings](https://supabase.com/docs/guides/database/connecting-to-postgres)

---

**Built with ❤️ following Protocol Notecraft™**
