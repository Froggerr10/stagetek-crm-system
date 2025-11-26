import type { Client } from '@/types'
import { useClienteForm } from '@/hooks/useClienteForm'
import { useClienteCompliance } from '@/hooks/useClienteCompliance'
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
  const { validate, getError } = useFieldValidation()

  const handleSuccess = async (savedClient?: Client) => {
    if (compliance.complianceData && savedClient?.id) {
      await compliance.saveComplianceData(savedClient.id, compliance.complianceData)
    }
    onClose()
  }

  const { formData, setFormData, loading, handleSubmit } = useClienteForm({
    cliente,
    onSuccess: handleSuccess,
    createCliente,
    updateCliente
  })

  const compliance = useClienteCompliance({ cliente, formData, setFormData })

  const handleCNPJChange = (value: string) => {
    const masked = compliance.cnpjMask.handleChange(value)
    setFormData({ ...formData, cnpj: masked })
  }

  const handlePhoneChange = (value: string) => {
    const masked = compliance.phoneMask.handleChange(value)
    setFormData({ ...formData, phone: masked })
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
        <div className="bg-[#0f0f0f]/98 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <ModalHeader title={cliente ? 'Editar Cliente' : 'Novo Cliente'} onClose={onClose} />
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {cliente?.id && (
              <button type="button" onClick={() => { compliance.handleRefreshCompliance().then(() => compliance.setShowComplianceModal(true)) }} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition border border-blue-500">
                <FileText className="w-4 h-4" />
                {compliance.complianceData ? 'Ver Dados da Receita Federal' : 'Buscar Dados da Receita Federal'}
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
              onCNPJSearch={compliance.handleCNPJSearch}
              cnpjError={getError('cnpj')}
              emailError={getError('email')}
              phoneError={getError('phone')}
              cnpjMaxLength={compliance.cnpjMask.maxLength}
              phoneMaxLength={compliance.phoneMask.maxLength}
              searching={compliance.searching}
            />
            <ModalActions onCancel={onClose} loading={loading} submitText={cliente ? 'Atualizar' : 'Criar Cliente'} />
          </form>
        </div>
      </div>
      {compliance.showComplianceModal && (
        <ComplianceModal data={compliance.complianceData} onClose={() => compliance.setShowComplianceModal(false)} onRefresh={cliente?.id ? compliance.handleRefreshCompliance : undefined} />
      )}
    </>
  )
}
