import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import type { QuotationItem as QuotationItemType } from '@/types'
import QuotationItem from '@/components/molecules/QuotationItem'
import QuotationTotals from '@/components/molecules/QuotationTotals'
import Button from '@/components/atoms/Button'

interface QuotationCartProps {
  items: QuotationItemType[]
  freight: number
  onUpdateItems: (items: QuotationItemType[]) => void
  onUpdateFreight: (freight: number) => void
  opportunityId?: string
}

export default function QuotationCart({ items, freight, onUpdateItems, onUpdateFreight, opportunityId }: QuotationCartProps) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0)
  const total = subtotal + freight

  const updateQuantity = (index: number, quantity: number) => {
    const newItems = [...items]
    newItems[index].quantity = quantity
    newItems[index].subtotal = quantity * newItems[index].unit_price
    onUpdateItems(newItems)
  }

  const saveDraft = async () => {
    const { error } = await supabase.from('quotations').insert({ opportunity_id: opportunityId || null, items: JSON.stringify(items), subtotal, freight, total, status: 'draft', created_by: user?.id })
    if (!error) {
      alert('Cotação salva como rascunho!')
      navigate(-1)
    }
  }

  return (
    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Carrinho ({items.length} itens)</h2>
      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
        {items.map((item, i) => (
          <QuotationItem key={i} item={item} onUpdateQuantity={(qty) => updateQuantity(i, qty)} onRemove={() => onUpdateItems(items.filter((_, idx) => idx !== i))} />
        ))}
      </div>
      <QuotationTotals subtotal={subtotal} freight={freight} total={total} onUpdateFreight={onUpdateFreight} />
      <Button onClick={saveDraft} disabled={items.length === 0} className="w-full mt-4">Salvar Rascunho</Button>
    </div>
  )
}