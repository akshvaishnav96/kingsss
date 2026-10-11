// Seeds the database from server/seed/content (the original static website content).
//   npm run db:seed            → only if the database has no content yet
//   npm run db:seed -- --force → replace all content (users and enquiries are kept)
import { copyFile, mkdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { createServer } from 'vite'
import { prisma } from '../src/lib/prisma.js'
import { hashPassword } from '../src/lib/password.js'
import { env } from '../src/config/env.js'
import { SETTINGS_KEYS, COLLECTIONS } from '../src/services/content.service.js'
import { storageProvider, storeImage, storeVideo } from '../src/lib/storage/index.js'

const projectRoot = path.resolve(import.meta.dirname, '../..')
const force = process.argv.includes('--force')

async function loadContent() {
  const vite = await createServer({ root: projectRoot, logLevel: 'error', server: { middlewareMode: true, hmr: false }, appType: 'custom' })
  try {
    return await vite.ssrLoadModule('/server/seed/content/index.js')
  } finally {
    await vite.close()
  }
}

// Every referenced /src/assets/... file is stored (Cloudinary, or copied to uploads/seed/) and its URL rewritten.
const stored = new Map() // asset path -> { url, thumbUrl, size, provider, publicId, type }

async function storeAsset(assetPath) {
  if (stored.has(assetPath)) return stored.get(assetPath)
  const abs = path.join(projectRoot, assetPath)
  const type = assetPath.endsWith('.mp4') ? 'video' : 'image'
  let result
  if (storageProvider === 'cloudinary') {
    // "-thumb" files are not uploaded separately; Cloudinary derives thumbnails from the original.
    const original = assetPath.replace('-thumb.webp', '.webp')
    if (original !== assetPath && existsSync(path.join(projectRoot, original))) return { ...(await storeAsset(original)), derived: 'thumb' }
    const base = assetPath.replace('/src/assets/', '').replace(/\.[^.]+$/, '').replace(/[^\w-]+/g, '-')
    result = type === 'video' ? await storeVideo(abs, base) : await storeImage(abs, base)
    console.log(`  uploaded ${assetPath}`)
  } else {
    const rel = assetPath.replace('/src/assets/', '')
    const target = path.join(env.uploadDir, 'seed', rel)
    await mkdir(path.dirname(target), { recursive: true })
    await copyFile(abs, target)
    result = { url: `/uploads/seed/${rel}`, thumbUrl: null, size: (await stat(target)).size, provider: 'local', publicId: null }
  }
  stored.set(assetPath, { ...result, type })
  return stored.get(assetPath)
}

async function relocateAssets(value) {
  if (typeof value === 'string' && value.startsWith('/src/assets/')) {
    const asset = await storeAsset(value)
    return asset.derived === 'thumb' ? asset.thumbUrl : asset.url
  }
  if (Array.isArray(value)) {
    const out = []
    for (const v of value) out.push(await relocateAssets(v)) // sequential: keeps uploads gentle
    return out
  }
  if (value && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) out[k] = await relocateAssets(v)
    return out
  }
  return value
}

async function seedAdmin() {
  if (await prisma.user.count()) return
  const { ADMIN_EMAIL: email, ADMIN_PASSWORD: password } = process.env
  if (!email || !password) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env to create the first admin user.')
  await prisma.user.create({ data: { email: email.toLowerCase(), name: 'Administrator', passwordHash: await hashPassword(password) } })
  console.log(`Created admin user ${email}`)
}

async function seedContent() {
  if (!force && (await prisma.setting.count())) return console.log('Content already present — skipped (use --force to replace).')
  const content = await loadContent()
  console.log(`Seeding content (media storage: ${storageProvider})…`)

  const settings = []
  for (const key of SETTINGS_KEYS) if (content[key] !== undefined) settings.push({ key, value: await relocateAssets(content[key]) })

  const items = []
  for (const collection of Object.keys(COLLECTIONS)) {
    for (const [position, { id, ...data }] of (content[collection] ?? []).entries()) { // eslint-disable-line no-unused-vars
      const relocated = await relocateAssets(data)
      items.push({ collection, position, data: relocated, slug: collection === 'products' ? relocated.slug : null })
    }
  }

  // Media library rows for the original files (thumbnails and video posters are attached, not listed).
  const media = [...stored.entries()]
    .filter(([src]) => !src.includes('-thumb.') && !src.includes('-poster.'))
    .map(([src, m]) => ({
      url: m.url,
      thumbUrl: m.thumbUrl ?? stored.get(src.replace(/\.webp$/, '-thumb.webp'))?.url ?? stored.get(src.replace(/\.mp4$/, '-poster.webp'))?.url ?? null,
      type: m.type,
      filename: path.basename(src),
      size: m.size,
      provider: m.provider,
      publicId: m.publicId,
    }))

  await prisma.$transaction([
    prisma.setting.deleteMany(),
    prisma.item.deleteMany(),
    prisma.media.deleteMany({ where: { OR: [{ url: { startsWith: '/uploads/seed/' } }, { publicId: { startsWith: `${process.env.CLOUDINARY_FOLDER || 'kingsss'}/` }, filename: { in: [...stored.keys()].map((k) => path.basename(k)) } }] } }),
    prisma.setting.createMany({ data: settings }),
    prisma.item.createMany({ data: items }),
    prisma.media.createMany({ data: media }),
  ])
  console.log(`Seeded ${settings.length} content blocks, ${items.length} items, ${media.length} media files.`)
}

try {
  await seedAdmin()
  await seedContent()
} finally {
  await prisma.$disconnect()
}
