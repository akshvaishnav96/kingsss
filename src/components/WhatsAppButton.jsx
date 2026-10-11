import { Box } from '@mui/material'
import { contact } from '../data/siteContent'
import Icon from './Icon'

// Floating chat button; shown only when contact.whatsapp is set (digits with country code).
export default function WhatsAppButton() {
  if (!contact.whatsapp) return null
  return (
    <Box component="a" href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello KINGSSS, I would like to enquire about')}`}
      target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"
      sx={{ position: 'fixed', right: { xs: 16, md: 24 }, bottom: { xs: 16, md: 24 }, zIndex: 1050, width: 56, height: 56, borderRadius: '50%',
        display: 'grid', placeItems: 'center', bgcolor: '#25D366', color: '#fff', boxShadow: '0 10px 24px -8px rgba(0,0,0,.45)',
        transition: 'transform .25s', '&:hover': { transform: 'scale(1.08)' } }}>
      <Icon name="whatsapp" sx={{ fontSize: 30 }} />
    </Box>
  )
}
