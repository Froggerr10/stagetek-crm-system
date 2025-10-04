// Business domain types (mapped from Database types)

export interface Organization {
  id: string
  name: string
  cnpj: string | null
  industry: string | null
  website: string | null
  phones: Phone[]
  emails: Email[]
  address: Address | null
  organizationType: 'fabricacao' | 'revenda' | 'locacao' | 'cliente_final'
  tags: string[]
  customFields: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface Phone {
  type: 'mobile' | 'work' | 'home' | 'fax'
  number: string
  countryCode: string
}

export interface Email {
  type: 'work' | 'personal'
  email: string
}

export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Contact {
  id: string
  organizationId: string | null
  name: string
  email: string | null
  phone: string | null
  role: string | null
  isPrimary: boolean
  createdAt: string
  updatedAt: string
}

export interface Deal {
  id: string
  organizationId: string
  contactId: string | null
  name: string
  value: number
  currency: string
  stageId: string
  probability: number
  expectedCloseDate: string | null
  actualCloseDate: string | null
  status: 'open' | 'won' | 'lost'
  lossReasonId: string | null
  sourceId: string | null
  assignedTo: string | null
  tags: string[]
  customFields: Record<string, any>
  createdAt: string
  updatedAt: string
  // Relations
  organization?: Organization
  stage?: Stage
}

export interface Stage {
  id: string
  pipelineId: string
  name: string
  order: number
  color: string | null
  probability: number
  createdAt: string
  updatedAt: string
}

export interface Pipeline {
  id: string
  name: string
  description: string | null
  isDefault: boolean
  createdAt: string
  updatedAt: string
  stages?: Stage[]
}

export interface Product {
  id: string
  name: string
  sku: string | null
  category: 'som' | 'luz' | 'talha' | 'peca' | 'outro'
  description: string | null
  price: number | null
  currency: string
  unit: string | null
  stockQuantity: number | null
  images: string[]
  customFields: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  dealId: string | null
  organizationId: string | null
  contactId: string | null
  title: string
  description: string | null
  dueDate: string | null
  completedAt: string | null
  assignedTo: string | null
  taskType: 'call' | 'email' | 'meeting' | 'follow_up' | 'other'
  createdAt: string
  updatedAt: string
}

export interface LossReason {
  id: string
  name: string
  description: string | null
  order: number
  createdAt: string
  updatedAt: string
}

export interface Source {
  id: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
}

// Auth types
export interface User {
  id: string
  email: string
  name: string | null
  avatar: string | null
  role: 'admin' | 'user'
  createdAt: string
}
