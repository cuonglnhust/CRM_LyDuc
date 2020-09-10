var webpack = require('webpack');
var path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')

let pathsToClean = [
  'js/*.*'
]
let pathApp = path.join(__dirname, 'website/core/');

let cleanOptions = {
  root: path.join(pathApp, 'public/build/')
}

module.exports = {
   entry: {
      'build-website-lyduc': path.join(pathApp, 'src/index.js')
   },
  output: {
    path: path.join(pathApp, 'public/build/js'),
    publicPath: 'public/build/js/',
    filename: '[name].js',
    chunkFilename:'[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css']
  },
  devtool: 'source-map',
   module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'stage-0', 'react']
      }
    },
    { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    {
      test: /\.(scss|css)$/,
      loader: ['style-loader', 'css-loader', 'sass-loader']
    }
    ]
  },
  plugins: [
      new webpack.IgnorePlugin(/jsdom$/),
      new CleanWebpackPlugin(pathsToClean, cleanOptions)
  ]
};