const HtmlWebpackPlugin = require('html-webpack-plugin') // Require  html-webpack-plugin plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '/src/js/index.js'), // webpack entry point. Module to start building dependency graph
  output: {
    path: path.resolve(__dirname, 'dist'), // Folder to store generated bundle
    filename: 'js/app.js', // Name of generated bundle after build
    publicPath: '/dist' // public URL of the output directory when referenced in a browser
  },
  module: {
    // where we defined file patterns and their loaders
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: [/node_modules/]
    },
    {
      test: /\.(sass|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }
    ]

  },
  plugins: [
    // Array of plugins to apply to build chunk
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '/src/index.html'),
      inject: 'body'
    }),
    new ExtractTextPlugin('styles/styles.css')
  ],
  devServer: {
    // configuration for webpack-dev-server
    contentBase: './src/index.html', // source of static assets
    port: 7700 // port to run dev-server
  }
}
