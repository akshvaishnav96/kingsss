import { useSearchParams } from 'react-router'
import { Box, Chip, Container, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { brand } from '../theme/theme'
import { products, productCategories } from '../data/products'
import { productsPage } from '../data/siteContent'
import PageBanner from '../components/PageBanner'
import ProductGrid from '../components/ProductGrid'
import CTASection from '../components/CTASection'
import PageMeta from '../components/PageMeta'
import { matchesQuery } from '../components/SearchDialog'

export default function Products() {
  // Filter state lives in the URL so results are shareable and the header search can link here.
  const [params, setParams] = useSearchParams()
  const category = params.get('category') ?? 'all'
  const query = params.get('q') ?? ''

  const update = (key, value, empty) => {
    const next = new URLSearchParams(params)
    value && value !== empty ? next.set(key, value) : next.delete(key)
    setParams(next, { replace: true })
  }

  const visible = products.filter((p) => (category === 'all' || p.category === category) && matchesQuery(p, query))

  return (
    <>
      <PageMeta title="Products" description="Explore fresh fruits from KINGSSS IMPORT EXPORT LLP — mangoes, pomegranates, grapes, oranges, apples, kiwis and more." />
      <PageBanner {...productsPage.banner} crumbs={[{ label: 'Products' }]} />

      <Box component="section" aria-labelledby="catalogue-title" sx={{ py: { xs: 6, md: 10 } }}>
        <Container>
          <Typography id="catalogue-title" variant="h2" className="sr-only">Product catalogue</Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2.5, alignItems: { md: 'center' }, justifyContent: 'space-between', mb: { xs: 4, md: 5 },
            pb: { xs: 3, md: 4 }, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Stack role="group" aria-label="Filter by category" direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
              {productCategories.map((c) => {
                const active = c.id === category
                return (
                  <Chip key={c.id} label={c.label} clickable aria-pressed={active} onClick={() => update('category', c.id, 'all')}
                    sx={{ height: 40, px: 0.75, fontSize: '0.88rem', border: '1px solid', transition: 'all .25s',
                      bgcolor: active ? brand.navy : '#fff', color: active ? '#fff' : brand.navy, borderColor: active ? brand.navy : 'rgba(7,29,51,.16)',
                      '&:hover': { bgcolor: active ? brand.navyDark : brand.soft } }} />
                )
              })}
            </Stack>
            <TextField
              value={query}
              onChange={(e) => update('q', e.target.value, '')}
              placeholder="Search products"
              size="small"
              type="search"
              sx={{ width: { xs: '100%', md: 300 }, '& .MuiOutlinedInput-root': { height: 44 } }}
              slotProps={{ htmlInput: { 'aria-label': 'Search products' }, input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: brand.gold }} /></InputAdornment> } }}
            />
          </Box>

          <Typography role="status" variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Showing {visible.length} of {products.length} products
          </Typography>

          {visible.length ? (
            <ProductGrid products={visible} />
          ) : (
            <Box sx={{ textAlign: 'center', py: 10, bgcolor: brand.soft, borderRadius: '4px' }}>
              <Typography variant="h4" component="p">No products found</Typography>
              <Typography sx={{ mt: 1, color: 'text.secondary' }}>Try a different search or category — or contact us about your specific requirement.</Typography>
              <Chip label="Clear filters" clickable onClick={() => setParams({}, { replace: true })} sx={{ mt: 3, height: 40, bgcolor: brand.navy, color: '#fff', '&:hover': { bgcolor: brand.navyDark } }} />
            </Box>
          )}
        </Container>
      </Box>

      <CTASection />
    </>
  )
}
