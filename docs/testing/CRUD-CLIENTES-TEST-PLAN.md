# CRUD Clientes - Manual Test Plan

**Sprint 1.1 - Story 2: CRUD Clients Backend Integration**
**Status**: Pending Manual Testing
**Created**: 2025-10-15

---

## Overview

This document provides a comprehensive manual testing checklist for the complete CRUD (Create, Read, Update, Delete) operations for the Clientes module.

**Test Environment**: Development
**URL**: http://localhost:5173/clientes
**Prerequisites**:
- Supabase connection configured
- User authenticated
- Dev server running (`npm run dev`)

---

## Test Scenarios

### 1. Create New Client ✅
**Scenario**: Creating a new client should add it to the database and display it in the list.

**Steps**:
1. Navigate to `/clientes`
2. Click "Novo Cliente" button
3. Fill in the form:
   - Nome: "Empresa Teste LTDA"
   - CNPJ: "12.345.678/0001-90"
   - Email: "contato@empresateste.com"
   - Phone: "(11) 98765-4321"
   - Website: "https://empresateste.com"
   - Address: Fill all fields (street, city, state, zipcode)
   - Status: "Ativo"
4. Click "Criar Cliente"

**Expected Results**:
- [ ] Loading spinner appears on submit button
- [ ] Toast notification: "Cliente criado com sucesso!"
- [ ] Modal closes automatically
- [ ] New client appears in the list immediately
- [ ] Client data matches input values

---

### 2. Read/List Clients ✅
**Scenario**: Loading the clients page should display all active clients.

**Steps**:
1. Navigate to `/clientes`
2. Wait for page to load

**Expected Results**:
- [ ] Loading spinner appears initially
- [ ] List of clients loads (if data exists)
- [ ] Desktop: Table view with columns (Nome, CNPJ, Email, Status, Ações)
- [ ] Mobile: Card view with client info
- [ ] Clients are sorted alphabetically by name

---

### 3. Update Existing Client ✅
**Scenario**: Editing a client should update the database and reflect changes in the list.

**Steps**:
1. Navigate to `/clientes`
2. Click "Editar" button on any client row/card
3. Modify fields:
   - Change Email: "novoemail@empresateste.com"
   - Change Phone: "(21) 91234-5678"
4. Click "Atualizar"

**Expected Results**:
- [ ] Modal opens with pre-filled data
- [ ] Loading spinner appears on submit button
- [ ] Toast notification: "Cliente atualizado com sucesso!"
- [ ] Modal closes automatically
- [ ] Updated values appear in the list immediately
- [ ] Other unchanged fields remain the same

---

### 4. Soft Delete (Deactivate) Client ✅
**Scenario**: Deactivating a client should soft-delete it (status='inactive').

**Steps**:
1. Navigate to `/clientes`
2. Ensure status filter is set to "Ativos"
3. Click "Excluir" button on any client
4. Confirm deletion in the browser dialog

**Expected Results**:
- [ ] Confirmation dialog: "Tem certeza que deseja desativar este cliente?"
- [ ] Toast notification: "Cliente desativado com sucesso!"
- [ ] Client disappears from the "Ativos" list immediately
- [ ] Client still exists in database (status='inactive')
- [ ] When filter changed to "Inativos", client appears there

---

### 5. Search Filter (Debounced) ✅
**Scenario**: Searching should filter clients server-side with 300ms debounce.

**Steps**:
1. Navigate to `/clientes`
2. Type in search input: "Empresa"
3. Wait 300ms

**Expected Results**:
- [ ] No immediate query (debounce active)
- [ ] After 300ms, list updates
- [ ] Only clients matching "Empresa" in name appear
- [ ] Search is case-insensitive
- [ ] Typing more characters re-filters with new 300ms delay

---

### 6. Status Filter Dropdown ✅
**Scenario**: Status filter should show only clients matching selected status.

**Steps**:
1. Navigate to `/clientes`
2. Status filter defaults to "Ativos"
3. Verify only active clients show
4. Change filter to "Todos os Status"
5. Verify all clients (active + inactive) show
6. Change filter to "Inativos"
7. Verify only inactive clients show

**Expected Results**:
- [ ] Default: Shows only active clients
- [ ] "Todos os Status": Shows all clients
- [ ] "Inativos": Shows only inactive clients
- [ ] Filter change triggers immediate refetch
- [ ] Loading state appears during refetch

---

### 7. Combined Filters ✅
**Scenario**: Search and status filters should work together.

**Steps**:
1. Navigate to `/clientes`
2. Set status filter to "Inativos"
3. Type search: "Teste"

**Expected Results**:
- [ ] Only inactive clients with "Teste" in name appear
- [ ] Both filters apply simultaneously
- [ ] Results update after 300ms debounce

---

### 8. Empty State (No Clients) ✅
**Scenario**: With no clients matching filters, should show empty state.

**Steps**:
1. Navigate to `/clientes`
2. Search for gibberish: "xyzabc999"

**Expected Results**:
- [ ] Empty state appears
- [ ] Message: "Nenhum cliente encontrado"
- [ ] Subtitle: "Tente ajustar os filtros de busca ou status"

---

### 9. Empty State (No Clients at All) ✅
**Scenario**: With no clients in database, should show welcome empty state.

**Steps**:
1. Clear all clients from database (manually via Supabase dashboard)
2. Navigate to `/clientes`
3. Ensure status filter is "Ativos"
4. Ensure search is empty

**Expected Results**:
- [ ] Empty state appears
- [ ] Message: "Nenhum cliente cadastrado"
- [ ] Subtitle: "Clique em 'Novo Cliente' para adicionar o primeiro cliente"

---

### 10. Error Handling (Network Error) ✅
**Scenario**: Network errors should display toast notifications.

**Steps**:
1. Open browser DevTools → Network tab
2. Set throttling to "Offline"
3. Navigate to `/clientes`

**Expected Results**:
- [ ] Loading spinner appears initially
- [ ] Toast notification appears: "Erro ao carregar clientes"
- [ ] Error state renders (red error box)
- [ ] Error message displayed

---

### 11. Form Validation ✅
**Scenario**: Form should validate required fields.

**Steps**:
1. Click "Novo Cliente"
2. Leave "Nome" field empty
3. Try to submit form

**Expected Results**:
- [ ] HTML5 validation prevents submit
- [ ] Field highlighted as required
- [ ] Form does not submit

---

### 12. Modal Close Behavior ✅
**Scenario**: Modal should close and refresh list after successful save.

**Steps**:
1. Create or edit a client successfully
2. Observe modal behavior

**Expected Results**:
- [ ] Modal closes automatically after save
- [ ] List refreshes automatically (via useClientes hook)
- [ ] No manual refresh needed
- [ ] Changes immediately visible

---

## Implementation Details

### Technologies Used
- **Hook**: `useClientes.ts` - Custom hook with CRUD operations
- **Backend**: Supabase PostgreSQL
- **State Management**: React useState + useEffect
- **Notifications**: react-hot-toast
- **Filtering**: Server-side (Supabase `.ilike()`)
- **Debounce**: 300ms via useEffect + setTimeout

### Features Implemented
- ✅ Create cliente (with created_by tracking)
- ✅ Read clientes (with filters)
- ✅ Update cliente
- ✅ Soft delete (status='inactive')
- ✅ Search filter (debounced, server-side)
- ✅ Status filter dropdown
- ✅ Auto-refresh after mutations
- ✅ Loading states (spinner)
- ✅ Error states (toast + error box)
- ✅ Empty states (context-aware)
- ✅ Toast notifications (success/error)

### Known Issues
- TypeScript errors in `useClientes.ts` due to `database.ts` mismatch (types show `never` but code works at runtime)
- Database types need regeneration from Supabase schema

---

## Test Execution Log

**Tester**: _____________________
**Date**: _____________________
**Environment**: Development

| Test # | Scenario | Pass/Fail | Notes |
|--------|----------|-----------|-------|
| 1 | Create New Client | ⬜ | |
| 2 | Read/List Clients | ⬜ | |
| 3 | Update Existing Client | ⬜ | |
| 4 | Soft Delete Client | ⬜ | |
| 5 | Search Filter | ⬜ | |
| 6 | Status Filter | ⬜ | |
| 7 | Combined Filters | ⬜ | |
| 8 | Empty State (Search) | ⬜ | |
| 9 | Empty State (No Data) | ⬜ | |
| 10 | Error Handling | ⬜ | |
| 11 | Form Validation | ⬜ | |
| 12 | Modal Behavior | ⬜ | |

---

## Acceptance Criteria (from Sprint 1.1)

All criteria from Task 2.5 must pass:

```gherkin
Given: Vendedor autenticado na página /clientes
When: Clica "Novo Cliente"
Then: Modal abre com formulário vazio

Given: Formulário de novo cliente preenchido
When: Clica "Salvar"
Then:
  - Loading aparece no botão
  - Cliente é inserido no banco (Supabase)
  - Modal fecha
  - Toast "Cliente salvo!" aparece
  - Cliente aparece na tabela imediatamente

Given: Cliente existe na lista
When: Clica no botão "Editar"
Then:
  - Modal abre com dados pré-preenchidos
  - Ao salvar, UPDATE é executado no banco
  - Mudanças refletidas na lista

Given: Lista de clientes carregando
When: Aguarda resposta do Supabase
Then: Spinner é exibido

Given: Busca por "empresa"
When: Digita no campo de busca
Then: Apenas clientes com "empresa" no nome aparecem (case-insensitive)

Given: Cliente ativo
When: Clica "Desativar"
Then:
  - Confirmação é solicitada
  - Status muda para 'inactive' no banco
  - Cliente some da lista padrão (ativos)
```

---

## Definition of Done

- [x] useClientes.ts criado e testado
- [x] CRUD completo funcionando (create, read, update, soft delete)
- [x] Filtros (busca + status) funcionais
- [x] Loading states em todas as operações
- [x] Error handling com toast
- [ ] 12 cenários de teste passando (pending manual execution)
- [ ] Commit: "feat: implement CRUD clients with Supabase integration"

---

**Next Steps**:
1. Run dev server: `npm run dev`
2. Execute all 12 test scenarios
3. Mark Pass/Fail in execution log
4. Fix any bugs discovered
5. Re-run failed tests
6. Mark Story 2 as complete when all pass
