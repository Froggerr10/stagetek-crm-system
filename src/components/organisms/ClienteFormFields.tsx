import FormField from '@/components/molecules/FormField'
import CNPJField from '@/components/molecules/CNPJField'
import AddressFields from '@/components/molecules/AddressFields'
import StatusSelect from '@/components/molecules/StatusSelect'

interface ClienteFormData {
  name: string; cnpj: string; email: string; phone: string; website: string
  address: { street: string; city: string; state: string; zipcode: string }; status: string
}

interface ClienteFormFieldsProps {
  formData: ClienteFormData; onFieldChange: (field: keyof ClienteFormData, value: string) => void
  onCNPJChange: (value: string) => void; onPhoneChange: (value: string) => void
  onAddressChange: (address: ClienteFormData['address']) => void; onStatusChange: (status: string) => void
  onCNPJBlur: () => void; onEmailBlur: () => void; onPhoneBlur: () => void; onCNPJSearch: () => void
  cnpjError?: string; emailError?: string; phoneError?: string
  cnpjMaxLength: number; phoneMaxLength: number; searching: boolean
}

export default function ClienteFormFields(props: ClienteFormFieldsProps) {
  return (
    <>
      <FormField label="Nome da Empresa" required value={props.formData.name}
        onChange={(e) => props.onFieldChange('name', e.target.value)}
        placeholder="Ex: ACME Corporation Ltda" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CNPJField value={props.formData.cnpj} onChange={props.onCNPJChange} onBlur={props.onCNPJBlur}
          onSearch={props.onCNPJSearch} searching={props.searching} error={props.cnpjError}
          maxLength={props.cnpjMaxLength} />
        <FormField label="Email" type="email" value={props.formData.email}
          onChange={(e) => props.onFieldChange('email', e.target.value)} onBlur={props.onEmailBlur}
          placeholder="contato@empresa.com.br" error={props.emailError} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Telefone" value={props.formData.phone}
          onChange={(e) => props.onPhoneChange(e.target.value)} onBlur={props.onPhoneBlur}
          placeholder="(11) 98765-4321" maxLength={props.phoneMaxLength} error={props.phoneError} />
        <FormField label="Website" type="url" value={props.formData.website}
          onChange={(e) => props.onFieldChange('website', e.target.value)}
          placeholder="https://empresa.com.br" />
      </div>
      <AddressFields address={props.formData.address} onChange={props.onAddressChange} />
      <StatusSelect value={props.formData.status} onChange={props.onStatusChange} />
    </>
  )
}