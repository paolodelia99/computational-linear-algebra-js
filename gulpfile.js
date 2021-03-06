const gulp = require('gulp')
const webpack = require('webpack')
const babel = require('gulp-babel')
const del = require('del')
const log = require('fancy-log')
const path = require('path')
const fs = require('fs')
const uglify = require('uglify-js')

const COMPILE_SRC = './src/**/*.js'
const COMPILE_LIB = './lib'
const COMPILE_ES = './es' // es modules
const FILE = 'linear.algebra.js'
const DIST = path.join(__dirname, '/dist')
const LINEAR_ALG = DIST + '/' + FILE
const FILE_MIN = 'linear.algebra.min.js'
const FILE_MAP = 'linear.algebra.min.map'

const clean = () => {
  return del([
    'dist/**/*',
    'lib/**/*',
    'es/**/*'
  ])
}

const compile = () => {
  return gulp.src(COMPILE_SRC)
    .pipe(babel())
    .pipe(gulp.dest(COMPILE_LIB))
}

// create a single instance of the compiler to allow caching
const compiler = webpack(require('./webpack.config.js'))

const bundle = (done) => {
  compiler.run(function (err, stats) {
    if (err) {
      log(err)
      done(err)
    }
    const info = stats.toJson()

    if (stats.hasWarnings()) {
      log('Webpack warnings:\n' + info.warnings.join('\n'))
    }

    if (stats.hasErrors()) {
      log('Webpack errors:\n' + info.errors.join('\n'))
      done(new Error('Compile failed'))
    }

    log('bundled ' + LINEAR_ALG)

    done()
  })
}

const uglifyConfig = {
  sourceMap: {
    filename: FILE,
    url: FILE_MAP
  },
  output: {
    comments: /@license/
  }
}

function minify (done) {
  const oldCwd = process.cwd()
  process.chdir(DIST)

  try {
    const result = uglify.minify({
      'linear-algebra.js': fs.readFileSync(FILE, 'utf8')
    }, uglifyConfig)

    if (result.error) {
      throw result.error
    }

    fs.writeFileSync(FILE_MIN, result.code)
    fs.writeFileSync(FILE_MAP, result.map)

    log('Minified ' + FILE_MIN)
    log('Mapped ' + FILE_MAP)
  } finally {
    process.chdir(oldCwd)
  }

  done()
}

function compileESModules () {
  const babelOptions = JSON.parse(String(fs.readFileSync('.babelrc')))

  return gulp.src(COMPILE_SRC)
    .pipe(babel({
      ...babelOptions,
      presets: [
        ['@babel/preset-env', {
          modules: false
        }]
      ]
    }))
    .pipe(gulp.dest(COMPILE_ES))
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
  compile,
  compileESModules,
  bundle,
  minify
))
