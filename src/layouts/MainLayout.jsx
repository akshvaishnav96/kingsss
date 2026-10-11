import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { motion } from 'motion/react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

export default function MainLayout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    // Lazy pages may not be rendered yet, so retry briefly until the target exists.
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

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <motion.main
        id="main"
        tabIndex={-1}
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
        style={{ outline: 'none' }}
      >
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#071D33' }} />}>
          <Outlet />
        </Suspense>
      </motion.main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
