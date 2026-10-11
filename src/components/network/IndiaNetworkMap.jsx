import { Box, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import { INDIA_PATH, INDIA_VIEWBOX } from '../../assets/maps/india'
import { brand } from '../../theme/theme'

const RED = '#E5484D'
const [, , VW, VH] = INDIA_VIEWBOX.split(' ').map(Number)

// India map with a dot per city. Hover, focus or tap a dot to see its name; `activeId` is shared with the city list.
export default function IndiaNetworkMap({ points, activeId, active, onActivate, onClear }) {
  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 560, mx: 'auto' }} onMouseLeave={onClear}>
      <svg viewBox={INDIA_VIEWBOX} role="img" aria-label="Map of India showing our sales network cities" style={{ display: 'block', width: '100%', height: 'auto', overflow: 'visible' }}>
        <defs>
          <linearGradient id="india-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#123456" />
            <stop offset="100%" stopColor={brand.navyDark} />
          </linearGradient>
          <radialGradient id="dot-glow">
            <stop offset="0%" stopColor={RED} stopOpacity="0.55" />
            <stop offset="100%" stopColor={RED} stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d={INDIA_PATH} fill="url(#india-fill)" stroke={brand.gold} strokeWidth="2.2" strokeLinejoin="round" onClick={onClear} />

        {points.map((p) => {
          const isActive = p.id === activeId // tap/hover/focus shows the label; tapping empty map area hides it
          const color = p.headOffice ? brand.gold : RED
          return (
            <g key={p.id} transform={`translate(${p.x} ${p.y})`} role="button" tabIndex={0} aria-label={`${p.name}, ${p.state}${p.headOffice ? ' — head office' : ''}`}
              onMouseEnter={() => onActivate(p.id)} onFocus={() => onActivate(p.id)} onBlur={onClear} onClick={() => onActivate(p.id)}
              style={{ cursor: 'pointer', outline: 'none' }}>
              <circle r="26" fill="transparent" />
              <circle r={isActive ? 30 : 20} fill="url(#dot-glow)" style={{ transition: 'r .25s' }} />
              <motion.circle r="9" fill="none" stroke={color} strokeWidth="2.5"
                initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 2.4, opacity: 0 }} transition={{ duration: 2.2, repeat: Infinity, delay: (p.x % 7) * 0.25, ease: 'easeOut' }} />
              <circle r={isActive ? 11 : p.headOffice ? 10 : 8} fill={color} stroke="#fff" strokeWidth="3" style={{ transition: 'r .2s' }} />
            </g>
          )
        })}
      </svg>

      <AnimatePresence>
        {active && (
          <Box component={motion.div} key={active.id} role="status" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
            sx={{ position: 'absolute', left: `${(active.x / VW) * 100}%`, top: `${(active.y / VH) * 100}%`, transform: 'translate(-50%, calc(-100% - 18px))',
              pointerEvents: 'none', whiteSpace: 'nowrap', bgcolor: '#fff', color: brand.navy, borderRadius: '6px', px: 1.5, py: 0.9,
              boxShadow: '0 12px 30px -10px rgba(0,0,0,.45)', borderTop: `3px solid ${active.headOffice ? brand.gold : RED}`,
              '&::after': { content: '""', position: 'absolute', left: '50%', bottom: -6, transform: 'translateX(-50%) rotate(45deg)', width: 12, height: 12, bgcolor: '#fff' } }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', lineHeight: 1.2 }}>{active.name}</Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{active.state}{active.headOffice ? ' · Head Office' : ''}</Typography>
          </Box>
        )}
      </AnimatePresence>

      <Box sx={{ display: 'flex', gap: 2.5, justifyContent: 'center', mt: 2, fontSize: '0.8rem', color: 'rgba(255,255,255,.75)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: brand.gold, border: '2px solid #fff' }} />Head office</Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: RED, border: '2px solid #fff' }} />Sales network</Box>
      </Box>
    </Box>
  )
}
