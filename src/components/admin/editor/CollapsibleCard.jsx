import { useState } from 'react'
import { Box, Collapse, Typography } from '@mui/material'
import ExpandMore from '@mui/icons-material/ExpandMore'

export default function CollapsibleCard({ title, index, actions, children }) {
  const [open, setOpen] = useState(false)
  return (
    <Box sx={{ border: '1px solid rgba(7,29,51,.12)', borderRadius: '4px', bgcolor: '#fff', minWidth: 0 }}>
      <Box role="button" tabIndex={0} aria-expanded={open} onClick={() => setOpen((o) => !o)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setOpen((o) => !o))}
        sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.75, cursor: 'pointer', '&:hover': { bgcolor: 'rgba(7,29,51,.03)' } }}>
        <ExpandMore fontSize="small" sx={{ transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none', color: 'text.secondary' }} />
        <Typography variant="body2" sx={{ fontWeight: 600, flex: 1, minWidth: 0 }} noWrap>{index + 1}. {title}</Typography>
        {actions}
      </Box>
      <Collapse in={open} unmountOnExit>
        <Box sx={{ p: 2, pt: 1 }}>{children}</Box>
      </Collapse>
    </Box>
  )
}
