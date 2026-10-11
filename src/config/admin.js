// Admin panel structure: which content blocks live on which page, and how collections are shown.

export const pageGroups = [
  { id: 'company', label: 'Company & Contact', keys: ['company', 'contact', 'socialLinks'] },
  { id: 'home', label: 'Home page', keys: ['home', 'dualCta', 'stats'] },
  { id: 'about', label: 'About page', keys: ['about', 'teamSection', 'mentor'] },
  { id: 'services', label: 'Services page', keys: ['servicesPage', 'audiences', 'engagementSteps'] },
  { id: 'products', label: 'Products page', keys: ['productsPage', 'productCategories'] },
  { id: 'process', label: 'Our Process page', keys: ['processPage', 'quality'] },
  { id: 'gallery', label: 'Gallery page', keys: ['galleryPage', 'galleryCategories'] },
  { id: 'network', label: 'Our Network page', keys: ['networkPage'] },
  { id: 'contact', label: 'Contact page', keys: ['contactPage', 'contactCta', 'enquiryChecklist'] },
]

export const settingLabels = {
  company: 'Company details',
  contact: 'Address, email, phones & hours',
  socialLinks: 'Social media links',
  home: 'Home page sections',
  dualCta: 'Buyer / supplier panels',
  stats: 'Company stats (hidden while empty)',
  about: 'About page sections',
  teamSection: 'Leadership section heading',
  mentor: 'Blessings & guidance card (father)',
  servicesPage: 'Services page banner & intro',
  audiences: 'Who we serve',
  engagementSteps: 'Working with us steps',
  productsPage: 'Products page banner',
  productCategories: 'Product categories',
  processPage: 'Process page & steps',
  quality: 'Quality & sustainability',
  galleryPage: 'Gallery page banner',
  galleryCategories: 'Gallery categories',
  contactPage: 'Contact page banner & form',
  contactCta: 'Contact page closing panel',
  enquiryChecklist: 'Enquiry checklist',
  networkPage: 'Our Network — banner, intro & cities on the map',
}

export const collections = {
  products: {
    label: 'Products', singular: 'product', titleKey: 'name', subtitleKey: 'category', imageKey: 'image',
    template: { name: '', slug: '', category: '', featured: false, image: '', imageAlt: '', shortDescription: '', description: '', overview: [''], highlights: [''], varieties: [''], specifications: [{ label: '', value: '' }], packaging: [''] },
  },
  galleryItems: {
    label: 'Gallery', singular: 'gallery item', titleKey: 'title', subtitleKey: 'category', imageKey: 'thumb',
    template: { type: 'image', category: '', title: '', alt: '', src: '', thumb: '', videoSrc: '' },
  },
  services: {
    label: 'Services', singular: 'service', titleKey: 'title', imageKey: 'image',
    template: { id: '', icon: 'agriculture', title: '', text: '', points: [''], image: '', imageAlt: '' },
  },
  faqs: { label: 'FAQs', singular: 'FAQ', titleKey: 'q', template: { q: '', a: '' } },
  directors: {
    label: 'Team (Directors)', singular: 'director', titleKey: 'name', subtitleKey: 'role', imageKey: 'image',
    template: { name: '', role: 'Director', phoneId: '', image: '', imageAlt: '', bio: '' },
  },
}

// Templates for lists that may be empty in the database.
export const listTemplates = {
  stats: { id: '', value: '', label: '' },
  certifications: { id: '', name: '', detail: '' },
  socialLinks: { id: '', label: '', href: '' },
  phones: { id: '', name: '', number: '', whatsapp: true },
  cities: { id: '', name: '', state: '', region: 'North', lat: 0, lng: 0, headOffice: false },
}

export const enquiryStatuses = [
  { id: 'new', label: 'New', color: 'warning' },
  { id: 'read', label: 'Read', color: 'info' },
  { id: 'replied', label: 'Replied', color: 'success' },
  { id: 'archived', label: 'Archived', color: 'default' },
]
