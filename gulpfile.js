const gulp = require('gulp');
const webpack = require('webpack');
const babel = require('gulp-babel');

gulp.task('default', () =>
  gulp.src('src/app.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest('dist'))
);