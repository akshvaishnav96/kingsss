import { env } from '../../config/env.js'

// Picks the storage driver once at startup. Both drivers expose storeImage / storeVideo / remove.
const drivers = { cloudinary: () => import('./cloudinary.js'), local: () => import('./local.js') }
const active = await drivers[env.storage]()
const local = env.storage === 'local' ? active : null

export const storageProvider = env.storage
export const storeImage = (filePath, base) => active.storeImage(filePath, base)
export const storeVideo = (filePath, base, ext) => active.storeVideo(filePath, base, ext)

// Deletes with the driver the file was stored with, so switching providers keeps old files removable.
export async function removeStored(media) {
  if (media.provider === 'cloudinary') return (env.storage === 'cloudinary' ? active : await drivers.cloudinary()).remove(media)
  return (local ?? (await drivers.local())).remove(media)
}
