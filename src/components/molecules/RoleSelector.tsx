interface Role {
  value: 'admin' | 'manager' | 'user'
  label: string
  description: string
}

interface RoleSelectorProps {
  selectedRole: 'admin' | 'manager' | 'user'
  onChange: (role: 'admin' | 'manager' | 'user') => void
}

const ROLES: Role[] = [
  { value: 'admin', label: 'Administrador', description: 'Acesso total ao sistema' },
  { value: 'manager', label: 'Gestor', description: 'Pode visualizar e editar dados' },
  { value: 'user', label: 'Vendedor', description: 'Acesso limitado aos próprios clientes' }
]

export default function RoleSelector({ selectedRole, onChange }: RoleSelectorProps) {
  return (
    <div className="space-y-2">
      {ROLES.map(role => (
        <label
          key={role.value}
          className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
            selectedRole === role.value
              ? 'border-red-500 bg-red-500/10'
              : 'border-gray-700 bg-black hover:border-gray-600'
          }`}
        >
          <input
            type="radio"
            name="role"
            value={role.value}
            checked={selectedRole === role.value}
            onChange={e => onChange(e.target.value as 'admin' | 'manager' | 'user')}
            className="mt-1 w-4 h-4 text-red-600 border-gray-600 focus:ring-red-500"
          />
          <div className="flex-1">
            <div className="text-white font-medium">{role.label}</div>
            <div className="text-gray-400 text-sm">{role.description}</div>
          </div>
        </label>
      ))}
    </div>
  )
}
