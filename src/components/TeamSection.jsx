import { Box, Button, Container, Typography } from '@mui/material'
import PhoneOutlined from '@mui/icons-material/PhoneOutlined'
import { brand } from '../theme/theme'
import { directors, mentor, teamSection } from '../data/team'
import { contact } from '../data/siteContent'
import { whatsappHref } from './WhatsAppButton'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import Icon from './Icon'

const phoneFor = (id) => contact.phones.find((p) => p.id === id)
const telHref = (number) => `tel:${number.replace(/[^\d+]/g, '')}`

export default function TeamSection() {
  return (
    <Box component="section" id="team" aria-labelledby="team-title" sx={{ scrollMarginTop: 72 }}>
      <Box sx={{ bgcolor: brand.navy, color: '#fff', pt: { xs: 9, md: 12 }, pb: { xs: 16, md: 20 },
        backgroundImage: 'radial-gradient(ellipse at 0% 0%, rgba(214,173,82,.16), transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(11,39,68,1), transparent 60%)' }}>
        <Container>
          <SectionHeading eyebrow={teamSection.eyebrow} title={<span id="team-title">{teamSection.title}</span>} text={teamSection.text} light align="center" sx={{ mb: 0 }} />
        </Container>
      </Box>

      <Container sx={{ mt: { xs: -10, md: -13 }, pb: { xs: 9, md: 12 }, position: 'relative' }}>
        <Typography variant="h3" component="h3" className="sr-only">Directors</Typography>
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: { xs: 3, md: 3.5 }, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
          {directors.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.1} style={{ minWidth: 0 }}>
              <PartnerCard person={p} />
            </Reveal>
          ))}
        </Box>
        <MentorCard person={mentor} />
      </Container>
    </Box>
  )
}

// Deliberately understated: present, but not more prominent than the directors.
function MentorCard({ person }) {
  return (
    <Reveal>
      <Box component="aside" aria-label={person.role} sx={{ mt: { xs: 5, md: 7 }, mx: 'auto', maxWidth: 760, display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 3 },
        p: { xs: 2.5, sm: 3 }, bgcolor: brand.soft, borderRadius: '4px', border: '1px solid rgba(7,29,51,.08)', borderLeft: `3px solid ${brand.gold}` }}>
        <Box component="img" src={person.image} alt={person.imageAlt} loading="lazy" decoding="async"
          sx={{ width: { xs: 64, sm: 80 }, height: { xs: 64, sm: 80 }, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 20%', flexShrink: 0, border: '2px solid #fff', boxShadow: '0 0 0 1px rgba(214,173,82,.6)' }} />
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="overline" component="p" sx={{ color: '#A9843A', lineHeight: 1.4, fontSize: '0.66rem' }}>{person.role}</Typography>
          <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, color: brand.navy, fontSize: '1.05rem' }}>{person.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>{person.text}</Typography>
        </Box>
      </Box>
    </Reveal>
  )
}

function PartnerCard({ person }) {
  const phone = phoneFor(person.phoneId)
  return (
    <Box component="article" className="zoom-host" sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fff', borderRadius: '4px', overflow: 'hidden',
      border: '1px solid rgba(7,29,51,.08)', boxShadow: '0 30px 60px -36px rgba(7,29,51,.45)', transition: 'transform .35s, box-shadow .35s',
      '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 40px 70px -36px rgba(7,29,51,.55)' } }}>
      <Box sx={{ position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden', bgcolor: brand.soft }}>
        <img className="zoom-img" src={person.image} alt={person.imageAlt} loading="lazy" decoding="async" style={{ objectPosition: 'center 20%' }} />
        <Box aria-hidden sx={{ position: 'absolute', inset: 'auto 0 0 0', height: 4, background: `linear-gradient(90deg, ${brand.gold}, ${brand.goldLight}, ${brand.gold})` }} />
      </Box>
      <Box sx={{ p: { xs: 3, md: 3.5 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="overline" component="p" sx={{ color: '#A9843A', lineHeight: 1.4 }}>{person.role}</Typography>
        <Typography variant="h4" component="h4" sx={{ mt: 0.5 }}>{person.name}</Typography>
        <Typography variant="body2" sx={{ mt: 1.25, color: 'text.secondary', flex: 1 }}>{person.bio}</Typography>
        {phone && (
          <Box sx={{ display: 'flex', gap: 1, mt: 3, pt: 2.5, borderTop: '1px solid rgba(7,29,51,.08)', flexWrap: 'wrap' }}>
            <Button href={telHref(phone.number)} size="small" variant="outlined" startIcon={<PhoneOutlined />} aria-label={`Call ${person.name} on ${phone.number}`}
              sx={{ flex: 1, minWidth: 120, borderColor: 'rgba(7,29,51,.2)', color: brand.navy }}>
              Call
            </Button>
            {phone.whatsapp && (
              <Button href={whatsappHref(phone.number)} target="_blank" rel="noopener noreferrer" size="small" variant="contained" startIcon={<Icon name="whatsapp" />}
                aria-label={`WhatsApp ${person.name} on ${phone.number}`} sx={{ flex: 1, minWidth: 120, bgcolor: '#25D366', color: '#fff', '&:hover': { bgcolor: '#1EBE5A' } }}>
                WhatsApp
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}
