const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const commonConfig = require('./webpack.base.config')
const env = require('./env.js')

const devConfig = {
  devtool: 'inline-source-map',
  entry: {
    app: ['react-hot-loader/patch', path.join(__dirname, '../src/index.tsx')]
  },
  output: {
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REQUEST_TIMEOUT': JSON.stringify(
        env.development.requestTimeout
      ),
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.MOCK': JSON.stringify(env.development.mock ? '1' : '0')
    })
  ],
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: true,
    overlay: true,
    disableHostCheck: true,
    ...env.development.devServer
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
}

module.exports = merge({
  customizeArray(a, b, key) {
    if (key === 'entry.app') {
      return b
    }
    return undefined
  }
})(commonConfig, devConfig)
