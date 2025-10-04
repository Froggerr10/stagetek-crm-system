import { useState } from 'react'
import { Search, Bell, HelpCircle, Grid3x3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import NavLink from '@/components/molecules/NavLink'
import UserMenu from '@/components/molecules/UserMenu'

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="h-16 bg-[rgba(255,255,255,0.08)] backdrop-blur-md border-b border-white/15 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Logo */}
      <Link to="/dashboard" className="flex items-center">
        <img src="/logo-white.svg" alt="STAGETEK" className="h-12" />
      </Link>

      {/* Toda a barra à direita */}
      <div className="flex items-center gap-4">
        {/* Menu */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/dashboard" label="Dashboard" />
          <NavLink to="/oportunidades" label="Oportunidades" />
          <NavLink to="/clientes" label="Clientes" />
          <NavLink to="/contatos" label="Contatos" />
          <NavLink to="/tarefas" label="Tarefas" badge={12} />
          <NavLink to="/analisar" label="Analisar" />
        </nav>

        <div className="relative hidden md:block">
          <input
            type="search"
            placeholder="Buscar..."
            className="w-64 h-10 bg-white/8 border border-white/15 rounded-lg pl-10 pr-4 text-white text-base placeholder:text-gray-500 focus:outline-none focus:border-[#e90101] transition-colors"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>

        <button className="relative p-3 text-gray-300 hover:text-white transition-colors" aria-label="Notifica��es">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#e90101] rounded-full" />
        </button>

        <button className="p-3 text-gray-300 hover:text-white transition-colors" aria-label="Ajuda">
          <HelpCircle className="w-5 h-5" />
        </button>

        <button className="p-3 text-gray-300 hover:text-white transition-colors" aria-label="Apps">
          <Grid3x3 className="w-5 h-5" />
        </button>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-11 h-11 bg-gradient-to-br from-[#e90101] to-[#c10101] rounded-full flex items-center justify-center text-white text-sm font-semibold hover:shadow-lg transition"
          >
            MB
          </button>
          <UserMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
      </div>
    </div>
  )
}
