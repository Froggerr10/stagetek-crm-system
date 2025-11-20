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
import toast from 'react-hot-toast'
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

    let oppsQuery = supabase.from('opportunities').select('*, client:clients(name, email), stage:funnel_stages(*)')
    if (funnelId) oppsQuery = oppsQuery.eq('funnel_id', funnelId)
    if (ownerId) oppsQuery = oppsQuery.eq('assigned_to', ownerId)
    if (status !== 'all') oppsQuery = oppsQuery.eq('status', status)
    oppsQuery = oppsQuery.order('created_at', { ascending: false })

    let stagesQuery = supabase.from('funnel_stages').select('*')
    if (funnelId) stagesQuery = stagesQuery.eq('funnel_id', funnelId)
    stagesQuery = stagesQuery.order('order_position')

    const [stagesRes, oppsRes, clientsRes] = await Promise.all([
      stagesQuery,
      oppsQuery,
      supabase.from('clients').select('*').order('name')
    ])

    if (stagesRes.error) {
      console.error('Erro ao carregar estágios:', stagesRes.error)
      toast.error('Erro ao carregar estágios do funil')
    } else if (stagesRes.data) {
      setStages(stagesRes.data)
    }

    if (oppsRes.error) {
      console.error('Erro ao carregar oportunidades:', oppsRes.error)
      toast.error('Erro ao carregar oportunidades')
    } else if (oppsRes.data) {
      setOpportunities(oppsRes.data as any)
    }

    if (clientsRes.error) {
      console.error('Erro ao carregar clientes:', clientsRes.error)
      toast.error('Erro ao carregar lista de clientes')
    } else if (clientsRes.data) {
      setClients(clientsRes.data)
    }

    setLoading(false)
  }

  const handleDragStart = (event: any) => setActiveId(event.active.id)
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    if (!over || active.id === over.id) return

    const opportunityId = active.id as string
    let targetStageId = over.id as string

    // Check if dropped on another card (opportunity) instead of stage column
    const targetStage = stages.find(s => s.id === targetStageId)

    if (!targetStage) {
      // Dropped on an opportunity card, find which stage that opportunity belongs to
      const targetOpp = opportunities.find(o => o.id === targetStageId)
      if (targetOpp) {
        targetStageId = targetOpp.stage_id
      } else {
        return
      }
    }

    const finalStage = stages.find(s => s.id === targetStageId)
    if (!finalStage) return

    // Optimistic update
    setOpportunities(prev => prev.map(o =>
      o.id === opportunityId
        ? { ...o, stage_id: targetStageId, stage: finalStage }
        : o
    ))

    // Save to DB
    const { error } = await supabase
      .from('opportunities')
      .update({ stage_id: targetStageId, updated_at: new Date().toISOString() })
      .eq('id', opportunityId)

    if (error) {
      console.error('Failed to update opportunity stage:', error)
      toast.error('Erro ao mover card para novo estágio')
      fetchData() // Rollback
    }
  }

  const handleCardClick = (opp: Opportunity) => navigate(`/oportunidades/${opp.id}`)

  const handleModalClose = () => {
    setIsModalOpen(false)
    fetchData()
  }

  const activeOpp = activeId ? opportunities.find(o => o.id === activeId) : null

  if (loading) return <div className="flex justify-center items-center min-h-screen"><Spinner size="lg" /></div>

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

        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} key={stages.map(s => s.id).join(',')}>
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
