import { DollarSign, Target, Percent, CreditCard } from 'lucide-react'
import StatCard from '@/components/molecules/StatCard'
import { useStats } from '@/hooks/useStats'
import Spinner from '@/components/atoms/Spinner'

export default function StatsGrid() {
  const { totalValue, openCount, conversionRate, averageTicket, isLoading, error } = useStats()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <StatCard
        icon={DollarSign}
        value={`R$ ${(totalValue / 1000).toFixed(1)}k`}
        label="Total Vendas"
        change={15}
      />

      <StatCard
        icon={Target}
        value={openCount.toString()}
        label="Oportunidades Abertas"
        change={3}
      />

      <StatCard
        icon={Percent}
        value={`${conversionRate.toFixed(0)}%`}
        label="Taxa de Conversão"
        change={5}
      />

      <StatCard
        icon={CreditCard}
        value={`R$ ${(averageTicket / 1000).toFixed(1)}k`}
        label="Ticket Médio"
        change={-2}
      />
    </div>
  )
}
