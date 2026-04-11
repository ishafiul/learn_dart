# Learn Dart & Flutter — Astro site

Static site generated from markdown under `../dart/`. Each `##` heading in a lesson becomes one slide.

## Commands

```bash
npm install
npm run dev
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment

- `PUBLIC_SITE_URL` — full public URL including path prefix (canonicals + sitemap). Defaults to `https://shafi.dev/learn-dart-flutter` in `astro.config.mjs` when unset.
- `PUBLIC_BASE_PATH` — Astro `base` (mount segment), leading `/` and trailing `/` optional; defaults to `/learn-dart-flutter/`. Internal links use `import.meta.env.BASE_URL` via `sitePath()`.

## Cloudflare Workers

Build output is `dist/`. `wrangler.toml` uses Workers [static assets](https://developers.cloudflare.com/workers/static-assets/) pointing at `./dist`. From this directory:

```bash
npm run deploy
```

Equivalent: `npm run build && wrangler deploy`.

## Content

- Lessons: `../dart/**/**/*.md` (excluding `README.md` from the lesson list unless you link it from a table).
- Order: each level’s `README.md` table column with `[NNNNfile.md]` defines order; other `.md` files append sorted by name.
