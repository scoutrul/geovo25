/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Цветовая палитра Goevo из макета Figma
        primary: {
          DEFAULT: '#429512',
          dark: '#358a0e',
          light: '#5ca931',
        },
        black: {
          DEFAULT: '#161616',
          50: '#5c5c5c',
          90: '#161616',
        },
        white: {
          DEFAULT: '#ffffff',
          90: '#f6f6f5',
          100: '#ffffff',
        },
        neutral: {
          space: '#1D1D1D',
          dark: '#444444',
          gray: '#a7a7a7',
          medium: '#666666',
          light: '#f2f2f2',
        },
      },
      fontFamily: {
        sans: ['TT Neoris Trial', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // Типографическая система из макета
        'h4': ['46px', { lineHeight: '1.2', fontWeight: '500' }],
        'p1': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'p2': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'p3': ['15px', { lineHeight: '1.6', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        '18': '72px',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'button': '0 2px 8px rgba(66, 149, 18, 0.2)',
        'button-hover': '0 4px 12px rgba(66, 149, 18, 0.3)',
      },
    },
  },
  plugins: [],
}

