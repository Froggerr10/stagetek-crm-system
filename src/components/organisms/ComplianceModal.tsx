import { X, Building2, Calendar, DollarSign, RefreshCw } from 'lucide-react'
import { ComplianceData } from '@/hooks/useComplianceData'
import ComplianceBadge from '@/components/atoms/ComplianceBadge'

interface ComplianceModalProps {
  data: ComplianceData | null
  onClose: () => void
  onRefresh?: () => void
  refreshing?: boolean
}

export default function ComplianceModal({ data, onClose, onRefresh, refreshing }: ComplianceModalProps) {
  if (!data) return null

  const formatDate = (date?: string) => date ? new Date(date).toLocaleDateString('pt-BR') : '-'
  const formatCurrency = (value?: number) => value ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value) : '-'

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end" onClick={onClose}>
      <div className="bg-[#0f0f0f] border-l border-gray-800 w-full max-w-md h-full overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-[#0f0f0f] border-b border-gray-800 p-6 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-white">Dados da Receita Federal</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-xs text-gray-500">
            Consultado em: {data.data_consulta ? new Date(data.data_consulta).toLocaleString('pt-BR') : '-'}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2"><Building2 className="w-4 h-4" /> Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between"><span className="text-gray-300 text-sm">Situação Cadastral</span><ComplianceBadge type="status" value={data.situacao_cadastral} /></div>
              <div className="flex items-center justify-between"><span className="text-gray-300 text-sm">Data da Situação</span><span className="text-white text-sm">{formatDate(data.data_situacao_cadastral)}</span></div>
              {data.motivo_situacao_cadastral && <div className="text-xs text-gray-500 mt-2">{data.motivo_situacao_cadastral}</div>}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Regime Tributário</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between"><span className="text-gray-300 text-sm">Simples Nacional</span><ComplianceBadge type="simples" value={data.opcao_simples} /></div>
              {data.opcao_simples && data.data_opcao_simples && <div className="text-xs text-gray-500">Desde {formatDate(data.data_opcao_simples)}</div>}
              <div className="flex items-center justify-between"><span className="text-gray-300 text-sm">MEI</span><ComplianceBadge type="mei" value={data.opcao_mei} /></div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2"><DollarSign className="w-4 h-4" /> Empresa</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between"><span className="text-gray-300 text-sm">Porte</span><span className="text-white text-sm">{data.porte || '-'}</span></div>
              <div className="flex items-center justify-between"><span className="text-gray-300 text-sm">Capital Social</span><span className="text-white text-sm">{formatCurrency(data.capital_social)}</span></div>
              <div className="flex items-center justify-between"><span className="text-gray-300 text-sm">Natureza Jurídica</span><span className="text-white text-sm text-right">{data.natureza_juridica || '-'}</span></div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2"><Calendar className="w-4 h-4" /> Atividade</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between"><span className="text-gray-300 text-sm">Data de Abertura</span><span className="text-white text-sm">{formatDate(data.data_inicio_atividade)}</span></div>
              <div className="flex items-start justify-between gap-2"><span className="text-gray-300 text-sm">CNAE Principal</span><span className="text-white text-sm text-right">{data.cnae_principal || '-'}<br /><span className="text-xs text-gray-500">{data.cnae_principal_descricao}</span></span></div>
            </div>
          </div>

          {onRefresh && (
            <button onClick={onRefresh} disabled={refreshing} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition">
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Atualizando...' : 'Atualizar Agora'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
