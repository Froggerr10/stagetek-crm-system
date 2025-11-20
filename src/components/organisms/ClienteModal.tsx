import type { Client } from '@/types'
import { useClienteForm } from '@/hooks/useClienteForm'
import { useCNPJSearch } from '@/hooks/useCNPJSearch'
import { useInputMask } from '@/hooks/useInputMask'
import { useFieldValidation } from '@/hooks/useFieldValidation'
import ModalHeader from '@/components/molecules/ModalHeader'
import ModalActions from '@/components/molecules/ModalActions'
import ClienteFormFields from '@/components/organisms/ClienteFormFields'

type CreateClienteFn = (data: Omit<Client, 'id' | 'created_at' | 'updated_at'>) => Promise<Client | undefined>
type UpdateClienteFn = (id: string, data: Partial<Client>) => Promise<Client | undefined>

interface ClienteModalProps {
  cliente: Client | null
  onClose: () => void
  createCliente: CreateClienteFn
  updateCliente: UpdateClienteFn
}

export default function ClienteModal({ cliente, onClose, createCliente, updateCliente }: ClienteModalProps) {
  const { formData, setFormData, loading, handleSubmit } = useClienteForm({ cliente, onSuccess: onClose, createCliente, updateCliente })
  const { searchCNPJ, searching } = useCNPJSearch()
  const cnpjMask = useInputMask('cnpj')
  const phoneMask = useInputMask('phone')
  const { validate, getError } = useFieldValidation()

  const handleCNPJSearch = async () => {
    const data = await searchCNPJ(formData.cnpj)
    if (data) {
      setFormData({ ...formData, ...data })
      cnpjMask.setValue(data.cnpj)
      phoneMask.setValue(data.phone)
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <ModalHeader title={cliente ? 'Editar Cliente' : 'Novo Cliente'} onClose={onClose} />

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
  )
}