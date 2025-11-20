import { useEffect } from 'react'
import { useInputMask } from '@/hooks/useInputMask'
import { useCEPSearch } from '@/hooks/useCEPSearch'

interface Address {
  street: string
  city: string
  state: string
  zipcode: string
}

export function useAddressWithCEP(address: Address, onChange: (address: Address) => void) {
  const cepMask = useInputMask('cep')
  const { searchCEP, loading } = useCEPSearch()

  useEffect(() => {
    cepMask.setValue(address.zipcode)
  }, [])

  const handleCEPChange = async (value: string) => {
    const masked = cepMask.handleChange(value)
    onChange({ ...address, zipcode: masked })

    if (masked.replace(/\D/g, '').length === 8) {
      const data = await searchCEP(masked)
      if (data) {
        onChange({
          ...address,
          zipcode: masked,
          street: data.street || address.street,
          city: data.city || address.city,
          state: data.state || address.state
        })
      }
    }
  }

  return { handleCEPChange, loading, maxLength: cepMask.maxLength }
}
