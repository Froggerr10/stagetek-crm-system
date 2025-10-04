# 📚 Protocol - Documentação Técnica STAGETEK CRM

Documentação organizada por **prefixos** para facilitar navegação.

---

## 🎯 Nomenclatura

### **CURRENT-\*** (Documentos Ativos)
Documentos **em uso ativo** no desenvolvimento atual.

| Arquivo | Descrição |
|---------|-----------|
| `CURRENT-PROTOCOL-NOTECRAFT.md` | ⭐ Protocolo de desenvolvimento (LEIA PRIMEIRO!) |
| `CURRENT-BRANDING-STANDARDS.md` | Cores, fontes, design tokens STAGETEK |
| `CURRENT-IMPLEMENTATION-PLAN.md` | Plano de implementação passo-a-passo |
| `CURRENT-FEATURES-PRIORITIZED.md` | Features priorizadas (P0/P1/P2/P3) |
| `CURRENT-ROADMAP-PHASES.md` | Roadmap em 6 fases (MVP → Scale) |
| `CURRENT-TECH-STACK.md` | Stack tecnológica definida |

---

### **REFERENCE-\*** (Referências RD Station)
Análises do **RD Station CRM** usado como referência de produto.

| Arquivo | Descrição |
|---------|-----------|
| `REFERENCE-RD-STATION-ANALYSIS.md` | Análise completa do RD Station CRM |
| `REFERENCE-DATABASE-SCHEMA-V2.md` | Schema banco de dados v2 (RD) |
| `REFERENCE-SCHEMA-COMPARISON.md` | Comparação schema v1 vs v2 |
| `REFERENCE-DESIGN-SYSTEM.md` | Sistema de design do RD |
| `REFERENCE-UI-PATTERNS.md` | Padrões de UI identificados |
| `REFERENCE-SCHEMA-QUICK.md` | Referência rápida schema v2 |

---

### **SPECS-\*** (Especificações Técnicas)
Specs detalhadas para implementação.

| Arquivo | Descrição |
|---------|-----------|
| `SPECS-API-V1.yaml` | OpenAPI 3.0 spec da API |
| `SPECS-DATABASE-SCHEMA.md` | Schema completo do PostgreSQL |
| `SPECS-PRD.md` | Product Requirements Document |
| `SPECS-ARCHITECTURE.md` | Arquitetura geral do sistema |
| `SPECS-ARCHITECTURE-MOBILE.md` | Arquitetura PWA mobile-first |
| `SPECS-FEATURES-COMPLETE.md` | Lista completa de features |

---

## 🚀 Início Rápido

### Para Desenvolvedores:
1. **Leia primeiro**: `CURRENT-PROTOCOL-NOTECRAFT.md`
2. **Consulte cores/fonts**: `CURRENT-BRANDING-STANDARDS.md`
3. **Veja plano**: `CURRENT-IMPLEMENTATION-PLAN.md`
4. **Schema DB**: `SPECS-DATABASE-SCHEMA.md`

### Para Product Managers:
1. **Roadmap**: `CURRENT-ROADMAP-PHASES.md`
2. **Features priorizadas**: `CURRENT-FEATURES-PRIORITIZED.md`
3. **PRD**: `SPECS-PRD.md`

### Para Designers:
1. **Branding**: `CURRENT-BRANDING-STANDARDS.md`
2. **Design System**: `REFERENCE-DESIGN-SYSTEM.md`
3. **UI Patterns**: `REFERENCE-UI-PATTERNS.md`

---

## 📁 Arquivos Movidos

Documentos **históricos/obsoletos** foram movidos para `/_archive/protocol-analysis/`:
- Análises já concluídas
- Auditorias realizadas
- Documentos de sessões de planejamento

**Não delete nada!** Se não está usando, está no `_archive/`.

---

## 🔄 Atualização de Documentos

**Quando atualizar um CURRENT-\*:**
1. Edite o arquivo diretamente
2. Adicione comentário no topo com data da última mudança
3. Se mudança for grande, considere versionar (ex: `CURRENT-PROTOCOL-NOTECRAFT-v2.md`)

**Quando criar novo documento:**
- Use prefixo apropriado (`CURRENT-`, `REFERENCE-`, `SPECS-`)
- Adicione na tabela acima
- Commit com mensagem clara

---

**Data de criação**: 04/Out/2025
**Última atualização**: 04/Out/2025
**Motivo**: Reorganização com nomenclatura clara
