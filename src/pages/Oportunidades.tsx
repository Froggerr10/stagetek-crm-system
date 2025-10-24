import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Opportunity, Client, FunnelStage } from '@/types'
import OportunidadeModal from '@/components/organisms/OportunidadeModal'

export default function Oportunidades() {
  const navigate = useNavigate()
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [stages, setStages] = useState<FunnelStage[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setLoading(true)

    const [oppsRes, clientsRes, stagesRes] = await Promise.all([
      supabase
        .from('opportunities')
        .select(`
          *,
          client:clients (id, name, cnpj, email),
          stage:funnel_stages (id, name, color, order_position)
        `)
        .order('created_at', { ascending: false }),
      supabase.from('clients').select('*').order('name'),
      supabase.from('funnel_stages').select('*').order('order_position'),
    ])

    if (!oppsRes.error && oppsRes.data) {
      setOpportunities(oppsRes.data as any)
    } else {
      console.error('Erro ao buscar oportunidades:', oppsRes.error)
    }

    if (!clientsRes.error && clientsRes.data) {
      setClients(clientsRes.data)
    }

    if (!stagesRes.error && stagesRes.data) {
      setStages(stagesRes.data)
    }

    setLoading(false)
  }

  const filteredOpportunities = opportunities.filter((o) =>
    o.title.toLowerCase().includes(search.toLowerCase()) ||
    (o.client as any)?.name?.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta oportunidade?')) return

    const { error } = await supabase.from('opportunities').delete().eq('id', id)

    if (error) {
      console.error('Erro ao deletar oportunidade:', error)
      alert('Erro ao deletar oportunidade: ' + error.message)
    } else {
      fetchData()
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedOpportunity(null)
    fetchData()
  }

  const formatCurrency = (value: number | null) => {
    if (!value) return 'R$ 0,00'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const getStatusBadge = (status: Opportunity['status']) => {
    const colors = {
      open: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      won: 'bg-green-500/20 text-green-400 border border-green-500/30',
      lost: 'bg-red-500/20 text-red-400 border border-red-500/30',
    }
    const labels = {
      open: 'Aberta',
      won: 'Ganha',
      lost: 'Perdida',
    }
    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colors[status]}`}>
        {labels[status]}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stagetek-red"></div>
      </div>
    )
  }

  return (
    <div className="p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
            Oportunidades
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-stagetek-red hover:bg-stagetek-red-medium text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
          >
            + Nova Oportunidade
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou cliente..."
            className="w-full px-4 py-3 bg-white/8 border border-white/15 rounded-lg text-white placeholder:text-gray-500 focus:ring-2 focus:ring-stagetek-red focus:border-transparent"
          />
        </div>

        {/* Table Desktop */}
        <div className="hidden md:block bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300 uppercase">Nome</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300 uppercase">Valor</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300 uppercase">Estágio</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOpportunities.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-300">
                    Nenhuma oportunidade encontrada
                  </td>
                </tr>
              ) : (
                filteredOpportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => navigate(`/oportunidades/${opp.id}`)} className="text-base font-medium text-white hover:text-primary text-left">{opp.title}</button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base text-gray-300">{(opp.client as any)?.name || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base font-semibold text-white">{formatCurrency(opp.value)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base text-gray-300">{(opp.stage as any)?.name || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(opp.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-base font-medium">
                      <button onClick={() => navigate(`/oportunidades/${opp.id}/cotacao/nova`)} className="text-blue-400 hover:text-blue-300 mr-4">Nova Cotação</button>
                      <button onClick={() => handleEdit(opp)} className="text-stagetek-red hover:text-[#ff0101] mr-4">Editar</button>
                      <button onClick={() => handleDelete(opp.id)} className="text-danger hover:text-red-400">Excluir</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredOpportunities.length === 0 ? (
            <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg shadow p-6 text-center text-gray-300">
              Nenhuma oportunidade encontrada
            </div>
          ) : (
            filteredOpportunities.map((opp) => (
              <div key={opp.id} className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div onClick={() => navigate(`/oportunidades/${opp.id}`)} className="cursor-pointer flex-1">
                    <h3 className="font-semibold text-white hover:text-primary">{opp.title}</h3>
                    <p className="text-sm text-gray-300">{(opp.client as any)?.name}</p>
                  </div>
                  {getStatusBadge(opp.status)}
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-white">{formatCurrency(opp.value)}</span>
                  <span className="text-sm text-gray-300">{(opp.stage as any)?.name}</span>
                </div>
                <div className="flex justify-end space-x-3">
                  <button onClick={() => navigate(`/oportunidades/${opp.id}/cotacao/nova`)} className="text-sm text-blue-400 hover:text-blue-300">Nova Cotação</button>
                  <button onClick={() => handleEdit(opp)} className="text-sm text-stagetek-red hover:text-[#ff0101]">Editar</button>
                  <button onClick={() => handleDelete(opp.id)} className="text-sm text-danger hover:text-red-400">Excluir</button>
                </div>
              </div>
            ))
          )}
        </div>

      {showModal && (
        <OportunidadeModal
          opportunity={selectedOpportunity}
          clients={clients}
          stages={stages}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
