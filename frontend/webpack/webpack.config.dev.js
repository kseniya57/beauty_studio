const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 8090,
    contentBase: 'public',
    hot: true,
    publicPath: '/'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin({
      "API_HOST": "localhost",
      "NODE_ENV": "development",
    }),
  ]
});
