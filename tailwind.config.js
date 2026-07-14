/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kai': {
          'dark': '#2A2B30',      // page background
          'deeper': '#232228',    // navbar / footer / headers
          'surface': '#33333B',   // cards / raised panels
          'ink': '#16171B',       // structural borders + text on accent
          'text': '#F2F3F5',
          'muted': '#A9ADB4',
          'red': '#D42424',
          'red-hover': '#B81E1E',
          'teal': '#24D4D4',      // secondary accent
          'purple': '#2E2A45',    // deep accent surface / gradients
          'line': '#3A3B44',
        }
      },
      fontFamily: {
        'sans': ['Google Sans', 'Google Sans Text', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neo-sm': '0 2px 6px 0 rgba(0, 0, 0, 0.25)',
        'neo': '0 8px 24px 0 rgba(0, 0, 0, 0.35)',
        'neo-lg': '0 18px 50px 0 rgba(0, 0, 0, 0.45)',
        'glow': '0 0 24px 0 rgba(212, 36, 36, 0.4)',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
