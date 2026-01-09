# Sprint 1: MVP State of Art - Manual Testing Checklist

**Data**: 9 de Janeiro de 2026
**Testador**: _________________
**Ambiente**: Vercel Preview / Local
**Navegadores**: Chrome, Firefox, Safari
**Dispositivos**: Desktop (1920x1080), Tablet (768px), Mobile (375px)

---

## 🎯 Objetivo

Validar 100% das funcionalidades implementadas no Sprint 1, garantindo que o sistema está production-ready.

---

## ✅ Teste 1: Tab Email (Story 1.1)

**Cenário**: Enviar email ao cliente a partir de uma oportunidade

### Steps:
1. [ ] Acessar `/oportunidades`
2. [ ] Clicar em qualquer oportunidade
3. [ ] Clicar na tab "E-mail"
4. [ ] Verificar campos: Para, Assunto, Mensagem
5. [ ] Campo "Para" deve estar pré-preenchido com email do cliente
6. [ ] Preencher Assunto: "Teste Sprint 1 - Tab Email"
7. [ ] Preencher Mensagem: "Olá, este é um teste..."
8. [ ] Clicar "Enviar Email"

### Expected Results:
- [ ] Toast "Email enviado!" aparece
- [ ] Página muda automaticamente para tab "Histórico"
- [ ] Email aparece no Timeline com ícone ✉️ vermelho
- [ ] Conteúdo: "Email enviado para [email]: [assunto]"
- [ ] Timestamp correto

### Edge Cases:
- [ ] Enviar email SEM preencher campos → toast "Preencha todos os campos"
- [ ] Email inválido → validação HTML5
- [ ] Botão "Cancelar" limpa campos e volta ao histórico

**Status**: ⬜ Pass | ⬜ Fail | ⬜ Blocked
**Notas**: _______________________________________

---

## ✅ Teste 2: Tab Produtos (Story 1.2)

**Cenário**: Vincular produtos do catálogo à oportunidade

### Steps:
1. [ ] Na mesma oportunidade, clicar tab "Produtos"
2. [ ] Verificar seção "Produtos Vinculados" (pode estar vazia)
3. [ ] Clicar botão "Adicionar"
4. [ ] Verificar catálogo de produtos aparece
5. [ ] Escolher um produto (ex: "Truss Q30 3m")
6. [ ] Clicar botão "Add" verde
7. [ ] Produto aparece na lista vinculados
8. [ ] Verificar: Nome, Quantidade, Preço total
9. [ ] Clicar ícone 🗑️ para remover
10. [ ] Confirmar remoção

### Expected Results:
- [ ] Produto adicionado instantaneamente
- [ ] Toast "Produto adicionado!"
- [ ] Quantidade editável (futuro)
- [ ] Preço total calculado: Qtd × Preço unitário
- [ ] Produto removido instantaneamente
- [ ] Toast "Produto removido!"

### Edge Cases:
- [ ] Adicionar mesmo produto 2x → deve permitir (quantidade +1)
- [ ] Remover único produto → lista fica vazia
- [ ] Catálogo vazio → mensagem "Nenhum produto disponível"

**Status**: ⬜ Pass | ⬜ Fail | ⬜ Blocked
**Notas**: _______________________________________

---

## ✅ Teste 3: Tab Arquivos (Story 1.3)

**Cenário**: Upload, download e delete de anexos

### Steps:
1. [ ] Clicar tab "Arquivos"
2. [ ] Verificar mensagem "Nenhum arquivo" (se vazio)
3. [ ] Clicar botão "Upload"
4. [ ] Selecionar arquivo PDF (<10MB)
5. [ ] Aguardar upload (spinner "Enviando...")
6. [ ] Arquivo aparece na lista
7. [ ] Verificar: Nome, tamanho (KB/MB), data
8. [ ] Clicar ícone 📥 Download
9. [ ] Arquivo baixado com sucesso
10. [ ] Clicar ícone 🗑️ Delete
11. [ ] Confirmar exclusão
12. [ ] Arquivo removido da lista

### Expected Results:
- [ ] Upload completa em <30s
- [ ] Toast "Enviado!"
- [ ] Tamanho formatado: "1.5MB", "350KB"
- [ ] Data formatada: "09/01/2026"
- [ ] Download abre em nova aba (signed URL)
- [ ] Delete remove do storage + tabela
- [ ] Toast "Excluído!"

### Edge Cases:
- [ ] Arquivo >10MB → toast "Máx 10MB"
- [ ] Arquivo sem extensão → deve permitir
- [ ] Download de arquivo deletado → erro 404

**Status**: ⬜ Pass | ⬜ Fail | ⬜ Blocked
**Notas**: _______________________________________

---

## ✅ Teste 4: FilterBar Completa (Stories 2.1, 2.2, 2.3)

**Cenário**: Filtrar oportunidades no Funil Kanban

### Steps:
1. [ ] Acessar `/funil`
2. [ ] Verificar barra de filtros no topo
3. [ ] Contar 6 controles: Funil, Visão, Responsável, Status, ⟳, ⊞

#### Filtro Funil:
4. [ ] Dropdown "Funil" mostra lista de funis
5. [ ] Selecionar "Funil PADRÃO"
6. [ ] Kanban atualiza (mostra apenas oportunidades desse funil)
7. [ ] Badge ⊞ mostra "1"

#### Filtro Responsável:
8. [ ] Dropdown "Responsável" mostra "Todos" + usuários
9. [ ] Selecionar "Você" (seu usuário)
10. [ ] Kanban atualiza (mostra apenas suas oportunidades)
11. [ ] Badge ⊞ mostra "2"

#### Filtro Status:
12. [ ] Dropdown "Status" padrão = "Abertas"
13. [ ] Trocar para "Todas"
14. [ ] Kanban mostra oportunidades ganhas/perdidas também
15. [ ] Badge ⊞ mostra "3"

#### Botão Refresh:
16. [ ] Clicar ícone ⟳
17. [ ] Spinner aparece brevemente
18. [ ] Dados recarregados

#### Badge Contador:
19. [ ] Badge mostra "3 filtros" ou "3"
20. [ ] Limpar filtros (selecionar "Todos") → badge desaparece

### Expected Results:
- [ ] Filtros aplicam instantaneamente (<500ms)
- [ ] URL reflete filtros: `?funil=X&responsavel=Y&status=Z`
- [ ] Reload da página mantém filtros
- [ ] Dropdown "Visão de trabalho" disabled (cinza)
- [ ] Tooltip "Em desenvolvimento" no dropdown Visão
- [ ] Badge desaparece quando filterCount = 0

### Edge Cases:
- [ ] Nenhum funil cadastrado → dropdown vazio
- [ ] Filtro que retorna 0 resultados → Kanban vazio com mensagem
- [ ] Combinar 3 filtros + refresh → dados corretos

**Status**: ⬜ Pass | ⬜ Fail | ⬜ Blocked
**Notas**: _______________________________________

---

## ✅ Teste 5: Quick Actions OpportunityCard (Story 3.2)

**Cenário**: Criar tarefa "Ligar" e abrir Email via quick actions

### Steps:
1. [ ] Na página `/funil`, localizar qualquer OpportunityCard
2. [ ] Verificar rodapé do card tem 2 ícones: 📞 e ✉️
3. [ ] Ícones cinzas, hover azul

#### Quick Action: Phone (📞)
4. [ ] Clicar ícone 📞 (sem abrir detalhes)
5. [ ] Toast "Tarefa 'Ligar' criada!" aparece
6. [ ] Abrir detalhes da oportunidade
7. [ ] Ir para tab "Tarefas"
8. [ ] Verificar tarefa "Ligar [Nome Cliente]" na lista
9. [ ] Status: Pending

#### Quick Action: Mail (✉️)
10. [ ] Voltar para `/funil`
11. [ ] Clicar ícone ✉️ (sem abrir detalhes)
12. [ ] Redireciona para detalhes da oportunidade
13. [ ] Tab "E-mail" aberta automaticamente
14. [ ] Campo "Para" pré-preenchido

### Expected Results:
- [ ] Click em ícone NÃO abre detalhes (stopPropagation)
- [ ] Tarefa criada tem assigned_to = user atual
- [ ] Tarefa aparece em Tarefas pendentes
- [ ] Email composer aberto com dados corretos
- [ ] Ícones touch-friendly: 44x44px (mobile)

### Edge Cases:
- [ ] Oportunidade sem cliente → email vazio
- [ ] Criar tarefa 2x → 2 tarefas "Ligar" separadas
- [ ] Mobile: Ícones visíveis e clicáveis

**Status**: ⬜ Pass | ⬜ Fail | ⬜ Blocked
**Notas**: _______________________________________

---

## ✅ Teste 6: ClientCard Buttons (Story 3.1)

**Cenário**: Verificar botões Editar/Excluir visíveis

### Steps:
1. [ ] Acessar `/clientes`
2. [ ] Localizar qualquer ClientCard
3. [ ] Verificar botões "Editar" e "Excluir" no rodapé
4. [ ] Botões com ícones: ✏️ e 🗑️
5. [ ] Botões variant="outline" (borda visível)
6. [ ] Hover: fundo azul claro

### Expected Results:
- [ ] Botões visíveis em dark mode
- [ ] Borda branca/cinza clara
- [ ] Ícones Lucide: Edit + Trash2
- [ ] Touch targets ≥44px mobile
- [ ] "Excluir" hover vermelho

**Status**: ⬜ Pass | ⬜ Fail | ⬜ Blocked
**Notas**: _______________________________________

---

## ✅ Teste 7: Layout DetalheOportunidade (Story 3.3)

**Cenário**: Verificar layout match RD Station

### Steps:
1. [ ] Criar nova oportunidade (criada há <24h)
2. [ ] Abrir detalhes da oportunidade
3. [ ] Verificar banner verde no topo
4. [ ] Banner texto: "Nova oportunidade criada hoje..."
5. [ ] Botão X dismiss funcional
6. [ ] Clicar X → banner desaparece
7. [ ] Reload página → banner NÃO reaparece (localStorage)

#### Sidebar Esquerda:
8. [ ] Card "Informações"
9. [ ] Qualificação: 5 estrelas ⭐⭐⭐⭐⭐
10. [ ] Temperatura: Ícone (🔥/💧/❄️) + label + cor
11. [ ] Valor formatado: R$ 15.000,00

#### Sidebar Direita:
12. [ ] Card "Cliente" com nome + email
13. [ ] Card "Responsável" com Avatar + nome
14. [ ] Avatar colorido (gradient vermelho STAGETEK)

#### Área Central:
15. [ ] Tab "Histórico" padrão
16. [ ] Formulário "CRIAR ANOTAÇÃO" em destaque (topo)
17. [ ] Timeline abaixo do formulário

### Expected Results:
- [ ] Layout 3 colunas (desktop)
- [ ] Mobile: vertical stack (Info → Tabs → Cliente)
- [ ] Banner verde: #10b981 ou similar
- [ ] Temperatura "Quente" = vermelho 🔥
- [ ] Temperatura "Frio" = azul ❄️
- [ ] Avatar com iniciais (ex: "JD" para John Doe)

**Status**: ⬜ Pass | ⬜ Fail | ⬜ Blocked
**Notas**: _______________________________________

---

## ✅ Teste 8: Mobile Responsive (Cross-Device)

**Cenário**: Testar todas as telas em mobile (375px)

### Steps Mobile:

#### Funil Kanban:
1. [ ] Scroll horizontal com snap
2. [ ] Dots indicator mostra coluna ativa
3. [ ] FilterBar collapsible (Sheet bottom)
4. [ ] Botão "Filtros" abre drawer

#### DetalheOportunidade:
5. [ ] Tabs grid 3x2 (6 tabs visíveis)
6. [ ] Dropdown "Ações" mobile (MoreVertical)
7. [ ] Layout vertical: Info → Tabs → Cliente

#### Clientes:
8. [ ] ClientCards empilhados verticalmente
9. [ ] Botões Editar/Excluir visíveis

#### OpportunityCard:
10. [ ] Quick actions icons touch-friendly (44px)

### Expected Results:
- [ ] Zero scroll horizontal não intencional
- [ ] Todos os textos legíveis (≥14px)
- [ ] Touch targets ≥44px
- [ ] Nenhum conteúdo cortado
- [ ] Navbar mobile fixa no bottom

**Status**: ⬜ Pass | ⬜ Fail | ⬜ Blocked
**Notas**: _______________________________________

---

## ✅ Teste 9: Fluxo End-to-End (Cenário Vendedor)

**Cenário**: Vendedor cria oportunidade, envia email, vincula produtos, fecha venda

### Steps:
1. [ ] Login como vendedor (alice@stagetek.com)
2. [ ] Acessar Dashboard
3. [ ] Clicar "+ Nova Oportunidade"
4. [ ] Preencher:
   - Título: "Venda Truss Q30 - Cliente Teste"
   - Cliente: Selecionar existente
   - Valor: R$ 25.000,00
   - Probabilidade: 70%
   - Qualificação: 4 estrelas
5. [ ] Salvar oportunidade
6. [ ] Redireciona para detalhes
7. [ ] Banner verde aparece (<24h)
8. [ ] Tab "E-mail" → enviar email de follow-up
9. [ ] Email aparece no Timeline
10. [ ] Tab "Produtos" → vincular "Truss Q30 3m" (Qtd: 5)
11. [ ] Tab "Tarefas" → criar tarefa "Agendar visita técnica"
12. [ ] Voltar para `/funil`
13. [ ] Drag card para estágio "Proposta"
14. [ ] Card atualiza posição
15. [ ] Filtrar por "Responsável: Você"
16. [ ] Card permanece visível
17. [ ] Click quick action 📞 → tarefa "Ligar" criada
18. [ ] Abrir detalhes novamente
19. [ ] 2 tarefas pendentes: "Agendar visita" + "Ligar"
20. [ ] Marcar oportunidade como "Venda Ganha" (botão topo)
21. [ ] Confirmação de sucesso
22. [ ] Card move para "Ganhas" automaticamente

### Expected Results:
- [ ] Fluxo completo sem erros
- [ ] Todas as ações persistem após reload
- [ ] Timeline mostra histórico completo (criação, email, mudanças)
- [ ] Filtros funcionam em todas as etapas
- [ ] Performance aceitável (<2s por ação)

**Status**: ⬜ Pass | ⬜ Fail | ⬜ Blocked
**Notas**: _______________________________________

---

## ✅ Teste 10: Performance & Loading States

**Cenário**: Verificar spinners e estados de loading

### Steps:
1. [ ] Throttle network para "Fast 3G" (DevTools)
2. [ ] Acessar `/funil`
3. [ ] Spinner aparece enquanto carrega
4. [ ] Filtros carregam progressivamente
5. [ ] Upload arquivo → spinner "Enviando..."
6. [ ] Enviar email → spinner no botão
7. [ ] Refresh filtros → spinner no ícone ⟳

### Expected Results:
- [ ] Spinners visíveis em todas as operações async
- [ ] Loading states não bloqueiam UI (otimista quando possível)
- [ ] Timeout máximo: 30s (antes de erro)
- [ ] Erro: Toast vermelho com mensagem clara

**Status**: ⬜ Pass | ⬜ Fail | ⬜ Blocked
**Notas**: _______________________________________

---

## 📊 Resumo de Testes

| Teste | Status | Issues Found |
|-------|--------|--------------|
| 1. Tab Email | ⬜ | |
| 2. Tab Produtos | ⬜ | |
| 3. Tab Arquivos | ⬜ | |
| 4. FilterBar | ⬜ | |
| 5. Quick Actions | ⬜ | |
| 6. ClientCard Buttons | ⬜ | |
| 7. Layout Detalhe | ⬜ | |
| 8. Mobile Responsive | ⬜ | |
| 9. Fluxo E2E | ⬜ | |
| 10. Performance | ⬜ | |

**Total Pass**: ___ / 10
**Total Fail**: ___ / 10
**Total Blocked**: ___ / 10

---

## 🐛 Issues Encontrados

### Issue #1
**Severidade**: ⬜ P0 (Blocker) | ⬜ P1 (High) | ⬜ P2 (Medium) | ⬜ P3 (Low)
**Teste**: _______________
**Descrição**: _______________
**Steps to Reproduce**: _______________
**Expected**: _______________
**Actual**: _______________
**Screenshot**: _______________

### Issue #2
...

---

## ✅ Sign-Off

- [ ] Todos os testes P0 passaram
- [ ] Issues P0 resolvidos ou workaround documentado
- [ ] Performance aceitável (<2s load time)
- [ ] Mobile testado em 2+ dispositivos
- [ ] Desktop testado em 2+ navegadores

**Aprovado para Deploy**: ⬜ Sim | ⬜ Não
**Assinatura Testador**: _________________
**Data**: _________________

---

**Próximos Passos**:
1. Deploy Vercel Preview
2. Onboarding 2-3 beta users
3. Monitor feedback primeira semana
4. Sprint 2: Omie Integration ou Dashboard
