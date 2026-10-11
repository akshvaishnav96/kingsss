import { useQuery } from '@tanstack/react-query'
import { adminApi } from '../../api/endpoints'
import { queryKeys } from '../../api/queryKeys'

export const useDashboard = () => useQuery({ queryKey: queryKeys.dashboard, queryFn: adminApi.dashboard })
