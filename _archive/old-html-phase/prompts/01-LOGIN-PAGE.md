# Prompt: Login Page - STAGETEK CRM

**Arquivo destino**: `src/pages/Login.tsx`
**Prioridade**: P0 (MVP)
**Referência**: https://21st.dev/ruixenui/sign-in-form/default

---

## 📝 Prompt para Superdesign

```
Design a modern, professional B2B CRM login page for STAGETEK with:

Container:
- Centered vertically and horizontally on viewport
- Card component (max-width: 450px, rounded-lg, shadow-xl)
- White background (dark:bg-gray-900)
- Padding: 48px (p-12)

Header:
- Logo STAGETEK (text-based, font-bold, text-3xl, color: #e90101)
- Tagline: "Sistema de Gestão Comercial B2B" (text-sm, text-gray-600 dark:text-gray-400, mt-2)
- Divider line (border-b, mt-6, mb-8)

OAuth Section:
- Label: "Acesso rápido" (text-sm, font-medium, mb-4)
- Button: "Continuar com Google" (full width, white bg, border-gray-300, rounded-md, h-11)
  * Google icon (from lucide-react or custom SVG, left side)
  * Text: "Continuar com Google" (centered)
  * Hover: bg-gray-50
  * Shadow: shadow-sm

Divider:
- Centered text: "OU" (text-sm, text-gray-500, my-6)
- Lines on both sides (border-t)

Email & Password Form:
- Label: "E-mail" (text-sm, font-medium, mb-2)
- Email Input:
  * Icon: Mail (lucide-react, left, gray-400)
  * Placeholder: "seu@email.com"
  * Type: email
  * Border: border-gray-300 (focus: ring-2 ring-[#e90101])
  * Rounded: rounded-md
  * Height: h-11
  * Padding-left to account for icon: pl-10

- Label: "Senha" (text-sm, font-medium, mt-4, mb-2)
- Password Input:
  * Icon: Lock (lucide-react, left, gray-400)
  * Placeholder: "Sua senha"
  * Type: password (with toggle to text)
  * Eye icon (right side) for show/hide password
  * Border: border-gray-300 (focus: ring-2 ring-[#e90101])
  * Rounded: rounded-md
  * Height: h-11
  * Padding: pl-10 pr-10

Remember & Forgot Row:
- Flex row (justify-between, items-center, mt-4)
- Left: Checkbox + Label "Lembrar de mim" (text-sm, text-gray-700)
- Right: Link "Esqueceu a senha?" (text-sm, text-[#e90101], hover:underline)

Primary Action:
- Button: "Entrar" (full width, h-11, rounded-md, mt-6)
  * Background: bg-[#e90101]
  * Text: white, font-medium
  * Hover: bg-[#c10101]
  * Focus: ring-2 ring-[#e90101] ring-offset-2
  * Transition: all 150ms

Sign Up Prompt:
- Text: "Não tem conta?" (text-sm, text-gray-600, text-center, mt-6)
- Link: "Solicite acesso" (text-[#e90101], font-medium, hover:underline)

Footer:
- Separator (border-t, mt-8, pt-6)
- Text: "Built with Protocol Notecraft™" (text-xs, text-gray-500, text-center)

Design System:
- STAGETEK Primary: #e90101
- STAGETEK Hover: #c10101
- Font: Inter, -apple-system, sans-serif
- Spacing: Tailwind scale (4px base)
- Border radius: rounded-md (6px)

Dark Mode:
- bg-white → dark:bg-gray-900
- text-gray-900 → dark:text-gray-100
- border-gray-300 → dark:border-gray-700
- Card shadow darker in dark mode

Responsive:
- Mobile (default): padding p-6, max-width 95vw
- Tablet/Desktop (md:): padding p-12, max-width 450px

Accessibility:
- All inputs have proper labels (htmlFor)
- Focus visible states (ring)
- ARIA labels for icon buttons
- Tab navigation order
- Screen reader support

Tech Stack:
- React 18 + TypeScript
- Tailwind CSS 3.4 (NO custom CSS)
- shadcn/ui components: Button, Input, Checkbox, Card
- Lucide React icons: Mail, Lock, Eye, EyeOff
- React Hook Form (mention in comments, not implemented yet)
- Zod validation (mention in comments, not implemented yet)

OAuth Integration:
- Supabase Auth (mention in comments)
- Google OAuth (configured in Supabase dashboard)

States:
- Default state (as described above)
- Focus states (ring-2 ring-[#e90101])
- Hover states (button bg change, link underline)
- Error state (not shown in this version, add comment for future)
- Loading state (not shown, add comment for future)

No backend integration yet (static UI only).
No form validation logic yet (add TODO comments).
No error handling yet (add TODO comments).
Only Tailwind classes, no custom CSS.
```

---

## 📋 Checklist Pós-Geração

Após Superdesign gerar o código, verificar:

- [ ] STAGETEK red (#e90101) usado como primário
- [ ] Botão "Continuar com Google" presente
- [ ] Input password tem ícone show/hide funcional
- [ ] Dark mode completo (todos os elementos)
- [ ] Mobile responsivo (testar em 375px)
- [ ] Focus states visíveis (ring-2)
- [ ] Ícones Lucide React (não emojis)
- [ ] TypeScript (todos os tipos corretos)
- [ ] Sem CSS custom (apenas Tailwind)
- [ ] Componentes shadcn/ui (Button, Input)
- [ ] Footer "Protocol Notecraft™" presente

---

## 🎨 Variações (Futuras)

### **V2: Com Ilustração**
- Adicionar ilustração lateral (split layout)
- 50% formulário, 50% imagem/ilustração

### **V3: Com 2FA**
- Adicionar campo de código 2FA
- Timer de reenvio de código

### **V4: SSO Enterprise**
- Adicionar mais OAuth providers (Microsoft, Apple)
- Login com SSO corporativo

---

## 🔗 Referências

- Design inspiração: https://21st.dev/ruixenui/sign-in-form/default
- RD Station Analysis: `/protocol/RD-STATION-ANALYSIS.md`
- STAGETEK Branding: `/protocol/BRANDING-STANDARDS.md`
- Supabase Auth: https://supabase.com/docs/guides/auth/social-login/auth-google

---

**Built with ❤️ following Protocol Notecraft™**
**STAGETEK Engineering Team**
