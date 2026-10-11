import { Box, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'
import { motion } from 'motion/react'
import ArrowForward from '@mui/icons-material/ArrowForward'
import { brand } from '../theme/theme'

export default function ProductCard({ product, headingLevel = 'h3' }) {
  return (
    <Box
      component={motion.article}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      sx={{ height: '100%', bgcolor: '#fff', border: '1px solid rgba(7,29,51,.08)', borderRadius: '4px', overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(7,29,51,.04)', transition: 'box-shadow .35s, border-color .35s',
        '&:hover, &:focus-within': { boxShadow: '0 22px 44px -24px rgba(7,29,51,.35)', borderColor: 'rgba(214,173,82,.55)' } }}
    >
      <Box
        component={RouterLink}
        to={`/products/${product.slug}`}
        className="zoom-host"
        sx={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', color: 'inherit',
          '&:focus-visible': { outlineOffset: -3 } }}
      >
        <Box sx={{ aspectRatio: '4 / 3', overflow: 'hidden', bgcolor: brand.soft }}>
          <img className="zoom-img" src={product.image} alt={product.imageAlt} loading="lazy" decoding="async" />
        </Box>
        <Box sx={{ p: { xs: 2.25, md: 2.5 }, display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography variant="h5" component={headingLevel} sx={{ color: brand.navy }}>{product.name}</Typography>
          <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary', flex: 1 }}>{product.shortDescription}</Typography>
          <Box component="span" sx={{ mt: 2, display: 'inline-flex', alignItems: 'center', gap: 0.75, color: '#A9843A', fontWeight: 600, fontSize: '0.875rem',
            '& svg': { fontSize: 16, transition: 'transform .25s' }, '.zoom-host:hover & svg': { transform: 'translateX(4px)' } }}>
            View Details <ArrowForward />
            <Box component="span" className="sr-only">about {product.name}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
