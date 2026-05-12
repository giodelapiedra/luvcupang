/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['PlusJakartaSans_400Regular'],
        medium: ['PlusJakartaSans_500Medium'],
        semibold: ['PlusJakartaSans_600SemiBold'],
        bold: ['PlusJakartaSans_700Bold'],
        extrabold: ['PlusJakartaSans_800ExtraBold'],
        display: ['Syne_700Bold'],
        'display-extra': ['Syne_800ExtraBold'],
      },
      colors: {
        navy: '#0A1628',
        brand: '#1A3C8F',
        accent: '#2563EB',
        sky: '#DBEAFE',
      },
    },
  },
  plugins: [],
};
