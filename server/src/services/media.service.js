import { unlink } from 'node:fs/promises'
import path from 'node:path'
import { randomBytes } from 'node:crypto'
import { prisma } from '../lib/prisma.js'
import { slugify } from '../lib/http.js'
import { storeImage, storeVideo, removeStored } from '../lib/storage/index.js'
import { IMAGE_TYPES } from '../middleware/upload.js'

export const listMedia = () => prisma.media.findMany({ orderBy: { createdAt: 'desc' } })

export async function storeUpload(file) {
  const base = `${slugify(path.parse(file.originalname).name) || 'file'}-${randomBytes(3).toString('hex')}`
  const isImage = IMAGE_TYPES.test(file.mimetype)
  try {
    const stored = isImage ? await storeImage(file.path, base) : await storeVideo(file.path, base, path.extname(file.originalname).toLowerCase() || '.mp4')
    return prisma.media.create({ data: { ...stored, type: isImage ? 'image' : 'video', filename: file.originalname } })
  } finally {
    await unlink(file.path).catch(() => {})
  }
}

export async function deleteMedia(id) {
  const media = await prisma.media.findUniqueOrThrow({ where: { id } })
  await removeStored(media)
  await prisma.media.delete({ where: { id } })
}
