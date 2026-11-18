/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFCF7',
          100: '#F9F6F0',
          200: '#F2EDE4',
          300: '#E7DFD3',
          400: '#D5C7B5',
        },
        cream: {
          50: '#FAF8F5',
          100: '#F5EFEB',
          200: '#EFE6DD',
          300: '#E2D4C3',
          400: '#CBB69E',
          500: '#B5997E',
        },
        espresso: {
          950: '#120D0A',
          900: '#1C140F',
          850: '#241B15',
          800: '#2E221B',
          700: '#433328',
          600: '#5C4638',
          500: '#7B5E4B',
          400: '#A0806B',
          300: '#C5AA96',
        },
        olive: {
          900: '#17221B',
          800: '#233329',
          700: '#32483B',
          600: '#466251',
          500: '#5F826D',
          100: '#E8EFEA',
          50: '#F3F7F4',
        },
        antiqueGold: {
          600: '#9B7846',
          500: '#B8935D',
          400: '#D1AC77',
          300: '#E3C79B',
          200: '#F0DEC1',
          100: '#FAF2E6',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Didot', '"Bodoni MT"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        'luxury': '0.25em',
        'ultra': '0.35em',
      },
    },
  },
  plugins: [],
}
