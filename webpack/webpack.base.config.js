const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const baseConfig = {
  entry: {
    app: [path.join(__dirname, '../src/index.tsx')]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[contenthash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: [
          'babel-loader?cacheDirectory=true',
          'awesome-typescript-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|eot)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 构建缓存
    new HardSourceWebpackPlugin(),

    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|zh-cn/),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: path.join(__dirname, '../src/assets/images/favicon.png'),
      template: path.join(__dirname, '../src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true
      }
    }),

    new webpack.HashedModuleIdsPlugin(),

    new StyleLintPlugin({
      context: 'src',
      files: '**/*.less',
      syntax: 'less'
    })
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.join(__dirname, '../src'),
      '@tests': path.join(__dirname, '../tests')
    }
  }
}

if (process.env.npm_config_analyse) {
  baseConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = baseConfig
