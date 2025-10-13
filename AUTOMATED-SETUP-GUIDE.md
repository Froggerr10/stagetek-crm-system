# 🤖 Setup Automatizado do Banco de Dados

**3 formas de executar o setup do banco:**

---

## ⭐ Opção 1: Supabase CLI (Recomendado)

A forma mais profissional e segura.

### **Passo 1: Login na CLI**

```bash
npx supabase login
```

Abrirá o browser para autenticação. Após login, volte ao terminal.

### **Passo 2: Link ao projeto remoto**

```bash
npx supabase link --project-ref twcpqhhtoqcgzplrmohi
```

### **Passo 3: Executar setup automático**

```bash
npm run db:setup
```

Este comando executa:
1. `npx supabase db push` → Aplica migrations em `supabase/migrations/`
2. `npx supabase db execute --file supabase/seed.sql` → Insere dados iniciais

### **Passo 4: Validar**

```bash
npm run test:supabase
```

**Vantagens:**
- ✅ Oficial do Supabase
- ✅ Versionamento de migrations
- ✅ Rollback fácil
- ✅ Funciona em CI/CD

---

## 💻 Opção 2: Script TypeScript com API

Usa a API do Supabase diretamente via código.

### **Passo 1: Obter SERVICE_ROLE_KEY**

1. Acessar: https://supabase.com/dashboard/project/twcpqhhtoqcgzplrmohi/settings/api
2. Copiar **"service_role"** key (seção "Project API keys")
3. Adicionar no `.env`:

```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANTE**:
- **NUNCA** commitar esta chave!
- Adicionar no `.gitignore`: `.env`
- SERVICE_ROLE_KEY tem acesso total ao banco

### **Passo 2: Executar script**

```bash
npm run db:migrate
```

### **Passo 3: Validar**

```bash
npm run test:supabase
```

**Vantagens:**
- ✅ Funciona sem instalar CLI
- ✅ Pode ser customizado facilmente
- ✅ Integra com scripts existentes

**Desvantagens:**
- ⚠️ Requer SERVICE_ROLE_KEY (sensível)
- ⚠️ Supabase API tem limitações para DDL complexo

---

## 🖱️ Opção 3: SQL Editor Manual (Simples)

Para quem prefere controle visual completo.

Seguir: `SUPABASE-SETUP-GUIDE.md`

**Vantagens:**
- ✅ Controle total
- ✅ Ver exatamente o que está sendo executado
- ✅ Não precisa de chaves adicionais

**Desvantagens:**
- ⏱️ Mais demorado (copy/paste manual)
- 🔄 Difícil de reproduzir em outros ambientes

---

## 📋 Comandos npm Disponíveis

```bash
# Setup completo (via Supabase CLI)
npm run db:setup

# Executar migrations (via TypeScript + API)
npm run db:migrate

# Reset completo do banco (⚠️ apaga TUDO)
npm run db:reset

# Testar conexão e validar setup
npm run test:supabase
```

---

## 🔄 Workflow Recomendado

### **Desenvolvimento (primeira vez):**
```bash
# 1. Login na CLI (uma vez)
npx supabase login

# 2. Link ao projeto
npx supabase link --project-ref twcpqhhtoqcgzplrmohi

# 3. Setup automático
npm run db:setup

# 4. Validar
npm run test:supabase
```

### **Desenvolvimento (próximas vezes):**

Quando criar novas migrations:

```bash
# 1. Criar migration (exemplo)
npx supabase migration new add_products_table

# 2. Editar arquivo .sql criado em supabase/migrations/

# 3. Aplicar localmente
npx supabase db push

# 4. Testar
npm run test:supabase
```

### **CI/CD (GitHub Actions, Vercel, etc.):**

```yaml
# .github/workflows/deploy.yml
- name: Setup Database
  run: |
    npx supabase link --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
    npx supabase db push
  env:
    SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
```

---

## 🚨 Troubleshooting

### Erro: "supabase: command not found"
```bash
npm install -g supabase
# ou
npx supabase --version  # Baixa automaticamente
```

### Erro: "Failed to link project"
Verificar se fez login:
```bash
npx supabase login
```

### Erro: "Permission denied" ao executar .sh
```bash
chmod +x scripts/setup-database.sh
./scripts/setup-database.sh
```

No Windows, use `.bat`:
```bash
scripts\setup-database.bat
```

### Erro: "Table already exists"
Você já executou a migration antes. Opções:

**Opção A: Continuar** (se não precisa recriar)
```bash
# Pular migration, só executar seed
npx supabase db execute --file supabase/seed.sql
```

**Opção B: Reset completo** (⚠️ apaga tudo)
```bash
npm run db:reset
npm run db:setup
```

---

## 📊 Comparação de Opções

| Critério           | CLI | TypeScript API | SQL Editor Manual |
|--------------------|-----|----------------|-------------------|
| Velocidade         | ⭐⭐⭐ | ⭐⭐⭐         | ⭐               |
| Segurança          | ⭐⭐⭐ | ⭐⭐           | ⭐⭐⭐            |
| Facilidade         | ⭐⭐  | ⭐⭐           | ⭐⭐⭐            |
| Versionamento      | ⭐⭐⭐ | ⭐⭐⭐         | ⭐               |
| CI/CD Ready        | ⭐⭐⭐ | ⭐⭐⭐         | ❌               |
| Rollback           | ⭐⭐⭐ | ⭐             | ❌               |

---

## 🎯 Recomendação Final

**Para setup inicial (agora)**: Use **Opção 1 (CLI)** ou **Opção 3 (Manual)**

**Para desenvolvimento futuro**: Use **Opção 1 (CLI)** sempre

**Para CI/CD**: Use **Opção 1 (CLI)** com secrets

---

## 📚 Referências

- [Supabase CLI Docs](https://supabase.com/docs/guides/cli)
- [Supabase Migrations Guide](https://supabase.com/docs/guides/cli/managing-environments)
- [Projeto Supabase Dashboard](https://supabase.com/dashboard/project/twcpqhhtoqcgzplrmohi)

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
