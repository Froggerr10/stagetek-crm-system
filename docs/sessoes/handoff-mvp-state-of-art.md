# Handoff: STAGETEK CRM — MVP State of Art Sprint

**Data:** 2026-04-18
**Status:** Em andamento

---

## 1. Objetivo

Completar os 7 gaps P0 identificados no relatório de avaliação crítica (`.ai/relatorios-avaliacao-critica.md`) para atingir o estado "MVP State of Art" do CRM STAGETEK — um sistema B2B para fabricante de equipamentos de entretenimento (treliças, som, luz). O MVP State of Art é definido como: **zero placeholders + UX ≥ RD Station + sistema utilizável em produção**. Estimativa de 6-7 dias de trabalho focado.

---

## 2. Contexto essencial

**Stack:**
- Frontend: React 18.3.1 + TypeScript 5.6 + Vite 6.0 + Tailwind CSS 3.4 + shadcn/ui
- Backend: Supabase (PostgreSQL 15 + Auth + Storage + Edge Functions)
- Deploy: Vercel (auto-deploy via GitHub)
- Email: Resend API (100 emails/dia no free tier)
- Ícones: Lucide React (nunca emojis como ícones)
- Estado global: Zustand

**Restrições críticas — Protocol Notecraft™ (pré-commit hook ativo):**
| Tipo | Limite |
|------|--------|
| Atom | ≤ 30 linhas |
| Molecule | ≤ 50 linhas |
| Organism | ≤ 75 linhas |
| Template | ≤ 40 linhas |

- TypeScript strict: **zero `any`**
- **Zero CSS inline** (`style={{ ... }}`) — apenas Tailwind
- Mobile-first obrigatório
- Validação: `npm run validate:notecraft`

**Decisões já tomadas:**
- Atomic Design para todos os componentes (`src/components/atoms|molecules|organisms|templates`)
- Supabase como único backend (sem REST externo)
- RLS ativo (políticas SELECT ok; INSERT/UPDATE/DELETE ainda pendentes — blocker para escrita)
- Conventional Commits para mensagens git
- Documentação BMAD: cada feature tem epic + story antes de implementar

---

## 3. O que já foi feito

| Commit | Data | O que foi feito |
|--------|------|-----------------|
| `348aa3e` | 18 Abr | **Story 1.1 (G-002):** Tab Email implementado — `EmailComposer.tsx` integrado ao `DetalheOportunidade`, usa Resend API. **PRODUÇÃO PRONTO.** |
| `68dc0ff` | 18 Abr | **Story 3.1 + 3.2 (G-005/G-006):** Quick actions (ícones telefone/email) nos cards de oportunidade + visibilidade dos botões no `ClientCard` corrigida. |
| `b74fddd` | Ant. | Checklist de testes manuais Sprint 1 (`docs/qa/`) criado. |
| `97e8c9c` | Ant. | Story 9.1 (Clientes Rich View — 3 fases) documentada. |
| `a057080` | Ant. | Story 8.1: Detalhe Oportunidade Mobile — layouts responsivos. |
| `7e58f9b` | Ant. | Story 8.2: Funil Kanban Mobile — UX mobile implementado. |
| `4eb8d36` | Ant. | Grupo A Mobile UX quick wins (bottom nav, drawer menu). |
| `f276ed4` | Ant. | Navegação mobile com bottom nav + drawer lateral. |
| `00c3271` | Ant. | Integração Minha Receita API para compliance fiscal de CNPJ. |
| `4e2b8ee` | Ant. | Sistema de tracking de interações do usuário (AI/Analytics). |

**Descartado / não implementado ainda:**
- Tab Produtos (Story 1.2) — precisa tabela `opportunity_products`
- Tab Arquivos (Story 1.3) — precisa bucket `attachments` no Storage
- Barra de Filtros completa (Story 2.1) — maior gap restante (2 dias)
- Layout 3 colunas match RD Station (Story 3.3)
- Dashboard com dados reais (Story 4.1)

---

## 4. Estado atual

**O que funciona:**
- CRUD completo: Clientes, Oportunidades, Contatos
- Kanban funcional com dnd-kit (drag-drop)
- Cotações: geração PDF + envio email (Resend)
- Tab Email na tela de Detalhe de Oportunidade
- Navegação mobile (bottom nav + drawer)
- Quick actions nos cards (ícones telefone/email)
- Auth com Supabase (RLS SELECT policies ativas)
- 55 componentes, todos Protocol Notecraft™ compliant

**O que está quebrado / incompleto:**
- Tabs `Produtos` e `Arquivos` no Detalhe de Oportunidade são placeholders vazios
- Barra de filtros nas telas de lista não existe (G-001 — maior gap)
- Layout do Detalhe de Oportunidade ainda não replica RD Station (3 colunas)
- Dashboard usa dados mockados (não Supabase real)
- RLS políticas INSERT/UPDATE/DELETE **não criadas** → qualquer escrita via Supabase pode falhar em produção com RLS habilitado

**Branch ativo:** `claude/global-skill-handoff-J4O0x`
**Working tree:** limpa (nada pendente de commit)

---

## 5. Próximos passos

Executar na ordem abaixo (do menor ao maior risco):

1. **[2h] Story 3.1 — Verificar ClientCard buttons** (`docs/stories/3.1.fix-botoes-clientcard.md`)
   - Confirmar que o fix do commit `68dc0ff` resolveu completamente
   - Rodar `npm run validate:notecraft` para garantir compliance

2. **[1d] Story 1.2 — Tab Produtos** (`docs/stories/1.2.tab-produtos.md`)
   - Criar migration para tabela `opportunity_products` (many-to-many: opportunities ↔ products)
   - Criar RLS policies para a nova tabela
   - Criar componente `TabProdutos` (organism, ≤75 linhas) com seleção de produtos do catálogo
   - Integrar na aba "Produtos" do `DetalheOportunidade.tsx`

3. **[1d] Story 1.3 — Tab Arquivos** (`docs/stories/1.3.tab-arquivos.md`)
   - Criar bucket `attachments` no Supabase Storage com policies de acesso
   - Criar componente `TabArquivos` com drag-drop (upload/download/delete)
   - Limite: 10MB por arquivo

4. **[1d] Story 3.3 — Layout Detalhe match RD Station** (`docs/stories/3.3.layout-detalhe-match-rd.md`)
   - Refatorar `DetalheOportunidade.tsx` para layout 3 colunas
   - Coluna esquerda: info principal + pipeline; Centro: tabs; Direita: sidebar de ações

5. **[2d] Story 2.1 — Barra de Filtros** (`docs/stories/2.1.barra-filtros.md`)
   - Criar store Zustand para estado dos filtros (`useFiltersStore`)
   - 6 controles: dropdown Funil, toggle Visão de Trabalho, select Responsável, select Status, botão Refresh, badge contagem
   - Mobile: modal full-screen para os filtros
   - Sincronizar com URL search params

6. **[1d] Story 4.1 — Dashboard com dados reais**
   - Substituir mock data por queries Supabase reais
   - Charts com Recharts usando dados de `opportunities`, `clients`, `quotations`

7. **[1d] QA + Polish + Deploy produção**
   - Rodar checklist `docs/qa/` completo
   - Lighthouse score ≥ 85 (mobile)
   - Deploy Vercel + smoke test

---

## 6. Perguntas em aberto

1. **RLS INSERT/UPDATE/DELETE**: As políticas de escrita ainda não foram criadas. Antes de testar Tab Produtos e Tab Arquivos em produção, é necessário criar as policies. Usar `supabase/migrations/` ou dashboard Supabase?

2. **Storage `attachments` bucket**: Criar via migration SQL ou via dashboard? O bucket `pdfs` foi criado via dashboard — manter consistência?

3. **Tab Arquivos — autenticação de storage**: Os arquivos devem ser privados (autenticados) ou públicos? RD Station usa links assinados (signed URLs) — seguir o mesmo padrão?

4. **Layout 3 colunas (Story 3.3)**: A coluna da direita (sidebar) deve incluir: Responsável, Funil/Stage, Valor, Data de fechamento prevista, Histórico de atividades? Confirmar com stakeholder antes de implementar.

5. **Barra de Filtros (Story 2.1)**: O filtro "Responsável" deve listar todos os usuários do sistema (máx 5 internos) ou apenas o usuário logado + "Todos"?

6. **Sprint 9.1 (Clientes Rich View)**: A story está documentada mas não priorizada. Entra no MVP State of Art ou fica para Sprint 2?

---

## 7. Artefatos relevantes

**Documentação BMAD (ler antes de implementar cada story):**
```
docs/stories/1.2.tab-produtos.md          # Story atual — próxima a implementar
docs/stories/1.3.tab-arquivos.md
docs/stories/2.1.barra-filtros.md
docs/stories/3.3.layout-detalhe-match-rd.md
docs/prd/epic-1-tabs-detalhe-oportunidade.md
docs/prd/epic-2-barra-filtros-completa.md
docs/architecture/source-tree.md          # OBRIGATÓRIO antes de criar qualquer componente
docs/architecture/database-schema.md
docs/architecture/coding-standards.md
.ai/relatorios-avaliacao-critica.md       # Visão geral dos 7 gaps P0
```

**Arquivos-chave do código:**
```
src/pages/DetalheOportunidade.tsx         # Onde as tabs vivem (Email já implementado)
src/pages/Clientes.tsx                    # Lista de clientes
src/pages/Funil.tsx                       # Kanban
src/components/organisms/                 # Organisms existentes (verificar antes de criar)
src/lib/supabase.ts                       # Client Supabase
supabase/migrations/                      # Migrations de banco (11 existentes)
```

**Comandos essenciais:**
```bash
npm run dev                    # Dev server
npm run validate:notecraft     # Validar Protocol antes de commitar
npm run build                  # Build de produção
npx supabase start             # Supabase local
npx supabase db diff           # Ver diff de schema antes de migration
```

**Referência de componentes existentes (não duplicar):**
- `TabContatos` → modelo para criar `TabProdutos` e `TabArquivos`
- `EmailComposer` → modelo de organism recém-criado (compliance garantido)
- `ProductCatalog` → organism existente com listagem de produtos (reutilizar)

---

## 8. Instruções para a próxima sessão

**Tom:** Direto e técnico. Sem explicações longas do que já funciona — foco total no que falta.

**Fluxo obrigatório antes de qualquer implementação:**
1. Ler a story (`docs/stories/X.X.nome.md`) — ACs e Tasks específicos
2. Verificar `source-tree.md` para não duplicar componentes
3. Implementar seguindo Protocol Notecraft™
4. Rodar `npm run validate:notecraft` antes do commit

**Armadilhas a evitar:**
- **Não criar componentes acima do limite de linhas** — o pre-commit hook vai bloquear o commit
- **Não usar `any` no TypeScript** — zero tolerância
- **Não usar `style={{ }}`** — apenas classes Tailwind
- **Não criar migration sem antes verificar schema atual** (`npx supabase db diff`)
- **Não confundir o bucket `pdfs` (cotações) com `attachments` (tab arquivos)** — são buckets separados
- **Não implementar features não documentadas em stories** — qualquer "melhoria" extra deve ser discutida antes

**Contexto de negócio relevante:**
- STAGETEK fabrica equipamentos para eventos (treliças, som, luz) — B2B, 5 usuários internos
- Moedas: BRL, USD, EUR — sempre verificar formatação
- O sistema replica fluxo do RD Station CRM — consultar `protocol/INVENTORY-RD-STATION-COMPLETE.md` para referência visual

**Próxima ação imediata:** Começar pela Story 1.2 (Tab Produtos) — menor risco, maior impacto visual imediato.
