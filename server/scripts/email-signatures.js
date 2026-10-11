// Generates copy-paste email signatures (one per team phone contact + a company one) into ./email-signatures/.
//   npm run email:signatures
// Open a file in the browser, select all (Ctrl+A), copy, and paste into the webmail signature settings.
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { prisma } from '../src/lib/prisma.js'
import { slugify } from '../src/lib/http.js'
import { signatureCardHtml } from '../src/templates/email/signature.js'
import { loadBrand } from '../src/services/mail.service.js'

const site = (process.env.PUBLIC_SITE_URL || 'https://kingsssimportexportllp.com').replace(/\/$/, '')
const outDir = path.resolve(import.meta.dirname, '../../email-signatures')

const page = (title, html) => `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title></head><body style="margin:24px;background:#fff">${html}</body></html>\n`

try {
  const brand = await loadBrand()
  const directors = await prisma.item.findMany({ where: { collection: 'directors' } })
  const roleFor = (phoneId) => directors.find((d) => d.data.phoneId === phoneId)?.data.role
  const common = { company: brand.name, email: brand.contact.email, website: site, address: brand.contact.address, logoUrl: process.env.SIGNATURE_LOGO_URL || `${site}/logo-transparent.png` }

  await mkdir(outDir, { recursive: true })
  // Company signature lists the directors' numbers (in the same order as on the website).
  const directorPhones = directors.sort((a, b) => a.position - b.position).map((d) => (brand.contact.phones ?? []).find((p) => p.id === d.data.phoneId)).filter(Boolean)
  const files = [['company', page(`${brand.name} signature`, signatureCardHtml({ ...common, name: `Team ${brand.name.split(' ')[0]}`, phones: directorPhones }))]]
  for (const p of brand.contact.phones ?? []) {
    files.push([slugify(p.name), page(`${p.name} signature`, signatureCardHtml({ ...common, name: p.name, role: roleFor(p.id), phone: p.number, whatsapp: p.whatsapp }))])
  }
  for (const [name, html] of files) await writeFile(path.join(outDir, `${name}.html`), html)
  console.log(`Wrote ${files.length} signatures to ${outDir} (logo: ${common.logoUrl})`)
} finally {
  await prisma.$disconnect()
}
