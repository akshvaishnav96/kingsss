import { Box, Container, Typography } from '@mui/material'
import { brand } from '../theme/theme'
import { useSite } from '../hooks/useSite'
import Reveal from './Reveal'

// Hidden until figures are added in Admin → Home page → Stats.
export default function StatsBand() {
  const { stats: items } = useSite()
  if (!items.length) return null
  return (
    <Box component="section" aria-label="Company in numbers" sx={{ bgcolor: brand.soft, py: { xs: 6, md: 8 } }}>
      <Container component="dl" sx={{ m: '0 auto', display: 'grid', gap: 3, gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: `repeat(${Math.min(items.length, 4)}, 1fr)` } }}>
        {items.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.08} style={{ textAlign: 'center' }}>
            <Typography component="dd" sx={{ m: 0, fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.2rem, 1.6rem + 2vw, 3.4rem)', color: brand.navy, lineHeight: 1.1 }}>{s.value}</Typography>
            <Typography component="dt" variant="body2" sx={{ mt: 0.5, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: '0.75rem' }}>{s.label}</Typography>
          </Reveal>
        ))}
      </Container>
    </Box>
  )
}
