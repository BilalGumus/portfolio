/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home': "url('../assets/images/cat.jpg')",
        'contact': "url('../assets/images/contact.jpg')",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        bigShouldersDisplay: ["Big Shoulders Display", "sans-serif"],
        ptSerif: ["PT Serif", "sans-serif"],
      },
    },
  },
  plugins: [],
};