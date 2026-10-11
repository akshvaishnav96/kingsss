import { Box, Breadcrumbs, Container, Link, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'
import { motion } from 'motion/react'
import { brand } from '../theme/theme'

// Inner-page hero. `crumbs` = [{ label, to? }]; the last crumb is the current page.
export default function PageBanner({ title, subtitle, image, imageAlt = '', crumbs = [], position = 'center' }) {
  return (
    <Box component="section" sx={{ position: 'relative', overflow: 'hidden', bgcolor: brand.navy, color: '#fff',
      minHeight: { xs: 340, sm: 380, md: 460 }, display: 'flex', alignItems: 'flex-end' }}>
      <motion.img
        src={image}
        alt={imageAlt}
        fetchPriority="high"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: position }}
      />
      <Box aria-hidden sx={{ position: 'absolute', inset: 0,
        background: `linear-gradient(90deg, rgba(7,29,51,.92) 0%, rgba(7,29,51,.65) 45%, rgba(7,29,51,.2) 100%), linear-gradient(0deg, rgba(7,29,51,.7) 0%, transparent 45%)` }} />
      <Container sx={{ position: 'relative', pt: { xs: 14, md: 18 }, pb: { xs: 5, md: 8 } }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
          {crumbs.length > 0 && (
            <Breadcrumbs aria-label="Breadcrumb" sx={{ mb: 2, color: 'rgba(255,255,255,.6)', fontSize: '0.85rem', '& .MuiBreadcrumbs-separator': { color: brand.gold } }}>
              <Link component={RouterLink} to="/" underline="hover" color="inherit">Home</Link>
              {crumbs.map((c, i) =>
                c.to && i < crumbs.length - 1 ? (
                  <Link key={c.label} component={RouterLink} to={c.to} underline="hover" color="inherit">{c.label}</Link>
                ) : (
                  <Typography key={c.label} component="span" sx={{ color: brand.goldLight, fontSize: 'inherit' }} aria-current="page">{c.label}</Typography>
                ),
              )}
            </Breadcrumbs>
          )}
          <Typography variant="h1" sx={{ fontSize: 'clamp(2.4rem, 1.8rem + 3vw, 4.4rem)' }}>{title}</Typography>
          {subtitle && (
            <Typography variant="subtitle1" component="p" sx={{ mt: 1.5, color: 'rgba(255,255,255,.82)', maxWidth: 560 }}>
              {subtitle}
            </Typography>
          )}
          <Box aria-hidden sx={{ mt: 3, width: 64, height: 2, background: `linear-gradient(90deg, ${brand.gold}, transparent)` }} />
        </motion.div>
      </Container>
    </Box>
  )
}
