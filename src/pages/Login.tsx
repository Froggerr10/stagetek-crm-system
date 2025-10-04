import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error) setError(error.message)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative" style={{
      background: 'radial-gradient(circle at top left, #1a0404, #0a0a0a)'
    }}>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 20% 20%, rgba(233,1,1,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(233,1,1,0.1), transparent 30%)',
        zIndex: 0
      }} />
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(233,1,1,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        zIndex: 1
      }} />

      {/* Login Card */}
      <div className="w-full max-w-[480px] p-12 relative z-10 animate-[cardEntrance_0.6s_cubic-bezier(0.4,0,0.2,1)]" style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06), 0 0 60px rgba(233,1,1,0.05)'
      }}>
        {/* Logo */}
        <h1 className="text-4xl font-bold text-white text-center tracking-tight animate-[logoPulse_2s_ease-in-out_infinite]" style={{
          textShadow: '0 0 20px rgba(233,1,1,0.4), 0 2px 4px rgba(0,0,0,0.3)'
        }}>
          STAGETEK
        </h1>
        <p className="text-center text-sm text-gray-400 mt-2">Sistema de Gestão Comercial B2B</p>
        <div className="h-px bg-white/10 my-8" />

        {/* OAuth */}
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Acesso rápido</p>
        <button onClick={handleGoogleSignIn} type="button" className="w-full h-12 flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-lg text-white font-medium transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-sm" style={{ backdropFilter: 'blur(8px)' }}>
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="none">
            <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#4285F4"/>
            <path d="M10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45c-.86.58-1.97.93-3.46.93-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20z" fill="#34A853"/>
            <path d="M4.32 11.91c-.22-.58-.34-1.23-.34-1.91 0-.68.12-1.33.34-1.91V5.57H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.43l3.25-2.52z" fill="#FBBC05"/>
            <path d="M10 3.85c1.51 0 2.84.52 3.89 1.54l2.87-2.87C15.03.93 12.76 0 10 0 6.09 0 2.72 2.25 1.07 5.57l3.25 2.52c.8-2.41 3.04-4.24 5.68-4.24z" fill="#EA4335"/>
          </svg>
          Continuar com Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-8 gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs font-medium text-gray-500 px-4" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)' }}>OU</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}

          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-2">E-mail</label>
            <div className="relative">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required className="w-full h-12 bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 text-white text-[15px] transition-all focus:outline-none focus:border-[#e90101] focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(233,1,1,0.15),0_0_20px_rgba(233,1,1,0.15)] placeholder:text-gray-500" />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none transition-colors peer-focus:text-[#e90101]" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-2">Senha</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha" required className="w-full h-12 bg-white/5 border border-white/10 rounded-lg pl-11 pr-11 text-white text-[15px] transition-all focus:outline-none focus:border-[#e90101] focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(233,1,1,0.15),0_0_20px_rgba(233,1,1,0.15)] placeholder:text-gray-500" />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-[18px] h-[18px] appearance-none border-[1.5px] border-white/10 bg-white/5 rounded cursor-pointer transition-all checked:bg-[#e90101] checked:border-[#e90101] checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-xs checked:after:font-semibold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative" />
              <span className="text-sm text-gray-400">Lembrar de mim</span>
            </label>
            <a href="#" className="text-sm font-medium text-[#e90101] hover:text-[#ff0101] hover:underline transition-colors">Esqueceu a senha?</a>
          </div>

          <button type="submit" disabled={loading} className="w-full h-[52px] mt-6 bg-gradient-to-br from-[#e90101] to-[#c10101] text-white font-semibold text-[15px] tracking-wide rounded-lg transition-all hover:-translate-y-0.5 hover:from-[#ff0101] hover:to-[#d10101] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2" style={{
            boxShadow: '0 4px 12px rgba(233,1,1,0.3), 0 0 20px rgba(233,1,1,0.2)'
          }}>
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Entrando...
              </>
            ) : 'Entrar'}
          </button>
        </form>

        <div className="text-center mt-8">
          <span className="text-sm text-gray-400">Não tem conta?</span>
          <a href="#" className="ml-1 text-sm font-semibold text-[#e90101] hover:text-[#ff0101] hover:underline transition-colors">Solicite acesso</a>
        </div>

        <footer className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-[11px] text-gray-500">Built with ❤️ following Protocol Notecraft™</p>
          <p className="text-[11px] text-gray-500 mt-1">STAGETEK Engineering Team</p>
        </footer>
      </div>

      <style>{`
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoPulse {
          0%, 100% { text-shadow: 0 0 20px rgba(233,1,1,0.4), 0 2px 4px rgba(0,0,0,0.3); }
          50% { text-shadow: 0 0 30px rgba(233,1,1,0.6), 0 2px 4px rgba(0,0,0,0.3); }
        }
      `}</style>
    </div>
  )
}
