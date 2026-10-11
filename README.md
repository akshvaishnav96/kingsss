# KINGSSS IMPORT EXPORT LLP — Website (frontend)

React 19 + Vite, MUI, React Router, Motion. Static content only — no backend yet.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
npm run preview
```

## Where things live

- `src/data/` — all editable content (CMS-ready, stable `id`s and `slug`s)
  - `siteContent.js` — page copy, company info, **contact placeholders** (`contact.email` / `phone` enable mailto/tel links once set)
  - `products.js` — products, categories, sample specifications
  - `gallery.js` — gallery items; set `videoSrc` on a video item to enable playback
  - `navigation.js`, `media.js` (every file in `src/assets/images` keyed by name)
- `src/components/` shared UI · `src/pages/` routes · `src/theme/theme.js` brand tokens

## Before launch

- Replace contact/address/social placeholders in `siteContent.js`.
- Confirm product specifications (currently marked as sample information).
- Contact form validates but does not send — wire it to the backend when ready.
- Hosting must rewrite unknown paths to `index.html` (SPA routing).

Photos: Unsplash (Unsplash License). Logo: supplied brand asset, background removed.
