import { useState } from 'react'

// Promise-based confirmation dialog state: `await confirm({ title, message })` resolves true/false.
export function useConfirm() {
  const [state, setState] = useState(null)
  const confirm = (options) => new Promise((resolve) => setState({ ...options, resolve }))
  const close = (result) => {
    state?.resolve(result)
    setState(null)
  }
  return { confirm, dialogProps: { open: Boolean(state), title: state?.title, message: state?.message, confirmLabel: state?.confirmLabel, onClose: close } }
}
