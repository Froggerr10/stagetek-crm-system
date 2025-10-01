-- STAGETEK CRM System - Initial Database Schema
-- Version: 1.0.0
-- Date: 2025-10-01
-- Description: Core tables for MVP (P0 features)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. PROFILES (extends Supabase Auth)
-- =====================================================
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- =====================================================
-- 2. CLIENTS (B2B Customers)
-- =====================================================
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    cnpj TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    website TEXT,
    address_street TEXT,
    address_city TEXT,
    address_state TEXT,
    address_zip TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
    segment TEXT, -- Eventos, Shows, Corporativo, etc.
    notes TEXT,
    total_revenue DECIMAL(12, 2) DEFAULT 0,
    total_events INTEGER DEFAULT 0,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_clients_cnpj ON clients(cnpj);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_created_at ON clients(created_at DESC);

-- RLS Policies
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view clients"
    ON clients FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert clients"
    ON clients FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update clients"
    ON clients FOR UPDATE
    USING (auth.role() = 'authenticated');

-- =====================================================
-- 3. FUNNELS (Sales Funnels)
-- =====================================================
CREATE TABLE funnels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    is_default BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_funnels_is_default ON funnels(is_default);
CREATE INDEX idx_funnels_is_active ON funnels(is_active);

-- RLS Policies
ALTER TABLE funnels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view funnels"
    ON funnels FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage funnels"
    ON funnels FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'manager')
        )
    );

-- =====================================================
-- 4. STAGES (Funnel Stages)
-- =====================================================
CREATE TABLE stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    funnel_id UUID NOT NULL REFERENCES funnels(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    sigla TEXT NOT NULL, -- 2-3 letter abbreviation
    color TEXT NOT NULL CHECK (color IN ('gray', 'blue', 'purple', 'orange', 'green', 'red', 'yellow', 'teal')),
    display_order INTEGER NOT NULL,
    probability INTEGER DEFAULT 0 CHECK (probability >= 0 AND probability <= 100), -- Win probability %
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(funnel_id, display_order)
);

-- Indexes
CREATE INDEX idx_stages_funnel_id ON stages(funnel_id);
CREATE INDEX idx_stages_display_order ON stages(funnel_id, display_order);

-- RLS Policies
ALTER TABLE stages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view stages"
    ON stages FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage stages"
    ON stages FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'manager')
        )
    );

-- =====================================================
-- 5. OPPORTUNITIES (Deals/Opportunities)
-- =====================================================
CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    funnel_id UUID NOT NULL REFERENCES funnels(id),
    stage_id UUID NOT NULL REFERENCES stages(id),
    value DECIMAL(12, 2) NOT NULL DEFAULT 0,
    expected_close_date DATE,
    probability INTEGER DEFAULT 0 CHECK (probability >= 0 AND probability <= 100),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'won', 'lost')),
    lost_reason TEXT,
    owner_id UUID REFERENCES profiles(id), -- Assigned user
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_opportunities_client_id ON opportunities(client_id);
CREATE INDEX idx_opportunities_funnel_id ON opportunities(funnel_id);
CREATE INDEX idx_opportunities_stage_id ON opportunities(stage_id);
CREATE INDEX idx_opportunities_owner_id ON opportunities(owner_id);
CREATE INDEX idx_opportunities_status ON opportunities(status);
CREATE INDEX idx_opportunities_created_at ON opportunities(created_at DESC);

-- RLS Policies
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view opportunities"
    ON opportunities FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert opportunities"
    ON opportunities FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update opportunities they own or created"
    ON opportunities FOR UPDATE
    USING (
        auth.uid() = owner_id OR
        auth.uid() = created_by OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'manager')
        )
    );

-- =====================================================
-- 6. PRODUCTS (Equipment Catalog)
-- =====================================================
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    sku TEXT UNIQUE,
    category TEXT NOT NULL CHECK (category IN ('fabricacao', 'revenda_som', 'revenda_luz', 'locacao')),
    subcategory TEXT, -- treliças, talhas, caixas, moving heads, etc.
    description TEXT,
    unit_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    cost_price DECIMAL(10, 2),
    stock_quantity INTEGER DEFAULT 0,
    min_stock INTEGER DEFAULT 0,
    unit TEXT DEFAULT 'unidade', -- unidade, metro, kg, etc.
    is_active BOOLEAN DEFAULT true,
    image_url TEXT,
    specifications JSONB, -- Technical specs
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_active ON products(is_active);

-- RLS Policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view active products"
    ON products FOR SELECT
    USING (auth.role() = 'authenticated' AND is_active = true);

CREATE POLICY "Admins can manage products"
    ON products FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'manager')
        )
    );

-- =====================================================
-- 7. OPPORTUNITY_PRODUCTS (Many-to-Many)
-- =====================================================
CREATE TABLE opportunity_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity DECIMAL(10, 2) NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    discount_percent DECIMAL(5, 2) DEFAULT 0,
    total DECIMAL(12, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(opportunity_id, product_id)
);

-- Indexes
CREATE INDEX idx_opportunity_products_opportunity_id ON opportunity_products(opportunity_id);
CREATE INDEX idx_opportunity_products_product_id ON opportunity_products(product_id);

-- RLS Policies
ALTER TABLE opportunity_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view opportunity products"
    ON opportunity_products FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Users can manage opportunity products they own"
    ON opportunity_products FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM opportunities
            WHERE opportunities.id = opportunity_products.opportunity_id
            AND (
                opportunities.owner_id = auth.uid() OR
                opportunities.created_by = auth.uid() OR
                EXISTS (
                    SELECT 1 FROM profiles
                    WHERE profiles.id = auth.uid()
                    AND profiles.role IN ('admin', 'manager')
                )
            )
        )
    );

-- =====================================================
-- 8. ACTIVITIES (Timeline/History)
-- =====================================================
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type TEXT NOT NULL CHECK (entity_type IN ('opportunity', 'client', 'product')),
    entity_id UUID NOT NULL,
    activity_type TEXT NOT NULL, -- created, updated, stage_changed, status_changed, note_added, etc.
    description TEXT NOT NULL,
    metadata JSONB, -- Additional data (old_value, new_value, etc.)
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_activities_entity ON activities(entity_type, entity_id);
CREATE INDEX idx_activities_created_at ON activities(created_at DESC);

-- RLS Policies
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view activities"
    ON activities FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert activities"
    ON activities FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_funnels_updated_at BEFORE UPDATE ON funnels
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stages_updated_at BEFORE UPDATE ON stages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON opportunities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opportunity_products_updated_at BEFORE UPDATE ON opportunity_products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function: Log activity on opportunity stage change
CREATE OR REPLACE FUNCTION log_opportunity_stage_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.stage_id IS DISTINCT FROM NEW.stage_id THEN
        INSERT INTO activities (
            entity_type,
            entity_id,
            activity_type,
            description,
            metadata,
            created_by
        ) VALUES (
            'opportunity',
            NEW.id,
            'stage_changed',
            'Oportunidade movida de fase',
            jsonb_build_object(
                'old_stage_id', OLD.stage_id,
                'new_stage_id', NEW.stage_id
            ),
            auth.uid()
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_opportunity_stage_change_trigger
    AFTER UPDATE ON opportunities
    FOR EACH ROW
    EXECUTE FUNCTION log_opportunity_stage_change();

-- Function: Update client total_revenue when opportunity is won
CREATE OR REPLACE FUNCTION update_client_revenue()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'won' AND OLD.status != 'won' THEN
        UPDATE clients
        SET total_revenue = total_revenue + NEW.value,
            total_events = total_events + 1
        WHERE id = NEW.client_id;
    ELSIF OLD.status = 'won' AND NEW.status != 'won' THEN
        UPDATE clients
        SET total_revenue = total_revenue - OLD.value,
            total_events = total_events - 1
        WHERE id = OLD.client_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_client_revenue_trigger
    AFTER UPDATE ON opportunities
    FOR EACH ROW
    EXECUTE FUNCTION update_client_revenue();

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE profiles IS 'User profiles (extends Supabase Auth)';
COMMENT ON TABLE clients IS 'B2B customers';
COMMENT ON TABLE funnels IS 'Sales funnels (can have multiple)';
COMMENT ON TABLE stages IS 'Stages within each funnel';
COMMENT ON TABLE opportunities IS 'Sales opportunities/deals';
COMMENT ON TABLE products IS 'Equipment catalog (fabricação, revenda, locação)';
COMMENT ON TABLE opportunity_products IS 'Products linked to opportunities';
COMMENT ON TABLE activities IS 'Activity timeline/history for all entities';
