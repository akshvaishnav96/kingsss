import { prisma } from '../lib/prisma.js'
import { HttpError } from '../lib/http.js'
import { ENQUIRY_STATUSES } from '../validators/enquiry.validator.js'
import { sendEnquiryEmails } from './mail.service.js'

export async function createEnquiry(values) {
  const enquiry = await prisma.enquiry.create({ data: values })
  sendEnquiryEmails(enquiry).catch((err) => console.error(`Enquiry #${enquiry.id} email error: ${err.message}`)) // not awaited
  return enquiry
}

export const listEnquiries = (status) =>
  prisma.enquiry.findMany({ where: status && status !== 'all' ? { status } : undefined, orderBy: { createdAt: 'desc' }, take: 500 })

export function setEnquiryStatus(id, status) {
  if (!ENQUIRY_STATUSES.includes(status)) throw new HttpError(400, 'Invalid status.')
  return prisma.enquiry.update({ where: { id }, data: { status } })
}

export const deleteEnquiry = (id) => prisma.enquiry.delete({ where: { id } })
