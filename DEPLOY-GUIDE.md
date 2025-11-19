# 🚀 GUIA DE DEPLOY - STAGETEK CRM
## Do Zero à Produção em 1-2 Horas

**Última atualização**: 17 de Novembro de 2025
**Tempo estimado**: 1-2h
**Pré-requisitos**: Node.js 18+, conta Supabase, conta Vercel (ou GitHub)

---

## 📋 CHECKLIST PRÉ-DEPLOY

Antes de começar, verifique:
- [ ] Node.js instalado (`node -v` → v18+)
- [ ] Git instalado e configurado
- [ ] Conta Supabase criada (https://supabase.com)
- [ ] Conta Vercel criada (https://vercel.com) OU GitHub
- [ ] Código commitado no Git

---

## FASE 1: VALIDAÇÃO LOCAL (30min)

### Passo 1.1: Verificar Dependências

```bash
# Navegar para o projeto
cd C:\Users\David\Stagetek\stagetek-crm-system

# Verificar Node.js
node -v
# Deve mostrar: v18.x.x ou superior

# Instalar dependências (se ainda não instalou)
npm install

# Verificar se não há erros
```

**Resultado esperado**: ✅ Dependências instaladas sem erros

---

### Passo 1.2: Verificar Variáveis de Ambiente

```bash
# Verificar se .env existe
ls .env

# Se NÃO existe, criar:
cp .env.example .env
# OU criar manualmente
```

**Abrir `.env` e verificar**:
```env
# DEVE TER estas variáveis:
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ Se não tiver**:
1. Acessar https://app.supabase.com/projects
2. Clicar no seu projeto
3. Settings → API
4. Copiar:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY`

---

### Passo 1.3: Testar Sistema Localmente

```bash
# Iniciar servidor dev
npm run dev

# Aguardar mensagem:
# ➜  Local:   http://localhost:5173/
```

**Abrir navegador**: http://localhost:5173

**Testar rapidamente**:
1. [ ] Página de login carrega ✅
2. [ ] Fazer login (se já tem usuário) ✅
3. [ ] Dashboard carrega ✅
4. [ ] Navegar para /clientes ✅
5. [ ] Navegar para /funil ✅

**Se TUDO funciona**: ✅ Passar para Passo 1.4

**Se dá ERRO** (comum):
- `Error: Invalid Supabase URL` → Verificar `.env`
- `Error: Failed to fetch` → Verificar se Supabase está online
- `Error: Auth error` → Criar usuário no Supabase Dashboard

---

### Passo 1.4: Executar Migrations (CRÍTICO)

**Opção A: Via Supabase Dashboard** (recomendado se não tem CLI)

1. Acessar: https://app.supabase.com/project/SEU_PROJETO/sql
2. Abrir arquivo local: `scripts/validate-system.sql`
3. Copiar TODO o conteúdo (Ctrl+A, Ctrl+C)
4. Colar no SQL Editor do Supabase
5. Clicar **"Run"** (botão verde)
6. Aguardar 10-20 segundos
7. Verificar output no painel inferior:

```
✅ ALL TABLES EXIST (13/13)
✅ ALL STORAGE BUCKETS EXIST (2/2)
✅ ALL CRITICAL RLS POLICIES EXIST
✅ PERFORMANCE INDEXES VALIDATED
✅ Seed data populated
```

**Se aparecer ERRO**:
- `relation "clients" already exists` → ÓTIMO! Tabelas já existem
- `policy "xxx" already exists` → ÓTIMO! Policies já existem
- Outros erros → Anotar e continuar

**Opção B: Via Supabase CLI** (se já tem instalado)

```bash
# Verificar se CLI está instalado
npx supabase --version

# Linkar projeto local ao Supabase
npx supabase link --project-ref SEU_PROJECT_REF

# Aplicar migrations
npx supabase db push

# Verificar status
npx supabase db diff
```

---

### Passo 1.5: Testar Build de Produção

```bash
# Parar servidor dev (Ctrl+C)

# Rodar build
npm run build

# Aguardar finalização (30-60s)
```

**Resultado esperado**:
```
✓ 150 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.30 kB
dist/assets/index-abc123.css     45.20 kB │ gzip: 12.30 kB
dist/assets/index-xyz789.js     180.50 kB │ gzip: 65.40 kB
✓ built in 8.45s
```

**Verificar**:
- [ ] Pasta `dist/` criada ✅
- [ ] Arquivos dentro de `dist/assets/` ✅
- [ ] Bundle gzipped <500KB ✅ (65KB acima está OK)
- [ ] ZERO erros TypeScript ✅

**Se der ERRO**:
- `Type error: ...` → Corrigir erro TypeScript
- `Module not found: ...` → `npm install` novamente
- `Out of memory` → Fechar outros apps, tentar novamente

---

### Passo 1.6: Testar Build Localmente (Opcional)

```bash
# Servir build localmente
npx vite preview

# Abrir: http://localhost:4173
```

**Testar rapidamente**:
1. [ ] Login funciona ✅
2. [ ] Dashboard carrega ✅
3. [ ] Navegação funciona ✅

**Se funciona**: ✅ PRONTO PARA DEPLOY!

---

## FASE 2: DEPLOY STAGING (30min)

### Passo 2.1: Escolher Plataforma

**Opção A: Vercel** (recomendado - mais fácil)
- ✅ Deploy em 2 minutos
- ✅ HTTPS automático
- ✅ Preview branches
- ✅ Free tier generoso

**Opção B: Netlify** (alternativa)
- ✅ Similar ao Vercel
- ✅ HTTPS automático
- ✅ Free tier

**Opção C: GitHub Pages** (não recomendado para SPA)
- ⚠️ Configuração mais complexa
- ⚠️ Não suporta SPA bem

**Vou guiar você pelo VERCEL (mais fácil)**

---

### Passo 2.2: Setup Vercel

**2.2.1. Criar conta Vercel** (se ainda não tem)

1. Acessar: https://vercel.com/signup
2. Clicar **"Continue with GitHub"** (recomendado)
3. Autorizar Vercel a acessar GitHub
4. Aguardar confirmação

---

**2.2.2. Instalar Vercel CLI**

```bash
# Instalar globalmente
npm install -g vercel

# Verificar instalação
vercel --version
# Deve mostrar: Vercel CLI 33.x.x
```

---

**2.2.3. Fazer Login no Vercel**

```bash
# Login via navegador
vercel login

# Escolher método:
# > Continue with GitHub (recomendado)

# Aguardar mensagem no terminal:
# ✓ Logged in as seu-email@gmail.com
```

---

### Passo 2.3: Preparar Projeto para Deploy

**2.3.1. Verificar `.gitignore`**

```bash
# Abrir .gitignore e verificar que CONTÉM:
# .env
# .env.local
# dist/
# node_modules/
```

**⚠️ CRÍTICO**: NUNCA commitar `.env` com secrets!

---

**2.3.2. Commitar código (se ainda não commitou)**

```bash
# Verificar status
git status

# Se houver arquivos modificados:
git add .
git commit -m "feat: prepare for production deploy"

# Push para GitHub (se ainda não fez)
# git remote add origin https://github.com/SEU_USER/stagetek-crm.git
# git push -u origin main
```

---

### Passo 2.4: Deploy Staging via CLI

```bash
# Na raiz do projeto
cd C:\Users\David\Stagetek\stagetek-crm-system

# Deploy staging (primeiro deploy)
vercel

# O CLI vai perguntar várias coisas:
```

**Responder assim**:

```
? Set up and deploy "~/stagetek-crm-system"?
→ [ENTER] (Yes)

? Which scope do you want to deploy to?
→ [ENTER] (Your personal account)

? Link to existing project?
→ [ARROW DOWN] → N (criar novo projeto)

? What's your project's name?
→ stagetek-crm [ENTER]

? In which directory is your code located?
→ ./ [ENTER]

? Want to override the settings? [y/N]
→ N [ENTER]
```

**Aguardar deploy** (30-60s):
```
🔍  Inspect: https://vercel.com/seu-user/stagetek-crm/XXXXX
✅  Production: https://stagetek-crm.vercel.app [copied to clipboard]
```

**⚠️ MAS AINDA NÃO VAI FUNCIONAR!** Faltam as variáveis de ambiente.

---

### Passo 2.5: Configurar Variáveis de Ambiente no Vercel

**2.5.1. Via Dashboard** (mais fácil)

1. Abrir: https://vercel.com/seu-user/stagetek-crm
2. Clicar **"Settings"** (aba superior)
3. Clicar **"Environment Variables"** (menu lateral)
4. Adicionar variáveis:

**Variável 1**:
```
Name:  VITE_SUPABASE_URL
Value: https://seu-projeto.supabase.co
Environments: ✅ Production ✅ Preview ✅ Development
```

**Variável 2**:
```
Name:  VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (key do Supabase)
Environments: ✅ Production ✅ Preview ✅ Development
```

5. Clicar **"Save"**

---

**2.5.2. Redeployar com variáveis**

```bash
# Forçar redeploy
vercel --prod
```

**OU via Dashboard**:
1. Ir em **"Deployments"**
2. Clicar nos 3 pontinhos do último deploy
3. Clicar **"Redeploy"**
4. Clicar **"Redeploy"** novamente (confirmar)

Aguardar 30-60s até aparecer:
```
✅  Production: https://stagetek-crm.vercel.app
```

---

### Passo 2.6: Testar Staging

**Abrir URL no navegador**: https://stagetek-crm.vercel.app

**Testar workflow básico**:

1. [ ] Página de login carrega ✅
   - Se der erro 404 → Adicionar `vercel.json` (instrução abaixo)
   - Se der erro Supabase → Verificar variáveis de ambiente

2. [ ] Fazer login ✅
   - Email: (usuário do Supabase)
   - Senha: (senha do Supabase)

3. [ ] Dashboard carrega ✅

4. [ ] Navegar para /clientes ✅

5. [ ] Criar cliente "Teste Deploy" ✅

6. [ ] Verificar que salvou no Supabase ✅

**Se TUDO funciona**: 🎉 **STAGING OK!**

**Se dá erro 404 ao navegar** (comum em SPAs):

Criar arquivo `vercel.json` na raiz:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

```bash
# Commitar
git add vercel.json
git commit -m "fix: add vercel.json for SPA routing"
git push

# Redeploy
vercel --prod
```

---

## FASE 3: DEPLOY PRODUÇÃO (15min)

### Passo 3.1: Decidir Domínio

**Opção A: Usar domínio Vercel grátis**
- URL: `https://stagetek-crm.vercel.app`
- ✅ Grátis
- ✅ HTTPS automático
- ⚠️ URL longa

**Opção B: Domínio customizado** (se você tem)
- URL: `https://crm.stagetek.com.br`
- Precisa configurar DNS
- Vou te guiar se quiser

**Por enquanto, vamos usar Opção A (domínio Vercel)**

---

### Passo 3.2: Deploy Produção

Se staging está OK, a produção JÁ ESTÁ NO AR!

O comando `vercel --prod` já fez o deploy de produção.

**URL Produção**: https://stagetek-crm.vercel.app

---

### Passo 3.3: Configurar Domínio Customizado (Opcional)

**Se você tem um domínio** (ex: stagetek.com.br):

1. Ir em: https://vercel.com/seu-user/stagetek-crm/settings/domains
2. Clicar **"Add"**
3. Digitar: `crm.stagetek.com.br`
4. Clicar **"Add"**
5. Vercel vai pedir para configurar DNS:

```
Type: CNAME
Name: crm
Value: cname.vercel-dns.com
```

6. Ir no seu provedor de domínio (Registro.br, GoDaddy, etc)
7. Adicionar registro CNAME
8. Aguardar propagação (5min - 24h)
9. Verificar: https://crm.stagetek.com.br

---

### Passo 3.4: Validar Produção

**Abrir**: https://stagetek-crm.vercel.app

**Workflow COMPLETO** (seguir `.ai/VALIDATION-CHECKLIST.md`):

**Happy Path (20min)**:
1. [ ] Login → Dashboard ✅
2. [ ] Criar Cliente "ABC Eventos" ✅
3. [ ] Criar Oportunidade "Pedido Set Luz" ✅
4. [ ] Detalhes → Testar 6 tabs:
   - [ ] Histórico: Adicionar nota ✅
   - [ ] Email: Enviar email ✅
   - [ ] Tarefas: Criar tarefa ✅
   - [ ] Contatos: Adicionar João Silva ✅
   - [ ] Produtos: Vincular Mesa de Som ✅
   - [ ] Arquivos: Upload PDF ✅
5. [ ] Funil: Drag-and-drop ✅
6. [ ] Gerar Cotação PDF ✅
7. [ ] Enviar Cotação Email ✅

**Se TUDO funciona**: 🎉 **PRODUÇÃO OK!**

---

## FASE 4: PÓS-DEPLOY (15min)

### Passo 4.1: Configurar Monitoramento (Opcional)

**Vercel Analytics** (grátis):
1. Ir em: https://vercel.com/seu-user/stagetek-crm/analytics
2. Ativar **Web Analytics**
3. Deploy novamente (já inclui script)

**Supabase Monitoring**:
1. Ir em: https://app.supabase.com/project/SEU_PROJETO/reports
2. Verificar métricas:
   - API requests
   - Database usage
   - Storage usage

---

### Passo 4.2: Documentar Acesso

Criar arquivo `PRODUCTION.md` na raiz:

```markdown
# STAGETEK CRM - Produção

**URL**: https://stagetek-crm.vercel.app
**Deploy**: Vercel
**Database**: Supabase

## Acessos

**Admin**:
- Email: admin@stagetek.com
- Senha: (ver 1Password / LastPass)

**Supabase Dashboard**: https://app.supabase.com/project/SEU_PROJETO
**Vercel Dashboard**: https://vercel.com/seu-user/stagetek-crm

## Deploy

```bash
# Deploy staging
vercel

# Deploy produção
vercel --prod
```

## Rollback

Se algo der errado:
1. Ir em: https://vercel.com/seu-user/stagetek-crm/deployments
2. Clicar no deploy anterior (que funcionava)
3. Clicar "Promote to Production"
```

---

### Passo 4.3: Criar Usuários

**No Supabase Dashboard**:
1. Ir em: https://app.supabase.com/project/SEU_PROJETO/auth/users
2. Clicar **"Add user"** → **"Create new user"**
3. Preencher:
   - Email: vendedor1@stagetek.com
   - Password: (gerar senha forte)
   - Auto Confirm User: ✅ (marcar)
4. Clicar **"Create user"**
5. Repetir para os 5 usuários

**Enviar credenciais** para os usuários via email seguro.

---

### Passo 4.4: Treinamento Rápido

**Criar guia simples para usuários** (`USER-GUIDE.md`):

```markdown
# STAGETEK CRM - Guia Rápido

## Acesso
URL: https://stagetek-crm.vercel.app
Email: seu-email@stagetek.com
Senha: (fornecida por email)

## Principais Funcionalidades

### 1. Criar Cliente
Dashboard → Clientes → Novo Cliente

### 2. Criar Oportunidade
Dashboard → Oportunidades → Nova Oportunidade

### 3. Gerar Cotação
Oportunidade → Botão "Nova Cotação" → Adicionar Produtos → Gerar PDF

### 4. Funil Kanban
Menu → Funil de Vendas → Arrastar cards entre colunas

## Suporte
Dúvidas: contato@stagetek.com
```

---

## ✅ CHECKLIST FINAL

### Pré-Deploy
- [ ] Node.js 18+ instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] `.env` configurado
- [ ] Sistema testado localmente (`npm run dev`)
- [ ] Migrations executadas (Supabase)
- [ ] Build de produção OK (`npm run build`)

### Deploy Staging
- [ ] Vercel CLI instalado
- [ ] Login no Vercel (`vercel login`)
- [ ] Deploy staging (`vercel`)
- [ ] Variáveis de ambiente configuradas
- [ ] Redeploy com variáveis (`vercel --prod`)
- [ ] Staging testado e funcionando

### Deploy Produção
- [ ] Deploy produção OK
- [ ] URL produção funcionando
- [ ] Workflow completo validado
- [ ] 6 tabs funcionando
- [ ] Cotação PDF + Email OK

### Pós-Deploy
- [ ] Documentação criada (`PRODUCTION.md`)
- [ ] Usuários criados no Supabase
- [ ] Guia do usuário criado
- [ ] Treinamento agendado (se aplicável)

---

## 🚨 TROUBLESHOOTING

### Erro: "Invalid Supabase URL"
**Solução**:
1. Verificar `.env` local
2. Verificar variáveis no Vercel Dashboard
3. Redeploy: `vercel --prod`

### Erro: "Failed to fetch"
**Solução**:
1. Verificar se Supabase está online
2. Verificar URL no Supabase Dashboard
3. Verificar CORS (deve permitir seu domínio Vercel)

### Erro 404 ao navegar (SPA routing)
**Solução**:
Criar `vercel.json`:
```json
{
  "rewrites": [{"source": "/(.*)", "destination": "/index.html"}]
}
```

### Build fails com "Out of memory"
**Solução**:
```bash
# Aumentar memória Node.js
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### RLS policies bloqueando operações
**Solução**:
1. Verificar migrations aplicadas
2. Verificar usuário autenticado
3. Ver logs no Supabase Dashboard

---

## 📞 SUPORTE

**Documentação**:
- Este guia: `DEPLOY-GUIDE.md`
- Validação: `.ai/VALIDATION-CHECKLIST.md`
- Análise 80/20: `.ai/80-20-ANALYSIS-FINAL-REPORT.md`

**Links Úteis**:
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Vite Docs: https://vitejs.dev/guide/

---

## 🎉 PARABÉNS!

Se chegou até aqui e tudo está funcionando:

**🚀 STAGETEK CRM ESTÁ NO AR!**

**Próximos passos** (Semana 1):
1. Coletar feedback dos 5 usuários
2. Fix bugs críticos (se houver)
3. Implementar features P1:
   - Lista Cotações Salvas (Story 5.1)
   - Busca Global Ctrl+K (Story 5.3)

---

**Boa sorte! 🎉**

*Guia criado por BMad Master (Claude Code)*
*Data: 17 de Novembro de 2025*
