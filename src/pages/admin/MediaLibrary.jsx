import { useRef } from 'react'
import { Alert, Box, Button, Card, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material'
import CloudUploadOutlined from '@mui/icons-material/CloudUploadOutlined'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import ContentCopy from '@mui/icons-material/ContentCopy'
import PlayCircleOutlined from '@mui/icons-material/PlayCircleOutlined'
import { useMedia } from '../../hooks/admin/useMedia'
import { useConfirm } from '../../hooks/admin/useConfirm'
import PageHeader from '../../components/admin/PageHeader'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import { brand } from '../../theme/theme'

const formatSize = (b) => (b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${Math.round(b / 1e3)} KB`)

export default function MediaLibrary() {
  const { media, isLoading, upload, isUploading, uploadError, remove } = useMedia()
  const { confirm, dialogProps } = useConfirm()
  const input = useRef(null)

  const onDelete = async (m) => {
    if (await confirm({ title: 'Delete this file?', message: 'If it is used on the website, that image or video will stop showing.' })) remove(m.id)
  }
  const onDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files.length) upload([...e.dataTransfer.files])
  }

  return (
    <>
      <PageHeader title="Media library" subtitle="Images are automatically converted to fast-loading WebP. Videos up to 150 MB."
        actions={<Button variant="contained" color="secondary" startIcon={isUploading ? <CircularProgress size={16} color="inherit" /> : <CloudUploadOutlined />} disabled={isUploading} onClick={() => input.current.click()}>{isUploading ? 'Uploading…' : 'Upload'}</Button>} />
      <input ref={input} type="file" hidden multiple accept="image/*,video/mp4,video/webm,video/quicktime" onChange={(e) => { upload([...e.target.files]); e.target.value = '' }} />
      {uploadError && <Alert severity="error" sx={{ mb: 2 }}>{uploadError.message}</Alert>}

      <Box onDragOver={(e) => e.preventDefault()} onDrop={onDrop} sx={{ border: `2px dashed ${brand.gold}`, borderRadius: '6px', p: 2, mb: 3, textAlign: 'center', color: 'text.secondary', bgcolor: '#fff' }}>
        Drag & drop images or videos here to upload
      </Box>

      {isLoading ? <CircularProgress /> : (
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))' }}>
          {media.map((m) => (
            <Card key={m.id} variant="outlined">
              <Box sx={{ position: 'relative', aspectRatio: '1', bgcolor: brand.navy }}>
                {(m.thumbUrl || m.type === 'image') && <img src={m.thumbUrl ?? m.url} alt={m.filename} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                {m.type === 'video' && <PlayCircleOutlined sx={{ position: 'absolute', inset: 0, m: 'auto', color: '#fff', fontSize: 44 }} />}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 1 }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" noWrap title={m.filename}>{m.filename}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{m.type} · {formatSize(m.size)}</Typography>
                </Box>
                <Tooltip title="Copy URL"><IconButton size="small" onClick={() => navigator.clipboard?.writeText(m.url)}><ContentCopy fontSize="small" /></IconButton></Tooltip>
                <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => onDelete(m)}><DeleteOutlined fontSize="small" /></IconButton></Tooltip>
              </Box>
            </Card>
          ))}
        </Box>
      )}
      <ConfirmDialog {...dialogProps} />
    </>
  )
}
