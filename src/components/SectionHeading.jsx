import { Box, Typography } from '@mui/material'
import { brand } from '../theme/theme'
import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, text, align = 'left', light = false, as = 'h2', action, sx }) {
  const centered = align === 'center'
  return (
    <Reveal>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: action ? 'row' : 'column' },
          alignItems: { xs: centered ? 'center' : 'flex-start', md: action ? 'flex-end' : centered ? 'center' : 'flex-start' },
          justifyContent: 'space-between',
          gap: 2,
          textAlign: centered ? 'center' : 'left',
          mb: { xs: 4, md: 6 },
          ...sx,
        }}
      >
        <Box sx={{ maxWidth: centered ? 720 : 680 }}>
          {eyebrow && (
            <Typography
              variant="overline"
              component="p"
              sx={{ color: light ? brand.goldLight : '#A9843A', display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5,
                '&::before': { content: '""', width: 28, height: '1px', bgcolor: 'currentColor' } }}
            >
              {eyebrow}
            </Typography>
          )}
          <Typography variant="h2" component={as} sx={{ color: light ? '#fff' : brand.navy }}>
            {title}
          </Typography>
          {text && (
            <Typography sx={{ mt: 2, color: light ? 'rgba(255,255,255,.78)' : 'text.secondary', fontSize: { md: '1.05rem' } }}>
              {text}
            </Typography>
          )}
        </Box>
        {action}
      </Box>
    </Reveal>
  )
}
