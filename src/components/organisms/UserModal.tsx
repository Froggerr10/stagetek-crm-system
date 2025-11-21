import { useState, useEffect } from 'react'
import { X, AlertCircle } from 'lucide-react'
import { UserProfile, UserFormData } from '@/hooks/useUsers'
import RoleSelector from '@/components/molecules/RoleSelector'

interface UserModalProps {
  user: UserProfile | null
  onClose: () => void
  onSave: (data: UserFormData) => Promise<{ success: boolean }>
}

export default function UserModal({ user, onClose, onSave }: UserModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    full_name: '',
    role: 'user',
    password: ''
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        password: ''
      })
    }
  }, [user])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const result = await onSave(formData)
    setSaving(false)
    if (result.success) onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f0f0f] rounded-lg border border-gray-800 w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">
            {user ? 'Editar Usuário' : 'Novo Usuário'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {!user && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-400 text-sm font-medium mb-1">Criação limitada</p>
                <p className="text-gray-400 text-xs">Use Supabase Dashboard para auth completa.</p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">E-mail *</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
              required
              disabled={!!user}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nome *</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={e => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nível de Acesso *</label>
            <RoleSelector
              selectedRole={formData.role}
              onChange={role => setFormData({ ...formData, role })}
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {saving ? 'Salvando...' : user ? 'Atualizar' : 'Criar Usuário'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
