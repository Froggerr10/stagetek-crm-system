import { Phone, Mail, Calendar, CheckCircle, Circle, Pencil, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Task } from '@/types'

const icons = { call: Phone, email: Mail, meeting: Calendar, other: Circle }

export default function TaskCard({ task, onEdit, onDelete, onToggleComplete }: {
  task: Task; onEdit: (task: Task) => void; onDelete: (id: string) => void; onToggleComplete: (id: string, completed: boolean) => void
}) {
  const Icon = icons[task.type || 'other']
  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.is_completed
  const completed = task.is_completed
  const dueText = task.due_date ? formatDistanceToNow(new Date(task.due_date), { addSuffix: true, locale: ptBR }) : 'Sem prazo'
  return (
    <div className={`p-4 rounded-lg border ${completed ? 'bg-white/5 border-white/10 opacity-60' : 'bg-[rgba(255,255,255,0.12)] border-white/20'}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 ${completed ? 'text-gray-400' : 'text-[#e90101]'}`} />
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium ${completed ? 'line-through text-gray-400' : 'text-white'}`}>{task.title}</h4>
          {task.description && <p className="text-sm text-gray-400 mt-1">{task.description}</p>}
          <p className={`text-xs mt-2 ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-400'}`}>{dueText}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onToggleComplete(task.id, completed)}
            className="p-1 text-gray-400 hover:text-[#e90101] hover:bg-white/5 rounded transition-colors"
            aria-label={completed ? 'Marcar como pendente' : 'Marcar como concluída'}
            title={completed ? 'Marcar como pendente' : 'Marcar como concluída'}>
            {completed ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
          </button>
          <button onClick={() => onEdit(task)} className="p-1 text-gray-400 hover:text-[#e90101] hover:bg-white/5 rounded transition-colors"
            aria-label="Editar tarefa" title="Editar tarefa">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(task.id)} className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-colors"
            aria-label="Excluir tarefa" title="Excluir tarefa">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
