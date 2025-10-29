# Epic 3: UX Polish - Cards e Layout

**Epic ID**: EPIC-003
**Status**: ⏳ Not Started
**Priority**: 🔴 P0 - Critical
**RICE Score**: 12.0 (Reach: 5 | Impact: 2.0 | Confidence: 80% | Effort: 8 days)

---

## 📊 Sumário Executivo

### Contexto
Componentes funcionam tecnicamente, mas **UX está abaixo do padrão** por bugs visuais e layout inconsistente com RD Station. Isso impede adoção e causa frustração.

### Problemas Identificados
1. **ClientCard**: Botões "Editar/Excluir" invisíveis (variant="ghost" em dark mode)
2. **OpportunityCard**: Faltam ícones de ação rápida (📞 telefone, ✉️ email)
3. **DetalheOportunidade**: Layout diferente do RD (sem banner verde, sidebars erradas)

### Impacto no MVP State of Art
- **Bloqueador de adoção**: Botões invisíveis = usuário não sabe como editar cliente
- **Feature gap**: RD tem quick actions, STAGETEK não
- **UX inconsistente**: Layout não match referência (confunde usuário)

---

## 🎯 Objetivos de Negócio

### Problema
Vendedor **não consegue**:
1. Ver botões "Editar/Excluir" em ClientCard (ghost = transparente)
2. Ligar/enviar email rápido (precisa abrir detalhes → tab tarefas → criar → preencher)
3. Entender contexto da oportunidade (banner verde "Nova oportunidade, entre em contato" ausente)

### Solução
Implementar 3 melhorias críticas de UX:
1. **Fix ClientCard**: Trocar botões ghost → outline + ícones
2. **Quick Actions**: Adicionar ícones 📞✉️ em OpportunityCard
3. **Layout Match RD**: Banner contextual + ajustar sidebars em DetalheOportunidade

### Métricas de Sucesso
- Usuário identifica botões "Editar" em <2s (teste com 5 usuários)
- Quick action "Ligar" cria tarefa em <3 cliques (vs 8 atual)
- Layout DetalheOportunidade visualmente equivalente ao RD

---

## 📋 User Stories (3 stories)

### Story 3.1: Fix Botões Invisíveis em ClientCard
**Gap ID**: G-006
**Status**: ⏳ Não implementado
**Estimativa**: 2h
**Priority**: 🔴 P0

**User Story**:
> Como vendedor, quero ver claramente os botões "Editar/Excluir" no card de cliente, para gerenciar minha base sem frustração.

**Acceptance Criteria**:
1. Botões mudam de `variant="ghost"` para `variant="outline"`
2. Adicionar ícones Lucide: Edit (lápis) + Trash2 (lixeira)
3. Botões visíveis em dark mode (border branca/cinza)
4. Hover state com fundo levemente azul
5. Manter layout responsivo (mobile não quebra)

**Technical Changes**:
```tsx
// ClientCard.tsx (linha 25-26)
// ❌ ANTES
<Button variant="ghost" size="sm" onClick={onEdit}>Editar</Button>

// ✅ DEPOIS
<Button variant="outline" size="sm" onClick={onEdit}>
  <Edit className="w-4 h-4 mr-2" />
  Editar
</Button>
```

---

### Story 3.2: Quick Actions em OpportunityCard
**Gap ID**: G-005
**Status**: ⏳ Não implementado
**Estimativa**: 4h
**Priority**: 🔴 P0

**User Story**:
> Como vendedor, quero atalhos rápidos (ligar/enviar email) no card da oportunidade, para iniciar follow-up em 1 clique.

**Acceptance Criteria**:
1. Adicionar 2 ícones no rodapé do OpportunityCard:
   - 📞 Phone (Lucide icon)
   - ✉️ Mail (Lucide icon)
2. Click 📞 → Cria tarefa "Ligar [Cliente]" automaticamente
3. Click ✉️ → Abre modal EmailComposer pré-preenchido
4. Ícones visíveis mas não intrusivos (cinza, hover azul)
5. Mobile: Ícones maiores (touch-friendly 44x44px)

**Technical Design**:
```tsx
// OpportunityCard.tsx (adicionar ao rodapé)
<div className="flex gap-2 mt-2 pt-2 border-t border-gray-700">
  <button
    onClick={(e) => {
      e.stopPropagation() // Não abrir detalhes
      handleQuickCall(opportunity.id)
    }}
    className="p-2 rounded hover:bg-blue-500/10"
    title="Ligar"
  >
    <Phone className="w-4 h-4 text-gray-400 hover:text-blue-400" />
  </button>
  <button
    onClick={(e) => {
      e.stopPropagation()
      handleQuickEmail(opportunity.id)
    }}
    className="p-2 rounded hover:bg-blue-500/10"
    title="Enviar Email"
  >
    <Mail className="w-4 h-4 text-gray-400 hover:text-blue-400" />
  </button>
</div>
```

**Dependencies**:
- EmailComposer já implementado (Epic 1, Story 1.1)
- useTasks hook já existe (criar tarefa)

---

### Story 3.3: Layout DetalheOportunidade Match RD
**Gap ID**: G-007
**Status**: ⏳ Não implementado
**Estimativa**: 1 dia
**Priority**: 🔴 P0

**User Story**:
> Como vendedor, quero ver layout de detalhes igual ao RD Station, para ter consistência visual e todas as informações importantes destacadas.

**Acceptance Criteria**:
1. **Banner verde topo** (quando oportunidade nova <24h):
   - Texto: "Nova oportunidade, criada hoje às HH:MM. Entre em contato rapidamente..."
   - Cor: Verde (#10b981), ícone ℹ️
   - Dismiss button (X)
2. **Sidebar Esquerda** ajustada:
   - Qualificação (5 estrelas) mais visível
   - Temperatura (🔥/💧/❄️) com label
   - Valores (atual + previsto) destacados
3. **Sidebar Direita** ajustada:
   - Avatar + nome responsável (não só texto)
   - Seções expansíveis (toggle)
4. **Área Central**:
   - Formulário "CRIAR ANOTAÇÃO" em destaque (não tab separada)
   - Histórico abaixo do formulário

**Visual Reference**:
Baseado em `public/tela oportunidade.png`

**Technical Changes**:
```tsx
// DetalheOportunidade.tsx
{isNewOpportunity(opportunity.created_at) && (
  <Banner
    type="info"
    message="Nova oportunidade, criada hoje às 10:11. Entre em contato rapidamente para aumentar chances de fechamento."
    dismissible
  />
)}
```

---

## 🎨 UI/UX Design

### Before vs After

#### ClientCard
```
❌ ANTES:
┌──────────────────────────┐
│ Festival Music BR [Ativo]│
│ contato@festival.com     │
│                          │
│        [    ] [    ]     │ ← Botões invisíveis!
└──────────────────────────┘

✅ DEPOIS:
┌──────────────────────────┐
│ Festival Music BR [Ativo]│
│ contato@festival.com     │
│                          │
│     [✏️ Editar] [🗑️ Excluir]│ ← Botões visíveis
└──────────────────────────┘
```

#### OpportunityCard
```
❌ ANTES:
┌──────────────────────────┐
│ 👤 Pollos Hermanos  🔥   │
│ ⭐⭐⭐☆☆               │
│ R$ 15.000,00   há 3 dias │
└──────────────────────────┘

✅ DEPOIS:
┌──────────────────────────┐
│ 👤 Pollos Hermanos  🔥   │
│ ⭐⭐⭐☆☆               │
│ R$ 15.000,00   há 3 dias │
│ ─────────────────────── │
│ 📞 ✉️                    │ ← Quick actions
└──────────────────────────┘
```

#### DetalheOportunidade Layout
```
✅ DEPOIS (match RD):
┌─────────────────────────────────────────────────────┐
│ ℹ️ Nova oportunidade, criada hoje... [X]             │ ← Banner
├──────────┬─────────────────────────┬────────────────┤
│ Sidebar  │   [CRIAR ANOTAÇÃO]      │ Sidebar Right  │
│ Left     │   ─────────────────     │                │
│          │   [Histórico timeline]  │ - Responsável  │
│ - Funil  │                         │ - Dados        │
│ - ⭐⭐⭐⭐☆│                         │   Cliente      │
│ - 🔥 Hot │                         │ - Dados Oport. │
└──────────┴─────────────────────────┴────────────────┘
```

---

## 🚧 Riscos & Mitigações

### Risco 1: Banner verde muito intrusivo
**Probabilidade**: 50%
**Impacto**: Baixo
**Mitigação**:
- Dismiss permanente (salvar em localStorage)
- Mostrar apenas se oportunidade <24h

### Risco 2: Quick actions confundem usuário
**Probabilidade**: 30%
**Impacto**: Médio
**Mitigação**:
- Tooltips explicativos ("Ligar", "Enviar Email")
- Feedback visual (toast "Tarefa criada")

---

## 🎯 Definition of Done (Epic)

Epic completo quando:
- [ ] ClientCard: Botões outline visíveis em dark mode
- [ ] OpportunityCard: 2 ícones de ação funcionais (📞✉️)
- [ ] DetalheOportunidade: Banner verde + sidebars ajustadas
- [ ] Testes manuais: 5 usuários identificam botões Editar em <2s
- [ ] Quick action "Ligar" cria tarefa em <3 cliques
- [ ] Layout visualmente equivalente a `tela oportunidade.png`
- [ ] Protocol Notecraft™ compliance (componentes dentro limites)

---

## 📅 Timeline

**Estimativa Total**: 1.5 dias

**Breakdown**:
- Story 3.1 (Fix Botões): 2h
- Story 3.2 (Quick Actions): 4h
- Story 3.3 (Layout Match RD): 1 dia

**Sprint Recommendation**: Sprint "MVP State of Art" - Days 4-5 (após Epic 2)

---

## 🔗 Related Epics

- **Epic 1**: Tab Email (dependência para quick action ✉️)
- **Epic 2**: FilterBar (paralelo, não bloqueia)

---

**Criado**: 25 de Outubro de 2025
**Owner**: Product Owner
**UX Lead**: UX Expert
**Última atualização**: 25 de Outubro de 2025
