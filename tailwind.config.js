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
        cream: {
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F5F3F0',
          300: '#E8E5E1',
        },
        stone: {
          400: '#B8B5B0',
          500: '#8A8785',
          600: '#5C5A58',
        },
        charcoal: {
          700: '#3D3D3D',
          800: '#2D2D2D',
          900: '#1A1A1A',
        },
        sage: {
          100: '#E8F0E4',
          200: '#C5D9BC',
          300: '#9CAF88',
          400: '#7D9A68',
          500: '#5E8548',
        },
        rose: {
          100: '#F5E6E6',
          200: '#E8CCCC',
          300: '#D4A5A5',
          400: '#C08080',
        },
        lavender: {
          100: '#EDE8F2',
          200: '#D4C9E0',
          300: '#B8A9C9',
          400: '#9C89B2',
        },
        emotion: {
          anger: '#E57373',
          grief: '#9575CD',
          love: '#F48FB1',
          regret: '#90A4AE',
          relief: '#81C784',
          fear: '#7986CB',
          hope: '#FFD54F',
          confusion: '#4DD0E1',
          gratitude: '#FFB74D',
          longing: '#B39DDB',
          peace: '#A5D6A7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
