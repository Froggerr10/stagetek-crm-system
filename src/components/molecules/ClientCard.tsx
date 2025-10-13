import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import type { Client } from '@/types'

interface ClientCardProps { cliente: Client; onEdit: () => void; onDelete: () => void }

export default function ClientCard({ cliente, onEdit, onDelete }: ClientCardProps) {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-white">{cliente.name}</h3>
          <p className="text-sm text-gray-400">{cliente.cnpj || 'Sem CNPJ'}</p>
        </div>
        <Badge variant={cliente.status === 'active' ? 'success' : 'default'}>
          {cliente.status === 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      </div>
      <div className="space-y-1 mb-3">
        {cliente.email && <p className="text-sm text-gray-300">📧 {cliente.email}</p>}
        {cliente.phone && <p className="text-sm text-gray-300">📱 {cliente.phone}</p>}
      </div>
      <div className="flex justify-end space-x-3">
        <Button variant="ghost" size="sm" onClick={onEdit}>Editar</Button>
        <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-400 hover:text-red-300">Excluir</Button>
      </div>
    </div>
  )
}
