import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import type { Client } from '@/types'
import Button from '@/components/atoms/Button'
import Spinner from '@/components/atoms/Spinner'
import SearchBar from '@/components/molecules/SearchBar'
import ClientCard from '@/components/molecules/ClientCard'
import ClientTable from '@/components/organisms/ClientTable'
import ClienteModal from '@/components/organisms/ClienteModal'

export default function Clientes() {
  const { user } = useAuth()
  const [clientes, setClientes] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<Client | null>(null)

  useEffect(() => { fetchClientes() }, [])

  const fetchClientes = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Erro ao buscar clientes:', error)
    } else if (data) {
      setClientes(data)
    }
    setLoading(false)
  }

  const filteredClientes = clientes.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.cnpj?.includes(search) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (cliente: Client) => {
    setSelectedCliente(cliente)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return

    const { error } = await supabase.from('clients').delete().eq('id', id)

    if (error) {
      console.error('Erro ao deletar cliente:', error)
      alert('Erro ao deletar cliente: ' + error.message)
    } else {
      fetchClientes()
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedCliente(null)
    fetchClientes()
  }

  if (loading) return <Spinner size="lg" />

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Clientes B2B</h1>
        <Button onClick={() => setShowModal(true)}>+ Novo Cliente</Button>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Buscar por nome, CNPJ ou indústria..." className="mb-6" />
      <div className="hidden md:block"><ClientTable clientes={filteredClientes} onEdit={handleEdit} onDelete={handleDelete} /></div>
      <div className="md:hidden space-y-4">{filteredClientes.map((c) => <ClientCard key={c.id} cliente={c} onEdit={() => handleEdit(c)} onDelete={() => handleDelete(c.id)} />)}</div>
      {showModal && <ClienteModal cliente={selectedCliente} onClose={handleCloseModal} />}
    </div>
  )
}
