import { MoreVertical, Calendar, DollarSign, Phone, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Badge from '@/components/molecules/Badge'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import type { Opportunity } from '@/types'

const variants: Record<string, 'success' | 'warning' | 'info' | 'neutral'> = { lead: 'neutral', contact: 'info', proposal: 'warning', negotiation: 'warning', closing: 'success' }
interface Props { opportunity: Opportunity }

export default function OpportunityCard({ opportunity }: Props) {
  const navigate = useNavigate()
  const client = (opportunity.client as { name?: string })?.name || 'Cliente sem nome'
  const avatar = client.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const stage = (opportunity.stage as { name?: string })?.name || 'Sem estágio'
  const variant = variants[stage.toLowerCase().replace(/\s+/g, '')] || 'neutral'
  const handleQuickCall = async (e: React.MouseEvent) => { e.stopPropagation(); try { const { data: { user } } = await supabase.auth.getUser(); await supabase.from('tasks').insert({ opportunity_id: opportunity.id, title: `Ligar ${client}`, status: 'pending', assigned_to: user?.id, created_by: user?.id }); toast.success('Tarefa "Ligar" criada!') } catch { toast.error('Erro ao criar tarefa') } }
  const handleQuickEmail = (e: React.MouseEvent) => { e.stopPropagation(); navigate(`/oportunidades/${opportunity.id}`, { state: { openEmailTab: true } }) }
  const btnClass = "p-2 rounded hover:bg-blue-500/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
  const iconClass = "w-4 h-4 text-gray-400 hover:text-blue-400 transition-colors"
  return (
    <div className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => navigate(`/oportunidades/${opportunity.id}`)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#e90101] to-[#c10101] rounded-full flex items-center justify-center text-white text-sm font-semibold">{avatar}</div>
          <div><h4 className="text-white font-medium">{client}</h4><Badge variant={variant}>{stage}</Badge></div>
        </div>
        <button className="p-2 text-gray-400 hover:text-white" onClick={(e) => e.stopPropagation()}><MoreVertical className="w-5 h-5" /></button>
      </div>
      <div className="flex items-center gap-4 text-sm mb-3">
        <div className="flex items-center gap-1 text-gray-300"><DollarSign className="w-4 h-4" /><span>R$ {opportunity.value ? opportunity.value.toLocaleString('pt-BR') : '0'}</span></div>
        <div className="flex items-center gap-1 text-gray-400"><Calendar className="w-4 h-4" /><span>{formatDistanceToNow(new Date(opportunity.created_at), { addSuffix: true, locale: ptBR })}</span></div>
      </div>
      <div className="flex gap-2 pt-3 border-t border-white/10">
        <button onClick={handleQuickCall} className={btnClass} title="Ligar"><Phone className={iconClass} /></button>
        <button onClick={handleQuickEmail} className={btnClass} title="Enviar Email"><Mail className={iconClass} /></button>
      </div>
    </div>
  )
}
