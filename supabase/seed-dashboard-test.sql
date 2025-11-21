-- Seed data para testar Dashboard
-- Execute no Supabase SQL Editor

-- 1. Criar cliente de teste (se não existir)
INSERT INTO clients (id, name, cnpj, email, phone)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Empresa Teste A', '12.345.678/0001-90', 'contato@empresaa.com', '(11) 98765-4321'),
  ('22222222-2222-2222-2222-222222222222', 'Empresa Teste B', '98.765.432/0001-10', 'contato@empresab.com', '(21) 91234-5678'),
  ('33333333-3333-3333-3333-333333333333', 'Empresa Teste C', '11.222.333/0001-44', 'contato@empresac.com', '(47) 99999-8888')
ON CONFLICT (id) DO NOTHING;

-- 2. Pegar ID do primeiro estágio do primeiro funil
DO $$
DECLARE
  stage1_id UUID;
  stage2_id UUID;
  stage3_id UUID;
  user_id UUID;
BEGIN
  -- Pegar user ID do teste@stagetek.com
  SELECT id INTO user_id FROM auth.users WHERE email = 'teste@stagetek.com' LIMIT 1;

  -- Pegar IDs dos estágios
  SELECT id INTO stage1_id FROM funnel_stages WHERE order_position = 1 LIMIT 1;
  SELECT id INTO stage2_id FROM funnel_stages WHERE order_position = 2 LIMIT 1;
  SELECT id INTO stage3_id FROM funnel_stages WHERE order_position = 3 LIMIT 1;

  -- 3. Criar oportunidades GANHAS (últimos 3 meses)
  INSERT INTO opportunities (id, title, client_id, value, status, stage_id, created_by, assigned_to, created_at, temperature, probability)
  VALUES
    ('a0000001-0000-0000-0000-000000000001', 'Venda Equipamento Som - Show Festival', '11111111-1111-1111-1111-111111111111', 45000, 'won', stage3_id, user_id, user_id, NOW() - INTERVAL '15 days', 'hot', 90),
    ('a0000002-0000-0000-0000-000000000002', 'Locação Estrutura - Evento Corporativo', '22222222-2222-2222-2222-222222222222', 28000, 'won', stage3_id, user_id, user_id, NOW() - INTERVAL '45 days', 'hot', 95),
    ('a0000003-0000-0000-0000-000000000003', 'Venda Iluminação LED - Teatro', '33333333-3333-3333-3333-333333333333', 62000, 'won', stage3_id, user_id, user_id, NOW() - INTERVAL '70 days', 'warm', 85)
  ON CONFLICT (id) DO NOTHING;

  -- 4. Criar oportunidades ABERTAS (em diferentes estágios)
  INSERT INTO opportunities (id, title, client_id, value, status, stage_id, created_by, assigned_to, created_at, temperature, probability)
  VALUES
    ('b0000001-0000-0000-0000-000000000001', 'Proposta Sistema Áudio Completo', '11111111-1111-1111-1111-111111111111', 85000, 'open', stage2_id, user_id, user_id, NOW() - INTERVAL '5 days', 'hot', 70),
    ('b0000002-0000-0000-0000-000000000002', 'Orçamento Talhas e Motores', '22222222-2222-2222-2222-222222222222', 35000, 'open', stage1_id, user_id, user_id, NOW() - INTERVAL '3 days', 'warm', 50),
    ('b0000003-0000-0000-0000-000000000003', 'Renovação Contrato Locação', '33333333-3333-3333-3333-333333333333', 120000, 'open', stage3_id, user_id, user_id, NOW() - INTERVAL '1 days', 'hot', 80),
    ('b0000004-0000-0000-0000-000000000004', 'Treliças Box Truss Q30', '11111111-1111-1111-1111-111111111111', 18000, 'open', stage1_id, user_id, user_id, NOW() - INTERVAL '10 days', 'cold', 30)
  ON CONFLICT (id) DO NOTHING;

  -- 5. Criar oportunidades PERDIDAS
  INSERT INTO opportunities (id, title, client_id, value, status, stage_id, created_by, assigned_to, created_at, temperature, probability)
  VALUES
    ('c0000001-0000-0000-0000-000000000001', 'Proposta Recusada - Preço Alto', '22222222-2222-2222-2222-222222222222', 50000, 'lost', stage2_id, user_id, user_id, NOW() - INTERVAL '30 days', 'cold', 20),
    ('c0000002-0000-0000-0000-000000000002', 'Cliente Escolheu Concorrente', '33333333-3333-3333-3333-333333333333', 22000, 'lost', stage1_id, user_id, user_id, NOW() - INTERVAL '60 days', 'warm', 40),
    ('c0000003-0000-0000-0000-000000000003', 'Sem Resposta - Desistiu', '11111111-1111-1111-1111-111111111111', 15000, 'lost', stage1_id, user_id, user_id, NOW() - INTERVAL '80 days', 'cold', 10)
  ON CONFLICT (id) DO NOTHING;

END $$;

-- 6. Verificar resultado
SELECT
  status,
  COUNT(*) as quantidade,
  SUM(value) as valor_total,
  AVG(value) as ticket_medio
FROM opportunities
GROUP BY status
ORDER BY status;

-- Resumo esperado:
-- won: 3 oportunidades, R$ 135.000 total, R$ 45k médio
-- open: 4 oportunidades, R$ 258.000 total
-- lost: 3 oportunidades, R$ 87.000 total
-- Taxa conversão: 50% (3 ganhas / 6 fechadas)
