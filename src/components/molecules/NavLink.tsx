import { Link } from 'react-router-dom'
import NotificationBadge from '@/components/atoms/NotificationBadge'

interface NavLinkProps {
  to: string
  label: string
  badge?: number
  active?: boolean
}

export default function NavLink({ to, label, badge, active = false }: NavLinkProps) {
  const baseClasses = 'relative px-4 py-2 text-base font-medium transition-colors'
  const activeClasses = active
    ? 'text-white border-b-2 border-[#e90101]'
    : 'text-gray-300 hover:text-white'

  return (
    <Link to={to} className={`${baseClasses} ${activeClasses}`}>
      {label}
      {badge !== undefined && badge > 0 && (
        <NotificationBadge count={badge} variant="danger" />
      )}
    </Link>
  )
}
