import { Mail, Phone, Edit, Trash2, Building2 } from 'lucide-react'
import type { Client } from '@/types'
import AppleBadge from '../atoms/AppleBadge'
import AppleButton from '../atoms/AppleButton'

interface AppleClientCardProps {
  cliente: Client
  onEdit: () => void
  onDelete: () => void
}

export default function AppleClientCard({ cliente, onEdit, onDelete }: AppleClientCardProps) {
  return (
    <div className="
      bg-white/5 backdrop-blur-xl
      border border-white/10
      rounded-2xl p-6
      shadow-lg hover:shadow-xl
      transition-all duration-300 ease-out
      hover:scale-[1.02] hover:-translate-y-1
      group cursor-pointer
    ">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stagetek-red/20 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-stagetek-red" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-stagetek-red transition-colors">
                {cliente.name}
              </h3>
              <p className="text-sm text-gray-400">
                {cliente.cnpj || 'Sem CNPJ'}
              </p>
            </div>
          </div>
        </div>
        <AppleBadge variant={cliente.status === 'active' ? 'success' : 'default'}>
          {cliente.status === 'active' ? 'Ativo' : 'Inativo'}
        </AppleBadge>
      </div>
      
      {/* Contact Info */}
      <div className="space-y-4 mb-6">
        {cliente.email && (
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-sm text-gray-300">{cliente.email}</span>
          </div>
        )}
        {cliente.phone && (
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-sm text-gray-300">{cliente.phone}</span>
          </div>
        )}
      </div>
      
      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
        <AppleButton variant="ghost" size="sm" onClick={onEdit}>
          <Edit className="w-4 h-4" />
          Editar
        </AppleButton>
        <AppleButton variant="ghost" size="sm" onClick={onDelete}>
          <Trash2 className="w-4 h-4" />
          Excluir
        </AppleButton>
      </div>
    </div>
  )
}