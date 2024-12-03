const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    main: ['./src/js/index.js', 'bootstrap'] // Include Bootstrap's JS
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'assets') // Adjust to match Jekyll's assets directory
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate file
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                quietDeps: true // Suppress deprecation warnings from node_modules in this case bootstraps
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/images', to: 'images' },
        { from: 'src/fonts', to: 'fonts' },
        { from: 'node_modules/bootstrap-icons/font/fonts', to: 'fonts/BootstrapIcons' }
      ]
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '_site'),
    compress: true,
    port: 9000,
    watchContentBase: true // Watch for changes in content base to reload
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};