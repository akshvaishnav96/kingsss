import { HttpError } from '../lib/http.js'

export function parsePassword(password) {
  const p = String(password ?? '')
  if (p.length < 8 || p.length > 200) throw new HttpError(400, 'Password must be at least 8 characters.', { password: 'At least 8 characters.' })
  return p
}

export function parseNewUser(body = {}) {
  const email = String(body.email ?? '').trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw new HttpError(400, 'Please enter a valid email.', { email: 'Invalid email.' })
  return { email, name: String(body.name ?? '').trim().slice(0, 120), password: parsePassword(body.password) }
}
