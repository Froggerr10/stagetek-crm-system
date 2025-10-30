import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Product, QuotationItem } from '@/types'
import ProductCatalog from '@/components/organisms/ProductCatalog'
import QuotationCart from '@/components/organisms/QuotationCart'
import Button from '@/components/molecules/Button'

export default function NovaCotacao() {
  const { opportunityId } = useParams()
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [items, setItems] = useState<QuotationItem[]>([])
  const [freight, setFreight] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      const { data } = await supabase.from('products').select('*').eq('is_active', true).order('category', { ascending: true })
      if (data) setProducts(data)
      setLoading(false)
    }
    loadProducts()
  }, [])

  if (loading) return <div className="p-8 text-white">Carregando...</div>

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Nova Cotação</h1>
          <Button onClick={() => navigate(-1)} variant="ghost">Voltar</Button>
        </div>
        <ProductCatalog products={products} onAddProduct={(product) => setItems([...items, { name: product.name, quantity: 1, unit_price: product.price_brl, subtotal: product.price_brl, product_id: product.id }])} />
        <QuotationCart items={items} freight={freight} onUpdateItems={setItems} onUpdateFreight={setFreight} opportunityId={opportunityId} />
      </div>
    </div>
  )
}
