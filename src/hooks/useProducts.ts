import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export interface Product {
  id: string
  sku: string
  name: string
  description: string | null
  category: string | null
  price_brl: number | null
  price_usd: number | null
  price_eur: number | null
  unit: string
  specs: Record<string, unknown>
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductFormData {
  sku: string
  name: string
  description?: string
  category?: string
  price_brl?: number
  price_usd?: number
  price_eur?: number
  unit?: string
  specs?: Record<string, unknown>
  is_active?: boolean
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Erro ao carregar produtos')
    } finally {
      setLoading(false)
    }
  }

  async function createProduct(formData: ProductFormData) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...formData,
          is_active: formData.is_active ?? true,
          unit: formData.unit || 'un',
          specs: formData.specs || {}
        }])
        .select()
        .single()

      if (error) throw error

      setProducts(prev => [data, ...prev])
      toast.success('Produto criado com sucesso!')
      return { success: true, data }
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error('Erro ao criar produto')
      return { success: false, error }
    }
  }

  async function updateProduct(id: string, formData: Partial<ProductFormData>) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setProducts(prev => prev.map(p => p.id === id ? data : p))
      toast.success('Produto atualizado com sucesso!')
      return { success: true, data }
    } catch (error) {
      console.error('Error updating product:', error)
      toast.error('Erro ao atualizar produto')
      return { success: false, error }
    }
  }

  async function deleteProduct(id: string) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error

      setProducts(prev => prev.filter(p => p.id !== id))
      toast.success('Produto excluído com sucesso!')
      return { success: true }
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Erro ao excluir produto')
      return { success: false, error }
    }
  }

  async function toggleActive(id: string, isActive: boolean) {
    return updateProduct(id, { is_active: isActive })
  }

  return {
    products,
    loading,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleActive
  }
}
