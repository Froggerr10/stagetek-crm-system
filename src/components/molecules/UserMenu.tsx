import { Link } from 'react-router-dom'
import { User, Settings, LogOut } from 'lucide-react'

interface UserMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserMenu({ isOpen, onClose }: UserMenuProps) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-14 w-64 bg-[rgba(20,20,20,0.95)] backdrop-blur-lg border border-white/15 rounded-lg shadow-2xl z-50">
        <div className="p-4 border-b border-white/10">
          <p className="text-white font-semibold">Mario Becker</p>
          <p className="text-xs text-gray-400">Conta STAGETEK PRO</p>
        </div>

        <div className="py-2">
          <Link to="/perfil" onClick={onClose} className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/5 hover:text-white transition">
            <User className="w-4 h-4" />
            <span className="text-sm">Meu perfil</span>
          </Link>
          <Link to="/configuracoes" onClick={onClose} className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/5 hover:text-white transition">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Configurações da conta</span>
          </Link>
        </div>

        <div className="border-t border-white/10 py-2">
          <button onClick={onClose} className="flex items-center gap-3 px-4 py-2 w-full text-red-400 hover:bg-white/5 transition">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sair</span>
          </button>
        </div>
      </div>
    </>
  )
}
