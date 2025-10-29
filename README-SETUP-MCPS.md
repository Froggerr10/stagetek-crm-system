# 🚀 Setup Rápido - MCPs do Claude Desktop

## 🎯 O que aconteceu?

O **Claude Desktop detectou tokens expostos** no arquivo de configuração e automaticamente converteu para **variáveis de ambiente** por segurança.

Agora você precisa configurar essas variáveis para que os MCPs voltem a funcionar! ✅

---

## ⚡ Setup Rápido (3 passos)

### **Passo 1: Gerar os Tokens** 🔑

Acesse os links e gere os tokens:

| Token | Link | Obrigatório? |
|-------|------|--------------|
| **GITHUB_TOKEN** | https://github.com/settings/tokens | ✅ **SIM** |
| NOTION_TOKEN | https://www.notion.so/my-integrations | ⚠️ Opcional |
| APIFY_TOKEN | https://console.apify.com/account/integrations | ⚠️ Opcional |

**IMPORTANTE**: Copie os tokens gerados!

---

### **Passo 2: Executar o Script** 🔧

```powershell
# No PowerShell (de preferência como Administrador):
cd C:\Users\David\Stagetek\stagetek-crm-system
.\setup-mcp-tokens.ps1
```

O script vai pedir para colar cada token.

---

### **Passo 3: Reiniciar Claude Desktop** 🔄

1. **FECHE COMPLETAMENTE** o Claude Desktop (não minimize!)
2. **REABRA** o Claude Desktop
3. Aguarde alguns segundos para os MCPs inicializarem

---

## 🧪 Testar se Funcionou

Após reiniciar, volte no chat e teste:

```
"Liste meus repositórios GitHub"
"Quais são as tabelas no meu banco Supabase?"
"Consulte o CEP 01310-100"
```

---

## 📚 Documentação Completa

- **Guia Detalhado**: `.ai/CONFIGURAR-MCPS-GUIA-COMPLETO.md`
- **Auditoria de MCPs**: `.ai/mcp-audit-report.md`

---

## ❓ Precisa de Ajuda?

Se algo não funcionar, me avise no chat que eu te ajudo! 🚀
