/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors :{
        "themeColor" :  "#1d062f"
      }

    },
  },

  plugins: [
    require("@headlessui/react"),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

