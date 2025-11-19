import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { supabase } from '@/lib/supabase'
import { useFilterStore } from '@/stores/useFilterStore'
import FilterBar from '@/components/organisms/FilterBar'
import KanbanColumn from '@/components/molecules/KanbanColumn'
import OpportunityCard from '@/components/organisms/OpportunityCard'
import OportunidadeModal from '@/components/organisms/OportunidadeModal'
import Spinner from '@/components/atoms/Spinner'
import { Plus } from 'lucide-react'
import type { Opportunity, FunnelStage } from '@/types'

export default function Funil() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { funnelId, ownerId, status } = useFilterStore()
  const [stages, setStages] = useState<FunnelStage[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  useEffect(() => { fetchData() }, [funnelId, ownerId, status])

  useEffect(() => {
    const params = new URLSearchParams()
    if (funnelId) params.set('funil', funnelId)
    if (ownerId) params.set('responsavel', ownerId)
    if (status !== 'open') params.set('status', status)
    setSearchParams(params)
  }, [funnelId, ownerId, status, setSearchParams])

  const fetchData = async () => {
    setLoading(true)
    console.log('🔄 fetchData called with filters:', { funnelId, ownerId, status })

    let oppsQuery = supabase.from('opportunities').select('*, client:clients(name, email), stage:funnel_stages(*)')
    if (funnelId) oppsQuery = oppsQuery.eq('funnel_id', funnelId)
    if (ownerId) oppsQuery = oppsQuery.eq('owner_id', ownerId)
    if (status !== 'all') oppsQuery = oppsQuery.eq('status', status)
    oppsQuery = oppsQuery.order('created_at', { ascending: false })

    // FIX: Filter stages by same funnel as opportunities
    let stagesQuery = supabase.from('funnel_stages').select('*')
    if (funnelId) stagesQuery = stagesQuery.eq('funnel_id', funnelId)
    stagesQuery = stagesQuery.order('order_position')

    console.log('📋 Executing queries...')
    console.log('🔍 Stages query filter:', { funnelId, hasFilter: !!funnelId })

    const [stagesRes, oppsRes, clientsRes] = await Promise.all([
      stagesQuery,
      oppsQuery,
      supabase.from('clients').select('*').order('name')
    ])

    console.log('📊 Stages response:', {
      data: stagesRes.data,
      count: stagesRes.data?.length,
      error: stagesRes.error,
      funnelIdFilter: funnelId || 'NONE (all funnels)'
    })

    console.log('📊 Opportunities response:', {
      count: oppsRes.data?.length,
      error: oppsRes.error
    })

    if (stagesRes.error) {
      console.error('❌ Stages query error:', stagesRes.error)
    }

    if (stagesRes.data) setStages(stagesRes.data)
    if (oppsRes.data) setOpportunities(oppsRes.data as any)
    if (clientsRes.data) setClients(clientsRes.data)
    setLoading(false)

    console.log('✅ fetchData completed. Stages loaded:', stagesRes.data?.length || 0)
  }

  const handleDragStart = (event: any) => setActiveId(event.active.id)
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    if (!over || active.id === over.id) return

    const opportunityId = active.id as string
    const newStageId = over.id as string

    console.log('🎯 Drag-and-drop EVENT:', {
      'opportunityId (active.id)': opportunityId,
      'newStageId (over.id)': newStageId,
      'over object': over
    })

    // Find current opportunity
    const currentOpp = opportunities.find(o => o.id === opportunityId)
    console.log('📊 Current opportunity:', {
      id: currentOpp?.id,
      title: currentOpp?.title,
      current_stage_id: currentOpp?.stage_id,
      stage_name: currentOpp?.stage?.name
    })

    // Find target stage to verify it exists
    const targetStage = stages.find(s => s.id === newStageId)
    console.log('🎪 All stages loaded:', stages.map(s => ({ id: s.id, name: s.name })))
    console.log('🎯 Target stage:', targetStage ? { id: targetStage.id, name: targetStage.name } : 'NOT FOUND!')

    if (!targetStage) {
      console.error('❌ CRITICAL: Target stage not found in stages array!')
      console.error('Looking for stage ID:', newStageId)
      console.error('Available stage IDs:', stages.map(s => s.id))
      return
    }

    // Optimistic update
    setOpportunities(prev => prev.map(o =>
      o.id === opportunityId
        ? { ...o, stage_id: newStageId, stage: targetStage }
        : o
    ))

    // Save to DB (don't refetch - it would overwrite the optimistic update before DB saves)
    const { data, error } = await supabase
      .from('opportunities')
      .update({ stage_id: newStageId, updated_at: new Date().toISOString() })
      .eq('id', opportunityId)
      .select()

    if (error) {
      console.error('❌ Failed to update stage:', error)
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      // Rollback on error
      fetchData()
    } else {
      console.log('✅ Stage updated successfully:', data)
    }
  }

  const handleCardClick = (opp: Opportunity) => navigate(`/oportunidades/${opp.id}`)

  const handleModalClose = () => {
    setIsModalOpen(false)
    fetchData()
  }

  const activeOpp = activeId ? opportunities.find(o => o.id === activeId) : null

  if (loading) return <div className="flex justify-center items-center min-h-screen"><Spinner size="lg" /></div>

  console.log('🎨 RENDERING Funil. Stages to render:', stages.map(s => ({ id: s.id, name: s.name })))

  return (
    <div className="p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Funil de Vendas</h1>
            <p className="text-gray-400 mt-1">{opportunities.length} oportunidades</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-stagetek-red text-white rounded-lg hover:bg-stagetek-red-medium transition-all">
            <Plus className="w-5 h-5" />
            <span>Nova Oportunidade</span>
          </button>
        </div>

        <FilterBar onRefresh={fetchData} />

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

        {isModalOpen && <OportunidadeModal opportunity={null} clients={clients} stages={stages} onClose={handleModalClose} />}
      </div>
    </div>
  )
}
