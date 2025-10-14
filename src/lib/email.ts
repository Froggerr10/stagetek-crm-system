import { supabase } from './supabase'

export async function sendQuotationEmail(to: string, quotationNumber: string, pdfBlob: Blob) {
  try {
    // Convert Blob to base64
    const buffer = await pdfBlob.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))

    // Call Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('send-quotation-email', {
      body: {
        to,
        quotationNumber,
        pdfBase64: base64,
      },
    })

    if (error) {
      console.error('Erro ao enviar email:', error)
      return { success: false, error: error.message }
    }

    if (!data.success) {
      return { success: false, error: data.error }
    }

    return { success: true, data: data.data }
  } catch (error: any) {
    console.error('Erro ao enviar email:', error)
    return { success: false, error: error.message }
  }
}
