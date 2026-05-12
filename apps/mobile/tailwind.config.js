/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1A3C8F',
        'accent-blue': '#2563EB',
      },
    },
  },
  plugins: [],
};
