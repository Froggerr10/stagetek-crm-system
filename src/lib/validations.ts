import { validateCNPJ } from './cnpjUtils'

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, error: 'Email é obrigatório' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Email inválido' }
  }

  return { isValid: true }
}

export function validatePhone(phone: string): ValidationResult {
  if (!phone) {
    return { isValid: true }
  }

  const clean = phone.replace(/\D/g, '')
  if (clean.length < 10 || clean.length > 11) {
    return { isValid: false, error: 'Telefone deve ter 10 ou 11 dígitos' }
  }

  return { isValid: true }
}

export function validateCNPJField(cnpj: string): ValidationResult {
  if (!cnpj) {
    return { isValid: true }
  }

  const clean = cnpj.replace(/\D/g, '')
  if (clean.length !== 14) {
    return { isValid: false, error: 'CNPJ deve ter 14 dígitos' }
  }

  if (!validateCNPJ(cnpj)) {
    return { isValid: false, error: 'CNPJ inválido' }
  }

  return { isValid: true }
}

export function validateCEP(cep: string): ValidationResult {
  if (!cep) {
    return { isValid: true }
  }

  const clean = cep.replace(/\D/g, '')
  if (clean.length !== 8) {
    return { isValid: false, error: 'CEP deve ter 8 dígitos' }
  }

  return { isValid: true }
}

export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, error: `${fieldName} é obrigatório` }
  }

  return { isValid: true }
}

export function validateNumber(value: number | string, min?: number, max?: number): ValidationResult {
  const num = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(num)) {
    return { isValid: false, error: 'Valor inválido' }
  }

  if (min !== undefined && num < min) {
    return { isValid: false, error: `Valor mínimo: ${min}` }
  }

  if (max !== undefined && num > max) {
    return { isValid: false, error: `Valor máximo: ${max}` }
  }

  return { isValid: true }
}

export function validateURL(url: string): ValidationResult {
  if (!url) {
    return { isValid: true }
  }

  try {
    new URL(url)
    return { isValid: true }
  } catch {
    return { isValid: false, error: 'URL inválida' }
  }
}
