-- =====================================================
-- STAGETEK CRM - Seed Data (CORRIGIDO)
-- Version: 1.0 - Matches 20251004_initial_schema.sql
-- Date: 13/Oct/2025
-- =====================================================

-- =====================================================
-- 1. FUNNELS: Funil Padrão
-- =====================================================

INSERT INTO funnels (name, description, is_default, is_active)
VALUES ('Funil de Vendas Principal', 'Funil padrão para vendas B2B', TRUE, TRUE);

-- =====================================================
-- 2. FUNNEL STAGES: 5 estágios do funil padrão
-- =====================================================

-- Inserir estágios referenciando o funil padrão
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
-- 3. CLIENTS: 5 clientes mockados
-- =====================================================

INSERT INTO clients (name, cnpj, email, phone, website, address, status) VALUES
(
  'Mega Produções',
  '12.345.678/0001-90',
  'contato@megaproducoes.com.br',
  '(11) 98765-4321',
  'https://megaproducoes.com.br',
  '{"street":"Rua das Flores","number":"123","city":"São Paulo","state":"SP","zipCode":"01234-567"}',
  'active'
),
(
  'Eventos Corporativos XYZ',
  '98.765.432/0001-10',
  'eventos@xyz.com.br',
  '(11) 91234-5678',
  'https://eventosxyz.com.br',
  '{"street":"Av. Paulista","number":"1000","city":"São Paulo","state":"SP","zipCode":"01310-100"}',
  'active'
),
(
  'Festival Music BR',
  '11.222.333/0001-44',
  'contato@festivalmusicbr.com',
  '(21) 99999-8888',
  'https://festivalmusicbr.com',
  '{"street":"Av. Atlântica","number":"2000","city":"Rio de Janeiro","state":"RJ","zipCode":"22021-001"}',
  'active'
),
(
  'TechConf Brasil',
  '22.333.444/0001-55',
  'info@techconfbr.com',
  '(11) 97777-6666',
  'https://techconfbr.com',
  '{"street":"Rua da Consolação","number":"500","city":"São Paulo","state":"SP","zipCode":"01302-001"}',
  'active'
),
(
  'Casamentos Premium',
  '33.444.555/0001-66',
  'casamentos@premium.com.br',
  '(11) 96666-5555',
  'https://casamentospremium.com.br',
  '{"street":"Rua Oscar Freire","number":"800","city":"São Paulo","state":"SP","zipCode":"01426-001"}',
  'active'
);

-- =====================================================
-- 4. OPPORTUNITIES: 7 oportunidades mockadas
-- =====================================================

-- Inserir oportunidades distribuídas pelos 5 estágios
INSERT INTO opportunities (title, client_id, funnel_id, stage_id, value, expected_close_date, probability, status)
SELECT
  opp.title,
  (SELECT id FROM clients WHERE name = opp.client_name),
  (SELECT id FROM funnels WHERE is_default = TRUE),
  (SELECT id FROM funnel_stages WHERE funnel_id = (SELECT id FROM funnels WHERE is_default = TRUE) AND order_position = opp.stage_order),
  opp.value,
  opp.expected_close_date,
  opp.probability,
  opp.status
FROM (
  VALUES
    -- Estágio 1: Prospecção
    ('Festival de Verão 2026', 'Festival Music BR', 1, 35000.00, '2026-02-15', 10, 'open'),

    -- Estágio 2: Qualificação
    ('Evento Corporativo Anual', 'Eventos Corporativos XYZ', 2, 28000.00, '2025-12-10', 25, 'open'),
    ('Show Beneficente', 'Mega Produções', 2, 18000.00, '2025-11-20', 25, 'open'),

    -- Estágio 3: Proposta
    ('Conferência Tech 2025', 'TechConf Brasil', 3, 45000.00, '2025-10-30', 50, 'open'),
    ('Casamento Luxo Dezembro', 'Casamentos Premium', 3, 22000.00, '2025-12-15', 50, 'open'),

    -- Estágio 4: Negociação
    ('Rock Festival Natal', 'Mega Produções', 4, 52000.00, '2025-12-25', 75, 'open'),

    -- Estágio 5: Fechado
    ('Evento Lançamento Produto', 'Eventos Corporativos XYZ', 5, 15000.00, '2025-11-05', 90, 'open')
) AS opp(title, client_name, stage_order, value, expected_close_date, probability, status);

-- =====================================================
-- 5. NOTES: Algumas anotações de exemplo
-- =====================================================

-- Adicionar notas em algumas oportunidades
INSERT INTO notes (opportunity_id, content)
SELECT
  o.id,
  n.content
FROM opportunities o
CROSS JOIN (
  VALUES
    ('Cliente muito interessado, pediu proposta detalhada com opções de equipamentos premium.'),
    ('Reunião agendada para próxima semana para apresentação técnica.'),
    ('Orçamento aprovado pelo cliente, aguardando assinatura do contrato.')
) AS n(content)
WHERE o.title IN ('Conferência Tech 2025', 'Rock Festival Natal', 'Evento Lançamento Produto')
LIMIT 3;

-- =====================================================
-- 6. TASKS: Tarefas de follow-up
-- =====================================================

-- Criar tarefas para oportunidades abertas
INSERT INTO tasks (opportunity_id, title, description, type, due_date, is_completed)
SELECT
  o.id,
  t.title,
  t.description,
  t.type,
  CURRENT_DATE + INTERVAL '7 days',
  FALSE
FROM opportunities o
CROSS JOIN (
  VALUES
    ('Ligar para cliente', 'Follow-up sobre proposta enviada', 'call'),
    ('Enviar email', 'Enviar catálogo atualizado de produtos', 'email'),
    ('Agendar reunião', 'Marcar apresentação técnica presencial', 'meeting')
) AS t(title, description, type)
WHERE o.status = 'open' AND o.probability >= 50
LIMIT 5;

-- =====================================================
-- VERIFICAÇÃO
-- =====================================================

-- Contar registros inseridos
DO $$
DECLARE
  funnel_count INTEGER;
  stage_count INTEGER;
  client_count INTEGER;
  opp_count INTEGER;
  note_count INTEGER;
  task_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO funnel_count FROM funnels;
  SELECT COUNT(*) INTO stage_count FROM funnel_stages;
  SELECT COUNT(*) INTO client_count FROM clients;
  SELECT COUNT(*) INTO opp_count FROM opportunities;
  SELECT COUNT(*) INTO note_count FROM notes;
  SELECT COUNT(*) INTO task_count FROM tasks;

  RAISE NOTICE '✅ Seed data inserido com sucesso!';
  RAISE NOTICE '   - Funis: %', funnel_count;
  RAISE NOTICE '   - Estágios: %', stage_count;
  RAISE NOTICE '   - Clientes: %', client_count;
  RAISE NOTICE '   - Oportunidades: %', opp_count;
  RAISE NOTICE '   - Notas: %', note_count;
  RAISE NOTICE '   - Tarefas: %', task_count;
END $$;
