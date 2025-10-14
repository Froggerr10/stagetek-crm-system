import Input from '@/components/atoms/Input'

interface QuotationTotalsProps {
  subtotal: number
  freight: number
  total: number
  onUpdateFreight: (freight: number) => void
}

export default function QuotationTotals({ subtotal, freight, total, onUpdateFreight }: QuotationTotalsProps) {
  const handleFreightChange = (value: string) => onUpdateFreight(Math.max(0, parseFloat(value.replace(/^0+(?=\d)/, '')) || 0))
  const formatBRL = (val: number) => val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="border-t border-white/10 pt-4 space-y-2">
      <div className="flex justify-between text-gray-300">
        <span>Subtotal:</span>
        <span>R$ {formatBRL(subtotal)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-300">Frete:</span>
        <div className="relative w-40">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
          <Input type="number" value={freight || ''} onChange={(e) => handleFreightChange(e.target.value)} className="w-full pl-10" min="0" step="0.01" placeholder="0,00" />
        </div>
      </div>
      <div className="flex justify-between text-xl font-bold text-white">
        <span>Total:</span>
        <span className="text-stagetek-red">R$ {formatBRL(total)}</span>
      </div>
    </div>
  )
}