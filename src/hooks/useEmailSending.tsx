import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { pdf } from '@react-pdf/renderer'
import QuotationPDF from '@/components/templates/QuotationPDF'
import { sendQuotationEmail } from '@/lib/email'
import toast from 'react-hot-toast'
import type { QuotationItem } from '@/types'

export function useEmailSending() {
  const [sending, setSending] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const saveAndSendEmail = async (email: string, items: QuotationItem[], subtotal: number, freight: number, total: number, opportunityId?: string) => {
    setSending(true)
    try {
      // 1. Save quotation
      const { data: quotation, error: saveError } = await supabase.from('quotations').insert({ opportunity_id: opportunityId || null, items: JSON.stringify(items), subtotal, freight, total, status: 'draft', created_by: user?.id }).select().single()
      if (saveError || !quotation) throw new Error('Erro ao salvar cotação')

      // 2. Generate PDF
      const doc = <QuotationPDF quotationNumber={quotation.quotation_number} items={items} subtotal={subtotal} freight={freight} total={total} />
      const pdfBlob = await pdf(doc).toBlob()

      // 3. Send email
      const result = await sendQuotationEmail(email, quotation.quotation_number, pdfBlob)
      if (!result.success) throw new Error(result.error || 'Erro ao enviar email')

      // 4. Update status to 'sent'
      await supabase.from('quotations').update({ status: 'sent', sent_at: new Date().toISOString(), sent_to_email: email }).eq('id', quotation.id)

      toast.success(`Email enviado para ${email} com sucesso!`)
      navigate(-1)
    } catch (error: any) {
      console.error('Erro:', error)
      toast.error(error.message || 'Erro ao enviar email. Verifique a configuração do Resend.')
    } finally {
      setSending(false)
    }
  }

  return { saveAndSendEmail, sending }
}
