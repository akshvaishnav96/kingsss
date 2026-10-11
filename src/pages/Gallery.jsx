import { Box, Container, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import { useSite } from '../hooks/useSite'
import { useGallery } from '../hooks/useGallery'
import PageBanner from '../components/PageBanner'
import CTASection from '../components/CTASection'
import PageMeta from '../components/PageMeta'
import FilterChips from '../components/FilterChips'
import GalleryTile from '../components/gallery/GalleryTile'
import GalleryLightbox from '../components/gallery/GalleryLightbox'

export default function Gallery() {
  const { galleryPage } = useSite()
  const { categories, category, setCategory, visible, lightbox } = useGallery()

  return (
    <>
      <PageMeta title="Gallery" description="Photos and videos from KINGSSS IMPORT EXPORT LLP — trade fairs, partner visits, shipments and our team." />
      <PageBanner {...galleryPage.banner} crumbs={[{ label: 'Gallery' }]} />

      <Box component="section" aria-labelledby="gallery-title" sx={{ py: { xs: 6, md: 10 } }}>
        <Container>
          <Typography id="gallery-title" variant="h2" className="sr-only">Photo and video gallery</Typography>
          <FilterChips options={categories} value={category} onChange={setCategory} label="Filter gallery" sx={{ justifyContent: 'center', mb: { xs: 4, md: 6 } }} />

          <Box component={motion.ul} layout sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: { xs: 1.25, sm: 2 },
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' } }}>
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((item, i) => (
                <motion.li key={item.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }} style={{ minWidth: 0 }}>
                  <GalleryTile item={item} onOpen={() => lightbox.open(i)} />
                </motion.li>
              ))}
            </AnimatePresence>
          </Box>
        </Container>
      </Box>

      <GalleryLightbox item={lightbox.item} index={lightbox.index} total={lightbox.total} onClose={lightbox.close} onStep={lightbox.step} />
      <CTASection />
    </>
  )
}
