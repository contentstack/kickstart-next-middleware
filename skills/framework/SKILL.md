---
name: framework
description: Use when working with Next.js App Router, next.config, TypeScript paths, or Tailwind/PostCSS in this repo.
---

# Framework – Contentstack Kickstart: Next.js Middleware

## When to use

- Adding routes, layouts, or components under `app/`
- Changing image domains, bundler, or strict TypeScript settings
- Styling with Tailwind or global CSS

## Instructions

- **App Router:** Routes live under `app/` (e.g. `app/page.tsx`, `app/layout.tsx`, `app/api/.../route.ts`). There is no `src/` directory.
- **Imports:** Path alias `@/*` maps to the repo root (`tsconfig.json` `paths`).
- **Next config:** `next.config.mjs` sets `images.remotePatterns` for Contentstack image hosts (`images.contentstack.io`, `*-images.contentstack.com`, or `NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME` when set).
- **Styling:** Tailwind CSS v4 with PostCSS (`postcss.config.mjs`); global styles in `app/globals.css`.
- **TypeScript:** `strict` is enabled; JSX is `react-jsx`.
