import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import OpportunityCard from '@/components/organisms/OpportunityCard'
import type { Opportunity, FunnelStage } from '@/types'

interface KanbanColumnProps {
  stage: FunnelStage
  opportunities: Opportunity[]
  onCardClick: (opportunity: Opportunity) => void
}

export default function KanbanColumn({ stage, opportunities, onCardClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id })
  const totalValue = opportunities.reduce((sum, opp) => sum + (opp.value || 0), 0)
  const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  return (
    <div className="flex-shrink-0 w-80 flex flex-col" style={{ maxHeight: 'calc(100vh - 280px)' }}>
      <div ref={setNodeRef} className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4 relative flex flex-col h-full">
        {isOver && (
          <div className="absolute inset-0 bg-[rgba(233,1,1,0.1)] rounded-lg pointer-events-none border-2 border-dashed border-[rgba(233,1,1,0.4)]" />
        )}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line no-restricted-syntax */}
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color || '#6b7280' }} />
            <h3 className="font-semibold text-white">{stage.name}</h3>
            <span className="text-xs text-gray-400">({opportunities.length})</span>
          </div>
          <span className="text-sm font-medium text-[#e90101]">{formatCurrency(totalValue)}</span>
        </div>
        <div className="space-y-3 min-h-[200px] relative z-10 overflow-y-auto flex-1 pr-2">
          <SortableContext items={opportunities.map(o => o.id)} strategy={verticalListSortingStrategy}>
            {opportunities.map(opp => <OpportunityCard key={opp.id} opportunity={opp} onClick={() => onCardClick(opp)} />)}
          </SortableContext>
        </div>
      </div>
    </div>
  )
}
