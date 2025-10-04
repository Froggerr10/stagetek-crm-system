# STAGETEK CRM - Mobile Architecture
**Protocol Notecraft™ Mobile-First Strategy**

---

## 🎯 Mobile Strategy: PWA (Progressive Web App)

### Por que PWA e não React Native?

| Critério | PWA | React Native |
|----------|-----|--------------|
| **Codebase** | 1 único (React) | 2 codebases (Web + Mobile) |
| **Deployment** | Instantâneo (git push) | App Store review (7-14 dias) |
| **Custos** | ZERO | $99/ano Apple + $25 Google |
| **Atualizações** | Automáticas | Precisa aprovar na store |
| **Distribuição** | URL (compartilhável) | Download store obrigatório |
| **Offline** | Service Worker | AsyncStorage |
| **Push Notifications** | Sim (via Service Worker) | Sim (nativo) |
| **Câmera/GPS** | Sim (Web APIs) | Sim (melhor integração) |
| **Performance** | 90-95% nativo | 95-98% nativo |

**Decisão**: **PWA** para MVP, avaliar React Native apenas se houver necessidade crítica de features nativas (ex: integração profunda com telefonia).

---

## 📱 Responsive Design Strategy

### Breakpoints (Mobile-First)

```css
/* Mobile First - Base styles são mobile */
.container {
  padding: var(--space-4); /* 16px mobile */
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: var(--space-6); /* 24px tablet */
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: var(--space-8); /* 32px desktop */
  }
}

/* Large Desktop */
@media (min-width: 1440px) {
  .container {
    max-width: 1280px;
    margin: 0 auto;
  }
}
```

### Tailwind Config (Mobile-First)
```javascript
// tailwind.config.js
export default {
  theme: {
    screens: {
      'sm': '640px',  // Mobile landscape
      'md': '768px',  // Tablet
      'lg': '1024px', // Desktop
      'xl': '1280px', // Large desktop
      '2xl': '1536px' // Extra large
    }
  }
}
```

---

## 🎨 Mobile UI Patterns

### 1. Navigation (Bottom Tab Bar)

**Desktop**: Sidebar lateral fixa
**Mobile**: Bottom navigation bar

```tsx
// components/organisms/BottomNav.tsx (≤50 linhas)
import { Home, Users, Briefcase, Calendar, Settings } from 'lucide-react';

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200
                    md:hidden z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16">
        <NavItem icon={Home} label="Início" to="/" />
        <NavItem icon={Briefcase} label="Funil" to="/funil" />
        <NavItem icon={Users} label="Clientes" to="/clientes" />
        <NavItem icon={Calendar} label="Eventos" to="/eventos" />
        <NavItem icon={Settings} label="Mais" to="/settings" />
      </div>
    </nav>
  );
};
```

**CSS para safe area (iPhone notch)**:
```css
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

### 2. Touch Gestures (Drag & Drop)

**Desktop**: Mouse drag-and-drop
**Mobile**: Touch drag + swipe gestures

```tsx
// Funil de Vendas - Mobile Touch
import { DndContext, TouchSensor, useSensor } from '@dnd-kit/core';

export const FunilVendas = () => {
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250, // 250ms hold antes de drag (evita scroll acidental)
      tolerance: 5 // 5px movimento permitido
    }
  });

  return (
    <DndContext sensors={[touchSensor]}>
      {/* Kanban columns */}
    </DndContext>
  );
};
```

**Swipe entre colunas** (alternativa ao drag):
```tsx
// Swipe left/right para mover card entre estágios
import { useSwipeable } from 'react-swipeable';

const OpportunityCard = ({ oportunidade, onMoveStage }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onMoveStage(oportunidade.id, 'next'),
    onSwipedRight: () => onMoveStage(oportunidade.id, 'prev'),
    trackMouse: false // Apenas touch
  });

  return (
    <div {...handlers} className="opportunity-card">
      {/* Card content */}
    </div>
  );
};
```

---

### 3. Forms (Multi-Step Mobile)

**Desktop**: Form longo em uma página
**Mobile**: Multi-step wizard

```tsx
// components/organisms/CotacaoForm.tsx
export const CotacaoFormMobile = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="mobile-form">
      {/* Progress Indicator */}
      <div className="flex justify-between mb-4">
        <StepDot active={step === 1} />
        <StepDot active={step === 2} />
        <StepDot active={step === 3} />
        <StepDot active={step === 4} />
      </div>

      {/* Step Content */}
      {step === 1 && <ClienteStep />}
      {step === 2 && <ProdutosStep />}
      {step === 3 && <FreteStep />}
      {step === 4 && <ResumoStep />}

      {/* Navigation */}
      <div className="flex gap-4 mt-6">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)}>Voltar</button>
        )}
        <button onClick={() => setStep(step + 1)}>
          {step === 4 ? 'Enviar' : 'Próximo'}
        </button>
      </div>
    </div>
  );
};
```

---

### 4. Modals (Full Screen Mobile)

**Desktop**: Modal 600px centered
**Mobile**: Full screen takeover

```css
/* Modal responsivo */
.modal {
  /* Desktop: modal centered */
  @apply fixed inset-0 flex items-center justify-center p-4;
}

.modal-content {
  /* Desktop: 600px max */
  @apply bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto;
}

/* Mobile: full screen */
@media (max-width: 768px) {
  .modal-content {
    @apply max-w-none h-full rounded-none;
  }
}
```

---

### 5. Data Tables (Cards on Mobile)

**Desktop**: Table com colunas
**Mobile**: Lista de cards

```tsx
// components/organisms/ClientesTable.tsx
export const ClientesTable = ({ clientes }) => {
  return (
    <>
      {/* Desktop: Table */}
      <div className="hidden md:block">
        <table>
          <thead>...</thead>
          <tbody>...</tbody>
        </table>
      </div>

      {/* Mobile: Cards */}
      <div className="md:hidden space-y-4">
        {clientes.map(cliente => (
          <ClienteCard key={cliente.id} cliente={cliente} />
        ))}
      </div>
    </>
  );
};

const ClienteCard = ({ cliente }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm border">
    <div className="flex items-center gap-3 mb-3">
      <Avatar src={cliente.avatar} />
      <div>
        <h3 className="font-semibold">{cliente.nome}</h3>
        <p className="text-sm text-gray-500">{cliente.email}</p>
      </div>
    </div>
    <div className="flex gap-4 text-sm">
      <div>
        <span className="text-gray-500">Receita:</span>
        <span className="font-medium ml-1">
          {formatCurrency(cliente.revenue)}
        </span>
      </div>
      <div>
        <span className="text-gray-500">Eventos:</span>
        <span className="font-medium ml-1">{cliente.events}</span>
      </div>
    </div>
  </div>
);
```

---

## 🔧 PWA Configuration

### 1. Manifest (manifest.json)

```json
{
  "name": "STAGETEK CRM",
  "short_name": "STAGETEK",
  "description": "CRM profissional para gestão de vendas B2B",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#e90101",
  "background_color": "#ffffff",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

---

### 2. Service Worker (Offline Support)

```typescript
// service-worker.ts
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache assets (HTML, CSS, JS)
precacheAndRoute(self.__WB_MANIFEST);

// API calls: Network First (se offline, usa cache)
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60 // 5 minutos
      })
    ]
  })
);

// Images: Cache First (se cache, não busca rede)
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 dias
      })
    ]
  })
);

// Fonts: Stale While Revalidate
registerRoute(
  ({ request }) => request.destination === 'font',
  new StaleWhileRevalidate({
    cacheName: 'fonts-cache'
  })
);
```

---

### 3. Push Notifications

```typescript
// utils/pushNotifications.ts
export async function subscribeToPushNotifications() {
  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(process.env.VITE_VAPID_PUBLIC_KEY!)
  });

  // Enviar subscription para backend
  await fetch('/api/push/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription)
  });
}

// Service Worker: Receber notificação
self.addEventListener('push', (event) => {
  const data = event.data?.json();

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      data: { url: data.url }
    })
  );
});

// Service Worker: Click na notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
```

---

## 📊 Performance Optimization (Mobile)

### 1. Bundle Size Optimization

```typescript
// vite.config.ts
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'charts': ['recharts'],
          'forms': ['react-hook-form', 'zod']
        }
      }
    }
  }
};
```

**Meta**: Bundle total <500KB gzipped

---

### 2. Lazy Loading Routes

```tsx
// App.tsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const FunilVendas = lazy(() => import('./pages/FunilVendas'));
const Clientes = lazy(() => import('./pages/Clientes'));

export const App = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/funil" element={<FunilVendas />} />
      <Route path="/clientes" element={<Clientes />} />
    </Routes>
  </Suspense>
);
```

---

### 3. Image Optimization

```tsx
// components/atoms/OptimizedImage.tsx
export const OptimizedImage = ({ src, alt, width, height }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      srcSet={`
        ${src}?w=400 400w,
        ${src}?w=800 800w,
        ${src}?w=1200 1200w
      `}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
};
```

---

### 4. Virtual Scrolling (Listas longas)

```tsx
// Para listas com 100+ itens
import { useVirtualizer } from '@tanstack/react-virtual';

export const ClientesList = ({ clientes }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: clientes.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80 // Altura estimada do item
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`
            }}
          >
            <ClienteCard cliente={clientes[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 🧪 Testing Mobile

### 1. Responsive Testing
```bash
# Chrome DevTools
- F12 → Toggle Device Toolbar (Ctrl+Shift+M)
- Testar: iPhone 14 Pro, Samsung Galaxy S21, iPad Pro

# Ferramentas
- BrowserStack (pago, mas tem trial)
- LambdaTest (pago)
- Sauce Labs (pago)

# Grátis
- Testar em devices físicos (iOS + Android)
```

---

### 2. Touch Gestures Testing
```typescript
// Simular touch events em testes
import { fireEvent } from '@testing-library/react';

test('swipe card to next stage', () => {
  const { getByTestId } = render(<OpportunityCard />);
  const card = getByTestId('opportunity-card');

  fireEvent.touchStart(card, { touches: [{ clientX: 100, clientY: 0 }] });
  fireEvent.touchMove(card, { touches: [{ clientX: 0, clientY: 0 }] });
  fireEvent.touchEnd(card);

  expect(mockMoveStage).toHaveBeenCalledWith('next');
});
```

---

### 3. Performance Testing (Lighthouse CI)

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://staging.stagetek-crm.vercel.app
            https://staging.stagetek-crm.vercel.app/funil
          uploadArtifacts: true
```

**Metas Lighthouse Mobile**:
- Performance: >85
- Accessibility: >95
- Best Practices: >95
- SEO: >90
- PWA: 100

---

## 📲 Mobile-Specific Features

### 1. Vibration API (Feedback háptico)
```typescript
// Vibrar ao mover card no Kanban
const handleDragEnd = (event) => {
  if (window.navigator.vibrate) {
    navigator.vibrate(50); // 50ms vibração
  }
  // ... lógica de drop
};
```

---

### 2. Share API (Compartilhar cotação)
```typescript
// Compartilhar cotação via WhatsApp, Email, etc.
const handleShare = async (cotacao) => {
  if (navigator.share) {
    await navigator.share({
      title: `Cotação #${cotacao.numero}`,
      text: `Confira a cotação para ${cotacao.cliente.nome}`,
      url: `https://crm.stagetek.com/cotacoes/${cotacao.id}`
    });
  } else {
    // Fallback: copiar link
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copiado!');
  }
};
```

---

### 3. Network Status (Offline/Online)
```typescript
// Mostrar banner quando offline
export const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 z-50">
      Você está offline. Algumas funcionalidades estão limitadas.
    </div>
  );
};
```

---

## 🎯 Mobile UX Best Practices

### 1. Touch Targets (Mínimo 44x44px)
```css
/* Botões e links devem ter no mínimo 44x44px */
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}

.nav-item {
  min-height: 44px;
  padding: 12px;
}
```

---

### 2. Input Types (Keyboard correto)
```tsx
<input type="email" inputMode="email" /> {/* Teclado com @ */}
<input type="tel" inputMode="tel" />     {/* Teclado numérico */}
<input type="text" inputMode="numeric" /> {/* Apenas números */}
<input type="url" inputMode="url" />     {/* Teclado com .com */}
```

---

### 3. Scroll Snap (Listas horizontais)
```css
.horizontal-scroll {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.horizontal-scroll > * {
  scroll-snap-align: start;
  flex-shrink: 0;
}
```

---

### 4. Pull-to-Refresh
```typescript
// Implementar pull-to-refresh nativo
import { usePullToRefresh } from 'use-pull-to-refresh';

export const Dashboard = () => {
  const { isRefreshing, pullDownRef } = usePullToRefresh({
    onRefresh: async () => {
      await refetchData();
    }
  });

  return (
    <div ref={pullDownRef}>
      {isRefreshing && <LoadingSpinner />}
      {/* Conteúdo */}
    </div>
  );
};
```

---

## 🚀 Deployment Mobile

### Vercel Headers (PWA)
```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/service-worker.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/manifest.json",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/manifest+json"
        }
      ]
    }
  ]
}
```

---

## 📋 Mobile Testing Checklist

Antes de lançar cada feature, testar:

- [ ] iOS Safari (iPhone 12+)
- [ ] Android Chrome (Samsung Galaxy S21+)
- [ ] Gestures (swipe, pinch, long-press)
- [ ] Keyboard types (email, tel, numeric)
- [ ] Touch targets (mínimo 44x44px)
- [ ] Offline mode (Service Worker)
- [ ] Push notifications
- [ ] Add to Home Screen
- [ ] Landscape mode
- [ ] Safe areas (iPhone notch)
- [ ] Performance (Lighthouse >85)
- [ ] Battery usage (não deve drenar)

---

**Built with Protocol Notecraft™**
**STAGETEK Engineering Team**
**Data**: 01 de Outubro de 2025
