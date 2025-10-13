interface ModalActionsProps {
  onCancel: () => void
  onSubmit?: () => void
  loading?: boolean
  submitText: string
  cancelText?: string
}

export default function ModalActions({ onCancel, loading, submitText, cancelText = 'Cancelar' }: ModalActionsProps) {
  return (
    <div className="flex justify-end space-x-4 pt-4 border-t border-white/15">
      <button type="button" onClick={onCancel} className="px-6 py-3 bg-white/8 border border-white/15 rounded-lg text-gray-300 font-medium hover:bg-white/15 transition">
        {cancelText}
      </button>
      <button type="submit" disabled={loading} className="px-6 py-3 bg-stagetek-red hover:bg-stagetek-red-medium disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl">
        {loading ? 'Salvando...' : submitText}
      </button>
    </div>
  )
}
