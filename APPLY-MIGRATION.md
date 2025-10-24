# Como Aplicar a Migração de UX

## Passos:

1. Acesse o **Supabase Dashboard**: https://supabase.com/dashboard
2. Selecione o projeto **stagetek-crm-system**
3. Vá em **SQL Editor** (menu lateral esquerdo)
4. Clique em **New Query**
5. Cole o SQL abaixo e execute:

```sql
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
```

6. Clique em **Run** (ou pressione `Ctrl+Enter`)
7. Verifique se apareceu "Success" no canto inferior direito

## Testar:

No app (http://localhost:5173/funil), os cards agora mostram:
- Avatar colorido do cliente
- Ícone de temperatura (🔥 hot | 💧 warm | ❄️ cold)
- Estrelas de qualificação (⭐⭐⭐)

## Se der erro:

Se aparecer erro de permissão, execute primeiro:
```sql
GRANT ALL ON TABLE opportunities TO authenticated;
```

Depois execute a migração novamente.
