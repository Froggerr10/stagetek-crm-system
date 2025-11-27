import { useState, useEffect } from 'react'
import { useClientes } from '@/hooks/useClientes'
import _toast from 'react-hot-toast'
import { useConfirm } from '@/hooks/useConfirm'
import type { Client } from '@/types'
import Button from '@/components/molecules/Button'
import Spinner from '@/components/atoms/Spinner'
import Select from '@/components/molecules/Select'
import SearchBar from '@/components/molecules/SearchBar'
import ClientCard from '@/components/molecules/ClientCard'
import ClientTable from '@/components/organisms/ClientTable'
import ClienteModal from '@/components/organisms/ClienteModal'

export default function Clientes() {
  const confirm = useConfirm()
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'active' | 'inactive' | 'all'>('active')
  const [showModal, setShowModal] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<Client | null>(null)

  // Debounce search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchInput])

  const { clientes, loading, error, createCliente, updateCliente, deleteCliente } = useClientes({
    search: searchTerm,
    status: statusFilter
  })

  const handleEdit = (cliente: Client) => {
    setSelectedCliente(cliente)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({
      title: 'Desativar Cliente',
      message: 'Tem certeza que deseja desativar este cliente? Ele não será excluído, apenas marcado como inativo.',
      confirmText: 'Desativar',
      cancelText: 'Cancelar'
    })
    if (!confirmed) return
    await deleteCliente(id)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedCliente(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-400">
          <p className="font-semibold">Erro ao carregar clientes</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Clientes B2B</h1>
        <Button onClick={() => setShowModal(true)}>+ Novo Cliente</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Buscar por nome, CNPJ ou e-mail..."
          />
        </div>

        <div className="md:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'active' | 'inactive' | 'all')}
            className="h-12"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </Select>
        </div>
      </div>

      {clientes.length === 0 ? (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg">
            {searchTerm || statusFilter !== 'active' ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {searchTerm || statusFilter !== 'active'
              ? 'Tente ajustar os filtros de busca ou status'
              : 'Clique em "Novo Cliente" para adicionar o primeiro cliente'
            }
          </p>
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <ClientTable clientes={clientes} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
          <div className="md:hidden space-y-4">
            {clientes.map((c) => (
              <ClientCard
                key={c.id}
                cliente={c}
                onEdit={() => handleEdit(c)}
                onDelete={() => handleDelete(c.id)}
              />
            ))}
          </div>
        </>
      )}

      {showModal && (
        <ClienteModal
          cliente={selectedCliente}
          onClose={handleCloseModal}
          createCliente={createCliente}
          updateCliente={updateCliente}
        />
      )}
    </div>
  )
}
