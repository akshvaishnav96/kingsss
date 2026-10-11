// ponytail: in-memory, per process; move to Redis if the API runs on several instances.
export function rateLimit({ max, windowMs, message = 'Too many requests. Please try again later.' }) {
  const hits = new Map()
  return (req, res, next) => {
    const now = Date.now()
    const recent = (hits.get(req.ip) ?? []).filter((t) => now - t < windowMs)
    if (recent.length >= max) return res.status(429).json({ error: message })
    hits.set(req.ip, [...recent, now])
    next()
  }
}
