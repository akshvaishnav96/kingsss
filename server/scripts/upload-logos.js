// Uploads the brand logos to Cloudinary (fixed IDs, so re-running replaces them and links stay the same),
// prints their public URLs, and regenerates the email signatures to use them.
//   npm run logos:upload
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { v2 as cloudinary } from 'cloudinary'

if (!process.env.CLOUDINARY_URL) {
  console.error('CLOUDINARY_URL is not set in .env (Cloudinary Dashboard → API Keys → "API environment variable").')
  process.exit(1)
}
cloudinary.config({ secure: true })

const root = path.resolve(import.meta.dirname, '../..')
const folder = `${process.env.CLOUDINARY_FOLDER || 'kingsss'}/brand`
const logos = [
  ['logo', 'public/logo.png', 'Navy panel — readable on white (documents, general use)'],
  ['logo-transparent', 'public/logo-transparent.png', 'Transparent — for navy/dark backgrounds (signature header)'],
]

const urls = {}
for (const [id, file, note] of logos) {
  const r = await cloudinary.uploader.upload(path.join(root, file), { folder, public_id: id, overwrite: true, invalidate: true, resource_type: 'image' })
  urls[id] = cloudinary.url(r.public_id, { version: r.version, fetch_format: 'auto', quality: 'auto' })
  console.log(`${id.padEnd(17)} ${urls[id]}\n${''.padEnd(17)} (${note})`)
}

process.env.SIGNATURE_LOGO_URL = urls['logo-transparent']
await import(pathToFileURL(path.join(root, 'server/scripts/email-signatures.js')).href)
