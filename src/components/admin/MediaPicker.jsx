import { useRef } from 'react'
import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import CloudUploadOutlined from '@mui/icons-material/CloudUploadOutlined'
import PlayCircleOutlined from '@mui/icons-material/PlayCircleOutlined'
import { useMedia } from '../../hooks/admin/useMedia'
import { brand } from '../../theme/theme'

// Pick an existing file from the media library or upload new ones.
export default function MediaPicker({ open, type = 'image', onSelect, onClose }) {
  const { media, isLoading, upload, isUploading, uploadError } = useMedia()
  const input = useRef(null)
  const files = media.filter((m) => m.type === type)

  const onFiles = async (e) => {
    const list = [...e.target.files]
    e.target.value = ''
    if (!list.length) return
    const stored = await upload(list).catch(() => null)
    if (stored?.length === 1) onSelect(stored[0])
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        Choose {type === 'video' ? 'a video' : 'an image'}
        <Button variant="contained" color="secondary" size="small" startIcon={isUploading ? <CircularProgress size={16} color="inherit" /> : <CloudUploadOutlined />}
          disabled={isUploading} onClick={() => input.current.click()}>
          {isUploading ? 'Uploading…' : 'Upload new'}
        </Button>
        <input ref={input} type="file" hidden multiple accept={type === 'video' ? 'video/mp4,video/webm,video/quicktime' : 'image/*'} onChange={onFiles} />
      </DialogTitle>
      <DialogContent dividers>
        {uploadError && <Alert severity="error" sx={{ mb: 2 }}>{uploadError.message}</Alert>}
        {isLoading ? <CircularProgress /> : files.length === 0 ? (
          <Typography sx={{ color: 'text.secondary' }}>No {type}s yet — upload one to get started.</Typography>
        ) : (
          <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}>
            {files.map((m) => (
              <Box key={m.id} component="button" type="button" onClick={() => onSelect(m)} title={m.filename}
                sx={{ all: 'unset', cursor: 'pointer', position: 'relative', aspectRatio: '1', borderRadius: '4px', overflow: 'hidden', bgcolor: brand.navy,
                  outline: '2px solid transparent', '&:hover, &:focus-visible': { outlineColor: brand.gold } }}>
                {m.type === 'image' || m.thumbUrl ? <img src={m.thumbUrl ?? m.url} alt={m.filename} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
                {m.type === 'video' && <PlayCircleOutlined sx={{ position: 'absolute', inset: 0, m: 'auto', color: '#fff', fontSize: 40 }} />}
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions><Button onClick={onClose}>Close</Button></DialogActions>
    </Dialog>
  )
}
