import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export default function Input({ error, className = '', ...props }: InputProps) {
  const baseStyles = 'w-full px-4 py-3 bg-white/10 border rounded-lg text-white text-base placeholder:text-gray-400 transition focus:outline-none focus:ring-2 focus:bg-white/15'
  const errorStyles = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
    : 'border-white/20 focus:border-stagetek-red focus:ring-stagetek-red'

  return (
    <input
      className={`${baseStyles} ${errorStyles} ${className}`}
      {...props}
    />
  )
}
