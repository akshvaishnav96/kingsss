import { Router } from 'express'
import { requireAuth } from '../middleware/requireAuth.js'
import { rateLimit } from '../middleware/rateLimit.js'
import { upload } from '../middleware/upload.js'
import * as publicCtrl from '../controllers/public.controller.js'
import * as authCtrl from '../controllers/auth.controller.js'
import * as content from '../controllers/content.controller.js'
import * as enquiries from '../controllers/enquiries.controller.js'
import * as media from '../controllers/media.controller.js'
import * as users from '../controllers/users.controller.js'
import * as dashboard from '../controllers/dashboard.controller.js'

// Every API endpoint, in one place. Mounted at /api.
export const api = Router()

// Public website
api.get('/public/site', publicCtrl.getSite)
api.post('/public/enquiries', rateLimit({ max: 5, windowMs: 10 * 60_000 }), publicCtrl.submitEnquiry)

// Authentication
api.post('/auth/login', rateLimit({ max: 10, windowMs: 15 * 60_000, message: 'Too many sign-in attempts. Try again in 15 minutes.' }), authCtrl.login)
api.post('/auth/logout', authCtrl.logout)
api.get('/auth/me', authCtrl.me)
api.put('/auth/password', requireAuth, authCtrl.changePassword)

// Admin (all routes below require a session)
const admin = Router()
admin.use(requireAuth)

admin.get('/dashboard', dashboard.get)
admin.get('/schema', content.getSchema)

admin.get('/settings', content.getSettings)
admin.put('/settings/:key', content.saveSetting)

admin.get('/items/:collection', content.listItems)
admin.post('/items/:collection', content.createItem)
admin.put('/items/:collection/order', content.reorderItems)
admin.put('/items/:collection/:id', content.updateItem)
admin.delete('/items/:collection/:id', content.deleteItem)

admin.get('/enquiries', enquiries.list)
admin.patch('/enquiries/:id', enquiries.setStatus)
admin.delete('/enquiries/:id', enquiries.remove)

admin.get('/media', media.list)
admin.post('/media', upload.array('files', 20), media.upload)
admin.delete('/media/:id', media.remove)

admin.get('/users', users.list)
admin.post('/users', users.create)
admin.delete('/users/:id', users.remove)

api.use('/admin', admin)
