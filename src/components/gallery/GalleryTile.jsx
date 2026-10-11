import { Box, Typography } from '@mui/material'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import ZoomInOutlined from '@mui/icons-material/ZoomInOutlined'
import { brand } from '../../theme/theme'

export default function GalleryTile({ item, onOpen }) {
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
