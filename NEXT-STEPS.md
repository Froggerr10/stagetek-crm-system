# 🚀 PRÓXIMOS PASSOS - STAGETEK CRM

**Última atualização**: 11 de Outubro de 2025

---

## ✅ CONCLUÍDO HOJE (11 Out 2025)

- ✅ Protocol Notecraft™ - 100% compliance
- ✅ Automação (validate script + pre-commit hook)
- ✅ Refatoração de 10 componentes (-434 linhas)
- ✅ Supabase configurado (`.env` com credenciais)
- ✅ Documentação atualizada (CLAUDE.md)

---

## 🎯 PRIORIDADE 1: Database Setup (15-30 min)

### Passo 1: Acessar Supabase
- URL: https://twcpqhhtoqcgzplrmohi.supabase.co
- Login com conta existente

### Passo 2: Executar SQL Migrations
1. No Supabase Dashboard, ir em **SQL Editor**
2. Clicar em **+ New Query**
3. Copiar o schema de `protocol/DATABASE-SCHEMA-V2-ANALYSIS.md`
4. Executar query para criar tabelas

**Tabelas necessárias (ordem de criação)**:
```sql
1. clients           -- Empresas clientes
2. contacts          -- Contatos das empresas
3. pipelines         -- Funis de vendas
4. stages            -- Estágios dos funis
5. deals             -- Oportunidades
6. tasks             -- Tarefas
7. products          -- Catálogo de produtos
8. deal_products     -- Produtos por oportunidade
9. notes             -- Anotações
10. activities       -- Log de atividades
```

### Passo 3: Configurar RLS (Row Level Security)
- Policies para garantir que usuários só vejam seus próprios dados
- Script RLS disponível em `protocol/DATABASE-SCHEMA-V2-ANALYSIS.md`

### Passo 4: Seed Data Inicial
```sql
-- Funil padrão
INSERT INTO pipelines (name, description)
VALUES ('Pipeline Padrão', 'Funil de vendas principal');

-- Estágios padrão
INSERT INTO stages (pipeline_id, name, color, display_order)
VALUES
  (1, 'Lead', '#3b82f6', 1),
  (1, 'Contato', '#8b5cf6', 2),
  (1, 'Proposta', '#f59e0b', 3),
  (1, 'Negociação', '#ef4444', 4),
  (1, 'Fechamento', '#10b981', 5);
```

### Passo 5: Testar Conexão
```bash
# Verificar no browser console (DevTools → Network)
npm run dev
# Abrir http://localhost:5174/clientes
# Ver se há erros de conexão Supabase
```

---

## 🎯 PRIORIDADE 2: Conectar UI ao Backend (1-2h)

### Passo 1: Atualizar `src/pages/Clientes.tsx`

**Substituir mock data por Supabase queries:**

```typescript
// Antes (mock):
const mockClients = [...]

// Depois (Supabase):
const { data: clientes, error } = await supabase
  .from('clients')
  .select('*')
  .order('created_at', { ascending: false })
```

**Arquivo**: `src/pages/Clientes.tsx` (~linha 20)

### Passo 2: Atualizar `src/hooks/useClienteForm.ts`

**Já usa Supabase!** ✅ (linhas 46-48)
- Apenas testar CRUD (criar, editar, deletar)

### Passo 3: Atualizar `src/pages/Oportunidades.tsx`

**Substituir mock data:**

```typescript
// Antes (mock):
const mockDeals = [...]

// Depois (Supabase):
const { data: deals, error } = await supabase
  .from('deals')
  .select(`
    *,
    clients (name),
    stages (name, color)
  `)
  .order('created_at', { ascending: false })
```

### Passo 4: Atualizar `src/hooks/useOportunidadeForm.ts`

**Já usa Supabase!** ✅ (linhas 46-48)
- Apenas testar CRUD

### Passo 5: Testar CRUD Completo

**Clientes:**
- [ ] Criar cliente
- [ ] Editar cliente
- [ ] Deletar cliente
- [ ] Filtrar clientes (search bar)

**Oportunidades:**
- [ ] Criar oportunidade
- [ ] Editar oportunidade
- [ ] Deletar oportunidade
- [ ] Ver oportunidades por estágio

---

## 🎯 PRIORIDADE 3: Funil Kanban (2-3h)

### Passo 1: Migrar de HTML para React

**Atual**: `pages/funil-vendas.html` (standalone)
**Novo**: `src/pages/Funil.tsx` (React)

**Usar biblioteca**:
```bash
npm install @dnd-kit/core @dnd-kit/sortable
```

### Passo 2: Implementar Drag & Drop

**Componentes necessários**:
- `src/components/organisms/KanbanBoard.tsx` (≤50 linhas)
- `src/components/molecules/KanbanColumn.tsx` (≤35 linhas)
- `src/components/molecules/DealCard.tsx` (≤35 linhas)

### Passo 3: Conectar ao Supabase

**Atualizar estágio ao arrastar:**
```typescript
const handleDragEnd = async (event) => {
  const { active, over } = event
  if (over) {
    await supabase
      .from('deals')
      .update({ stage_id: over.id })
      .eq('id', active.id)
  }
}
```

---

## 🎯 PRIORIDADE 4: Dashboard com Dados Reais (1-2h)

### Passo 1: Atualizar StatCards

**Queries Supabase**:
```typescript
// Total de oportunidades
const { count: totalDeals } = await supabase
  .from('deals')
  .select('*', { count: 'exact', head: true })

// Receita total
const { data: revenue } = await supabase
  .from('deals')
  .select('value')
  .eq('stage_id', CLOSED_WON_STAGE_ID)
```

### Passo 2: Conectar Gráficos (Recharts)

**Gráfico de vendas por mês**:
```typescript
const { data: salesByMonth } = await supabase
  .from('deals')
  .select('created_at, value')
  .gte('created_at', startOfYear)
```

---

## 🎯 PRIORIDADE 5: Deploy (10-15 min)

### Passo 1: Commit Tudo

```bash
git add .
git commit -m "feat: Protocol Notecraft™ refactoring + Supabase integration

- 100% Protocol Notecraft™ compliance achieved
- Automation: validation script + pre-commit hook
- Refactored 10 components (-434 lines, -48% avg)
- Connected to Supabase database
- CRUD fully functional (clients + deals)

Breaking changes: None
Database schema: protocol/DATABASE-SCHEMA-V2-ANALYSIS.md"
```

### Passo 2: Push para GitHub

```bash
git push origin main
```

### Passo 3: Deploy Vercel (Automático)

- Se conectado ao GitHub, deploy é automático
- Verificar: https://vercel.com/dashboard
- Adicionar `.env` vars no Vercel:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

---

## 📋 Checklist Geral

### Setup (Concluído)
- [x] React + TypeScript configurado
- [x] Tailwind CSS configurado
- [x] Supabase client criado
- [x] Protocol Notecraft™ automação
- [x] Pre-commit hooks

### Backend (Próximo)
- [ ] Tabelas criadas no Supabase
- [ ] RLS policies configuradas
- [ ] Seed data inserido
- [ ] Conexão testada

### Frontend (Depois)
- [ ] Mock data → Supabase queries
- [ ] CRUD clientes testado
- [ ] CRUD oportunidades testado
- [ ] Funil Kanban migrado para React
- [ ] Dashboard com dados reais

### Deploy (Final)
- [ ] Commit & push
- [ ] Deploy Vercel
- [ ] Environment variables configuradas
- [ ] Smoke tests em produção

---

## 🆘 Se Algo Der Errado

### Erro: "Supabase connection failed"
- Verificar `.env` (URL e ANON_KEY corretos?)
- Verificar firewall/VPN
- Testar URL no browser: https://twcpqhhtoqcgzplrmohi.supabase.co

### Erro: "RLS policy violation"
- Desabilitar RLS temporariamente (Supabase Dashboard → Authentication → Policies)
- Ou: adicionar policy permissiva:
  ```sql
  CREATE POLICY "Allow all for now" ON clients
  FOR ALL USING (true);
  ```

### Erro: "Pre-commit hook blocked commit"
- Rodar validação: `npm run validate:notecraft`
- Ver quais arquivos violaram
- Refatorar ou temporariamente desabilitar hook:
  ```bash
  git commit --no-verify -m "WIP: violating notecraft"
  ```

---

## 📞 Contato & Suporte

- **Documentação**: `/protocol/*.md`
- **Supabase Dashboard**: https://twcpqhhtoqcgzplrmohi.supabase.co
- **Vite Docs**: https://vitejs.dev
- **Tailwind Docs**: https://tailwindcss.com

---

**Tempo estimado total**: 4-6 horas
**Prioridade máxima**: Database Setup (sem isso, nada funciona!)

**Boa sorte! 🚀**
