import Input from '@/components/atoms/Input'
import { ReactNode, InputHTMLAttributes } from 'react'

interface FormFieldProps extends Partial<InputHTMLAttributes<HTMLInputElement>> {
  label: string
  required?: boolean
  error?: string
  helperText?: string
  children?: ReactNode
}

export default function FormField({ label, required, error, helperText, children, ...inputProps }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-base font-medium text-gray-300">
        {label} {required && <span className="text-stagetek-red">*</span>}
      </label>
      {children ? children : <Input error={!!error} required={required} {...inputProps} />}
      {error && <p className="text-base text-red-500">{error}</p>}
      {helperText && !error && <p className="text-base text-gray-500">{helperText}</p>}
    </div>
  )
}
