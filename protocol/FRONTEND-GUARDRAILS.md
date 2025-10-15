FRONTEND GUARDRAILS — STAGETEK (UI/UX)
- Usar APENAS shadcn/ui + Tailwind (nada de <button>, <input>, <select>, <img>, <a> crus fora de atoms).
- Atomic Design + Notecraft: Atoms ≤20l, Molecules ≤35l, Organisms ≤50l, Templates ≤30l.
- Zero inline style; usar Tailwind + CSS vars STAGETEK.
- Mobile-first obrigatório; checar classes sm/md/lg/xl e touch targets ≥44px.
- Listas com rolagem: `overflow-auto` + `scrollbar-thin` + cores STAGETEK.
- Tipografia: `leading-tight` em títulos/linhas compactas.
- Forms: React Hook Form + Zod; Estado: Zustand; Charts: Recharts.
- Acessibilidade: aria-*, foco visível, labels associadas.
- Performance: evitar re-render (memo/useCallback) e imagens otimizadas.
