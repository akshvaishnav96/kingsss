import { Box, Button, TextField } from '@mui/material'
import ImageOutlined from '@mui/icons-material/ImageOutlined'
import MovieOutlined from '@mui/icons-material/MovieOutlined'
import { useDisclosure } from '../../../hooks/useDisclosure'
import { brand } from '../../../theme/theme'
import MediaPicker from '../MediaPicker'

export default function MediaField({ label, value, type, onChange, onPick }) {
  const picker = useDisclosure()
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Box sx={{ width: 72, height: 72, flexShrink: 0, borderRadius: '4px', overflow: 'hidden', bgcolor: brand.soft, display: 'grid', placeItems: 'center', border: '1px solid rgba(7,29,51,.12)' }}>
        {value && type === 'image' ? <img src={value} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : type === 'video' ? <MovieOutlined sx={{ color: value ? brand.navy : 'text.disabled' }} /> : <ImageOutlined sx={{ color: 'text.disabled' }} />}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <TextField label={label} value={value ?? ''} onChange={(e) => onChange(e.target.value)} size="small" fullWidth />
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Button size="small" variant="outlined" onClick={picker.open}>Choose {type}</Button>
          {value && <Button size="small" color="inherit" onClick={() => onChange('')}>Clear</Button>}
        </Box>
      </Box>
      <MediaPicker open={picker.isOpen} type={type} onClose={picker.close} onSelect={(m) => { (onPick ?? ((x) => onChange(x.url)))(m); picker.close() }} />
    </Box>
  )
}
