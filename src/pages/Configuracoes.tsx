import { Link, Outlet, useLocation } from 'react-router-dom'
import { Workflow, Users, Plug } from 'lucide-react'
import TopBar from '@/components/organisms/TopBar'

export default function Configuracoes() {
  const location = useLocation()
  const isActive = (path: string) => location.pathname.includes(path)

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-black via-[#1a0505] to-black">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[rgba(255,255,255,0.05)] border-r border-white/10 p-4">
        <h2 className="text-xl font-bold text-white mb-6">Configurações</h2>
        <nav className="space-y-1">
          <Link to="/configuracoes/funis" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive('funis') ? 'bg-[#e90101] text-white' : 'text-gray-300 hover:bg-white/5'}`}>
            <Workflow className="w-5 h-5" />
            <span>Funis de vendas</span>
          </Link>
          <Link to="/configuracoes/usuarios" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive('usuarios') ? 'bg-[#e90101] text-white' : 'text-gray-300 hover:bg-white/5'}`}>
            <Users className="w-5 h-5" />
            <span>Usuários</span>
          </Link>
          <Link to="/configuracoes/integracoes" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive('integracoes') ? 'bg-[#e90101] text-white' : 'text-gray-300 hover:bg-white/5'}`}>
            <Plug className="w-5 h-5" />
            <span>Integrações</span>
          </Link>
        </nav>
      </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
