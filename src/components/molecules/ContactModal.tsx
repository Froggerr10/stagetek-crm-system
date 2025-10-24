import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Input from '@/components/atoms/Input'
import Label from '@/components/atoms/Label'
import type { Contact, ContactFormData } from '@/types'

interface ContactModalProps {
  contact: Contact | null
  clientId: string | null
  opportunityId: string | null
  onSave: (data: ContactFormData) => Promise<void>
  onClose: () => void
}

export default function ContactModal({ contact, clientId, opportunityId, onSave, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({ client_id: clientId, opportunity_id: opportunityId, name: '', email: null, phone: null, position: null, is_primary: false, notes: null })

  useEffect(() => { if (contact) setFormData({ client_id: contact.client_id, opportunity_id: contact.opportunity_id, name: contact.name, email: contact.email, phone: contact.phone, position: contact.position, is_primary: contact.is_primary, notes: contact.notes }) }, [contact])

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); await onSave(formData); onClose() }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[rgba(20,20,20,0.98)] backdrop-blur-xl border border-white/20 rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">{contact ? 'Editar Contato' : 'Novo Contato'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><Label>Nome *</Label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
          <div><Label>Cargo</Label><Input value={formData.position || ''} onChange={(e) => setFormData({ ...formData, position: e.target.value })} placeholder="Ex: Gerente de Compras" /></div>
          <div><Label>E-mail</Label><Input type="email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>
          <div><Label>Telefone</Label><Input value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(11) 99999-9999" /></div>
          <div><label className="flex items-center gap-2 text-sm text-gray-300"><input type="checkbox" checked={formData.is_primary} onChange={(e) => setFormData({ ...formData, is_primary: e.target.checked })} className="w-4 h-4 bg-white/5 border-white/20 rounded" />Contato principal</label></div>
          <div className="flex gap-3 pt-4"><button type="submit" className="flex-1 px-4 py-2 bg-[#e90101] text-white rounded-lg hover:bg-[#c10101] transition">Salvar</button><button type="button" onClick={onClose} className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition">Cancelar</button></div>
        </form>
      </div>
    </div>
  )
}
