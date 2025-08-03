/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'top center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'bottom center'
          }
        }
      },
      
      animation: {
        'gradient-xy': 'gradient-xy 15s ease infinite'
      }
    },
  },
  plugins: [],
}