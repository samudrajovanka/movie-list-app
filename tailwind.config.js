module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'android': '360px'
      },
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
