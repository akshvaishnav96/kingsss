export class HttpError extends Error {
  constructor(status, message, fields) {
    super(message)
    this.status = status
    this.fields = fields
  }
}

export const slugify = (s) => String(s).toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_-]+/g, '-').slice(0, 80)

export const toId = (value) => {
  const id = Number(value)
  if (!Number.isInteger(id) || id < 1) throw new HttpError(400, 'Invalid id.')
  return id
}
