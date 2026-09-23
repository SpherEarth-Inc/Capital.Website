# SpherEarth Capital — Website

Next.js standalone frontend for [capital.spherearth.ca](https://capital.spherearth.ca).

## Stack

- Next.js App Router (standalone output for Railway)
- TypeScript, Tailwind CSS 4
- Feature-based folders: `features/`, `components/`, `lib/content/`

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run test` | Vitest unit tests |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Railway deploy

1. Connect this repo to Railway.
2. Build command: `npm run build`
3. Start command: `npm run start` (Railway sets `PORT`)
4. Set env vars from `.env.example`
5. Point custom domain `capital.spherearth.ca` to the service

`output: "standalone"` is enabled in `next.config.ts` for efficient Node deployment.

## Backend integration

This repo is UI-only. When the Capital API repo is ready:

1. Set `CAPITAL_API_BASE_URL` / `NEXT_PUBLIC_CAPITAL_API_URL`
2. Implement endpoints described in [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md)

Until then, Pre-Assessment and Enquiry submit actions show a clear “backend not connected” toast and keep draft progress in `sessionStorage`.

## Project structure

```
src/
  app/              # Routes (thin)
  components/       # Shared UI, layout, sections, forms
  features/         # Domain modules (pre-assessment, enquiry, analytics)
  lib/              # API client stubs, content, fees, env
  hooks/            # Cross-feature hooks (UTM capture)
  types/            # Shared TypeScript types
```
