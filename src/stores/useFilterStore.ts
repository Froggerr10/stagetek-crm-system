import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface FilterState {
  funnelId: string | null
  ownerId: string | null
  status: 'open' | 'all' | 'won' | 'lost'
  setFunnelId: (id: string | null) => void
  setOwnerId: (id: string | null) => void
  setStatus: (status: 'open' | 'all' | 'won' | 'lost') => void
  resetFilters: () => void
  activeFiltersCount: () => number
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      funnelId: null,
      ownerId: null,
      status: 'open',
      setFunnelId: (id) => set({ funnelId: id }),
      setOwnerId: (id) => set({ ownerId: id }),
      setStatus: (status) => set({ status }),
      resetFilters: () => set({ funnelId: null, ownerId: null, status: 'open' }),
      activeFiltersCount: () => {
        const { funnelId, ownerId, status } = get()
        return (funnelId ? 1 : 0) + (ownerId ? 1 : 0) + (status !== 'open' ? 1 : 0)
      },
    }),
    { name: 'stagetek-filters' }
  )
)
