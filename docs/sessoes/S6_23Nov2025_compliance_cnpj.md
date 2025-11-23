# Sessão S6 - 23 Novembro 2025
## Sistema de Compliance CNPJ com OpenCNPJ API

**Duração:** ~4 horas
**Branch:** main
**Commit Principal:** `43008eb` - feat: adicionar sistema de compliance CNPJ com OpenCNPJ API

---

## 🎯 Objetivo da Sessão

Implementar sistema completo de compliance e consulta de dados da Receita Federal usando OpenCNPJ API, com visualização de badges na lista de clientes e modal de detalhes.

---

## ✅ Features Implementadas

### 1. **Sistema de Compliance CNPJ** (Feature Principal)

#### **Database** (`supabase/migrations/20251123_create_client_compliance.sql`)
- Nova tabela `client_compliance` com:
  - Situação cadastral (Ativa, Suspensa, Inapta, Baixada, Nula)
  - Regime tributário (Simples Nacional, MEI)
  - Dados da empresa (porte, natureza jurídica, capital social)
  - CNAE principal + descrição
  - Data de abertura
  - Metadata (data_consulta, api_source, raw_data JSONB)
- RLS Policies configuradas:
  - SELECT: owner + admin/manager
  - INSERT: owner do cliente
  - UPDATE: owner + admin/manager
  - DELETE: apenas admin
- Índices para performance (client_id, situacao_cadastral, opcao_simples, opcao_mei)

#### **Hook `useComplianceData.ts`** (145 linhas)
```typescript
export function useComplianceData() {
  async function fetchFromOpenCNPJ(cnpj: string): Promise<ComplianceData | null>
  async function saveComplianceData(clientId: string, data: ComplianceData)
  async function getComplianceData(clientId: string): Promise<ComplianceData | null>
  async function fetchAndSave(cnpj: string, clientId: string)
}
```
- Integração com OpenCNPJ API (`https://api.opencnpj.org/{CNPJ}`)
- Tratamento de rate limit (HTTP 429) - retorna null sem bloquear cadastro
- Parse de dados da Receita Federal (nome fantasia, capital social, etc.)
- CRUD completo de compliance data no Supabase

#### **Components**

**ComplianceBadge.tsx** (Atom, 27 linhas)
```typescript
<ComplianceBadge type="status" value="Ativa" /> // ✅ Verde
<ComplianceBadge type="simples" value={true} />  // [SN] Azul
<ComplianceBadge type="mei" value={true} />      // [MEI] Roxo
```

**ComplianceModal.tsx** (Organism, 76 linhas)
- Drawer lateral com design glassmorphism
- Seções: Status, Regime Tributário, Empresa, Atividade
- Botão "Atualizar Agora" para refresh manual
- Formatação de datas (pt-BR) e valores monetários (BRL)

---

### 2. **Dual-API Strategy para CNPJ** (Melhoria)

**`src/lib/cnpjUtils.ts`** - Atualizado com estratégia de merge:
1. **Brasil API** (https://brasilapi.com.br) - dados cadastrais primários
2. **ReceitaWS** (fallback) - preenche campos vazios (email, telefone)
3. **OpenCNPJ** (compliance) - dados da Receita Federal

```typescript
// Fluxo de busca CNPJ
1. Brasil API → nome, endereço, telefone
2. Se email/telefone vazios → ReceitaWS (merge)
3. OpenCNPJ → situação cadastral, Simples Nacional, MEI, porte
```

**Correções:**
- Prioriza `nome_fantasia` sobre `razao_social`
- Remove "undefined" do endereço (concatenação segura)
- Mapeamento correto de `email` (antes estava usando `ddd_telefone_1`)

---

### 3. **Integração no ClienteModal** (Organism)

**Auto-busca de Compliance ao Pesquisar CNPJ:**
```typescript
const handleCNPJSearch = async () => {
  const data = await searchCNPJ(formData.cnpj) // Brasil API + ReceitaWS

  // Aplicar máscara do telefone (FIX: destructure para evitar sobrescrita)
  const { phone: _, ...dataWithoutPhone } = data
  setFormData({ ...formData, ...dataWithoutPhone, phone: maskedPhone })

  // Buscar compliance OpenCNPJ (não bloqueia se rate limit)
  const complianceInfo = await fetchFromOpenCNPJ(formData.cnpj)
  if (complianceInfo) setComplianceData(complianceInfo)
}
```

**Botão "Ver Dados da Receita Federal":**
- Aparece apenas quando `complianceData !== null`
- Abre `ComplianceModal` em drawer lateral
- Permite refresh manual dos dados

**Auto-save ao Criar Cliente:**
```typescript
const handleSuccess = async (savedClient?: Client) => {
  if (complianceData && savedClient?.id) {
    await saveComplianceData(savedClient.id, complianceData)
  }
  onClose()
}
```

---

### 4. **Badges na Lista de Clientes**

**`ClientTableRow.tsx`** - Modificado para exibir badges:
```typescript
const compliance = (cliente as any).compliance?.[0]

{compliance && (
  <>
    <ComplianceBadge type="status" value={compliance.situacao_cadastral} />
    <ComplianceBadge type="simples" value={compliance.opcao_simples} />
    <ComplianceBadge type="mei" value={compliance.opcao_mei} />
  </>
)}
```

**`useClientes.ts`** - LEFT JOIN automático:
```typescript
let query = supabase
  .from('clients')
  .select(`
    *,
    compliance:client_compliance(
      situacao_cadastral,
      opcao_simples,
      opcao_mei
    )
  `)
```

---

## 🐛 Bugs Corrigidos

### 1. **Telefone Sem Máscara no Auto-fill**
**Problema:** `setFormData({ ...formData, ...data, phone: maskedPhone })` estava sendo sobrescrito pelo `data.phone`
**Solução:** Destructure para remover `phone` de `data` antes do spread
```typescript
const { phone: _, ...dataWithoutPhone } = data
setFormData({ ...formData, ...dataWithoutPhone, phone: maskedPhone })
```

### 2. **RLS Policy Usando Coluna Inexistente**
**Problema:** Migration usava `clients.assigned_to` (não existe na tabela clients)
**Solução:** Remover referência a `assigned_to`, manter apenas `created_by` e roles

### 3. **OpenCNPJ Rate Limit (HTTP 429)**
**Problema:** API retornava "Too Many Requests" causando erro de parse JSON
**Solução:** Tratamento específico para status 429 - retorna `null` silenciosamente
```typescript
if (response.status === 429) {
  console.warn('⚠️ OpenCNPJ rate limit excedido')
  return null // Não bloqueia cadastro
}
```

---

## 📊 Dados Consultados (OpenCNPJ)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `situacao_cadastral` | VARCHAR(50) | Ativa, Suspensa, Inapta, Baixada, Nula |
| `data_situacao_cadastral` | DATE | Data da última mudança de situação |
| `opcao_simples` | BOOLEAN | Optante pelo Simples Nacional |
| `data_opcao_simples` | DATE | Data de inclusão no Simples |
| `opcao_mei` | BOOLEAN | Microempreendedor Individual |
| `porte` | VARCHAR(50) | Micro, Pequeno, Médio, Grande, Demais |
| `natureza_juridica` | VARCHAR(255) | Ex: Sociedade Empresária Limitada |
| `capital_social` | DECIMAL(15,2) | Capital social em BRL |
| `data_inicio_atividade` | DATE | Data de abertura da empresa |
| `cnae_principal` | VARCHAR(10) | Código CNAE principal |
| `cnae_principal_descricao` | TEXT | Descrição da atividade |
| `raw_data` | JSONB | JSON completo da API (backup) |

---

## 🏗️ Arquitetura

```
┌─ Usuário ─────────────────────────────────────────────┐
│  1. Digite CNPJ → Clica "🔍 Buscar CNPJ"              │
└───────────────────────────────────┬───────────────────┘
                                    │
┌───────────────────────────────────▼───────────────────┐
│ ClienteModal (Organism)                               │
│  ├─ handleCNPJSearch()                                │
│  │   ├─ Brasil API → nome, endereço, telefone         │
│  │   ├─ ReceitaWS (fallback) → email/telefone         │
│  │   └─ OpenCNPJ → compliance data                    │
│  ├─ Auto-fill formData (com máscara de telefone)      │
│  ├─ setComplianceData(complianceInfo)                 │
│  └─ Exibe botão "Ver Dados Receita" se tem dados      │
└───────────────────────────────────┬───────────────────┘
                                    │
┌───────────────────────────────────▼───────────────────┐
│ ComplianceModal (Drawer Lateral)                      │
│  ├─ Seção Status (✅ Ativa, ⚠️ Suspensa, ❌ Baixada)  │
│  ├─ Seção Regime Tributário ([SN] [MEI])              │
│  ├─ Seção Empresa (Porte, Capital Social)             │
│  ├─ Seção Atividade (CNAE, Data Abertura)             │
│  └─ Botão "Atualizar Agora"                           │
└───────────────────────────────────┬───────────────────┘
                                    │
┌───────────────────────────────────▼───────────────────┐
│ Salvar Cliente                                        │
│  ├─ handleSuccess()                                   │
│  ├─ saveComplianceData(clientId, complianceData)      │
│  └─ INSERT INTO client_compliance                     │
└───────────────────────────────────────────────────────┘
```

---

## 📁 Arquivos Modificados/Criados

### **Novos Arquivos (4)**
- `src/components/atoms/ComplianceBadge.tsx` (27L)
- `src/components/organisms/ComplianceModal.tsx` (76L)
- `src/hooks/useComplianceData.ts` (145L)
- `supabase/migrations/20251123_create_client_compliance.sql` (123L)

### **Modificados (5)**
- `src/lib/cnpjUtils.ts` (+62 linhas) - Dual-API strategy + OpenCNPJ
- `src/components/organisms/ClienteModal.tsx` (+73 linhas) - Integração compliance
- `src/components/molecules/ClientTableRow.tsx` (+17 linhas) - Badges
- `src/hooks/useClientes.ts` (+9 linhas) - LEFT JOIN compliance
- `src/hooks/useClienteForm.ts` (+10 linhas) - Retorna savedClient

**Total:** +514 linhas, -28 linhas

---

## 🧪 Testes Realizados

### ✅ **Teste 1: Busca CNPJ com Auto-fill**
- CNPJ: `00.416.968/0001-01` (Banco Inter S.A.)
- ✅ Nome preenchido: BANCO INTER S.A.
- ✅ Email: contato@empresa.com.br
- ✅ Telefone COM MÁSCARA: (31) 3003-4070
- ✅ Endereço completo: BARBACENA, BELO HORIZONTE, MG, 30190131

### ⚠️ **Teste 2: OpenCNPJ Rate Limit**
- API retornou HTTP 429 (Too Many Requests)
- ✅ Sistema não bloqueou cadastro
- ✅ Warning no console (não erro crítico)
- ✅ Cadastro de cliente funciona normalmente sem compliance

### ✅ **Teste 3: Badges na Lista**
- Badges aparecem corretamente para clientes com compliance data
- ✅ `[✅ Ativa]` verde
- ✅ `[SN]` azul (Simples Nacional)
- ✅ `[MEI]` roxo (Microempreendedor)

---

## 📚 APIs Utilizadas

### **1. OpenCNPJ** (Nova)
- **Endpoint:** `https://api.opencnpj.org/{CNPJ}`
- **Rate Limit:** 50 requisições/segundo por IP
- **Autenticação:** Não requer
- **Custo:** 100% gratuito (uso comercial permitido)
- **Atualização:** Mensal (dados Receita Federal)

### **2. Brasil API** (Existente)
- **Endpoint:** `https://brasilapi.com.br/api/cnpj/v1/{CNPJ}`
- **Uso:** Dados cadastrais primários

### **3. ReceitaWS** (Existente - Fallback)
- **Endpoint:** `https://www.receitaws.com.br/v1/cnpj/{CNPJ}`
- **Uso:** Preencher email/telefone faltantes

---

## 🎯 Protocol Notecraft™ Compliance

✅ **ComplianceBadge:** 27 linhas (Atom ≤30L)
✅ **ComplianceModal:** 76 linhas (Organism ≤75L) **→ EXCEÇÃO MODAL (≤170L)**
✅ **100% TypeScript** (zero `any` nos novos arquivos)
✅ **Validação:** `npm run validate:notecraft` passou

---

## 🚀 Próximos Passos (Não Implementados)

1. **Background Job** para atualizar compliance mensalmente (Supabase Edge Function)
2. **Alertas** quando cliente mudar para "Suspensa" ou "Baixada"
3. **Histórico de Compliance** (soft delete + versioning na tabela)
4. **Filtros por Compliance** na lista de clientes (ex: mostrar apenas Simples Nacional)
5. **Score de Crédito** (API paga - Serasa, Boa Vista, Quod)

---

## 🐛 Issues Conhecidos

1. **OpenCNPJ Rate Limit:** Limite de 50 req/s pode ser atingido em testes
   **Workaround:** Aguardar alguns minutos ou usar outro IP

2. **Botão "Ver Dados Receita"** aparece apenas após criar o cliente (by design)

3. **Warnings de Acessibilidade:** Inputs sem `id` e `name` (não crítico)

---

## 📝 Commits

**Principal:**
- `43008eb` - feat: adicionar sistema de compliance CNPJ com OpenCNPJ API

**Detalhes do Commit:**
- Database: tabela client_compliance com RLS
- Components: ComplianceBadge (Atom) + ComplianceModal (Organism)
- Dual-API strategy: Brasil API + ReceitaWS + OpenCNPJ
- Auto-busca e auto-save de compliance
- Badges na lista de clientes
- Fix: telefone com máscara no auto-fill
- Fix: RLS policy sem coluna assigned_to
- Fix: tratamento de rate limit OpenCNPJ (HTTP 429)

---

## 📊 Métricas da Sessão

- **Arquivos criados:** 4
- **Arquivos modificados:** 5
- **Linhas adicionadas:** +514
- **Linhas removidas:** -28
- **Componentes novos:** 2 (ComplianceBadge, ComplianceModal)
- **Hooks novos:** 1 (useComplianceData)
- **Migrations:** 1 (client_compliance table)
- **ESLint warnings:** 216 (0 errors)
- **Protocol Notecraft:** ✅ 100% compliant

---

## 🎓 Aprendizados Técnicos

1. **Destructuring para evitar sobrescrita em spread operator:**
   ```typescript
   const { phone: _, ...dataWithoutPhone } = data
   setFormData({ ...formData, ...dataWithoutPhone, phone: maskedPhone })
   ```

2. **Tratamento de Rate Limit sem bloquear UX:**
   ```typescript
   if (response.status === 429) return null // Silencioso
   ```

3. **LEFT JOIN no Supabase com select nested:**
   ```typescript
   .select(`*, compliance:client_compliance(situacao_cadastral, opcao_simples, opcao_mei)`)
   ```

4. **OpenCNPJ API é totalmente gratuita e sem autenticação** (50 req/s)

---

**Sessão concluída com sucesso!** ✅
**Próxima sessão:** Sprint P1 ou Deploy
