import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Organization } from '@/types'
import Button from '@/components/atoms/Button'
import FormField from '@/components/molecules/FormField'

interface ClienteModalProps {
  cliente: Organization | null
  onClose: () => void
}

export default function ClienteModal({ cliente, onClose }: ClienteModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '', cnpj: '', industry: '', website: '', organizationType: 'cliente_final' as Organization['organizationType']
  })

  useEffect(() => {
    if (cliente) setFormData({ name: cliente.name, cnpj: cliente.cnpj || '', industry: cliente.industry || '', website: cliente.website || '', organizationType: cliente.organizationType })
  }, [cliente])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { name: formData.name, cnpj: formData.cnpj || null, industry: formData.industry || null, website: formData.website || null, organization_type: formData.organizationType }
      const { error } = cliente ? await supabase.from('organizations').update(payload).eq('id', cliente.id) : await supabase.from('organizations').insert({ ...payload, phones: null, emails: null, address: null, tags: null, custom_fields: null })
      if (error) throw error
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
        <div className="sticky top-0 bg-[rgba(255,255,255,0.08)] backdrop-blur-md border-b border-white/15 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{cliente ? 'Editar Cliente' : 'Novo Cliente'}</h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-2xl">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <FormField label="Nome da Empresa" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ex: ACME Corporation" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="CNPJ" value={formData.cnpj} onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })} placeholder="00.000.000/0000-00" />
            <div><label className="block text-base font-medium text-gray-300 mb-2">Tipo de Organização *</label><select value={formData.organizationType} onChange={(e) => setFormData({ ...formData, organizationType: e.target.value as any })} required className="w-full px-4 py-3 bg-white/8 border border-white/15 rounded-lg text-white text-base focus:ring-2 focus:ring-stagetek-red focus:border-transparent"><option value="fabricacao">Fabricação</option><option value="revenda">Revenda</option><option value="locacao">Locação</option><option value="cliente_final">Cliente Final</option></select></div>
          </div>
          <FormField label="Indústria/Setor" value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} placeholder="Ex: Eventos, Entretenimento" />
          <FormField label="Website" type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://exemplo.com.br" />
          <div className="flex justify-end space-x-4 pt-4 border-t border-white/15"><Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button><Button type="submit" disabled={loading}>{loading ? 'Salvando...' : cliente ? 'Atualizar' : 'Criar Cliente'}</Button></div>
        </form>
      </div>
    </div>
  )
}
