import { useState } from 'react'
import { collections } from '../../config/admin'
import { useCollection } from './useCollection'

// Open/edit/save state for the collection item dialog.
export function useItemEditor(collection) {
  const api = useCollection(collection)
  const [editing, setEditing] = useState(null) // { id?, published, data }
  const [error, setError] = useState(null)

  return {
    ...api,
    editing,
    openNew: () => { setError(null); setEditing({ published: true, data: structuredClone(collections[collection].template) }) },
    openEdit: (item) => { setError(null); setEditing({ id: item.id, published: item.published, data: structuredClone(item.data) }) },
    close: () => setEditing(null),
    setData: (data) => setEditing((e) => ({ ...e, data })),
    setPublished: (published) => setEditing((e) => ({ ...e, published })),
    error,
    submit: async () => {
      try {
        await api.save(editing)
        setEditing(null)
      } catch (err) {
        setError(err.message)
      }
    },
  }
}
