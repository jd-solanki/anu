const { iconsPlugin } = require("@egoist/tailwindcss-icons")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,md,js,ts,jsx,tsx}",
    "**/anu-vue.js**",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    iconsPlugin(),
  ],
}

