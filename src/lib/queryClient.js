import { QueryClient } from '@tanstack/react-query'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, gcTime: 24 * 3600_000, retry: 1, refetchOnWindowFocus: false },
  },
})

// Public site content is persisted to localStorage so repeat visits render instantly,
// then refreshed in the background. Admin data is never persisted.
export const persistOptions = {
  persister: createSyncStoragePersister({ storage: typeof window === 'undefined' ? undefined : safeStorage(), key: 'kingsss-cache' }),
  maxAge: 24 * 3600_000,
  buster: 'v1',
  dehydrateOptions: { shouldDehydrateQuery: (q) => q.queryKey[0] === 'site' && q.state.status === 'success' },
}

function safeStorage() {
  try {
    window.localStorage.setItem('kingsss-probe', '1')
    window.localStorage.removeItem('kingsss-probe')
    return window.localStorage
  } catch {
    return undefined
  }
}
