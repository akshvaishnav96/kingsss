import { useState } from 'react'
import { useChangePassword } from './useAuth'

const EMPTY = { current: '', next: '', confirm: '' }

export function usePasswordForm() {
  const [values, setValues] = useState(EMPTY)
  const change = useChangePassword()
  const mismatch = values.confirm && values.next !== values.confirm

  return {
    field: (name) => ({ name, value: values[name], onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })), fullWidth: true, type: 'password' }),
    mismatch,
    submit: (e) => {
      e.preventDefault()
      if (mismatch) return
      change.mutate({ current: values.current, next: values.next }, { onSuccess: () => setValues(EMPTY) })
    },
    isSubmitting: change.isPending,
    error: change.error?.message,
    isDone: change.isSuccess,
  }
}
