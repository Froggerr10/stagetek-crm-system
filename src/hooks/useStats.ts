import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Stats {
  totalValue: number
  openCount: number
  conversionRate: number
  averageTicket: number
  isLoading: boolean
  error: string | null
}

export function useStats(): Stats {
  const [stats, setStats] = useState<Stats>({
    totalValue: 0,
    openCount: 0,
    conversionRate: 0,
    averageTicket: 0,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    try {
      const { data: opportunities, error } = await supabase
        .from('opportunities')
        .select('value, status')

      if (error) throw error

      if (!opportunities) {
        setStats(prev => ({ ...prev, isLoading: false }))
        return
      }

      const open = opportunities.filter(o => o.status === 'open')
      const won = opportunities.filter(o => o.status === 'won')
      const lost = opportunities.filter(o => o.status === 'lost')

      const totalValue = won.reduce((sum, o) => sum + (o.value || 0), 0)
      const openCount = open.length
      const conversionRate = opportunities.length > 0
        ? (won.length / (won.length + lost.length)) * 100
        : 0
      const averageTicket = won.length > 0 ? totalValue / won.length : 0

      setStats({
        totalValue,
        openCount,
        conversionRate,
        averageTicket,
        isLoading: false,
        error: null
      })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar estatísticas'
      setStats(prev => ({ ...prev, isLoading: false, error: message }))
    }
  }

  return stats
}
