import { Box, Container, Typography } from '@mui/material'
import { brand } from '../theme/theme'
import { useNetwork } from '../hooks/useNetwork'
import PageBanner from '../components/PageBanner'
import SectionHeading from '../components/SectionHeading'
import LinkButton from '../components/LinkButton'
import CTASection from '../components/CTASection'
import PageMeta from '../components/PageMeta'
import Reveal from '../components/Reveal'
import IndiaNetworkMap from '../components/network/IndiaNetworkMap'
import CityList from '../components/network/CityList'

export default function OurNetwork() {
  const { page, points, regions, stats, activeId, active, activate, clear } = useNetwork()
  if (!page) return null

  return (
    <>
      <PageMeta title="Our Network" description={`KINGSSS IMPORT EXPORT LLP sales network across India — ${stats.cities} cities in ${stats.states} states.`} />
      <PageBanner {...page.banner} crumbs={[{ label: 'Our Network' }]} />

      <Box component="section" aria-labelledby="network-title" sx={{ bgcolor: brand.navy, color: '#fff', py: { xs: 8, md: 12 },
        backgroundImage: 'radial-gradient(ellipse at 0% 0%, rgba(214,173,82,.14), transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(11,39,68,1), transparent 60%)' }}>
        <Container>
          <SectionHeading eyebrow={page.intro.eyebrow} title={<span id="network-title">{page.intro.title}</span>} text={page.intro.text} light align="center" />

          <Reveal>
            <Box component="dl" sx={{ m: 0, mb: { xs: 5, md: 7 }, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: 620, mx: 'auto',
              border: '1px solid rgba(214,173,82,.3)', borderRadius: '6px', overflow: 'hidden' }}>
              {[[stats.cities, 'Cities'], [stats.states, 'States & UTs'], [stats.regions, 'Regions']].map(([value, label], i) => (
                <Box key={label} sx={{ py: { xs: 2, md: 2.5 }, textAlign: 'center', borderLeft: i ? '1px solid rgba(214,173,82,.3)' : 0, bgcolor: 'rgba(255,255,255,.03)' }}>
                  <Typography component="dd" sx={{ m: 0, fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.9rem', md: '2.4rem' }, lineHeight: 1.1, color: brand.goldLight }}>{value}{label === 'Cities' ? '+' : ''}</Typography>
                  <Typography component="dt" sx={{ fontSize: '0.72rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)' }}>{label}</Typography>
                </Box>
              ))}
            </Box>
          </Reveal>

          <Box sx={{ display: 'grid', gap: { xs: 6, md: 8 }, alignItems: 'center', gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' } }}>
            <Reveal style={{ minWidth: 0 }}>
              <IndiaNetworkMap points={points} activeId={activeId} active={active} onActivate={activate} onClear={clear} />
            </Reveal>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h4" component="h2" sx={{ mb: 1 }}>Cities we serve</Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,.65)', mb: 3 }}>Hover or tap a city to find it on the map.</Typography>
              <CityList regions={regions} activeId={activeId} onActivate={activate} onClear={clear} />
              {page.note && <Typography sx={{ mt: 4, color: 'rgba(255,255,255,.75)', fontStyle: 'italic', fontFamily: '"Playfair Display", serif' }}>{page.note}</Typography>}
              {page.cta && <LinkButton to={page.cta.to} arrow sx={{ mt: 3 }}>{page.cta.label}</LinkButton>}
            </Box>
          </Box>
        </Container>
      </Box>

      <CTASection />
    </>
  )
}
