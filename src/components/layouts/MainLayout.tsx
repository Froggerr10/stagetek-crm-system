import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from '@/components/organisms/TopBar'
import MobileBottomNav from '@/components/molecules/MobileBottomNav'
import MobileDrawer from '@/components/organisms/MobileDrawer'

export default function MainLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(circle at top left, #1a0404, #0a0a0a)' }}>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(233,1,1,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(233,1,1,0.1), transparent 30%)', zIndex: 0 }} />
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(233,1,1,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: 1 }} />

      {/* TopBar */}
      <TopBar />

      {/* Main Content */}
      <main className="relative z-10 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Navigation */}
      <MobileBottomNav onMenuClick={() => setIsDrawerOpen(true)} />
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  )
}
