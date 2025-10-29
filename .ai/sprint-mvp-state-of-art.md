# Sprint MVP State of Art - Planning

**Data**: 25 Outubro 2025
**Duração**: 7.5 dias úteis (25 Out - 2 Nov)
**Objetivo**: Implementar 7 gaps P0 para atingir MVP State of Art (UX equivalente a RD Station)

---

## 🎯 Objetivo do Sprint

**Alcançar MVP State of Art**: Sistema com 100% P0 features implementadas, UX equivalente ao RD Station, zero placeholders.

**Métrica de Sucesso**: 7/7 stories concluídas + DoD 100% + zero bugs críticos.

---

## 🚨 BLOCKERS CRÍTICOS (Resolver ANTES do Sprint)

### **Blocker 1: RLS Policies Incompletas** ⏰ 2-3 dias

**Problema**: Apenas policies de SELECT existem. Faltam INSERT/UPDATE/DELETE (vulnerabilidade de segurança).

**Ação necessária**:
```sql
-- Criar policies para TODAS as tabelas:
-- 1. clients (INSERT/UPDATE/DELETE)
-- 2. contacts (INSERT/UPDATE/DELETE)
-- 3. opportunities (INSERT/UPDATE/DELETE)
-- 4. opportunity_products (INSERT/UPDATE/DELETE - nova tabela Story 1.2)
-- 5. emails_sent (INSERT/UPDATE/DELETE - nova tabela Story 1.1)
-- 6. notes (INSERT only - immutable audit trail)
-- 7. tasks (INSERT/UPDATE/DELETE)
-- 8. funnels (apenas admin)
-- 9. funnel_stages (apenas admin)
-- 10. products (apenas admin)
-- 11. quotations (INSERT/UPDATE/DELETE)

-- Storage policies:
-- Bucket: attachments (Story 1.3)
-- Bucket: pdfs (já existe)
```

**Status**: 🔴 **CRÍTICO** - Deploy bloqueado até resolver.

**Referência**: `docs/architecture/database-schema.md` linhas 421-475 (P0 issues documentados).

---

### **Blocker 2: Criar Novas Tabelas** ⏰ 1 dia

**Tabelas necessárias para Stories**:

```sql
-- Story 1.1 (Tab Email)
CREATE TABLE emails_sent (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
  to_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  sent_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Story 1.2 (Tab Produtos)
CREATE TABLE opportunity_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(opportunity_id, product_id)
);

-- Story 1.3 (Tab Arquivos) - Usar Supabase Storage, não criar tabela
-- Bucket: attachments
-- Path: attachments/{opportunity_id}/{filename}
```

**Status**: ⚠️ **MÉDIO** - Não bloqueia início do sprint, mas bloqueia Stories 1.1 e 1.2.

---

## 📅 Cronograma Recomendado (Sequência com Dependências)

### **Fase 0: Pré-Sprint (2-3 dias - CRÍTICO)**
```
Dia -3 a -1: Resolver Blockers
├─ RLS Policies completas (11 tabelas + 2 buckets Storage) - 2 dias
├─ Criar tables: emails_sent, opportunity_products - 0.5 dia
└─ Testar RLS policies (insert/update/delete) - 0.5 dia
```

**⚠️ NÃO INICIAR SPRINT SEM RESOLVER BLOCKERS**

---

### **Fase 1: Quick Wins UX (Dia 1 - 6h)** 🏃‍♂️

**Objetivo**: Melhorias visuais rápidas, zero backend.

#### **Story 3.1: Fix Botões ClientCard** (2h) ✅ Zero dependências
- **Epic**: EPIC-003
- **Gap**: G-006
- **Arquivo**: `docs/stories/3.1.fix-botoes-clientcard.md`
- **Tasks**:
  - [ ] Editar `src/components/molecules/ClientCard.tsx` linhas 25-26
  - [ ] Trocar `variant="ghost"` → `variant="outline"`
  - [ ] Adicionar ícones Lucide (Edit, Trash2)
  - [ ] Testar dark mode (border branca visível)
- **DoD**:
  - [ ] Botões visíveis em dark mode
  - [ ] Hover com fundo azul funcionando
  - [ ] Protocol Notecraft™ compliant (≤35 linhas)
  - [ ] Screenshot antes/depois anexado
- **Blocker**: Nenhum ✅

---

#### **Story 3.2: Quick Actions Cards** (4h) ✅ Zero dependências
- **Epic**: EPIC-003
- **Gap**: G-005
- **Arquivo**: `docs/stories/3.2.quick-actions-cards.md`
- **Tasks**:
  - [ ] Editar `src/components/molecules/OpportunityCard.tsx` (adicionar rodapé)
  - [ ] Handler `handleQuickCall()` cria tarefa (usar hook `useTasks` existente)
  - [ ] Handler `handleQuickEmail()` abre modal EmailComposer (Story 1.1 integration)
  - [ ] Adicionar ícones Lucide (Phone, Mail) + tooltips
  - [ ] Mobile: 44x44px (touch-friendly)
- **DoD**:
  - [ ] Ícones visíveis no rodapé do card
  - [ ] Click em Phone → cria tarefa tipo "Ligação"
  - [ ] Click em Mail → abre modal EmailComposer
  - [ ] Hover cinza → azul animado
  - [ ] Protocol Notecraft™ compliant (≤35 linhas)
- **Blocker**: Nenhum (integração com Story 1.1 é opcional MVP)

---

### **Fase 2: Tabs DetalheOportunidade (Dia 2-5 - 3 dias)** 🏗️

**Objetivo**: Implementar 3 tabs críticas (Email, Produtos, Arquivos).

**Dependência**: Blockers resolvidos (tabelas criadas + RLS policies).

---

#### **Story 1.1: Tab Email** (Dia 2 - 1 dia) 🔗 Depende: emails_sent table + RLS
- **Epic**: EPIC-001
- **Gap**: G-002
- **Arquivo**: `docs/stories/1.1.tab-email.md`
- **Tasks**:
  - [ ] Criar organism `EmailComposer` (≤50 linhas)
  - [ ] Form: To, Subject, Body (React Hook Form + Zod)
  - [ ] Integrar com Edge Function `send-quotation-email` (já existe)
  - [ ] Salvar em `emails_sent` table (após envio)
  - [ ] Integrar tab "E-mail" em `DetalheOportunidade.tsx`
  - [ ] Listar emails enviados (histórico)
- **DoD**:
  - [ ] Form funcional com validação
  - [ ] Email enviado via Resend API
  - [ ] Registro salvo em `emails_sent` table
  - [ ] Histórico de emails renderizado
  - [ ] Protocol Notecraft™ compliant (EmailComposer ≤50 linhas)
- **Blocker**: 🔴 Tabela `emails_sent` + RLS policies

---

#### **Story 1.2: Tab Produtos** (Dia 3 - 1 dia) 🔗 Depende: opportunity_products table + RLS
- **Epic**: EPIC-001
- **Gap**: G-003
- **Arquivo**: `docs/stories/1.2.tab-produtos.md`
- **Tasks**:
  - [ ] Criar organism `ProductLink` (≤50 linhas)
  - [ ] Modal seletor de produtos (grid com busca)
  - [ ] Vincular produto → oportunidade (INSERT em `opportunity_products`)
  - [ ] Listar produtos vinculados (JOIN query)
  - [ ] Botão "Remover" produto (DELETE)
  - [ ] Integrar tab "Produtos" em `DetalheOportunidade.tsx`
- **DoD**:
  - [ ] Modal seletor funcional
  - [ ] Produtos vinculados persistidos no banco
  - [ ] Listagem renderizada com nome + categoria + preço
  - [ ] Remover produto funciona (soft delete ou hard delete)
  - [ ] Protocol Notecraft™ compliant (ProductLink ≤50 linhas)
- **Blocker**: 🔴 Tabela `opportunity_products` + RLS policies

---

#### **Story 1.3: Tab Arquivos** (Dia 4 - 1 dia) 🔗 Depende: Storage bucket + RLS
- **Epic**: EPIC-001
- **Gap**: G-004
- **Arquivo**: `docs/stories/1.3.tab-arquivos.md`
- **Tasks**:
  - [ ] Criar organism `FileUpload` (≤50 linhas)
  - [ ] Drag-and-drop ou botão "Escolher" (input file)
  - [ ] Upload para bucket `attachments` (Supabase Storage)
  - [ ] Path: `attachments/{opportunity_id}/{filename}`
  - [ ] Listar arquivos (query bucket list)
  - [ ] Download com signed URL (1h expiration)
  - [ ] Botão "Deletar" arquivo
  - [ ] Integrar tab "Arquivos" em `DetalheOportunidade.tsx`
- **DoD**:
  - [ ] Upload funciona (PDF, imagens)
  - [ ] Limite 10MB por arquivo validado
  - [ ] Listagem renderizada (nome, tamanho, data)
  - [ ] Download gera signed URL válido
  - [ ] Deletar funciona (remover do bucket)
  - [ ] Protocol Notecraft™ compliant (FileUpload ≤50 linhas)
- **Blocker**: 🔴 Storage bucket `attachments` criado + RLS policies (upload/download owner only)

---

### **Fase 3: Filtros & Layout (Dia 5-7 - 2.5 dias)** 🎨

**Objetivo**: Barra de filtros + layout match RD Station.

---

#### **Story 2.1: Barra de Filtros** (Dia 5-6 - 2 dias) 🔗 Depende: Zustand store
- **Epic**: EPIC-002
- **Gap**: G-001
- **Arquivo**: `docs/stories/2.1.barra-filtros.md`
- **Tasks**:
  - [ ] Criar organism `FilterBar` (≤50 linhas)
  - [ ] 6 controles:
    - [ ] Dropdown "Funil" (query `funnels` table)
    - [ ] Dropdown "Visão" (Kanban/Lista - disabled MVP)
    - [ ] Dropdown "Responsável" (query `auth.users` table)
    - [ ] Dropdown "Status" (Abertas/Todas/Ganhas/Perdidas)
    - [ ] Botão "⟳ Recarregar"
    - [ ] Badge "⊞ N filtros" (contador)
  - [ ] Criar Zustand store `useFilterStore` (filter state)
  - [ ] Integrar em `src/pages/Funil.tsx` (substituir filtro simples)
  - [ ] URL search params (React Router - sync state com URL)
  - [ ] Mobile: Modal full-screen (botão "Filtros")
- **DoD**:
  - [ ] 6 controles renderizados
  - [ ] Filtros aplicam em tempo real (query Supabase)
  - [ ] URL reflete filtros (ex: `/funil?responsavel=X&status=Y`)
  - [ ] Mobile: modal abre/fecha corretamente
  - [ ] Protocol Notecraft™ compliant (FilterBar ≤50 linhas)
- **Blocker**: ⚠️ Zustand store não existe (criar novo arquivo `src/stores/useFilterStore.ts`)
- **Referência**: Screenshot `public/Funil_RD 3.png`

---

#### **Story 3.3: Layout Detalhe Match RD** (Dia 7 - 1 dia) ✅ Zero dependências
- **Epic**: EPIC-003
- **Gap**: G-007
- **Arquivo**: `docs/stories/3.3.layout-detalhe-match-rd.md`
- **Tasks**:
  - [ ] Criar atom `Banner` component (≤20 linhas)
  - [ ] Banner verde topo: "Nova oportunidade, criada hoje... Entre em contato"
  - [ ] Mostrar apenas se oportunidade <24h (lógica `created_at`)
  - [ ] Dismiss button (X) → localStorage para ocultar permanentemente
  - [ ] Ajustar Sidebar Esquerda:
    - [ ] Qualificação (estrelas) mais visível
    - [ ] Temperatura (🔥/💧/❄️) com label
  - [ ] Ajustar Sidebar Direita:
    - [ ] Avatar responsável (não só texto)
  - [ ] Área Central:
    - [ ] Form "CRIAR ANOTAÇÃO" em destaque (border azul)
- **DoD**:
  - [ ] Banner aparece apenas para oportunidades <24h
  - [ ] Dismiss funciona (persiste no localStorage)
  - [ ] Qualificação e temperatura visíveis
  - [ ] Avatar do responsável renderizado
  - [ ] Form CRIAR ANOTAÇÃO destacado
  - [ ] Protocol Notecraft™ compliant (Banner ≤20 linhas)
- **Blocker**: Nenhum ✅
- **Referência**: Screenshot `public/tela oportunidade.png`

---

## 📊 Resumo Execução

| Fase | Dias | Stories | Dependências | Status |
|------|------|---------|--------------|--------|
| **Fase 0: Pré-Sprint** | 2-3 dias | 0 stories | RLS + Tabelas | 🔴 **BLOCKER** |
| **Fase 1: Quick Wins** | 0.75 dia | 2 stories (3.1, 3.2) | Nenhuma ✅ | 🟢 Pronto |
| **Fase 2: Tabs** | 3 dias | 3 stories (1.1, 1.2, 1.3) | Fase 0 resolvida | 🔴 Bloqueado |
| **Fase 3: Filtros/Layout** | 2.5 dias | 2 stories (2.1, 3.3) | Zustand store | 🟡 Parcial |
| **TOTAL** | **6.25 dias** | **7 stories** | - | - |

**Buffer**: +1.25 dias (total 7.5 dias) para testes E2E + bugs.

---

## 🎯 Definition of Done (Global)

**Cada story só é considerada "Done" se:**

- [ ] Todos os Acceptance Criteria passaram (100%)
- [ ] Protocol Notecraft™ compliance (limites de linhas respeitados)
- [ ] TypeScript strict (zero `any`)
- [ ] Tailwind CSS (zero CSS inline)
- [ ] Mobile-first (responsivo testado em 375px)
- [ ] RLS policies validadas (sem vulnerabilidades)
- [ ] Zero bugs críticos
- [ ] Screenshot before/after anexado (para UX changes)
- [ ] Código commitado com mensagem clara

---

## 🚀 Sequência Recomendada de Execução

### **Opção A: Resolver Blockers Primeiro (RECOMENDADO)** ✅

```
Dia -3 a -1: Fase 0 (Blockers)
Dia 1: Fase 1 (Stories 3.1 + 3.2) ← Quick wins
Dia 2: Fase 2 (Story 1.1) ← Email
Dia 3: Fase 2 (Story 1.2) ← Produtos
Dia 4: Fase 2 (Story 1.3) ← Arquivos
Dia 5-6: Fase 3 (Story 2.1) ← Filtros
Dia 7: Fase 3 (Story 3.3) ← Layout Match RD
Dia 7.5: Testes E2E + Bugfixes
```

**Vantagem**: Zero retrabalho, fluxo linear, menor risco.

---

### **Opção B: Começar com Quick Wins (ARRISCADO)** ⚠️

```
Dia 1: Fase 1 (Stories 3.1 + 3.2) ← Quick wins IMEDIATAS
Dia 1-3 (paralelo): Fase 0 (Blockers) ← Resolver em paralelo
Dia 4: Fase 2 (Story 1.1) ← Email
Dia 5: Fase 2 (Story 1.2) ← Produtos
Dia 6: Fase 2 (Story 1.3) ← Arquivos
Dia 7-8: Fase 3 (Stories 2.1 + 3.3) ← Filtros + Layout
Dia 8.5: Testes E2E + Bugfixes
```

**Vantagem**: Momentum rápido (2 stories no Dia 1).
**Desvantagem**: Risco de bloqueio se Fase 0 atrasar (Fase 2 depende de Fase 0).

---

## 🎯 Métricas de Sucesso

**Sprint considerado "Sucesso" se:**

1. ✅ **7/7 stories concluídas** (100% DoD)
2. ✅ **Zero bugs críticos** (P0 blocker)
3. ✅ **RLS policies 100%** (INSERT/UPDATE/DELETE implementadas)
4. ✅ **Protocol Notecraft™ 100%** (zero violações)
5. ✅ **UX equivalente RD Station** (validado com screenshots side-by-side)

**Métrica North Star**: **Feature Parity RD Station** (7 gaps resolvidos = 100%)

---

## 📝 Notas Importantes

1. **Blockers são CRÍTICOS**: Não iniciar sprint sem resolver RLS policies (vulnerabilidade de segurança).
2. **Stories 1.1, 1.2, 1.3 dependem de Fase 0**: Não há como implementar sem tabelas/RLS.
3. **Story 2.1 precisa de Zustand**: Criar store antes de implementar FilterBar.
4. **Stories 3.1, 3.2, 3.3 são independentes**: Podem ser feitas primeiro (quick wins).
5. **Buffer de 1.25 dias**: Para testes E2E, bugs, ajustes UX finais.

---

## 🔗 Referências

- **Gap Analysis**: `.ai/relatorios-avaliacao-critica.md`
- **Stories**: `docs/stories/1.1.md` até `docs/stories/3.3.md`
- **Epics**: `docs/prd/epic-1-tabs-detalhe-oportunidade.md` (e outros 3)
- **Database Schema**: `docs/architecture/database-schema.md` (linhas 421-475 - P0 issues)
- **Screenshots**: `public/Funil_RD 3.png`, `public/tela oportunidade.png`, `public/tarefas.png`

---

**Criado em**: 25 Outubro 2025
**Aprovado por**: [Aguardando aprovação]
**Sprint Start**: [TBD - após resolver blockers]
**Sprint End**: [TBD - 7.5 dias após start]
