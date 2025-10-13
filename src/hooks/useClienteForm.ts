import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import type { Client } from '@/types'

export function useClienteForm(cliente: Client | null, onSuccess: () => void) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    website: '',
    status: 'active' as 'active' | 'inactive',
    address: {
      street: '',
      city: '',
      state: '',
      zipcode: ''
    }
  })

  useEffect(() => {
    if (cliente) {
      setFormData({
        name: cliente.name,
        cnpj: cliente.cnpj || '',
        email: cliente.email || '',
        phone: cliente.phone || '',
        website: cliente.website || '',
        status: cliente.status,
        address: {
          street: (cliente.address as any)?.street || '',
          city: (cliente.address as any)?.city || '',
          state: (cliente.address as any)?.state || '',
          zipcode: (cliente.address as any)?.zipcode || ''
        }
      })
    }
  }, [cliente])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        name: formData.name,
        cnpj: formData.cnpj || null,
        email: formData.email || null,
        phone: formData.phone || null,
        website: formData.website || null,
        status: formData.status,
        address: formData.address.city || formData.address.state ? formData.address : null,
        ...(cliente ? {} : { created_by: user?.id })
      }

      const { error } = cliente
        ? await supabase.from('clients').update(payload).eq('id', cliente.id)
        : await supabase.from('clients').insert(payload)

      if (error) throw error
      onSuccess()
    } catch (error: any) {
      console.error('Erro ao salvar cliente:', error)
      alert('Erro ao salvar cliente: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return { formData, setFormData, loading, handleSubmit }
}
