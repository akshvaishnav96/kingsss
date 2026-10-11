import { useState } from 'react'
import { useSite } from './useSite'
import { matchesQuery } from '../lib/content'

export function useProductSearch(limit = 6) {
  const { products } = useSite()
  const [query, setQuery] = useState('')
  const results = query.trim() ? products.filter((p) => matchesQuery(p, query)) : products.slice(0, limit)
  return { query, setQuery, results, reset: () => setQuery('') }
}
