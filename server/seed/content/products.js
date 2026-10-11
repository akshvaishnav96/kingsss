import { images } from './media'

export const productCategories = [
  { id: 'all', label: 'All' },
  { id: 'tropical', label: 'Tropical' },
  { id: 'citrus', label: 'Citrus' },
  { id: 'orchard', label: 'Orchard Fruits' },
  { id: 'vine', label: 'Vine Fruits' },
  { id: 'exotic', label: 'Exotic' },
]

// Indicative details only. Exact varieties, grades, origins and pack formats
// are confirmed per enquiry and should be replaced with verified data.
const sampleSpecs = (extra = []) => [
  ...extra,
  { label: 'Grade', value: 'As per buyer requirement' },
  { label: 'Size / count', value: 'Confirmed per order' },
  { label: 'Origin', value: 'Confirmed per shipment' },
  { label: 'Storage', value: 'Temperature-controlled handling' },
]

export const products = [
  {
    id: 'p-001',
    slug: 'mangoes',
    varieties: ['Alphonso', 'Kesar', 'Banganapalli', 'Totapuri', 'Dasheri'],
    name: 'Mangoes',
    category: 'tropical',
    featured: true,
    image: images.mangoes,
    imageAlt: 'Ripe red and yellow mangoes stacked together',
    shortDescription: 'Fragrant, sun-ripened mangoes selected for colour, aroma and consistency.',
    description:
      'Mangoes are among the most loved tropical fruits in the world. We work with growers to source mangoes that are harvested at the right maturity and handled carefully to preserve their natural sweetness and aroma.',
    overview: [
      'Each lot is selected with attention to ripeness, colour and firmness so that fruit arrives in a condition suited to the buyer’s market.',
      'Varieties, sizes and seasonal windows are discussed with each buyer at the enquiry stage.',
    ],
    highlights: ['Selected at optimal maturity', 'Graded for size and colour', 'Packed to reduce bruising'],
    specifications: sampleSpecs([{ label: 'Varieties', value: 'Available on request' }]),
    packaging: ['Ventilated corrugated cartons', 'Cushioned trays or fruit nets', 'Custom labelling on request'],
  },
  {
    id: 'p-002',
    slug: 'pomegranates',
    varieties: ['Bhagwa', 'Ganesh', 'Arakta'],
    name: 'Pomegranates',
    category: 'exotic',
    featured: true,
    image: images.pomegranates,
    imageAlt: 'Deep red pomegranates with some cut open to show the seeds',
    shortDescription: 'Deep red pomegranates with juicy arils and a naturally long shelf life.',
    description:
      'Pomegranates are valued for their jewel-like arils and rich flavour. We focus on fruit with good skin quality, colour and weight, handled with care from orchard to container.',
    overview: [
      'Fruit is sorted for skin finish, colour and weight before packing.',
      'Pack sizes and fruit counts can be matched to retail or wholesale requirements.',
    ],
    highlights: ['Selected for colour and weight', 'Careful sorting for skin quality', 'Suited to longer transit'],
    specifications: sampleSpecs([{ label: 'Varieties', value: 'Available on request' }]),
    packaging: ['Corrugated cartons with dividers', 'Single-layer or double-layer packs', 'Custom labelling on request'],
  },
  {
    id: 'p-003',
    slug: 'grapes',
    varieties: ['Thompson Seedless', 'Sonaka', 'Sharad Seedless', 'Crimson Seedless', 'Red Globe'],
    name: 'Grapes',
    category: 'vine',
    featured: true,
    image: images.grapes,
    imageAlt: 'Basket of green and black grape bunches with vine leaves',
    shortDescription: 'Crisp green and black table grapes with well-formed, uniform bunches.',
    description:
      'Table grapes need fast, careful handling to stay crisp. We source green and black grapes with well-formed bunches and plan the cold chain from packing to delivery.',
    overview: [
      'Bunches are checked for berry size, firmness and stem freshness.',
      'Colour, variety and pack format are agreed with the buyer before shipment.',
    ],
    highlights: ['Green and black varieties', 'Bunch uniformity checks', 'Cold-chain focused handling'],
    specifications: sampleSpecs([{ label: 'Colours', value: 'Green / black (on request)' }]),
    packaging: ['Punnets or bags in cartons', 'Liners suited to cold storage', 'Custom labelling on request'],
  },
  {
    id: 'p-004',
    slug: 'oranges',
    varieties: ['Nagpur Mandarin', 'Kinnow', 'Valencia', 'Navel'],
    name: 'Oranges',
    category: 'citrus',
    featured: true,
    image: images.oranges,
    imageAlt: 'Pile of bright, fresh whole oranges',
    shortDescription: 'Bright, juicy oranges with a balanced sweet and tangy flavour.',
    description:
      'Oranges are a staple citrus fruit for retail and juicing markets alike. We aim to supply fruit with good colour, juice content and peel quality.',
    overview: [
      'Fruit is graded by size and peel finish to suit different buyer requirements.',
      'Supply windows depend on the season and are discussed at the enquiry stage.',
    ],
    highlights: ['Graded by size', 'Peel quality checks', 'Suited to retail and juicing'],
    specifications: sampleSpecs([{ label: 'Varieties', value: 'Available on request' }]),
    packaging: ['Telescopic corrugated cartons', 'Mesh bags on request', 'Custom labelling on request'],
  },
  {
    id: 'p-005',
    slug: 'apples',
    varieties: ['Royal Delicious', 'Red Delicious', 'Gala', 'Fuji', 'Granny Smith'],
    name: 'Apples',
    category: 'orchard',
    featured: true,
    image: images.apples,
    imageAlt: 'Rows of glossy red apples',
    shortDescription: 'Crisp, glossy apples graded for size, colour and firmness.',
    description:
      'Apples are one of the most widely traded fruits globally. We focus on crisp, well-coloured fruit that is graded and packed to hold its quality through storage and transit.',
    overview: [
      'Apples are sorted for colour, size and firmness before packing.',
      'Tray packs and count sizes can be aligned with market preferences.',
    ],
    highlights: ['Colour and firmness grading', 'Tray-packed options', 'Suited to cold storage'],
    specifications: sampleSpecs([{ label: 'Varieties', value: 'Available on request' }]),
    packaging: ['Moulded tray cartons', 'Bulk cartons on request', 'Custom labelling on request'],
  },
  {
    id: 'p-006',
    slug: 'kiwis',
    varieties: ['Hayward', 'Allison'],
    name: 'Kiwis',
    category: 'exotic',
    featured: true,
    image: images.kiwis,
    imageAlt: 'Halved kiwis showing bright green flesh and black seeds',
    shortDescription: 'Vibrant green kiwis with a refreshing, tangy-sweet taste.',
    description:
      'Kiwis bring colour and freshness to any fruit range. We look for firm, evenly sized fruit and handle it carefully to manage ripening during transit.',
    overview: [
      'Fruit is selected for firmness and size consistency.',
      'Ripening and storage needs are planned around the destination market.',
    ],
    highlights: ['Firmness checks', 'Size consistency', 'Ripening-aware handling'],
    specifications: sampleSpecs([{ label: 'Varieties', value: 'Available on request' }]),
    packaging: ['Single-layer tray cartons', 'Punnets on request', 'Custom labelling on request'],
  },
  {
    id: 'p-007',
    slug: 'bananas',
    varieties: ['Cavendish (G9)', 'Robusta', 'Nendran'],
    name: 'Bananas',
    category: 'tropical',
    featured: false,
    image: images.bananas,
    imageAlt: 'Bunches of ripe yellow bananas',
    shortDescription: 'Naturally sweet bananas, harvested green and managed for even ripening.',
    description:
      'Bananas are harvested green and need controlled handling to ripen evenly. We plan packing and transport to help fruit reach its destination in good condition.',
    overview: [
      'Hands are checked for finger length, shape and peel condition.',
      'Shipping and ripening plans are discussed with each buyer.',
    ],
    highlights: ['Harvested at the right stage', 'Even-ripening focus', 'Careful hand packing'],
    specifications: sampleSpecs([{ label: 'Varieties', value: 'Available on request' }]),
    packaging: ['Banana cartons with liners', 'Cluster packing', 'Custom labelling on request'],
  },
  {
    id: 'p-008',
    slug: 'dragon-fruit',
    varieties: ['White-flesh', 'Red-flesh'],
    name: 'Dragon Fruit',
    category: 'exotic',
    featured: false,
    image: images['dragon-fruit'],
    imageAlt: 'Halved pink dragon fruit showing white flesh with black seeds',
    shortDescription: 'Striking pink dragon fruit with mild, refreshing white flesh.',
    description:
      'Dragon fruit is a distinctive exotic fruit with growing global demand. We focus on fruit with good shape, bright skin colour and fresh bracts.',
    overview: [
      'Fruit is sorted by weight, shape and skin condition.',
      'Pack formats are agreed with the buyer before shipment.',
    ],
    highlights: ['Bright skin colour', 'Weight-based sorting', 'Protective packing'],
    specifications: sampleSpecs([{ label: 'Flesh colour', value: 'White / red (on request)' }]),
    packaging: ['Cartons with foam nets', 'Single-layer packs', 'Custom labelling on request'],
  },
]

export const getProduct = (slug) => products.find((p) => p.slug === slug)

export const getRelatedProducts = (product, count = 4) =>
  [
    ...products.filter((p) => p.id !== product.id && p.category === product.category),
    ...products.filter((p) => p.id !== product.id && p.category !== product.category),
  ].slice(0, count)
