import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface ChartData {
  month: string
  value: number
}

export function useSalesChart() {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSalesData()
  }, [])

  async function fetchSalesData() {
    try {
      const { data: opportunities } = await supabase
        .from('opportunities')
        .select('value, created_at, status')
        .eq('status', 'won')

      if (!opportunities) {
        setLoading(false)
        return
      }

      const monthlyData: Record<string, number> = {}
      opportunities.forEach(opp => {
        const date = new Date(opp.created_at)
        const month = date.toLocaleDateString('pt-BR', { month: 'short' })
        monthlyData[month] = (monthlyData[month] || 0) + (opp.value || 0)
      })

      const chartData = Object.entries(monthlyData).map(([month, value]) => ({
        month,
        value: Math.round(value / 1000)
      }))

      setData(chartData)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading }
}
