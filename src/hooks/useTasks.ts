import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import type { Task, TaskFormData } from '@/types'

interface TaskFilters {
  opportunity_id?: string
  client_id?: string
  assigned_to?: string
  is_completed?: boolean
}

export const useTasks = (filters?: TaskFilters) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getTasks = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('tasks')
        .select('*, opportunity:opportunities(*), client:clients(*)')
        .order('due_date', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: false })

      if (filters?.opportunity_id) {
        query = query.eq('opportunity_id', filters.opportunity_id)
      }

      if (filters?.client_id) {
        query = query.eq('client_id', filters.client_id)
      }

      if (filters?.assigned_to) {
        query = query.eq('assigned_to', filters.assigned_to)
      }

      if (filters?.is_completed !== undefined) {
        query = query.eq('is_completed', filters.is_completed)
      }

      const { data, error } = await query

      if (error) throw error

      setTasks(data || [])
    } catch (err: any) {
      const errorMsg = err.message || 'Erro ao carregar tarefas'
      setError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const getTaskById = async (id: string): Promise<Task | null> => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*, opportunity:opportunities(*), client:clients(*)')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (err: any) {
      toast.error(err.message || 'Erro ao buscar tarefa')
      return null
    }
  }

  const createTask = async (taskData: TaskFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from('tasks')
        .insert({
          ...taskData,
          created_by: user?.id,
          assigned_to: taskData.assigned_to || user?.id,
        })
        .select()
        .single()

      if (error) throw error

      toast.success('Tarefa criada com sucesso!')
      await getTasks()
      return data
    } catch (err: any) {
      toast.error(err.message || 'Erro ao criar tarefa')
      throw err
    }
  }

  const updateTask = async (id: string, taskData: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(taskData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      toast.success('Tarefa atualizada com sucesso!')
      await getTasks()
      return data
    } catch (err: any) {
      toast.error(err.message || 'Erro ao atualizar tarefa')
      throw err
    }
  }

  const completeTask = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          is_completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      toast.success('Tarefa concluída!')
      await getTasks()
      return data
    } catch (err: any) {
      toast.error(err.message || 'Erro ao concluir tarefa')
      throw err
    }
  }

  const uncompleteTask = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          is_completed: false,
          completed_at: null,
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      toast.success('Tarefa reaberta!')
      await getTasks()
      return data
    } catch (err: any) {
      toast.error(err.message || 'Erro ao reabrir tarefa')
      throw err
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Tarefa excluída com sucesso!')
      await getTasks()
    } catch (err: any) {
      toast.error(err.message || 'Erro ao excluir tarefa')
      throw err
    }
  }

  useEffect(() => {
    getTasks()
  }, [
    filters?.opportunity_id,
    filters?.client_id,
    filters?.assigned_to,
    filters?.is_completed,
  ])

  return {
    tasks,
    loading,
    error,
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    completeTask,
    uncompleteTask,
    deleteTask,
  }
}
