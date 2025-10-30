import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface Quotation {
  id: string;
  quotation_number: string;
  opportunity_id: string;
  opportunity?: {
    id: string;
    title: string;
    client?: { id: string; name: string };
  };
  items: unknown[];
  subtotal: number;
  freight: number;
  total: number;
  status: 'draft' | 'sent';
  sent_at?: string;
  sent_to_email?: string;
  pdf_url?: string;
  created_at: string;
  updated_at: string;
}

export const useCotacoes = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('quotations')
        .select(`
          *,
          opportunity:opportunities(
            id,
            title,
            client:clients(id, name)
          )
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      // Filtro por status
      const statusFilter = searchParams.get('status');
      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setQuotations(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, [page, searchParams]);

  return { quotations, loading, error, refetch: fetchQuotations };
};
