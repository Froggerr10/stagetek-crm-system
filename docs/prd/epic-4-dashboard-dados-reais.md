# Epic 4: Dashboard com Dados Reais

**Epic ID**: EPIC-004
**Status**: ⏳ Not Started
**Priority**: 🟡 P1 - High
**RICE Score**: 8.0
**Estimativa**: 1 dia

---

## 📊 Contexto

Dashboard.tsx existe mas mostra **dados mockados**. Gráficos e KPIs precisam conectar ao Supabase.

## 🎯 Objetivo

Conectar 4 StatCards + 2 gráficos ao banco de dados real.

## 📋 Story

### Story 4.1: Dashboard Dados Reais

**User Story**: Como gestor, quero ver métricas reais do pipeline.

**AC**:
1. 4 StatCards com queries Supabase:
   - Total Vendas (SUM where status='won')
   - Oportunidades Abertas (COUNT where status='open')
   - Taxa Conversão (won/total * 100)
   - Ticket Médio (AVG value where status='won')
2. Gráfico vendas (Recharts) últimos 7 dias
3. Tabela últimas 5 oportunidades
4. Loading states (Spinner)
5. Empty states ("Nenhuma venda este mês")

**Queries**:
```typescript
// StatCard - Total Vendas
const { data } = await supabase
  .from('opportunities')
  .select('value')
  .eq('status', 'won')
  .gte('won_at', startOfMonth)
```

**Estimativa**: 1 dia (6-8h)

---

**Criado**: 25 Out 2025
