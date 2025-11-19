import { useEffect, useState } from 'react'
import { Users, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function ConfigUsuarios() {
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  useEffect(() => {
    getCurrentUser()
  }, [])

  async function getCurrentUser() {
    const { data } = await supabase.auth.getUser()
    setCurrentUser(data.user?.email || null)
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Users className="w-8 h-8" />
              Usuários
            </h1>
            <p className="text-gray-400 mt-2">
              Gerencie permissões e acessos da equipe.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-blue-400 font-semibold text-lg mb-2">
                Você está logado como
              </h3>
              <p className="text-white text-xl font-bold mb-1">
                {currentUser || 'Carregando...'}
              </p>
              <p className="text-gray-400 text-sm">
                Sistema configurado para uso interno (máximo 5 usuários)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-yellow-500 font-semibold text-lg mb-3">
                Gerenciamento de Usuários
              </h3>
              <p className="text-gray-300 mb-4">
                Para adicionar, remover ou gerenciar usuários, você precisa acessar o Supabase Dashboard:
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
                  <span>Navegue: <span className="text-blue-400 font-mono">Authentication → Users</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">4.</span>
                  <span>Clique em <span className="text-green-400 font-mono">&quot;Add User&quot;</span> para adicionar novos usuários</span>
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
          <h3 className="text-white font-semibold mb-3">Permissões do Sistema</h3>
          <p className="text-gray-400 text-sm mb-4">
            Todos os usuários têm as mesmas permissões atualmente:
          </p>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Visualizar e gerenciar clientes
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Criar e editar oportunidades
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Gerar cotações e enviar por email
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Configurar funis de vendas
            </li>
          </ul>
          <p className="text-gray-500 text-xs mt-4">
            Sistema de roles e permissões customizadas será implementado em versão futura.
          </p>
        </div>
      </div>
    </div>
  )
}
