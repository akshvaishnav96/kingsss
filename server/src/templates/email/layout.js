// Email-safe building blocks: table layout + inline styles (Gmail/Outlook/Apple Mail).
export const LOGO_CID = 'kingsss-logo'
export const logoAttachment = { filename: 'kingsss-logo.png', path: new URL('./logo.png', import.meta.url).pathname, cid: LOGO_CID }
// Logo on a navy panel (same file as the public /logo.png) — readable on white, used by signatures.
export const LOGO_PANEL_CID = 'kingsss-logo-panel'
export const logoPanelAttachment = { filename: 'kingsss-logo-panel.png', path: new URL('../../../../public/logo.png', import.meta.url).pathname, cid: LOGO_PANEL_CID }

const C = { navy: '#071D33', navy2: '#0B2744', gold: '#D6AD52', goldLight: '#F4D58A', goldText: '#A9843A', soft: '#F5F7FA', text: '#465467', muted: '#8A94A3', line: '#E6EAF0' }
export const colors = C
const SERIF = "Georgia,'Times New Roman',serif"
const SANS = "Arial,Helvetica,sans-serif"

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
export const oneLine = (s) => String(s ?? '').replace(/[\r\n]+/g, ' ').trim()
export const nl2br = (s) => esc(s).replace(/\r?\n/g, '<br>')

export function button(href, label, variant = 'gold') {
  const styles = {
    gold: `background:${C.gold};color:${C.navy};border:1px solid ${C.gold}`,
    navy: `background:${C.navy};color:#ffffff;border:1px solid ${C.navy}`,
    outline: `background:#ffffff;color:${C.navy};border:1px solid #C9D0DA`,
    whatsapp: 'background:#25D366;color:#ffffff;border:1px solid #25D366',
  }[variant]
  return `<a href="${esc(href)}" target="_blank" style="${styles};display:inline-block;padding:12px 22px;border-radius:4px;font-family:${SANS};font-size:14px;font-weight:bold;text-decoration:none;line-height:1.2;mso-padding-alt:0">${esc(label)}</a>`
}

export const smallButton = (href, label, variant) => button(href, label, variant).replace('padding:12px 22px', 'padding:7px 12px').replace('font-size:14px', 'font-size:12px')

export const heading = (text, size = 26) => `<h1 style="margin:0 0 12px;font-family:${SERIF};font-size:${size}px;line-height:1.25;font-weight:normal;color:${C.navy}">${text}</h1>`
export const eyebrow = (text) => `<p style="margin:0 0 10px;font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;color:${C.goldText}">${esc(text)}</p>`
export const paragraph = (html, extra = '') => `<p style="margin:0 0 16px;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.text};${extra}">${html}</p>`

export function detailsTable(rows) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.line};border-radius:6px;border-collapse:separate;overflow:hidden">
  ${rows.filter(Boolean).map(([label, value], i) => `<tr>
    <td style="padding:12px 16px;width:110px;background:${C.soft};font-family:${SANS};font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${C.muted};vertical-align:top;${i ? `border-top:1px solid ${C.line}` : ''}">${esc(label)}</td>
    <td style="padding:12px 16px;font-family:${SANS};font-size:15px;color:${C.navy};vertical-align:top;word-break:break-word;${i ? `border-top:1px solid ${C.line}` : ''}">${value}</td>
  </tr>`).join('')}
  </table>`
}

export const messageBox = (label, text) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px"><tr>
  <td style="background:${C.soft};border-left:4px solid ${C.gold};border-radius:0 6px 6px 0;padding:16px 18px">
    <p style="margin:0 0 6px;font-family:${SANS};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;color:${C.muted}">${esc(label)}</p>
    <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.navy}">${nl2br(text)}</p>
  </td></tr></table>`

export const divider = () => `<tr><td style="padding:0 24px"><div style="height:1px;line-height:1px;background:${C.line}">&nbsp;</div></td></tr>`

// Logo: the public /logo.png once the site is live (PUBLIC_SITE_URL), otherwise the inline attachment.
export const logoSrc = (siteUrl) => (siteUrl ? `${siteUrl}/logo-transparent.png` : `cid:${LOGO_CID}`)

export function emailLayout({ preheader, badge, body, brand, siteUrl }) {
  const { name, contact = {} } = brand
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>${esc(name)}</title></head>
<body style="margin:0;padding:0;background:#E9EDF2">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E9EDF2"><tr><td align="center" style="padding:28px 12px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 8px 30px rgba(7,29,51,.08)">
    <tr><td align="center" style="background:${C.navy};padding:28px 24px 24px">
      <a href="${esc(siteUrl || '#')}" target="_blank" style="text-decoration:none"><img src="${logoSrc(siteUrl)}" width="220" alt="${esc(name)}" style="display:block;width:220px;max-width:70%;height:auto;border:0"></a>
      ${badge ? `<p style="margin:18px 0 0"><span style="display:inline-block;padding:5px 12px;border:1px solid ${C.gold};border-radius:20px;font-family:${SANS};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${C.goldLight}">${esc(badge)}</span></p>` : ''}
    </td></tr>
    <tr><td style="height:4px;line-height:4px;font-size:0;background:${C.gold}">&nbsp;</td></tr>
    ${body}
    <tr><td style="background:${C.navy};padding:24px" align="center">
      <p style="margin:0 0 6px;font-family:${SERIF};font-size:16px;color:${C.goldLight}">${esc(name)}</p>
      ${contact.address ? `<p style="margin:0 0 6px;font-family:${SANS};font-size:12px;line-height:1.6;color:#B5C0CE">${esc(contact.address)}</p>` : ''}
      ${contact.email ? `<p style="margin:0;font-family:${SANS};font-size:12px"><a href="mailto:${esc(contact.email)}" style="color:${C.goldLight};text-decoration:none">${esc(contact.email)}</a>${siteUrl ? ` &nbsp;·&nbsp; <a href="${esc(siteUrl)}" style="color:${C.goldLight};text-decoration:none">${esc(siteUrl.replace(/^https?:\/\//, ''))}</a>` : ''}</p>` : ''}
    </td></tr>
  </table>
  <p style="margin:16px 0 0;font-family:${SANS};font-size:11px;color:${C.muted}">© ${new Date().getFullYear()} ${esc(name)}. Freshness Without Borders.</p>
</td></tr></table>
</body></html>`
}

// Horizontal padding is 24px so content fits narrow phone screens; vertical padding comes from `padding`.
export const section = (html, padding = '32px') => `<tr><td style="padding:${padding.split(' ')[0]} 24px ${padding.split(' ')[2] ?? padding.split(' ')[0]}">${html}</td></tr>`

