import { Box, Container, Typography } from '@mui/material'
import { brand } from '../theme/theme'
import { dualCta } from '../data/services'
import LinkButton from './LinkButton'
import Reveal from './Reveal'

// Two audience panels: buyers and suppliers, each with its own enquiry route.
export default function DualCTA({ content = dualCta }) {
  return (
    <Box component="section" aria-label="Work with us" sx={{ py: { xs: 8, md: 12 } }}>
      <Container sx={{ display: 'grid', gap: { xs: 2.5, md: 3 }, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        {[content.buyers, content.suppliers].map((panel, i) => (
          <Reveal key={panel.title} delay={i * 0.1} style={{ minWidth: 0 }}>
            <Box className="zoom-host" sx={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', color: '#fff', bgcolor: brand.navy,
              minHeight: { xs: 380, md: 440 }, display: 'flex', alignItems: 'flex-end', height: '100%' }}>
              <Box component="img" className="zoom-img" src={panel.image} alt={panel.imageAlt} loading="lazy" decoding="async" sx={{ position: 'absolute', inset: 0 }} />
              <Box aria-hidden sx={{ position: 'absolute', inset: 0, background: i
                ? 'linear-gradient(180deg, rgba(7,29,51,.2) 0%, rgba(7,29,51,.92) 70%)'
                : 'linear-gradient(180deg, rgba(11,39,68,.2) 0%, rgba(4,18,31,.94) 70%)' }} />
              <Box aria-hidden sx={{ position: 'absolute', inset: 12, border: '1px solid rgba(214,173,82,.3)', borderRadius: '2px', pointerEvents: 'none' }} />
              <Box sx={{ position: 'relative', p: { xs: 3.5, sm: 5 } }}>
                <Typography variant="overline" component="p" sx={{ color: brand.goldLight }}>{panel.eyebrow}</Typography>
                <Typography variant="h3" component="h2" sx={{ mt: 0.5 }}>{panel.title}</Typography>
                <Typography sx={{ mt: 1.5, mb: 3, color: 'rgba(255,255,255,.8)', maxWidth: 440 }}>{panel.text}</Typography>
                <LinkButton to={panel.cta.to} variant={i ? 'light' : 'gold'} arrow>{panel.cta.label}</LinkButton>
              </Box>
            </Box>
          </Reveal>
        ))}
      </Container>
    </Box>
  )
}
