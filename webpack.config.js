const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  mode: 'none',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              // 配置无效，待检查
              modifyVars: {
                'primary-color': '#cd8383',
                'link-color': '#f6cca3',
                // 'hack': `true; @import "styles/antd-theme.less";`,
              },
              javascriptEnabled: true,
            }
          }
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.(tsx?)/,
        loader: []
      },
      {
        test: /\.(ts|js)x?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      // {
      //   test: /\.html$/,
      //   use: {
      //     loader: 'html-loader'
      //   }
      // }
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          }
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    hot: true,
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    extensions: ['.ts', '.tsx', '.json', '.js',]
  },
}
