import logo from '../assets/logo/kingsss-logo.png'

// Every image in src/assets/images, keyed by file name (without extension).
// A future CMS can replace this map with URLs from the media library.
const files = import.meta.glob('../assets/images/*.webp', { eager: true, import: 'default' })

export const images = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace('.webp', ''), url]),
)

export { logo }
