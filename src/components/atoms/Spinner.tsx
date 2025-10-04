interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-b-2'
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-stagetek-red ${sizes[size]} ${className}`} />
    </div>
  )
}
