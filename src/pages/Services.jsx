import { Box, Container, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { brand } from '../theme/theme'
import { useSite } from '../hooks/useSite'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import DualCTA from '../components/DualCTA'
import FAQSection from '../components/FAQSection'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import PageMeta from '../components/PageMeta'

export default function Services() {
  const { servicesPage, services, audiences, engagementSteps } = useSite()
  return (
    <>
      <PageMeta title="Services" description="Sourcing, quality inspection, packing and private labelling, cold chain, export documentation and freight coordination for fresh produce." />
      <PageBanner {...servicesPage.banner} crumbs={[{ label: 'Services' }]} />

      <Box component="section" aria-label="Services" sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionHeading {...servicesPage.intro} align="center" />
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: { xs: 2.5, md: 3 }, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' } }}>
            {services.map((s, i) => (
              <Reveal as="li" key={s.id} delay={(i % 3) * 0.08} style={{ minWidth: 0 }}>
                <Box component="article" id={s.id} className="zoom-host" sx={{ scrollMarginTop: 100, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fff',
                  border: '1px solid rgba(7,29,51,.08)', borderRadius: '4px', overflow: 'hidden', transition: 'box-shadow .35s, border-color .35s',
                  '&:hover': { boxShadow: '0 24px 48px -28px rgba(7,29,51,.35)', borderColor: 'rgba(214,173,82,.5)' } }}>
                  <Box sx={{ aspectRatio: '16 / 9', overflow: 'hidden' }}>
                    <img className="zoom-img" src={s.image} alt={s.imageAlt} loading="lazy" decoding="async" />
                  </Box>
                  <Box sx={{ position: 'relative', p: { xs: 3, md: 3.5 }, pt: { xs: 5, md: 5 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ position: 'absolute', left: 20, top: -26, width: 52, height: 52, borderRadius: '4px', bgcolor: brand.navy, color: brand.gold,
                      display: 'grid', placeItems: 'center', boxShadow: '0 8px 20px -8px rgba(7,29,51,.6)', border: '2px solid #fff' }}>
                      <Icon name={s.icon} />
                    </Box>
                    <Typography variant="h4" component="h3">{s.title}</Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>{s.text}</Typography>
                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 2.5, pt: 2.5, borderTop: '1px solid rgba(7,29,51,.08)', display: 'grid', gap: 1 }}>
                      {s.points.map((pt) => (
                        <Box component="li" key={pt} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', fontSize: '0.88rem', color: brand.navy }}>
                          <CheckIcon sx={{ fontSize: 17, color: '#A9843A', mt: '3px' }} aria-hidden /> {pt}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Container>
      </Box>

      <Box component="section" aria-labelledby="audiences-title" sx={{ bgcolor: brand.navy, color: '#fff', py: { xs: 8, md: 12 },
        backgroundImage: 'radial-gradient(ellipse at 100% 0%, rgba(214,173,82,.16), transparent 55%)' }}>
        <Container>
          <SectionHeading eyebrow={audiences.eyebrow} title={<span id="audiences-title">{audiences.title}</span>} light />
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: '1px', bgcolor: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.1)',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
            {audiences.items.map((a, i) => (
              <Reveal as="li" key={a.id} delay={(i % 3) * 0.08} style={{ background: '#071D33' }}>
                <Box sx={{ p: { xs: 3, md: 4 }, height: '100%', transition: 'background-color .3s', '&:hover': { bgcolor: brand.navyDark } }}>
                  <Box sx={{ color: brand.gold, mb: 2, '& svg': { fontSize: 32 } }}><Icon name={a.icon} /></Box>
                  <Typography variant="h5" component="h3">{a.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 0.75, color: 'rgba(255,255,255,.68)' }}>{a.text}</Typography>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Container>
      </Box>

      <Box component="section" aria-labelledby="engage-title" sx={{ py: { xs: 8, md: 12 }, bgcolor: brand.soft }}>
        <Container>
          <SectionHeading eyebrow={engagementSteps.eyebrow} title={<span id="engage-title">{engagementSteps.title}</span>} align="center" />
          <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: { xs: 2, md: 3 }, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
            {engagementSteps.items.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 0.1}>
                <Box sx={{ position: 'relative', height: '100%', bgcolor: '#fff', p: { xs: 3, md: 3.5 }, borderRadius: '4px', border: '1px solid rgba(7,29,51,.08)', borderTop: `3px solid ${brand.gold}` }}>
                  <Typography aria-hidden sx={{ fontFamily: '"Playfair Display", serif', fontSize: '2.6rem', lineHeight: 1, color: 'rgba(214,173,82,.45)' }}>0{i + 1}</Typography>
                  <Typography variant="h5" component="h3" sx={{ mt: 1.5 }}>{s.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>{s.text}</Typography>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Container>
      </Box>

      <FAQSection />
      <DualCTA />
    </>
  )
}
