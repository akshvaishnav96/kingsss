import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useLogin } from './useAuth'

export function useLoginForm() {
  const [values, setValues] = useState({ email: '', password: '' })
  const login = useLogin()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next')?.startsWith('/admin') ? params.get('next') : '/admin'

  return {
    field: (name) => ({ name, value: values[name], onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })), fullWidth: true }),
    submit: (e) => {
      e.preventDefault()
      login.mutate(values, { onSuccess: () => navigate(next, { replace: true }) })
    },
    next,
    isSubmitting: login.isPending,
    error: login.error?.message,
  }
}
