import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; size?: 'sm' | 'md' | 'lg' }

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-stagetek-red hover:bg-stagetek-red-medium text-white shadow-lg hover:shadow-xl focus:ring-stagetek-red',
    secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-600',
    ghost: 'text-stagetek-red hover:text-stagetek-red-dark focus:ring-stagetek-red'
  }
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-6 py-3', lg: 'px-8 py-4 text-lg' }
  return <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>
}
