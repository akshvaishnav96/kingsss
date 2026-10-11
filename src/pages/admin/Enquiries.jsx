import { Box, Button, Card, CardContent, Chip, CircularProgress, IconButton, MenuItem, Tab, Tabs, TextField, Tooltip, Typography } from '@mui/material'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import ReplyOutlined from '@mui/icons-material/ReplyOutlined'
import { useEnquiries } from '../../hooks/admin/useEnquiries'
import { useConfirm } from '../../hooks/admin/useConfirm'
import { enquiryStatuses } from '../../config/admin'
import PageHeader from '../../components/admin/PageHeader'
import ConfirmDialog from '../../components/admin/ConfirmDialog'

export default function Enquiries() {
  const { status, setStatus, enquiries, isLoading, setEnquiryStatus, remove } = useEnquiries()
  const { confirm, dialogProps } = useConfirm()

  const onDelete = async (e) => {
    if (await confirm({ title: 'Delete this enquiry?', message: `From ${e.name} (${e.email}). This cannot be undone.` })) remove(e.id)
  }

  return (
    <>
      <PageHeader title="Enquiries" subtitle="Messages sent through the website contact form." />
      <Tabs value={status} onChange={(_, v) => setStatus(v)} variant="scrollable" sx={{ mb: 2 }}>
        <Tab value="all" label="All" />
        {enquiryStatuses.map((s) => <Tab key={s.id} value={s.id} label={s.label} />)}
      </Tabs>

      {isLoading ? <CircularProgress /> : enquiries.length === 0 ? (
        <Typography sx={{ color: 'text.secondary' }}>No enquiries here.</Typography>
      ) : (
        <Box sx={{ display: 'grid', gap: 2 }}>
          {enquiries.map((e) => (
            <Card key={e.id} variant="outlined" sx={{ borderLeft: e.status === 'new' ? '3px solid #D6AD52' : undefined }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="h6" component="h2">{e.subject}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', overflowWrap: 'anywhere' }}>
                      {e.name}{e.company && ` · ${e.company}`} · <a href={`mailto:${e.email}`}>{e.email}</a> · {new Date(e.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField select size="small" value={e.status} onChange={(ev) => setEnquiryStatus(e.id, ev.target.value)} sx={{ minWidth: 130 }} aria-label="Status">
                      {enquiryStatuses.map((s) => <MenuItem key={s.id} value={s.id}><Chip size="small" label={s.label} color={s.color} /></MenuItem>)}
                    </TextField>
                    <Tooltip title="Reply by email">
                      <IconButton component="a" href={`mailto:${e.email}?subject=${encodeURIComponent(`Re: ${e.subject}`)}`} onClick={() => e.status === 'new' && setEnquiryStatus(e.id, 'replied')}><ReplyOutlined /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete"><IconButton color="error" onClick={() => onDelete(e)}><DeleteOutlined /></IconButton></Tooltip>
                  </Box>
                </Box>
                <Typography sx={{ mt: 1.5, whiteSpace: 'pre-wrap' }}>{e.message}</Typography>
                {e.status === 'new' && <Button size="small" sx={{ mt: 1 }} onClick={() => setEnquiryStatus(e.id, 'read')}>Mark as read</Button>}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
      <ConfirmDialog {...dialogProps} />
    </>
  )
}
