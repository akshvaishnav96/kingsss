import * as enquiries from '../services/enquiry.service.js'
import { toId } from '../lib/http.js'

export const list = async (req, res) => res.json(await enquiries.listEnquiries(req.query.status))
export const setStatus = async (req, res) => res.json(await enquiries.setEnquiryStatus(toId(req.params.id), req.body?.status))

export async function remove(req, res) {
  await enquiries.deleteEnquiry(toId(req.params.id))
  res.status(204).end()
}
