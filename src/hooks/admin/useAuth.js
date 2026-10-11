import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../../api/endpoints'
import { queryKeys } from '../../api/queryKeys'

export function useMe() {
  const { data, isPending } = useQuery({ queryKey: queryKeys.me, queryFn: authApi.me, staleTime: 5 * 60_000 })
  return { user: data?.user ?? null, isPending }
}

export function useLogin() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: authApi.login, onSuccess: (data) => qc.setQueryData(queryKeys.me, data) })
}

export function useLogout() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      qc.removeQueries({ queryKey: ['admin'] })
      qc.setQueryData(queryKeys.me, { user: null })
    },
  })
}

export const useChangePassword = () => useMutation({ mutationFn: authApi.changePassword })
