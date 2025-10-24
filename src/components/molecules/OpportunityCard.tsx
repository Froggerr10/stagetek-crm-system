import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Flame, Droplet, Snowflake, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Avatar from '@/components/atoms/Avatar'
import Stars from '@/components/atoms/Stars'
import type { Opportunity } from '@/types'

export default function OpportunityCard({ opportunity, onClick }: { opportunity: Opportunity; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: opportunity.id })
  const style = { transform: CSS.Transform.toString(transform), transition }
  const timeAgo = formatDistanceToNow(new Date(opportunity.created_at), { addSuffix: true, locale: ptBR })
  const formatCurrency = (val: number | null) => val ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val) : 'R$ 0,00'

  const tempConfig = { hot: { icon: Flame, color: 'text-[#e90101]' }, warm: { icon: Droplet, color: 'text-orange-500' }, cold: { icon: Snowflake, color: 'text-blue-400' } }
  const temp = (opportunity as any).temperature || 'warm'
  const TempIcon = tempConfig[temp as keyof typeof tempConfig]?.icon || Droplet

  return (
    <div ref={setNodeRef} style={style} {...attributes} className={`bg-[rgba(255,255,255,0.08)] border border-white/15 rounded-lg p-3 cursor-pointer hover:border-white/30 transition-all ${isDragging ? 'opacity-50' : ''}`}>
      <div className="flex gap-2">
        <button {...listeners} className="text-gray-400 hover:text-white cursor-grab active:cursor-grabbing mt-1"><GripVertical className="w-4 h-4" /></button>
        <div className="flex-1 min-w-0" onClick={onClick}>
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-white truncate flex-1">{opportunity.title}</h4>
            <TempIcon className={`w-4 h-4 flex-shrink-0 ml-2 ${tempConfig[temp as keyof typeof tempConfig]?.color}`} />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Avatar name={(opportunity.client as any)?.name || 'N/A'} size="sm" />
            <p className="text-sm text-gray-400 truncate">{(opportunity.client as any)?.name || 'Sem cliente'}</p>
          </div>
          <Stars rating={(opportunity as any).qualification || 3} />
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
            <span className="text-base font-bold text-[#e90101]">{formatCurrency(opportunity.value)}</span>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
