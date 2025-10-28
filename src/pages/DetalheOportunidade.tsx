import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, ThumbsUp, ThumbsDown, Settings, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Spinner from '@/components/atoms/Spinner'
import TaskList from '@/components/organisms/TaskList'
import Timeline from '@/components/organisms/Timeline'
import ContactList from '@/components/organisms/ContactList'
import EmailComposer from '@/components/organisms/EmailComposer'
import type { Opportunity, Client, FunnelStage } from '@/types'

type TabType = 'historico' | 'email' | 'tarefas' | 'contatos' | 'produtos' | 'arquivos'

export default function DetalheOportunidade() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>('historico')

  useEffect(() => { fetchOpportunity() }, [id])

  const fetchOpportunity = async () => {
    if (!id) return
    setLoading(true)
    const { data, error } = await supabase
      .from('opportunities')
      .select('*, client:clients(*), stage:funnel_stages(*)')
      .eq('id', id)
      .single()

    if (error) {
      toast.error('Erro ao carregar oportunidade')
      navigate('/oportunidades')
    } else {
      setOpportunity(data as any)
    }
    setLoading(false)
  }

  const handleWin = async () => {
    if (!id || !confirm('Marcar esta oportunidade como ganha?')) return
    const { error } = await supabase
      .from('opportunities')
      .update({ status: 'won', won_at: new Date().toISOString() })
      .eq('id', id)
    if (error) toast.error('Erro ao atualizar')
    else { toast.success('Oportunidade marcada como ganha!'); fetchOpportunity() }
  }

  const handleLoss = async () => {
    const reason = prompt('Motivo da perda:')
    if (!id || !reason) return
    const { error } = await supabase
      .from('opportunities')
      .update({ status: 'lost', lost_at: new Date().toISOString(), lost_reason: reason })
      .eq('id', id)
    if (error) toast.error('Erro ao atualizar')
    else { toast.success('Oportunidade marcada como perdida'); fetchOpportunity() }
  }

  const handleDelete = async () => {
    if (!id || !confirm('Excluir esta oportunidade permanentemente?')) return
    const { error } = await supabase.from('opportunities').delete().eq('id', id)
    if (error) toast.error('Erro ao excluir')
    else { toast.success('Oportunidade excluída'); navigate('/oportunidades') }
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen"><Spinner size="lg" /></div>
  if (!opportunity) return <div className="p-8 text-white">Oportunidade não encontrada</div>

  const tabs = [
    { id: 'historico', label: 'Histórico' },
    { id: 'email', label: 'E-mail' },
    { id: 'tarefas', label: 'Tarefas' },
    { id: 'contatos', label: 'Contatos' },
    { id: 'produtos', label: 'Produtos' },
    { id: 'arquivos', label: 'Arquivos' },
  ] as const

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="border-b border-white/10 bg-[rgba(255,255,255,0.03)]">
        <div className="container mx-auto px-6 py-4">
          <Breadcrumb items={[
            { label: 'Oportunidades', href: '/oportunidades' },
            { label: opportunity.title }
          ]} />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/oportunidades')} className="text-gray-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></button>
              <div>
                <h1 className="text-2xl font-bold text-white">{opportunity.title}</h1>
                <p className="text-sm text-gray-400">{(opportunity.client as any)?.name || 'Sem cliente'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleWin} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"><ThumbsUp className="w-4 h-4" />Marcar Venda</button>
              <button onClick={handleLoss} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"><ThumbsDown className="w-4 h-4" />Marcar Perda</button>
              <button className="p-2 text-gray-400 hover:text-white"><Settings className="w-5 h-5" /></button>
              <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Informações</h3>
              <dl className="space-y-2">
                <div><dt className="text-xs text-gray-400">Estágio</dt><dd className="text-sm font-medium text-white">{(opportunity.stage as any)?.name || '-'}</dd></div>
                <div><dt className="text-xs text-gray-400">Valor</dt><dd className="text-sm font-medium text-white">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(opportunity.value || 0)}</dd></div>
                <div><dt className="text-xs text-gray-400">Probabilidade</dt><dd className="text-sm font-medium text-white">{opportunity.probability || 0}%</dd></div>
                <div><dt className="text-xs text-gray-400">Status</dt><dd className="text-sm font-medium text-white">{opportunity.status === 'open' ? 'Aberta' : opportunity.status === 'won' ? 'Ganha' : 'Perdida'}</dd></div>
              </dl>
            </div>
          </aside>

          <main className="lg:col-span-6">
            <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg">
              <div className="border-b border-white/10">
                <nav className="flex -mb-px overflow-x-auto">
                  {tabs.map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)} className={`px-6 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${activeTab === tab.id ? 'border-[#e90101] text-[#e90101]' : 'border-transparent text-gray-400 hover:text-white hover:border-white/20'}`}>{tab.label}</button>
                  ))}
                </nav>
              </div>
              <div className="p-6">
                {activeTab === 'historico' && <Timeline opportunityId={id!} />}
                {activeTab === 'email' && <EmailComposer opportunityId={id!} clientEmail={(opportunity.client as any)?.email} onEmailSent={() => setActiveTab('historico')} />}
                {activeTab === 'tarefas' && <TaskList opportunityId={id} />}
                {activeTab === 'contatos' && <ContactList opportunityId={id} />}
                {activeTab === 'produtos' && <div className="text-gray-400">Produtos vinculados em desenvolvimento...</div>}
                {activeTab === 'arquivos' && <div className="text-gray-400">Anexos em desenvolvimento...</div>}
              </div>
            </div>
          </main>

          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-lg border border-white/15 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Cliente</h3>
              {opportunity.client ? (
                <div>
                  <p className="text-sm font-medium text-white">{(opportunity.client as any).name}</p>
                  <p className="text-xs text-gray-400 mt-1">{(opportunity.client as any).email || 'Sem e-mail'}</p>
                </div>
              ) : (
                <p className="text-xs text-gray-400">Nenhum cliente vinculado</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
