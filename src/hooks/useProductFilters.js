import { useSearchParams } from 'react-router'
import { useSite } from './useSite'
import { matchesQuery } from '../lib/content'

// Category + search filters for the products page, kept in the URL so results are shareable.
export function useProductFilters() {
  const { products, productCategories } = useSite()
  const [params, setParams] = useSearchParams()
  const category = params.get('category') ?? 'all'
  const query = params.get('q') ?? ''

  const update = (key, value, empty) => {
    const next = new URLSearchParams(params)
    value && value !== empty ? next.set(key, value) : next.delete(key)
    setParams(next, { replace: true })
  }

  return {
    categories: productCategories,
    category,
    query,
    setCategory: (id) => update('category', id, 'all'),
    setQuery: (q) => update('q', q, ''),
    clear: () => setParams({}, { replace: true }),
    visible: products.filter((p) => (category === 'all' || p.category === category) && matchesQuery(p, query)),
    total: products.length,
  }
}
