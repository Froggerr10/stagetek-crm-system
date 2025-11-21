import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  role: 'admin' | 'manager' | 'user'
  created_at: string
  updated_at: string
}

export interface UserFormData {
  email: string
  full_name: string
  role: 'admin' | 'manager' | 'user'
  password?: string
}

export function useUsers() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Erro ao carregar usuários')
    } finally {
      setLoading(false)
    }
  }

  async function createUser(formData: UserFormData) {
    try {
      // Criar usuário no auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: formData.email,
        password: formData.password || Math.random().toString(36).slice(-12),
        email_confirm: true,
        user_metadata: {
          full_name: formData.full_name,
          role: formData.role
        }
      })

      if (authError) throw authError

      // Criar profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user.id,
          email: formData.email,
          full_name: formData.full_name,
          role: formData.role
        }])
        .select()
        .single()

      if (profileError) throw profileError

      setUsers(prev => [profileData, ...prev])
      toast.success('Usuário criado com sucesso!')
      return { success: true, data: profileData }
    } catch (error) {
      console.error('Error creating user:', error)
      toast.error('Erro ao criar usuário. Tente via Supabase Dashboard.')
      return { success: false, error }
    }
  }

  async function updateUser(id: string, formData: Partial<UserFormData>) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          role: formData.role,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setUsers(prev => prev.map(u => u.id === id ? data : u))
      toast.success('Usuário atualizado com sucesso!')
      return { success: true, data }
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Erro ao atualizar usuário')
      return { success: false, error }
    }
  }

  async function deleteUser(id: string) {
    try {
      // Deletar profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id)

      if (profileError) throw profileError

      // Deletar do auth (admin)
      const { error: authError } = await supabase.auth.admin.deleteUser(id)

      if (authError) {
        console.warn('Could not delete from auth (requires service_role):', authError)
        toast.error('Usuário removido do perfil, mas não do auth. Use Supabase Dashboard.')
      }

      setUsers(prev => prev.filter(u => u.id !== id))
      toast.success('Usuário excluído!')
      return { success: true }
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Erro ao excluir usuário')
      return { success: false, error }
    }
  }

  return {
    users,
    loading,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  }
}
