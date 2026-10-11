import path from 'node:path'

const root = path.resolve(import.meta.dirname, '../..')

export const env = {
  port: Number(process.env.PORT ?? 4000),
  isProduction: process.env.NODE_ENV === 'production',
  databaseUrl: process.env.DATABASE_URL,
  uploadDir: path.resolve(process.env.UPLOAD_DIR ?? path.join(root, 'uploads')),
  clientDist: path.resolve(root, '../dist'),
  // Public website address used for links in emails (e.g. https://kingsssimportexportllp.com).
  publicSiteUrl: (process.env.PUBLIC_SITE_URL ?? '').replace(/\/$/, ''),
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? '').split(',').filter(Boolean),
  sessionDays: 7,
  // Media storage: Cloudinary when CLOUDINARY_URL is set, otherwise server/uploads on local disk.
  storage: process.env.CLOUDINARY_URL ? 'cloudinary' : 'local',
  // Outgoing email (enquiry notifications). Disabled while SMTP_HOST is empty.
  mail: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_SECURE ?? String(Number(process.env.SMTP_PORT ?? 465) === 465)) === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    notifyTo: (process.env.ENQUIRY_NOTIFY_TO || process.env.SMTP_USER || '').split(',').map((s) => s.trim()).filter(Boolean),
    autoReply: process.env.ENQUIRY_AUTOREPLY === 'true',
  },
}

if (!env.databaseUrl) throw new Error('DATABASE_URL is not set. Copy .env.example to .env and fill it in.')

if (process.env.CLOUDINARY_URL && !/^cloudinary:\/\/[^:]+:[^@]+@.+/.test(process.env.CLOUDINARY_URL)) {
  throw new Error('CLOUDINARY_URL must look like cloudinary://<api_key>:<api_secret>@<cloud_name>')
}
