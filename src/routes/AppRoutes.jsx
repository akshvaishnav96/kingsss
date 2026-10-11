import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import SiteLoader from '../components/SiteLoader'
import ErrorBoundary from '../components/ErrorBoundary'

const AboutUs = lazy(() => import('../pages/AboutUs'))
const Services = lazy(() => import('../pages/Services'))
const Products = lazy(() => import('../pages/Products'))
const ProductDetails = lazy(() => import('../pages/ProductDetails'))
const OurProcess = lazy(() => import('../pages/OurProcess'))
const Gallery = lazy(() => import('../pages/Gallery'))
const Contact = lazy(() => import('../pages/Contact'))
const NotFound = lazy(() => import('../pages/NotFound'))
const AdminRoutes = lazy(() => import('./AdminRoutes'))

// Public pages need site content before rendering; this boundary loads it once and handles failures.
function SiteBoundary({ children }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset}>
          <Suspense fallback={<SiteLoader />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/*" element={<Suspense fallback={<SiteLoader />}><AdminRoutes /></Suspense>} />
      <Route element={<SiteBoundary><MainLayout /></SiteBoundary>}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="services" element={<Services />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetails />} />
        <Route path="our-process" element={<OurProcess />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
