import { useState, useEffect } from 'react'
import type { Client } from '@/types'

interface UseClienteFormProps {
  cliente: Client | null
  onSuccess: () => void
  createCliente: (data: Omit<Client, 'id' | 'created_at' | 'updated_at'>) => Promise<Client | undefined>
  updateCliente: (id: string, data: Partial<Client>) => Promise<Client | undefined>
}

export function useClienteForm({ cliente, onSuccess, createCliente, updateCliente }: UseClienteFormProps) {
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
      zipCode: ''
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
          zipCode: (cliente.address as any)?.zipCode || ''
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
        cnpj: formData.cnpj || '',
        email: formData.email || '',
        phone: formData.phone || '',
        website: formData.website || '',
        status: formData.status,
        address: formData.address.city || formData.address.state ? formData.address : null
      } as any

      if (cliente) {
        await updateCliente(cliente.id, payload)
      } else {
        await createCliente(payload)
      }

      onSuccess()
    } catch (error: any) {
      // Error handling is done in useClientes hook with toast
      console.error('Erro ao salvar cliente:', error)
    } finally {
      setLoading(false)
    }
  }

  return { formData, setFormData, loading, handleSubmit }
}
