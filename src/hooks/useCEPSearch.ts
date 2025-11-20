import { useState } from 'react'
import { validateCEP } from '@/lib/validations'
import toast from 'react-hot-toast'

interface ViaCEPResponse {
  logradouro: string
  localidade: string
  uf: string
  erro?: boolean
}

export function useCEPSearch() {
  const [loading, setLoading] = useState(false)

  async function searchCEP(cep: string) {
    const cleanCEP = cep.replace(/\D/g, '')

    if (cleanCEP.length !== 8) return null

    const validation = validateCEP(cep)
    if (!validation.isValid) {
      return null
    }

    setLoading(true)

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`)
      const data: ViaCEPResponse = await response.json()

      if (data.erro) {
        toast.error('CEP não encontrado')
        return null
      }

      toast.success('Endereço preenchido automaticamente!')

      return {
        street: data.logradouro || '',
        city: data.localidade || '',
        state: data.uf || ''
      }
    } catch {
      toast.error('Erro ao buscar CEP')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { searchCEP, loading }
}
