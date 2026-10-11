export class ApiError extends Error {
  constructor(status, message, fields) {
    super(message)
    this.status = status
    this.fields = fields
  }
}

// JSON fetch wrapper used by every endpoint. Sends the session cookie; FormData bodies are sent as-is.
export async function request(path, { method = 'GET', body, signal } = {}) {
  const isForm = body instanceof FormData
  const res = await fetch(path, {
    method,
    signal,
    credentials: 'same-origin',
    headers: body && !isForm ? { 'Content-Type': 'application/json' } : undefined,
    body: body && !isForm ? JSON.stringify(body) : body,
  })
  if (res.status === 204) return null
  const data = await res.json().catch(() => null)
  if (!res.ok) throw new ApiError(res.status, data?.error ?? 'Something went wrong. Please try again.', data?.fields)
  return data
}
