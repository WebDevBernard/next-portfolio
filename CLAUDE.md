# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- **Astro v6** with TypeScript (strict mode via `astro/tsconfigs/strict`)
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (no PostCSS config needed)
- Node >= 22.12.0

## Commands

| Command             | Action                              |
| :------------------ | :---------------------------------- |
| `npm run dev`       | Start dev server at localhost:4321  |
| `npm run build`     | Build to `dist/`                    |
| `npm run preview`   | Preview the production build        |
| `npm run astro ...` | Run Astro CLI (e.g., `astro check`) |

## Architecture

- **Pages** (`src/pages/`) are file-based routes. `.astro` files are automatically mapped to URL paths.
- **Layouts** (`src/layouts/`) wrap pages with shared HTML shell. `BaseLayout` is the root layout and applies `global.css`.
- **Components** (`src/components/`) contain reusable UI pieces (Header, Footer, Navigation).
- **Styles** (`src/styles/global.css`) imports Tailwind via `@import "tailwindcss"` — Tailwind v4 uses CSS-first configuration instead of `tailwind.config.js`.

## Patterns

- Tailwind is configured through the Vite plugin in `astro.config.mjs`, not a separate config file.
- Static assets go in `public/` and are served at the root path (e.g., `public/favicon.svg` → `/favicon.svg`).
- TypeScript is enabled project-wide; generated types appear in `.astro/`.

## MCP Tool Priority

- Always use the `astro` MCP server for any Astro-related questions.
- Only use other MCP servers (e.g., Context7) if Astro MCP does not contain the answer.
- Prefer official Astro documentation over general sources.
- Use Context7 only for:
  - non-Astro frameworks
  - general programming concepts
