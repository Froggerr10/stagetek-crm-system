import { Building2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import QuotationBadge from '@/components/atoms/QuotationBadge';

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

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default function QuotationCard({ quotation }: QuotationCardProps) {
  const { quotation_number, total, status, created_at, sent_to_email, opportunity } = quotation;

  return (
    <Card className="group hover:border-red-600 transition-all">
      <CardHeader className="flex-row justify-between items-start">
        <div>
          <h3 className="font-semibold">{quotation_number}</h3>
          {opportunity && (
            <a href={`/oportunidades/${opportunity.id}/detalhes`}
               className="text-sm text-muted-foreground hover:text-red-600">{opportunity.title}</a>
          )}
        </div>
        <QuotationBadge status={status} />
      </CardHeader>
      <CardContent className="space-y-2">
        {opportunity?.client && <p className="text-sm flex items-center gap-1">
          <Building2 className="h-4 w-4" />{opportunity.client.name}</p>}
        <p className="text-2xl font-bold text-red-600">{formatCurrency(total)}</p>
        <p className="text-xs text-muted-foreground">
          Criada {formatDistanceToNow(new Date(created_at), { addSuffix: true, locale: ptBR })}
          {sent_to_email && ` • ${sent_to_email}`}
        </p>
      </CardContent>
    </Card>
  );
}
