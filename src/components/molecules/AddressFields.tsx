import FormField from '@/components/molecules/FormField'

interface AddressFieldsProps {
  address: { street: string; city: string; state: string; zipcode: string }
  onChange: (address: { street: string; city: string; state: string; zipcode: string }) => void
}

export default function AddressFields({ address, onChange }: AddressFieldsProps) {
  return (
    <div className="border-t border-white/10 pt-6">
      <h3 className="text-lg font-semibold text-white mb-4">Endereço</h3>
      <div className="space-y-4">
        <FormField label="Rua / Logradouro" value={address.street} onChange={(e) => onChange({ ...address, street: e.target.value })} placeholder="Ex: Av. Paulista, 1000" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Cidade" value={address.city} onChange={(e) => onChange({ ...address, city: e.target.value })} placeholder="São Paulo" />
          <FormField label="Estado" value={address.state} onChange={(e) => onChange({ ...address, state: e.target.value })} placeholder="SP" />
          <FormField label="CEP" value={address.zipcode} onChange={(e) => onChange({ ...address, zipcode: e.target.value })} placeholder="00000-000" />
        </div>
      </div>
    </div>
  )
}
