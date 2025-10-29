# Epic 1: Tabs Funcionais em Detalhes da Oportunidade

**Epic ID**: EPIC-001
**Status**: 🟡 In Progress (50% completo)
**Priority**: 🔴 P0 - Critical
**RICE Score**: 18.75 (Reach: 5 | Impact: 3.0 | Confidence: 100% | Effort: 8 days)

---

## 📊 Sumário Executivo

### Contexto
A página `DetalheOportunidade.tsx` existe com layout 3 colunas e 6 tabs, mas **3 tabs mostram placeholders** "em desenvolvimento". Isso quebra o fluxo do usuário e impede funcionalidades críticas.

### Objetivo
Completar as 3 tabs faltantes (Email, Produtos, Arquivos) para eliminar TODOS os placeholders e entregar experiência completa equivalente ao RD Station.

### Impacto no MVP State of Art
- **Bloqueador crítico**: 50% das tabs não funcionam
- **Experiência quebrada**: Usuário clica na tab e vê mensagem "em desenvolvimento"
- **Feature gap vs RD**: RD Station tem 100% das tabs funcionais

---

## 🎯 Objetivos de Negócio

### Problema
Atualmente, vendedores **não podem**:
1. Enviar emails diretamente ao cliente (precisam abrir Outlook)
2. Vincular produtos/serviços à oportunidade (controle de escopo)
3. Fazer upload de anexos (propostas, contratos, especificações técnicas)

### Solução
Implementar 3 tabs 100% funcionais:
- **Tab Email**: Compositor de email com integração Resend
- **Tab Produtos**: Vincular produtos do catálogo à oportunidade
- **Tab Arquivos**: Upload/download de anexos via Supabase Storage

### Métricas de Sucesso
- Zero placeholders visíveis em `DetalheOportunidade.tsx`
- Usuário consegue enviar email em <3 cliques
- Upload de arquivo completa em <30s

---

## 📋 User Stories (3 stories)

### Story 1.1: Tab Email - Compositor de Email
**Gap ID**: G-002
**Status**: ⏳ Não implementado
**Estimativa**: 1 dia
**Priority**: 🔴 P0

**User Story**:
> Como vendedor, quero enviar emails ao cliente diretamente da oportunidade, para centralizar comunicação e rastrear histórico.

**Acceptance Criteria**:
1. Tab "Email" renderiza EmailComposer component
2. Formulário tem campos: Para, Assunto, Corpo (textarea)
3. Botão "Enviar" integra com Resend API
4. Email enviado aparece no histórico (Timeline)
5. Status "sent" é salvo em tabela `emails_sent`

**Dependencies**:
- Resend API já configurada (reutilizar Edge Function de cotações)
- Timeline organism já existe

---

### Story 1.2: Tab Produtos - Vincular Produtos
**Gap ID**: G-003
**Status**: ⏳ Não implementado
**Estimativa**: 1 dia
**Priority**: 🔴 P0

**User Story**:
> Como vendedor, quero vincular produtos/serviços à oportunidade, para controlar escopo do projeto e facilitar cotações futuras.

**Acceptance Criteria**:
1. Tab "Produtos" renderiza ProductLink component
2. Lista de produtos disponíveis (do catálogo)
3. Botão "Adicionar Produto" abre modal seletor
4. Produtos vinculados aparecem como lista
5. Relação many-to-many salva em tabela `opportunity_products`

**Dependencies**:
- Tabela `products` já existe (15 itens seed)
- Nova tabela `opportunity_products` necessária

---

### Story 1.3: Tab Arquivos - Upload de Anexos
**Gap ID**: G-004
**Status**: ⏳ Não implementado
**Estimativa**: 1 dia
**Priority**: 🔴 P0

**User Story**:
> Como vendedor, quero fazer upload de anexos (PDF, imagens, planilhas), para centralizar documentação da oportunidade.

**Acceptance Criteria**:
1. Tab "Arquivos" renderiza FileUpload component
2. Drag-and-drop funcional (ou botão "Escolher Arquivo")
3. Upload para Supabase Storage bucket `attachments`
4. Lista de arquivos com nome, tamanho, data
5. Botão "Download" gera signed URL (1h expiration)
6. Botão "Excluir" remove do storage

**Dependencies**:
- Bucket `attachments` configurado no Supabase Storage
- RLS policies para upload/download

---

## 🗄️ Dados & Estrutura

### Nova Tabela: opportunity_products (many-to-many)
```sql
CREATE TABLE opportunity_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(opportunity_id, product_id)
);
```

### Nova Tabela: emails_sent (audit trail)
```sql
CREATE TABLE emails_sent (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
  to_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  sent_by UUID REFERENCES auth.users(id)
);
```

### Storage Bucket: attachments
- Path: `attachments/{opportunity_id}/{filename}`
- Max size: 10MB por arquivo
- Tipos permitidos: PDF, PNG, JPG, XLSX, DOCX

---

## 🎨 UI/UX Reference

### RD Station (Referência)
Baseado em `tela oportunidade.png`:
- Tabs horizontais no topo da área central
- Conteúdo da tab ocupa 100% da área central
- Botões de ação no topo do conteúdo (ex: "Enviar Email")

### STAGETEK (Implementação)
- Manter layout 3 colunas existente
- Tabs mudam apenas conteúdo da área central (não sidebars)
- Componentes organisms (≤50 linhas) para cada tab

---

## 🚧 Riscos & Mitigações

### Risco 1: Storage quota (2GB free)
**Probabilidade**: 40%
**Impacto**: Médio
**Mitigação**:
- Limit 10MB por arquivo
- Alerta quando storage > 80%
- Cold storage para arquivos >90 dias

### Risco 2: Email deliverability
**Probabilidade**: 20%
**Impacto**: Alto
**Mitigação**:
- Reutilizar Edge Function testada de cotações
- Fallback: mostrar erro com instrução (copiar texto e enviar manualmente)

---

## 🎯 Definition of Done (Epic)

Epic completo quando:
- [ ] 3 tabs 100% funcionais (Email, Produtos, Arquivos)
- [ ] Zero placeholders visíveis em DetalheOportunidade.tsx
- [ ] 2 novas tabelas criadas (opportunity_products, emails_sent)
- [ ] Storage bucket `attachments` configurado
- [ ] RLS policies completas para novas tabelas
- [ ] Testes manuais passam (enviar email, vincular produto, upload arquivo)
- [ ] Protocol Notecraft™ compliance (componentes ≤50 linhas)

---

## 📅 Timeline

**Estimativa Total**: 3 dias (1 dia por story)

**Sprint Recommendation**: Sprint "MVP State of Art" - Days 1-3

---

**Criado**: 25 de Outubro de 2025
**Owner**: Product Owner
**Tech Lead**: Architect
**Última atualização**: 25 de Outubro de 2025
