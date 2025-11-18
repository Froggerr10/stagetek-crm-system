# 🚀 PRÓXIMOS PASSOS - DEPLOY STAGETEK CRM

**Status Atual**: ✅ Build testado e funcionando (692KB gzipped)
**Pronto para**: Deploy staging → validação → deploy produção

---

## ✅ O QUE JÁ FOI FEITO (AUTOMATICAMENTE)

### 1. Arquivos de Deploy Criados
- ✅ `vercel.json` - Configuração Vercel (SPA routing + cache)
- ✅ `.vercelignore` - Otimização do deploy (ignora arquivos desnecessários)
- ✅ `scripts/deploy.sh` - Script automatizado (Linux/Mac)
- ✅ `scripts/deploy.ps1` - Script automatizado (Windows PowerShell)

### 2. Build Testado
- ✅ `npm run build` executado com sucesso
- ✅ Pasta `dist/` criada com 3 arquivos:
  - `index.html` (0.64 KB)
  - `index-ByopfJpo.css` (53 KB / 9.38 KB gzipped)
  - `index-Crelbeig.js` (2.13 MB / 692 KB gzipped)

### 3. Validações
- ✅ `package.json` OK (Node 18+, scripts corretos)
- ✅ `.env` existe (variáveis locais configuradas)
- ✅ `.env.example` existe (template para deploy)
- ✅ `.gitignore` correto (.env ignorado ✓)
- ⚠️ TypeScript: 38 erros (não impedem build, mas devem ser corrigidos)

---

## 🎯 PRÓXIMO PASSO: DEPLOY MANUAL (VOCÊ PRECISA FAZER)

### Opção A: Deploy Automatizado (Recomendado)

**Windows PowerShell**:
```powershell
# Na raiz do projeto
.\scripts\deploy.ps1 staging
```

**Linux/Mac**:
```bash
# Dar permissão (primeira vez)
chmod +x scripts/deploy.sh

# Executar
./scripts/deploy.sh staging
```

**O script vai**:
1. Verificar Vercel CLI instalado
2. Fazer login no Vercel (se necessário)
3. Verificar .env existe
4. Rodar build
5. Fazer deploy staging

---

### Opção B: Deploy Manual (Passo a Passo)

#### 1. Instalar Vercel CLI (se ainda não tem)
```bash
npm install -g vercel
```

#### 2. Fazer Login
```bash
vercel login
# Escolher: Continue with GitHub
```

#### 3. Deploy Staging
```bash
# Na raiz do projeto
vercel

# Responder:
# Set up? → YES [ENTER]
# Which scope? → [ENTER] (sua conta)
# Link project? → NO (criar novo)
# Project name? → stagetek-crm [ENTER]
# Code directory? → ./ [ENTER]
# Override settings? → NO [ENTER]
```

**Aguardar 1-2min...**

Vai aparecer:
```
✅ Preview: https://stagetek-crm-xxx.vercel.app
```

⚠️ **MAS não vai funcionar ainda!** Falta configurar variáveis de ambiente.

---

#### 4. Configurar Variáveis no Vercel Dashboard

**4.1. Abrir Vercel Dashboard**:
1. Ir em: https://vercel.com
2. Clicar no projeto "stagetek-crm"
3. Clicar em **"Settings"** (aba superior)
4. Clicar em **"Environment Variables"** (menu lateral)

**4.2. Adicionar Variável 1**:
```
Name:  VITE_SUPABASE_URL
Value: (copiar do seu .env local - linha "VITE_SUPABASE_URL=...")
Environments:
  ✅ Production
  ✅ Preview
  ✅ Development
```
Clicar **"Save"**

**4.3. Adicionar Variável 2**:
```
Name:  VITE_SUPABASE_ANON_KEY
Value: (copiar do seu .env local - linha "VITE_SUPABASE_ANON_KEY=...")
Environments:
  ✅ Production
  ✅ Preview
  ✅ Development
```
Clicar **"Save"**

**4.4. (Opcional) Adicionar Variável 3**:
```
Name:  VITE_RESEND_API_KEY
Value: (copiar do .env se tiver configurado)
Environments: ✅ Todas
```

---

#### 5. Redeploy com Variáveis

**Opção A: Via CLI**:
```bash
vercel --prod
```

**Opção B: Via Dashboard**:
1. Ir em **"Deployments"**
2. Clicar nos 3 pontinhos do último deploy
3. Clicar **"Redeploy"**
4. Clicar **"Redeploy"** novamente (confirmar)

**Aguardar 1-2min...**

---

#### 6. Testar Staging

**Abrir URL**: https://stagetek-crm.vercel.app

**Checklist Rápido** (5min):
- [ ] Página de login carrega? ✅
- [ ] Fazer login (email/senha do Supabase) ✅
- [ ] Dashboard carrega? ✅
- [ ] Navegar para /clientes ✅
- [ ] Criar cliente "Teste Deploy" ✅
- [ ] Verificar que salvou no Supabase ✅

**Se TUDO funciona**: 🎉 **STAGING OK!**

---

## 🎯 APÓS STAGING OK: DEPLOY PRODUÇÃO

Se staging está funcionando perfeitamente:

```bash
# Deploy produção
vercel --prod

# OU usar script
.\scripts\deploy.ps1 production
```

**URL Produção**: https://stagetek-crm.vercel.app (mesma URL)

---

## 📋 CHECKLIST COMPLETO

### Pré-Deploy (Você)
- [ ] Supabase configurado (tabelas criadas, RLS policies)
- [ ] `.env` com URL e KEY corretos
- [ ] Migrations executadas no Supabase

### Deploy Staging (Você + Script)
- [ ] Vercel CLI instalado
- [ ] Login no Vercel
- [ ] Deploy staging (`vercel`)
- [ ] Variáveis configuradas no Dashboard
- [ ] Redeploy com variáveis
- [ ] Staging testado e OK

### Deploy Produção (Você)
- [ ] Staging 100% funcional
- [ ] Deploy produção (`vercel --prod`)
- [ ] Produção testada
- [ ] Validação completa (`.ai/VALIDATION-CHECKLIST.md`)

### Pós-Deploy (Você)
- [ ] Criar usuários no Supabase Auth
- [ ] Enviar credenciais para equipe
- [ ] Documentar URL produção
- [ ] Agendar treinamento (se aplicável)

---

## 🆘 TROUBLESHOOTING

### Erro: "Invalid Supabase URL"
**Causa**: Variáveis de ambiente não configuradas no Vercel
**Solução**:
1. Ir em Vercel → Settings → Environment Variables
2. Adicionar `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
3. Redeploy

---

### Erro: 404 ao navegar entre páginas
**Causa**: SPA routing não configurado
**Solução**: Já criado! `vercel.json` tem rewrites corretos.

---

### Erro: Build falha com "Out of memory"
**Solução**:
```bash
# Aumentar memória Node.js
set NODE_OPTIONS=--max-old-space-size=4096
npm run build
```

---

### Erro: TypeScript errors impedem deploy
**Nota**: TypeScript errors NÃO impedem build Vite (já testado).
Mas se quiser corrigir:
1. Ver lista completa: `npm run type-check`
2. Maioria são tipos do Supabase (tabelas novas)
3. Solução: Gerar tipos: `npx supabase gen types typescript`

---

## 📊 MÉTRICAS DO BUILD

**Tamanho do Bundle**:
- CSS: 53 KB (9.38 KB gzipped) ✅ OK
- JS: 2.13 MB (692 KB gzipped) ⚠️ Grande, mas OK para MVP

**Performance Esperada**:
- First Load: ~2-3s (mobile 3G)
- Lighthouse Score: >85 (estimado)

**Otimizações Futuras** (Pós-MVP):
- Code splitting (dynamic imports)
- Lazy load de rotas
- Image optimization
- CDN para assets

---

## 🎉 QUANDO ESTIVER NO AR

**Compartilhe**:
- URL: https://stagetek-crm.vercel.app
- Credenciais: (criar usuários no Supabase)
- Guia rápido: Enviar `USER-GUIDE.md` para equipe

**Monitore**:
- Vercel Analytics: https://vercel.com/analytics
- Supabase Dashboard: https://app.supabase.com/project/SEU_PROJETO
- Erros: Vercel Logs

**Próximas Features** (Semana 1):
1. Lista Cotações Salvas (Story 5.1 - 3 dias)
2. Busca Global Ctrl+K (Story 5.3 - 3 dias)

---

## 📞 SUPORTE

**Documentação Completa**:
- `DEPLOY-GUIDE.md` - Guia detalhado passo a passo
- `.ai/VALIDATION-CHECKLIST.md` - Checklist de testes
- `.ai/80-20-ANALYSIS-FINAL-REPORT.md` - Análise completa

**Precisa de Ajuda?**
- Me avise em qual passo está travado
- Compartilhe o erro específico
- Vou te ajudar a resolver!

---

**Boa sorte com o deploy! 🚀**

*Documento gerado automaticamente*
*Data: 17 de Novembro de 2025*
