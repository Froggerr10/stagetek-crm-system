import type { Opportunity, Client, FunnelStage } from '@/types'
import { useOportunidadeForm } from '@/hooks/useOportunidadeForm'
import { useNumberValidation } from '@/hooks/useNumberValidation'
import ModalHeader from '@/components/molecules/ModalHeader'
import ModalActions from '@/components/molecules/ModalActions'
import FormField from '@/components/molecules/FormField'

interface OportunidadeModalProps { opportunity: Opportunity | null; clients: Client[]; stages: FunnelStage[]; onClose: () => void }

export default function OportunidadeModal({ opportunity, clients, stages, onClose }: OportunidadeModalProps) {
  const { formData, setFormData, loading, handleSubmit } = useOportunidadeForm(opportunity, stages, onClose)
  const { validate, getError } = useNumberValidation()
  const inputClass = "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-stagetek-red"

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-[#0f0f0f]/98 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <ModalHeader title={opportunity ? 'Editar Oportunidade' : 'Nova Oportunidade'} onClose={onClose} />
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <FormField label="Nome da Oportunidade" required>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className={`${inputClass} placeholder:text-gray-400 focus:bg-white/15`} placeholder="Ex: Proposta para Evento XYZ" />
          </FormField>
          <FormField label="Cliente" required>
            <select value={formData.client_id || ''} onChange={(e) => setFormData({ ...formData, client_id: e.target.value })} required className={inputClass}>
              <option value="" className="bg-gray-900 text-white">Selecione um cliente</option>
              {clients.map((client) => <option key={client.id} value={client.id} className="bg-gray-900 text-white">{client.name}</option>)}
            </select>
          </FormField>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Valor (R$)" required error={getError('value')}>
              <input
                type="number"
                value={formData.value || 0}
                onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                onBlur={(e) => validate('value', parseFloat(e.target.value), 0)}
                required
                min="0"
                step="0.01"
                className={inputClass}
              />
            </FormField>
            <FormField label="Probabilidade (%)" required error={getError('probability')}>
              <input
                type="number"
                value={formData.probability || 0}
                onChange={(e) => setFormData({ ...formData, probability: parseInt(e.target.value) || 0 })}
                onBlur={(e) => validate('probability', parseInt(e.target.value), 0, 100)}
                required
                min="0"
                max="100"
                className={inputClass}
              />
            </FormField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Estágio" required>
              <select value={formData.stage_id || ''} onChange={(e) => setFormData({ ...formData, stage_id: e.target.value })} required className={inputClass}>
                <option value="" className="bg-gray-900 text-white">Selecione um estágio</option>
                {stages.map((stage) => <option key={stage.id} value={stage.id} className="bg-gray-900 text-white">{stage.name}</option>)}
              </select>
            </FormField>
            <FormField label="Data de Fechamento">
              <input type="date" value={formData.expected_close_date || ''} onChange={(e) => setFormData({ ...formData, expected_close_date: e.target.value })} className={inputClass} />
            </FormField>
          </div>
          <ModalActions onCancel={onClose} loading={loading} submitText={opportunity ? 'Atualizar' : 'Criar Oportunidade'} />
        </form>
      </div>
    </div>
  )
}