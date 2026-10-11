// Infers how the admin editor should render a value, so any content shape can be edited
// without writing a form per page.

const IMAGE_KEYS = /^(image|src|thumb|poster|logo|photo)$|Image$/
const LONG_TEXT_KEYS = /^(text|description|bio|a|subtitle|intro|note)$|Text$|Description$/

export function fieldKind(key, value, ctx = {}) {
  if (key === 'videoSrc') return 'video'
  if (key === 'icon') return 'icon'
  if (selectOptions(key, ctx)) return 'select'
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'number') return 'number'
  if (Array.isArray(value)) return value.length && value.every((v) => typeof v === 'string') ? 'stringList' : value.some((v) => v && typeof v === 'object') ? 'list' : listKind(key)
  if (value && typeof value === 'object') return 'object'
  if (typeof value === 'string' && (IMAGE_KEYS.test(key) || /\.(webp|jpe?g|png|gif|avif)(\?|$)/i.test(value) || /res\.cloudinary\.com\/[^/]+\/image\//.test(value))) return 'image'
  if (typeof value === 'string' && (/\.(mp4|webm|mov)(\?|$)/i.test(value) || /res\.cloudinary\.com\/[^/]+\/video\//.test(value))) return 'video'
  if (LONG_TEXT_KEYS.test(key) || (typeof value === 'string' && value.length > 90)) return 'textarea'
  return 'text'
}

// Empty arrays: decide by name whether they hold strings or objects.
const listKind = (key) => (/^(points|items|values|highlights|overview|packaging|varieties|paragraphs|subjects|titleLines)$/.test(key) ? 'stringList' : 'list')

export function selectOptions(key, { collection, settings } = {}) {
  if (key === 'category' && collection === 'products') return (settings?.productCategories ?? []).filter((c) => c.id !== 'all').map((c) => ({ value: c.id, label: c.label }))
  if (key === 'category' && collection === 'galleryItems') return (settings?.galleryCategories ?? []).filter((c) => c.id !== 'all').map((c) => ({ value: c.id, label: c.label }))
  if (key === 'type' && collection === 'galleryItems') return [{ value: 'image', label: 'Image' }, { value: 'video', label: 'Video' }]
  if (key === 'phoneId') return (settings?.contact?.phones ?? []).map((p) => ({ value: p.id, label: `${p.name} (${p.number})` }))
  return null
}

export const humanize = (key) =>
  ({ q: 'Question', a: 'Answer', cta: 'Button', href: 'Link URL', to: 'Link to page', alt: 'Image description (alt text)', imageAlt: 'Image description (alt text)', videoSrc: 'Video file', phoneId: 'Phone contact', visible: 'Show on website', mapQuery: 'Map search text (used when latitude/longitude are empty)', mapLat: 'Map latitude (e.g. 26.8051)', mapLng: 'Map longitude (e.g. 75.7985)' }[key] ??
  key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (c) => c.toUpperCase()))

export const isHiddenKey = (key) => key === 'id'

export const newId = () => Math.random().toString(36).slice(2, 10)

// Blank copy of an existing value, used as the template for "Add" in lists.
export function blankLike(value) {
  if (Array.isArray(value)) return value.length ? [blankLike(value[0])] : []
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k === 'id' ? newId() : blankLike(v)]))
  if (typeof value === 'boolean') return false
  if (typeof value === 'number') return 0
  return ''
}

export function itemTitle(obj, preferred) {
  if (!obj || typeof obj !== 'object') return String(obj ?? '')
  for (const k of [preferred, 'title', 'name', 'label', 'q', 'heading', 'value', 'eyebrow'].filter(Boolean)) {
    if (typeof obj[k] === 'string' && obj[k].trim()) return obj[k]
  }
  return 'Untitled'
}
