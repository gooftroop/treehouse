const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();

const ASSET_PATH = path.join(cwd, './assets');

module.exports = {
  target: 'node',
  cache: false,
  devtool: 'source-map',
  entry: {
    jarvis: [
      'babel-polyfill',
      path.join(cwd, 'index.js'),
    ],
  },
  resolve: {
    modules: [
      path.join(cwd, 'node_modules'),
    ],
    alias: {
      jarvis: path.join(cwd, 'src'),
      tests: path.join(cwd, 'tests'),
    },
    extensions: ['.json', '.js', '.min.js'],
  },
  module: {
    rules: [
      {
        test: /\.js?$/i,
        use: 'babel-loader',
        include: path.join(cwd, 'src'),
        exclude: /node_modules/,
      },
    ],
    noParse: /\.min\.js/,
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  output: {
    chunkFilename: '[name].[id].js',
    filename: '[name].js',
    libraryTarget: 'commonjs-module',
    path: ASSET_PATH,
  },
};
