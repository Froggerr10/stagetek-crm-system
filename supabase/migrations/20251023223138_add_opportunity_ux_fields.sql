-- Add UX fields to opportunities table
ALTER TABLE opportunities
ADD COLUMN IF NOT EXISTS temperature TEXT CHECK(temperature IN ('hot', 'warm', 'cold')),
ADD COLUMN IF NOT EXISTS qualification INTEGER CHECK(qualification BETWEEN 1 AND 5);

-- Set default values for existing records
UPDATE opportunities SET temperature = 'warm' WHERE temperature IS NULL;
UPDATE opportunities SET qualification = 3 WHERE qualification IS NULL;

-- Add comments
COMMENT ON COLUMN opportunities.temperature IS 'Temperatura da oportunidade: hot (quente), warm (morno), cold (frio)';
COMMENT ON COLUMN opportunities.qualification IS 'Qualificação da oportunidade de 1 a 5 estrelas';
