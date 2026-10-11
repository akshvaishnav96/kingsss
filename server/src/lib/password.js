import { randomBytes, scrypt as scryptCb, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCb)

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  return `${salt}:${(await scrypt(password, salt, 64)).toString('hex')}`
}

export async function verifyPassword(password, stored) {
  const [salt, hex] = stored.split(':')
  return timingSafeEqual(await scrypt(password, salt, 64), Buffer.from(hex, 'hex'))
}
