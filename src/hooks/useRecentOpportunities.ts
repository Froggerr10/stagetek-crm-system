import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Opportunity } from '@/types'

interface UseRecentOpportunitiesReturn {
  opportunities: Opportunity[]
  isLoading: boolean
  error: string | null
}

export function useRecentOpportunities(limit = 5): UseRecentOpportunitiesReturn {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOpportunities()
  }, [limit])

  async function fetchOpportunities() {
    try {
      const { data, error: queryError } = await supabase
        .from('opportunities')
        .select('*, client:clients(name), stage:funnel_stages(name, color)')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (queryError) throw queryError

      setOpportunities(data as Opportunity[] || [])
      setError(null)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar oportunidades'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return { opportunities, isLoading, error }
}
