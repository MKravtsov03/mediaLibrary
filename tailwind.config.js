/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*{.js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1200px"
    },
  },
  plugins: [],
}

