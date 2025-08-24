# Repository Guidelines

## Project Structure & Module Organization

- `app/`: Next.js App Router pages and API routes (e.g., `app/api/contact/route.tsx`, `app/blog/[slug]/page.tsx`).
- `components/`: Reusable React components; UI primitives live under `components/ui/`.
- `lib/`: Utilities and integrations (e.g., `lib/env.ts` for env validation, `lib/github.ts` for GitHub data).
- `data/`: Static content sources (`data/projects.ts`, `data/skills.ts`).
- `public/`: Static assets and OG images.
- `types/`: Shared TypeScript definitions.
- Import alias: `@/*` maps to repo root (see `tsconfig.json`).

## Build, Test, and Development Commands

- `npm run dev`: Start the Next.js dev server with Turbopack.
- `npm run build`: Create a production build.
- `npm start`: Run the production server locally.
- `npm run format`: Format the codebase with Prettier + Tailwind plugin.

## Coding Style & Naming Conventions

- **Language**: TypeScript; prefer functional React components. Server Components by default; add `"use client"` only when needed.
- **Styling**: Tailwind CSS v4. Keep styles in JSX classes; use `app/global.css` for globals.
- **Formatting**: Prettier 3 and `prettier-plugin-tailwindcss` enforce ordering and 2-space indentation. Run `npm run format` before commits.
- **Naming**: Files are kebab-case (e.g., `project-card.tsx`, `mobile-nav.tsx`). Co-locate related UI in `components/` and route-specific code under `app/`.
- **Imports**: Prefer `@/` alias for local modules.

## Testing Guidelines

- No test suite is included yet. If adding tests, use Vitest + React Testing Library or Playwright for e2e.
- Name tests `*.test.ts(x)` and colocate near the unit or under `__tests__/`.
- Aim to cover critical rendering paths (routes in `app/`) and lib utilities.

## Commit & Pull Request Guidelines

- **Commits**: Use concise, conventional types (e.g., `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`). Optional scope (e.g., `feat(env): ...`). Subject in imperative mood, ~72 chars.
- **PRs**: Include a clear description, linked issues, and screenshots/GIFs for UI changes. Note any env var or migration impact. Ensure `npm run build` and `npm run format` pass.

## Security & Configuration Tips

- Required env vars validated in `lib/env.ts`: `RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL`, `RECAPTCHA_SECRET_KEY`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `GITHUB_TOKEN`, `GITHUB_USERNAME`.
- Store secrets in `.env.local` (not committed). Missing/invalid vars will throw at runtime via Zod validation.
