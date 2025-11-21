import { useState } from 'react'
import { Users, Plus, Edit2, Trash2, Shield, User as UserIcon } from 'lucide-react'
import { useUsers } from '@/hooks/useUsers'
import UserModal from '@/components/organisms/UserModal'
import Spinner from '@/components/atoms/Spinner'

const ROLE_LABELS = {
  admin: { label: 'Administrador', color: 'red', icon: Shield },
  manager: { label: 'Gestor', color: 'blue', icon: Shield },
  user: { label: 'Vendedor', color: 'gray', icon: UserIcon }
}

export default function ConfigUsuarios() {
  const { users, loading, createUser, updateUser, deleteUser } = useUsers()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  function handleNew() {
    setEditingUser(null)
    setModalOpen(true)
  }

  function handleEdit(user) {
    setEditingUser(user)
    setModalOpen(true)
  }

  async function handleSave(formData) {
    if (editingUser) {
      return await updateUser(editingUser.id, formData)
    } else {
      return await createUser(formData)
    }
  }

  async function handleDelete(id) {
    if (confirm('Tem certeza que deseja excluir este usuário? Esta ação é irreversível.')) {
      await deleteUser(id)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Users className="w-8 h-8" />
              Usuários
            </h1>
            <p className="text-gray-400 mt-2">
              {users.length} usuários cadastrados (máximo 5)
            </p>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            disabled={users.length >= 5}
          >
            <Plus className="w-5 h-5" />
            Novo Usuário
          </button>
        </div>

        {users.length === 0 ? (
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-12 text-center">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Nenhum usuário encontrado
            </h3>
            <p className="text-gray-400 mb-6">
              Comece adicionando o primeiro usuário ao sistema.
            </p>
            <button
              onClick={handleNew}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Plus className="w-5 h-5" />
              Adicionar Usuário
            </button>
          </div>
        ) : (
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">E-mail</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Nível de Acesso</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Cadastrado em</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.map(user => {
                  const roleInfo = ROLE_LABELS[user.role]
                  const RoleIcon = roleInfo.icon
                  return (
                    <tr key={user.id} className="hover:bg-gray-800/30">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-semibold">
                            {user.full_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{user.full_name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-${roleInfo.color}-500/10 text-${roleInfo.color}-400 border border-${roleInfo.color}-500/30`}>
                          <RoleIcon className="w-3 h-3" />
                          {roleInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(user.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-right text-sm">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <h3 className="text-yellow-400 font-semibold mb-2">Níveis de Acesso</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li><strong className="text-red-400">Administrador:</strong> Acesso total ao sistema</li>
            <li><strong className="text-blue-400">Gestor:</strong> Pode visualizar e editar dados</li>
            <li><strong className="text-gray-400">Vendedor:</strong> Acesso limitado aos próprios clientes</li>
          </ul>
        </div>
      </div>

      {modalOpen && (
        <UserModal
          user={editingUser}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
