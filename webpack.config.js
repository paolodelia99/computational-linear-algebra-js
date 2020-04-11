const path = require('path')

module.exports = {
  entry: {
    app: ['@babel/polyfill', './src/*.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'linear.algebra.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
}