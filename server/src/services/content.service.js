import { createHash } from 'node:crypto'
import { prisma } from '../lib/prisma.js'
import { HttpError, slugify } from '../lib/http.js'

// Allowed singleton content keys, and collections mapped to the field used as an item's title.
export const SETTINGS_KEYS = [
  'company', 'contact', 'socialLinks', 'home', 'dualCta', 'stats', 'about', 'teamSection', 'mentor',
  'servicesPage', 'audiences', 'engagementSteps', 'productsPage', 'productCategories', 'processPage', 'quality',
  'galleryPage', 'galleryCategories', 'contactPage', 'contactCta', 'enquiryChecklist',
]
export const COLLECTIONS = { products: 'name', galleryItems: 'title', services: 'title', faqs: 'q', directors: 'name' }

const assertKey = (key) => { if (!SETTINGS_KEYS.includes(key)) throw new HttpError(404, `Unknown content block "${key}".`) }
const assertCollection = (c) => { if (!COLLECTIONS[c]) throw new HttpError(404, `Unknown collection "${c}".`) }

// ---- Public site payload, cached until the next content write ----
let cache = null
export const invalidateSite = () => { cache = null }

export async function getSitePayload() {
  if (cache) return cache
  const [settings, items] = await Promise.all([
    prisma.setting.findMany(),
    prisma.item.findMany({ where: { published: true }, orderBy: [{ position: 'asc' }, { id: 'asc' }] }),
  ])
  const site = Object.fromEntries(settings.map((s) => [s.key, s.value]))
  for (const name of Object.keys(COLLECTIONS)) site[name] = []
  for (const item of items) site[item.collection]?.push({ ...item.data, id: String(item.id) })
  const body = JSON.stringify(site)
  cache = { body, etag: `"${createHash('sha1').update(body).digest('base64url')}"` }
  return cache
}

// ---- Settings ----
export async function getAllSettings() {
  const rows = await prisma.setting.findMany({ where: { key: { in: SETTINGS_KEYS } } })
  return Object.fromEntries(rows.map((r) => [r.key, r.value]))
}

export async function saveSetting(key, value) {
  assertKey(key)
  if (value === undefined) throw new HttpError(400, 'Missing value.')
  const row = await prisma.setting.upsert({ where: { key }, create: { key, value }, update: { value } })
  invalidateSite()
  return row.value
}

// ---- Collections ----
const toDto = (item) => ({ id: item.id, slug: item.slug, position: item.position, published: item.published, data: item.data, updatedAt: item.updatedAt })

function slugFor(collection, data) {
  if (collection !== 'products') return null
  const slug = slugify(data.slug || data.name || '')
  if (!slug) throw new HttpError(400, 'Product needs a name or slug.', { slug: 'Required.' })
  data.slug = slug
  return slug
}

export async function listItems(collection) {
  assertCollection(collection)
  const items = await prisma.item.findMany({ where: { collection }, orderBy: [{ position: 'asc' }, { id: 'asc' }] })
  return items.map(toDto)
}

export async function createItem(collection, { data, published = true }) {
  assertCollection(collection)
  if (!data || typeof data !== 'object') throw new HttpError(400, 'Missing item data.')
  const { _max } = await prisma.item.aggregate({ where: { collection }, _max: { position: true } })
  const item = await prisma.item.create({ data: { collection, data, slug: slugFor(collection, data), published, position: (_max.position ?? -1) + 1 } })
  invalidateSite()
  return toDto(item)
}

export async function updateItem(collection, id, { data, published }) {
  assertCollection(collection)
  const item = await prisma.item.update({
    where: { id, collection },
    data: { ...(data && { data, slug: slugFor(collection, data) }), ...(typeof published === 'boolean' && { published }) },
  })
  invalidateSite()
  return toDto(item)
}

export async function deleteItem(collection, id) {
  assertCollection(collection)
  await prisma.item.delete({ where: { id, collection } })
  invalidateSite()
}

export async function reorderItems(collection, ids) {
  assertCollection(collection)
  if (!Array.isArray(ids)) throw new HttpError(400, 'ids must be an array.')
  await prisma.$transaction(ids.map((id, position) => prisma.item.update({ where: { id: Number(id), collection }, data: { position } })))
  invalidateSite()
}
