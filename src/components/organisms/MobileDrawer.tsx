import { Link, useNavigate } from 'react-router-dom'
import { X, Bell, FileText, User, Settings, HelpCircle, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { to: '/notificacoes', icon: Bell, label: 'Notificações', badge: 3 },
  { to: '/cotacoes', icon: FileText, label: 'Cotações' },
  { to: '/perfil', icon: User, label: 'Meu Perfil' },
  { to: '/configuracoes', icon: Settings, label: 'Configurações' },
  { to: '/ajuda', icon: HelpCircle, label: 'Ajuda' },
]

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleSignOut = async () => {
    try {
      await signOut()
      onClose()
      navigate('/login')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <>
      <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-300" onClick={onClose} />
      <div className="md:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[rgba(20,20,20,0.98)] backdrop-blur-lg border-l border-white/15 z-50 animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div>
            <p className="text-white font-semibold text-sm">{user?.email?.split('@')[0] || 'Usuário'}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email || 'Conta STAGETEK'}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="py-2">
          {menuItems.map(({ to, icon: Icon, label, badge }) => (
            <Link key={to} to={to} onClick={onClose} className="flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
              </div>
              {badge && <span className="bg-[#e90101] text-white text-xs font-bold px-2 py-0.5 rounded-full">{badge}</span>}
            </Link>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
          <button onClick={handleSignOut} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-white/5 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </div>
    </>
  )
}
