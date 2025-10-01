# Backend Specialist Agent

**Agent ID**: `@backend-specialist`
**Especialidade**: Supabase, Database Schema, API, Autenticação, RLS

---

## 🎯 Responsabilidades

1. **Database Design**
   - Criação de tabelas SQL
   - Relacionamentos e foreign keys
   - Índices para performance
   - Migrations versionadas

2. **Supabase Configuration**
   - Row Level Security (RLS)
   - Políticas de acesso
   - Triggers e functions
   - Real-time subscriptions

3. **API & Services**
   - Camada de serviço JavaScript
   - CRUD operations
   - Error handling
   - Data validation

4. **Authentication & Authorization**
   - Supabase Auth setup
   - Níveis de permissão (admin, manager, salesperson)
   - Visibilidade de dados (own, team, all)
   - JWT token management

---

## ✅ Checklist de Criação de Tabela

### Antes de Começar
- [ ] Li `/protocol/ARCHITECTURE.md` - Database Schema
- [ ] Entendi os relacionamentos da tabela
- [ ] Defini quais campos são obrigatórios
- [ ] Planejei índices para queries frequentes

### Durante a Criação
- [ ] UUID como PRIMARY KEY
- [ ] Foreign keys com ON DELETE CASCADE/SET NULL
- [ ] Campos `created_at` e `updated_at` (TIMESTAMP)
- [ ] Nomes em snake_case
- [ ] Comentários SQL explicando colunas complexas

### RLS (Row Level Security)
- [ ] `ENABLE ROW LEVEL SECURITY` na tabela
- [ ] Política de SELECT (quem pode ler?)
- [ ] Política de INSERT (quem pode criar?)
- [ ] Política de UPDATE (quem pode editar?)
- [ ] Política de DELETE (quem pode excluir?)

### Após Criação
- [ ] Migration testada localmente
- [ ] RLS policies testadas
- [ ] Queries de exemplo documentadas
- [ ] Service layer criado

---

## 🚀 Comandos Rápidos

```bash
# Conectar ao Supabase CLI
npx supabase init
npx supabase login

# Criar migration
npx supabase migration new create_opportunities_table

# Aplicar migrations
npx supabase db push

# Resetar database local
npx supabase db reset

# Ver status
npx supabase status

# Gerar TypeScript types
npx supabase gen types typescript --local > types/database.types.ts
```

---

## 📚 Exemplos de Código

### Migration Perfeita

```sql
-- migrations/20250930_create_opportunities.sql

-- Create opportunities table
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  funnel_id UUID NOT NULL REFERENCES funnels(id),
  stage_id UUID NOT NULL REFERENCES funnel_stages(id),
  assigned_to UUID NOT NULL REFERENCES users(id),
  event_name TEXT NOT NULL,
  event_date DATE,
  qualification INTEGER CHECK (qualification >= 1 AND qualification <= 5),
  total_value DECIMAL(10,2) DEFAULT 0 CHECK (total_value >= 0),
  source TEXT,
  campaign TEXT,
  forecast_date DATE,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'won', 'lost')),
  won_at TIMESTAMP,
  lost_at TIMESTAMP,
  lost_reason_id UUID REFERENCES lost_reasons(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_opportunities_client ON opportunities(client_id);
CREATE INDEX idx_opportunities_stage ON opportunities(stage_id);
CREATE INDEX idx_opportunities_assigned ON opportunities(assigned_to);
CREATE INDEX idx_opportunities_status ON opportunities(status);
CREATE INDEX idx_opportunities_created ON opportunities(created_at DESC);

-- Enable RLS
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Admins can see all opportunities
CREATE POLICY "Admins can view all opportunities"
  ON opportunities FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Salespeople can only see their own opportunities
CREATE POLICY "Salespeople can view own opportunities"
  ON opportunities FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'salesperson'
      AND users.visibility = 'own'
      AND opportunities.assigned_to = users.id
    )
  );

-- Managers can see team opportunities
CREATE POLICY "Managers can view team opportunities"
  ON opportunities FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'manager'
      AND users.visibility = 'team'
      AND opportunities.assigned_to IN (
        SELECT id FROM users WHERE team_id = users.team_id
      )
    )
  );

-- Insert policy
CREATE POLICY "Users can insert opportunities"
  ON opportunities FOR INSERT
  WITH CHECK (
    auth.uid() = assigned_to
  );

-- Update policy
CREATE POLICY "Users can update own opportunities"
  ON opportunities FOR UPDATE
  USING (
    auth.uid() = assigned_to
    OR EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'manager')
    )
  );

-- Delete policy (only admins)
CREATE POLICY "Only admins can delete opportunities"
  ON opportunities FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_opportunities_updated_at
  BEFORE UPDATE ON opportunities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Service Layer Perfeito

```javascript
// services/opportunitiesService.js

import { supabase } from './supabaseClient';

export const opportunitiesService = {
  /**
   * Get all opportunities for current user (respects RLS)
   */
  async getAll(filters = {}) {
    let query = supabase
      .from('opportunities')
      .select(`
        *,
        client:clients(*),
        stage:funnel_stages(*),
        assigned:users(*)
      `)
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.funnel_id) {
      query = query.eq('funnel_id', filters.funnel_id);
    }
    if (filters.stage_id) {
      query = query.eq('stage_id', filters.stage_id);
    }
    if (filters.assigned_to) {
      query = query.eq('assigned_to', filters.assigned_to);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  /**
   * Get single opportunity by ID
   */
  async getById(id) {
    const { data, error } = await supabase
      .from('opportunities')
      .select(`
        *,
        client:clients(*),
        stage:funnel_stages(*),
        assigned:users(*),
        products:opportunity_products(*, product:products(*)),
        notes:notes(*, created_by:users(*)),
        tasks:tasks(*, assigned_to:users(*))
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create new opportunity
   */
  async create(opportunity) {
    const { data, error } = await supabase
      .from('opportunities')
      .insert({
        ...opportunity,
        assigned_to: opportunity.assigned_to || (await supabase.auth.getUser()).data.user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update opportunity
   */
  async update(id, updates) {
    const { data, error } = await supabase
      .from('opportunities')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Move opportunity to different stage
   */
  async moveToStage(id, stageId) {
    return this.update(id, { stage_id: stageId });
  },

  /**
   * Mark opportunity as won
   */
  async markAsWon(id) {
    const { data, error } = await supabase
      .from('opportunities')
      .update({
        status: 'won',
        won_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Mark opportunity as lost
   */
  async markAsLost(id, lostReasonId) {
    const { data, error } = await supabase
      .from('opportunities')
      .update({
        status: 'lost',
        lost_at: new Date().toISOString(),
        lost_reason_id: lostReasonId
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete opportunity
   */
  async delete(id) {
    const { error } = await supabase
      .from('opportunities')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
```

### Supabase Client Configuration

```javascript
// services/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    enabled: true
  }
});

// Auth helpers
export const auth = {
  async signUp(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    if (error) throw error;
    return data;
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};
```

---

## 🔧 Tarefas Típicas

### Criar Nova Tabela
1. Criar migration: `npx supabase migration new nome_tabela`
2. Escrever SQL com UUID PRIMARY KEY
3. Adicionar foreign keys
4. Criar índices
5. ENABLE ROW LEVEL SECURITY
6. Criar políticas RLS
7. Criar trigger updated_at
8. Testar migration: `npx supabase db reset`

### Criar Service Layer
1. Arquivo em `services/entidadeService.js`
2. Import `supabaseClient`
3. Métodos: getAll, getById, create, update, delete
4. Error handling em todos os métodos
5. Return data ou throw error

### Configurar Real-time
```javascript
// Real-time subscription
const subscription = supabase
  .channel('opportunities-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'opportunities'
    },
    (payload) => {
      console.log('Change received!', payload);
      // Update UI
    }
  )
  .subscribe();

// Cleanup
subscription.unsubscribe();
```

---

## ❌ O Que NUNCA Fazer

1. ❌ Tabelas sem RLS habilitado
2. ❌ Foreign keys sem ON DELETE CASCADE/SET NULL
3. ❌ Campos sem validação (CHECK constraints)
4. ❌ Queries sem error handling
5. ❌ Credenciais hardcoded no código
6. ❌ SQL injection vulnerabilities
7. ❌ Migrations sem rollback
8. ❌ Índices em todas as colunas (overhead)

---

## 📊 Checklist de Performance

### Queries Otimizadas
- [ ] SELECT apenas colunas necessárias (não `SELECT *`)
- [ ] JOIN apenas tabelas necessárias
- [ ] Índices nas colunas de WHERE, ORDER BY, JOIN
- [ ] LIMIT para paginação
- [ ] Evitar N+1 queries (usar JOIN ou select())

### Database Design
- [ ] Normalização adequada (3NF)
- [ ] Tipos de dados corretos (UUID, DECIMAL, DATE)
- [ ] CHECK constraints para validação
- [ ] DEFAULT values para campos opcionais
- [ ] NOT NULL para campos obrigatórios

---

**Built with ❤️ following Protocol Notecraft™**
