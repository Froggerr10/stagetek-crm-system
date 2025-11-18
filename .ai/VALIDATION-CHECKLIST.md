# ✅ VALIDATION CHECKLIST - STAGETEK CRM
## Workflow Completo End-to-End

**Objetivo**: Validar 100% das features antes do deploy produção
**Tempo estimado**: 1h
**Pré-requisitos**: Sistema rodando em `npm run dev`

---

## 🔐 PARTE 1: Autenticação (5min)

### 1.1. Login
- [ ] Acessar http://localhost:5173/login
- [ ] Fazer login com credenciais válidas
- [ ] Verificar redirecionamento para `/dashboard`
- [ ] Verificar TopBar com nome do usuário

### 1.2. Proteção de Rotas
- [ ] Tentar acessar `/clientes` sem estar logado
- [ ] Verificar redirecionamento para `/login`
- [ ] Fazer logout
- [ ] Verificar que foi deslogado corretamente

**Resultado esperado**: ✅ Autenticação funcional, rotas protegidas

---

## 👥 PARTE 2: CRUD Clientes (10min)

### 2.1. Criar Cliente
- [ ] Navegar para `/clientes`
- [ ] Clicar "Novo Cliente"
- [ ] Preencher formulário:
  - Nome: ABC Eventos Ltda
  - CNPJ: 12.345.678/0001-90 (validar formato)
  - Email: contato@abceventos.com
  - Telefone: (11) 98765-4321
  - Website: https://abceventos.com
  - Endereço: Av. Paulista, 1000, São Paulo, SP
- [ ] Salvar
- [ ] Verificar toast de sucesso
- [ ] Verificar cliente na lista

### 2.2. Editar Cliente
- [ ] Clicar "Editar" no cliente ABC Eventos
- [ ] Alterar telefone para (11) 91234-5678
- [ ] Salvar
- [ ] Verificar alteração na lista

### 2.3. Buscar Cliente
- [ ] Digitar "ABC" no campo de busca
- [ ] Verificar filtro em tempo real (debounce 300ms)
- [ ] Verificar que apenas ABC Eventos aparece

### 2.4. Filtrar por Status
- [ ] Selecionar "Ativos" no filtro
- [ ] Verificar que ABC Eventos aparece
- [ ] Selecionar "Inativos"
- [ ] Verificar lista vazia

### 2.5. Soft Delete
- [ ] Clicar "Excluir" em ABC Eventos
- [ ] Confirmar exclusão
- [ ] Verificar que status mudou para "Inativo"
- [ ] Verificar que não aparece no filtro "Ativos"

**Resultado esperado**: ✅ CRUD completo funcionando

---

## 💼 PARTE 3: CRUD Oportunidades (10min)

### 3.1. Criar Oportunidade
- [ ] Navegar para `/oportunidades`
- [ ] Clicar "Nova Oportunidade"
- [ ] Preencher formulário:
  - Título: Pedido Set Luz para Evento XYZ
  - Cliente: ABC Eventos Ltda
  - Valor: R$ 25.000,00
  - Probabilidade: 70%
  - Data prevista: 30 dias à frente
  - Estágio: Contato Feito
  - Temperatura: Quente (🔥)
  - Qualificação: 4 estrelas
- [ ] Salvar
- [ ] Verificar toast de sucesso
- [ ] Verificar oportunidade na lista

### 3.2. Visualizar Detalhes
- [ ] Clicar na oportunidade "Pedido Set Luz"
- [ ] Verificar navegação para `/oportunidades/:id`
- [ ] Verificar sidebar esquerda (informações):
  - Estágio: Contato Feito
  - Valor: R$ 25.000,00
  - Probabilidade: 70%
  - Qualificação: 4 estrelas ⭐⭐⭐⭐
  - Temperatura: Quente 🔥
  - Status: Aberta
- [ ] Verificar sidebar direita (cliente + responsável)

### 3.3. Marcar como Ganha
- [ ] Clicar "Marcar Venda" (botão verde)
- [ ] Confirmar
- [ ] Verificar toast de sucesso
- [ ] Verificar que status mudou para "Ganha"
- [ ] Verificar `won_at` preenchido

### 3.4. Marcar como Perdida
- [ ] Criar nova oportunidade "Pedido Estrutura"
- [ ] Clicar "Marcar Perda" (botão vermelho)
- [ ] Preencher motivo: "Preço muito alto"
- [ ] Confirmar
- [ ] Verificar que status mudou para "Perdida"
- [ ] Verificar `lost_at` e `lost_reason` preenchidos

**Resultado esperado**: ✅ Oportunidades gerenciadas corretamente

---

## 🎯 PARTE 4: Detalhes Oportunidade - 6 Tabs (20min)

**Setup**: Abrir oportunidade "Pedido Set Luz" (status: Aberta)

### 4.1. Tab Histórico
- [ ] Clicar tab "Histórico"
- [ ] Verificar Timeline vazio (primeira vez)
- [ ] Adicionar nota: "Cliente confirmou interesse, aguardando cotação"
- [ ] Verificar nota aparece no Timeline
- [ ] Verificar timestamp "há X minutos"
- [ ] Tentar editar nota → Deve FALHAR (immutable) ✅
- [ ] Adicionar segunda nota: "Enviado email com proposta"
- [ ] Verificar ordem cronológica (mais recente primeiro)

**Resultado**: ✅ Timeline funcional, notas imutáveis

### 4.2. Tab Email
- [ ] Clicar tab "E-mail"
- [ ] Verificar campo "Para" preenchido com email do cliente
- [ ] Preencher assunto: "Proposta Comercial - Set Luz"
- [ ] Preencher mensagem: "Olá, segue proposta anexa..."
- [ ] Clicar "Enviar Email"
- [ ] Verificar toast de sucesso
- [ ] Verificar que foi redirecionado para tab "Histórico"
- [ ] Verificar registro em `emails_sent` (via Supabase Dashboard)

**Resultado**: ✅ Email enviado via Resend API

### 4.3. Tab Tarefas
- [ ] Clicar tab "Tarefas"
- [ ] Verificar lista vazia (primeira vez)
- [ ] Clicar "Nova Tarefa"
- [ ] Preencher:
  - Título: Ligar para João Silva
  - Tipo: Ligação (📞)
  - Data vencimento: Hoje às 17h
  - Descrição: Confirmar interesse e prazo
- [ ] Salvar
- [ ] Verificar tarefa na lista
- [ ] Verificar ícone 📞 ao lado do título
- [ ] Marcar como concluída (checkbox)
- [ ] Verificar que tarefa fica riscada
- [ ] Criar segunda tarefa: "Enviar cotação revisada"
- [ ] Verificar ordenação (pendentes primeiro)

**Resultado**: ✅ Tarefas CRUD completo

### 4.4. Tab Contatos
- [ ] Clicar tab "Contatos"
- [ ] Verificar lista vazia (primeira vez)
- [ ] Clicar "Adicionar Contato"
- [ ] Preencher:
  - Nome: João Silva
  - Email: joao@abceventos.com
  - Telefone: (11) 99999-8888
  - Cargo: Diretor Comercial
  - Contato Principal: ✅ (checkbox)
- [ ] Salvar
- [ ] Verificar contato na lista
- [ ] Verificar badge "Principal"
- [ ] Adicionar segundo contato: Maria Santos (sem marcar principal)
- [ ] Verificar que apenas João tem badge "Principal"
- [ ] Editar Maria → Marcar como principal
- [ ] Verificar que João perdeu badge (apenas 1 principal por cliente)

**Resultado**: ✅ Contatos vinculados corretamente

### 4.5. Tab Produtos
- [ ] Clicar tab "Produtos"
- [ ] Verificar lista vazia (primeira vez)
- [ ] Clicar "Adicionar"
- [ ] Verificar catálogo (15 produtos)
- [ ] Adicionar "Mesa de Som Behringer X32"
- [ ] Verificar produto na lista vinculada
- [ ] Verificar quantidade: 1
- [ ] Verificar preço: R$ 15.000,00
- [ ] Adicionar "Par de Caixas Line Array" (qty: 2)
- [ ] Verificar total: R$ 15.000 + (R$ 8.000 × 2) = R$ 31.000
- [ ] Remover "Mesa de Som"
- [ ] Verificar que foi removido da lista

**Resultado**: ✅ Produtos vinculados, cálculos corretos

### 4.6. Tab Arquivos
- [ ] Clicar tab "Arquivos"
- [ ] Verificar lista vazia (primeira vez)
- [ ] Clicar "Upload"
- [ ] Selecionar arquivo PDF (<10MB)
- [ ] Verificar toast "Enviado!"
- [ ] Verificar arquivo na lista:
  - Nome: proposta.pdf
  - Tamanho: 2.5 MB
  - Data: há poucos segundos
- [ ] Clicar "Download" (ícone 📥)
- [ ] Verificar que arquivo abre em nova aba
- [ ] Fazer upload de arquivo >10MB
- [ ] Verificar erro "Máx 10MB" ✅
- [ ] Excluir "proposta.pdf"
- [ ] Confirmar exclusão
- [ ] Verificar que sumiu da lista

**Resultado**: ✅ Upload/Download Storage funcionando

---

## 📊 PARTE 5: Funil Kanban (10min)

### 5.1. Visualização Básica
- [ ] Navegar para `/funil`
- [ ] Verificar 5 colunas (estágios padrão):
  1. Sem contato / Lead
  2. Contato Feito
  3. Proposta Enviada
  4. Negociação
  5. Fechamento
- [ ] Verificar que "Pedido Set Luz" está em "Contato Feito"
- [ ] Verificar OpportunityCard:
  - Título: Pedido Set Luz
  - Cliente: ABC Eventos Ltda
  - Valor: R$ 25.000,00
  - Temperatura: 🔥 (Quente)
  - Estrelas: ⭐⭐⭐⭐

### 5.2. Drag-and-Drop
- [ ] Arrastar "Pedido Set Luz" para "Proposta Enviada"
- [ ] Verificar que mudou de coluna
- [ ] Verificar atualização no banco (Supabase Dashboard)
- [ ] Criar nova oportunidade "Pedido Treliças" em "Sem contato"
- [ ] Arrastar para "Contato Feito"
- [ ] Recarregar página
- [ ] Verificar que oportunidades permanecem nas colunas corretas

### 5.3. Quick Actions
- [ ] Verificar ícones no card "Pedido Set Luz":
  - 📞 (Ligar)
  - ✉️ (Email)
- [ ] Clicar 📞 (Phone)
- [ ] Verificar toast "Tarefa de ligação criada!"
- [ ] Ir para DetalheOportunidade → Tab Tarefas
- [ ] Verificar que tarefa "Ligar para ABC Eventos Ltda" foi criada ✅
- [ ] Voltar ao Funil
- [ ] Clicar ✉️ (Email)
- [ ] Verificar modal de email aberto
- [ ] Fechar modal

### 5.4. FilterBar
- [ ] Verificar filtros disponíveis:
  - Funil de vendas (dropdown)
  - Visão de trabalho (disabled - MVP)
  - Responsável (dropdown)
  - Status (Abertas/Todas/Ganhas/Perdidas)
- [ ] Alterar Status para "Todas"
- [ ] Verificar que oportunidades ganhas/perdidas aparecem
- [ ] Alterar Status para "Ganhas"
- [ ] Verificar que apenas ganhas aparecem
- [ ] Clicar "Recarregar" (ícone 🔄)
- [ ] Verificar que dados atualizam

**Resultado**: ✅ Funil Kanban 100% funcional

---

## 💰 PARTE 6: Sistema Cotações (10min)

### 6.1. Criar Cotação
- [ ] Abrir oportunidade "Pedido Set Luz"
- [ ] Clicar botão "Nova Cotação"
- [ ] Navegar para `/oportunidades/:id/cotacao/nova`
- [ ] Verificar sidebar com catálogo (15 produtos)
- [ ] Adicionar produtos:
  - Mesa de Som Behringer X32 (qty: 1) - R$ 15.000
  - Par de Caixas Line Array (qty: 2) - R$ 16.000
  - Moving Head Beam 230W (qty: 4) - R$ 12.000
- [ ] Verificar cálculos:
  - Subtotal: R$ 43.000,00
  - Frete: R$ 500,00 (editar)
  - Total: R$ 43.500,00
- [ ] Verificar preview em tempo real

### 6.2. Gerar PDF
- [ ] Clicar "Gerar PDF"
- [ ] Verificar que PDF abre em nova aba
- [ ] Verificar conteúdo do PDF:
  - Logo STAGETEK
  - Número: QT-YYYYMM-001 (formato correto)
  - Cliente: ABC Eventos Ltda
  - Endereço completo
  - 3 itens (Mesa de Som, Caixas, Moving Head)
  - Subtotal, Frete, Total
  - Validade: 30 dias
  - Condições de pagamento
- [ ] Verificar que PDF foi salvo no Storage (bucket 'pdfs')

### 6.3. Enviar Email
- [ ] Fechar PDF
- [ ] Clicar "Enviar Email"
- [ ] Preencher:
  - Para: joao@abceventos.com
  - Assunto: Cotação QT-202511-001 - Pedido Set Luz
- [ ] Verificar mensagem padrão preenchida
- [ ] Clicar "Enviar"
- [ ] Verificar toast "Email enviado com sucesso!"
- [ ] Verificar registro em `quotations` (status: 'sent')
- [ ] Verificar `sent_at` e `sent_to_email` preenchidos

### 6.4. Validações
- [ ] Criar nova cotação
- [ ] Tentar gerar PDF sem produtos
- [ ] Verificar erro "Adicione pelo menos 1 produto" ✅
- [ ] Adicionar 1 produto
- [ ] Tentar enviar email sem destinatário
- [ ] Verificar erro "Preencha todos os campos" ✅

**Resultado**: ✅ Cotação MVP completo (PDF + Email + Storage)

---

## 🔒 PARTE 7: Security & RLS (5min)

### 7.1. Team-Shared (clients, opportunities)
- [ ] Login como Usuário A
- [ ] Criar cliente "XYZ Corp"
- [ ] Login como Usuário B
- [ ] Verificar que consegue ver cliente "XYZ Corp" ✅ (team-shared)
- [ ] Editar cliente (alterar telefone)
- [ ] Verificar que conseguiu editar ✅ (team-shared)

### 7.2. Owner-Only (tasks)
- [ ] Login como Usuário A
- [ ] Criar tarefa assigned_to=Usuário B
- [ ] Tentar visualizar tarefa
- [ ] Verificar que NÃO aparece na lista ❌ (não é assigned_to nem creator)
- [ ] Login como Usuário B
- [ ] Verificar que tarefa aparece ✅ (assigned_to)
- [ ] Marcar como concluída
- [ ] Verificar sucesso ✅

### 7.3. Immutable (notes)
- [ ] Criar nota na oportunidade
- [ ] Tentar editar via Supabase Dashboard
- [ ] Verificar erro "UPDATE blocked by RLS" ✅
- [ ] Tentar deletar via Supabase Dashboard
- [ ] Verificar erro "DELETE blocked by RLS" ✅

**Resultado**: ✅ RLS policies funcionando corretamente

---

## 📱 PARTE 8: Mobile & Responsividade (5min)

### 8.1. Mobile Viewport
- [ ] Abrir DevTools (F12)
- [ ] Ativar modo responsivo (Ctrl+Shift+M)
- [ ] Selecionar iPhone 12 Pro (390x844)
- [ ] Navegar pelas páginas:
  - Dashboard ✅
  - Clientes (ClientCard stacked) ✅
  - Oportunidades (lista mobile) ✅
  - Funil Kanban (scroll horizontal) ✅
  - DetalheOportunidade (tabs scroll) ✅

### 8.2. Touch Gestures
- [ ] No Funil, tentar drag-and-drop no mobile
- [ ] Verificar que funciona (dnd-kit mobile-friendly) ✅

**Resultado**: ✅ Mobile-first OK

---

## ⚡ PARTE 9: Performance (5min)

### 9.1. Lighthouse Audit
- [ ] Abrir DevTools → Lighthouse
- [ ] Selecionar "Mobile" + "Performance"
- [ ] Rodar audit
- [ ] Verificar score >85 ✅
- [ ] Verificar métricas:
  - FCP <2s
  - LCP <3s
  - TTI <4s

### 9.2. Bundle Size
- [ ] `npm run build`
- [ ] Verificar dist/assets/*.js
- [ ] Verificar bundle gzipped <500KB ✅

**Resultado**: ✅ Performance OK

---

## ✅ RESULTADO FINAL

### Checklist Summary
- [ ] Autenticação (5min)
- [ ] CRUD Clientes (10min)
- [ ] CRUD Oportunidades (10min)
- [ ] Detalhes Oportunidade - 6 Tabs (20min)
- [ ] Funil Kanban (10min)
- [ ] Sistema Cotações (10min)
- [ ] Security & RLS (5min)
- [ ] Mobile & Responsividade (5min)
- [ ] Performance (5min)

**Total**: ~1h

### Critérios de Aprovação

✅ **APROVADO** se:
- 100% dos itens passaram
- Zero erros críticos
- RLS policies validadas
- Performance >85

❌ **REPROVADO** se:
- Qualquer CRUD não funciona
- RLS permite acesso indevido
- Performance <85
- Crash em mobile

---

**Próximo passo após aprovação**: Deploy Staging (Vercel)

**Documento criado por**: BMad Master (Claude Code)
**Data**: 17 de Novembro de 2025
