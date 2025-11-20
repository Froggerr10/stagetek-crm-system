import { useEffect } from 'react'
import { useInputMask } from '@/hooks/useInputMask'
import { useCEPSearch } from '@/hooks/useCEPSearch'

interface Address {
  street: string
  city: string
  state: string
  zipCode: string
}

export function useAddressWithCEP(address: Address, onChange: (address: Address) => void) {
  const cepMask = useInputMask('cep')
  const { searchCEP, loading } = useCEPSearch()

  useEffect(() => {
    cepMask.setValue(address.zipCode)
  }, [])

  const handleCEPChange = async (value: string) => {
    const masked = cepMask.handleChange(value)
    onChange({ ...address, zipCode: masked })

    if (masked.replace(/\D/g, '').length === 8) {
      const data = await searchCEP(masked)
      if (data) {
        onChange({
          ...address,
          zipCode: masked,
          street: data.street || address.street,
          city: data.city || address.city,
          state: data.state || address.state
        })
      }
    }
  }

  return { handleCEPChange, loading, maxLength: cepMask.maxLength }
}
