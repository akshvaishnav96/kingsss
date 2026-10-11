import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Box, Dialog, IconButton, InputBase, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import ArrowForward from '@mui/icons-material/ArrowForward'
import { products } from '../data/products'
import { brand } from '../theme/theme'

export const matchesQuery = (product, query) =>
  `${product.name} ${product.category} ${product.shortDescription}`.toLowerCase().includes(query.trim().toLowerCase())

export default function SearchDialog({ open, onClose }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const results = query.trim() ? products.filter((p) => matchesQuery(p, query)) : products.slice(0, 6)

  const go = (to) => {
    onClose()
    setQuery('')
    navigate(to)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="search-title"
      slotProps={{ paper: { sx: { m: { xs: 2, sm: 4 }, width: { xs: 'calc(100% - 32px)', sm: '100%' }, alignSelf: 'flex-start', mt: { xs: 9, sm: 12 }, borderRadius: '4px' } } }}>
      <Typography id="search-title" component="h2" className="sr-only">Search products</Typography>
      <Box component="form" role="search" onSubmit={(e) => { e.preventDefault(); go(`/products?q=${encodeURIComponent(query.trim())}`) }}
        sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <SearchIcon sx={{ color: brand.gold }} aria-hidden />
        <InputBase autoFocus fullWidth value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search fruits, e.g. mango"
          slotProps={{ input: { 'aria-label': 'Search products' } }} sx={{ py: 2, fontSize: '1.05rem' }} />
        <IconButton aria-label="Close search" onClick={onClose} edge="end"><CloseIcon /></IconButton>
      </Box>
      <Box sx={{ p: 1, maxHeight: '60vh', overflowY: 'auto' }}>
        {results.length === 0 ? (
          <Typography sx={{ p: 3, color: 'text.secondary' }}>No products match “{query}”.</Typography>
        ) : (
          <Box component="ul" aria-label={query ? 'Search results' : 'Popular products'} sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {results.map((p) => (
              <li key={p.id}>
                <Box component="button" type="button" onClick={() => go(`/products/${p.slug}`)}
                  sx={{ all: 'unset', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'center', gap: 2, p: 1.25, borderRadius: '4px', cursor: 'pointer',
                    '&:hover, &:focus-visible': { bgcolor: brand.soft }, '&:focus-visible': { outline: `2px solid ${brand.gold}` } }}>
                  <Box component="img" src={p.image} alt="" sx={{ width: 52, height: 52, objectFit: 'cover', borderRadius: '3px', flexShrink: 0 }} />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography sx={{ fontWeight: 600, color: brand.navy, lineHeight: 1.3 }}>{p.name}</Typography>
                    <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>{p.shortDescription}</Typography>
                  </Box>
                  <ArrowForward sx={{ fontSize: 18, color: brand.gold }} aria-hidden />
                </Box>
              </li>
            ))}
          </Box>
        )}
      </Box>
    </Dialog>
  )
}
