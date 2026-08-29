module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#0B0C0E',
          surface: '#121418',
          card: '#16191E',
          hover: '#1D2128',
          border: '#242830'
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E6C453',
          dark: '#AA8820',
          glow: 'rgba(212, 175, 55, 0.15)'
        },
        text: {
          primary: '#F4F4F6',
          secondary: '#9EA3B0',
          muted: '#636A79'
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#3B82F6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
