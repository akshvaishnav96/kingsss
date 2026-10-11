// Pure helpers over site content — no React, no fetching.

export const findProduct = (products, slug) => products.find((p) => p.slug === slug)

export const relatedProducts = (products, product, count = 4) => [
  ...products.filter((p) => p.id !== product.id && p.category === product.category),
  ...products.filter((p) => p.id !== product.id && p.category !== product.category),
].slice(0, count)

export const matchesQuery = (product, query) =>
  `${product.name} ${product.category} ${product.shortDescription}`.toLowerCase().includes(query.trim().toLowerCase())

export const telHref = (number) => `tel:${number.replace(/[^\d+]/g, '')}`

export const whatsappHref = (number, text = 'Hello KINGSSS, I would like to enquire about') =>
  `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`

export const whatsappContacts = (contact) => (contact?.phones ?? []).filter((p) => p.whatsapp)

export const phoneById = (contact, id) => contact?.phones?.find((p) => p.id === id)

// Google Maps query for the office: exact lat/lng when both are valid, otherwise the search text / address.
export function officeMapQuery(contact = {}) {
  const lat = parseFloat(contact.mapLat), lng = parseFloat(contact.mapLng)
  if (Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) return `${lat},${lng}`
  return contact.mapQuery || contact.address || ''
}

// Sorts phones by a list of ids; ids not in the list keep their original order at the end.
export const orderPhones = (phones = [], ids = []) => {
  const rank = (p) => (ids.includes(p.id) ? ids.indexOf(p.id) : ids.length)
  return [...phones].sort((a, b) => rank(a) - rank(b))
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Mirrors server/src/validators/enquiry.validator.js
export function validateEnquiry(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.'
  if (!emailPattern.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.subject.trim()) errors.subject = 'Please choose or enter a subject.'
  if (values.message.trim().length < 10) errors.message = 'Please enter a message of at least 10 characters.'
  return errors
}
