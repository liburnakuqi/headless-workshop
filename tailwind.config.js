const { theme } = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    extend: {
      fontFamily: {
        mono: 'var(--font-mono)',
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
        times: 'times',
      },
      colors: {
        primary: {
          50: '#B2B8A1',
          200: '#7C8464',
          500: '#646B4B',
          700: '#483248',
          300: '#301934',
          100: '#E6E6FA'
        },
        secondary: {
          100: '#EFEBE6',
          300: '#CDA66D',
          500: '#F3A756',
          600: '#702963',
        },
        grey: {
          50: '#FFFFFF',
          100: '#F8F8F8',
          200: '#F1F3F4',
          300: '#EDEDED',
          400: '#D9D9D9',
          500: '#CCCCCC',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
