const webpack = require('webpack')
const path = require('path')
const ora = require('ora')
const utils = require('./utils')
const HappyPack = require('happypack')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const threads = require('os').cpus().length - 1
const { model } = process.env

let webapckConfig = {
  mode: model === 'build' ? 'production' : 'development',
  devtool: '#source-map',
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'react-router-redux',
      'redux-saga',
    ],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'vendor.js',
    library: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=babelPack'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.resolve(`images/[name].[ext]`),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HappyPack({
      id: 'babelPack',
      verbose: true,
      threads,
      loaders: [
        {
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dist/', 'manifest.json'),
      name: '[name]',
      context: __dirname,
    }),
  ],
}

//判断模式
let buildLoad = ora('building for lib...\n')
buildLoad.start()

if (model === 'build') {
  // 生产模式
  console.log('Js is mini\n')
  webapckConfig.plugins.push(
    new ParallelUglifyPlugin({
      cacheDir: '.cache/dll',
      workerCount: threads,
      uglifyJS: {
        output: {
          comments: false,
        },
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true,
        },
      },
      sourceMap: true,
    })
  )
  webapckConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    })
  )
}

//打包公用库
webpack(webapckConfig, (error, stats) => {
  buildLoad.stop()
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n'
  )
  console.log('build dll complete...\n')
})
