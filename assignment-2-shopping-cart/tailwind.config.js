/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'red': '#f00',
        'blue': '#b6d4f0',
        'blue-light': '#dbeeff',
        'blue-dark': '#6c88a3',
        'brown': '#a3885b',
        'brown-light': '#f0dab6',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
        'gray-dark': '#273444',
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
