import { useSuspenseQuery } from '@tanstack/react-query'
import { publicApi } from '../api/endpoints'
import { queryKeys } from '../api/queryKeys'

export const siteQueryOptions = {
  queryKey: queryKeys.site,
  queryFn: ({ signal }) => publicApi.getSite({ signal }),
}

// All public website content (settings + published collections), cached by TanStack Query.
export const useSite = () => useSuspenseQuery(siteQueryOptions).data
