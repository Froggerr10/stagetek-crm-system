import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export const useQuotationHandlers = () => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleDownloadPDF = async (quotationId: string, quotationNumber: string) => {
    try {
      setIsDownloading(true);

      // Tentar baixar PDF do Storage
      const { data, error } = await supabase.storage
        .from('pdfs')
        .download(`quotations/${quotationNumber}.pdf`);

      if (error) {
        toast.error('PDF não encontrado. Gerando novo...');
        // TODO: Implementar geração de PDF (fallback)
        return;
      }

      // Criar URL do blob e fazer download
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Cotacao_${quotationNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('PDF baixado com sucesso!');
    } catch (err) {
      toast.error('Erro ao baixar PDF');
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleResendEmail = async (quotationId: string, email: string) => {
    try {
      setIsSending(true);

      const { error } = await supabase.functions.invoke('send-quotation-email', {
        body: { quotationId, recipientEmail: email }
      });

      if (error) throw error;

      // Atualizar status no banco
      await supabase
        .from('quotations')
        .update({ status: 'sent', sent_at: new Date().toISOString(), sent_to_email: email })
        .eq('id', quotationId);

      toast.success(`Email enviado para ${email}`);
    } catch (err) {
      toast.error('Erro ao enviar email');
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const handleEdit = (opportunityId: string, quotationId: string) => {
    navigate(`/oportunidades/${opportunityId}/cotacao/${quotationId}/editar`);
  };

  return {
    handleDownloadPDF,
    handleResendEmail,
    handleEdit,
    isDownloading,
    isSending
  };
};
