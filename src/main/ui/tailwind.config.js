/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        airForceBlue: '#6c919d',
        keppel: '#45B69C',
        mint: '#21D19F',
        lavender: '#E2E6F3',
        wht: '#FFFFFF',

        coolGray : {
          "light": '#B9BCCA',
          "normal" : '#8B90A7',
          "dark" : '464A5D'
        }
      }
    },
  },
  plugins: []
}
