import { Route, Routes } from 'react-router'
import AdminLayout from '../layouts/AdminLayout'
import RequireAuth from '../components/admin/RequireAuth'
import Login from '../pages/admin/Login'
import Dashboard from '../pages/admin/Dashboard'
import Enquiries from '../pages/admin/Enquiries'
import CollectionPage from '../pages/admin/CollectionPage'
import SettingsPage from '../pages/admin/SettingsPage'
import MediaLibrary from '../pages/admin/MediaLibrary'
import Users from '../pages/admin/Users'
import Account from '../pages/admin/Account'
import AdminNotFound from '../pages/admin/AdminNotFound'

// Mounted at /admin/* (lazy-loaded, so the public site bundle stays small).
export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<RequireAuth><AdminLayout /></RequireAuth>}>
        <Route index element={<Dashboard />} />
        <Route path="enquiries" element={<Enquiries />} />
        <Route path="collections/:collection" element={<CollectionPage />} />
        <Route path="pages/:group" element={<SettingsPage />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="users" element={<Users />} />
        <Route path="account" element={<Account />} />
        <Route path="*" element={<AdminNotFound />} />
      </Route>
    </Routes>
  )
}
