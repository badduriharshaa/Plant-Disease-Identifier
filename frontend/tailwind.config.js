/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ai: {
          green: '#10b981',
          dark: '#0f172a',
          darker: '#020617',
          light: '#34d399',
          border: '#334155'
        }
      },
      animation: {
        'scan': 'scan 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(-10%)' },
          '50%': { transform: 'translateY(110%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1, filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))' },
          '50%': { opacity: .5, filter: 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.2))' },
        }
      }
    },
  },
  plugins: [],
}
