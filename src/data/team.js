import { teamImages } from './media'

// Draft profiles — review names, roles and descriptions before launch.
// `phoneId` links a member to a number in contact.phones (siteContent.js) for call / WhatsApp buttons.
export const teamSection = {
  eyebrow: 'Our leadership',
  title: 'The people behind KINGSSS',
  text: 'KINGSSS is led by three directors who are personally involved in every relationship — from growers and exporters to the buyers we serve.',
}

// Directors, in display order (the middle card is centred on desktop).
export const directors = [
  {
    id: 'sandeep-singh-rathor',
    name: 'Sandeep Singh Rathor',
    role: 'Director',
    phoneId: 'sandeep',
    image: teamImages['sandeep-singh-rathor'],
    imageAlt: 'Portrait of Sandeep Singh Rathor, Director',
    bio: 'Focuses on operations and coordination — planning shipments and keeping partners informed from dispatch to delivery.',
  },
  {
    id: 'shahid-ali',
    name: 'Shahid Ali',
    role: 'Director',
    phoneId: 'shahid',
    image: teamImages['shahid-ali'],
    imageAlt: 'Portrait of Shahid Ali, Director',
    bio: 'Represents KINGSSS at international trade fairs and partner meetings, building relationships with growers, exporters and buyers across markets.',
  },
  {
    id: 'jai-kumar-agarwal',
    name: 'Jai Kumar Agarwal',
    role: 'Director',
    phoneId: 'jai',
    image: teamImages['jai-kumar-agarwal'],
    imageAlt: 'Portrait of Jai Kumar Agarwal, Director',
    bio: 'Works closely with partners on sourcing, quality and supply, with a focus on dependable, long-term trade relationships.',
  },
]

// Not a business role: a respected elder whose personal blessings and guidance the directors value.
// Shown modestly beneath the directors.
export const mentor = {
  id: 'blessings',
  name: 'Shri Agarwal', // TODO: full name
  role: 'With the blessings & guidance of',
  image: teamImages.founder,
  imageAlt: 'Portrait of Shri Agarwal',
  text: 'A constant source of inspiration for our directors — his values of trust, honesty and hard work stay close to everything we do.',
}
