import { env } from './config/env.js'
import { createApp } from './app.js'
import { purgeExpiredSessions } from './services/auth.service.js'
import { verifyMailer } from './lib/mailer.js'

createApp().listen(env.port, () => console.log(`KINGSSS API listening on http://localhost:${env.port}`))

purgeExpiredSessions().catch(console.error)
verifyMailer()
setInterval(() => purgeExpiredSessions().catch(console.error), 6 * 3600_000).unref()
