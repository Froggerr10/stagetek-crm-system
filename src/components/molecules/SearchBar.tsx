import { X, Search } from 'lucide-react'
import { useUserInteractions } from '@/hooks/useUserInteractions'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function SearchBar({ value, onChange, placeholder = 'Buscar...', className = '' }: SearchBarProps) {
  const { logSearch } = useUserInteractions()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim().length > 3) {
      logSearch(value.trim())
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-500" />
      </div>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder} className="w-full h-12 pl-10 pr-10 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-stagetek-red focus:border-stagetek-red transition-all" autoComplete="off" />
      {value && (
        <button type="button" onClick={() => onChange('')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors" aria-label="Limpar busca">
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}