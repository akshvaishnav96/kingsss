import { Link as RouterLink } from 'react-router'
import { Box, Container, Link, Typography } from '@mui/material'
import PlaceOutlined from '@mui/icons-material/PlaceOutlined'
import MailOutlined from '@mui/icons-material/MailOutlined'
import PhoneOutlined from '@mui/icons-material/PhoneOutlined'
import { mainNav } from '../data/navigation'
import { useSite } from '../hooks/useSite'
import { orderPhones, telHref } from '../lib/content'
import { phoneOrder } from '../config/contactOrder'
import logo from '../assets/logo/kingsss-logo.png'
import { brand } from '../theme/theme'
import Icon from './Icon'

const heading = { fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: brand.goldLight, mb: 2.5 }
const linkSx = { color: 'rgba(255,255,255,.72)', textDecoration: 'none', fontSize: '0.92rem', lineHeight: 2.2, transition: 'color .2s', '&:hover': { color: brand.goldLight } }

export default function Footer() {
  const { products, company, contact, socialLinks } = useSite()
  return (
    <Box component="footer" sx={{ bgcolor: brand.navy, color: 'rgba(255,255,255,.72)', position: 'relative', overflow: 'hidden',
      borderTop: `2px solid ${brand.gold}`, backgroundImage: 'radial-gradient(ellipse at 90% 0%, rgba(11,39,68,1), transparent 60%)' }}>
      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <Box sx={{ display: 'grid', gap: { xs: 5, md: 4 }, gridTemplateColumns: { xs: '1fr 1fr', md: '1.6fr 1fr 1fr 1.3fr' } }}>
          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'auto' }, maxWidth: 360 }}>
            <Box component="img" src={logo} alt="KINGSSS Import Export LLP" loading="lazy" sx={{ height: 54, width: 'auto' }} />
            <Typography variant="body2" sx={{ mt: 2.5 }}>{company.intro}</Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
              {socialLinks.map((s) =>
                s.href ? (
                  <Link key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} sx={socialSx}>
                    <Icon name={s.id} fontSize="small" />
                  </Link>
                ) : (
                  <Box key={s.id} component="span" title={`${s.label} — link to be added`} sx={{ ...socialSx, opacity: 0.55 }}>
                    <Icon name={s.id} fontSize="small" />
                    <Box component="span" className="sr-only">{s.label} (link to be added)</Box>
                  </Box>
                ),
              )}
            </Box>
          </Box>

          <Box component="nav" aria-label="Footer">
            <Typography component="h2" sx={heading}>Quick Links</Typography>
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {mainNav.map((l) => <li key={l.id}><Link component={RouterLink} to={l.to} sx={linkSx}>{l.label}</Link></li>)}
              <li><Link component={RouterLink} to="/about-us#team" sx={linkSx}>Our Team</Link></li>
            </Box>
          </Box>

          <div>
            <Typography component="h2" sx={heading}>Our Products</Typography>
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {products.slice(0, 6).map((p) => <li key={p.id}><Link component={RouterLink} to={`/products/${p.slug}`} sx={linkSx}>{p.name}</Link></li>)}
            </Box>
          </div>

          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'auto' } }}>
            <Typography component="h2" sx={heading}>Contact Us</Typography>
            <Box component="address" sx={{ fontStyle: 'normal', display: 'grid', gap: 1.75 }}>
              <ContactRow icon={<PlaceOutlined />}><strong style={{ color: '#fff', fontWeight: 600 }}>{contact.addressLabel}</strong><br />{contact.address}</ContactRow>
              <ContactRow icon={<MailOutlined />}>
                <Link href={`mailto:${contact.email}`} sx={linkSx}>{contact.email}</Link>
              </ContactRow>
              <ContactRow icon={<PhoneOutlined />}>
                {orderPhones(contact.phones, phoneOrder.footer).map((p) => (
                  <Box key={p.id} sx={{ lineHeight: 1.5, mb: 0.75 }}>
                    <Link href={telHref(p.number)} sx={{ ...linkSx, lineHeight: 1.5 }}>{p.number}</Link>
                    <Box component="span" sx={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,.5)' }}>{p.name}</Box>
                  </Box>
                ))}
              </ContactRow>
            </Box>
          </Box>
        </Box>
      </Container>
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <Container sx={{ py: 3, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between', fontSize: '0.82rem', color: 'rgba(255,255,255,.5)' }}>
          <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
          <span>{company.tagline}</span>
        </Container>
      </Box>
    </Box>
  )
}

function ContactRow({ icon, children }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', fontSize: '0.92rem', '& > svg': { color: brand.gold, fontSize: 20, mt: '2px', flexShrink: 0 } }}>
      {icon}
      <Box sx={{ minWidth: 0, overflowWrap: 'anywhere' }}>{children}</Box>
    </Box>
  )
}

const socialSx = { width: 40, height: 40, display: 'inline-grid', placeItems: 'center', borderRadius: '50%', border: '1px solid rgba(214,173,82,.35)', color: brand.goldLight,
  transition: 'background-color .25s, color .25s', '&:hover': { bgcolor: brand.gold, color: brand.navy } }
