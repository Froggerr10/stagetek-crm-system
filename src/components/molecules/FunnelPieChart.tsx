import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import Spinner from '@/components/atoms/Spinner'
import { useFunnelChart } from '@/hooks/useFunnelChart'

const COLORS = ['#e90101', '#ff3333', '#ff6666', '#ff9999', '#ffcccc']

export default function FunnelPieChart() {
  const { data, loading } = useFunnelChart()

  if (loading) return <div className="h-64 flex items-center justify-center"><Spinner /></div>

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Sem oportunidades abertas
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={256}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={entry => entry.name}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
