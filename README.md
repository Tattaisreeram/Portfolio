# Sreeram | Portfolio

Personal portfolio for Tatta I Sreeram, Backend / Distributed Systems Engineer.

Built with Vite + React 18, three.js / @react-three/fiber, Framer Motion, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # output in /dist
npm run preview    # preview the production build
```

## Deploy on Vercel

1. Push this repository to GitHub.
2. Import the repo on [vercel.com](https://vercel.com). Vercel auto-detects Vite.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Click Deploy.

The `vercel.json` SPA rewrite rule is already in place.

## TODOs before going live

- [ ] Add your resume: copy your PDF to `public/resume.pdf`
- [ ] Configure EmailJS: copy `.env.example` to `.env` and fill in `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
- [ ] Confirm MetalPulse repo casing: `https://github.com/tattaisreeram/MetalPulse`
- [ ] Add real project screenshots to `public/` and swap the procedural gradient headers in `src/components/Works.jsx` (each card has a TODO comment)
- [ ] Swap email in `src/components/Contact.jsx` `to_email` field if needed

## Tech stack

| Layer | Library |
|-------|---------|
| Bundler | Vite 6 |
| UI | React 18 (JSX) |
| 3D | three.js, @react-three/fiber, @react-three/drei |
| Stars | maath random inSphere |
| Animation | Framer Motion |
| Timeline | react-vertical-timeline-component |
| Tilt cards | react-tilt |
| Contact | @emailjs/browser |
| Styling | Tailwind CSS 3 |
| Icons | lucide-react |
| Hosting | Vercel (static) |
