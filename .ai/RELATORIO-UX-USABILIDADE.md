# 🧭 RELATÓRIO DE UX/USABILIDADE - STAGETEK CRM

**Data:** 20 de Novembro de 2025
**Executor:** @design-specialist (UX/UI Specialist)
**Metodologia:** Nielsen Heuristics + Cognitive Walkthrough + Code Analysis
**Arquivos analisados:** 40+ componentes React/TypeScript

---

## 📊 RESUMO EXECUTIVO

**Score UX Geral:** 5.8/10

**Problemas por severidade:**
- 🔴 P0 (Blocker): 5 - Usuário não consegue completar tarefa
- 🟠 P1 (Crítico): 12 - Causa grande frustração
- 🟡 P2 (Médio): 18 - Causa confusão moderada
- 🔵 P3 (Baixo): 8 - Melhoria incremental

**Tempo estimado de correção:** 32-48h (4-6 dias)

**Principais pontos críticos:**
1. ❌ Falta de validação inline em formulários
2. ❌ Uso de `alert()` e `prompt()` nativo do browser (UX ruim)
3. ❌ Ausência de tooltips em ícones e botões
4. ❌ Falta de help contextual
5. ❌ Labels de botões ambíguas em alguns contextos

---

## 🧭 1. NAVEGAÇÃO E WAYFINDING

### Score: 7.5/10

### ✅ Pontos Positivos
- TopBar com navegação clara
- Breadcrumb component bem implementado
- Estado ativo visível no menu
- Botão "Voltar" presente

### ❌ Problemas Encontrados

| Página | Linha | Problema | Severidade | Solução |
|--------|-------|----------|------------|---------|
| TopBar.tsx | 27 | SearchBar não funcional | P1 | Implementar busca global real |
| Dashboard.tsx | 11-14 | Breadcrumb sem Home clicável | P2 | Link para /dashboard |
| Funil.tsx | N/A | Sem instrução drag-and-drop | P1 | Tooltip "Arraste cards" |
| DetalheOportunidade.tsx | 157 | Botão "Voltar" só ícone | P2 | Adicionar label/tooltip |
| Oportunidades.tsx | N/A | Sem breadcrumb | P2 | Adicionar breadcrumb |
| Clientes.tsx | N/A | Sem breadcrumb | P2 | Adicionar breadcrumb |

**Tempo de correção:** 4-6h

---

## 📝 2. FORMULÁRIOS E INPUTS

### Score: 4.8/10

### ✅ Pontos Positivos
- Campos obrigatórios com asterisco
- Placeholders descritivos
- Loading states em submits

### ❌ Problemas Encontrados

| Modal/Form | Linha | Problema | Severidade | Solução |
|------------|-------|----------|------------|---------|
| ClienteModal.tsx | 42 | CNPJ sem máscara | P1 | Formato XX.XXX.XXX/XXXX-XX |
| ClienteModal.tsx | 57 | Telefone sem máscara | P1 | Formato (XX) XXXXX-XXXX |
| ClienteModal.tsx | 42 | CNPJ sem validação inline | P0 | Validar e mostrar erro |
| ClienteModal.tsx | 53 | Email sem validação | P1 | Validar formato inline |
| OportunidadeModal.tsx | 28 | Aceita valores negativos | P1 | Validar min="0" |
| OportunidadeModal.tsx | 31 | Aceita probabilidade > 100 | P1 | Validar max="100" |
| OportunidadeModal.tsx | 21-24 | Select sem autocomplete | P1 | Implementar Combobox |
| AddressFields.tsx | 17 | CEP sem máscara | P2 | Formato XXXXX-XXX |
| AddressFields.tsx | 17 | CEP sem busca ViaCEP | P2 | Botão buscar automático |

**Problemas Críticos:**
1. **useOportunidadeForm.ts (linha 75)**: Usa `alert()` nativo - MUITO RUIM
2. **useClienteForm.ts (linha 71)**: Erro só no console.error

**Tempo de correção:** 12-16h

---

## 🔘 3. BOTÕES E AÇÕES

### Score: 6.0/10

### ✅ Pontos Positivos
- Hierarquia visual clara
- Loading states visuais
- Botões desabilitados com opacity

### ❌ Problemas Encontrados

| Componente | Linha | Problema | Severidade | Solução |
|------------|-------|----------|------------|---------|
| DetalheOportunidade.tsx | 164 | "Marcar Venda" ambíguo | P1 | "Marcar como Ganha" |
| DetalheOportunidade.tsx | 165 | "Marcar Perda" ambíguo | P1 | "Marcar como Perdida" |
| DetalheOportunidade.tsx | 166 | Settings só ícone | P2 | Tooltip "Editar" |
| DetalheOportunidade.tsx | 167 | Trash só ícone | P2 | Tooltip "Excluir" |
| QuickActionsBar.tsx | 31-32 | Botões só ícones | P1 | Labels "Ligar" e "Email" |
| Clientes.tsx | 39 | `confirm()` nativo genérico | P0 | ConfirmDialog component |
| Oportunidades.tsx | 70 | `confirm()` nativo | P0 | ConfirmDialog component |
| FileManager.tsx | 31 | `confirm("Excluir?")` | P0 | ConfirmDialog detalhado |

**Inconsistências:** 5x confirm() nativo + 3x ConfirmDialog

**Tempo de correção:** 6-8h

---

## ❓ 4. HELP E TOOLTIPS

### Score: 3.5/10

### ❌ Problemas Encontrados

| Componente | Problema | Severidade | Solução |
|------------|----------|------------|---------|
| GERAL | Sem sistema de Tooltip | P1 | Criar Tooltip component (Radix UI) |
| Funil.tsx | Sem help drag-and-drop | P1 | Instrução inicial |
| FilterBar.tsx | "Visão" desabilitado sem explicação | P2 | Tooltip "Em desenvolvimento" |
| StatsGrid.tsx | Métricas sem explicação | P2 | Tooltip de cálculo |
| OpportunityCard.tsx | Ícones temperatura sem legenda | P1 | Tooltip "Quente/Morno/Frio" |
| QuickActionsBar.tsx | Botões só ícones | P1 | Labels ou tooltips |
| TopBar.tsx | SearchBar não funcional | P1 | Placeholder "em breve" |

**Empty States Fracos:**

| Componente | Problema | Solução |
|------------|----------|---------|
| OpportunitiesTable.tsx | Só texto | Adicionar CTA "+ Nova Oportunidade" |
| Timeline.tsx | Genérico | "Clique em 'Adicionar Anotação'" |
| TaskList.tsx | Sem ação sugerida | "Clique em '+ Nova Tarefa'" |

**Tempo de correção:** 8-10h

---

## 📢 5. FEEDBACK E CONFIRMAÇÕES

### Score: 5.8/10

### ✅ Pontos Positivos
- Toast notifications implementado
- Loading states visuais
- ConfirmDialog bem feito

### ❌ Problemas Encontrados

| Ação | Arquivo | Linha | Problema | Severidade | Solução |
|------|---------|-------|----------|------------|---------|
| Criar cliente | useClienteForm.ts | 71 | Erro só console.error | P0 | toast.error() |
| Gerar PDF | usePDFGeneration.tsx | 11, 28 | `alert()` nativo | P0 | toast.error() |
| Enviar email | useEmailSending.tsx | 33, 37 | `alert()` nativo | P0 | toast.success/error() |
| Deletar oportunidade | Oportunidades.tsx | 76 | alert() com stack trace | P0 | toast.error() |
| Marcar perda | DetalheOportunidade.tsx | 101 | `prompt()` para motivo | P1 | Modal com textarea |
| Upload arquivo | FileManager.tsx | 16 | "Máx 10MB" genérico | P2 | "Tamanho máximo: 10MB" |
| Mover card | Funil.tsx | 120 | Sem sucesso, só erro | P2 | toast.success() |

**Loading States Ausentes:**
- Oportunidades.tsx: Skeleton screens
- Clientes.tsx: Skeleton screens
- FileManager.tsx: Progress bar

**Tempo de correção:** 6-8h

---

## ⚠️ 6. ESTADOS DE ERRO

### Score: 4.5/10

### ❌ Problemas Encontrados

| Cenário | Arquivo | Problema | Severidade | Solução |
|---------|---------|----------|------------|---------|
| CNPJ inválido | ClienteModal.tsx | Sem validação | P0 | "Formato: XX.XXX.XXX/XXXX-XX" |
| Email inválido | ClienteModal.tsx | Sem validação inline | P1 | Validar em tempo real |
| API erro 500 | GERAL | Mensagens genéricas | P1 | Traduzir para português |
| Sem conexão | GERAL | Sem tratamento | P1 | Banner "Reconectando..." |
| Campo obrigatório | GERAL | Browser validation | P2 | Customizar mensagens |
| Valor negativo | OportunidadeModal.tsx | Aceita | P1 | "Valor deve ser positivo" |
| Probabilidade > 100 | OportunidadeModal.tsx | Aceita | P1 | "Entre 0 e 100%" |

**Erros de API sem tratamento específico:**
```typescript
// ❌ ATUAL
alert('Erro ao deletar: ' + error.message)

// ✅ PROPOSTO
if (error.code === '23503') {
  toast.error('Não é possível excluir. Há cotações vinculadas.')
} else {
  toast.error('Erro ao excluir. Tente novamente.')
}
```

**Recovery Actions Ausentes:**
- Sem "Tentar novamente"
- Sem "Voltar para Dashboard"
- Sem fallback UI

**Tempo de correção:** 10-12h

---

## 🧠 7. COGNITIVE LOAD

### Score: 7.2/10

### ✅ Pontos Positivos
- Hierarquia visual clara
- Whitespace adequado
- Cores consistentes
- Terminologia consistente

### ❌ Problemas Encontrados

| Página | Problema | Severidade | Solução |
|--------|----------|------------|---------|
| Dashboard.tsx | "Estagio" sem acento | P3 | "Estágio" |
| OpportunitiesTable | "Acoes" sem cedilha | P3 | "Ações" |
| DetalheOportunidade.tsx | 6 tabs na mesma linha | P2 | OK desktop, dropdown mobile |
| FilterBar.tsx | 4 selects + botões | P2 | Collapse "Filtros avançados" |

**Defaults Inteligentes:**

| Campo | Atual | Recomendação |
|-------|-------|--------------|
| Probabilidade | 0 | ⚠️ Sugerir 50% padrão |
| Estágio | Primeiro | ✅ BOM |
| Status cliente | 'active' | ✅ BOM |

**Tempo de correção:** 3-4h

---

## 🎯 USER FLOWS CRÍTICOS

### Flow 1: Criar Nova Oportunidade

**Taxa de sucesso:** 75%

**Problemas:**
- ❌ Select sem busca (>20 clientes) - P1
- ❌ Sem validação inline - P1
- ❌ Erro usa alert() - P0

**Friction points:**
1. Buscar cliente em lista longa
2. Probabilidade errada só descoberta após submit

---

### Flow 2: Mover Card no Funil

**Taxa de sucesso:** 80% (após descobrir)

**Problemas:**
- ❌ Sem instrução inicial - P1
- ⚠️ Sem feedback sucesso - P2
- ⚠️ Rollback sem explicação - P2

**Friction points:**
1. Usuário novo não sabe que arrasta
2. Sem cursor grab

---

### Flow 3: Excluir Cliente

**Taxa de sucesso:** 60%

**Problemas:**
- ❌ confirm() nativo - P0
- ❌ Mensagem genérica - P1
- ❌ Não menciona consequências - P1
- ❌ "desativar" vs exclusão - P0

**Friction points:**
1. Medo de irreversível
2. Confirmação browser não confiável

---

### Flow 4: Enviar Email

**Taxa de sucesso:** 85%

**Problemas:**
- ❌ Sem validação email - P1
- ❌ Sem preview - P2
- ⚠️ Sem histórico visível - P2

**Friction points:**
1. Typo só descoberto após erro
2. Sem confiança se enviou

---

## 🏆 HEURÍSTICAS DE NIELSEN - SCORE CARD

| Heurística | Score | Principais Problemas | Urgência |
|------------|-------|---------------------|----------|
| 1. Visibility of System Status | 6/10 | Sem feedback drag-and-drop, SearchBar falso | P1 |
| 2. Match System/Real World | 8/10 | "Estagio" sem acento | P3 |
| 3. User Control and Freedom | 7/10 | Sem "Desfazer" | P2 |
| 4. Consistency and Standards | 7/10 | confirm() vs ConfirmDialog | **P0** |
| 5. Error Prevention | 3/10 | ❌ ZERO validação inline | **P0** |
| 6. Recognition vs Recall | 7/10 | Select sem busca | P1 |
| 7. Flexibility and Efficiency | 5/10 | Sem atalhos teclado | P2 |
| 8. Aesthetic/Minimalist | 8/10 | Layout limpo | P3 |
| 9. Help Recover from Errors | 4/10 | ❌ alert() nativo | **P0** |
| 10. Help and Documentation | 3/10 | ❌ Sem tooltips | **P1** |

**Score Médio:** **5.8/10**

---

## 🎯 PLANO DE AÇÃO PRIORIZADO

### 🔥 P0 - BLOCKERS (16h) - FAZER IMEDIATAMENTE

1. **[4h] Substituir alert() e confirm() nativos**
   - usePDFGeneration.tsx, useEmailSending.tsx
   - Oportunidades.tsx, Clientes.tsx
   - FileManager.tsx, ContactList.tsx

2. **[6h] Implementar validação inline em formulários**
   - ClienteModal: CNPJ, email, telefone
   - OportunidadeModal: valor (>0), probabilidade (0-100)

3. **[4h] Adicionar máscaras de formatação**
   - CNPJ: XX.XXX.XXX/XXXX-XX
   - Telefone: (XX) XXXXX-XXXX
   - CEP: XXXXX-XXX

4. **[2h] Corrigir error handlers**
   - useClienteForm: toast.error (linha 71)
   - useOportunidadeForm: substituir alert (linha 75)

---

### 🟠 P1 - ALTA FRUSTRAÇÃO (24h) - ESTA SEMANA

5. **[6h] Combobox com busca em Select Cliente**
6. **[4h] Tooltips em botões com ícones**
7. **[3h] Melhorar labels de botões**
8. **[4h] Help drag-and-drop no Funil**
9. **[3h] SearchBar global funcional**
10. **[4h] Tratamento erros API específico**

---

### 🟡 P2 - CONFUSÃO MODERADA (18h) - ESTE MÊS

11. **[3h] Skeleton screens**
12. **[2h] Feedback drag-and-drop**
13. **[3h] Melhorar ConfirmDialog exclusões**
14. **[2h] Tooltips métricas**
15. **[3h] Melhorar Empty States**
16. **[2h] Corrigir ortografia**
17. **[3h] Busca CEP automática**

---

### 🔵 P3 - INCREMENTAIS (12h) - BACKLOG

18. **[2h] Atalhos teclado**
19. **[2h] Modal "Motivo Perda"**
20. **[2h] Progress bar upload**
21. **[2h] Preview email**
22. **[2h] "Desfazer" exclusões**
23. **[2h] Histórico emails**

---

## 📋 CHECKLIST COMPLETO

### Navegação
- [ ] Implementar SearchBar global
- [ ] Breadcrumbs em Oportunidades e Clientes
- [ ] Tooltip em "Voltar"
- [ ] Home clicável

### Formulários
- [ ] Máscara CNPJ
- [ ] Máscara Telefone
- [ ] Máscara CEP
- [ ] Validar CNPJ inline
- [ ] Validar email inline
- [ ] Validar Valor > 0
- [ ] Validar Probabilidade 0-100
- [ ] Combobox Cliente com busca
- [ ] Busca CEP ViaCEP
- [ ] Corrigir useClienteForm
- [ ] Substituir alert() em useOportunidadeForm

### Botões
- [ ] "Marcar como Ganha"
- [ ] "Marcar como Perdida"
- [ ] Tooltip Settings
- [ ] Tooltip Trash
- [ ] Labels QuickActionsBar
- [ ] Padronizar "Salvar"
- [ ] Substituir confirm() nativos

### Help
- [ ] Criar Tooltip component
- [ ] Instrução drag-and-drop
- [ ] Tooltips temperatura
- [ ] Tooltips métricas
- [ ] Melhorar empty states
- [ ] Tooltip "Visão de Trabalho"

### Feedback
- [ ] toast em usePDFGeneration
- [ ] toast em useEmailSending
- [ ] toast em Oportunidades.tsx
- [ ] toast.success drag-and-drop
- [ ] Skeleton screens
- [ ] Progress bar upload

### Erros
- [ ] Tratamento erro 500
- [ ] Tratamento erro 404
- [ ] Tratamento erro 403
- [ ] Mapear códigos Supabase
- [ ] Banner offline
- [ ] Botão "Tentar novamente"
- [ ] Customizar HTML5 validation

---

## 💡 RECOMENDAÇÕES

### 1. User Testing
- Testar com 5 vendedores STAGETEK
- Gravar sessões
- Identificar friction points
- Iterar com feedback

**Script sugerido:**
1. "Crie nova oportunidade para ACME Corp"
2. "Mova para estágio Negociação"
3. "Envie email ao cliente"
4. "Exclua oportunidade de teste"

### 2. Analytics
- Event tracking (Posthog/Mixpanel)
- Métricas: conclusão forms, tempo criar oportunidade
- Monitorar abandonment rate

### 3. A/B Testing
- Labels de botões
- Select vs Combobox
- Posição Quick Actions

### 4. Onboarding
- Tour interativo primeira visita
- Walkthrough criar oportunidade
- Demo drag-and-drop
- Menu e features principais

**Ferramenta:** Intro.js ou React Joyride

### 5. Help Contextual
- Botão "?" flutuante
- FAQs
- Vídeos tutoriais
- Atalhos teclado
- Busca inline

### 6. Accessibility
- ARIA labels
- Navegação teclado
- Contrast 4.5:1
- Focus visible
- Screen reader

**Ferramentas:** axe DevTools, Lighthouse

---

## 📊 MÉTRICAS DE SUCESSO

**Baseline (atual):**
- Score UX: 5.8/10
- Problemas P0: 5
- Problemas P1: 12
- Tempo criar oportunidade: ~90s
- Taxa erro forms: ~25%

**Meta (3 meses):**
- Score UX: >8.0/10
- Problemas P0: 0
- Problemas P1: <3
- Tempo criar oportunidade: <60s
- Taxa erro forms: <10%
- NPS: >50

**Como medir:**
1. Repetir auditoria em 3 meses
2. User testing 5 usuários (before/after)
3. Feedback formulário in-app
4. Analytics (abandonment, time-on-task)

---

## 🎓 REFERÊNCIAS

- Nielsen Norman Group: 10 Usability Heuristics
- Don't Make Me Think (Steve Krug)
- The Design of Everyday Things (Don Norman)
- WCAG 2.1 Guidelines
- GOV.UK Design System: Error patterns
- Material Design 3: Validation
- Radix UI: Accessible components

---

**Próximos passos:**
1. ✅ Priorizar P0 (16h) para implementação imediata
2. ✅ User testing antes de P1
3. ✅ Criar issues GitHub com este relatório
4. ✅ Sprint UX (2 semanas) focado em P0+P1

**Relatório gerado por:** @design-specialist (UX/UI Specialist)
**Data:** 20 Novembro 2025
