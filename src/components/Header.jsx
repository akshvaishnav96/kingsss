import { NavLink, Link as RouterLink } from 'react-router'
import { Box, Container, Drawer, IconButton, Stack } from '@mui/material'
import { motion } from 'motion/react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { mainNav, enquireLink } from '../data/navigation'
import { useSite } from '../hooks/useSite'
import { useHeaderState } from '../hooks/useHeaderState'
import { telHref } from '../lib/content'
import logo from '../assets/logo/kingsss-logo.png'
import { brand } from '../theme/theme'
import LinkButton from './LinkButton'
import SearchDialog from './SearchDialog'

const desktop = '@media (min-width: 1200px)'

export default function Header() {
  const { contact } = useSite()
  const { scrolled, drawer, search, isActive } = useHeaderState()

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100, color: '#fff',
        transition: 'background-color .4s, box-shadow .4s, backdrop-filter .4s',
        bgcolor: scrolled ? 'rgba(7,29,51,.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 10px 30px -18px rgba(0,0,0,.6)' : 'none',
        borderBottom: '1px solid', borderColor: scrolled ? 'rgba(214,173,82,.18)' : 'transparent',
        '&::before': { content: '""', position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none', transition: 'opacity .4s',
          opacity: scrolled ? 0 : 1, background: 'linear-gradient(180deg, rgba(7,29,51,.78) 0%, rgba(7,29,51,0) 100%)' },
      }}
    >
      <Container sx={{ display: 'flex', alignItems: 'center', gap: 2, height: { xs: 68, md: scrolled ? 72 : 88 }, transition: 'height .35s' }}>
        <Box component={RouterLink} to="/" aria-label="KINGSSS Import Export LLP — home" sx={{ display: 'flex', flexShrink: 0, mr: 'auto' }}>
          <Box component="img" src={logo} alt="KINGSSS Import Export LLP" sx={{ height: { xs: 38, sm: 44, md: scrolled ? 44 : 52 }, width: 'auto', transition: 'height .35s' }} />
        </Box>

        <Box component="nav" aria-label="Main" sx={{ display: 'none', [desktop]: { display: 'block' } }}>
          <Stack component="ul" direction="row" sx={{ listStyle: 'none', m: 0, p: 0, gap: 0.25, '@media (min-width: 1280px)': { gap: 1.5 } }}>
            {mainNav.map((item) => {
              const active = isActive(item.to)
              return (
                <li key={item.id}>
                  <Box
                    component={NavLink}
                    to={item.to}
                    aria-current={active ? 'page' : undefined}
                    sx={{ position: 'relative', display: 'block', px: 1, py: 1, fontSize: '0.92rem', '@media (min-width: 1280px)': { px: 1.25 }, fontWeight: 500, whiteSpace: 'nowrap',
                      textDecoration: 'none', color: active ? brand.goldLight : 'rgba(255,255,255,.88)', transition: 'color .25s',
                      '&:hover': { color: brand.goldLight },
                      '&::after': { content: '""', position: 'absolute', left: 10, right: 10, bottom: 2, height: '1px', bgcolor: brand.gold,
                        transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform .3s' },
                      '&:hover::after': { transform: active ? 'scaleX(0)' : 'scaleX(1)' } }}
                  >
                    {item.label}
                    {active && (
                      <Box component={motion.span} layoutId="nav-underline" transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        sx={{ position: 'absolute', left: 10, right: 10, bottom: 1, height: 2, bgcolor: brand.gold, borderRadius: 1 }} />
                    )}
                  </Box>
                </li>
              )
            })}
          </Stack>
        </Box>

        <IconButton aria-label="Search products" onClick={search.open} sx={{ color: '#fff', width: 44, height: 44, '&:hover': { color: brand.goldLight } }}>
          <SearchIcon />
        </IconButton>
        <LinkButton to={enquireLink.to} size="small" sx={{ display: 'none', [desktop]: { display: 'inline-flex' }, minHeight: 44, px: 3 }}>
          {enquireLink.label}
        </LinkButton>
        <IconButton aria-label="Open menu" aria-controls="mobile-menu" aria-expanded={drawer.isOpen} onClick={drawer.open}
          sx={{ color: '#fff', width: 44, height: 44, mr: -1, [desktop]: { display: 'none' } }}>
          <MenuIcon />
        </IconButton>
      </Container>

      <Drawer
        id="mobile-menu"
        anchor="right"
        open={drawer.isOpen}
        onClose={drawer.close}
        sx={{ [desktop]: { display: 'none' } }}
        slotProps={{ paper: { sx: { width: 'min(88vw, 380px)', bgcolor: brand.navy, color: '#fff', backgroundImage: 'radial-gradient(ellipse at 100% 0%, rgba(214,173,82,.16), transparent 60%)' } } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, height: 68, borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          <Box component="img" src={logo} alt="KINGSSS Import Export LLP" sx={{ height: 36, width: 'auto' }} />
          <IconButton aria-label="Close menu" onClick={drawer.close} sx={{ color: '#fff', width: 44, height: 44 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box component="nav" aria-label="Mobile" sx={{ px: 2.5, py: 3, flex: 1 }}>
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {mainNav.map((item, i) => (
              <motion.li key={item.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}>
                <Box component={NavLink} to={item.to} aria-current={isActive(item.to) ? 'page' : undefined}
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.75, textDecoration: 'none',
                    fontFamily: '"Playfair Display", serif', fontSize: '1.45rem', borderBottom: '1px solid rgba(255,255,255,.07)',
                    color: isActive(item.to) ? brand.goldLight : '#fff' }}>
                  {item.label}
                  {isActive(item.to) && <Box component="span" aria-hidden sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: brand.gold }} />}
                </Box>
              </motion.li>
            ))}
          </Box>
          <LinkButton to={enquireLink.to} fullWidth size="large" arrow sx={{ mt: 4 }}>{enquireLink.label}</LinkButton>
        </Box>
        <Box sx={{ px: 2.5, py: 3, borderTop: '1px solid rgba(255,255,255,.08)' }}>
          <Box component="a" href={`mailto:${contact.email}`} sx={{ display: 'block', color: brand.goldLight, fontSize: '0.88rem', mb: 1.5, overflowWrap: 'anywhere' }}>{contact.email}</Box>
          {contact.phones.map((p) => (
            <Box key={p.id} component="a" href={telHref(p.number)}
              sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, py: 0.5, color: 'rgba(255,255,255,.75)', textDecoration: 'none', fontSize: '0.86rem', '&:hover': { color: brand.goldLight } }}>
              <span>{p.name}</span><span>{p.number}</span>
            </Box>
          ))}
        </Box>
      </Drawer>

      <SearchDialog open={search.isOpen} onClose={search.close} />
    </Box>
  )
}

