const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const utils = require('./utils')

const threadPool = HappyPack.ThreadPool({
  size: require('os').cpus().length - 1,
})

const { NODE_ENV } = process.env

const basePath = path.resolve(__dirname, '..')
const assetsPath = path.resolve(__dirname, '../dist', 'static')
const publicPath = path.resolve(__dirname, '../dist')

const isDev = NODE_ENV !== 'production'

module.exports = {
  devtool: NODE_ENV === 'production' ? 'source-maps' : 'inline-source-map',
  entry: utils.entry,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      components: `${basePath}/src/components`,
      containers: `${basePath}/src/containers`,
      pages: `${basePath}/src/pages`,
      store: `${basePath}/src/store`,
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        include: [utils.resolve('src'), utils.resolve('test')],
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              fix: true, // true自动修正代码风格
              formatter: require('eslint-friendly-formatter'),
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        include: [utils.resolve('src'), utils.resolve('test')],
        use: ['happypack/loader?id=babelPack'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[hash:base64:6]',
              },
            },
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[hash:base64:6]',
              },
            },
            'less-loader',
          ],
        }),
      },
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[hash:base64:6]',
          },
        },
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: assetsPath + 'img/[name].[hash:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: assetsPath + 'media/[name].[hash:7].[ext]',
            },
          },
          isDev
            ? {
                loader: 'image-webpack-loader',
                options: {
                  pngquant: {
                    speed: 4,
                    quality: '75-90',
                  },
                  optipng: {
                    optimizationLevel: 7,
                  },
                  mozjpeg: {
                    quality: 70,
                    progressive: true,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                },
              }
            : null,
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: assetsPath + 'fonts/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: path.join(__dirname, '../dist/', 'manifest.json'),
    }),
    // new ExtractTextPlugin('css/[name].[contenthash:8].css'),
    new HtmlWebpackPlugin({
      template: path.join(basePath, 'src/index.html'),
      filename: 'index.html',
      title: 'index',
      // chunks: ['index'],
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options: https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
    }),
    new HappyPack({
      id: 'babelPack',
      threadPool,
      loaders: ['babel-loader'],
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 2,
          name: 'common',
        },
      },
    },
  },
}
