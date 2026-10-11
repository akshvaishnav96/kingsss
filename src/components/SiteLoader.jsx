import { Box } from '@mui/material'
import { motion } from 'motion/react'
import logo from '../assets/logo/kingsss-logo.png'
import { brand } from '../theme/theme'

// Shown only on the very first visit; afterwards content comes from the persisted cache.
export default function SiteLoader() {
  return (
    <Box role="status" aria-label="Loading" sx={{ position: 'fixed', inset: 0, display: 'grid', placeItems: 'center', bgcolor: brand.navy, zIndex: 2000 }}>
      <motion.img src={logo} alt="KINGSSS Import Export LLP" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.8 }} style={{ height: 56, width: 'auto' }} />
    </Box>
  )
}
