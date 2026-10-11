import { Box, Button, Container, Typography } from '@mui/material'
import PlaceOutlined from '@mui/icons-material/PlaceOutlined'
import { brand } from '../../theme/theme'

export default function OfficeMap({ contact }) {
  const query = encodeURIComponent(contact.mapQuery || contact.address)
  return (
    <Box component="section" aria-labelledby="map-title" sx={{ pb: { xs: 2, md: 4 } }}>
      <Container>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: 2.5 }}>
          <div>
            <Typography id="map-title" variant="h4" component="h2">{contact.addressLabel}</Typography>
            <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>{contact.address}</Typography>
          </div>
          <Button href={`https://www.google.com/maps/search/?api=1&query=${query}`} target="_blank" rel="noopener noreferrer"
            variant="outlined" startIcon={<PlaceOutlined />} sx={{ borderColor: 'rgba(7,29,51,.3)' }}>
            Open in Google Maps
          </Button>
        </Box>
        <Box sx={{ overflow: 'hidden', borderRadius: '4px', border: '1px solid rgba(7,29,51,.1)', borderTop: `3px solid ${brand.gold}`, aspectRatio: { xs: '4 / 3', sm: '16 / 8', md: '21 / 8' }, bgcolor: brand.soft }}>
          <iframe title={`Map showing ${contact.addressLabel}: ${contact.address}`} src={`https://www.google.com/maps?q=${query}&z=16&output=embed`}
            loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: 0, width: '100%', height: '100%', display: 'block' }} />
        </Box>
      </Container>
    </Box>
  )
}
