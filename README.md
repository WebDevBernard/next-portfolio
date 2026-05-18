# New Astro V6 Portfolio

Personal portfolio site originally built with Next.js and migrated to [Astro](https://astro.build) v6 using DeepSeek, for better performance, simpler architecture, and reduced client-side JavaScript.

**[bernardyang.com](https://bernardyang.com)**

## Development

This project uses [Claude Code](https://claude.ai/code) with the DeepSeek V4 Pro API and MCP servers for AI-assisted development:

- **Astro MCP** — official Astro docs for framework-specific questions
- **Context7 MCP** — general programming concepts and non-Astro documentation

## Commands

| Command               | Action                                           |
| --------------------- | ------------------------------------------------ |
| `npm run dev`         | Start dev server at `localhost:4321`             |
| `npm run build`       | Production build to `dist/`                      |
| `npm run preview`     | Preview production build locally                 |
| `npm run astro check` | Type-check all `.astro`, `.ts`, and `.tsx` files |

## Migration Notes

This project was originally built as a Next.js application and was migrated to Astro using DeepSeek. The migration involved:

- Moving from Next.js file-based routing to Astro's `src/pages/` routing
- Converting the Next.js layout to `BaseLayout.astro` with slot-based content
- Replacing Next.js `Image` and `Link` components with native HTML elements
- Adopting Tailwind v4's CSS-first configuration (no `tailwind.config.js`)
- Adding `astro check` for type safety (Next.js uses `tsc --noEmit`)
- Using `client:load` directives for interactive React islands instead of the Next.js hydration model
- Replacing Next.js API routes with Astro API endpoints (`src/pages/api/`)
- Upgrading Zod from v3 to v4 (`required_error` → `error` callback, `z.string().email()` → `z.email()`)
