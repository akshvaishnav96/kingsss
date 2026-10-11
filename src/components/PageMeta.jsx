// React 19 hoists <title> and <meta> into <head>.
export default function PageMeta({ title, description }) {
  const fullTitle = title ? `${title} | KINGSSS IMPORT EXPORT LLP` : 'KINGSSS IMPORT EXPORT LLP — Freshness Without Borders'
  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
    </>
  )
}
