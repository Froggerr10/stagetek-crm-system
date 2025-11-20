import { Loader2 } from 'lucide-react'
import FormField from '@/components/molecules/FormField'

interface CEPFieldProps {
  value: string
  onChange: (value: string) => void
  maxLength: number
  loading: boolean
}

export default function CEPField({ value, onChange, maxLength, loading }: CEPFieldProps) {
  return (
    <div className="relative">
      <FormField
        label="CEP"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="00000-000"
        maxLength={maxLength}
      />
      {loading && <Loader2 className="absolute right-3 top-10 w-4 h-4 animate-spin" />}
    </div>
  )
}
