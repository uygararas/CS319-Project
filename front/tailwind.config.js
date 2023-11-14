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
      'default-background': '#f1f2ed',
      'navbar-border-shadow': '#9e9e9e',
    },
    extend: {},
  },
  plugins: [flowbite],
}