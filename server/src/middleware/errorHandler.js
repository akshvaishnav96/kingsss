import { HttpError } from '../lib/http.js'

export const notFound = (req, res) => res.status(404).json({ error: 'Not found.' })

// Express 5 forwards rejected async handlers here.
export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  if (err instanceof HttpError) return res.status(err.status).json({ error: err.message, fields: err.fields })
  if (err.code === 'P2002') return res.status(409).json({ error: 'An item with this slug or email already exists.' })
  if (err.code === 'P2025') return res.status(404).json({ error: 'Not found.' })
  if (err.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ error: 'File is too large (max 150 MB).' })
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Request is too large.' })
  console.error(err)
  res.status(500).json({ error: 'Something went wrong. Please try again.' })
}
