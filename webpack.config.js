const webpack = require('webpack'); //빌트인 플러그인에 접근하기 위함
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const PATH_SOURCE = path.join(__dirname, './react/src');
const PATH_BUILD = path.join(__dirname, './public/dist');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    main: PATH_SOURCE + '/Main/index.js', // 클라이언트 앱의 엔트리 포인트
    admin: PATH_SOURCE + '/Admin/index.js', // 관리자 앱의 엔트리 포인트
  },
  output: {
    path: PATH_BUILD,
    filename: isProduction ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
    publicPath: '/dist/',
  },
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      /* scss, sass 로더 */
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].style.css', // '[name]' 플레이스홀더를 사용
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'template.html'),
      filename: path.join(__dirname, 'app/Views/admin', 'index.php'), // CodeIgniter의 View 경로에 맞게 설정
      chunks: ['admin'], // 'admin' 엔트리 포인트에 해당하는 청크만 포함
      inject: 'body', // 스크립트를 body 태그 끝에 삽입
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'template.html'),
      filename: path.join(__dirname, 'app/Views/main', 'index.php'), // CodeIgniter의 View 경로에 맞게 설정
      chunks: ['main'], // 'main' 엔트리 포인트에 해당하는 청크만 포함
      inject: 'body', // 스크립트를 body 태그 끝에 삽입
    }),
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      name: 'common', // 공통 청크의 이름
    },
  },
};
