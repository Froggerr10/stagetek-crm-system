-- ⚠️ APENAS PARA DESENVOLVIMENTO LOCAL!
-- Desabilita RLS para facilitar testes sem autenticação

-- Desabilitar RLS temporariamente
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE funnels DISABLE ROW LEVEL SECURITY;
ALTER TABLE funnel_stages DISABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities DISABLE ROW LEVEL SECURITY;
ALTER TABLE notes DISABLE ROW LEVEL SECURITY;
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;

-- ⚠️ IMPORTANTE: Reabilitar RLS antes de deploy em produção!
-- Ver arquivo: supabase/enable-rls-prod.sql
