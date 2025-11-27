import { useState } from 'react'
import { Plus, Edit, Trash2, ChevronRight, Check, X } from 'lucide-react'
import { useFunnels } from '@/hooks/useFunnels'
import { useConfirm } from '@/hooks/useConfirm'
import ConfirmDialog from '@/components/molecules/ConfirmDialog'
import Spinner from '@/components/atoms/Spinner'

export default function ConfigFunis() {
  const { funnels, loading, createFunnel, updateFunnel, deleteFunnel, createStage, updateStage, deleteStage } = useFunnels()
  const { isOpen, options, confirm, handleConfirm, handleCancel } = useConfirm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newFunnelName, setNewFunnelName] = useState('')
  const [newStageModal, setNewStageModal] = useState<{ funnelId: string; open: boolean } | null>(null)
  const [newStageName, setNewStageName] = useState('')
  const [editingFunnelId, setEditingFunnelId] = useState<string | null>(null)
  const [editingFunnelName, setEditingFunnelName] = useState('')
  const [editingStageId, setEditingStageId] = useState<string | null>(null)
  const [editingStageName, setEditingStageName] = useState('')

  const handleCreateFunnel = async () => {
    if (!newFunnelName.trim()) return
    await createFunnel({ name: newFunnelName, description: '' })
    setNewFunnelName('')
    setIsModalOpen(false)
  }

  const handleDeleteFunnel = async (id: string, name: string) => {
    const confirmed = await confirm({
      title: 'Excluir Funil',
      message: `Tem certeza que deseja excluir o funil "${name}"? Esta ação não pode ser desfeita.`,
      confirmText: 'Excluir',
      variant: 'danger'
    })
    if (confirmed) {
      await deleteFunnel(id)
    }
  }

  const handleSaveFunnelName = async (id: string) => {
    if (!editingFunnelName.trim()) return
    await updateFunnel(id, { name: editingFunnelName })
    setEditingFunnelId(null)
  }

  const handleSaveStageName = async (id: string) => {
    if (!editingStageName.trim()) return
    await updateStage(id, { name: editingStageName })
    setEditingStageId(null)
  }

  const handleCreateStage = async () => {
    if (!newStageModal || !newStageName.trim()) return
    const funnel = funnels.find(f => f.id === newStageModal.funnelId)
    if (!funnel) return
    const nextOrder = Math.max(...(funnel.stages?.map(s => s.order_position) || [0])) + 1
    await createStage({
      funnel_id: newStageModal.funnelId,
      name: newStageName,
      color: '#6366f1',
      order_position: nextOrder,
    })
    setNewStageName('')
    setNewStageModal(null)
  }

  const handleDeleteStage = async (stageId: string, stageName: string) => {
    const confirmed = await confirm({
      title: 'Excluir Etapa',
      message: `Tem certeza que deseja excluir a etapa "${stageName}"? Esta ação não pode ser desfeita.`,
      confirmText: 'Excluir',
      variant: 'danger'
    })
    if (confirmed) {
      await deleteStage(stageId)
    }
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen"><Spinner size="lg" /></div>

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Configuração de Funis</h1>
          <p className="text-gray-400 mt-1 text-sm">Gerencie seus funis de vendas e etapas</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-[#e90101] text-white rounded-lg hover:bg-[#c10101] transition-all shadow-lg shadow-[#e90101]/20"
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
              <div className="flex items-center gap-3 flex-1">
                {editingFunnelId === funnel.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={editingFunnelName}
                      onChange={(e) => setEditingFunnelName(e.target.value)}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-xl font-bold focus:ring-2 focus:ring-[#e90101] flex-1 max-w-md"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveFunnelName(funnel.id)
                        if (e.key === 'Escape') setEditingFunnelId(null)
                      }}
                    />
                    <button onClick={() => handleSaveFunnelName(funnel.id)} className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition-all">
                      <Check className="w-5 h-5" />
                    </button>
                    <button onClick={() => setEditingFunnelId(null)} className="p-2 text-gray-400 hover:bg-white/10 rounded-lg transition-all">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-white">{funnel.name}</h2>
                      <p className="text-gray-400 text-sm mt-1">{funnel.stages.length} etapas configuradas</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingFunnelId(funnel.id)
                        setEditingFunnelName(funnel.name)
                      }}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                      title="Editar nome do funil"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleDeleteFunnel(funnel.id, funnel.name)} className="p-2 text-gray-400 hover:text-[#e90101] hover:bg-[#e90101]/10 rounded-lg transition-all">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Pipeline Visual - DESKTOP (Horizontal) */}
            <div className="hidden lg:flex items-center justify-between relative">
              {funnel.stages.map((stage, index) => (
                <div key={stage.id} className="flex items-center flex-1">
                  {/* Stage Circle + Label */}
                  <div className="flex flex-col items-center gap-3 relative z-10 group/stage">
                    {/* Bolinha */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all hover:scale-110 hover:shadow-xl"
                      style={{
                        backgroundColor: stage.color,
                        boxShadow: `0 8px 24px ${stage.color}40`,
                      }}
                    >
                      <span className="text-white font-bold text-lg">{stage.order_position}</span>
                    </div>

                    {/* Nome da Etapa */}
                    {editingStageId === stage.id ? (
                      <div className="flex flex-col items-center gap-2">
                        <input
                          type="text"
                          value={editingStageName}
                          onChange={(e) => setEditingStageName(e.target.value)}
                          className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm font-semibold focus:ring-2 focus:ring-[#e90101] text-center"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveStageName(stage.id)
                            if (e.key === 'Escape') setEditingStageId(null)
                          }}
                        />
                        <div className="flex gap-1">
                          <button onClick={() => handleSaveStageName(stage.id)} className="p-1 text-green-400 hover:bg-green-400/10 rounded">
                            <Check className="w-3 h-3" />
                          </button>
                          <button onClick={() => setEditingStageId(null)} className="p-1 text-gray-400 hover:bg-white/10 rounded">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <p className="text-white font-semibold text-sm">{stage.name}</p>
                          <button
                            onClick={() => {
                              setEditingStageId(stage.id)
                              setEditingStageName(stage.name)
                            }}
                            className="opacity-0 group-hover/stage:opacity-100 transition-opacity p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded"
                            title="Editar nome"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">Etapa {stage.order_position}</p>
                      </div>
                    )}

                    {/* Botão Delete (aparece no hover) */}
                    {editingStageId !== stage.id && (
                      <button
                        onClick={() => handleDeleteStage(stage.id, stage.name)}
                        className="opacity-0 group-hover/stage:opacity-100 transition-opacity p-1.5 text-gray-400 hover:text-[#e90101] hover:bg-[#e90101]/10 rounded-lg"
                        title="Excluir etapa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
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
                      <span className="text-white font-bold">{stage.order_position}</span>
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
                    <p className="text-gray-400 text-sm mt-1">Etapa {stage.order_position} do funil</p>
                  </div>

                  {/* Actions (Mobile) */}
                  <div className="flex items-center gap-2 pt-2">
                    <button onClick={() => handleDeleteStage(stage.id, stage.name)} className="p-2 text-gray-400 hover:text-[#e90101] hover:bg-[#e90101]/10 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Stage Button */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button onClick={() => setNewStageModal({ funnelId: funnel.id, open: true })} className="w-full py-3 bg-[rgba(255,255,255,0.03)] border border-dashed border-white/20 rounded-lg flex items-center justify-center gap-2 text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all">
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
            <p className="text-gray-400 text-sm mb-6">Digite o nome do novo funil de vendas</p>
            <input value={newFunnelName} onChange={(e) => setNewFunnelName(e.target.value)} placeholder="Ex: Funil de Exportação" className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-gray-500 mb-4" />
            <div className="flex gap-3">
              <button onClick={handleCreateFunnel} className="flex-1 px-4 py-3 bg-[#e90101] text-white rounded-lg hover:bg-[#c10101] transition-all font-medium shadow-lg shadow-[#e90101]/20">Criar</button>
              <button onClick={() => { setIsModalOpen(false); setNewFunnelName('') }} className="flex-1 px-4 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all font-medium">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nova Etapa */}
      {newStageModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[rgba(20,20,20,0.98)] backdrop-blur-xl border border-white/20 rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">Adicionar Etapa</h3>
            <p className="text-gray-400 text-sm mb-6">Digite o nome da nova etapa</p>
            <input value={newStageName} onChange={(e) => setNewStageName(e.target.value)} placeholder="Ex: Negociação" className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-gray-500 mb-4" />
            <div className="flex gap-3">
              <button onClick={handleCreateStage} className="flex-1 px-4 py-3 bg-[#e90101] text-white rounded-lg hover:bg-[#c10101] transition-all font-medium shadow-lg shadow-[#e90101]/20">Adicionar</button>
              <button onClick={() => { setNewStageModal(null); setNewStageName('') }} className="flex-1 px-4 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all font-medium">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* ConfirmDialog */}
      {isOpen && (
        <ConfirmDialog
          title={options.title}
          message={options.message}
          confirmText={options.confirmText}
          cancelText={options.cancelText}
          variant={options.variant}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}
