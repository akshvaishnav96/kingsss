import { getDashboard } from '../services/dashboard.service.js'

export const get = async (req, res) => res.json(await getDashboard())
