import { Alert, Box, Button, Card, CardContent, CircularProgress, IconButton, TextField, Typography } from '@mui/material'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import { useUsers } from '../../hooks/admin/useUsers'
import { useNewUserForm } from '../../hooks/admin/useNewUserForm'
import { useMe } from '../../hooks/admin/useAuth'
import { useConfirm } from '../../hooks/admin/useConfirm'
import PageHeader from '../../components/admin/PageHeader'
import ConfirmDialog from '../../components/admin/ConfirmDialog'

export default function Users() {
  const { users, isLoading, remove } = useUsers()
  const { user: me } = useMe()
  const form = useNewUserForm()
  const { confirm, dialogProps } = useConfirm()

  const onDelete = async (u) => {
    if (await confirm({ title: 'Remove admin user?', message: `${u.email} will no longer be able to sign in.`, confirmLabel: 'Remove' })) remove(u.id).catch((e) => alert(e.message))
  }

  return (
    <>
      <PageHeader title="Admin users" subtitle="Everyone listed here can sign in and edit the website." />
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' }, alignItems: 'start' }}>
        <Card variant="outlined">
          {isLoading ? <CircularProgress sx={{ m: 2 }} /> : users.map((u, i) => (
            <Box key={u.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderTop: i ? '1px solid rgba(7,29,51,.08)' : 0 }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 600 }} noWrap>{u.name || u.email}{u.id === me?.id && ' (you)'}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>{u.email}</Typography>
              </Box>
              {u.id !== me?.id && <IconButton color="error" onClick={() => onDelete(u)} aria-label={`Remove ${u.email}`}><DeleteOutlined /></IconButton>}
            </Box>
          ))}
        </Card>
        <Card variant="outlined" component="form" onSubmit={form.submit}>
          <CardContent sx={{ display: 'grid', gap: 2 }}>
            <Typography variant="h5" component="h2">Add admin user</Typography>
            {form.error && <Alert severity="error">{form.error}</Alert>}
            <TextField label="Name" size="small" {...form.field('name')} />
            <TextField label="Email" type="email" size="small" required {...form.field('email')} />
            <TextField label="Password (min 8 characters)" type="password" size="small" required autoComplete="new-password" {...form.field('password')} />
            <Button type="submit" variant="contained" color="secondary" disabled={form.isSubmitting}>Add user</Button>
          </CardContent>
        </Card>
      </Box>
      <ConfirmDialog {...dialogProps} />
    </>
  )
}
