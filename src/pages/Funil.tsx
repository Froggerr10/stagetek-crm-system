import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { supabase } from '@/lib/supabase'
import KanbanColumn from '@/components/molecules/KanbanColumn'
import OpportunityCard from '@/components/molecules/OpportunityCard'
import Spinner from '@/components/atoms/Spinner'
import { Plus, Filter } from 'lucide-react'
import type { Opportunity, FunnelStage } from '@/types'

export default function Funil() {
  const navigate = useNavigate()
  const [stages, setStages] = useState<FunnelStage[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'won' | 'lost'>('open')
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  useEffect(() => { fetchData() }, [filterStatus])

  const fetchData = async () => {
    setLoading(true)
    const [stagesRes, oppsRes] = await Promise.all([
      supabase.from('funnel_stages').select('*').order('order_position'),
      supabase.from('opportunities').select('*, client:clients(name), stage:funnel_stages(*)').eq('status', filterStatus === 'all' ? undefined : filterStatus).order('created_at', { ascending: false }),
    ])
    if (stagesRes.data) setStages(stagesRes.data)
    if (oppsRes.data) setOpportunities(oppsRes.data as any)
    setLoading(false)
  }

  const handleDragStart = (event: any) => setActiveId(event.active.id)
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    if (!over || active.id === over.id) return

    const opportunityId = active.id as string
    const newStageId = over.id as string

    setOpportunities(prev => prev.map(o => o.id === opportunityId ? { ...o, stage_id: newStageId } : o))
    await supabase.from('opportunities').update({ stage_id: newStageId }).eq('id', opportunityId)
    fetchData()
  }

  const handleCardClick = (opp: Opportunity) => navigate(`/oportunidades/${opp.id}`)

  const activeOpp = activeId ? opportunities.find(o => o.id === activeId) : null

  if (loading) return <div className="flex justify-center items-center min-h-screen"><Spinner size="lg" /></div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Funil de Vendas</h1>
            <p className="text-gray-400 mt-1">{opportunities.length} oportunidades</p>
          </div>
          <div className="flex gap-3">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)} className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white">
              <option value="open">Abertas</option>
              <option value="all">Todas</option>
              <option value="won">Ganhas</option>
              <option value="lost">Perdidas</option>
            </select>
            <button onClick={() => navigate('/oportunidades')} className="flex items-center gap-2 px-4 py-2 bg-[#e90101] text-white rounded-lg hover:bg-[#c10101] transition-all">
              <Plus className="w-5 h-5" />
              <span>Nova Oportunidade</span>
            </button>
          </div>
        </div>

        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {stages.map(stage => (
              <KanbanColumn
                key={stage.id}
                stage={stage}
                opportunities={opportunities.filter(o => o.stage_id === stage.id)}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
          <DragOverlay>{activeOpp && <OpportunityCard opportunity={activeOpp} onClick={() => {}} />}</DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}
