import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface AppleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export default function AppleButton({ 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  className = '', 
  children, 
  disabled,
  ...props 
}: AppleButtonProps) {
  const baseStyles = `
    relative overflow-hidden
    font-medium rounded-xl
    transition-all duration-200 ease-out
    transform hover:scale-[1.02] active:scale-[0.98]
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    group
  `

  const variants = {
    primary: `
      bg-stagetek-red hover:bg-stagetek-red-medium
      text-white shadow-lg hover:shadow-xl
      focus:ring-stagetek-red/50
      before:absolute before:inset-0 before:bg-white/20 
      before:scale-0 before:transition-transform before:duration-300
      hover:before:scale-100
    `,
    secondary: `
      border border-gray-300 bg-white/10 backdrop-blur-sm
      text-gray-700 hover:bg-white/20
      focus:ring-gray-300/50
      dark:text-gray-300 dark:border-gray-600
    `,
    ghost: `
      text-stagetek-red hover:text-stagetek-red-dark
      hover:bg-stagetek-red/10
      focus:ring-stagetek-red/50
    `,
    danger: `
      bg-red-600 hover:bg-red-700
      text-white shadow-lg hover:shadow-xl
      focus:ring-red-600/50
    `
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button 
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </span>
    </button>
  )
}