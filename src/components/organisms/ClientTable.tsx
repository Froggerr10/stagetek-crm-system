import ClientTableHeader from '@/components/molecules/ClientTableHeader'
import ClientTableRow from '@/components/molecules/ClientTableRow'
import type { Client } from '@/types'

interface ClientTableProps {
  clientes: Client[]
  onEdit: (cliente: Client) => void
  onDelete: (id: string) => void
}

export default function ClientTable({ clientes, onEdit, onDelete }: ClientTableProps) {
  if (clientes.length === 0) {
    return (
      <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg shadow-lg p-12 text-center text-gray-400">
        Nenhum cliente encontrado
      </div>
    )
  }

  return (
    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg shadow-lg overflow-hidden">
      <table className="w-full">
        <ClientTableHeader />
        <tbody className="divide-y divide-white/10">
          {clientes.map((cliente) => (
            <ClientTableRow key={cliente.id} cliente={cliente} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
