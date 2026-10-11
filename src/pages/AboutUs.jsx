import { Box, Container, Typography } from '@mui/material'
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined'
import { brand } from '../theme/theme'
import { about } from '../data/siteContent'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'
import StatsBand from '../components/StatsBand'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import PageMeta from '../components/PageMeta'

export default function AboutUs() {
  const { banner, intro, story, pillars, values, approach } = about
  return (
    <>
      <PageMeta title="About Us" description="Learn about KINGSSS IMPORT EXPORT LLP — our story, vision, mission, values and approach to sourcing quality fresh produce." />
      <PageBanner {...banner} crumbs={[{ label: 'About Us' }]} />

      <Box component="section" sx={{ py: { xs: 9, md: 14 } }}>
        <Container>
          <Split image={intro.image} imageAlt={intro.imageAlt}>
            <SectionHeading eyebrow={intro.eyebrow} title={intro.title} sx={{ mb: 3 }} />
            {intro.paragraphs.map((p) => <Reveal key={p}><Typography sx={{ color: 'text.secondary', mb: 2 }}>{p}</Typography></Reveal>)}
          </Split>
        </Container>
      </Box>

      <StatsBand />

      <Box component="section" sx={{ bgcolor: brand.soft, py: { xs: 9, md: 14 } }}>
        <Container>
          <Split image={story.image} imageAlt={story.imageAlt} reverse>
            <SectionHeading eyebrow={story.eyebrow} title={story.title} sx={{ mb: 3 }} />
            {story.paragraphs.map((p) => <Reveal key={p}><Typography sx={{ color: 'text.secondary', mb: 2 }}>{p}</Typography></Reveal>)}
          </Split>
        </Container>
      </Box>

      <Box component="section" aria-label="Vision, mission and values" sx={{ py: { xs: 9, md: 14 } }}>
        <Container>
          <SectionHeading eyebrow="What guides us" title="Vision, mission & values" align="center" />
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 0.1} style={{ minWidth: 0 }}>
                <Box component="article" className="zoom-host" sx={{ height: '100%', border: '1px solid rgba(7,29,51,.08)', borderRadius: '4px', overflow: 'hidden', bgcolor: '#fff',
                  display: { xs: 'grid', sm: 'grid', md: 'block' }, gridTemplateColumns: { sm: '2fr 3fr' } }}>
                  <Box sx={{ aspectRatio: { xs: '16 / 9', sm: 'auto', md: '16 / 10' }, minHeight: { sm: 200, md: 0 }, overflow: 'hidden' }}>
                    <img className="zoom-img" src={p.image} alt={p.imageAlt} loading="lazy" decoding="async" />
                  </Box>
                  <Box sx={{ p: { xs: 3, md: 3.5 } }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: '50%', display: 'grid', placeItems: 'center', border: `1px solid ${brand.gold}`, color: '#A9843A', mb: 2 }}>
                      <Icon name={p.icon} />
                    </Box>
                    <Typography variant="h4" component="h3">{p.title}</Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>{p.text}</Typography>
                  </Box>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Container>
      </Box>

      <Box component="section" aria-labelledby="values-title" sx={{ bgcolor: brand.navy, color: '#fff', py: { xs: 9, md: 12 },
        backgroundImage: 'radial-gradient(ellipse at 0% 0%, rgba(214,173,82,.14), transparent 50%)' }}>
        <Container>
          <SectionHeading eyebrow="Core values" title={<span id="values-title">The principles behind every shipment</span>} light />
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            borderTop: '1px solid rgba(255,255,255,.12)' }}>
            {values.map((v, i) => (
              <Reveal as="li" key={v.id} delay={i * 0.08}>
                <Box sx={{ py: 4, pr: { sm: 4 }, height: '100%', borderBottom: { xs: '1px solid rgba(255,255,255,.12)', lg: 0 } }}>
                  <Typography sx={{ fontFamily: '"Playfair Display", serif', color: brand.gold, fontSize: '1rem' }}>0{i + 1}</Typography>
                  <Typography variant="h4" component="h3" sx={{ mt: 1 }}>{v.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,.7)' }}>{v.text}</Typography>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 9, md: 14 } }}>
        <Container>
          <Split image={approach.image} imageAlt={approach.imageAlt}>
            <SectionHeading eyebrow={approach.eyebrow} title={approach.title} text={approach.text} sx={{ mb: 3 }} />
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 2 }}>
              {approach.points.map((pt, i) => (
                <Reveal as="li" key={pt} delay={i * 0.06} y={12}>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <CheckCircleOutlined sx={{ color: brand.gold, mt: '3px' }} aria-hidden />
                    <Typography sx={{ color: brand.navy }}>{pt}</Typography>
                  </Box>
                </Reveal>
              ))}
            </Box>
          </Split>
        </Container>
      </Box>

      <CTASection />
    </>
  )
}

// Image + content two-column layout. On mobile the image always comes first.
export function Split({ image, imageAlt, reverse = false, children }) {
  return (
    <Box sx={{ display: 'grid', gap: { xs: 5, md: 10 }, alignItems: 'center', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
      <Box sx={{ minWidth: 0, order: { md: reverse ? 2 : 0 }, position: 'relative', isolation: 'isolate', mr: { xs: 1.5, md: reverse ? 0 : 1.5 }, ml: { md: reverse ? 1.5 : 0 } }}>
        <Reveal>
          <Box className="zoom-host" sx={{ aspectRatio: { xs: '4 / 3', md: '5 / 4' }, overflow: 'hidden', borderRadius: '4px' }}>
            <img className="zoom-img" src={image} alt={imageAlt} loading="lazy" decoding="async" />
          </Box>
        </Reveal>
        <Box aria-hidden sx={{ position: 'absolute', width: '38%', height: '38%', bottom: -14, [reverse ? 'left' : 'right']: -14, zIndex: -1,
          borderBottom: `2px solid ${brand.gold}`, [reverse ? 'borderLeft' : 'borderRight']: `2px solid ${brand.gold}` }} />
      </Box>
      <Box sx={{ minWidth: 0, order: { md: 1 } }}>{children}</Box>
    </Box>
  )
}
