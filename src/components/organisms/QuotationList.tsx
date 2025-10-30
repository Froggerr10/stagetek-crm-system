import { Inbox } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import QuotationCard from '@/components/molecules/QuotationCard';

interface Quotation {
  id: string;
  quotation_number: string;
  total: number;
  status: 'draft' | 'sent';
  created_at: string;
  sent_to_email?: string;
  opportunity?: {
    id: string;
    title: string;
    client?: { name: string };
  };
}

interface QuotationListProps {
  quotations: Quotation[];
  loading: boolean;
}

export default function QuotationList({ quotations, loading }: QuotationListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-lg bg-white/5" />
        ))}
      </div>
    );
  }

  if (quotations.length === 0) {
    return (
      <div className="text-center py-12 bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg">
        <Inbox className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-300 mb-4">Nenhuma cotação criada ainda</p>
        <Button asChild className="bg-stagetek-red hover:bg-stagetek-red-medium">
          <Link to="/oportunidades">Criar primeira cotação</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {quotations.map(quotation => (
        <QuotationCard key={quotation.id} quotation={quotation} />
      ))}
    </div>
  );
}
