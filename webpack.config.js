const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  mode: 'none',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        loader: ['style-loader', 'css-loader', 'less-loader'],
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
          // {
          //   loader: 'url-loader',
          //   options: {
          //     limit: 8192
          //   }
          // },
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
