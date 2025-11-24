import { useCallback, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import type { InteractionType } from '@/types/userInteractions'

// =====================================================
// Session Management
// =====================================================
const SESSION_ID_KEY = 'stagetek_session_id'

function getOrCreateSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY)

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`
    sessionStorage.setItem(SESSION_ID_KEY, sessionId)
  }

  return sessionId
}

// =====================================================
// Main Hook
// =====================================================
export function useUserInteractions() {
  const sessionId = useRef(getOrCreateSessionId())
  const currentPath = useRef(window.location.pathname)

  /**
   * Log any user interaction
   */
  const logInteraction = useCallback(async (
    type: InteractionType,
    content: Record<string, any> = {},
    customPath?: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      await supabase.from('user_interactions').insert({
        user_id: user?.id || null,
        interaction_type: type,
        content,
        url_path: customPath || currentPath.current,
        session_id: sessionId.current,
        user_agent: navigator.userAgent,
      })
    } catch (error) {
      // Silently fail - don't break UX if analytics fail
      console.warn('Failed to log interaction:', error)
    }
  }, [])

  /**
   * Log search query
   */
  const logSearch = useCallback((query: string, resultsCount: number, filters?: Record<string, any>) => {
    return logInteraction('search_query', { query, results_count: resultsCount, filters })
  }, [logInteraction])

  /**
   * Log error click/occurrence
   */
  const logError = useCallback((
    errorMessage: string,
    component?: string,
    errorCode?: string,
    stackTrace?: string
  ) => {
    return logInteraction('error_click', {
      error_message: errorMessage,
      component,
      error_code: errorCode,
      stack_trace: stackTrace
    })
  }, [logInteraction])

  /**
   * Log button/action click
   */
  const logButtonClick = useCallback((buttonId: string, buttonText: string, context?: Record<string, any>) => {
    return logInteraction('button_click', { button_id: buttonId, button_text: buttonText, context })
  }, [logInteraction])

  /**
   * Log filter application
   */
  const logFilter = useCallback((filterType: string, filterValue: any, totalResults: number) => {
    return logInteraction('filter_applied', {
      filter_type: filterType,
      filter_value: filterValue,
      total_results: totalResults
    })
  }, [logInteraction])

  /**
   * Log modal open/close
   */
  const logModal = useCallback((action: 'open' | 'close', modalName: string, context?: Record<string, any>) => {
    return logInteraction(action === 'open' ? 'modal_open' : 'modal_close', {
      modal_name: modalName,
      ...context
    })
  }, [logInteraction])

  /**
   * Log page navigation
   */
  const logNavigation = useCallback((fromUrl: string, toUrl: string, navigationMethod?: string) => {
    return logInteraction('navigation', {
      from_url: fromUrl,
      to_url: toUrl,
      method: navigationMethod || 'unknown'
    })
  }, [logInteraction])

  /**
   * Log page view
   */
  const logPageView = useCallback((path: string) => {
    return logInteraction('page_view', {}, path)
  }, [logInteraction])

  // Track page views automatically
  useEffect(() => {
    const handleRouteChange = () => {
      const newPath = window.location.pathname

      if (newPath !== currentPath.current) {
        logInteraction('page_view', {
          from_url: currentPath.current,
          to_url: newPath
        }, newPath)

        currentPath.current = newPath
      }
    }

    // Listen for URL changes (React Router, browser back/forward)
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [logInteraction])

  return {
    logInteraction,
    logSearch,
    logError,
    logButtonClick,
    logFilter,
    logModal,
    logNavigation,
    logPageView,
    sessionId: sessionId.current
  }
}

// =====================================================
// Analytics Hook (Admin Only)
// =====================================================
export function useInteractionAnalytics() {
  const getRecentInteractions = useCallback(async (limit = 100) => {
    const { data, error } = await supabase
      .from('user_interactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  }, [])

  const getInteractionsByType = useCallback(async (type: InteractionType) => {
    const { data, error } = await supabase
      .from('user_interactions')
      .select('*')
      .eq('interaction_type', type)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }, [])

  const getInteractionsByUser = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('user_interactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }, [])

  const getInteractionStats = useCallback(async (startDate?: Date, endDate?: Date) => {
    let query = supabase
      .from('user_interactions')
      .select('interaction_type, created_at')

    if (startDate) {
      query = query.gte('created_at', startDate.toISOString())
    }
    if (endDate) {
      query = query.lte('created_at', endDate.toISOString())
    }

    const { data, error } = await query

    if (error) throw error

    // Group by type
    const stats = data?.reduce((acc, interaction) => {
      acc[interaction.interaction_type] = (acc[interaction.interaction_type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return stats
  }, [])

  return {
    getRecentInteractions,
    getInteractionsByType,
    getInteractionsByUser,
    getInteractionStats
  }
}
