import { Box, Container, Stack, Typography } from '@mui/material'
import { brand } from '../theme/theme'
import LinkButton from '../components/LinkButton'
import PageMeta from '../components/PageMeta'

export default function NotFound() {
  return (
    <>
      <PageMeta title="Page not found" />
      <Box component="section" sx={{ bgcolor: brand.navy, color: '#fff', minHeight: '78vh', display: 'flex', alignItems: 'center', pt: 14, pb: 10,
        backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(214,173,82,.18), transparent 50%)' }}>
        <Container sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(5rem, 3rem + 10vw, 10rem)', lineHeight: 1, color: brand.gold }}>404</Typography>
          <Typography variant="h2" component="h1" sx={{ mt: 2 }}>This page could not be found</Typography>
          <Typography sx={{ mt: 2, color: 'rgba(255,255,255,.72)', maxWidth: 520, mx: 'auto' }}>
            The page you are looking for may have moved or no longer exists.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 5, justifyContent: 'center' }}>
            <LinkButton to="/" size="large">Back to Home</LinkButton>
            <LinkButton to="/products" variant="light" size="large">View Products</LinkButton>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
