import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import ContactCard from '@/components/molecules/ContactCard'
import ContactModal from '@/components/molecules/ContactModal'
import Spinner from '@/components/atoms/Spinner'
import type { Contact, ContactFormData } from '@/types'

export default function ContactList({ opportunityId, clientId }: { opportunityId?: string; clientId?: string }) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

  useEffect(() => { fetchContacts() }, [opportunityId, clientId])

  const fetchContacts = async () => {
    setLoading(true)
    let query = supabase.from('contacts').select('*').order('is_primary', { ascending: false }).order('created_at', { ascending: false })
    if (opportunityId) query = query.eq('opportunity_id', opportunityId)
    if (clientId) query = query.eq('client_id', clientId)
    const { data } = await query
    setContacts(data || [])
    setLoading(false)
  }

  const handleSave = async (formData: ContactFormData) => {
    if (editingContact) {
      const { error } = await supabase.from('contacts').update(formData).eq('id', editingContact.id)
      if (error) toast.error('Erro ao atualizar contato')
      else toast.success('Contato atualizado!')
    } else {
      const { error } = await supabase.from('contacts').insert([formData])
      if (error) toast.error('Erro ao criar contato')
      else toast.success('Contato criado!')
    }
    fetchContacts()
    setModalOpen(false)
    setEditingContact(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir este contato?')) return
    const { error } = await supabase.from('contacts').delete().eq('id', id)
    if (error) toast.error('Erro ao excluir')
    else { toast.success('Contato excluído'); fetchContacts() }
  }

  if (loading) return <div className="flex justify-center p-8"><Spinner /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-white">Contatos ({contacts.length})</h3><button onClick={() => { setEditingContact(null); setModalOpen(true) }} className="flex items-center gap-2 px-3 py-2 bg-[#e90101] text-white rounded-lg hover:bg-[#c10101] transition text-sm"><Plus className="w-4 h-4" />Adicionar</button></div>
      {contacts.length === 0 ? <p className="text-gray-400 text-center py-8">Nenhum contato cadastrado</p> : <div className="grid gap-3">{contacts.map(contact => <ContactCard key={contact.id} contact={contact} onEdit={(c) => { setEditingContact(c); setModalOpen(true) }} onDelete={handleDelete} />)}</div>}
      {modalOpen && <ContactModal contact={editingContact} clientId={clientId || null} opportunityId={opportunityId || null} onSave={handleSave} onClose={() => { setModalOpen(false); setEditingContact(null) }} />}
    </div>
  )
}
