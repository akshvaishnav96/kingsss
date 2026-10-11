import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminApi } from '../../api/endpoints'
import { queryKeys } from '../../api/queryKeys'

export function useEnquiries() {
  const qc = useQueryClient()
  const [status, setStatus] = useState('all')
  const list = useQuery({ queryKey: queryKeys.enquiries(status), queryFn: () => adminApi.enquiries.list(status) })
  const refresh = () => {
    qc.invalidateQueries({ queryKey: ['admin', 'enquiries'] })
    qc.invalidateQueries({ queryKey: queryKeys.dashboard })
  }
  const update = useMutation({ mutationFn: ({ id, status: s }) => adminApi.enquiries.setStatus(id, s), onSuccess: refresh })
  const remove = useMutation({ mutationFn: adminApi.enquiries.remove, onSuccess: refresh })

  return {
    status,
    setStatus,
    enquiries: list.data ?? [],
    isLoading: list.isPending,
    setEnquiryStatus: (id, s) => update.mutate({ id, status: s }),
    remove: remove.mutateAsync,
  }
}
