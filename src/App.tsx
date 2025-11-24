import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from '@/pages/Login'
import Clientes from '@/pages/Clientes'
import Oportunidades from '@/pages/Oportunidades'
import DetalheOportunidade from '@/pages/DetalheOportunidade'
import Configuracoes from '@/pages/Configuracoes'
import ConfigFunis from '@/pages/ConfigFunis'
import ConfigUsuarios from '@/pages/ConfigUsuarios'
import ConfigProdutos from '@/pages/ConfigProdutos'
import Perfil from '@/pages/Perfil'
import MainLayout from '@/components/layouts/MainLayout'
import ProtectedRoute from '@/components/layouts/ProtectedRoute'
import PageViewTracker from '@/components/atoms/PageViewTracker'

// Lazy load heavy pages
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const DashboardApple = lazy(() => import('@/pages/DashboardApple'))
const NovaCotacao = lazy(() => import('@/pages/NovaCotacao'))
const Cotacoes = lazy(() => import('@/pages/Cotacoes'))
const Funil = lazy(() => import('@/pages/Funil'))

const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500" />
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <PageViewTracker />
      <Toaster position="top-right" toastOptions={{
        style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' },
        success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
        error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
      }} />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="oportunidades" element={<Oportunidades />} />
          <Route path="oportunidades/:id" element={<DetalheOportunidade />} />
          <Route path="oportunidades/:opportunityId/cotacao/nova" element={<Suspense fallback={<PageLoader />}><NovaCotacao /></Suspense>} />
          <Route path="cotacao/nova" element={<Suspense fallback={<PageLoader />}><NovaCotacao /></Suspense>} />
          <Route path="cotacoes" element={<Suspense fallback={<PageLoader />}><Cotacoes /></Suspense>} />
          <Route path="funil" element={<Suspense fallback={<PageLoader />}><Funil /></Suspense>} />
          <Route path="perfil" element={<Perfil />} />
        </Route>

        <Route
          path="/configuracoes"
          element={
            <ProtectedRoute>
              <Configuracoes />
            </ProtectedRoute>
          }
        >
          <Route path="funis" element={<ConfigFunis />} />
          <Route path="usuarios" element={<ConfigUsuarios />} />
          <Route path="produtos" element={<ConfigProdutos />} />
          <Route path="integracoes" element={<div className="p-8"><h1 className="text-3xl font-bold text-white">Integrações</h1><p className="text-gray-400 mt-4">Conecte ferramentas externas ao seu CRM.</p></div>} />
        </Route>

        <Route
          path="/dashboard-apple"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}><DashboardApple /></Suspense>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
