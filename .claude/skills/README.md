# Claude Code Skills - STAGETEK CRM

Skills especializados para otimizar o desenvolvimento do STAGETEK CRM usando método BMAD.

## 📚 Skills Disponíveis

### 1. **validate-story** ✅
Valida se implementação está 100% conforme Acceptance Criteria da story.

**Uso**:
```
validate story 3.1
validate story 1.1
```

**Output**: Relatório completo (AC checklist, Protocol Notecraft™ compliance, DoD status, blockers).

---

### 2. **generate-component** 🎨
Gera componentes React TypeScript que respeitam Protocol Notecraft™ (limites de linhas).

**Uso**:
```
generate component EmailComposer organism - form to send emails with to/subject/body fields

generate component Banner atom - displays green banner with dismiss button for opportunities <24h

generate component FilterBar organism - 6 filter controls for Funil page
```

**Output**: Código completo + validação de linhas + usage example.

---

### 3. **generate-rls-policies** 🔐
Gera Row Level Security policies completas (SELECT/INSERT/UPDATE/DELETE) para tabelas Supabase.

**Uso**:
```
generate rls policies for emails_sent table, owner_only model, owner column is sent_by

generate rls policies for opportunities table, team_shared model

generate rls policies for funnels table, admin_only model
```

**Output**: SQL migration completo + testing guide + security analysis.

---

### 4. **implement-story** 🚀
Workflow end-to-end para implementar uma story do zero até 100% DoD.

**Uso**:
```
implement story 3.1
implement story 1.1
```

**Output**: Story completa (7 fases: Discovery, Migrations, Componentes, Hooks, Integração, Validação, Commit).

---

### 5. **analyze-gaps** 📊
Analisa rapidamente o que falta implementar comparando código atual vs stories pendentes.

**Uso**:
```
analyze gaps all
analyze gaps epic-1
analyze gaps story-1.1
```

**Output**: Gap matrix + implementation order + velocity analysis + risk analysis.

---

## 🎯 Quando Usar Cada Skill

| Situação | Skill Recomendado |
|----------|-------------------|
| "Preciso implementar Story 3.1" | **implement-story** (workflow completo) |
| "Story 3.1 está pronta?" | **validate-story** (checklist DoD) |
| "Preciso criar componente EmailComposer" | **generate-component** (gera código) |
| "Preciso RLS policies para emails_sent" | **generate-rls-policies** (gera SQL) |
| "O que falta para completar Sprint?" | **analyze-gaps** (gap matrix) |

---

## 📖 Workflow Recomendado (Sprint MVP State of Art)

### Início do Sprint
```bash
# 1. Analisar gaps gerais
analyze gaps all

# 2. Resolver blockers (RLS policies)
generate rls policies for clients table, team_shared model
generate rls policies for opportunities table, team_shared model
generate rls policies for emails_sent table, owner_only model, owner column sent_by
# ... (11 tabelas no total)
```

### Durante Implementação (Por Story)
```bash
# 3. Implementar story completa
implement story 3.1

# 4. Validar implementação
validate story 3.1

# 5. Se validation falhou, corrigir e validar novamente
# ... (corrigir issues)
validate story 3.1
```

### Fim do Sprint
```bash
# 6. Verificar progresso geral
analyze gaps all
# Deve mostrar: 7/7 stories ✅ DONE
```

---

## 🔧 Troubleshooting

### "Skill não está funcionando"
**Solução**: Skills são arquivos markdown em `.claude/skills/`. Claude Code os carrega automaticamente.

### "Output está incompleto"
**Solução**: Skills podem exigir leitura de múltiplos arquivos. Certifique-se que:
- `docs/stories/*.md` existem
- `docs/architecture/*.md` existem
- Database schema está atualizado

### "Validação falhou mas AC estão corretos"
**Solução**: Protocol Notecraft™ é STRICT. Componentes DEVEM respeitar limites de linhas:
- Atom: ≤20 linhas
- Molecule: ≤35 linhas
- Organism: ≤50 linhas

Se exceder, use skill `generate-component` para criar versão compliant.

---

## 📝 Customização

Skills são apenas prompts estruturados. Para customizar:

1. Editar arquivo `.claude/skills/{skill-name}.md`
2. Modificar seção "Instructions"
3. Salvar (Claude Code recarrega automaticamente)

---

## 🎓 Exemplos Práticos

### Exemplo 1: Implementar Story 3.1 (Fix Botões ClientCard)

```
User: "implement story 3.1"

Claude:
1. [FASE 1: Discovery] Lendo docs/stories/3.1.fix-botoes-clientcard.md...
   - Story: Trocar variant="ghost" → "outline"
   - Componente: ClientCard.tsx
   - Estimativa: 2h
   - Blockers: Nenhum ✅

2. [FASE 2: Migrations] Não aplicável (zero backend changes)

3. [FASE 3: Componentes] Modificando ClientCard.tsx...
   - Linha 25: variant="ghost" → variant="outline"
   - Adicionando ícones Lucide (Edit, Trash2)

4. [FASE 4: Hooks] Não aplicável (zero business logic)

5. [FASE 5: Integração] Testando em dark mode...
   - ✅ Botões visíveis
   - ✅ Hover azul funcionando

6. [FASE 6: Validação] Checking AC...
   - ✅ AC-1: Botões visíveis em dark mode
   - ✅ AC-2: Ícones adicionados
   - ✅ AC-3: Hover azul

7. [FASE 7: Commit]
   git commit -m "feat: implement story 3.1 - fix botões ClientCard..."

Story 3.1: ✅ DONE (100% DoD)
```

---

### Exemplo 2: Gerar RLS Policies para Tabela Nova

```
User: "generate rls policies for emails_sent table, owner_only model, owner column is sent_by"

Claude:
## RLS Policies Generated: emails_sent

Security Model: owner_only
Owner Column: sent_by

Migration File:
```sql
-- Enable RLS
ALTER TABLE emails_sent ENABLE ROW LEVEL SECURITY;

-- SELECT (apenas own emails)
CREATE POLICY "Users can view their own emails"
  ON emails_sent FOR SELECT
  TO authenticated
  USING (auth.uid() = sent_by);

-- INSERT (apenas authenticated)
CREATE POLICY "Users can insert their own emails"
  ON emails_sent FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sent_by);

-- UPDATE (BLOQUEADO - immutable audit trail)
-- DELETE (BLOQUEADO - immutable audit trail)
```

Testing:
1. Login as user A
2. INSERT email → Should succeed
3. SELECT own emails → Should see only own
4. SELECT user B's emails → Should see ZERO rows ✅
```

---

## 🚀 Próximos Passos

1. **Resolver Blockers (Fase 0)**: Usar `generate-rls-policies` para 11 tabelas
2. **Implementar Quick Wins (Fase 1)**: Usar `implement-story` para Stories 3.1 e 3.2
3. **Implementar Tabs (Fase 2)**: Usar `implement-story` para Stories 1.1, 1.2, 1.3
4. **Implementar Filtros (Fase 3)**: Usar `implement-story` para Stories 2.1 e 3.3
5. **Validar Sprint**: Usar `analyze-gaps all` para confirmar 7/7 stories ✅

---

**Última atualização**: 25 Outubro 2025
**Criado por**: Claude Code (STAGETEK CRM Team)
