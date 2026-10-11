import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminApi } from '../../api/endpoints'
import { queryKeys } from '../../api/queryKeys'

export function useUsers() {
  const qc = useQueryClient()
  const list = useQuery({ queryKey: queryKeys.users, queryFn: adminApi.users.list })
  const refresh = () => qc.invalidateQueries({ queryKey: queryKeys.users })
  const create = useMutation({ mutationFn: adminApi.users.create, onSuccess: refresh })
  const remove = useMutation({ mutationFn: adminApi.users.remove, onSuccess: refresh })
  return { users: list.data ?? [], isLoading: list.isPending, create: create.mutateAsync, isCreating: create.isPending, createError: create.error, remove: remove.mutateAsync }
}
