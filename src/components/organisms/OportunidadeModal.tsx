import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Deal, Organization, Stage } from '@/types'

interface OportunidadeModalProps {
  deal: Deal | null
  organizations: Organization[]
  stages: Stage[]
  onClose: () => void
}

export default function OportunidadeModal({
  deal,
  organizations,
  stages,
  onClose,
}: OportunidadeModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    organizationId: '',
    value: 0,
    stageId: stages[0]?.id || '',
    probability: 0,
    expectedCloseDate: '',
  })

  useEffect(() => {
    if (deal) {
      setFormData({
        name: deal.name,
        organizationId: deal.organizationId,
        value: deal.value,
        stageId: deal.stageId,
        probability: deal.probability,
        expectedCloseDate: deal.expectedCloseDate || '',
      })
    } else if (stages[0]) {
      setFormData({ ...formData, stageId: stages[0].id })
    }
  }, [deal, stages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (deal) {
        // Update
        const { error } = await supabase
          .from('deals')
          .update({
            name: formData.name,
            organization_id: formData.organizationId,
            value: formData.value,
            stage_id: formData.stageId,
            probability: formData.probability,
            expected_close_date: formData.expectedCloseDate || null,
          })
          .eq('id', deal.id)

        if (error) throw error
      } else {
        // Insert
        const { error } = await supabase.from('deals').insert({
          name: formData.name,
          organization_id: formData.organizationId,
          contact_id: null,
          value: formData.value,
          currency: 'BRL',
          stage_id: formData.stageId,
          probability: formData.probability,
          expected_close_date: formData.expectedCloseDate || null,
          actual_close_date: null,
          status: 'open',
          loss_reason_id: null,
          source_id: null,
          assigned_to: null,
          tags: null,
          custom_fields: null,
        })

        if (error) throw error
      }

      onClose()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[rgba(255,255,255,0.08)] backdrop-blur-md border-b border-white/15 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {deal ? 'Editar Oportunidade' : 'Nova Oportunidade'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-base font-medium text-gray-300 mb-2">
              Nome da Oportunidade *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white/8 border border-white/15 rounded-lg text-white text-base placeholder:text-gray-500 focus:ring-2 focus:ring-stagetek-red focus:border-transparent"
              placeholder="Ex: Proposta para Evento XYZ"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-300 mb-2">
              Cliente *
            </label>
            <select
              value={formData.organizationId}
              onChange={(e) =>
                setFormData({ ...formData, organizationId: e.target.value })
              }
              required
              className="w-full px-4 py-3 bg-white/8 border border-white/15 rounded-lg text-white text-base focus:ring-2 focus:ring-stagetek-red focus:border-transparent"
            >
              <option value="">Selecione um cliente</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-medium text-gray-300 mb-2">
                Valor (R$) *
              </label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })
                }
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 bg-white/8 border border-white/15 rounded-lg text-white text-base placeholder:text-gray-500 focus:ring-2 focus:ring-stagetek-red focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-300 mb-2">
                Probabilidade (%) *
              </label>
              <input
                type="number"
                value={formData.probability}
                onChange={(e) =>
                  setFormData({ ...formData, probability: parseInt(e.target.value) || 0 })
                }
                required
                min="0"
                max="100"
                className="w-full px-4 py-3 bg-white/8 border border-white/15 rounded-lg text-white text-base placeholder:text-gray-500 focus:ring-2 focus:ring-stagetek-red focus:border-transparent"
                placeholder="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-medium text-gray-300 mb-2">
                Estágio *
              </label>
              <select
                value={formData.stageId}
                onChange={(e) => setFormData({ ...formData, stageId: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/8 border border-white/15 rounded-lg text-white text-base focus:ring-2 focus:ring-stagetek-red focus:border-transparent"
              >
                {stages.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-base font-medium text-gray-300 mb-2">
                Data de Fechamento Esperada
              </label>
              <input
                type="date"
                value={formData.expectedCloseDate}
                onChange={(e) =>
                  setFormData({ ...formData, expectedCloseDate: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/8 border border-white/15 rounded-lg text-white text-base focus:ring-2 focus:ring-stagetek-red focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-white/15">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white/8 border border-white/15 rounded-lg text-gray-300 font-medium hover:bg-white/15 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-stagetek-red hover:bg-stagetek-red-medium disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
            >
              {loading ? 'Salvando...' : deal ? 'Atualizar' : 'Criar Oportunidade'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
