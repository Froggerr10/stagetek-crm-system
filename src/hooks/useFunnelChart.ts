import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface StageData {
  name: string
  value: number
  color: string
}

export function useFunnelChart() {
  const [data, setData] = useState<StageData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStageData()
  }, [])

  async function fetchStageData() {
    try {
      const { data: opportunities } = await supabase
        .from('opportunities')
        .select('stage_id, stage:funnel_stages(name, color)')
        .eq('status', 'open')

      if (!opportunities) {
        setLoading(false)
        return
      }

      const stageCounts: Record<string, { name: string; count: number; color: string }> = {}

      opportunities.forEach(opp => {
        const stage = (opp.stage as { name?: string; color?: string })
        const stageName = stage?.name || 'Sem estágio'
        const stageColor = stage?.color || '#666'

        if (!stageCounts[stageName]) {
          stageCounts[stageName] = { name: stageName, count: 0, color: stageColor }
        }
        stageCounts[stageName].count++
      })

      const chartData = Object.values(stageCounts).map(s => ({
        name: s.name,
        value: s.count,
        color: s.color
      }))

      setData(chartData)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading }
}
