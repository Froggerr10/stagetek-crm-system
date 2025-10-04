import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import type { Organization } from '@/types'

interface ClientCardProps {
  cliente: Organization
  onEdit: () => void
  onDelete: () => void
}

export default function ClientCard({ cliente, onEdit, onDelete }: ClientCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{cliente.name}</h3>
          <p className="text-sm text-gray-500">{cliente.cnpj || '-'}</p>
        </div>
        <Badge variant="success">{cliente.organizationType}</Badge>
      </div>
      <p className="text-sm text-gray-600 mb-3">{cliente.industry || '-'}</p>
      <div className="flex justify-end space-x-3">
        <Button variant="ghost" size="sm" onClick={onEdit}>Editar</Button>
        <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-600 hover:text-red-900">
          Excluir
        </Button>
      </div>
    </div>
  )
}
