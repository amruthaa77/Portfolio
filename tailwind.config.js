/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F6F4EF',
          secondary: '#EFECE6',
        },
        ink: {
          DEFAULT: '#0E0E0E',
          muted: '#6B6862',
        },
        editorial: {
          border: 'rgba(0, 0, 0, 0.12)',
        },
        accent: {
          green: '#0B5D3B',
          greenHover: '#08492E',
          greenLight: 'rgba(11, 93, 59, 0.08)',
        },
      },
      fontFamily: {
        anton: ['"Anton"', '"Barlow Condensed"', 'sans-serif'],
        sans: ['"Inter"', '"DM Sans"', 'sans-serif'],
        serif: ['"Instrument Serif"', '"DM Serif Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        editorial: '0.2em',
      },
      boxShadow: {
        subtle: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        card: '0 4px 20px -4px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
