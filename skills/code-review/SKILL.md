---
name: code-review
description: Use when reviewing or authoring a pull request for this kickstart.
---

# Code review – Contentstack Kickstart: Next.js Middleware

## When to use

- Preparing a PR or reviewing someone else’s changes
- Checking security and behavior of the Contentstack proxy

## Instructions

- Confirm new or changed env vars are documented and not committed with real values.
- For `app/api/middleware/route.ts`: validate query param handling, HTTP errors (e.g. 404 when no entry), and JSON parsing assumptions.
- Remember all `NEXT_PUBLIC_*` values are exposed to the browser—avoid putting non-public secrets there.
- Run `npm run lint` locally; align with existing TypeScript and React patterns in `app/` and `components/`.
