const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('default', () => {
  return gulp.src('src/entry.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/'))
});