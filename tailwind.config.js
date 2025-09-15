/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      colors: {
        night: '#0b0f1a',
        graphite: '#121826',
        dragula: {
          purple: '#6e56cf',
          purpleDark: '#4b3a9b',
          green: '#21fa90',
          greenDark: '#16b973',
          black: '#090d16',
          gray: '#1a2030'
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px 10px rgba(168,85,247,0.15)",
      },
      backgroundSize: {
        '200%': '200% 200%'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      },
      animation: {
        shimmer: 'shimmer 8s ease infinite'
      }
    },
  },
  plugins: [],
}
