import express from 'express'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { env } from './config/env.js'
import { api } from './routes/index.js'
import { sameOrigin } from './middleware/sameOrigin.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

export function createApp() {
  const app = express()
  app.disable('x-powered-by')
  app.set('trust proxy', 1)
  app.use((req, res, next) => {
    res.set({ 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'X-Frame-Options': 'SAMEORIGIN' })
    next()
  })

  app.use('/api', express.json({ limit: '2mb' }), sameOrigin, api, notFound)
  app.use('/uploads', express.static(env.uploadDir, { maxAge: '30d', immutable: true, index: false }))

  // Production: serve the built React app with SPA fallback.
  if (existsSync(env.clientDist)) {
    // Vite's /assets/* filenames contain a content hash, so they can be cached forever.
    app.use(express.static(env.clientDist, {
      index: false,
      maxAge: '1h',
      setHeaders: (res, filePath) => filePath.includes(`${path.sep}assets${path.sep}`) && res.set('Cache-Control', 'public, max-age=31536000, immutable'),
    }))
    app.get('/{*path}', (req, res) => res.sendFile(path.join(env.clientDist, 'index.html')))
  }

  app.use(errorHandler)
  return app
}
