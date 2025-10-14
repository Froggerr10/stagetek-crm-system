import type { QuotationItem as QuotationItemType } from '@/types'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

interface QuotationItemProps {
  item: QuotationItemType
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

export default function QuotationItem({ item, onUpdateQuantity, onRemove }: QuotationItemProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex justify-between items-center">
      <div className="flex-1">
        <p className="text-white font-semibold">{item.name}</p>
        <p className="text-sm text-gray-400">R$ {item.unit_price.toFixed(2)} × {item.quantity}</p>
      </div>
      <Input type="number" value={item.quantity} onChange={(e) => onUpdateQuantity(parseInt(e.target.value) || 1)} className="w-20 mx-2" min={1} />
      <span className="text-white font-bold w-32 text-right">R$ {item.subtotal.toFixed(2)}</span>
      <Button size="sm" variant="ghost" onClick={onRemove} className="text-red-400 ml-2">×</Button>
    </div>
  )
}
