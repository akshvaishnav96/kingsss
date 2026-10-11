import { userFromRequest } from '../services/auth.service.js'

export async function requireAuth(req, res, next) {
  req.user = await userFromRequest(req)
  if (!req.user) return res.status(401).json({ error: 'Please sign in.' })
  next()
}
