import { request } from './client'

// Every API call the frontend makes, in one place.

export const publicApi = {
  getSite: ({ signal } = {}) => request('/api/public/site', { signal }),
  submitEnquiry: (values) => request('/api/public/enquiries', { method: 'POST', body: values }),
}

export const authApi = {
  me: () => request('/api/auth/me'),
  login: (credentials) => request('/api/auth/login', { method: 'POST', body: credentials }),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
  changePassword: (body) => request('/api/auth/password', { method: 'PUT', body }),
}

export const adminApi = {
  dashboard: () => request('/api/admin/dashboard'),

  settings: {
    list: () => request('/api/admin/settings'),
    save: (key, value) => request(`/api/admin/settings/${key}`, { method: 'PUT', body: { value } }),
  },

  items: {
    list: (collection) => request(`/api/admin/items/${collection}`),
    create: (collection, item) => request(`/api/admin/items/${collection}`, { method: 'POST', body: item }),
    update: (collection, id, item) => request(`/api/admin/items/${collection}/${id}`, { method: 'PUT', body: item }),
    remove: (collection, id) => request(`/api/admin/items/${collection}/${id}`, { method: 'DELETE' }),
    reorder: (collection, ids) => request(`/api/admin/items/${collection}/order`, { method: 'PUT', body: { ids } }),
  },

  enquiries: {
    list: (status) => request(`/api/admin/enquiries${status ? `?status=${status}` : ''}`),
    setStatus: (id, status) => request(`/api/admin/enquiries/${id}`, { method: 'PATCH', body: { status } }),
    remove: (id) => request(`/api/admin/enquiries/${id}`, { method: 'DELETE' }),
  },

  media: {
    list: () => request('/api/admin/media'),
    upload: (files) => {
      const form = new FormData()
      for (const f of files) form.append('files', f)
      return request('/api/admin/media', { method: 'POST', body: form })
    },
    remove: (id) => request(`/api/admin/media/${id}`, { method: 'DELETE' }),
  },

  users: {
    list: () => request('/api/admin/users'),
    create: (user) => request('/api/admin/users', { method: 'POST', body: user }),
    remove: (id) => request(`/api/admin/users/${id}`, { method: 'DELETE' }),
  },
}
