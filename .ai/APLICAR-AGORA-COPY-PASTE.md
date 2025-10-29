# 🚀 APLICAR MIGRATIONS - COPIAR E COLAR

**Tempo total**: 2 minutos ⚡

---

## 📋 PASSO 1: Abrir Supabase Dashboard

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto: **stagetek-crm-system**
3. Menu lateral: **SQL Editor**
4. Clique em **"New query"**

---

## 📋 PASSO 2: Copiar SQL Consolidado

**Abra o arquivo**:
```
supabase/migrations/20251025_ALL_MIGRATIONS_CONSOLIDATED.sql
```

**Ou copie direto daqui** ⬇️

(Arquivo tem ~1,100 linhas - vai aplicar TODAS as 6 migrations de uma vez)

---

## 📋 PASSO 3: Colar no SQL Editor

1. **Ctrl+A** (selecionar tudo no query editor)
2. **Ctrl+V** (colar o SQL consolidado)
3. **Ctrl+Enter** OU clicar botão **"Run"**

---

## 📋 PASSO 4: Aguardar Execução

**Tempo esperado**: 10-30 segundos

**Resultado esperado**:
```
Success. No rows returned.
```

✅ Se você ver isso = **SUCESSO!** Todas migrations aplicadas.

❌ Se der erro = copie a mensagem de erro e me envie.

---

## 📋 PASSO 5: Verificar (Opcional)

Rode este SQL para confirmar:

```sql
-- Verificar tabelas novas
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('emails_sent', 'opportunity_products');

-- Esperado: 2 linhas ✅
```

```sql
-- Verificar RLS habilitado
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('clients', 'opportunities', 'tasks');

-- Esperado: rowsecurity = true ✅
```

```sql
-- Verificar Storage buckets
SELECT id, name, public
FROM storage.buckets
WHERE id IN ('pdfs', 'attachments');

-- Esperado: 2 buckets ✅
```

---

## ✅ DEPOIS DE APLICAR

**Volte ao chat e digite**:
```
aplicado
```

**Ou comece direto com a próxima fase**:
```
implement story 3.1
```

---

## 🆘 SE DER ERRO

**Erros comuns**:

1. **"relation already exists"**
   - Solução: Tabelas já existem. Está OK! ✅

2. **"policy already exists"**
   - Solução: Policies já existem. Está OK! ✅
   - (O SQL tem `DROP POLICY IF EXISTS`, então é idempotente)

3. **"permission denied"**
   - Solução: Você precisa de permissões de admin no projeto Supabase
   - Verifique se está logado com conta correta

4. **"syntax error"**
   - Solução: Copie a mensagem de erro completa e me envie

---

**ATENÇÃO**: O arquivo consolidado aplica:
- ✅ RLS policies (11 tabelas)
- ✅ Novas tabelas (emails_sent, opportunity_products)
- ✅ Storage buckets (pdfs, attachments)
- ✅ Indexes de performance
- ✅ Triggers (auto-update created_by)

**Total**: ~1,100 linhas SQL executadas de uma vez.
