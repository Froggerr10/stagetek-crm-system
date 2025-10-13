import { Bell, HelpCircle, Grid3x3 } from 'lucide-react'

export default function TopBarActions() {
  return (
    <>
      <button className="relative p-3 text-gray-300 hover:text-white transition-colors" aria-label="Notificações">
        <Bell className="w-5 h-5" />
        <span className="absolute top-0 right-0 w-2 h-2 bg-[#e90101] rounded-full" />
      </button>
      <button className="p-3 text-gray-300 hover:text-white transition-colors" aria-label="Ajuda">
        <HelpCircle className="w-5 h-5" />
      </button>
      <button className="p-3 text-gray-300 hover:text-white transition-colors" aria-label="Apps">
        <Grid3x3 className="w-5 h-5" />
      </button>
    </>
  )
}
