import { Home, ChevronRight } from 'lucide-react'
import StatsGrid from '@/components/organisms/StatsGrid'
import OpportunitiesTable from '@/components/organisms/OpportunitiesTable'

export default function Dashboard() {
  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-300 mb-6">
        <Home className="w-4 h-4" />
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">Dashboard</span>
      </div>

      {/* Stats */}
      <StatsGrid />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Vendas ao Longo do Tempo</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">Chart: Vendas Mensal</div>
        </div>

        <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Oportunidades por Estagio</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">Chart: Funil Conversao</div>
        </div>
      </div>

      {/* Table */}
      <OpportunitiesTable />

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t border-white/10 text-center">
        <p className="text-xs text-gray-500">Built with ❤️ following Protocol Notecraft™</p>
        <p className="text-xs text-gray-500 mt-1">STAGETEK Engineering Team</p>
      </footer>
    </div>
  )
}
