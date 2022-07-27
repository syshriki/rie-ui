const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: colors.red,
      secondary: colors.brown,
      black: colors.black,
      white: colors.white,
      gray: colors.zinc,
      red: colors.red,
      green: colors.emerald,
      purple: colors.violet,
      brown: colors.brown,
      blue: colors.blue
    }
  },
  plugins: []
}
