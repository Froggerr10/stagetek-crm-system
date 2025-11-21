import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import type { Opportunity, FunnelStage } from '@/types'

export function useOportunidadeForm(opportunity: Opportunity | null, stages: FunnelStage[], onSuccess: () => void) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    client_id: '',
    value: 0,
    stage_id: stages[0]?.id || '',
    probability: 0,
    expected_close_date: '',
    temperature: 'warm' as 'hot' | 'warm' | 'cold',
    qualification: 3,
  })

  useEffect(() => {
    if (opportunity) {
      // Converter data para formato YYYY-MM-DD se existir
      let dateValue = ''
      if (opportunity.expected_close_date) {
        const date = new Date(opportunity.expected_close_date)
        dateValue = date.toISOString().split('T')[0]
      }

      setFormData({
        title: opportunity.title || '',
        client_id: opportunity.client_id || '',
        value: opportunity.value || 0,
        stage_id: opportunity.stage_id || '',
        probability: opportunity.probability || 0,
        expected_close_date: dateValue,
        temperature: (opportunity as any).temperature || 'warm',
        qualification: (opportunity as any).qualification || 3,
      })
    } else if (stages[0]) {
      setFormData(prev => ({ ...prev, stage_id: stages[0].id }))
    }
  }, [opportunity, stages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Get default funnel_id
      const { data: defaultFunnel } = await supabase
        .from('funnels')
        .select('id')
        .eq('is_default', true)
        .single()

      const payload = opportunity ? {
        title: formData.title,
        client_id: formData.client_id,
        value: formData.value,
        stage_id: formData.stage_id,
        probability: formData.probability,
        expected_close_date: formData.expected_close_date || null,
        temperature: formData.temperature,
        qualification: formData.qualification,
      } : {
        title: formData.title,
        client_id: formData.client_id,
        funnel_id: defaultFunnel?.id,
        stage_id: formData.stage_id,
        value: formData.value,
        probability: formData.probability,
        expected_close_date: formData.expected_close_date || null,
        temperature: formData.temperature,
        qualification: formData.qualification,
        status: 'open',
      }

      const { error } = opportunity
        ? await supabase.from('opportunities').update(payload).eq('id', opportunity.id)
        : await supabase.from('opportunities').insert(payload)

      if (error) throw error
      onSuccess()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { formData, setFormData, loading, handleSubmit }
}
