import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import Spinner from '@/components/atoms/Spinner'
import { useFunnelChart } from '@/hooks/useFunnelChart'

const COLORS = ['#e90101', '#ff3333', '#ff6666', '#ff9999', '#ffcccc']

export default function FunnelPieChart() {
  const { data, loading } = useFunnelChart()
  if (loading) return <div className="h-64 flex items-center justify-center"><Spinner /></div>
  if (data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-500">Sem oportunidades abertas</div>

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} cx="50%" cy="45%" outerRadius={70} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
          {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '8px 12px' }} labelStyle={{ color: '#fff' }} itemStyle={{ color: '#fff' }} wrapperStyle={{ zIndex: 100 }} />
        <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-white text-sm">{value}</span>} />
      </PieChart>
    </ResponsiveContainer>
  )
}
