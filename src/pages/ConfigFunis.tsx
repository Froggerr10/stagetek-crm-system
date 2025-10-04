import { useState } from 'react'
import { Plus, Edit, Trash2, ChevronRight } from 'lucide-react'

interface Stage {
  id: string
  name: string
  color: string
  order: number
}

interface Funnel {
  id: string
  name: string
  stages: Stage[]
}

export default function ConfigFunis() {
  const [funnels, setFunnels] = useState<Funnel[]>([
    {
      id: '1',
      name: 'Funil de Vendas Principal',
      stages: [
        { id: 's1', name: 'Prospecção', color: '#6366f1', order: 1 },
        { id: 's2', name: 'Qualificação', color: '#8b5cf6', order: 2 },
        { id: 's3', name: 'Proposta', color: '#ec4899', order: 3 },
        { id: 's4', name: 'Negociação', color: '#f59e0b', order: 4 },
        { id: 's5', name: 'Fechado', color: '#10b981', order: 5 },
      ],
    },
    {
      id: '2',
      name: 'Funil Exportação',
      stages: [
        { id: 's6', name: 'Contato Inicial', color: '#3b82f6', order: 1 },
        { id: 's7', name: 'Documentação', color: '#6366f1', order: 2 },
        { id: 's8', name: 'Cotação Frete', color: '#8b5cf6', order: 3 },
        { id: 's9', name: 'Aprovação', color: '#ec4899', order: 4 },
        { id: 's10', name: 'Embarque', color: '#10b981', order: 5 },
      ],
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Configuração de Funis</h1>
          <p className="text-gray-400 mt-1 text-sm">Gerencie seus funis de vendas e etapas</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#e90101] text-white rounded-lg hover:bg-[#c10101] transition-all shadow-lg shadow-[#e90101]/20"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Novo Funil</span>
        </button>
      </div>

      <div className="space-y-8">
        {funnels.map((funnel) => (
          <div
            key={funnel.id}
            className="bg-[rgba(255,255,255,0.05)] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all"
          >
            {/* Header do Funil */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">{funnel.name}</h2>
                <p className="text-gray-400 text-sm mt-1">{funnel.stages.length} etapas configuradas</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-[#e90101] hover:bg-[#e90101]/10 rounded-lg transition-all">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Pipeline Visual - DESKTOP (Horizontal) */}
            <div className="hidden lg:flex items-center justify-between relative">
              {funnel.stages.map((stage, index) => (
                <div key={stage.id} className="flex items-center flex-1">
                  {/* Stage Circle + Label */}
                  <div className="flex flex-col items-center gap-3 relative z-10">
                    {/* Bolinha */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all hover:scale-110 hover:shadow-xl group"
                      style={{
                        backgroundColor: stage.color,
                        boxShadow: `0 8px 24px ${stage.color}40`,
                      }}
                    >
                      <span className="text-white font-bold text-lg">{stage.order}</span>
                    </div>

                    {/* Nome da Etapa */}
                    <div className="text-center">
                      <p className="text-white font-semibold text-sm">{stage.name}</p>
                      <p className="text-gray-500 text-xs mt-1">Etapa {stage.order}</p>
                    </div>
                  </div>

                  {/* Conector (seta) */}
                  {index < funnel.stages.length - 1 && (
                    <div className="flex-1 flex items-center justify-center mx-2">
                      <div
                        className="h-1 flex-1 rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${stage.color}, ${funnel.stages[index + 1].color})`,
                        }}
                      />
                      <ChevronRight
                        className="w-6 h-6 mx-1"
                        style={{ color: funnel.stages[index + 1].color }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pipeline Visual - MOBILE (Vertical) */}
            <div className="flex flex-col gap-4 lg:hidden">
              {funnel.stages.map((stage, index) => (
                <div key={stage.id} className="flex items-start gap-4">
                  {/* Coluna da Bolinha + Conector */}
                  <div className="flex flex-col items-center">
                    {/* Bolinha */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        backgroundColor: stage.color,
                        boxShadow: `0 4px 16px ${stage.color}40`,
                      }}
                    >
                      <span className="text-white font-bold">{stage.order}</span>
                    </div>

                    {/* Conector Vertical */}
                    {index < funnel.stages.length - 1 && (
                      <div
                        className="w-1 h-12 rounded-full my-2"
                        style={{
                          background: `linear-gradient(to bottom, ${stage.color}, ${funnel.stages[index + 1].color})`,
                        }}
                      />
                    )}
                  </div>

                  {/* Informações da Etapa */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-white font-semibold">{stage.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">Etapa {stage.order} do funil</p>
                  </div>

                  {/* Actions (Mobile) */}
                  <div className="flex items-center gap-2 pt-2">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-[#e90101] hover:bg-[#e90101]/10 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Stage Button */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button className="w-full py-3 bg-[rgba(255,255,255,0.03)] border border-dashed border-white/20 rounded-lg flex items-center justify-center gap-2 text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all">
                <Plus className="w-5 h-5" />
                <span className="font-medium">Adicionar Etapa</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Novo Funil */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[rgba(20,20,20,0.98)] backdrop-blur-xl border border-white/20 rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">Criar Novo Funil</h3>
            <p className="text-gray-400 text-sm mb-6">Funcionalidade em desenvolvimento...</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full px-4 py-3 bg-[#e90101] text-white rounded-lg hover:bg-[#c10101] transition-all font-medium shadow-lg shadow-[#e90101]/20"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
