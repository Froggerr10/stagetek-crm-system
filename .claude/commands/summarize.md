# Gerar Sumário da Sessão

Você é um especialista em documentação técnica. Sua tarefa é gerar um **sumário completo e estruturado** da sessão de trabalho atual.

## Instruções

1. **Analise a conversa atual** desde o início (ou desde o último /clear)
2. **Identifique:**
   - Commits realizados (com hash e mensagem)
   - Features implementadas
   - Bugs corrigidos
   - Arquivos criados/modificados
   - Decisões técnicas importantes
   - Pendências/blockers encontrados
   - Próximos passos recomendados

3. **Gere um arquivo Markdown** seguindo este template:

```markdown
# 📋 SUMÁRIO TÉCNICO - Sessão {DATA}

## ✅ TRABALHO CONCLUÍDO ({N} commits)

### Commit 1: {hash} - {título}
{Descrição detalhada do que foi feito}

### Commit 2: {hash} - {título}
{Descrição detalhada do que foi feito}

---

## 🎯 STATUS ATUAL DO PROJETO

### Métricas:
- ✅ {Feature completa}
- ⚠️ {Feature parcial}
- ❌ {Blocker}

### Branch: {nome}
### Último commit: {hash}
### Commits desta sessão: {N}
### Linhas de código adicionadas: ~{N}

---

## 🚀 PRÓXIMA SESSÃO - {Tema}

### Prioridade (Order Recomendada):
1. {Task 1} ({estimativa})
2. {Task 2} ({estimativa})
3. {Task 3} ({estimativa})

---

## 📁 ARQUIVOS IMPORTANTES CRIADOS

### {Categoria} ({N}):
```
{listagem de arquivos com paths}
```

---

## 🎯 COMANDO PARA PRÓXIMA SESSÃO

**Após digitar `/clear`, abra este arquivo e cole no chat:**

```
{Prompt sugerido para continuar o trabalho}
```

---

## 📊 PENDENTES P0 ({N} dias restantes)

### ✅ COMPLETO:
- [x] {Task completa}

### 🔜 PRÓXIMOS:
- [ ] {Task pendente} ({estimativa})

**Total Restante: ~{N} dias**

---

## 🔧 ARQUITETURA TÉCNICA

{Decisões técnicas importantes, padrões aplicados, etc.}

---

## ⚙️ COMANDOS ÚTEIS

```bash
# Dev
npm run dev

# Validações
npm run validate:notecraft
npm run build

# Git
git status
git log --oneline -5
```

---

## 📝 NOTAS FINAIS

### Decisões de Design:
- {Decisão 1}: {Justificativa}

### Protocol Notecraft™:
- ✅ {Compliance item}

### Performance:
- {Otimização aplicada}

### Acessibilidade:
- ✅ {Improvement}

---

**Criado em:** {Data completa}
**Sessão:** {Tema da sessão}
**Próxima Sessão:** {Tema sugerido}
**Status:** ✅ Pronto para `/clear` + continuar
```

## Momento Apropriado para Gerar Sumário

Gere o sumário **automaticamente** quando:
- ✅ Usuário digitar `/summarize`
- ✅ Após 2+ commits em sequência
- ✅ Antes de finalizar uma sessão longa (4+ horas de trabalho)
- ✅ Ao completar uma milestone importante (ex: P0 blocker resolvido)
- ✅ Quando usuário pedir para "fazer sumário" ou similar

## Salvamento

1. **Gere o conteúdo** seguindo o template acima
2. **Salve em**: `.ai/SUMARIO-SESSAO-{DD}{MMM}{YYYY}.md`
   - Exemplo: `.ai/SUMARIO-SESSAO-21NOV2025.md`
3. **Informe ao usuário** o caminho do arquivo criado

## Output

Após gerar o sumário, responda:

```
✅ Sumário da sessão gerado com sucesso!

📄 Arquivo: .ai/SUMARIO-SESSAO-{DATA}.md

📊 Resumo:
- {N} commits realizados
- {N} arquivos modificados
- {Features principais implementadas}

🚀 Próximos passos: {Recomendação breve}

Use `/clear` e cole o "Comando para Próxima Sessão" para continuar.
```

---

**Seja detalhado, objetivo e mantenha o padrão BMAD Protocol.**
