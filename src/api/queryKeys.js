// TanStack Query cache keys, in one place so invalidation stays consistent.
export const queryKeys = {
  site: ['site'],
  me: ['auth', 'me'],
  dashboard: ['admin', 'dashboard'],
  settings: ['admin', 'settings'],
  items: (collection) => ['admin', 'items', collection],
  enquiries: (status) => ['admin', 'enquiries', status ?? 'all'],
  media: ['admin', 'media'],
  users: ['admin', 'users'],
}
