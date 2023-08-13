const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BannerWebpackPlugin = require('./plugins/1.banner-webpack-plugin');
const CleanWebpackPlugin = require('./plugins/2.clean-webpack-plugin');
const AnalyzeWebpackPlugin = require('./plugins/3.analyze-webpack-plugin');
const InlineChunkWebpackPlugin = require('./plugins/4.inline-chunk-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    // clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: './loaders/3.babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)/,
        loader: './loaders/4.file-loader',
        type: 'javascript/auto',  // 阻止webpack默认处理图片资源, 只使用file-loader处理
      },
      {
        test: /\.css$/,
        use: ['./loaders/5.style-loader', 'css-loader']
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new BannerWebpackPlugin({
      Author: 'hello world',
    }),
    // FIXME: 当不存在dist目录时会报错
    new CleanWebpackPlugin(),
    new AnalyzeWebpackPlugin(),
    new InlineChunkWebpackPlugin([/runtime(.*)\.js/g]),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}.js`,
    },
  },
  mode: 'production',
}