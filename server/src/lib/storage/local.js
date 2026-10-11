import { mkdir, rename, stat, unlink } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { env } from '../../config/env.js'

const dir = path.join(env.uploadDir, 'media')
await mkdir(dir, { recursive: true })

// Images → WebP (max 2000px) + 640px thumbnail, stored in server/uploads/media.
export async function storeImage(filePath, base) {
  const img = sharp(filePath, { failOn: 'none' }).rotate()
  await img.clone().resize(2000, 2000, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 76 }).toFile(path.join(dir, `${base}.webp`))
  await img.clone().resize(640, 640, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 70 }).toFile(path.join(dir, `${base}-thumb.webp`))
  const { size } = await stat(path.join(dir, `${base}.webp`))
  return { url: `/uploads/media/${base}.webp`, thumbUrl: `/uploads/media/${base}-thumb.webp`, size, provider: 'local', publicId: null }
}

export async function storeVideo(filePath, base, ext) {
  const name = base + ext
  await rename(filePath, path.join(dir, name))
  const { size } = await stat(path.join(dir, name))
  return { url: `/uploads/media/${name}`, thumbUrl: null, size, provider: 'local', publicId: null }
}

export async function remove(media) {
  for (const url of [media.url, media.thumbUrl].filter((u) => u?.startsWith('/uploads/media/'))) {
    await unlink(path.join(env.uploadDir, url.replace('/uploads/', ''))).catch(() => {})
  }
}
