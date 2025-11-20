import Badge from '@/components/molecules/Badge'
import Button from '@/components/molecules/Button'
import { maskEmail, maskPhone, maskCNPJ } from '@/lib/utils'
import type { Client } from '@/types'

interface ClientTableRowProps {
  cliente: Client
  onEdit: (cliente: Client) => void
  onDelete: (id: string) => void
}

export default function ClientTableRow({ cliente, onEdit, onDelete }: ClientTableRowProps) {
  const td = "px-6 py-4 whitespace-nowrap text-sm"

  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className={`${td} font-medium text-white`}>{cliente.name}</td>
      <td className={`${td} text-gray-300`} title={cliente.cnpj || '-'}>{cliente.cnpj ? maskCNPJ(cliente.cnpj) : '-'}</td>
      <td className={`${td} text-gray-300`} title={cliente.email || '-'}>{cliente.email ? maskEmail(cliente.email) : '-'}</td>
      <td className={`${td} text-gray-300`} title={cliente.phone || '-'}>{cliente.phone ? maskPhone(cliente.phone) : '-'}</td>
      <td className={td}>
        <Badge variant={cliente.status === 'active' ? 'success' : 'default'}>
          {cliente.status === 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      </td>
      <td className={`${td} text-right space-x-4`}>
        <Button variant="outline" size="sm" onClick={() => onEdit(cliente)}>Editar</Button>
        <Button variant="outline" size="sm" onClick={() => onDelete(cliente.id)} className="text-red-400 hover:text-red-300 border-red-500/30 hover:bg-red-950/50">Excluir</Button>
      </td>
    </tr>
  )
}
