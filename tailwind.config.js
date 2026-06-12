/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': '#0A1628',
        'circuit': '#1B4F8A',
        'signal': '#2E7DC8',
        'lab': '#F5F7FA',
        'blueprint': '#EBF3FC',
        'slate-mid': '#637085',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-outfit)', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
