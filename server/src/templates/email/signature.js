import { esc, colors } from './layout.js'

const SANS = 'Arial,Helvetica,sans-serif'
const telHref = (n) => `tel:${n.replace(/[^\d+]/g, '')}`
const waHref = (n) => `https://wa.me/${n.replace(/\D/g, '')}`
const line = (label, html) => `<tr><td style="padding:1px 8px 1px 0;font-family:${SANS};font-size:12px;color:${colors.goldText};font-weight:bold;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:1px 0;font-family:${SANS};font-size:12px;line-height:1.5;color:${colors.text};word-break:break-word">${html}</td></tr>`
const link = (href, text) => `<a href="${esc(href)}" style="color:${colors.navy};text-decoration:none">${esc(text)}</a>`

const phoneLine = (number, whatsapp) => `${link(telHref(number), number)}${whatsapp ? ` &nbsp;·&nbsp; <a href="${esc(waHref(number))}" style="color:#128C7E;text-decoration:none;font-weight:bold">WhatsApp</a>` : ''}`

// `phones` (list of { name, number, whatsapp }) shows several named contacts, e.g. on the company signature.
function details({ name, role, company, phone, whatsapp, phones = [], email, website, address }) {
  return `${name ? `<p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:17px;color:${colors.navy}">${esc(name)}</p>` : ''}
      ${role ? `<p style="margin:2px 0 0;font-family:${SANS};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;color:${colors.goldText}">${esc(role)}</p>` : ''}
      <p style="margin:${name || role ? '4px' : '0'} 0 8px;font-family:${SANS};font-size:12px;font-weight:bold;color:${colors.navy}">${esc(company)}</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        ${phone ? line('Phone', phoneLine(phone, whatsapp)) : ''}
        ${phones.map((p) => line(esc(p.name.split(' ')[0]), phoneLine(p.number, p.whatsapp))).join('')}
        ${email ? line('Email', link(`mailto:${email}`, email)) : ''}
        ${website ? line('Web', link(website, website.replace(/^https?:\/\//, ''))) : ''}
        ${address ? line('Office', esc(address)) : ''}
      </table>`
}

const logo = ({ website, logoUrl, company }) =>
  `<a href="${esc(website || '#')}" style="text-decoration:none"><img src="${esc(logoUrl)}" width="150" alt="${esc(company)}" style="display:block;width:150px;height:auto;border:0;border-radius:6px"></a>`

// Email signature. `logoUrl` must be a public URL for signatures pasted into webmail (no attachments there).
// `stacked` puts the logo above the details — used inside our own emails so it fits phone screens.
export function signatureHtml(opts) {
  if (opts.stacked) {
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${SANS}">
  <tr><td style="padding:0 0 12px">${logo(opts)}</td></tr>
  <tr><td style="padding:10px 0 0 12px;border-left:2px solid ${colors.gold}">${details(opts)}</td></tr>
</table>`
  }
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${SANS}">
  <tr>
    <td style="padding:0 16px 0 0;vertical-align:middle;border-right:2px solid ${colors.gold}">${logo(opts)}</td>
    <td style="padding:0 0 0 16px;vertical-align:middle">${details(opts)}</td>
  </tr>
</table>`
}

// Signature styled like our emails: navy logo band, gold rule, white body, navy footer.
// For webmail signatures — all images must be public URLs (`logoUrl` = transparent logo for the navy band).
export function signatureCardHtml({ name, role, company, phone, whatsapp = true, phones = [], email, website, address, logoUrl }) {
  const people = phone ? [{ name: null, number: phone, whatsapp }] : phones
  const pill = (href, label, bg, fg, border) =>
    `<a href="${esc(href)}" style="display:inline-block;padding:5px 10px;border-radius:4px;background:${bg};color:${fg};border:1px solid ${border};font-family:${SANS};font-size:11px;font-weight:bold;text-decoration:none;line-height:1.2">${label}</a>`
  const personRows = people.map((p, i) => `<tr>
      <td style="padding:9px 0;${i ? `border-top:1px solid ${colors.line};` : ''}font-family:${SANS};vertical-align:middle">
        ${p.name ? `<span style="font-size:13px;font-weight:bold;color:${colors.navy}">${esc(p.name)}</span><br>` : ''}
        <a href="${esc(telHref(p.number))}" style="font-size:13px;color:${colors.text};text-decoration:none;white-space:nowrap">${esc(p.number)}</a>
      </td>
      <td align="right" style="padding:9px 0 9px 12px;${i ? `border-top:1px solid ${colors.line};` : ''}white-space:nowrap;vertical-align:middle">
        ${pill(telHref(p.number), 'Call', '#ffffff', colors.navy, '#C9D0DA')}${p.whatsapp ? `&nbsp;${pill(waHref(p.number), 'WhatsApp', '#25D366', '#ffffff', '#25D366')}` : ''}
      </td></tr>`).join('')

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;border-collapse:separate;border:1px solid ${colors.line};border-radius:8px;overflow:hidden;font-family:${SANS}">
  <tr><td style="background:${colors.navy};padding:16px 20px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:middle"><a href="${esc(website || '#')}" style="text-decoration:none"><img src="${esc(logoUrl)}" width="150" alt="${esc(company)}" style="display:block;width:150px;height:auto;border:0"></a></td>
      <td align="right" style="vertical-align:middle;padding-left:12px">
        ${name ? `<p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:17px;color:${colors.goldLight}">${esc(name)}</p>` : ''}
        ${role ? `<p style="margin:3px 0 0;font-family:${SANS};font-size:10px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;color:#B5C0CE">${esc(role)}</p>` : ''}
      </td>
    </tr></table>
  </td></tr>
  <tr><td style="height:4px;line-height:4px;font-size:0;background:${colors.gold}">&nbsp;</td></tr>
  ${people.length ? `<tr><td style="background:#ffffff;padding:6px 20px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${personRows}</table>
  </td></tr>` : ''}
  <tr><td style="background:${colors.navy};padding:14px 20px" align="center">
    <p style="margin:0 0 4px;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:${colors.goldLight}">${esc(company)}</p>
    ${address ? `<p style="margin:0 0 4px;font-family:${SANS};font-size:11px;line-height:1.5;color:#B5C0CE">${esc(address)}</p>` : ''}
    <p style="margin:0;font-family:${SANS};font-size:11px">${email ? `<a href="mailto:${esc(email)}" style="color:${colors.goldLight};text-decoration:none">${esc(email)}</a>` : ''}${email && website ? ' &nbsp;·&nbsp; ' : ''}${website ? `<a href="${esc(website)}" style="color:${colors.goldLight};text-decoration:none">${esc(website.replace(/^https?:\/\//, ''))}</a>` : ''}</p>
  </td></tr>
</table>`
}

