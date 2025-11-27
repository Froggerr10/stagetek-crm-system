import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Target, Briefcase, Users, Menu } from 'lucide-react'

interface MobileBottomNavProps {
  onMenuClick: () => void
}

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/funil', icon: Target, label: 'Funil' },
  { to: '/oportunidades', icon: Briefcase, label: 'Oportunidades' },
  { to: '/clientes', icon: Users, label: 'Clientes' },
]

export default function MobileBottomNav({ onMenuClick }: MobileBottomNavProps) {
  const location = useLocation()
  const isActive = (path: string) => path === '/dashboard' ? location.pathname === '/dashboard' : location.pathname.startsWith(path)

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[rgba(20,20,20,0.95)] backdrop-blur-lg border-t border-white/15 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ to, icon: Icon, label }) => (
          <Link key={to} to={to} className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${isActive(to) ? 'text-[#e90101]' : 'text-gray-400 hover:text-gray-200'}`}>
            <Icon className={`w-6 h-6 ${isActive(to) ? 'scale-110' : ''} transition-transform`} />
            <span className="text-xs font-medium">{label}</span>
            {isActive(to) && <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#e90101]" />}
          </Link>
        ))}
        <button onClick={onMenuClick} className="flex flex-col items-center justify-center gap-1 flex-1 h-full text-gray-400 hover:text-gray-200 transition-colors">
          <Menu className="w-6 h-6" />
          <span className="text-xs font-medium">Menu</span>
        </button>
      </div>
    </nav>
  )
}
