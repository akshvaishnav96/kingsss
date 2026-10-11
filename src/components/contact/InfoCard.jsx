import { Box, Typography } from '@mui/material'
import { brand } from '../../theme/theme'

export default function InfoCard({ icon, label, children }) {
  return (
    <Box component="li" sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 2.25, border: '1px solid rgba(7,29,51,.08)', borderRadius: '4px', bgcolor: brand.soft }}>
      <Box sx={{ width: 48, height: 48, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: brand.navy, color: brand.gold }} aria-hidden>{icon}</Box>
      <Box sx={{ minWidth: 0, overflowWrap: 'anywhere' }}>
        <Typography sx={{ fontWeight: 600, color: brand.navy, lineHeight: 1.4 }}>{label}</Typography>
        <Typography variant="body2" component="div" sx={{ color: 'text.secondary', '& a': { color: 'inherit' } }}>{children}</Typography>
      </Box>
    </Box>
  )
}
