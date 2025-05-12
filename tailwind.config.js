/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#bb945c',     // Golden
        primaryDark: '#a07e4a', // Darker golden for hover states
        secondary: '#181c2a',   // Dark navy blue
        white: '#ffffff',
      },
    },
  },
  plugins: [],
}