import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { publicApi } from '../api/endpoints'
import { validateEnquiry } from '../lib/content'
import { useSite } from './useSite'

const EMPTY = { name: '', email: '', company: '', subject: '', message: '', website: '' }
const REQUIRED = ['name', 'email', 'subject', 'message']

// Contact form state, validation and submission to the enquiries API.
export function useContactForm() {
  const { contactPage } = useSite()
  const [params] = useSearchParams()
  const initialSubject = params.get('subject') ?? ''
  const [values, setValues] = useState({ ...EMPTY, subject: initialSubject })
  const [touched, setTouched] = useState({})
  const mutation = useMutation({ mutationFn: publicApi.submitEnquiry })

  const errors = { ...validateEnquiry(values), ...mutation.error?.fields }
  const subjects = !initialSubject || contactPage.subjects.includes(initialSubject) ? contactPage.subjects : [initialSubject, ...contactPage.subjects]

  const field = (name) => ({
    name,
    value: values[name],
    onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
    error: Boolean(touched[name] && errors[name]),
    helperText: touched[name] && errors[name] ? errors[name] : ' ',
    fullWidth: true,
  })

  const submit = (e) => {
    e.preventDefault()
    const invalid = REQUIRED.find((k) => validateEnquiry(values)[k])
    if (invalid) {
      setTouched(Object.fromEntries(REQUIRED.map((k) => [k, true])))
      e.currentTarget.querySelector(`[name="${invalid}"]`)?.focus()
      return
    }
    mutation.mutate(values)
  }

  const reset = () => {
    mutation.reset()
    setTouched({})
    setValues(EMPTY)
  }

  return {
    field,
    honeypot: { name: 'website', value: values.website, onChange: (e) => setValues((v) => ({ ...v, website: e.target.value })) },
    subjects,
    submit,
    reset,
    isSubmitting: mutation.isPending,
    isSent: mutation.isSuccess,
    submitError: mutation.error && !mutation.error.fields ? mutation.error.message : null,
    firstName: values.name.trim().split(' ')[0],
  }
}
