import { galleryMedia as m } from './media'

export const galleryCategories = [
  { id: 'all', label: 'All' },
  { id: 'team', label: 'Our Team' },
  { id: 'trade-shows', label: 'Trade Shows' },
  { id: 'partners', label: 'Partner Visits' },
  { id: 'shipments', label: 'Shipments' },
  { id: 'travel', label: 'Business Travel' },
  { id: 'videos', label: 'Videos' },
]

const photo = (id, category, name, title, alt) => ({ id, type: 'image', category, src: m[`${name}.webp`], thumb: m[`${name}-thumb.webp`], title, alt })
const video = (id, name, title, alt) => ({ id, type: 'video', category: 'videos', src: m[`${name}-poster.webp`], videoSrc: m[`${name}.mp4`], title, alt })

export const galleryItems = [
  photo('g-001', 'trade-shows', 'trade-fair-networking', 'At an international fruit trade fair', 'A KINGSSS partner with a visitor at an international fruit trade fair'),
  photo('g-002', 'shipments', 'apples-carton-tray', 'Apples packed in export cartons', 'Red apples arranged in an export carton tray'),
  photo('g-003', 'partners', 'partner-visit-mrt', 'Visit to MRT Natural Fresh', 'KINGSSS team with partners at the MRT Natural Fresh office'),
  photo('g-022', 'travel', 'travel-team-landmark', 'Team on a business trip', 'Three KINGSSS team members standing in a city square during a business trip'),
  video('g-004', 'container-opening', 'Opening a reefer container', 'Reefer container being opened to reveal apple cartons'),
  photo('g-005', 'team', 'team-container-yard', 'Our partners at the container yard', 'Three KINGSSS partners standing together at a container yard'),
  video('g-028', 'washing-grading-line', 'Washing and grading line', 'Apples moving through a washing and grading line at a pack house'),
  photo('g-006', 'trade-shows', 'trade-fair-meeting', 'Business meeting at a trade fair stand', 'Meeting at a fruit company stand during a trade fair'),
  photo('g-007', 'partners', 'market-visit-alem', 'Fresh produce market visit', 'Team members inside a well-stocked fresh fruit store'),
  photo('g-023', 'trade-shows', 'trade-fair-visitor', 'Meeting a trade partner', 'Two men with trade fair badges standing by a window overlooking the harbour'),
  video('g-008', 'reefer-unloading', 'Checking cartons on arrival', 'Team inspecting apple cartons inside a reefer container'),
  photo('g-009', 'trade-shows', 'trade-fair-agromoon', 'Meeting exhibitors', 'Two businessmen at a fruit exhibitor stand'),
  photo('g-010', 'shipments', 'shipment-container-yard', 'Receiving a shipment', 'KINGSSS partners at a container yard with reefer containers behind them'),
  photo('g-024', 'travel', 'travel-aircraft', 'On the move to meet partners', 'Team member standing beside an aircraft on the tarmac at night'),
  photo('g-011', 'team', 'team-shahid-portrait', 'Shahid Ali', 'Portrait of Shahid Ali in a dark suit'),
  video('g-012', 'container-inspection', 'Container inspection', 'Partners inspecting an apple shipment at the container door'),
  video('g-029', 'packhouse-cartons', 'Packed cartons at the pack house', 'Apples packed in trays inside export cartons at a pack house'),
  photo('g-013', 'trade-shows', 'trade-fair-booth', 'Connecting with suppliers', 'A KINGSSS partner with an exhibitor at a fruit trade fair booth'),
  photo('g-014', 'partners', 'store-visit-alem', 'Retail partner visit', 'Team at a fruit retail store with colourful produce displays'),
  photo('g-025', 'travel', 'travel-hotel-lobby', 'Between meetings', 'Team member seated in a hotel lobby during a business trip'),
  video('g-015', 'cold-store-pallets', 'Moving pallets into cold storage', 'Forklift moving stacked apple cartons in a cold store'),
  photo('g-016', 'trade-shows', 'trade-fair-hall', 'In the exhibition hall', 'Two businessmen in a busy trade fair hall'),
  photo('g-017', 'partners', 'partner-meeting-office', 'Partner meeting', 'Four men standing together in an office after a meeting'),
  photo('g-026', 'travel', 'travel-boarding', 'Boarding for the next market', 'Two team members at aircraft boarding stairs at night'),
  photo('g-018', 'shipments', 'apples-quality-check', 'Quality check on arrival', 'Rows of red apples laid out for quality inspection'),
  photo('g-027', 'travel', 'travel-selfie', 'Travelling together', 'Two team members taking a selfie outdoors on a sunny day'),
  video('g-019', 'apple-quality-check', 'Apple quality check', 'Apples being checked from an opened carton'),
  video('g-021', 'cold-store-operations', 'Cold store operations', 'Forklifts handling apple cartons inside a cold storage facility'),
  video('g-030', 'pallets-ready-dispatch', 'Pallets ready for dispatch', 'Palletised apple cartons stacked and ready for dispatch'),
]
