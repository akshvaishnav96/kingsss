import { Alert, Box, Button, Card, CardContent, CircularProgress, Collapse, Typography } from '@mui/material'
import { useSettingDraft } from '../../hooks/admin/useSettings'
import { settingLabels } from '../../config/admin'
import ContentEditor from './editor/ContentEditor'

// One editable content block (e.g. "Home page sections") with its own Save / Discard bar.
export default function SettingBlock({ settingKey, value, ctx }) {
  const { draft, setDraft, isDirty, discard, save, isSaving, error } = useSettingDraft(settingKey, value)
  return (
    <Card variant="outlined" sx={{ overflow: 'visible' }}>
      <CardContent>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>{settingLabels[settingKey] ?? settingKey}</Typography>
        <ContentEditor value={draft} onChange={setDraft} ctx={{ ...ctx, rootKey: settingKey }} />
      </CardContent>
      <Collapse in={isDirty || Boolean(error)} unmountOnExit>
        <Box sx={{ position: 'sticky', bottom: 0, display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap', p: 2, bgcolor: '#FFF8E6', borderTop: '1px solid rgba(214,173,82,.5)', borderRadius: '0 0 4px 4px' }}>
          {error ? <Alert severity="error" sx={{ flex: 1, py: 0 }}>{error.message}</Alert> : <Typography variant="body2" sx={{ flex: 1 }}>You have unsaved changes.</Typography>}
          <Button onClick={discard} disabled={isSaving}>Discard</Button>
          <Button variant="contained" color="secondary" onClick={save} disabled={isSaving}>{isSaving ? <CircularProgress size={20} color="inherit" /> : 'Save changes'}</Button>
        </Box>
      </Collapse>
    </Card>
  )
}
