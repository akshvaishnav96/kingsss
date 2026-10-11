import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'

const AboutUs = lazy(() => import('./pages/AboutUs'))
const Services = lazy(() => import('./pages/Services'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const OurProcess = lazy(() => import('./pages/OurProcess'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
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
    </BrowserRouter>
  )
}
