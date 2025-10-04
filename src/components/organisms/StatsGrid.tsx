import { DollarSign, Target, Percent, CreditCard } from 'lucide-react'
import StatCard from '@/components/molecules/StatCard'

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <StatCard
        icon={DollarSign}
        value="R$ 245.000"
        label="Total Vendas"
        change={15}
      />

      <StatCard
        icon={Target}
        value="27"
        label="Oportunidades Abertas"
        change={3}
      />

      <StatCard
        icon={Percent}
        value="32%"
        label="Taxa de Conversão"
        change={5}
      />

      <StatCard
        icon={CreditCard}
        value="R$ 12.500"
        label="Ticket Médio"
        change={-2}
      />
    </div>
  )
}
