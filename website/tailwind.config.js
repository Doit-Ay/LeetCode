/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        leetcode: {
          easy: '#00b8a3',
          medium: '#ffc01e',
          hard: '#ff375f',
          dark: '#1a1a1a',
          darker: '#111111',
          card: '#262626',
          border: '#333333'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
      }
    },
  },
  plugins: [],
}
