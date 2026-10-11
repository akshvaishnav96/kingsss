import { prisma } from '../lib/prisma.js'
import { sendMail, mailEnabled } from '../lib/mailer.js'
import { env } from '../config/env.js'
import { logoAttachment, logoPanelAttachment } from '../templates/email/layout.js'
import { enquiryTeamEmail } from '../templates/email/enquiryTeam.js'
import { enquiryCustomerEmail } from '../templates/email/enquiryCustomer.js'

export async function loadBrand() {
  const rows = await prisma.setting.findMany({ where: { key: { in: ['company', 'contact'] } } })
  const s = Object.fromEntries(rows.map((r) => [r.key, r.value]))
  return { name: s.company?.name ?? 'KINGSSS IMPORT EXPORT LLP', contact: s.contact ?? {} }
}

// Every email carries the logo as an inline attachment, so it shows without loading remote images.
export function buildEnquiryEmails(enquiry, brand) {
  const opts = { siteUrl: env.publicSiteUrl, to: env.mail.notifyTo }
  // Once the site is live (PUBLIC_SITE_URL), logos load from /logo.png; until then they travel as attachments.
  const inline = env.publicSiteUrl ? [] : [logoAttachment, logoPanelAttachment]
  return {
    team: { ...enquiryTeamEmail(enquiry, brand, opts), attachments: inline.slice(0, 1) },
    customer: { ...enquiryCustomerEmail(enquiry, brand, opts), attachments: inline },
  }
}

// Fire-and-forget: a mail failure is logged but never fails the enquiry itself.
export async function sendEnquiryEmails(enquiry) {
  if (!mailEnabled) return
  const emails = buildEnquiryEmails(enquiry, await loadBrand())
  const jobs = []
  if (env.mail.notifyTo.length) jobs.push(['team', sendMail(emails.team)])
  if (env.mail.autoReply) jobs.push(['customer', sendMail(emails.customer)])
  const results = await Promise.allSettled(jobs.map(([, job]) => job))
  results.forEach((result, i) => {
    const kind = jobs[i][0]
    if (result.status === 'rejected') console.error(`Email (${kind}) for enquiry #${enquiry.id} failed: ${result.reason?.message}`)
    else console.log(`Email (${kind}) for enquiry #${enquiry.id} sent to ${result.value.accepted.join(', ')}`)
  })
}
