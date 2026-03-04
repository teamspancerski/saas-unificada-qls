/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        neon: '#00ff88',
        blueAccent: '#00d4ff',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)' },
          '50%': { opacity: 0.7, boxShadow: '0 0 40px rgba(0, 255, 136, 0.8)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
