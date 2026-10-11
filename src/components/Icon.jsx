import SpaOutlined from '@mui/icons-material/SpaOutlined'
import PublicOutlined from '@mui/icons-material/PublicOutlined'
import LocalShippingOutlined from '@mui/icons-material/LocalShippingOutlined'
import HandshakeOutlined from '@mui/icons-material/HandshakeOutlined'
import VerifiedOutlined from '@mui/icons-material/VerifiedOutlined'
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined'
import SupportAgentOutlined from '@mui/icons-material/SupportAgentOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'
import FlagOutlined from '@mui/icons-material/FlagOutlined'
import DiamondOutlined from '@mui/icons-material/DiamondOutlined'
import LinkedIn from '@mui/icons-material/LinkedIn'
import Instagram from '@mui/icons-material/Instagram'
import Facebook from '@mui/icons-material/Facebook'
import WhatsApp from '@mui/icons-material/WhatsApp'
import AgricultureOutlined from '@mui/icons-material/AgricultureOutlined'
import FactCheckOutlined from '@mui/icons-material/FactCheckOutlined'
import LocalOfferOutlined from '@mui/icons-material/LocalOfferOutlined'
import AcUnitOutlined from '@mui/icons-material/AcUnitOutlined'
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined'
import DirectionsBoatOutlined from '@mui/icons-material/DirectionsBoatOutlined'
import BusinessOutlined from '@mui/icons-material/BusinessOutlined'
import StorefrontOutlined from '@mui/icons-material/StorefrontOutlined'
import LocalDrinkOutlined from '@mui/icons-material/LocalDrinkOutlined'
import RestaurantOutlined from '@mui/icons-material/RestaurantOutlined'
import Groups2Outlined from '@mui/icons-material/Groups2Outlined'
import RecyclingOutlined from '@mui/icons-material/RecyclingOutlined'
import WaterDropOutlined from '@mui/icons-material/WaterDropOutlined'

// Maps icon names used in src/data to MUI icons, so content stays plain data.
const icons = {
  spa: SpaOutlined,
  public: PublicOutlined,
  local_shipping: LocalShippingOutlined,
  handshake: HandshakeOutlined,
  verified: VerifiedOutlined,
  inventory: Inventory2Outlined,
  support: SupportAgentOutlined,
  visibility: VisibilityOutlined,
  flag: FlagOutlined,
  diamond: DiamondOutlined,
  linkedin: LinkedIn,
  instagram: Instagram,
  facebook: Facebook,
  whatsapp: WhatsApp,
  agriculture: AgricultureOutlined,
  fact_check: FactCheckOutlined,
  label: LocalOfferOutlined,
  offer: LocalOfferOutlined,
  ac_unit: AcUnitOutlined,
  description: DescriptionOutlined,
  boat: DirectionsBoatOutlined,
  business: BusinessOutlined,
  storefront: StorefrontOutlined,
  drink: LocalDrinkOutlined,
  restaurant: RestaurantOutlined,
  groups: Groups2Outlined,
  recycling: RecyclingOutlined,
  water: WaterDropOutlined,
}

export const iconNames = Object.keys(icons)

export default function Icon({ name, ...props }) {
  const Component = icons[name] ?? SpaOutlined
  return <Component aria-hidden="true" {...props} />
}
