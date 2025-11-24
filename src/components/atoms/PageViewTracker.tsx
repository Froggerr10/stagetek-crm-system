import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useUserInteractions } from '@/hooks/useUserInteractions'

/**
 * PageViewTracker - Invisible component that tracks page navigation
 *
 * Usage: Place inside <BrowserRouter> to auto-track all route changes
 *
 * Logs:
 * - interaction_type: 'page_view'
 * - url_path: current pathname (e.g., '/dashboard', '/clientes')
 * - session_id: maintained across navigation
 */
export default function PageViewTracker() {
  const location = useLocation()
  const { logPageView } = useUserInteractions()

  useEffect(() => {
    // Log page view on every route change
    logPageView(location.pathname)
  }, [location.pathname, logPageView])

  // This component renders nothing - it's purely for tracking
  return null
}
