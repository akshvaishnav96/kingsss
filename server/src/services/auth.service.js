import { randomBytes, createHash } from 'node:crypto'
import { prisma } from '../lib/prisma.js'
import { hashPassword, verifyPassword } from '../lib/password.js'
import { HttpError } from '../lib/http.js'
import { env } from '../config/env.js'

const COOKIE = 'kingsss_session'
const sha256 = (s) => createHash('sha256').update(s).digest('hex')
const publicUser = ({ id, email, name }) => ({ id, email, name })

function readCookie(req) {
  const match = (req.headers.cookie ?? '').split(';').map((c) => c.trim().split('=')).find(([k]) => k === COOKIE)
  return match ? decodeURIComponent(match[1]) : null
}

export async function login(res, email, password) {
  const user = await prisma.user.findUnique({ where: { email: String(email ?? '').trim().toLowerCase() } })
  if (!user || !(await verifyPassword(String(password ?? ''), user.passwordHash))) throw new HttpError(401, 'Incorrect email or password.')
  const token = randomBytes(32).toString('hex')
  await prisma.session.create({ data: { tokenHash: sha256(token), userId: user.id, expiresAt: new Date(Date.now() + env.sessionDays * 864e5) } })
  res.cookie(COOKIE, token, { httpOnly: true, sameSite: 'lax', secure: env.isProduction, maxAge: env.sessionDays * 864e5, path: '/' })
  return publicUser(user)
}

export async function logout(req, res) {
  const token = readCookie(req)
  if (token) await prisma.session.deleteMany({ where: { tokenHash: sha256(token) } })
  res.clearCookie(COOKIE, { path: '/' })
}

export async function userFromRequest(req) {
  const token = readCookie(req)
  if (!token) return null
  const session = await prisma.session.findUnique({ where: { tokenHash: sha256(token) }, include: { user: true } })
  return session && session.expiresAt > new Date() ? publicUser(session.user) : null
}

export async function changePassword(userId, current, next) {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } })
  if (!(await verifyPassword(String(current ?? ''), user.passwordHash))) throw new HttpError(400, 'Current password is incorrect.', { current: 'Incorrect password.' })
  await prisma.user.update({ where: { id: userId }, data: { passwordHash: await hashPassword(next) } })
}

export const purgeExpiredSessions = () => prisma.session.deleteMany({ where: { expiresAt: { lt: new Date() } } })
