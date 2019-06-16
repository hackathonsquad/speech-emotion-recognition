var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

const webpackConfig = minimize => ({
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  entry: {
    [minimize ? 'audioplayer.min' : 'audioplayer']: './src/index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'AudioPlayer',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: {
    'prop-types': {
      root: 'PropTypes',
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
      amd: 'prop-types'
    },
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    }
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin('[name].css'),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.min\.css$/
    }),
    new CompressionPlugin()
  ],
  optimization: {
    noEmitOnErrors: true,
    minimize
  }
});

const configResult = (function() {
  switch (process.env.BUILD_MODE) {
    case 'minimize':
      return webpackConfig(true);
    case 'unminimized':
      return webpackConfig(false);
    case 'all':
    default:
      return [webpackConfig(true), webpackConfig(false)];
  }
})();

module.exports = configResult;
