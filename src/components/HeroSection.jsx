import { Box, Container, Stack, Typography } from '@mui/material'
import { motion } from 'motion/react'
import { brand } from '../theme/theme'
import LinkButton from './LinkButton'

const ease = [0.2, 0.7, 0.2, 1]
const rise = (delay) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } })

export default function HeroSection({ content }) {
  const { eyebrow, titleLines, subtitle, text, image, imageAlt, video, primaryCta, secondaryCta } = content
  return (
    <Box component="section" aria-labelledby="hero-title"
      sx={{ position: 'relative', overflow: 'hidden', bgcolor: brand.navy, color: '#fff', display: 'flex', alignItems: { xs: 'flex-end', md: 'center' },
        minHeight: { xs: 'max(640px, 100svh)', md: 'max(680px, min(100svh, 920px))' } }}>
      <motion.div initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease }} style={{ position: 'absolute', inset: 0 }}>
        {video ? (
          <video src={video} poster={image} autoPlay muted loop playsInline aria-hidden="true" style={mediaStyle} />
        ) : (
          <Box component="img" src={image} alt={imageAlt} fetchPriority="high"
            sx={{ ...mediaStyle, objectPosition: { xs: '58% 20%', md: '70% 50%' } }} />
        )}
      </motion.div>
      <Box aria-hidden sx={{ position: 'absolute', inset: 0,
        background: {
          xs: 'linear-gradient(180deg, rgba(7,29,51,.6) 0%, rgba(7,29,51,0) 22%, rgba(7,29,51,.1) 42%, rgba(7,29,51,.88) 70%, rgba(7,29,51,.98) 100%)',
          md: 'linear-gradient(90deg, rgba(7,29,51,.96) 0%, rgba(7,29,51,.82) 32%, rgba(7,29,51,.25) 62%, rgba(7,29,51,0) 100%), linear-gradient(0deg, rgba(7,29,51,.5), transparent 30%)',
        } }} />

      <Container sx={{ position: 'relative', pt: { xs: 16, md: 14 }, pb: { xs: 7, md: 12 } }}>
        <Box sx={{ maxWidth: { xs: 560, md: 620 } }}>
          <motion.div {...rise(0.2)}>
            <Typography variant="overline" component="p" sx={{ color: brand.goldLight, mb: { xs: 2, md: 3 }, display: 'flex', alignItems: 'center', gap: 1.5,
              fontSize: { xs: '0.66rem', sm: '0.72rem' }, letterSpacing: { xs: '0.14em', sm: '0.2em' },
              '&::before': { content: '""', width: 32, height: '1px', bgcolor: brand.gold, flexShrink: 0, display: { xs: 'none', sm: 'block' } } }}>
              {eyebrow}
            </Typography>
          </motion.div>
          <Typography id="hero-title" variant="h1">
            {titleLines.map((line, i) => (
              <Box key={line} component={motion.span} {...rise(0.35 + i * 0.15)}
                sx={{ display: 'block', ...(i === 1 && { color: brand.gold,
                  background: `linear-gradient(100deg, ${brand.goldLight} 0%, ${brand.gold} 45%, #C79A3E 100%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }) }}>
                {line}
              </Box>
            ))}
          </Typography>
          <motion.div {...rise(0.7)}>
            <Typography component="p" sx={{ mt: { xs: 2.5, md: 3 }, fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.15rem, 1rem + 0.7vw, 1.6rem)', lineHeight: 1.4 }}>
              {subtitle}
            </Typography>
            <Typography sx={{ mt: 2, color: 'rgba(255,255,255,.78)', maxWidth: 500, fontSize: { md: '1.05rem' }, display: { xs: 'none', sm: 'block' } }}>{text}</Typography>
          </motion.div>
          <motion.div {...rise(0.85)}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: { xs: 4, md: 5 } }}>
              <LinkButton to={primaryCta.to} arrow size="large">{primaryCta.label}</LinkButton>
              <LinkButton to={secondaryCta.to} variant="light" size="large">{secondaryCta.label}</LinkButton>
            </Stack>
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}

const mediaStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
