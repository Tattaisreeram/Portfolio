/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(ellipse at 20% 20%, rgba(145, 94, 255, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(5, 8, 22, 1) 0%, transparent 100%)",
      },
    },
  },
  plugins: [],
}
