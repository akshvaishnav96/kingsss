import { Link as RouterLink } from 'react-router'
import { Box, Typography } from '@mui/material'
import PlaceOutlined from '@mui/icons-material/PlaceOutlined'
import MailOutlined from '@mui/icons-material/MailOutlined'
import PhoneOutlined from '@mui/icons-material/PhoneOutlined'
import ScheduleOutlined from '@mui/icons-material/ScheduleOutlined'
import ChecklistOutlined from '@mui/icons-material/ChecklistOutlined'
import { brand } from '../../theme/theme'
import { telHref, whatsappHref } from '../../lib/content'
import SectionHeading from '../SectionHeading'
import Icon from '../Icon'
import InfoCard from './InfoCard'

export default function ContactInfo({ contact, checklist }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <SectionHeading eyebrow="Get in touch" title="Let’s talk fresh produce" text="Whether you are an importer, distributor, retailer or grower, we would be glad to hear about your requirements." sx={{ mb: 4 }} />
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 1.5 }}>
        <InfoCard icon={<PlaceOutlined />} label={contact.addressLabel}>{contact.address}</InfoCard>
        <InfoCard icon={<MailOutlined />} label="Email us"><a href={`mailto:${contact.email}`}>{contact.email}</a></InfoCard>
        <InfoCard icon={<PhoneOutlined />} label="Call / WhatsApp us">
          {contact.phones.map((p) => (
            <Box key={p.id} sx={{ mt: 0.75 }}>
              <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                <Box component="a" href={telHref(p.number)} aria-label={`Call ${p.name} on ${p.number}`}
                  sx={{ fontWeight: 600, color: `${brand.navy} !important`, textDecoration: 'none', '&:hover': { color: '#A9843A !important' } }}>{p.number}</Box>
                {p.whatsapp && (
                  <Box component="a" href={whatsappHref(p.number)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${p.name} on ${p.number}`} title="Chat on WhatsApp"
                    sx={{ display: 'inline-grid', placeItems: 'center', width: 30, height: 30, borderRadius: '50%', bgcolor: '#25D366', color: '#fff !important', transition: 'transform .2s', '&:hover': { transform: 'scale(1.1)' } }}>
                    <Icon name="whatsapp" sx={{ fontSize: 18 }} />
                  </Box>
                )}
              </Box>
              <Box component="span" sx={{ display: 'block', fontSize: '0.8rem', lineHeight: 1.4 }}>{p.name}</Box>
            </Box>
          ))}
        </InfoCard>
        <InfoCard icon={<ScheduleOutlined />} label="Business hours">{contact.hours}</InfoCard>
      </Box>

      <Box sx={{ mt: 3, p: { xs: 2.5, md: 3 }, border: `1px dashed ${brand.gold}`, borderRadius: '4px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <ChecklistOutlined sx={{ color: '#A9843A' }} aria-hidden />
          <Typography variant="h5" component="h2">{checklist.title}</Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>{checklist.text}</Typography>
        <Box component="ul" sx={{ m: 0, mt: 1.5, pl: 2.5, color: brand.navy, fontSize: '0.9rem', columns: { sm: 2, md: 1, lg: 2 }, columnGap: 3, '& li': { mb: 0.5, breakInside: 'avoid' } }}>
          {checklist.items.map((i) => <li key={i}>{i}</li>)}
        </Box>
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          Have a question first? <Box component={RouterLink} to="/services#faq" sx={{ color: '#A9843A', fontWeight: 600 }}>Read our FAQs</Box>
        </Typography>
      </Box>
    </Box>
  )
}
