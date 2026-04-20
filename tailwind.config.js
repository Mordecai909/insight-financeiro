/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F2F0E9', // Creme
        primary: '#2E4036',    // Musgo
        accent: '#CC5833',     // Argila
        dark: '#1A1A1A',       // Carvão
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        drama: ['"Cormorant Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
