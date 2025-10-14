import { Resend } from 'resend'

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY)

export async function sendQuotationEmail(to: string, quotationNumber: string, pdfBlob: Blob) {
  try {
    // Convert Blob to base64
    const buffer = await pdfBlob.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))

    const { data, error } = await resend.emails.send({
      from: 'STAGETEK <cotacoes@stagetek.com.br>',
      to: [to],
      subject: `Cotação ${quotationNumber} - STAGETEK Equipamentos`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #e90101; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">STAGETEK</h1>
          </div>
          <div style="padding: 30px; background: #f5f5f5;">
            <p style="font-size: 16px; color: #333;">Olá,</p>
            <p style="font-size: 14px; color: #666;">Segue em anexo a cotação <strong>${quotationNumber}</strong> para sua análise.</p>
            <p style="font-size: 14px; color: #666;">O PDF contém todos os detalhes dos produtos, quantidades e valores.</p>
            <p style="font-size: 14px; color: #666; margin-top: 20px;">Qualquer dúvida, estamos à disposição!</p>
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              Atenciosamente,<br>
              <strong>Equipe STAGETEK</strong><br>
              equipamentos@stagetek.com.br<br>
              (11) 1234-5678
            </p>
          </div>
        </div>
      `,
      attachments: [{
        filename: `Cotacao_${quotationNumber}.pdf`,
        content: base64,
      }],
    })

    if (error) {
      console.error('Erro ao enviar email:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao enviar email:', error)
    return { success: false, error: error.message }
  }
}
