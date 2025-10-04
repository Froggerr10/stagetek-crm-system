import Input from '@/components/atoms/Input'
import { InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
}

export default function FormField({ label, error, helperText, ...inputProps }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-base font-medium text-gray-300">
        {label} {inputProps.required && <span className="text-stagetek-red">*</span>}
      </label>
      <Input error={!!error} {...inputProps} />
      {error && <p className="text-base text-red-500">{error}</p>}
      {helperText && !error && <p className="text-base text-gray-500">{helperText}</p>}
    </div>
  )
}
