const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
   plugins: [
      require('autoprefixer'),
      require('postcss-preset-env'),
      // purgecss({
      //    content: ['./**/*.html'],
      // }),
   ],
}
