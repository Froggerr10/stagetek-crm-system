import { useState } from 'react'
import { Package, Plus, Edit2, Trash2, Power, PowerOff } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import ProductModal from '@/organisms/ProductModal'
import Spinner from '@/atoms/Spinner'

export default function ConfigProdutos() {
  const { products, loading, createProduct, updateProduct, deleteProduct, toggleActive } = useProducts()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  function handleNew() {
    setEditingProduct(null)
    setModalOpen(true)
  }

  function handleEdit(product) {
    setEditingProduct(product)
    setModalOpen(true)
  }

  async function handleSave(formData) {
    if (editingProduct) {
      return await updateProduct(editingProduct.id, formData)
    } else {
      return await createProduct(formData)
    }
  }

  async function handleDelete(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      await deleteProduct(id)
    }
  }

  async function handleToggle(id, isActive) {
    await toggleActive(id, !isActive)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Package className="w-8 h-8" />
              Produtos
            </h1>
            <p className="text-gray-400 mt-2">
              {products.length} produtos cadastrados
            </p>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Plus className="w-5 h-5" />
            Novo Produto
          </button>
        </div>

        {products.length === 0 ? (
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Nenhum produto cadastrado
            </h3>
            <p className="text-gray-400 mb-6">
              Comece adicionando seus primeiros produtos ao catálogo.
            </p>
            <button
              onClick={handleNew}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Plus className="w-5 h-5" />
              Adicionar Produto
            </button>
          </div>
        ) : (
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Categoria</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Preço BRL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Unidade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-gray-800/30">
                    <td className="px-6 py-4 text-sm text-gray-300 font-mono">{product.sku}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{product.name}</div>
                      {product.description && (
                        <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                          {product.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {product.category ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/30">
                          {product.category}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {product.price_brl ? `R$ ${product.price_brl.toFixed(2)}` : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{product.unit}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggle(product.id, product.is_active)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.is_active
                            ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                            : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
                        }`}
                      >
                        {product.is_active ? (
                          <><Power className="w-3 h-3" /> Ativo</>
                        ) : (
                          <><PowerOff className="w-3 h-3" /> Inativo</>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
