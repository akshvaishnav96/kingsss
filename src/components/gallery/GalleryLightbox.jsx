import { Box, Dialog, IconButton, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import CloseIcon from '@mui/icons-material/Close'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import VideocamOutlined from '@mui/icons-material/VideocamOutlined'
import { brand } from '../../theme/theme'

// Arrow-key navigation is handled by useGallery().
export default function GalleryLightbox({ item, index, total, onClose, onStep }) {
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
