import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AppleBadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
}

export default function AppleBadge({ 
  variant = 'default', 
  size = 'md',
  children, 
  className = '' 
}: AppleBadgeProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-full
    transition-all duration-200 ease-out
    backdrop-blur-sm
  `

  const variants = {
    success: `
      bg-green-500/20 text-green-400
      border border-green-500/30
      shadow-sm
    `,
    warning: `
      bg-yellow-500/20 text-yellow-400
      border border-yellow-500/30
      shadow-sm
    `,
    error: `
      bg-red-500/20 text-red-400
      border border-red-500/30
      shadow-sm
    `,
    info: `
      bg-blue-500/20 text-blue-400
      border border-blue-500/30
      shadow-sm
    `,
    default: `
      bg-gray-500/20 text-gray-400
      border border-gray-500/30
      shadow-sm
    `
  }

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  return (
    <span className={cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  )
}