// =====================================================
// User Interactions Types
// =====================================================

export type InteractionType =
  | 'search_query'
  | 'page_view'
  | 'error_click'
  | 'button_click'
  | 'modal_open'
  | 'modal_close'
  | 'filter_applied'
  | 'export_data'
  | 'form_submit'
  | 'api_error'
  | 'navigation'
  | 'feature_discovery'

export interface UserInteraction {
  id: string
  user_id: string | null
  interaction_type: InteractionType
  content: Record<string, any>
  url_path: string | null
  session_id: string | null
  user_agent: string | null
  ip_address: string | null
  created_at: string
}

// Content type helpers for type-safe interactions
export interface SearchQueryContent {
  query: string
  results_count: number
  filters?: Record<string, any>
}

export interface PageViewContent {
  duration_ms?: number
  from_url?: string
  referrer?: string
}

export interface ErrorClickContent {
  error_message: string
  error_code?: string
  component?: string
  stack_trace?: string
}

export interface ButtonClickContent {
  button_id: string
  button_text: string
  context?: Record<string, any>
}

export interface FilterAppliedContent {
  filter_type: string
  filter_value: any
  total_results: number
}
