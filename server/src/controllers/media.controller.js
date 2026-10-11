import * as media from '../services/media.service.js'
import { HttpError, toId } from '../lib/http.js'

export const list = async (req, res) => res.json(await media.listMedia())

export async function upload(req, res) {
  if (!req.files?.length) throw new HttpError(400, 'No supported files received (images: JPG, PNG, WebP, HEIC; videos: MP4, WebM, MOV).')
  const stored = []
  for (const file of req.files) stored.push(await media.storeUpload(file))
  res.status(201).json(stored)
}

export async function remove(req, res) {
  await media.deleteMedia(toId(req.params.id))
  res.status(204).end()
}
