import { useState } from 'react'
import { fetchCNPJData, validateCNPJ, formatCNPJ } from '@/lib/cnpjUtils'
import toast from 'react-hot-toast'

export function useCNPJSearch() {
  const [searching, setSearching] = useState(false)

  async function searchCNPJ(cnpj: string) {
    if (!cnpj) {
      toast.error('Digite um CNPJ primeiro')
      return null
    }

    if (!validateCNPJ(cnpj)) {
      toast.error('CNPJ inválido')
      return null
    }

    setSearching(true)
    try {
      const data = await fetchCNPJData(cnpj)

      if (data) {
        toast.success('Dados preenchidos automaticamente!')
        return {
          name: data.nome,
          email: data.email || '',
          phone: data.telefone || '',
          cnpj: formatCNPJ(data.cnpj),
          address: {
            street: data.logradouro || '',
            city: data.municipio || '',
            state: data.uf || '',
            zipCode: data.cep || ''
          }
        }
      }

      return null
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro ao consultar CNPJ'
      toast.error(message)
      return null
    } finally {
      setSearching(false)
    }
  }

  return { searchCNPJ, searching }
}
