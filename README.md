# Sathappan S — Portfolio

Production-ready personal portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion and next-themes.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS with design-token CSS variables
- Framer Motion for entrance + hover animations
- lucide-react icons
- next-themes (dark default, persisted)
- next/font with Inter (body) + Sora (display)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project structure

```
app/
  layout.tsx        # fonts, metadata, ThemeProvider
  page.tsx          # composes all sections
  globals.css       # tailwind + CSS variables for tokens
components/
  Navbar.tsx
  Hero.tsx
  About.tsx
  Skills.tsx
  Experience.tsx
  Projects.tsx
  EducationAwards.tsx
  Contact.tsx
  Footer.tsx
  ThemeToggle.tsx
  ThemeProvider.tsx
  ui/
    SectionHeader.tsx
    Button.tsx
    Card.tsx
    Chip.tsx
lib/
  data.ts           # ALL portfolio data
  types.ts
  icons.ts
  cn.ts
public/
  resume.pdf        # placeholder — replace with your real resume
```

## Editing content

All copy and links live in `lib/data.ts`. Update `profile`, `skills`, `experience`, `projects`, `education`, `awards`, `navLinks` — components re-render automatically.

## Theming

Tokens are defined in `app/globals.css` as CSS variables (light defaults in `:root`, dark overrides in `.dark`) and consumed by Tailwind via `rgb(var(--token) / <alpha-value>)`. Toggle via `next-themes` (default dark, persisted under `sathappan-theme`).

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — ESLint
