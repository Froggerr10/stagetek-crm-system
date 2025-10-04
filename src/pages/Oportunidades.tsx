import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Deal, Organization, Stage } from '@/types'
import OportunidadeModal from '@/components/organisms/OportunidadeModal'

export default function Oportunidades() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [stages, setStages] = useState<Stage[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)

    const [dealsRes, orgsRes, stagesRes] = await Promise.all([
      supabase
        .from('deals')
        .select(`
          *,
          organizations (id, name),
          stages (id, name, color)
        `)
        .order('created_at', { ascending: false }),
      supabase.from('organizations').select('*').order('name'),
      supabase.from('stages').select('*').order('order'),
    ])

    if (!dealsRes.error && dealsRes.data) {
      setDeals(dealsRes.data as any)
    }
    if (!orgsRes.error && orgsRes.data) {
      setOrganizations(orgsRes.data as any)
    }
    if (!stagesRes.error && stagesRes.data) {
      setStages(stagesRes.data as any)
    }

    setLoading(false)
  }

  const filteredDeals = deals.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.organization?.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (deal: Deal) => {
    setSelectedDeal(deal)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta oportunidade?')) return

    const { error } = await supabase.from('deals').delete().eq('id', id)

    if (!error) {
      fetchData()
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedDeal(null)
    fetchData()
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const getStatusBadge = (status: Deal['status']) => {
    const colors = {
      open: 'bg-info/20 text-info border border-info/30',
      won: 'bg-success/20 text-success border border-success/30',
      lost: 'bg-danger/20 text-danger border border-danger/30',
    }
    const labels = {
      open: 'Aberta',
      won: 'Ganha',
      lost: 'Perdida',
    }
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colors[status]}`}>
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

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou cliente..."
            className="w-full px-4 py-3 bg-white/8 border border-white/15 rounded-lg text-white placeholder:text-gray-500 focus:ring-2 focus:ring-stagetek-red focus:border-transparent"
          />
        </div>

        {/* Table Desktop / Cards Mobile */}
        <div className="hidden md:block bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300 uppercase">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300 uppercase">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300 uppercase">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300 uppercase">
                  Estagio
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300 uppercase">
                  Acoes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDeals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-300">
                    Nenhuma oportunidade encontrada
                  </td>
                </tr>
              ) : (
                filteredDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base font-medium text-white">{deal.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base text-gray-300">{deal.organization?.name || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base font-semibold text-white">
                        {formatCurrency(deal.value)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base text-gray-300">{deal.stage?.name || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(deal.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-base font-medium">
                      <button
                        onClick={() => handleEdit(deal)}
                        className="text-stagetek-red hover:text-[#ff0101] mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(deal.id)}
                        className="text-danger hover:text-red-400"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredDeals.length === 0 ? (
            <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg shadow p-6 text-center text-gray-300">
              Nenhuma oportunidade encontrada
            </div>
          ) : (
            filteredDeals.map((deal) => (
              <div key={deal.id} className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{deal.name}</h3>
                    <p className="text-sm text-gray-300">{deal.organization?.name}</p>
                  </div>
                  {getStatusBadge(deal.status)}
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-white">
                    {formatCurrency(deal.value)}
                  </span>
                  <span className="text-sm text-gray-300">{deal.stage?.name}</span>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => handleEdit(deal)}
                    className="text-sm text-stagetek-red hover:text-[#ff0101]"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(deal.id)}
                    className="text-sm text-danger hover:text-red-400"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      {/* Modal */}
      {showModal && (
        <OportunidadeModal
          deal={selectedDeal}
          organizations={organizations}
          stages={stages}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
