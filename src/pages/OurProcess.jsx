import { Box, Container, Typography } from '@mui/material'
import { motion } from 'motion/react'
import CheckIcon from '@mui/icons-material/Check'
import { brand } from '../theme/theme'
import { useSite } from '../hooks/useSite'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import PageMeta from '../components/PageMeta'
import Icon from '../components/Icon'


export default function OurProcess() {
  const { processPage, quality } = useSite()
  const { banner, intro, steps } = processPage
  return (
    <>
      <PageMeta title="Our Process" description="The KINGSSS process framework: farm selection, harvesting, sorting and grading, packaging and global delivery." />
      <PageBanner {...banner} crumbs={[{ label: 'Our Process' }]} />

      <Box component="section" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 4, md: 6 } }}>
        <Container>
          <SectionHeading {...intro} align="center" />
          <StepRail steps={steps} />
        </Container>
      </Box>

      <Box component="section" aria-label="Process steps" sx={{ pb: { xs: 6, md: 10 } }}>
        <Container>
          <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: { xs: 8, md: 12 } }}>
            {steps.map((step, i) => <Step key={step.id} step={step} reverse={i % 2 === 1} />)}
          </Box>
        </Container>
      </Box>

      <QualitySection content={quality} />
      <CTASection />
    </>
  )
}

function StepRail({ steps }) {
  return (
    <Box component="nav" aria-label="Jump to step" sx={{ position: 'relative', mt: { xs: 2, md: 4 } }}>
      <Box aria-hidden sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', top: 27, left: '10%', right: '10%', height: '1px', bgcolor: 'rgba(7,29,51,.12)' }}>
        <Box component={motion.div} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
          sx={{ height: '100%', bgcolor: brand.gold, transformOrigin: 'left' }} />
      </Box>
      <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, position: 'relative', display: 'grid', gap: { xs: 1.5, md: 2 },
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' } }}>
        {steps.map((s, i) => (
          <Reveal as="li" key={s.id} delay={i * 0.1} y={16}>
            <Box component="a" href={`#${s.id}`} sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, alignItems: 'center', gap: { xs: 1.5, md: 1.5 },
              textAlign: { md: 'center' }, textDecoration: 'none', color: 'inherit', p: { xs: 1.5, md: 1 }, borderRadius: '4px',
              border: { xs: '1px solid rgba(7,29,51,.08)', md: 0 }, '&:hover .num': { bgcolor: brand.gold, color: brand.navy } }}>
              <Box className="num" sx={{ width: { xs: 46, md: 54 }, height: { xs: 46, md: 54 }, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: brand.navy, color: brand.gold,
                fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', border: '4px solid #fff', boxShadow: '0 0 0 1px rgba(214,173,82,.6)', transition: 'all .3s' }}>
                {s.number}
              </Box>
              <div>
                <Typography component="span" sx={{ display: 'block', fontWeight: 600, color: brand.navy, lineHeight: 1.3 }}>{s.title}</Typography>
                <Typography component="span" variant="body2" sx={{ display: 'block', color: 'text.secondary' }}>{s.short}</Typography>
              </div>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Box>
  )
}

function Step({ step, reverse }) {
  return (
    <Box component="li" id={step.id} sx={{ scrollMarginTop: 100, display: 'grid', gap: { xs: 4, md: 10 }, alignItems: 'center', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
      <Box sx={{ minWidth: 0, order: { md: reverse ? 2 : 0 } }}>
        <Reveal>
          <Box className="zoom-host" sx={{ position: 'relative', aspectRatio: { xs: '4 / 3', md: '5 / 4' }, overflow: 'hidden', borderRadius: '4px' }}>
            <img className="zoom-img" src={step.image} alt={step.imageAlt} loading="lazy" decoding="async" />
            <Box aria-hidden sx={{ position: 'absolute', top: 0, [reverse ? 'right' : 'left']: 0, bgcolor: brand.navy, color: brand.gold, px: 2.5, py: 1.5,
              fontFamily: '"Playfair Display", serif', fontSize: '1.4rem' }}>{step.number}</Box>
          </Box>
        </Reveal>
      </Box>
      <Box sx={{ minWidth: 0, order: { md: 1 } }}>
        <Reveal>
          <Typography aria-hidden sx={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(4rem, 3rem + 4vw, 7rem)', lineHeight: 0.9, color: 'rgba(214,173,82,.22)' }}>
            {step.number}
          </Typography>
          <Typography variant="overline" component="p" sx={{ color: '#A9843A', mt: 1 }}>Step {step.number}</Typography>
          <Typography variant="h2" component="h3" sx={{ mt: 0.5 }}>{step.title}</Typography>
          <Typography sx={{ mt: 2, color: 'text.secondary', maxWidth: 520 }}>{step.text}</Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {step.points.map((pt) => (
              <Box component="li" key={pt} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.75, py: 0.75, fontSize: '0.86rem', color: brand.navy,
                border: '1px solid rgba(214,173,82,.5)', borderRadius: '3px', bgcolor: 'rgba(244,213,138,.12)' }}>
                <CheckIcon sx={{ fontSize: 16, color: '#A9843A' }} aria-hidden /> {pt}
              </Box>
            ))}
          </Box>
        </Reveal>
      </Box>
    </Box>
  )
}

function QualitySection({ content }) {
  return (
    <Box component="section" id="quality" aria-labelledby="quality-title" sx={{ bgcolor: brand.soft, py: { xs: 8, md: 12 }, scrollMarginTop: 80 }}>
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={<span id="quality-title">{content.title}</span>} text={content.text} />
        <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: { xs: 2, md: 0 }, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
          {content.checkpoints.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 0.08}>
              <Box sx={{ height: '100%', p: { xs: 3, md: 3.5 }, bgcolor: '#fff', border: '1px solid rgba(7,29,51,.08)', borderLeft: { md: i ? 0 : '1px solid rgba(7,29,51,.08)' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, color: '#A9843A', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '.14em', textTransform: 'uppercase' }}>
                  <Box component="span" sx={{ width: 26, height: 26, borderRadius: '50%', bgcolor: brand.navy, color: brand.gold, display: 'grid', placeItems: 'center', fontSize: '0.75rem', letterSpacing: 0 }}>{i + 1}</Box>
                  Checkpoint
                </Box>
                <Typography variant="h5" component="h3" sx={{ mt: 1.5 }}>{c.title}</Typography>
                <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary' }}>{c.text}</Typography>
              </Box>
            </Reveal>
          ))}
        </Box>

        <Box sx={{ mt: { xs: 6, md: 8 }, display: 'grid', gap: { xs: 4, md: 6 }, gridTemplateColumns: { xs: '1fr', md: '1.5fr 1fr' }, alignItems: 'start' }}>
          <div>
            <Typography variant="h4" component="h3" sx={{ mb: 3 }}>Our sustainability commitments</Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 2.5 }}>
              {content.sustainability.map((c) => (
                <Box component="li" key={c.id} sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ width: 46, height: 46, flexShrink: 0, borderRadius: '4px', bgcolor: brand.navy, color: brand.gold, display: 'grid', placeItems: 'center' }}><Icon name={c.icon} /></Box>
                  <div>
                    <Typography sx={{ fontWeight: 600, color: brand.navy }}>{c.title}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{c.text}</Typography>
                  </div>
                </Box>
              ))}
            </Box>
          </div>
          <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: brand.navy, color: '#fff', borderRadius: '4px', borderTop: `3px solid ${brand.gold}` }}>
            <Typography variant="h4" component="h3">Certifications & registrations</Typography>
            {content.certifications.length ? (
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 2, display: 'grid', gap: 1.5 }}>
                {content.certifications.map((c) => (
                  <li key={c.id}>
                    <Typography sx={{ fontWeight: 600 }}>{c.name}</Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,.65)' }}>{c.detail}</Typography>
                  </li>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" sx={{ mt: 1.5, color: 'rgba(255,255,255,.7)' }}>
                Certification and registration details will be published here. Documentation can be shared on request with your enquiry.
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
