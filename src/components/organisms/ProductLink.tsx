import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { Plus, Trash2 } from 'lucide-react'
import Spinner from '@/components/atoms/Spinner'

type Product = { id: string; name: string; price_brl: number; category: string }
type LinkedProduct = { id: string; product_id: string; quantity: number; product: Product }

export default function ProductLink({ opportunityId }: { opportunityId: string }) {
  const [linked, setLinked] = useState<LinkedProduct[]>([])
  const [available, setAvailable] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const fetchData = useCallback(async () => {
    setLoading(true)
    const [linkedRes, availRes] = await Promise.all([supabase.from('opportunity_products').select('id, product_id, quantity, product:products(id, name, price_brl, category)').eq('opportunity_id', opportunityId), supabase.from('products').select('id, name, price_brl, category').order('name')])
    setLinked((linkedRes.data || []) as any); setAvailable(availRes.data || []); setLoading(false)
  }, [opportunityId])
  useEffect(() => { fetchData() }, [fetchData])
  const handleAdd = async (productId: string) => { try { const { data: { user } } = await supabase.auth.getUser(); await supabase.from('opportunity_products').insert({ opportunity_id: opportunityId, product_id: productId, quantity: 1, added_by: user?.id }); toast.success('Produto adicionado!'); fetchData() } catch { toast.error('Erro ao adicionar') } }
  const handleRemove = async (id: string) => { try { await supabase.from('opportunity_products').delete().eq('id', id); toast.success('Produto removido!'); fetchData() } catch { toast.error('Erro ao remover') } }
  const fmt = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
  const card = "flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3"
  if (loading) return <div className="flex justify-center py-8"><Spinner size="md" /></div>
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Produtos Vinculados</h3>
        {linked.length > 0 && <div className="space-y-2">{linked.map(l => <div key={l.id} className={card}><div><p className="text-white font-medium">{(l.product as any).name}</p><p className="text-sm text-gray-400">Qtd: {l.quantity} • {fmt((l.product as any).price_brl * l.quantity)}</p></div><button onClick={() => handleRemove(l.id)} className="p-2 text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button></div>)}</div>}
        {!adding && <button onClick={() => setAdding(true)} className="w-full px-4 py-2 bg-[#e90101] hover:bg-[#c10101] text-white font-semibold rounded-lg flex items-center justify-center gap-2 mt-3"><Plus className="w-4 h-4" />Adicionar</button>}
      </div>
      {adding && <div><h3 className="text-lg font-semibold text-white mb-3">Catálogo</h3>
        <div className="grid gap-2 max-h-64 overflow-y-auto">{available.filter(p => !linked.some(l => l.product_id === p.id)).map(p => <div key={p.id} className={card}><div><p className="text-white font-medium">{p.name}</p><p className="text-sm text-gray-400">{p.category} • {fmt(p.price_brl)}</p></div><button onClick={() => { handleAdd(p.id); setAdding(false) }} className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded">Add</button></div>)}</div>
        <button onClick={() => setAdding(false)} className="mt-2 text-gray-400 hover:text-white text-sm">Cancelar</button>
      </div>}
    </div>
  )
}
