import { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { brand } from '../theme/theme'
import { faqs } from '../data/services'
import SectionHeading from './SectionHeading'

export default function FAQSection({ items = faqs, id = 'faq' }) {
  const [open, setOpen] = useState(items[0]?.id)
  return (
    <Box component="section" id={id} aria-labelledby={`${id}-title`} sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: 80 }}>
      <Container sx={{ display: 'grid', gap: { xs: 2, md: 8 }, gridTemplateColumns: { xs: '1fr', md: '1fr 1.6fr' }, alignItems: 'start' }}>
        <SectionHeading eyebrow="FAQ" title={<span id={`${id}-title`}>Frequently asked questions</span>}
          text="Answers to common questions from buyers and suppliers. Can’t find yours? Ask us directly." />
        <div>
          {items.map((f) => (
            <Accordion key={f.id} disableGutters elevation={0} expanded={open === f.id} onChange={(_, isOpen) => setOpen(isOpen ? f.id : null)}
              sx={{ bgcolor: 'transparent', borderBottom: '1px solid rgba(7,29,51,.12)', '&::before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<AddIcon sx={{ color: brand.gold }} />} aria-controls={`${f.id}-panel`} id={`${f.id}-header`}
                sx={{ px: 0, minHeight: 64, '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(45deg)' } }}>
                <Typography variant="h5" component="h3" sx={{ pr: 2 }}>{f.q}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pt: 0, pb: 3 }}>
                <Typography sx={{ color: 'text.secondary', maxWidth: 640 }}>{f.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Container>
    </Box>
  )
}
