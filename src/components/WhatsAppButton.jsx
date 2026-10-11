import { useState } from 'react'
import { Avatar, Box, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import { contact } from '../data/siteContent'
import Icon from './Icon'

const GREEN = '#25D366'
const greeting = 'Hello KINGSSS, I would like to enquire about'

export const whatsappContacts = contact.phones.filter((p) => p.whatsapp)
export const whatsappHref = (number) => `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(greeting)}`

// Floating chat button that opens a menu to pick which team member to message.
export default function WhatsAppButton() {
  const [anchor, setAnchor] = useState(null)
  if (!whatsappContacts.length) return null

  return (
    <>
      <Box component="button" type="button" onClick={(e) => setAnchor(e.currentTarget)} aria-label="Chat with us on WhatsApp"
        aria-haspopup="menu" aria-expanded={Boolean(anchor)} aria-controls={anchor ? 'whatsapp-menu' : undefined}
        sx={{ all: 'unset', cursor: 'pointer', position: 'fixed', right: { xs: 16, md: 24 }, bottom: { xs: 16, md: 24 }, zIndex: 1050, width: 56, height: 56, borderRadius: '50%',
          display: 'grid', placeItems: 'center', bgcolor: GREEN, color: '#fff', boxShadow: '0 10px 24px -8px rgba(0,0,0,.45)',
          transition: 'transform .25s', '&:hover': { transform: 'scale(1.08)' }, '&:focus-visible': { outline: '2px solid #D6AD52', outlineOffset: 3 } }}>
        <Icon name="whatsapp" sx={{ fontSize: 30 }} />
      </Box>
      <Menu
        id="whatsapp-menu"
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        slotProps={{ paper: { sx: { mt: -1.5, width: 'min(300px, calc(100vw - 32px))', borderRadius: '6px', overflow: 'hidden' } }, list: { sx: { pt: 0 } } }}
      >
        <Box sx={{ px: 2, py: 1.5, bgcolor: GREEN, color: '#fff', mb: 1 }}>
          <Typography sx={{ fontWeight: 600 }}>Chat on WhatsApp</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.8rem' }}>Choose who you would like to message</Typography>
        </Box>
        {whatsappContacts.map((p) => (
          <MenuItem key={p.id} component="a" href={whatsappHref(p.number)} target="_blank" rel="noopener noreferrer" onClick={() => setAnchor(null)} sx={{ py: 1.25 }}>
            <ListItemAvatar sx={{ minWidth: 48 }}>
              <Avatar sx={{ bgcolor: 'rgba(37,211,102,.14)', color: '#128C7E', width: 36, height: 36 }}><Icon name="whatsapp" fontSize="small" /></Avatar>
            </ListItemAvatar>
            <ListItemText primary={p.name} secondary={p.number}
              slotProps={{ primary: { sx: { fontWeight: 600, color: '#071D33', fontSize: '0.92rem' } }, secondary: { sx: { fontSize: '0.82rem' } } }} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
