import { env } from '../config/env.js'

// Mutating requests must come from our own origin (the session cookie is also SameSite=Lax).
export function sameOrigin(req, res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next()
  const origin = req.headers.origin
  if (origin && new URL(origin).host !== req.headers.host && !env.allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Cross-origin request blocked.' })
  }
  next()
}
