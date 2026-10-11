import { Alert, Box, Button, CircularProgress, MenuItem, TextField, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import SendOutlined from '@mui/icons-material/SendOutlined'
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined'
import { brand } from '../../theme/theme'
import { useContactForm } from '../../hooks/useContactForm'

export default function EnquiryForm({ intro }) {
  const { field, honeypot, subjects, submit, reset, isSubmitting, isSent, submitError, firstName } = useContactForm()

  return (
    <Box sx={{ bgcolor: '#fff', border: '1px solid rgba(7,29,51,.1)', borderTop: `3px solid ${brand.gold}`, borderRadius: '4px', p: { xs: 2.5, sm: 4, md: 5 }, boxShadow: '0 30px 60px -40px rgba(7,29,51,.4)' }}>
      <AnimatePresence mode="wait" initial={false}>
        {isSent ? (
          <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
            <CheckCircleOutlined sx={{ fontSize: 48, color: brand.gold }} aria-hidden />
            <Typography variant="h3" component="h2" sx={{ mt: 1.5 }}>Thank you, {firstName}</Typography>
            <Typography sx={{ mt: 2, color: 'text.secondary' }}>Your enquiry has been received. Our team will review your requirements and get back to you soon.</Typography>
            <Button variant="outlined" onClick={reset} sx={{ mt: 4 }}>Send another enquiry</Button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={submit} aria-labelledby="form-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Typography variant="overline" component="p" sx={{ color: '#A9843A' }}>{intro.eyebrow}</Typography>
            <Typography id="form-title" variant="h3" component="h2" sx={{ mt: 0.5 }}>{intro.title}</Typography>
            <Typography variant="body2" sx={{ mt: 1, mb: 3.5, color: 'text.secondary' }}>{intro.text}</Typography>
            {/* Honeypot: hidden from people, filled in by bots */}
            <input {...honeypot} type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" />
            <Box sx={{ display: 'grid', columnGap: 2.5, rowGap: 0.5, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
              <TextField label="Full name" required autoComplete="name" {...field('name')} />
              <TextField label="Email address" required type="email" autoComplete="email" {...field('email')} />
              <TextField label="Company" autoComplete="organization" {...field('company')} helperText="Optional" />
              <TextField label="Subject" required select {...field('subject')}>
                {subjects.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
              <TextField label="Message" required multiline minRows={5} {...field('message')} sx={{ gridColumn: '1 / -1' }}
                placeholder="Products, destination market, volumes, packing requirements…" />
            </Box>
            {submitError && <Alert severity="error" sx={{ mt: 2 }}>{submitError}</Alert>}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, justifyContent: 'space-between', gap: 2, mt: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>Fields marked * are required.</Typography>
              <Button type="submit" variant="contained" color="secondary" size="large" disabled={isSubmitting}
                endIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : <SendOutlined />}>
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </Button>
            </Box>
          </motion.form>
        )}
      </AnimatePresence>
    </Box>
  )
}
