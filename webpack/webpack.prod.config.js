const webpack = require('webpack')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const cssnano = require('cssnano')
const baseConfig = require('./webpack.base.config.js')
const env = require('./env.js')

const prodConfig = {
  devtool: 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true
          },
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      })
    ],
    namedModules: true,
    namedChunks: true,
    concatenateModules: true,
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all'
        }
      }
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.REQUEST_TIMEOUT': JSON.stringify(
        env.production.requestTimeout
      ),
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.MOCK': JSON.stringify(env.production.mock ? '1' : '0')
    }),

    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].[contenthash:8].css'
    }),

    // 合并太小的 chunk
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10240
    })
  ]
}

module.exports = merge(baseConfig, prodConfig)
