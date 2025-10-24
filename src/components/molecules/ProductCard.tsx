import type { Product } from '@/types'
import Button from '@/components/molecules/Button'
import Badge from '@/components/molecules/Badge'

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-white">{product.name}</h3>
          <p className="text-sm text-gray-400">{product.sku}</p>
        </div>
        <Badge>{product.category}</Badge>
      </div>
      <p className="text-sm text-gray-300 mb-3">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-stagetek-red">R$ {product.price_brl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        <Button size="sm" onClick={() => onAdd(product)}>Adicionar</Button>
      </div>
    </div>
  )
}
