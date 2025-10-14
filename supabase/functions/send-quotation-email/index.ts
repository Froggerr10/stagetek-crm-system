import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  // CORS headers
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const { to, quotationNumber, pdfBase64 } = await req.json()

    // Send email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'STAGETEK <onboarding@resend.dev>',
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
          content: pdfBase64,
        }],
      }),
    })

    const resendData = await resendResponse.json()

    if (!resendResponse.ok) {
      throw new Error(resendData.message || 'Failed to send email')
    }

    return new Response(JSON.stringify({ success: true, data: resendData }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
})
