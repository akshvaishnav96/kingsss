import { Box } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import ProductCard from './ProductCard'

// columns: responsive grid-template-columns values. Default suits 6–8 items.
export default function ProductGrid({ products, columns, headingLevel }) {
  return (
    <Box
      component="ul"
      sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: { xs: 2, md: 3 },
        gridTemplateColumns: columns ?? { xs: 'repeat(auto-fill, minmax(min(100%, 165px), 1fr))', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' } }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {products.map((p, i) => (
          <motion.li
            key={p.id}
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.55, delay: Math.min(i, 5) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            style={{ minWidth: 0 }}
          >
            <ProductCard product={p} headingLevel={headingLevel} />
          </motion.li>
        ))}
      </AnimatePresence>
    </Box>
  )
}
