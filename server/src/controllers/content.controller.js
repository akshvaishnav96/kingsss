import * as content from '../services/content.service.js'
import { toId } from '../lib/http.js'

export const getSchema = (req, res) => res.json({ settings: content.SETTINGS_KEYS, collections: content.COLLECTIONS })
export const getSettings = async (req, res) => res.json(await content.getAllSettings())
export const saveSetting = async (req, res) => res.json(await content.saveSetting(req.params.key, req.body?.value))

export const listItems = async (req, res) => res.json(await content.listItems(req.params.collection))
export const createItem = async (req, res) => res.status(201).json(await content.createItem(req.params.collection, req.body ?? {}))
export const updateItem = async (req, res) => res.json(await content.updateItem(req.params.collection, toId(req.params.id), req.body ?? {}))

export async function deleteItem(req, res) {
  await content.deleteItem(req.params.collection, toId(req.params.id))
  res.status(204).end()
}

export async function reorderItems(req, res) {
  await content.reorderItems(req.params.collection, req.body?.ids)
  res.json({ ok: true })
}
