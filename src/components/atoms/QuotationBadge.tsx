import { Badge } from '@/components/ui/badge';

interface QuotationBadgeProps {
  status: 'draft' | 'sent';
}

export default function QuotationBadge({ status }: QuotationBadgeProps) {
  const variants = {
    draft: { className: 'bg-gray-100 text-gray-700', label: 'Rascunho' },
    sent: { className: 'bg-green-100 text-green-700', label: 'Enviada' }
  };

  const { className, label } = variants[status];
  return <Badge className={className}>{label}</Badge>;
}
