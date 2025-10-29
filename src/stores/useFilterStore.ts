import { create } from 'zustand'

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

export const useFilterStore = create<FilterState>((set, get) => ({
  funnelId: null,
  ownerId: null,
  status: 'open',
  setFunnelId: (id) => set({ funnelId: id }),
  setOwnerId: (id) => set({ ownerId: id }),
  setStatus: (status) => set({ status }),
  resetFilters: () => set({ funnelId: null, ownerId: null, status: 'open' }),
  activeFiltersCount: () => {
    const { funnelId, ownerId, status } = get()
    let count = 0
    if (funnelId) count++
    if (ownerId) count++
    if (status !== 'open') count++
    return count
  },
}))
