import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { Send } from 'lucide-react'

interface EmailComposerProps { opportunityId: string; clientEmail?: string; onEmailSent?: () => void }

export default function EmailComposer({ opportunityId, clientEmail, onEmailSent }: EmailComposerProps) {
  const [to, setTo] = useState(clientEmail || '')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)

  const handleSend = async () => {
    if (!to || !subject || !body) return toast.error('Preencha todos os campos')
    setSending(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('emails_sent').insert({ opportunity_id: opportunityId, to_email: to, subject, body, sent_by: user?.id })
      await supabase.functions.invoke('send-quotation-email', { body: { to, subject, body } })
      toast.success('Email enviado!')
      setSubject(''); setBody(''); onEmailSent?.()
    } catch (err: any) {
      toast.error(err.message || 'Erro ao enviar')
    } finally {
      setSending(false)
    }
  }

  const inputClass = "w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#e90101]"
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-white mb-2">Para</label>
        <input type="email" value={to} onChange={e => setTo(e.target.value)} placeholder="destinatario@exemplo.com" className={inputClass} />
      </div>
      <div><label className="block text-sm font-medium text-white mb-2">Assunto</label>
        <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Assunto do email" className={inputClass} />
      </div>
      <div><label className="block text-sm font-medium text-white mb-2">Mensagem</label>
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Digite sua mensagem..." rows={8} className={`${inputClass} resize-none`} />
      </div>
      <button onClick={handleSend} disabled={sending || !to || !subject || !body} className="w-full px-6 py-3 bg-[#e90101] hover:bg-[#c10101] text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed">
        <Send className="w-4 h-4" />{sending ? 'Enviando...' : 'Enviar Email'}
      </button>
    </div>
  )
}
