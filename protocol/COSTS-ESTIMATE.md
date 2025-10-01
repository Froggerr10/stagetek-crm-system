# STAGETEK CRM - Estimativa de Custos
**Protocol Notecraft™ Cost Analysis**

---

## 🎯 Objetivo: Budget ZERO (ou próximo)

Maximizar uso de tiers gratuitos. Custos começam apenas quando escalar além de 5 usuários ou features AI intensivas.

---

## 💰 Custos Mensais Estimados

### **FASE 1-2 (MVP - Primeiros 3 meses)**
**Total**: **R$ 0,00/mês** 🎉

| Serviço | Tier | Custo |
|---------|------|-------|
| Vercel (Frontend + Edge Functions) | Free | R$ 0 |
| Supabase (Backend) | Free | R$ 0 |
| Domínio .com.br | Registro Brasil | R$ 40/ano (~R$ 3,33/mês) |
| **TOTAL FASE MVP** | | **~R$ 3,33/mês** |

---

### **FASE 3-4 (Produção - Meses 4-6)**
**Total**: **R$ 28,33/mês**

| Serviço | Tier | Custo |
|---------|------|-------|
| Vercel | Free (suficiente) | R$ 0 |
| Supabase | Free (até 500MB DB + 1GB storage) | R$ 0 |
| Domínio | Registro Brasil | R$ 3,33/mês |
| **Gmail/WhatsApp/Slack (via Rube MCP)** | Free tier | R$ 0 |
| **Claude API (testes)** | Pay-as-you-go (mínimo) | ~R$ 25/mês |
| **TOTAL FASE PRODUÇÃO** | | **~R$ 28,33/mês** |

---

### **FASE 5-6 (AI Features - Meses 7+)**
**Total**: **R$ 215 - R$ 440/mês**

| Serviço | Tier | Custo Mensal Estimado |
|---------|------|------------------------|
| Vercel | Free ou Pro ($20) | R$ 0 - R$ 100 |
| Supabase | Pro ($25) | R$ 125 |
| Domínio | Registro Brasil | R$ 3,33 |
| **Claude API (AI SDR + Lead Scoring)** | Pay-as-you-go | R$ 50 - R$ 150 |
| **Whisper/Deepgram (Call Recording)** | Pay-as-you-go | R$ 30 - R$ 60 |
| **Rube MCP** | Free tier | R$ 0 |
| **TOTAL FASE AI** | | **R$ 208,33 - R$ 438,33** |

---

## 📊 Breakdown Detalhado

### 1. Vercel (Frontend + Serverless)

#### Free Tier (RECOMENDADO para início)
- **Bandwidth**: 100GB/mês
- **Build Minutes**: 6000 min/mês
- **Serverless Functions**: 100GB-hours
- **Edge Functions**: 500.000 invocações/mês
- **Preço**: **GRÁTIS**

**Estimativa de uso (5 usuários)**:
- Bandwidth: ~10GB/mês (bem abaixo do limite)
- Builds: ~50 builds/mês (500 min) - OK
- Serverless: ~5GB-hours - OK

✅ **Free tier suficiente até ~20-30 usuários**

---

#### Pro Tier ($20/mês = ~R$ 100/mês)
Necessário apenas se:
- >100GB bandwidth (improvável com 5 usuários)
- >6000 build minutes (build muito pesado)
- Precisar de analytics avançado
- Precisar de password protection

**Decisão**: Free tier até escalar.

---

### 2. Supabase (Backend/BaaS)

#### Free Tier (RECOMENDADO para MVP)
- **Database**: 500MB PostgreSQL
- **Storage**: 1GB (PDFs, imagens)
- **Bandwidth**: 2GB/mês
- **Auth**: Usuários ilimitados
- **Realtime**: Connections ilimitadas
- **Edge Functions**: 500.000 invocações/mês
- **Preço**: **GRÁTIS**

**Estimativa de uso (5 usuários, 100 clientes, 200 oportunidades)**:
- Database: ~150MB (texto) - OK
- Storage: ~200MB (PDFs cotações, avatares) - OK
- Bandwidth: ~1GB/mês - OK

✅ **Free tier suficiente por 6-12 meses**

---

#### Pro Tier ($25/mês = ~R$ 125/mês)
Necessário quando:
- >500MB database (estimado em 500+ clientes)
- >1GB storage (estimado em 200+ cotações PDFs)
- >2GB bandwidth/mês
- Precisar de daily backups automáticos

**Estimativa quando atingir limite**:
- 500+ clientes cadastrados
- 1000+ oportunidades
- 500+ cotações com PDFs
- 10+ usuários ativos

**Timeline**: 6-12 meses após lançamento (depende de crescimento)

---

### 3. Claude API (Anthropic)

#### Pay-as-you-go
**Modelo recomendado**: Claude 3.5 Sonnet (melhor custo-benefício)

**Pricing**:
- Input: $3.00 / 1M tokens
- Output: $15.00 / 1M tokens

**Conversão**: $1 = ~R$ 5,00 (câmbio médio 2025)
- Input: R$ 15 / 1M tokens
- Output: R$ 75 / 1M tokens

---

#### Uso Estimado por Feature

**Lead Scoring (1x por oportunidade criada)**:
- Input: ~500 tokens (dados da oportunidade)
- Output: ~200 tokens (análise + score)
- Custo por lead: ~R$ 0,022
- **50 leads/mês**: R$ 1,10/mês

**AI SDR (conversas WhatsApp 24/7)**:
- Conversas: 100/mês (estimativa conservadora)
- Média: 10 mensagens/conversa
- Input: ~300 tokens/mensagem (histórico + contexto)
- Output: ~150 tokens/mensagem
- Custo por conversa: ~R$ 0,51
- **100 conversas/mês**: R$ 51/mês

**Call Analysis (transcrição + análise)**:
- Calls: 50/mês
- Transcrição: ~3000 tokens (call de 10min)
- Análise: ~1000 tokens output
- Custo por call: ~R$ 0,82
- **50 calls/mês**: R$ 41/mês

**Geração de Propostas (rascunho automático)**:
- Propostas: 20/mês
- Input: ~800 tokens (produtos + cliente)
- Output: ~1500 tokens (proposta completa)
- Custo por proposta: ~R$ 0,13
- **20 propostas/mês**: R$ 2,60/mês

---

#### Total Claude API Estimado
| Feature | Uso Mensal | Custo |
|---------|------------|-------|
| Lead Scoring | 50 leads | R$ 1,10 |
| AI SDR | 100 conversas | R$ 51,00 |
| Call Analysis | 50 calls | R$ 41,00 |
| Geração Propostas | 20 propostas | R$ 2,60 |
| **TOTAL** | | **R$ 95,70/mês** |

**Otimizações possíveis**:
- Cache de respostas similares: -30%
- Usar Claude 3 Haiku para tarefas simples: -50%
- Limitar AI SDR a horário comercial: -70%

**Total otimizado**: R$ 50-60/mês

---

### 4. Whisper API / Deepgram (Speech-to-Text)

#### Opção 1: Whisper (OpenAI) - **RECOMENDADO MVP**
**Pricing**: $0.006 / minuto (~R$ 0,03/min)

**Uso Estimado**:
- 50 calls/mês
- Duração média: 10 minutos/call
- **Total**: 500 min/mês
- **Custo**: R$ 15/mês

✅ **Mais barato, qualidade excelente**

---

#### Opção 2: Deepgram
**Pricing**: $0.0043 / minuto (~R$ 0,022/min)

**Uso Estimado**:
- 50 calls/mês
- Duração média: 10 minutos/call
- **Total**: 500 min/mês
- **Custo**: R$ 11/mês

**Vantagem Deepgram**: Realtime streaming (se precisar transcrever ao vivo)

✅ **Ligeiramente mais barato, melhor para realtime**

---

### 5. Storage de Áudios (Calls)

**Opção 1: Supabase Storage**
- Incluído no Free tier: 1GB
- Áudio comprimido: ~1MB/min
- 50 calls x 10min = 500MB
- ✅ **GRÁTIS** (dentro do tier)

**Opção 2: Cloudflare R2** (se precisar escalar)
- $0.015/GB armazenado (~R$ 0,075/GB)
- 10GB áudios: R$ 0,75/mês
- Zero egress fees (transferência grátis)

**Decisão**: Supabase Storage suficiente por 12+ meses

---

### 6. Rube MCP (Integrações)

**Tier Free** (verificar docs oficiais):
- Gmail: 500 emails/mês
- WhatsApp: 1000 mensagens/mês
- Slack: 100 notificações/mês
- Google Calendar: Ilimitado (API Google é free)

**Uso Estimado (5 usuários)**:
- Gmail: 100 emails/mês (cotações)
- WhatsApp: 200 mensagens/mês (follow-ups)
- Slack: 50 notificações/mês
- ✅ **GRÁTIS** (dentro do free tier)

**Tier Paid** (se necessário):
- ~$10-20/mês (~R$ 50-100/mês)
- Necessário apenas se >500 emails/mês

---

### 7. Domínio

**Opções**:
- **.com.br** (Registro.br): R$ 40/ano = **R$ 3,33/mês**
- **.com** (Namecheap, GoDaddy): $12/ano = R$ 60/ano = R$ 5/mês

**Recomendação**: .com.br (brasileiro, mais barato)

---

### 8. Outros Custos (Opcionais)

#### SSL Certificate
- ✅ **GRÁTIS** (Vercel fornece Let's Encrypt automático)

#### Email Profissional (opcional)
- Gmail Workspace: $6/user/mês (~R$ 30/user)
- **5 usuários**: R$ 150/mês
- ❌ **NÃO necessário** (usar emails pessoais ou @gmail.com)

#### Monitoring/Analytics
- Vercel Analytics: GRÁTIS (basic)
- Sentry (error tracking): Free tier OK
- Google Analytics: GRÁTIS
- ✅ **GRÁTIS**

---

## 📈 Projeção de Custos por Fase

### Fase 1-2: MVP (0-3 meses)
```
Vercel Free:        R$ 0/mês
Supabase Free:      R$ 0/mês
Domínio:            R$ 3,33/mês
Claude (testes):    R$ 5/mês
────────────────────────────
TOTAL:              R$ 8,33/mês
```

### Fase 3-4: Produção (3-6 meses)
```
Vercel Free:        R$ 0/mês
Supabase Free:      R$ 0/mês
Domínio:            R$ 3,33/mês
Claude (limitado):  R$ 25/mês
Rube MCP:           R$ 0/mês
────────────────────────────
TOTAL:              R$ 28,33/mês
```

### Fase 5: AI Features (6-9 meses)
```
Vercel Free:        R$ 0/mês
Supabase Pro:       R$ 125/mês (se atingir limite DB)
Domínio:            R$ 3,33/mês
Claude API:         R$ 50/mês (otimizado)
Whisper API:        R$ 15/mês
Rube MCP:           R$ 0/mês
────────────────────────────
TOTAL:              R$ 193,33/mês
```

### Fase 6: AI Advanced (9-12 meses)
```
Vercel Pro:         R$ 100/mês (se precisar analytics)
Supabase Pro:       R$ 125/mês
Domínio:            R$ 3,33/mês
Claude API:         R$ 95/mês (todas features AI)
Deepgram:           R$ 11/mês
Rube MCP Pro:       R$ 50/mês (se >500 emails)
────────────────────────────
TOTAL:              R$ 384,33/mês
```

---

## 💡 Otimizações para Reduzir Custos

### 1. Claude API (maior custo variável)

**Cache agressivo**:
```typescript
// Cache análises de leads similares
const leadScoreCache = new Map();

function getCachedLeadScore(oportunidade) {
  const cacheKey = `${oportunidade.valor_estimado}_${oportunidade.tipo_cliente}`;
  if (leadScoreCache.has(cacheKey)) {
    return leadScoreCache.get(cacheKey);
  }
  // Chamar Claude API
  const score = await calculateLeadScore(oportunidade);
  leadScoreCache.set(cacheKey, score);
  return score;
}
```

**Economia**: ~30% (evita chamadas duplicadas)

---

**Rate limiting (AI SDR)**:
```typescript
// Limitar IA a 100 conversas/mês
const MONTHLY_AI_LIMIT = 100;
let aiConversationsCount = 0;

function shouldUseAI() {
  if (aiConversationsCount >= MONTHLY_AI_LIMIT) {
    return false; // Escalar para humano
  }
  aiConversationsCount++;
  return true;
}
```

**Economia**: ~50% (controla uso de IA)

---

**Usar Claude Haiku para tarefas simples**:
- Claude 3.5 Sonnet: $3 input / $15 output
- Claude 3 Haiku: $0.25 input / $1.25 output (12x mais barato!)

```typescript
// Usar Haiku para lead scoring simples
if (oportunidade.valor_estimado < 10000) {
  return await claudeHaiku.score(oportunidade); // 12x mais barato
} else {
  return await claudeSonnet.score(oportunidade); // Mais preciso
}
```

**Economia**: ~60% em tarefas simples

---

### 2. Supabase (storage)

**Compressão de PDFs**:
```typescript
// Comprimir PDFs antes de salvar
import { compress } from 'pdf-lib';

const compressedPdf = await compress(pdfBytes, {
  quality: 0.7 // 70% qualidade (suficiente)
});
```

**Economia**: ~50% storage

---

**Deletar PDFs antigos (>1 ano)**:
```sql
-- Cron job mensal
DELETE FROM cotacoes
WHERE created_at < NOW() - INTERVAL '1 year'
AND status = 'rejeitada';
```

**Economia**: ~30% storage

---

### 3. Whisper API (transcrição)

**Comprimir áudios antes de enviar**:
```typescript
// Converter para formato comprimido (Opus)
import { convertAudio } from 'ffmpeg.wasm';

const compressedAudio = await convertAudio(audioFile, {
  codec: 'opus',
  bitrate: '32k' // Suficiente para voz
});
```

**Economia**: ~70% bandwidth + storage

---

## 🎯 Custos Anuais Projetados

### Ano 1 (Completo)
```
Meses 1-3 (MVP):        R$ 8,33 x 3 = R$ 25
Meses 4-6 (Produção):   R$ 28,33 x 3 = R$ 85
Meses 7-9 (AI Basic):   R$ 193,33 x 3 = R$ 580
Meses 10-12 (AI Full):  R$ 384,33 x 3 = R$ 1.153
────────────────────────────────────────────────
TOTAL ANO 1:            R$ 1.843
```

**Custo por usuário/mês** (5 usuários): R$ 30,72/usuário

---

### Ano 2 (Estabilizado)
```
Meses 13-24 (AI Full):  R$ 384,33 x 12 = R$ 4.612
────────────────────────────────────────────────
TOTAL ANO 2:            R$ 4.612
```

**Custo por usuário/mês** (5 usuários): R$ 76,87/usuário

---

## 📊 Comparação com CRMs Comerciais

| CRM | Custo/usuário/mês | 5 usuários/mês | Ano 1 (5 users) |
|-----|-------------------|----------------|-----------------|
| **STAGETEK (custom)** | R$ 30,72 (ano 1) | R$ 153,60 | R$ 1.843 |
| Pipedrive | R$ 79 | R$ 395 | R$ 4.740 |
| HubSpot Pro | R$ 450 | R$ 2.250 | R$ 27.000 |
| Salesforce | R$ 350 | R$ 1.750 | R$ 21.000 |
| RD Station CRM | R$ 120 | R$ 600 | R$ 7.200 |

**Economia Ano 1**:
- vs. Pipedrive: R$ 2.897 (~61% mais barato)
- vs. HubSpot: R$ 25.157 (~93% mais barato)
- vs. Salesforce: R$ 19.157 (~91% mais barato)
- vs. RD Station: R$ 5.357 (~74% mais barato)

✅ **Custom CRM é 61-93% mais barato no primeiro ano**

---

## ⚠️ Custos Escondidos (a considerar)

### 1. Tempo de Desenvolvimento
- **22 semanas (~5.5 meses)** desenvolvimento
- Se valorizar tempo a R$ 100/hora:
  - 40h/semana x 22 semanas = 880 horas
  - **Custo desenvolvimento**: R$ 88.000

**MAS**: É investimento único, não recorrente.

---

### 2. Manutenção (pós-lançamento)
- 10h/mês manutenção/bugs: R$ 1.000/mês
- 20h/mês novas features: R$ 2.000/mês
- **Total manutenção**: R$ 3.000/mês

**Decisão**: Se orçamento permitir, vale a pena vs. pagar CRM caro mensalmente.

---

### 3. Suporte (se terceirizar)
- CRMs comerciais incluem suporte
- Custom CRM: suporte próprio ou contratar
- **Custo**: R$ 0 (suporte interno)

---

## 🎯 Breakeven Analysis

**Custo Total Ano 1** (desenvolvimento + operação):
- Desenvolvimento: R$ 88.000 (investimento inicial)
- Operação: R$ 1.843
- **TOTAL**: R$ 89.843

**Economia vs. Pipedrive (R$ 4.740/ano)**:
- **Payback**: 89.843 / 4.740 = ~19 anos ❌

**MAS**: Se considerar que desenvolvimento seria feito de qualquer forma (produto próprio), então:
- **Payback operacional**: Imediato (61% mais barato)

---

## 💰 Resumo Executivo

### MVP (3 meses)
- **Custo mensal**: R$ 8,33
- **Custo total**: R$ 25
- **Viável**: ✅ SIM (praticamente zero)

### Produção (6 meses)
- **Custo mensal**: R$ 28,33 - R$ 193,33
- **Custo total**: R$ 680
- **Viável**: ✅ SIM (muito abaixo de CRMs comerciais)

### AI Full (12 meses)
- **Custo mensal**: R$ 384,33
- **Custo total**: R$ 1.843 (ano 1 completo)
- **Viável**: ✅ SIM (ainda 61% mais barato que Pipedrive)

---

## 🚦 Recomendação Final

### ✅ GO para MVP
- Custo quase ZERO (R$ 8,33/mês)
- Risco financeiro mínimo
- Pode testar com usuários reais

### ✅ GO para Produção
- Custo baixo (R$ 28-193/mês)
- ROI positivo vs. CRMs comerciais
- Features customizadas para STAGETEK

### ⚠️ AVALIAR AI Advanced
- Custo sobe para R$ 384/mês
- Avaliar ROI real do AI SDR e Call Recording
- Pode ser implementado depois se budget apertar

---

**Built with Protocol Notecraft™**
**STAGETEK Engineering Team**
**Data**: 01 de Outubro de 2025
