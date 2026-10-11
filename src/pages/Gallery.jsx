import { useEffect, useState } from 'react'
import { Box, Chip, Container, Dialog, IconButton, Stack, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import CloseIcon from '@mui/icons-material/Close'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import ZoomInOutlined from '@mui/icons-material/ZoomInOutlined'
import VideocamOutlined from '@mui/icons-material/VideocamOutlined'
import { brand } from '../theme/theme'
import { galleryCategories, galleryItems } from '../data/gallery'
import { galleryPage } from '../data/siteContent'
import PageBanner from '../components/PageBanner'
import CTASection from '../components/CTASection'
import PageMeta from '../components/PageMeta'

export default function Gallery() {
  const [category, setCategory] = useState('all')
  const [openIndex, setOpenIndex] = useState(null)

  const visible = galleryItems.filter((g) => category === 'all' || g.category === category)
  const current = openIndex === null ? null : visible[openIndex]
  const step = (delta) => setOpenIndex((i) => (i + delta + visible.length) % visible.length)

  return (
    <>
      <PageMeta title="Gallery" description="A visual look at farms, fresh produce, packaging and logistics at KINGSSS IMPORT EXPORT LLP." />
      <PageBanner {...galleryPage.banner} crumbs={[{ label: 'Gallery' }]} />

      <Box component="section" aria-labelledby="gallery-title" sx={{ py: { xs: 6, md: 10 } }}>
        <Container>
          <Typography id="gallery-title" variant="h2" className="sr-only">Photo and video gallery</Typography>
          <Stack role="group" aria-label="Filter gallery" direction="row" sx={{ flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: { xs: 4, md: 6 } }}>
            {galleryCategories.map((c) => {
              const active = c.id === category
              return (
                <Chip key={c.id} label={c.label} clickable aria-pressed={active} onClick={() => setCategory(c.id)}
                  sx={{ height: 40, px: 0.75, fontSize: '0.88rem', border: '1px solid', transition: 'all .25s',
                    bgcolor: active ? brand.navy : '#fff', color: active ? '#fff' : brand.navy, borderColor: active ? brand.navy : 'rgba(7,29,51,.16)',
                    '&:hover': { bgcolor: active ? brand.navyDark : brand.soft } }} />
              )
            })}
          </Stack>

          <Box component={motion.ul} layout sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: { xs: 1.25, sm: 2 },
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' } }}>
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((item, i) => (
                <motion.li key={item.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }} style={{ minWidth: 0 }}>
                  <Tile item={item} onOpen={() => setOpenIndex(i)} />
                </motion.li>
              ))}
            </AnimatePresence>
          </Box>
        </Container>
      </Box>

      <Lightbox item={current} index={openIndex} total={visible.length} onClose={() => setOpenIndex(null)} onStep={step} />
      <CTASection />
    </>
  )
}

function Tile({ item, onOpen }) {
  const isVideo = item.type === 'video'
  return (
    <Box component="button" type="button" onClick={onOpen} className="zoom-host" aria-label={`${isVideo ? 'Play video' : 'View image'}: ${item.title}`}
      sx={{ all: 'unset', boxSizing: 'border-box', cursor: 'pointer', position: 'relative', display: 'block', width: '100%', aspectRatio: '4 / 5', overflow: 'hidden', borderRadius: '4px', bgcolor: brand.navy,
        '&:focus-visible': { outline: `2px solid ${brand.gold}`, outlineOffset: 3 }, '&:hover .overlay, &:focus-visible .overlay': { opacity: 1 } }}>
      <img className="zoom-img" src={item.thumb ?? item.src} alt="" loading="lazy" decoding="async" style={{ objectPosition: 'center 30%' }} />
      <Box className="overlay" sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', p: { xs: 1.25, sm: 2 }, opacity: { xs: 1, md: isVideo ? 1 : 0 }, transition: 'opacity .35s',
        background: 'linear-gradient(0deg, rgba(7,29,51,.85) 0%, rgba(7,29,51,0) 60%)' }}>
        <Typography component="span" sx={{ color: '#fff', fontWeight: 500, fontSize: { xs: '0.8rem', sm: '0.92rem' }, lineHeight: 1.3, pr: 4 }}>{item.title}</Typography>
        {!isVideo && <ZoomInOutlined sx={{ position: 'absolute', right: { xs: 10, sm: 16 }, bottom: { xs: 10, sm: 16 }, color: brand.goldLight, fontSize: 20 }} />}
      </Box>
      {isVideo && (
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', width: { xs: 48, sm: 64 }, height: { xs: 48, sm: 64 }, borderRadius: '50%',
          display: 'grid', placeItems: 'center', bgcolor: 'rgba(7,29,51,.55)', border: `2px solid ${brand.goldLight}`, color: '#fff', backdropFilter: 'blur(4px)', transition: 'transform .3s',
          '.zoom-host:hover &': { transform: 'translate(-50%, -60%) scale(1.08)' } }}>
          <PlayArrowRounded sx={{ fontSize: { xs: 28, sm: 36 } }} />
        </Box>
      )}
    </Box>
  )
}

function Lightbox({ item, index, total, onClose, onStep }) {
  useEffect(() => {
    if (!item) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [item, onStep])

  const isVideo = item?.type === 'video'
  return (
    <Dialog open={Boolean(item)} onClose={onClose} maxWidth={isVideo ? 'sm' : 'md'} fullWidth aria-labelledby="lightbox-title"
      slotProps={{ paper: { sx: { bgcolor: brand.navy, color: '#fff', m: { xs: 1.5, sm: 4 }, width: { xs: 'calc(100% - 24px)', sm: '100%' }, maxHeight: 'calc(100% - 24px)', borderRadius: '4px', overflow: 'hidden' } },
        backdrop: { sx: { bgcolor: 'rgba(4,14,26,.88)' } } }}>
      {item && (
        <>
          <Box sx={{ position: 'relative', bgcolor: '#04121F', display: 'grid', placeItems: 'center' }}>
            {isVideo ? (
              item.videoSrc ? (
                <video src={item.videoSrc} poster={item.src} controls autoPlay playsInline style={{ width: '100%', maxHeight: '75vh' }} />
              ) : (
                <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', maxHeight: '75vh' }}>
                  <Box component="img" src={item.src} alt={item.alt} sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
                  <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', p: 3 }}>
                    <div>
                      <VideocamOutlined sx={{ fontSize: 44, color: brand.gold }} aria-hidden />
                      <Typography variant="h4" component="p" sx={{ mt: 1 }}>Video coming soon</Typography>
                      <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,.75)' }}>This video will be added once footage is available.</Typography>
                    </div>
                  </Box>
                </Box>
              )
            ) : (
              <AnimatePresence mode="wait">
                <motion.img key={item.id} src={item.src} alt={item.alt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                  style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain' }} />
              </AnimatePresence>
            )}
            {total > 1 && (
              <>
                <IconButton aria-label="Previous" onClick={() => onStep(-1)} sx={{ ...navBtn, left: { xs: 6, sm: 16 } }}><ChevronLeft /></IconButton>
                <IconButton aria-label="Next" onClick={() => onStep(1)} sx={{ ...navBtn, right: { xs: 6, sm: 16 } }}><ChevronRight /></IconButton>
              </>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: { xs: 2, sm: 3 }, py: 1.5 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography id="lightbox-title" component="h2" sx={{ fontWeight: 600 }}>{item.title}</Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,.6)' }}>{index + 1} / {total}</Typography>
            </Box>
            <IconButton aria-label="Close" onClick={onClose} sx={{ color: '#fff', border: '1px solid rgba(255,255,255,.2)' }}><CloseIcon /></IconButton>
          </Box>
        </>
      )}
    </Dialog>
  )
}

const navBtn = { position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, color: '#fff', bgcolor: 'rgba(7,29,51,.6)', border: '1px solid rgba(214,173,82,.5)',
  '&:hover': { bgcolor: brand.gold, color: brand.navy } }
