-- =====================================================
-- STAGETEK CRM - Seed Data for Products Catalog
-- Version: 1.0
-- Date: 14/Oct/2025
-- Sprint 1: P0.5 Cotação MVP
-- =====================================================

-- =====================================================
-- SEED DATA - Common Products (15 items)
-- =====================================================

-- Category: SOM (4 produtos)
-- =====================================================

INSERT INTO products (name, sku, category, price_brl, price_usd, price_eur, description, technical_specs) VALUES
(
  'Mesa de Som Behringer X32',
  'SOM-X32-001',
  'som',
  15000.00,
  3000.00,
  2800.00,
  'Mesa digital 32 canais, processamento integrado, interface USB',
  '{"channels": 32, "phantom_power": true, "usb": true, "weight_kg": 14.5}'
),
(
  'Caixa Acústica Line Array 12" - Par',
  'SOM-LA12-PAR',
  'som',
  8500.00,
  1700.00,
  1600.00,
  'Par de caixas line array 12 polegadas, 800W RMS cada',
  '{"power_rms": 800, "impedance_ohm": 8, "spl_max": 128, "weight_kg": 18}'
),
(
  'Subwoofer 18" 1200W',
  'SOM-SUB18-001',
  'som',
  4200.00,
  840.00,
  780.00,
  'Subwoofer passivo 18 polegadas, 1200W RMS',
  '{"power_rms": 1200, "impedance_ohm": 4, "frequency_min_hz": 35, "weight_kg": 35}'
),
(
  'Kit Microfone Sem Fio UHF (2 unidades)',
  'SOM-MIC-UHF2',
  'som',
  1800.00,
  360.00,
  335.00,
  'Sistema UHF com 2 microfones de mão, receiver rack',
  '{"frequency_range": "UHF 500-900MHz", "channels": 2, "battery_hours": 8}'
);

-- Category: LUZ (4 produtos)
-- =====================================================

INSERT INTO products (name, sku, category, price_brl, price_usd, price_eur, description, technical_specs) VALUES
(
  'Moving Head LED 200W RGBW',
  'LUZ-MH200-001',
  'luz',
  3500.00,
  700.00,
  650.00,
  'Moving head LED 200W, RGBW 4-in-1, DMX 512',
  '{"power_w": 200, "dmx_channels": 16, "pan_deg": 540, "tilt_deg": 270, "weight_kg": 12}'
),
(
  'Par LED 54x3W RGBW',
  'LUZ-PAR54-001',
  'luz',
  850.00,
  170.00,
  158.00,
  'Refletor PAR LED 54 LEDs x 3W, RGBW, DMX',
  '{"power_w": 162, "dmx_channels": 8, "beam_angle_deg": 25, "weight_kg": 3.2}'
),
(
  'Controladora DMX 512 - 192 Canais',
  'LUZ-DMX192-001',
  'luz',
  1200.00,
  240.00,
  223.00,
  'Mesa controladora DMX 512 canais, 192 canais, 12 fixtures',
  '{"dmx_channels": 192, "fixtures": 12, "scenes": 30, "weight_kg": 2.5}'
),
(
  'Barra LED RGBW 1m (8 LEDs x 10W)',
  'LUZ-BAR1M-001',
  'luz',
  650.00,
  130.00,
  121.00,
  'Barra LED linear 1 metro, 8 LEDs x 10W, RGBW, DMX',
  '{"power_w": 80, "dmx_channels": 4, "length_cm": 100, "weight_kg": 2.1}'
);

-- Category: ESTRUTURA (4 produtos)
-- =====================================================

INSERT INTO products (name, sku, category, price_brl, price_usd, price_eur, description, technical_specs) VALUES
(
  'Treliça Q30 - 2 metros',
  'EST-TRQ30-2M',
  'estrutura',
  750.00,
  150.00,
  140.00,
  'Treliça quadrada Q30 (30x30cm), alumínio, 2 metros lineares',
  '{"type": "Q30", "length_m": 2, "material": "aluminum", "load_kg": 250, "weight_kg": 8.5}'
),
(
  'Treliça Q30 - 3 metros',
  'EST-TRQ30-3M',
  'estrutura',
  1050.00,
  210.00,
  195.00,
  'Treliça quadrada Q30 (30x30cm), alumínio, 3 metros lineares',
  '{"type": "Q30", "length_m": 3, "material": "aluminum", "load_kg": 250, "weight_kg": 12.5}'
),
(
  'Base Quadrada para Treliça - 1m²',
  'EST-BASE1M-001',
  'estrutura',
  480.00,
  96.00,
  89.00,
  'Base quadrada em aço, 1m², altura ajustável até 2m',
  '{"base_area_m2": 1, "height_max_m": 2, "material": "steel", "weight_kg": 18}'
),
(
  'Estrutura Box Truss 40x40cm - 2m',
  'EST-BOX40-2M',
  'estrutura',
  1200.00,
  240.00,
  223.00,
  'Estrutura box truss 40x40cm, alumínio, 2 metros',
  '{"type": "BOX40", "length_m": 2, "material": "aluminum", "load_kg": 400, "weight_kg": 15}'
);

-- Category: TALHA (3 produtos)
-- =====================================================

INSERT INTO products (name, sku, category, price_brl, price_usd, price_eur, description, technical_specs) VALUES
(
  'Talha Elétrica 500kg - Corrente',
  'TAL-EL500-001',
  'talha',
  3200.00,
  640.00,
  595.00,
  'Talha elétrica corrente, capacidade 500kg, altura 6m',
  '{"capacity_kg": 500, "lift_height_m": 6, "voltage": "220V", "speed_m_min": 8, "weight_kg": 28}'
),
(
  'Talha Elétrica 1 Tonelada - Corrente',
  'TAL-EL1T-001',
  'talha',
  5800.00,
  1160.00,
  1078.00,
  'Talha elétrica corrente, capacidade 1 tonelada, altura 6m',
  '{"capacity_kg": 1000, "lift_height_m": 6, "voltage": "220V", "speed_m_min": 6, "weight_kg": 42}'
),
(
  'Talha Manual Corrente 500kg',
  'TAL-MAN500-001',
  'talha',
  980.00,
  196.00,
  182.00,
  'Talha manual corrente, capacidade 500kg, altura 3m',
  '{"capacity_kg": 500, "lift_height_m": 3, "chain_links": "galvanized", "weight_kg": 12}'
);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Count products by category:
-- SELECT category, COUNT(*) as total, SUM(price_brl) as total_value_brl
-- FROM products
-- GROUP BY category
-- ORDER BY category;

-- List all active products:
-- SELECT name, sku, category, price_brl
-- FROM products
-- WHERE is_active = TRUE
-- ORDER BY category, name;

-- =====================================================
-- DONE! 15 products seeded
-- =====================================================
-- Distribution:
-- - Som: 4 produtos (R$ 29.500)
-- - Luz: 4 produtos (R$ 6.200)
-- - Estrutura: 4 produtos (R$ 3.480)
-- - Talha: 3 produtos (R$ 9.980)
-- Total: 15 produtos, R$ 49.160 em catálogo
-- =====================================================
