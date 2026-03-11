# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 16** thesis portfolio website documenting VLA (Vision-Language-Action) research for bimanual LEGO assembly using the EO-1 model and Unitree H1 humanoid robot.

## Development Commands

```bash
npm run dev      # Start webpack-based development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment Note

- Do **not** use `next/font/google` in this repo. It can fail production builds and Vercel deployments when Google Fonts cannot be fetched at build time.
- Prefer a system font stack or bundled local fonts via `next/font/local` so `npm run build` stays fully self-contained.
- The root-level `Phase*.md` files are build-time inputs for roadmap detail pages. They must stay committed and must not be left ignored by `.gitignore`.
- When adding a new roadmap markdown source such as `Phase4.1.md`, make sure the file is tracked by git before deploying, or Vercel prerendering will fail with `ENOENT`.
- Use webpack for local `npm run dev`. Turbopack currently glitches/panics on the roadmap route in local development, which can make navbar navigation appear broken even when the route code is fine.

## Architecture

### Tech Stack
- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (using `@import "tailwindcss"` syntax, no config file)
- **Animations:** Framer Motion
- **Markdown:** react-markdown with remark-gfm

### Directory Structure

```
website/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Navigation + Footer wrapper)
│   ├── page.tsx            # Homepage with hero section
│   ├── task/               # Task Definition page
│   ├── sota/               # State-of-the-Art Analysis page
│   ├── limitations/        # Limitations & Future page
│   └── roadmap/            # Roadmap pages (includes nested routes like phase-0-1/)
├── components/             # React components
│   ├── Navigation.tsx      # Global navbar
│   ├── Footer.tsx          # Global footer
│   ├── MarkdownRenderer.tsx
│   ├── Section.tsx
│   ├── roadmap/            # Roadmap-specific components (PhaseSection, TimelineItem, etc.)
│   ├── sota/               # SOTA-specific components (FeatureCarousel, GroupedBarChart, etc.)
│   └── task/               # Task-specific components (ChallengeCard, MetricTable, etc.)
├── content/                # Data files (TypeScript)
│   ├── roadmap-data.ts     # Roadmap phases, milestones, tasks
│   ├── sota-data.ts        # SOTA analysis data
│   ├── task-definition-data.ts
│   └── limitations-data.ts
└── public/                 # Static assets
```

### Key Patterns

1. **Content-Component Separation:** Data lives in `content/*.ts` files with TypeScript interfaces. Components import and render this data.

2. **Route-Specific Components:** Each major section (roadmap, sota, task) has its own component subfolder with specialized UI components.

3. **Dark Theme:** The site uses a dark theme by default with:
   - Background: `#161316`
   - Primary accent: `#FF6D29` (orange)
   - Secondary: `#453027` (dark brown)
   - Text: `#FFFFFF` (primary), `#BABABA` (secondary)

4. **Tailwind v4 Syntax:** Theme customization is in `app/globals.css` using `@theme inline {}` blocks, not a separate config file.

### Path Alias

`@/*` maps to the project root (e.g., `@/components/Navigation`).
