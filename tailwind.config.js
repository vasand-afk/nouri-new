/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'brand-green': '#1A6B3C',
        'brand-light': '#E8F5EE',
        'brand-cream': '#FAFAF7',
        'accent-amber': '#F59E0B',
        'text-primary': '#1A1A1A',
        'text-muted': '#6B7280',
      },
    },
  },
  plugins: [],
};
