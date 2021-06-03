const path = require('path');

module.exports = {
  env: {
    APP_NAME: process.env.APP_NAME,
    BASE_URL: process.env.BASE_URL,
    API_KEY: process.env.API_KEY,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['image.tmdb.org'],
  },
}