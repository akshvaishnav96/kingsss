import { useEffect } from 'react'
import { useLocation } from 'react-router'

// Scrolls to top on page change, or to #hash targets (retrying briefly while lazy pages render).
export function useScrollOnNavigate() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    let tries = 0
    const timer = setInterval(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el || ++tries > 40) {
        clearInterval(timer)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 50)
    return () => clearInterval(timer)
  }, [pathname, hash])
}
