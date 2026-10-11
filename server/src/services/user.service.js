import { prisma } from '../lib/prisma.js'
import { hashPassword } from '../lib/password.js'
import { HttpError } from '../lib/http.js'

const select = { id: true, email: true, name: true, createdAt: true }

export const listUsers = () => prisma.user.findMany({ select, orderBy: { id: 'asc' } })

export async function createUser({ email, name, password }) {
  return prisma.user.create({ data: { email, name, passwordHash: await hashPassword(password) }, select })
}

export async function deleteUser(id, currentUserId) {
  if (id === currentUserId) throw new HttpError(400, 'You cannot delete your own account.')
  if ((await prisma.user.count()) <= 1) throw new HttpError(400, 'At least one admin account is required.')
  await prisma.user.delete({ where: { id } })
}
