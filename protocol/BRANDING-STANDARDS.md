# STAGETEK Branding Standards
**Protocol Notecraft™ Compliance**

## 📏 Logo Dimensions

### Navbar Logo (Navegação)
```html
<img src="./public/assets/logos/SVG/STAGETEK_logo-11.svg"
     alt="STAGETEK"
     class="stagetek-logo"
     style="height: 32px; width: auto;">
```
- **Altura**: 32px
- **Largura**: Auto (manter proporção)
- **Posição**: Navbar esquerda
- **Uso**: Todas as páginas de navegação

### Hero Logo (Página Inicial)
```html
<img src="./public/assets/logos/SVG/STAGETEK_logo-11.svg"
     alt="STAGETEK"
     class="stagetek-logo"
     style="height: 120px; width: auto; margin: 0 auto; display: block;">
```
- **Altura**: 120px
- **Largura**: Auto (manter proporção)
- **Posição**: Centro da página
- **Uso**: Hero sections, páginas de demonstração

### Footer Logo
```html
<img src="./public/assets/logos/SVG/STAGETEK_logo-11.svg"
     alt="STAGETEK"
     class="stagetek-logo"
     style="height: 24px; width: auto;">
```
- **Altura**: 24px
- **Largura**: Auto (manter proporção)
- **Posição**: Footer
- **Uso**: Rodapés de todas as páginas

## 🎨 Theme Adaptation

### CSS Obrigatório
```css
/* Logo preto no light mode, branco no dark mode */
.stagetek-logo {
    filter: brightness(0) saturate(100%);
}

[data-theme="dark"] .stagetek-logo {
    filter: brightness(0) saturate(100%) invert(1);
}
```

### Comportamento
- **Light Mode**: Logo preto (#000000)
- **Dark Mode**: Logo branco (#FFFFFF)
- **Transição**: Automática via CSS filter

## 🌓 Dark Mode Toggle

### Posicionamento

**Páginas COM Navbar**: Integrar dentro da navbar (não fixed)
```html
<nav class="navbar">
    <div class="navbar-content">
        <a href="#" class="navbar-brand">...</a>
        <div style="display: flex; align-items: center; gap: var(--space-6);">
            <ul class="navbar-nav">...</ul>
            <button id="dark-mode-toggle" class="btn btn-outline"
                    style="display: flex; align-items: center; gap: var(--space-2);"
                    aria-label="Toggle dark mode">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <span>Theme</span>
            </button>
        </div>
    </div>
</nav>
```

**Páginas SEM Navbar**: Usar posição fixed
```html
<button id="dark-mode-toggle" class="btn btn-outline"
        style="position: fixed; top: 20px; right: 20px; z-index: 1000; display: flex; align-items: center; gap: var(--space-2);"
        aria-label="Toggle dark mode">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
    <span>Theme</span>
</button>
```

### JavaScript Obrigatório
```javascript
(function() {
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('stagetek-theme') || 'light';

    html.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    function updateToggleIcon(theme) {
        const svg = toggleBtn.querySelector('svg');
        const span = toggleBtn.querySelector('span');
        if (theme === 'dark') {
            // Sun icon
            svg.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
            span.textContent = 'Light';
        } else {
            // Moon icon
            svg.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
            span.textContent = 'Dark';
        }
    }

    toggleBtn.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('stagetek-theme', newTheme);
        updateToggleIcon(newTheme);
    });
})();
```

### Comportamento do Ícone
- **Light Mode**: Ícone SVG de lua + `<span>Dark</span>`
- **Dark Mode**: Ícone SVG de sol + `<span>Light</span>`
- **Storage**: localStorage com chave `stagetek-theme`
- **ID Padronizado**: `id="dark-mode-toggle"` (NUNCA usar `themeToggle` ou outros IDs)
- **Classes**: `class="btn btn-outline"`

## 📝 Footer Padrão

### Texto Obrigatório
```html
Built with ❤️ following <span style="color: var(--stagetek-red-primary); font-weight: var(--font-weight-medium);">Protocol Notecraft™</span> by STAGETEK Engineering Team
```

### HTML Completo
```html
<footer class="footer">
    <div class="container">
        <div style="border-top: 1px solid var(--border-color); padding-top: var(--space-6); text-align: center;">
            <p class="body-small" style="color: var(--stagetek-gray);">
                Built with <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin: 0 4px;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> following <span style="color: var(--stagetek-red-primary); font-weight: var(--font-weight-medium);">Protocol Notecraft™</span> by STAGETEK Engineering Team
            </p>
        </div>
    </div>
</footer>
```

## 🚫 Proibições

### ❌ NÃO USE
- Emojis como ícones (🚀, 🔒, ⚡, etc.)
- Logos com tamanhos aleatórios
- Cores sólidas chapadas em backgrounds de ícones
- Texto de footer inventado/diferente
- Ícones de tema estáticos
- Múltiplas chaves localStorage diferentes

### ✅ USE SEMPRE
- Ícones SVG profissionais (Feather Icons style)
- Tamanhos de logo padronizados (32px navbar, 120px hero, 24px footer)
- Gradientes sutis com bordas para feature icons
- Texto de footer exato conforme especificado
- Ícone de tema dinâmico (lua/sol)
- Chave localStorage padrão: `stagetek-theme`

## 📦 Componente Reutilizável

Use o arquivo `stagetek-navbar.html` para incluir navbar padronizada:

```html
<!-- Include via fetch ou copy-paste -->
<script>
    fetch('stagetek-navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-container').innerHTML = html;
        });
</script>
```

## 📋 Checklist de Conformidade

Antes de publicar qualquer página HTML, verifique:

- [ ] Logo com altura correta (32px navbar, 120px hero, 24px footer)
- [ ] Logo com classe `.stagetek-logo`
- [ ] CSS de theme adaptation presente
- [ ] Dark mode toggle funcional com ícone dinâmico
- [ ] LocalStorage usando chave `stagetek-theme`
- [ ] Footer com texto Protocol Notecraft™ exato
- [ ] Zero emojis como ícones
- [ ] Ícones usando SVG profissional
- [ ] Feature icons sem cores chapadas

---

**Protocol Notecraft™ Compliance**
*Documentação atualizada: 2025-09-30*