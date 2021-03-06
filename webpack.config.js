const webpack = require('webpack'); //빌트인 플러그인에 접근하기 위함
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATH_SOURCE = path.join(__dirname, './react/src');
const PATH_BUILD = path.join(__dirname, './public/dist');

module.exports = {
  entry: PATH_SOURCE + '/App.js',
  output: {
    path: PATH_BUILD,
    filename: 'main.bundle.js',
  },
  mode: 'development',
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.css', '.scss', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules',
        use: ['babel-loader'],
      },
      /* css 로더 */
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      /* scss, sass 로더 */
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CleanWebpackPlugin(),
  ],
};
