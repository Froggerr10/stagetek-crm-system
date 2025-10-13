-- =====================================================
-- STAGETEK CRM - Seed Data (VERSÃO FINAL)
-- 100% Compatível com schema 20251004_initial_schema.sql
-- =====================================================

-- Limpar dados existentes
TRUNCATE TABLE tasks, notes, opportunities, funnel_stages, funnels, clients CASCADE;

-- =====================================================
-- 1. FUNNELS
-- =====================================================
INSERT INTO funnels (name, description, is_default, is_active)
VALUES ('Funil de Vendas Principal', 'Funil padrão para vendas B2B', TRUE, TRUE);

-- =====================================================
-- 2. FUNNEL STAGES
-- =====================================================
INSERT INTO funnel_stages (funnel_id, name, color, order_position)
SELECT
  f.id, s.name, s.color, s.pos
FROM funnels f
CROSS JOIN (VALUES
  ('Prospecção', '#6366f1', 1),
  ('Qualificação', '#8b5cf6', 2),
  ('Proposta', '#ec4899', 3),
  ('Negociação', '#f59e0b', 4),
  ('Fechado', '#10b981', 5)
) AS s(name, color, pos)
WHERE f.is_default = TRUE;

-- =====================================================
-- 3. CLIENTS
-- =====================================================
INSERT INTO clients (name, cnpj, email, phone, website, address, status) VALUES
('Mega Produções', '12.345.678/0001-90', 'contato@megaproducoes.com.br', '(11) 98765-4321', 'https://megaproducoes.com.br', '{"city":"São Paulo","state":"SP"}', 'active'),
('Eventos Corporativos XYZ', '98.765.432/0001-10', 'eventos@xyz.com.br', '(11) 91234-5678', 'https://eventosxyz.com.br', '{"city":"São Paulo","state":"SP"}', 'active'),
('Festival Music BR', '11.222.333/0001-44', 'contato@festivalmusicbr.com', '(21) 99999-8888', 'https://festivalmusicbr.com', '{"city":"Rio de Janeiro","state":"RJ"}', 'active'),
('TechConf Brasil', '22.333.444/0001-55', 'info@techconfbr.com', '(11) 97777-6666', 'https://techconfbr.com', '{"city":"São Paulo","state":"SP"}', 'active'),
('Casamentos Premium', '33.444.555/0001-66', 'casamentos@premium.com.br', '(11) 96666-5555', 'https://casamentospremium.com.br', '{"city":"São Paulo","state":"SP"}', 'active');

-- =====================================================
-- 4. OPPORTUNITIES
-- =====================================================
INSERT INTO opportunities (title, client_id, funnel_id, stage_id, value, expected_close_date, probability, status)
VALUES
-- Estágio 1: Prospecção
(
  'Festival de Verão 2026',
  (SELECT id FROM clients WHERE cnpj = '11.222.333/0001-44'),
  (SELECT id FROM funnels WHERE is_default = TRUE),
  (SELECT id FROM funnel_stages WHERE order_position = 1 LIMIT 1),
  35000.00,
  '2026-02-15'::DATE,
  10,
  'open'
),
-- Estágio 2: Qualificação
(
  'Evento Corporativo Anual',
  (SELECT id FROM clients WHERE cnpj = '98.765.432/0001-10'),
  (SELECT id FROM funnels WHERE is_default = TRUE),
  (SELECT id FROM funnel_stages WHERE order_position = 2 LIMIT 1),
  28000.00,
  '2025-12-10'::DATE,
  25,
  'open'
),
(
  'Show Beneficente',
  (SELECT id FROM clients WHERE cnpj = '12.345.678/0001-90'),
  (SELECT id FROM funnels WHERE is_default = TRUE),
  (SELECT id FROM funnel_stages WHERE order_position = 2 LIMIT 1),
  18000.00,
  '2025-11-20'::DATE,
  25,
  'open'
),
-- Estágio 3: Proposta
(
  'Conferência Tech 2025',
  (SELECT id FROM clients WHERE cnpj = '22.333.444/0001-55'),
  (SELECT id FROM funnels WHERE is_default = TRUE),
  (SELECT id FROM funnel_stages WHERE order_position = 3 LIMIT 1),
  45000.00,
  '2025-10-30'::DATE,
  50,
  'open'
),
(
  'Casamento Luxo Dezembro',
  (SELECT id FROM clients WHERE cnpj = '33.444.555/0001-66'),
  (SELECT id FROM funnels WHERE is_default = TRUE),
  (SELECT id FROM funnel_stages WHERE order_position = 3 LIMIT 1),
  22000.00,
  '2025-12-15'::DATE,
  50,
  'open'
),
-- Estágio 4: Negociação
(
  'Rock Festival Natal',
  (SELECT id FROM clients WHERE cnpj = '12.345.678/0001-90'),
  (SELECT id FROM funnels WHERE is_default = TRUE),
  (SELECT id FROM funnel_stages WHERE order_position = 4 LIMIT 1),
  52000.00,
  '2025-12-25'::DATE,
  75,
  'open'
),
-- Estágio 5: Fechado
(
  'Evento Lançamento Produto',
  (SELECT id FROM clients WHERE cnpj = '98.765.432/0001-10'),
  (SELECT id FROM funnels WHERE is_default = TRUE),
  (SELECT id FROM funnel_stages WHERE order_position = 5 LIMIT 1),
  15000.00,
  '2025-11-05'::DATE,
  90,
  'open'
);

-- =====================================================
-- 5. NOTES
-- =====================================================
INSERT INTO notes (opportunity_id, content)
SELECT o.id, 'Cliente muito interessado. Proposta detalhada solicitada.'
FROM opportunities o WHERE o.title = 'Conferência Tech 2025'
UNION ALL
SELECT o.id, 'Reunião agendada para próxima semana.'
FROM opportunities o WHERE o.title = 'Rock Festival Natal'
UNION ALL
SELECT o.id, 'Orçamento aprovado. Aguardando assinatura.'
FROM opportunities o WHERE o.title = 'Evento Lançamento Produto';

-- =====================================================
-- 6. TASKS
-- =====================================================
INSERT INTO tasks (opportunity_id, title, description, type, due_date, is_completed)
SELECT
  o.id,
  'Ligar para cliente',
  'Follow-up sobre proposta enviada',
  'call',
  CURRENT_DATE + 7,
  FALSE
FROM opportunities o WHERE o.probability >= 50
LIMIT 3;

INSERT INTO tasks (opportunity_id, title, description, type, due_date, is_completed)
SELECT
  o.id,
  'Enviar email',
  'Enviar catálogo atualizado',
  'email',
  CURRENT_DATE + 5,
  FALSE
FROM opportunities o WHERE o.probability >= 25
LIMIT 2;

-- =====================================================
-- VERIFICAÇÃO FINAL
-- =====================================================
DO $$
DECLARE
  r RECORD;
BEGIN
  RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
  RAISE NOTICE '✅ Seed data inserido com sucesso!';
  RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
  RAISE NOTICE '';

  FOR r IN
    SELECT 'Funis' as tabela, COUNT(*)::text as total FROM funnels
    UNION ALL SELECT 'Estágios', COUNT(*)::text FROM funnel_stages
    UNION ALL SELECT 'Clientes', COUNT(*)::text FROM clients
    UNION ALL SELECT 'Oportunidades', COUNT(*)::text FROM opportunities
    UNION ALL SELECT 'Notas', COUNT(*)::text FROM notes
    UNION ALL SELECT 'Tarefas', COUNT(*)::text FROM tasks
  LOOP
    RAISE NOTICE '   %: %', RPAD(r.tabela, 15), r.total;
  END LOOP;

  RAISE NOTICE '';
  RAISE NOTICE '🎯 Próximo passo: Desabilitar RLS';
  RAISE NOTICE '';
END $$;
