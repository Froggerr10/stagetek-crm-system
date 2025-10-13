import { TrendingUp, Users, DollarSign, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import AppleButton from '../atoms/AppleButton'
import AppleBadge from '../atoms/AppleBadge'

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  icon: React.ReactNode
}

function MetricCard({ title, value, change, changeType, icon }: MetricCardProps) {
  return (
    <div className="
      bg-white/5 backdrop-blur-xl
      border border-white/10
      rounded-2xl p-6
      shadow-lg hover:shadow-xl
      transition-all duration-300 ease-out
      hover:scale-[1.02] hover:-translate-y-1
      group
    ">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-stagetek-red/20 rounded-xl flex items-center justify-center group-hover:bg-stagetek-red/30 transition-colors">
          {icon}
        </div>
        <div className="flex items-center gap-2">
          {changeType === 'positive' ? (
            <ArrowUpRight className="w-4 h-4 text-green-400" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-400" />
          )}
          <span className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-400' : 'text-red-400'
          }`}>
            {change}
          </span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </div>
  )
}

export default function AppleDashboard() {
  const metrics = [
    {
      title: 'Receita Total',
      value: 'R$ 2.4M',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: <DollarSign className="w-6 h-6 text-stagetek-red" />
    },
    {
      title: 'Clientes Ativos',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: <Users className="w-6 h-6 text-stagetek-red" />
    },
    {
      title: 'Oportunidades',
      value: '89',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: <TrendingUp className="w-6 h-6 text-stagetek-red" />
    },
    {
      title: 'Eventos Agendados',
      value: '23',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: <Calendar className="w-6 h-6 text-stagetek-red" />
    }
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Dashboard STAGETEK
          </h1>
          <p className="text-gray-400">
            Visão geral do seu negócio de equipamentos de entretenimento
          </p>
        </div>
        <AppleButton size="lg">
          Nova Oportunidade
        </AppleButton>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-2xl p-6
        shadow-lg
      ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            Atividade Recente
          </h2>
          <AppleButton variant="ghost" size="sm">
            Ver Todas
          </AppleButton>
        </div>
        
        <div className="space-y-4">
          {[
            { action: 'Nova oportunidade criada', client: 'ACME Corporation', time: '2 min atrás', type: 'success' },
            { action: 'Cliente atualizado', client: 'Eventos Plus', time: '15 min atrás', type: 'info' },
            { action: 'Cotação enviada', client: 'Show Business', time: '1 hora atrás', type: 'success' },
            { action: 'Reunião agendada', client: 'Mega Events', time: '2 horas atrás', type: 'info' }
          ].map((activity, index) => (
            <div key={index} className="
              flex items-center justify-between p-4
              bg-white/5 rounded-xl
              hover:bg-white/10 transition-colors
            ">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-stagetek-red/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-stagetek-red" />
                </div>
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-400">{activity.client}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AppleBadge variant={activity.type as any}>
                  {activity.type}
                </AppleBadge>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}