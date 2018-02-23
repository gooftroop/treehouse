// TODO use webpack merge
const nodeExternals = require('webpack-node-externals');
const npm_package = require('../package.json')
const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();

// For dynamic public paths: https://webpack.js.org/guides/public-path/
const NODE_ENV = process.env.NODE_ENV || 'development';

function module_alias(aliases) {
  return Object.assign(...Object.entries(
    npm_package._moduleAliases).map(([k, v]) => ({ [k]: path.join(cwd, v) }))
  ) || {}
}

module.exports = {
  target: 'node',
  cache: false,
  devtool: 'source-map',
  entry: {
    server: [
      path.join(cwd, 'src/main.js'),
    ],
  },
  resolve: {
    alias: module_alias(npm_package._moduleAliases),
    extensions: ['.json', '.js', '.min.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: 'babel-loader',
        include: [path.join(cwd, 'src')],
        exclude: /node_modules/,
      },
    ],
    noParse: /\.min\.js/,
  },
  externals: [
    nodeExternals()
  ],
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  output: {
    chunkFilename: 'axon.[id].js',
    filename:      'axon.js',
    library:       'axon',
    libraryTarget: 'commonjs2',
    path:           path.join(cwd, 'dist')
  },
};
