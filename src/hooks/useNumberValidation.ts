import { useState, useCallback } from 'react'
import { validateNumber } from '@/lib/validations'

export function useNumberValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validate = useCallback((field: string, value: number, min?: number, max?: number) => {
    setTouched((prev) => ({ ...prev, [field]: true }))

    let validation = validateNumber(value, min, max)

    if (field === 'value' && value <= 0) {
      validation = { isValid: false, error: 'Valor deve ser maior que zero' }
    }

    setErrors((prev) => ({ ...prev, [field]: validation.error || '' }))
  }, [])

  const getError = useCallback((field: string) => {
    return touched[field] ? errors[field] : undefined
  }, [errors, touched])

  return { validate, getError }
}
