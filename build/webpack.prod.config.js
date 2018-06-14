const path = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const base = require('./webpack.base.config')

const prod = {
  mode:'production',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // 文档: https://github.com/gdborton/webpack-parallel-uglify-plugin
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        mangle: false,
        output: {
          beautify: false,
          comments: false,
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true,
        },
      },
    }),
  ],
}
module.exports = merge(base, prod)
