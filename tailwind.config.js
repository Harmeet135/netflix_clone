/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
        // '3xl': '1600px', // Example custom breakpoint for super large screens
      },
    },
  },
  plugins: [],
}

