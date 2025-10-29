# 🔧 Guia Completo: Configurar TODOS os MCPs

**Data**: 29 Outubro 2025
**Problema**: Claude Desktop converteu tokens para variáveis de ambiente por segurança
**Solução**: Configurar as variáveis de ambiente no Windows

---

## 📋 Tokens Necessários (3)

### 1. GITHUB_TOKEN ⭐ **ESSENCIAL**
**Usado por**: `github`, `shadcn-ui`
**O que faz**: Acesso a repositórios GitHub

#### Como gerar:
1. Acesse: https://github.com/settings/tokens?type=beta
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. **Note**: `Claude Desktop MCP`
4. **Expiration**: 90 days (ou No expiration se quiser)
5. **Scopes** (marque estes):
   - ✅ `repo` (Full control of private repositories)
   - ✅ `read:org` (Read org and team membership)
   - ✅ `user` (Read user profile data)
6. Clique em **"Generate token"**
7. **COPIE O TOKEN** (começa com `ghp_...`)

**Exemplo**: `ghp_abc123xyz789...`

---

### 2. NOTION_TOKEN ⚠️ **OPCIONAL**
**Usado por**: `notionApi`
**O que faz**: Integração com Notion (notas/documentação)

#### Como gerar:
1. Acesse: https://www.notion.so/my-integrations
2. Clique em **"+ New integration"**
3. **Name**: `Claude Desktop MCP`
4. **Associated workspace**: Seu workspace
5. Clique em **"Submit"**
6. **COPIE O TOKEN** (começa com `secret_...`)
7. **IMPORTANTE**: Compartilhe páginas do Notion com a integração!

**Exemplo**: `secret_abc123xyz789...`

**Se você NÃO USA NOTION**: Pule este token

---

### 3. APIFY_TOKEN ⚠️ **OPCIONAL**
**Usado por**: `actors-mcp-server`
**O que faz**: Web scraping e automação (Apify)

#### Como gerar:
1. Acesse: https://console.apify.com/account/integrations
2. Crie conta gratuita se não tiver
3. Vá em **"Integrations" → "API Tokens"**
4. Clique em **"Create new token"**
5. **Name**: `Claude Desktop MCP`
6. **COPIE O TOKEN** (começa com `apify_api_...`)

**Exemplo**: `apify_api_abc123xyz789...`

**Se você NÃO USA APIFY**: Pule este token

---

## 🚀 Método 1: Script Automatizado (RECOMENDADO)

Vou criar um script PowerShell que configura tudo de uma vez!

### Passo 1: Gerar os tokens acima

Antes de executar o script, **VOCÊ PRECISA**:
1. ✅ Gerar o `GITHUB_TOKEN` (ESSENCIAL)
2. ⚠️ Gerar `NOTION_TOKEN` (se usa Notion)
3. ⚠️ Gerar `APIFY_TOKEN` (se usa Apify)

### Passo 2: Executar o script

Vou criar o script para você em: `setup-mcp-tokens.ps1`

---

## 🔧 Método 2: Manual (Configurar um por um)

### No Windows PowerShell (ADMINISTRADOR):

```powershell
# 1. GITHUB_TOKEN (ESSENCIAL)
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'SEU_TOKEN_GITHUB_AQUI', 'User')

# 2. NOTION_TOKEN (opcional)
[System.Environment]::SetEnvironmentVariable('NOTION_TOKEN', 'SEU_TOKEN_NOTION_AQUI', 'User')

# 3. APIFY_TOKEN (opcional)
[System.Environment]::SetEnvironmentVariable('APIFY_TOKEN', 'SEU_TOKEN_APIFY_AQUI', 'User')
```

### Verificar se funcionou:
```powershell
# Listar todas as variáveis
Get-ChildItem Env: | Where-Object { $_.Name -match 'TOKEN' }
```

---

## ✅ Checklist de Configuração

- [ ] Gerei o **GITHUB_TOKEN** (https://github.com/settings/tokens)
- [ ] Configurei a variável `GITHUB_TOKEN` no Windows
- [ ] (Opcional) Gerei o **NOTION_TOKEN** (https://www.notion.so/my-integrations)
- [ ] (Opcional) Configurei a variável `NOTION_TOKEN` no Windows
- [ ] (Opcional) Gerei o **APIFY_TOKEN** (https://console.apify.com/account/integrations)
- [ ] (Opcional) Configurei a variável `APIFY_TOKEN` no Windows
- [ ] **Reiniciei o Claude Desktop** (CRÍTICO!)
- [ ] Testei os MCPs: "Liste meus repositórios GitHub"

---

## 🧪 Como Testar Depois de Configurar

### Teste 1: GitHub MCP
```
Prompt: "Liste meus repositórios GitHub"
Resposta esperada: Lista de repositórios
```

### Teste 2: Supabase MCP
```
Prompt: "Quais são as tabelas no meu banco Supabase?"
Resposta esperada: Lista de tabelas (clients, opportunities, etc.)
```

### Teste 3: Brasil API MCP
```
Prompt: "Consulte o CEP 01310-100"
Resposta esperada: Dados do endereço (Av. Paulista)
```

### Teste 4: Notion MCP (se configurou)
```
Prompt: "Liste minhas páginas do Notion"
Resposta esperada: Lista de páginas compartilhadas com a integração
```

---

## 🔒 Segurança

### Por que o Claude Desktop fez isso?

O Claude Desktop detectou que você tinha **tokens sensíveis hardcoded** no arquivo de configuração. Isso é um **risco de segurança** porque:
- O arquivo de config pode ser compartilhado acidentalmente
- Pode ser commitado no Git
- Pode ser copiado para backups públicos

### Solução do Claude Desktop:

Converteu para **variáveis de ambiente**:
```json
// ANTES (INSEGURO):
"env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_abc123xyz789..." }

// DEPOIS (SEGURO):
"env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}" }
```

Agora os tokens ficam no **sistema operacional**, não no arquivo de config!

---

## 🛠️ Troubleshooting

### Problema 1: "MCP não está funcionando"
**Solução**: Reinicie o Claude Desktop (fechar completamente + reabrir)

### Problema 2: "Token inválido"
**Solução**: Verifique se copiou o token completo (sem espaços)

### Problema 3: "Variável não encontrada"
**Solução**: Execute o comando no PowerShell **como Administrador**

### Problema 4: "GitHub MCP não lista repositórios"
**Solução**: Verifique se marcou o scope `repo` ao gerar o token

---

## 📝 Próximos Passos

1. **Agora**: Gere os tokens necessários
2. **Depois**: Execute o script ou configure manualmente
3. **Reinicie**: Claude Desktop (CRÍTICO!)
4. **Teste**: Todos os MCPs

---

**Precisa de ajuda?** Me avise quando tiver os tokens prontos que eu te ajudo a configurar! 🚀
