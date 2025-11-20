import Badge from '@/components/molecules/Badge'
import Button from '@/components/molecules/Button'
import { maskEmail, maskPhone, maskCNPJ } from '@/lib/utils'
import type { Client } from '@/types'
import { Edit, Trash2, Mail, Phone } from 'lucide-react'

interface ClientCardProps { cliente: Client; onEdit: () => void; onDelete: () => void }

export default function ClientCard({ cliente, onEdit, onDelete }: ClientCardProps) {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-white">{cliente.name}</h3>
          <p className="text-sm text-gray-400" title={cliente.cnpj || 'Sem CNPJ'}>{cliente.cnpj ? maskCNPJ(cliente.cnpj) : 'Sem CNPJ'}</p>
        </div>
        <Badge variant={cliente.status === 'active' ? 'success' : 'neutral'}>
          {cliente.status === 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      </div>
      <div className="space-y-1 mb-3">
        {cliente.email && (
          <p className="text-sm text-gray-300 flex items-center gap-2" title={cliente.email}>
            <Mail className="w-4 h-4 text-gray-400" />
            {maskEmail(cliente.email)}
          </p>
        )}
        {cliente.phone && (
          <p className="text-sm text-gray-300 flex items-center gap-2" title={cliente.phone}>
            <Phone className="w-4 h-4 text-gray-400" />
            {maskPhone(cliente.phone)}
          </p>
        )}
      </div>
      <div className="flex justify-end space-x-3">
        <Button variant="secondary" size="sm" onClick={onEdit}>
          <Edit className="w-4 h-4 mr-2" />Editar
        </Button>
        <Button variant="secondary" size="sm" onClick={onDelete} className="text-red-400 hover:text-red-300 hover:bg-red-950">
          <Trash2 className="w-4 h-4 mr-2" />Excluir
        </Button>
      </div>
    </div>
  )
}
