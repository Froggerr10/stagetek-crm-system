import { Search } from 'lucide-react'
import FormField from '@/components/molecules/FormField'

interface CNPJFieldProps {
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  onSearch: () => void
  searching: boolean
  error?: string
  maxLength: number
}

export default function CNPJField({
  value,
  onChange,
  onBlur,
  onSearch,
  searching,
  error,
  maxLength
}: CNPJFieldProps) {
  return (
    <div className="relative">
      <FormField
        label="CNPJ"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder="00.000.000/0000-00"
        maxLength={maxLength}
        error={error}
      />
      <button
        type="button"
        onClick={onSearch}
        disabled={searching || !value || !!error}
        className="absolute right-2 top-9 p-2 text-gray-400 hover:text-[#e90101] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Buscar dados do CNPJ"
      >
        <Search className={`w-4 h-4 ${searching ? 'animate-spin' : ''}`} />
      </button>
    </div>
  )
}
