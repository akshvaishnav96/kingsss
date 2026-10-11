import { useParams, Link as RouterLink } from 'react-router'
import { Box, Breadcrumbs, Container, Link, Stack, Typography } from '@mui/material'
import { motion } from 'motion/react'
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined'
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import { brand } from '../theme/theme'
import { useProductDetails } from '../hooks/useProductDetails'
import SectionHeading from '../components/SectionHeading'
import ProductGrid from '../components/ProductGrid'
import LinkButton from '../components/LinkButton'
import Reveal from '../components/Reveal'
import PageMeta from '../components/PageMeta'
import NotFound from './NotFound'

export default function ProductDetails() {
  const { slug } = useParams()
  const { product, category, related, enquireTo } = useProductDetails(slug)
  if (!product) return <NotFound />

  return (
    <>
      <PageMeta title={product.name} description={product.shortDescription} />

      <Box component="section" sx={{ bgcolor: brand.navy, color: '#fff', pt: { xs: 12, md: 16 }, pb: { xs: 7, md: 10 },
        backgroundImage: 'radial-gradient(ellipse at 100% 0%, rgba(214,173,82,.16), transparent 50%)' }}>
        <Container>
          <Breadcrumbs aria-label="Breadcrumb" sx={{ mb: { xs: 3, md: 5 }, color: 'rgba(255,255,255,.6)', fontSize: '0.85rem', '& .MuiBreadcrumbs-separator': { color: brand.gold } }}>
            <Link component={RouterLink} to="/" underline="hover" color="inherit">Home</Link>
            <Link component={RouterLink} to="/products" underline="hover" color="inherit">Products</Link>
            <Typography component="span" aria-current="page" sx={{ color: brand.goldLight, fontSize: 'inherit' }}>{product.name}</Typography>
          </Breadcrumbs>

          <Box sx={{ display: 'grid', gap: { xs: 4, md: 8 }, alignItems: 'center', gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' } }}>
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} style={{ minWidth: 0 }}>
              <Box sx={{ aspectRatio: '4 / 3', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(214,173,82,.3)' }}>
                <Box component="img" src={product.image} alt={product.imageAlt} fetchPriority="high" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} style={{ minWidth: 0 }}>
              {category && <Typography variant="overline" component="p" sx={{ color: brand.goldLight }}>{category.label}</Typography>}
              <Typography variant="h1" sx={{ fontSize: 'clamp(2.4rem, 1.8rem + 2.6vw, 4rem)', mt: 1 }}>{product.name}</Typography>
              <Typography variant="subtitle1" component="p" sx={{ mt: 2, color: 'rgba(255,255,255,.85)' }}>{product.shortDescription}</Typography>
              <Typography sx={{ mt: 2, color: 'rgba(255,255,255,.68)' }}>{product.description}</Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 3, display: 'grid', gap: 1.25 }}>
                {product.highlights.map((h) => (
                  <Box component="li" key={h} sx={{ display: 'flex', gap: 1.25, alignItems: 'center' }}>
                    <CheckCircleOutlined sx={{ color: brand.gold, fontSize: 20 }} aria-hidden /> {h}
                  </Box>
                ))}
              </Box>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
                <LinkButton to={enquireTo} arrow size="large">Enquire About This Product</LinkButton>
                <LinkButton to="/products" variant="light" size="large">All Products</LinkButton>
              </Stack>
            </motion.div>
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container sx={{ display: 'grid', gap: { xs: 6, md: 8 }, gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' } }}>
          <div>
            <SectionHeading eyebrow="Overview" title={`About our ${product.name.toLowerCase()}`} sx={{ mb: 3 }} />
            {product.overview.map((p) => <Reveal key={p}><Typography sx={{ color: 'text.secondary', mb: 2 }}>{p}</Typography></Reveal>)}

            {product.varieties?.length > 0 && (
              <Reveal>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h4" component="h2">Commonly traded varieties</Typography>
                  <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {product.varieties.map((v) => (
                      <Box component="li" key={v} sx={{ px: 2, py: 0.85, fontSize: '0.9rem', fontWeight: 500, color: brand.navy, border: '1px solid rgba(214,173,82,.55)', borderRadius: '3px', bgcolor: 'rgba(244,213,138,.14)' }}>{v}</Box>
                    ))}
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1.5, color: 'text.secondary' }}>Availability depends on the season and is confirmed for each enquiry.</Typography>
                </Box>
              </Reveal>
            )}

            <Reveal>
              <Box sx={{ mt: 5, p: { xs: 3, md: 4 }, bgcolor: brand.soft, borderRadius: '4px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Inventory2Outlined sx={{ color: '#A9843A' }} aria-hidden />
                  <Typography variant="h4" component="h2">Packaging</Typography>
                </Box>
                <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary', '& li': { mb: 0.75 } }}>
                  {product.packaging.map((p) => <li key={p}>{p}</li>)}
                </Box>
              </Box>
            </Reveal>
          </div>

          <Reveal style={{ minWidth: 0 }}>
            <Box component="aside" aria-labelledby="spec-title" sx={{ border: '1px solid rgba(7,29,51,.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <Box sx={{ bgcolor: brand.navy, color: '#fff', px: 3, py: 2.25 }}>
                <Typography id="spec-title" variant="h4" component="h2">Specifications</Typography>
              </Box>
              <Box component="dl" sx={{ m: 0 }}>
                {product.specifications.map((s) => (
                  <Box key={s.label} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1.4fr' }, gap: { xs: 0.25, sm: 2 }, px: 3, py: 1.75, borderBottom: '1px solid rgba(7,29,51,.08)' }}>
                    <Box component="dt" sx={{ fontWeight: 600, color: brand.navy, fontSize: '0.92rem' }}>{s.label}</Box>
                    <Box component="dd" sx={{ m: 0, color: 'text.secondary', fontSize: '0.92rem' }}>{s.value}</Box>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1.25, px: 3, py: 2, bgcolor: 'rgba(244,213,138,.18)', fontSize: '0.84rem', color: brand.text }}>
                <InfoOutlined sx={{ fontSize: 18, color: '#A9843A', mt: '2px' }} aria-hidden />
                <span>Sample information. Exact specifications, grades and pack formats are confirmed for each enquiry.</span>
              </Box>
            </Box>
          </Reveal>
        </Container>
      </Box>

      <Box component="section" aria-labelledby="related-title" sx={{ bgcolor: brand.soft, py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionHeading eyebrow="You may also like" title={<span id="related-title">Related products</span>}
            action={<LinkButton to="/products" variant="outline" arrow>View All Products</LinkButton>} />
          <ProductGrid products={related} />
        </Container>
      </Box>
    </>
  )
}
