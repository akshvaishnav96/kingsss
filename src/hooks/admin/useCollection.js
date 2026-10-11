import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminApi } from '../../api/endpoints'
import { queryKeys } from '../../api/queryKeys'

// List + create/update/delete/reorder for one content collection (products, gallery, ...).
export function useCollection(collection) {
  const qc = useQueryClient()
  const key = queryKeys.items(collection)
  const list = useQuery({ queryKey: key, queryFn: () => adminApi.items.list(collection) })

  const refresh = () => {
    qc.invalidateQueries({ queryKey: key })
    qc.invalidateQueries({ queryKey: queryKeys.site })
    qc.invalidateQueries({ queryKey: queryKeys.dashboard })
  }

  const save = useMutation({
    mutationFn: ({ id, ...item }) => (id ? adminApi.items.update(collection, id, item) : adminApi.items.create(collection, item)),
    onSuccess: refresh,
  })
  const remove = useMutation({ mutationFn: (id) => adminApi.items.remove(collection, id), onSuccess: refresh })
  const reorder = useMutation({
    mutationFn: (ids) => adminApi.items.reorder(collection, ids),
    onMutate: async (ids) => {
      await qc.cancelQueries({ queryKey: key })
      const previous = qc.getQueryData(key)
      qc.setQueryData(key, (items) => ids.map((id) => items.find((i) => i.id === id)))
      return { previous }
    },
    onError: (err, ids, ctx) => qc.setQueryData(key, ctx.previous),
    onSettled: refresh,
  })

  const move = (index, delta) => {
    const ids = (list.data ?? []).map((i) => i.id)
    const target = index + delta
    if (target < 0 || target >= ids.length) return
    ;[ids[index], ids[target]] = [ids[target], ids[index]]
    reorder.mutate(ids)
  }

  return {
    items: list.data ?? [],
    isLoading: list.isPending,
    error: list.error,
    save: save.mutateAsync,
    isSaving: save.isPending,
    remove: remove.mutateAsync,
    togglePublished: (item) => save.mutate({ id: item.id, published: !item.published }),
    move,
  }
}
