import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'

interface ComplianceBadgeProps {
  type: 'status' | 'simples' | 'mei'
  value?: string | boolean
  className?: string
}

export default function ComplianceBadge({ type, value, className = '' }: ComplianceBadgeProps) {
  if (type === 'status') {
    const status = value as string
    if (status === 'Ativa') return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-green-500/20 text-green-400 ${className}`}><CheckCircle className="w-3 h-3" /> Ativa</span>
    if (status === 'Suspensa' || status === 'Inapta') return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400 ${className}`}><AlertCircle className="w-3 h-3" /> {status}</span>
    if (status === 'Baixada') return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-500/20 text-red-400 ${className}`}><XCircle className="w-3 h-3" /> Baixada</span>
    return null
  }

  if (type === 'simples' && value === true) {
    return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-400 ${className}`}>SN</span>
  }

  if (type === 'mei' && value === true) {
    return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-500/20 text-purple-400 ${className}`}>MEI</span>
  }

  return null
}
