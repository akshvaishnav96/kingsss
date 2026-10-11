import { images } from './media'

// Services, audiences, engagement steps, FAQ and quality content.
// Wording describes what we offer to coordinate; remove any service the business does not provide.

export const servicesPage = {
  banner: {
    title: 'Our Services',
    subtitle: 'End-to-end support for buying and supplying fresh produce across borders.',
    image: images['container-port'],
    imageAlt: 'Container ship being loaded at a port',
  },
  intro: {
    eyebrow: 'What we do',
    title: 'One partner from orchard to destination port',
    text: 'Fresh produce trade involves many hands — growers, pack houses, cold stores, freight forwarders and inspectors. We bring these steps together so buyers deal with one accountable partner instead of many.',
  },
}

export const services = [
  {
    id: 'sourcing',
    icon: 'agriculture',
    title: 'Sourcing & Procurement',
    text: 'We identify growers and pack houses that match your variety, grade and seasonal requirements, and coordinate procurement from harvest onwards.',
    points: ['Grower and pack-house selection', 'Variety and season matching', 'Pre-harvest coordination'],
    image: images['orange-orchard'],
    imageAlt: 'Orange tree with ripe fruit',
  },
  {
    id: 'quality',
    icon: 'fact_check',
    title: 'Quality Inspection & Grading',
    text: 'Produce is checked against the specification agreed with you — size, colour, firmness and visual defects — before it is packed and loaded.',
    points: ['Agreed buyer specifications', 'Size and colour grading', 'Pre-shipment checks and photos'],
    image: images['produce-market'],
    imageAlt: 'Sorted fresh produce',
  },
  {
    id: 'packing',
    icon: 'label',
    title: 'Packing & Private Labelling',
    text: 'Choose from standard export cartons or your own branding. We coordinate pack formats, counts, labels and palletisation to suit your market.',
    points: ['Carton, tray and punnet formats', 'Buyer-brand / private labels', 'Palletisation and marking'],
    image: images['packing-facility'],
    imageAlt: 'Packing facility with crates of produce',
  },
  {
    id: 'cold-chain',
    icon: 'ac_unit',
    title: 'Cold Chain Coordination',
    text: 'Temperature and handling requirements are planned per product — from pre-cooling after harvest to reefer container settings during transit.',
    points: ['Pre-cooling and cold storage', 'Product-specific temperature plans', 'Reefer container coordination'],
    image: images['storage-warehouse'],
    imageAlt: 'Storage warehouse with stacked crates',
  },
  {
    id: 'documentation',
    icon: 'description',
    title: 'Export Documentation Support',
    text: 'We help prepare and coordinate the paperwork a fresh produce shipment needs, so consignments move through clearance without avoidable delays.',
    points: ['Commercial invoice and packing list', 'Phytosanitary and origin paperwork coordination', 'Destination-specific requirements'],
    image: images.handshake,
    imageAlt: 'Business partners shaking hands',
  },
  {
    id: 'logistics',
    icon: 'boat',
    title: 'Freight & Logistics',
    text: 'Sea and air freight options are coordinated with logistics partners, with shipment updates shared from dispatch to arrival.',
    points: ['Sea and air freight coordination', 'Inland transport to port', 'Shipment tracking updates'],
    image: images['cargo-ship'],
    imageAlt: 'Container ship at sea',
  },
]

export const audiences = {
  eyebrow: 'Who we serve',
  title: 'Built for every buyer in the fresh produce chain',
  items: [
    { id: 'importers', icon: 'business', title: 'Importers & Distributors', text: 'Regular, container-load supply planned around your seasons.' },
    { id: 'wholesale', icon: 'storefront', title: 'Wholesale Markets', text: 'Consistent grades and pack formats for fast-moving trade.' },
    { id: 'retail', icon: 'offer', title: 'Retail & Supermarket Chains', text: 'Shelf-ready packing, private labels and uniform presentation.' },
    { id: 'processors', icon: 'drink', title: 'Processors & Juice Makers', text: 'Volume supply for pulp, juice and processing requirements.' },
    { id: 'horeca', icon: 'restaurant', title: 'HoReCa & Food Service', text: 'Reliable quality for hotels, restaurants and caterers.' },
    { id: 'growers', icon: 'groups', title: 'Growers & Pack Houses', text: 'A route to international buyers for quality produce.' },
  ],
}

export const engagementSteps = {
  eyebrow: 'Working with us',
  title: 'From first enquiry to delivered shipment',
  items: [
    { id: 'share', title: 'Share your requirement', text: 'Tell us the product, variety, grade, quantity, packing and destination port.' },
    { id: 'offer', title: 'Specification & offer', text: 'We confirm availability for the season, agree specifications and share a commercial offer.' },
    { id: 'confirm', title: 'Confirmation & preparation', text: 'Once confirmed, sourcing, grading, packing and documentation are scheduled.' },
    { id: 'ship', title: 'Dispatch & updates', text: 'Your shipment is dispatched with documents and updates shared until arrival.' },
  ],
}

export const enquiryChecklist = {
  title: 'What to include in your enquiry',
  text: 'A complete enquiry helps us respond faster with an accurate offer.',
  items: ['Product and preferred variety', 'Grade / size or count', 'Quantity per shipment and frequency', 'Packing format and labelling', 'Destination port or city', 'Expected shipment window'],
}

export const faqs = [
  { id: 'how-to-order', q: 'How do I place an enquiry?', a: 'Use the contact form or email us with your product, quantity, packing and destination details. Our team will review your requirement and get back to you with next steps.' },
  { id: 'moq', q: 'Is there a minimum order quantity?', a: 'Minimum quantities depend on the product, packing format and mode of shipment. We will confirm what is practical for your requirement during the enquiry.' },
  { id: 'private-label', q: 'Can produce be packed under our own brand?', a: 'Private labelling and custom carton printing can be discussed for suitable volumes. Share your artwork and packing preferences with your enquiry.' },
  { id: 'quality', q: 'How is quality checked before shipment?', a: 'Produce is checked against the specification agreed with you — such as size, colour and visual condition — before packing and loading. Pre-shipment photographs can be shared on request.' },
  { id: 'documents', q: 'Which documents are provided with a shipment?', a: 'Typical shipments include a commercial invoice and packing list, along with phytosanitary and origin paperwork as required by the destination country. Exact requirements are confirmed per market.' },
  { id: 'samples', q: 'Can we receive samples first?', a: 'Sample requests can be discussed depending on the product and season. Mention it in your enquiry and we will advise on what is possible.' },
  { id: 'supplier', q: 'I am a grower or pack house. How can I supply to you?', a: 'Choose “Supplier / grower enquiry” on the contact form and tell us about your produce, location, volumes and season. We will be in touch to discuss partnership.' },
]

export const quality = {
  eyebrow: 'Quality & sustainability',
  title: 'Quality is checked at every hand-off',
  text: 'Freshness is lost or protected at each hand-off. These are the checkpoints our process is built around.',
  checkpoints: [
    { id: 'field', title: 'At the farm', text: 'Maturity, harvest timing and field handling.' },
    { id: 'packhouse', title: 'At the pack house', text: 'Grading, defect removal and pack-format checks.' },
    { id: 'storage', title: 'In storage', text: 'Pre-cooling and product-specific temperatures.' },
    { id: 'loading', title: 'At loading', text: 'Carton condition, palletisation and reefer settings.' },
  ],
  sustainability: [
    { id: 'growers', icon: 'groups', title: 'Fair grower relationships', text: 'Long-term, transparent relationships with farming communities.' },
    { id: 'waste', icon: 'recycling', title: 'Less waste', text: 'Careful handling and cold-chain planning to reduce spoilage.' },
    { id: 'water', icon: 'water', title: 'Responsible resources', text: 'Preference for partners who use water and inputs responsibly.' },
  ],
  // Add verified certificates/registrations here, e.g. { id: 'x', name: 'Certificate name', detail: 'Issuing body / number' }
  certifications: [],
}

// Company figures — fill in verified values to show the stats band (hidden while empty).
// e.g. { id: 'years', value: '10+', label: 'Years in trade' }
export const stats = []

export const dualCta = {
  buyers: {
    eyebrow: 'For buyers & importers',
    title: 'Source fresh produce with us',
    text: 'Share your product, volume and destination — we will come back with specifications and an offer.',
    cta: { label: 'Send a Buying Enquiry', to: '/contact?subject=Product%20enquiry' },
    image: images['assorted-fruits'],
    imageAlt: 'Assorted fresh fruits',
  },
  suppliers: {
    eyebrow: 'For growers & pack houses',
    title: 'Supply your produce through us',
    text: 'Grow quality fruit? Tell us about your produce, location and season to explore a long-term partnership.',
    cta: { label: 'Become a Supplier', to: '/contact?subject=Supplier%20%2F%20grower%20enquiry' },
    image: images['farmer-soil'],
    imageAlt: 'Farmer inspecting soil in a field',
  },
}
