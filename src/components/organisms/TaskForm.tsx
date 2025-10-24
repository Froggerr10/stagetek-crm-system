import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Button from '@/components/molecules/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/molecules/Select'
import { Label } from '@/components/ui/label'
import type { Task, TaskFormData } from '@/types'

interface TaskFormProps {
  task?: Task | null
  opportunityId?: string
  clientId?: string
  onSubmit: (data: TaskFormData) => Promise<void>
  onClose: () => void
}

export default function TaskForm({ task, opportunityId, clientId, onSubmit, onClose }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: task?.title || '',
    description: task?.description || null,
    type: task?.type || 'call',
    due_date: task?.due_date || null,
    opportunity_id: task?.opportunity_id || opportunityId || null,
    client_id: task?.client_id || clientId || null,
    assigned_to: task?.assigned_to || null,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[rgba(20,20,20,0.98)] backdrop-blur-xl border border-white/20 rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">{task ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><Label className="text-gray-300">Título *</Label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required /></div>
          <div><Label className="text-gray-300">Descrição</Label><textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value || null })} className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400" rows={3} /></div>
          <div><Label className="text-gray-300">Tipo</Label><Select value={formData.type || 'call'} onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}><option value="call">Ligação</option><option value="email">E-mail</option><option value="meeting">Reunião</option><option value="other">Outro</option></Select></div>
          <div><Label className="text-gray-300">Data/Hora</Label><Input type="datetime-local" value={formData.due_date ? new Date(formData.due_date).toISOString().slice(0, 16) : ''} onChange={(e) => setFormData({ ...formData, due_date: e.target.value || null })} /></div>
          <div className="flex gap-3"><Button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</Button><Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button></div>
        </form>
      </div>
    </div>
  )
}
