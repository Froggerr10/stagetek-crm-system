import { useState, useEffect, useCallback } from 'react'
import { useComplianceData, ComplianceData } from '@/hooks/useComplianceData'
import { useCNPJSearch } from '@/hooks/useCNPJSearch'
import { useInputMask } from '@/hooks/useInputMask'
import type { Client } from '@/types'

interface UseClienteComplianceProps {
  cliente: Client | null
  formData: any
  setFormData: (data: any) => void
}

export function useClienteCompliance({ cliente, formData, setFormData }: UseClienteComplianceProps) {
  const [complianceData, setComplianceData] = useState<ComplianceData | null>(null)
  const [showComplianceModal, setShowComplianceModal] = useState(false)

  const { searchCNPJ, searching } = useCNPJSearch()
  const { getComplianceData, fetchAndSave, fetchFromMinhaReceita, fetchFromOpenCNPJ, saveComplianceData } = useComplianceData()
  const cnpjMask = useInputMask('cnpj')
  const phoneMask = useInputMask('phone')

  // Carregar compliance data quando editar cliente existente
  useEffect(() => {
    if (cliente?.id) {
      getComplianceData(cliente.id).then(data => setComplianceData(data))
    } else {
      setComplianceData(null)
    }
  }, [cliente?.id, getComplianceData])

  // Buscar CNPJ e compliance
  const handleCNPJSearch = useCallback(async () => {
    const data = await searchCNPJ(formData.cnpj)
    if (data) {
      const maskedPhone = phoneMask.handleChange(data.phone || '')
      const { phone: _, ...dataWithoutPhone } = data

      setFormData({
        ...formData,
        ...dataWithoutPhone,
        phone: maskedPhone
      })
      cnpjMask.setValue(data.cnpj)

      // Buscar compliance (Minha Receita → OpenCNPJ fallback)
      try {
        const complianceInfo = await fetchFromMinhaReceita(formData.cnpj).catch(() => {
          console.warn('⚠️ Minha Receita falhou, tentando OpenCNPJ...')
          return fetchFromOpenCNPJ(formData.cnpj)
        })

        if (complianceInfo) {
          setComplianceData(complianceInfo)

          // Auto-fill tax_regime
          let taxRegime: 'mei' | 'simples_nacional' | 'lucro_presumido' | 'lucro_real' | '' = ''
          if (complianceInfo.opcao_mei) {
            taxRegime = 'mei'
          } else if (complianceInfo.opcao_simples) {
            taxRegime = 'simples_nacional'
          }

          if (taxRegime) {
            setFormData((prev: any) => ({ ...prev, tax_regime: taxRegime }))
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados de compliance:', error)
      }
    }
  }, [formData, setFormData, searchCNPJ, phoneMask, cnpjMask, fetchFromMinhaReceita, fetchFromOpenCNPJ])

  // Atualizar compliance manualmente
  const handleRefreshCompliance = useCallback(async () => {
    if (cliente?.id && formData.cnpj) {
      const data = await fetchAndSave(formData.cnpj, cliente.id)
      if (data) setComplianceData(data)
    }
  }, [cliente?.id, formData.cnpj, fetchAndSave])

  return {
    complianceData,
    showComplianceModal,
    setShowComplianceModal,
    searching,
    handleCNPJSearch,
    handleRefreshCompliance,
    saveComplianceData,
    cnpjMask,
    phoneMask
  }
}
