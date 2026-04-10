---
name: dev-workflow
description: Use when installing dependencies, running or building the app, configuring .env, seeding a Contentstack stack, or understanding CI workflows.
---

# Dev workflow – Contentstack Kickstart: Next.js Middleware

## When to use

- Setting up or running the project locally
- Documenting or changing npm scripts and environment variables
- Explaining what GitHub Actions run on pull requests

## Instructions

- Install dependencies: `npm install` from the repo root.
- **Scripts** (from `package.json`): `npm run dev` (Next dev server), `npm run build`, `npm run start` (production server after build), `npm run lint`.
- **Environment:** Copy and fill values per the root `README.md` (`NEXT_PUBLIC_CONTENTSTACK_*`). Do not commit real tokens.
- **Stack seeding:** Use the Contentstack CLI flow described in `README.md` (`csdx cm:stacks:seed`, delivery/preview tokens, Live Preview settings).
- **CI (PRs):** `.github/workflows/policy-scan.yml` checks `SECURITY.md` and license files on public repos. `.github/workflows/sca-scan.yml` runs Snyk and Contentstack SCA policy. `.github/workflows/issues-jira.yml` integrates issues with Jira. These workflows do not run `next build`.
