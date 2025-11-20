import { MoreVertical } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Badge from '@/components/molecules/Badge'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Opportunity } from '@/types'

const variants: Record<string, 'success' | 'warning' | 'info' | 'neutral'> = {
  lead: 'neutral', contact: 'info', proposal: 'warning', negotiation: 'warning', closing: 'success'
}

interface Props { opportunity: Opportunity }

export default function OpportunityRow({ opportunity }: Props) {
  const navigate = useNavigate()
  const client = (opportunity.client as { name?: string })?.name || 'Cliente sem nome'
  const avatar = client.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const stage = (opportunity.stage as { name?: string })?.name || 'Sem estágio'
  const variant = variants[stage.toLowerCase().replace(/\s+/g, '')] || 'neutral'

  return (
    <tr className="border-b border-white/5 hover:bg-white/5 cursor-pointer" onClick={() => navigate(`/oportunidades/${opportunity.id}`)}>
      <td className="py-4 px-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-[#e90101] to-[#c10101] rounded-full flex items-center justify-center text-white text-xs font-semibold">
          {avatar}
        </div>
        <span className="text-base font-medium text-white">{client}</span>
      </td>
      <td className="py-4 px-4 text-base font-semibold text-white">
        R$ {opportunity.value ? opportunity.value.toLocaleString('pt-BR') : '0'}
      </td>
      <td className="py-4 px-4"><Badge variant={variant}>{stage}</Badge></td>
      <td className="py-4 px-4 text-base text-gray-300">
        {formatDistanceToNow(new Date(opportunity.created_at), { addSuffix: true, locale: ptBR })}
      </td>
      <td className="py-4 px-4">
        <button className="p-3 text-gray-300 hover:text-white" onClick={(e) => e.stopPropagation()}>
          <MoreVertical className="w-4 h-4" />
        </button>
      </td>
    </tr>
  )
}
