import { Navigate } from 'react-router'
import { Alert, Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { useLoginForm } from '../../hooks/admin/useLoginForm'
import { useMe } from '../../hooks/admin/useAuth'
import { brand } from '../../theme/theme'
import logo from '../../assets/logo/kingsss-logo.png'

export default function Login() {
  const { user } = useMe()
  const { field, submit, next, isSubmitting, error } = useLoginForm()
  if (user) return <Navigate to={next} replace />

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', bgcolor: brand.navy, p: 2,
      backgroundImage: 'radial-gradient(ellipse at 100% 0%, rgba(214,173,82,.18), transparent 55%)' }}>
      <title>Sign in | KINGSSS Admin</title>
      <meta name="robots" content="noindex" />
      <Box component="form" onSubmit={submit} noValidate sx={{ width: '100%', maxWidth: 400, bgcolor: '#fff', borderRadius: '6px', p: { xs: 3, sm: 4.5 }, borderTop: `3px solid ${brand.gold}` }}>
        <Box sx={{ bgcolor: brand.navy, borderRadius: '4px', p: 1.5, mb: 3, display: 'flex', justifyContent: 'center' }}><img src={logo} alt="KINGSSS" style={{ height: 40 }} /></Box>
        <Typography variant="h4" component="h1">Admin sign in</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, mb: 3 }}>Manage website content and enquiries.</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField label="Email" type="email" autoComplete="username" autoFocus required sx={{ mb: 2 }} {...field('email')} />
        <TextField label="Password" type="password" autoComplete="current-password" required sx={{ mb: 3 }} {...field('password')} />
        <Button type="submit" variant="contained" color="secondary" size="large" fullWidth disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={22} color="inherit" /> : 'Sign in'}
        </Button>
      </Box>
    </Box>
  )
}
