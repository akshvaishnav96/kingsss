import { emailLayout, section, divider, heading, eyebrow, paragraph, messageBox, button, smallButton, esc, oneLine, colors } from './layout.js'
import { signatureHtml } from './signature.js'

const telHref = (n) => `tel:${n.replace(/[^\d+]/g, '')}`
const waHref = (n) => `https://wa.me/${n.replace(/\D/g, '')}?text=${encodeURIComponent('Hello KINGSSS, I sent an enquiry through your website.')}`

const STEPS = [
  ['01', 'We review your requirement', 'Our team checks product, variety, volumes and destination.'],
  ['02', 'Specifications & offer', 'We confirm availability for the season and share an offer.'],
  ['03', 'Preparation & shipment', 'Once confirmed, sourcing, packing and logistics are scheduled.'],
]

// "We received your enquiry" email sent to the customer.
export function enquiryCustomerEmail(enquiry, brand, { siteUrl }) {
  const firstName = oneLine(enquiry.name).split(' ')[0]
  const phones = brand.contact.phones ?? []

  const steps = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${STEPS.map(([n, title, text]) => `<tr>
    <td width="44" style="padding:0 0 14px;vertical-align:top"><div style="width:34px;height:34px;line-height:34px;border-radius:50%;background:${colors.navy};color:${colors.goldLight};font-family:Georgia,serif;font-size:13px;text-align:center">${n}</div></td>
    <td style="padding:2px 0 14px;vertical-align:top"><p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:${colors.navy}">${title}</p>
      <p style="margin:2px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:${colors.text}">${text}</p></td></tr>`).join('')}</table>`

  // Name + number, then the buttons on their own line — fits 320px phone screens.
  const contacts = phones.length ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${colors.line};border-radius:6px;border-collapse:separate">${phones.map((p, i) => `<tr>
    <td style="padding:12px 14px;${i ? `border-top:1px solid ${colors.line};` : ''}font-family:Arial,Helvetica,sans-serif">
      <p style="margin:0;font-size:14px;font-weight:bold;color:${colors.navy}">${esc(p.name)} <span style="font-weight:normal;color:${colors.text};white-space:nowrap">&nbsp;${esc(p.number)}</span></p>
      <p style="margin:8px 0 0">${smallButton(telHref(p.number), 'Call', 'outline')}${p.whatsapp ? `&nbsp;&nbsp;${smallButton(waHref(p.number), 'WhatsApp', 'whatsapp')}` : ''}</p></td></tr>`).join('')}</table>` : ''

  const body = [
    section(`${eyebrow('Enquiry received')}
      ${heading(`Thank you, ${esc(firstName)}`, 28)}
      ${paragraph(`We have received your enquiry regarding <strong style="color:${colors.navy}">${esc(enquiry.subject)}</strong>. Our team will review your requirements and get back to you soon.`)}
      ${messageBox('Your message', enquiry.message)}`, '34px 32px 28px'),
    divider(),
    section(`${eyebrow('What happens next')}${steps}`, '28px 32px 14px'),
    phones.length ? divider() : '',
    phones.length ? section(`${eyebrow('Need a quick answer?')}${paragraph('Call or WhatsApp our team directly:', 'margin-bottom:12px')}${contacts}`, '28px 32px') : '',
    siteUrl ? section(`<div style="text-align:center">${button(`${siteUrl}/products`, 'Explore our products')}</div>`, '4px 32px 8px') : '',
    section(`${paragraph('Warm regards,', 'margin-bottom:14px')}${signatureHtml({
      stacked: true, name: 'Team KINGSSS', company: brand.name, email: brand.contact.email, website: siteUrl, address: brand.contact.address,
      logoUrl: siteUrl ? `${siteUrl}/logo.png` : 'cid:kingsss-logo-panel',
    })}`, '24px 32px 32px'),
  ].join('')

  return {
    to: { name: oneLine(enquiry.name), address: enquiry.email },
    replyTo: brand.contact.email || undefined,
    subject: `We received your enquiry — ${brand.name}`,
    html: emailLayout({ preheader: `Thank you ${firstName} — our team will get back to you soon.`, body, brand, siteUrl }),
    text: `Dear ${firstName},\n\nThank you for contacting ${brand.name}. We have received your enquiry regarding "${enquiry.subject}" and our team will get back to you soon.\n\nWhat happens next:\n${STEPS.map(([n, t, d]) => `${n}. ${t} — ${d}`).join('\n')}\n\n${phones.map((p) => `${p.name}: ${p.number}`).join('\n')}\n\n${brand.name}\n${brand.contact.address ?? ''}\n`,
  }
}
