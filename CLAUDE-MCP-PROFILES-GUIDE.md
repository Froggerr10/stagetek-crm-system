# Claude Desktop - Guia de Perfis MCP

## 🚨 Problema Identificado

**Claude Desktop inicializa TODOS os MCPs** a cada abertura do app, mesmo sem usar.

MCPs via **Smithery, Firecrawl, Apify, Gemini** cobram **créditos por inicialização**.

---

## 💡 Solução: Sistema de Perfis

### **Perfil MINIMAL** (Uso Diário - R$ 0,00/dia)
- ✅ 5 MCPs gratuitos essenciais
- ✅ Zero consumo de API paga
- ✅ Velocidade de inicialização rápida

**Incluído**:
- `filesystem` - Acesso a arquivos
- `github` - Repositórios
- `memory` - Contexto persistente
- `shadcn-ui` - Componentes React
- `supabase` - Database STAGETEK

---

### **Perfil FULL** (Quando Precisar - R$ $$$/dia)
- ⚡ 19 MCPs (todos instalados)
- 🔴 **Consome créditos** em:
  - Smithery Toolbox
  - Deep Research MCP
  - Firecrawl
  - Apify Actors
  - Gemini Thinking
  - Context7

---

## 🛠️ Como Usar

### 1️⃣ Ver Status Atual
```powershell
cd C:\Users\David\Stagetek\stagetek-crm-system
.\claude-config-manager.ps1 -Profile status
```

### 2️⃣ Ativar Perfil MINIMAL (Diário)
```powershell
.\claude-config-manager.ps1 -Profile minimal
```
✅ Cria backup automático do config full
✅ Ativa apenas MCPs gratuitos
✅ Feche e abra Claude Desktop

### 3️⃣ Ativar Perfil FULL (Quando Precisar)
```powershell
.\claude-config-manager.ps1 -Profile full
```
⚠️ Restaura todos os 19 MCPs
⚠️ Vai consumir créditos na inicialização
⚠️ Feche e abra Claude Desktop

---

## 📊 Comparação

| Recurso | MINIMAL | FULL |
|---------|---------|------|
| MCPs Ativos | 5 | 19 |
| Custo Diário | R$ 0 | R$ ??? |
| Velocidade Init | 3s | 15s |
| Filesystem | ✅ | ✅ |
| GitHub | ✅ | ✅ |
| Supabase | ✅ | ✅ |
| Deep Research | ❌ | ✅ |
| Firecrawl | ❌ | ✅ |
| Apify | ❌ | ✅ |
| Gemini Thinking | ❌ | ✅ |

---

## 🎯 Recomendação

**Use MINIMAL 90% do tempo** para desenvolvimento STAGETEK CRM.

**Só ative FULL quando precisar** de:
- Web scraping (Firecrawl)
- Automação web (Apify)
- Pesquisa profunda (DeepResearch)
- Análise multi-modelo (Gemini Thinking)

---

## 🔒 Backup Automático

O script sempre cria backup antes de mudar:
```
C:\Users\David\AppData\Roaming\Claude\claude_desktop_config.FULL_BACKUP.json
```

Se algo der errado, copie manualmente:
```powershell
copy "$env:APPDATA\Claude\claude_desktop_config.FULL_BACKUP.json" "$env:APPDATA\Claude\claude_desktop_config.json"
```

---

## 📝 Notas

- **Mudanças só aplicam após reiniciar Claude Desktop**
- Seu config atual está em: `%APPDATA%\Claude\claude_desktop_config.json`
- O script não altera tokens ou credenciais

---

**Criado para: STAGETEK CRM Project**
**Data**: 18 Nov 2025
**Economia estimada**: R$ 50-100/mês 💰
