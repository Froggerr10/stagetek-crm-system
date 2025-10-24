import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import TimelineItem from '@/components/molecules/TimelineItem'
import Spinner from '@/components/atoms/Spinner'
import { Plus } from 'lucide-react'

type Activity = { id: string; type: 'note' | 'task_created' | 'task_completed' | 'status_won' | 'status_lost' | 'stage_changed'; content: string; created_at: string; user_name?: string }

export default function Timeline({ opportunityId }: { opportunityId: string }) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [newNote, setNewNote] = useState('')
  const [creating, setCreating] = useState(false)

  const fetchActivities = async () => {
    setLoading(true)
    const { data } = await supabase.from('notes').select('id, content, created_at').eq('opportunity_id', opportunityId).order('created_at', { ascending: false })
    setActivities((data || []).map(n => ({ id: n.id, type: 'note' as const, content: n.content, created_at: n.created_at })))
    setLoading(false)
  }

  const handleCreateNote = async () => {
    if (!newNote.trim() || creating) return
    setCreating(true)
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('notes').insert({ opportunity_id: opportunityId, content: newNote, created_by: user?.id })
    setNewNote('')
    setCreating(false)
    fetchActivities()
  }

  useEffect(() => { fetchActivities() }, [opportunityId])

  if (loading) return <div className="flex justify-center py-8"><Spinner size="md" /></div>

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Adicionar anotação..."
          className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 min-h-20 mb-3"
        />
        <button
          onClick={handleCreateNote}
          disabled={creating || !newNote.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-[#e90101] text-white rounded-lg hover:bg-[#c10101] disabled:opacity-50"
        >
          {creating ? <Spinner size="sm" /> : <Plus className="w-4 h-4" />}
          <span>Adicionar</span>
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

