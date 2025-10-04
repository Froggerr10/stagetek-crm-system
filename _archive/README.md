# 📦 Archive - Histórico do Projeto

Este diretório contém **arquivos históricos** do desenvolvimento do STAGETEK CRM.

---

## 📁 Estrutura

### **old-html-phase/**
Fase inicial de prototipagem com **HTML estático** (antes do React).

**Conteúdo:**
- `.superdesign/` - Design iterations e changelogs da fase HTML
- `pages/` - Dashboard e Funil de Vendas em HTML puro
- `design-system/` - CSS antigo (base.css, components.css)
- `components/` - Estrutura de componentes HTML (vazia)
- `assets/` - Logos SVG antigos
- `prompts/` - Prompts Superdesign usados na fase de design
- `index.html.backup` - Backup do index HTML antigo
- `nul` - Arquivo vazio/erro
- `dashboard_draft.png` - Draft antigo do dashboard

### **old-docs/**
Documentação obsoleta substituída por versões atualizadas.

**Conteúdo:**
- `CLAUDE.md` - Versão antiga (duplicado de `.claude/CLAUDE.md`)
- `.windsurfrules` - Configuração Windsurf (não mais usado)
- `SUPERDESIGN-GUIDE.md` - Guia da fase de design HTML
- `SETUP-TOOLS.md` - Setup antigo
- `CHANGELOG.md` - Changelog da fase HTML

### **protocol-analysis/**
Análises e auditorias já realizadas (histórico de decisões).

**Conteúdo:**
- `ACCESSIBILITY-AUDIT.md` - Auditoria de acessibilidade
- `BACKEND-ANALYSIS-SUMMARY.md` - Resumo análise backend
- `BACKEND-DELIVERABLES-INDEX.md` - Índice de entregas backend
- `CODE-AUDIT.md` - Auditoria de código
- `COMPLEXITY-ASSESSMENT.md` - Avaliação de complexidade
- `COSTS-ESTIMATE.md` - Estimativa de custos
- `GAP-ANALYSIS.md` - Análise de gaps
- `APPROVAL-CHECKPOINTS.md` - Checkpoints de aprovação
- `SESSION-01-OCT-2025.md` - Sessão de planejamento 01/Out
- `DESIGN-PLAN.md` - Plano de design inicial

---

## 🗂️ Organização Atual (Fora do Archive)

### **Documentação ATIVA** (`protocol/`):

**CURRENT-\*** - Documentos atuais em uso:
- `CURRENT-PROTOCOL-NOTECRAFT.md` - Protocolo de desenvolvimento
- `CURRENT-BRANDING-STANDARDS.md` - Padrões de marca (cores, fontes)
- `CURRENT-IMPLEMENTATION-PLAN.md` - Plano de implementação
- `CURRENT-FEATURES-PRIORITIZED.md` - Features priorizadas
- `CURRENT-ROADMAP-PHASES.md` - Roadmap em fases
- `CURRENT-TECH-STACK.md` - Stack tecnológica

**REFERENCE-\*** - Referências RD Station CRM:
- `REFERENCE-RD-STATION-ANALYSIS.md` - Análise do RD Station
- `REFERENCE-DATABASE-SCHEMA-V2.md` - Schema banco de dados v2
- `REFERENCE-SCHEMA-COMPARISON.md` - Comparação de schemas
- `REFERENCE-DESIGN-SYSTEM.md` - Sistema de design RD
- `REFERENCE-UI-PATTERNS.md` - Padrões de UI
- `REFERENCE-SCHEMA-QUICK.md` - Referência rápida schema

**SPECS-\*** - Especificações técnicas:
- `SPECS-API-V1.yaml` - Spec da API v1
- `SPECS-DATABASE-SCHEMA.md` - Schema detalhado DB
- `SPECS-PRD.md` - Product Requirements Document
- `SPECS-ARCHITECTURE.md` - Arquitetura geral
- `SPECS-ARCHITECTURE-MOBILE.md` - Arquitetura mobile PWA
- `SPECS-FEATURES-COMPLETE.md` - Features completas

### **Referências** (`docs/`):

**REFERENCE-\*** - Análise do RD Station (referência):
- `REFERENCE-Blueprint-API.md`
- `REFERENCE-Journeys-Canonicas.md`
- `REFERENCE-Modelo-Dados-Minimo.md`
- `REFERENCE-Spec-Tecnico-Clone.md`
- `REFERENCE-Menus-Jornadas.md`

---

## 🔍 Quando Usar o Archive?

**Use os arquivos do `_archive/` quando:**
1. Precisar recuperar código HTML antigo
2. Revisar decisões de design da fase inicial
3. Consultar análises/auditorias históricas
4. Entender a evolução do projeto

**NÃO use para:**
1. Implementação atual (use `protocol/CURRENT-*`)
2. Referência técnica (use `protocol/SPECS-*` ou `protocol/REFERENCE-*`)

---

**Data de criação do arquivo**: 04/Out/2025
**Última atualização**: 04/Out/2025
**Motivo**: Limpeza pré-commit + reorganização com nomenclatura clara
