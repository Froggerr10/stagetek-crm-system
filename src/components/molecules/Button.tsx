import { Button as ShadcnButton } from '@/components/ui/button'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) {
  // Map custom variants to shadcn variants
  const variantMap = {
    primary: 'default' as const,
    secondary: 'outline' as const,
    danger: 'destructive' as const,
    ghost: 'ghost' as const
  }

  // Map custom sizes to shadcn sizes
  const sizeMap = {
    sm: 'sm' as const,
    md: 'default' as const,
    lg: 'lg' as const
  }

  return (
    <ShadcnButton
      variant={variantMap[variant]}
      size={sizeMap[size]}
      {...props}
    />
  )
}
