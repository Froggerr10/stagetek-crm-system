// =====================================================
// STAGETEK CRM - TypeScript Types
// Matches Supabase Database Schema V1.0
// Last updated: 13/Oct/2025
// =====================================================

// =====================================================
// 1. CLIENTS (Clientes B2B)
// =====================================================
export interface Client {
  id: string
  name: string
  cnpj: string | null
  email: string | null
  phone: string | null
  website: string | null
  address: {
    street?: string
    number?: string
    complement?: string
    neighborhood?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  } | null
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  created_by: string | null
}

// =====================================================
// 2. FUNNELS (Funis de Vendas)
// =====================================================
export interface Funnel {
  id: string
  name: string
  description: string | null
  is_default: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  created_by: string | null
  // Relations
  stages?: FunnelStage[]
}

// =====================================================
// 3. FUNNEL STAGES (Etapas do Funil)
// =====================================================
export interface FunnelStage {
  id: string
  funnel_id: string
  name: string
  color: string
  order_position: number
  created_at: string
  updated_at: string
  // Relations
  funnel?: Funnel
}

// =====================================================
// 4. OPPORTUNITIES (Oportunidades de Venda)
// =====================================================
export interface Opportunity {
  id: string
  title: string
  client_id: string | null
  funnel_id: string | null
  stage_id: string | null
  value: number | null
  expected_close_date: string | null
  probability: number | null // 0-100
  status: 'open' | 'won' | 'lost'
  lost_reason: string | null
  won_at: string | null
  lost_at: string | null
  created_at: string
  updated_at: string
  created_by: string | null
  assigned_to: string | null
  // Relations
  client?: Client
  funnel?: Funnel
  stage?: FunnelStage
}

// =====================================================
// 5. NOTES (Anotações - Imutáveis)
// =====================================================
export interface Note {
  id: string
  opportunity_id: string | null
  client_id: string | null
  content: string
  created_at: string
  created_by: string | null
  // Relations
  opportunity?: Opportunity
  client?: Client
}

// =====================================================
// 6. TASKS (Tarefas)
// =====================================================
export interface Task {
  id: string
  opportunity_id: string | null
  client_id: string | null
  title: string
  description: string | null
  type: 'call' | 'email' | 'meeting' | 'other' | null
  due_date: string | null
  completed_at: string | null
  is_completed: boolean
  created_at: string
  updated_at: string
  created_by: string | null
  assigned_to: string | null
  // Relations
  opportunity?: Opportunity
  client?: Client
}

// =====================================================
// 7. PRODUCTS (Catalog - Hybrid Model)
// =====================================================
export interface Product {
  id: string
  name: string
  sku: string | null
  category: 'som' | 'luz' | 'estrutura' | 'talha' | 'outro'
  price_brl: number
  price_usd: number | null
  price_eur: number | null
  description: string | null
  technical_specs: Record<string, any> | null
  image_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  created_by: string | null
}

// =====================================================
// 8. QUOTATIONS (Hybrid: catalog + custom items)
// =====================================================
export interface QuotationItem {
  product_id?: string // Optional: only if from catalog
  name: string
  description?: string
  quantity: number
  unit_price: number
  discount_percent?: number
  subtotal: number
}

export interface Quotation {
  id: string
  quotation_number: string
  opportunity_id: string | null
  client_id: string | null
  items: QuotationItem[]
  subtotal: number
  freight: number
  discount_amount: number
  total: number
  currency: 'BRL' | 'USD' | 'EUR'
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
  pdf_url: string | null
  sent_at: string | null
  sent_to_email: string | null
  valid_until: string | null
  notes: string | null
  internal_notes: string | null
  created_at: string
  updated_at: string
  created_by: string | null
  // Relations
  opportunity?: Opportunity
  client?: Client
}

// =====================================================
// 9. AUTH TYPES (Supabase Auth)
// =====================================================
export interface User {
  id: string
  email: string
  name: string | null
  avatar: string | null
  role: 'admin' | 'user'
  created_at: string
}

// =====================================================
// 10. UTILITY TYPES
// =====================================================

// Form data types (for creating/updating records)
export type ClientFormData = Omit<Client, 'id' | 'created_at' | 'updated_at' | 'created_by'>
export type OpportunityFormData = Omit<Opportunity, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'won_at' | 'lost_at'>
export type NoteFormData = Omit<Note, 'id' | 'created_at' | 'created_by'>
export type TaskFormData = Omit<Task, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'is_completed' | 'completed_at'>
export type QuotationFormData = Omit<Quotation, 'id' | 'quotation_number' | 'created_at' | 'updated_at' | 'created_by' | 'pdf_url' | 'sent_at'>

// Database response types (for Supabase queries with relations)
export interface OpportunityWithRelations extends Opportunity {
  client: Client | null
  stage: FunnelStage | null
  funnel: Funnel | null
}

export interface FunnelWithStages extends Funnel {
  stages: FunnelStage[]
}

// =====================================================
// 11. LEGACY TYPES (Future Features - Not in DB yet)
// =====================================================

// These types are for future features (Phase 2+)
// Not implemented in current database schema

export interface Contact {
  id: string
  client_id: string
  name: string
  email: string | null
  phone: string | null
  role: string | null
  is_primary: boolean
  created_at: string
  updated_at: string
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

// =====================================================
// 12. API RESPONSE TYPES
// =====================================================

export interface SupabaseError {
  message: string
  details: string
  hint: string
  code: string
}

export interface ApiResponse<T> {
  data: T | null
  error: SupabaseError | null
}
