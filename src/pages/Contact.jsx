import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { Alert, Box, Button, Container, MenuItem, TextField, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import PlaceOutlined from '@mui/icons-material/PlaceOutlined'
import MailOutlined from '@mui/icons-material/MailOutlined'
import PhoneOutlined from '@mui/icons-material/PhoneOutlined'
import ScheduleOutlined from '@mui/icons-material/ScheduleOutlined'
import SendOutlined from '@mui/icons-material/SendOutlined'
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined'
import { brand } from '../theme/theme'
import { contact, contactPage, contactCta } from '../data/siteContent'
import { enquiryChecklist } from '../data/services'
import { Link as RouterLink } from 'react-router'
import ChecklistOutlined from '@mui/icons-material/ChecklistOutlined'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import PageMeta from '../components/PageMeta'

export const telHref = (number) => `tel:${number.replace(/[^\d+]/g, '')}`

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.'
  if (!emailPattern.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.subject.trim()) errors.subject = 'Please choose or enter a subject.'
  if (values.message.trim().length < 10) errors.message = 'Please enter a message of at least 10 characters.'
  return errors
}

export default function Contact() {
  const [params] = useSearchParams()
  const initialSubject = params.get('subject') ?? ''
  const [values, setValues] = useState({ name: '', email: '', company: '', subject: initialSubject, message: '' })
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const errors = validate(values)
  const subjects = contactPage.subjects.includes(initialSubject) || !initialSubject ? contactPage.subjects : [initialSubject, ...contactPage.subjects]

  const field = (name) => ({
    name,
    value: values[name],
    onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
    error: Boolean(touched[name] && errors[name]),
    helperText: touched[name] && errors[name] ? errors[name] : ' ',
    fullWidth: true,
  })

  const onSubmit = (e) => {
    e.preventDefault()
    if (Object.keys(errors).length) {
      setTouched({ name: true, email: true, subject: true, message: true })
      e.currentTarget.querySelector(`[name="${Object.keys(errors)[0]}"]`)?.focus()
      return
    }
    setSubmitted(true)
  }

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(`${values.message}\n\n${values.name}${values.company ? `, ${values.company}` : ''}\n${values.email}`)}`

  return (
    <>
      <PageMeta title="Contact Us" description="Contact KINGSSS IMPORT EXPORT LLP for product enquiries, partnerships and supply requirements." />
      <PageBanner {...contactPage.banner} crumbs={[{ label: 'Contact' }]} />

      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container sx={{ display: 'grid', gap: { xs: 6, md: 8 }, gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, alignItems: 'start' }}>
          <Box sx={{ minWidth: 0 }}>
            <SectionHeading eyebrow="Get in touch" title="Let’s talk fresh produce" text="Whether you are an importer, distributor, retailer or grower, we would be glad to hear about your requirements." sx={{ mb: 4 }} />
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 1.5 }}>
              <InfoCard icon={<PlaceOutlined />} label={contact.addressLabel}>{contact.address}</InfoCard>
              <InfoCard icon={<MailOutlined />} label="Email us"><a href={`mailto:${contact.email}`}>{contact.email}</a></InfoCard>
              <InfoCard icon={<PhoneOutlined />} label="Call us">
                {contact.phones.map((p) => (
                  <Box component="span" key={p.id} sx={{ display: 'block', mt: 0.75 }}>
                    <Box component="a" href={telHref(p.number)} sx={{ fontWeight: 600, color: `${brand.navy} !important`, textDecoration: 'none', '&:hover': { color: '#A9843A !important' } }}>{p.number}</Box>
                    <Box component="span" sx={{ display: 'block', fontSize: '0.8rem', lineHeight: 1.4 }}>{p.name}</Box>
                  </Box>
                ))}
              </InfoCard>
              <InfoCard icon={<ScheduleOutlined />} label="Business hours">{contact.hours}</InfoCard>
            </Box>
            <Box sx={{ mt: 3, p: { xs: 2.5, md: 3 }, border: `1px dashed ${brand.gold}`, borderRadius: '4px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <ChecklistOutlined sx={{ color: '#A9843A' }} aria-hidden />
                <Typography variant="h5" component="h2">{enquiryChecklist.title}</Typography>
              </Box>
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>{enquiryChecklist.text}</Typography>
              <Box component="ul" sx={{ m: 0, mt: 1.5, pl: 2.5, color: brand.navy, fontSize: '0.9rem', columns: { sm: 2, md: 1, lg: 2 }, columnGap: 3, '& li': { mb: 0.5, breakInside: 'avoid' } }}>
                {enquiryChecklist.items.map((i) => <li key={i}>{i}</li>)}
              </Box>
              <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                Have a question first? <Box component={RouterLink} to="/services#faq" sx={{ color: '#A9843A', fontWeight: 600 }}>Read our FAQs</Box>
              </Typography>
            </Box>
          </Box>

          <Reveal style={{ minWidth: 0 }}>
            <Box sx={{ bgcolor: '#fff', border: '1px solid rgba(7,29,51,.1)', borderTop: `3px solid ${brand.gold}`, borderRadius: '4px', p: { xs: 2.5, sm: 4, md: 5 }, boxShadow: '0 30px 60px -40px rgba(7,29,51,.4)' }}>
              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
                    <CheckCircleOutlined sx={{ fontSize: 48, color: brand.gold }} aria-hidden />
                    <Typography variant="h3" component="h2" sx={{ mt: 1.5 }}>Thank you, {values.name.trim().split(' ')[0]}</Typography>
                    <Alert severity="info" sx={{ mt: 3 }}>
                      This website is a frontend preview. Your enquiry has been validated but <strong>has not been sent</strong> — online submission will be enabled when the website backend is connected.
                    </Alert>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
                      <Button href={mailto} variant="contained" color="secondary" startIcon={<MailOutlined />}>Send via email instead</Button>
                      <Button variant="outlined" onClick={() => { setSubmitted(false); setTouched({}); setValues({ name: '', email: '', company: '', subject: '', message: '' }) }}>
                        Start a new enquiry
                      </Button>
                    </Box>
                  </motion.div>
                ) : (
                  <motion.form key="form" noValidate onSubmit={onSubmit} aria-labelledby="form-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Typography variant="overline" component="p" sx={{ color: '#A9843A' }}>{contactPage.formIntro.eyebrow}</Typography>
                    <Typography id="form-title" variant="h3" component="h2" sx={{ mt: 0.5 }}>{contactPage.formIntro.title}</Typography>
                    <Typography variant="body2" sx={{ mt: 1, mb: 3.5, color: 'text.secondary' }}>{contactPage.formIntro.text}</Typography>
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
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, justifyContent: 'space-between', gap: 2, mt: 2 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>Fields marked * are required.</Typography>
                      <Button type="submit" variant="contained" color="secondary" size="large" endIcon={<SendOutlined />}>Send Message</Button>
                    </Box>
                  </motion.form>
                )}
              </AnimatePresence>
            </Box>
          </Reveal>
        </Container>
      </Box>

      <Box component="section" aria-labelledby="map-title" sx={{ pb: { xs: 2, md: 4 } }}>
        <Container>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: 2.5 }}>
            <div>
              <Typography id="map-title" variant="h4" component="h2">{contact.addressLabel}</Typography>
              <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>{contact.address}</Typography>
            </div>
            <Button href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`} target="_blank" rel="noopener noreferrer"
              variant="outlined" startIcon={<PlaceOutlined />} sx={{ borderColor: 'rgba(7,29,51,.3)' }}>
              Open in Google Maps
            </Button>
          </Box>
          <Box sx={{ overflow: 'hidden', borderRadius: '4px', border: '1px solid rgba(7,29,51,.1)', borderTop: `3px solid ${brand.gold}`, aspectRatio: { xs: '4 / 3', sm: '16 / 8', md: '21 / 8' }, bgcolor: brand.soft }}>
            <iframe
              title={`Map showing ${contact.addressLabel}: ${contact.address}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, width: '100%', height: '100%', display: 'block' }}
            />
          </Box>
        </Container>
      </Box>

      <CTASection content={contactCta} />
    </>
  )
}

function InfoCard({ icon, label, children }) {
  return (
    <Box component="li" sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 2.25, border: '1px solid rgba(7,29,51,.08)', borderRadius: '4px', bgcolor: brand.soft }}>
      <Box sx={{ width: 48, height: 48, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: brand.navy, color: brand.gold }} aria-hidden>{icon}</Box>
      <Box sx={{ minWidth: 0, overflowWrap: 'anywhere' }}>
        <Typography sx={{ fontWeight: 600, color: brand.navy, lineHeight: 1.4 }}>{label}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', '& a': { color: 'inherit' } }}>{children}</Typography>
      </Box>
    </Box>
  )
}
