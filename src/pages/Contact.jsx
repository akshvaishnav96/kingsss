import { Box, Container } from '@mui/material'
import { useSite } from '../hooks/useSite'
import PageBanner from '../components/PageBanner'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import PageMeta from '../components/PageMeta'
import ContactInfo from '../components/contact/ContactInfo'
import EnquiryForm from '../components/contact/EnquiryForm'
import OfficeMap from '../components/contact/OfficeMap'

export default function Contact() {
  const { contact, contactPage, contactCta, enquiryChecklist } = useSite()
  return (
    <>
      <PageMeta title="Contact Us" description="Contact KINGSSS IMPORT EXPORT LLP for product enquiries, partnerships and supply requirements." />
      <PageBanner {...contactPage.banner} crumbs={[{ label: 'Contact' }]} />

      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container sx={{ display: 'grid', gap: { xs: 6, md: 8 }, gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, alignItems: 'start' }}>
          <ContactInfo contact={contact} checklist={enquiryChecklist} />
          <Reveal style={{ minWidth: 0 }}>
            <EnquiryForm intro={contactPage.formIntro} />
          </Reveal>
        </Container>
      </Box>

      <OfficeMap contact={contact} />
      <CTASection content={contactCta} />
    </>
  )
}
