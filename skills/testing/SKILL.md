---
name: testing
description: Use when verifying changes without relying on an automated unit or e2e suite in this repo.
---

# Testing – Contentstack Kickstart: Next.js Middleware

## When to use

- Deciding how to validate a change before merge
- Documenting that there is no Jest/Vitest/Playwright script in `package.json`

## Instructions

- **Automated:** Run `npm run lint` (ESLint via Next). There is no `npm test` or checked-in `*.test.ts` / `__tests__` layout.
- **Manual:** After `npm run dev`, open `http://localhost:3000`. For preview flows, use Contentstack Entries and Live Preview / Visual Builder as in `README.md`.
- **Secrets:** Use local `.env` only; never commit delivery or preview tokens.
