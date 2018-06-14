const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('../config')
const base = require('./webpack.base.config')

const DashboardPlugin = require('webpack-dashboard/plugin')

const dev = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    port: 8080,
    host: 'localhost',
    overlay: true,
    compress: true,
    open: true,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
    }),
    new DashboardPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
module.exports = merge(base, dev)
