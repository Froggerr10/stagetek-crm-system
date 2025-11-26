import { Search } from 'lucide-react'
import FormField from '@/components/molecules/FormField'

interface CNPJFieldProps {
  value: string; onChange: (value: string) => void; onBlur: () => void
  onSearch: () => void; searching: boolean; error?: string; maxLength: number
}

export default function CNPJField({ value, onChange, onBlur, onSearch, searching, error, maxLength }: CNPJFieldProps) {
  return (
    <FormField
      label="CNPJ"
      error={error}
    >
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder="00.000.000/0000-00"
          maxLength={maxLength}
          className="flex h-10 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 pr-12 text-base text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e90101] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
        <button
          type="button"
          onClick={onSearch}
          disabled={searching || !value || !!error}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-[#e90101] disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
          title="Buscar dados do CNPJ"
          aria-label="Buscar dados do CNPJ"
        >
          <Search className={`w-5 h-5 ${searching ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </FormField>
  )
}