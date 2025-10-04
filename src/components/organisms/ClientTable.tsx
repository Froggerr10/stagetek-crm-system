import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import type { Organization } from '@/types'

interface ClientTableProps {
  clientes: Organization[]
  onEdit: (cliente: Organization) => void
  onDelete: (id: string) => void
}

export default function ClientTable({ clientes, onEdit, onDelete }: ClientTableProps) {
  if (clientes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
        Nenhum cliente encontrado
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CNPJ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indústria</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cliente.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.cnpj || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.industry || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant="success">{cliente.organizationType}</Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-4">
                <Button variant="ghost" size="sm" onClick={() => onEdit(cliente)}>Editar</Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(cliente.id)} className="text-red-600 hover:text-red-900">Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
