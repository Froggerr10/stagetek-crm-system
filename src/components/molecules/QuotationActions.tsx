import { Eye, Mail, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuotationActionsProps {
  quotationId: string;
  status: 'draft' | 'sent';
  onDownloadPDF: () => void;
  onResendEmail: () => void;
  onEdit: () => void;
}

export default function QuotationActions({
  status,
  onDownloadPDF,
  onResendEmail,
  onEdit
}: QuotationActionsProps) {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={onDownloadPDF}>
        <Eye className="h-4 w-4 mr-1" />
        Visualizar
      </Button>
      <Button variant="outline" size="sm" onClick={onResendEmail}>
        <Mail className="h-4 w-4 mr-1" />
        Reenviar
      </Button>
      {status === 'draft' && (
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit2 className="h-4 w-4 mr-1" />
          Editar
        </Button>
      )}
    </div>
  );
}
