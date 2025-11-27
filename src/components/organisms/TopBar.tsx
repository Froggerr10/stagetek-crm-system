import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import NavLink from '@/components/molecules/NavLink'
import SearchBar from '@/components/molecules/SearchBar'
import TopBarActions from '@/components/molecules/TopBarActions'
import UserMenu from '@/components/molecules/UserMenu'

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="h-16 bg-[rgba(255,255,255,0.08)] backdrop-blur-md border-b border-white/15 flex items-center justify-between px-6 sticky top-0 z-40">
      <Link to="/dashboard" className="flex items-center">
        <img src="/logo-white.svg" alt="STAGETEK" className="h-12" />
      </Link>

      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/dashboard" label="Dashboard" active={location.pathname === '/dashboard'} />
          <NavLink to="/funil" label="Funil" active={location.pathname.startsWith('/funil')} />
          <NavLink to="/oportunidades" label="Oportunidades" active={location.pathname.startsWith('/oportunidades')} />
          <NavLink to="/clientes" label="Clientes" active={location.pathname.startsWith('/clientes')} />
        </nav>

        <div className="hidden md:block md:w-64">
          <SearchBar value="" onChange={() => {}} placeholder="Buscar..." className="h-10" />
        </div>

        <div className="hidden md:flex items-center gap-0">
          <TopBarActions />
        </div>

        <div className="relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-11 h-11 bg-gradient-to-br from-[#e90101] to-[#c10101] rounded-full flex items-center justify-center text-white text-sm font-semibold hover:shadow-lg transition">
            MB
          </button>
          <UserMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
      </div>
    </div>
  )
}
