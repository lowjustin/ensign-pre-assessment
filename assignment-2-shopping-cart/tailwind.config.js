/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        red: "#f00",
        blue: "#b6d4f0",
        "blue-light": "#dbeeff",
        "blue-dark": "#6c88a3",
        brown: "#a3885b",
        "brown-light": "#f0dab6",
        gray: "#666",
        "gray-light": "#ccc",
        "gray-dark": "#333",
      },
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
