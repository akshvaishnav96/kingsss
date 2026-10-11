import { Chip, Stack } from '@mui/material'
import { brand } from '../theme/theme'

// Toggle-style category filter used on Products and Gallery.
export default function FilterChips({ options, value, onChange, label, sx }) {
  return (
    <Stack role="group" aria-label={label} direction="row" sx={{ flexWrap: 'wrap', gap: 1, ...sx }}>
      {options.map((o) => {
        const active = o.id === value
        return (
          <Chip key={o.id} label={o.label} clickable aria-pressed={active} onClick={() => onChange(o.id)}
            sx={{ height: 40, px: 0.75, fontSize: '0.88rem', border: '1px solid', transition: 'all .25s',
              bgcolor: active ? brand.navy : '#fff', color: active ? '#fff' : brand.navy, borderColor: active ? brand.navy : 'rgba(7,29,51,.16)',
              '&:hover': { bgcolor: active ? brand.navyDark : brand.soft } }} />
        )
      })}
    </Stack>
  )
}
