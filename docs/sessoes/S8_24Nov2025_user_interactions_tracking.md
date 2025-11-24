# Sessão S8 - 24 Novembro 2025
## User Interactions Tracking System (AI/Analytics Foundation)

**Duração:** ~30 minutos
**Branch:** main
**Agent:** Winston (Architect)
**Status:** Architecture completa, pronta para implementação

---

## 🎯 Objetivo

Criar sistema de rastreamento de interações do usuário para:
- **Futura IA/ML:** Recomendações, previsões, análise de comportamento
- **Otimização UX:** Identificar pontos de fricção, melhorar fluxos
- **Analytics:** Métricas de engajamento, uso de features
- **Business Intelligence:** Insights sobre comportamento do usuário

---

## 🏗️ Arquitetura Implementada

### 1. **Database Schema** (`supabase/migrations/20251124_create_user_interactions.sql`)

```sql
user_interactions
├── id (uuid, PK)                    -- Identificador único
├── user_id (uuid, FK → auth.users)  -- Referência ao usuário (nullable)
├── interaction_type (varchar)       -- Tipo: search_query, page_view, error_click, etc.
├── content (jsonb)                  -- Dados flexíveis do evento
├── url_path (varchar)               -- URL da página
├── session_id (varchar)             -- Agrupa interações da mesma sessão
├── user_agent (text)                -- Info browser/device
├── ip_address (inet)                -- IP para geolocalização (opcional)
└── created_at (timestamptz)         -- Timestamp do evento
```

### 2. **Performance Indexes**

| Index | Propósito | Query Otimizada |
|-------|-----------|-----------------|
| `idx_user_interactions_user_id` | User-specific | "Todas interações do usuário X" |
| `idx_user_interactions_type` | Type-based | "Todas buscas" ou "Todos erros" |
| `idx_user_interactions_created_at` | Time-based | "Interações das últimas 24h" |
| `idx_user_interactions_session_id` | Session analysis | "Jornada do usuário em sessão Y" |
| `idx_user_interactions_content_gin` | JSONB search | "Buscas por termo X" |

### 3. **RLS Policies (Row Level Security)**

| Ação | Quem | Política |
|------|------|----------|
| **INSERT** | Usuários autenticados | Apenas próprias interações |
| **SELECT** | Apenas admins | Todas interações |
| **UPDATE** | Apenas admins | Todas interações |
| **DELETE** | Apenas admins | GDPR compliance |

**Segurança:** Usuários não podem ver dados de outros. Apenas admins têm acesso analytics.

---

## 📊 Tipos de Interações

| Tipo | Quando Usar | Exemplo Content |
|------|-------------|-----------------|
| `search_query` | Usuário busca algo | `{ query: "CNPJ 123", results_count: 5 }` |
| `page_view` | Navegação entre páginas | `{ duration_ms: 15000, from_url: "/dashboard" }` |
| `error_click` | Erro ocorreu | `{ error_message: "CNPJ inválido", component: "ClienteModal" }` |
| `button_click` | Clique em botão/ação | `{ button_id: "export_pdf", button_text: "Exportar" }` |
| `modal_open` | Modal aberto | `{ modal_name: "ClienteModal", mode: "create" }` |
| `modal_close` | Modal fechado | `{ modal_name: "ClienteModal", duration_ms: 45000 }` |
| `filter_applied` | Filtro aplicado | `{ filter_type: "status", value: "active", results: 42 }` |
| `export_data` | Export de dados | `{ format: "csv", records: 150 }` |
| `form_submit` | Formulário enviado | `{ form_name: "create_cliente", success: true }` |
| `api_error` | Erro de API | `{ endpoint: "/api/clientes", status: 500 }` |
| `navigation` | Navegação manual | `{ from: "/clientes", to: "/dashboard", method: "menu" }` |
| `feature_discovery` | Primeira vez usando feature | `{ feature: "compliance_modal" }` |

---

## 💻 Arquivos Criados

### 1. **Migration SQL** (149 linhas)
`supabase/migrations/20251124_create_user_interactions.sql`
- Criação de tabela
- 5 indexes de performance
- 4 RLS policies
- Função de cleanup automático
- Comentários de documentação

### 2. **TypeScript Types** (52 linhas)
`src/types/userInteractions.ts`
- Interface `UserInteraction`
- 12 tipos de interação
- Type-safe content helpers (SearchQueryContent, ErrorClickContent, etc.)

### 3. **React Hook** (185 linhas)
`src/hooks/useUserInteractions.ts`
- **`useUserInteractions()`** - Para tracking em componentes
- **`useInteractionAnalytics()`** - Para dashboard analytics (admin)
- Session management automático
- Page view tracking automático
- Helper methods: `logSearch()`, `logError()`, `logButtonClick()`, etc.

### 4. **Documentation** (300+ linhas)
`docs/architecture/user-interactions-tracking.md`
- Exemplos de uso completos
- Queries SQL para analytics
- Considerações de performance
- GDPR compliance guide
- Plano de rollout em 4 fases

---

## 🚀 Como Usar

### **Exemplo 1: Track Search Queries**

```typescript
import { useUserInteractions } from '@/hooks/useUserInteractions'

function ClientesList() {
  const { logSearch } = useUserInteractions()

  const handleSearch = async (query: string) => {
    const results = await searchClientes(query)

    // Log automático
    await logSearch(query, results.length, {
      filters: currentFilters
    })
  }
}
```

### **Exemplo 2: Track Errors**

```typescript
function ClienteModal() {
  const { logError } = useUserInteractions()

  const handleSubmit = async () => {
    try {
      await createCliente(data)
    } catch (error) {
      // Log do erro
      await logError(
        error.message,
        'ClienteModal',
        error.code
      )

      toast.error(error.message)
    }
  }
}
```

### **Exemplo 3: Track Button Clicks**

```typescript
function ExportButton() {
  const { logButtonClick } = useUserInteractions()

  const handleExport = () => {
    logButtonClick('export_clientes', 'Exportar CSV', {
      format: 'csv',
      total_records: clientes.length
    })

    exportToCSV(clientes)
  }
}
```

### **Exemplo 4: Track Modal Open/Close**

```typescript
function ClienteModal({ onClose }) {
  const { logModal } = useUserInteractions()
  const startTime = useRef(Date.now())

  useEffect(() => {
    logModal('open', 'ClienteModal', { mode: 'create' })

    return () => {
      const duration = Date.now() - startTime.current
      logModal('close', 'ClienteModal', { duration_ms: duration })
    }
  }, [])
}
```

### **Exemplo 5: Track Filters**

```typescript
function FilterBar() {
  const { logFilter } = useUserInteractions()

  const handleStatusChange = async (status: string) => {
    const filtered = await applyFilter('status', status)

    logFilter('status', status, filtered.length)
  }
}
```

### **Exemplo 6: Analytics Dashboard (Admin Only)**

```typescript
import { useInteractionAnalytics } from '@/hooks/useUserInteractions'

function AnalyticsDashboard() {
  const { getInteractionStats, getRecentInteractions } = useInteractionAnalytics()
  const [stats, setStats] = useState({})

  useEffect(() => {
    const loadStats = async () => {
      const data = await getInteractionStats(
        new Date('2025-11-01'),
        new Date('2025-11-30')
      )
      setStats(data)
      // { search_query: 450, page_view: 1200, button_click: 300 }
    }
    loadStats()
  }, [])
}
```

---

## 📈 Queries Analytics (Exemplos SQL)

### **1. Top 10 Buscas Mais Comuns**

```sql
SELECT
  content->>'query' as search_term,
  COUNT(*) as frequency
FROM user_interactions
WHERE interaction_type = 'search_query'
GROUP BY content->>'query'
ORDER BY frequency DESC
LIMIT 10;
```

### **2. Erros Mais Frequentes**

```sql
SELECT
  content->>'error_message' as error,
  content->>'component' as component,
  COUNT(*) as occurrences
FROM user_interactions
WHERE interaction_type = 'error_click'
GROUP BY content->>'error_message', content->>'component'
ORDER BY occurrences DESC;
```

### **3. Jornada do Usuário (Page Flow)**

```sql
SELECT
  LAG(url_path) OVER (PARTITION BY session_id ORDER BY created_at) as from_page,
  url_path as to_page,
  COUNT(*) as frequency
FROM user_interactions
WHERE interaction_type = 'page_view'
GROUP BY from_page, to_page
ORDER BY frequency DESC
LIMIT 20;
```

### **4. Botões Mais Clicados**

```sql
SELECT
  content->>'button_id' as button_id,
  content->>'button_text' as label,
  COUNT(*) as clicks
FROM user_interactions
WHERE interaction_type = 'button_click'
GROUP BY button_id, label
ORDER BY clicks DESC;
```

### **5. Usuários Mais Ativos (Última Semana)**

```sql
SELECT
  user_id,
  COUNT(*) as total_interactions,
  COUNT(DISTINCT session_id) as sessions
FROM user_interactions
WHERE created_at > now() - interval '7 days'
GROUP BY user_id
ORDER BY total_interactions DESC
LIMIT 10;
```

---

## 🛡️ GDPR & Privacy Compliance

### **1. Anonimização**
- `user_id` é **nullable** - permite tracking anônimo
- Não armazena PII no campo `content`

### **2. Right to be Forgotten**

```sql
-- Deletar todas interações de um usuário
DELETE FROM user_interactions
WHERE user_id = 'user-uuid-here';
```

### **3. Data Retention**

```sql
-- Função auto-cleanup (rodar via cron)
SELECT cleanup_old_interactions();

-- Deleta interações > 1 ano
-- Customizável no migration SQL
```

### **4. O Que NÃO Armazenar**
❌ Senhas
❌ Cartões de crédito
❌ Documentos pessoais
❌ Dados sensíveis de saúde

✅ Termos de busca
✅ Nomes de features
✅ Códigos de erro
✅ Métricas de performance

---

## 🎯 Plano de Rollout Recomendado

### **Fase 1: Core Tracking (Semana 1)** ✅ Prioridade
- [ ] Rodar migration no Supabase
- [ ] Testar RLS policies
- [ ] Adicionar tracking em:
  - [ ] Page views (automático via hook)
  - [ ] Search queries (SearchBar component)
  - [ ] Errors (global error handler)

### **Fase 2: Feature Tracking (Semana 2)**
- [ ] Button clicks (export, create, delete)
- [ ] Modal open/close
- [ ] Filter applications

### **Fase 3: Analytics Dashboard (Semana 3)**
- [ ] Criar página `/admin/analytics`
- [ ] Charts: Most searched terms, Error frequency, Page flow
- [ ] Export to CSV

### **Fase 4: AI/ML (Futuro - 3+ meses)**
- [ ] Recommendation engine (produtos relacionados)
- [ ] Predictive search (autocomplete inteligente)
- [ ] Anomaly detection (comportamento suspeito)
- [ ] Personalized UX (dashboard widgets)

---

## ⚙️ Performance Considerations

### **1. Fire-and-Forget Pattern**
```typescript
// Nunca bloqueia UX - async não-blocking
logSearch(query, results.length) // Não await!
```

### **2. Batching (Futuro - Se necessário)**
```typescript
// Queue em memória, flush a cada 5s ou 10 eventos
const queue = []
setInterval(() => {
  if (queue.length > 0) {
    supabase.from('user_interactions').insert(queue)
    queue = []
  }
}, 5000)
```

### **3. Index Strategy**
- **Partial indexes** em campos nullable (user_id, session_id)
- **GIN index** para JSONB (fast content searches)
- **DESC index** em created_at (queries sempre pegam recent first)

### **4. Storage Estimate**
- **Assumindo:** 1000 interações/dia = 30k/mês
- **Tamanho médio:** ~500 bytes/row
- **Storage/mês:** 30k × 500b = ~15 MB/mês
- **1 ano:** ~180 MB (bem dentro do limite Supabase Free 500MB)

---

## 🚨 Próximos Passos (Implementação)

### **Imediato (Hoje/Quarta)**
1. ✅ Arquitetura completa (DONE)
2. ⏳ Rodar migration no Supabase production
3. ⏳ Testar INSERT manual via SQL
4. ⏳ Verificar RLS policies funcionando

### **Curto Prazo (Próxima Semana)**
5. ⏳ Adicionar `useUserInteractions` em SearchBar
6. ⏳ Adicionar tracking de errors em ClienteModal
7. ⏳ Page view tracking automático (já funciona via hook)
8. ⏳ Validar dados chegando no banco

### **Médio Prazo (2-3 Semanas)**
9. ⏳ Criar página `/admin/analytics`
10. ⏳ Charts básicos (Recharts)
11. ⏳ Export analytics to CSV

### **Longo Prazo (3+ Meses)**
12. ⏳ Treinar modelo ML com dados coletados
13. ⏳ Implementar recommendation engine
14. ⏳ Predictive search

---

## 📝 Comandos Úteis (Retomar Trabalho)

```bash
# Ver migration criada
cat supabase/migrations/20251124_create_user_interactions.sql

# Aplicar migration no Supabase (LOCAL)
npx supabase db reset

# Aplicar migration no Supabase (PRODUCTION)
npx supabase db push

# Testar INSERT manual
psql -h ... -U postgres -d postgres -c "
  INSERT INTO user_interactions (user_id, interaction_type, content, url_path)
  VALUES (
    'user-uuid-here',
    'search_query',
    '{\"query\": \"CNPJ test\", \"results_count\": 3}'::jsonb,
    '/clientes'
  );
"

# Verificar dados inseridos
psql -h ... -U postgres -d postgres -c "
  SELECT * FROM user_interactions ORDER BY created_at DESC LIMIT 10;
"

# Testar RLS policies (como user não-admin)
# Deve retornar 0 rows (apenas admins podem SELECT)
psql -h ... -U postgres -d postgres -c "
  SET ROLE authenticated;
  SELECT * FROM user_interactions;
"

# Ver analytics stats (como admin)
psql -h ... -U postgres -d postgres -c "
  SELECT interaction_type, COUNT(*) as total
  FROM user_interactions
  GROUP BY interaction_type
  ORDER BY total DESC;
"
```

---

## 🔗 Referências

### **Arquivos Criados**
- `supabase/migrations/20251124_create_user_interactions.sql` - Schema + RLS
- `src/types/userInteractions.ts` - TypeScript types
- `src/hooks/useUserInteractions.ts` - React integration
- `docs/architecture/user-interactions-tracking.md` - Full documentation

### **Relacionados**
- `supabase/migrations/20251123_create_client_compliance.sql` - Compliance table
- `docs/sessoes/S7_24Nov2025_compliance_button_fix.md` - Sessão anterior

---

## 🎓 Decisões Arquiteturais (Rationale)

| Decisão | Por Que? |
|---------|----------|
| **JSONB para content** | Esquema flexível, sem migrations para novos event types |
| **user_id nullable** | Permite tracking anônimo antes do login |
| **session_id** | Agrupa interações relacionadas, analisa jornada do usuário |
| **Admin-only SELECT** | Privacy-first, GDPR compliant |
| **Fire-and-forget** | Nunca bloqueia UX por analytics |
| **GIN index em JSONB** | Permite buscas rápidas em content (ex: "termo X foi buscado?") |
| **Retention 1 ano** | Balance entre custo de storage e ML training data |
| **5 indexes** | Otimiza queries mais comuns (by user, by type, by time) |
| **No cascade DELETE** | ON DELETE SET NULL - preserva dados analytics após deletar user |

---

## 💡 Casos de Uso Futuros (AI/ML)

### **1. Smart Search Autocomplete**
```typescript
// Sugerir termos baseado em buscas anteriores
SELECT content->>'query' as term, COUNT(*) as freq
FROM user_interactions
WHERE interaction_type = 'search_query'
  AND content->>'query' ILIKE 'CNPJ%'
GROUP BY term
ORDER BY freq DESC
LIMIT 5;
```

### **2. Error Prediction**
```typescript
// Identificar componentes com mais erros
// Priorizar fixes por impacto
SELECT
  content->>'component' as component,
  COUNT(DISTINCT user_id) as affected_users,
  COUNT(*) as total_errors
FROM user_interactions
WHERE interaction_type = 'error_click'
GROUP BY component
ORDER BY affected_users DESC;
```

### **3. Personalized Dashboard**
```typescript
// Quais widgets o usuário mais usa?
// Reorganizar dashboard automaticamente
SELECT
  content->>'widget_name' as widget,
  COUNT(*) as interactions
FROM user_interactions
WHERE user_id = 'current-user'
  AND interaction_type = 'button_click'
GROUP BY widget
ORDER BY interactions DESC;
```

### **4. Churn Prediction**
```typescript
// Usuários sem interações nos últimos 7 dias
SELECT user_id, MAX(created_at) as last_seen
FROM user_interactions
GROUP BY user_id
HAVING MAX(created_at) < now() - interval '7 days';
```

---

## 📊 Métricas de Sucesso

### **Curto Prazo (1 mês)**
- ✅ 10,000+ interações coletadas
- ✅ 0 falhas de RLS policies
- ✅ < 50ms latência média de INSERT
- ✅ 100% uptime do sistema tracking

### **Médio Prazo (3 meses)**
- ✅ Analytics dashboard funcional
- ✅ Top 10 insights documentados
- ✅ 1+ melhoria UX baseada em dados
- ✅ 50,000+ interações coletadas

### **Longo Prazo (6+ meses)**
- ✅ 1 feature de AI/ML implementada
- ✅ 10% redução em erros (baseado em insights)
- ✅ 20% melhoria em conversão (funil otimizado)
- ✅ 200,000+ interações coletadas

---

**Sessão concluída!** ✅
**Status:** Arquitetura completa, pronta para migration.
**Próxima ação:** Rodar migration + testar tracking em 1-2 componentes.
