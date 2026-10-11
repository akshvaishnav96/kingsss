import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Switch, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ContentEditor from './editor/ContentEditor'

export default function ItemEditorDialog({ editor, meta, ctx }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { editing } = editor
  return (
    <Dialog open={Boolean(editing)} onClose={editor.close} maxWidth="md" fullWidth fullScreen={fullScreen} scroll="paper">
      <DialogTitle>{editing?.id ? `Edit ${meta.singular}` : `New ${meta.singular}`}</DialogTitle>
      <DialogContent dividers>
        {editing && (
          <Box sx={{ display: 'grid', gap: 2 }}>
            <FormControlLabel control={<Switch checked={editing.published} onChange={(e) => editor.setPublished(e.target.checked)} />} label="Published (visible on website)" />
            <ContentEditor value={editing.data} onChange={editor.setData} ctx={ctx} />
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ gap: 1, flexWrap: 'wrap' }}>
        {editor.error && <Alert severity="error" sx={{ flex: 1, py: 0 }}>{editor.error}</Alert>}
        <Button onClick={editor.close}>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={editor.submit} disabled={editor.isSaving}>
          {editor.isSaving ? <CircularProgress size={20} color="inherit" /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
