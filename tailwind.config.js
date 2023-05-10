/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      primary: {"50":"#faf5ff","100":"#f3e8ff","200":"#e9d5ff","300":"#d8b4fe","400":"#c084fc","500":"#a855f7","600":"#9333ea","700":"#7e22ce","800":"#6b21a8","900":"#581c87"}
      // newColor: "#00495e",
      // primarydark: "#162533",
      // yellow: "#ffdd4f",
      // white: "#ffffff",
      // gunmetal: "#1C1C2F",
      // red: "#c10000",
      // "basic-color": "#494446",
      // "light-grey": "#e4e1dc",
      // "color-mask": "#d8d8d8",
      // "dark-grey": "#191c1f",
    },
    animation: {
      text: 'text 5s ease infinite',
    },
    keyframes: {
      text: {
        '0%, 100%': {
          'background-size': '300% 300%',
          'background-position': 'left center',
        },
        '50%': {
          'background-size': '300% 300%',
          'background-position': 'right center',
        },
      },
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
