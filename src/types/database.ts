// Generated types for Supabase Database Schema V2
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          cnpj: string | null
          tax_id_type: 'CNPJ' | 'CPF' | 'EIN' | 'VAT' | null
          industry: string | null
          website: string | null
          phones: Json | null // Array of {type, number, country_code}
          emails: Json | null // Array of {type, email}
          address: Json | null
          organization_type: 'fabricacao' | 'revenda' | 'locacao' | 'cliente_final'
          tags: string[] | null
          custom_fields: Json | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['organizations']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['organizations']['Insert']>
      }
      contacts: {
        Row: {
          id: string
          organization_id: string | null
          name: string
          email: string | null
          phone: string | null
          role: string | null
          is_primary: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['contacts']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['contacts']['Insert']>
      }
      deals: {
        Row: {
          id: string
          organization_id: string
          contact_id: string | null
          name: string
          value: number
          currency: string
          stage_id: string
          probability: number
          expected_close_date: string | null
          actual_close_date: string | null
          status: 'open' | 'won' | 'lost'
          loss_reason_id: string | null
          source_id: string | null
          assigned_to: string | null
          tags: string[] | null
          custom_fields: Json | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['deals']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['deals']['Insert']>
      }
      stages: {
        Row: {
          id: string
          pipeline_id: string
          name: string
          order: number
          color: string | null
          probability: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['stages']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['stages']['Insert']>
      }
      pipelines: {
        Row: {
          id: string
          name: string
          description: string | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['pipelines']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['pipelines']['Insert']>
      }
      products: {
        Row: {
          id: string
          name: string
          sku: string | null
          category: 'som' | 'luz' | 'talha' | 'peca' | 'outro'
          description: string | null
          price: number | null
          currency: string
          unit: string | null
          stock_quantity: number | null
          images: string[] | null
          custom_fields: Json | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      tasks: {
        Row: {
          id: string
          deal_id: string | null
          organization_id: string | null
          contact_id: string | null
          title: string
          description: string | null
          due_date: string | null
          completed_at: string | null
          assigned_to: string | null
          task_type: 'call' | 'email' | 'meeting' | 'follow_up' | 'other'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['tasks']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['tasks']['Insert']>
      }
      loss_reasons: {
        Row: {
          id: string
          name: string
          description: string | null
          order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['loss_reasons']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['loss_reasons']['Insert']>
      }
      sources: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['sources']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['sources']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
