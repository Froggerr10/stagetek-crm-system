-- Migration: Create client_compliance table for OpenCNPJ data
-- Description: Stores compliance and regulatory data from Brazilian Federal Revenue
-- Date: 2025-11-23

-- Create client_compliance table
CREATE TABLE IF NOT EXISTS client_compliance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,

  -- Status cadastral
  situacao_cadastral VARCHAR(50),           -- 'Ativa', 'Suspensa', 'Inapta', 'Baixada', 'Nula'
  data_situacao_cadastral DATE,
  motivo_situacao_cadastral TEXT,

  -- Regime tributário
  opcao_simples BOOLEAN DEFAULT false,      -- Optante pelo Simples Nacional
  data_opcao_simples DATE,
  data_exclusao_simples DATE,
  opcao_mei BOOLEAN DEFAULT false,          -- Microempreendedor Individual

  -- Dados da empresa
  porte VARCHAR(50),                        -- 'Micro', 'Pequeno', 'Médio', 'Grande', 'Demais'
  natureza_juridica VARCHAR(255),
  capital_social DECIMAL(15,2),
  data_inicio_atividade DATE,

  -- CNAE
  cnae_principal VARCHAR(10),
  cnae_principal_descricao TEXT,

  -- Metadata
  data_consulta TIMESTAMP DEFAULT NOW(),    -- Quando foi consultado
  api_source VARCHAR(50) DEFAULT 'opencnpj', -- Qual API foi usada
  raw_data JSONB,                           -- JSON completo da API (backup)

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Constraints
  UNIQUE(client_id)
);

-- Create indexes for performance
CREATE INDEX idx_client_compliance_client_id ON client_compliance(client_id);
CREATE INDEX idx_client_compliance_situacao ON client_compliance(situacao_cadastral);
CREATE INDEX idx_client_compliance_simples ON client_compliance(opcao_simples);
CREATE INDEX idx_client_compliance_mei ON client_compliance(opcao_mei);

-- RLS Policies
ALTER TABLE client_compliance ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view compliance data for their clients
CREATE POLICY "Users can view client compliance"
  ON client_compliance
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = client_compliance.client_id
      AND (
        clients.created_by = auth.uid()
        OR (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'manager')
      )
    )
  );

-- Policy: Users can insert compliance data when creating clients
CREATE POLICY "Users can insert client compliance"
  ON client_compliance
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = client_compliance.client_id
      AND clients.created_by = auth.uid()
    )
  );

-- Policy: Users can update compliance data for their clients
CREATE POLICY "Users can update client compliance"
  ON client_compliance
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = client_compliance.client_id
      AND (
        clients.created_by = auth.uid()
        OR (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'manager')
      )
    )
  );

-- Policy: Only admins can delete compliance data
CREATE POLICY "Only admins can delete client compliance"
  ON client_compliance
  FOR DELETE
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_client_compliance_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER client_compliance_updated_at
  BEFORE UPDATE ON client_compliance
  FOR EACH ROW
  EXECUTE FUNCTION update_client_compliance_updated_at();

-- Comments
COMMENT ON TABLE client_compliance IS 'Stores compliance and regulatory data from Brazilian Federal Revenue (OpenCNPJ API)';
COMMENT ON COLUMN client_compliance.situacao_cadastral IS 'Registration status: Ativa, Suspensa, Inapta, Baixada, Nula';
COMMENT ON COLUMN client_compliance.opcao_simples IS 'Whether the company is enrolled in Simples Nacional tax regime';
COMMENT ON COLUMN client_compliance.opcao_mei IS 'Whether the company is a MEI (Microempreendedor Individual)';
COMMENT ON COLUMN client_compliance.porte IS 'Company size: Micro, Pequeno, Médio, Grande, Demais';
COMMENT ON COLUMN client_compliance.raw_data IS 'Full JSON response from OpenCNPJ API for backup/audit purposes';
