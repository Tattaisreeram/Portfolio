# Sreeram — Personal Portfolio

Personal portfolio for Tatta I Sreeram, Backend / Distributed Systems Engineer.

Built with React 18, Three.js, Framer Motion and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # preview the built output
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project on [vercel.com](https://vercel.com).
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. The `vercel.json` SPA rewrite handles client-side routing.

## TODOs before going live

- `public/resume.pdf` — drop your real resume PDF here. Current file is a placeholder.
- `src/components/Nav.tsx` — the Resume button links to `/resume.pdf`. Update if the path changes.
- `src/components/Contact.tsx` — the Email button points to `tattaisreeram@gmail.com`. Swap if needed.
- `src/data/projects.ts` — confirm the MetalPulse GitHub repo URL (`https://github.com/tattaisreeram/MetalPulse`).

## Tech stack

| Layer | Library |
|-------|---------|
| Bundler | Vite 6 |
| UI | React 18 + TypeScript |
| 3D | Three.js via @react-three/fiber + @react-three/drei |
| Animation | Framer Motion |
| Styling | Tailwind CSS 3 |
| Icons | lucide-react |
| Hosting | Vercel (static) |
