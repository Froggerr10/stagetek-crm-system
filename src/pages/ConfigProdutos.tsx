import { useEffect, useState } from 'react'
import { Package, ExternalLink, AlertCircle, CheckCircle2, FileSpreadsheet } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function ConfigProdutos() {
  const [productsCount, setProductsCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProductsCount()
  }, [])

  async function fetchProductsCount() {
    const { count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
    setProductsCount(count || 0)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Package className="w-8 h-8" />
              Produtos
            </h1>
            <p className="text-gray-400 mt-2">
              Gerencie o catálogo de produtos e serviços.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-green-400 font-semibold text-lg mb-2">
                Catálogo Atual
              </h3>
              <p className="text-white text-2xl font-bold mb-1">
                {loading ? 'Carregando...' : `${productsCount} produtos cadastrados`}
              </p>
              <p className="text-gray-400 text-sm">
                Sistema configurado para cotações em BRL, USD e EUR
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <FileSpreadsheet className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-blue-400 font-semibold text-lg mb-3">
                Importação em Massa (Em breve!)
              </h3>
              <p className="text-gray-300 mb-3">
                Estamos desenvolvendo a funcionalidade de <span className="text-blue-400 font-semibold">importação de produtos via CSV/Excel</span>.
              </p>
              <p className="text-gray-400 text-sm">
                Você poderá importar centenas de produtos de uma vez, validar duplicatas e atualizar preços em lote.
              </p>
              <div className="mt-4 p-3 bg-blue-500/10 rounded border border-blue-500/20">
                <p className="text-blue-300 text-sm">
                  <strong>Story documentada:</strong> <code className="text-blue-400">docs/stories/4.1.importacao-csv-massa.md</code>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-yellow-500 font-semibold text-lg mb-3">
                Gerenciamento de Produtos
              </h3>
              <p className="text-gray-300 mb-4">
                Por enquanto, adicione produtos via Supabase Dashboard:
              </p>
              <ol className="text-gray-300 space-y-2 ml-4 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">1.</span>
                  <span>Acesse <span className="text-blue-400 font-mono">supabase.com</span> e faça login</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">2.</span>
                  <span>Selecione o projeto <span className="text-blue-400 font-mono">STAGETEK CRM</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">3.</span>
                  <span>Navegue: <span className="text-blue-400 font-mono">Table Editor → products</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">4.</span>
                  <span>Clique em <span className="text-green-400 font-mono">&quot;Insert row&quot;</span> para adicionar produtos</span>
                </li>
              </ol>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Abrir Supabase Dashboard
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-3">Categorias de Produtos</h3>
          <p className="text-gray-400 text-sm mb-4">
            Ao cadastrar produtos, use uma destas categorias:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded">
              <p className="text-purple-400 font-semibold text-sm">som</p>
              <p className="text-gray-400 text-xs">Equipamentos de áudio</p>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
              <p className="text-blue-400 font-semibold text-sm">luz</p>
              <p className="text-gray-400 text-xs">Equipamentos de iluminação</p>
            </div>
            <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded">
              <p className="text-orange-400 font-semibold text-sm">estrutura</p>
              <p className="text-gray-400 text-xs">Treliças e estruturas</p>
            </div>
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
              <p className="text-red-400 font-semibold text-sm">talha</p>
              <p className="text-gray-400 text-xs">Talhas e elevação</p>
            </div>
            <div className="p-3 bg-gray-500/10 border border-gray-500/30 rounded col-span-2">
              <p className="text-gray-400 font-semibold text-sm">outro</p>
              <p className="text-gray-400 text-xs">Outros equipamentos</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-800/50 rounded border border-gray-700">
            <h4 className="text-white font-semibold text-sm mb-2">Campos Obrigatórios</h4>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <strong>name:</strong> Nome do produto
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <strong>category:</strong> Uma das categorias acima
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <strong>price_brl:</strong> Preço em reais (ex: 1500.00)
              </li>
            </ul>
            <p className="text-gray-500 text-xs mt-3">
              Campos opcionais: sku, price_usd, price_eur, description, image_url, technical_specs
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
