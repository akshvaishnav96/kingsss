import { v2 as cloudinary } from 'cloudinary'

// Configured from CLOUDINARY_URL (cloudinary://<api_key>:<api_secret>@<cloud_name>), read by the SDK itself.
cloudinary.config({ secure: true })
const folder = process.env.CLOUDINARY_FOLDER || 'kingsss'

// Cloudinary keeps the original; resizing and WebP/AVIF conversion happen at delivery via f_auto,q_auto.
const imageUrl = (publicId, version, width) =>
  cloudinary.url(publicId, { version, transformation: [{ width, height: width, crop: 'limit' }, { fetch_format: 'auto', quality: 'auto' }] })

export async function storeImage(filePath, base) {
  const r = await cloudinary.uploader.upload(filePath, { folder, public_id: base, resource_type: 'image', overwrite: false })
  return { url: imageUrl(r.public_id, r.version, 2000), thumbUrl: imageUrl(r.public_id, r.version, 640), size: r.bytes, provider: 'cloudinary', publicId: r.public_id }
}

export async function storeVideo(filePath, base) {
  // upload_large streams in chunks, needed for videos over 100 MB.
  const r = await new Promise((resolve, reject) =>
    cloudinary.uploader.upload_large(filePath, { folder, public_id: base, resource_type: 'video', chunk_size: 20_000_000 }, (err, res) => (err ? reject(err) : resolve(res))))
  return {
    url: cloudinary.url(r.public_id, { resource_type: 'video', version: r.version, format: 'mp4', transformation: [{ quality: 'auto' }] }),
    thumbUrl: cloudinary.url(r.public_id, { resource_type: 'video', version: r.version, format: 'jpg', transformation: [{ start_offset: 'auto', width: 640, crop: 'limit' }, { quality: 'auto' }] }),
    size: r.bytes,
    provider: 'cloudinary',
    publicId: r.public_id,
  }
}

export async function remove(media) {
  if (!media.publicId) return
  await cloudinary.uploader.destroy(media.publicId, { resource_type: media.type === 'video' ? 'video' : 'image', invalidate: true })
}
