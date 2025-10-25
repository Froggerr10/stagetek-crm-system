import { Phone, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import type { TaskFormData } from '@/types'

interface QuickActionsBarProps {
  opportunityId: string
  clientId: string | null
  clientName: string
  onCreateTask: (taskData: Partial<TaskFormData>) => Promise<void>
}

export default function QuickActionsBar({ opportunityId, clientId, clientName, onCreateTask }: QuickActionsBarProps) {
  const handleQuickCall = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await onCreateTask({ opportunity_id: opportunityId, client_id: clientId, title: `Ligar para ${clientName}`, type: 'call', description: null, due_date: null, assigned_to: null })
      toast.success('Tarefa de ligação criada!')
    } catch { toast.error('Erro ao criar tarefa') }
  }
  const handleQuickEmail = (e: React.MouseEvent) => { e.stopPropagation(); toast.info('Compositor de email disponível na Story 1.1') }
  const btnClass = "flex-1 flex items-center justify-center gap-2 px-3 py-2 text-gray-400 hover:text-blue-400 hover:bg-blue-950/30 rounded-md transition-colors min-h-[44px]"
  return (
    <div className="flex gap-2 pt-2 border-t border-white/10">
      <button onClick={handleQuickCall} className={btnClass} title="Ligar"><Phone className="w-4 h-4" /></button>
      <button onClick={handleQuickEmail} className={btnClass} title="Enviar Email"><Mail className="w-4 h-4" /></button>
    </div>
  )
}
