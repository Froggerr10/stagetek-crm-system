import { useState, useCallback } from 'react'

type MaskType = 'cnpj' | 'phone' | 'cep'

interface MaskConfig {
  mask: (value: string) => string
  maxLength: number
}

const masks: Record<MaskType, MaskConfig> = {
  cnpj: {
    mask: (value: string) => {
      const clean = value.replace(/\D/g, '')
      return clean
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .slice(0, 18)
    },
    maxLength: 18
  },
  phone: {
    mask: (value: string) => {
      const clean = value.replace(/\D/g, '')
      if (clean.length <= 10) {
        return clean
          .replace(/^(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4})(\d)/, '$1-$2')
          .slice(0, 14)
      }
      return clean
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15)
    },
    maxLength: 15
  },
  cep: {
    mask: (value: string) => {
      const clean = value.replace(/\D/g, '')
      return clean.replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9)
    },
    maxLength: 9
  }
}

export function useInputMask(type: MaskType) {
  const [value, setValue] = useState('')

  const handleChange = useCallback(
    (inputValue: string) => {
      const masked = masks[type].mask(inputValue)
      setValue(masked)
      return masked
    },
    [type]
  )

  const getUnmasked = useCallback(() => {
    return value.replace(/\D/g, '')
  }, [value])

  return {
    value,
    setValue,
    handleChange,
    getUnmasked,
    maxLength: masks[type].maxLength
  }
}
