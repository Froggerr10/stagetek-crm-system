import Input from '@/components/atoms/Input'

interface QuotationTotalsProps {
  subtotal: number
  freight: number
  total: number
  onUpdateFreight: (freight: number) => void
}

export default function QuotationTotals({ subtotal, freight, total, onUpdateFreight }: QuotationTotalsProps) {
  return (
    <div className="border-t border-white/10 pt-4 space-y-2">
      <div className="flex justify-between text-gray-300">
        <span>Subtotal:</span>
        <span>R$ {subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-300">Frete:</span>
        <Input type="number" value={freight} onChange={(e) => onUpdateFreight(parseFloat(e.target.value) || 0)} className="w-32" />
      </div>
      <div className="flex justify-between text-xl font-bold text-white">
        <span>Total:</span>
        <span className="text-stagetek-red">R$ {total.toFixed(2)}</span>
      </div>
    </div>
  )
}
