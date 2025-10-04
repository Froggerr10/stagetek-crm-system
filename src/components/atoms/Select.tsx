import { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

export default function Select({ error, className = '', children, ...props }: SelectProps) {
  const baseStyles = 'w-full px-4 py-3 border rounded-lg transition focus:outline-none focus:ring-2'
  const errorStyles = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-stagetek-red focus:ring-stagetek-red'

  return (
    <select className={`${baseStyles} ${errorStyles} ${className}`} {...props}>
      {children}
    </select>
  )
}
