import { Box, Typography } from '@mui/material'
import { brand } from '../../theme/theme'

// Cities grouped by region. Hovering or focusing a city highlights its dot on the map.
export default function CityList({ regions, activeId, onActivate, onClear }) {
  return (
    <Box sx={{ display: 'grid', gap: 2.5 }} onMouseLeave={onClear}>
      {regions.map((r) => (
        <div key={r.name}>
          <Typography variant="overline" component="h3" sx={{ color: brand.goldLight, display: 'flex', alignItems: 'center', gap: 1, lineHeight: 1.6 }}>
            {r.name} <Box component="span" sx={{ color: 'rgba(255,255,255,.45)', letterSpacing: 0 }}>· {r.cities.length}</Box>
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {r.cities.map((c) => {
              const active = c.id === activeId
              return (
                <li key={c.id}>
                  <Box component="button" type="button" onMouseEnter={() => onActivate(c.id)} onFocus={() => onActivate(c.id)} onBlur={onClear} onClick={() => onActivate(c.id)}
                    sx={{ all: 'unset', boxSizing: 'border-box', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 0.9, px: 1.5, py: 0.8, borderRadius: '20px', fontSize: '0.88rem',
                      color: active ? brand.navy : '#fff', bgcolor: active ? brand.goldLight : 'rgba(255,255,255,.06)', border: '1px solid', borderColor: active ? brand.goldLight : 'rgba(255,255,255,.14)',
                      transition: 'all .2s', '&:focus-visible': { outline: `2px solid ${brand.gold}`, outlineOffset: 2 } }}>
                    <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: c.headOffice ? brand.gold : '#E5484D', boxShadow: '0 0 0 2px rgba(255,255,255,.8)' }} />
                    {c.name}
                    {c.headOffice && <Box component="span" sx={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: active ? brand.navy : brand.goldLight }}>HQ</Box>}
                  </Box>
                </li>
              )
            })}
          </Box>
        </div>
      ))}
    </Box>
  )
}
