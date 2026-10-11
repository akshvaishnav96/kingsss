import { Navigate, useLocation } from 'react-router'
import { useMe } from '../../hooks/admin/useAuth'
import SiteLoader from '../SiteLoader'

export default function RequireAuth({ children }) {
  const { user, isPending } = useMe()
  const location = useLocation()
  if (isPending) return <SiteLoader />
  if (!user) return <Navigate to={`/admin/login?next=${encodeURIComponent(location.pathname)}`} replace />
  return children
}
