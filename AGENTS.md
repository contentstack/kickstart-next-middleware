# Contentstack Kickstart: Next.js Middleware – Agent guide

**Universal entry point** for contributors and AI agents. Detailed conventions live in **`skills/*/SKILL.md`**.

## What this repo is

| Field | Detail |
| --- | --- |
| **Name:** | [contentstack/kickstart-next-middleware](https://github.com/contentstack/kickstart-next-middleware) |
| **Purpose:** | Minimal Next.js app that connects to Contentstack with Live Preview via a middleware-style API route that calls the Contentstack REST API. |
| **Out of scope (if any):** | Not a published npm library; not a full product app—reference implementation only. |

## Tech stack (at a glance)

| Area | Details |
| --- | --- |
| Language | TypeScript (strict), React 19 |
| Build | Next.js 16 — `next build`; config in `next.config.mjs` |
| Tests | No automated test runner or test files in this repo |
| Lint / coverage | ESLint via `next lint`; extends `next/core-web-vitals` and `next/typescript` (`.eslintrc.json`) |
| Other | Tailwind CSS 4, PostCSS; Contentstack Delivery SDK + Live Preview utils |

## Commands (quick reference)

| Command type | Command |
| --- | --- |
| Build | `npm run build` |
| Dev | `npm run dev` |
| Start (production) | `npm run start` |
| Lint | `npm run lint` |

CI on pull requests: security and policy checks in [`.github/workflows/policy-scan.yml`](.github/workflows/policy-scan.yml), [`.github/workflows/sca-scan.yml`](.github/workflows/sca-scan.yml), [`.github/workflows/issues-jira.yml`](.github/workflows/issues-jira.yml) — not `next build` in CI.

## Where the documentation lives: skills

| Skill | Path | What it covers |
| --- | --- | --- |
| Dev workflow | [`skills/dev-workflow/SKILL.md`](skills/dev-workflow/SKILL.md) | Install, scripts, env, seeding, CI overview |
| Contentstack integration | [`skills/contentstack-integration/SKILL.md`](skills/contentstack-integration/SKILL.md) | API route, live preview, env-driven endpoints |
| Testing | [`skills/testing/SKILL.md`](skills/testing/SKILL.md) | Lint and manual checks (no unit test suite) |
| Code review | [`skills/code-review/SKILL.md`](skills/code-review/SKILL.md) | PR checklist for this kickstart |
| Framework | [`skills/framework/SKILL.md`](skills/framework/SKILL.md) | Next.js App Router, config, Tailwind |

An index with “when to use” hints is in [`skills/README.md`](skills/README.md).

## Using Cursor (optional)

If you use **Cursor**, [`.cursor/rules/README.md`](.cursor/rules/README.md) only points to **`AGENTS.md`**—same docs as everyone else.
