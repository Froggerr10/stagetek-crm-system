import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MessageSquare, CheckCircle, CircleDot, TrendingUp, TrendingDown, Mail } from 'lucide-react'

const config = {
  icons: { note: MessageSquare, task_created: CircleDot, task_completed: CheckCircle, status_won: TrendingUp, status_lost: TrendingDown, stage_changed: CircleDot, email_sent: Mail },
  colors: { note: 'bg-blue-500', task_created: 'bg-purple-500', task_completed: 'bg-green-500', status_won: 'bg-green-600', status_lost: 'bg-red-600', stage_changed: 'bg-yellow-500', email_sent: 'bg-[#e90101]' }
}

export default function TimelineItem({ type, content, createdAt, userName }: {
  type: 'note' | 'task_created' | 'task_completed' | 'status_won' | 'status_lost' | 'stage_changed' | 'email_sent'
  content: string; createdAt: string; userName?: string
}) {
  const Icon = config.icons[type]
  const colorClass = config.colors[type]
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ptBR })

  return (
    <div className="flex gap-3">
      <div className={`w-8 h-8 rounded-full ${colorClass} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-white">{content}</p>
        <p className="text-xs text-gray-400 mt-1">{userName || 'Sistema'} • {timeAgo}</p>
      </div>
    </div>
  )
}

