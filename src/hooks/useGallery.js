import { useCallback, useEffect, useState } from 'react'
import { useSite } from './useSite'

// Category filter + lightbox state (with arrow-key navigation) for the gallery page.
export function useGallery() {
  const { galleryItems, galleryCategories } = useSite()
  const [category, setCategory] = useState('all')
  const [openIndex, setOpenIndex] = useState(null)

  const visible = galleryItems.filter((g) => category === 'all' || g.category === category)
  const current = openIndex === null ? null : visible[openIndex]
  const step = useCallback((delta) => setOpenIndex((i) => (i + delta + visible.length) % visible.length), [visible.length])

  useEffect(() => {
    if (!current) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, step])

  return {
    categories: galleryCategories,
    category,
    setCategory,
    visible,
    lightbox: { item: current, index: openIndex, total: visible.length, open: setOpenIndex, close: () => setOpenIndex(null), step },
  }
}
