import { useEffect } from 'react'
import AppleDashboard from '../../apple-design-system/components/organisms/AppleDashboard'
import TopBar from '@/components/organisms/TopBar'

// Import Apple Design Tokens
import '../../apple-design-system/styles/apple-design-tokens.css'

export default function DashboardApple() {
  useEffect(() => {
    // Add apple-design-system body class for global styles
    document.body.classList.add('apple-design-system')
    return () => {
      document.body.classList.remove('apple-design-system')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a0505] to-black">
      <TopBar />
      <AppleDashboard />
    </div>
  )
}
