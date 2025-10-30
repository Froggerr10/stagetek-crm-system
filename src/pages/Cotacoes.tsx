import { ChevronRight } from 'lucide-react';
import TopBar from '@/components/organisms/TopBar';
import QuotationList from '@/components/organisms/QuotationList';
import { useCotacoes } from '@/hooks/useCotacoes';

export default function Cotacoes() {
  const { quotations, loading } = useCotacoes();

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <a href="/dashboard" className="hover:text-red-600">Dashboard</a>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Cotações</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Cotações</h1>
        </div>

        <QuotationList quotations={quotations} loading={loading} />
      </div>
    </div>
  );
}
