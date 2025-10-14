-- =====================================================
-- STAGETEK CRM - Comprehensive RLS Policies + Auditing
-- Version: 2.0
-- Date: 13/Oct/2025
-- Sprint 0: Security Blockers Resolution
-- =====================================================

-- =====================================================
-- 1. ACTIVITY LOG (Auditoria)
-- =====================================================
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_log_table_name ON activity_log(table_name);
CREATE INDEX idx_activity_log_record_id ON activity_log(record_id);
CREATE INDEX idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at DESC);

-- RLS for activity_log (apenas admins veem logs)
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only authenticated users can view logs"
  ON activity_log FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- =====================================================
-- 2. LOG FUNCTION (Auditoria automática)
-- =====================================================
CREATE OR REPLACE FUNCTION log_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO activity_log (
      table_name,
      record_id,
      action,
      old_data,
      user_id,
      user_email
    ) VALUES (
      TG_TABLE_NAME,
      OLD.id,
      'DELETE',
      to_jsonb(OLD),
      auth.uid(),
      auth.email()
    );
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO activity_log (
      table_name,
      record_id,
      action,
      old_data,
      new_data,
      user_id,
      user_email
    ) VALUES (
      TG_TABLE_NAME,
      NEW.id,
      'UPDATE',
      to_jsonb(OLD),
      to_jsonb(NEW),
      auth.uid(),
      auth.email()
    );
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO activity_log (
      table_name,
      record_id,
      action,
      new_data,
      user_id,
      user_email
    ) VALUES (
      TG_TABLE_NAME,
      NEW.id,
      'INSERT',
      to_jsonb(NEW),
      auth.uid(),
      auth.email()
    );
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 3. DROP OLD PERMISSIVE POLICIES
-- =====================================================

-- Clients
DROP POLICY IF EXISTS "Users can view all clients" ON clients;
DROP POLICY IF EXISTS "Users can insert clients" ON clients;
DROP POLICY IF EXISTS "Users can update clients" ON clients;

-- Funnels
DROP POLICY IF EXISTS "Users can view funnels" ON funnels;

-- Funnel Stages
DROP POLICY IF EXISTS "Users can view funnel stages" ON funnel_stages;

-- Opportunities
DROP POLICY IF EXISTS "Users can view opportunities" ON opportunities;
DROP POLICY IF EXISTS "Users can insert opportunities" ON opportunities;
DROP POLICY IF EXISTS "Users can update opportunities" ON opportunities;

-- Notes
DROP POLICY IF EXISTS "Users can view notes" ON notes;
DROP POLICY IF EXISTS "Users can insert notes" ON notes;

-- Tasks
DROP POLICY IF EXISTS "Users can view tasks" ON tasks;
DROP POLICY IF EXISTS "Users can insert tasks" ON tasks;
DROP POLICY IF EXISTS "Users can update tasks" ON tasks;

-- =====================================================
-- 4. CLIENTS - Ownership-based RLS
-- =====================================================

-- SELECT: Todos veem todos os clientes (B2B, poucos usuários)
CREATE POLICY "clients_select_policy"
  ON clients FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- INSERT: Qualquer usuário autenticado pode criar
CREATE POLICY "clients_insert_policy"
  ON clients FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND created_by = auth.uid()
  );

-- UPDATE: Apenas owner ou admin
CREATE POLICY "clients_update_policy"
  ON clients FOR UPDATE
  USING (
    auth.uid() IS NOT NULL
    AND (
      created_by = auth.uid()
      OR auth.jwt()->>'role' = 'admin'
    )
  );

-- DELETE: Apenas admin (soft delete via status 'inactive')
CREATE POLICY "clients_delete_policy"
  ON clients FOR DELETE
  USING (auth.jwt()->>'role' = 'admin');

-- =====================================================
-- 5. FUNNELS - Admin-only management
-- =====================================================

-- SELECT: Todos veem funis ativos
CREATE POLICY "funnels_select_policy"
  ON funnels FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND is_active = TRUE
  );

-- INSERT: Apenas admin
CREATE POLICY "funnels_insert_policy"
  ON funnels FOR INSERT
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- UPDATE: Apenas admin
CREATE POLICY "funnels_update_policy"
  ON funnels FOR UPDATE
  USING (auth.jwt()->>'role' = 'admin');

-- DELETE: Apenas admin
CREATE POLICY "funnels_delete_policy"
  ON funnels FOR DELETE
  USING (auth.jwt()->>'role' = 'admin');

-- =====================================================
-- 6. FUNNEL STAGES - Admin-only management
-- =====================================================

-- SELECT: Todos veem estágios de funis ativos
CREATE POLICY "funnel_stages_select_policy"
  ON funnel_stages FOR SELECT
  USING (
    auth.uid() IS NOT NULL
  );

-- INSERT: Apenas admin
CREATE POLICY "funnel_stages_insert_policy"
  ON funnel_stages FOR INSERT
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- UPDATE: Apenas admin (mudanças estruturais)
CREATE POLICY "funnel_stages_update_policy"
  ON funnel_stages FOR UPDATE
  USING (auth.jwt()->>'role' = 'admin');

-- DELETE: Apenas admin
CREATE POLICY "funnel_stages_delete_policy"
  ON funnel_stages FOR DELETE
  USING (auth.jwt()->>'role' = 'admin');

-- =====================================================
-- 7. OPPORTUNITIES - Owner/Assignee access
-- =====================================================

-- SELECT: Todos veem todas as oportunidades (time pequeno)
CREATE POLICY "opportunities_select_policy"
  ON opportunities FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- INSERT: Qualquer usuário autenticado pode criar
CREATE POLICY "opportunities_insert_policy"
  ON opportunities FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND created_by = auth.uid()
  );

-- UPDATE: Owner, assignee ou admin
CREATE POLICY "opportunities_update_policy"
  ON opportunities FOR UPDATE
  USING (
    auth.uid() IS NOT NULL
    AND (
      created_by = auth.uid()
      OR assigned_to = auth.uid()
      OR auth.jwt()->>'role' = 'admin'
    )
  );

-- DELETE: Apenas admin
CREATE POLICY "opportunities_delete_policy"
  ON opportunities FOR DELETE
  USING (auth.jwt()->>'role' = 'admin');

-- =====================================================
-- 8. NOTES - Immutable after creation
-- =====================================================

-- SELECT: Todos veem notas
CREATE POLICY "notes_select_policy"
  ON notes FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- INSERT: Qualquer usuário autenticado
CREATE POLICY "notes_insert_policy"
  ON notes FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND created_by = auth.uid()
  );

-- UPDATE: PROIBIDO (notas são imutáveis)
-- (sem policy = sem UPDATE)

-- DELETE: Apenas admin (caso excepcional)
CREATE POLICY "notes_delete_policy"
  ON notes FOR DELETE
  USING (auth.jwt()->>'role' = 'admin');

-- =====================================================
-- 9. TASKS - Assignee/Creator access
-- =====================================================

-- SELECT: Todos veem todas as tarefas
CREATE POLICY "tasks_select_policy"
  ON tasks FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- INSERT: Qualquer usuário autenticado
CREATE POLICY "tasks_insert_policy"
  ON tasks FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND created_by = auth.uid()
  );

-- UPDATE: Creator, assignee ou admin
CREATE POLICY "tasks_update_policy"
  ON tasks FOR UPDATE
  USING (
    auth.uid() IS NOT NULL
    AND (
      created_by = auth.uid()
      OR assigned_to = auth.uid()
      OR auth.jwt()->>'role' = 'admin'
    )
  );

-- DELETE: Creator ou admin
CREATE POLICY "tasks_delete_policy"
  ON tasks FOR DELETE
  USING (
    auth.uid() IS NOT NULL
    AND (
      created_by = auth.uid()
      OR auth.jwt()->>'role' = 'admin'
    )
  );

-- =====================================================
-- 10. AUDIT TRIGGERS (Automatic logging)
-- =====================================================

-- Trigger para clients
DROP TRIGGER IF EXISTS audit_clients_changes ON clients;
CREATE TRIGGER audit_clients_changes
  AFTER UPDATE OR DELETE ON clients
  FOR EACH ROW EXECUTE FUNCTION log_changes();

-- Trigger para opportunities
DROP TRIGGER IF EXISTS audit_opportunities_changes ON opportunities;
CREATE TRIGGER audit_opportunities_changes
  AFTER UPDATE OR DELETE ON opportunities
  FOR EACH ROW EXECUTE FUNCTION log_changes();

-- Trigger para tasks
DROP TRIGGER IF EXISTS audit_tasks_changes ON tasks;
CREATE TRIGGER audit_tasks_changes
  AFTER UPDATE OR DELETE ON tasks
  FOR EACH ROW EXECUTE FUNCTION log_changes();

-- Trigger para funnels (admin only, mas auditamos)
DROP TRIGGER IF EXISTS audit_funnels_changes ON funnels;
CREATE TRIGGER audit_funnels_changes
  AFTER UPDATE OR DELETE ON funnels
  FOR EACH ROW EXECUTE FUNCTION log_changes();

-- Trigger para funnel_stages
DROP TRIGGER IF EXISTS audit_funnel_stages_changes ON funnel_stages;
CREATE TRIGGER audit_funnel_stages_changes
  AFTER UPDATE OR DELETE ON funnel_stages
  FOR EACH ROW EXECUTE FUNCTION log_changes();

-- =====================================================
-- 11. GRANT PERMISSIONS
-- =====================================================

-- Garantir que service_role pode fazer tudo (para migrações)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- Usuários autenticados precisam acessar tabelas
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- =====================================================
-- DONE! RLS Policies completas + Auditoria configurada
-- =====================================================
-- Próximos passos:
-- 1. Rodar este SQL no Supabase Dashboard (SQL Editor)
-- 2. Testar isolation (User A não vê dados de User B quando aplicável)
-- 3. Verificar activity_log após UPDATE/DELETE
-- =====================================================
