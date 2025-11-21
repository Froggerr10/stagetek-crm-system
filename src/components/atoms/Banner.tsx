import { X, Info } from 'lucide-react'

interface BannerProps { message: string; onDismiss: () => void }

export default function Banner({ message, onDismiss }: BannerProps) {
  return (
    <div className="bg-[#10b981] border-l-4 border-green-400 text-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Info className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button onClick={onDismiss} className="text-white/80 hover:text-white transition">
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
