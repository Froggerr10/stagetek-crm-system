-- STAGETEK CRM System - Seed Data
-- Version: 1.0.0
-- Date: 2025-10-01
-- Description: Initial data for development and testing

-- =====================================================
-- 1. FUNNEL: Funil PADRÃO
-- =====================================================

INSERT INTO funnels (id, name, description, is_default, is_active, display_order)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Funil PADRÃO',
    'Funil padrão de vendas B2B',
    true,
    true,
    1
);

-- =====================================================
-- 2. STAGES: 5 fases do funil padrão
-- =====================================================

INSERT INTO stages (id, funnel_id, name, sigla, color, display_order, probability) VALUES
('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Sem contato / Lead', 'SL', 'gray', 1, 10),
('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Contato Feito', 'CF', 'blue', 2, 25),
('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Visita / Apresentação', 'VA', 'purple', 3, 50),
('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'Proposta Enviada', 'PE', 'orange', 4, 75),
('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', 'Fechamento', 'F', 'green', 5, 90);

-- =====================================================
-- 3. CLIENTS: 5 clientes mockados
-- =====================================================

INSERT INTO clients (id, name, cnpj, email, phone, address_city, address_state, status, segment, total_revenue, total_events) VALUES
('20000000-0000-0000-0000-000000000001', 'Mega Produções', '12.345.678/0001-90', 'contato@megaproducoes.com.br', '(11) 98765-4321', 'São Paulo', 'SP', 'active', 'Shows e Festivais', 125000.00, 8),
('20000000-0000-0000-0000-000000000002', 'Eventos Corporativos XYZ', '98.765.432/0001-10', 'eventos@xyz.com.br', '(11) 91234-5678', 'São Paulo', 'SP', 'active', 'Corporativo', 87500.00, 5),
('20000000-0000-0000-0000-000000000003', 'Sound & Light Productions', '11.222.333/0001-44', 'producao@soundlight.com.br', '(21) 99887-6543', 'Rio de Janeiro', 'RJ', 'active', 'Shows', 64200.00, 3),
('20000000-0000-0000-0000-000000000004', 'Festival Music Brasil', '55.666.777/0001-88', 'contato@festivalmusic.com.br', '(31) 96543-2109', 'Belo Horizonte', 'MG', 'pending', 'Festivais', 0, 0),
('20000000-0000-0000-0000-000000000005', 'Stage Pro Eventos', '99.888.777/0001-66', 'vendas@stagepro.com.br', '(41) 94321-8765', 'Curitiba', 'PR', 'active', 'Corporativo', 45800.00, 2);

-- =====================================================
-- 4. PRODUCTS: 20 produtos (fabricação + revenda)
-- =====================================================

-- Fabricação - Estruturas
INSERT INTO products (id, name, sku, category, subcategory, description, unit_price, cost_price, stock_quantity, unit, is_active) VALUES
('30000000-0000-0000-0000-000000000001', 'Treliça Q30 - 3 metros', 'FAB-TRE-Q30-3M', 'fabricacao', 'treliças', 'Treliça em alumínio Q30 com 3 metros de comprimento', 850.00, 520.00, 45, 'unidade', true),
('30000000-0000-0000-0000-000000000002', 'Treliça Q40 - 3 metros', 'FAB-TRE-Q40-3M', 'fabricacao', 'treliças', 'Treliça em alumínio Q40 com 3 metros de comprimento', 1250.00, 780.00, 32, 'unidade', true),
('30000000-0000-0000-0000-000000000003', 'Base para Treliça Q30', 'FAB-BASE-Q30', 'fabricacao', 'bases', 'Base quadrada para treliça Q30', 380.00, 220.00, 28, 'unidade', true),
('30000000-0000-0000-0000-000000000004', 'Talha Manual 500kg', 'FAB-TAL-500', 'fabricacao', 'talhas', 'Talha manual com capacidade de 500kg', 620.00, 380.00, 15, 'unidade', true),
('30000000-0000-0000-0000-000000000005', 'Talha Elétrica 1000kg', 'FAB-TAL-1000E', 'fabricacao', 'talhas', 'Talha elétrica com capacidade de 1000kg', 3200.00, 2100.00, 8, 'unidade', true);

-- Revenda - Som
INSERT INTO products (id, name, sku, category, subcategory, description, unit_price, cost_price, stock_quantity, unit, is_active) VALUES
('30000000-0000-0000-0000-000000000006', 'Mesa de Som Yamaha 32 Canais', 'SOM-MESA-Y32', 'revenda_som', 'mesas', 'Mesa de som digital Yamaha 32 canais', 12500.00, 8200.00, 3, 'unidade', true),
('30000000-0000-0000-0000-000000000007', 'Caixa JBL Line Array', 'SOM-CX-JBLLA', 'revenda_som', 'caixas', 'Caixa acústica JBL Line Array profissional', 8900.00, 5800.00, 12, 'unidade', true),
('30000000-0000-0000-0000-000000000008', 'Subwoofer JBL 18 polegadas', 'SOM-SUB-JBL18', 'revenda_som', 'subwoofers', 'Subwoofer JBL 18" alta potência', 4200.00, 2800.00, 8, 'unidade', true),
('30000000-0000-0000-0000-000000000009', 'Microfone Shure SM58', 'SOM-MIC-SM58', 'revenda_som', 'microfones', 'Microfone dinâmico Shure SM58', 680.00, 420.00, 25, 'unidade', true),
('30000000-0000-0000-0000-000000000010', 'Microfone Sennheiser e935', 'SOM-MIC-E935', 'revenda_som', 'microfones', 'Microfone dinâmico Sennheiser e935', 950.00, 620.00, 15, 'unidade', true);

-- Revenda - Luz
INSERT INTO products (id, name, sku, category, subcategory, description, unit_price, cost_price, stock_quantity, unit, is_active) VALUES
('30000000-0000-0000-0000-000000000011', 'Moving Head LED 200W', 'LUZ-MH-200W', 'revenda_luz', 'moving heads', 'Moving head LED RGBW 200W', 3800.00, 2400.00, 10, 'unidade', true),
('30000000-0000-0000-0000-000000000012', 'Par LED RGBW 54x3W', 'LUZ-PAR-54X3', 'revenda_luz', 'pares led', 'Par LED RGBW 54x3W profissional', 780.00, 480.00, 32, 'unidade', true),
('30000000-0000-0000-0000-000000000013', 'Barra LED 8x10W', 'LUZ-BAR-8X10', 'revenda_luz', 'barras led', 'Barra LED 8x10W RGBW', 1450.00, 920.00, 18, 'unidade', true),
('30000000-0000-0000-0000-000000000014', 'Strobo LED 1000W', 'LUZ-STR-1000', 'revenda_luz', 'strobos', 'Strobo LED branco 1000W', 2200.00, 1400.00, 6, 'unidade', true),
('30000000-0000-0000-0000-000000000015', 'Mesa DMX 512 canais', 'LUZ-MESA-DMX512', 'revenda_luz', 'controladores', 'Mesa controladora DMX 512 canais', 5600.00, 3600.00, 4, 'unidade', true);

-- Locação
INSERT INTO products (id, name, sku, category, subcategory, description, unit_price, cost_price, stock_quantity, unit, is_active) VALUES
('30000000-0000-0000-0000-000000000016', 'Sistema PA Completo', 'LOC-SYS-PA', 'locacao', 'som', 'Sistema PA completo (mesas, caixas, amps)', 4500.00, 0, 1, 'diária', true),
('30000000-0000-0000-0000-000000000017', 'Kit Iluminação Básico', 'LOC-KIT-LUZ', 'locacao', 'luz', 'Kit iluminação básico (12 pares LED + controladora)', 1800.00, 0, 2, 'diária', true),
('30000000-0000-0000-0000-000000000018', 'Estrutura Treliça Box 6x4m', 'LOC-EST-BOX64', 'locacao', 'estrutura', 'Estrutura treliça box 6x4 metros montada', 2200.00, 0, 1, 'diária', true),
('30000000-0000-0000-0000-000000000019', 'Palco 8x6m com cobertura', 'LOC-PALCO-8X6', 'locacao', 'palco', 'Palco profissional 8x6m com cobertura', 5800.00, 0, 1, 'diária', true),
('30000000-0000-0000-0000-000000000020', 'Gerador 150kVA', 'LOC-GER-150', 'locacao', 'energia', 'Gerador diesel 150kVA silenciado', 3200.00, 0, 2, 'diária', true);

-- =====================================================
-- 5. OPPORTUNITIES: 7 oportunidades mockadas
-- =====================================================

-- Stage 1: Sem contato / Lead (2 oportunidades)
INSERT INTO opportunities (id, title, description, client_id, funnel_id, stage_id, value, expected_close_date, probability, status) VALUES
('40000000-0000-0000-0000-000000000001', 'Festival Verão 2026', 'Festival de verão com expectativa de 5 mil pessoas', '20000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 35000.00, '2026-02-15', 10, 'open'),
('40000000-0000-0000-0000-000000000002', 'Convenção Anual XYZ', 'Convenção corporativa anual da empresa XYZ', '20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 22000.00, '2025-11-20', 10, 'open');

-- Stage 2: Contato Feito (2 oportunidades)
INSERT INTO opportunities (id, title, description, client_id, funnel_id, stage_id, value, expected_close_date, probability, status) VALUES
('40000000-0000-0000-0000-000000000003', 'Show Rock in Rio Bar', 'Show na casa Rock in Rio Bar', '20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 18500.00, '2025-12-10', 25, 'open'),
('40000000-0000-0000-0000-000000000004', 'Estrutura Palco Ano Novo', 'Estrutura para show de ano novo', '20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 42000.00, '2025-12-31', 25, 'open');

-- Stage 3: Visita / Apresentação (1 oportunidade)
INSERT INTO opportunities (id, title, description, client_id, funnel_id, stage_id, value, expected_close_date, probability, status) VALUES
('40000000-0000-0000-0000-000000000005', 'Festa Corporativa Stage Pro', 'Festa de fim de ano corporativa', '20000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 28000.00, '2025-12-20', 50, 'open');

-- Stage 4: Proposta Enviada (1 oportunidade)
INSERT INTO opportunities (id, title, description, client_id, funnel_id, stage_id, value, expected_close_date, probability, status) VALUES
('40000000-0000-0000-0000-000000000006', 'Festival Sertanejo Mega', 'Festival sertanejo com 3 artistas nacionais', '20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000004', 67000.00, '2025-11-15', 75, 'open');

-- Stage 5: Fechamento (1 oportunidade)
INSERT INTO opportunities (id, title, description, client_id, funnel_id, stage_id, value, expected_close_date, probability, status) VALUES
('40000000-0000-0000-0000-000000000007', 'Show Eletrônico Sound & Light', 'Show eletrônico com DJ internacional', '20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000005', 52000.00, '2025-11-10', 90, 'open');

-- =====================================================
-- 6. OPPORTUNITY_PRODUCTS: Produtos nas oportunidades
-- =====================================================

-- Oportunidade 1: Festival Verão 2026
INSERT INTO opportunity_products (opportunity_id, product_id, quantity, unit_price, total) VALUES
('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000017', 3, 1800.00, 5400.00),
('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000018', 2, 2200.00, 4400.00);

-- Oportunidade 6: Festival Sertanejo Mega
INSERT INTO opportunity_products (opportunity_id, product_id, quantity, unit_price, total) VALUES
('40000000-0000-0000-0000-000000000006', '30000000-0000-0000-0000-000000000016', 2, 4500.00, 9000.00),
('40000000-0000-0000-0000-000000000006', '30000000-0000-0000-0000-000000000017', 4, 1800.00, 7200.00),
('40000000-0000-0000-0000-000000000006', '30000000-0000-0000-0000-000000000019', 1, 5800.00, 5800.00);

-- Oportunidade 7: Show Eletrônico Sound & Light
INSERT INTO opportunity_products (opportunity_id, product_id, quantity, unit_price, total) VALUES
('40000000-0000-0000-0000-000000000007', '30000000-0000-0000-0000-000000000007', 8, 8900.00, 71200.00),
('40000000-0000-0000-0000-000000000007', '30000000-0000-0000-0000-000000000011', 6, 3800.00, 22800.00);

-- =====================================================
-- 7. ACTIVITIES: Histórico de atividades
-- =====================================================

INSERT INTO activities (entity_type, entity_id, activity_type, description, metadata) VALUES
('opportunity', '40000000-0000-0000-0000-000000000006', 'created', 'Oportunidade criada', '{"source": "seed"}'),
('opportunity', '40000000-0000-0000-0000-000000000006', 'stage_changed', 'Movida para Proposta Enviada', '{"old_stage": "Visita / Apresentação", "new_stage": "Proposta Enviada"}'),
('opportunity', '40000000-0000-0000-0000-000000000007', 'created', 'Oportunidade criada', '{"source": "seed"}'),
('opportunity', '40000000-0000-0000-0000-000000000007', 'stage_changed', 'Movida para Fechamento', '{"old_stage": "Proposta Enviada", "new_stage": "Fechamento"}');
