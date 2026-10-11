import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminApi } from '../../api/endpoints'
import { queryKeys } from '../../api/queryKeys'

export const useSettings = () => useQuery({ queryKey: queryKeys.settings, queryFn: adminApi.settings.list })

export function useSaveSetting() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ key, value }) => adminApi.settings.save(key, value),
    onSuccess: (value, { key }) => {
      qc.setQueryData(queryKeys.settings, (all) => ({ ...all, [key]: value }))
      qc.invalidateQueries({ queryKey: queryKeys.site })
    },
  })
}

// Local draft of one content block with dirty tracking and save/discard.
export function useSettingDraft(key, saved) {
  const [draft, setDraft] = useState(saved)
  const save = useSaveSetting()
  useEffect(() => setDraft(saved), [saved])
  return {
    draft,
    setDraft,
    isDirty: JSON.stringify(draft) !== JSON.stringify(saved),
    discard: () => setDraft(saved),
    save: () => save.mutateAsync({ key, value: draft }),
    isSaving: save.isPending,
    error: save.error,
  }
}
