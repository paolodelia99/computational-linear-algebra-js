const path = require('path')

module.exports = {
  entry: {
    app: ['@babel/polyfill', './src/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'linear.algebra.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
}