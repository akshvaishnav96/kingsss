import logo from '../../../src/assets/logo/kingsss-logo.png'

// Media files keyed by file name. A future CMS can replace these maps with media-library URLs.
const byName = (files, keepExt = false) =>
  Object.fromEntries(Object.entries(files).map(([path, url]) => {
    const file = path.split('/').pop()
    return [keepExt ? file : file.replace(/\.[^.]+$/, ''), url]
  }))

// Stock / editorial images (src/assets/images)
export const images = byName(import.meta.glob('../../../src/assets/images/*.webp', { eager: true, import: 'default' }))
// Team portraits (src/assets/team)
export const teamImages = byName(import.meta.glob('../../../src/assets/team/*.webp', { eager: true, import: 'default' }))
// Company photos and videos (src/assets/gallery), keyed with extension, e.g. 'container-opening.mp4'
export const galleryMedia = byName(import.meta.glob('../../../src/assets/gallery/**/*.{webp,mp4}', { eager: true, import: 'default' }), true)

export { logo }
