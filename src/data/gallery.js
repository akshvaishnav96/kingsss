import { images } from './media'

export const galleryCategories = [
  { id: 'all', label: 'All' },
  { id: 'farms', label: 'Farms' },
  { id: 'products', label: 'Products' },
  { id: 'packaging', label: 'Packaging' },
  { id: 'logistics', label: 'Logistics' },
  { id: 'videos', label: 'Videos' },
]

// type: 'image' | 'video'. For videos, set `videoSrc` to an mp4 URL to enable playback.
export const galleryItems = [
  { id: 'g-001', type: 'image', category: 'farms', src: images['orange-orchard'], title: 'Citrus orchard', alt: 'Orange tree laden with ripe fruit under a blue sky' },
  { id: 'g-002', type: 'image', category: 'products', src: images.grapes, title: 'Table grapes', alt: 'Basket of green and black grapes with vine leaves' },
  { id: 'g-003', type: 'image', category: 'packaging', src: images['packing-facility'], title: 'Packing facility', alt: 'Packing hall with stacked crates and boxes' },
  { id: 'g-004', type: 'image', category: 'logistics', src: images['container-port'], title: 'Container terminal', alt: 'Container vessel being loaded by port cranes' },
  { id: 'g-005', type: 'image', category: 'farms', src: images.vineyard, title: 'Vineyard harvest', alt: 'Black grape bunches hanging on the vine at sunrise' },
  { id: 'g-006', type: 'video', category: 'videos', src: images['farm-rows'], title: 'From our growing regions', alt: 'Rows of crops stretching across a farm field', videoSrc: null },
  { id: 'g-007', type: 'image', category: 'products', src: images.pomegranates, title: 'Pomegranates', alt: 'Pile of deep red pomegranates' },
  { id: 'g-008', type: 'image', category: 'packaging', src: images['storage-warehouse'], title: 'Storage', alt: 'Warehouse racks stacked with wooden crates' },
  { id: 'g-009', type: 'image', category: 'logistics', src: images['cargo-ship'], title: 'Ocean freight', alt: 'Container ship sailing on open water' },
  { id: 'g-010', type: 'image', category: 'farms', src: images['harvest-hands'], title: 'Hand-picked', alt: 'Hands holding freshly picked strawberries' },
  { id: 'g-011', type: 'image', category: 'products', src: images.mangoes, title: 'Mangoes', alt: 'Close-up of ripe red and yellow mangoes' },
  { id: 'g-012', type: 'video', category: 'videos', src: images['port-aerial'], title: 'Port and shipping operations', alt: 'Aerial view of a container port', videoSrc: null },
  { id: 'g-013', type: 'image', category: 'logistics', src: images['truck-highway'], title: 'Road transport', alt: 'Truck driving on an open highway' },
  { id: 'g-014', type: 'image', category: 'packaging', src: images['parcel-hands'], title: 'Carton handling', alt: 'Hands holding a sealed cardboard carton' },
  { id: 'g-015', type: 'image', category: 'products', src: images.oranges, title: 'Oranges', alt: 'Pile of bright whole oranges' },
  { id: 'g-016', type: 'image', category: 'farms', src: images['field-sunrise'], title: 'Open fields', alt: 'Farm field at sunrise' },
]
