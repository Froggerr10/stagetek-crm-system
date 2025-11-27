import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Spinner from '@/components/atoms/Spinner'
import OpportunityRow from '@/components/molecules/OpportunityRow'
import OpportunityCard from '@/components/molecules/OpportunityCard'
import { useRecentOpportunities } from '@/hooks/useRecentOpportunities'

export default function OpportunitiesTable() {
  const navigate = useNavigate()
  const { opportunities, isLoading, error } = useRecentOpportunities(5)

  if (isLoading) {
    return (
      <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg p-6">
        <div className="flex justify-center items-center py-12"><Spinner size="md" /></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    )
  }

  if (opportunities.length === 0) {
    return (
      <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Oportunidades Recentes</h3>
        <p className="text-gray-400 text-center py-8">Nenhuma oportunidade encontrada</p>
      </div>
    )
  }

  return (
    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Oportunidades Recentes</h3>
        <button onClick={() => navigate('/oportunidades')} className="flex items-center gap-1 text-sm text-[#e90101] hover:text-[#ff0101] transition-colors">
          Ver todas <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      {/* Mobile: Cards */}
      <div className="md:hidden space-y-3">
        {opportunities.map(opp => (
          <OpportunityCard key={opp.id} opportunity={opp} />
        ))}
      </div>
      {/* Desktop: Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300 uppercase">Cliente</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300 uppercase">Valor</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300 uppercase">Estagio</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300 uppercase">Data</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300 uppercase">Acoes</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map(opp => (
              <OpportunityRow key={opp.id} opportunity={opp} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
