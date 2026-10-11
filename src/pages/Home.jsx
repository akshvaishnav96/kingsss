import { Box, Container, Typography } from '@mui/material'
import { Link as LinkBox } from 'react-router'
import { brand } from '../theme/theme'
import { home } from '../data/siteContent'
import { products } from '../data/products'
import HeroSection from '../components/HeroSection'
import SectionHeading from '../components/SectionHeading'
import ProductGrid from '../components/ProductGrid'
import DualCTA from '../components/DualCTA'
import StatsBand from '../components/StatsBand'
import { services } from '../data/services'
import LinkButton from '../components/LinkButton'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import PageMeta from '../components/PageMeta'

export default function Home() {
  const featured = products.filter((p) => p.featured)
  return (
    <>
      <PageMeta description="KINGSSS IMPORT EXPORT LLP sources and exports quality fresh fruits and produce, connecting trusted growers with global markets." />
      <HeroSection content={home.hero} />
      <TrustBar items={home.highlights} />
      <StatsBand />

      <Box component="section" aria-labelledby="featured-title" sx={{ py: { xs: 9, md: 14 } }}>
        <Container>
          <SectionHeading {...home.featured} title={<span id="featured-title">{home.featured.title}</span>}
            action={<LinkButton to="/products" variant="outline" arrow>View All Products</LinkButton>} />
          <ProductGrid products={featured} columns={{ xs: 'repeat(auto-fill, minmax(min(100%, 165px), 1fr))', md: 'repeat(3, 1fr)' }} />
        </Container>
      </Box>

      <GlobalTrade content={home.globalTrade} />
      <Capabilities content={home.capabilities} />
      <WhyChooseUs content={home.whyChooseUs} />
      <ServicesTeaser />
      <DualCTA />
    </>
  )
}

function TrustBar({ items }) {
  return (
    <Box component="section" aria-label="Why partners choose us" sx={{ bgcolor: brand.navy, color: '#fff', borderTop: '1px solid rgba(214,173,82,.2)' }}>
      <Container>
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
          {items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.08} y={16}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: { xs: 2.5, md: 4 }, px: { md: 3 },
                borderTop: { xs: i ? '1px solid rgba(255,255,255,.08)' : 0, sm: i > 1 ? '1px solid rgba(255,255,255,.08)' : 0, md: 0 },
                borderLeft: { md: i ? '1px solid rgba(255,255,255,.1)' : 0 }, pl: { md: i ? 3 : 0 } }}>
                <Box sx={{ width: 52, height: 52, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', border: `1px solid ${brand.gold}`, color: brand.gold }}>
                  <Icon name={item.icon} />
                </Box>
                <div>
                  <Typography component="h3" sx={{ fontWeight: 600, fontSize: '0.98rem', lineHeight: 1.35 }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,.62)' }}>{item.text}</Typography>
                </div>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

function GlobalTrade({ content }) {
  return (
    <Box component="section" aria-labelledby="trade-title" sx={{ position: 'relative', overflow: 'hidden', bgcolor: brand.navy, color: '#fff',
      minHeight: { xs: 560, md: 640 }, display: 'flex', alignItems: { xs: 'flex-end', md: 'center' }, pb: { md: 12 } }}>
      <Box component="img" className="zoom-img" src={content.image} alt={content.imageAlt} loading="lazy" decoding="async"
        sx={{ position: 'absolute', inset: 0, objectPosition: { xs: '65% center', md: 'center' } }} />
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, background: {
        xs: 'linear-gradient(180deg, rgba(7,29,51,.15) 0%, rgba(7,29,51,.85) 55%, rgba(7,29,51,.97) 100%)',
        md: 'linear-gradient(90deg, rgba(7,29,51,.94) 0%, rgba(7,29,51,.7) 38%, rgba(7,29,51,.1) 70%)' } }} />
      <Container sx={{ position: 'relative', py: { xs: 7, md: 10 } }}>
        <Box sx={{ maxWidth: 560 }}>
          <SectionHeading eyebrow={content.eyebrow} title={<span id="trade-title">{content.title}</span>} text={content.text} light sx={{ mb: 4 }} />
          <Reveal delay={0.1}><LinkButton to={content.cta.to} arrow size="large">{content.cta.label}</LinkButton></Reveal>
        </Box>
      </Container>
    </Box>
  )
}

function Capabilities({ content }) {
  return (
    <Box component="section" aria-labelledby="capabilities-title" sx={{ position: 'relative', pt: { xs: 9, md: 0 }, pb: { xs: 9, md: 14 } }}>
      <Container>
        <Typography id="capabilities-title" variant="h2" sx={{ mb: 4, '@media (min-width: 900px)': { position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', m: 0 } }}>
          {content.title}
        </Typography>
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: { md: -14 }, position: 'relative', display: 'grid', gap: { xs: 2.5, md: 3 }, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
          {content.items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.1} style={{ minWidth: 0 }}>
              <Box className="zoom-host" component="article" sx={{ height: '100%', bgcolor: '#fff', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(7,29,51,.08)',
                boxShadow: '0 30px 60px -36px rgba(7,29,51,.45)' }}>
                <Box sx={{ aspectRatio: { xs: '16 / 10', sm: '21 / 9', md: '16 / 10' }, overflow: 'hidden' }}>
                  <img className="zoom-img" src={item.image} alt={item.imageAlt} loading="lazy" decoding="async" />
                </Box>
                <Box sx={{ p: { xs: 3, md: 3.5 }, position: 'relative' }}>
                  <Typography component="span" aria-hidden sx={{ position: 'absolute', top: -26, right: 24, width: 52, height: 52, borderRadius: '50%', bgcolor: brand.navy, color: brand.gold,
                    display: 'grid', placeItems: 'center', fontFamily: '"Playfair Display", serif', fontSize: '1.05rem', border: `2px solid #fff` }}>
                    0{i + 1}
                  </Typography>
                  <Typography variant="h4" component="h3">{item.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>{item.text}</Typography>
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

function WhyChooseUs({ content }) {
  return (
    <Box component="section" aria-labelledby="why-title" sx={{ bgcolor: brand.soft, py: { xs: 9, md: 14 }, overflow: 'hidden' }}>
      <Container sx={{ display: 'grid', gap: { xs: 6, md: 10 }, alignItems: 'center', gridTemplateColumns: { xs: '1fr', md: '5fr 6fr' } }}>
        <Reveal style={{ minWidth: 0 }}>
          <Box sx={{ position: 'relative', mr: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 } }}>
            <Box aria-hidden sx={{ position: 'absolute', inset: 0, transform: { xs: 'translate(16px, 16px)', sm: 'translate(28px, 28px)' }, border: `1px solid ${brand.gold}`, borderRadius: '4px' }} />
            <Box sx={{ position: 'relative', aspectRatio: { xs: '4 / 3', md: '4 / 5' }, overflow: 'hidden', borderRadius: '4px' }} className="zoom-host">
              <img className="zoom-img" src={content.image} alt={content.imageAlt} loading="lazy" decoding="async" />
            </Box>
          </Box>
        </Reveal>
        <div>
          <SectionHeading eyebrow={content.eyebrow} title={<span id="why-title">{content.title}</span>} text={content.text} />
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: { xs: 3, sm: 4 }, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }}>
            {content.items.map((item, i) => (
              <Reveal as="li" key={item.id} delay={i * 0.08} y={18}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ width: 48, height: 48, flexShrink: 0, borderRadius: '4px', display: 'grid', placeItems: 'center', bgcolor: brand.navy, color: brand.gold }}>
                    <Icon name={item.icon} />
                  </Box>
                  <div>
                    <Typography variant="h5" component="h3">{item.title}</Typography>
                    <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>{item.text}</Typography>
                  </div>
                </Box>
              </Reveal>
            ))}
          </Box>
        </div>
      </Container>
    </Box>
  )
}

function ServicesTeaser() {
  return (
    <Box component="section" aria-labelledby="services-title" sx={{ pt: { xs: 9, md: 14 } }}>
      <Container>
        <SectionHeading eyebrow="Our services" title={<span id="services-title">Everything a fresh produce shipment needs</span>}
          text="From sourcing to the destination port, we coordinate each step so you deal with one accountable partner."
          action={<LinkButton to="/services" variant="outline" arrow>All Services</LinkButton>} />
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', borderTop: '1px solid rgba(7,29,51,.1)', borderLeft: { sm: '1px solid rgba(7,29,51,.1)' },
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 3) * 0.08}>
              <Box component={LinkBox} to={`/services#${s.id}`}
                sx={{ display: 'flex', gap: 2.5, height: '100%', p: { xs: 3, md: 4 }, textDecoration: 'none', color: 'inherit', borderBottom: '1px solid rgba(7,29,51,.1)',
                  borderRight: { sm: '1px solid rgba(7,29,51,.1)' }, transition: 'background-color .3s', '&:hover': { bgcolor: brand.soft }, '&:hover .ico': { bgcolor: brand.gold, color: brand.navy } }}>
                <Box className="ico" sx={{ width: 52, height: 52, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', border: `1px solid ${brand.gold}`, color: '#A9843A', transition: 'all .3s' }}>
                  <Icon name={s.icon} />
                </Box>
                <div>
                  <Typography variant="h5" component="h3">{s.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary' }}>{s.points.join(' · ')}</Typography>
                </div>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
