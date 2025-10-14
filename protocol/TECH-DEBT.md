# Technical Debt Register - STAGETEK CRM

**Versão**: 1.0.0
**Data**: 13 de Outubro de 2025
**Owner**: Tech Lead (Claude Code AI)
**Revisão**: Quinzenal

---

## 📋 Sumário Executivo

Este documento rastreia todos os débitos técnicos conhecidos do projeto, classificados por severidade e impacto. O objetivo é manter visibilidade e priorizar resolução antes que se tornem bloqueadores.

### **Status Atual**
- 🔴 **Críticos (Blockers)**: 2 itens
- 🟡 **Altos**: 3 itens
- 🟢 **Médios**: 4 itens
- ⚪ **Baixos**: 2 itens

### **Meta**
- **Zero débitos críticos** antes de iniciar P0.5 (Cotação MVP)
- **<5 débitos altos** em produção
- **Revisão quinzenal** obrigatória

---

## 🔴 CRÍTICO (Resolver AGORA - Blockers)

### **TD-001: RLS Policies Incompletas**

**Status**: 🔴 **BLOQUEADOR** para P0.5
**Data Identificação**: 13 Out 2025
**Severidade**: CRÍTICA
**Impacto**: Vazamento de dados, não-compliance LGPD
**Esforço**: 5 dias
**Owner**: Backend Engineer

#### **Descrição**
Atualmente apenas policies de SELECT existem para as tabelas principais. Faltam policies de INSERT/UPDATE/DELETE, expondo o sistema a:
- Usuários podem modificar dados de outros usuários
- Ausência de validação de ownership
- Logs de auditoria inexistentes

#### **Escopo**

**Tabelas afetadas**:
- `clients` - Apenas SELECT funciona
- `opportunities` - Apenas SELECT funciona
- `funnel_stages` - SEM policies (admin only deveria existir)
- `contacts` - Tabela existe mas SEM policies
- `tasks` - Tabela existe mas SEM policies
- `products` - SEM policies (admin only deveria existir)
- `quotations` - Tabela não criada ainda

#### **Solução Proposta**

**1. RLS Policies por operação**:
```sql
-- Example: clients table
CREATE POLICY "Users can insert own clients"
  ON clients FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update own clients"
  ON clients FOR UPDATE
  USING (created_by = auth.uid() OR auth.jwt()->>'role' = 'admin');

CREATE POLICY "Only admins can delete"
  ON clients FOR DELETE
  USING (auth.jwt()->>'role' = 'admin');
```

**2. Org-scoping** (multi-tenant preparado):
```sql
-- Preparar para multi-org (futuro white-label)
ALTER TABLE clients ADD COLUMN org_id UUID REFERENCES organizations(id);

CREATE POLICY "Users see only own org"
  ON clients FOR SELECT
  USING (org_id = auth.jwt()->>'org_id'::UUID);
```

**3. Auditoria**:
```sql
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Trigger automático em todas as tabelas críticas
CREATE TRIGGER audit_clients_changes
  AFTER UPDATE OR DELETE ON clients
  FOR EACH ROW EXECUTE FUNCTION log_changes();
```

#### **Acceptance Criteria**
- [ ] RLS policies completas em `clients` (SELECT/INSERT/UPDATE/DELETE)
- [ ] RLS policies completas em `opportunities` (SELECT/INSERT/UPDATE/DELETE)
- [ ] RLS policies completas em `funnel_stages` (apenas admin modifica)
- [ ] RLS policies completas em `contacts` (owner validation)
- [ ] RLS policies completas em `tasks` (assignee validation)
- [ ] RLS policies completas em `products` (apenas admin modifica)
- [ ] RLS policies completas em `quotations` (quando tabela for criada)
- [ ] Tabela `activity_log` criada
- [ ] Triggers de auditoria em UPDATE/DELETE
- [ ] Testes manuais validam isolation (User A não acessa dados de User B)
- [ ] Documentado em `supabase/migrations/`

#### **Deadline**: 20 Out 2025 (7 dias)
#### **Referência**: `protocol/REFERENCE-DATABASE-SCHEMA-V2.md` linha 150-250

---

### **TD-002: Storage Policies (Bucket PDFs)**

**Status**: 🔴 **BLOQUEADOR** para P0.5
**Data Identificação**: 13 Out 2025
**Severidade**: CRÍTICA
**Impacto**: PDFs podem ser acessados por qualquer pessoa com URL
**Esforço**: 2 dias
**Owner**: Backend Engineer

#### **Descrição**
Bucket Supabase Storage para PDFs de cotações não possui policies. Isso significa:
- Qualquer pessoa com URL pode baixar PDFs (mesmo sem login)
- Não há controle de quem pode fazer upload
- Risco de spam (uploads ilimitados)

#### **Solução Proposta**

**1. Criar bucket com policies**:
```sql
-- Criar bucket (via Supabase Dashboard ou CLI)
INSERT INTO storage.buckets (id, name, public)
VALUES ('quotation-pdfs', 'quotation-pdfs', false);

-- Policy: Upload apenas para authenticated users
CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'quotation-pdfs' AND
    auth.role() = 'authenticated'
  );

-- Policy: Download apenas para owner da cotação
CREATE POLICY "Users can download own quotations"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'quotation-pdfs' AND
    (storage.foldername(name))[1] = auth.uid()::TEXT
  );

-- Policy: Deletar apenas próprio arquivo
CREATE POLICY "Users can delete own files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'quotation-pdfs' AND
    (storage.foldername(name))[1] = auth.uid()::TEXT
  );
```

**2. Estrutura de pastas**:
```
quotation-pdfs/
├── {user_id}/
│   ├── QT-2025-001.pdf
│   ├── QT-2025-002.pdf
│   └── ...
```

**3. Assinatura temporal (signed URLs)**:
```typescript
// Gerar URL com expiração de 1 hora
const { data, error } = await supabase.storage
  .from('quotation-pdfs')
  .createSignedUrl(`${userId}/QT-2025-001.pdf`, 3600)

// URL expira em 1h, sem risco de compartilhamento permanente
```

#### **Acceptance Criteria**
- [ ] Bucket `quotation-pdfs` criado com `public: false`
- [ ] Policy de upload (apenas authenticated)
- [ ] Policy de download (apenas owner)
- [ ] Policy de delete (apenas owner)
- [ ] Estrutura de pastas por `user_id`
- [ ] Signed URLs implementadas (1h TTL)
- [ ] Testado: User A não consegue baixar PDF de User B
- [ ] Documentado em `docs/setup/STORAGE-POLICIES.md`

#### **Deadline**: 18 Out 2025 (5 dias)
#### **Referência**: [Supabase Storage Docs](https://supabase.com/docs/guides/storage/security/access-control)

---

## 🟡 ALTO (Resolver em Sprint 0)

### **TD-003: Mascaramento de PII (Dados Sensíveis)**

**Status**: 🟡 **ALTO**
**Data Identificação**: 13 Out 2025
**Severidade**: ALTA
**Impacto**: LGPD compliance, exposição desnecessária de dados
**Esforço**: 3 dias
**Owner**: Frontend Engineer

#### **Descrição**
Atualmente emails e telefones são exibidos completos na UI. LGPD recomenda mascaramento quando não é necessário visualizar dados completos.

#### **Exemplo Atual**:
```
Email: joao.silva@acme.com.br
Telefone: (11) 98765-4321
CNPJ: 12.345.678/0001-90
```

#### **Exemplo Proposto**:
```
Email: joa***@acme.com.br
Telefone: (11) 9****-4321
CNPJ: 12.***.678/0001-90
```

#### **Solução Proposta**

**1. Utility function**:
```typescript
// src/lib/utils.ts
export function maskEmail(email: string): string {
  const [name, domain] = email.split('@')
  if (name.length <= 3) return `***@${domain}`
  return `${name.slice(0, 3)}***@${domain}`
}

export function maskPhone(phone: string): string {
  // (11) 98765-4321 → (11) 9****-4321
  return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2****-$3')
}

export function maskCNPJ(cnpj: string): string {
  // 12.345.678/0001-90 → 12.***.678/0001-90
  return cnpj.replace(/(\d{2})\.(\d{3})\.(\d{3})/, '$1.$2***.$3')
}
```

**2. Aplicar em componentes**:
```tsx
// src/components/molecules/ClientCard.tsx
import { maskEmail, maskPhone, maskCNPJ } from '@/lib/utils'

<p>{maskEmail(client.email)}</p>
<p>{maskPhone(client.phone)}</p>
<p>{maskCNPJ(client.cnpj)}</p>
```

**3. Mostrar completo apenas no hover (admin)**:
```tsx
<Tooltip content={client.email}>
  <span>{maskEmail(client.email)}</span>
</Tooltip>
```

#### **Acceptance Criteria**
- [ ] Utility functions criadas (`maskEmail`, `maskPhone`, `maskCNPJ`)
- [ ] Aplicado em `ClientCard.tsx`
- [ ] Aplicado em `ClientTable.tsx`
- [ ] Aplicado em `OportunidadeModal.tsx` (select de clientes)
- [ ] Tooltip mostra valor completo no hover (apenas admin)
- [ ] Testado: mascaramento correto em mobile
- [ ] Documentado em `protocol/SECURITY-GUIDELINES.md`

#### **Deadline**: 22 Out 2025 (9 dias)
#### **Referência**: [LGPD Art. 46](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)

---

### **TD-004: Storage Limits (Supabase Free)**

**Status**: 🟡 **ALTO**
**Data Identificação**: 13 Out 2025
**Severidade**: ALTA
**Impacto**: Sistema pode parar de funcionar se limites forem atingidos
**Esforço**: 2 dias (política de expiração)
**Owner**: Backend Engineer

#### **Descrição**
Supabase Free Tier tem limites:
- **Database**: 500 MB
- **Storage**: 2 GB
- **Bandwidth**: 5 GB/mês

**Risco**: PDFs de cotações podem estourar 2GB rapidamente (ex: 50 cotações/mês × 2MB = 100MB/mês = 2GB em 20 meses).

#### **Solução Proposta**

**1. Cold Storage (S3-compatible)**:
```typescript
// Mover PDFs >30 dias para cold storage (Cloudflare R2, Backblaze B2)
// Supabase Edge Function (cron diário)
export async function archiveOldPDFs() {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data: oldQuotations } = await supabase
    .from('quotations')
    .select('pdf_url')
    .lt('created_at', thirtyDaysAgo.toISOString())

  for (const quotation of oldQuotations) {
    // 1. Upload to R2/B2
    // 2. Delete from Supabase Storage
    // 3. Update quotations.pdf_url to R2 URL
  }
}
```

**2. Política de expiração**:
```sql
-- Deletar cotações rejeitadas após 90 dias
DELETE FROM quotations
WHERE status = 'rejected' AND created_at < NOW() - INTERVAL '90 days';

-- Avisar admin quando storage >80%
CREATE OR REPLACE FUNCTION check_storage_usage()
RETURNS void AS $$
BEGIN
  IF (SELECT pg_database_size(current_database()) > 400000000) THEN
    -- Enviar alerta Slack
  END IF;
END;
$$ LANGUAGE plpgsql;
```

**3. Compressão de imagens**:
```typescript
// src/lib/image-compress.ts
import imageCompression from 'browser-image-compression'

export async function compressImage(file: File): Promise<File> {
  return await imageCompression(file, {
    maxSizeMB: 0.5, // Max 500KB
    maxWidthOrHeight: 1024,
    useWebWorker: true
  })
}
```

#### **Acceptance Criteria**
- [ ] Edge Function `archive-old-pdfs` (cron diário)
- [ ] Cold storage (R2 ou B2) configurado
- [ ] Política de expiração (delete rejected após 90d)
- [ ] Alerta Slack quando storage >80%
- [ ] Compressão de imagens no upload
- [ ] Monitoramento de uso no Supabase Dashboard
- [ ] Documentado em `docs/setup/STORAGE-LIMITS.md`

#### **Deadline**: 25 Oct 2025 (12 dias)
#### **Referência**: [Supabase Pricing](https://supabase.com/pricing)

---

### **TD-005: Testes E2E (Playwright)**

**Status**: 🟡 **ALTO**
**Data Identificação**: 13 Out 2025
**Severidade**: ALTA
**Impacto**: Risco de regressões em produção
**Esforço**: 1 semana
**Owner**: QA Engineer / Frontend Engineer

#### **Descrição**
Atualmente não há testes automatizados. Isso aumenta o risco de:
- Bugs em produção (sem detecção prévia)
- Regressões ao refatorar código
- Confiança baixa em deploys

#### **Solução Proposta**

**1. Setup Playwright**:
```bash
npm install -D @playwright/test
npx playwright install
```

**2. Estrutura de testes**:
```
tests/
├── e2e/
│   ├── auth.spec.ts        # Login, logout, proteção de rotas
│   ├── clientes.spec.ts    # CRUD clientes
│   ├── oportunidades.spec.ts # CRUD oportunidades
│   ├── funil.spec.ts       # Drag-and-drop Kanban
│   ├── cotacao.spec.ts     # P0.5 - Criar cotação
│   └── dashboard.spec.ts   # Métricas, gráficos
└── playwright.config.ts
```

**3. Exemplo de teste**:
```typescript
// tests/e2e/clientes.spec.ts
import { test, expect } from '@playwright/test'

test('Criar novo cliente com sucesso', async ({ page }) => {
  // Login
  await page.goto('/login')
  await page.fill('[name="email"]', 'test@stagetek.com')
  await page.fill('[name="password"]', 'senha123')
  await page.click('button[type="submit"]')

  // Navegar para Clientes
  await page.goto('/clientes')

  // Abrir modal
  await page.click('text=+ Novo Cliente')

  // Preencher formulário
  await page.fill('[name="name"]', 'ACME Test Corp')
  await page.fill('[name="cnpj"]', '12.345.678/0001-90')
  await page.fill('[name="email"]', 'test@acme.com')

  // Submeter
  await page.click('text=Criar Cliente')

  // Validar sucesso
  await expect(page.locator('text=Cliente criado com sucesso')).toBeVisible()
  await expect(page.locator('text=ACME Test Corp')).toBeVisible()
})
```

#### **Acceptance Criteria**
- [ ] Playwright configurado (`playwright.config.ts`)
- [ ] 5 suites de testes (auth, clientes, oportunidades, funil, dashboard)
- [ ] Happy paths cobertos (1 teste por user story principal)
- [ ] CI/CD integrado (GitHub Actions roda testes em PR)
- [ ] Reports HTML gerados (playwright report)
- [ ] Documentado em `docs/TESTING.md`

#### **Deadline**: 30 Out 2025 (17 dias)
#### **Referência**: [Playwright Docs](https://playwright.dev)

---

## 🟢 MÉDIO (Resolver em Sprint 1)

### **TD-006: Monitoramento (Sentry)**

**Status**: 🟢 **MÉDIO**
**Data Identificação**: 13 Out 2025
**Severidade**: MÉDIA
**Impacto**: Sem visibilidade de erros em produção
**Esforço**: 1 dia
**Owner**: DevOps

#### **Descrição**
Atualmente não há ferramenta de monitoramento de erros. Quando algo quebra em produção, não sabemos até o usuário reportar.

#### **Solução Proposta**

**1. Sentry Setup**:
```bash
npm install @sentry/react @sentry/vite-plugin
```

**2. Configuração**:
```typescript
// src/main.tsx
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE, // 'development' | 'production'
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
```

**3. Error Boundary**:
```tsx
// src/components/ErrorBoundary.tsx
import { ErrorBoundary as SentryErrorBoundary } from '@sentry/react'

export default function ErrorBoundary({ children }) {
  return (
    <SentryErrorBoundary fallback={<ErrorFallback />}>
      {children}
    </SentryErrorBoundary>
  )
}
```

#### **Acceptance Criteria**
- [ ] Sentry configurado (free tier: 5k errors/mês)
- [ ] Error Boundary captura erros React
- [ ] Source maps configurados (Vite plugin)
- [ ] Alertas Slack para erros críticos
- [ ] Dashboard Sentry configurado
- [ ] Documentado em `docs/setup/MONITORING.md`

#### **Deadline**: 5 Nov 2025 (23 dias)
#### **Custo**: $0 (free tier suficiente para 5 usuários)

---

### **TD-007: Componentes Duplicados (Refactor)**

**Status**: 🟢 **MÉDIO**
**Data Identificação**: 13 Out 2025
**Severidade**: MÉDIA
**Impacto**: Manutenção duplicada, inconsistências visuais
**Esforço**: 3 dias
**Owner**: Frontend Engineer

#### **Descrição**
Alguns componentes foram criados ad-hoc e podem ser refatorados para reuso:
- Modais (ClienteModal, OportunidadeModal) têm 80% código igual
- Forms (useClienteForm, useOportunidadeForm) têm lógica similar
- Tabelas (ClientTable, OpportunitiesTable) podem usar DataTable genérico

#### **Solução Proposta**

**1. Modal genérico**:
```tsx
// src/components/molecules/Modal.tsx (35 linhas - compliant)
interface ModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ title, isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <ModalHeader title={title} onClose={onClose} />
        {children}
      </div>
    </div>
  )
}
```

**2. Usar em ClienteModal e OportunidadeModal**:
```tsx
// src/components/organisms/ClienteModal.tsx
import Modal from '@/components/molecules/Modal'

export default function ClienteModal({ cliente, onClose }: ClienteModalProps) {
  return (
    <Modal title={cliente ? 'Editar Cliente' : 'Novo Cliente'} isOpen onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Form fields aqui */}
      </form>
    </Modal>
  )
}
```

#### **Acceptance Criteria**
- [ ] Modal genérico criado (35 linhas, Protocol Notecraft compliant)
- [ ] ClienteModal refatorado para usar Modal genérico
- [ ] OportunidadeModal refatorado para usar Modal genérico
- [ ] DataTable genérico criado (reutilizar em clientes e oportunidades)
- [ ] Testes não quebram após refactor
- [ ] Documentado em Storybook

#### **Deadline**: 10 Nov 2025 (28 dias)
#### **Referência**: `protocol/PROTOCOL-NOTECRAFT.md` - Atomic Design

---

### **TD-008: Accessibility (A11y)**

**Status**: 🟢 **MÉDIO**
**Data Identificação**: 13 Out 2025
**Severidade**: MÉDIA
**Impacto**: Usuários com deficiência não conseguem usar
**Esforço**: 2 dias
**Owner**: Frontend Engineer

#### **Descrição**
Atualmente o sistema não foi auditado para acessibilidade. Problemas conhecidos:
- Falta ARIA labels em botões (ícones sem texto)
- Contraste de cores não validado (WCAG AA)
- Navegação por teclado não funciona em modais
- Screen readers não entendem estrutura (semântica HTML)

#### **Solução Proposta**

**1. Audit com Lighthouse**:
```bash
# Rodar audit
npm run build
npx playwright test --headed # Lighthouse CI
```

**2. Correções principais**:
```tsx
// ❌ Antes (sem ARIA)
<button onClick={handleEdit}>
  <Edit className="w-5 h-5" />
</button>

// ✅ Depois (com ARIA)
<button onClick={handleEdit} aria-label="Editar cliente">
  <Edit className="w-5 h-5" />
</button>

// ❌ Antes (baixo contraste)
<p className="text-gray-400">Texto secundário</p>

// ✅ Depois (contraste 4.5:1)
<p className="text-gray-300">Texto secundário</p>

// ❌ Antes (modal sem foco)
<div className="modal">...</div>

// ✅ Depois (foco automático)
<dialog open ref={dialogRef} onMount={() => dialogRef.current?.focus()}>...</dialog>
```

#### **Acceptance Criteria**
- [ ] Lighthouse Accessibility Score >90
- [ ] ARIA labels em todos os botões de ícone
- [ ] Contraste WCAG AA (4.5:1) validado
- [ ] Navegação por teclado (Tab, Enter, Esc) funciona
- [ ] Screen reader testado (NVDA ou JAWS)
- [ ] Documentado em `docs/ACCESSIBILITY.md`

#### **Deadline**: 15 Nov 2025 (33 dias)
#### **Referência**: [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

### **TD-009: Bundle Size (Otimização)**

**Status**: 🟢 **MÉDIO**
**Data Identificação**: 13 Out 2025
**Severidade**: MÉDIA
**Impacto**: First Load lento (>3s), ruim para mobile
**Esforço**: 2 dias
**Owner**: Frontend Engineer

#### **Descrição**
Bundle atual: ~800KB (gzipped). Meta: <500KB.

Principais culpados:
- Recharts: ~200KB (gráficos)
- Supabase client: ~100KB
- Lucide icons: ~50KB (importando tudo)

#### **Solução Proposta**

**1. Code Splitting (React.lazy)**:
```tsx
// src/App.tsx
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Clientes = lazy(() => import('@/pages/Clientes'))

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/clientes" element={<Clientes />} />
  </Routes>
</Suspense>
```

**2. Tree-shaking de ícones**:
```tsx
// ❌ Antes (importa tudo - 50KB)
import * as Icons from 'lucide-react'

// ✅ Depois (importa apenas usado - 5KB)
import { Home, Users, Target } from 'lucide-react'
```

**3. Recharts alternativa (opcional)**:
```typescript
// Considerar Chart.js (lighter) ou D3 (mais controle)
// Recharts: ~200KB
// Chart.js: ~60KB
// D3: ~80KB
```

#### **Acceptance Criteria**
- [ ] Bundle <500KB (gzipped)
- [ ] Code splitting implementado (Dashboard, Clientes, Oportunidades)
- [ ] Lucide icons tree-shaking configurado
- [ ] Lighthouse Performance Score >85
- [ ] First Contentful Paint <1.5s
- [ ] Time to Interactive <3s
- [ ] Documentado em `docs/PERFORMANCE.md`

#### **Deadline**: 20 Nov 2025 (38 dias)
#### **Ferramenta**: [Bundle Analyzer](https://www.npmjs.com/package/rollup-plugin-visualizer)

---

## ⚪ BAIXO (Resolver em Sprint 2+)

### **TD-010: Storybook Components**

**Status**: ⚪ **BAIXO**
**Data Identificação**: 13 Out 2025
**Severidade**: BAIXA
**Impacto**: Falta documentação de componentes
**Esforço**: 3 dias
**Owner**: Frontend Engineer

#### **Descrição**
Storybook está configurado mas poucos componentes estão documentados. Dificulta reuso e onboarding de novos devs.

#### **Acceptance Criteria**
- [ ] Todos os Atoms documentados (Button, Input, Badge, etc.)
- [ ] Todos os Molecules documentados (FormField, ModalHeader, etc.)
- [ ] Stories com variações (hover, disabled, error states)
- [ ] Publicado em Chromatic ou similar (CI)

#### **Deadline**: 30 Nov 2025 (48 dias)

---

### **TD-011: Internationalization (i18n)**

**Status**: ⚪ **BAIXO**
**Data Identificação**: 13 Out 2025
**Severidade**: BAIXA
**Impacto**: Apenas PT-BR suportado (não crítico)
**Esforço**: 1 semana
**Owner**: Frontend Engineer

#### **Descrição**
Sistema atualmente hard-coded em PT-BR. Se exportar internacionalmente, precisará EN/ES.

#### **Acceptance Criteria**
- [ ] i18next configurado
- [ ] Traduções PT-BR/EN/ES
- [ ] Seletor de idioma no header
- [ ] Testes cobrem troca de idioma

#### **Deadline**: Ano 2 (não prioritário)
#### **Referência**: `SPECS-PRD.md` - P3.17

---

## 📊 Matriz de Priorização (RICE Score)

| ID | Débito | Reach | Impact | Confidence | Effort | RICE | Prioridade |
|----|--------|-------|--------|------------|--------|------|------------|
| TD-001 | RLS Policies | 5 | 10 | 100% | 5d | **20.0** | 🔴 CRÍTICO |
| TD-002 | Storage Policies | 5 | 10 | 100% | 2d | **25.0** | 🔴 CRÍTICO |
| TD-003 | Masking PII | 5 | 8 | 90% | 3d | **12.0** | 🟡 ALTO |
| TD-004 | Storage Limits | 5 | 9 | 80% | 2d | **18.0** | 🟡 ALTO |
| TD-005 | Testes E2E | 5 | 8 | 70% | 5d | **5.6** | 🟡 ALTO |
| TD-006 | Sentry | 5 | 6 | 90% | 1d | **27.0** | 🟢 MÉDIO |
| TD-007 | Refactor Modal | 3 | 4 | 80% | 3d | **3.2** | 🟢 MÉDIO |
| TD-008 | Accessibility | 5 | 5 | 60% | 2d | **7.5** | 🟢 MÉDIO |
| TD-009 | Bundle Size | 5 | 4 | 70% | 2d | **7.0** | 🟢 MÉDIO |
| TD-010 | Storybook | 2 | 3 | 50% | 3d | **1.0** | ⚪ BAIXO |
| TD-011 | i18n | 1 | 2 | 30% | 5d | **0.1** | ⚪ BAIXO |

---

## 🔄 Processo de Gestão

### **Adicionar Novo Débito**
1. Identificar problema (code review, bug report, audit)
2. Criar issue no formato TD-XXX
3. Classificar severidade (Crítico, Alto, Médio, Baixo)
4. Calcular RICE score
5. Adicionar ao registro (este documento)
6. Atribuir owner e deadline

### **Resolver Débito**
1. Criar branch `fix/TD-XXX-description`
2. Implementar solução
3. Validar Acceptance Criteria
4. Code review (2 approvals)
5. Merge para `main`
6. Marcar como ✅ RESOLVIDO neste documento
7. Mover para seção "Débitos Resolvidos"

### **Revisão Quinzenal**
- **Quando**: Toda segunda-feira (bi-weekly)
- **Quem**: Tech Lead + Product Manager
- **Agenda**:
  1. Revisar débitos críticos (há novos blockers?)
  2. Atualizar RICE scores (prioridades mudaram?)
  3. Re-atribuir owners (alguém está sobrecarregado?)
  4. Verificar deadlines (há atrasos?)
  5. Planejar Sprint (quais débitos entram?)

---

## ✅ Débitos Resolvidos (Histórico)

*Nenhum débito resolvido ainda. Este projeto começou em Out 2025.*

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
**Próxima revisão**: 27 de Outubro de 2025
