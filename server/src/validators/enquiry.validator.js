import { HttpError } from '../lib/http.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const ENQUIRY_STATUSES = ['new', 'read', 'replied', 'archived']

// Same rules as the website contact form.
export function parseEnquiry(body = {}) {
  const v = Object.fromEntries(['name', 'email', 'company', 'subject', 'message'].map((k) => [k, String(body[k] ?? '').trim()]))
  const fields = {}
  if (v.name.length < 2 || v.name.length > 120) fields.name = 'Please enter your full name.'
  if (!emailPattern.test(v.email) || v.email.length > 200) fields.email = 'Please enter a valid email address.'
  if (!v.subject || v.subject.length > 200) fields.subject = 'Please choose or enter a subject.'
  if (v.message.length < 10 || v.message.length > 5000) fields.message = 'Please enter a message of 10–5000 characters.'
  if (v.company.length > 200) fields.company = 'Company name is too long.'
  if (Object.keys(fields).length) throw new HttpError(400, 'Please check the highlighted fields.', fields)
  return v
}
