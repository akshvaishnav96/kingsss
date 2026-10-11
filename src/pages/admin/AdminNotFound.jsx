import { Link as RouterLink } from 'react-router'
import { Button, Typography } from '@mui/material'

export default function AdminNotFound() {
  return (
    <>
      <Typography variant="h3" component="h1">Page not found</Typography>
      <Button component={RouterLink} to="/admin" sx={{ mt: 2 }}>Back to dashboard</Button>
    </>
  )
}
