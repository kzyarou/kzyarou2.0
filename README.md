# kzyarou.dev

Personal developer portfolio built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Backend:** Firebase (Auth + Firestore)
- **Routing:** React Router DOM

## Features

- Animated splash screen with typewriter effect
- System monitor widget (live uptime, memory, network stats)
- Project showcase with detail pages
- Contact/feedback forms with Firebase integration
- Admin dashboard for analytics
- GitHub-inspired dark theme with scanline overlay
- Page transition animations
- Visit tracking

## Project Structure

```
src/
├── components/     # Reusable UI components (Hero, About, Skills, etc.)
├── pages/          # Route pages (Home, Login, Admin, etc.)
├── lib/            # Utilities, auth context, Firestore helpers
├── data/           # Static data
└── index.css       # Global styles with GitHub dark theme vars
```

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Scripts

- `dev` - Start development server
- `build` - Production build
- `preview` - Preview production build
- `lint` - Run ESLint
