import { Box, Chip, Container, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { brand } from '../theme/theme'
import { useSite } from '../hooks/useSite'
import { useProductFilters } from '../hooks/useProductFilters'
import FilterChips from '../components/FilterChips'
import PageBanner from '../components/PageBanner'
import ProductGrid from '../components/ProductGrid'
import CTASection from '../components/CTASection'
import PageMeta from '../components/PageMeta'

export default function Products() {
  const { productsPage } = useSite()
  const { categories, category, setCategory, query, setQuery, clear, visible, total } = useProductFilters()

  return (
    <>
      <PageMeta title="Products" description="Explore fresh fruits from KINGSSS IMPORT EXPORT LLP — mangoes, pomegranates, grapes, oranges, apples, kiwis and more." />
      <PageBanner {...productsPage.banner} crumbs={[{ label: 'Products' }]} />

      <Box component="section" aria-labelledby="catalogue-title" sx={{ py: { xs: 6, md: 10 } }}>
        <Container>
          <Typography id="catalogue-title" variant="h2" className="sr-only">Product catalogue</Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2.5, alignItems: { md: 'center' }, justifyContent: 'space-between', mb: { xs: 4, md: 5 },
            pb: { xs: 3, md: 4 }, borderBottom: '1px solid', borderColor: 'divider' }}>
            <FilterChips options={categories} value={category} onChange={setCategory} label="Filter by category" />
            <TextField
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              size="small"
              type="search"
              sx={{ width: { xs: '100%', md: 300 }, '& .MuiOutlinedInput-root': { height: 44 } }}
              slotProps={{ htmlInput: { 'aria-label': 'Search products' }, input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: brand.gold }} /></InputAdornment> } }}
            />
          </Box>

          <Typography role="status" variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Showing {visible.length} of {total} products
          </Typography>

          {visible.length ? (
            <ProductGrid products={visible} />
          ) : (
            <Box sx={{ textAlign: 'center', py: 10, bgcolor: brand.soft, borderRadius: '4px' }}>
              <Typography variant="h4" component="p">No products found</Typography>
              <Typography sx={{ mt: 1, color: 'text.secondary' }}>Try a different search or category — or contact us about your specific requirement.</Typography>
              <Chip label="Clear filters" clickable onClick={clear} sx={{ mt: 3, height: 40, bgcolor: brand.navy, color: '#fff', '&:hover': { bgcolor: brand.navyDark } }} />
            </Box>
          )}
        </Container>
      </Box>

      <CTASection />
    </>
  )
}
