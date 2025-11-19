import { useState, useEffect } from 'react'
import { User, Mail, Calendar, Shield, Key, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Perfil() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [])

  async function fetchUserData() {
    const { data } = await supabase.auth.getUser()
    setUser(data.user)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400">Carregando...</p>
      </div>
    )
  }

  const createdAt = user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }) : 'N/A'

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e90101] to-[#b00000] flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Meu Perfil</h1>
            <p className="text-gray-400 mt-1">
              Informações da sua conta STAGETEK
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Informações Básicas */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#e90101]" />
              Informações Básicas
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Email</label>
                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded border border-gray-700">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{user?.email || 'N/A'}</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">ID do Usuário</label>
                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded border border-gray-700">
                  <Key className="w-4 h-4 text-gray-400" />
                  <span className="text-white font-mono text-xs truncate">{user?.id || 'N/A'}</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">Membro desde</label>
                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded border border-gray-700">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{createdAt}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Segurança */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#e90101]" />
              Segurança
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded">
                <AlertCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-400 font-semibold text-sm">
                    Autenticação verificada
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Sua sessão está protegida por Supabase Auth
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-400 font-semibold text-sm">
                    Alterar senha
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Para redefinir sua senha, acesse o Supabase Dashboard ou use o recurso &quot;Esqueci minha senha&quot; na tela de login
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Permissões */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#e90101]" />
              Permissões
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Você tem acesso completo ao sistema STAGETEK CRM:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                Visualizar e gerenciar clientes
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                Criar e editar oportunidades
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                Gerar cotações e enviar emails
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                Configurar funis de vendas
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                Acessar relatórios e dashboards
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
