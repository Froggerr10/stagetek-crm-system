import { useState } from 'react'
import type { Product } from '@/types'
import ProductCard from '@/components/molecules/ProductCard'

interface ProductCatalogProps {
  products: Product[]
  onAddProduct: (product: Product) => void
}

export default function ProductCatalog({ products, onAddProduct }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['todos', 'som', 'luz', 'estrutura', 'talha', 'outro']
  const filteredProducts = products.filter(p =>
    (selectedCategory === 'todos' || p.category === selectedCategory) &&
    (searchTerm === '' || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku?.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Catálogo de Produtos</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome ou SKU..."
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                selectedCategory === cat
                  ? 'bg-[#e90101] text-white border border-[#e90101]'
                  : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAdd={onAddProduct} />
        ))}
      </div>
    </div>
  )
}
