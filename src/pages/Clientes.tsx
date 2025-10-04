import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Organization } from '@/types'
import Button from '@/components/atoms/Button'
import Spinner from '@/components/atoms/Spinner'
import SearchBar from '@/components/molecules/SearchBar'
import ClientCard from '@/components/molecules/ClientCard'
import ClientTable from '@/components/organisms/ClientTable'
import ClienteModal from '@/components/organisms/ClienteModal'

export default function Clientes() {
  const [clientes, setClientes] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<Organization | null>(null)

  useEffect(() => { fetchClientes() }, [])

  const fetchClientes = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('organizations').select('*').order('name', { ascending: true })
    if (!error && data) setClientes(data as any)
    setLoading(false)
  }

  const filteredClientes = clientes.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.cnpj?.includes(search) || c.industry?.toLowerCase().includes(search.toLowerCase()))
  const handleEdit = (cliente: Organization) => { setSelectedCliente(cliente); setShowModal(true) }
  const handleDelete = async (id: string) => { if (!confirm('Tem certeza?')) return; await supabase.from('organizations').delete().eq('id', id); fetchClientes() }
  const handleCloseModal = () => { setShowModal(false); setSelectedCliente(null); fetchClientes() }

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
