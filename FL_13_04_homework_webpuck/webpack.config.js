const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.join(__dirname, '/dist'), // Folder to store generated bundle
    filename: 'js/app.js', // Name of generated bundle after build
    publicPath: '/dist/', // public URL of the output directory when referenced in a browser
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserPlugin(),
      // new HtmlWebpackPlugin({
      //   template: './src/index.html',
      //   inject: 'body',
      //   minify: {
      //     removeAttributeQuotes: true,
      //     collapseWhitespace: true,
      //     removeComments: true,
      //   },
      // }),
    ],
  },
  module: {
    // where we defined file patterns and their loaders
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: './img',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Array of plugins to apply to build chunk
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/styles.css',
      inject: 'head',
    }),
    new CleanWebpackPlugin({
      dry: true,
    }),
  ],
  devServer: {
    // configuration for webpack-dev-server
    open: 'Google Chrome',
    contentBase: './dist/', // source of static assets
    port: 7700, // port to run dev-server
    hot: true,
  },
};
