import type { QuotationItem as QuotationItemType } from '@/types'
import Input from '@/components/atoms/Input'

interface QuotationItemProps {
  item: QuotationItemType
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

export default function QuotationItem({ item, onUpdateQuantity, onRemove }: QuotationItemProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex justify-between items-center gap-3">
      <div className="flex-1">
        <p className="text-white font-semibold">{item.name}</p>
        <p className="text-sm text-gray-400">R$ {item.unit_price.toFixed(2)} × {item.quantity}</p>
      </div>
      <Input type="number" value={item.quantity} onChange={(e) => onUpdateQuantity(parseInt(e.target.value) || 1)} className="w-20" min={1} />
      <span className="text-white font-bold w-32 text-right">R$ {item.subtotal.toFixed(2)}</span>
      <button onClick={onRemove} className="w-9 h-9 flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 hover:text-red-300 rounded-lg font-bold text-xl transition-colors" title="Remover item">×</button>
    </div>
  )
}
