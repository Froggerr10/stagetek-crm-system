import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Product, ProductFormData } from '@/hooks/useProducts'
import ProductPriceFields from '@/components/molecules/ProductPriceFields'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
  onSave: (data: ProductFormData) => Promise<{ success: boolean }>
}

const CATEGORIES = ['Som', 'Luz', 'Estrutura', 'Talha', 'Vídeo', 'Efeitos', 'Energia', 'Outros']

export default function ProductModal({ product, onClose, onSave }: ProductModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    sku: '',
    name: '',
    description: '',
    category: '',
    price_brl: 0,
    price_usd: 0,
    price_eur: 0,
    unit: 'un',
    is_active: true
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        sku: product.sku,
        name: product.name,
        description: product.description || '',
        category: product.category || '',
        price_brl: product.price_brl || 0,
        price_usd: product.price_usd || 0,
        price_eur: product.price_eur || 0,
        unit: product.unit,
        is_active: product.is_active
      })
    }
  }, [product])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const result = await onSave(formData)
    setSaving(false)
    if (result.success) onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f0f0f] rounded-lg border border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">SKU *</label>
              <input
                type="text"
                value={formData.sku}
                onChange={e => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                required
                placeholder="EX: TRE-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Categoria</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
              >
                <option value="">Selecione...</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nome *</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
              required
              placeholder="Ex: Treliça Q30 - 2m"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 h-24"
              placeholder="Descrição técnica..."
            />
          </div>

          <ProductPriceFields
            priceBrl={formData.price_brl || 0}
            priceUsd={formData.price_usd || 0}
            priceEur={formData.price_eur || 0}
            unit={formData.unit || 'un'}
            onPriceBrlChange={v => setFormData({ ...formData, price_brl: v })}
            onPriceUsdChange={v => setFormData({ ...formData, price_usd: v })}
            onPriceEurChange={v => setFormData({ ...formData, price_eur: v })}
            onUnitChange={v => setFormData({ ...formData, unit: v })}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 text-red-600 bg-black border-gray-700 rounded focus:ring-red-500"
            />
            <label htmlFor="is_active" className="text-sm text-gray-300">
              Produto ativo (disponível para cotações)
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {saving ? 'Salvando...' : 'Salvar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
