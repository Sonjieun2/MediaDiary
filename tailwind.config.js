/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          400: '#FAF7F5',
          500: '#F0EAE3',
          600: '#E0D3C7',
          700: '#98724D',
          800: '#604932',
        },
        'burgundy': '#B35D5D',
        'green': '#8CC989',
        'orange': '#F1936D',
      },
    },
  },
  plugins: [],
}

