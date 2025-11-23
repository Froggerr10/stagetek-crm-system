import { useState, useEffect } from 'react'
import type { Client } from '@/types'
import { useClienteForm } from '@/hooks/useClienteForm'
import { useCNPJSearch } from '@/hooks/useCNPJSearch'
import { useComplianceData, ComplianceData } from '@/hooks/useComplianceData'
import { useInputMask } from '@/hooks/useInputMask'
import { useFieldValidation } from '@/hooks/useFieldValidation'
import ModalHeader from '@/components/molecules/ModalHeader'
import ModalActions from '@/components/molecules/ModalActions'
import ClienteFormFields from '@/components/organisms/ClienteFormFields'
import ComplianceModal from '@/components/organisms/ComplianceModal'
import { FileText } from 'lucide-react'

type CreateClienteFn = (data: Omit<Client, 'id' | 'created_at' | 'updated_at'>) => Promise<Client | undefined>
type UpdateClienteFn = (id: string, data: Partial<Client>) => Promise<Client | undefined>

interface ClienteModalProps {
  cliente: Client | null
  onClose: () => void
  createCliente: CreateClienteFn
  updateCliente: UpdateClienteFn
}

export default function ClienteModal({ cliente, onClose, createCliente, updateCliente }: ClienteModalProps) {
  const [complianceData, setComplianceData] = useState<ComplianceData | null>(null)
  const [showComplianceModal, setShowComplianceModal] = useState(false)

  const { searchCNPJ, searching } = useCNPJSearch()
  const { getComplianceData, fetchAndSave, fetchFromOpenCNPJ, saveComplianceData } = useComplianceData()
  const cnpjMask = useInputMask('cnpj')
  const phoneMask = useInputMask('phone')
  const { validate, getError } = useFieldValidation()

  const handleSuccess = async (savedClient?: Client) => {
    // Salvar dados de compliance se existirem
    if (complianceData && savedClient?.id) {
      await saveComplianceData(savedClient.id, complianceData)
    }
    onClose()
  }

  const { formData, setFormData, loading, handleSubmit } = useClienteForm({
    cliente,
    onSuccess: handleSuccess,
    createCliente,
    updateCliente
  })

  useEffect(() => {
    if (cliente?.id) {
      getComplianceData(cliente.id).then(data => setComplianceData(data))
    }
  }, [cliente?.id])

  const handleCNPJSearch = async () => {
    const data = await searchCNPJ(formData.cnpj)
    if (data) {
      // Aplicar máscara do telefone ANTES de fazer spread
      const maskedPhone = phoneMask.handleChange(data.phone || '')

      // Remover phone de data e adicionar maskedPhone separadamente
      const { phone: _, ...dataWithoutPhone } = data
      setFormData({
        ...formData,
        ...dataWithoutPhone,
        phone: maskedPhone
      })
      cnpjMask.setValue(data.cnpj)

      // Buscar dados de compliance do OpenCNPJ
      try {
        const complianceInfo = await fetchFromOpenCNPJ(formData.cnpj)
        if (complianceInfo) {
          setComplianceData(complianceInfo)
        }
      } catch (error) {
        console.error('Erro ao buscar dados de compliance:', error)
      }
    }
  }

  const handleCNPJChange = (value: string) => {
    const masked = cnpjMask.handleChange(value)
    setFormData({ ...formData, cnpj: masked })
  }

  const handlePhoneChange = (value: string) => {
    const masked = phoneMask.handleChange(value)
    setFormData({ ...formData, phone: masked })
  }

  const handleRefreshCompliance = async () => {
    if (cliente?.id && formData.cnpj) {
      const data = await fetchAndSave(formData.cnpj, cliente.id)
      if (data) setComplianceData(data)
    }
  }

  return (
    <>
      {showComplianceModal && (
        <ComplianceModal
          data={complianceData}
          onClose={() => setShowComplianceModal(false)}
          onRefresh={cliente?.id ? handleRefreshCompliance : undefined}
        />
      )}

    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-[#0f0f0f]/98 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <ModalHeader title={cliente ? 'Editar Cliente' : 'Novo Cliente'} onClose={onClose} />

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {complianceData && (
            <button
              type="button"
              onClick={() => setShowComplianceModal(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition border border-gray-700"
            >
              <FileText className="w-4 h-4" />
              Ver Dados da Receita Federal
            </button>
          )}

          <ClienteFormFields
            formData={formData}
            onFieldChange={(field, value) => setFormData({ ...formData, [field]: value })}
            onCNPJChange={handleCNPJChange}
            onPhoneChange={handlePhoneChange}
            onAddressChange={(address) => setFormData({ ...formData, address })}
            onStatusChange={(status) => setFormData({ ...formData, status })}
            onCNPJBlur={() => validate('cnpj', formData.cnpj, 'cnpj')}
            onEmailBlur={() => validate('email', formData.email, 'email')}
            onPhoneBlur={() => validate('phone', formData.phone, 'phone')}
            onCNPJSearch={handleCNPJSearch}
            cnpjError={getError('cnpj')}
            emailError={getError('email')}
            phoneError={getError('phone')}
            cnpjMaxLength={cnpjMask.maxLength}
            phoneMaxLength={phoneMask.maxLength}
            searching={searching}
          />
          <ModalActions onCancel={onClose} loading={loading} submitText={cliente ? 'Atualizar' : 'Criar Cliente'} />
        </form>
      </div>
    </div>
    </>
  )
}