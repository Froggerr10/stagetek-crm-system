# Setup Tools - Superdesign + Rube MCP

**Data**: 1 de Outubro de 2025

---

## 🎨 Superdesign (UI Design Generator)

### **O que é?**
Extensão para VS Code que gera designs de UI usando Anthropic Claude API.

### **Instalação**

1. **Instalar extensão no VS Code**:
   - Abrir VS Code
   - Extensions (Ctrl+Shift+X)
   - Buscar: `Superdesign`
   - Clicar Install

2. **Configurar Anthropic API Key**:
   - Command Palette (Ctrl+Shift+P)
   - Digite: `Superdesign: Configure Anthropic API key`
   - Cole sua API key

3. **Usar**:
   - Command Palette (Ctrl+Shift+P)
   - Digite: `Design a modern calculator UI`
   - Ou qualquer outro prompt de design

### **Uso no Projeto**

Vamos usar Superdesign para criar:
- ✅ Dashboard layout
- ✅ Funil de Vendas (Kanban)
- ✅ Tela de Clientes (DataTable + Cards)
- ✅ Tela de Produtos (Grid + Filtros)
- ✅ Sistema de Cotações (Multi-step form)
- ✅ Sistema de Pedidos (Timeline)
- ✅ Modal patterns (Create, Edit, Delete)
- ✅ Mobile navigation (Bottom nav + Sidebar)

---

## 🔌 Rube MCP (500+ Integrações via Composio)

### **O que é?**
MCP Server da Composio que fornece 500+ integrações (Gmail, Slack, Google Calendar, etc.).

### **Instalação via Claude Code**

**Passo 1: Adicionar Rube MCP**
```bash
claude mcp add --transport http --url "https://rube.composio.dev/mcp"
```

**Passo 2: Conectar no Claude Code**
```bash
# No Claude Code, digitar:
/mcp

# Output esperado:
Manage MCP servers
> 1. rube ⚠ disconnected · Enter to login
```

**Passo 3: Selecionar Rube e pressionar Enter**

**Passo 4: Autenticar**
```
Rube MCP Server
Status: ⚠ needs authentication
URL: https://rube.composio.dev/mcp
Config location: /Users/xxx/.claude.js

> 1. Authenticate
```

Selecionar "Authenticate" e pressionar Enter.

**Passo 5: Autenticação no Browser**
```
Authenticating with rube…
* A browser window will open for authentication
```

Aguardar janela do browser abrir e fazer login.

**Passo 6: Confirmar Sucesso**
```bash
> /mcp
# Output esperado:
Authentication successful. Connected to rube.
```

---

## 🎯 Integrações Disponíveis via Rube

Após autenticar, você terá acesso a 500+ apps, incluindo:

### **Email**
- Gmail (enviar, ler, anexos)
- Outlook
- SendGrid
- Mailchimp

### **Calendar**
- Google Calendar (criar eventos, sincronizar)
- Outlook Calendar
- Apple Calendar

### **Comunicação**
- Slack (enviar mensagens, webhooks)
- Discord
- Telegram
- WhatsApp Business

### **CRM**
- Salesforce
- HubSpot
- Pipedrive
- Zoho CRM

### **Produtividade**
- Notion
- Trello
- Asana
- Monday.com

### **Desenvolvimento**
- GitHub
- GitLab
- Jira
- Linear

### **Arquivos**
- Google Drive
- Dropbox
- OneDrive
- Box

### **Pagamentos**
- Stripe
- PayPal
- Square

---

## 🚀 Workflow Recomendado

### **Fase 1: Design (Superdesign)**

1. **Definir telas principais**:
   ```
   - Dashboard
   - Funil de Vendas (Kanban)
   - Clientes (CRUD)
   - Produtos (Catálogo)
   - Cotações (Multi-step)
   - Pedidos (Timeline)
   ```

2. **Para cada tela, usar Superdesign**:
   - Command Palette → Superdesign
   - Prompt: "Design a modern B2B CRM dashboard with..."
   - Gerar 2-3 variações
   - Escolher melhor design

3. **Exportar designs**:
   - Salvar em `/designs/[tela-nome].html` ou screenshot
   - Documentar navegação em `/protocol/NAVIGATION-MAP.md`

### **Fase 2: Mapear Fluxos**

Com designs prontos, mapear:
- Navegação entre telas (qual botão leva para onde)
- Fluxos de usuário (cadastrar cliente → criar oportunidade → gerar cotação)
- Entidades necessárias (baseado nos formulários)
- Relacionamentos (baseado nos links entre telas)

### **Fase 3: Schema do Banco**

Criar schema otimizado baseado em:
- Campos dos formulários (dos designs)
- Relacionamentos mapeados
- Queries necessárias (filtros, ordenação)

### **Fase 4: Implementação**

Codar seguindo os designs exatos (React + TypeScript + Tailwind).

---

## 📋 Checklist de Setup

- [ ] Instalar Superdesign no VS Code
- [ ] Configurar Anthropic API key no Superdesign
- [ ] Testar Superdesign (criar um design simples)
- [ ] Adicionar Rube MCP via `claude mcp add`
- [ ] Autenticar Rube no browser
- [ ] Confirmar conexão: `/mcp` → "Connected to rube"
- [ ] Testar integração (ex: "List my Gmail messages")

---

## 🔧 Troubleshooting

### Superdesign não aparece no VS Code
- Verificar instalação: Extensions → Installed → Superdesign
- Recarregar janela: Command Palette → "Reload Window"

### Rube MCP não conecta
- Verificar URL: `https://rube.composio.dev/mcp`
- Tentar reautenticar: `/mcp` → Selecionar rube → Authenticate
- Verificar firewall/proxy

### Autenticação falha no browser
- Usar navegador padrão (Chrome/Edge)
- Desabilitar bloqueadores de popup
- Verificar login Composio: https://composio.dev

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
