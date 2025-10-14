import { useState } from 'react'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

interface EmailModalProps {
  onSend: (email: string) => void
  onClose: () => void
  sending: boolean
}

export default function EmailModal({ onSend, onClose, sending }: EmailModalProps) {
  const [email, setEmail] = useState('')
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[rgba(30,30,30,0.95)] backdrop-blur-lg border border-white/15 rounded-lg shadow-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-white mb-4">Enviar Cotação por Email</h2>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="destinatario@exemplo.com" className="mb-4" autoFocus />
        <div className="flex gap-3">
          <Button onClick={onClose} variant="secondary" className="flex-1" disabled={sending}>Cancelar</Button>
          <Button onClick={() => onSend(email)} disabled={!isValid || sending} className="flex-1">{sending ? 'Enviando...' : 'Enviar'}</Button>
        </div>
      </div>
    </div>
  )
}
