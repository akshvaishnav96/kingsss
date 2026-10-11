import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'
import { motion } from 'motion/react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import { useScrollOnNavigate } from '../hooks/useScrollOnNavigate'

export default function MainLayout() {
  const { pathname } = useLocation()
  useScrollOnNavigate()

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
