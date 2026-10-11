import { Box, Container, Stack, Typography } from '@mui/material'
import { brand } from '../theme/theme'
import { home } from '../data/siteContent'
import LinkButton from './LinkButton'
import Reveal from './Reveal'

export default function CTASection({ content = home.cta }) {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff' }}>
      <Container>
        <Reveal>
          <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: brand.navy, color: '#fff', borderRadius: '4px',
            px: { xs: 3, sm: 6, md: 10 }, py: { xs: 6, md: 9 },
            backgroundImage: `radial-gradient(ellipse at 100% 0%, rgba(214,173,82,.22), transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(11,39,68,1), transparent 60%)` }}>
            <Box aria-hidden sx={{ position: 'absolute', inset: { xs: 10, md: 14 }, border: '1px solid rgba(214,173,82,.28)', borderRadius: '2px', pointerEvents: 'none' }} />
            <Box sx={{ position: 'relative', display: 'grid', gap: 4, alignItems: 'center', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' } }}>
              <div>
                <Typography variant="overline" component="p" sx={{ color: brand.goldLight, mb: 1.5 }}>{content.eyebrow}</Typography>
                <Typography variant="h2">{content.title}</Typography>
                <Typography sx={{ mt: 2, color: 'rgba(255,255,255,.78)', maxWidth: 560 }}>{content.text}</Typography>
              </div>
              <Stack direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'row' }} spacing={2} sx={{ justifyContent: { md: 'flex-end' }, alignItems: { xs: 'stretch', sm: 'flex-start', md: 'flex-end', lg: 'center' } }}>
                <LinkButton to={content.primary.to} arrow size="large">{content.primary.label}</LinkButton>
                {content.secondary && <LinkButton to={content.secondary.to} variant="light" size="large">{content.secondary.label}</LinkButton>}
              </Stack>
            </Box>
          </Box>
        </Reveal>
      </Container>
    </Box>
  )
}
