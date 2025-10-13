import { Link, useNavigate } from 'react-router-dom'
import { User, Settings, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface UserMenuProps { isOpen: boolean; onClose: () => void }

export default function UserMenu({ isOpen, onClose }: UserMenuProps) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  if (!isOpen) return null
  const handleSignOut = async () => { try { await signOut(); onClose(); navigate('/login') } catch (error) { console.error('Erro ao fazer logout:', error) } }
  const menuItems = [{ to: '/perfil', icon: User, label: 'Meu perfil' }, { to: '/configuracoes', icon: Settings, label: 'Configurações da conta' }]
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-14 w-64 bg-[rgba(20,20,20,0.95)] backdrop-blur-lg border border-white/15 rounded-lg shadow-2xl z-50">
        <div className="p-4 border-b border-white/10">
          <p className="text-white font-semibold">{user?.email?.split('@')[0] || 'Usuário'}</p>
          <p className="text-xs text-gray-400 truncate">{user?.email || 'Conta STAGETEK'}</p>
        </div>
        <div className="py-2">
          {menuItems.map(({ to, icon: Icon, label }) => <Link key={to} to={to} onClick={onClose} className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/5 hover:text-white transition"><Icon className="w-4 h-4" /><span className="text-sm">{label}</span></Link>)}
        </div>
        <div className="border-t border-white/10 py-2">
          <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-2 w-full text-red-400 hover:bg-white/5 transition"><LogOut className="w-4 h-4" /><span className="text-sm">Sair</span></button>
        </div>
      </div>
    </>
  )
}
