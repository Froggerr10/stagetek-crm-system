import { useState } from 'react'
import { Phone, Mail, X } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '@/components/molecules/Button'
import EmailComposer from '@/components/organisms/EmailComposer'
import type { TaskFormData } from '@/types'

interface QuickActionsBarProps {
  opportunityId: string
  clientId: string | null
  clientName: string
  clientEmail?: string
  onCreateTask: (taskData: Partial<TaskFormData>) => Promise<void>
}

export default function QuickActionsBar({ opportunityId, clientId, clientName, clientEmail, onCreateTask }: QuickActionsBarProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)

  const handleQuickCall = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await onCreateTask({ opportunity_id: opportunityId, client_id: clientId, title: `Ligar para ${clientName}`, type: 'call', description: null, due_date: null, assigned_to: null })
      toast.success('Tarefa de ligação criada!')
    } catch { toast.error('Erro ao criar tarefa') }
  }
  const handleQuickEmail = (e: React.MouseEvent) => { e.stopPropagation(); setIsEmailModalOpen(true) }
  return (
    <>
      <div className="flex gap-2 pt-2 border-t border-white/10">
        <Button onClick={handleQuickCall} variant="primary" size="sm" className="flex-1">
          <Phone className="w-4 h-4 mr-2" />Ligar
        </Button>
        <Button onClick={handleQuickEmail} variant="primary" size="sm" className="flex-1">
          <Mail className="w-4 h-4 mr-2" />Email
        </Button>
      </div>
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md" onClick={() => setIsEmailModalOpen(false)}>
          <div className="bg-[#0f0f0f] border border-white/30 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Enviar Email - {clientName}</h3>
              <Button onClick={() => setIsEmailModalOpen(false)} className="text-gray-400 hover:text-white" variant="ghost"><X className="w-5 h-5" /></Button>
            </div>
            <EmailComposer opportunityId={opportunityId} clientEmail={clientEmail} onEmailSent={() => setIsEmailModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}