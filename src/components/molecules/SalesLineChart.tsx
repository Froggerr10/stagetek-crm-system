import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Spinner from '@/components/atoms/Spinner'
import { useSalesChart } from '@/hooks/useSalesChart'

export default function SalesLineChart() {
  const { data, loading } = useSalesChart()

  if (loading) return <div className="h-64 flex items-center justify-center"><Spinner /></div>

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Sem dados de vendas
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={256}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="month" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px'
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#e90101"
          strokeWidth={2}
          dot={{ fill: '#e90101' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
