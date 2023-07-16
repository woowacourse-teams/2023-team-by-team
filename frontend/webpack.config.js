const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

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
    ],
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, './public/index.html'),
    }),
  ],
};
