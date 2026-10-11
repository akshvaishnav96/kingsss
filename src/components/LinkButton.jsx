import { Button } from '@mui/material'
import { Link as RouterLink } from 'react-router'
import ArrowForward from '@mui/icons-material/ArrowForward'

// Router-aware button. variant="gold" = primary brand CTA, "light" = outlined on dark backgrounds.
export default function LinkButton({ to, variant = 'gold', arrow = false, children, sx, ...props }) {
  const styles = {
    gold: { variant: 'contained', color: 'secondary' },
    navy: { variant: 'contained', color: 'primary' },
    light: { variant: 'outlined', sx: { color: '#fff', borderColor: 'rgba(255,255,255,.55)', '&:hover': { borderColor: '#F4D58A', color: '#F4D58A', bgcolor: 'rgba(255,255,255,.04)' } } },
    outline: { variant: 'outlined', color: 'primary', sx: { borderColor: 'rgba(7,29,51,.3)', '&:hover': { borderColor: '#071D33', bgcolor: 'rgba(7,29,51,.03)' } } },
  }[variant]
  return (
    <Button
      component={RouterLink}
      to={to}
      variant={styles.variant}
      color={styles.color}
      endIcon={arrow ? <ArrowForward sx={{ transition: 'transform .25s' }} /> : undefined}
      sx={{ ...styles.sx, '&:hover .MuiButton-endIcon svg': { transform: 'translateX(3px)' }, ...sx }}
      {...props}
    >
      {children}
    </Button>
  )
}
