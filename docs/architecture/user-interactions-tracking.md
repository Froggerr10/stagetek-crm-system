# User Interactions Tracking - Architecture

**Created:** 24 Nov 2025
**Owner:** Architecture Team
**Status:** Implemented

---

## 🎯 Purpose

Capture user behavior data for:
- **AI/ML Training:** Future recommendation engines, predictive analytics
- **UX Optimization:** Identify pain points, improve workflows
- **Product Analytics:** Feature usage, user journeys
- **Business Intelligence:** User engagement metrics

---

## 🏗️ Architecture

### Database Schema

```sql
user_interactions
├── id (uuid, PK)
├── user_id (uuid, FK → auth.users) -- Nullable for anonymous
├── interaction_type (varchar)       -- Type of interaction
├── content (jsonb)                  -- Flexible event data
├── url_path (varchar)               -- Page location
├── session_id (varchar)             -- Group related actions
├── user_agent (text)                -- Browser/device info
├── ip_address (inet)                -- Optional geolocation
└── created_at (timestamptz)         -- Event timestamp
```

### Indexes

- `idx_user_interactions_user_id` - User-specific queries
- `idx_user_interactions_type` - Query by interaction type
- `idx_user_interactions_created_at` - Time-based aggregations
- `idx_user_interactions_session_id` - Session analysis
- `idx_user_interactions_content_gin` - JSONB content search

---

## 🔒 Security (RLS Policies)

| Action | Who | Policy |
|--------|-----|--------|
| INSERT | Authenticated users | Own interactions only |
| SELECT | Admins only | All interactions |
| UPDATE | Admins only | All interactions |
| DELETE | Admins only | GDPR compliance |

**Why:** Protect user privacy while enabling analytics for authorized personnel.

---

## 📊 Interaction Types

| Type | Purpose | Content Example |
|------|---------|-----------------|
| `search_query` | Track searches | `{ query: "CNPJ", results_count: 5 }` |
| `page_view` | Navigation patterns | `{ duration_ms: 15000, from_url: "/dashboard" }` |
| `error_click` | Error tracking | `{ error_message: "CNPJ inválido", component: "ClienteModal" }` |
| `button_click` | Feature usage | `{ button_id: "export_pdf", context: {...} }` |
| `filter_applied` | Filter usage | `{ filter_type: "status", value: "active" }` |
| `modal_open/close` | Modal interactions | `{ modal_name: "ClienteModal" }` |
| `navigation` | User flow | `{ from_url: "/clientes", to_url: "/dashboard" }` |

---

## 💻 Usage Examples

### 1. Track Search Queries

```typescript
import { useUserInteractions } from '@/hooks/useUserInteractions'

function ClientesList() {
  const { logSearch } = useUserInteractions()

  const handleSearch = async (query: string) => {
    const results = await searchClientes(query)

    // Log the search
    await logSearch(query, results.length)
  }
}
```

### 2. Track Errors

```typescript
function ClienteModal() {
  const { logError } = useUserInteractions()

  const handleSubmit = async () => {
    try {
      await createCliente(data)
    } catch (error) {
      // Log the error
      await logError(
        error.message,
        'ClienteModal',
        error.code,
        error.stack
      )
    }
  }
}
```

### 3. Track Button Clicks

```typescript
function QuickActions() {
  const { logButtonClick } = useUserInteractions()

  const handleExport = () => {
    logButtonClick('export_clientes', 'Exportar Clientes', {
      format: 'csv',
      total_records: 150
    })

    exportData()
  }
}
```

### 4. Track Modal Open/Close

```typescript
function ClienteModal({ onClose }) {
  const { logModal } = useUserInteractions()

  useEffect(() => {
    logModal('open', 'ClienteModal', { mode: 'create' })

    return () => {
      logModal('close', 'ClienteModal', { duration_ms: Date.now() - startTime })
    }
  }, [])
}
```

### 5. Track Filters

```typescript
function FilterBar() {
  const { logFilter } = useUserInteractions()

  const handleFilterChange = async (type, value) => {
    const results = await applyFilter(type, value)

    logFilter(type, value, results.length)
  }
}
```

---

## 📈 Analytics Queries (Admin Only)

### Get Recent Interactions

```typescript
import { useInteractionAnalytics } from '@/hooks/useUserInteractions'

function AnalyticsDashboard() {
  const { getRecentInteractions } = useInteractionAnalytics()

  useEffect(() => {
    const data = await getRecentInteractions(100)
    console.log(data)
  }, [])
}
```

### Get Interaction Stats

```typescript
const { getInteractionStats } = useInteractionAnalytics()

const stats = await getInteractionStats(
  new Date('2025-11-01'),
  new Date('2025-11-30')
)

// Output: { search_query: 450, page_view: 1200, button_click: 300 }
```

---

## 🚀 Performance Considerations

### 1. **Async Non-Blocking**
- All tracking calls are fire-and-forget
- User experience never blocks on analytics

### 2. **Batching (Future Enhancement)**
```typescript
// Queue interactions in memory
// Flush to DB every 5 seconds or 10 events
const interactionQueue = []
setInterval(() => {
  if (queue.length > 0) {
    supabase.from('user_interactions').insert(queue)
    queue = []
  }
}, 5000)
```

### 3. **Data Retention**
- Auto-cleanup function: `cleanup_old_interactions()`
- Default: Keep 1 year of data
- Run via cron job: `SELECT cleanup_old_interactions();`

### 4. **Index Optimization**
- Partial indexes for nullable fields (user_id, session_id)
- GIN index for JSONB content searches
- DESC index on `created_at` for "recent" queries

---

## 🔮 Future AI/ML Use Cases

### 1. **Search Optimization**
```sql
-- Most common search queries
SELECT content->>'query' as query, COUNT(*) as frequency
FROM user_interactions
WHERE interaction_type = 'search_query'
GROUP BY content->>'query'
ORDER BY frequency DESC
LIMIT 10;
```

### 2. **Error Pattern Detection**
```sql
-- Most common errors
SELECT content->>'error_message' as error, COUNT(*) as occurrences
FROM user_interactions
WHERE interaction_type = 'error_click'
GROUP BY content->>'error_message'
ORDER BY occurrences DESC;
```

### 3. **User Journey Analysis**
```sql
-- Common page flow
SELECT
  LAG(url_path) OVER (PARTITION BY session_id ORDER BY created_at) as from_page,
  url_path as to_page,
  COUNT(*) as frequency
FROM user_interactions
WHERE interaction_type = 'page_view'
GROUP BY from_page, to_page
ORDER BY frequency DESC;
```

### 4. **Feature Usage Heatmap**
```sql
-- Most clicked buttons
SELECT
  content->>'button_id' as button,
  content->>'button_text' as label,
  COUNT(*) as clicks
FROM user_interactions
WHERE interaction_type = 'button_click'
GROUP BY button, label
ORDER BY clicks DESC;
```

---

## 🛡️ Privacy & GDPR Compliance

### 1. **Anonymous Tracking**
- `user_id` is nullable
- Track behavior without identity when not logged in

### 2. **Data Deletion**
```sql
-- Delete all interactions for a user (GDPR right to be forgotten)
DELETE FROM user_interactions WHERE user_id = 'user-uuid-here';
```

### 3. **PII Considerations**
- Do NOT store sensitive data in `content` field
- Avoid: passwords, credit cards, personal documents
- OK: search terms, feature names, error codes

---

## 📋 Migration Checklist

- [x] Create migration SQL
- [x] Add RLS policies
- [x] Create performance indexes
- [x] Add TypeScript types
- [x] Create React hook
- [x] Document usage
- [ ] Run migration on production
- [ ] Test RLS policies
- [ ] Add to existing components (gradual rollout)
- [ ] Create admin analytics dashboard

---

## 🎯 Recommended Rollout

### Phase 1 (Week 1): Core Tracking
- Page views (automatic)
- Search queries
- Errors

### Phase 2 (Week 2): Feature Tracking
- Button clicks
- Modal interactions
- Filters

### Phase 3 (Week 3): Analytics Dashboard
- Admin-only analytics page
- Charts and insights
- Export to CSV

### Phase 4 (Future): AI/ML
- Recommendation engine
- Predictive search
- Anomaly detection

---

## 🔗 Related Documentation

- `supabase/migrations/20251124_create_user_interactions.sql` - Database schema
- `src/types/userInteractions.ts` - TypeScript definitions
- `src/hooks/useUserInteractions.ts` - React integration

---

**Questions or improvements?** Contact the architecture team.
