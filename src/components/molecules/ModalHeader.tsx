interface ModalHeaderProps {
  title: string
  onClose: () => void
}

export default function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="sticky top-0 bg-[rgba(255,255,255,0.08)] backdrop-blur-md border-b border-white/15 px-6 py-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
