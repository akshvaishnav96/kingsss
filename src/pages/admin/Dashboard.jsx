import { Link as RouterLink } from 'react-router'
import { Box, Button, Card, CardContent, Chip, CircularProgress, Typography } from '@mui/material'
import { useDashboard } from '../../hooks/admin/useDashboard'
import { collections, enquiryStatuses } from '../../config/admin'
import PageHeader from '../../components/admin/PageHeader'
import { brand } from '../../theme/theme'

export default function Dashboard() {
  const { data, isPending } = useDashboard()
  if (isPending) return <CircularProgress />

  const stats = [
    { label: 'New enquiries', value: data.newEnquiries, to: '/admin/enquiries', highlight: data.newEnquiries > 0 },
    { label: 'Total enquiries', value: data.totalEnquiries, to: '/admin/enquiries' },
    ...Object.entries(collections).map(([key, c]) => ({ label: c.label, value: data.collections[key] ?? 0, to: `/admin/collections/${key}` })),
    { label: 'Media files', value: data.media, to: '/admin/media' },
  ]

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview of website content and enquiries." />
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', mb: 4 }}>
        {stats.map((s) => (
          <Card key={s.label} component={RouterLink} to={s.to} variant="outlined" sx={{ textDecoration: 'none', borderColor: s.highlight ? brand.gold : undefined, '&:hover': { borderColor: brand.gold } }}>
            <CardContent>
              <Typography sx={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', lineHeight: 1.1, color: brand.navy }}>{s.value}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>{s.label}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2">Recent enquiries</Typography>
            <Button component={RouterLink} to="/admin/enquiries" size="small">View all</Button>
          </Box>
          {data.recentEnquiries.length === 0 ? <Typography sx={{ color: 'text.secondary' }}>No enquiries yet.</Typography> : data.recentEnquiries.map((e) => {
            const status = enquiryStatuses.find((s) => s.id === e.status)
            return (
              <Box key={e.id} sx={{ display: 'flex', gap: 2, alignItems: 'center', py: 1.5, borderTop: '1px solid rgba(7,29,51,.08)' }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600 }} noWrap>{e.name} · {e.subject}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>{e.email} · {new Date(e.createdAt).toLocaleString()}</Typography>
                </Box>
                <Chip size="small" label={status?.label ?? e.status} color={status?.color} />
              </Box>
            )
          })}
        </CardContent>
      </Card>
    </>
  )
}
