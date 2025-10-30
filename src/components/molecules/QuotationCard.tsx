import { useState } from 'react';
import { Building2 } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import QuotationBadge from '@/components/atoms/QuotationBadge';
import QuotationActions from '@/components/molecules/QuotationActions';
import ResendEmailModal from '@/components/molecules/ResendEmailModal';
import { useQuotationHandlers } from '@/hooks/useQuotationHandlers';

interface QuotationCardProps {
  quotation: {
    id: string;
    quotation_number: string;
    total: number;
    status: 'draft' | 'sent';
    created_at: string;
    sent_to_email?: string;
    opportunity?: { id: string; title: string; client?: { name: string } };
  };
}

const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

export default function QuotationCard({ quotation: q }: QuotationCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const h = useQuotationHandlers();
  return (<>
    <Card className="group bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border-white/15 hover:border-stagetek-red transition-all">
      <CardHeader className="flex-row justify-between items-start">
        <div>
          <h3 className="font-semibold text-white">{q.quotation_number}</h3>
          {q.opportunity && <a href={`/oportunidades/${q.opportunity.id}/detalhes`} className="text-sm text-gray-400 hover:text-stagetek-red">{q.opportunity.title}</a>}
        </div>
        <QuotationBadge status={q.status} />
      </CardHeader>
      <CardContent className="space-y-2">
        {q.opportunity?.client && <p className="text-sm flex items-center gap-1 text-gray-300"><Building2 className="h-4 w-4" />{q.opportunity.client.name}</p>}
        <p className="text-2xl font-bold text-stagetek-red">{fmt(q.total)}</p>
        <p className="text-xs text-gray-400">
          Criada {formatDistanceToNow(new Date(q.created_at), { addSuffix: true, locale: ptBR })}
          {q.sent_to_email && ` • ${q.sent_to_email}`}</p>
      </CardContent>
      <CardFooter className="pt-3 border-t border-white/10">
        <QuotationActions quotationId={q.id} status={q.status} onDownloadPDF={() => h.handleDownloadPDF(q.id, q.quotation_number)} onResendEmail={() => setIsOpen(true)} onEdit={() => q.opportunity && h.handleEdit(q.opportunity.id, q.id)} />
      </CardFooter>
    </Card>
    <ResendEmailModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSend={(email) => h.handleResendEmail(q.id, email)} isSending={h.isSending} />
  </>);
}