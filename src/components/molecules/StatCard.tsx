import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  value: string
  label: string
  change?: number
}

export default function StatCard({ icon: Icon, value, label, change }: StatCardProps) {
  const isPositive = change !== undefined && change >= 0

  return (
    <div className="bg-[rgba(255,255,255,0.12)] backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(233,1,1,0.15)] transition-all">
      <div className="w-12 h-12 bg-gradient-to-br from-[rgba(233,1,1,0.2)] to-[rgba(233,1,1,0.05)] rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[#e90101]" />
      </div>

      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-base text-gray-300 font-medium mb-3">{label}</div>

      {change !== undefined && (
        <div className={`flex items-center gap-1 text-base ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          <span>{isPositive ? '+' : ''}{change}%</span>
        </div>
      )}
    </div>
  )
}
