/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#0A0C10',
        panel: '#11141B',
        border: '#1E2430',
        gold: '#E8B04B',
        teal: '#2DD4BF',
        textPrimary: '#E6EAF0',
        textMuted: '#8A93A6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        content: '1100px',
      },
      backgroundImage: {
        'radial-vignette': 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
      },
    },
  },
  plugins: [],
}
