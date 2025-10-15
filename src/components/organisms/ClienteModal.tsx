import type { Client } from '@/types'
import { useClienteForm } from '@/hooks/useClienteForm'
import ModalHeader from '@/components/molecules/ModalHeader'
import ModalActions from '@/components/molecules/ModalActions'
import FormField from '@/components/molecules/FormField'
import AddressFields from '@/components/molecules/AddressFields'

interface ClienteModalProps {
  cliente: Client | null
  onClose: () => void
  createCliente: (data: Omit<Client, 'id' | 'created_at' | 'updated_at'>) => Promise<Client | undefined>
  updateCliente: (id: string, data: Partial<Client>) => Promise<Client | undefined>
}

export default function ClienteModal({ cliente, onClose, createCliente, updateCliente }: ClienteModalProps) {
  const { formData, setFormData, loading, handleSubmit } = useClienteForm({
    cliente,
    onSuccess: onClose,
    createCliente,
    updateCliente
  })

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <ModalHeader title={cliente ? 'Editar Cliente' : 'Novo Cliente'} onClose={onClose} />

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <FormField label="Nome da Empresa" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ex: ACME Corporation Ltda" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="CNPJ" value={formData.cnpj} onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })} placeholder="00.000.000/0000-00" />
            <FormField label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="contato@empresa.com.br" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Telefone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(11) 98765-4321" />
            <FormField label="Website" type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://empresa.com.br" />
          </div>

          <AddressFields address={formData.address} onChange={(address) => setFormData({ ...formData, address })} />

          <div>
            <label className="block text-base font-medium text-gray-300 mb-2">Status *</label>
            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })} required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-stagetek-red">
              <option value="active" className="bg-gray-900 text-white">Ativo</option>
              <option value="inactive" className="bg-gray-900 text-white">Inativo</option>
            </select>
          </div>

          <ModalActions onCancel={onClose} loading={loading} submitText={cliente ? 'Atualizar' : 'Criar Cliente'} />
        </form>
      </div>
    </div>
  )
}
