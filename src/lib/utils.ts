import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes
 * Uses clsx for conditional classes and tailwind-merge to handle conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// =====================================================
// PII MASKING UTILITIES (LGPD Compliance)
// =====================================================

/**
 * Masks email addresses for privacy
 * Example: joao.silva@acme.com.br → joa***@acme.com.br
 */
export function maskEmail(email: string | null | undefined): string {
  if (!email) return '***@***'
  const [name, domain] = email.split('@')
  if (!name || !domain) return '***@***'
  if (name.length <= 3) return `***@${domain}`
  return `${name.slice(0, 3)}***@${domain}`
}

/**
 * Masks phone numbers for privacy
 * Example: (11) 98765-4321 → (11) 9****-4321
 */
export function maskPhone(phone: string | null | undefined): string {
  if (!phone) return '(--) ----****'
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits[2]}****-${digits.slice(7)}`
  } else if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ****-${digits.slice(6)}`
  }
  return '(--) ----****'
}

/**
 * Masks CNPJ for privacy
 * Example: 12.345.678/0001-90 → 12.***.678/0001-90
 */
export function maskCNPJ(cnpj: string | null | undefined): string {
  if (!cnpj) return '**.***.***/****-**'
  const digits = cnpj.replace(/\D/g, '')
  if (digits.length !== 14) return '**.***.***/****-**'
  return `${digits.slice(0, 2)}.***.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
}

/**
 * Masks CPF for privacy
 * Example: 123.456.789-00 → ***.456.***-00
 */
export function maskCPF(cpf: string | null | undefined): string {
  if (!cpf) return '***.***.**-**'
  const digits = cpf.replace(/\D/g, '')
  if (digits.length !== 11) return '***.***.**-**'
  return `***.${digits.slice(3, 6)}.***-${digits.slice(9)}`
}
