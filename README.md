# KINGSSS IMPORT EXPORT LLP — Website + Admin CMS

React 19 (Vite, MUI, TanStack Query) frontend, Node.js/Express API, PostgreSQL via Prisma 7, Cloudinary media.

## Quick start

```bash
npm install                 # also generates the Prisma client
cp .env.example .env        # fill in DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD, CLOUDINARY_URL
npm run db:up               # PostgreSQL in Docker (port 5434) — or point DATABASE_URL at your own
npm run db:migrate          # apply migrations
npm run db:seed             # first admin user + original website content and media
npm run dev:server          # API on http://localhost:4000
npm run dev                 # website on http://localhost:5173  (admin: /admin)
```

Production: `npm run build && npm run start` — Express serves the API, uploads and the built site on one port.

## Scripts

| Script | What it does |
|---|---|
| `db:migrate:dev` | Create a migration after editing `server/prisma/schema.prisma` (and regenerate the client) |
| `db:seed -- --force` | Replace all content with the original seed content (users and enquiries are kept) |
| `db:studio` | Prisma Studio — browse the database |

## Structure

```
server/
  prisma/              schema.prisma + migrations
  seed/                seed.js + content/ (original static content, used only for seeding)
  src/
    app.js, index.js   Express app + startup
    config/            env settings
    routes/index.js    every API endpoint, in one place
    controllers/       request → service → response (thin)
    services/          business logic + Prisma queries
    middleware/        auth, same-origin check, rate limiting, uploads, errors
    validators/        input validation
    lib/               prisma client, password hashing, storage drivers (local / cloudinary)
src/
  api/                 endpoints.js (every API call), client.js, queryKeys.js
  hooks/               all page logic as custom hooks (useSite, useContactForm, useGallery, …)
  hooks/admin/         admin data hooks (TanStack Query queries + mutations)
  pages/, pages/admin/ UI only
  components/          public components (+ contact/, gallery/), components/admin/ (+ editor/)
  layouts/             MainLayout, AdminLayout
  routes/              AppRoutes (public), AdminRoutes (lazy-loaded)
  config/admin.js      admin navigation, page groups, collection templates
  lib/                 query client (persisted cache), pure helpers, admin field inference
```

## How content works

- **Settings** — one JSON document per block (`home`, `about`, `contact`, …), edited under *Admin → Pages*.
- **Collections** — ordered items (`products`, `galleryItems`, `services`, `faqs`, `directors`) with publish toggles.
- The site loads everything with one cached request (`GET /api/public/site`, ETag + server memory cache,
  invalidated on every admin save). TanStack Query persists it in `localStorage`, so repeat visits render instantly.
- The admin editor infers field types from the data (images, videos, icons, lists, text), so new fields
  added to content appear in the admin automatically.

## Media

With `CLOUDINARY_URL` set, uploads go to Cloudinary (folder `CLOUDINARY_FOLDER`); images are delivered with
`f_auto,q_auto` resizing and videos get an automatic poster. Without it, uploads are converted to WebP and stored
in `server/uploads/`. Re-run `npm run db:seed -- --force` after setting Cloudinary to move the seed media there too.

## Security notes

Sessions are random tokens stored hashed in Postgres (httpOnly, SameSite=Lax cookie); passwords use scrypt.
Writes require a same-origin request; login and enquiry endpoints are rate-limited (in-memory, per process).
Set `NODE_ENV=production` behind HTTPS so cookies are `Secure`.
