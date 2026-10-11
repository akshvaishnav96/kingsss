import * as auth from '../services/auth.service.js'
import { parsePassword } from '../validators/user.validator.js'

export const login = async (req, res) => res.json({ user: await auth.login(res, req.body?.email, req.body?.password) })

export async function logout(req, res) {
  await auth.logout(req, res)
  res.json({ ok: true })
}

export const me = async (req, res) => res.json({ user: await auth.userFromRequest(req) })

export async function changePassword(req, res) {
  await auth.changePassword(req.user.id, req.body?.current, parsePassword(req.body?.next))
  res.json({ ok: true })
}
