import { InputHTMLAttributes } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className={`h-4 w-4 rounded border-gray-300 text-stagetek-red focus:ring-stagetek-red focus:ring-2 transition ${className}`}
        {...props}
      />
      {label && <label className="ml-2 text-sm text-gray-700">{label}</label>}
    </div>
  )
}
