const path = require('path')
const webpack = require('webpack')

const htmlTemplate = require('html-webpack-template')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const createHtml = new HtmlWebpackPlugin({
  inject: false,
  template: htmlTemplate,
  lang: 'de',
  mobile: true
})
const extractStyles = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === 'development'
})
const hmr = new webpack.HotModuleReplacementPlugin()

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dst')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css/,
        use: extractStyles.extract({
          use: [{ loader: 'css-loader' }],
          fallback: 'style-loader'
        })
      }
    ]
  },
  devtool: 'source-map',
  plugins: [createHtml, hmr, extractStyles],

  // configure webpack-dev-server
  devServer: {
    host: '0.0.0.0',
    hot: true,
    open: true
  }
}
