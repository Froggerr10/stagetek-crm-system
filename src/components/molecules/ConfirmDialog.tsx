import { AlertTriangle } from 'lucide-react'

interface Props {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  variant?: 'danger' | 'warning' | 'info'
}

export default function ConfirmDialog({
  title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', onConfirm, onCancel, variant = 'danger'
}: Props) {
  const styles = { danger: 'bg-red-600 hover:bg-red-700', warning: 'bg-yellow-600 hover:bg-yellow-700', info: 'bg-blue-600 hover:bg-blue-700' }
  const iconBg = variant === 'danger' ? 'bg-red-500/20' : 'bg-yellow-500/20'
  const iconColor = variant === 'danger' ? 'text-red-400' : 'text-yellow-400'

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-[#0f0f0f]/98 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className={`p-3 rounded-full ${iconBg}`}>
            <AlertTriangle className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-300 text-sm">{message}</p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            {cancelText}
          </button>
          <button onClick={onConfirm} className={`px-4 py-2 text-white rounded-lg transition-colors ${styles[variant]}`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
