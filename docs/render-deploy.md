# Render Deployment

This project is configured for Render free-tier Static Site hosting.

## Recommended: Static Site

Use the existing `render.yaml` Blueprint.

- Runtime: `static`
- Root directory: `frontend`
- Build command: `npm ci && npm run build:render`
- Publish directory: `out`
- Rewrite rule: `/*` -> `/index.html`

## Environment Variables

- `NEXT_TELEMETRY_DISABLED=1`
- `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY`: optional for realtime collaboration.

If `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY` is missing or still uses the placeholder value, the app runs in local/offline mode so the canvas still works.

## Deploy Steps

1. Push the repository to GitHub.
2. In Render, choose **New +** -> **Blueprint**.
3. Select this repository.
4. Confirm Render detects `render.yaml`.
5. Add `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY` only if realtime collaboration is needed.
6. Deploy.

## Web Service Note

A Render Web Service is not needed for the current app because it has no backend API. Static Site hosting is cheaper, simpler, and avoids free-tier server sleep.
