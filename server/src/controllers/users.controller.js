import * as users from '../services/user.service.js'
import { parseNewUser } from '../validators/user.validator.js'
import { toId } from '../lib/http.js'

export const list = async (req, res) => res.json(await users.listUsers())
export const create = async (req, res) => res.status(201).json(await users.createUser(parseNewUser(req.body)))

export async function remove(req, res) {
  await users.deleteUser(toId(req.params.id), req.user.id)
  res.status(204).end()
}
