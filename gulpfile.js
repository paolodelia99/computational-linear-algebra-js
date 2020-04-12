const gulp = require('gulp')
const webpack = require('webpack-stream')
const del = require('del')

const clean = () => {
  return del([
    'dist/*'
  ])
}

const compile = () => {
  // todo: ??
}

const bundle = () => {
  return gulp.src('src/entry.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'))
}

gulp.task('watch', () => {
  const files = ['package.json', 'src/*.js']
  const options = {
    // ignore version.js else we get an infinite loop since it's updated during bundle
    ignored: /version\.js/,
    ignoreInitial: false,
    delay: 100
  }

  gulp.watch(files, options, gulp.parallel(bundle, compile))
})

gulp.task('default', gulp.series(
  clean,
  bundle
))
