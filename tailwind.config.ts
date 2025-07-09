module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          50: "#faf8f0",
          100: "#f3efdb",
          200: "#e8dfb8",
          300: "#dbc98a",
          400: "#d1b563",
          500: "#c7a043",
          600: "#b98a36",
          700: "#9a6c2f",
          800: "#7d572d",
          900: "#674829",
          950: "#392514",
        },
      },
      fontFamily: {
        sans: ['"Playfair Display"', "serif"],
        body: ['"Montserrat"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
