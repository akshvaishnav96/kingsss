import { NavLink, Outlet, Link as RouterLink } from 'react-router'
import { AppBar, Badge, Box, Button, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Toolbar, Typography, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardOutlined from '@mui/icons-material/DashboardOutlined'
import MailOutlined from '@mui/icons-material/MailOutlined'
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined'
import PhotoLibraryOutlined from '@mui/icons-material/PhotoLibraryOutlined'
import HandshakeOutlined from '@mui/icons-material/HandshakeOutlined'
import QuizOutlined from '@mui/icons-material/QuizOutlined'
import GroupsOutlined from '@mui/icons-material/GroupsOutlined'
import ArticleOutlined from '@mui/icons-material/ArticleOutlined'
import PermMediaOutlined from '@mui/icons-material/PermMediaOutlined'
import ManageAccountsOutlined from '@mui/icons-material/ManageAccountsOutlined'
import LockOutlined from '@mui/icons-material/LockOutlined'
import OpenInNew from '@mui/icons-material/OpenInNew'
import Logout from '@mui/icons-material/Logout'
import { useTheme } from '@mui/material/styles'
import { useDisclosure } from '../hooks/useDisclosure'
import { useLogout, useMe } from '../hooks/admin/useAuth'
import { useDashboard } from '../hooks/admin/useDashboard'
import { pageGroups } from '../config/admin'
import { brand } from '../theme/theme'
import logo from '../assets/logo/kingsss-logo.png'

const WIDTH = 264

export default function AdminLayout() {
  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('md'))
  const drawer = useDisclosure()
  const { user } = useMe()
  const logout = useLogout()
  const { data: dashboard } = useDashboard()

  const sections = [
    { title: 'Overview', items: [
      { to: '/admin', label: 'Dashboard', icon: <DashboardOutlined />, end: true },
      { to: '/admin/enquiries', label: 'Enquiries', icon: <Badge color="warning" badgeContent={dashboard?.newEnquiries} max={99}><MailOutlined /></Badge> },
    ] },
    { title: 'Content', items: [
      { to: '/admin/collections/products', label: 'Products', icon: <Inventory2Outlined /> },
      { to: '/admin/collections/galleryItems', label: 'Gallery', icon: <PhotoLibraryOutlined /> },
      { to: '/admin/collections/services', label: 'Services', icon: <HandshakeOutlined /> },
      { to: '/admin/collections/faqs', label: 'FAQs', icon: <QuizOutlined /> },
      { to: '/admin/collections/directors', label: 'Team (Directors)', icon: <GroupsOutlined /> },
      { to: '/admin/media', label: 'Media library', icon: <PermMediaOutlined /> },
    ] },
    { title: 'Pages', items: pageGroups.map((g) => ({ to: `/admin/pages/${g.id}`, label: g.label, icon: <ArticleOutlined /> })) },
    { title: 'Settings', items: [
      { to: '/admin/users', label: 'Admin users', icon: <ManageAccountsOutlined /> },
      { to: '/admin/account', label: 'My account', icon: <LockOutlined /> },
    ] },
  ]

  const nav = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: brand.navy, color: '#fff' }}>
      <Box sx={{ px: 2.5, py: 2.5 }}><img src={logo} alt="KINGSSS" style={{ height: 40 }} /></Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />
      <Box component="nav" aria-label="Admin" sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
        {sections.map((s) => (
          <List key={s.title} dense subheader={<ListSubheader disableSticky sx={{ bgcolor: 'transparent', color: brand.goldLight, fontSize: '0.68rem', letterSpacing: '.16em', textTransform: 'uppercase', lineHeight: '32px' }}>{s.title}</ListSubheader>}>
            {s.items.map((i) => (
              <ListItemButton key={i.to} component={NavLink} to={i.to} end={i.end} onClick={drawer.close}
                sx={{ mx: 1, borderRadius: '4px', color: 'rgba(255,255,255,.78)', '&.active': { bgcolor: 'rgba(214,173,82,.16)', color: '#fff', '& .MuiListItemIcon-root': { color: brand.gold } } }}>
                <ListItemIcon sx={{ minWidth: 36, color: 'rgba(255,255,255,.6)' }}>{i.icon}</ListItemIcon>
                <ListItemText primary={i.label} slotProps={{ primary: { sx: { fontSize: '0.88rem' } } }} />
              </ListItemButton>
            ))}
          </List>
        ))}
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: brand.soft }}>
      <title>Admin | KINGSSS IMPORT EXPORT LLP</title>
      <meta name="robots" content="noindex" />
      <Drawer variant={desktop ? 'permanent' : 'temporary'} open={desktop || drawer.isOpen} onClose={drawer.close}
        sx={{ width: { md: WIDTH }, flexShrink: 0 }} slotProps={{ paper: { sx: { width: WIDTH, border: 0 } } }}>
        {nav}
      </Drawer>
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <AppBar position="sticky" color="inherit" elevation={0} sx={{ bgcolor: '#fff', borderBottom: '1px solid rgba(7,29,51,.1)' }}>
          <Toolbar sx={{ gap: 1 }}>
            {!desktop && <IconButton edge="start" aria-label="Open menu" onClick={drawer.open}><MenuIcon /></IconButton>}
            <Typography sx={{ flex: 1, fontWeight: 600 }} noWrap>Content management</Typography>
            <Button component={RouterLink} to="/" target="_blank" size="small" startIcon={<OpenInNew />} sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>View site</Button>
            <Typography variant="body2" sx={{ color: 'text.secondary', display: { xs: 'none', md: 'block' } }}>{user?.email}</Typography>
            <IconButton aria-label="Sign out" onClick={() => logout.mutate()}><Logout /></IconButton>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1200, width: '100%', mx: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
