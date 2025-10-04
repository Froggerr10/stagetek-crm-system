-- =====================================================
-- STAGETEK CRM - Initial Database Schema
-- Version: 1.0
-- Date: 04/Oct/2025
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. CLIENTS (Clientes B2B)
-- =====================================================
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18) UNIQUE,
  email VARCHAR(255),
  phone VARCHAR(20),
  website VARCHAR(255),
  address JSONB DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_clients_cnpj ON clients(cnpj);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_created_at ON clients(created_at DESC);

-- =====================================================
-- 2. FUNNELS (Funis de Vendas)
-- =====================================================
CREATE TABLE funnels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- 3. FUNNEL STAGES (Etapas do Funil)
-- =====================================================
CREATE TABLE funnel_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  funnel_id UUID NOT NULL REFERENCES funnels(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  color VARCHAR(7) DEFAULT '#6366f1',
  order_position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_funnel_stages_funnel_id ON funnel_stages(funnel_id);
CREATE INDEX idx_funnel_stages_order ON funnel_stages(order_position);

-- =====================================================
-- 4. OPPORTUNITIES (Oportunidades de Venda)
-- =====================================================
CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  funnel_id UUID REFERENCES funnels(id) ON DELETE SET NULL,
  stage_id UUID REFERENCES funnel_stages(id) ON DELETE SET NULL,
  value DECIMAL(15, 2),
  expected_close_date DATE,
  probability INTEGER CHECK (probability >= 0 AND probability <= 100),
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'won', 'lost')),
  lost_reason TEXT,
  won_at TIMESTAMPTZ,
  lost_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  assigned_to UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_opportunities_client_id ON opportunities(client_id);
CREATE INDEX idx_opportunities_stage_id ON opportunities(stage_id);
CREATE INDEX idx_opportunities_status ON opportunities(status);
CREATE INDEX idx_opportunities_assigned_to ON opportunities(assigned_to);
CREATE INDEX idx_opportunities_created_at ON opportunities(created_at DESC);

-- =====================================================
-- 5. NOTES (Anotações - Imutáveis)
-- =====================================================
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  CONSTRAINT note_must_have_parent CHECK (
    (opportunity_id IS NOT NULL) OR (client_id IS NOT NULL)
  )
);

CREATE INDEX idx_notes_opportunity_id ON notes(opportunity_id);
CREATE INDEX idx_notes_client_id ON notes(client_id);
CREATE INDEX idx_notes_created_at ON notes(created_at DESC);

-- =====================================================
-- 6. TASKS (Tarefas)
-- =====================================================
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(20) CHECK (type IN ('call', 'email', 'meeting', 'other')),
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  assigned_to UUID REFERENCES auth.users(id),
  CONSTRAINT task_must_have_parent CHECK (
    (opportunity_id IS NOT NULL) OR (client_id IS NOT NULL)
  )
);

CREATE INDEX idx_tasks_opportunity_id ON tasks(opportunity_id);
CREATE INDEX idx_tasks_client_id ON tasks(client_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_is_completed ON tasks(is_completed);

-- =====================================================
-- 7. SEED DATA - Funil Padrão
-- =====================================================
INSERT INTO funnels (name, description, is_default, is_active)
VALUES ('Funil de Vendas Principal', 'Funil padrão para vendas B2B', TRUE, TRUE);

INSERT INTO funnel_stages (funnel_id, name, color, order_position)
SELECT
  f.id,
  stage.name,
  stage.color,
  stage.order_pos
FROM funnels f
CROSS JOIN (
  VALUES
    ('Prospecção', '#6366f1', 1),
    ('Qualificação', '#8b5cf6', 2),
    ('Proposta', '#ec4899', 3),
    ('Negociação', '#f59e0b', 4),
    ('Fechado', '#10b981', 5)
) AS stage(name, color, order_pos)
WHERE f.is_default = TRUE;

-- =====================================================
-- 8. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE funnels ENABLE ROW LEVEL SECURITY;
ALTER TABLE funnel_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Clients Policies
CREATE POLICY "Users can view all clients"
  ON clients FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert clients"
  ON clients FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update clients"
  ON clients FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Funnels Policies (read-only for now)
CREATE POLICY "Users can view funnels"
  ON funnels FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view funnel stages"
  ON funnel_stages FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Opportunities Policies
CREATE POLICY "Users can view opportunities"
  ON opportunities FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert opportunities"
  ON opportunities FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update opportunities"
  ON opportunities FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Notes Policies (insert only, immutable)
CREATE POLICY "Users can view notes"
  ON notes FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert notes"
  ON notes FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Tasks Policies
CREATE POLICY "Users can view tasks"
  ON tasks FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert tasks"
  ON tasks FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update tasks"
  ON tasks FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- =====================================================
-- 9. UPDATED_AT TRIGGERS
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_funnels_updated_at BEFORE UPDATE ON funnels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_funnel_stages_updated_at BEFORE UPDATE ON funnel_stages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON opportunities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DONE! Schema criado com sucesso.
-- Próximos passos: Rodar este SQL no Supabase Dashboard
-- =====================================================
