import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import type { Client } from '@/types'

interface ClientFilters {
  search?: string
  status?: 'active' | 'inactive' | 'all'
}

export const useClientes = (filters?: ClientFilters) => {
  const [clientes, setClientes] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getClientes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('clients')
        .select('*')
        .order('name', { ascending: true })

      // Apply filters
      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status)
      }

      if (filters?.search) {
        query = query.ilike('name', `%${filters.search}%`)
      }

      const { data, error } = await query

      if (error) throw error

      setClientes(data || [])
    } catch (err: any) {
      const errorMsg = err.message || 'Erro ao carregar clientes'
      setError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }, [filters?.search, filters?.status])

  const getClienteById = async (id: string): Promise<Client | null> => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (err: any) {
      toast.error(err.message || 'Erro ao buscar cliente')
      return null
    }
  }

  const createCliente = async (clientData: Omit<Client, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from('clients')
        .insert({
          ...clientData,
          created_by: user?.id,
        })
        .select()
        .single()

      if (error) throw error

      toast.success('Cliente criado com sucesso!')
      await getClientes() // Refresh list
      return data
    } catch (err: any) {
      // Handle unique constraint violation (CNPJ duplicate)
      if (err.code === '23505' || err.message?.includes('duplicate') || err.message?.includes('unique')) {
        toast.error('Este CNPJ já está cadastrado. Verifique se o cliente já existe.')
      } else {
        toast.error(err.message || 'Erro ao criar cliente')
      }
      throw err
    }
  }

  const updateCliente = async (id: string, clientData: Partial<Client>) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .update(clientData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      toast.success('Cliente atualizado com sucesso!')
      await getClientes() // Refresh list
      return data
    } catch (err: any) {
      // Handle unique constraint violation (CNPJ duplicate)
      if (err.code === '23505' || err.message?.includes('duplicate') || err.message?.includes('unique')) {
        toast.error('Este CNPJ já pertence a outro cliente.')
      } else {
        toast.error(err.message || 'Erro ao atualizar cliente')
      }
      throw err
    }
  }

  const deleteCliente = async (id: string) => {
    try {
      // Soft delete - set status to inactive
      const { error } = await supabase
        .from('clients')
        .update({ status: 'inactive' })
        .eq('id', id)

      if (error) throw error

      toast.success('Cliente desativado com sucesso!')
      await getClientes() // Refresh list
    } catch (err: any) {
      toast.error(err.message || 'Erro ao desativar cliente')
      throw err
    }
  }

  // Fetch on mount and when filters change
  useEffect(() => {
    getClientes()
  }, [getClientes])

  return {
    clientes,
    loading,
    error,
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
  }
}
