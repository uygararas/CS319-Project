import flowbite from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    colors: {
      'dark-royal-blue': '#002366',
      'gold': '#FFD700',
    },
    extend: {},
  },
  plugins: [flowbite],
}