-- Migration: Add QSA (Quadro de Sócios e Administradores) to client_compliance
-- Date: 2025-11-26
-- Purpose: Store partners and administrators data from Receita Federal (Minha Receita API)

-- Add qsa column to store partners information
ALTER TABLE client_compliance
ADD COLUMN IF NOT EXISTS qsa JSONB DEFAULT NULL;

-- Add index for querying partners by CPF/CNPJ
CREATE INDEX IF NOT EXISTS idx_client_compliance_qsa_gin
ON client_compliance USING GIN (qsa);

-- Add comment explaining the column
COMMENT ON COLUMN client_compliance.qsa IS 'Quadro de Sócios e Administradores - Array of partners and administrators with nome_socio, cnpj_cpf_socio, qualificacao_socio, descricao_qualificacao_socio';
