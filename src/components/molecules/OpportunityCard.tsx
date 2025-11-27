import { MoreVertical, Calendar, DollarSign } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Badge from '@/components/molecules/Badge'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Opportunity } from '@/types'

const variants: Record<string, 'success' | 'warning' | 'info' | 'neutral'> = {
  lead: 'neutral', contact: 'info', proposal: 'warning', negotiation: 'warning', closing: 'success'
}

interface Props { opportunity: Opportunity }

export default function OpportunityCard({ opportunity }: Props) {
  const navigate = useNavigate()
  const client = (opportunity.client as { name?: string })?.name || 'Cliente sem nome'
  const avatar = client.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const stage = (opportunity.stage as { name?: string })?.name || 'Sem estágio'
  const variant = variants[stage.toLowerCase().replace(/\s+/g, '')] || 'neutral'

  return (
    <div className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => navigate(`/oportunidades/${opportunity.id}`)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#e90101] to-[#c10101] rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {avatar}
          </div>
          <div>
            <h4 className="text-white font-medium">{client}</h4>
            <Badge variant={variant}>{stage}</Badge>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-white" onClick={(e) => e.stopPropagation()}>
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-gray-300">
          <DollarSign className="w-4 h-4" />
          <span>R$ {opportunity.value ? opportunity.value.toLocaleString('pt-BR') : '0'}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{formatDistanceToNow(new Date(opportunity.created_at), { addSuffix: true, locale: ptBR })}</span>
        </div>
      </div>
    </div>
  )
}
