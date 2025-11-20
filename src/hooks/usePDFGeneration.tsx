import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import toast from 'react-hot-toast'
import QuotationPDF from '@/components/templates/QuotationPDF'
import type { QuotationItem } from '@/types'

export function usePDFGeneration() {
  const [generating, setGenerating] = useState(false)

  const generatePDF = async (quotationNumber: string, items: QuotationItem[], subtotal: number, freight: number, total: number) => {
    if (items.length === 0) {
      toast.error('Adicione pelo menos um item à cotação')
      return null
    }

    setGenerating(true)
    try {
      const doc = <QuotationPDF quotationNumber={quotationNumber} items={items} subtotal={subtotal} freight={freight} total={total} />
      const blob = await pdf(doc).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Cotacao_${quotationNumber}.pdf`
      link.click()
      URL.revokeObjectURL(url)
      return blob
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      toast.error('Erro ao gerar PDF. Tente novamente.')
      return null
    } finally {
      setGenerating(false)
    }
  }

  return { generatePDF, generating }
}
