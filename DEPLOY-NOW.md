# 🚀 DEPLOY AGORA - COMANDOS SIMPLES

**Problema detectado**: Script original com erro de encoding
**Solução**: Comandos manuais diretos (mais simples e confiável)

---

## ▶️ OPÇÃO 1: Script Simplificado (SE QUISER TENTAR)

```powershell
.\scripts\deploy-simple.ps1
```

---

## ▶️ OPÇÃO 2: Comandos Manuais (RECOMENDADO)

Execute estes comandos **um por um** no PowerShell:

### Passo 1: Instalar Vercel CLI

```powershell
npm install -g vercel
```

Aguardar instalação...

---

### Passo 2: Login no Vercel

```powershell
vercel login
```

**Vai abrir navegador** → Escolher "Continue with GitHub" → Autorizar

Aguardar mensagem: `✓ Logged in as seu-email@...`

---

### Passo 3: Build

```powershell
npm run build
```

Aguardar 30-60s...

Verificar mensagem: `✓ built in XX.XXs`

---

### Passo 4: Deploy Staging

```powershell
vercel
```

**Responder as perguntas**:

```
? Set up and deploy "~/stagetek-crm-system"?
→ Y [ENTER]

? Which scope do you want to deploy to?
→ [ENTER] (sua conta pessoal)

? Link to existing project?
→ N [ENTER] (criar novo)

? What's your project's name?
→ stagetek-crm [ENTER]

? In which directory is your code located?
→ ./ [ENTER]

? Want to override the settings?
→ N [ENTER]
```

**Aguardar deploy... (1-2 minutos)**

Vai aparecer:
```
✅ Preview: https://stagetek-crm-xxx.vercel.app
```

**COPIE ESTA URL!** Mas ainda NÃO abra (falta configurar variáveis).

---

### Passo 5: Configurar Variáveis de Ambiente

**5.1. Abrir Vercel Dashboard**:
```
https://vercel.com/dashboard
```

**5.2. Clicar no projeto** "stagetek-crm"

**5.3. Ir em**: Settings → Environment Variables

**5.4. Adicionar primeira variável**:
- **Name**: `VITE_SUPABASE_URL`
- **Value**: (abrir seu `.env` e copiar o valor de `VITE_SUPABASE_URL`)
- **Environments**: Marcar TODAS (Production, Preview, Development)
- Clicar **"Save"**

**5.5. Adicionar segunda variável**:
- **Name**: `VITE_SUPABASE_ANON_KEY`
- **Value**: (abrir seu `.env` e copiar o valor de `VITE_SUPABASE_ANON_KEY`)
- **Environments**: Marcar TODAS
- Clicar **"Save"**

---

### Passo 6: Redeploy com Variáveis

**Voltar ao PowerShell e executar**:

```powershell
vercel --prod
```

Aguardar 1-2 minutos...

Vai aparecer:
```
✅ Production: https://stagetek-crm.vercel.app
```

---

### Passo 7: TESTAR!

**Abrir URL no navegador**: https://stagetek-crm.vercel.app

**Teste rápido**:
1. Página de login carrega? ✅
2. Fazer login (email/senha do Supabase) ✅
3. Dashboard aparece? ✅
4. Clicar em "Clientes" ✅
5. Tentar criar cliente de teste ✅

**Se TUDO funciona**: 🎉 **SISTEMA NO AR!**

---

## 🆘 SE DER ERRO

### Erro: "Invalid Supabase URL" na tela

**Causa**: Variáveis não configuradas ou incorretas

**Solução**:
1. Verificar no Vercel Dashboard → Settings → Environment Variables
2. Verificar que `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão corretas
3. Comparar com seu `.env` local
4. Redeploy: `vercel --prod`

---

### Erro: "Command not found: vercel"

**Causa**: Vercel CLI não instalou corretamente

**Solução**:
```powershell
npm install -g vercel --force
```

Fechar e reabrir PowerShell, tentar novamente.

---

### Erro: Build falha

**Causa**: Dependências não instaladas

**Solução**:
```powershell
npm install
npm run build
```

---

## 📝 RESUMO COMANDOS (COPIAR E COLAR)

```powershell
# 1. Instalar Vercel
npm install -g vercel

# 2. Login
vercel login

# 3. Build
npm run build

# 4. Deploy staging
vercel

# (Configurar variáveis no dashboard)

# 5. Deploy produção
vercel --prod
```

---

## ✅ CHECKLIST

- [ ] Vercel CLI instalado
- [ ] Login feito
- [ ] Build executado com sucesso
- [ ] Deploy staging feito
- [ ] Variáveis configuradas no dashboard (VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY)
- [ ] Redeploy produção feito
- [ ] Sistema testado e funcionando

---

## 🎯 PRÓXIMO PASSO

**EXECUTE AGORA**:
```powershell
npm install -g vercel
```

Depois me avise o resultado!
