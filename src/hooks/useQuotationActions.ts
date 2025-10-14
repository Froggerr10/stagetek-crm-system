import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { usePDFGeneration } from '@/hooks/usePDFGeneration.tsx'
import type { QuotationItem } from '@/types'

export function useQuotationActions() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { generatePDF, generating } = usePDFGeneration()

  const saveDraft = async (items: QuotationItem[], subtotal: number, freight: number, total: number, opportunityId?: string) => {
    const { error } = await supabase.from('quotations').insert({ opportunity_id: opportunityId || null, items: JSON.stringify(items), subtotal, freight, total, status: 'draft', created_by: user?.id })
    if (!error) {
      alert('Cotação salva como rascunho!')
      navigate(-1)
    }
  }

  const saveAndGeneratePDF = async (items: QuotationItem[], subtotal: number, freight: number, total: number, opportunityId?: string) => {
    const { data, error } = await supabase.from('quotations').insert({ opportunity_id: opportunityId || null, items: JSON.stringify(items), subtotal, freight, total, status: 'draft', created_by: user?.id }).select().single()
    if (!error && data) {
      await generatePDF(data.quotation_number, items, subtotal, freight, total)
      navigate(-1)
    }
  }

  return { saveDraft, saveAndGeneratePDF, generating }
}
