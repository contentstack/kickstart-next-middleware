---
name: contentstack-integration
description: Use when changing how the app talks to Contentstack—middleware API route, live preview, or entry fetching.
---

# Contentstack integration – Contentstack Kickstart: Next.js Middleware

## When to use

- Editing the server route that proxies Contentstack
- Adjusting live preview or `getPage` behavior
- Debugging API keys, tokens, regions, or preview vs delivery hosts

## Instructions

- **Middleware-style API:** `app/api/middleware/route.ts` exposes `GET`. Query params include `content_type_uid`, `url`, and optionally `live_preview`, `preview_timestamp`. It builds `https://{hostname}/v3/content_types/{uid}/entries?...` and sends headers: `api_key`, `access_token`; for preview also `live_preview`, `preview_token`, and optionally `preview_timestamp`.
- **Hosts:** If `NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST` and `NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY` are set, those hostnames are used; otherwise region comes from `NEXT_PUBLIC_CONTENTSTACK_REGION` via `@timbenniks/contentstack-endpoints` and `getContentstackEndpoints`.
- **Delivery SDK in the route:** `@contentstack/delivery-sdk` is used for `contentstack.Utils.addEditableTags` when preview is enabled, not for the HTTP fetch to Contentstack.
- **Client-side bridge:** `lib/contentstack.ts` calls `initLivePreview` from `@contentstack/live-preview-utils` (builder mode, `ssr: false`) and `getPage`, which `fetch`es `${baseUrl}/api/middleware` with `content_type_uid`, `url`, and live-preview hash / `preview_timestamp` when present.
- **Types:** Entry shape helpers live in `lib/types.ts` (e.g. `Page`).
