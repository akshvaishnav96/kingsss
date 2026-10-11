import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useScrollTrigger } from '@mui/material'
import { useDisclosure } from './useDisclosure'

// Header behaviour: scrolled styling, mobile drawer, search dialog and active-link matching.
export function useHeaderState() {
  const { pathname } = useLocation()
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 24 })
  const drawer = useDisclosure()
  const search = useDisclosure()
  const closeDrawer = drawer.close

  useEffect(() => {
    closeDrawer()
  }, [pathname, closeDrawer])

  return { scrolled, drawer, search, isActive: (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to)) }
}
