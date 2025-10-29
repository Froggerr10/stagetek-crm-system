import { InputHTMLAttributes, forwardRef } from 'react'
import { Input as ShadcnInput } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...props }, ref) => {
    return (
      <ShadcnInput
        ref={ref}
        className={cn(
          'bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:ring-[#e90101]',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
