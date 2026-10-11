import { mkdirSync } from 'node:fs'
import path from 'node:path'
import multer from 'multer'
import { env } from '../config/env.js'

export const IMAGE_TYPES = /^image\/(jpeg|png|webp|gif|avif|heic|heif)$/
export const VIDEO_TYPES = /^video\/(mp4|webm|quicktime)$/

const tmpDir = path.join(env.uploadDir, 'tmp')
mkdirSync(tmpDir, { recursive: true })

export const upload = multer({
  dest: tmpDir,
  limits: { fileSize: 150 * 1024 * 1024, files: 20 },
  fileFilter: (req, file, cb) => cb(null, IMAGE_TYPES.test(file.mimetype) || VIDEO_TYPES.test(file.mimetype)),
})
