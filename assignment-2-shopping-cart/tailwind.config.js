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
        red: "#721c24",
        "red-medium": "#f5c6cb",
        "red-light": "#f8d7da",
        green: "#155724",
        "green-medium": "#c3e6cb",
        "green-light": "#d4edda",
        blue: "#004085",
        "blue-medium": "#b8daff",
        "blue-light": "#cce5ff",
        brown: "#a3885b",
        "brown-light": "#f0dab6",
        gray: "#666",
        "gray-light": "#ccc",
        "gray-dark": "#333",
        "gray-extralight": "#efefef",
      },
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
