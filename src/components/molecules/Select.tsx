import { SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

export default function Select({ error, className = '', children, ...props }: SelectProps) {
  // Using HTML select for now (shadcn Radix Select requires different API)
  // This maintains compatibility with existing code using <option> children
  return (
    <select
      className={cn(
        'w-full px-4 py-3 bg-white/5 text-white border border-white/20 rounded-lg transition',
        'focus:outline-none focus:ring-2 focus:ring-[#e90101] focus:border-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-red-500 focus:ring-red-500',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}
