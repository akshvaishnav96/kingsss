import { useSite } from './useSite'
import { findProduct, relatedProducts } from '../lib/content'

export function useProductDetails(slug) {
  const { products, productCategories } = useSite()
  const product = findProduct(products, slug)
  if (!product) return { product: null }
  return {
    product,
    category: productCategories.find((c) => c.id === product.category),
    related: relatedProducts(products, product),
    enquireTo: `/contact?subject=${encodeURIComponent(`Product enquiry: ${product.name}`)}`,
  }
}
