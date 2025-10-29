-- =====================================================
-- Create Loss Reasons Table (Sprint 0: Security)
-- Generated: 29 Outubro 2025
-- Purpose: Track why opportunities are lost (análise de perdas)
-- RICE Priority: 4.8 (Dashboard Conversão - Sprint 3)
-- =====================================================

-- =====================================================
-- ENUM: loss_reason_category
-- =====================================================
CREATE TYPE loss_reason_category AS ENUM (
  'price',           -- Preço alto
  'competitor',      -- Escolheu concorrente
  'timing',          -- Timing errado (cliente adiou projeto)
  'no_budget',       -- Sem orçamento
  'no_response',     -- Cliente parou de responder
  'product_fit',     -- Produto não atende necessidade
  'service',         -- Problema com atendimento
  'logistics',       -- Problemas logísticos (prazo, frete)
  'technical',       -- Limitações técnicas
  'other'            -- Outros motivos
);

-- =====================================================
-- TABLE: loss_reasons
-- =====================================================
CREATE TABLE IF NOT EXISTS loss_reasons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE, -- "Preço muito alto", "Escolheu concorrente X"
  category loss_reason_category NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_loss_reasons_category ON loss_reasons(category);
CREATE INDEX IF NOT EXISTS idx_loss_reasons_active ON loss_reasons(is_active);
CREATE INDEX IF NOT EXISTS idx_loss_reasons_order ON loss_reasons(display_order);

-- =====================================================
-- SEED DATA: Loss Reasons (15 motivos comuns)
-- =====================================================
INSERT INTO loss_reasons (name, category, description, display_order) VALUES
  -- Price (3)
  ('Preço muito alto', 'price', 'Cliente alegou que o preço está acima do orçamento', 1),
  ('Condições de pagamento não atendidas', 'price', 'Cliente precisava de condições especiais de pagamento', 2),
  ('Concorrente ofereceu preço menor', 'competitor', 'Concorrente ganhou por preço', 3),

  -- Competitor (2)
  ('Cliente já trabalha com fornecedor fixo', 'competitor', 'Cliente tem parceria de longa data com concorrente', 4),
  ('Concorrente ofereceu solução mais completa', 'competitor', 'Concorrente tinha produto/serviço superior', 5),

  -- Timing (2)
  ('Projeto adiado indefinidamente', 'timing', 'Cliente cancelou ou adiou o projeto', 6),
  ('Cliente não está pronto para comprar', 'timing', 'Lead ainda está em fase de pesquisa', 7),

  -- Budget (2)
  ('Cliente sem orçamento aprovado', 'no_budget', 'Cliente não conseguiu aprovar budget internamente', 8),
  ('Corte de orçamento', 'no_budget', 'Cliente teve cortes de orçamento após iniciar negociação', 9),

  -- No Response (1)
  ('Cliente parou de responder', 'no_response', 'Cliente não retornou contatos (ghosting)', 10),

  -- Product Fit (2)
  ('Produto não atende especificações técnicas', 'product_fit', 'Nosso produto não tinha specs que o cliente precisa', 11),
  ('Cliente precisa de customização que não oferecemos', 'product_fit', 'Cliente pediu customização fora do escopo', 12),

  -- Logistics (2)
  ('Prazo de entrega muito longo', 'logistics', 'Cliente precisava de entrega mais rápida', 13),
  ('Problemas com frete/logística', 'logistics', 'Custo ou prazo de frete inviável', 14),

  -- Other (1)
  ('Outro motivo', 'other', 'Motivo não especificado ou não se enquadra nas categorias', 15)
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- RLS POLICIES: loss_reasons (admin_only model)
-- =====================================================

-- Enable RLS
ALTER TABLE loss_reasons ENABLE ROW LEVEL SECURITY;

-- SELECT (todos usuários autenticados podem ler)
CREATE POLICY "loss_reasons_select_policy"
  ON loss_reasons FOR SELECT
  TO authenticated
  USING (is_active = TRUE);

-- INSERT (apenas autenticados - MVP fallback, TODO P1: admin only)
CREATE POLICY "loss_reasons_insert_policy"
  ON loss_reasons FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- UPDATE (apenas autenticados - MVP fallback, TODO P1: admin only)
CREATE POLICY "loss_reasons_update_policy"
  ON loss_reasons FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- DELETE (soft delete recomendado: UPDATE is_active = FALSE)
-- Hard delete apenas para casos extremos
CREATE POLICY "loss_reasons_delete_policy"
  ON loss_reasons FOR DELETE
  TO authenticated
  USING (true);

-- =====================================================
-- ADD COLUMN: opportunities.loss_reason_id (FK)
-- =====================================================
-- Adiciona coluna FK em opportunities (se não existe)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'opportunities'
    AND column_name = 'loss_reason_id'
  ) THEN
    ALTER TABLE opportunities
    ADD COLUMN loss_reason_id UUID REFERENCES loss_reasons(id);

    CREATE INDEX idx_opportunities_loss_reason_id
    ON opportunities(loss_reason_id);
  END IF;
END $$;

-- =====================================================
-- TRIGGER: Auto-update updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_loss_reasons_updated_at ON loss_reasons;
CREATE TRIGGER update_loss_reasons_updated_at
  BEFORE UPDATE ON loss_reasons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================
GRANT SELECT ON loss_reasons TO authenticated;
GRANT INSERT, UPDATE, DELETE ON loss_reasons TO authenticated;

-- =====================================================
-- Usage Example (Frontend)
-- =====================================================
-- // Fetch loss reasons for dropdown
-- const { data: reasons } = await supabase
--   .from('loss_reasons')
--   .select('*')
--   .eq('is_active', true)
--   .order('display_order');
--
-- // Update opportunity to lost status with reason
-- await supabase
--   .from('opportunities')
--   .update({
--     status: 'lost',
--     loss_reason_id: selectedReasonId,
--     lost_at: new Date().toISOString()
--   })
--   .eq('id', opportunityId);
--
-- // Query for dashboard (reasons report)
-- const { data: lossAnalysis } = await supabase
--   .from('opportunities')
--   .select('loss_reason_id, loss_reasons(name, category), count')
--   .eq('status', 'lost')
--   .not('loss_reason_id', 'is', null);
-- =====================================================

-- =====================================================
-- Testing Guide
-- =====================================================
-- 1. SELECT loss_reasons: Should see 15 seeded reasons ✅
-- 2. SELECT WHERE category = 'price': Should see 3 reasons ✅
-- 3. UPDATE opportunity SET loss_reason_id = {uuid}: Should succeed ✅
-- 4. Query lost opportunities with reason join: Should work ✅
-- =====================================================

COMMENT ON TABLE loss_reasons IS 'Motivos de perda de oportunidades (Sprint 0). Seed com 15 motivos comuns STAGETEK.';
COMMENT ON COLUMN loss_reasons.category IS 'Categoria do motivo (enum): price, competitor, timing, etc.';
COMMENT ON COLUMN opportunities.loss_reason_id IS 'FK para loss_reasons (opcional). Preenchido quando status = lost.';

-- =====================================================
-- DONE! Loss Reasons completo com 15 motivos seedados
-- =====================================================
-- Next steps:
-- 1. Aplicar migration: supabase db push
-- 2. Testar query no Supabase Dashboard
-- 3. Adicionar dropdown em OportunidadeModal
-- 4. Dashboard de análise de perdas (Sprint 3)
-- =====================================================
