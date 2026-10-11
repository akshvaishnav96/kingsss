import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminApi } from '../../api/endpoints'
import { queryKeys } from '../../api/queryKeys'

export function useMedia() {
  const qc = useQueryClient()
  const list = useQuery({ queryKey: queryKeys.media, queryFn: adminApi.media.list })
  const refresh = () => qc.invalidateQueries({ queryKey: queryKeys.media })
  const upload = useMutation({ mutationFn: adminApi.media.upload, onSuccess: refresh })
  const remove = useMutation({ mutationFn: adminApi.media.remove, onSuccess: refresh })

  return {
    media: list.data ?? [],
    isLoading: list.isPending,
    upload: upload.mutateAsync,
    isUploading: upload.isPending,
    uploadError: upload.error,
    remove: remove.mutateAsync,
  }
}
