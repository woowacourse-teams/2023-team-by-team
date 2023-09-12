const { join, resolve } = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const Dotenv = require('dotenv');

const isProduction = process.env.NODE_ENV === 'production';

Dotenv.config();

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.tsx',
  devtool: isProduction ? 'hidden-source-map' : 'eval-source-map',
  devServer: {
    static: {
      directory: join(__dirname, 'public'),
    },
    historyApiFallback: true,
    port: 3000,
    compress: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    modules: ['node_modules'],
    alias: { '~': join(__dirname, '.', 'src/') },
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, './public/index.html'),
      hash: true,
      favicon: join(__dirname, './public/favicon.ico'),
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
      'process.env.NODE_ENV': JSON.stringify(
        isProduction ? 'production' : 'development',
      ),
    }),
    new BundleAnalyzerPlugin(),
  ],
};
