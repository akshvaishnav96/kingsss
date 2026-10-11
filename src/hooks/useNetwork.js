import { useMemo, useState } from 'react'
import { useSite } from './useSite'
import { projectIndia } from '../assets/maps/india'

const REGION_ORDER = ['North', 'West', 'Central', 'East', 'South']

// Network page data: projected map points, cities grouped by region, and the shared hover/selection state.
export function useNetwork() {
  const { networkPage } = useSite()
  const [activeId, setActiveId] = useState(null)
  const cities = useMemo(() => (networkPage?.cities ?? []).filter((c) => Number.isFinite(Number(c.lat)) && Number.isFinite(Number(c.lng))), [networkPage])

  const points = useMemo(() => cities.map((c) => ({ ...c, ...projectIndia(Number(c.lat), Number(c.lng)) })), [cities])

  const regions = useMemo(() => {
    const groups = new Map()
    for (const c of cities) groups.set(c.region || 'Other', [...(groups.get(c.region || 'Other') ?? []), c])
    return [...groups.entries()]
      .sort(([a], [b]) => (REGION_ORDER.indexOf(a) + 1 || 99) - (REGION_ORDER.indexOf(b) + 1 || 99))
      .map(([name, list]) => ({ name, cities: list }))
  }, [cities])

  return {
    page: networkPage,
    points,
    regions,
    stats: { cities: cities.length, states: new Set(cities.map((c) => c.state)).size, regions: regions.length },
    activeId,
    active: points.find((p) => p.id === activeId) ?? null,
    activate: setActiveId,
    clear: () => setActiveId(null),
  }
}
