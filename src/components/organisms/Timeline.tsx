import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import TimelineItem from '@/components/molecules/TimelineItem'
import Spinner from '@/components/atoms/Spinner'
import { Plus } from 'lucide-react'

type Activity = { id: string; type: 'note' | 'task_created' | 'task_completed' | 'status_won' | 'status_lost' | 'stage_changed' | 'email_sent'; content: string; created_at: string; user_name?: string }

export default function Timeline({ opportunityId }: { opportunityId: string }) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [newNote, setNewNote] = useState('')
  const [creating, setCreating] = useState(false)

  const fetchActivities = useCallback(async () => {
    setLoading(true)
    const [notesRes, emailsRes] = await Promise.all([
      supabase.from('notes').select('id, content, created_at').eq('opportunity_id', opportunityId),
      supabase.from('emails_sent').select('id, subject, to_email, sent_at').eq('opportunity_id', opportunityId)
    ])
    const notes = (notesRes.data || []).map(n => ({ id: n.id, type: 'note' as const, content: n.content, created_at: n.created_at }))
    const emails = (emailsRes.data || []).map(e => ({ id: e.id, type: 'email_sent' as const, content: `Email enviado para ${e.to_email}: ${e.subject}`, created_at: e.sent_at }))
    setActivities([...notes, ...emails].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
    setLoading(false)
  }, [opportunityId])

  const handleCreateNote = async () => {
    if (!newNote.trim() || creating) return
    setCreating(true)
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('notes').insert({ opportunity_id: opportunityId, content: newNote, created_by: user?.id })
    setNewNote('')
    setCreating(false)
    fetchActivities()
  }

  useEffect(() => { fetchActivities() }, [fetchActivities])

  if (loading) return <div className="flex justify-center py-8"><Spinner size="md" /></div>

  return (
    <div className="space-y-6">
      <div className="bg-white/8 border-2 border-[#e90101]/30 rounded-lg p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Plus className="w-5 h-5 text-[#e90101]" />
          <h3 className="text-base font-bold text-white uppercase tracking-wide">Criar Anotação</h3>
        </div>
        <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Digite sua anotação aqui..." className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 min-h-24 mb-4 focus:border-[#e90101] focus:outline-none transition" />
        <button onClick={handleCreateNote} disabled={creating || !newNote.trim()} className="flex items-center gap-2 px-6 py-3 bg-[#e90101] text-white font-semibold rounded-lg hover:bg-[#c10101] disabled:opacity-50 disabled:cursor-not-allowed transition">
          {creating ? <Spinner size="sm" /> : <Plus className="w-4 h-4" />}
          <span>{creating ? 'Criando...' : 'Adicionar Anotação'}</span>
        </button>
      </div>

      <div className="space-y-4 relative before:absolute before:left-4 before:top-0 before:bottom-0 before:w-px before:bg-white/10">
        {activities.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">Nenhuma atividade registrada</p>
        ) : (
          activities.map(activity => (
            <div key={activity.id} className="relative pl-12">
              <TimelineItem {...activity} createdAt={activity.created_at} userName={activity.user_name} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}