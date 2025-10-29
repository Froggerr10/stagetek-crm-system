import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useFilterStore } from '@/stores/useFilterStore'
import { RefreshCw, Filter } from 'lucide-react'

interface FilterBarProps { onRefresh: () => void }

export default function FilterBar({ onRefresh }: FilterBarProps) {
  const { funnelId, ownerId, status, setFunnelId, setOwnerId, setStatus, resetFilters, activeFiltersCount } = useFilterStore()
  const [funnels, setFunnels] = useState<Array<{ id: string; name: string }>>([])
  const [owners, setOwners] = useState<Array<{ id: string; name: string }>>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data: funnelsData } = await supabase.from('funnels').select('id, name')
      const { data: { user } } = await supabase.auth.getUser()
      setFunnels(funnelsData || [])
      if (user) setOwners([{ id: user.id, name: user.email?.split('@')[0] || 'Você' }])
    }
    fetchData()
  }, [])

  const selectClass = "px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm"
  const filterCount = activeFiltersCount()

  return (
    <div className="bg-[rgba(255,255,255,0.08)] border border-white/15 rounded-lg p-4 mb-4">
      <div className="flex flex-wrap gap-3 items-center">
        <select value={funnelId || ''} onChange={e => setFunnelId(e.target.value || null)} className={selectClass}>
          <option value="">Todos os funis</option>
          {funnels.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
        <select disabled className={`${selectClass} opacity-50 cursor-not-allowed`}><option>Visão (MVP)</option></select>
        <select value={ownerId || ''} onChange={e => setOwnerId(e.target.value || null)} className={selectClass}>
          <option value="">Todos</option>
          {owners.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value as any)} className={selectClass}>
          <option value="open">Abertas</option>
          <option value="all">Todas</option>
          <option value="won">Ganhas</option>
          <option value="lost">Perdidas</option>
        </select>
        <button onClick={onRefresh} className="p-2 text-gray-400 hover:text-white"><RefreshCw className="w-5 h-5" /></button>
        {filterCount > 0 && <div className="flex items-center gap-2 px-3 py-1 bg-[#e90101]/20 border border-[#e90101] rounded-full text-[#e90101] text-sm"><Filter className="w-4 h-4" />{filterCount}</div>}
      </div>
    </div>
  )
}
