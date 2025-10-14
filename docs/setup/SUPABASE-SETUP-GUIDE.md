# 🚀 Guia de Setup do Supabase - STAGETEK CRM

**Tempo estimado**: 10-15 minutos

---

## ✅ Pré-requisitos

- [x] Projeto Supabase criado: `twcpqhhtoqcgzplrmohi.supabase.co`
- [x] Credenciais em `.env` configuradas
- [x] Migrations SQL prontas em `supabase/migrations/`

---

## 📝 Passo 1: Executar Migration Principal

### 1.1 Acessar Supabase Dashboard
- URL: https://supabase.com/dashboard/project/twcpqhhtoqcgzplrmohi
- Login com sua conta

### 1.2 Abrir SQL Editor
1. No menu lateral, clicar em **SQL Editor**
2. Clicar no botão **+ New Query**

### 1.3 Copiar e Executar Schema
1. Abrir arquivo: `supabase/migrations/20251004_initial_schema.sql`
2. Copiar TODO o conteúdo (259 linhas)
3. Colar no SQL Editor do Supabase
4. Clicar em **Run** (ou Ctrl+Enter)

**Resultado esperado**:
```
Success. No rows returned
```

### 1.4 Verificar Tabelas Criadas
1. No menu lateral, clicar em **Table Editor**
2. Verificar se as seguintes tabelas aparecem:
   - ✅ `clients`
   - ✅ `funnels`
   - ✅ `funnel_stages`
   - ✅ `opportunities`
   - ✅ `notes`
   - ✅ `tasks`

**Se as tabelas NÃO aparecerem:**
- Verificar console de erros no SQL Editor
- Provavelmente RLS ou extensão UUID
- Tentar desabilitar RLS temporariamente

---

## 📝 Passo 2: Executar Seed Data (Dados Iniciais)

### 2.1 Nova Query no SQL Editor
1. Clicar em **+ New Query** novamente
2. Abrir arquivo: `supabase/seed.sql`
3. Copiar TODO o conteúdo (133 linhas)
4. Colar no SQL Editor
5. Clicar em **Run**

**Resultado esperado**:
```
Success. 7 rows returned (ou similar)
```

### 2.2 Verificar Dados Inseridos

**Verificar Funil Padrão:**
```sql
SELECT * FROM funnels;
```
Deve retornar 1 funil: "Funil PADRÃO"

**Verificar Estágios:**
```sql
SELECT * FROM funnel_stages ORDER BY display_order;
```
Deve retornar 5 estágios:
1. Sem contato / Lead (gray)
2. Contato Feito (blue)
3. Visita / Apresentação (purple)
4. Proposta Enviada (orange)
5. Fechamento (green)

**Verificar Clientes:**
```sql
SELECT * FROM clients;
```
Deve retornar 5 clientes mock (Mega Produções, etc.)

**Verificar Produtos:**
```sql
SELECT * FROM products LIMIT 5;
```
Deve retornar 20 produtos (treliças, talhas, mesas de som, etc.)

**Verificar Oportunidades:**
```sql
SELECT * FROM opportunities;
```
Deve retornar 7 oportunidades distribuídas pelos 5 estágios

---

## 🧪 Passo 3: Testar Conexão do Frontend

### 3.1 Rodar Servidor de Desenvolvimento
```bash
npm run dev
```

### 3.2 Abrir DevTools
- Pressionar F12 (ou Ctrl+Shift+I)
- Ir na aba **Network**
- Filtrar por "supabase"

### 3.3 Acessar Página de Clientes
- Navegar para: http://localhost:5174/clientes

**Resultado esperado**:
- Ver requisições para `twcpqhhtoqcgzplrmohi.supabase.co`
- Status: 200 OK
- Ver 5 clientes mock na tabela

**Se NÃO funcionar:**
- Verificar console (F12 → Console) por erros
- Verificar `.env` (URL e ANON_KEY corretos?)
- Verificar RLS policies (podem estar bloqueando)

### 3.4 Testar CRUD

**Criar novo cliente:**
1. Clicar no botão **+ Novo Cliente**
2. Preencher formulário:
   - Nome: "Teste CRM"
   - CNPJ: "12.345.678/0001-90"
   - Email: "teste@crm.com"
3. Clicar em **Criar Cliente**
4. Verificar se aparece na lista

**Editar cliente:**
1. Clicar em **Editar** em qualquer cliente
2. Mudar nome
3. Salvar
4. Verificar mudança

**Deletar cliente:**
1. Clicar em **Excluir**
2. Confirmar
3. Verificar remoção da lista

---

## 🔐 Passo 4: Verificar Row Level Security (RLS)

### 4.1 Ver Policies Ativas
1. No Supabase Dashboard, ir em **Authentication → Policies**
2. Verificar se há policies para cada tabela

**Policies esperadas**:
- `clients`: 3 policies (SELECT, INSERT, UPDATE)
- `funnels`: 1 policy (SELECT)
- `funnel_stages`: 1 policy (SELECT)
- `opportunities`: 3 policies (SELECT, INSERT, UPDATE)
- `notes`: 2 policies (SELECT, INSERT)
- `tasks`: 3 policies (SELECT, INSERT, UPDATE)

### 4.2 Testar sem Autenticação

**Logout do sistema:**
1. Clicar no avatar (canto superior direito)
2. Clicar em **Sair**
3. Tentar acessar `/clientes` diretamente

**Resultado esperado:**
- Deve redirecionar para `/login`
- Se acessar mesmo assim, RLS está desabilitado

---

## 🐛 Troubleshooting

### Erro: "relation 'clients' does not exist"
**Causa**: Migration não foi executada
**Solução**: Rodar novamente `20251004_initial_schema.sql`

### Erro: "permission denied for table clients"
**Causa**: RLS bloqueando acesso
**Solução temporária**:
```sql
-- APENAS PARA DESENVOLVIMENTO!
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities DISABLE ROW LEVEL SECURITY;
```

### Erro: "CORS policy blocked"
**Causa**: URL do Supabase incorreta
**Solução**: Verificar `.env` (deve ser `twcpqhhtoqcgzplrmohi.supabase.co`)

### Erro: "Invalid API key"
**Causa**: ANON_KEY incorreto
**Solução**:
1. Ir em Supabase Dashboard → Settings → API
2. Copiar novamente o `anon` key (público)
3. Atualizar `.env`

### Tabelas criadas mas vazias após seed
**Causa**: UUIDs hardcoded não funcionaram
**Solução**: Modificar seed.sql para usar `gen_random_uuid()`:
```sql
-- Em vez de:
INSERT INTO funnels (id, name, ...) VALUES ('00000...', 'Funil', ...);

-- Usar:
INSERT INTO funnels (name, ...) VALUES ('Funil', ...);
```

---

## ✅ Checklist Final

Após completar todos os passos, você deve ter:

- [ ] 6 tabelas criadas (clients, funnels, funnel_stages, opportunities, notes, tasks)
- [ ] 1 funil padrão com 5 estágios
- [ ] 5 clientes mock
- [ ] 20 produtos mock
- [ ] 7 oportunidades mock distribuídas
- [ ] RLS policies ativas
- [ ] Triggers de `updated_at` funcionando
- [ ] Frontend conectando ao Supabase (Network tab mostra requisições)
- [ ] CRUD clientes funcionando 100%
- [ ] CRUD oportunidades funcionando 100%

---

## 🚀 Próximos Passos

Após setup completo:

1. **Testar Funil Kanban**
   - Navegar para `/oportunidades`
   - Ver oportunidades nos estágios corretos
   - (Drag-and-drop virá depois)

2. **Testar Dashboard**
   - Navegar para `/dashboard`
   - Ver estatísticas reais (não mock)

3. **Commit & Deploy**
   ```bash
   git add .
   git commit -m "feat: connect to Supabase database"
   git push
   ```

---

**Duração total**: ~15 minutos se tudo correr bem

**Em caso de dúvidas**, consultar:
- Documentação Supabase: https://supabase.com/docs
- Schema completo: `supabase/migrations/20251004_initial_schema.sql`
- Seed data: `supabase/seed.sql`
