import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuotationList from '@/components/organisms/QuotationList';
import QuotationsFilterBar from '@/components/organisms/QuotationsFilterBar';
import { useCotacoes } from '@/hooks/useCotacoes';

export default function Cotacoes() {
  const { quotations, loading } = useCotacoes();

  return (
    <div className="p-8">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/dashboard" className="hover:text-stagetek-red transition">Dashboard</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white font-medium">Cotações</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Cotações</h1>
      </div>

      <QuotationsFilterBar />
      <QuotationList quotations={quotations} loading={loading} />
    </div>
  );
}
