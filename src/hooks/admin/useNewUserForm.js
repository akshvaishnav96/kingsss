import { useState } from 'react'
import { useUsers } from './useUsers'

const EMPTY = { name: '', email: '', password: '' }

export function useNewUserForm(onDone) {
  const [values, setValues] = useState(EMPTY)
  const { create, isCreating, createError } = useUsers()
  return {
    field: (name) => ({ name, value: values[name], onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })), fullWidth: true }),
    submit: async (e) => {
      e.preventDefault()
      await create(values)
      setValues(EMPTY)
      onDone?.()
    },
    isSubmitting: isCreating,
    error: createError?.message,
  }
}
