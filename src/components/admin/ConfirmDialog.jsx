import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

export default function ConfirmDialog({ open, title = 'Are you sure?', message, confirmLabel = 'Delete', onClose }) {
  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      {message && <DialogContent><DialogContentText>{message}</DialogContentText></DialogContent>}
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button onClick={() => onClose(true)} color="error" variant="contained">{confirmLabel}</Button>
      </DialogActions>
    </Dialog>
  )
}
