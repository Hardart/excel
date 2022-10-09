const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'

const filename = (ext) => (devMode ? `[name].[contenthash].${ext}` : `[name].${ext}`)
const entry = (ext) => (devMode ? `[name].[contenthash].${ext}` : `[name].${ext}`)
const folder = (ext) => (ext == 'html' ? filename(ext) : `assets/${ext}/${filename(ext)}`)

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    app: './app',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: entry('js'),
    assetModuleFilename: 'assets/img/[hash][ext][query]',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@ts': path.resolve(__dirname, 'src/ts'),
      '@scss': path.resolve(__dirname, 'src/scss'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    port: 5051,
    watchFiles: ['src/*'],
    client: {
      logging: 'none',
    },
    hot: true,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: folder('css'),
    }),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset',
      },
    ],
  },
  devtool: 'source-map',
}
