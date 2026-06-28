# Project Grouping (Render-ready)

This codebase is grouped as a small workspace so frontend and backend responsibilities are clear.

## Workspace Layout

- `frontend/`: Next.js application, UI, static assets, and frontend tooling.
- `backend/`: reserved backend workspace for future API, worker, database, or auth services.
- `docs/`: project documentation.
- Root files: workspace scripts, repository policy files, and deployment descriptors.

## Frontend Layers

- `frontend/app/`: Next.js App Router entry, routes, and global styles.
- `frontend/components/`: UI and feature components.
- `frontend/components/ui/`: shared primitive UI components.
- `frontend/lib/`: canvas helpers, keyboard handlers, shape logic, utilities.
- `frontend/hooks/`: reusable React hooks.
- `frontend/constants/`: app constants.
- `frontend/config/`: metadata and app configuration.
- `frontend/types/`: shared TypeScript types.
- `frontend/public/`: static assets served by Next.js.

## Platform and Build

- `package.json`: root workspace scripts that delegate to frontend/backend.
- `frontend/package.json`: frontend scripts and dependencies.
- `frontend/tsconfig.json`: TypeScript and alias config.
- `frontend/next.config.mjs`: Next.js runtime config.
- `frontend/tailwind.config.ts`, `frontend/postcss.config.mjs`: styling pipeline.
- `frontend/eslint.config.mjs`, `frontend/.eslintrc.json`: lint setup.
- `backend/package.json`: backend workspace placeholder scripts.

## Deployment Group

- `render.yaml`: Render Blueprint for a free-tier Static Site.
- `.renderignore`: files/folders excluded from Render context upload.
- `netlify.toml`: optional legacy deployment config.

## Required Environment Variables

- `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY`: Liveblocks public key.
- `NEXT_TELEMETRY_DISABLED=1`: optional telemetry disable flag.

## Common Commands

- Root dev: `npm run dev`
- Root build: `npm run build`
- Root lint: `npm run lint`

## Render Free Tier Static Site

- Build: `cd frontend && npm install --legacy-peer-deps --no-audit --no-fund && npm run build:render`
- Publish directory: `frontend/out`

Render runs the build from the repository root using explicit `frontend` paths in `render.yaml`.
