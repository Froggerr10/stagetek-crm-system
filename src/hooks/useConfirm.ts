import { useState } from 'react'

interface ConfirmOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions>({
    title: '',
    message: '',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    variant: 'danger'
  })
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null)

  const confirm = (opts: ConfirmOptions): Promise<boolean> => {
    setOptions({ ...opts, confirmText: opts.confirmText || 'Confirmar', cancelText: opts.cancelText || 'Cancelar', variant: opts.variant || 'danger' })
    setIsOpen(true)

    return new Promise<boolean>((resolve) => {
      setResolvePromise(() => resolve)
    })
  }

  const handleConfirm = () => {
    if (resolvePromise) resolvePromise(true)
    setIsOpen(false)
  }

  const handleCancel = () => {
    if (resolvePromise) resolvePromise(false)
    setIsOpen(false)
  }

  return { isOpen, options, confirm, handleConfirm, handleCancel }
}
