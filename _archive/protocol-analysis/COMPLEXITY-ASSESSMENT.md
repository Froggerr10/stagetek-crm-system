# STAGETEK CRM - Avaliação de Complexidade
**Protocol Notecraft™ Risk Assessment**

---

## 🎯 Metodologia de Avaliação

### Critérios de Complexidade

| Nível | Tempo | Critérios |
|-------|-------|-----------|
| **Trivial** | <1 dia | UI simples, zero lógica de negócio, componentes isolados |
| **Simples** | 1-3 dias | CRUD básico, formulários simples, integrações conhecidas |
| **Médio** | 4-7 dias | Lógica de negócio moderada, APIs complexas, validações |
| **Alto** | 8-14 dias | Algoritmos complexos, múltiplas integrações, edge cases |
| **Muito Alto** | 15+ dias | IA, realtime, performance crítica, novos paradigmas |

---

## 📊 Avaliação por Feature

### 🟢 Features SIMPLES (1-3 dias)

#### 1. Autenticação Básica (Supabase Auth)
**Complexidade**: SIMPLES
**Tempo**: 2 dias
**Justificativa**:
- Supabase Auth abstrai complexidade
- Login/logout com SDK pronto
- Session management automático
- Zero backend customizado

**Riscos**:
- ✅ Baixo: Tecnologia madura e bem documentada

---

#### 2. Dashboard Básico
**Complexidade**: SIMPLES
**Tempo**: 3 dias
**Justificativa**:
- Stat cards (componentes atoms/molecules)
- Gráficos com biblioteca pronta (Recharts)
- Dados mockados inicialmente
- Layout grid simples

**Riscos**:
- ✅ Baixo: Componentes visuais, sem lógica complexa

---

#### 3. Dark Mode Toggle
**Complexidade**: TRIVIAL
**Tempo**: 0.5 dia
**Justificativa**:
- CSS custom properties já preparadas
- LocalStorage simples
- Ícone SVG dinâmico

**Riscos**:
- ✅ Zero: Implementação trivial

---

#### 4. Integração Slack (Notificações)
**Complexidade**: SIMPLES
**Tempo**: 2 dias
**Justificativa**:
- Rube MCP abstrai API Slack
- Apenas POST de mensagens
- Zero webhooks complexos

**Riscos**:
- ⚠️ Médio: Depende de Rube MCP estar bem documentado

---

#### 5. Calendário de Eventos (View Only)
**Complexidade**: SIMPLES
**Tempo**: 3 dias
**Justificativa**:
- Biblioteca react-big-calendar
- Apenas visualização (sem drag-drop)
- Eventos mockados

**Riscos**:
- ✅ Baixo: Biblioteca madura

---

### 🟡 Features MÉDIAS (4-7 dias)

#### 6. CRUD Clientes B2B
**Complexidade**: MÉDIA
**Tempo**: 5 dias
**Justificativa**:
- Schema Supabase (tabela + RLS policies)
- Formulário com validação (Zod + React Hook Form)
- Listagem com filtros e busca
- Modal de cadastro/edição
- Testes mobile (gestures, forms)

**Componentes**:
- 1 Template (DashboardLayout)
- 1 Organism (ClientesTable)
- 3 Molecules (ClienteCard, ClienteForm, SearchBar)
- 5 Atoms (Input, Button, Badge, Avatar, StatusDot)

**Riscos**:
- ⚠️ Médio: Validação de CNPJ (nacional/internacional)
- ⚠️ Médio: Filtros complexos podem adicionar tempo

---

#### 7. CRUD Oportunidades
**Complexidade**: MÉDIA
**Tempo**: 5 dias
**Justificativa**:
- Similar a CRUD Clientes
- Relacionamento com tabela clientes (foreign key)
- Cálculo de métricas (conversão, pipeline)
- Validações de negócio (probabilidade, estágios)

**Riscos**:
- ⚠️ Médio: Lógica de transição entre estágios
- ⚠️ Médio: Métricas calculadas podem ter edge cases

---

#### 8. Funil de Vendas (Kanban)
**Complexidade**: MÉDIA
**Tempo**: 6 dias
**Justificativa**:
- dnd-kit para drag-and-drop
- Touch gestures mobile (delay + tolerance)
- Atualização automática de totais
- Persistência no Supabase

**Desafios**:
- Mobile: Touch gestures (testar em devices reais)
- Performance: Re-render otimizado
- Edge cases: Drag entre colunas, cancel drag

**Riscos**:
- ⚠️⚠️ Alto: Drag-and-drop mobile pode ser frustrante
- ⚠️ Médio: Scroll + drag pode conflitar

---

#### 9. CRUD Produtos + Categorias
**Complexidade**: MÉDIA
**Tempo**: 5 dias
**Justificativa**:
- Schema com categorização (Som, Luz, Talhas, Peças)
- Upload de imagens (Supabase Storage)
- Filtros por categoria
- Grid/lista alternável mobile

**Riscos**:
- ⚠️ Médio: Upload de imagens (validação tamanho/tipo)
- ✅ Baixo: CRUD padrão, sem lógica complexa

---

#### 10. Importação Excel de Produtos
**Complexidade**: MÉDIA
**Tempo**: 4 dias
**Justificativa**:
- Biblioteca xlsx ou react-excel-renderer
- Parser de planilha Excel
- Validação de dados (tipos, obrigatórios)
- Preview antes de salvar
- Bulk insert no Supabase

**Desafios**:
- Validação: Diferentes formatos de planilha
- Erros: Linhas inválidas devem ser destacadas
- Performance: 1000+ linhas pode travar

**Riscos**:
- ⚠️⚠️ Alto: Formatos de Excel variam muito
- ⚠️ Médio: Validação complexa pode adicionar tempo

---

#### 11. Integração Gmail (via Rube MCP)
**Complexidade**: MÉDIA
**Tempo**: 5 dias
**Justificativa**:
- Rube MCP SDK para Gmail
- Template HTML de email profissional
- Anexar PDF automaticamente
- Log de emails enviados (tabela email_logs)

**Desafios**:
- Template HTML responsivo (mobile email clients)
- Garantir PDF está anexado corretamente
- Rate limiting (não spammar)

**Riscos**:
- ⚠️⚠️ Alto: Emails podem cair em spam
- ⚠️ Médio: Rube MCP pode ter limitações

---

#### 12. Integração WhatsApp (via Rube MCP)
**Complexidade**: MÉDIA
**Tempo**: 5 dias
**Justificativa**:
- Rube MCP SDK para WhatsApp Business API
- Enviar mensagens de follow-up
- Notificar cliente sobre cotação pronta
- Log de mensagens

**Desafios**:
- WhatsApp Business API tem regras rígidas (templates)
- Mensagens fora de janela de 24h precisam de template aprovado
- Rate limiting

**Riscos**:
- ⚠️⚠️⚠️ MUITO ALTO: WhatsApp API é complexa (templates, aprovações)
- ⚠️⚠️ Alto: Rube MCP pode não abstrair tudo

---

#### 13. Gestão de Equipamentos/Estoque
**Complexidade**: MÉDIA
**Tempo**: 6 dias
**Justificativa**:
- Schema com status (disponível, em uso, manutenção)
- Histórico de uso (tabela equipamentos_historico)
- Agendamento (vincular a eventos)
- Cálculo de disponibilidade

**Desafios**:
- Conflitos de agendamento (mesmo equipamento, duas datas)
- Cálculo de disponibilidade em tempo real

**Riscos**:
- ⚠️⚠️ Alto: Lógica de disponibilidade pode ter edge cases
- ⚠️ Médio: Histórico pode crescer muito (performance)

---

### 🟠 Features ALTAS (8-14 dias)

#### 14. Sistema de Cotações/Propostas
**Complexidade**: ALTA
**Tempo**: 9 dias
**Justificativa**:
- Schema complexo (cotacoes + itens)
- Seleção de múltiplos produtos
- Cálculo de frete (API Correios ou tabela fixa)
- Aplicar descontos (%, R$, por item, total)
- Gerar PDF profissional (react-pdf)
- Preview antes de enviar
- Armazenar PDF no Supabase Storage
- Enviar por email automaticamente

**Desafios**:
- **Cálculo de frete**: API Correios pode falhar, latência alta
- **PDF layout**: Precisa ficar profissional e responsivo
- **Descontos**: Lógica de desconto pode ter múltiplas regras
- **Validações**: Estoque, preços, prazos

**Componentes**:
- 1 Organism (CotacaoForm - 50 linhas)
- 1 Organism (PDFGenerator - 50 linhas)
- 3 Molecules (ProdutoSelector, FreteCalculator, DescontoInput)
- Múltiplos Atoms

**Riscos**:
- ⚠️⚠️⚠️ MUITO ALTO: Cálculo de frete (API externa pode falhar)
- ⚠️⚠️ Alto: PDF complexo, muitos edge cases
- ⚠️ Médio: Lógica de desconto pode ter bugs

---

#### 15. Sistema de Pedidos
**Complexidade**: ALTA
**Tempo**: 8 dias
**Justificativa**:
- Schema (pedidos + status tracking)
- Converter cotação aprovada em pedido
- Status tracking (pendente, produção, enviado, entregue)
- Timeline visual de pedido
- Notificações de mudança de status
- Histórico completo

**Desafios**:
- **State machine**: Transições de status (validar fluxo)
- **Notificações**: Email/WhatsApp em cada mudança
- **Integridade**: Garantir que cotação não vira 2 pedidos

**Riscos**:
- ⚠️⚠️ Alto: State machine pode ter bugs em edge cases
- ⚠️ Médio: Notificações podem falhar (retry logic)

---

#### 16. Relatórios Gerenciais
**Complexidade**: ALTA
**Tempo**: 9 dias
**Justificativa**:
- 4 relatórios complexos:
  1. Conversão por etapa do funil
  2. Motivos de perda (agregação)
  3. DRE simplificado (receita, custos, margem)
  4. Performance por vendedor
- Filtros: período, cliente, produto
- Gráficos complexos (múltiplos datasets)
- Exportar Excel/PDF

**Desafios**:
- **Queries SQL**: Agregações complexas (GROUP BY, JOIN)
- **Performance**: Relatórios podem travar com muito dado
- **Exportação**: Excel precisa de formatação correta

**Riscos**:
- ⚠️⚠️⚠️ MUITO ALTO: Performance com >10.000 oportunidades
- ⚠️⚠️ Alto: Queries SQL complexas, pode ter bugs
- ⚠️ Médio: Exportação pode falhar com dados grandes

---

### 🔴 Features MUITO ALTAS (15+ dias)

#### 17. Lead Scoring Automático (IA)
**Complexidade**: MUITO ALTA
**Tempo**: 9 dias
**Justificativa**:
- Definir 7 critérios de scoring
- Integração Claude API
- Análise qualitativa com IA
- Calcular score 0-100 automaticamente
- Dashboard de leads priorizados
- Cache de análises

**Desafios**:
- **Prompt engineering**: Prompt Claude precisa ser preciso
- **Custos**: Cada análise custa (otimizar cache)
- **Acurácia**: Score precisa realmente prever conversão
- **Feedback loop**: Como melhorar o modelo?

**Componentes IA**:
```typescript
// Exemplo de complexidade
async function calculateLeadScore(oportunidade: Oportunidade) {
  // 1. Calcular fatores quantitativos (simples)
  const quantitativeScore = calculateQuantitative(oportunidade);

  // 2. Análise qualitativa com Claude (complexo)
  const qualitativeAnalysis = await claudeAPI.analyze(oportunidade);

  // 3. Combinar scores (médio)
  const finalScore = combineScores(quantitativeScore, qualitativeAnalysis);

  // 4. Armazenar com cache (simples)
  await saveScore(oportunidade.id, finalScore);

  return finalScore;
}
```

**Riscos**:
- ⚠️⚠️⚠️ MUITO ALTO: IA pode não ser precisa (necessita ajustes)
- ⚠️⚠️⚠️ MUITO ALTO: Custos de API podem explodir
- ⚠️⚠️ Alto: Prompts podem precisar de múltiplas iterações
- ⚠️ Médio: Cache pode ter bugs

---

#### 18. AI SDR (Bot de Qualificação)
**Complexidade**: MUITO ALTA
**Tempo**: 16 dias (MAIS COMPLEXA)
**Justificativa**:
- Fluxo conversacional multi-turn
- Integração Claude API + WhatsApp
- Bot precisa manter contexto de conversa
- Coletar informações BANT (4 critérios)
- Agendar reunião automaticamente (Google Calendar)
- Criar oportunidade no CRM automaticamente
- Escalar para humano quando necessário
- Dashboard de conversas ativas

**Desafios CRÍTICOS**:
1. **Contexto de conversa**: Claude API é stateless, precisa gerenciar histórico
2. **Múltiplos turnos**: Conversa pode ter 10+ mensagens
3. **Intents**: Detectar quando cliente quer falar com humano
4. **Ambiguidade**: Cliente pode responder de forma não estruturada
5. **Custos**: Cada mensagem = 1 chamada Claude API
6. **WhatsApp**: Integração complexa (templates, janelas de 24h)
7. **Agendamento**: Conflitos de calendário
8. **LGPD**: Consentimento para bot automatizado

**Exemplo de complexidade**:
```typescript
// Sistema de conversação (pseudo-código simplificado)
class AISDRConversation {
  private history: Message[] = [];
  private bant: BANT = { budget: null, authority: null, need: null, timeline: null };

  async handleMessage(userMessage: string) {
    // 1. Adicionar mensagem ao histórico
    this.history.push({ role: 'user', content: userMessage });

    // 2. Chamar Claude API com contexto completo
    const response = await claudeAPI.chat({
      messages: this.history,
      systemPrompt: this.getSystemPrompt()
    });

    // 3. Extrair informações BANT da resposta
    const extractedBANT = this.extractBANT(response);
    this.bant = { ...this.bant, ...extractedBANT };

    // 4. Verificar se deve escalar para humano
    if (this.shouldEscalate(response)) {
      return this.escalateToHuman();
    }

    // 5. Verificar se BANT está completo
    if (this.isBANTComplete()) {
      return this.createOpportunity();
    }

    // 6. Continuar conversa
    this.history.push({ role: 'assistant', content: response });
    return response;
  }

  private shouldEscalate(response: string): boolean {
    // Lógica complexa para detectar quando escalar
    // Exemplos: cliente frustrado, pergunta muito específica, etc.
  }
}
```

**Riscos**:
- ⚠️⚠️⚠️⚠️ EXTREMO: Conversação natural é MUITO difícil
- ⚠️⚠️⚠️⚠️ EXTREMO: Custos de API podem ser proibitivos
- ⚠️⚠️⚠️ MUITO ALTO: WhatsApp Business API é complexa
- ⚠️⚠️⚠️ MUITO ALTO: Prompts precisam de muitas iterações
- ⚠️⚠️ Alto: Cliente pode se frustrar com bot
- ⚠️⚠️ Alto: LGPD compliance

**Recomendação**: **PULAR** no MVP. Implementar apenas se houver budget e tempo.

---

#### 19. Call Recording + AI Analysis
**Complexidade**: MUITO ALTA
**Tempo**: 15 dias
**Justificativa**:
- Upload de áudio (ou integração com softphone)
- Transcrição com Whisper/Deepgram
- Análise com Claude API:
  - Sentimento do cliente
  - Objeções identificadas
  - Gatilhos de compra
  - Score de performance do vendedor
  - Insights de coaching
- Player de áudio + transcrição sincronizada
- Dashboard de performance
- Storage de áudios (comprimidos)

**Desafios CRÍTICOS**:
1. **Compliance LGPD**: Consentimento obrigatório, termo de aceite
2. **Storage**: Áudios ocupam muito espaço (compressão obrigatória)
3. **Latência**: Transcrição pode levar 30s-2min (experiência UX ruim)
4. **Sincronização**: Áudio + transcrição com timestamps
5. **Custos**: Whisper $0.006/min (pode ser caro com muito uso)
6. **Integração softphone**: Pode ser complexa (se não for upload manual)
7. **Análise IA**: Prompt complexo, múltiplos critérios

**Exemplo de complexidade**:
```typescript
// Pipeline completo (pseudo-código)
async function processCallRecording(audioFile: File) {
  // 1. Upload áudio (simples)
  const audioUrl = await uploadAudio(audioFile);

  // 2. Comprimir áudio (médio)
  const compressedUrl = await compressAudio(audioUrl);

  // 3. Transcrever com Whisper (alto - latência)
  const transcription = await whisperAPI.transcribe(compressedUrl);

  // 4. Analisar com Claude (muito alto - prompt complexo)
  const analysis = await claudeAPI.analyze(transcription, {
    analyzeSentiment: true,
    detectObjections: true,
    identifyBuyingSignals: true,
    scorePerformance: true,
    generateCoachingInsights: true
  });

  // 5. Salvar tudo no banco (simples)
  await saveCallRecording({
    audioUrl: compressedUrl,
    transcription,
    analysis
  });

  return analysis;
}
```

**Riscos**:
- ⚠️⚠️⚠️⚠️ EXTREMO: Compliance LGPD (blocker legal)
- ⚠️⚠️⚠️ MUITO ALTO: Storage pode ficar caro rapidamente
- ⚠️⚠️⚠️ MUITO ALTO: Latência de transcrição (UX ruim)
- ⚠️⚠️ Alto: Integração com softphone (se necessário)
- ⚠️⚠️ Alto: Custos de API (Whisper + Claude)

**Recomendação**: **PULAR** no MVP. Implementar apenas se compliance estiver OK e houver budget.

---

## 📊 Resumo de Complexidade

### Por Nível

| Nível | Qtd Features | Tempo Total |
|-------|--------------|-------------|
| **Trivial** | 1 | 0.5 dia |
| **Simples** | 5 | 13 dias |
| **Médio** | 8 | 46 dias |
| **Alto** | 3 | 26 dias |
| **Muito Alto** | 3 | 40 dias |
| **TOTAL** | 20 | **125.5 dias** |

---

### Top 5 Features Mais Complexas

| Feature | Complexidade | Tempo | Risco |
|---------|--------------|-------|-------|
| 1. AI SDR | Muito Alta | 16 dias | ⚠️⚠️⚠️⚠️ EXTREMO |
| 2. Call Recording + AI | Muito Alta | 15 dias | ⚠️⚠️⚠️⚠️ EXTREMO |
| 3. Sistema de Cotações | Alta | 9 dias | ⚠️⚠️⚠️ MUITO ALTO |
| 4. Relatórios Gerenciais | Alta | 9 dias | ⚠️⚠️⚠️ MUITO ALTO |
| 5. Lead Scoring | Muito Alta | 9 dias | ⚠️⚠️⚠️ MUITO ALTO |

---

## ⚠️ Desafios Técnicos Principais

### 1. Mobile (Touch Gestures)
**Complexidade**: ALTA
**Features impactadas**:
- Funil de Vendas (drag-and-drop)
- Calendário (swipe entre dias)
- Formulários multi-step

**Mitigação**:
- Testar em devices reais desde Fase 1
- Usar bibliotecas maduras (dnd-kit, react-swipeable)
- Ter fallback: botões para mobile (se gestures falharem)

---

### 2. Integrações Externas (Rube MCP, APIs)
**Complexidade**: MÉDIA-ALTA
**Features impactadas**:
- Gmail, WhatsApp, Slack, Google Calendar
- API Correios (frete)
- Whisper/Deepgram (transcrição)

**Mitigação**:
- Ter fallback manual (se API falhar)
- Implementar retry logic
- Monitorar rate limits
- Ter documentação Rube MCP completa ANTES de começar

---

### 3. Performance (Relatórios, Listas Longas)
**Complexidade**: MÉDIA-ALTA
**Features impactadas**:
- Relatórios Gerenciais (queries SQL lentas)
- Listas de clientes/produtos (>1000 itens)
- Dashboard (múltiplos gráficos)

**Mitigação**:
- Usar paginação (não carregar tudo de uma vez)
- Virtual scrolling (react-virtual)
- Índices no Supabase (otimizar queries)
- Lazy loading de componentes pesados

---

### 4. IA (Custos + Acurácia)
**Complexidade**: MUITO ALTA
**Features impactadas**:
- Lead Scoring
- AI SDR
- Call Analysis

**Mitigação**:
- Cache agressivo (evitar chamadas duplicadas)
- Rate limiting (limitar uso mensal)
- Usar Claude Haiku para tarefas simples (12x mais barato)
- Monitorar custos semanalmente
- Ter métricas de acurácia (refinar prompts)

---

### 5. Compliance LGPD
**Complexidade**: ALTA (não técnica, mas blocker)
**Features impactadas**:
- Call Recording (consentimento obrigatório)
- AI SDR (bot automatizado)
- Armazenamento de dados pessoais

**Mitigação**:
- Consultar jurídico ANTES de implementar
- Termo de aceite explícito
- Aviso sonoro "Esta ligação será gravada"
- Direito de exclusão de dados (GDPR)

---

## 🎯 Recomendações de Implementação

### ✅ Implementar PRIMEIRO (Quick Wins)
1. Autenticação (2 dias) - Blocker para tudo
2. CRUD Clientes (5 dias) - Core business
3. Dashboard Básico (3 dias) - Valor executivo
4. CRUD Oportunidades (5 dias) - Core business
5. Funil de Vendas (6 dias) - Visualização crítica

**Total**: 21 dias (~4 semanas) - **MVP funcional**

---

### ⚠️ Implementar DEPOIS (Complexo mas necessário)
6. CRUD Produtos (5 dias)
7. Sistema de Cotações (9 dias)
8. Importação Excel (4 dias)
9. Integração Gmail (5 dias)

**Total adicional**: 23 dias (~5 semanas) - **CRM completo**

---

### 🚫 EVITAR ou POSTERGAR (Alto risco/custo)
- AI SDR (16 dias, risco EXTREMO)
- Call Recording (15 dias, risco EXTREMO, compliance)
- Relatórios Gerenciais (9 dias, pode ser feito depois)

**Economia**: 40 dias (~8 semanas)

---

## 📈 Curva de Aprendizado

### Fase 1 (Setup + Primeiros CRUDs)
- **Produtividade**: 50% (aprendendo stack)
- **Tempo real**: 2x estimativa
- **Exemplo**: CRUD Clientes (5 dias) → 10 dias reais

### Fase 2-3 (CRUDs + Integrações)
- **Produtividade**: 75% (já conhece stack)
- **Tempo real**: 1.3x estimativa
- **Exemplo**: CRUD Produtos (5 dias) → 6.5 dias reais

### Fase 4+ (Features Avançadas)
- **Produtividade**: 90% (expert na stack)
- **Tempo real**: 1.1x estimativa
- **Exemplo**: Sistema Cotações (9 dias) → 10 dias reais

**Total realista**: 125.5 dias × 1.4 (média) = **175 dias (~35 semanas ou 8 meses)**

---

## 🏁 Conclusão

### MVP Viável (44 dias estimados → 62 dias reais)
✅ Autenticação
✅ CRUD Clientes
✅ CRUD Oportunidades
✅ Funil de Vendas
✅ Dashboard
✅ CRUD Produtos

**Tempo real**: ~12-13 semanas (~3 meses)

---

### CRM Completo (90 dias → 126 dias reais)
✅ MVP +
✅ Sistema de Cotações
✅ Sistema de Pedidos
✅ Integrações (Gmail, WhatsApp, Slack)
✅ Calendário

**Tempo real**: ~25 semanas (~6 meses)

---

### CRM + IA Básica (125 dias → 175 dias reais)
✅ CRM Completo +
✅ Lead Scoring
✅ Relatórios

**Tempo real**: ~35 semanas (~8 meses)

---

### CRM + IA Avançada (165 dias → 231 dias reais)
✅ CRM + IA Básica +
⚠️ AI SDR (se viável)
⚠️ Call Recording (se compliance OK)

**Tempo real**: ~46 semanas (~11 meses)

**Recomendação**: Focar em MVP + CRM Completo (6 meses). Avaliar IA depois.

---

**Built with Protocol Notecraft™**
**STAGETEK Engineering Team**
**Data**: 01 de Outubro de 2025
