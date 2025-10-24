import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import type { Funnel, FunnelStage, FunnelWithStages } from '@/types'

export const useFunnels = () => {
  const [funnels, setFunnels] = useState<FunnelWithStages[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getFunnels = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('funnels')
        .select('*, stages:funnel_stages(*)')
        .order('created_at', { ascending: true })

      if (error) throw error

      const formattedData = (data || []).map((funnel: any) => ({
        ...funnel,
        stages: (funnel.stages || []).sort((a: any, b: any) => a.order_position - b.order_position),
      }))

      setFunnels(formattedData)
    } catch (err: any) {
      const errorMsg = err.message || 'Erro ao carregar funis'
      setError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const createFunnel = async (funnelData: { name: string; description?: string }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from('funnels')
        .insert({
          ...funnelData,
          created_by: user?.id,
        })
        .select()
        .single()

      if (error) throw error

      toast.success('Funil criado com sucesso!')
      await getFunnels()
      return data
    } catch (err: any) {
      toast.error(err.message || 'Erro ao criar funil')
      throw err
    }
  }

  const updateFunnel = async (id: string, funnelData: Partial<Funnel>) => {
    try {
      const { data, error } = await supabase
        .from('funnels')
        .update(funnelData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      toast.success('Funil atualizado com sucesso!')
      await getFunnels()
      return data
    } catch (err: any) {
      toast.error(err.message || 'Erro ao atualizar funil')
      throw err
    }
  }

  const deleteFunnel = async (id: string) => {
    try {
      const { error } = await supabase
        .from('funnels')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Funil excluído com sucesso!')
      await getFunnels()
    } catch (err: any) {
      toast.error(err.message || 'Erro ao excluir funil')
      throw err
    }
  }

  const createStage = async (stageData: { funnel_id: string; name: string; color?: string; order_position: number }) => {
    try {
      const { data, error } = await supabase
        .from('funnel_stages')
        .insert(stageData)
        .select()
        .single()

      if (error) throw error

      toast.success('Etapa criada com sucesso!')
      await getFunnels()
      return data
    } catch (err: any) {
      toast.error(err.message || 'Erro ao criar etapa')
      throw err
    }
  }

  const updateStage = async (id: string, stageData: Partial<FunnelStage>) => {
    try {
      const { data, error } = await supabase
        .from('funnel_stages')
        .update(stageData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      toast.success('Etapa atualizada com sucesso!')
      await getFunnels()
      return data
    } catch (err: any) {
      toast.error(err.message || 'Erro ao atualizar etapa')
      throw err
    }
  }

  const deleteStage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('funnel_stages')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Etapa excluída com sucesso!')
      await getFunnels()
    } catch (err: any) {
      toast.error(err.message || 'Erro ao excluir etapa')
      throw err
    }
  }

  useEffect(() => {
    getFunnels()
  }, [])

  return {
    funnels,
    loading,
    error,
    getFunnels,
    createFunnel,
    updateFunnel,
    deleteFunnel,
    createStage,
    updateStage,
    deleteStage,
  }
}
