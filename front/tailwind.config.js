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
      'blue-text': '#1e3a8a',
      'blue-hover-text': '#3b82f6',
    },
    extend: {},
  },
  plugins: [flowbite],
}