# STAGETEK CRM System - Claude Configuration

**INSTRUÇÕES CRÍTICAS: SIGA RIGOROSAMENTE O PROTOCOL NOTECRAFT™**

---

## 🚨 WORKFLOW BMAD (SEMPRE SEGUIR)

1. **Leia a STORY** (`docs/stories/*.md`) - AC + Tasks específicos
2. **Leia o EPIC** (`docs/prd/*.md`) - Contexto da feature
3. **Consulte ARCHITECTURE** (`docs/architecture/*.md`) - DB schema, coding standards
4. **Implemente** conforme documentado nos Acceptance Criteria
5. **Valide** Protocol Notecraft™

**NUNCA**:
- ❌ Trabalhar sem consultar stories
- ❌ Duplicar componentes (consulte `source-tree.md`)
- ❌ "Melhorias" não documentadas

---

## 📋 Documentação Prioritária

### **1. BMAD Docs (LEIA PRIMEIRO)**
- `.ai/relatorios-avaliacao-critica.md` - 7 gaps P0
- `docs/stories/*.md` - 7 stories executáveis
- `docs/prd/*.md` - 4 epics
- `docs/architecture/*.md` - Tech stack, DB, standards, source tree

### **2. Contexto (Opcional)**
- `protocol/EXECUTIVE-STRATEGIC-REPORT.md`
- `protocol/INVENTORY-RD-STATION-COMPLETE.md`

---

## 🎯 STATUS ATUAL (25 Out 2025)

### ✅ COMPLETO
- CRUD: Clientes, Oportunidades, Contacts
- Sistema Cotações MVP (P0.5) + PDF + Email
- Protocol Notecraft™ 100% compliance
- Supabase: 8 tabelas + RLS (SELECT)
- Documentação BMAD: 15 docs

### 🚧 SPRINT MVP (7.5 dias)
**7 Gaps P0** - Ver `.ai/relatorios-avaliacao-critica.md`:
- G-001: Barra Filtros (2d) - Story 2.1
- G-002: Tab Email (1d) - Story 1.1
- G-003: Tab Produtos (1d) - Story 1.2
- G-004: Tab Arquivos (1d) - Story 1.3
- G-005: Quick Actions (4h) - Story 3.2
- G-006: Fix Botões (2h) - Story 3.1
- G-007: Layout Detalhe (1d) - Story 3.3

### 🔴 BLOCKERS
1. **RLS Policies** (INSERT/UPDATE/DELETE pendentes)
2. **Storage Limits** (2GB Supabase)

---

## 🏗️ STACK TECNOLÓGICA

**Frontend**: React 18, TypeScript, Vite, Tailwind CSS 3.4, shadcn/ui, Recharts, dnd-kit, Zustand
**Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
**Integrações**: Resend (email), Slack, Google Calendar, brasil-api-mcp
**Deploy**: Vercel Free

---

## ⚠️ PROTOCOL NOTECRAFT™ (RÍGIDO)

### Limites de Linhas
- Atoms: ≤20 linhas
- Molecules: ≤35 linhas
- Organisms: ≤50 linhas
- Templates: ≤30 linhas

### Regras Absolutas
- ✅ TypeScript strict (zero `any`)
- ✅ Tailwind CSS (zero CSS inline)
- ✅ Mobile-first obrigatório
- ✅ Validação automática: `npm run validate:notecraft`
- ✅ Pre-commit hook bloqueia violações

### Nomenclatura
- Files/Components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/Interfaces: `PascalCase`

---

## 🚫 NUNCA FAZER

1. Componentes acima do limite de linhas
2. `any` no TypeScript
3. CSS inline (`style={{ ... }}`)
4. Cores hardcoded (usar tokens Tailwind)
5. Emojis como ícones (usar Lucide React)
6. Forms não controlados
7. Fetch direto (usar Supabase client)
8. Trabalhar sem consultar docs BMAD

---

## 📊 MODELO DE NEGÓCIO

**STAGETEK** = Fabricante B2B Equipamentos Entretenimento

**3 Operações**:
1. 🏭 Fabricação (60%) - Peças aço, treliças, estruturas
2. 🛒 Revenda (30%) - Som e luz
3. 🎪 Locação (10%) - Aluguel equipamentos

**Usuários**: 5 máximo (interno)
**Budget**: ZERO (Supabase + Vercel Free)
**Moedas**: BRL, USD, EUR

---

## 🗓️ ROADMAP

### Sprint 0 (ATUAL): Blockers - 1-2 semanas
- RLS Policies completas
- Storage policies
- Tabela activity_log

### Sprint 1: Cotação MVP ✅ COMPLETO (1 dia)
- Catálogo 15 produtos
- PDF profissional
- Email automático
- **RICE Score**: 15.0

### Sprint 2: Detalhes Oportunidade - 2-3 semanas
- Layout 3 colunas
- Tabs: Histórico, Tarefas, Contatos, Produtos, Arquivos
- Kanban React

### Sprint 3: Relatórios + Integrações - 2 semanas
- Dashboard conversão
- Slack webhook
- Config Funis

### Sprint 4: Go-Live MVP - 1 semana
- Beta testing
- Treinamento
- Deploy produção

**Timeline Total**: 90 dias (12-13 semanas)

---

## 🛠️ COMANDOS ÚTEIS

```bash
npm run dev                      # Dev server
npm run build                    # Build produção
npm run validate:notecraft       # Validar Protocol
npx supabase start               # Supabase local
```

---

## 🏆 METAS DE QUALIDADE

- 100% Protocol Notecraft™ compliance
- 100% TypeScript (zero `any`)
- >85 Lighthouse Score (mobile)
- <500KB bundle size (gzipped)
- 100% dark mode support

---

**Built with Protocol Notecraft™**
**Última atualização**: 30 Outubro 2025
