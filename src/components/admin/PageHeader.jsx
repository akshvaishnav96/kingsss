import { Box, Typography } from '@mui/material'

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: 3 }}>
      <div>
        <Typography variant="h3" component="h1">{title}</Typography>
        {subtitle && <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>{subtitle}</Typography>}
      </div>
      {actions && <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>{actions}</Box>}
    </Box>
  )
}
