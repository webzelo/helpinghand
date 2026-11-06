<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Helping Hand

Next.js 16 App Router site (currently a single landing route). UI is shadcn's `base-nova` style generated on **Base UI** (`@base-ui/react`), not Radix.

## Commands

- `npm run dev` — Turbopack dev server; `npm run build` / `npm start` for production.
- `npm run lint` — flat ESLint config. Lint one file with `npx eslint src/app/page.tsx`.
- `npx tsc --noEmit` — typecheck. No `typecheck` script and no test runner is configured; `npm run build` is the full verification (it also runs TypeScript).

## Gotchas

- `npm run lint` currently exits 1 on pre-existing shadcn code: `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts` (`react-hooks/set-state-in-effect`). Don't treat those as regressions from your change.
- Route types (`LayoutProps<"/">`, typed routes) are generated into `.next/types` / `.next/dev/types`, and `next-env.d.ts` is generated + gitignored. On a fresh checkout run `npm run dev` or `npm run build` before `tsc`, otherwise types are missing.
- Import `cn` from `"cn"` directly — that is what every UI file does. `src/lib/utils.ts` only re-exports it.
- Add shadcn components with `npx shadcn@latest add <name>` so `components.json` (`base-nova`, RSC, lucide, `@/components` / `@/components/ui` / `@/lib` / `@/hooks`) is respected. Hand-written Radix APIs won't match these Base UI primitives.
- Tailwind v4 is CSS-first: no `tailwind.config.*` and no PostCSS config. Theme tokens and the dark variant live in `src/app/globals.css`; Tailwind is wired through the `turbopack.rules` entry in `next.config.ts`.
- Fonts: DM Sans → `font-sans` (`--font-dm-sans`), DM Serif Display → `font-heading` (`--font-dm-serif-display`), set in `layout.tsx` and mapped in `globals.css`. Use `font-heading` for display text.
- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler`. With Cache Components, uncached data (`fetch`, `connection()`) outside `<Suspense>` blocks prerendering and fails `next build`; use `"use cache"` + `cacheLife` or stream below `<Suspense>`.
- ESLint enforces React Compiler-style hook rules (e.g. no synchronous `setState` inside an effect). Prefer lazy state initialization or event handlers over `eslint-disable`.

## Layout

- `src/app` — routes, root layout, metadata.
- `src/components/ui` — vendored shadcn components; prefer regenerating over rewriting.
- `src/hooks`, `src/lib` — shared hooks/helpers (`highlighter` lazy-loads Shiki). `@/*` maps to `src/*`.
