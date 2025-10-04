interface NotificationBadgeProps {
  count: number
  variant?: 'primary' | 'danger'
}

export default function NotificationBadge({ count, variant = 'primary' }: NotificationBadgeProps) {
  const baseClasses = 'absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-white text-[11px] font-semibold border-2 border-[#0a0a0a]'

  const variantClasses = {
    primary: 'bg-[#e90101]',
    danger: 'bg-red-500'
  }

  if (count === 0) return null

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {count > 99 ? '99+' : count}
    </span>
  )
}
