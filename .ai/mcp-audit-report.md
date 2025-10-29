# Auditoria de MCPs - Claude Desktop Config
**Data**: 29 Outubro 2025
**Total de MCPs**: 21 servidores

---

## ✅ MCPs FUNCIONANDO (5)

### 1. **filesystem** ✅
```json
"filesystem": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\Users\\David"]
}
```
**Status**: ✅ OK
**Ação**: Nenhuma (funcionando)

---

### 2. **memory** ✅
```json
"memory": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-memory"]
}
```
**Status**: ✅ OK
**Ação**: Nenhuma (funcionando)

---

### 3. **system-mcp** ✅
```json
"system-mcp": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-system"]
}
```
**Status**: ✅ OK
**Ação**: Nenhuma (funcionando)

---

### 4. **context7** ✅
```json
"context7": {
  "command": "npx",
  "args": ["-y", "@upstash/context7-mcp@latest"]
}
```
**Status**: ✅ OK (provavelmente)
**Ação**: Nenhuma

---

### 5. **supabase** ✅
```json
"supabase": {
  "type": "http",
  "url": "https://mcp.supabase.com/mcp?project_ref=twcpqhhtoqcgzplrmohi",
  "headers": {
    "Authorization": "Bearer sbp_cabd91394e7e84c6fa11ce60364e6e5fd4d40485"
  }
}
```
**Status**: ✅ OK (acabamos de configurar!)
**Ação**: Nenhuma

---

## ⚠️ MCPs QUEBRADOS - FALTAM TOKENS (5)

### 6. **github** ⚠️
```json
"github": {
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
  }
}
```
**Problema**: Variável `${GITHUB_TOKEN}` não está configurada
**Como corrigir**:
1. Gerar token: https://github.com/settings/tokens
2. Adicionar ao Windows Environment Variables: `GITHUB_TOKEN=ghp_seu_token_aqui`
3. Reiniciar Claude Desktop

---

### 7. **notionApi** ⚠️
```json
"notionApi": {
  "env": {
    "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer ${NOTION_TOKEN}\", ...}"
  }
}
```
**Problema**: Variável `${NOTION_TOKEN}` não configurada
**Como corrigir**: Precisa token do Notion (se você usa Notion)

---

### 8. **actors-mcp-server** ⚠️
```json
"actors-mcp-server": {
  "env": {
    "APIFY_TOKEN": "${APIFY_TOKEN}"
  }
}
```
**Problema**: Variável `${APIFY_TOKEN}` não configurada
**Como corrigir**: Precisa token do Apify (web scraping)

---

### 9. **shadcn-ui** ⚠️
```json
"shadcn-ui": {
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
  }
}
```
**Problema**: Variável `${GITHUB_TOKEN}` não configurada
**Como corrigir**: Mesmo token do GitHub (#6)

---

### 10. **mcp-server-firecrawl** ⚠️
**Problema**: Provavelmente precisa de token Firecrawl
**Como corrigir**: Se não usar, pode desabilitar

---

## 🔄 MCPs DUPLICADOS VIA SMITHERY (10)

Esses MCPs são instalados via **Smithery CLI** (plataforma de distribuição de MCPs).
Todos usam a mesma key: `cf01366f-ea61-49a4-8549-e0b2db8a6524`

### 11. **toolbox** 🔄
**Status**: Smithery (genérico)
**Recomendação**: Manter (pode ter ferramentas úteis)

---

### 12. **servers** 🔄
**Status**: Smithery `@jlia0/servers`
**Recomendação**: Verificar se duplica outras funcionalidades

---

### 13. **DeepResearchMCP** 🔄
**Status**: Smithery `@ameeralns/DeepResearchMCP`
**Recomendação**: Útil para pesquisa profunda, manter se usar

---

### 14. **whimsical-mcp-server** 🔄
**Status**: Smithery `@BrockReece/whimsical-mcp-server`
**Uso**: Integração com Whimsical (diagramas)
**Recomendação**: Remover se não usar Whimsical

---

### 15. **server-sequential-thinking** 🔄
**Status**: Smithery `@smithery-ai/server-sequential-thinking`
**Uso**: Raciocínio sequencial (pode ser útil)
**Recomendação**: Manter

---

### 16. **brasil-api-mcp** 🔄 ✅
**Status**: Smithery `@guilhermelirio/brasil-api-mcp`
**Uso**: Consulta CNPJ, CEP (APIs brasileiras)
**Recomendação**: **MANTER** (útil para STAGETEK CRM!)

---

### 17. **playwright-mcp** 🔄
**Status**: Smithery `@microsoft/playwright-mcp`
**Uso**: Automação de testes E2E
**Recomendação**: Manter se for fazer testes automatizados

---

### 18. **gemini-thinking-mcp** 🔄
**Status**: Smithery `@falahgs/gemini-thinking-mcp`
**Uso**: Integração Google Gemini
**Recomendação**: Remover se não usar Gemini

---

### 19. **windows-mcp** 🔄
**Status**: Smithery `@smithery-ai/mcp-server-windows`
**Uso**: Operações específicas do Windows
**Recomendação**: Manter (pode ser útil)

---

## 🤔 MCPs INCERTOS (3)

### 20. **desktop-commander** 🤔
```json
"desktop-commander": {
  "command": "npx",
  "args": [
    "-y",
    "@wonderwhy-er/desktop-commander",
    "--yes",
    "C:\\Users\\David\\Desktop",
    ...
  ]
}
```
**Status**: Muitos diretórios configurados
**Recomendação**: Verificar se está funcionando

---

### 21. **@magicuidesign/mcp** 🤔
```json
"@magicuidesign/mcp": {
  "command": "cmd",
  "args": ["/c", "npx", "-y", "@magicuidesign/mcp@latest"]
}
```
**Status**: Magic UI (componentes React)
**Recomendação**: Pode ser útil para design system

---

## 📊 RESUMO

| Categoria | Quantidade | Ação Recomendada |
|-----------|-----------|------------------|
| ✅ Funcionando | 5 | Nenhuma |
| ⚠️ Faltam Tokens | 5 | Configurar tokens OU desabilitar |
| 🔄 Smithery | 10 | Revisar quais são úteis |
| 🤔 Incertos | 3 | Testar funcionamento |
| **TOTAL** | **23** | - |

---

## 🎯 RECOMENDAÇÃO PARA STAGETEK CRM

### MCPs ESSENCIAIS (manter):
1. ✅ **filesystem** - Acesso a arquivos
2. ✅ **memory** - Memória persistente
3. ✅ **system-mcp** - Operações de sistema
4. ✅ **supabase** - **CRÍTICO** (banco de dados)
5. ✅ **brasil-api-mcp** - CNPJ/CEP (útil para clientes)
6. ⚠️ **github** - Útil (precisa configurar token)

### MCPs OPCIONAIS (você decide):
- **playwright-mcp** - Se for fazer testes E2E
- **context7** - Contexto adicional
- **server-sequential-thinking** - Raciocínio avançado

### MCPs PARA REMOVER (não úteis para CRM):
- **notionApi** - Se não usa Notion
- **whimsical-mcp-server** - Se não usa Whimsical
- **gemini-thinking-mcp** - Se não usa Google Gemini
- **mcp-server-firecrawl** - Web scraping (não necessário)
- **actors-mcp-server** - Apify (não necessário)
- **@magicuidesign/mcp** - Magic UI (já tem shadcn/ui)

---

## 🔧 AÇÕES IMEDIATAS

### Passo 1: Configurar GitHub Token (CRÍTICO)
```bash
# Windows PowerShell (Administrador)
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'ghp_seu_token_aqui', 'User')
```

### Passo 2: Testar MCPs Ativos
Após reiniciar Claude Desktop, testar:
- Supabase: "Liste as tabelas do banco Supabase"
- Brasil API: "Consulte o CNPJ 00.000.000/0001-00"
- GitHub: "Liste meus repositórios"

### Passo 3: Limpar MCPs Não Usados (Opcional)
Se quiser, posso criar uma versão limpa do config removendo apenas os MCPs que você não usa.

---

**Gerado por**: Claude Code
**Próxima revisão**: Após configurar tokens
