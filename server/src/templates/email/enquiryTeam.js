import { emailLayout, section, heading, eyebrow, paragraph, detailsTable, messageBox, button, esc, oneLine, colors } from './layout.js'

// Sent to the KINGSSS team when a website enquiry arrives.
export function enquiryTeamEmail(enquiry, brand, { siteUrl, to }) {
  const received = enquiry.createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
  const replyHref = `mailto:${enquiry.email}?subject=${encodeURIComponent(`Re: ${oneLine(enquiry.subject)}`)}`

  const body = [
    section(`${eyebrow(`Enquiry #${enquiry.id} · ${received}`)}
      ${heading(`New enquiry from ${esc(enquiry.name)}`)}
      ${paragraph(`Someone has contacted ${esc(brand.name)} through the website contact form. Their details are below — simply reply to this email to respond.`)}
      ${detailsTable([
        ['Name', `<strong>${esc(enquiry.name)}</strong>`],
        ['Email', `<a href="mailto:${esc(enquiry.email)}" style="color:${colors.goldText};text-decoration:none">${esc(enquiry.email)}</a>`],
        enquiry.company && ['Company', esc(enquiry.company)],
        ['Subject', esc(enquiry.subject)],
        ['Received', esc(received)],
      ])}
      ${messageBox('Message', enquiry.message)}`, '32px 32px 8px'),
    section(`<table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="padding:0 10px 10px 0">${button(replyHref, `Reply to ${oneLine(enquiry.name).split(' ')[0]}`)}</td>
        ${siteUrl ? `<td style="padding:0 0 10px">${button(`${siteUrl}/admin/enquiries`, 'Open in admin panel', 'outline')}</td>` : ''}
      </tr></table>
      <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${colors.muted}">This enquiry is also saved in the admin panel under Enquiries.</p>`, '16px 32px 32px'),
  ].join('')

  return {
    to,
    replyTo: { name: oneLine(enquiry.name), address: enquiry.email },
    subject: `New enquiry #${enquiry.id}: ${oneLine(enquiry.subject)} — ${oneLine(enquiry.name)}`,
    html: emailLayout({ preheader: `${oneLine(enquiry.name)} · ${oneLine(enquiry.subject)} — ${oneLine(enquiry.message).slice(0, 90)}`, badge: 'New website enquiry', body, brand, siteUrl }),
    text: `New website enquiry #${enquiry.id} (${received})\n\nName: ${enquiry.name}\nEmail: ${enquiry.email}\n${enquiry.company ? `Company: ${enquiry.company}\n` : ''}Subject: ${enquiry.subject}\n\n${enquiry.message}\n\nReply to this email to respond to ${enquiry.name}.\n`,
  }
}
