import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import DashboardApple from '@/pages/DashboardApple'
import Clientes from '@/pages/Clientes'
import Oportunidades from '@/pages/Oportunidades'
import DetalheOportunidade from '@/pages/DetalheOportunidade'
import NovaCotacao from '@/pages/NovaCotacao'
import Funil from '@/pages/Funil'
import Configuracoes from '@/pages/Configuracoes'
import ConfigFunis from '@/pages/ConfigFunis'
import MainLayout from '@/components/layouts/MainLayout'
import ProtectedRoute from '@/components/layouts/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
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
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="oportunidades" element={<Oportunidades />} />
          <Route path="oportunidades/:id" element={<DetalheOportunidade />} />
          <Route path="oportunidades/:opportunityId/cotacao/nova" element={<NovaCotacao />} />
          <Route path="cotacao/nova" element={<NovaCotacao />} />
          <Route path="funil" element={<Funil />} />
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
          <Route path="usuarios" element={<div className="p-8"><h1 className="text-3xl font-bold text-white">Usuários</h1><p className="text-gray-400 mt-2">Em desenvolvimento...</p></div>} />
          <Route path="integracoes" element={<div className="p-8"><h1 className="text-3xl font-bold text-white">Integrações</h1><p className="text-gray-400 mt-2">Em desenvolvimento...</p></div>} />
        </Route>

        <Route
          path="/dashboard-apple"
          element={
            <ProtectedRoute>
              <DashboardApple />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
