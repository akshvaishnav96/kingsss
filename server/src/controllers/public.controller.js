import { getSitePayload } from '../services/content.service.js'
import { createEnquiry } from '../services/enquiry.service.js'
import { parseEnquiry } from '../validators/enquiry.validator.js'

export async function getSite(req, res) {
  const { body, etag } = await getSitePayload()
  res.set({ ETag: etag, 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' })
  if (req.headers['if-none-match'] === etag) return res.status(304).end()
  res.send(body)
}

export async function submitEnquiry(req, res) {
  if (req.body?.website) return res.status(201).json({ ok: true }) // honeypot field: silently drop bots
  await createEnquiry(parseEnquiry(req.body))
  res.status(201).json({ ok: true })
}
