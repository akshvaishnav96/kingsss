import { images } from './media'

export const company = {
  name: 'KINGSSS IMPORT EXPORT LLP',
  shortName: 'KINGSSS',
  tagline: 'Freshness Without Borders',
  intro:
    'Connecting trusted growers with global markets. We source and export quality fresh fruits and agricultural produce, built on long-term partnerships.',
}

export const contact = {
  addressLabel: 'Head Office',
  address: 'B-11, Terminal Market, Muhana Mandi, Jaipur, Rajasthan 302029, India',
  mapQuery: 'Terminal Market, Muhana Mandi, Jaipur, Rajasthan 302029', // used for the Google Maps embed
  email: 'info@kingsssimportexportllp.com',
  phones: [
    { id: 'shahid', name: 'Shahid Ali', number: '+91 94627 99539' },
    { id: 'sandeep', name: 'Sandeep Singh Rathor', number: '+91 98285 21041' },
    { id: 'jai', name: 'Jai Kumar Agarwal', number: '+91 98280 11300' },
  ],
  hours: 'Business hours — to be added',
  whatsapp: '', // e.g. '+91 00000 00000'; shows a floating WhatsApp chat button when set
}

export const socialLinks = [
  { id: 'linkedin', label: 'LinkedIn', href: '' },
  { id: 'instagram', label: 'Instagram', href: '' },
  { id: 'facebook', label: 'Facebook', href: '' },
]

export const home = {
  hero: {
    eyebrow: 'Fresh fruits · Agricultural produce · Global trade',
    titleLines: ['Freshness', 'Without Borders'],
    subtitle: 'Connecting Trusted Growers with Global Markets.',
    text: 'We source quality fresh fruits and produce from trusted growers and prepare every shipment with care — so it reaches international buyers fresh, graded and ready for market.',
    image: images['hero-fruit-crate'],
    imageAlt: 'Wooden crate overflowing with fresh mangoes, grapes, kiwis, apples and plums',
    video: null, // set to an mp4 URL to play a background video instead of the image
    primaryCta: { label: 'Explore Our Products', to: '/products' },
    secondaryCta: { label: 'Partner With Us', to: '/contact?subject=Partnership%20enquiry' },
  },
  highlights: [
    { id: 'fresh', icon: 'spa', title: 'Fresh & Premium Produce', text: 'Sourced from trusted growers' },
    { id: 'reach', icon: 'public', title: 'Global Market Reach', text: 'Serving international buyers' },
    { id: 'supply', icon: 'local_shipping', title: 'Reliable Supply Chain', text: 'From farm to destination' },
    { id: 'partners', icon: 'handshake', title: 'Long-term Partnerships', text: 'Growing together' },
  ],
  featured: {
    eyebrow: 'Our range',
    title: 'Our Featured Products',
    text: 'A curated range of fresh fruits, selected and handled for international markets.',
  },
  globalTrade: {
    eyebrow: 'Global trade',
    title: 'From Farm to Global Markets',
    text: 'Every shipment starts with careful sourcing and continues through grading, packing and coordinated logistics — built around freshness, transparency and dependable communication with our partners.',
    image: images['cargo-ship'],
    imageAlt: 'Large container ship loaded with cargo sailing across the ocean',
    cta: { label: 'Explore Our Process', to: '/our-process' },
  },
  capabilities: {
    eyebrow: 'What we do',
    title: 'Our Capabilities',
    items: [
      { id: 'sourcing', title: 'Sustainable Sourcing', text: 'Working closely with growers and farming communities to source responsibly grown produce.', image: images['hands-soil'], imageAlt: 'Hands planting a young seedling in dark soil' },
      { id: 'handling', title: 'Careful Handling', text: 'Sorting, grading and packing with attention at every stage, from farm to pack house.', image: images['packing-facility'], imageAlt: 'Packing facility with crates of produce ready for dispatch' },
      { id: 'delivery', title: 'Global Delivery', text: 'Coordinated logistics designed to move fresh produce efficiently to international markets.', image: images['container-port'], imageAlt: 'Container ship docked at a port beneath loading cranes' },
    ],
  },
  whyChooseUs: {
    eyebrow: 'Why KINGSSS',
    title: 'A partner built on care and consistency',
    text: 'We believe international fresh-produce trade works best when it is built on clear communication, careful handling and relationships that last beyond a single shipment.',
    image: images['assorted-fruits'],
    imageAlt: 'Colourful assortment of fresh fruits including citrus, papaya, grapes and kiwis',
    items: [
      { id: 'quality', icon: 'verified', title: 'Quality Focus', text: 'Produce is checked for ripeness, appearance and consistency before it is packed.' },
      { id: 'trust', icon: 'handshake', title: 'Trusted Partnerships', text: 'We value long-term relationships with growers, logistics partners and buyers.' },
      { id: 'care', icon: 'inventory', title: 'Careful Handling', text: 'Packing and transport are planned to protect freshness throughout the journey.' },
      { id: 'service', icon: 'support', title: 'Customer-Focused Service', text: 'Responsive communication and requirements tailored to each buyer’s market.' },
    ],
  },
  cta: {
    eyebrow: 'Work with us',
    title: 'Looking for a reliable fresh produce partner?',
    text: 'Tell us about your market, product requirements and volumes. Our team will get back to you to discuss how we can work together.',
    primary: { label: 'Enquire Now', to: '/contact' },
    secondary: { label: 'View Products', to: '/products' },
  },
}

export const about = {
  banner: {
    title: 'About Us',
    subtitle: 'Building global connections through quality produce.',
    image: images['farm-rows'],
    imageAlt: 'Neat rows of crops across a farm under a bright sky',
  },
  intro: {
    eyebrow: 'Who we are',
    title: 'An import–export company rooted in fresh produce',
    paragraphs: [
      'KINGSSS IMPORT EXPORT LLP is focused on sourcing and supplying quality fresh fruits and agricultural produce to buyers in international markets.',
      'We work closely with growers, suppliers and logistics partners to bring together careful sourcing, attentive handling and dependable coordination — so our partners can plan with confidence.',
    ],
    image: images['orange-orchard'],
    imageAlt: 'Orange tree heavy with ripe fruit',
  },
  story: {
    eyebrow: 'Our story',
    title: 'Bringing growers and markets closer',
    paragraphs: [
      'Fresh produce travels a long way between the orchard and the shelf. Every step — harvesting, grading, packing, storage and shipping — affects what the buyer finally receives.',
      'KINGSSS was established with a simple intention: to make that journey more reliable. By working directly with the people who grow and move the produce, we aim to deliver fruit that is fresh, well-presented and true to what was agreed.',
    ],
    image: images['farmer-soil'],
    imageAlt: 'Farmer kneeling in a field inspecting the soil',
  },
  pillars: [
    { id: 'vision', icon: 'visibility', title: 'Our Vision', text: 'To be a trusted global partner in fresh produce trade, known for quality, integrity and lasting relationships.', image: images['harvest-hands'], imageAlt: 'Hands holding freshly picked strawberries' },
    { id: 'mission', icon: 'flag', title: 'Our Mission', text: 'To deliver quality produce with integrity and reliability — connecting growers to markets through careful sourcing, handling and logistics.', image: images['field-sunrise'], imageAlt: 'Farmland at sunrise' },
    { id: 'values', icon: 'diamond', title: 'Our Values', text: 'Trust, quality and long-term partnership guide how we work with growers, partners and buyers.', image: images.handshake, imageAlt: 'Two business people shaking hands' },
  ],
  values: [
    { id: 'integrity', title: 'Integrity', text: 'Honest communication and commitments we can stand behind.' },
    { id: 'quality', title: 'Quality', text: 'Attention to freshness, grading and presentation at every stage.' },
    { id: 'partnership', title: 'Partnership', text: 'Relationships with growers and buyers that grow over time.' },
    { id: 'responsibility', title: 'Responsibility', text: 'Respect for farming communities and the environment.' },
  ],
  approach: {
    eyebrow: 'Sourcing & quality',
    title: 'Our approach to sourcing and quality',
    text: 'Quality begins long before packing. Our approach brings together grower relationships, clear specifications and careful handling.',
    points: [
      'Working with growers who share our focus on freshness and care',
      'Agreeing grade, size and packing specifications with buyers in advance',
      'Checking produce for ripeness, appearance and consistency before packing',
      'Planning storage and transport conditions around each product',
    ],
    image: images['produce-market'],
    imageAlt: 'Sorted fresh produce including carrots, cucumbers and peppers',
  },
}

export const productsPage = {
  banner: {
    title: 'Our Products',
    subtitle: 'A range of fresh, quality fruits and produce for international buyers.',
    image: images['fruit-varieties'],
    imageAlt: 'Fresh fruits and juices arranged outdoors',
  },
}

export const processPage = {
  banner: {
    title: 'Our Process',
    subtitle: 'From farm to destination, with care at every step.',
    image: images['orange-orchard'],
    imageAlt: 'Orange tree with ripe fruit',
  },
  intro: {
    eyebrow: 'How we work',
    title: 'A process framework built around freshness',
    text: 'The steps below outline the process framework we follow. Specific practices, checks and timelines are agreed with partners for each product and shipment.',
  },
  steps: [
    { id: 'farm-selection', number: '01', title: 'Farm Selection', short: 'Partnering with trusted growers', text: 'We begin by identifying growers whose practices, produce and seasons align with our buyers’ requirements, and building relationships that support consistent supply.', points: ['Grower relationships', 'Seasonal planning', 'Produce suitability'], image: images['farmer-soil'], imageAlt: 'Farmer inspecting soil in a field' },
    { id: 'harvesting', number: '02', title: 'Harvesting', short: 'Picked at optimal ripeness', text: 'Harvest timing is planned around the product and its journey, so fruit is picked at a maturity suited to transit and the destination market.', points: ['Maturity-based timing', 'Gentle hand-picking', 'Field-to-packhouse speed'], image: images['harvest-hands'], imageAlt: 'Hands holding freshly harvested strawberries' },
    { id: 'sorting-grading', number: '03', title: 'Sorting & Grading', short: 'Careful sorting for quality', text: 'Produce is sorted and graded by size, colour and condition according to the specifications agreed with each buyer.', points: ['Size and colour grading', 'Condition checks', 'Buyer specifications'], image: images['produce-market'], imageAlt: 'Sorted fresh vegetables and produce' },
    { id: 'packaging', number: '04', title: 'Packaging', short: 'Packed with care for safe transit', text: 'Packing materials and formats are chosen to protect the produce, allow airflow and meet labelling needs for the destination market.', points: ['Protective cartons', 'Ventilation and cushioning', 'Labelling on request'], image: images['packing-facility'], imageAlt: 'Packing hall with crates of produce' },
    { id: 'global-delivery', number: '05', title: 'Global Delivery', short: 'Delivered to markets worldwide', text: 'Shipments are coordinated with logistics partners, with attention to storage conditions and documentation, to help produce reach its destination fresh.', points: ['Logistics coordination', 'Temperature-aware handling', 'Shipment updates'], image: images['cargo-ship'], imageAlt: 'Container ship at sea' },
  ],
}

export const galleryPage = {
  banner: {
    title: 'Gallery',
    subtitle: 'A glimpse of farms, produce and the journey to market.',
    image: images.vineyard,
    imageAlt: 'Grape bunches on the vine at sunrise',
  },
}

export const contactPage = {
  banner: {
    title: 'Contact Us',
    subtitle: 'We’d love to hear from you.',
    image: images['port-aerial'],
    imageAlt: 'Aerial view of a busy container port',
  },
  formIntro: {
    eyebrow: 'Send an enquiry',
    title: 'Tell us what you are looking for',
    text: 'Share your product requirements, destination market and expected volumes, and our team will be in touch.',
  },
  subjects: ['Product enquiry', 'Partnership enquiry', 'Supplier / grower enquiry', 'Logistics enquiry', 'Other'],
}

export const contactCta = {
  eyebrow: 'Growers & suppliers',
  title: 'Interested in supplying with us?',
  text: 'We are always keen to connect with growers, pack houses and logistics partners who share our focus on quality and reliability.',
  primary: { label: 'Partner With Us', to: '/contact?subject=Supplier%20%2F%20grower%20enquiry' },
  secondary: { label: 'Our Process', to: '/our-process' },
}
