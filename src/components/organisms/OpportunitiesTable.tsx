import { MoreVertical } from 'lucide-react'
import Badge from '@/components/atoms/Badge'

const data = [
  { id: 1, name: 'Joao Silva', value: 'R$ 45.000', stage: 'negotiation', label: 'Negociacao', date: 'Hoje', avatar: 'JS' },
  { id: 2, name: 'Maria Costa', value: 'R$ 12.500', stage: 'proposal', label: 'Proposta', date: 'Ontem', avatar: 'MC' },
  { id: 3, name: 'Pedro Santos', value: 'R$ 8.200', stage: 'contact', label: 'Contato', date: '2 dias atras', avatar: 'PS' },
  { id: 4, name: 'Ana Oliveira', value: 'R$ 28.700', stage: 'closing', label: 'Fechamento', date: '3 dias atras', avatar: 'AO' },
  { id: 5, name: 'Carlos Lima', value: 'R$ 15.900', stage: 'lead', label: 'Lead', date: '1 semana atras', avatar: 'CL' }
]

const variants: Record<string, 'success' | 'warning' | 'info' | 'neutral'> = {
  lead: 'neutral', contact: 'info', proposal: 'warning', negotiation: 'warning', closing: 'success'
}

export default function OpportunitiesTable() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Oportunidades Recentes</h3>
        <a href="#" className="text-sm text-[#e90101] hover:text-[#ff0101]">Ver todas �</a>
      </div>

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
          {data.map(o => (
            <tr key={o.id} className="border-b border-white/5 hover:bg-white/5">
              <td className="py-4 px-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#e90101] to-[#c10101] rounded-full flex items-center justify-center text-white text-xs font-semibold">{o.avatar}</div>
                <span className="text-base font-medium text-white">{o.name}</span>
              </td>
              <td className="py-4 px-4 text-base font-semibold text-white">{o.value}</td>
              <td className="py-4 px-4"><Badge variant={variants[o.stage]}>{o.label}</Badge></td>
              <td className="py-4 px-4 text-base text-gray-300">{o.date}</td>
              <td className="py-4 px-4"><button className="p-3 text-gray-300 hover:text-white"><MoreVertical className="w-4 h-4" /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
