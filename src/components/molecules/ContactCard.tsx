import { Mail, Phone, User, Edit, Trash2, Star } from 'lucide-react'
import type { Contact } from '@/types'

interface ContactCardProps {
  contact: Contact
  onEdit: (contact: Contact) => void
  onDelete: (id: string) => void
}

export default function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] border border-white/15 rounded-lg p-4 hover:border-white/30 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-white">{contact.name}</h4>
          {contact.is_primary && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(contact)}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors"
            aria-label="Editar contato"
            title="Editar contato"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-colors"
            aria-label="Excluir contato"
            title="Excluir contato"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      {contact.position && <p className="text-sm text-gray-400 flex items-center gap-2 mb-2"><User className="w-3 h-3" />{contact.position}</p>}
      {contact.email && <p className="text-sm text-gray-400 flex items-center gap-2 mb-1"><Mail className="w-3 h-3" />{contact.email}</p>}
      {contact.phone && <p className="text-sm text-gray-400 flex items-center gap-2"><Phone className="w-3 h-3" />{contact.phone}</p>}
      {contact.notes && <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-white/10">{contact.notes}</p>}
    </div>
  )
}
