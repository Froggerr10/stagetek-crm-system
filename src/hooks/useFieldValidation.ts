import { useState, useCallback } from 'react'
import { validateEmail, validatePhone, validateCNPJField } from '@/lib/validations'

type ValidationType = 'email' | 'phone' | 'cnpj'

export function useFieldValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validate = useCallback((field: string, value: string, type: ValidationType) => {
    setTouched((prev) => ({ ...prev, [field]: true }))

    let validation = { isValid: true, error: '' }

    switch (type) {
      case 'cnpj':
        validation = validateCNPJField(value)
        break
      case 'email':
        validation = validateEmail(value)
        break
      case 'phone':
        validation = validatePhone(value)
        break
    }

    setErrors((prev) => ({ ...prev, [field]: validation.error || '' }))
  }, [])

  const getError = useCallback((field: string) => {
    return touched[field] ? errors[field] : undefined
  }, [errors, touched])

  return { validate, getError, errors, touched }
}
