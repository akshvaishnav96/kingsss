import { Alert, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { usePasswordForm } from '../../hooks/admin/usePasswordForm'
import { useMe } from '../../hooks/admin/useAuth'
import PageHeader from '../../components/admin/PageHeader'

export default function Account() {
  const { user } = useMe()
  const { field, mismatch, submit, isSubmitting, error, isDone } = usePasswordForm()
  return (
    <>
      <PageHeader title="My account" subtitle={user?.email} />
      <Card variant="outlined" component="form" onSubmit={submit} sx={{ maxWidth: 480 }}>
        <CardContent sx={{ display: 'grid', gap: 2 }}>
          <Typography variant="h5" component="h2">Change password</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {isDone && <Alert severity="success">Password updated.</Alert>}
          <TextField label="Current password" size="small" autoComplete="current-password" required {...field('current')} />
          <TextField label="New password (min 8 characters)" size="small" autoComplete="new-password" required {...field('next')} />
          <TextField label="Confirm new password" size="small" autoComplete="new-password" required error={mismatch} helperText={mismatch ? 'Passwords do not match.' : ' '} {...field('confirm')} />
          <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting || mismatch}>Update password</Button>
        </CardContent>
      </Card>
    </>
  )
}
